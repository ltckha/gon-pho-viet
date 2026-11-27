"""Nắn cục bộ toạ độ tờ Sài Gòn 1961 (anh Kha 27/11: "tên đường lệch, nằm ngang khối nhà").
Đa thức bậc 3 cả tờ còn lệch cục bộ 20–35 m (vd. quanh Nguyễn Du – Gia Long). Chia tờ thành ô 400 điểm ảnh (bước 200);
mỗi ô: vẽ đường OpenStreetMap (chiếu bằng toạ độ hiện có) và lấy mạng giấy trống (lòng đường) trên tờ quét, tìm dời (±60 điểm ảnh)
cho chồng khít nhất. Ô ít đường hoặc kết quả không rõ thì bỏ; làm mượt (trung vị 3×3) rồi lưu lưới dời → docs/research/sai_gon_1961/to2_doi.json.
Dùng: điểm OSM → ll2px → + dời(nội suy) = vị trí trên tờ quét.
Chạy: SG_OSM=<.json> python3 -I tools/sg1961/nan_cuc_bo.py <ảnh tờ .jpg> <toạ độ tờ .json> <ra .json>
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from geo import nap
Image.MAX_IMAGE_PIXELS = None


def main(anh, toado, ra):
    ll2px, _ = nap(toado)
    g = np.asarray(Image.open(anh).convert('L')).astype(np.float32)
    H, W = g.shape
    gc = ndi.grey_closing(g, size=(5, 5))
    duong = (ndi.uniform_filter(gc, 5) > 145).astype(np.float32)
    R = Image.new('L', (W, H), 0); d = ImageDraw.Draw(R)
    for e in json.load(open(os.environ['SG_OSM'], encoding='utf-8')):
        if e['loai'] not in ('primary', 'secondary', 'tertiary', 'residential', 'trunk', 'unclassified') or len(e['pts']) < 2:
            continue
        P = ll2px(np.array([q[0] for q in e['pts']]), np.array([q[1] for q in e['pts']]))
        if P[:, 0].max() < 0 or P[:, 1].max() < 0 or P[:, 0].min() > W or P[:, 1].min() > H:
            continue
        d.line([tuple(q) for q in P], fill=255, width=5)
    osm = (np.asarray(R) > 0).astype(np.float32)
    B, S, M = 400, 200, 60
    xs = list(range(0, W - B + 1, S)); ys = list(range(0, H - B + 1, S))
    dx = np.full((len(ys), len(xs)), np.nan); dy = dx.copy()
    for j, y in enumerate(ys):
        for i, x in enumerate(xs):
            o = osm[y:y + B, x:x + B]
            if o.sum() < 2500:
                continue
            best = None
            win = duong[max(0, y - M):y + B + M, max(0, x - M):x + B + M]
            oy, ox = y - max(0, y - M), x - max(0, x - M)
            for sy in range(-M, M + 1, 3):
                for sx in range(-M, M + 1, 3):
                    yy, xx = oy + sy, ox + sx
                    if yy < 0 or xx < 0 or yy + B > win.shape[0] or xx + B > win.shape[1]:
                        continue
                    sc = (win[yy:yy + B, xx:xx + B] * o).sum() / o.sum()
                    if best is None or sc > best[0]:
                        best = (sc, sx, sy)
            # mịn ±2 quanh đỉnh
            sc0, bx, by = best
            for sy in range(by - 2, by + 3):
                for sx in range(bx - 2, bx + 3):
                    yy, xx = oy + sy, ox + sx
                    if yy < 0 or xx < 0 or yy + B > win.shape[0] or xx + B > win.shape[1]:
                        continue
                    sc = (win[yy:yy + B, xx:xx + B] * o).sum() / o.sum()
                    if sc > best[0]:
                        best = (sc, sx, sy)
            base = (win[oy:oy + B, ox:ox + B] * o).sum() / o.sum()
            if best[0] > 0.55 and best[0] - base > -0.01:
                dx[j, i], dy[j, i] = best[1], best[2]
    # làm mượt, lấp ô trống bằng trung bình lân cận
    def muot(a):
        b = a.copy()
        for _ in range(6):
            c = b.copy()
            for j in range(a.shape[0]):
                for i in range(a.shape[1]):
                    w = b[max(0, j - 1):j + 2, max(0, i - 1):i + 2]
                    w = w[~np.isnan(w)]
                    if len(w):
                        c[j, i] = np.median(w) if not np.isnan(b[j, i]) else np.mean(w)
            b = c
        return np.nan_to_num(b)
    co = int((~np.isnan(dx)).sum())
    dx, dy = muot(dx), muot(dy)
    print('ô đo được', co, '/', dx.size, ' dời trung vị', np.median(np.abs(dx)), np.median(np.abs(dy)), ' lớn nhất', np.abs(dx).max(), np.abs(dy).max())
    json.dump({'x0': B / 2, 'y0': B / 2, 'buoc': S, 'dx': np.round(dx, 1).tolist(), 'dy': np.round(dy, 1).tolist()}, open(ra, 'w'))


def doi(f):
    """trả hàm (x, y) điểm ảnh tờ theo OSM → (x, y) đã nắn cục bộ (nội suy song tuyến)"""
    G = json.load(open(f)); DX = np.array(G['dx']); DY = np.array(G['dy'])
    def h(x, y):
        x = np.asarray(x, float); y = np.asarray(y, float)
        gx = np.clip((x - G['x0']) / G['buoc'], 0, DX.shape[1] - 1); gy = np.clip((y - G['y0']) / G['buoc'], 0, DX.shape[0] - 1)
        return x + ndi.map_coordinates(DX, [gy, gx], order=1), y + ndi.map_coordinates(DY, [gy, gx], order=1)
    return h


if __name__ == '__main__':
    main(*sys.argv[1:4])
