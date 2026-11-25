# Spark đợt 2 (Gọn Phố Việt): mốc cho 20 tỉnh còn lại trên bản đồ Việt Nam (25/11/2026)

Bản đồ Việt Nam trên trang đã dùng 14 mốc Spark đợt 36 của game. Còn 20 tỉnh chưa có mốc, nên đang hiện tên bằng chữ.
Anh Kha dán nguyên khối dưới đây cho Spark. Vẽ xong, anh lưu vào Drive `Spark/Inbox/Gon_Pho_Viet/dot2_viet_nam/` (đúng tên file), rồi báo "Spark xong đợt 2", em ghép vào bản đồ.
Mỗi mốc chọn cảnh nổi tiếng nhất của tỉnh mới (sau sáp nhập 1/7/2025). Tỉnh gộp nhiều tỉnh cũ thì chọn cảnh người cả nước biết.

```
Nét vẽ y hệt đợt trước (mốc tỉnh đợt 36: moc_ha_noi, moc_hue, moc_da_nang…): hoạt hình ấm, viền nâu đậm,
mỗi mốc là một mô hình nhỏ nhìn chéo từ trên xuống, đặt trên một miếng đất nổi, nền TRONG SUỐT, KHÔNG có chữ, không có người.
Mỗi hình PNG 512×512.

A. Mốc 20 tỉnh:
- moc_cao_bang: thác Bản Giốc nhiều tầng trắng xoá, dòng sông xanh, bè tre
- moc_tuyen_quang: cột cờ Lũng Cú trên đỉnh núi đá, ruộng bậc thang và hoa tam giác mạch hồng
- moc_dien_bien: đồi A1 có xe tăng cũ và lá cờ đỏ sao vàng trên đỉnh
- moc_lai_chau: cầu kính Rồng Mây vắt qua vách núi, mây trắng bên dưới
- moc_son_la: đồi chè hình trái tim Mộc Châu, hoa mận trắng
- moc_thai_nguyen: đồi chè Tân Cương xanh mướt từng luống, nón lá đặt trên giỏ chè
- moc_lang_son: núi Tô Thị và động Tam Thanh, cổng chùa nhỏ trước cửa động
- moc_bac_ninh: đình làng mái cong bên ao, thuyền nhỏ hát quan họ, nón quai thao
- moc_phu_tho: đền Hùng trên núi Nghĩa Lĩnh, bậc đá dẫn lên, cây cổ thụ
- moc_hung_yen: phố Hiến cổ có cầu và chùa, vườn nhãn lồng sai quả
- moc_thanh_hoa: cổng thành nhà Hồ bằng đá xanh, cánh đồng lúa
- moc_nghe_an: ngôi nhà tranh làng Sen, ao sen hồng trước nhà
- moc_ha_tinh: bãi biển Thiên Cầm, núi nhỏ sát biển, thuyền đánh cá
- moc_quang_ngai: đảo Lý Sơn, cánh đồng tỏi, cổng Tò Vò bằng đá bên biển
- moc_dak_lak: thác Dray Nur, nhà dài Ê Đê, cây cà phê có quả đỏ
- moc_dong_nai: rừng Nam Cát Tiên, cây gỗ lớn, dòng sông Đồng Nai
- moc_tay_ninh: núi Bà Đen có cáp treo, Toà Thánh Cao Đài nhiều màu dưới chân núi
- moc_dong_thap: đồng sen hồng, xuồng ba lá, cò trắng bay (Tràm Chim)
- moc_vinh_long: cù lao vườn dừa và vườn trái cây, xuồng chở trái cây trên kênh
- moc_ca_mau: mũi Cà Mau có rừng đước, mốc toạ độ, tàu cá ngoài biển

B. Hình nhỏ rải trên bản đồ cho sinh động (PNG 256×256, nền trong suốt, không chữ):
- deco_nui_da: dãy núi đá vôi xanh nhỏ
- deco_rung_thong: cụm 3 cây thông trên đồi cỏ
- deco_thuyen_buom: thuyền buồm nâu nhỏ trên sóng
- deco_hai_dang: ngọn hải đăng trắng đỏ trên mỏm đá
- deco_ca_heo: chú cá heo nhảy khỏi mặt nước
```

Ghi chú cho em khi ghép:
- File đặt vào `assets/vn/`, thêm mã tỉnh vào `LAYERS['viet-nam'].moc` trong `app.js`.
- Mã tỉnh: Cao Bằng 04, Tuyên Quang 08, Điện Biên 11, Lai Châu 12, Sơn La 14, Thái Nguyên 19, Lạng Sơn 20, Bắc Ninh 24, Phú Thọ 25, Hưng Yên 33, Thanh Hoá 38, Nghệ An 40, Hà Tĩnh 42, Quảng Ngãi 51, Đắk Lắk 66, Đồng Nai 75, Tây Ninh 80, Đồng Tháp 82, Vĩnh Long 86, Cà Mau 96.
- Thu về webp khoảng 150×132 như mốc đợt 36 (mỗi mốc khoảng 9 KB).
