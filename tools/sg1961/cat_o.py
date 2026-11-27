"""Cắt các ô Sài Gòn 1961 còn lại cho Spark vẽ (mỗi ô 1200×1200 điểm ảnh tờ quét ~1,7 km, chồng mép ≥ 100) và soạn khối từng đợt.
Chạy: python3 -I tools/sg1961/cat_o.py <tờ1.jpg> <tờ2.jpg> <thư mục ra> <đợt bắt đầu>
Ra: <thư mục>/dotNN/*_goc.png + dotNN.zip, và docs/spark/dot55_65_sai_gon_1961.md (khối dán cho Spark từng đợt).
"""
import os, sys, zipfile
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
DA_LAM = {(2, 600, 700), (2, 1700, 700), (2, 2800, 700), (2, 600, 1800), (2, 1700, 1800), (2, 2800, 1800),
          (2, 600, 2900), (2, 1700, 2900), (2, 2800, 2900)}          # đợt 52–54
# tờ 2: khung bản đồ x 250–4350, y 320–6800 (mép trái trùng tờ 1 nên bỏ); tờ 1: x 770–5050, y 350–6800, bỏ ô có hình nhỏ góc phải dưới
T2 = [(x, y) for y in (0, 700, 1800, 2900, 4000, 5100, 5700) for x in (600, 1700, 2800, 3300)]
T1 = [(x, y) for y in (2550, 3650, 1450, 4750, 350, 5650) for x in (3850, 2970, 1870, 770) if not (x >= 2970 and y == 5650)]
MO_TA = {}


def khoi(dot, ten):
    ds = '\n'.join('%d. %s: vẽ lại ảnh %s_goc' % (i + 1, t, t) for i, t in enumerate(ten))
    return '''Mình làm "Gọn Phố Việt" — bản đồ phố Việt Nam xưa và nay cho điện thoại. Đây là đợt vẽ số %d, tiếp đợt 52–54.

Đính kèm %d ảnh: các góc bản đồ Sài Gòn năm 1961 (tỉ lệ 1:10.000, bản quét giấy cũ, đen trắng), mỗi ảnh khoảng 1,7 × 1,7 km.
Vẽ lại TỪNG ảnh thành một bản đồ minh hoạ riêng — nét vẽ y hệt đợt 52:
- GIỮ ĐÚNG Y VỊ TRÍ mọi con đường, khối phố, công viên, toà nhà, sông rạch, bờ ruộng như ảnh gốc — đặt chồng lên ảnh gốc phải trùng khít.
  Không thêm, không bớt, không dời; chỉ đổi nét cho sạch và tô màu. Phần lề giấy trắng ngoài khung bản đồ (nếu có) để trống màu kem.
- Cùng khung với ảnh gốc: không xoay, không cắt, không thêm viền, nhìn thẳng từ trên xuống. PNG vuông 2048×2048.
- Màu: nền giấy kem nhạt; đường là khoảng trống màu kem sáng; khối phố viền nâu sẫm mảnh; nhà dân màu cam đất nhạt có gạch chéo mảnh;
  công trình lớn (dinh, nhà thờ, chợ, trường, kho cảng, nhà máy) màu đỏ gạch; công viên, bồn cỏ xanh lá nhạt; sông, rạch xanh dương nhạt;
  ruộng màu vàng lúa nhạt, bờ ruộng nét nâu đứt mảnh; đầm lầy, rừng ngập màu xanh rêu nhạt có búi cỏ nhỏ; vườn cây xanh lá có chấm cây;
  đường sắt nét đen gạch ngang.
- KHÔNG chữ, không số, không tên đường, không tên làng, không ký hiệu, không lưới toạ độ (xoá hết chữ in trên ảnh gốc).

%s

Lưu lên Google Drive vào Spark/Inbox/Game_ve_thu/dot%d_sai_gon_1961_o/, đúng tên file trên (.png).''' % (dot, len(ten), ds, dot)


def main(t1, t2, ra, dot0):
    o = [(2, x, y) for x, y in T2 if (2, x, y) not in DA_LAM] + [(1, x, y) for x, y in T1]
    ims = {1: Image.open(t1), 2: Image.open(t2)}
    md = ['# Spark đợt %d–%d: vẽ lại hết bản đồ Sài Gòn 1961 theo ô (27/11/2026)' % (dot0, dot0 + (len(o) - 1) // 4), '',
          'Tiếp đợt 52–54 (khớp ≤ 1,5 m). %d ô còn lại, mỗi đợt 4 ô, đô thị trước, ruộng sau. Tờ 2 = trung tâm, Gia Định, Khánh Hội, Quận 4–7 cũ;' % len(o),
          'tờ 1 = Chợ Lớn, Phú Thọ, Bình Tây. Ảnh gốc mỗi đợt nén trong một file dotNN.zip em gửi kèm. Tên ô = tờ + toạ độ góc trên-trái trên tờ quét.',
          'Ghép: anh gửi hình Spark vào chat (một tin riêng), em đo khớp từng ô rồi thêm vào `anh_nen` (data/sai-gon/1961.json).', '']
    for b in range(0, len(o), 4):
        dot = dot0 + b // 4; d = os.path.join(ra, 'dot%d' % dot); os.makedirs(d, exist_ok=True)
        ten = []
        z = zipfile.ZipFile(os.path.join(ra, 'dot%d_anh_goc_sai_gon_1961.zip' % dot), 'w')
        for t, x, y in o[b:b + 4]:
            n = 'sg1961_t%d_x%d_y%d' % (t, x, y); ten.append(n)
            f = os.path.join(d, n + '_goc.png'); ims[t].crop((x, y, x + 1200, y + 1200)).save(f); z.write(f, n + '_goc.png')
        z.close()
        md += ['## Đợt %d' % dot, '', 'Ảnh gốc: dot%d_anh_goc_sai_gon_1961.zip (%s)' % (dot, ', '.join(ten)), '', '```', khoi(dot, ten), '```', '']
    open(os.path.join(ROOT, 'docs/spark/dot%d_%d_sai_gon_1961.md' % (dot0, dot0 + (len(o) - 1) // 4)), 'w', encoding='utf-8').write('\n'.join(md))
    print(len(o), 'ô,', (len(o) + 3) // 4, 'đợt')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]))
