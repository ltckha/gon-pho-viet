"""Kéo tên đường Sài Gòn 1961 vào giữa lòng đường của TRANH SPARK (anh Kha 27/11: "zoom lên là thấy tên chạy tùm lum").
Tên được đặt theo nét đường OpenStreetMap ngày nay + lưới nắn cục bộ, còn tranh Spark vẽ theo tờ giấy 1961 → lệch 20–50 m.
Cách làm: ghép các ô tranh (data/sai-gon/1961.json → anh_nen) thành một tấm theo kinh/vĩ độ (2 m một điểm ảnh), dò lòng đường
(màu kem sáng), rồi với mỗi tên: (1) dời cả đoạn trong ±50 m tới chỗ trùng lòng đường nhiều nhất, (2) từng điểm nhích
vuông góc ±14 m vào giữa lòng đường, làm mượt. Tên nào sau khi dời vẫn không nằm trên đường thì giữ nguyên chỗ cũ.
Chạy: python3 tools/sg1961/khop_ten.py [ảnh kiểm tra.png]   (đọc docs/research/sai_gon_1961/ten_duong_osm.json, ghi ten_duong trong data/sai-gon/1961.json)
"""
import json, sys, math
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

F = 'data/sai-gon/1961.json'
M = 2.0                                     # mét / điểm ảnh
d = json.load(open(F))
GOC = 'docs/research/sai_gon_1961/ten_duong_osm.json'    # tên đặt theo nét OpenStreetMap (gan_ten.py), chưa kéo
goc = json.load(open(GOC))
LAT0 = 10.76; KX = 111320 * math.cos(math.radians(LAT0)); KY = 110574
A = d['anh_nen']
lo = min(min(a['tt'][0], a['dt'][0]) for a in A) - 0.002; hi = max(a['tp'][0] for a in A) + 0.004
la_hi = max(max(a['tt'][1], a['tp'][1]) for a in A) + 0.002; la_lo = min(a['dt'][1] for a in A) - 0.004
W = int((hi - lo) * KX / M); H = int((la_hi - la_lo) * KY / M)
def xy(lon, lat): return (np.asarray(lon) - lo) * KX / M, (la_hi - np.asarray(lat)) * KY / M
def ll(x, y): return lo + np.asarray(x) * M / KX, la_hi - np.asarray(y) * M / KY
print('tấm ghép', W, H)
nen = Image.new('RGB', (W, H), (0, 0, 0)); co = Image.new('L', (W, H), 0)
for a in A:                                  # đầu danh sách nằm dưới → vẽ theo thứ tự
    im = Image.open(a['file']).convert('RGBA'); w, h = im.size
    x0, y0 = xy(*a['tt']); x1, y1 = xy(*a['tp']); x2, y2 = xy(*a['dt'])
    T = np.array([[x1 - x0, x2 - x0], [y1 - y0, y2 - y0]]); Ti = np.linalg.inv(T)
    # điểm ra (X,Y) → (u,v) = Ti·(X-x0, Y-y0) → điểm ảnh vào (u*w, v*h)
    c = [Ti[0, 0] * w, Ti[0, 1] * w, -(Ti[0, 0] * x0 + Ti[0, 1] * y0) * w,
         Ti[1, 0] * h, Ti[1, 1] * h, -(Ti[1, 0] * x0 + Ti[1, 1] * y0) * h]
    t = im.transform((W, H), Image.AFFINE, c, resample=Image.BILINEAR)
    nen.paste(t.convert('RGB'), (0, 0), t.split()[3]); co.paste(255, (0, 0), t.split()[3])
