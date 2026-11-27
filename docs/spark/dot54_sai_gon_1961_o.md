# Spark đợt 54 (đánh số chung với game): vẽ lại bản đồ Sài Gòn 1961 — 4 ô góc quanh trung tâm (27/11/2026)

Đợt 52 (ô trung tâm) Spark vẽ trùng khít bản gốc (lệch < 1 m) → làm cả thành phố theo ô. Mỗi ô 1200×1200 điểm ảnh của tờ quét
(~1,7 km), chồng mép 100 điểm ảnh với ô bên cạnh. Tên ô = tờ + toạ độ góc trên-trái trên tờ quét.
Ảnh gốc anh đính kèm (cắt từ tờ 2, Thư viện Đại học Texas, tài liệu chính phủ Mỹ):
1. sg1961_t2_x2800_y2900_goc.png — góc đông nam (Khánh Hội, Tân Thuận, sông)
2. sg1961_t2_x600_y700_goc.png — góc tây bắc (Tân Định, Phú Nhuận)
3. sg1961_t2_x2800_y700_goc.png — góc đông bắc (Thị Nghè, Thủ Thiêm phía bắc)
4. sg1961_t2_x600_y2900_goc.png — góc tây nam (Chợ Quán, kênh Tàu Hũ)

```
Mình làm "Gọn Phố Việt" — bản đồ phố Việt Nam xưa và nay cho điện thoại. Đây là đợt vẽ số 53, tiếp đợt 52–53.

Đính kèm 4 ảnh: các góc bản đồ Sài Gòn năm 1961 (tỉ lệ 1:10.000, bản quét giấy cũ, đen trắng), mỗi ảnh khoảng 1,7 × 1,7 km.
Vẽ lại TỪNG ảnh thành một bản đồ minh hoạ riêng — nét vẽ y hệt đợt 52:
- GIỮ ĐÚNG Y VỊ TRÍ mọi con đường, khối phố, công viên, toà nhà, sông rạch, bờ ruộng như ảnh gốc — đặt chồng lên ảnh gốc phải trùng khít.
  Không thêm, không bớt, không dời; chỉ đổi nét cho sạch và tô màu.
- Cùng khung với ảnh gốc: không xoay, không cắt, không thêm viền, nhìn thẳng từ trên xuống. PNG vuông 2048×2048.
- Màu: nền giấy kem nhạt; đường là khoảng trống màu kem sáng; khối phố viền nâu sẫm mảnh; nhà dân màu cam đất nhạt có gạch chéo mảnh;
  công trình lớn (dinh, nhà thờ, chợ, trường, kho cảng) màu đỏ gạch; công viên, bồn cỏ xanh lá nhạt; sông, rạch xanh dương nhạt;
  ruộng màu vàng lúa nhạt, bờ ruộng nét nâu đứt mảnh; đầm lầy, rừng ngập màu xanh rêu nhạt có búi cỏ nhỏ; đường sắt nét đen gạch ngang.
- KHÔNG chữ, không số, không tên đường, không tên làng, không ký hiệu, không lưới toạ độ (xoá hết chữ in trên ảnh gốc).

1. sg1961_t2_x2800_y2900: vẽ lại ảnh sg1961_t2_x2800_y2900_goc
2. sg1961_t2_x600_y700: vẽ lại ảnh sg1961_t2_x600_y700_goc
3. sg1961_t2_x2800_y700: vẽ lại ảnh sg1961_t2_x2800_y700_goc
4. sg1961_t2_x600_y2900: vẽ lại ảnh sg1961_t2_x600_y2900_goc

Lưu lên Google Drive vào Spark/Inbox/Game_ve_thu/dot54_sai_gon_1961_o/, đúng tên file trên (.png).
```

Ghép (khi anh gửi hình hoặc báo "xong 53"): đo khớp từng ô với ảnh gốc, ô nào lệch thì báo vẽ lại; ô khớp thì thêm vào
`anh_nen` của data/sai-gon/1961.json (toạ độ 3 góc tính từ docs/research/sai_gon_1961/to2_toa_do.json), phần chồng mép làm mờ dần.
