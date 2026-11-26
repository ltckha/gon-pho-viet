#!/usr/bin/env python3
"""Tô màu xã/phường trong tỉnh cho dễ nhìn: hai nơi sát nhau không trùng màu (tô màu đồ thị kiểu tham lam).

Cách chạy:  python3 tools/to_mau.py data/lam-dong/phuong.json
Thêm trường `mau` (0..5) cho mỗi xã/phường; app.js đổi số này thành màu pastel nét bản đồ game.
Hai nơi coi là sát nhau khi có điểm ranh giới cách nhau dưới ~150 m (dữ liệu đã lược điểm nên không trùng khít).
"""
import json
import sys
from collections import defaultdict

G = 0.0015   # ô lưới ~150 m


def main(path):
    d = json.load(open(path, encoding='utf-8'))
    key = 'phuong' if 'phuong' in d else 'tinh'
    items = d[key]
    o = defaultdict(set)
    for i, t in enumerate(items):
        for poly in t['hinh']:
            for ring in poly:
                for x, y in ring:
                    o[(int(x / G), int(y / G))].add(i)
    ke = defaultdict(set)
    for (cx, cy), s in o.items():
        near = set(s)
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                near |= o.get((cx + dx, cy + dy), set())
        for a in s:
            ke[a] |= near - {a}
    # tô nơi nhiều láng giềng trước
    mau = {}
    for i in sorted(range(len(items)), key=lambda i: -len(ke[i])):
        dung = {mau[j] for j in ke[i] if j in mau}
        mau[i] = next(c for c in range(12) if c not in dung)
    for i, t in enumerate(items):
        t['mau'] = mau[i] % 6
    json.dump(d, open(path, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(path, 'số màu cần:', max(mau.values()) + 1, '| láng giềng trung bình:', round(sum(len(v) for v in ke.values()) / len(items), 1))


if __name__ == '__main__':
    main(sys.argv[1])
