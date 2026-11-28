"""Khép chỗ nối tờ 1 (Chợ Lớn) với tờ 2 (trung tâm) Sài Gòn 1961 (anh Kha 28/11: "mép tờ ra ngoài, sông bị cắt, đường lệch lên xuống").
Hai tờ giấy in giáp nhau ĐÚNG ở khung: tờ 1 khung phải x=4939 ≡ tờ 2 khung trái x=244, CÙNG HÀNG y (soát tận mắt trên bản quét:
lưới ô, phố, kênh Tàu Hũ nối liền khi đặt ngang hàng). Toạ độ đa thức của hai tờ lại lệch nhau ở đó (~200 m dọc, 35–60 m ngang).
Giữ tờ 2 (đã gắn tên đường), kéo tờ 1: ở khung phải dời đúng bằng độ lệch, giảm tuyến tính về 0 ở khung trái tờ 1 (x=770).
Chạy SAU khop_quet (đọc chỗ đặt gốc anh_nen_theo_to.json, chỉ sửa ô tờ 1 trong data/sai-gon/1961.json): python3 tools/sg1961/khep_to.py"""
import json, os, re, sys
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from geo import nap
F = 'data/sai-gon/1961.json'; d = json.load(open(F))
GOC = {a['file']: a for a in json.load(open('docs/research/sai_gon_1961/anh_nen_theo_to.json'))}
l2p1, p2l1 = nap('docs/research/sai_gon_1961/to1_toa_do.json'); l2p2, p2l2 = nap('docs/research/sai_gon_1961/to2_toa_do.json')
DY = float(os.environ.get('DY', '0'))            # chỉnh hàng nếu cần (điểm ảnh tờ 2)
n = 0
for a in d['anh_nen']:
    m = re.search(r't(\d)_x(\d+)_', a['file'])
    if not m: continue
    a.update({k: list(GOC[a['file']][k]) for k in ('tt', 'tp', 'dt')})     # bỏ lần khép cũ, tính lại từ chỗ đặt gốc
    if m.group(1) != '1': continue
    for k in ('tt', 'tp', 'dt'):
        x, y = l2p1([a[k][0]], [a[k][1]])[0]
        v = p2l2([244], [y + DY])[0] - p2l1([4939], [y])[0]
        t = np.clip((x - 770) / (4939 - 770), 0, 1)
        a[k] = [round(a[k][0] + float(v[0]) * t, 7), round(a[k][1] + float(v[1]) * t, 7)]
    n += 1
json.dump(d, open(F, 'w'), ensure_ascii=False, separators=(',', ':'))
print('kéo', n, 'ô tờ 1')
