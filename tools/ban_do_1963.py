"""Bản đồ Đà Lạt 1963 (AMS L909, 1:12.500) ↔ toạ độ hôm nay (WGS84).

Bản GeoPDF của USGS mang sẵn phép đổi "điểm trên trang PDF → toạ độ UTM múi 49, hệ Indian 1960 (ING-A)"
(khối /LGIDict trong file). Ở đây đổi tiếp sang WGS84 (hệ của OpenStreetMap) bằng phép dời 3 tham số
của ING-A (198, 881, 317 m — DMA TR 8350.2) trên elipxôít Everest 1830. Không dùng thư viện ngoài.

Dùng:
  python3 -I tools/ban_do_1963.py chong <file.pdf> <lon0> <lat0> <lon1> <lat1> <ra.png> [dpi]
      → cắt vùng đó từ bản 1963, vẽ đè đường OSM hôm nay (đỏ) + tên, để dò số đường bằng mắt.
  python3 -I tools/ban_do_1963.py o <o_luoi>
      → ô lưới 6 số trong bảng chỉ dẫn (vd. 214205) → kinh độ, vĩ độ WGS84 của tâm ô 100 m.
"""
import json, math, os, subprocess, sys, tempfile

# /LGIDict /CTM trong L909XDALAT_geo.pdf: điểm PDF (x, y; gốc dưới trái) → UTM Indian 1960
CTM = (4.425160, -0.054465, 0.059687, 4.414595, 215774.635650, 1317172.153540)
PAGE_W, PAGE_H = 2626.56, 1915.68
EV_A, EV_F = 6377276.345, 1 / 300.8017          # Everest 1830 (1937)
WG_A, WG_F = 6378137.0, 1 / 298.257223563
SHIFT = (198.0, 881.0, 317.0)                   # ING-A → WGS84
CM, K0, FE = 111.0, 0.9996, 500000.0


def _tm_inv(E, N, a, f):
    e2 = f * (2 - f); ep2 = e2 / (1 - e2)
    M = N / K0
    mu = M / (a * (1 - e2 / 4 - 3 * e2 ** 2 / 64 - 5 * e2 ** 3 / 256))
    e1 = (1 - math.sqrt(1 - e2)) / (1 + math.sqrt(1 - e2))
    p = (mu + (3 * e1 / 2 - 27 * e1 ** 3 / 32) * math.sin(2 * mu) + (21 * e1 ** 2 / 16 - 55 * e1 ** 4 / 32) * math.sin(4 * mu)
         + (151 * e1 ** 3 / 96) * math.sin(6 * mu) + (1097 * e1 ** 4 / 512) * math.sin(8 * mu))
    C1 = ep2 * math.cos(p) ** 2; T1 = math.tan(p) ** 2
    N1 = a / math.sqrt(1 - e2 * math.sin(p) ** 2)
    R1 = a * (1 - e2) / (1 - e2 * math.sin(p) ** 2) ** 1.5
    D = (E - FE) / (N1 * K0)
    lat = p - (N1 * math.tan(p) / R1) * (D ** 2 / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 ** 2 - 9 * ep2) * D ** 4 / 24
                                         + (61 + 90 * T1 + 298 * C1 + 45 * T1 ** 2 - 252 * ep2 - 3 * C1 ** 2) * D ** 6 / 720)
    lon = (D - (1 + 2 * T1 + C1) * D ** 3 / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 ** 2 + 8 * ep2 + 24 * T1 ** 2) * D ** 5 / 120) / math.cos(p)
    return math.degrees(lat), CM + math.degrees(lon)


def _tm_fwd(lat, lon, a, f):
    e2 = f * (2 - f); ep2 = e2 / (1 - e2)
    la = math.radians(lat); dl = math.radians(lon - CM)
    N1 = a / math.sqrt(1 - e2 * math.sin(la) ** 2)
    T = math.tan(la) ** 2; C = ep2 * math.cos(la) ** 2; A = math.cos(la) * dl
    M = a * ((1 - e2 / 4 - 3 * e2 ** 2 / 64 - 5 * e2 ** 3 / 256) * la - (3 * e2 / 8 + 3 * e2 ** 2 / 32 + 45 * e2 ** 3 / 1024) * math.sin(2 * la)
             + (15 * e2 ** 2 / 256 + 45 * e2 ** 3 / 1024) * math.sin(4 * la) - (35 * e2 ** 3 / 3072) * math.sin(6 * la))
    E = FE + K0 * N1 * (A + (1 - T + C) * A ** 3 / 6 + (5 - 18 * T + T ** 2 + 72 * C - 58 * ep2) * A ** 5 / 120)
    N = K0 * (M + N1 * math.tan(la) * (A ** 2 / 2 + (5 - T + 9 * C + 4 * C ** 2) * A ** 4 / 24
                                       + (61 - 58 * T + T ** 2 + 600 * C - 330 * ep2) * A ** 6 / 720))
    return E, N


