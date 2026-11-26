"""Làm gọn bản đồ Đà Lạt 1963 cho dễ nhìn — hai cách đang thử (anh Kha so sánh), cùng vùng với tools/nen_1963.py.

Bản đồ AMS in mỗi thứ một màu, nên tách theo màu được:
  đen = đường, nhà, chữ · nâu = đường đồng mức · xanh lá = cây · xanh xám chấm = mặt hồ · xanh đậm = bờ hồ, chữ hồ · đỏ = đường lớn, số.

Cách 1 ("gon"): giữ nét in gốc, bỏ đường đồng mức, lưới toạ độ 1 km, vòng số; cây và hồ thành mảng màu phẳng nhạt.
Cách 2 ("ve"): vẽ lại phẳng: nền giấy, mảng cây, mặt hồ, khối nhà (lấy từ chỗ đen đặc); đường KHÔNG lấy từ ảnh mà
  app.js vẽ bằng nét: những đường OpenStreetMap hôm nay đã có trên bản 1963 (dò tự động: hai mép đen song song dọc đường).

Chạy (sau nen_1963.py, cùng khung):
  python3 -I tools/lam_gon_1963.py <L909XDALAT_geo.pdf>
Ra: assets/1963/<ten>_gon.webp, assets/1963/<ten>_ve.webp; thêm vào data/lam-dong/da-lat/nen_1963.json: anh_gon, anh_ve, duong_cu (id đường OSM).
"""
import json, math, os, subprocess, sys, tempfile

import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ban_do_1963 as B  # noqa: E402

ROOT = os.path.join(HERE, '..')
DPI = 200


def hex2(c):
    return np.array([int(c[i:i + 2], 16) for i in (1, 3, 5)], np.uint8)


def morph(m, k, op):   # op 'max' = nở, 'min' = co (bộ lọc vuông k×k của PIL)
    im = Image.fromarray(m.astype(np.uint8) * 255)
    im = im.filter(ImageFilter.MaxFilter(k) if op == 'max' else ImageFilter.MinFilter(k))
    return np.asarray(im) > 127


def close(m, k):
    return morph(morph(m, k, 'max'), k, 'min')


def open_(m, k):
    return morph(morph(m, k, 'min'), k, 'max')


def smooth(m, r):
    im = Image.fromarray(m.astype(np.uint8) * 255).filter(ImageFilter.GaussianBlur(r))
    return np.asarray(im) > 127


