"""Gắn tên đường năm 1963 theo VÒNG SỐ in trên chính bản đồ (anh Kha 27/11: "chỗ nào có số là phải kiếm để đưa tên đường vô").

Đầu vào:
  data/lam-dong/da-lat/1963.json         — nét đường dò từ bản 1963 (tools/dung_1963.py): duong, duong_mat, duong_mon
  docs/research/ams_1963_vong_so.tsv      — 151 vòng số trên bản đồ (máy tìm vòng tròn, em đọc từng số bằng mắt; 18 số tìm tay)
  docs/research/ams_1963_bang_duong.tsv   — bảng chỉ dẫn 103 tên in ở lề (số → tên 1963, tên nay nếu biết)
Cách gắn:
  1. Mỗi vòng số bám vào khúc đường 1963 gần nhất (≤ 45 m — vòng in trong lòng đường hoặc sát bên, có khi kèm mũi tên).
  2. Khúc có vòng của MỘT số → cả khúc mang tên đó; có vòng của nhiều số → cắt ở giữa hai vòng khác số.
  3. Kéo tên sang khúc nối tiếp gần như thẳng (đầu nối ≤ 15 m, lệch hướng ≤ 35°), tối đa 500 m tính từ vòng gần nhất,
     không kéo vào khúc đã có vòng số khác. Không kéo qua ngã ba rẽ.
Không dùng tên đường hôm nay để đặt chỗ. Ghi lại 1963.json: duong[].ten / so (đặt lại), ten_duong (dựng lại).

Chạy: python3 -I tools/gan_ten_1963.py
"""
import json, math, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
LAT0 = 11.94
KX, KY = 111320 * math.cos(math.radians(LAT0)), 110574


def xy(p):
    return (p[0] * KX, p[1] * KY)


def chieu(P, q):
    """điểm gần nhất trên đường gấp khúc P (mét) → (khoảng cách, vị trí theo mét dọc đường)"""
    best, acc = (1e18, 0), 0
    for a, b in zip(P, P[1:]):
        dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy)
        t = 0 if L == 0 else max(0, min(1, ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / (L * L)))
        d = math.hypot(a[0] + t * dx - q[0], a[1] + t * dy - q[1])
        if d < best[0]:
            best = (d, acc + t * L)
        acc += L
    return best


def dai(P):
    return sum(math.hypot(b[0] - a[0], b[1] - a[1]) for a, b in zip(P, P[1:]))


def cat(P, s0, s1):
    out, acc = [], 0
    for a, b in zip(P, P[1:]):
        L = math.hypot(b[0] - a[0], b[1] - a[1])
        if acc + L >= s0 and acc <= s1 and L > 0:
            def at(s):
                t = (s - acc) / L
                return (a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]))
            if not out:
                out.append(at(max(s0, acc)))
            out.append(at(min(s1, acc + L)))
        acc += L
    return out


def huong(P, dau):
    """hướng đi RA khỏi khúc ở đầu (dau=0) hoặc cuối (dau=1), lấy trên ~40 m"""
    Q = P if dau else P[::-1]
    e = Q[-1]; acc = 0
    for q in reversed(Q[:-1]):
        acc += math.hypot(e[0] - q[0], e[1] - q[1])
        if acc >= 40:
            break
    v = (e[0] - q[0], e[1] - q[1]); n = math.hypot(*v) or 1
    return (v[0] / n, v[1] / n)


