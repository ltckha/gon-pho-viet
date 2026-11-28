"""Tự kiểm mép nối Sài Gòn 1961: đo đúng chỗ MẮT THẤY — dọc mép của ô nằm trên (chỗ nó đè lên ô nằm dưới), mỗi ~150 m một khúc,
dò xem nét (đường, bờ ruộng, sông) hai ô lệch nhau bao nhiêu. Chạy: python3 tools/sg1961/kiem_mep.py <ảnh ô chưa mờ> [ảnh.png]
In: số khúc mép, trung vị, bao nhiêu khúc lệch > 4 m, và các khúc lệch nhất (vị trí kinh/vĩ độ)."""
import json, math, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
CHUA_MO = sys.argv[1]; M = 2.0
d = json.load(open(os.environ.get('DATA', 'data/sai-gon/1961.json'))); A = d['anh_nen']
KX = 111320 * math.cos(math.radians(10.76)); KY = 110574
lo0 = min(min(a['tt'][0], a['dt'][0]) for a in A) - 0.004; la0 = max(max(a['tt'][1], a['tp'][1]) for a in A) + 0.004
def xy(lon, lat): return np.array([(lon - lo0) * KX / M, (la0 - lat) * KY / M])
def ll(x, y): return lo0 + x * M / KX, la0 - y * M / KY
O = []
for a in A:
    im = Image.open(os.path.join(CHUA_MO, os.path.basename(a['file']))).convert('RGBA'); w, h = im.size
    p0, p1, p2 = xy(*a['tt']), xy(*a['tp']), xy(*a['dt']); p3 = p1 + p2 - p0
    b0 = np.floor(np.min([p0, p1, p2, p3], 0)).astype(int) - 25; b1 = np.ceil(np.max([p0, p1, p2, p3], 0)).astype(int) + 25
    W, H = b1 - b0; q0 = p0 - b0; Ti = np.linalg.inv(np.c_[p1 - p0, p2 - p0])
    c = [Ti[0, 0] * w, Ti[0, 1] * w, -(Ti[0] @ q0) * w, Ti[1, 0] * h, Ti[1, 1] * h, -(Ti[1] @ q0) * h]
    t = np.asarray(im.transform((int(W), int(H)), Image.AFFINE, c, resample=Image.BILINEAR)).astype(np.float32)
    g = ndi.gaussian_filter(t[..., :3].mean(2), 1.0); f = ndi.gaussian_filter(np.hypot(ndi.sobel(g, 0), ndi.sobel(g, 1)), 1.0)
    ok = ndi.binary_erosion(t[..., 3] > 200, iterations=2)
    O.append(dict(b0=b0, f=f, ok=ok, p0=p0, p1=p1, p2=p2, Ti=Ti))
def trong(o, P):
    u, v = o['Ti'] @ (P - o['p0']); return 0.005 < u < 0.995 and 0.005 < v < 0.995
def lay(o, x0, y0, n):
    X, Y = x0 - o['b0'][0], y0 - o['b0'][1]
    if X < 0 or Y < 0 or X + n > o['f'].shape[1] or Y + n > o['f'].shape[0]: return None, None
    return o['f'][Y:Y + n, X:X + n], o['ok'][Y:Y + n, X:X + n]
R, NB = 10, 36                                   # dò ±10 điểm (±20 m), hộp 36 điểm (~72 m)
kq = []
for k, o in enumerate(O):
    for (pa, pb) in ((o['p0'], o['p1']), (o['p0'], o['p2']), (o['p1'], o['p1'] + o['p2'] - o['p0']), (o['p2'], o['p1'] + o['p2'] - o['p0'])):
        L = np.hypot(*(pb - pa)); nn = max(1, int(L * M / 150))
        tam = (o['p1'] + o['p2']) / 2 - 0  # tâm ô
        tam = (o['p0'] + o['p1'] + o['p2'] + (o['p1'] + o['p2'] - o['p0'])) / 4
        for s in (np.arange(nn) + 0.5) / nn:
            E = pa + (pb - pa) * s; vin = tam - E; vin = vin / np.hypot(*vin)
            P = E + vin * 24                       # điểm ngay trong mép ô trên (~48 m; hộp đo 72 m chạm mép)
            duoi = [j for j in range(k) if trong(O[j], P)]
            if not duoi or not trong(o, P): continue
            if any(trong(O[j], P) for j in range(k + 1, len(O))): continue   # chỗ này bị ô khác đè lên → không thấy
            j = duoi[-1]; x0, y0 = int(P[0] - NB / 2), int(P[1] - NB / 2)
            fa, oa = lay(o, x0, y0, NB)
            if fa is None or not oa.all() or fa.std() < 3: continue
            best = None; ccs = []
            for dy in range(-R, R + 1):
                for dx in range(-R, R + 1):
                    fb, ob = lay(O[j], x0 + dx, y0 + dy, NB)
                    if fb is None or not ob.all() or fb.std() < 3: continue
                    u = fa - fa.mean(); v = fb - fb.mean(); cc = (u * v).sum() / math.sqrt((u * u).sum() * (v * v).sum())
                    ccs.append((cc, dx, dy))
                    if best is None or cc > best[0]: best = (cc, dx, dy)
            if not best or best[0] < 0.4: continue
            hai = max([c for c, a_, b_ in ccs if max(abs(a_ - best[1]), abs(b_ - best[2])) >= 5] or [0])
            if best[0] - hai < 0.05: continue           # đỉnh thứ hai gần bằng (nét lặp lại) → đo không chắc, bỏ
            kq.append((math.hypot(best[1], best[2]) * M, best[1], best[2], k, j, *ll(*P)))
kq.sort(reverse=True)
e = np.array([r[0] for r in kq])
print('khúc mép đo được %d; lệch trung vị %.1f m; ≤ 2 m: %d; > 4 m: %d; > 8 m: %d' % (len(e), np.median(e), (e <= 2).sum(), (e > 4).sum(), (e > 8).sum()))
for r in kq[:12]: print('  %.0f m  %s trên %s  (%.5f, %.5f)' % (r[0], A[r[3]]['file'][14:-5], A[r[4]]['file'][14:-5], r[5], r[6]))
json.dump([[r[0], r[3], r[4], r[1], r[2], r[5], r[6]] for r in kq], open(os.environ.get('KQ', '/dev/null'), 'w'))
