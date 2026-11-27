# Bản đồ Đà Lạt 1963 (chặng 1 lộ trình bản đồ xưa)

Anh Kha chốt 26/11: vẽ lại kiểu "cách 2" (phẳng, gọn), mọi nét chỉ lấy từ bản đồ cũ, không ghép gì của hiện tại; trang riêng `#da-lat-1963`, nút "Xem Đà Lạt 1963" trên tầng đường Đà Lạt.

- Nguồn: AMS L909 Đà Lạt 1:12.500, ấn bản 1963 — NARA NAID 74797741 (Unrestricted, bản quét 12.006×8.544), GeoPDF USGS `L909XDALAT_geo.pdf` (có toạ độ, hệ Indian 1960 → `tools/ban_do_1963.py` đổi sang WGS84 bằng 3 tham số ING-A 198/881/317. Phép tính khép kín sai < 1 m, nhưng SAI SỐ DATUM thật chưa kiểm thực địa: EPSG:1542 ghi ±25 m mỗi trục, tính cho 14–18°B (Antigravity 27/11). Đo trên dữ liệu: tâm đường dò từ bản 1963 so với OpenStreetMap lệch đều ~1 m (Đông −0,7, Bắc +0,7), trung vị 2 m — nhưng phép đo thiên vì máy tìm đường quanh OSM ±15 m, nên chỉ cho biết không có lệch lớn kiểu 20 m).
- Tên đường: `docs/research/ams_1963_bang_duong.tsv` (103 tên in ở lề, dò từng số) → `tools/build_1963.py` → `data/lam-dong/da-lat/ten_1963.json`.
- Tên ấp, khu, hồ, rừng: `docs/research/ams_1963_dia_danh.tsv` (chép tay, đúng chữ in).
- Dựng: `python3 -I tools/dung_1963.py <L909XDALAT_geo.pdf> [thư mục ảnh soát]` → `data/lam-dong/da-lat/1963.json` (cần scikit-image).
  - Đường (so 6 cách 26/11, xem Artifact "So sánh cách vẽ 1963"):
    - Còn tới nay — cách E "đo mặt cắt": dọc mỗi đường OpenStreetMap, ở mỗi điểm cắt ngang tìm hai nét in song song (liền hoặc đứt, ≥2/5 vị trí mỗi bên), giữa sáng, tâm lệch ≤ 15 m; cả con đường là một đơn vị (theo Uhl và cs. 2022), nối khoảng thiếu ≤ 200 m. Cấp 1 = lòng tô đỏ; còn lại theo bề rộng in.
    - Đường đất đã mất — "dò theo vết": hạt = cặp gạch xám song song (cách 4–11 điểm ảnh); từ hạt bước 5 điểm dọc hướng, rẽ ≤ 14°/bước, hai bên còn gạch, dừng khi chạm đường đã có (`duong_mat`, `dat: 1`). 290 vết, soát mẫu phần lớn đúng; còn vài vết nhầm ở khu chia lô nét đứt. (Cách "nối cặp gạch thành chuỗi" chỉ được 24 đoạn — bỏ.)
    - Bỏ: dò thuần khung xương ảnh (vụn), lấp nét rồi dò khe (vụn), đòi hai mép liền (sót đường đất).
  - Khu dân cư: gom nhà cách ≤ ~16 m thành mảng (`khu`); nhà riêng chỉ hiện khi phóng gần. Nét đường đổi theo mức phóng (`data-zm`).
  - Hồ, rừng: tách màu in. Nhà: khối đen đặc, nén số nguyên.
- Công trình: `docs/research/ams_1963_cong_trinh.tsv` — 109 công trình đánh số in ở lề trái (tên Anh + tên Việt in trên bản đồ, ô lưới 100 m); số 52 Sân Cù bảng in trùng ô với số 76 nên neo theo vị trí số 52 trên bản đồ. Tìm kiếm trên trang tìm cả tên đường (1963 hoặc nay) và công trình; khớp từ đầu chữ, gõ có dấu thì so có dấu.
- Đường đất đã mất: lọc vết ranh lô (≥ 2 vết song song sát bên) — soát mẫu khu sân cù, Lâm Sơn: phần lớn vết bám đúng nét đôi.
- Còn thiếu (đã báo anh): đường còn đứt ở vài ngã ba và khu chợ đã xây lại; đường đất nét đứt bắt được một phần; đường quanh khu chợ cũ còn đứt (khu này nay xây khác, máy dò theo đường nay nên hụt).

## Sửa theo góp ý Antigravity (27/11/2026)
- Mép đường chỉ tính mực đen (trước gộp cả đỏ); đo màu đỏ trên mọi điểm trước khi rút gọn. Kiểm lại: trên tờ Đà Lạt các đại lộ KHÔNG tô đỏ đặc (lòng trắng), nên cấp đường chủ yếu theo bề rộng nét in.
- Làm mượt 2D tâm đường: đoạn gập ngược > 120° từ 142 xuống 5.
- Đánh dấu "đã có đường" bằng cả nét (không chỉ quanh đỉnh).
- Tên 1963 phủ cả con đường (theo số gần nhất cùng tên nay); 6 tên trống được gỡ vì trùng y tên đường nay cách ô lưới < 100 m (Hoàng Diệu, Lê Đại Hành, Lê Quý Đôn, Lý Thường Kiệt, Nguyễn Biểu — Thanh Niên 22/11/2026 xác nhận đổi tên 1953, Tăng Bạt Hổ). 8 đường có tên chắc mà máy không dò ra nét → vẽ theo hình đường nay, `theo_nay: 1`.
- Trả lại "© OpenStreetMap" trên tầng 1963 (đường dò theo mốc OSM — ODbL).
- Chưa làm theo được: 3 trang Địa chí trên lamdong.gov.vn Antigravity dẫn (hoang-van-thu, hoang-dieu, ba-huyen-thanh-quan) đều báo 404 ngày 27/11 → chưa dùng; chuyện "Hùng Vương 1963 = Hoàng Văn Thụ nay" chưa có nguồn mở được, giữ nguyên (số 5 trên bản đồ nằm đúng trên khúc Trần Phú nay, cạnh đầu Hoàng Văn Thụ).
- Đường mòn một nét: thêm `duong_mon` (chuỗi gạch đơn thẳng hàng; ít nhầm, chưa bắt hết).
