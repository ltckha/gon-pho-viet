#!/usr/bin/env python3
"""Tạo data/lam-dong/da-lat/duong.json: đường thật, mặt nước, mốc của phường Xuân Hương và Cam Ly (Đà Lạt).

Cách chạy:
  python3 tools/build_streets.py <thư mục các file .xml tải từ OpenStreetMap> <thư mục json/geojson của vietnamese-provinces-database>

Các file .xml lấy từ https://api.openstreetmap.org/api/0.6/map?bbox=... (mỗi ô 0,02°).
Dữ liệu đường: © OpenStreetMap contributors, giấy phép ODbL.
Chỉ dùng Python có sẵn, không cài thêm gì.
"""
import glob
import json
import math
import os
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_data import dp, point_in_ring  # noqa: E402

WARDS = {'xuan_huong': 'Xuân Hương - Đà Lạt', 'cam_ly': 'Cam Ly - Đà Lạt'}

# Loại đường giữ lại và độ "to" (để vẽ dày mỏng, hiện tên sớm hay muộn)
ROAD_RANK = {
    'trunk': 1, 'primary': 1, 'secondary': 2, 'tertiary': 3,
    'unclassified': 4, 'residential': 4, 'living_street': 4, 'pedestrian': 4,
    'trunk_link': 3, 'primary_link': 3, 'secondary_link': 3, 'tertiary_link': 3,
    'service': 5, 'track': 5, 'footway': 5, 'path': 5, 'steps': 5,
}

# 6 phố đã nghiên cứu (game Gọn Phố, src/core/cities.ts STREET_INFO; nghiên cứu ở docs/research của kho game)
PHO = [
    {'id': 'street_tang_bat_ho', 'road': 'Tăng Bạt Hổ', 'roads': 'Đường Tăng Bạt Hổ – Trương Công Định', 'ward': 'Xuân Hương - Đà Lạt',
     'ten_pho': 'Phố Ăn Đêm', 'gioi_thieu': 'Phố ăn đêm sau chợ và dốc phố Tây: bánh căn, sữa nóng, hostel, bar dưới hầm'},
    {'id': 'street_pho_ca_phe', 'road': 'Nguyễn Chí Thanh', 'roads': 'Đường Nguyễn Chí Thanh – Lê Đại Hành', 'ward': 'Xuân Hương - Đà Lạt',
     'ten_pho': 'Phố Cà Phê', 'gioi_thieu': 'Con đường cà phê lên Khu Hoà Bình: quán xưa cạnh quán mới, kem bơ, sân thượng nhìn phố'},
    {'id': 'street_phan_dinh_phung', 'road': 'Phan Đình Phùng', 'roads': 'Đường Phan Đình Phùng', 'ward': 'Xuân Hương - Đà Lạt',
     'ten_pho': 'Phố Dân Sinh', 'gioi_thieu': 'Phố cũ của dân phố núi: nhà thuốc, tiệm tóc, nhà sách, studio ảnh cưới, phở sáng, tiệm xe máy'},
    {'id': 'street_nguyen_van_troi', 'road': 'Nguyễn Văn Trỗi', 'roads': 'Đường Nguyễn Văn Trỗi', 'ward': 'Xuân Hương - Đà Lạt',
     'ten_pho': 'Phố Kem Bơ', 'gioi_thieu': 'Phố một chiều ăn vặt ngọt: kem bơ lâu năm, chè, bánh tráng nướng, dốc chùa'},
    {'id': 'street_hoang_dieu', 'road': 'Hoàng Diệu', 'roads': 'Đường Hoàng Diệu', 'ward': 'Cam Ly - Đà Lạt',
     'ten_pho': 'Phố Lẩu Bò', 'gioi_thieu': 'Phố lẩu bò Ba Toa: hơn 20 quán lẩu, sáng bán bánh mì xíu mại'},
    {'id': 'street_tran_phu', 'road': 'Trần Phú', 'roads': 'Đường Trần Phú – Ba Tháng Hai', 'ward': 'Xuân Hương - Đà Lạt',
     'ten_pho': 'Phố Di Sản', 'gioi_thieu': 'Phố di sản: khách sạn thời Pháp bên hồ, tiệm bánh lâu đời, quán phở, cháo đêm'},
]

# Tên mốc trên OSM viết sai/không dấu → sửa (đã soát 25/11/2026); mốc là quán xá, trùng chỗ, tên tạm → bỏ
MOC_SUA = {'Chợ đêm Da Lat': 'Chợ đêm Đà Lạt', 'Chùa Vạn Dừc': 'Chùa Vạn Đức'}
MOC_BO = {'Reo 20° Chill in Dalat', 'Clay Tunnels - Dalat Star', 'French Quarter', 'Giọt Sương Bay Lên Home Garden',
          'Nhà Pháp gần tu viện bỏ hoang', '3D World', 'Ngộ quán', 'Museum Madam De Dalat'}

