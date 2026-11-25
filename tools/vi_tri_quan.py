#!/usr/bin/env python3
"""Dò toạ độ cho quán trong data/pho/*.json bằng dữ liệu OpenStreetMap đã tải (tools/tai_osm.py).

Cách chạy:
  python3 tools/vi_tri_quan.py <thư mục .xml OSM>

Chỉ nhận vị trí khi chắc:
  1. OSM có điểm/khối mang ĐÚNG tên quán (so không dấu, các chữ chính khớp cả hai chiều) và nằm trong 80 m quanh con đường của quán; hoặc
  2. OSM có điểm/khối ghi đúng số nhà + tên đường (addr:housenumber, addr:street); "Hẻm 23 Trần Phú" khác "Trần Phú".
Không khớp thì để vi_tri = null (trang phố sẽ ghi "chưa có vị trí chính xác"). Không đoán, không nội suy.
"""
import glob
import json
import math
import os
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STOP = {'quan', 'tiem', 'cafe', 'ca', 'phe', 'coffee', 'cf', 'nha', 'da', 'lat', 'dalat', 'the', 'and', 'va', 'so'}


# Tên trên OSM viết khác tên quán — em (Claude) đã soát tay từng cặp ngày 25/11/2026; vẫn phải sát đúng đường ≤ 80 m.
ALIAS = {
    'Nari - Chè Kem Bơ': 'Kem Nari',                                   # OSM ghi 74c Nguyễn Văn Trỗi
    'Dalat Palace Heritage Hotel': 'Dalat Palace Hotel',
    'Du Parc Hotel Dalat': 'Du Parc',
    'Nhà thờ Chính tòa Đà Lạt (nhà thờ Con Gà)': 'Nhà thờ Chánh tòa',
    'Tiệm bánh Liên Hoa (Liên Hoa Bakery)': 'Liên Hoa',
    'Nem nướng Bà Hùng': 'Nem Nuong Ba Hung',
}


def words(s):
    s = unicodedata.normalize('NFD', (s or '').lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').replace('đ', 'd')
    return re.sub(r'[^a-z0-9 ]', ' ', s).split()


def key_words(s):
    return {w for w in words(s) if w not in STOP and not w.isdigit()}


def same_name(a, b):
    """Khớp hai chiều: mọi chữ chính của tên này đều có trong tên kia và ngược lại.
    (Tránh "Café Nga" khớp nhầm "Miến gà Nga", "Bánh ướt lòng gà Long" khớp nhầm "…Hằng".)"""
    ka, kb = key_words(a), key_words(b)
    da = {w.lstrip('0') for w in words(a) if w.isdigit()}
    db = {w.lstrip('0') for w in words(b) if w.isdigit()}
    return bool(ka) and ka == kb and da == db   # "Bánh tráng nướng 112" không khớp "Bánh tráng nướng" 


def meters(a, b):
    return math.hypot((a[0] - b[0]) * 108900, (a[1] - b[1]) * 110540)


def seg_dist(p, a, b):
    ax, ay = (a[0] - p[0]) * 108900, (a[1] - p[1]) * 110540
    bx, by = (b[0] - p[0]) * 108900, (b[1] - p[1]) * 110540
    dx, dy = bx - ax, by - ay
    t = 0 if dx == dy == 0 else max(0, min(1, -(ax * dx + ay * dy) / (dx * dx + dy * dy)))
    return math.hypot(ax + t * dx, ay + t * dy)


def load(folder):
    feats = []
    for f in sorted(glob.glob(os.path.join(folder, '*.xml'))):
        root = ET.parse(f).getroot()
        nodes = {n.get('id'): (float(n.get('lon')), float(n.get('lat'))) for n in root.iter('node')}
        for e in root:
            if e.tag not in ('node', 'way'):
                continue
            t = {x.get('k'): x.get('v') for x in e.findall('tag')}
            if not t:
                continue
            if e.tag == 'node':
                pt = nodes[e.get('id')]
            else:
                pts = [nodes[nd.get('ref')] for nd in e.findall('nd') if nd.get('ref') in nodes]
                if not pts:
                    continue
                pt = (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))
            feats.append((e.tag + '/' + e.get('id'), t, pt))
    return feats


def main(osm_dir):
    duong = json.load(open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'duong.json'), encoding='utf-8'))
    roads = {}
    for d in duong['duong']:
        if 'ten' in d:
            roads.setdefault(d['ten'], []).append(d['pts'])
    feats = load(osm_dir)
    print('OSM:', len(feats), 'điểm có thẻ')

    def near_road(pt, road):
        best = 1e9
        for pts in roads.get(road, []):
            for i in range(len(pts) - 1):
                best = min(best, seg_dist(pt, pts[i], pts[i + 1]))
        return best

    for f in sorted(glob.glob(os.path.join(ROOT, 'data', 'pho', '*.json'))):
        pho = json.load(open(f, encoding='utf-8'))
        found = 0
        for p in pho.get('dia_diem', []):
            road = p.get('duong') or pho.get('road')
            p['vi_tri'] = None
            kw = key_words(p['ten'])
            cands = []
            for oid, t, pt in feats:
                name = t.get('name')
                if name and (same_name(p['ten'], name) or (p['ten'] in ALIAS and same_name(ALIAS[p['ten']], name))):
                    d = near_road(pt, road)
                    if d <= 80:
                        how = 'tên trên OpenStreetMap: ' + name + (' (ghép tay)' if p['ten'] in ALIAS else '')
                        cands.append((d, oid, pt, how))
            if not cands and p.get('so_nha'):
                for oid, t, pt in feats:
                    if t.get('addr:housenumber', '').upper() == str(p['so_nha']).upper() and words(t.get('addr:street', '')) == words(road):
                        cands.append((near_road(pt, road), oid, pt, 'số nhà trên OpenStreetMap: ' + t['addr:housenumber'] + ' ' + t['addr:street']))
            if cands:
                cands.sort()
                d, oid, pt, how = cands[0]
                p['vi_tri'] = {'lon': round(pt[0], 6), 'lat': round(pt[1], 6), 'cach': how, 'osm': oid}
                found += 1
        json.dump(pho, open(f, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(os.path.basename(f), found, '/', len(pho.get('dia_diem', [])), 'nơi có vị trí')
        for p in pho.get('dia_diem', []):
            if p['vi_tri']:
                print('   ', p['ten'], '→', p['vi_tri']['cach'], p['vi_tri']['osm'])


if __name__ == '__main__':
    main(sys.argv[1])
