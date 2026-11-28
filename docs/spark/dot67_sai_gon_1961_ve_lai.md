# Spark đợt 67: vẽ lại 7 ô Sài Gòn 1961 bị gãy ở mép nối (28/11/2026)

Sau khi uốn mọi ô theo bản quét gốc (khop_quet.py), còn 6 khúc mép lệch > 8 m vì Spark vẽ hai ô khác nội dung ở dải chồng mép
(một ô có đường ray / bờ sông, ô kia không). So từng ô với bản quét tại chỗ đó (độ khớp nét): ô sai rõ là x600_y5100 (-0,08),
t1_x770_y350 (0,39 so với 0,97 của ô bên), x1700_y700 (0,17 so với 0,90); ô kém hơn ô bên: x600_y5700, x1700_y5100, x600_y2900;
thêm x600_y4000 còn sót chữ "Ấp Tân Chân". Ghép: thay ảnh chưa mờ, chạy lại khop_quet → mo_mep → khop_ten → kiem_mep;
ô vẽ lại nào làm mép tệ hơn thì giữ bản cũ.

Ảnh gốc (7 ảnh, gửi anh từng ảnh): sg1961_t2_x600_y5100_goc.png, sg1961_t2_x600_y5700_goc.png, sg1961_t2_x1700_y5100_goc.png, sg1961_t2_x600_y2900_goc.png, sg1961_t2_x1700_y700_goc.png, sg1961_t2_x600_y4000_goc.png, sg1961_t1_x770_y350_goc.png

```
Mình làm "Gọn Phố Việt" — bản đồ phố Việt Nam xưa và nay cho điện thoại. Đây là đợt vẽ số 67: VẼ LẠI 7 ô của các đợt 55–60 (bản cũ bỏ sót nét ở sát mép nên ráp với ô bên cạnh bị gãy).

Đính kèm 7 ảnh: các góc bản đồ Sài Gòn năm 1961 (tỉ lệ 1:10.000, bản quét giấy cũ, đen trắng), mỗi ảnh khoảng 1,7 × 1,7 km.
Vẽ lại TỪNG ảnh thành một bản đồ minh hoạ riêng — nét vẽ y hệt đợt 52:
- GIỮ ĐÚNG Y VỊ TRÍ mọi con đường, khối phố, công viên, toà nhà, sông rạch, bờ ruộng như ảnh gốc — đặt chồng lên ảnh gốc phải trùng khít.
  Không thêm, không bớt, không dời; chỉ đổi nét cho sạch và tô màu. Phần lề giấy trắng ngoài khung bản đồ (nếu có) để trống màu kem.
- Cùng khung với ảnh gốc: không xoay, không cắt, không thêm viền, nhìn thẳng từ trên xuống. PNG vuông 2048×2048.
- Màu: nền giấy kem nhạt; đường là khoảng trống màu kem sáng; khối phố viền nâu sẫm mảnh; nhà dân màu cam đất nhạt có gạch chéo mảnh;
  công trình lớn (dinh, nhà thờ, chợ, trường, kho cảng, nhà máy) màu đỏ gạch; công viên, bồn cỏ xanh lá nhạt; sông, rạch xanh dương nhạt;
  ruộng màu vàng lúa nhạt, bờ ruộng nét nâu đứt mảnh; đầm lầy, rừng ngập màu xanh rêu nhạt có búi cỏ nhỏ; vườn cây xanh lá có chấm cây;
  đường sắt nét đen gạch ngang.
- VẼ ĐỦ MỌI NÉT TỚI SÁT TẬN 4 MÉP ẢNH: đường, đường ray, nhà, bờ sông, rạch, bờ ruộng ở mép cũng phải có, đúng chỗ như ảnh gốc — ô này ráp chồng mép với ô bên cạnh.
- KHÔNG chữ, không số, không tên đường, không tên làng, không ký hiệu, không lưới toạ độ (xoá hết chữ in trên ảnh gốc).

1. sg1961_t2_x600_y5100: vẽ lại ảnh sg1961_t2_x600_y5100_goc
2. sg1961_t2_x600_y5700: vẽ lại ảnh sg1961_t2_x600_y5700_goc
3. sg1961_t2_x1700_y5100: vẽ lại ảnh sg1961_t2_x1700_y5100_goc
4. sg1961_t2_x600_y2900: vẽ lại ảnh sg1961_t2_x600_y2900_goc
5. sg1961_t2_x1700_y700: vẽ lại ảnh sg1961_t2_x1700_y700_goc
6. sg1961_t2_x600_y4000: vẽ lại ảnh sg1961_t2_x600_y4000_goc
7. sg1961_t1_x770_y350: vẽ lại ảnh sg1961_t1_x770_y350_goc

Lưu lên Google Drive vào Spark/Inbox/Game_ve_thu/dot67_sai_gon_1961_ve_lai/, đúng tên file trên (.png).
```
