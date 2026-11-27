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

    # Tờ Sài Gòn in khác Đà Lạt (soát 27/11): mỗi KHỐI PHỐ có đường viền đen mảnh khép kín; nhà là ô gạch chéo trong khối;
    # đường KHÔNG có nét riêng — chỉ là khoảng giấy giữa các viền. Nên: lấy mực (< 105), nở 1 điểm ảnh nối nét gạch,
    # bỏ mẩu nhỏ (chữ rời, chấm), LẤP LÒNG vùng khép kín → khối phố; phần giấy còn lại nối ra mép = đường.
    m15 = ndi.uniform_filter(g, 15); sd15 = np.sqrt(np.maximum(ndi.uniform_filter(g * g, 15) - m15 * m15, 0))
    ink = g < 105
    # lưới toạ độ in mảnh chạy gần ngang / gần dọc cả tờ cắt đường thành ô → bỏ phần lưới đứng lẻ (quanh ít mực)
    luoi = ndi.binary_dilation(ndi.binary_opening(ink, np.ones((1, 151))) | ndi.binary_opening(ink, np.ones((151, 1))), iterations=1)
    ink2 = ink & ~(luoi & (ndi.uniform_filter(ink.astype(np.float32), 9) < 0.35))
    inkd = remove_small_objects(ndi.binary_dilation(ink2, iterations=1), 40)
    # vùng giấy: mạng lưới thưa, mảnh, trải rộng (≥ 160 điểm ảnh ~ 220 m) = ĐƯỜNG; còn lại = khối phố
    #   (không dùng "lấp lòng": mạng đường bị chữ, lưới khép kín ở mép thì cả thành phố thành một khối)
    lab_g, _ = ndi.label(~inkd); dtg = ndi.distance_transform_edt(~inkd)
    pho = np.zeros_like(inkd)
    for k, sl in enumerate(ndi.find_objects(lab_g)):
        h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if max(h, w) < 160:
            continue
        mm = lab_g[sl] == k + 1
        if mm.sum() / (h * w) < 0.35 and dtg[sl][mm].mean() < 7:
            pho[sl] |= mm
    blk = binary_opening(~pho, disk(2))
    # sông rạch: xám đều, ít hạt, mảng lớn (vùng mặt nước bị lấp lòng chung với khối thì tách ra)
    nuoc_m = (sd15 < 14) & (m15 > 90) & (m15 < 140)
    nuoc_m = remove_small_holes(remove_small_objects(binary_opening(nuoc_m, disk(4)), 6000), 3000)
    blk &= ~nuoc_m
    blk = remove_small_objects(blk, 150)
    # nhà: ô gạch chéo = mực dày (≥ 35% trong ô 7×7) bên trong khối, trừ viền khối; khối đen đặc = công trình lớn
    dens = ndi.uniform_filter(ink.astype(np.float32), 7)
    trong = ndi.binary_erosion(blk, iterations=3)
    # nhà in gạch chéo xám: trung bình ô 7×7 tối (gạch ~80–100, giấy ~165) — mở disk(3) bỏ chữ, nét mảnh; nở lại 2 điểm cho đủ viền;
    # chỉ trong khối phố (chữ tên đường in trong lòng đường không thành nhà)
    # đo 27/11: nhà gạch chéo độ lệch chuẩn ô 9×9 ~40; bồn cỏ chấm mịn ~12–20 (cùng độ xám ~100–110) → tách bằng độ lốm đốm
    sd9 = ndi.uniform_filter(np.sqrt(np.maximum(ndi.uniform_filter(g * g, 9) - ndi.uniform_filter(g, 9) ** 2, 0)), 9)
    nha_m = remove_small_objects(binary_opening((ndi.uniform_filter(g, 7) < 105) & (sd9 > 27), disk(3)), 60)
    nha_m = ndi.binary_dilation(nha_m, iterations=2) & blk
    dac_m = remove_small_objects(binary_opening((ndi.uniform_filter(ink.astype(np.float32), 9) > 0.85) & blk, disk(2)), 80)
    # vườn hoa, công viên: chấm lấm tấm (mực thưa 4–25%) chiếm phần lớn khối, không có nhà
    # công viên, vườn hoa: xét từng KHỐI — ít nhà (< 12%) mà có chấm lấm tấm (mực 5–35%: ký hiệu cỏ, cây) → tô xanh cả khối
    lb, nb = ndi.label(blk)
    idx = np.arange(1, nb + 1)
    fn = ndi.mean(nha_m, lb, idx); fd = ndi.mean(dens, lb, idx); sz = ndi.sum(np.ones_like(blk), lb, idx)
    # chấm cỏ cây = nhiều mẩu mực NHỎ rời (< 25 điểm ảnh); gạch chéo nhà = nét dài liền → phân biệt theo tỉ lệ mực ở mẩu nhỏ
    li, _ = ndi.label(ink); szi = np.bincount(li.ravel()); szi[0] = 0
    nho = ink & (szi[li] < 25)
    fnho = ndi.sum(nho, lb, idx) / np.maximum(ndi.sum(ink, lb, idx), 1)
    # đo 27/11: bồn cỏ Tao Đàn xám đều ~110–125, nhà gạch ~85, giấy trống ~150–165. Khối phố không tách rời hết (hẻm nhỏ, chữ
    # nối các khối) nên xét theo vùng 31×31 điểm ảnh (~40 m): nền xám vừa + ít nhà → cỏ cây
    m31 = ndi.uniform_filter(g, 31); fn31 = ndi.uniform_filter(nha_m.astype(np.float32), 31)
    cv_m = (ndi.uniform_filter(g, 15) > 75) & (ndi.uniform_filter(g, 15) < 142) & (sd9 < 30) & blk
    cv_m = remove_small_holes(remove_small_objects(binary_opening(cv_m, disk(4)), 1200), 1500) & blk
    nha_m &= ~ndi.binary_dilation(cv_m, iterations=7)     # viền bồn cỏ (mép tối cạnh đường trắng) không phải nhà
    khu_m = blk & ~cv_m          # khối công viên tô riêng (lớp rừng vẽ dưới lớp khối)
    light = pho & ~nuoc_m
    def polys(mask, tol, scale=1):
        out = []
        for c in find_contours(np.pad(mask, 1).astype(float), 0.5):
            c = approximate_polygon(c - 1, tol)
            if len(c) >= 4:
                out.append(ll([(p[1] * scale, p[0] * scale) for p in c]))
        return out
    sm = lambda m: np.asarray(Image.fromarray(m.astype(np.uint8) * 255).resize((W // 2, H // 2), Image.BOX)) > 127
    nuoc = polys(sm(nuoc_m), 1.0, 2); cv = polys(sm(cv_m), 1.0, 2); khu = polys(khu_m, 1.0); dac = polys(dac_m, 1.0)

    # nhà: chữ nhật nhỏ nhất nếu đầy ≥ 72%, không thì đa giác gọn
    nha = []
    for rp in regionprops(label(nha_m, connectivity=1)):
        if rp.area < 25 or rp.area > 40000:
            continue
        cs = find_contours(np.pad(rp.image, 1).astype(float), 0.5)
        if not cs:
            continue
        c = approximate_polygon(max(cs, key=len) - 1, 1.3)
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
        if best and rp.area / max(best[0], 1) >= 0.9:
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
    print('phố', len(duong), 'nhà', len(nha), 'khối', len(khu), 'đặc', len(dac), 'sông', len(nuoc), 'công viên', len(cv))

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
            'cong_trinh': [], 'nuoc': nuoc, 'rung': cv, 'khu': khu, 'nha_dac': dac, 'nha': nen,
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
