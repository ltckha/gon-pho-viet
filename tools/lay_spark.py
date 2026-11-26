#!/usr/bin/env python3
"""Tải hình Spark của một đợt từ Drive (thư mục mẹ Game_ve_thu đã mở link xem — anh Kha cho phép 26/11).

Cách chạy:  python3 tools/lay_spark.py 45 <thư mục lưu>
Tìm thư mục con tên bắt đầu bằng "dot45" trong Game_ve_thu, tải mọi .png về thư mục lưu. Không cần quyền Drive riêng.
"""
import html
import os
import re
import sys
import time
import urllib.request

ME = '1vYXApmtoqjpoQPm6I9zBWx1NBOZRy77D'   # Spark/Inbox/Game_ve_thu
UA = {'User-Agent': 'Mozilla/5.0'}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=90).read()


def ds(folder):
    s = get('https://drive.google.com/embeddedfolderview?id=' + folder).decode('utf-8', 'ignore')
    out = []
    for m in re.finditer(r'href="https://drive\.google\.com/(file/d|drive/folders)/([\w-]+)[^"]*".*?flip-entry-title">([^<]+)<', s, re.S):
        out.append((m.group(1), m.group(2), html.unescape(m.group(3)).strip()))
    return out


def main(dot, dest):
    con = [x for x in ds(ME) if x[0] == 'drive/folders' and x[2].startswith('dot%s' % dot)]
    if not con:
        raise SystemExit('Chưa thấy thư mục dot%s trong Game_ve_thu' % dot)
    os.makedirs(dest, exist_ok=True)
    files = [x for x in ds(con[0][1]) if x[0] == 'file/d' and x[2].lower().endswith('.png')]
    for _, fid, name in files:
        for k in range(3):
            try:
                b = get('https://drive.usercontent.google.com/download?id=%s&export=download' % fid)
                if b[:8] == b'\x89PNG\r\n\x1a\n':
                    open(os.path.join(dest, name), 'wb').write(b)
                    break
            except Exception:
                pass
            time.sleep(3)
        else:
            print('LỖI tải', name)
    print(con[0][2], ':', len(files), 'hình →', dest)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
