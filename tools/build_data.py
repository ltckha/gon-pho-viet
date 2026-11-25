#!/usr/bin/env python3
"""Tạo dữ liệu bản đồ từ bộ ranh giới vietnamese-provinces-database:
  data/viet-nam.json        tầng Việt Nam (34 tỉnh/thành)
  data/lam-dong/phuong.json tầng Lâm Đồng (124 xã/phường/đặc khu), ghép với data/lam-dong/nq1671.json

Cách chạy:
  python3 tools/build_data.py <đường dẫn tới thư mục json/geojson của vietnamese-provinces-database>

Không cần cài thêm gì (chỉ dùng Python có sẵn). Ranh giới được làm gọn bớt điểm
(Douglas–Peucker) để mở nhanh trên điện thoại.
"""
import json
import math
import os
import sys
import glob
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Tỉnh cũ gộp vào tỉnh mới — chép từ Điều 1 Nghị quyết 202/2025/QH15 (khoản 1–23),
# 11 tỉnh/thành không sắp xếp theo khoản 24. Khoá = mã tỉnh mới.
TINH_CU = {
    '01': [], '04': [], '11': [], '12': [], '14': [], '20': [], '22': [],
    '38': [], '40': [], '42': [], '46': [],
    '08': ['Hà Giang', 'Tuyên Quang'],
    '15': ['Yên Bái', 'Lào Cai'],
    '19': ['Bắc Kạn', 'Thái Nguyên'],
    '25': ['Vĩnh Phúc', 'Hoà Bình', 'Phú Thọ'],
    '24': ['Bắc Giang', 'Bắc Ninh'],
    '33': ['Thái Bình', 'Hưng Yên'],
    '31': ['Hải Phòng', 'Hải Dương'],
    '37': ['Hà Nam', 'Nam Định', 'Ninh Bình'],
    '44': ['Quảng Bình', 'Quảng Trị'],
    '48': ['Đà Nẵng', 'Quảng Nam'],
    '51': ['Kon Tum', 'Quảng Ngãi'],
    '52': ['Bình Định', 'Gia Lai'],
    '56': ['Ninh Thuận', 'Khánh Hoà'],
    '68': ['Đắk Nông', 'Bình Thuận', 'Lâm Đồng'],
    '66': ['Phú Yên', 'Đắk Lắk'],
    '79': ['TP Hồ Chí Minh', 'Bà Rịa - Vũng Tàu', 'Bình Dương'],
    '75': ['Bình Phước', 'Đồng Nai'],
    '80': ['Long An', 'Tây Ninh'],
    '92': ['Cần Thơ', 'Sóc Trăng', 'Hậu Giang'],
    '86': ['Bến Tre', 'Trà Vinh', 'Vĩnh Long'],
    '82': ['Tiền Giang', 'Đồng Tháp'],
    '96': ['Bạc Liêu', 'Cà Mau'],
    '91': ['Kiên Giang', 'An Giang'],
}

# Lên thành phố trực thuộc trung ương sau 1/7/2025 (ngày có hiệu lực).
LEN_THANH_PHO = {
    '75': {'ngay': '30/4/2026', 'nguon': 'https://baochinhphu.vn/quoc-hoi-thong-qua-nghi-quyet-thanh-lap-thanh-pho-dong-nai-truc-thuoc-trung-uong-hieu-luc-tu-30-4-2026-102260424101215806.htm'},
    '22': {'ngay': '1/9/2026', 'nguon': 'https://thanhnien.vn/viet-nam-co-9-thanh-pho-truc-thuoc-trung-uong-185260824143128386.htm'},
    '24': {'ngay': '20/9/2026', 'nguon': 'https://thethaovanhoa.vn/9-thanh-pho-truc-thuoc-trung-uong-20260920071143767.htm'},
}

# Tỉnh đã có bản đồ phố
DA_MO = {'68': 'Đà Lạt'}

TOL = 0.006      # độ (≈ 600 m) — đủ mịn ở tầm nhìn cả nước
ROUND = 3        # 3 số lẻ ≈ 100 m


