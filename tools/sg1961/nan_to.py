# Nắn tờ quét theo đường OSM: bắt đầu từ affine thô, lặp: chiếu OSM -> ảnh, bắt khung xương phố sáng gần nhất, khớp đa thức bậc 3 (cả hai chiều).
import numpy as np, json, math, sys
from PIL import Image; Image.MAX_IMAGE_PIXELS=None
from scipy import ndimage as ndi
from skimage.morphology import skeletonize
SH, AFF, OUT = sys.argv[1:4]
g=np.asarray(Image.open(SH).convert('L')).astype(np.float32); H,W=g.shape
light=ndi.binary_opening(ndi.uniform_filter(g,5)>150,iterations=1)
sk=skeletonize(light); dist,ind=ndi.distance_transform_edt(~sk,return_indices=True)
KX=111320*math.cos(math.radians(10.78));KY=110574
L=[]
for e in json.load(open('hw.json'))['elements']:
    if e['tags'].get('highway') in ('primary','secondary','tertiary','residential','trunk','unclassified'):
        for p in e.get('geometry') or []: L.append((p['lon']*KX,p['lat']*KY))
L=np.array(L); c0=L.mean(0)
def feat(xy,c,s,deg):
    u=(xy[:,0]-c[0])/s; v=(xy[:,1]-c[1])/s
    f=[np.ones_like(u),u,v]
    if deg>=2: f+=[u*u,u*v,v*v]
    if deg>=3: f+=[u**3,u*u*v,u*v*v,v**3]
    return np.stack(f,1)
aff=np.load(AFF); M=np.array([[aff[0][0],aff[0][1]],[aff[1][0],aff[1][1]]]); t=np.array([aff[0][2],aff[1][2]]); Mi=np.linalg.inv(M)
fwd=lambda XY:(XY-t)@Mi.T
pc=np.array([W/2,H/2])
for it,(R,deg) in enumerate([(25,1),(15,2),(12,3),(10,3),(8,3),(8,3)]):
    px=fwd(L); ok=(px[:,0]>5)&(px[:,1]>5)&(px[:,0]<W-5)&(px[:,1]<H-5)
    p=px[ok]; xi=p[:,0].astype(int); yi=p[:,1].astype(int); m=dist[yi,xi]<R
    tgt=np.stack([ind[1][yi,xi],ind[0][yi,xi]],1)[m].astype(float); src=L[ok][m]
    Fw=feat(src,c0,3000,deg); cx=np.linalg.lstsq(Fw,tgt[:,0],rcond=None)[0]; cy=np.linalg.lstsq(Fw,tgt[:,1],rcond=None)[0]
    fwd=lambda XY,cx=cx,cy=cy,deg=deg: np.stack([feat(XY,c0,3000,deg)@cx,feat(XY,c0,3000,deg)@cy],1)
    r=np.hypot(*(fwd(src)-tgt).T)*1.4
    print(it,'bậc',deg,'điểm',m.sum(),'lệch trung vị m',round(float(np.median(r)),1))
# chiều ngược: ảnh -> mét (đa thức bậc 3 khớp trên lưới)
gx,gy=np.meshgrid(np.linspace(0,W,60),np.linspace(0,H,80)); 
# lấy lưới mét phủ ảnh: đảo bằng cách khớp trên các cặp (src, fwd(src)) dày
Lg=np.stack(np.meshgrid(np.linspace(L[:,0].min(),L[:,0].max(),120),np.linspace(L[:,1].min(),L[:,1].max(),120)),-1).reshape(-1,2)
Pg=fwd(Lg); Fi=feat(Pg,pc,2000,3)
ie=np.linalg.lstsq(Fi,Lg[:,0],rcond=None)[0]; inn=np.linalg.lstsq(Fi,Lg[:,1],rcond=None)[0]
print('sai số đảo m', round(float(np.abs(Fi@ie-Lg[:,0]).max()),2))
json.dump({'deg':3,'c0':c0.tolist(),'s':3000,'cx':cx.tolist(),'cy':cy.tolist(),'pc':pc.tolist(),'si':2000,'ie':ie.tolist(),'in':inn.tolist(),'KX':KX,'KY':KY},open(OUT,'w'))
