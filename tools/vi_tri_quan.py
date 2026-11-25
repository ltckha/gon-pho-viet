#!/usr/bin/env python3
"""Dò toạ độ cho quán trong data/pho/*.json bằng dữ liệu OpenStreetMap đã tải (tools/tai_osm.py).

Cách chạy:
  python3 tools/vi_tri_quan.py <thư mục .xml OSM>

Chỉ nhận vị trí khi chắc:
  1. OSM có điểm/khối mang ĐÚNG tên quán (so không dấu, đủ các chữ chính) và nằm trong 80 m quanh con đường của quán; hoặc
  2. OSM có điểm/khối ghi đúng số nhà + tên đường (addr:housenumber, addr:street).
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
STOP = {'quan', 'tiem', 'cafe', 'ca', 'phe', 'coffee', 'cf', 'nha', 'hang', 'da', 'lat', 'dalat', 'the', 'and', 'va'}


def words(s):
    s = unicodedata.normalize('NFD', (s or '').lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').replace('đ', 'd')
    return re.sub(r'[^a-z0-9 ]', ' ', s).split()


def key_words(s):
    return {w for w in words(s) if w not in STOP}


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
                if name and kw and kw <= key_words(name):
                    d = near_road(pt, road)
                    if d <= 80:
                        cands.append((d, oid, pt, 'tên trên OpenStreetMap: ' + name))
            if not cands and p.get('so_nha'):
                for oid, t, pt in feats:
                    if t.get('addr:housenumber') == str(p['so_nha']) and words(t.get('addr:street', '')) [-len(words(road)):] == words(road):
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
