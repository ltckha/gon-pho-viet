"""Gắn tên đường năm 1961 lên bản đồ Sài Gòn 1961 (data/sai-gon/1961.json → ten_duong).

Nguồn tên: bảng chỉ dẫn đường phố in ở lề 2 tờ (docs/research/sai_gon_1961/bang_duong.tsv: loại, tên, ô từ, ô đến).
Chỗ đặt chữ: đường OpenStreetMap hôm nay CÙNG con đường — chỉ dùng làm đường dẫn cho chữ (không vẽ ra), khớp với nét in
1961 trong ~5 m (tờ đã đặt toạ độ). Tên nay của đường cũ: docs/research/sai_gon_1961/doi_ten.tsv (nếu có; không có thì chỉ
gắn những đường còn giữ tên). Chỉ nhận đoạn OSM nằm trong vùng ô lưới từ–đến (nới 1 ô ~1 km) để khỏi gắn nhầm đường trùng tên ở xa.

Chạy: SG_OSM=<đường OSM .json> python3 -I tools/sg1961/gan_ten.py
"""
import json, math, os, unicodedata
import numpy as np

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
D = os.path.join(ROOT, 'docs/research/sai_gon_1961')
KX = 111320 * math.cos(math.radians(10.78)); KY = 110574


def chuan(s):
    s = unicodedata.normalize('NFC', s or '').replace('Ð', 'Đ').replace('ð', 'đ').strip().lower()
    for p in ('đường ', 'đại lộ ', 'bến ', 'công trường ', 'hẻm '):
        if s.startswith(p):
            s = s[len(p):]
    return s


def o_ll(o):
    """ô lưới 'C9' → (lon, lat) tâm ô, theo lưới in trên tờ 2 (cột 7 ở x≈609, hàng A ở y≈720, mỗi ô 712 điểm ảnh ≈ 1 km)"""
    aff = np.load(os.path.join(D, 'to2_affine.npy'))
    r = 'ABCDEFGHIJ'.index(o[0]); c = int(o[1:])
    x = 609 + 712 * (c - 7); y = 720 + 712 * r
    return (aff[0] @ [x, y, 1]) / KX, (aff[1] @ [x, y, 1]) / KY


def main():
    p = os.path.join(ROOT, 'data/sai-gon/1961.json')
    d = json.load(open(p, encoding='utf-8'))
    k = d['khung']
    doi = {}
    f = os.path.join(D, 'doi_ten.tsv')
    if os.path.exists(f):
        for l in open(f, encoding='utf-8').read().strip().split('\n')[1:]:
            c = l.split('\t')
            if len(c) >= 2 and c[1] and c[1] not in ('mất', 'không rõ'):
                doi[c[0]] = c[1]
    osm = {}
    for e in json.load(open(os.environ['SG_OSM'], encoding='utf-8')):
        if e['ten']:
            osm.setdefault(chuan(e['ten']), []).append(e['pts'])
    out, co, khong = [], 0, []
    for l in open(os.path.join(D, 'bang_duong.tsv'), encoding='utf-8').read().strip().split('\n')[1:]:
        loai, ten, tu, den, chac = l.split('\t')
        nay = doi.get(ten, ten)
        ways = [w for n_ in nay.split(' / ') for w in osm.get(chuan(n_), [])]   # vài đường cũ nay thành 2 đường
        a, b = o_ll(tu), o_ll(den)
        lo0, lo1 = min(a[0], b[0]) - 0.012, max(a[0], b[0]) + 0.012
        la0, la1 = min(a[1], b[1]) - 0.012, max(a[1], b[1]) + 0.012
        ds = []
        for w in ways:
            P = [q for q in w if lo0 <= q[0] <= lo1 and la0 <= q[1] <= la1 and k[0] <= q[0] <= k[2] and k[1] <= q[1] <= k[3]]
            if len(P) >= 2:
                ds.append(P)
        if not ds:
            khong.append(ten); continue
        co += 1
        # nối các đoạn chạm nhau (≤ 15 m)
        doi_ = True
        while doi_:
            doi_ = False
            for i in range(len(ds)):
                for j in range(len(ds)):
                    if i == j or not ds[i] or not ds[j]:
                        continue
                    for ea, eb in ((-1, 0), (-1, -1), (0, 0), (0, -1)):
                        A, B = ds[i][ea], ds[j][eb]
                        if math.hypot((A[0] - B[0]) * KX, (A[1] - B[1]) * KY) < 15:
                            aa = ds[i] if ea == -1 else ds[i][::-1]; bb = ds[j] if eb == 0 else ds[j][::-1]
                            ds[i] = aa + bb[1:]; ds[j] = []; doi_ = True; break
                    if doi_:
                        break
                if doi_:
                    break
        for x in ds:
            if len(x) >= 2:
                out.append({'ten': (loai + ' ' if loai else '') + ten, 'nay': nay if chuan(nay) != chuan(ten) else '', 'pts': [[round(q[0], 6), round(q[1], 6)] for q in x]})
    # nắn cục bộ (anh Kha 27/11 "tên đường lệch, nằm ngang khối nhà"): dời đường dẫn chữ theo lưới dời đo trên tờ quét
    f2 = os.path.join(D, 'to2_doi.json')
    if os.path.exists(f2):
        import sys
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        from geo import nap
        from nan_cuc_bo import doi
        ll2px, px2ll = nap(os.path.join(D, 'to2_toa_do.json')); h = doi(f2)
        for r in out:
            P = np.array(r['pts']); q = ll2px(P[:, 0], P[:, 1]); x, y = h(q[:, 0], q[:, 1])
            r['pts'] = [[round(a, 6), round(b, 6)] for a, b in px2ll(x, y)]
    d['ten_duong'] = out
    json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print('tên gắn được:', co, '/', co + len(khong), ' đoạn chữ:', len(out))
    print('chưa gắn (đổi tên / ngoài vùng vẽ):', len(khong))


if __name__ == '__main__':
    main()
