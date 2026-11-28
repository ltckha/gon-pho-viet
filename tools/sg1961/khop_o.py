"""Khớp mép các ô tranh Spark Sài Gòn 1961 với nhau (anh Kha 27/11: "bản đồ ráp còn lệch").
Mỗi ô đặt theo toạ độ tờ quét, nhưng Spark vẽ lại mỗi ô hơi xê dịch → chỗ hai ô chồng mép, đường bị gãy.
Cách làm: dựng từng ô lên lưới 2 m, đo độ lệch (dx, dy) của mọi cặp ô chồng mép bằng cách dò lòng đường trùng nhau nhiều nhất,
rồi tìm cho mỗi ô một độ dời nhỏ sao cho các cặp khớp nhau (bình phương tối thiểu, kéo nhẹ về chỗ cũ để cả tấm không trôi).
Chạy: python3 tools/sg1961/khop_o.py <thư mục ảnh ô chưa mờ>   (sửa tt/tp/dt trong data/sai-gon/1961.json; bản cũ lưu ở docs/research/sai_gon_1961/anh_nen_truoc_khop.json)
"""
import json, math, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

F = 'data/sai-gon/1961.json'; M = 2.0
d = json.load(open(F))
LUU = 'docs/research/sai_gon_1961/anh_nen_truoc_khop.json'     # chỗ đặt gốc theo tờ quét (chạy lại luôn tính từ đây)
if not os.path.exists(LUU): json.dump(d['anh_nen'], open(LUU, 'w'), ensure_ascii=False, indent=0)
CHUA_MO = sys.argv[1] if len(sys.argv) > 1 else None   # thư mục ảnh ô CHƯA làm mờ mép (mép mờ làm hụt vùng chồng)
KIEM = os.environ.get('KIEM')                  # KIEM=1: chỉ đo mép theo chỗ đặt hiện tại, không sửa
A = d['anh_nen'] if KIEM else json.load(open(LUU))
d['anh_nen'] = A
KX = 111320 * math.cos(math.radians(10.76)); KY = 110574
lo0 = min(min(a['tt'][0], a['dt'][0]) for a in A) - 0.002; la0 = max(max(a['tt'][1], a['tp'][1]) for a in A) + 0.002
def xy(lon, lat): return (lon - lo0) * KX / M, (la0 - lat) * KY / M

def do_cap(A):
    O = []
    for a in A:
        im = Image.open(os.path.join(CHUA_MO, os.path.basename(a['file'])) if CHUA_MO else a['file']).convert('RGBA'); w, h = im.size
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
    
    R_ = 16; cap = []                              # dò ±16 điểm (±32 m)
    for o in O:                                     # đệm R_ quanh mỗi ô để dời được cả ở mép chồng hẹp
        o['fp'] = np.pad(o['f'], R_); o['op'] = np.pad(o['ok'], R_)
    for i in range(len(O)):
        for j in range(i + 1, len(O)):
            a, b = O[i], O[j]
            x0, y0 = max(a['x'], b['x']), max(a['y'], b['y']); x1, y1 = min(a['x'] + a['W'], b['x'] + b['W']), min(a['y'] + a['H'], b['y'] + b['H'])
            if x1 - x0 < 20 or y1 - y0 < 20: continue
            ax, ay, bx, by = x0 - a['x'] + R_, y0 - a['y'] + R_, x0 - b['x'] + R_, y0 - b['y'] + R_
            w_, h_ = x1 - x0, y1 - y0
            fa = a['fp'][ay:ay + h_, ax:ax + w_]; oa = a['op'][ay:ay + h_, ax:ax + w_]
            if oa.sum() < 2500: continue
            best = None; ccs = []
            for dy in range(-R_, R_ + 1):
                for dx in range(-R_, R_ + 1):
                    fb = b['fp'][by + dy:by + dy + h_, bx + dx:bx + dx + w_]; ob = b['op'][by + dy:by + dy + h_, bx + dx:bx + dx + w_]
                    m = oa & ob
                    if m.sum() < 2500: continue
                    u, v = fa[m], fb[m]
                    u = u - u.mean(); v = v - v.mean(); s_ = math.sqrt((u * u).sum() * (v * v).sum()) or 1
                    cc = (u * v).sum() / s_; ccs.append(cc)
                    if best is None or cc > best[0]: best = (cc, dx, dy, int(m.sum()))
            if not best: continue
            noi = best[0] - np.percentile(ccs, 90)       # đỉnh có nổi bật không (vùng trơn / lưới lặp thì không)
            if KIEM:
                if best[0] > 0.3: cap.append((i, j, best[1], best[2], best[0], best[3], noi))
                continue
            if best[0] >= 0.5 and noi >= 0.08:
                cap.append((i, j, best[1], best[2], best[0], best[3], noi))
    return O, cap

