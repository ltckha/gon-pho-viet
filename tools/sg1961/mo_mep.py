"""Làm mờ dần mép các ô tranh Sài Gòn 1961 chỗ chồng lên ô bên dưới (anh Kha 27/11 "bản đồ ráp còn lệch": lộ ranh vuông vì
hai ô Spark vẽ khác màu nhau chút). Chỉ mép nào có ô khác nằm dưới mới mờ; mép ngoài cùng của bản đồ giữ sắc.
Mờ trong ~7% bề ngang ô (~60 m) — phần chồng mép giữa hai ô là ~8%.
Ảnh chưa mờ nằm trong lịch sử git (commit 315b80e). Chạy lại: lấy ra một thư mục ngoài kho rồi
  python3 tools/sg1961/mo_mep.py <thư mục ảnh chưa mờ>
(mkdir /tmp/chua_mo && git archive 315b80e assets/sg1961/*.webp | tar -x -C /tmp/chua_mo --strip-components=2)
"""
import json, os, shutil, sys
import numpy as np
from PIL import Image

d = json.load(open('data/sai-gon/1961.json')); A = d['anh_nen']
GOC = sys.argv[1]
def trong(a, lon, lat):                       # điểm có nằm trong ô a không
    tt, tp, dt = map(np.array, (a['tt'], a['tp'], a['dt']))
    u, v = np.linalg.solve(np.c_[tp - tt, dt - tt], np.array([lon, lat]) - tt)
    return 0.01 < u < 0.99 and 0.01 < v < 0.99
R = 0.025                                     # dải mờ ~40 m (0,07 làm vệt mờ chồng hình, anh Kha 28/11)
for k, a in enumerate(A):
    f = a['file']; g = os.path.join(GOC, os.path.basename(f))
    tt, tp, dt = map(np.array, (a['tt'], a['tp'], a['dt']))
    def diem(u, v): return tt + (tp - tt) * u + (dt - tt) * v
    duoi = A[:k]                                # ô vẽ trước = nằm dưới
    canh = {}
    for ten, pts in (('trai', [(R / 2, v) for v in (0.2, 0.5, 0.8)]), ('phai', [(1 - R / 2, v) for v in (0.2, 0.5, 0.8)]),
                     ('tren', [(u, R / 2) for u in (0.2, 0.5, 0.8)]), ('duoi', [(u, 1 - R / 2) for u in (0.2, 0.5, 0.8)])):
        canh[ten] = sum(any(trong(b, *diem(u, v)) for b in duoi) for u, v in pts) >= 2
    im = Image.open(g).convert('RGBA'); w, h = im.size
    al = np.asarray(im)[..., 3].astype(float) / 255
    u = (np.arange(w) + 0.5) / w; v = (np.arange(h) + 0.5) / h
    ru = np.ones(w); rv = np.ones(h)
    ramp = lambda t: np.clip(t / R, 0, 1) ** 1.2
    if canh['trai']: ru = np.minimum(ru, ramp(u))
    if canh['phai']: ru = np.minimum(ru, ramp(1 - u))
    if canh['tren']: rv = np.minimum(rv, ramp(v))
    if canh['duoi']: rv = np.minimum(rv, ramp(1 - v))
    al = al * np.minimum(rv[:, None], ru[None, :])
    arr = np.asarray(im).copy(); arr[..., 3] = (al * 255).round().astype(np.uint8)
    out = Image.fromarray(arr, 'RGBA'); out.save(f, quality=82)
    for sub, k2 in (('nho', 4), ('vua', 2)):
        out.resize((max(1, w // k2), max(1, h // k2)), Image.LANCZOS).save('assets/sg1961/%s/%s' % (sub, os.path.basename(f)), quality=80)
    print(os.path.basename(f), ''.join(c[0] for c, on in canh.items() if on) or '-')
