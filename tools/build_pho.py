#!/usr/bin/env python3
"""Tạo data/lam-dong/da-lat/pho.json (trang phố) từ nghiên cứu phố của game Gọn Phố, và chép tranh đầu phố.

Cách chạy:
  python3 tools/build_pho.py <thư mục kho giang-ho-ai (chỉ đọc)>

Ưu tiên nghiên cứu riêng của kho này: data/pho/<slug>.json (agent nghien-cuu-pho; tên quán THẬT, địa chỉ,
≥ 2 nguồn ở 2 trang khác nhau, vị trí từ tools/vi_tri_quan.py). Phố nào chưa có thì mới lấy từ game.

Lưu ý quan trọng: tên quán trong content/streets/*.json của game là TÊN ĐẶT LẠI (game không dùng tên quán thật),
nên khi lấy từ game KHÔNG lấy tên quán — chỉ lấy loại quán, đặc trưng và nguồn ("chac" và ≥ 2 nguồn).
"""
import json
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
            'dia_diem': places,
            'can_kiem_them': can_kiem,
            'nghien_cuu': nghien_cuu,
        })
    write(out)


def site(u):
    return urlparse(u).netloc.replace('www.', '')


def from_research(r):
    """Nghiên cứu của kho này: chỉ giữ nơi có ≥ 2 nguồn ở 2 trang web khác nhau."""
    places, can = [], len(r.get('can_kiem_them') or [])
    for d in r.get('dia_diem', []):
        urls = [n if isinstance(n, str) else n.get('link') or n.get('url') for n in d.get('nguon', [])]
        urls = [u for u in urls if u]
        if len({site(u) for u in urls}) < 2:
            can += 1
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


if __name__ == '__main__':
    main(sys.argv[1])