VONG = 1 if KIEM else 4
for vong in range(VONG):
    O, cap = do_cap(A)
    print(len(cap), 'cặp chồng mép đo được')
    if KIEM:
        L = sorted(((math.hypot(dx, dy) * M, A[i]['file'][14:-5], A[j]['file'][14:-5], cc, nm, noi) for i, j, dx, dy, cc, nm, noi in cap), reverse=True)
        print('lệch mép: trung vị %.1f m; ≤2 m: %d/%d; >5 m: %d' % (np.median([l[0] for l in L]), sum(l[0] <= 2 for l in L), len(L), sum(l[0] > 5 for l in L)))
        for l in L[:15]: print('  %.0f m  %s × %s  (độ khớp %.2f, %d điểm, nổi %.2f)' % l)
        sys.exit()
    # nội dung ô j tại (P+dx) trùng nội dung ô i tại P → ô j cần dời (-dx, -dy) so với ô i: t_j - t_i = -(dx,dy)
    n = len(O); rows = []; rhs_x = []; rhs_y = []; wts = []
    for i, j, dx, dy, cc, nm, noi in cap:
        r = np.zeros(n); r[j] = 1; r[i] = -1; w_ = cc * math.sqrt(nm / 3000)
        rows.append(r * w_); rhs_x.append(-dx * w_); rhs_y.append(-dy * w_)
    for k in range(n):                             # kéo về chỗ cũ: ô đã nắn theo bản quét (chac) neo chặt, ô khác neo lỏng
        r = np.zeros(n); r[k] = 0.5 if A[k].get('chac') else 0.05; rows.append(r); rhs_x.append(0); rhs_y.append(0)
    Am = np.array(rows); tx = np.linalg.lstsq(Am, np.array(rhs_x), rcond=None)[0]; ty = np.linalg.lstsq(Am, np.array(rhs_y), rcond=None)[0]
    du = [math.hypot((tx[j] - tx[i]) + dx, (ty[j] - ty[i]) + dy) * M for i, j, dx, dy, cc, nm, noi in cap]
    truoc = [math.hypot(dx, dy) * M for i, j, dx, dy, cc, nm, noi in cap]
    print('lệch mép trước: trung vị %.1f m, lớn nhất %.1f m → sau: trung vị %.1f m, lớn nhất %.1f m' % (np.median(truoc), max(truoc), np.median(du), max(du)))
    print('ô dời nhiều nhất %.1f m' % (max(np.hypot(tx, ty)) * M))
    for (i, j, dx, dy, cc, nm, noi), e, t0 in zip(cap, du, truoc):
        if e > 6 or t0 > 10: print('  cặp', A[i]['file'][14:-5], A[j]['file'][14:-5], 'đo lệch %.0f m (độ khớp %.2f, %d điểm) còn %.1f m' % (t0, cc, nm, e))
    for k in np.argsort(-np.hypot(tx, ty))[:5]: print('  ô dời', A[k]['file'][14:-5], '%.1f m' % (math.hypot(tx[k], ty[k]) * M))
    for k, a in enumerate(A):
        dlon = tx[k] * M / KX; dlat = -ty[k] * M / KY
        for key in ('tt', 'tp', 'dt'):
            a[key] = [round(a[key][0] + dlon, 7), round(a[key][1] + dlat, 7)]
for a in A: a.pop('chac', None)
if not KIEM: json.dump(d, open(F, 'w'), ensure_ascii=False, separators=(',', ':'))
    