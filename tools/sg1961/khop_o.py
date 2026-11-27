"""Khớp mép các ô tranh Spark Sài Gòn 1961 với nhau (anh Kha 27/11: "bản đồ ráp còn lệch").
Mỗi ô đặt theo toạ độ tờ quét, nhưng Spark vẽ lại mỗi ô hơi xê dịch → chỗ hai ô chồng mép, đường bị gãy.
Cách làm: dựng từng ô lên lưới 2 m, đo độ lệch (dx, dy) của mọi cặp ô chồng mép bằng cách dò lòng đường trùng nhau nhiều nhất,
rồi tìm cho mỗi ô một độ dời nhỏ sao cho các cặp khớp nhau (bình phương tối thiểu, kéo nhẹ về chỗ cũ để cả tấm không trôi).
Chạy: python3 tools/sg1961/khop_o.py   (sửa tt/tp/dt trong data/sai-gon/1961.json; bản cũ lưu ở docs/research/sai_gon_1961/anh_nen_truoc_khop.json)
"""
import json, math, os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

F = 'data/sai-gon/1961.json'; M = 2.0
d = json.load(open(F))
LUU = 'docs/research/sai_gon_1961/anh_nen_truoc_khop.json'     # chỗ đặt gốc theo tờ quét (chạy lại luôn tính từ đây)
if not os.path.exists(LUU): json.dump(d['anh_nen'], open(LUU, 'w'), ensure_ascii=False, indent=0)
A = d['anh_nen'] = json.load(open(LUU))
KX = 111320 * math.cos(math.radians(10.76)); KY = 110574
lo0 = min(min(a['tt'][0], a['dt'][0]) for a in A) - 0.002; la0 = max(max(a['tt'][1], a['tp'][1]) for a in A) + 0.002
def xy(lon, lat): return (lon - lo0) * KX / M, (la0 - lat) * KY / M

O = []
for a in A:
    im = Image.open(a['file']).convert('RGBA'); w, h = im.size
    p0 = np.array(xy(*a['tt'])); p1 = np.array(xy(*a['tp'])); p2 = np.array(xy(*a['dt'])); p3 = p1 + p2 - p0
    bx0, by0 = np.floor(np.min([p0, p1, p2, p3], 0)).astype(int); bx1, by1 = np.ceil(np.max([p0, p1, p2, p3], 0)).astype(int)
    W, H = bx1 - bx0, by1 - by0
    q0 = p0 - [bx0, by0]; Ti = np.linalg.inv(np.c_[p1 - p0, p2 - p0])
    c = [Ti[0, 0] * w, Ti[0, 1] * w, -(Ti[0] @ q0) * w, Ti[1, 0] * h, Ti[1, 1] * h, -(Ti[1] @ q0) * h]
    t = np.asarray(im.transform((W, H), Image.AFFINE, c, resample=Image.BILINEAR)).astype(int)
    ok = t[..., 3] > 200
    ok = ndi.binary_erosion(ok, iterations=3)
    R, G, B = t[..., 0], t[..., 1], t[..., 2]
    duong = ((R > 228) & (G > 218) & (B > 190) & (R - B < 55)).astype(float)
    O.append(dict(x=bx0, y=by0, W=W, H=H, ok=ok, f=ndi.gaussian_filter(duong, 1.0)))
print(len(O), 'ô')

R_ = 12; cap = []
for i in range(len(O)):
    for j in range(i + 1, len(O)):
        a, b = O[i], O[j]
        x0, y0 = max(a['x'], b['x']), max(a['y'], b['y']); x1, y1 = min(a['x'] + a['W'], b['x'] + b['W']), min(a['y'] + a['H'], b['y'] + b['H'])
        if x1 - x0 < 30 + 2 * R_ or y1 - y0 < 30 + 2 * R_: continue
        # vùng chung (thu vào R_ để còn chỗ dời)
        X0, Y0, X1, Y1 = x0 + R_, y0 + R_, x1 - R_, y1 - R_
        fa = a['f'][Y0 - a['y']:Y1 - a['y'], X0 - a['x']:X1 - a['x']]; oa = a['ok'][Y0 - a['y']:Y1 - a['y'], X0 - a['x']:X1 - a['x']]
        best = None
        for dy in range(-R_, R_ + 1):
            for dx in range(-R_, R_ + 1):
                fb = b['f'][Y0 - b['y'] + dy:Y1 - b['y'] + dy, X0 - b['x'] + dx:X1 - b['x'] + dx]
                ob = b['ok'][Y0 - b['y'] + dy:Y1 - b['y'] + dy, X0 - b['x'] + dx:X1 - b['x'] + dx]
                m = oa & ob
                if m.sum() < 3000: continue
                u, v = fa[m], fb[m]
                u = u - u.mean(); v = v - v.mean(); s = math.sqrt((u * u).sum() * (v * v).sum()) or 1
                cc = (u * v).sum() / s
                if best is None or cc > best[0]: best = (cc, dx, dy, int(m.sum()))
        if best and best[0] > 0.4 and best[3] >= 20000:   # bỏ cặp chồng ít (đo không chắc)
            cap.append((i, j, best[1], best[2], best[0], best[3]))
print(len(cap), 'cặp chồng mép đo được')
# nội dung ô j tại (P+dx) trùng nội dung ô i tại P → ô j cần dời (-dx, -dy) so với ô i: t_j - t_i = -(dx,dy)
n = len(O); rows = []; rhs_x = []; rhs_y = []; wts = []
for i, j, dx, dy, cc, nm in cap:
    r = np.zeros(n); r[j] = 1; r[i] = -1; w_ = cc * math.sqrt(nm / 3000)
    rows.append(r * w_); rhs_x.append(-dx * w_); rhs_y.append(-dy * w_)
for k in range(n):                             # kéo nhẹ về chỗ cũ
    r = np.zeros(n); r[k] = 0.15; rows.append(r); rhs_x.append(0); rhs_y.append(0)
Am = np.array(rows); tx = np.linalg.lstsq(Am, np.array(rhs_x), rcond=None)[0]; ty = np.linalg.lstsq(Am, np.array(rhs_y), rcond=None)[0]
du = [math.hypot((tx[j] - tx[i]) + dx, (ty[j] - ty[i]) + dy) * M for i, j, dx, dy, cc, nm in cap]
truoc = [math.hypot(dx, dy) * M for i, j, dx, dy, cc, nm in cap]
print('lệch mép trước: trung vị %.1f m, lớn nhất %.1f m → sau: trung vị %.1f m, lớn nhất %.1f m' % (np.median(truoc), max(truoc), np.median(du), max(du)))
print('ô dời nhiều nhất %.1f m' % (max(np.hypot(tx, ty)) * M))
for (i, j, dx, dy, cc, nm), e, t0 in zip(cap, du, truoc):
    if e > 6 or t0 > 10: print('  cặp', A[i]['file'][14:-5], A[j]['file'][14:-5], 'đo lệch %.0f m (độ khớp %.2f, %d điểm) còn %.1f m' % (t0, cc, nm, e))
for k in np.argsort(-np.hypot(tx, ty))[:5]: print('  ô dời', A[k]['file'][14:-5], '%.1f m' % (math.hypot(tx[k], ty[k]) * M))
for k, a in enumerate(A):
    dlon = tx[k] * M / KX; dlat = -ty[k] * M / KY
    for key in ('tt', 'tp', 'dt'):
        a[key] = [round(a[key][0] + dlon, 7), round(a[key][1] + dlat, 7)]
json.dump(d, open(F, 'w'), ensure_ascii=False, separators=(',', ':'))
