"""Ráp mép các ô Sài Gòn 1961 bằng ĐƯỜNG CẮT THÔNG MINH thay cho làm mờ (anh Kha 28/11: "khối nhà ko khớp", vệt mờ chồng hình).
Hai ô Spark vẽ khác nhau chút ở dải chồng mép (ô này tô khối nhà, ô kia để trống) → làm mờ ra bóng ma. Ở mỗi mép của ô nằm trên mà
có ô khác bên dưới, tìm đường cắt xuyên dải chồng chạy qua chỗ hai ô GIỐNG NHAU NHẤT (thường là lòng đường) bằng quy hoạch động;
phía ngoài đường cắt bỏ (trong suốt) để lộ ô dưới. Mỗi khối nhà lấy trọn từ một ô. Viền cắt làm mềm 2 điểm ảnh.
Chạy: python3 tools/sg1961/cat_mep.py <thư mục ảnh ô đã uốn, chưa mờ>   → assets/sg1961/*.webp + nho/ + vua/"""
import json, math, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
SRC = sys.argv[1]; M = 1.5
A = json.load(open('data/sai-gon/1961.json'))['anh_nen']
KX = 111320 * math.cos(math.radians(10.76)); KY = 110574
lo0 = min(min(a['tt'][0], a['dt'][0]) for a in A) - 0.003; la0 = max(max(a['tt'][1], a['tp'][1]) for a in A) + 0.003
hi = max(a['tp'][0] + a['dt'][0] - a['tt'][0] for a in A) + 0.003; la1 = min(a['dt'][1] + a['tp'][1] - a['tt'][1] for a in A) - 0.003
CW, CH = int((hi - lo0) * KX / M), int((la0 - la1) * KY / M)
def cxy(p): return np.array([(p[0] - lo0) * KX / M, (la0 - p[1]) * KY / M])
can = np.zeros((CH, CW, 4), np.uint8)                  # tấm ghép các ô đã xử lý (ô dưới)
B = 0.11                                              # bề rộng dải tìm đường cắt (phần chồng mép ~8–9% ô)
def duong_cat(cost):
    """cost: (dài, rộng). Tìm đường đi từ hàng 0 tới hàng cuối, mỗi bước lệch ≤1 cột, tổng cost nhỏ nhất → cột theo từng hàng."""
    L, Wd = cost.shape; acc = cost.copy(); bk = np.zeros((L, Wd), np.int8)
    for i in range(1, L):
        p = acc[i - 1]; cand = np.stack([np.r_[np.inf, p[:-1]], p, np.r_[p[1:], np.inf]])
        k = np.argmin(cand, 0); acc[i] += cand[k, np.arange(Wd)]; bk[i] = k - 1
    j = np.zeros(L, int); j[-1] = int(np.argmin(acc[-1]))
    for i in range(L - 1, 0, -1): j[i - 1] = j[i] + bk[i, j[i]]
    return j
