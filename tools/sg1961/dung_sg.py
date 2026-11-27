"""Dựng bản đồ Sài Gòn 1961 vẽ lại (giống Đà Lạt 1963, cách 2) từ ảnh quét tờ 1:10.000 đã đặt toạ độ.

Chạy: SG_OSM=<đường OSM [{pts}] .json> python3 -I tools/sg1961/dung_sg.py <ảnh tờ .jpg> <toạ độ tờ .json> <x0 y0 x1 y1 vùng cắt> <ra.json>
Lấy từ màu in (ảnh xám):
  - phố: khe SÁNG (> 150) giữa các khối → khung xương, bề rộng theo khoảng cách tới mép → cấp đường
  - khối phố: phần không sáng, gom mượt → nền khu
  - nhà: mực đậm (< 90) dày đặc (nét gạch chéo, khối đen) → khối, nắn chữ nhật nếu gần vuông
  - sông rạch: xám đều, ít hạt (độ lệch chuẩn thấp), mảng lớn
  - công viên: chấm lấm tấm xám đậm trong vùng không có nhà
"""
import json, math, os, sys, warnings
import numpy as np
from PIL import Image
warnings.filterwarnings('ignore')
from scipy import ndimage as ndi
from skimage.morphology import skeletonize, remove_small_objects, remove_small_holes, disk, binary_closing, binary_opening
from skimage.measure import find_contours, approximate_polygon, label, regionprops
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from geo import nap
Image.MAX_IMAGE_PIXELS = None


