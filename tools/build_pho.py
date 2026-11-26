#!/usr/bin/env python3
"""Tạo data/lam-dong/da-lat/pho.json (trang phố) từ nghiên cứu phố của game Gọn Phố, và chép tranh đầu phố.

Cách chạy:
  python3 tools/build_pho.py <thư mục kho giang-ho-ai (chỉ đọc)>

Ưu tiên nghiên cứu riêng của kho này: data/pho/<slug>.json (agent nghien-cuu-pho; tên quán THẬT, địa chỉ,
≥ 2 nguồn ở 2 trang khác nhau, vị trí từ tools/vi_tri_quan.py). Phố nào chưa có thì mới lấy từ game.

Lưu ý quan trọng: tên quán trong content/streets/*.json của game là TÊN ĐẶT LẠI (game không dùng tên quán thật),
nên khi lấy từ game KHÔNG lấy tên quán — chỉ lấy loại quán, đặc trưng và nguồn ("chac" và ≥ 2 nguồn).
"""
import glob
import json
import re
import math
import os
import shutil
import sys
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAME_URL = 'https://github.com/ltckha/giang-ho-ai/blob/main/'
REPO_URL = 'https://github.com/ltckha/gon-pho-viet/blob/claude/nghien-cuu-phuong/'
ANH = {  # id phố → tranh đầu phố (Spark, của anh Kha) trong kho game
    'street_tang_bat_ho': 'dau_pho_tang_bat_ho', 'street_pho_ca_phe': 'dau_pho_ca_phe',
    'street_phan_dinh_phung': 'dau_pho_phan_dinh_phung', 'street_nguyen_van_troi': 'dau_pho_nguyen_van_troi',
    'street_hoang_dieu': 'dau_pho_hoang_dieu', 'street_tran_phu': 'dau_pho_tran_phu',
}