for k, a in enumerate(A):
    im = Image.open(os.path.join(SRC, os.path.basename(a['file']))).convert('RGBA'); w, h = im.size
    s = 2; ws, hs = w // s, h // s                     # tìm đường cắt ở nửa độ phân giải
    arr = np.asarray(im.resize((ws, hs), Image.BILINEAR)).astype(np.float32)
    p0, p1, p2 = cxy(a['tt']), cxy(a['tp']), cxy(a['dt'])
    uu, vv = np.meshgrid((np.arange(ws) + 0.5) / ws, (np.arange(hs) + 0.5) / hs)
    X = p0[0] + (p1[0] - p0[0]) * uu + (p2[0] - p0[0]) * vv; Y = p0[1] + (p1[1] - p0[1]) * uu + (p2[1] - p0[1]) * vv
    duoi = np.stack([ndi.map_coordinates(can[..., c].astype(np.float32), [Y, X], order=1) for c in range(4)], -1)
    co_duoi = duoi[..., 3] > 200; co_tren = arr[..., 3] > 200
    diff = np.abs(arr[..., :3] - duoi[..., :3]).sum(-1)
    diff = ndi.gaussian_filter(diff, 1.5)
    keep = np.ones((hs, ws), bool)
    bw, bh = int(ws * B), int(hs * B)
    def xu_ly(ten):
        # đưa về dạng: dải nằm ở cột 0..bw (mép ở cột 0), chạy dọc theo hàng
        if ten == 'trai': sl = (slice(None), slice(0, bw)); tr = lambda x: x
        elif ten == 'phai': sl = (slice(None), slice(ws - bw, ws)); tr = lambda x: x[:, ::-1]
        elif ten == 'tren': sl = (slice(0, bh), slice(None)); tr = lambda x: x.T
        else: sl = (slice(hs - bh, hs), slice(None)); tr = lambda x: x.T[:, ::-1]
        cd = tr(co_duoi[sl]); ct = tr(co_tren[sl])
        if cd[:, :max(2, cd.shape[1] // 3)].mean() < 0.6: return     # mép này không có ô dưới
        cost = tr(diff[sl]).copy() + 1.0
        cost[~(cd & ct)] = 5000                       # chỉ cắt nơi cả hai ô đều có hình
        cost[:, :3] += 3000                           # không cắt sát mép ngoài cùng
        j = duong_cat(cost)
        bo = np.arange(cost.shape[1])[None, :] < j[:, None]          # phía ngoài đường cắt
        bo &= cd[:, :] | (np.arange(cost.shape[1])[None, :] < 3)     # chỉ bỏ chỗ ô dưới có hình
        m = np.zeros_like(cd); m[:] = bo
        # trả về hệ toạ độ ô
        if ten == 'trai': keep[sl] &= ~m
        elif ten == 'phai': keep[sl] &= ~m[:, ::-1]
        elif ten == 'tren': keep[sl] &= ~m.T
        else: keep[sl] &= ~m[:, ::-1].T
    if k > 0:
        for ten in ('trai', 'phai', 'tren', 'duoi'): xu_ly(ten)
    al = Image.fromarray((keep * 255).astype(np.uint8)).resize((w, h), Image.BILINEAR)
    al = np.asarray(al).astype(np.float32) / 255
    al = ndi.gaussian_filter(al, 1.5)
    full = np.asarray(im).astype(np.float32); full[..., 3] *= al
    out = Image.fromarray(np.clip(full, 0, 255).astype(np.uint8), 'RGBA')
    out.save(a['file'], quality=82)
    for sub, f2 in (('nho', 4), ('vua', 2)):
        out.resize((max(1, w // f2), max(1, h // f2)), Image.LANCZOS).save('assets/sg1961/%s/%s' % (sub, os.path.basename(a['file'])), quality=80)
    # dán lên tấm ghép
    q0 = p0; Ti = np.linalg.inv(np.c_[p1 - p0, p2 - p0])
    bx0, by0 = np.floor(np.min([p0, p1, p2, p1 + p2 - p0], 0)).astype(int); bx1, by1 = np.ceil(np.max([p0, p1, p2, p1 + p2 - p0], 0)).astype(int)
    bx0, by0 = max(bx0, 0), max(by0, 0); bx1, by1 = min(bx1, CW), min(by1, CH)
    qq = q0 - [bx0, by0]
    c = [Ti[0, 0] * w, Ti[0, 1] * w, -(Ti[0] @ qq) * w, Ti[1, 0] * h, Ti[1, 1] * h, -(Ti[1] @ qq) * h]
    t = np.asarray(out.transform((bx1 - bx0, by1 - by0), Image.AFFINE, c, resample=Image.BILINEAR)).astype(np.float32)
    reg = can[by0:by1, bx0:bx1].astype(np.float32); al2 = t[..., 3:4] / 255
    reg[..., :3] = t[..., :3] * al2 + reg[..., :3] * (1 - al2); reg[..., 3] = np.maximum(reg[..., 3], t[..., 3])
    can[by0:by1, bx0:bx1] = reg.astype(np.uint8)
    print(os.path.basename(a['file']), 'giữ %.0f%%' % (keep.mean() * 100), flush=True)
