#!/usr/bin/env python3
"""Tấm nền Spark cho bản đồ Việt Nam (tầng đầu): lấy từ kho game (chỉ đọc), pha màu sẵn, thu nhỏ cho nhẹ.

Cách chạy:  python3 tools/nen_spark.py /home/user/ltckha/giang-ho-ai
Ra assets/nen/{tinh,mo,bien,lang_gieng}.webp (256×256, lặp liền mép). Trang tự trải vào trong ranh giới thật
của 34 tỉnh (data/viet-nam.json), nên ranh giới, Hoàng Sa, Trường Sa vẫn đúng dữ liệu; tên tỉnh là chữ của trang.
"""
import os
import sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# (tên ra, tấm nền game, màu pha, tỉ lệ giữ tranh, đổi xám)
BO = [('tinh', 'nen_bd_co_thong', (243, 234, 210), 0.42, False),     # tỉnh thường: cỏ Spark pha kem
      ('mo', 'nen_bd_co_thong', (140, 196, 154), 0.80, False),       # tỉnh có bản đồ phố (Lâm Đồng): cỏ đậm
      ('bien', 'nen_bd_nuoc_ho', (207, 230, 238), 0.38, False),      # biển
      ('lang_gieng', 'nen_bd_dat_doi', (222, 218, 209), 0.14, True)] # nước láng giềng: đất pha xám


def main(game):
    out = os.path.join(ROOT, 'assets', 'nen')
    os.makedirs(out, exist_ok=True)
    for ten, f, mau, giu, xam in BO:
        im = Image.open(os.path.join(game, 'art', 'ban_do', f + '.png')).convert('RGB').resize((256, 256), Image.LANCZOS)
        if xam:
            im = ImageOps.grayscale(im).convert('RGB')
        im = Image.blend(Image.new('RGB', im.size, mau), im, giu)
        p = os.path.join(out, ten + '.webp')
        im.save(p, 'WEBP', quality=72, method=6)
        print(p, os.path.getsize(p) // 1024, 'KB')


if __name__ == '__main__':
    main(sys.argv[1])
