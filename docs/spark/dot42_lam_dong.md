# Spark đợt 42 (đánh số chung với game): mốc cho bản đồ tỉnh Lâm Đồng (25/11/2026)

Tầng Lâm Đồng đã cùng nét bản đồ Việt Nam. Đà Lạt có mốc (hình Spark cũ của game), phần còn lại của tỉnh mới (gộp Lâm Đồng, Đắk Nông, Bình Thuận cũ) còn trống.
Anh dán khối dưới cho Spark, lưu vào Drive cùng chỗ đợt 41 (thư mục mới `dot42_lam_dong`, đúng tên file), rồi báo "Spark xong 42".

```
Nét vẽ y hệt đợt trước (mốc tỉnh đợt 41: moc_cao_bang, moc_phu_tho…): hoạt hình ấm, viền nâu đậm,
mỗi mốc là một mô hình nhỏ nhìn chéo từ trên xuống, đặt trên một miếng đất nổi, nền TRONG SUỐT, KHÔNG có chữ, không có người.
Mỗi hình PNG 512×512.

- moc_mui_ne: đồi cát vàng đỏ uốn lượn sát biển xanh, vài thuyền thúng tròn trên bãi
- moc_phan_thiet: ba ngọn tháp Chăm gạch đỏ Po Sah Inu trên đồi, dưới là làng chài với thuyền đánh cá xanh đỏ
- moc_ta_cu: núi Tà Cú rừng xanh có tượng Phật nằm trắng, cáp treo nhỏ đi lên
- moc_ke_ga: ngọn hải đăng đá Kê Gà trên mỏm đá giữa biển
- moc_phu_quy: đảo Phú Quý nhỏ giữa biển, cột điện gió trắng, thuyền cá
- moc_bai_da_bay_mau: bãi đá nhiều màu xếp lớp sát biển, chùa Hang nhỏ phía sau (Cổ Thạch)
- moc_bao_loc: đồi chè Bảo Lộc xanh từng luống, thác Dambri trắng xoá bên cạnh
- moc_ta_dung: hồ Tà Đùng xanh ngọc với hàng chục đảo nhỏ phủ rừng (vịnh Hạ Long Tây Nguyên)
- moc_krong_no: cửa hang động núi lửa đen xám, dòng suối và rừng (công viên địa chất Đắk Nông)
- moc_pongour: thác Pongour rộng nhiều bậc đá xếp như bậc thang, nước trắng chảy tràn
- moc_da_nhim: hồ Đa Nhim giữa núi, cánh đồng rau và nhà kính trắng dưới thung lũng
- moc_bidoup: rừng già Bidoup núi cao có thông hai lá, sương mù, chim nhỏ
```

Ghi chú khi ghép: thêm vào `mocDiem` của tầng `lam-dong` trong `app.js` với toạ độ thật (OpenStreetMap hoặc nhãn phường trong `phuong.json`), mã phường để bấm vào mở đúng phường.
