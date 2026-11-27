# Spark đợt 51 (đánh số chung với game — nếu game đã dùng số 51 thì anh đổi sang số kế tiếp): mốc bản đồ Đà Lạt 1963, vẽ lại cho đồng nét (27/11/2026) — CHƯA GHÉP

Anh Kha 27/11: "1 số biểu tượng chưa phù hợp". 4 hình cũ (chợ, nhà thờ lớn, rạp Hòa Bình, ga) vẽ theo nét game, không có miếng đất nổi như các mốc khác; sân vận động bên hồ đang dùng hình Quảng trường Lâm Viên hôm nay (năm 1963 chưa có) → đã gỡ; Lãnh Địa Đức Bà trùng hình nhà thờ Domaine de Marie → đã gỡ. Anh báo "xong 51" là em ghép vào `HINH` (số 6, 44, 53, 105, 76, 72) trong `tools/build_1963_dia_diem.py`; hình cũ vẫn giữ cho tầng hôm nay.

```
Vẽ tiếp đợt 51 cho "Gọn Phố Việt" (bản đồ cùng nhà với game "Gọn Tiệm, Sạch Phố").

Mốc nhỏ — nét vẽ y hệt mốc đợt 50 (moc_dinh_tinh_truong, moc_nha_dia_du…): mỗi mốc là một mô hình nhỏ nhìn chéo từ trên xuống, đặt trên một miếng đất nổi có vài cây thông, PNG vuông 512×512, nền TRONG SUỐT, không chữ, không người. Cảnh Đà Lạt khoảng năm 1963.
1. moc_cho_da_lat_1963: khu chợ mới xây hai tầng mái bằng kiểu hiện đại thập niên 1960, mặt tiền nhiều ô cửa, cầu thang lớn phía trước dẫn lên đồi, vài xe đạp, xe lam
2. moc_nha_tho_lon_1963: nhà thờ lớn tường hồng, tháp chuông cao trên đỉnh có con gà chỉ hướng gió, cửa sổ kính màu
3. moc_rap_hoa_binh_1963: rạp chiếu bóng kiểu thập niên 1960, mặt tiền phẳng có tháp đồng hồ vuông ở giữa (không chữ), quảng trường nhỏ phía trước
4. moc_ga_da_lat_1963: nhà ga kiểu Pháp với ba mái nhọn hình chóp liền nhau, kính màu ở đầu hồi, đoàn tàu hơi nước nhỏ đậu bên sân ga
5. moc_san_van_dong_1963: sân vận động nhỏ có sân cỏ, đường chạy đất đỏ quanh sân, khán đài gỗ thấp một bên, bên bờ hồ
6. moc_lanh_dia_duc_ba_1963: dãy nhà tu viện nữ hai tầng tường hồng nhạt kiểu Pháp, vườn rau và vườn hoa phía trước, hàng thông quanh

Lưu lên Google Drive vào Spark/Inbox/Game_ve_thu/dot51_moc_1963_bo_sung/, đúng tên file trên (.png).
```

Ghép: 6 → cho_da_lat_1963 · 44 → nha_tho_lon_1963 · 53 → rap_hoa_binh_1963 · 105 → ga_da_lat_1963 · 76 → san_van_dong_1963 · 72 → lanh_dia_duc_ba_1963
