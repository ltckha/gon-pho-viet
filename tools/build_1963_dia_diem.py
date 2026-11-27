"""Gom nghiên cứu "năm 1963 là gì → nay là gì → qua các năm" của các công trình đánh số trên bản đồ Đà Lạt 1963
thành data/lam-dong/da-lat/1963_dia_diem.json, gắn hình Spark có sẵn (assets/vn/moc_*.webp).

Đầu vào: các file JSON kết quả nghiên cứu (mảng; mỗi phần tử: so, ten_1963, nay{ten, mo_ta, nguon}, cung_cho,
cung_cho_ghi_chu, moc[{nam, su_kien, nguon, chua_chac}], trang). Kết quả gốc lưu ở docs/research/1963_dia_diem/.

Chạy: python3 -I tools/build_1963_dia_diem.py docs/research/1963_dia_diem/*.json
"""
import json, os, re, sys
from urllib.parse import urlparse

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

# hình Spark có sẵn: số trên bản đồ → tên hình (chỉ những nơi chắc là cùng công trình)
HINH = {
    3: 'khach_san_palace', 6: 'cho_da_lat', 76: 'quang_truong', 44: 'nha_tho_con_ga', 52: 'san_golf', 53: 'rap_hoa_binh',
    56: 'chua_linh_quang', 57: 'chua_linh_son', 66: 'thuy_ta', 71: 'domaine_de_marie', 72: 'domaine_de_marie',
    78: 'lang_nguyen_huu_hao', 81: 'dai_hoc_da_lat', 84: 'hoc_vien_luc_quan', 86: 'couvent_des_oiseaux',
    87: 'vien_pasteur', 102: 'lycee_yersin', 104: 'san_bay_cam_ly', 105: 'ga_da_lat',
}
# hình chọn theo tên nay mà nghiên cứu xác định được (dinh I/II/III, khách sạn Du Parc, chùa Linh Phong, Lưu trữ IV…)
THEO_TEN = [
    (r'Dinh I\b(?!I)', 'dinh_1'), (r'Dinh II\b(?!I)', 'dinh_2'), (r'Dinh III', 'dinh_3'),
    (r'Du Parc', 'khach_san_du_parc'), (r'Linh Phong', 'chua_linh_phong'), (r'Lưu trữ [Qq]uốc gia IV', 'luu_tru_iv'),
    (r'Bảo tàng Lâm Đồng', 'bao_tang_lam_dong'), (r'Nhà thờ Cam Ly', 'nha_tho_cam_ly'),
]
TRANG = {'nha-tho-con-ga', 'vien-pasteur', 'dai-hoc-da-lat', 'domaine-de-marie', 'ga-da-lat', 'dinh-1', 'khu-hoa-binh',
         'ho-xuan-huong', 'yersin', 'tran-phu', 'truc-lam', 'chua-linh-phuoc'}


def nguon(lst):
    out = []
    for u in lst or []:
        if not isinstance(u, str) or not u.startswith('http'):
            continue
        h = urlparse(u).netloc.replace('www.', '')
        out.append({'link': u, 'trang': h})
    return out


def main(files):
    t63 = json.load(open(os.path.join(ROOT, 'data/lam-dong/da-lat/1963.json'), encoding='utf-8'))
    ct = {c['so']: c for c in t63['cong_trinh']}
    have = set(os.listdir(os.path.join(ROOT, 'assets/vn')))
    out, bo = [], []
    # file bổ sung (phần tử có "moc_them"): gộp vào bản gốc cùng số — thêm mốc, thay "nay" nếu có "nay_moi"
    goc, them = [], {}
    for f in files:
        for r in json.load(open(f, encoding='utf-8')):
            if 'moc_them' in r:
                t = them.setdefault(int(r['so']), {'moc': [], 'nay': None})
                t['moc'] += r.get('moc_them') or []
                if r.get('nay_moi'):
                    t['nay'] = r['nay_moi']
            else:
                goc.append(r)
    for r in goc:
        t = them.get(int(r['so']))
        if t:
            r['moc'] = (r.get('moc') or []) + t['moc']
            if t['nay']:
                r['nay'] = t['nay']
                if r.get('cung_cho') == 'không rõ':
                    r['cung_cho'] = 'chưa chắc'
    for _ in [0]:
        for r in goc:
            so = int(r['so'])
            if so not in ct:
                bo.append((so, 'không có trong bảng')); continue
            nay = r.get('nay') or None
            moc = []
            for m in r.get('moc') or []:
                ng = nguon(m.get('nguon'))
                if not ng or not m.get('nam') or not m.get('su_kien'):
                    continue
                moc.append({'nam': str(m['nam']), 'su_kien': m['su_kien'].strip(), 'nguon': ng,
                            'mot_nguon': len({n['trang'] for n in ng}) < 2 or bool(m.get('chua_chac'))})
            moc.sort(key=lambda m: re.sub(r'\D', '', m['nam'])[:4] or '9999')
            if not nay and not moc:
                bo.append((so, 'chưa rõ nay là gì, không có mốc')); continue
            hinh = HINH.get(so)
            if not hinh and nay and r.get('cung_cho') == 'chắc':
                for pat, h in THEO_TEN:
                    if re.search(pat, nay.get('ten', '')):
                        hinh = h; break
            if hinh and 'moc_%s.webp' % hinh not in have:
                hinh = None
            trang = r.get('trang') if r.get('trang') in TRANG else None
            out.append({
                'so': so, 'ten_1963': ct[so]['ten'], 'nhom': ct[so]['nhom'],
                'hinh': hinh, 'trang': trang,
                'cung_cho': r.get('cung_cho') or 'không rõ', 'cung_cho_ghi_chu': r.get('cung_cho_ghi_chu') or '',
                'nay': ({'ten': nay.get('ten', ''), 'mo_ta': nay.get('mo_ta', ''), 'nguon': nguon(nay.get('nguon'))} if nay else None),
                'moc': moc,
            })
    out.sort(key=lambda x: x['so'])
    p = os.path.join(ROOT, 'data/lam-dong/da-lat/1963_dia_diem.json')
    json.dump({'nguon': 'Nghiên cứu 27/11/2026 (mỗi mốc ≥ 2 nguồn ở 2 trang khác nhau; 1 nguồn thì ghi chưa chắc). Kết quả gốc: docs/research/1963_dia_diem/',
               'dia_diem': out}, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print('%d nơi (%d có hình Spark, %d có trang, %d chắc cùng chỗ), %d mốc; bỏ %d' % (
        len(out), sum(1 for x in out if x['hinh']), sum(1 for x in out if x['trang']),
        sum(1 for x in out if x['cung_cho'] == 'chắc'), sum(len(x['moc']) for x in out), len(bo)))
    for b in bo:
        print('  bỏ', *b)


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1:])