def main():
    p63 = os.path.join(ROOT, 'data/lam-dong/da-lat/1963.json')
    d = json.load(open(p63, encoding='utf-8'))
    bang = {}
    for l in open(os.path.join(ROOT, 'docs/research/ams_1963_bang_duong.tsv'), encoding='utf-8').read().split('\n')[1:]:
        c = l.split('\t')
        if len(c) >= 3 and c[0].isdigit():
            nay = c[3] if len(c) > 3 and c[3] not in ('', '-') and not c[3].startswith('diem:') else ''
            bang[int(c[0])] = (c[2], nay, len(c) > 3 and c[3].startswith('diem:'))
    vong = []
    for l in open(os.path.join(ROOT, 'docs/research/ams_1963_vong_so.tsv'), encoding='utf-8').read().split('\n')[1:]:
        c = l.split('\t')
        if len(c) >= 3:
            vong.append((int(c[0]), xy((float(c[1]), float(c[2])))))

    # khúc đường 1963 (mọi loại); bỏ khúc vẽ theo hình đường nay (theo_nay) — tên đặt lại hoàn toàn từ vòng số
    d['duong'] = [x for x in d['duong'] if not x.get('theo_nay')]
    seg = []
    for kind in ('duong', 'duong_mat', 'duong_mon'):
        for i, x in enumerate(d.get(kind, [])):
            x.pop('ten', None); x.pop('so', None); x.pop('nay', None)
            P = [xy(p) for p in x['pts']]
            if len(P) >= 2 and dai(P) > 5:
                seg.append({'kind': kind, 'i': i, 'P': P, 'L': dai(P), 'vong': []})

    # 1) vòng số bám khúc gần nhất
    bam = 0
    for so, q in vong:
        if so not in bang or bang[so][2]:
            continue
        best = None
        for s in seg:
            dist, pos = chieu(s['P'], q)
            if dist < 45 and (best is None or dist < best[0]):
                best = (dist, s, pos)
        if best:
            best[1]['vong'].append((best[2], so)); bam += 1
    print('vòng bám được đường:', bam, '/', sum(1 for so, _ in vong if so in bang and not bang[so][2]))

    # 2) khúc có vòng: chia theo số
    manh = []           # (khúc, s0, s1, số, vị trí vòng gần nhất)
    for s in seg:
        if not s['vong']:
            continue
        vs = sorted(s['vong'])
        cuts = [0]
        for (p1, n1), (p2, n2) in zip(vs, vs[1:]):
            if n1 != n2:
                cuts.append((p1 + p2) / 2)
        cuts.append(s['L'])
        nums = [vs[0][1]] + [n2 for (p1, n1), (p2, n2) in zip(vs, vs[1:]) if n1 != n2]
        for k, n in enumerate(nums):
            manh.append({'s': s, 's0': cuts[k], 's1': cuts[k + 1], 'so': n})
        s['xong'] = True

    # 3) kéo tên sang khúc nối thẳng
    dau_khuc = []
    for s in seg:
        for e in (0, 1):
            dau_khuc.append((s, e, s['P'][-1] if e else s['P'][0]))
    keo = 0
    hang = [(m['s'], m['so'], 0.0) for m in manh if (m['s0'] == 0 or m['s1'] == m['s']['L'])]
    da = {}
    while hang:
        s, so, di = hang.pop()
        for e in (0, 1):
            pe = s['P'][-1] if e else s['P'][0]
            h = huong(s['P'], e)
            best = None
            for t, et, pt in dau_khuc:
                if t is s or t.get('xong') or math.hypot(pt[0] - pe[0], pt[1] - pe[1]) > 15:
                    continue
                ht = huong(t['P'], et); ht = (-ht[0], -ht[1])          # hướng đi VÀO khúc t
                cos = h[0] * ht[0] + h[1] * ht[1]
                if cos >= math.cos(math.radians(35)) and (best is None or cos > best[0]):
                    best = (cos, t)
            if best:
                t = best[1]
                if di + t['L'] <= 500:
                    t['xong'] = True; keo += 1
                    manh.append({'s': t, 's0': 0, 's1': t['L'], 'so': so, 'keo': 1})
                    hang.append((t, so, di + t['L']))
    print('khúc có vòng:', sum(1 for s in seg if s['vong']), ' khúc kéo thêm:', keo)

    # ghi tên vào khúc (cả khúc nếu một tên) và dựng ten_duong
    for m in manh:
        x = d[m['s']['kind']][m['s']['i']]
        if m['s0'] == 0 and m['s1'] >= m['s']['L'] - 1e-6:
            x['ten'], x['so'] = bang[m['so']][0], m['so']
            if bang[m['so']][1]:
                x['nay'] = bang[m['so']][1]
    inv = lambda q: [round(q[0] / KX, 5), round(q[1] / KY, 5)]
    theo_ten = {}
    for m in manh:
        P = cat(m['s']['P'], m['s0'], m['s1'])
        if len(P) >= 2:
            theo_ten.setdefault(m['so'], []).append([inv(q) for q in P])
    ten_duong = []
    for so, ds in theo_ten.items():
        # nối các mảnh cùng số chạm nhau
        ds = [list(x) for x in ds]
        doi = True
        while doi:
            doi = False
            for i in range(len(ds)):
                for j in range(len(ds)):
                    if i == j or not ds[i] or not ds[j]:
                        continue
                    a, b = ds[i], ds[j]
                    for ea, eb in ((-1, 0), (-1, -1), (0, 0), (0, -1)):
                        A, Bq = xy(a[ea]), xy(b[eb])
                        if math.hypot(A[0] - Bq[0], A[1] - Bq[1]) < 15:
                            aa = a if ea == -1 else a[::-1]; bb = b if eb == 0 else b[::-1]
                            ds[i] = aa + bb[1:]; ds[j] = []; doi = True
                            break
                    if doi:
                        break
                if doi:
                    break
        for x in ds:
            if len(x) >= 2:
                ten_duong.append({'ten': bang[so][0], 'so': so, 'nay': bang[so][1], 'pts': x})
    d['ten_duong'] = ten_duong
    co = {t['so'] for t in ten_duong}
    duong_so = [n for n in bang if not bang[n][2]]
    print('tên đường có trên bản đồ:', len(co), '/', len(duong_so), ' chưa gắn được:', sorted(n for n in duong_so if n not in co))
    json.dump(d, open(p63, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))


if __name__ == '__main__':
    main()