def _datum(lat, lon, a1, f1, a2, f2, sh):
    e1 = f1 * (2 - f1); la, lo = math.radians(lat), math.radians(lon)
    n = a1 / math.sqrt(1 - e1 * math.sin(la) ** 2)
    X = n * math.cos(la) * math.cos(lo) + sh[0]
    Y = n * math.cos(la) * math.sin(lo) + sh[1]
    Z = n * (1 - e1) * math.sin(la) + sh[2]
    e2 = f2 * (2 - f2); p = math.hypot(X, Y); lat2 = math.atan2(Z, p * (1 - e2))
    for _ in range(6):
        n2 = a2 / math.sqrt(1 - e2 * math.sin(lat2) ** 2)
        lat2 = math.atan2(Z + e2 * n2 * math.sin(lat2), p)
    return math.degrees(lat2), math.degrees(math.atan2(Y, X))


def utm_to_wgs(E, N):
    lat, lon = _tm_inv(E, N, EV_A, EV_F)
    lat, lon = _datum(lat, lon, EV_A, EV_F, WG_A, WG_F, SHIFT)
    return lon, lat


def wgs_to_utm(lon, lat):
    lat, lon = _datum(lat, lon, WG_A, WG_F, EV_A, EV_F, tuple(-s for s in SHIFT))
    return _tm_fwd(lat, lon, EV_A, EV_F)


def pdf_to_utm(x, y):
    a, b, c, d, e, f = CTM
    return a * x + c * y + e, b * x + d * y + f


def utm_to_pdf(E, N):
    a, b, c, d, e, f = CTM
    det = a * d - b * c
    E, N = E - e, N - f
    return (d * E - c * N) / det, (-b * E + a * N) / det


def wgs_to_px(lon, lat, dpi):
    x, y = utm_to_pdf(*wgs_to_utm(lon, lat))
    return x * dpi / 72, (PAGE_H - y) * dpi / 72


def o_luoi(s):
    """Ô lưới 6 số (ô 100 m, ô 100 km có chữ số hàng trăm km E=2, N=13) → tâm ô, WGS84."""
    E = 200000 + int(s[:3]) * 100 + 50
    N = 1300000 + int(s[3:]) * 100 + 50
    return utm_to_wgs(E, N)


def chong(pdf, lon0, lat0, lon1, lat1, out, dpi=200):
    from PIL import Image, ImageDraw, ImageFont
    here = os.path.dirname(os.path.abspath(__file__))
    duong = json.load(open(os.path.join(here, '..', 'data', 'lam-dong', 'da-lat', 'duong.json'), encoding='utf-8'))
    pts = [wgs_to_px(lo, la, dpi) for lo in (lon0, lon1) for la in (lat0, lat1)]
    x0, x1 = int(min(p[0] for p in pts)), int(max(p[0] for p in pts))
    y0, y1 = int(min(p[1] for p in pts)), int(max(p[1] for p in pts))
    with tempfile.TemporaryDirectory() as t:
        subprocess.run(['pdftoppm', '-r', str(dpi), '-png', '-x', str(x0), '-y', str(y0), '-W', str(x1 - x0), '-H', str(y1 - y0),
                        pdf, os.path.join(t, 'c')], check=True)
        im = Image.open([os.path.join(t, n) for n in os.listdir(t)][0]).convert('RGB')
    ov = Image.new('RGBA', im.size, (0, 0, 0, 0)); dr = ImageDraw.Draw(ov)
    try:
        font = ImageFont.truetype('DejaVuSans-Bold.ttf', max(12, dpi // 12))
    except OSError:
        font = ImageFont.load_default()
    for r in duong['duong']:
        xy = [(p[0] - x0, p[1] - y0) for p in (wgs_to_px(lo, la, dpi) for lo, la in r['pts'])]
        dr.line(xy, fill=(230, 0, 0, 150), width=2)
    for r in duong['ten_duong']:
        xy = [(p[0] - x0, p[1] - y0) for p in (wgs_to_px(lo, la, dpi) for lo, la in r['pts'])]
        m = xy[len(xy) // 2]
        if 0 <= m[0] < im.size[0] and 0 <= m[1] < im.size[1]:
            dr.text(m, r['ten'], fill=(0, 0, 200, 230), font=font, stroke_width=2, stroke_fill=(255, 255, 255, 230))
    Image.alpha_composite(im.convert('RGBA'), ov).convert('RGB').save(out)
    print(out, im.size)


if __name__ == '__main__':
    a = sys.argv[1:]
    if a and a[0] == 'chong':
        chong(a[1], *map(float, a[2:6]), a[6], int(a[7]) if len(a) > 7 else 200)
    elif a and a[0] == 'o':
        print('%.5f %.5f' % o_luoi(a[1]))
    else:
        print(__doc__)
