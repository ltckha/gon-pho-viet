"""Bỏ lề giấy Spark vẽ theo (khung tờ, mảng xám, chữ lề) trên ảnh ô đã uốn, trước cat_mep.py. Chạy: python3 tools/sg1961/bo_le.py <thư mục ảnh uốn>
- t2_x100_*: bỏ phần bên trái khung trái tờ 2 (x tờ < 262).
- t2_x3300_y700: xoá chữ "Bình Khánh" Spark chép theo."""
import os, sys, glob
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
D = sys.argv[1]
for f in glob.glob(os.path.join(D, 't2_x100_*.webp')):
    a = np.asarray(Image.open(f).convert('RGBA')).copy(); w = a.shape[1]
    a[:, :int(w * (262 - 225) / 1075), 3] = 0; Image.fromarray(a).save(f, quality=90); print('bỏ lề trái', os.path.basename(f))
f = os.path.join(D, 't2_x3300_y700.webp'); a = np.asarray(Image.open(f).convert('RGBA')).copy(); h, w = a.shape[:2]
# xoá chữ "Bình Khánh" Spark chép theo: nét chữ tối trong khung chữ → tô bằng màu trung vị xung quanh
y0, y1, x0, x1 = int(h * 0.812), int(h * 0.852), int(w * 0.81), w
vung = a[y0:y1, x0:x1, :3].astype(np.float32); toi = vung.mean(2) < 150
toi = ndi.binary_dilation(toi, iterations=4)
_, (iy, ix) = ndi.distance_transform_edt(toi, return_indices=True)      # lấy màu điểm sáng gần nhất
fill = vung[iy, ix]; fill = np.stack([ndi.gaussian_filter(fill[..., c], 3) for c in range(3)], -1)
vung[toi] = fill[toi]; a[y0:y1, x0:x1, :3] = vung.astype(np.uint8)
Image.fromarray(a).save(f, quality=90); print('xoá chữ Bình Khánh', toi.mean())