def main(pdf):
    meta_p = os.path.join(ROOT, 'data/lam-dong/da-lat/nen_1963.json')
    meta = json.load(open(meta_p, encoding='utf-8'))
    lon0, lat0, lon1, lat1 = meta['khung']
    ten = os.path.splitext(os.path.basename(meta['anh']))[0]
    pts = [B.wgs_to_px(lo, la, DPI) for lo in (lon0, lon1) for la in (lat0, lat1)]
    X0, X1 = int(min(p[0] for p in pts)), int(max(p[0] for p in pts))
    Y0, Y1 = int(min(p[1] for p in pts)), int(max(p[1] for p in pts))
    with tempfile.TemporaryDirectory() as t:
        subprocess.run(['pdftoppm', '-r', str(DPI), '-png', '-x', str(X0), '-y', str(Y0), '-W', str(X1 - X0), '-H', str(Y1 - Y0),
                        pdf, os.path.join(t, 'c')], check=True)
        im = Image.open(os.path.join(t, os.listdir(t)[0])).convert('RGB')
    if im.size != (meta['w'], meta['h']):
        sys.exit('Khung khác nen_1963.json — chạy lại nen_1963.py cùng dpi %d' % DPI)
    a = np.asarray(im).astype(np.int16)
    R, G, Bl = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(2), a.min(2); sat = mx - mn
    dark = (mx < 120) & (sat < 60)
    blue_ink = (Bl > R + 40) & (Bl > G + 10) & (mx < 200)
    red = (R > 150) & (R - G > 70) & (R - Bl > 60)
    green = (G > R + 12) & (G >= Bl) & ~dark
    water = (Bl >= R + 4) & (sat < 40) & (mx > 150) & (mx < 235) & ~blue_ink
    H, W = dark.shape

    # lưới toạ độ 1 km: vẽ lại đúng vị trí từng đường lưới rồi xoá nét đen trong ±2 điểm
    grid = np.zeros_like(dark)
    yy, xx = np.mgrid[0:H, 0:W]

    def px_of(E, N):
        x, y = B.utm_to_pdf(E, N)
        return x * DPI / 72 - X0, (B.PAGE_H - y) * DPI / 72 - Y0
    E0, N0 = B.pdf_to_utm(X0 * 72 / DPI, B.PAGE_H - Y1 * 72 / DPI)
    E1, N1 = B.pdf_to_utm(X1 * 72 / DPI, B.PAGE_H - Y0 * 72 / DPI)
    for E in range(int(E0 // 1000) * 1000, int(E1) + 1000, 1000):
        (xa, ya), (xb, yb) = px_of(E, N0 - 2000), px_of(E, N1 + 2000)
        d = np.abs((xb - xa) * (ya - yy) - (xa - xx) * (yb - ya)) / math.hypot(xb - xa, yb - ya)
        grid |= d < 2.2
    for N in range(int(N0 // 1000) * 1000, int(N1) + 1000, 1000):
        (xa, ya), (xb, yb) = px_of(E0 - 2000, N), px_of(E1 + 2000, N)
        d = np.abs((xb - xa) * (ya - yy) - (xa - xx) * (yb - ya)) / math.hypot(xb - xa, yb - ya)
        grid |= d < 2.2

    # vòng số (đường kính ~27 điểm ở 200 dpi): vành đen, sát trong và sát ngoài vành phải sáng, giữa có chữ số
    Dk = ((mx < 140) & (sat < 70)).astype(np.float32)
    F = np.fft.rfft2(Dk)
    ky, kx = np.mgrid[-20:21, -20:21]
    rr = np.hypot(ky, kx)

    def conv(k):
        s_ = np.fft.irfft2(F * np.fft.rfft2(k[::-1, ::-1].astype(np.float32), s=Dk.shape), s=Dk.shape)
        return np.roll(s_, (-20, -20), (0, 1)) / k.sum()
    score = None
    for r0 in (12.5, 13, 13.5, 14):
        sc = conv((rr > r0 - 1.2) & (rr < r0 + 1.2)) - conv((rr > r0 - 4) & (rr < r0 - 2)) - 0.6 * conv((rr > r0 + 2) & (rr < r0 + 4.5))
        score = sc if score is None else np.maximum(score, sc)
    giua = conv(rr < 8)
    ok = (score > 0.4) | ((score > 0.28) & (giua > 0.08) & (giua < 0.45))
    keep = []
    for y, x in sorted(zip(*np.nonzero(ok)), key=lambda q: -score[q]):
        if all((y - p) ** 2 + (x - q) ** 2 > 500 for p, q in keep):
            keep.append((y, x))
    circ = np.zeros_like(dark)
    for y, x in keep:
        circ |= (yy - y) ** 2 + (xx - x) ** 2 < 16 ** 2
    print('vòng số tìm được:', len(keep))

    green_area = smooth(close(green, 9), 3)
    # mặt hồ: chỉ nơi chấm xanh xám dày đặc (bỏ đốm lẻ ở khu nhà)
    day = np.asarray(Image.fromarray(water.astype(np.uint8) * 255).filter(ImageFilter.GaussianBlur(6))) > 90
    water_area = smooth(close(day, 9), 2)

    # ---- cách 1: nét gốc, bỏ rối ----
    out = np.empty((H, W, 3), np.uint8); out[:] = hex2('#f7f3e8')
    out[green_area] = hex2('#dcebc9')
    out[water_area] = hex2('#bcdbe6')
    out[red & ~circ] = hex2('#c7604f')
    ink = dark & ~grid & ~circ
    out[ink] = hex2('#3a3128')
    out[blue_ink & ~grid] = hex2('#3f6f93')
    p1 = os.path.join('assets', '1963', ten + '_gon.webp')
    Image.fromarray(out).save(os.path.join(ROOT, p1), 'WEBP', quality=80, method=6)

    # ---- cách 2: vẽ lại phẳng (đường do app.js vẽ bằng nét) ----
    nha = open_(dark & ~grid & ~circ, 3)                       # chỉ chỗ đen đặc ≥ 3 điểm: khối nhà, bỏ nét mảnh và chữ
    out2 = np.empty((H, W, 3), np.uint8); out2[:] = hex2('#f4efe2')
    out2[smooth(close(green, 15), 5)] = hex2('#cfe3b5')
    wa = smooth(close(day, 13), 3)
    out2[wa] = hex2('#a9d3e3')
    edge = wa & ~morph(wa, 3, 'min')
    out2[edge] = hex2('#6fa9c0')
    out2[nha] = hex2('#9b7a58')
    p2 = os.path.join('assets', '1963', ten + '_ve.webp')
    Image.fromarray(out2).save(os.path.join(ROOT, p2), 'WEBP', quality=82, method=6)

    # ---- đường hôm nay đã có năm 1963: hai mép đen song song dọc theo đường ----
    duong = json.load(open(os.path.join(ROOT, 'data/lam-dong/da-lat/duong.json'), encoding='utf-8'))
    near = morph(dark & ~grid, 3, 'max')
    cu = []
    for r in duong['duong']:
        P = [px_of(*B.wgs_to_utm(lo, la)) for lo, la in r['pts']]
        if not any(0 <= x < W and 0 <= y < H for x, y in P):
            continue
        ok = tot = 0
        for (xa, ya), (xb, yb) in zip(P, P[1:]):
            L = math.hypot(xb - xa, yb - ya)
            if L < 1:
                continue
            nx, ny = -(yb - ya) / L, (xb - xa) / L
            for k in range(0, int(L), 4):
                x, y = xa + (xb - xa) * k / L, ya + (yb - ya) * k / L
                if not (12 <= x < W - 12 and 12 <= y < H - 12):
                    continue
                tot += 1
                side = []
                for sgn in (1, -1):
                    side.append(any(near[int(round(y + sgn * ny * d)), int(round(x + sgn * nx * d))] for d in range(2, 11)))
                if all(side):
                    ok += 1
        if tot >= 6 and ok / tot >= 0.6:
            cu.append(r['id'])
    print('đường hôm nay có trên bản 1963 (trong khung):', len(cu))

    meta.update({'anh_gon': p1, 'anh_ve': p2, 'duong_cu': cu})
    json.dump(meta, open(meta_p, 'w', encoding='utf-8'), ensure_ascii=False)
    for p in (p1, p2):
        print(p, os.path.getsize(os.path.join(ROOT, p)) // 1024, 'KB')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1])
