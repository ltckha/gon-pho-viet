#!/usr/bin/env python3
"""Tạo sơ đồ phố kiểu game cho từng phố: data/lam-dong/da-lat/so_do/<slug>.json

Cách chạy:
  python3 tools/build_so_do.py

Đọc: data/lam-dong/da-lat/duong.json (đường thật OSM), data/lam-dong/da-lat/pho.json (quán, vị trí).
Ra (toạ độ khung rộng 360, cao tuỳ phố — giống khung 360×520 của game):
  - các đoạn đường của phố, theo đúng hình thật (xoay cho phố chạy dọc màn hình)
  - đường cắt ngang (đoạn ngắn, có tên), mốc gần phố
  - nhà/quán đặt dọc 2 bên đường: chỗ thật (đã ghim) hoặc ước theo số nhà; mặt tiền lấy từ bộ hình Spark của game
Quán không có vị trí và không có số nhà thì không vẽ (vẫn có trong danh sách).
"""
import json
import math
import os
import re
import unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = 360            # bề ngang khung
PAD = 46           # lề hai bên cho nhà
HOUSE = 64         # cỡ mặt tiền (điểm vẽ)

# loại quán → khung mặt tiền trong assets/so_do/facade_atlas (hình Spark của game). Thứ tự = ưu tiên.
FACADE = [
    ('kem bo', 'mat_tien_kem_bo'), ('kem', 'mat_tien_kem_ly'), ('yaourt', 'mat_tien_yaourt'), ('che', 'facade_che'),
    ('banh trang nuong', 'facade_banh_trang_nuong'), ('banh can', 'mat_tien_banh_can'), ('xiu mai', 'mat_tien_xiu_mai'),
    ('banh mi ga', 'mat_tien_banh_mi_ga'), ('banh mi', 'facade_banh_mi'), ('pho', 'mat_tien_pho'),
    ('com tam', 'facade_com_tam'), ('com ga', 'facade_com_ga'), ('lau bo', 'mat_tien_lau_nha_go'), ('lau', 'mat_tien_lau_hem'),
    ('nem nuong', 'mat_tien_nuong_dem'), ('nuong', 'mat_tien_nuong_dem'), ('chao', 'mat_tien_chao_dem'),
    ('sua dau nanh', 'mat_tien_sua_nanh'), ('sua', 'mat_tien_sua_nanh'),
    ('cocktail', 'mat_tien_bar_ham'), ('bar', 'mat_tien_bar_ham'), ('pub', 'mat_tien_bar_ham'), ('beer', 'mat_tien_bar_ham'),
    ('hostel', 'facade_hostel'), ('homestay', 'facade_homestay'),
    ('khach san phap', 'mat_tien_ks_phap'), ('di san', 'mat_tien_ks_phap'), ('palace', 'mat_tien_ks_phap'),
    ('ben ho', 'mat_tien_ks_ho'), ('khach san', 'mat_tien_khach_san'), ('hotel', 'mat_tien_khach_san'),
    ('san thuong', 'mat_tien_san_thuong'), ('retro', 'mat_tien_retro'), ('do cu', 'mat_tien_retro'),
    ('xe dap', 'mat_tien_cafe_xe_dap'), ('ca phe', 'mat_tien_cafe_xua'), ('cafe', 'mat_tien_cafe_xua'), ('coffee', 'mat_tien_cafe_xua'),
    ('tra', 'facade_tra'), ('pizza', 'facade_pizza'), ('tiem banh', 'facade_tiem_banh_mi'), ('bakery', 'facade_tiem_banh_mi'),
    ('banh', 'mat_tien_banh_qua'), ('nha sach', 'mat_tien_nha_sach'), ('nha thuoc', 'mat_tien_nha_thuoc'),
    ('toc', 'mat_tien_tiem_toc'), ('studio', 'mat_tien_studio'), ('thue xe', 'mat_tien_thue_xe'), ('xe may', 'mat_tien_xe_may'),
    ('nha tho', 'moc'), ('chua', 'moc'), ('dinh', 'moc'),
]