def main(game):
    duong = json.load(open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'duong.json'), encoding='utf-8'))
    names = {d['ten'] for d in duong['duong'] if 'ten' in d}
    os.makedirs(os.path.join(ROOT, 'assets', 'dau_pho'), exist_ok=True)
    out = []
    for p in duong['pho']:
        g = json.load(open(os.path.join(game, 'content', 'streets', p['id'] + '.json'), encoding='utf-8'))
        roads = [r.strip() for r in p['roads'].replace('Đường ', '').split('–')]
        for r in roads:
            if r not in names:
                raise SystemExit('Đường "%s" không có trong dữ liệu OSM' % r)
        slug = p['id'].replace('street_', '').replace('_', '-')
        mine = os.path.join(ROOT, 'data', 'pho', slug + '.json')
        if os.path.exists(mine):
            places, can_kiem, intro, note = from_research(json.load(open(mine, encoding='utf-8')))
            gioi_thieu = intro or p['gioi_thieu']
            nghien_cuu = REPO_URL + 'docs/research/pho_' + slug + '.md'
        else:
            places, can_kiem = from_game(g)
            gioi_thieu, nghien_cuu, note = p['gioi_thieu'], GAME_URL + g['researchNote'], None
        src = os.path.join(game, 'public', 'assets', 'ui', ANH[p['id']] + '.webp')
        shutil.copy(src, os.path.join(ROOT, 'assets', 'dau_pho', ANH[p['id']] + '.webp'))
        out.append({
            'id': p['id'],
            'slug': slug,
            'ten_pho': p['ten_pho'],
            'duong': roads,
            'ward': p['ward'],
            'gioi_thieu': gioi_thieu,
            'anh': 'assets/dau_pho/' + ANH[p['id']] + '.webp',
            'ten_that': os.path.exists(mine),
            'lon': p['lon'], 'lat': p['lat'],
            'dia_diem': places,
            'can_kiem_them': can_kiem,
            'nghien_cuu': nghien_cuu,
        })
    # Phố mới (không có trong game): data/pho/<slug>.json có ten_pho, duong[], ward, gioi_thieu
    done = {o['slug'] for o in out}
    for f in sorted(glob.glob(os.path.join(ROOT, 'data', 'pho', '*.json'))):
        slug = os.path.basename(f)[:-5]
        if slug in done:
            continue
        r = json.load(open(f, encoding='utf-8'))
        roads = r.get('duong') or [r.get('road')]
        if isinstance(roads, str):
            roads = [roads]
        for rd in roads:
            if rd not in names:
                raise SystemExit('Phố mới %s: đường "%s" không có trong dữ liệu OSM' % (slug, rd))
        # ghim: điểm giữa các điểm của đường chính (đường đầu danh sách)
        pts = sorted(pt for d in duong['duong'] if d.get('ten') == roads[0] for pt in d['pts'])
        mid = pts[len(pts) // 2]
        places, can_kiem, intro, note = from_research(r)
        # có quán đã ghim: đặt ghim phố ở điểm trên đường của phố gần tâm các quán nhất
        # (đường dài như Huỳnh Tấn Phát 6 km thì điểm giữa đường có thể cách khu phố cả mấy km)
        vt = [d['vi_tri'] for d in places if d.get('vi_tri')]
        if vt:
            cx = sum(v['lon'] for v in vt) / len(vt); cy = sum(v['lat'] for v in vt) / len(vt)
            allp = [pt for d in duong['duong'] if d.get('ten') in roads for pt in d['pts']]
            mid = min(allp, key=lambda q: math.hypot((q[0] - cx) * 108900, (q[1] - cy) * 110540))
        anh = 'assets/dau_pho/dau_pho_' + slug.replace('-', '_') + '.webp'
        out.append({
            'id': 'pho_' + slug.replace('-', '_'),
            'slug': slug,
            'ten_pho': r['ten_pho'],
            'duong': roads,
            'ward': r.get('ward', ''),
            'gioi_thieu': intro or '',
            'anh': anh if os.path.exists(os.path.join(ROOT, anh)) else None,   # chưa có tranh Spark thì để trống
            'ten_that': True,
            'moi': True,
            'lon': mid[0], 'lat': mid[1],
            'dia_diem': places,
            'can_kiem_them': can_kiem,
            'nghien_cuu': REPO_URL + 'docs/research/pho_' + slug + '.md',
        })
    # chuyện của phố (data/chuyen/<slug>.json, agent nghien-cuu-pho): tên cũ, mốc lịch sử, chuyện, món
    for o in out:
        f = os.path.join(ROOT, 'data', 'chuyen', o['slug'] + '.json')
        if os.path.exists(f):
            c = json.load(open(f, encoding='utf-8'))
            def lk(x):
                out = []
                for u in x.get('nguon', []):
                    if u.startswith('http'):
                        out.append({'link': u, 'trang': site(u)})
                    else:      # tệp trong kho: văn bản NQ 1671, ranh giới mới
                        f2 = u.split(' ')[0]
                        out.append({'link': REPO_URL + f2, 'trang': 'Nghị quyết 1671/NQ-UBTVQH15' if 'nq1671' in f2 else 'Ranh giới mới (phuong.json)'})
                return out
            o['chuyen'] = {
                'ten_cu': [{'ten': t['ten'], 'thoi_gian': t.get('thoi_gian', ''), 'nguon': lk(t), 'mot_nguon': t.get('mot_nguon', len(t.get('nguon', [])) < 2), 'muc': muc_nguon(lk(t))} for t in c.get('ten_cu', [])],
                'moc': [{'nam': m['nam'], 'su_kien': m['su_kien'], 'nguon': lk(m), 'mot_nguon': m.get('mot_nguon', False), 'muc': muc_nguon(lk(m))} for m in c.get('moc', [])],
                'chuyen': [{'tieu_de': t['tieu_de'], 'noi_dung': t['noi_dung'], 'nguon': lk(t), 'mot_nguon': t.get('mot_nguon', False), 'muc': muc_nguon(lk(t))} for t in c.get('chuyen', [])],
            }
    # tên hiện trên bản đồ + 3 phần trang (data/hien_thi.json); ten_pho giữ nguyên vì dùng chung với game
    hp = os.path.join(ROOT, 'data', 'hien_thi.json')
    hien = json.load(open(hp, encoding='utf-8')) if os.path.exists(hp) else {}
    for o in out:
        x = hien.get(o['slug'])
        if not x:
            raise SystemExit('data/hien_thi.json thiếu nơi ' + o['slug'] + ' (cần ten, dac_trung, ban_gi, moc)')
        names = {d['ten'] for d in o['dia_diem']}
        for m in x['moc']:
            if m not in names:
                raise SystemExit('Mốc "%s" của %s không có trong danh sách nơi đã nghiên cứu' % (m, o['slug']))
        # loại nơi (anh Kha 26/11): 'duong' = đúng một con đường, ghim giữa đường; 'diem' = ghim đúng chỗ, không tô đường
        o['loai_noi'] = x['loai']
        if x['loai'] == 'duong':
            if x['duong_chinh'] not in o['duong']:
                raise SystemExit('%s: đường chính "%s" không có trong danh sách đường' % (o['slug'], x['duong_chinh']))
            o['duong_hien'] = [x['duong_chinh']]
            pts = [pt for dd in duong['duong'] if dd.get('ten') == x['duong_chinh'] for pt in dd['pts']]
            an = [(o['lon'], o['lat'])] + [(d['vi_tri']['lon'], d['vi_tri']['lat']) for d in o['dia_diem'] if d.get('vi_tri')]
            pts = [q for q in pts if min(math.hypot((q[0] - a[0]) * 108900, (q[1] - a[1]) * 110540) for a in an) < 2200] or pts
            cx = sum(q[0] for q in pts) / len(pts); cy = sum(q[1] for q in pts) / len(pts)
            mid = min(pts, key=lambda q: math.hypot((q[0] - cx) * 108900, (q[1] - cy) * 110540))   # điểm trên đường gần giữa đoạn đường nhất
            o['lon'], o['lat'] = mid[0], mid[1]
        else:
            o['duong_hien'] = []
            o['lon'], o['lat'] = x['diem'][0], x['diem'][1]
        o.update({'ten_ngan': x.get('ten_ngan', x['ten']), 'ten_hien': x['ten'], 'dac_trung': x['dac_trung'], 'ban_gi': x['ban_gi'], 'moc_lau_doi': x['moc']})
    write(out)


def site(u):
    return urlparse(u).netloc.replace('www.', '')


# Loại nguồn cho phần lịch sử (bước 3 hướng mới): mốc nào chỉ dựa trang du lịch/blog thì ghi rõ trên trang
BAO = re.compile(r'(baolamdong|vnexpress|thanhnien|nhandan|tuoitre|vietnamnet|znews|zingnews|sggp|baophapluat|kienthuc|nguoidothi|baonghean|vtcnews|vnanet|thuonggiaonline|nguoiquansat|baovanhoa|voh\.com|suckhoedoisong|dantri|thanhtra|tienphong|tapchicongthuong|baoquocte|vietnamplus|doanhnghiephoinhap|vietnamfinance|baodautu|cadn|doanhnhanplus|plo\.vn|daibieunhandan|vov\.vn|daidoanket|vietbao|laodong|qdnd|congan|nld\.com|saigoneer)')
VAN_BAN = re.compile(r'(\.gov\.vn|chinhphu\.vn|luatvietnam|thuviennhadat|thuvienphapluat|jica\.go\.jp|^NQ|Nghị quyết|Ranh giới)')
NGHIEN_CUU = re.compile(r'(vjol|tapchinghiencuu|efeo|entreprises-coloniales|\.edu\.vn|remontees-mecaniques)')


def loai_nguon(trang):
    if VAN_BAN.search(trang):
        return 'van_ban'
    if NGHIEN_CUU.search(trang):
        return 'nghien_cuu'
    if BAO.search(trang):
        return 'bao'
    if 'wikipedia' in trang:
        return 'wiki'
    return 'blog'


def muc_nguon(nguon):
    loai = {loai_nguon(n['trang']) for n in nguon}
    if loai & {'van_ban', 'nghien_cuu', 'bao'}:
        return 'chac'
    return 'wiki' if 'wiki' in loai else 'blog'


def from_research(r):
    """Nghiên cứu của kho này: chỉ giữ nơi có ≥ 2 nguồn ở 2 trang web khác nhau."""
    places, can = [], len(r.get('can_kiem_them') or [])
    for d in r.get('dia_diem', []):
        urls = [n if isinstance(n, str) else n.get('link') or n.get('url') for n in d.get('nguon', [])]
        urls = [u for u in urls if u]
        # chỉ bỏ khi ghi chú khẳng định đã đóng hẳn; "chưa rõ: … đã đóng hơn hai năm …" (Dinh I) vẫn giữ
        if len({site(u) for u in urls}) < 2 or str(d.get('con_mo', '')).strip().lower().startswith('đã đóng'):
            can += 1      # thiếu nguồn, hoặc nghi đã đóng hẳn: chờ kiểm, chưa đưa lên bản đồ
            continue
        so, duong = d.get('so_nha'), d.get('duong') or r.get('road')
        places.append({
            'ten': d['ten'],
            'loai': d.get('loai', ''),
            'dac_trung': d.get('dac_trung', ''),
            'dia_chi': (str(so) + ' ' if so else '') + duong,
            'duong': duong,
            'nguon': [{'link': u, 'trang': site(u)} for u in urls],
            'vi_tri': d.get('vi_tri'),
            'con_mo': d.get('con_mo'),
        })
    return places, can, r.get('gioi_thieu'), None


def from_game(g):
    places, can_kiem = [], 0
    for pl in g['places']:
            if pl['confidence'] == 'chac' and len(pl['sources']) >= 2:
                places.append({
                    'loai': pl['type'],
                    'dac_trung': pl['trait'],
                    'nguon': [{'link': u, 'trang': urlparse(u).netloc.replace('www.', '')} for u in pl['sources']],
                })
            else:
                can_kiem += 1
    return places, can_kiem


def write(out):
    res = {
        'cap_nhat': '25/11/2026',
        'ghi_chu': 'Phố có ten_that=true: tên quán thật, ≥ 2 nguồn ở 2 trang khác nhau. Phố còn lại: chỉ loại quán (tên trong game là tên đặt lại).',
        'nguon': [{'ten': 'Nghiên cứu phố của Gọn Phố Việt (docs/research/pho_*.md)', 'link': REPO_URL + 'docs/research'},
                  {'ten': 'Nghiên cứu phố của game Gọn Phố (kho ltckha/giang-ho-ai)', 'link': GAME_URL + 'docs/research'},
                  {'ten': 'Tranh đầu phố: Spark vẽ cho anh Kha (đợt 35)', 'link': GAME_URL + 'art/ban_do'}],
        'pho': out,
    }
    path = os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'pho.json')
    json.dump(res, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(path)
    for o in out:
        print(' ', o['ten_pho'], o['duong'], len(o['dia_diem']), 'nơi chắc,', o['can_kiem_them'], 'nơi cần kiểm thêm')
    # số phố mỗi phường trên tầng tỉnh (phuong.json): đếm lại từ danh sách phố vừa dựng
    pp = os.path.join(ROOT, 'data', 'lam-dong', 'phuong.json')
    pj = json.load(open(pp, encoding='utf-8'))
    dem = {}
    for o in out:
        if o.get('ward'):
            dem[o['ward']] = dem.get(o['ward'], 0) + 1
    for w in pj['phuong']:
        w.pop('so_pho', None)
        if w['ten'] + ' - Đà Lạt' in dem or w['ten'] in dem:
            w['so_pho'] = dem.get(w['ten'], dem.get(w['ten'] + ' - Đà Lạt'))
    json.dump(pj, open(pp, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print('phuong.json so_pho:', dem)


if __name__ == '__main__':
    main(sys.argv[1])
