"""Địa hình và đất đai trên bản đồ Đà Lạt 1963 (anh Kha 27/11: "nhiều chỗ người ta vẽ địa hình hay chia lô… xem ý nghĩa để đưa vô").

Đọc theo bảng chú thích in ở góc phải dưới tờ AMS L909 (xem docs/research/ban_do_1963.md, mục "Ký hiệu"):
  - Vòng nâu = đường đồng mức, cách đều 5 m (mặt chuẩn: mực biển trung bình Hà Tiên)      → dong_muc (đường gấp khúc)
  - Số lẻ "1508,4" cạnh chấm đen = điểm cao độ (mét)                                         → do_cao (docs/research/ams_1963_do_cao.tsv, đọc bằng mắt)
  - Ô kẻ đứt có chấm giữa = Vườn / vườn cây trái ("Jardin, Verger")                          → vuon (vùng)
  - Khung viền ĐỎ mảnh quanh số đỏ = khuôn viên công trình đánh số                           → CHƯA làm (nét đỏ đứt nhiều, xem mục 3)
  - Búi cỏ xanh dương = đầm lầy, đất ngập ven suối                                          → dam (vùng)
Ghi thêm dong_muc, do_cao, vuon, dam vào data/lam-dong/da-lat/1963.json. Chạy SAU tools/dung_1963.py và tools/gan_ten_1963.py.

Chạy: python3 -I tools/dia_hinh_1963.py <L909XDALAT_geo.pdf> [thư_mục_ảnh_soát]
"""
import json, os, subprocess, sys, tempfile, warnings

import numpy as np
from PIL import Image

warnings.filterwarnings('ignore')
from scipy import ndimage as ndi  # noqa: E402
from scipy.spatial import cKDTree  # noqa: E402
from skimage.measure import find_contours, approximate_polygon, label, regionprops  # noqa: E402
from skimage.morphology import binary_closing, remove_small_objects, remove_small_holes, disk, skeletonize  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ban_do_1963 as B  # noqa: E402
from dung_1963 import neatline, DPI  # noqa: E402

ROOT = os.path.join(HERE, '..')
K3 = np.ones((3, 3), np.uint8)


def nhanh(sk, min_len):
    """khung xương → các nhánh (cắt ở ngã ba), mỗi nhánh một dãy điểm (x, y) theo thứ tự"""
    deg = (ndi.convolve(sk.astype(np.uint8), K3, mode='constant') - 1) * sk
    nh = sk & ~ndi.binary_dilation(deg >= 3, np.ones((3, 3), bool))
    lab, _ = ndi.label(nh, np.ones((3, 3)))
    out = []
    for k, sl in enumerate(ndi.find_objects(lab)):
        ys, xs = np.nonzero(lab[sl] == k + 1)
        if len(ys) < min_len:
            continue
        pts = {(int(x) + sl[1].start, int(y) + sl[0].start) for x, y in zip(xs, ys)}
        nb = lambda p: [(p[0] + dx, p[1] + dy) for dx in (-1, 0, 1) for dy in (-1, 0, 1) if (dx or dy) and (p[0] + dx, p[1] + dy) in pts]
        ends = [p for p in pts if len(nb(p)) == 1]
        cur = ends[0] if ends else next(iter(pts)); path = [cur]; seen = {cur}
        while True:
            nx = [q for q in nb(cur) if q not in seen]
            if not nx:
                break
            cur = min(nx, key=lambda q: abs(q[0] - path[-1][0]) + abs(q[1] - path[-1][1])); path.append(cur); seen.add(cur)
        if len(path) >= min_len:
            out.append(np.array(path, float))
    return out


