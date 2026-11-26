"""Dựng data/lam-dong/da-lat/ten_1963.json — tên đường Đà Lạt năm 1963 gắn lên đường OpenStreetMap hôm nay.

Đầu vào: docs/research/ams_1963_bang_duong.tsv (bảng chỉ dẫn đường phố của bản đồ AMS L909 Đà Lạt 1:12.500,
đã chép tay và dò từng số bằng ảnh chồng — tools/ban_do_1963.py). Cột ten_nay '-' = để trống (không chắc).

Mỗi tên 1963 chỉ gắn cho ĐOẠN đường quanh vị trí số trên bản đồ (tối đa ~600 m mỗi phía), không gắn cả con đường:
một đường hôm nay có thể từng mang hai tên (Trần Phú nay = Hùng Vương + Yersin năm 1963). Hai số cùng nằm trên
một đường nay thì chia đoạn ở giữa hai số.

Chạy: python3 -I tools/build_1963.py
"""
import json, math, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ban_do_1963 as B  # noqa: E402

ROOT = os.path.join(HERE, '..')
MAX_M = 600


def xy(p, lat0):
    return (p[0] * 111320 * math.cos(math.radians(lat0)), p[1] * 110574)


def main():
    duong = json.load(open(os.path.join(ROOT, 'data/lam-dong/da-lat/duong.json'), encoding='utf-8'))
    rows = [l.rstrip('\n').split('\t') for l in open(os.path.join(ROOT, 'docs/research/ams_1963_bang_duong.tsv'), encoding='utf-8')]
    head, rows = rows[0], [dict(zip(rows[0], r + [''] * (len(rows[0]) - len(r)))) for r in rows[1:]]
    lat0 = 11.94
    pieces = {}
    for r in duong['ten_duong']:
        pieces.setdefault(r['ten'], []).append(r['pts'])

    def snap(name, lon, lat):
        """điểm gần nhất trên các đoạn mang tên `name` → (chỉ số đoạn, vị trí theo mét dọc đoạn, khoảng cách)"""
        P = xy((lon, lat), lat0)
        best = None
        for k, pts in enumerate(pieces[name]):
            acc = 0
            for a, b in zip(pts, pts[1:]):
                A, Bp = xy(a, lat0), xy(b, lat0)
                dx, dy = Bp[0] - A[0], Bp[1] - A[1]; L = math.hypot(dx, dy)
                t = 0 if L == 0 else max(0, min(1, ((P[0] - A[0]) * dx + (P[1] - A[1]) * dy) / (L * L)))
                d = math.hypot(A[0] + t * dx - P[0], A[1] + t * dy - P[1])
                if best is None or d < best[2]:
                    best = (k, acc + t * L, d)
                acc += L
        return best

    def cut(pts, s0, s1):
        """phần đoạn từ s0 tới s1 mét"""
        out, acc = [], 0
        for a, b in zip(pts, pts[1:]):
            L = math.hypot(*[u - v for u, v in zip(xy(b, lat0), xy(a, lat0))])
            if acc + L >= s0 and acc <= s1:
                def at(s):
                    t = 0 if L == 0 else (s - acc) / L
                    return [round(a[0] + t * (b[0] - a[0]), 5), round(a[1] + t * (b[1] - a[1]), 5)]
                if not out:
                    out.append(at(max(s0, acc)))
                out.append(at(min(s1, acc + L)))
            acc += L
        return out

    def length(pts):
        return sum(math.hypot(*[u - v for u, v in zip(xy(b, lat0), xy(a, lat0))]) for a, b in zip(pts, pts[1:]))

    # neo: vị trí số trên bản đồ (mặc định tâm ô lưới 100 m) bám vào đường nay
    neo = []
    for r in rows:
        ten = r['ten_nay']
        if ten in ('', '-'):
            continue
        diem = ten.startswith('diem:')
        name = ten[5:] if diem else ten
        if name not in pieces:
            sys.exit('Không có đường "%s" trong duong.json (số %s)' % (name, r['so']))
        if r.get('moc_utm'):
            pts = [B.utm_to_wgs(*map(float, q.split(','))) for q in r['moc_utm'].split(';')]
        else:
            pts = [B.o_luoi(r['o_luoi'])]
        for lon, lat in pts:
            k, s, d = snap(name, lon, lat)
            if d > 160:
                sys.exit('Số %s cách đường "%s" %d m — quá xa, soát lại' % (r['so'], name, d))
            neo.append({'r': r, 'name': name, 'diem': diem, 'k': k, 's': s})

    out_duong, out_diem = [], []
    for n in neo:
        r, pts = n['r'], pieces[n['name']][n['k']]
        if n['diem']:
            q = cut(pts, n['s'], n['s'])[0] if len(pts) > 1 else pts[0]
            out_diem.append({'so': int(r['so']), 'ten': r['ten_1963'], 'nay': n['name'], 'lon': q[0], 'lat': q[1]})
            continue
        lo, hi = max(0, n['s'] - MAX_M), min(length(pts), n['s'] + MAX_M)
        for m in neo:     # số khác (tên 1963 khác) trên cùng đoạn: chia ở giữa
            if m is n or m['diem'] or m['name'] != n['name'] or m['k'] != n['k'] or m['r']['ten_1963'] == r['ten_1963']:
                continue
            mid = (m['s'] + n['s']) / 2
            if m['s'] < n['s']:
                lo = max(lo, mid)
            else:
                hi = min(hi, mid)
        seg = cut(pts, lo, hi)
        if len(seg) >= 2:
            out_duong.append({'so': int(r['so']), 'ten': r['ten_1963'], 'nay': n['name'], 'pts': seg})

    trong = [{'so': int(r['so']), 'ten': r['ten_1963'], 'vi_sao': r['ghi_chu']} for r in rows if r['ten_nay'] in ('', '-')]
    data = {
        'nam': 1963,
        'nguon': {
            'ten': 'Bản đồ Đà Lạt 1:12.500, Army Map Service (quân đội Mỹ), loạt L909, ấn bản 1-AMS — bảng chỉ dẫn đường phố 103 tên. Tài liệu chính phủ Mỹ, phạm vi công cộng.',
            'link': 'https://store.usgs.gov/assets/MOD/StoreFiles/NGA/L909XDALAT_geo.pdf',
            'link_2': 'https://commons.wikimedia.org/wiki/File:AMS_-_Da_Lat,_Vietnam_-_NARA_-_74797741.jpg',
        },
        'cach_lam': 'Mỗi số trên bản đồ 1963 được dò bằng ảnh chồng đường OpenStreetMap hôm nay; tên 1963 chỉ gắn cho đoạn quanh vị trí số. Số nằm ở ngã ba, khu đã xây lại hoặc không thấy thì để trống.',
        'duong': out_duong,
        'diem': out_diem,
        'de_trong': trong,
    }
    p = os.path.join(ROOT, 'data/lam-dong/da-lat/ten_1963.json')
    json.dump(data, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print('%s: %d đoạn (%d tên), %d điểm, %d để trống' % (p, len(out_duong), len({d['so'] for d in out_duong}), len(out_diem), len(trong)))


if __name__ == '__main__':
    main()
