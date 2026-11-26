"""Dựng bản đồ Đà Lạt 1963 vẽ lại (cách 2, anh Kha chốt 26/11): mọi nét lấy từ bản đồ AMS L909 Đà Lạt 1:12.500 năm 1963.

Không hiện gì của hiện tại. Đường OpenStreetMap hôm nay chỉ dùng làm MỐC TÌM: máy dò dọc theo đó, tìm hai mép đường
in trên bản cũ rồi lấy tâm giữa hai mép làm nét vẽ; đoạn nào bản cũ không có thì bỏ. Hồ, rừng, nhà lấy từ màu in.

Chạy: python3 -I tools/dung_1963.py <L909XDALAT_geo.pdf> [thư_mục_ảnh_soát]
Ra:   data/lam-dong/da-lat/1963.json  {khung, duong, ten_duong, nuoc, rung, nha, nguon}
PDF:  https://store.usgs.gov/assets/MOD/StoreFiles/NGA/L909XDALAT_geo.pdf (cùng tờ với bản quét Lưu trữ quốc gia Mỹ
      NAID 74797741, ghi "Unrestricted"; tài liệu chính phủ Mỹ, phạm vi công cộng).
"""
import json, math, os, re, subprocess, sys, tempfile, warnings

import numpy as np
from PIL import Image

warnings.filterwarnings('ignore')
from skimage.measure import find_contours, approximate_polygon, label, regionprops  # noqa: E402
from skimage.morphology import binary_closing, binary_opening, remove_small_objects, remove_small_holes, disk  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import ban_do_1963 as B  # noqa: E402

ROOT = os.path.join(HERE, '..')
EDGE_MIN = int(os.environ.get('EDGE_MIN', 2))      # mép đường in nét đứt (đường đất) nên chỉ cần 2/5 điểm mỗi bên có mực
DPI = 200
M_PX = 72 / DPI * 4.42          # ~1,6 m mỗi điểm ảnh


def neatline(pdf):
    s = open(pdf, 'rb').read()
    v = [float(x) for x in re.findall(rb'\(([-0-9.e+]+)\)', re.search(rb'/Neatline \[([^\]]*)\]', s).group(1))]
    return min(v[0::2]), max(v[0::2]), min(v[1::2]), max(v[1::2])


def dia_danh():
    """Tên ấp, khu, hồ chép tay từ bản đồ (docs/research/ams_1963_dia_danh.tsv; toạ độ điểm ảnh của bản in 110 dpi trong khung)."""
    rows = [l.rstrip('\n').split('\t') for l in open(os.path.join(ROOT, 'docs/research/ams_1963_dia_danh.tsv'), encoding='utf-8')][1:]
    out = []
    for r in rows:
        if len(r) < 4:
            continue
        x = (747 + float(r[2])) * 72 / 110; y = B.PAGE_H - (143 + float(r[3])) * 72 / 110
        lon, lat = B.utm_to_wgs(*B.pdf_to_utm(x, y))
        out.append({'ten': r[0], 'loai': r[1], 'lon': round(lon, 5), 'lat': round(lat, 5)})
    return out


