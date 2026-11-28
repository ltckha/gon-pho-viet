"""Dựng cả bản đồ Sài Gòn 1961 thành MỘT ảnh y như trang vẽ (các ô đã mờ mép, đúng thứ tự chồng), để nhìn tận mắt mép nối.
Chạy: python3 tools/sg1961/dung_tam.py <ra.png> [mét/điểm=3] [thư mục ảnh ô, mặc định assets/sg1961]"""
import json, math, os, sys
import numpy as np
from PIL import Image
out = sys.argv[1]; M = float(sys.argv[2]) if len(sys.argv) > 2 else 3.0; DIR = sys.argv[3] if len(sys.argv) > 3 else 'assets/sg1961'
A = json.load(open(os.environ.get('DATA', 'data/sai-gon/1961.json')))['anh_nen']
KX = 111320 * math.cos(math.radians(10.76)); KY = 110574
lo0 = min(min(a['tt'][0], a['dt'][0]) for a in A); hi = max(max(a['tp'][0], a['tp'][0] + a['dt'][0] - a['tt'][0]) for a in A)
la0 = max(max(a['tt'][1], a['tp'][1]) for a in A); la1 = min(a['dt'][1] + a['tp'][1] - a['tt'][1] for a in A)
W, H = int((hi - lo0) * KX / M), int((la0 - la1) * KY / M)
def xy(lon, lat): return np.array([(lon - lo0) * KX / M, (la0 - lat) * KY / M])
nen = Image.new('RGB', (W, H), (250, 246, 236))
for a in A:
    im = Image.open(os.path.join(DIR, os.path.basename(a['file']))).convert('RGBA'); w, h = im.size
    p0, p1, p2 = xy(*a['tt']), xy(*a['tp']), xy(*a['dt']); Ti = np.linalg.inv(np.c_[p1 - p0, p2 - p0])
    c = [Ti[0, 0] * w, Ti[0, 1] * w, -(Ti[0] @ p0) * w, Ti[1, 0] * h, Ti[1, 1] * h, -(Ti[1] @ p0) * h]
    t = im.transform((W, H), Image.AFFINE, c, resample=Image.BILINEAR); nen.paste(t, (0, 0), t)
nen.save(out); print(W, H)
