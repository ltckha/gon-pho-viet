# Khối gửi Antigravity: cách hiện đường và biểu tượng theo mức phóng (27/11/2026)

```
Chào Antigravity. Mình đang làm "Gọn Phố Việt" — bản đồ Đà Lạt năm 1963 cho điện thoại, vẽ lại từ bản đồ AMS L909 (1:12.500).
Kho: github.com/ltckha/gon-pho-viet, nhánh claude/ban-do-xua. Bản xem thử: https://claude.ai/artifact/8mchNfeiEc7GkDAycDhkns
Trang tĩnh SVG tự viết, không thư viện bản đồ (không Google Maps, không Mapbox). Mã: app.js (hàm draw1963, layout), style.css (các lớp .y63, data-zm).

Nhờ bạn góp ý CÁCH THỂ HIỆN cho giống cảm giác Google Maps khi phóng to / thu nhỏ — gọn, không rối:

1. Đường: hiện nay có 4 cấp (1 đại lộ, 2 phố, 3 hẻm, 4 đường đất/rừng) + đường mòn + đường đất nay đã mất.
   Đang chia 3 mức phóng (data-zm 0/1/2). Cấp nào nên hiện từ mức nào, bề rộng mỗi cấp ở mỗi mức (điểm ảnh),
   viền đường dày bao nhiêu, đường đất/đường mòn nên vẽ ra sao? Tên đường nên hiện từ mức nào, lặp lại cách nhau bao xa?
2. Biểu tượng địa điểm: 43 nơi (hình Spark 3D nhỏ 44×39 điểm, kèm tên). Chia hạng: 1 = mốc nổi tiếng, 2 = có hình, 3 = chấm theo loại.
   Mỗi mức phóng nên hiện tối đa bao nhiêu hình trên màn hình điện thoại 390×700? Ưu tiên ra sao? Khi chữ đè nhau thì bỏ chữ hay bỏ cả hình?
   Tên nên đặt dưới, phải hay trái hình? Hình có nên giữ cỡ cố định khi phóng?
3. Nhãn chung chung ("Trường Học", "Miếu", "Nhà Thờ" — công trình không tên riêng) nên hiện từ mức nào hay bỏ hẳn?
4. Lớp nền: rừng thưa/rậm, vườn (chấm), đầm lầy, vòng cao độ 5 m, khu nhà, khuôn viên (viền đỏ đứt). Mức xa nên tắt lớp nào cho đỡ rối?
5. Hiệu ứng: hình/chữ hiện ra có nên mờ dần (bao nhiêu ms)? Giữ hình đã hiện khi phóng to để khỏi nhấp nháy?

Bên mình đã đọc (số thật từ mã nguồn): OSM Carto line-widths.yaml / roads.mss / amenity-points.mss, OSM Bright style.json,
OpenMapTiles poi (chia ô 100×100 điểm, mỗi ô một hạng), Mapbox style spec (symbol-sort-key, padding 2, text-optional, variable anchor).
Google không công bố cách chọn của Google Maps — nếu bạn biết cách Google Maps làm (mật độ POI, thứ tự ưu tiên, thời điểm hiện tên đường),
xin ghi rõ phần nào có tài liệu, phần nào là kinh nghiệm.

Trả lời giúp: bảng "mức phóng → hiện gì, rộng bao nhiêu" + quy tắc biểu tượng (số, ưu tiên, chống đè) + 5 việc nên sửa ngay trong app.js/style.css (chỉ ra hàm/dòng).
```
