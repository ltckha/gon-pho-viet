"""Nắn từng ô tranh Spark Sài Gòn 1961 cho khớp BẢN QUÉT GỐC (anh Kha 27–28/11 "bản đồ ráp còn lệch").
Spark vẽ lại mỗi ô hơi xê dịch, co giãn, xoay so với ảnh gốc → ghép lại thì mép gãy. Cách làm cho mỗi ô:
  1. dựng lại bản quét trong đúng khung ô (theo chỗ đặt hiện có, toạ độ tờ geo.py),
  2. chia ô thành lưới ~80 m, mỗi mảnh dò xem lòng đường trong tranh Spark lệch bao nhiêu so với bản quét (±40 m),
  3. lấy các mảnh dò chắc, tìm phép nắn affine (dời + co giãn + xoay + xiên) khớp nhất, bỏ mảnh lệch bất thường,
  4. đặt lại 3 góc ô theo phép nắn đó.
Chạy: python3 tools/sg1961/khop_quet.py <tờ1.jpg> <tờ2.jpg> <thư mục ảnh ô chưa mờ> [thư mục ra ảnh UỐN theo bản quét]
Có thư mục ra: mỗi ô được uốn từng vùng (không chỉ affine) cho khớp bản quét; chỗ đặt giữ theo tờ (anh_nen_theo_to.json).
Đọc/ghi docs/research/sai_gon_1961/anh_nen_truoc_khop.json (chỗ đặt gốc theo tờ quét; bản trước khi nắn lưu ở anh_nen_theo_to.json).
"""
import json, math, os, sys, re
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from skimage.feature import match_template
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from geo import nap
Image.MAX_IMAGE_PIXELS = None