# Mốc có tên muốn hiện (lọc theo thẻ OSM)
MOC_TAGS = [('amenity', 'marketplace', 'chợ'), ('railway', 'station', 'ga'), ('tourism', 'attraction', 'điểm tham quan'),
            ('amenity', 'place_of_worship', 'nhà thờ, chùa'), ('leisure', 'park', 'công viên'), ('tourism', 'museum', 'bảo tàng')]


def load_osm(folder):
    nodes, ways, rels, named_nodes = {}, {}, {}, []
    for f in sorted(glob.glob(os.path.join(folder, '*.xml'))):
        root = ET.parse(f).getroot()
        for n in root.iter('node'):
            nid = n.get('id')
            nodes[nid] = (float(n.get('lon')), float(n.get('lat')))
            tags = {t.get('k'): t.get('v') for t in n.findall('tag')}
            if 'name' in tags:
                named_nodes.append((nid, tags))
        for w in root.iter('way'):
            ways[w.get('id')] = ([nd.get('ref') for nd in w.findall('nd')], {t.get('k'): t.get('v') for t in w.findall('tag')})
        for r in root.iter('relation'):
            rels[r.get('id')] = ([(m.get('type'), m.get('ref'), m.get('role')) for m in r.findall('member')],
                                 {t.get('k'): t.get('v') for t in r.findall('tag')})
    return nodes, ways, rels, named_nodes


def meters(a, b):
    return math.hypot((a[0] - b[0]) * 111320 * math.cos(math.radians(a[1])), (a[1] - b[1]) * 110540)


def length(pts):
    return sum(meters(pts[i], pts[i + 1]) for i in range(len(pts) - 1))


def join_rings(segs):
    """Nối các đoạn way thành vòng kín (cho hồ là relation nhiều way)."""
    segs = [s[:] for s in segs if len(s) > 1]
    rings = []
    while segs:
        cur = segs.pop(0)
        changed = True
        while cur[0] != cur[-1] and changed:
            changed = False
            for i, s in enumerate(segs):
                if s[0] == cur[-1]:
                    cur += s[1:]
                elif s[-1] == cur[-1]:
                    cur += s[::-1][1:]
                elif s[-1] == cur[0]:
                    cur = s + cur[1:]
                elif s[0] == cur[0]:
                    cur = s[::-1] + cur[1:]
                else:
                    continue
                segs.pop(i)
                changed = True
                break
        if cur[0] == cur[-1]:
            rings.append(cur)
    return rings


def rnd(pts):
    out = []
    for x, y in pts:
        p = [round(x, 5), round(y, 5)]
        if not out or p != out[-1]:
            out.append(p)
    return out


