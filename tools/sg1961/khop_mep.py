"""Gọt mép lần cuối: dùng chính số đo của kiem_mep.py (lệch ở chỗ mắt thấy) để dời nhẹ từng ô (dời + co giãn nhẹ, affine),
lặp vài vòng tới khi hết lệch. Ô đã khớp bản quét (khop_quet.py) được neo để cả tấm không trôi khỏi toạ độ thật.
Chạy: python3 tools/sg1961/khop_mep.py <ảnh ô chưa mờ> [số vòng=3]"""
import json, math, os, sys, subprocess
import numpy as np
CHUA_MO = sys.argv[1]; VONG = int(sys.argv[2]) if len(sys.argv) > 2 else 3
F = 'data/sai-gon/1961.json'; M = 2.0
KX = 111320 * math.cos(math.radians(10.76)); KY = 110574
for vong in range(VONG):
    out = subprocess.run([sys.executable, 'tools/sg1961/kiem_mep.py', CHUA_MO], capture_output=True, text=True,
                         env=dict(os.environ, KQ='/tmp/_kq_mep.json')).stdout
    print('vòng %d:' % vong, out.splitlines()[0] if out else '?')
    kq = json.load(open('/tmp/_kq_mep.json'))
    d = json.load(open(F)); A = d['anh_nen']; n = len(A)
    # ẩn: mỗi ô 6 số (dời lon, dời lat theo mét; 4 hệ số co giãn theo km)
    rows, rhs = [], []
    lo0 = min(a['tt'][0] for a in A); la0 = max(a['tt'][1] for a in A)
    def km(lon, lat): return (lon - lo0) * KX / 1000, (la0 - lat) * KY / 1000
    tam = [km(*(np.array(a['tp']) + np.array(a['dt'])) / 2) for a in A]
    for e, k, j, dx, dy, lon, lat in kq:
        if e > 40: continue
        X, Y = km(lon, lat)
        for comp, val in ((0, dx * M), (1, dy * M)):          # nội dung ô j ở P+d = nội dung ô k ở P → D_k(P) - D_j(P) = d
            r = np.zeros(6 * n)
            for t, s_ in ((k, 1), (j, -1)):
                cx, cy = tam[t]
                r[6 * t + comp] = s_; r[6 * t + 2 + 2 * comp] = s_ * (X - cx); r[6 * t + 3 + 2 * comp] = s_ * (Y - cy)
            rows.append(r); rhs.append(val)
    W = np.ones(len(rows))
    for t in range(n):                                          # neo: dời ít, co giãn rất ít
        for c, w in ((0, 0.15), (1, 0.15), (2, 3), (3, 3), (4, 3), (5, 3)):
            r = np.zeros(6 * n); r[6 * t + c] = w; rows.append(r); rhs.append(0)
    R_ = np.array(rows); b = np.array(rhs); keep = np.ones(len(rows), bool)
    for _ in range(4):
        x, *_ = np.linalg.lstsq(R_[keep], b[keep], rcond=None)
        res = np.abs(R_ @ x - b); res[len(W):] = 0
        k2 = res < 6; k2[len(W):] = True
        if (k2 == keep).all(): break
        keep = k2
    for t, a in enumerate(A):
        cx, cy = tam[t]
        for key in ('tt', 'tp', 'dt'):
            X, Y = km(*a[key])
            ddx = x[6 * t] + x[6 * t + 2] * (X - cx) + x[6 * t + 3] * (Y - cy)
            ddy = x[6 * t + 1] + x[6 * t + 4] * (X - cx) + x[6 * t + 5] * (Y - cy)
            a[key] = [round(a[key][0] + ddx / KX, 7), round(a[key][1] - ddy / KY, 7)]
    json.dump(d, open(F, 'w'), ensure_ascii=False, separators=(',', ':'))
out = subprocess.run([sys.executable, 'tools/sg1961/kiem_mep.py', CHUA_MO], capture_output=True, text=True).stdout
print('sau cùng:', out)