def plain(s):
    s = unicodedata.normalize('NFD', (s or '').lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').replace('đ', 'd')
    return ' ' + re.sub(r'[^a-z0-9]+', ' ', s) + ' '


def facade(d):
    t = plain(d.get('loai', '') + ' ' + d.get('ten', ''))
    for k, v in FACADE:
        if ' ' + k + ' ' in t:
            return v
    return 'mat_tien_quay_an'


def lead_num(s):
    m = re.match(r'\s*(\d+)', str(s or ''))
    return int(m.group(1)) if m else None


def to_m(pt, o):
    return ((pt[0] - o[0]) * 108900, (o[1] - pt[1]) * 110540)   # mét, trục y hướng xuống


def build(ph, duong):
    names = set(ph['duong'])
    pieces = [d['pts'] for d in duong['duong'] if d.get('ten') in names and d['loai'] <= 4]
    if not pieces:
        return None
    allp = [p for pc in pieces for p in pc]
    o = (sum(p[0] for p in allp) / len(allp), sum(p[1] for p in allp) / len(allp))
    M = [[to_m(p, o) for p in pc] for pc in pieces]
    # xoay cho phố chạy dọc: lấy trục dài nhất (PCA)
    xs = [p for pc in M for p in pc]
    sxx = sum(x * x for x, y in xs) / len(xs)
    syy = sum(y * y for x, y in xs) / len(xs)
    sxy = sum(x * y for x, y in xs) / len(xs)
    ang = 0.5 * math.atan2(2 * sxy, sxx - syy)        # góc trục chính so với trục x
    rot = math.pi / 2 - ang                            # quay trục chính về dọc
    c, s = math.cos(rot), math.sin(rot)

    def R(p):
        return (p[0] * c - p[1] * s, p[0] * s + p[1] * c)

    Mr = [[R(p) for p in pc] for pc in M]
    rx = [p[0] for pc in Mr for p in pc]
    ry = [p[1] for pc in Mr for p in pc]
    span_x = max(rx) - min(rx) or 1
    span_y = max(ry) - min(ry) or 1
    # tỉ lệ: ngang vừa khung (chừa lề nhà), dọc ít nhất 1,1 điểm/mét để nhà khỏi chen
    # tỉ lệ: ngang vừa khung (chừa lề nhà), dọc không quá ~900 điểm cho đỡ dài, không phóng quá 3 điểm/mét
    k = min((W - 2 * PAD - 40) / span_x if span_x > 1 else 99, 900 / span_y, 3.0)
    top = 70
    cx = W / 2 - (min(rx) + max(rx)) / 2 * k

    def P(p):
        q = R(to_m(p, o))
        return (round(cx + q[0] * k, 1), round(top + (q[1] - min(ry)) * k, 1))

    H = round(top * 2 + span_y * k)
    roads = [[P(p) for p in pc] for pc in pieces]

    # đường cắt ngang: đường khác tên có điểm sát phố (≤ 15 m) → vẽ đoạn ngắn quanh chỗ giao
    def near_phố(pt):
        best = 1e9
        for pc in pieces:
            for q in pc:
                best = min(best, math.hypot((pt[0] - q[0]) * 108900, (pt[1] - q[1]) * 110540))
        return best
    cross, seen = [], set()
    for d in duong['duong']:
        if d.get('ten') in names or d['loai'] > 4:
            continue
        idx = [i for i, p in enumerate(d['pts']) if near_phố(p) <= 15]
        if not idx:
            continue
        i = idx[0]
        seg = d['pts'][max(0, i - 3): i + 4]
        cross.append({'ten': d.get('ten', '') if d.get('ten', '') not in seen else '', 'pts': [P(p) for p in seg], 'loai': d['loai']})
        seen.add(d.get('ten', ''))
    # chỉ giữ đường cắt ngang chính: bỏ hẻm/dốc, ưu tiên đường lớn, tối đa 8 đường (mỗi tên 1 đường)
    cross = [c for c in cross if c['ten'] and not c['ten'].startswith(('Hẻm', 'Dốc', 'Kiệt'))]
    cross.sort(key=lambda c: c['loai'])
    cross = cross[:8]
    # mốc gần phố
    moc = [{'ten': m['ten'], 'x': P((m['lon'], m['lat']))[0], 'y': P((m['lon'], m['lat']))[1]}
           for m in duong['moc'] if near_phố((m['lon'], m['lat'])) <= 90][:3]

    # chỗ dọc đường (s, mét) + bên (trái/phải) cho từng quán
    def along(pt):
        best = (1e9, 0, 0, 1)
        for pc in Mr:
            acc = 0
            for i in range(len(pc) - 1):
                a, b = pc[i], pc[i + 1]
                L = math.hypot(b[0] - a[0], b[1] - a[1])
                if L == 0:
                    continue
                t = max(0, min(1, ((pt[0] - a[0]) * (b[0] - a[0]) + (pt[1] - a[1]) * (b[1] - a[1])) / L / L))
                fx, fy = a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])
                d = math.hypot(pt[0] - fx, pt[1] - fy)
                side = 1 if (b[0] - a[0]) * (pt[1] - a[1]) - (b[1] - a[1]) * (pt[0] - a[0]) > 0 else -1
                if d < best[0]:
                    best = (d, (fx, fy), ((b[1] - a[1]) / L, -(b[0] - a[0]) / L), side)
                acc += L
        return best

    houses = []
    for i, d in enumerate(ph['dia_diem']):
        if d.get('duong') and d['duong'] not in names:
            continue
        v = d.get('vi_tri')
        if not v:
            continue
        pt = R(to_m((v['lon'], v['lat']), o))
        dist, foot, nrm, side = along(pt)
        if dist > 90:
            continue
        num = lead_num(d.get('so_nha'))
        if v.get('uoc') and num is not None:
            side = 1 if num % 2 else -1      # điểm ước nằm giữa đường: bên theo chẵn/lẻ (tạm quy ước)
        houses.append({'i': i, 'ten': d['ten'], 'f': facade(d), 'uoc': bool(v.get('uoc')),
                       'fx': foot[0], 'fy': foot[1], 'nx': nrm[0] * side, 'ny': nrm[1] * side})
    # Đường không bao giờ cụt giữa sơ đồ (anh Kha dặn): đầu đường nào không nối vào đoạn khác thì kéo thẳng ra tới mép khung
    def ray(a, b):
        dx, dy = b[0] - a[0], b[1] - a[1]
        L = math.hypot(dx, dy)
        if L == 0:
            return None
        dx, dy = dx / L, dy / L
        ts = []
        for edge, d0, lo in ((W + 30, dx, b[0]), (-30, dx, b[0]), (H + 30, dy, b[1]), (-30, dy, b[1])):
            if abs(d0) > 1e-9:
                t = (edge - lo) / d0
                if t > 0:
                    ts.append(t)
        t = min(ts) if ts else 0
        return [round(b[0] + dx * t, 1), round(b[1] + dy * t, 1)]

    def joined(pt, me, groups):
        for gi, g in enumerate(groups):
            for q in (g if gi != me else []):
                if math.hypot(pt[0] - q[0], pt[1] - q[1]) < 14:
                    return True
        return False

    for gi, r in enumerate(roads):
        if len(r) < 2:
            continue
        if not joined(r[-1], gi, roads):
            e = ray(r[-2], r[-1])
            if e:
                r.append(e)
        if not joined(r[0], gi, roads):
            e = ray(r[1], r[0])
            if e:
                r.insert(0, e)
    for c in cross:
        r = c['pts']
        if len(r) >= 2:
            e1, e0 = ray(r[-2], r[-1]), ray(r[1], r[0])
            if e1:
                r.append(e1)
            if e0:
                r.insert(0, e0)
            c['nhan'] = [r[-2][0], r[-2][1]]          # tên đường đặt ở điểm thật cuối, không ở mép khung

    H0 = H
    # đặt nhà: thử các chỗ quanh điểm chân trên đường (dọc theo đường ± và xa dần ra ngoài),
    # chọn chỗ đầu tiên không đè nhà khác, không đè mặt đường, không ra ngoài khung
    road_px = [p for r in roads for p in r]
    dense = []
    for r in roads:
        for a, b in zip(r, r[1:]):
            n = max(1, int(math.hypot(b[0] - a[0], b[1] - a[1]) / 6))
            dense += [(a[0] + (b[0] - a[0]) * t / n, a[1] + (b[1] - a[1]) * t / n) for t in range(n + 1)]
    dense = dense or road_px

    def clear_road(x, y):
        return min(math.hypot(x - p[0], y - p[1]) for p in dense) >= HOUSE * 0.62

    out = []
    BW, BH = HOUSE + 8, HOUSE + 22          # khung nhà + chữ tên
    for h in sorted(houses, key=lambda h: h['fy']):
        rx = cx + h['fx'] * k
        ry_ = top + (h['fy'] - min(ry)) * k
        tx, ty = -h['ny'], h['nx']           # hướng dọc đường
        best = None
        for dn in (52, 70, 95, 125, -52, -70, -95, 160):          # âm = sang bên kia đường khi bên này hết chỗ
            for dt in (0, 34, -34, 68, -68, 110, -110, 160, -160, 220, -220):
                x = rx + h['nx'] * dn + tx * dt
                y = ry_ + h['ny'] * dn + ty * dt
                if x < 40 or x > W - 40 or y < 40:
                    continue
                lw = max(BW, min(len(h['ten']), 22) * 5.4 + 10)      # bề ngang chữ tên quán
                if any(abs(o2['x'] - x) < (lw + o2['lw']) / 2 and abs(o2['y'] - y) < BH for o2 in out):
                    continue
                if not clear_road(x, y):
                    continue
                best = (x, y)
                break
            if best:
                break
        if not best:            # hết chỗ: đặt xa hẳn ra phía dưới, vẫn có đường nối
            y = max([o2['y'] for o2 in out] + [ry_]) + BH
            best = (rx + h['nx'] * 70, y)
        is_moc = h['f'] == 'moc'
        out.append({'lw': max(BW, min(len(h['ten']), 22) * 5.4 + 10), 'i': h['i'], 'ten': h['ten'], 'f': h['f'], 'moc': is_moc, 'uoc': h['uoc'],
                    'x': round(best[0], 1), 'y': round(best[1], 1), 'rx': round(rx, 1), 'ry': round(ry_, 1)})
    H = max(H, int(max([o2['y'] for o2 in out] + [0]) + HOUSE + 40))
    ten_nha = {plain(o2['ten']) for o2 in out}
    moc = [m for m in moc if plain(m['ten']) not in ten_nha
           and all(math.hypot(m['x'] - o2['x'], m['y'] - o2['y']) > 60 for o2 in out)]   # mốc trùng/sát nhà đã vẽ thì không ghi lại
    # khung cao thêm thì kéo tiếp các đầu đường đang chạm mép dưới cũ
    if H != H0:
        for r in roads + [c['pts'] for c in cross]:
            for end in (0, -1):
                q = r[end]
                if q[1] >= H0 + 29:
                    a, b = (r[1], r[0]) if end == 0 else (r[-2], r[-1])
                    e = ray(a, b)
                    if e and e != list(b):
                        if end == 0:
                            r.insert(0, e)
                        else:
                            r.append(e)
    return {'slug': ph['slug'], 'w': W, 'h': H, 'm_per_pt': round(1 / k, 3), 'duong': roads, 'cat': cross, 'moc': moc,
            'nha': out, 'nguon': '© OpenStreetMap contributors · mặt tiền: hình Spark của game Gọn Phố'}


def main():
    duong = json.load(open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'duong.json'), encoding='utf-8'))
    pho = json.load(open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'pho.json'), encoding='utf-8'))
    od = os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'so_do')
    os.makedirs(od, exist_ok=True)
    for ph in pho['pho']:
        r = build(ph, duong)
        if not r:
            continue
        json.dump(r, open(os.path.join(od, ph['slug'] + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
        print(ph['slug'], 'cao', r['h'], '| nhà', len(r['nha']), '/', len(ph['dia_diem']), '| đường cắt', len(r['cat']), '| mốc', len(r['moc']),
              '| 1 điểm =', r['m_per_pt'], 'm')


if __name__ == '__main__':
    main()
