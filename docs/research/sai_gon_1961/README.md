# Sài Gòn 1961 — bản đồ "Indochina City Plans 1:10.000, Saigon", ấn bản 2-AMS (2 tờ)

Nguồn ảnh quét: Thư viện Perry-Castañeda, Đại học Texas — https://maps.lib.utexas.edu/maps/world_cities/txu-pclmaps-saigon_sheet1-1961.jpg (tờ 1: Chợ Lớn, Phú Thọ), …sheet2-1961.jpg (tờ 2: trung tâm, Thủ Thiêm, Thị Nghè). Tài liệu chính phủ Mỹ (AMS in lại bản của Nha Địa dư Quốc gia), dùng tự do.
Khác tờ Đà Lạt: không có sẵn toạ độ (không phải GeoPDF), lưới ô ①–⑫ × A–J in ở mép, bảng chỉ dẫn đường phố (tên + ô), bảng công trình đánh số ở chân tờ.

## Đặt toạ độ (27/11/2026)
- Tờ 2: 4 mốc (Dinh Độc Lập, Công trường Diên Hồng = bùng binh Quách Thị Trang, sân Hoa Lư, Công trường Mê Linh; toạ độ OpenStreetMap) → affine thô → nắn theo đường OSM (tools/sg1961/nan_to.py: chiếu đường OSM lên ảnh, bắt khung xương phố sáng gần nhất, khớp đa thức bậc 3, bán kính bắt 25→8 điểm ảnh). Lệch trung vị 5,2 m, ~16.000 điểm khớp.
- Tờ 1: nối với tờ 2 qua lưới ô in ở mép (tâm cột ⑥/⑦ cách ~712 điểm ảnh ≈ 1 km, độ nghiêng khung tờ 1 −7,6‰, tờ 2 −2,3‰) cho góc và tỉ lệ; neo dời bằng ngã ba Lữ Gia × Nguyễn Văn Thoại (nay Lý Thường Kiệt) đọc trên bản đồ; rồi nắn như tờ 2. Lệch trung vị 4,6 m, ~29.000 điểm.
- Bài học: bắt đầu nắn từ điểm sai > 100 m thì máy khớp nhầm sang phố bên cạnh (phố bàn cờ) — luôn neo bằng một ngã ba đọc tên chắc chắn trước.
- Kết quả: to1_toa_do.json, to2_toa_do.json (đa thức bậc 3 hai chiều; dùng tools/sg1961/geo.py `nap()`).