def main(pdf, soat=None):
    nx0, nx1, ny0, ny1 = neatline(pdf)
    X0, X1 = int(nx0 * DPI / 72) + 2, int(nx1 * DPI / 72) - 2
    Y0, Y1 = int((B.PAGE_H - ny1) * DPI / 72) + 2, int((B.PAGE_H - ny0) * DPI / 72) - 2
    with tempfile.TemporaryDirectory() as t:
        subprocess.run(['pdftoppm', '-r', str(DPI), '-png', '-x', str(X0), '-y', str(Y0), '-W', str(X1 - X0), '-H', str(Y1 - Y0),
                        pdf, os.path.join(t, 'c')], check=True)
        im = Image.open(os.path.join(t, os.listdir(t)[0])).convert('RGB')
    a = np.asarray(im).astype(np.int16)
    H, W = a.shape[:2]
    print('tờ bản đồ', W, 'x', H, 'điểm ảnh')

    def to_ll(u, v):
        return B.utm_to_wgs(*B.pdf_to_utm((X0 + u) * 72 / DPI, B.PAGE_H - (Y0 + v) * 72 / DPI))

    def to_px(lon, lat):
        x, y = B.wgs_to_px(lon, lat, DPI)
        return x - X0, y - Y0

    R, G, Bl = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(2), a.min(2); sat = mx - mn
    dark = (mx < 110) & (sat < 60)
    red = (R > 140) & (R - G > 60) & (R - Bl > 50)
    ink = remove_small_objects(dark | red, 12, connectivity=2)
    blue_ink = (Bl > R + 40) & (Bl > G + 10) & (mx < 200)
    green = (G > R + 12) & (G >= Bl) & ~dark
    water = (Bl >= R + 4) & (sat < 40) & (mx > 150) & (mx < 235) & ~blue_ink

    # ---------- mặt nước ----------
    dens = np.asarray(Image.fromarray(water.astype(np.uint8) * 255).resize((W // 4, H // 4), Image.BOX)) > 90
    nuoc_m = remove_small_holes(remove_small_objects(binary_closing(dens, disk(2)), 30), 200)
    # ---------- rừng ----------
    gd = np.asarray(Image.fromarray(green.astype(np.uint8) * 255).resize((W // 4, H // 4), Image.BOX)) > 70
    gd = np.asarray(Image.fromarray(green.astype(np.uint8) * 255).resize((W // 4, H // 4), Image.BOX)).astype(np.float32) / 255
    from scipy.ndimage import gaussian_filter
    rung_m = gaussian_filter(gd, 2.0) > 0.22                          # làm trơn viền rừng
    rung_m = remove_small_holes(remove_small_objects(rung_m, 90), 120) & ~nuoc_m

    def polys(mask, scale, tol, min_pts=4):
        out = []
        for c in find_contours(np.pad(mask, 1).astype(float), 0.5):
            c = approximate_polygon(c - 1, tol)
            if len(c) < min_pts:
                continue
            out.append([[round(v, 5) for v in to_ll(p[1] * scale, p[0] * scale)] for p in c])
        return out
    nuoc = polys(nuoc_m, 4, 0.8)
    rung = polys(rung_m, 4, 1.2)
    print('hồ, suối:', len(nuoc), ' mảng rừng:', len(rung))

    # ---------- nhà: khối đen đặc, gần chữ nhật ----------
    solid = binary_opening(dark, np.ones((3, 3), bool))
    nha = []
    for rp in regionprops(label(solid, connectivity=1)):
        h, w = rp.bbox[2] - rp.bbox[0], rp.bbox[3] - rp.bbox[1]
        if rp.area < 10 or rp.area > 4000 or rp.extent < 0.55 or min(h, w) < 3:
            continue
        sub = np.pad(rp.image, 1).astype(float)
        cs = find_contours(sub, 0.5)
        if not cs:
            continue
        c = approximate_polygon(max(cs, key=len) - 1, 0.9)
        if len(c) < 4:
            continue
        nha.append([[round(v, 5) for v in to_ll(p[1] + rp.bbox[1], p[0] + rp.bbox[0])] for p in c])
    print('khối nhà:', len(nha))
    # khu dân cư: gom nhà gần nhau (cách ≤ ~16 m) thành mảng — cách "gộp theo khoảng cách" của tổng quát hoá bản đồ
    from scipy import ndimage as ndi
    sm2 = np.asarray(Image.fromarray(solid.astype(np.uint8) * 255).resize((W // 2, H // 2), Image.BOX)) > 40
    khu_m = binary_closing(sm2, disk(5))
    khu_m = ndi.gaussian_filter(khu_m.astype(np.float32), 1.5) > 0.5
    khu_m = remove_small_holes(remove_small_objects(khu_m, 120), 150)
    khu = polys(khu_m, 2, 1.2)
    print('khu dân cư:', len(khu))

    # ---------- đường ----------
    # 1) khe sáng giữa hai mép đen: trục giữa (medial axis) có bề rộng 4–14 điểm ảnh (6–22 m), ngoài vùng chấm cây/hồ, ngoài vòng số
    from scipy import ndimage as ndi
    from skimage.morphology import medial_axis, skeletonize
    inkc = binary_closing(remove_small_objects(dark | red, 5, connectivity=2), disk(2))   # nối mép nét đứt
    Dk = ((mx < 140) & (sat < 70)).astype(np.float32); F = np.fft.rfft2(Dk)
    ky, kx = np.mgrid[-20:21, -20:21]; rr = np.hypot(ky, kx)

    def conv(k):
        s_ = np.fft.irfft2(F * np.fft.rfft2(k[::-1, ::-1].astype(np.float32), s=Dk.shape), s=Dk.shape)
        return np.roll(s_, (-20, -20), (0, 1)) / k.sum()
    score = None
    for r0 in (12.5, 13, 13.5, 14):
        sc = conv((rr > r0 - 1.2) & (rr < r0 + 1.2)) - conv((rr > r0 - 4) & (rr < r0 - 2)) - 0.6 * conv((rr > r0 + 2) & (rr < r0 + 4.5))
        score = sc if score is None else np.maximum(score, sc)
    giua = conv(rr < 8)
    cen = ((score > 0.4) | ((score > 0.28) & (giua > 0.08) & (giua < 0.45))) & (score == ndi.maximum_filter(score, 15))
    circ = ndi.binary_dilation(cen, disk(17))
    del F, score, giua
    dens = ndi.uniform_filter((green | water).astype(np.float32), 15) > 0.45
    skel, dist = medial_axis(~inkc, return_distance=True)
    cand = skel & (dist >= 2) & (dist <= 7) & ~dens & ~circ
    cand = skeletonize(ndi.binary_dilation(cand, np.ones((3, 3), bool)))
    distc = dist
    print('khe đường (điểm ảnh):', int(cand.sum()))

    # 2) đường còn tới nay: dọc mốc OSM, tìm tâm khe trên bản cũ trong ±9 điểm ảnh (~15 m)
    osm = json.load(open(os.path.join(ROOT, 'data/lam-dong/da-lat/duong.json'), encoding='utf-8'))
    duong, used = [], np.zeros((H, W), bool)
    for r in osm['duong']:
        P = [to_px(lo, la) for lo, la in r['pts']]
        if not any(10 <= x < W - 10 and 10 <= y < H - 10 for x, y in P):
            continue
        samp = []
        for (xa, ya), (xb, yb) in zip(P, P[1:]):
            L = math.hypot(xb - xa, yb - ya)
            if L < 0.5:
                continue
            ux, uy = (xb - xa) / L, (yb - ya) / L
            for k in np.arange(0, L, 3.0):
                samp.append((xa + ux * k, ya + uy * k, -uy, ux))
        if samp:
            samp.append((P[-1][0], P[-1][1], samp[-1][2], samp[-1][3]))
        # Đo mặt cắt ngang (cách E): ở mỗi điểm mẫu, thử tâm lệch s ∈ [-9, 9] và nửa bề rộng h ∈ [2, 7];
        # đường in = hai nét (liền hoặc đứt) song song: mỗi bên có mực ở ≥ 2/5 vị trí dọc đường, giữa sáng.
        res = [None] * len(samp)
        if samp:
            SA = np.array(samp, float)                       # N×4
            ss = np.arange(-9, 10, dtype=float); hh = np.arange(2, 8, dtype=float); tt = np.array([-8, -4, 0, 4, 8], float)
            X_, Y_, NX, NY = [SA[:, i][:, None, None, None] for i in range(4)]
            TX, TY = NY, -NX
            S4 = ss[None, :, None, None]; H4 = hh[None, None, :, None]; T4 = tt[None, None, None, :]
            def hit(side):
                cnt = np.zeros((len(SA), len(ss), len(hh), len(tt)), bool)
                for dd in (-1, 0, 1):
                    qx = np.rint(X_ + NX * S4 + TX * T4 + side * NX * (H4 + dd)).astype(int)
                    qy = np.rint(Y_ + NY * S4 + TY * T4 + side * NY * (H4 + dd)).astype(int)
                    okb = (qx >= 0) & (qx < W) & (qy >= 0) & (qy < H)
                    cnt |= okb & inkc[np.clip(qy, 0, H - 1), np.clip(qx, 0, W - 1)]
                return cnt.sum(3)                            # N×S×H
            L_ = hit(-1); R_ = hit(1)
            cx = np.rint(X_[..., 0] + NX[..., 0] * ss[None, :, None]).astype(int)[..., 0]
            cy = np.rint(Y_[..., 0] + NY[..., 0] * ss[None, :, None]).astype(int)[..., 0]
            giua_sang = ~inkc[np.clip(cy, 0, H - 1), np.clip(cx, 0, W - 1)] & ~dens[np.clip(cy, 0, H - 1), np.clip(cx, 0, W - 1)]
            good_ = (np.minimum(L_, R_) >= EDGE_MIN) & giua_sang[:, :, None]
            # chọn s gần mốc nhất, h nhỏ nhất hợp lệ
            for n_ in range(len(SA)):
                g = good_[n_]
                if not g.any():
                    continue
                si, hi = np.nonzero(g)
                k = np.lexsort((hi, np.abs(ss[si])))[0]
                res[n_] = (ss[si[k]], hh[hi[k]])
        # Theo cách của Uhl và cộng sự (2022): lấy CẢ con đường hôm nay làm đơn vị, quyết định bản cũ có in nó không —
        # giữ liền mạch thay vì ghép từng mẩu dò được. Khoảng thiếu dấu ≤ 40 mẫu (~200 m, thường do chữ, vòng số, ngã ba đè lên)
        # được nối nếu hai bên đều có dấu; đuôi ≤ 10 mẫu (~50 m) kéo tới đầu đường để chạm ngã ba.
        ok = np.array([b_ is not None for b_ in res], bool)
        if len(ok) < 6 or not ok.any():
            continue
        idx_ok = np.nonzero(ok)[0]
        runs = []                       # (đầu, cuối) theo chỉ số mẫu
        st = pv = idx_ok[0]
        for k in idx_ok[1:]:
            if k - pv > 40:
                runs.append((st, pv)); st = k
            pv = k
        runs.append((st, pv))
        n_s = len(res)
        for i, j in runs:
            if i <= 10: i = 0
            if n_s - 1 - j <= 10: j = n_s - 1
            j += 1
            seg_ok = ok[i:j]
            if j - i < 12 or seg_ok.mean() < float(os.environ.get('TI_LE', 0.45)):
                continue
            # đường thật: tâm dò được nối tiếp nhau, không nhảy lung tung (nhận nhầm thì lệch ngẫu nhiên ±9)
            ev = [res[k][0] for k in range(i, j) if res[k]]
            if len(ev) >= 4:
                lien = np.mean(np.abs(np.diff(ev)) <= 2)
                if lien < float(os.environ.get('LIEN', 0.6)):
                    continue
            offs = np.array([res[k][0] if res[k] else np.nan for k in range(i, j)], float)
            wid = [res[k][1] for k in range(i, j) if res[k]]
            idx = np.arange(len(offs)); m_ = ~np.isnan(offs)
            offs = np.clip(np.interp(idx, idx[m_], offs[m_]), -9, 9)
            offs = np.convolve(np.pad(offs, 7, mode='edge'), np.ones(15) / 15, 'valid')
            pts = [(samp[k][0] + samp[k][2] * o, samp[k][1] + samp[k][3] * o) for k, o in zip(range(i, j), offs)]
            if j == n_s:                # chạm đúng đầu đường (nút chung với đường khác) để mạng đường liền
                pts[-1] = P[-1]
            if i == 0:
                pts[0] = P[0]
            pts = approximate_polygon(np.array(pts), 0.7)
            w = 2 * float(np.median(wid))
            # cấp đường theo cách bản AMS in: lòng đường tô đỏ = đường trải nhựa chính (cấp 1); còn lại theo bề rộng in
            Pa = np.array(pts)
            do = red[np.clip(Pa[:, 1].astype(int), 0, H - 1), np.clip(Pa[:, 0].astype(int), 0, W - 1)].mean() if len(Pa) else 0
            loai = 1 if do >= 0.3 else 2 if w >= 10 else 3 if w >= 6 else 4
            duong.append({'id': r['id'], 'loai': loai, 'pts': [[round(v, 5) for v in to_ll(x, y)] for x, y in pts]})
            for x, y in pts:
                used[max(0, int(y) - 9):int(y) + 10, max(0, int(x) - 9):int(x) + 10] = True

    # 3) đường đất nét đứt bản cũ có mà nay không còn — "dò theo vết" (so 7 cách 26/11):
    #    hạt = cặp gạch xám song song (hai mép đường đất); từ mỗi hạt bước 5 điểm ảnh dọc hướng, rẽ ≤ 14°/bước,
    #    mỗi bước hai bên còn gạch trong ±10 điểm ảnh, giữa sáng; dừng khi chạm đường đã có hoặc hụt 4 bước.
    #    Bỏ vết ngắn (< 16 bước), vết hụt nhiều, vết ở chỗ chi chít nét (khu chia lô, chữ).
    from scipy.spatial import cKDTree
    g = a
    R_, G_ = g[..., 0], g[..., 1]
    gray = (mx < 175) & (sat < 30) & (G_ <= R_ + 6)          # xám/đen thật, không phải chấm cây xanh đậm
    clutter = ndi.uniform_filter(gray.astype(np.float32), 25)
    # cặp gạch (như gach.py)
    D = []
    for rp in regionprops(label(gray, connectivity=2)):
        if rp.area < 6 or rp.area > 90: continue
        L = rp.axis_major_length; w = rp.axis_minor_length
        if L < 5 or L > 26 or w > 3.2 or L < 2.5 * max(w, 1): continue
        cy, cx = rp.centroid; yy, xx = rp.coords[:, 0] - cy, rp.coords[:, 1] - cx
        ev, evec = np.linalg.eigh(np.cov(np.vstack([xx, yy]))); v = evec[:, 1]
        D.append((cx, cy, v[0], v[1]))
    D = np.array(D); T = cKDTree(D[:, :2]); seeds = []
    for i, j in T.query_pairs(13):
        a, b = D[i], D[j]
        if abs(a[2] * b[2] + a[3] * b[3]) < 0.94: continue
        dx, dy = b[0] - a[0], b[1] - a[1]; al = dx * a[2] + dy * a[3]; pe = -dx * a[3] + dy * a[2]
        if 3.5 <= abs(pe) <= 11 and abs(al) < 6:
            seeds.append(((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, a[2], a[3], abs(pe) / 2))
    def side_hit(x, y, ux, uy, h, sg):
        nx, ny = -uy, ux
        for t in range(-10, 11, 2):
            for dd in (h - 1, h, h + 1):
                qx = int(round(x + ux * t + sg * nx * dd)); qy = int(round(y + uy * t + sg * ny * dd))
                if 0 <= qx < W and 0 <= qy < H and gray[qy, qx]: return True
        return False
    def ok_at(x, y, ux, uy, h):
        if not (0 <= int(x) < W and 0 <= int(y) < H) or gray[int(y), int(x)]: return False
        return side_hit(x, y, ux, uy, h, 1) and side_hit(x, y, ux, uy, h, -1)
    covered = np.zeros((H, W), bool)
    tracks = []
    for sx, sy, ux, uy, h in seeds:
        if covered[int(sy), int(sx)] or used[int(sy), int(sx)]: continue
        path = []
        for sgn in (1, -1):
            x, y, vx, vy = sx, sy, ux * sgn, uy * sgn; pts = []; miss = 0
            for _ in range(400):
                best = None
                for da in (-0.25, -0.12, 0, 0.12, 0.25):            # rẽ tối đa ~14° mỗi bước
                    ca, sa = math.cos(da), math.sin(da)
                    wx, wy = vx * ca - vy * sa, vx * sa + vy * ca
                    for s in (-1.5, 0, 1.5):
                        px_ = x + wx * 5 - wy * s; py_ = y + wy * 5 + wx * s
                        if ok_at(px_, py_, wx, wy, h):
                            sc = abs(da) * 4 + abs(s)
                            if best is None or sc < best[0]: best = (sc, px_, py_, wx, wy)
                if best is None:
                    miss += 1
                    if miss > 3: break
                    x, y = x + vx * 5, y + vy * 5; pts.append((x, y, 0)); continue
                miss = 0; _, x, y, vx, vy = best; pts.append((x, y, 1))
                if not (0 <= int(x) < W and 0 <= int(y) < H): break
                if used[int(y), int(x)]: break                      # chạm đường đã có: nối vào mạng
                if covered[int(y), int(x)]: break
            while pts and pts[-1][2] == 0: pts.pop()
            path = (pts[::-1] if sgn == 1 else path) if False else path
            if sgn == 1: fwd = pts
            else: path = [p for p in pts[::-1]] + [(sx, sy, 1)] + fwd
        if len(path) < 16: continue
        P = np.array([(p[0], p[1]) for p in path])
        hitr = np.mean([p[2] for p in path])
        cl = clutter[np.clip(P[:, 1].astype(int), 0, H - 1), np.clip(P[:, 0].astype(int), 0, W - 1)].mean()
        if hitr < 0.8 or cl > 0.16: continue
        tracks.append(P)
        for x, y in P: covered[max(0, int(y) - 6):int(y) + 7, max(0, int(x) - 6):int(x) + 7] = True

    duong_mat = []
    for Pc in tracks:
        xi = np.clip(Pc[:, 0].astype(int), 0, W - 1); yi = np.clip(Pc[:, 1].astype(int), 0, H - 1)
        if used[yi, xi].mean() > 0.3:
            continue
        Pc = approximate_polygon(np.array([np.convolve(np.pad(Pc[:, k], 2, mode='edge'), np.ones(5) / 5, 'valid') for k in (0, 1)]).T, 0.8)
        duong_mat.append({'loai': 4, 'dat': 1, 'pts': [[round(v, 5) for v in to_ll(x, y)] for x, y in Pc]})
    print('đường đất đã mất (dò theo vết):', len(duong_mat))
    print('đoạn đường dò được:', len(duong), ' dài', round(sum(
        sum(math.hypot((b[0] - a_[0]) * 108900, (b[1] - a_[1]) * 110574) for a_, b in zip(d['pts'], d['pts'][1:])) for d in duong) / 1000, 1), 'km')

    # ---------- tên năm 1963: gắn đoạn dò được nằm dọc đoạn tên (data/lam-dong/da-lat/ten_1963.json) ----------
    t63 = json.load(open(os.path.join(ROOT, 'data/lam-dong/da-lat/ten_1963.json'), encoding='utf-8'))

    def dseg(p, a_, b):
        ax, ay = (a_[0] - p[0]) * 108900, (a_[1] - p[1]) * 110574
        bx, by = (b[0] - p[0]) * 108900, (b[1] - p[1]) * 110574
        dx, dy = bx - ax, by - ay; L = dx * dx + dy * dy
        t_ = 0 if L == 0 else max(0, min(1, -(ax * dx + ay * dy) / L))
        return math.hypot(ax + t_ * dx, ay + t_ * dy)

    def dline(p, pts):
        return min(dseg(p, a_, b) for a_, b in zip(pts, pts[1:]))
    ten_duong = []
    for d in duong:
        best = None
        for s_ in t63['duong']:
            ds = [dline(p, s_['pts']) for p in d['pts']]
            f = sum(1 for v in ds if v < 15) / len(ds)
            if f >= 0.6 and (best is None or f > best[0]):
                best = (f, s_)
        if best:
            d['ten'] = best[1]['ten']
            d['so'] = best[1]['so']
            d['nay'] = best[1]['nay']
    # nối các đoạn cùng tên chạm nhau để đặt chữ
    by = {}
    for d in duong:
        if d.get('ten'):
            by.setdefault(d['ten'], []).append(list(d['pts']))
    for ten, segs in by.items():
        segs = [s for s in segs]
        changed = True
        while changed:
            changed = False
            for i_ in range(len(segs)):
                for j_ in range(len(segs)):
                    if i_ == j_ or not segs[i_] or not segs[j_]:
                        continue
                    a_, b = segs[i_], segs[j_]
                    for x_, y_ in ((a_[-1], b[0]), (a_[-1], b[-1]), (a_[0], b[0]), (a_[0], b[-1])):
                        if dseg(x_, y_, y_) < 12:
                            if x_ is a_[-1] and y_ is b[0]: segs[i_] = a_ + b
                            elif x_ is a_[-1]: segs[i_] = a_ + b[::-1]
                            elif y_ is b[0]: segs[i_] = b[::-1] + a_
                            else: segs[i_] = b + a_
                            segs[j_] = []; changed = True
                            break
                    if changed: break
                if changed: break
        nay = next(d['nay'] for d in duong if d.get('ten') == ten)
        for s in segs:
            if len(s) >= 2:
                ten_duong.append({'ten': ten, 'nay': nay, 'pts': s})
    print('đoạn có tên 1963:', sum(1 for d in duong if d.get('ten')), ' tên khác nhau:', len(by))

    # ---------- ảnh soát ----------
    if soat:
        os.makedirs(soat, exist_ok=True)
        fade = (np.asarray(im) * 0.45 + 255 * 0.55).astype(np.uint8)
        ov = Image.fromarray(fade)
        from PIL import ImageDraw
        dr = ImageDraw.Draw(ov)
        for d in duong:
            dr.line([to_px(*p) for p in d['pts']], fill=(0, 150, 0) if d.get('ten') else (220, 0, 140), width=3)
        for d in duong_mat:
            dr.line([to_px(*p) for p in d['pts']], fill=(0, 90, 255), width=3)
        ov.save(os.path.join(soat, 'duong_soat.png'))

    lo0, la0 = to_ll(0, H); lo1, la1 = to_ll(W, 0)
    data = {
        'nam': 1963,
        'khung': [round(lo0, 5), round(la0, 5), round(lo1, 5), round(la1, 5)],
        'duong': duong, 'duong_mat': duong_mat, 'ten_duong': ten_duong, 'diem': t63['diem'], 'dia_danh': dia_danh(), 'nuoc': nuoc, 'rung': rung, 'khu': khu, 'nha': nha,
        'nguon': [{'ten': 'Bản đồ Đà Lạt 1:12.500, Army Map Service (quân đội Mỹ), loạt L909, ấn bản 1-AMS 1963 — vẽ lại toàn bộ từ bản này. Phạm vi công cộng.',
                   'link': 'https://catalog.archives.gov/id/74797741'},
                  {'ten': 'Tên đường năm 1963: bảng chỉ dẫn đường phố in trên bản đồ (103 tên), dò từng số',
                   'link': 'https://commons.wikimedia.org/wiki/File:AMS_-_Da_Lat,_Vietnam_-_NARA_-_74797741.jpg'}],
    }
    # nhà: nén — mỗi khối một dãy số nguyên (đơn vị 1e-5 độ) [x0, y0, dx1, dy1, ...] tính từ góc khung
    ox, oy = data['khung'][0], data['khung'][1]
    nen = []
    for poly in nha:
        q = [(round((lo - ox) * 1e5), round((la - oy) * 1e5)) for lo, la in poly]
        f = [q[0][0], q[0][1]]
        for (a1, b1), (a2, b2) in zip(q, q[1:]):
            if (a2, b2) != (a1, b1):
                f += [a2 - a1, b2 - b1]
        if len(f) >= 6:
            nen.append(f)
    data['nha'] = nen
    data['nha_cach_ghi'] = 'mỗi khối: [x0, y0, dx, dy, ...] đơn vị 1e-5 độ tính từ khung[0], khung[1]'
    p = os.environ.get('RA') or os.path.join(ROOT, 'data/lam-dong/da-lat/1963.json')
    json.dump(data, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(p, os.path.getsize(p) // 1024, 'KB')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
