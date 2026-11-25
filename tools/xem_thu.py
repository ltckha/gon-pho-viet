#!/usr/bin/env python3
"""Gom trang + dữ liệu vào một thư mục để đăng bản xem thử (Artifact của Claude).

Cách chạy:
  python3 tools/xem_thu.py <thư mục ra>
Bản xem thử cần trang không có <!doctype>/<html>/<head>/<body> (khung Artifact tự bọc),
nên chỉ lấy phần giữa hai dấu <!--NOI-DUNG--> trong index.html. Bản thật (Cloudflare Pages) dùng nguyên index.html.
"""
import glob
import os
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HEAD = ('<title>Gọn Phố Việt</title>\n'
        '<meta name="claude:viewport-fit-sides" content="cover">\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap">\n'
        '<link rel="stylesheet" href="style.css">\n')


def main(out):
    s = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    body = s.split('<!--NOI-DUNG-->')[1].split('<!--/NOI-DUNG-->')[0]
    os.makedirs(out, exist_ok=True)
    open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(HEAD + body)
    files = ['style.css', 'app.js'] + [os.path.relpath(f, ROOT) for f in glob.glob(os.path.join(ROOT, 'data', '**', '*.json'), recursive=True)
                                       if not f.endswith('nq1671.json')]
    for f in files:
        os.makedirs(os.path.dirname(os.path.join(out, f)) or out, exist_ok=True)
        shutil.copy(os.path.join(ROOT, f), os.path.join(out, f))
    print('Đã gom vào', out)
    for f in files:
        print(' ', f)


if __name__ == '__main__':
    main(sys.argv[1])
