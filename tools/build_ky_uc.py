"""Gom nghiên cứu "ký ức" Đà Lạt (docs/research/ky_uc/nhom_*.json) thành data/lam-dong/da-lat/ky_uc.json cho thẻ bản đồ 1963.
Ảnh: KHÔNG tải về kho (anh Kha 28/11). Ảnh có giấy phép mở (dung=nhung) hiện bằng cách gọi thẳng ảnh thu nhỏ từ trang gốc
(Wikimedia Commons /thumb/, Flickr _z), luôn kèm tác giả + giấy phép + link trang. Ảnh có chủ (chi_link) chỉ là link.
Bỏ ảnh đánh dấu chưa chắc đúng nơi. Ghép: so_1963 (+ so_khac) → thẻ công trình; nơi không số → tên nhãn trên bản đồ 1963 (NHAN).
Chạy: python3 tools/build_ky_uc.py"""
import json, glob, re, urllib.parse
NHAN = {'Hồ Xuân Hương': 'Hồ Xuân Hương', 'Hồ Than Thở': 'Hồ Than Thở', 'Hồ Chiến Thắng': 'Hồ Mê Linh', 'Ấp Ánh Sáng': 'Ấp Ánh Sáng',
        'Trại Hầm': 'Ấp Đa Lợi (Trại Hầm)', 'Khu Hòa Bình': 'Khu Hòa Bình'}
def thu_nho(u):
    if not u or not re.search(r'\.(jpe?g|png)$', u, re.I): return None
    m = re.match(r'https://upload\.wikimedia\.org/wikipedia/commons/(\w)/(\w\w)/(.+)$', u)
    if m: return 'https://upload.wikimedia.org/wikipedia/commons/thumb/%s/%s/%s/500px-%s' % (m.group(1), m.group(2), m.group(3), m.group(3))
    if 'staticflickr.com' in u: return re.sub(r'_[bhko]\.jpg$', '_z.jpg', u)
    return u
so, nhan, bo = {}, {}, 0
for f in sorted(glob.glob('docs/research/ky_uc/nhom_*.json')):
    for p in json.load(open(f, encoding='utf-8')):
        anh, link = [], []
        for a in p.get('anh', []):
            if a.get('dung') == 'nhung' and not a.get('chua_chac') and thu_nho(a.get('anh')):
                anh.append({'src': thu_nho(a['anh']), 'goc': a['anh'], 'trang': a['trang'], 'nam': a.get('nam', ''), 'tac_gia': a.get('tac_gia', ''),
                            'giay_phep': a.get('giay_phep', ''), 'mo_ta': a.get('mo_ta', '')})
            elif a.get('trang'):
                if a.get('dung') == 'nhung': bo += 1
                link.append({'trang': a['trang'], 'mo_ta': a.get('mo_ta', ''), 'tac_gia': a.get('tac_gia', ''), 'nam': a.get('nam', '')})
        e = {'ten': p['ten'], 'anh': anh, 'link': link,
             'dong': [{'d': k['dong'], 'nguon': k.get('nguon', ''), 'cc': bool(k.get('chua_chac'))} for k in p.get('ky_uc', [])],
             'tu_lieu': [{'loai': t.get('loai', ''), 'ten': t.get('ten', ''), 'link': t.get('link', '')} for t in p.get('tu_lieu', [])]}
        if p.get('so_1963'):
            for s in [p['so_1963']] + (p.get('so_khac') or []): so[str(s)] = e
        else:
            for k, v in NHAN.items():
                if p['ten'].startswith(k) or k in p['ten'][:len(k) + 2]: nhan[v] = e; break
json.dump({'nguon': 'docs/research/ky_uc (nghiên cứu 28/11/2026)', 'so': so, 'nhan': nhan},
          open('data/lam-dong/da-lat/ky_uc.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('thẻ số:', len(so), '· nhãn:', sorted(nhan), '· ảnh hiện:', sum(len(e['anh']) for e in list(so.values()) + list(nhan.values())), '· bỏ ảnh chưa chắc:', bo)
