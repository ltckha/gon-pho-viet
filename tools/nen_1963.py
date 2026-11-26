"""Cắt một vùng bản đồ Đà Lạt 1963 (AMS L909, bản GeoPDF USGS có toạ độ) làm nền cho chế độ "1963 bản gốc".

Ra: assets/1963/<ten>.webp và data/lam-dong/da-lat/nen_1963.json (ảnh + phép đổi điểm ảnh → toạ độ vẽ của app.js).
Phép đổi là affine, tìm bằng bình phương nhỏ nhất trên lưới 15×15 điểm (đổi đúng: điểm PDF → UTM Indian 1960 → WGS84);
vùng vài km nên sai số chỉ dưới 1 m — công cụ in ra để kiểm.

Chạy: python3 -I tools/nen_1963.py <L909XDALAT_geo.pdf> <lon0> <lat0> <lon1> <lat1> [dpi] [ten]
  vd. quanh Hồ Xuân Hương: python3 -I tools/nen_1963.py /tmp/dalat_geo.pdf 108.428 11.930 108.456 11.952 200 ho_xuan_huong
PDF tải ở https://store.usgs.gov/assets/MOD/StoreFiles/NGA/L909XDALAT_geo.pdf (tài liệu chính phủ Mỹ, phạm vi công cộng).
"""
import json, math, os, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ban_do_1963 as B  # noqa: E402

ROOT = os.path.join(HERE, '..')
K, COS, LON0, LAT0 = 100, math.cos(16 * math.pi / 180), 100, 25   # như app.js


def app_xy(lon, lat):
    return (lon - LON0) * K * COS, (LAT0 - lat) * K


def main(pdf, lon0, lat0, lon1, lat1, dpi=200, ten='ho_xuan_huong'):
    from PIL import Image
    pts = [B.wgs_to_px(lo, la, dpi) for lo in (lon0, lon1) for la in (lat0, lat1)]
    X0, X1 = int(min(p[0] for p in pts)), int(max(p[0] for p in pts))
    Y0, Y1 = int(min(p[1] for p in pts)), int(max(p[1] for p in pts))
    with tempfile.TemporaryDirectory() as t:
        subprocess.run(['pdftoppm', '-r', str(dpi), '-png', '-x', str(X0), '-y', str(Y0), '-W', str(X1 - X0), '-H', str(Y1 - Y0),
                        pdf, os.path.join(t, 'c')], check=True)
        im = Image.open(os.path.join(t, os.listdir(t)[0])).convert('RGB')
    os.makedirs(os.path.join(ROOT, 'assets', '1963'), exist_ok=True)
    out = os.path.join('assets', '1963', ten + '.webp')
    im.save(os.path.join(ROOT, out), 'WEBP', quality=72, method=6)
    W, H = im.size
    # affine điểm ảnh (u, v) → toạ độ vẽ (x, y)
    rows, xs, ys = [], [], []
    for i in range(15):
        for j in range(15):
            u, v = W * i / 14, H * j / 14
            xp = (X0 + u) * 72 / dpi
            yp = B.PAGE_H - (Y0 + v) * 72 / dpi
            lon, lat = B.utm_to_wgs(*B.pdf_to_utm(xp, yp))
            x, y = app_xy(lon, lat)
            rows.append((u, v)); xs.append(x); ys.append(y)

    def fit(t):   # giải [u v 1]·c = t bằng phương trình chuẩn 3×3
        A = [[0.0] * 3 for _ in range(3)]; b = [0.0] * 3
        for (u, v), z in zip(rows, t):
            r = (u, v, 1.0)
            for a in range(3):
                b[a] += r[a] * z
                for c in range(3):
                    A[a][c] += r[a] * r[c]
        for c in range(3):           # khử Gauss
            p = max(range(c, 3), key=lambda k: abs(A[k][c])); A[c], A[p] = A[p], A[c]; b[c], b[p] = b[p], b[c]
            for k in range(c + 1, 3):
                f = A[k][c] / A[c][c]
                for m in range(c, 3):
                    A[k][m] -= f * A[c][m]
                b[k] -= f * b[c]
        s = [0.0] * 3
        for c in (2, 1, 0):
            s[c] = (b[c] - sum(A[c][m] * s[m] for m in range(c + 1, 3))) / A[c][c]
        return s
    cx, cy = fit(xs), fit(ys)
    err = max(math.hypot(cx[0] * u + cx[1] * v + cx[2] - x, cy[0] * u + cy[1] * v + cy[2] - y) for (u, v), x, y in zip(rows, xs, ys))
    print('ảnh %s %dx%d, %d KB; sai số lớn nhất %.2f m' % (out, W, H, os.path.getsize(os.path.join(ROOT, out)) // 1024, err / K * 110574))
    meta = {
        'anh': out, 'w': W, 'h': H,
        'matrix': [round(v, 10) for v in (cx[0], cy[0], cx[1], cy[1], cx[2], cy[2])],   # SVG matrix(a b c d e f)
        'khung': [lon0, lat0, lon1, lat1],
        'nguon': 'Bản đồ Đà Lạt 1:12.500, Army Map Service (quân đội Mỹ), loạt L909, ấn bản 1-AMS 1963 — phạm vi công cộng',
    }
    json.dump(meta, open(os.path.join(ROOT, 'data/lam-dong/da-lat/nen_1963.json'), 'w', encoding='utf-8'), ensure_ascii=False)


if __name__ == '__main__':
    a = sys.argv[1:]
    if len(a) < 5:
        sys.exit(__doc__)
    main(a[0], *map(float, a[1:5]), int(a[5]) if len(a) > 5 else 200, a[6] if len(a) > 6 else 'ho_xuan_huong')
