#!/usr/bin/env python3
"""Tạo data/lam-dong/da-lat/pho.json (trang phố) từ nghiên cứu phố của game Gọn Phố, và chép tranh đầu phố.

Cách chạy:
  python3 tools/build_pho.py <thư mục kho giang-ho-ai (chỉ đọc)>

Lưu ý quan trọng: tên quán trong content/streets/*.json của game là TÊN ĐẶT LẠI (game không dùng tên quán thật),
nên ở đây KHÔNG lấy tên quán — chỉ lấy loại quán, đặc trưng và nguồn. Chỉ giữ nơi game ghi "chac" và có ≥ 2 nguồn.
"""
import json
import os
import shutil
import sys
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAME_URL = 'https://github.com/ltckha/giang-ho-ai/blob/main/'
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
        src = os.path.join(game, 'public', 'assets', 'ui', ANH[p['id']] + '.webp')
        shutil.copy(src, os.path.join(ROOT, 'assets', 'dau_pho', ANH[p['id']] + '.webp'))
        out.append({
            'id': p['id'],
            'slug': p['id'].replace('street_', '').replace('_', '-'),
            'ten_pho': p['ten_pho'],
            'duong': roads,
            'ward': p['ward'],
            'gioi_thieu': p['gioi_thieu'],
            'anh': 'assets/dau_pho/' + ANH[p['id']] + '.webp',
            'dia_diem': places,
            'can_kiem_them': can_kiem,
            'nghien_cuu': GAME_URL + g['researchNote'],
        })
    res = {
        'cap_nhat': '25/11/2026',
        'ghi_chu': 'Chưa ghi tên quán: nghiên cứu của game dùng tên đặt lại. Chỉ giữ nơi có ≥ 2 nguồn và game ghi "chắc".',
        'nguon': [{'ten': 'Nghiên cứu phố của game Gọn Phố (kho ltckha/giang-ho-ai)', 'link': GAME_URL + 'docs/research'},
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
