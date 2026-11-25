#!/usr/bin/env python3
"""Tạo data/lang-gieng.json: ranh giới các nước láng giềng (Trung Quốc, Lào, Campuchia, Thái Lan) để vẽ mờ quanh Việt Nam,
cho đất nước bạn khỏi bị tô màu biển.

Cách chạy:
  curl -sL -o /tmp/c10.json https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-10m.json
  python3 tools/build_lang_gieng.py /tmp/c10.json
Nguồn: Natural Earth 1:10m (public domain), bản TopoJSON của gói world-atlas.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_data import dp  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NUOC = {'China': 'Trung Quốc', 'Laos': 'Lào', 'Cambodia': 'Campuchia', 'Thailand': 'Thái Lan'}
NHAN = {'Trung Quốc': [106.0, 23.6], 'Lào': [103.2, 19.2], 'Campuchia': [104.9, 12.6], 'Thái Lan': [103.3, 15.4]}
BOX = (95.0, 4.0, 122.0, 27.0)   # chỉ giữ phần quanh Việt Nam


def main(path):
    topo = json.load(open(path, encoding='utf-8'))
    sx, sy = topo['transform']['scale']
    tx, ty = topo['transform']['translate']
    arcs = []
    for a in topo['arcs']:
        x = y = 0
        pts = []
        for dx, dy in a:
            x += dx
            y += dy
            pts.append((x * sx + tx, y * sy + ty))
        arcs.append(pts)

    def ring(idx):
        out = []
        for i in idx:
            seg = arcs[i] if i >= 0 else arcs[~i][::-1]
            out.extend(seg if not out else seg[1:])
        return out

    res = []
    for g in topo['objects']['countries']['geometries']:
        name = g['properties']['name']
        if name not in NUOC:
            continue
        polys = g['arcs'] if g['type'] == 'MultiPolygon' else [g['arcs']]
        hinh = []
        for poly in polys:
            r = ring(poly[0])
            xs = [p[0] for p in r]
            ys = [p[1] for p in r]
            if max(xs) < BOX[0] or min(xs) > BOX[2] or max(ys) < BOX[1] or min(ys) > BOX[3]:
                continue
            r = [[round(x, 3), round(y, 3)] for x, y in dp(r, 0.01)]
            if len(r) >= 4:
                hinh.append([r])
        res.append({'ten': NUOC[name], 'nhan': NHAN[NUOC[name]], 'hinh': hinh})
    out = {'nguon': {'ten': 'Nước láng giềng: Natural Earth 1:10m (public domain)', 'link': 'https://www.naturalearthdata.com/'},
           'nuoc': res}
    p = os.path.join(ROOT, 'data', 'lang-gieng.json')
    json.dump(out, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(p, os.path.getsize(p) // 1024, 'KB', [(r['ten'], len(r['hinh'])) for r in res])


if __name__ == '__main__':
    main(sys.argv[1])