def dp(points, tol):
    """Douglas–Peucker, không đệ quy."""
    n = len(points)
    if n < 3:
        return points
    keep = [False] * n
    keep[0] = keep[-1] = True
    stack = [(0, n - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = points[a]
        bx, by = points[b]
        dx, dy = bx - ax, by - ay
        L = math.hypot(dx, dy)
        best, idx = -1.0, -1
        for i in range(a + 1, b):
            px, py = points[i]
            d = abs(dy * (px - ax) - dx * (py - ay)) / L if L else math.hypot(px - ax, py - ay)
            if d > best:
                best, idx = d, i
        if best > tol and idx > 0:
            keep[idx] = True
            stack.append((a, idx))
            stack.append((idx, b))
    return [p for p, k in zip(points, keep) if k]


def ring_area(r):
    s = 0.0
    for (x1, y1), (x2, y2) in zip(r, r[1:] + r[:1]):
        s += x1 * y2 - x2 * y1
    return s / 2


def simplify_ring(r, tol, nd=None):
    nd = ROUND if nd is None else nd
    out = dp(r, tol)
    if len(out) < 4:  # đảo nhỏ: giữ nguyên hình gốc để không mất đảo
        out = r if len(r) <= 40 else dp(r, tol / 10)
    pts = []
    for x, y in out:
        p = [round(x, nd), round(y, nd)]
        if not pts or p != pts[-1]:
            pts.append(p)
    return pts if len(pts) >= 3 else None


def point_in_ring(x, y, r):
    inside = False
    j = len(r) - 1
    for i in range(len(r)):
        xi, yi = r[i]
        xj, yj = r[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            inside = not inside
        j = i
    return inside


def seg_dist(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    t = 0 if dx == dy == 0 else max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - ax - t * dx, py - ay - t * dy)


def label_point(ring, nd=3):
    """Điểm đặt tên: chỗ nằm sâu nhất trong vùng lớn nhất (dò lưới)."""
    xs = [p[0] for p in ring]
    ys = [p[1] for p in ring]
    best, bp = -1, (sum(xs) / len(xs), sum(ys) / len(ys))
    N = 40
    for i in range(N + 1):
        for j in range(N + 1):
            x = min(xs) + (max(xs) - min(xs)) * i / N
            y = min(ys) + (max(ys) - min(ys)) * j / N
            if not point_in_ring(x, y, ring):
                continue
            d = min(seg_dist(x, y, *ring[k], *ring[(k + 1) % len(ring)]) for k in range(len(ring)))
            if d > best:
                best, bp = d, (x, y)
    return [round(bp[0], nd), round(bp[1], nd)]


def main(src):
    tinh = []
    for d in sorted(glob.glob(os.path.join(src, '*/'))):
        name = os.path.basename(d.rstrip('/'))
        fc = json.load(open(os.path.join(d, name + '.geojson'), encoding='utf-8'))
        f = fc['features'][0]
        p = f['properties']
        polys = []
        for poly in f['geometry']['coordinates']:
            outer = simplify_ring([tuple(c) for c in poly[0]], TOL)
            if outer:
                polys.append([outer])  # bỏ lỗ trong ranh giới tỉnh (không cần ở tầm cả nước)
        biggest = max(polys, key=lambda pl: abs(ring_area(pl[0])))[0]
        so_xa = len(glob.glob(os.path.join(d, 'wards', '*.geojson')))
        code = p['code']
        item = {
            'ma': code,
            'ten': p['name'],
            'loai': 'Thành phố' if p['fullName'].startswith('Thành phố') else 'Tỉnh',
            'tinh_cu': TINH_CU[code],
            'dien_tich_km2': p['areaKm2'],
            'so_xa_phuong': so_xa,
            'nhan': label_point(biggest),
            'hinh': polys,
        }
        if code in LEN_THANH_PHO:
            item['len_thanh_pho'] = LEN_THANH_PHO[code]
        if code in DA_MO:
            item['da_mo'] = DA_MO[code]
        tinh.append(item)

    assert len(tinh) == 34, len(tinh)
    out = {
        'tang': 'viet-nam',
        'cap_nhat': '25/11/2026',
        'nguon': [
            {'ten': 'Ranh giới: vietnamese-provinces-database v5.2.0 (MIT), dựng từ sapnhap.bando.com.vn của NXB Tài nguyên Môi trường và Bản đồ Việt Nam',
             'link': 'https://github.com/ThangLeQuoc/vietnamese-provinces-database'},
            {'ten': 'Tỉnh cũ gộp vào: Nghị quyết 202/2025/QH15, Điều 1',
             'link': 'https://static3.luatvietnam.vn/uploaded/vietlawfile/2025/6/202_2025_qh15_130625135937.pdf'},
            {'ten': 'Thành phố trực thuộc trung ương thứ 7–9 (Đồng Nai, Quảng Ninh, Bắc Ninh)',
             'link': 'https://thanhnien.vn/viet-nam-co-9-thanh-pho-truc-thuoc-trung-uong-185260824143128386.htm'},
        ],
        'tinh': tinh,
    }
    os.makedirs(os.path.join(ROOT, 'data'), exist_ok=True)
    path = os.path.join(ROOT, 'data', 'viet-nam.json')
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump(out, fh, ensure_ascii=False, separators=(',', ':'))
    print(path, os.path.getsize(path) // 1024, 'KB',
          sum(len(r) for t in tinh for pl in t['hinh'] for r in pl), 'điểm')


# ---------- tầng Lâm Đồng ----------
DA_LAT = ['Xuân Hương - Đà Lạt', 'Cam Ly - Đà Lạt', 'Lâm Viên - Đà Lạt', 'Xuân Trường - Đà Lạt', 'Lang Biang - Đà Lạt']
# số phố đã nghiên cứu mỗi phường: đếm thẳng từ data/lam-dong/da-lat/pho.json (build_pho.py cũng tự cập nhật phuong.json)
_PHO = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data', 'lam-dong', 'da-lat', 'pho.json')
CO_PHO = {}
if os.path.exists(_PHO):
    for _p in json.load(open(_PHO, encoding='utf-8'))['pho']:
        if _p.get('ward'):
            CO_PHO[_p['ward']] = CO_PHO.get(_p['ward'], 0) + 1


def norm(s):
    import unicodedata
    s = unicodedata.normalize('NFC', s).lower().replace('\u2019', "'").replace('\u2018', "'")
    for a, b in [('oà', 'òa'), ('oá', 'óa'), ('oạ', 'ọa'), ('uỳ', 'ùy'), ('uý', 'úy'), ('uỷ', 'ủy'), ('uỹ', 'ũy'), ('uỵ', 'ụy')]:
        s = s.replace(a, b)
    return re.sub(r'\s+', ' ', s).strip()


def build_lam_dong(src):
    nq = json.load(open(os.path.join(ROOT, 'data', 'lam-dong', 'nq1671.json'), encoding='utf-8'))
    by = {norm(o['ten_moi']): o for o in nq['ds']}
    ds = []
    for f in sorted(glob.glob(os.path.join(src, '68_lam_dong', 'wards', '*.geojson'))):
        feat = json.load(open(f, encoding='utf-8'))['features'][0]
        p = feat['properties']
        o = by.pop(norm(p['fullName']))      # lỗi ngay nếu không khớp văn bản
        polys = []
        for poly in feat['geometry']['coordinates']:
            outer = simplify_ring([tuple(c) for c in poly[0]], 0.0012, 4)
            if outer:
                polys.append([outer])
        biggest = max(polys, key=lambda pl: abs(ring_area(pl[0])))[0]
        item = {
            'ma': p['code'],
            'ten': p['name'],
            'loai': p['fullName'][: len(p['fullName']) - len(p['name'])].strip(),
            'gop_tu': o['gop_tu'],
            'muc_nq': o['muc'],
            'dien_tich_km2': p['areaKm2'],
            'nhan': label_point(biggest, 4),
            'hinh': polys,
        }
        if p['name'] in DA_LAT:
            item['da_lat'] = True
        if p['name'] in CO_PHO:
            item['so_pho'] = CO_PHO[p['name']]
        ds.append(item)
    assert not by, by
    assert len(ds) == 124, len(ds)
    out = {
        'tang': 'lam-dong',
        'ten': 'Lâm Đồng',
        'cap_nhat': '25/11/2026',
        'nguon': [
            {'ten': 'Ranh giới: vietnamese-provinces-database v5.2.0 (MIT), dựng từ sapnhap.bando.com.vn',
             'link': 'https://github.com/ThangLeQuoc/vietnamese-provinces-database'},
            {'ten': 'Gộp từ xã/phường nào: ' + nq['van_ban'] + ', Điều 1 (toàn văn trên Báo Lâm Đồng)',
             'link': nq['nguon']},
        ],
        'phuong': ds,
    }
    path = os.path.join(ROOT, 'data', 'lam-dong', 'phuong.json')
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump(out, fh, ensure_ascii=False, separators=(',', ':'))
    print(path, os.path.getsize(path) // 1024, 'KB')


if __name__ == '__main__':
    main(sys.argv[1])
    build_lam_dong(sys.argv[1])
