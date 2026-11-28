# Trả lời phiên "Thử nghiệm 2026T46" — bản đồ Đà Lạt 1963 cho bao lì xì Tết 2027 (28/11/2026)

1) **Đã có.** Kho `ltckha/gon-pho-viet`, nhánh `claude/ban-do-xua`:
   - `data/lam-dong/da-lat/1963.json` (1,27 MB) — toàn bộ nét vẽ lại; `data/lam-dong/da-lat/1963_dia_diem.json` (công trình, chuyện qua các năm).
   - Dựng bằng `tools/dung_1963.py`, `tools/dia_hinh_1963.py`; trang hiển thị: tầng `da-lat-1963` trong `app.js`.
   - Bản xem thử: https://claude.ai/artifact/8mchNfeiEc7GkDAycDhkns
2) **Vector**, không phải ảnh: JSON tự định dạng (không phải GeoJSON chuẩn), toạ độ kinh/vĩ độ WGS84, 5 số lẻ. Các lớp: `duong`, `duong_mat` (đường đất nay mất), `duong_mon`, `nuoc` (hồ), `rung`, `rung_ram`, `vuon`, `dam`, `khu`, `nha`/`nha_hcn` (khối nhà), `nha_go`, `khuon_vien`, `dong_muc` (vòng cao độ 5 m), `do_cao`, `ten_duong`, `dia_danh`, `cong_trinh`, `diem`. Trang vẽ ra SVG trong trình duyệt; chưa có sẵn file SVG/PDF in. Muốn in thì cần xuất SVG từ JSON (vài chục dòng Python) — chưa làm.
3) **Phạm vi** `khung` = kinh độ 108,406–108,483, vĩ độ 11,921–11,978 (~8,4 × 6,3 km): cả trung tâm Đà Lạt. **Có** khu Chợ Đà Lạt, Hồ Xuân Hương, phố Tăng Bạt Hổ (tên 1963 "Phố Tăng Bạt Hổ"), Duy Tân…
4) **Có** lớp tên đường 1963: `ten_duong` 121 đoạn (103 tên đọc từ bảng chỉ dẫn in trên bản đồ), kèm `data/lam-dong/da-lat/ten_1963.json`, bảng gốc `docs/research/ams_1963_bang_duong.tsv`.
5) **Nguồn:** AMS loạt L909 "Đà Lạt" 1:12.500, ấn bản 1-AMS 1963 (Army Map Service, tài liệu chính phủ Mỹ — phạm vi công cộng), NARA https://catalog.archives.gov/id/74797741 , ảnh Wikimedia Commons "AMS - Da Lat, Vietnam - NARA - 74797741.jpg". Phạm vi công cộng không bắt ghi nguồn, nhưng nên ghi "Theo bản đồ AMS L909, 1963".
   **Lưu ý:** một phần nét đường được dò/đặt theo mốc OpenStreetMap (trang có ghi © OpenStreetMap ở tầng 1963). In thương mại thì nên ghi thêm "© OpenStreetMap contributors (ODbL)", hoặc chỉ dùng các lớp dò thuần từ AMS — cần soát lại trước khi in.