a = np.asarray(nen).astype(int); R, G, B = a[..., 0], a[..., 1], a[..., 2]
duong = (R > 228) & (G > 218) & (B > 190) & (R - B < 55) & (np.asarray(co) > 0)
duong = ndi.binary_opening(duong, iterations=1)
kc = ndi.distance_transform_edt(duong)                       # khoảng cách (điểm ảnh) tới mép đường gần nhất
mo = np.minimum(kc, 14) / 14.0                               # cao nhất ở giữa lòng đường (đại lộ tới ~56 m cũng ra giữa)
mo = ndi.gaussian_filter(mo, 0.8)
duong_n = ndi.binary_dilation(duong, iterations=1)       # lòng đường nới 2 m cho mép vẽ tay
print('lòng đường %.1f%% tấm' % (duong.mean() * 100))

def lay(px, py):
    return ndi.map_coordinates(mo, [py, px], order=1, mode='constant')
def doi(pts):
    P = np.array(pts, float); x, y = xy(P[:, 0], P[:, 1])
    x = np.array(x, float); y = np.array(y, float)
    # chia mịn mỗi 6 m để đo
    L = np.r_[0, np.cumsum(np.hypot(np.diff(x), np.diff(y)))]
    if L[-1] < 5: return [], 0, 0
    s = np.arange(0, L[-1], 3.0); sx = np.interp(s, L, x); sy = np.interp(s, L, y)
    goc_d = lay(sx, sy).mean()
    best = (goc_d, 0, 0)
    for dx in range(-25, 26):
        for dy in range(-25, 26):
            if dx * dx + dy * dy > 625: continue
            v = lay(sx + dx, sy + dy).mean() - 0.0004 * (dx * dx + dy * dy)
            if v > best[0]: best = (v, dx, dy)
    v, dx, dy = best
    x = x + dx; y = y + dy
    # chia dày mỗi 10 m rồi nhích vuông góc từng điểm vào giữa lòng đường; độ nhích làm mượt dọc đường (khỏi méo)
    L = np.r_[0, np.cumsum(np.hypot(np.diff(x), np.diff(y)))]
    s = np.linspace(0, L[-1], max(2, int(L[-1] / 5) + 1)); x = np.interp(s, L, x); y = np.interp(s, L, y)
    n = len(x); off = np.zeros(n); NX = np.zeros(n); NY = np.zeros(n)
    for i in range(n):
        j0, j1 = max(0, i - 2), min(n - 1, i + 2)
        tx, ty = x[j1] - x[j0], y[j1] - y[j0]; l = math.hypot(tx, ty) or 1; NX[i], NY[i] = -ty / l, tx / l
        ks = np.arange(-11, 11.5, 0.5); vs = lay(x[i] + ks * NX[i], y[i] + ks * NY[i]) - 0.0006 * ks * ks
        off[i] = ks[int(np.argmax(vs))]
    if n >= 5: off = ndi.gaussian_filter1d(ndi.median_filter(off, 5, mode='nearest'), 2.0, mode='nearest')
    x = x + off * NX; y = y + off * NY
    L2 = np.r_[0, np.cumsum(np.hypot(np.diff(x), np.diff(y)))]
    s2 = np.arange(0, L2[-1], 3.0); moi_d = lay(np.interp(s2, L2, x), np.interp(s2, L2, y)).mean()
    if moi_d < goc_d + 0.01:
        x, y = xy(P[:, 0], P[:, 1]); moi_d = goc_d
    # cắt bỏ khúc chữ nằm trên khối nhà (anh Kha 27/11 "có chỗ tên đường còn nằm trong nhà"): đo mỗi 1,5 m,
    # khúc ngoài lòng đường dài hơn 6 m thì cắt; chỉ giữ khúc trên đường dài ≥ 50 m
    L3 = np.r_[0, np.cumsum(np.hypot(np.diff(x), np.diff(y)))]
    s3 = np.arange(0, L3[-1] + 0.01, 0.75); tr = ndi.map_coordinates(duong_n, [np.interp(s3, L3, y), np.interp(s3, L3, x)], order=0) > 0
    ngoai = ~tr; khuc = []; bd = None; lo_ngoai = 0
    for k in range(len(s3)):
        if tr[k]:
            if bd is None: bd = k
            lo_ngoai = 0; kt = k
        elif bd is not None:
            lo_ngoai += 1
            if lo_ngoai > 10: khuc.append((bd, kt)); bd = None; lo_ngoai = 0
    if bd is not None: khuc.append((bd, kt))
    ra = []
    for k0, k1 in khuc:
        a0, a1 = s3[k0], s3[k1]
        if (a1 - a0) * M < 40: continue
        sel = (L3 > a0) & (L3 < a1)
        xx = np.r_[np.interp(a0, L3, x), x[sel], np.interp(a1, L3, x)]; yy = np.r_[np.interp(a0, L3, y), y[sel], np.interp(a1, L3, y)]
        q = rdp(np.c_[xx, yy], 0.6)
        # cắt ở chỗ cua gắt (> 30°) — chữ chạy qua vòng xoay, góc phố bị gập méo (anh Kha 27/11 "lệch và méo")
        manh = [[q[0]]]
        for k in range(1, len(q)):
            if k >= 2:
                v1 = q[k - 1] - q[k - 2]; v2 = q[k] - q[k - 1]
                g = abs(math.degrees(math.atan2(v1[0] * v2[1] - v1[1] * v2[0], v1 @ v2)))
                if g > 30: manh.append([q[k - 1]])
            manh[-1].append(q[k])
        for mm in manh:
            mm = np.array(mm)
            if len(mm) < 2 or np.hypot(*np.diff(mm, axis=0).T).sum() * M < 40: continue
            lon, lat = ll(mm[:, 0], mm[:, 1])
            ra.append([[round(float(p), 6), round(float(t), 6)] for p, t in zip(lon, lat)])
    return ra, goc_d, moi_d