def main(pdf, soat=None):
    nx0, nx1, ny0, ny1 = neatline(pdf)
    X0, X1 = int(nx0 * DPI / 72) + 2, int(nx1 * DPI / 72) - 2
    Y0, Y1 = int((B.PAGE_H - ny1) * DPI / 72) + 2, int((B.PAGE_H - ny0) * DPI / 72) - 2
    with tempfile.TemporaryDirectory() as t:
        subprocess.run(['pdftoppm', '-r', str(DPI), '-png', '-x', str(X0), '-y', str(Y0), '-W', str(X1 - X0), '-H', str(Y1 - Y0),
                        pdf, os.path.join(t, 'c')], check=True)
        im = Image.open(os.path.join(t, os.listdir(t)[0])).convert('RGB')
    a = np.asarray(im).astype(np.int16)
    H, W = a.shape[:2]

    def to_ll(u, v):
        lo, la = B.utm_to_wgs(*B.pdf_to_utm((X0 + u) * 72 / DPI, B.PAGE_H - (Y0 + v) * 72 / DPI))
        return [round(lo, 5), round(la, 5)]

    def to_px(lon, lat):
        x, y = B.wgs_to_px(lon, lat, DPI)
        return x - X0, y - Y0

    def polys(mask, scale, tol, min_pts=4):
        out = []
        for c in find_contours(np.pad(mask, 1).astype(float), 0.5):
            c = approximate_polygon(c - 1, tol)
            if len(c) >= min_pts:
                out.append([to_ll(p[1] * scale, p[0] * scale) for p in c])
        return out

    R, G, Bl = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(2), a.min(2); sat = mx - mn
    dark = (mx < 120) & (sat < 70)
    red = (R > 140) & (R - G > 60) & (R - Bl > 50)
    green = (G > R + 12) & (G >= Bl) & ~((mx < 110) & (sat < 60))
    blue_ink = (Bl > R + 40) & (Bl > G + 10) & (mx < 200)

    # ---------- 1) đường đồng mức: nét nâu (đỏ cam nhạt, không phải đỏ tươi của công trình) ----------
    nau = (R > 140) & (R - Bl > 55) & (G - Bl > 15) & (R - G > 12) & (R - G < 75) & ~red
    nau = remove_small_objects(binary_closing(nau, disk(1)), 25)
    sk = skeletonize(nau)
    dong_muc = []
    for P in nhanh(sk, 40):                   # ≥ 40 điểm ảnh ~ 65 m
        P = approximate_polygon(P, 1.2)
        for _ in range(2):                      # làm mềm (Chaikin) — vòng cao độ in vốn cong đều
            if len(P) < 3:
                break
            Q = [P[0]]
            for a_, b_ in zip(P[:-1], P[1:]):
                Q += [0.75 * a_ + 0.25 * b_, 0.25 * a_ + 0.75 * b_]
            P = np.array(Q + [P[-1]])
        P = approximate_polygon(P, 0.5)
        dong_muc.append([to_ll(x, y) for x, y in P])
    print('đường đồng mức (khúc):', len(dong_muc))

    # ---------- 2) vườn: chấm đen tròn đứng riêng, mọc thành cụm (≥ 5 chấm trong 70 điểm ảnh ~ 110 m), ngoài rừng ----------
    lab = label(dark, connectivity=2)
    cham = []
    for rp in regionprops(lab):
        if not (3 <= rp.area <= 16):
            continue
        hh, ww = rp.bbox[2] - rp.bbox[0], rp.bbox[3] - rp.bbox[1]
        if max(hh, ww) > 5 or min(hh, ww) < 2 or rp.extent < 0.6:
            continue
        y, x = map(int, rp.centroid)
        y0, y1, x0, x1 = max(0, y - 5), y + 6, max(0, x - 5), x + 6
        own = ndi.binary_dilation(lab[y0:y1, x0:x1] == rp.label, iterations=1)
        if (dark[y0:y1, x0:x1] & ~own).sum() > 3:
            continue
        cham.append((x, y))
    P = np.array(cham); tr = cKDTree(P)
    ban = np.array([len(tr.query_ball_point(p, 70)) - 1 for p in P])
    K = P[ban >= 4]
    sc = 4; h4, w4 = H // sc + 1, W // sc + 1
    m = np.zeros((h4, w4), bool)
    m[np.clip(K[:, 1] // sc, 0, h4 - 1), np.clip(K[:, 0] // sc, 0, w4 - 1)] = True
    m = ndi.binary_dilation(m, disk(9))
    gd = np.asarray(Image.fromarray(green.astype(np.uint8) * 255).resize((w4, h4), Image.BOX)).astype(np.float32) / 255
    m &= ndi.gaussian_filter(gd, 3) < 0.12
    xam = (sat < 14) & (mx > 140) & (mx < 215)              # nền xám khu phố (built-up) — chấm ở đây là chữ, ký hiệu, không phải vườn
    xd = np.asarray(Image.fromarray(xam.astype(np.uint8) * 255).resize((w4, h4), Image.BOX)).astype(np.float32) / 255
    m &= ndi.gaussian_filter(xd, 3) < 0.25
    m = remove_small_holes(remove_small_objects(binary_closing(m, disk(4)), 300), 400)
    vuon = polys(m, sc, 1.2)
    print('chấm vườn:', len(P), '→ trong cụm', len(K), ' vùng vườn:', len(vuon))

    # (khung đỏ khuôn viên công trình: thử 3 cách 27/11 — loang vùng, lấp lỗ mạng nét đỏ, gom nét đỏ bao quanh — đều hỏng vì
    #  nét đỏ mảnh bị nhà, mép đường in đè mất từng đoạn dài 50–80 điểm ảnh; để vẽ tay sau, khi bật lại biểu tượng.)
    t63 = json.load(open(os.path.join(ROOT, 'data/lam-dong/da-lat/1963.json'), encoding='utf-8'))
    khuon_vien = []

    # ---------- 4) đầm lầy: búi cỏ xanh dương nhỏ (không phải suối dài), mọc thành cụm ----------
    lb = label(blue_ink, connectivity=2)
    tuft = []
    for rp in regionprops(lb):
        hh, ww = rp.bbox[2] - rp.bbox[0], rp.bbox[3] - rp.bbox[1]
        if 12 <= rp.area <= 140 and max(hh, ww) <= 24 and ww >= hh:
            tuft.append((int(rp.centroid[1]), int(rp.centroid[0])))
    T = np.array(tuft); tt = cKDTree(T)
    nb = np.array([len(tt.query_ball_point(p, 60)) - 1 for p in T])
    T = T[nb >= 3]
    md = np.zeros((h4, w4), bool)
    md[np.clip(T[:, 1] // sc, 0, h4 - 1), np.clip(T[:, 0] // sc, 0, w4 - 1)] = True
    md = ndi.binary_dilation(md, disk(7))
    water = (Bl >= R + 4) & (sat < 40) & (mx > 150) & (mx < 235) & ~blue_ink
    wd = np.asarray(Image.fromarray(water.astype(np.uint8) * 255).resize((w4, h4), Image.BOX)) > 90
    md &= ~ndi.binary_dilation(wd, iterations=2)
    md = remove_small_holes(remove_small_objects(binary_closing(md, disk(3)), 150), 300)
    dam = polys(md, sc, 1.2)
    print('búi cỏ đầm:', len(tuft), '→ trong cụm', len(T), ' vùng đầm:', len(dam))

    # ---------- 5) điểm cao độ (đọc bằng mắt) ----------
    do_cao = []
    for l in open(os.path.join(ROOT, 'docs/research/ams_1963_do_cao.tsv'), encoding='utf-8').read().split('\n')[1:]:
        c = l.split('\t')
        if len(c) >= 3:
            do_cao.append({'m': c[0], 'lon': float(c[1]), 'lat': float(c[2])})
    print('điểm cao độ:', len(do_cao))

    if soat:
        from PIL import ImageDraw
        os.makedirs(soat, exist_ok=True)
        ov = Image.fromarray((np.asarray(im) * 0.5 + 127).astype(np.uint8)); d = ImageDraw.Draw(ov, 'RGBA')
        for p in vuon:
            d.polygon([to_px(*q) for q in p], fill=(255, 0, 255, 50), outline=(255, 0, 255, 255))
        for p in dam:
            d.polygon([to_px(*q) for q in p], fill=(0, 120, 255, 60), outline=(0, 80, 255, 255))
        for p in dong_muc:
            d.line([to_px(*q) for q in p], fill=(140, 70, 0, 255), width=2)
        ov.resize((W // 2, H // 2)).save(os.path.join(soat, 'dia_hinh_soat.png'))

    t63.update({'dong_muc': dong_muc, 'do_cao': do_cao, 'vuon': vuon, 'dam': dam})
    p = os.path.join(ROOT, 'data/lam-dong/da-lat/1963.json')
    json.dump(t63, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(p, os.path.getsize(p) // 1024, 'KB')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
