#!/usr/bin/env python3
"""Tách Điều 1 Nghị quyết 1671/NQ-UBTVQH15 (xã/phường mới của Lâm Đồng gộp từ đâu) thành JSON.

Cách chạy:
  python3 tools/parse_nq1671.py <file html toàn văn trên baolamdong.vn>
Ra: data/lam-dong/nq1671.json
Nguồn: https://baolamdong.vn/toan-van-nghi-quyet-so-1671-nq-ubtvqh15-sap-xep-cac-dvhc-cap-xa-cua-tinh-lam-dong-nam-2025-255777.html
"""
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = 'https://baolamdong.vn/toan-van-nghi-quyet-so-1671-nq-ubtvqh15-sap-xep-cac-dvhc-cap-xa-cua-tinh-lam-dong-nam-2025-255777.html'


def main(path):
    s = open(path, encoding='utf-8', errors='ignore').read()
    s = re.sub(r'<script.*?</script>|<style.*?</style>', '', s, flags=re.S)
    t = html.unescape(re.sub(r'<[^>]+>', '\n', s))
    flat = re.sub(r'\s*\n\s*', ' ', t)
    items = re.findall(
        r' (\d{1,3})\. Sắp xếp toàn bộ diện tích tự nhiên, quy mô dân số (?:của )?(.+?) thành '
        r'(?:xã|phường|đặc khu)(?: mới)? có tên gọi là ((?:xã|phường|đặc khu|Phường) ?.+?) \.', flat)
    out = [{'muc': int(n), 'ten_moi': ten.strip(), 'gop_tu': cu.strip()} for n, cu, ten in items]
    have = {o['muc'] for o in out}
    # Khoản 119 (đặc khu) và 120 (đổi tên) viết khác mẫu — chép tay từ văn bản
    if 119 not in have:
        out.append({'muc': 119, 'ten_moi': 'đặc khu Phú Quý', 'gop_tu': 'các xã Long Hải, Ngũ Phụng và Tam Thanh'})
    out.append({'muc': 120, 'ten_moi': 'xã Đạ Huoai 3', 'gop_tu': 'đổi tên từ xã Bà Gia'})
    for x in ['Quảng Hòa', 'Quảng Sơn', 'Quảng Trực', 'Ninh Gia']:  # khoản 121
        out.append({'muc': 121, 'ten_moi': 'xã ' + x, 'gop_tu': 'giữ nguyên, không sắp xếp'})
    out.sort(key=lambda o: o['muc'])
    os.makedirs(os.path.join(ROOT, 'data', 'lam-dong'), exist_ok=True)
    p = os.path.join(ROOT, 'data', 'lam-dong', 'nq1671.json')
    json.dump({'nguon': SRC, 'van_ban': 'Nghị quyết 1671/NQ-UBTVQH15 ngày 16/6/2025', 'ds': out},
              open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(p, len(out), 'mục')


if __name__ == '__main__':
    main(sys.argv[1])