def rdp(P, eps):                              # bớt điểm thừa (Douglas–Peucker), eps tính bằng điểm ảnh 2 m
    if len(P) < 3: return P
    a, b = P[0], P[-1]; ab = b - a; l = np.hypot(*ab) or 1
    dd = np.abs(ab[0] * (P[:, 1] - a[1]) - ab[1] * (P[:, 0] - a[0])) / l
    i = int(np.argmax(dd))
    if dd[i] > eps: return np.vstack([rdp(P[:i + 1], eps)[:-1], rdp(P[i:], eps)])
    return np.vstack([a, b])

moi = []; truoc = []; sau = []; mat = 0
for r in goc:
    ds, g, m = doi(r['pts']); truoc.append(g); sau.append(m)
    if not ds:                               # không khúc nào nằm trên lòng đường: giữ để tìm được, nhưng không in chữ (an)
        mat += 1; q = dict(r); q['an'] = 1; moi.append(q)
    for p in ds: q = dict(r); q['pts'] = p; moi.append(q)
d['ten_duong'] = moi
print('độ giữa lòng đường: trước %.2f → sau %.2f; %d khúc gốc → %d khúc đặt chữ; %d khúc bỏ hẳn (không có khúc nào trên đường)' % (np.mean(truoc), np.mean(sau), len(goc), len(moi), mat))
json.dump(d, open(F, 'w'), ensure_ascii=False, separators=(',', ':'))
if len(sys.argv) > 1:                        # ảnh kiểm tra: khu trung tâm, đỏ = chỗ cũ, xanh = chỗ mới
    from PIL import ImageDraw
    x0, y0 = xy(106.690, 10.786); x1, y1 = xy(106.708, 10.768)
    c = nen.crop((int(x0), int(y0), int(x1), int(y1))); dr = ImageDraw.Draw(c)
    for pts, col in [(r['pts'], (220, 0, 0)) for r in goc] + [(q['pts'], (0, 90, 255)) for q in moi]:
        if True:
            P = np.array(pts); X, Y = xy(P[:, 0], P[:, 1])
            dr.line(list(zip(X - int(x0), Y - int(y0))), fill=col, width=2)
    c.save(sys.argv[1])