T1, T2, CHUA_MO = sys.argv[1:4]
NAN = sys.argv[4] if len(sys.argv) > 4 else None     # có thì UỐN ảnh từng ô theo bản quét (không chỉ affine), ghi ảnh vào đây
if NAN: os.makedirs(NAN, exist_ok=True)
LUU = 'docs/research/sai_gon_1961/anh_nen_truoc_khop.json'; GOC = 'docs/research/sai_gon_1961/anh_nen_theo_to.json'
if not os.path.exists(GOC): json.dump(json.load(open(LUU)), open(GOC, 'w'), ensure_ascii=False, indent=0)
A = json.load(open(GOC))
G = {1: nap('docs/research/sai_gon_1961/to1_toa_do.json'), 2: nap('docs/research/sai_gon_1961/to2_toa_do.json')}
Q = {1: np.asarray(Image.open(T1).convert('L'), np.float32), 2: np.asarray(Image.open(T2).convert('L'), np.float32)}
N = 600                                         # khung đo: 600×600 (mỗi điểm ~2,8 m)
B, R = 40, 14                                   # mảnh 40 điểm (~110 m), dò ±14 điểm (~40 m)
ket = []
for a in A:
    m = re.search(r't(\d)_x', a['file']); to = int(m.group(1)) if m else 2
    ll2px = G[to][0]
    tt, tp, dt = map(np.array, (a['tt'], a['tp'], a['dt']))
    # bản quét dựng rộng hơn khung ô R điểm mỗi bên (để đo được cả mảnh sát mép ô — chỗ nối với ô bên cạnh)
    uu, vv = np.meshgrid((np.arange(-R, N + R) + 0.5) / N, (np.arange(-R, N + R) + 0.5) / N)
    LL = tt + (tp - tt) * uu[..., None] + (dt - tt) * vv[..., None]
    P = ll2px(LL[..., 0].ravel(), LL[..., 1].ravel())
    quet = ndi.map_coordinates(Q[to], [P[:, 1], P[:, 0]], order=1, cval=0).reshape(N + 2 * R, N + 2 * R)
    sp = Image.open(os.path.join(CHUA_MO, os.path.basename(a['file']))).convert('RGBA').resize((N, N), Image.BILINEAR)
    sp = np.asarray(sp).astype(np.float32)
    co = sp[..., 3] > 200
    g = sp[..., :3].mean(2)
    def net(x):                                  # nét (mép đường, bờ ruộng, sông rạch): độ đổi sáng, làm mịn — dùng được cả vùng ven
        x = ndi.gaussian_filter(x, 1.0); return ndi.gaussian_filter(np.hypot(ndi.sobel(x, 0), ndi.sobel(x, 1)), 1.2)
    fa = net(quet); fb = net(g) * co
    fa = fa / (np.percentile(fa, 95) + 1e-6); fb = fb / (np.percentile(fb[co], 95) + 1e-6) if co.any() else fb
    # fa có lề R: điểm (x, y) của khung ô ứng với fa[y + R, x + R]
    diem = []
    luoi = sorted(set(list(range(0, N - B + 1, B // 2)) + [N - B]))
    for y0 in luoi:
        for x0 in luoi:
            b = fb[y0:y0 + B, x0:x0 + B]
            if not co[y0:y0 + B, x0:x0 + B].all() or b.std() < 0.15: continue
            vung = fa[y0:y0 + B + 2 * R, x0:x0 + B + 2 * R]
            if vung.std() < 0.08: continue
            cc = match_template(vung, b)               # NCC mọi độ dời ±R một lần (nhanh)
            iy, ix = np.unravel_index(np.argmax(cc), cc.shape); best = cc[iy, ix]
            if best < 0.4: continue
            hai = cc.copy(); hai[max(0, iy - 4):iy + 5, max(0, ix - 4):ix + 5] = -1
            if best - hai.max() < 0.05: continue           # đỉnh thứ hai gần bằng (nét lặp) → bỏ
            diem.append((x0 + B / 2, y0 + B / 2, ix - R, iy - R, best))
    D = np.array(diem) if diem else np.zeros((0, 5))
    if len(D) < 8:
        ket.append(dict(a, chac=0)); print(os.path.basename(a['file']), 'ít mảnh dò được (%d) → giữ' % len(D)); continue
    # nắn affine: điểm tranh p → chỗ đúng p + d ;  bình phương tối thiểu có loại ngoại lai
    X = np.c_[D[:, 0], D[:, 1], np.ones(len(D))]; Y = D[:, :2] + D[:, 2:4]; w = D[:, 4]
    keep = np.ones(len(D), bool)
    for _ in range(5):
        M_, *_ = np.linalg.lstsq(X[keep] * w[keep, None], Y[keep] * w[keep, None], rcond=None)
        r = np.hypot(*(X @ M_ - Y).T)
        k2 = r < max(2.5, 2.5 * np.median(r[keep]))
        if (k2 == keep).all(): break
        keep = k2
    goc_lech = np.median(np.hypot(D[:, 2], D[:, 3])) * 1700 / N
    con = np.median(r[keep]) * 1700 / N
    if con > 4 or keep.sum() < 15:              # dò không chắc → giữ chỗ cũ, để khop_o.py khớp theo ô bên cạnh
        if NAN: Image.open(os.path.join(CHUA_MO, os.path.basename(a['file']))).save(os.path.join(NAN, os.path.basename(a['file'])), quality=90)
        ket.append(dict(a, chac=0)); print('%-22s dò không chắc (còn lệch %.1f m, %d mảnh) → giữ' % (os.path.basename(a['file']), con, keep.sum())); continue
    if NAN:
        # trường dời dày: affine + phần dư nội suy mượt (σ ~170 m) từ các mảnh giữ lại; ảnh mới W(q) = Spark(q - d(q))
        gy, gx = np.mgrid[0:N, 0:N].astype(np.float32) + 0.5
        aff = np.stack([gx, gy, np.ones_like(gx)], -1) @ M_ - np.stack([gx, gy], -1)
        res = (Y - X @ M_)[keep]; px_, py_ = D[keep, 0], D[keep, 1]
        acc = np.zeros((N, N, 2), np.float32); wsum = np.zeros((N, N), np.float32)
        ix = np.clip(px_.astype(int), 0, N - 1); iy = np.clip(py_.astype(int), 0, N - 1)
        np.add.at(acc, (iy, ix), res.astype(np.float32)); np.add.at(wsum, (iy, ix), 1)
        sg = 60
        A0 = ndi.gaussian_filter(acc[..., 0], sg); A1 = ndi.gaussian_filter(acc[..., 1], sg); Wg = ndi.gaussian_filter(wsum, sg)
        tin = np.clip(Wg / (Wg.max() * 0.15 + 1e-9), 0, 1)       # tin cậy: xa chỗ đo thì phần dư → 0
        R0 = np.where(Wg > 1e-9, A0 / np.maximum(Wg, 1e-9), 0) * tin; R1 = np.where(Wg > 1e-9, A1 / np.maximum(Wg, 1e-9), 0) * tin
        dfield = aff + np.stack([R0, R1], -1)                    # điểm ảnh trên khung N
        im = Image.open(os.path.join(CHUA_MO, os.path.basename(a['file']))).convert('RGBA'); w, h = im.size
        sx, sy = w / N, h / N
        dfx = ndi.zoom(dfield[..., 0], (h / N, w / N), order=1) * sx; dfy = ndi.zoom(dfield[..., 1], (h / N, w / N), order=1) * sy
        qy, qx = np.mgrid[0:h, 0:w].astype(np.float32)
        arr = np.asarray(im).astype(np.float32); out = np.zeros_like(arr)
        for ch in range(4):
            out[..., ch] = ndi.map_coordinates(arr[..., ch], [qy - dfy, qx - dfx], order=1, cval=0)
        Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), 'RGBA').save(os.path.join(NAN, os.path.basename(a['file'])), quality=90)
        ket.append(dict(a, chac=1)); print('%-22s %3d mảnh (giữ %3d)  lệch: trước %.1f m → affine %.1f m → uốn' % (os.path.basename(a['file']), len(D), keep.sum(), goc_lech, con)); continue
    f = lambda u, v: (np.array([u * N, v * N, 1.0]) @ M_) / N
    def dat(u, v):
        U, V = f(u, v); return tt + (tp - tt) * U + (dt - tt) * V
    b2 = dict(a, chac=1); b2['tt'] = [round(float(x), 7) for x in dat(0, 0)]; b2['tp'] = [round(float(x), 7) for x in dat(1, 0)]; b2['dt'] = [round(float(x), 7) for x in dat(0, 1)]
    ket.append(b2)
    print('%-22s %3d mảnh (giữ %3d)  lệch với bản quét: trước %.1f m → sau %.1f m' % (os.path.basename(a['file']), len(D), keep.sum(), goc_lech, con))
json.dump(ket, open(LUU, 'w'), ensure_ascii=False, indent=0)
