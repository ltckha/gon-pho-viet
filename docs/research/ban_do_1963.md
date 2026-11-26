# Bản đồ Đà Lạt 1963 (chặng 1 lộ trình bản đồ xưa)

Anh Kha chốt 26/11: vẽ lại kiểu "cách 2" (phẳng, gọn), mọi nét chỉ lấy từ bản đồ cũ, không ghép gì của hiện tại; trang riêng `#da-lat-1963`, nút "Xem Đà Lạt 1963" trên tầng đường Đà Lạt.

- Nguồn: AMS L909 Đà Lạt 1:12.500, ấn bản 1963 — NARA NAID 74797741 (Unrestricted, bản quét 12.006×8.544), GeoPDF USGS `L909XDALAT_geo.pdf` (có toạ độ, hệ Indian 1960 → `tools/ban_do_1963.py` đổi sang WGS84, lệch < 1 m).
- Tên đường: `docs/research/ams_1963_bang_duong.tsv` (103 tên in ở lề, dò từng số) → `tools/build_1963.py` → `data/lam-dong/da-lat/ten_1963.json`.
- Tên ấp, khu, hồ, rừng: `docs/research/ams_1963_dia_danh.tsv` (chép tay, đúng chữ in).
- Dựng: `python3 -I tools/dung_1963.py <L909XDALAT_geo.pdf> [thư mục ảnh soát]` → `data/lam-dong/da-lat/1963.json` (cần scikit-image).
  - Đường (so 6 cách 26/11, xem Artifact "So sánh cách vẽ 1963"):
    - Còn tới nay — cách E "đo mặt cắt": dọc mỗi đường OpenStreetMap, ở mỗi điểm cắt ngang tìm hai nét in song song (liền hoặc đứt, ≥2/5 vị trí mỗi bên), giữa sáng, tâm lệch ≤ 15 m; cả con đường là một đơn vị (theo Uhl và cs. 2022), nối khoảng thiếu ≤ 200 m. Cấp 1 = lòng tô đỏ; còn lại theo bề rộng in.
    - Đường đất đã mất — "cặp gạch": cặp gạch xám song song cách 4–11 điểm ảnh, nối thành chuỗi (`duong_mat`, `dat: 1`). Chắc nhưng mới bắt một phần.
    - Bỏ: dò thuần khung xương ảnh (vụn), lấp nét rồi dò khe (vụn), đòi hai mép liền (sót đường đất).
  - Khu dân cư: gom nhà cách ≤ ~16 m thành mảng (`khu`); nhà riêng chỉ hiện khi phóng gần. Nét đường đổi theo mức phóng (`data-zm`).
  - Hồ, rừng: tách màu in. Nhà: khối đen đặc, nén số nguyên.
- Còn thiếu (đã báo anh): đường còn đứt ở vài ngã ba và khu chợ đã xây lại; đường đất nét đứt bắt được một phần; công trình đánh số (bảng lề trái) chưa chép.
