#!/usr/bin/env python3
"""Tải dữ liệu OpenStreetMap (đường, hồ, mốc) phủ kín một hoặc vài phường, theo ô 0,02°.

Cách chạy:
  python3 tools/tai_osm.py <thư mục json/geojson của vietnamese-provinces-database> <thư mục lưu> <mẫu tên file phường> [...]
Ví dụ (Xuân Hương + Cam Ly):
  python3 tools/tai_osm.py /tmp/vpd/json/geojson /tmp/osm '68_lam_dong/wards/*_xuan_huong_da_lat' '68_lam_dong/wards/*_cam_ly_da_lat'

Dùng API chính của OpenStreetMap (api.openstreetmap.org/api/0.6/map) vì các máy chủ Overpass hay bị quá tải (504).
Tải lần lượt, nghỉ 1 giây giữa các ô cho đúng quy định dùng chung; ô nào quá nhiều điểm (lỗi 400) tự chia 4.
Ô đã tải rồi thì bỏ qua, nên chạy lại được khi đứt mạng.
"""
import json,glob,os,sys,time,subprocess
VPD=sys.argv[1]; OUT=sys.argv[2]; PATTERNS=sys.argv[3:]
os.makedirs(OUT,exist_ok=True)
polys=[]
for n in PATTERNS:
    f=glob.glob(f'{VPD}/{n}.geojson')[0]
    g=json.load(open(f))['features'][0]['geometry']
    for p in g['coordinates']: polys.append(p[0])
def inside(x,y,r):
    c=False;j=len(r)-1
    for i in range(len(r)):
        xi,yi=r[i];xj,yj=r[j]
        if (yi>y)!=(yj>y) and x<(xj-xi)*(y-yi)/(yj-yi)+xi: c=not c
        j=i
    return c
step=0.02
xs=[c[0] for r in polys for c in r]; ys=[c[1] for r in polys for c in r]
x0=round(min(xs)-0.005,2); y0=round(min(ys)-0.005,2); x1=max(xs); y1=max(ys)
todo=[]
x=x0
while x<x1:
    y=y0
    while y<y1:
        hit=any(inside(x+step*a/4,y+step*b/4,r) for a in range(5) for b in range(5) for r in polys)
        if hit: todo.append((round(x,3),round(y,3)))
        y+=step
    x+=step
print(len(todo),'tiles',flush=True)
def get(x,y,s):
    out=f'{OUT}/{x}_{y}_{s}.xml'
    if os.path.exists(out) and os.path.getsize(out)>500: return False
    url=f'https://api.openstreetmap.org/api/0.6/map?bbox={x},{y},{round(x+s,4)},{round(y+s,4)}'
    for k in range(3):
        code=subprocess.run(['curl','-s','-m','120','-A','gon-pho-viet-map/0.1','-o',out,'-w','%{http_code}',url],capture_output=True,text=True).stdout
        if code=='200': return True
        if code=='400':   # quá nhiều điểm: chia 4
            os.remove(out); h=round(s/2,4)
            for a,b in [(0,0),(h,0),(0,h),(h,h)]: get(round(x+a,4),round(y+b,4),h)
            return True
        time.sleep(3)
    print('FAIL',url,code,flush=True)
for i,(x,y) in enumerate(todo):
    if get(x,y,step): time.sleep(1)
    if i%10==0: print(i,flush=True)
print('done')
