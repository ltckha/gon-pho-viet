#!/usr/bin/env python3
"""Lịch trình đi bộ theo phố: data/lam-dong/da-lat/lich_trinh.json

Cách chạy:
  python3 tools/lich_trinh.py <thư mục .xml OSM (tools/tai_osm.py)>
(đồ thị đi bộ dựng từ dữ liệu OSM gốc để giữ đủ nút giao; duong.json đã lược điểm nên có chỗ đứt)
Quãng đường tính theo đường thật OSM (đường ngắn nhất giữa 2 ghim phố), thời gian đi bộ tính 4 km/giờ
(Đà Lạt nhiều dốc nên tính chậm hơn mức 5 km/giờ thường dùng). Lý do mỗi chặng lấy từ giới thiệu phố (đã có nguồn).
"""
import heapq
import json
import math
import os
import sys
import glob
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOC_DO = 4000 / 60   # mét mỗi phút

LICH = [
    {'ten': 'Một ngày đi bộ quanh chợ Đà Lạt', 'chang': [
        ('hoang-dieu', 'Sáng', 'Bánh mì xíu mại buổi sáng ở khu Ba Toa'),
        ('phan-dinh-phung', 'Sáng', 'Bánh bèo, mì hoành thánh, bún bò trên phố cũ'),
        ('pho-ca-phe', 'Giữa sáng', 'Cà phê dốc Nguyễn Chí Thanh lên Khu Hoà Bình'),
        ('tran-phu', 'Trưa', 'Phở, cơm và các công trình thời Pháp quanh nhà thờ Con Gà'),
        ('nguyen-van-troi', 'Chiều', 'Kem bơ, chè, bánh tráng nướng bếp than'),
        ('tang-bat-ho', 'Tối', 'Bánh căn, sữa đậu nành nóng, bar dưới hầm sau chợ'),
    ]},
    {'ten': 'Tối ăn lẩu', 'chang': [
        ('hoang-dieu', 'Tối', 'Lẩu bò Ba Toa'),
        ('hai-ba-trung', 'Tối', 'Ốc nhồi thịt, lẩu gà lá é'),
    ]},
    {'ten': 'Sáng bên hồ, chiều chợ đêm', 'chang': [
        ('yersin', 'Sáng', 'Bánh căn, bánh mì xíu mại, mì Quảng đầu dốc; ngắm trường gạch đỏ Lycée Yersin'),
        ('trieu-viet-vuong', 'Trưa', 'Dinh III Bảo Đại, cà phê vườn'),
        ('phan-boi-chau', 'Chiều', 'Quán bar mê cung 100 Roofs, kem xôi dừa'),
        ('nguyen-thi-minh-khai', 'Tối', 'Chợ đêm: bánh tráng nướng, dâu lắc, áo len'),
    ]},
]


def dist(a, b):
    return math.hypot((a[0] - b[0]) * 108900, (a[1] - b[1]) * 110540)


def main(osm_dir):
    duong = json.load(open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'duong.json'), encoding='utf-8'))
    pho = {p['slug']: p for p in json.load(open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'pho.json'), encoding='utf-8'))['pho']}
    # đồ thị đường đi bộ từ OSM gốc: nút = điểm OSM, cạnh = 2 điểm liền nhau trên cùng đường
    coords, G = {}, {}
    for f in glob.glob(os.path.join(osm_dir, '*.xml')):
        root = ET.parse(f).getroot()
        for n in root.iter('node'):
            coords[n.get('id')] = (float(n.get('lon')), float(n.get('lat')))
        for w in root.iter('way'):
            t = {x.get('k'): x.get('v') for x in w.findall('tag')}
            if 'highway' not in t or t['highway'] in ('motorway', 'motorway_link', 'construction', 'proposed'):
                continue
            refs = [nd.get('ref') for nd in w.findall('nd')]
            for a, b in zip(refs, refs[1:]):
                G.setdefault(a, set()).add(b)
                G.setdefault(b, set()).add(a)
    G = {k: [(v, dist(coords[k], coords[v])) for v in vs if v in coords] for k, vs in G.items() if k in coords}
    nodes = list(G)
    def snap(lon, lat):
        return min(nodes, key=lambda n: dist(coords[n], (lon, lat)))

    def path(s, t):
        D, prev, Q = {s: 0}, {}, [(0, s)]
        while Q:
            d, u = heapq.heappop(Q)
            if u == t:
                break
            if d > D[u]:
                continue
            for v, w in G[u]:
                nd = d + w
                if nd < D.get(v, 1e18):
                    D[v], prev[v] = nd, u
                    heapq.heappush(Q, (nd, v))
        if t not in D:
            return None, None
        pts, u = [t], t
        while u != s:
            u = prev[u]
            pts.append(u)
        return D[t], [coords[u] for u in pts[::-1]]

    out = []
    for l in LICH:
        steps, prev_node, tong = [], None, 0
        for slug, buoi, goi_y in l['chang']:
            p = pho[slug]
            n = snap(p['lon'], p['lat'])
            st = {'slug': slug, 'ten_pho': p.get('ten_hien') or p['ten_pho'], 'buoi': buoi, 'goi_y': goi_y}
            if prev_node:
                m, pts = path(prev_node, n)
                if m is None:
                    raise SystemExit('Không tìm được đường đi tới ' + slug)
                st.update({'quang_duong_m': int(round(m / 10) * 10), 'phut': int(math.ceil(m / TOC_DO)),
                           'duong_di': [[round(x, 5), round(y, 5)] for x, y in pts]})
                tong += m
            steps.append(st)
            prev_node = n
        out.append({'ten': l['ten'], 'chang': steps, 'tong_m': int(round(tong / 10) * 10), 'tong_phut': int(math.ceil(tong / TOC_DO))})
        print(l['ten'], '|', int(tong), 'm', '|', ' → '.join('%s (%s)' % (s['ten_pho'], s.get('quang_duong_m', 0)) for s in steps))
    json.dump({'toc_do': '4 km/giờ (dốc)', 'nguon': '© OpenStreetMap contributors (đường đi)', 'lich': out},
              open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'lich_trinh.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, separators=(',', ':'))


if __name__ == '__main__':
    main(sys.argv[1])