def main(osm_dir, vpd_dir):
    polys = []
    ward_codes = []
    for key in WARDS:
        f = glob.glob(os.path.join(vpd_dir, '68_lam_dong', 'wards', '*_%s_da_lat.geojson' % key))[0]
        feat = json.load(open(f, encoding='utf-8'))['features'][0]
        ward_codes.append(feat['properties']['code'])
        for p in feat['geometry']['coordinates']:
            polys.append(p[0])

    def inside(pt):
        return any(point_in_ring(pt[0], pt[1], r) for r in polys)

    nodes, ways, rels, named_nodes = load_osm(osm_dir)
    print('OSM:', len(nodes), 'điểm,', len(ways), 'way,', len(rels), 'relation')

    # ---- đường ----
    duong = []
    for wid, (refs, tags) in ways.items():
        hw = tags.get('highway')
        if hw not in ROAD_RANK:
            continue
        rank = ROAD_RANK[hw]
        if rank == 5 and 'name' not in tags:
            continue  # bỏ ngõ, lối đi không tên cho nhẹ
        pts = [nodes[r] for r in refs if r in nodes]
        if len(pts) < 2 or not any(inside(p) for p in pts):
            continue
        pts = rnd(dp(pts, 0.00002))
        item = {'id': int(wid), 'loai': rank, 'pts': pts}
        if 'name' in tags:
            item['ten'] = tags['name']
        if tags.get('oneway') == 'yes':
            item['mot_chieu'] = 1
        duong.append(item)

    # ---- đường cùng tên nối thành tuyến dài (chỉ để đặt tên đường cho đủ chỗ) ----
    def join_open(segs):
        segs = [s[:] for s in segs]
        out = []
        while segs:
            cur = segs.pop(0)
            grown = True
            while grown:
                grown = False
                for i, s2 in enumerate(segs):
                    if s2[0] == cur[-1]:
                        cur += s2[1:]
                    elif s2[-1] == cur[-1]:
                        cur += s2[::-1][1:]
                    elif s2[-1] == cur[0]:
                        cur = s2 + cur[1:]
                    elif s2[0] == cur[0]:
                        cur = s2[::-1] + cur[1:]
                    else:
                        continue
                    segs.pop(i)
                    grown = True
                    break
            out.append(cur)
        return out

    groups = {}
    for d in duong:
        if 'ten' in d:
            groups.setdefault((d['ten'], d['loai']), []).append(d['pts'])
    ten_duong = []
    for (name, rank), segs in groups.items():
        for chain in join_open(segs):
            if len(chain) >= 2:
                ten_duong.append({'ten': name, 'loai': rank, 'pts': rnd(dp(chain, 0.00008))})

    # ---- mặt nước ----
    nuoc = []
    used = set()
    for rid, (members, tags) in rels.items():
        if tags.get('natural') == 'water' or tags.get('water') or tags.get('landuse') == 'reservoir':
            segs = [[nodes[r] for r in ways[ref][0] if r in nodes] for t, ref, role in members
                    if t == 'way' and role in ('outer', '') and ref in ways]
            for ring in join_rings(segs):
                if any(inside(p) for p in ring):
                    nuoc.append({'ten': tags.get('name', ''), 'pts': rnd(dp(ring, 0.00002))})
            used.update(ref for t, ref, role in members if t == 'way')
    for wid, (refs, tags) in ways.items():
        if wid in used:
            continue
        if tags.get('natural') == 'water' or tags.get('landuse') == 'reservoir' or tags.get('water'):
            pts = [nodes[r] for r in refs if r in nodes]
            if len(pts) > 3 and pts[0] == pts[-1] and any(inside(p) for p in pts):
                nuoc.append({'ten': tags.get('name', ''), 'pts': rnd(dp(pts, 0.00002))})

    # ---- mốc ----
    moc = []
    seen = set()

    KEEP_ATTR = ('Thác', 'Dinh', 'Quảng trường', 'Vườn', 'Làng', 'Đường hầm', 'KDL', 'Khu du lịch', 'Thung lũng', 'Đồi', 'Nhà thờ', 'Hồ')

    def add_moc(name, kind, pt):
        if name in MOC_BO:
            return
        name = MOC_SUA.get(name, name)
        if name.startswith('KDL '):
            name = 'Khu du lịch ' + name[4:]   # viết đầy đủ, không viết tắt
        if name in seen or not inside(pt):
            return
        if kind == 'điểm tham quan' and not name.startswith(KEEP_ATTR):
            return  # bỏ quán, bar, chỗ chụp ảnh gắn nhãn "attraction"
        if kind == 'nhà thờ, chùa' and not name.startswith(('Chùa', 'Nhà thờ', 'Thiền viện', 'Tu viện', 'Đình', 'Thiên Vương')):
            return
        seen.add(name)
        moc.append({'ten': name, 'loai': kind, 'lon': round(pt[0], 5), 'lat': round(pt[1], 5)})

    for nid, tags in named_nodes:
        for k, v, kind in MOC_TAGS:
            if tags.get(k) == v:
                add_moc(tags['name'], kind, nodes[nid])
    for wid, (refs, tags) in ways.items():
        if 'name' not in tags:
            continue
        for k, v, kind in MOC_TAGS:
            if tags.get(k) == v:
                pts = [nodes[r] for r in refs if r in nodes]
                if pts:
                    add_moc(tags['name'], kind, (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts)))

    # ---- ghim 6 phố: điểm giữa đoạn đường mang tên đó ----
    pho = []
    for p in PHO:
        segs = [d['pts'] for d in duong if d.get('ten', '').lower() in (p['road'].lower(), ('đường ' + p['road']).lower())]
        if not segs:
            raise SystemExit('Không thấy đường ' + p['road'] + ' trong dữ liệu OSM')
        allpts = [pt for s in segs for pt in s if inside(pt)]
        allpts.sort()
        mid = allpts[len(allpts) // 2]
        pho.append(dict(p, lon=mid[0], lat=mid[1], dai_m=round(sum(length(s) for s in segs))))

    out = {
        'tang': 'da-lat',
        'cap_nhat': '25/11/2026',
        'phuong': ward_codes,
        'nguon': [
            {'ten': 'Đường, mặt nước, mốc: © OpenStreetMap contributors (ODbL), tải qua API OpenStreetMap ngày 25/11/2026',
             'link': 'https://www.openstreetmap.org/copyright'},
            {'ten': 'Ranh giới phường: vietnamese-provinces-database v5.2.0 (MIT), dựng từ sapnhap.bando.com.vn',
             'link': 'https://github.com/ThangLeQuoc/vietnamese-provinces-database'},
            {'ten': '6 phố và câu giới thiệu: nghiên cứu của game Gọn Phố (kho ltckha/giang-ho-ai, docs/research)',
             'link': 'https://github.com/ltckha/giang-ho-ai/tree/main/docs/research'},
        ],
        'duong': duong,
        'ten_duong': ten_duong,
        'nuoc': nuoc,
        'moc': moc,
        'pho': pho,
    }
    os.makedirs(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat'), exist_ok=True)
    path = os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'duong.json')
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump(out, fh, ensure_ascii=False, separators=(',', ':'))
    print(path, os.path.getsize(path) // 1024, 'KB |', len(duong), 'đường,', len(nuoc), 'mặt nước,', len(moc), 'mốc')
    for p in pho:
        print(' ', p['ten_pho'], p['road'], p['lat'], p['lon'], p['dai_m'], 'm')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