def main(anh, toado, x0, y0, x1, y1, ra):
    _, px2ll = nap(toado)
    g = np.asarray(Image.open(anh).convert('L').crop((x0, y0, x1, y1))).astype(np.float32)
    H, W = g.shape
    def ll(pts):   # [(x, y)] điểm ảnh trong vùng cắt → [[lon, lat]]
        P = np.array(pts, float)
        q = px2ll(P[:, 0] + x0, P[:, 1] + y0)
        return [[round(a, 6), round(b, 6)] for a, b in q]

    m5 = ndi.uniform_filter(g, 5)
    m15 = ndi.uniform_filter(g, 15); sd15 = np.sqrt(np.maximum(ndi.uniform_filter(g * g, 15) - m15 * m15, 0))
    # chữ tên đường in ngay trong lòng đường là nét đen mảnh → lấp bằng phép đóng xám 5×5 trước khi lấy khe sáng
    gc = ndi.grey_closing(g, size=(5, 5))
    light = binary_opening(ndi.uniform_filter(gc, 3) > 140, disk(1))
    ink = ndi.uniform_filter((g < 90).astype(np.float32), 5)

    # ---- sông rạch: xám đều, mảng lớn ----
    nuoc_m = (sd15 < 14) & (m15 > 90) & (m15 < 140)
    nuoc_m = remove_small_holes(remove_small_objects(binary_opening(nuoc_m, disk(4)), 6000), 3000)
    # ---- nhà ----
    nha_m = binary_opening(binary_closing(ink > 0.45, disk(2)), disk(1)) & ~nuoc_m
    nha_m = remove_small_objects(nha_m, 25)
    # ---- công viên: không sáng, không nhà, có hạt chấm (độ lệch chuẩn vừa), mảng vừa ----
    cv_m = (~light) & (ink < 0.25) & (sd15 > 12) & (m15 < 140) & ~nuoc_m
    cv_m = remove_small_holes(remove_small_objects(binary_opening(cv_m, disk(5)), 4000), 2000)
    # ---- khối phố ----
    khu_m = remove_small_holes(remove_small_objects(binary_opening(~light & ~nuoc_m, disk(2)), 300), 200)

    def polys(mask, tol, scale=1):
        out = []
        for c in find_contours(np.pad(mask, 1).astype(float), 0.5):
            c = approximate_polygon(c - 1, tol)
            if len(c) >= 4:
                out.append(ll([(p[1] * scale, p[0] * scale) for p in c]))
        return out
    sm = lambda m: np.asarray(Image.fromarray(m.astype(np.uint8) * 255).resize((W // 2, H // 2), Image.BOX)) > 127
    nuoc = polys(sm(nuoc_m), 1.0, 2); cv = polys(sm(cv_m), 1.0, 2); khu = polys(sm(khu_m), 0.8, 2)

    # nhà: chữ nhật nhỏ nhất nếu đầy ≥ 72%, không thì đa giác gọn
    nha = []
    for rp in regionprops(label(nha_m, connectivity=1)):
        if rp.area < 25 or rp.area > 40000:
            continue
        cs = find_contours(np.pad(rp.image, 1).astype(float), 0.5)
        if not cs:
            continue
        c = approximate_polygon(max(cs, key=len) - 1, 1.0)
        P = np.array([(p[1] + rp.bbox[1], p[0] + rp.bbox[0]) for p in c])
        if len(P) < 4:
            continue
        best = None
        for i in range(len(P) - 1):
            e = P[i + 1] - P[i]; Lg = np.hypot(*e)
            if Lg < 1e-6:
                continue
            u = e / Lg; v = np.array([-u[1], u[0]]); a, b = P @ u, P @ v
            A = (a.max() - a.min()) * (b.max() - b.min())
            if best is None or A < best[0]:
                best = (A, u, v, a.min(), a.max(), b.min(), b.max())
        if best and rp.area / max(best[0], 1) >= 0.72:
            _, u, v, a0, a1, b0, b1 = best
            P = np.array([u * a + v * b for a, b in ((a0, b0), (a1, b0), (a1, b1), (a0, b1))])
        nha.append(ll(P.tolist()))

    # ---- phố: lần theo đường OpenStreetMap hôm nay làm MỐC TÌM (như Đà Lạt bước 2): mỗi 3 m tìm tim khe sáng trên bản 1961
    #      trong ±6 điểm ảnh; đoạn nào bản cũ không có khe sáng thì bỏ. Nét vẽ là tim khe trên bản cũ, bề rộng khe → cấp đường.
    ll2px, _ = nap(toado)
    dt = ndi.distance_transform_edt(light)
    sk = skeletonize(light) & (dt >= 1.5)
    dsk, isk = ndi.distance_transform_edt(~sk, return_indices=True)
    KX = 111320 * math.cos(math.radians(10.78)); KY = 110574
    duong = []
    for e in json.load(open(os.environ['SG_OSM'], encoding='utf-8')):
        g2 = e['pts']
        if len(g2) < 2:
            continue
        P = ll2px(np.array([q[0] for q in g2]), np.array([q[1] for q in g2])) - [x0, y0]
        Q = [P[0]]
        for a1, b1 in zip(P, P[1:]):
            n = max(1, int(np.hypot(*(b1 - a1)) / 2))
            Q += [a1 + (b1 - a1) * t for t in np.linspace(0, 1, n + 1)[1:]]
        Q = np.array(Q)
        ok = (Q[:, 0] >= 1) & (Q[:, 1] >= 1) & (Q[:, 0] < W - 1) & (Q[:, 1] < H - 1)
        xi = np.clip(Q[:, 0].astype(int), 0, W - 1); yi = np.clip(Q[:, 1].astype(int), 0, H - 1)
        hit = ok & (dsk[yi, xi] <= 6)
        # lấp lỗ ≤ 6 mẫu (~8 m: ngã tư, chữ in đè lên đường)
        h = hit.copy(); i = 0; n = len(h)
        while i < n:
            if not h[i]:
                j = i
                while j < n and not h[j]:
                    j += 1
                if 0 < i and j < n and j - i <= 6:
                    h[i:j] = True
                i = j
            else:
                i += 1
        h &= ok
        sx = np.where(hit, isk[1][yi, xi], Q[:, 0]); sy = np.where(hit, isk[0][yi, xi], Q[:, 1])
        i = 0
        while i < n:
            if not h[i]:
                i += 1; continue
            j = i
            while j < n and h[j]:
                j += 1
            if j - i >= 12:
                R = np.c_[sx[i:j], sy[i:j]].astype(float)
                R = ndi.uniform_filter1d(R, 9, axis=0, mode='nearest')
                w = float(np.median(dt[sy[i:j].astype(int), sx[i:j].astype(int)]))
                loai = 1 if w >= 9 else 2 if w >= 6 else 3
                duong.append({'loai': loai, 'pts': ll(approximate_polygon(R, 0.8).tolist())})
            i = j
    print('phố', len(duong), 'nhà', len(nha), 'khối', len(khu), 'sông', len(nuoc), 'công viên', len(cv))

    lo0, la0 = px2ll(np.array([x0]), np.array([y1]))[0]; lo1, la1 = px2ll(np.array([x1]), np.array([y0]))[0]
    khung = [round(min(lo0, lo1), 5), round(min(la0, la1), 5), round(max(lo0, lo1), 5), round(max(la0, la1), 5)]
    ox, oy = khung[0], khung[1]; nen = []
    for poly in nha:
        q = [(round((a - ox) * 1e5), round((b - oy) * 1e5)) for a, b in poly]
        f = [q[0][0], q[0][1]]
        for (a1, b1), (a2, b2) in zip(q, q[1:]):
            if (a2, b2) != (a1, b1):
                f += [a2 - a1, b2 - b1]
        if len(f) >= 6:
            nen.append(f)
    data = {'nam': 1961, 'khung': khung, 'duong': duong, 'duong_mat': [], 'duong_mon': [], 'ten_duong': [], 'diem': [], 'dia_danh': [],
            'cong_trinh': [], 'nuoc': nuoc, 'rung': cv, 'khu': [], 'nha': nen,
            'nha_cach_ghi': 'mỗi khối: [x0, y0, dx, dy, ...] đơn vị 1e-5 độ tính từ khung[0], khung[1]',
            'nguon': [{'ten': 'Bản đồ Sài Gòn 1:10.000 (Indochina City Plans), ấn bản 2-AMS 1961 — vẽ lại từ bản này. Tài liệu chính phủ Mỹ.',
                       'link': 'https://maps.lib.utexas.edu/maps/vietnam.html'}]}
    if os.path.exists(ra):
        cu = json.load(open(ra, encoding='utf-8'))
        for k in ('ten_duong', 'cong_trinh', 'dia_danh', 'diem'):
            if cu.get(k):
                data[k] = cu[k]
    json.dump(data, open(ra, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(ra, os.path.getsize(ra) // 1024, 'KB')


if __name__ == '__main__':
    a = sys.argv[1:]
    if len(a) < 7:
        sys.exit(__doc__)
    main(a[0], a[1], *map(int, a[2:6]), a[6])
