# Phố Dinh III — Triệu Việt Vương (25/11/2026)

Kết quả: `data/pho/trieu-viet-vuong.json`. 8 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 10 nơi cần kiểm thêm.

Cách làm: kho game không có nghiên cứu riêng cho Triệu Việt Vương (chỉ có dòng "Triệu Việt Vương 4 (1 cà phê, 3 bánh)" trong `2026-11-23_osm_tiem_da_lat.md`). Em tải dữ liệu OpenStreetMap quanh đường (api.openstreetmap.org, ô 108.4265,11.9200 – 108.4370,11.9333), tìm Foody theo tên đường (36 kết quả, gồm cả chỗ ở đường khác), rồi tìm nguồn thứ hai trên báo, mia.vn, Mytour, VinWonders, Wanderlog.
Quy ước nguồn: 2 bài cùng một trang chỉ tính 1. Bài viết lại bài khác (Mytour về Up Coffee chép đoạn chỉ đường của mia.vn) không tính là nguồn riêng. Wanderlog dùng dữ liệu Google Maps; em chỉ đọc chữ, không chép toạ độ. Không mở Google Maps. Chưa đi thực tế.

## Phường

| Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Lê Hồng Phong → Dinh III (số 8 / số 3) | P4 | Xuân Hương - Đà Lạt | chắc | [bảng giá đất TVV P4](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/trieu-viet-vuong-phuong-4) (QĐ 02/2020, sửa bởi QĐ 16/2021) |
| Dinh III → An Sơn | P4 | Xuân Hương - Đà Lạt | chắc | cùng trang |
| Đoạn còn lại (sau An Sơn) | P4 | Xuân Hương - Đà Lạt | chắc | cùng trang |

- Danh mục bảng giá đất trên thuviennhadat chỉ có một mục "Triệu Việt Vương - PHƯỜNG 4" (link `...-phuong-3`, `...-phuong-5` tải về là trang chung, không có bảng riêng).
- Đổi theo `data/lam-dong/nq1671.json` mục 99: Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt.
- Kiểm thêm: cả 40 điểm của 2 đoạn đường trên OpenStreetMap đều nằm trong ranh phường Xuân Hương - Đà Lạt (`data/lam-dong/phuong.json`).
- Trang quán ghi lẫn "P. 3" và "P. 4" (cả hai đều thuộc Xuân Hương). Foody ghi Viva Coffee & House số 5 là "P. 9" — nhiều khả năng ghi nhầm.
- Tên trên OpenStreetMap (`duong.json`, trường `ten`): "Triệu Việt Vương" (2 đoạn: way 1153390083 dài ~655 m, way 52740459 dài ~1.414 m — em đo từ toạ độ trong `duong.json`) — khớp.

## Tên phố và câu giới thiệu
**Phố Dinh III** — "Phố Dinh III: con đường mở đầu bằng Dinh Bảo Đại ở số 1, dọc đường là cà phê vườn, quán cà phê của các bạn trẻ người điếc, bánh ướt lòng gà và tiệm bánh ngọt, rồi chạy tiếp về phía hồ Tuyền Lâm."
- Không có con số nào ngoài số nhà. "Về phía hồ Tuyền Lâm": bài mia.vn về Tiệm Táo Đỏ và bình luận Foody về Up Coffee ("con đường từ trung tâm thành phố đi Thiền viện Trúc Lâm").
- Vì sao không gọi "Phố Tiệm Bánh": OpenStreetMap có 3 tiệm bánh (12A, 22, 51), nhưng chỉ Hoàng Phát (51) có thêm nguồn thứ hai (Foody, 0 bình luận). Quán cà phê và chỗ ăn nhiều hơn hẳn. Dinh III là mốc ai cũng biết → đặt tên theo Dinh III.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Dinh III (Dinh Bảo Đại) | di tích | 1 | [VinWonders 19/07/2025](https://vinwonders.com/vi/wonderpedia/news/dinh-3-da-lat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/dinh-3-da-lat-biet-dien-vua-bao-dai-kham-pha-kien-truc-co-dien-phap-tai-da-lat-1385) · [OSM node/5274759821](https://www.openstreetmap.org/node/5274759821) | cao | có dấu hiệu (VinWonders 7/2025 ghi phường mới, 7:00–17:30) |
| 2 | LA MAPPA Café & Bistro | cà phê vườn kiểu Pháp | 8 | [mia.vn](https://mia.vn/cam-nang-du-lich/la-mappa-da-lat-noi-danh-rieng-cho-nhung-ngay-muon-tron-ca-the-gioi-5047) · [Foody](https://www.foody.vn/lam-dong/la-mappa-cafe-bistro) · [Wanderlog](https://wanderlog.com/place/details/530755) | cao | có dấu hiệu (Wanderlog: địa chỉ phường mới, không ghi đóng) |
| 3 | Quán Của Thời Thanh Xuân | cà phê, người phục vụ là người điếc | 9 (mia ghi 9B) | [Báo Lâm Đồng 23/08/2025](https://baolamdong.vn/noi-luu-giu-huong-hoa-cho-doi-388319.html) · [mia.vn](https://mia.vn/cam-nang-du-lich/ca-phe-thoi-thanh-xuan-noi-luu-giu-nhung-hanh-phuc-6289) · [Foody](https://www.foody.vn/lam-dong/quan-cua-thoi-thanh-xuan) · [Wanderlog](https://wanderlog.com/place/details/3377670) | cao | có dấu hiệu (báo 8/2025) |
| 4 | Up Coffee | cà phê vintage nhiều tầng | 6 | [mia.vn](https://mia.vn/cam-nang-du-lich/up-coffee-da-lat-phong-cach-vintage-hut-hon-gioi-tre-da-lat-1449) · [Foody](https://www.foody.vn/lam-dong/up-coffee) | trung bình | không rõ (Foody: >3 tháng không tương tác) |
| 5 | Bánh ướt lòng gà Thảo | bánh ướt lòng gà, sáng–chiều | B6-12A | [mia.vn 18/01/2026](https://mia.vn/cam-nang-du-lich/banh-uot-long-ga-da-lat-19912) · [Wanderlog](https://wanderlog.com/place/details/3846997) | cao | có dấu hiệu (mia 1/2026, Wanderlog phường mới) |
| 6 | Bánh Ngọt Hoàng Phát | tiệm bánh ngọt | 51 | [Foody](https://www.foody.vn/lam-dong/banh-ngot-hoang-phat-trieu-viet-vuong) · [OSM node/14076341201](https://www.openstreetmap.org/node/14076341201) | trung bình | có dấu hiệu (OSM thêm 06/08/2026) |
| 7 | Cá Tầm Đà Lạt Restaurant & Cafe | nhà hàng cá tầm | 80 | [Mytour, cập nhật 1/11/2026](https://mytour.vn/vi/blog/xep-hang/top-5-quan-ca-tam-da-lat-tuoi-ngon-da-dang-mon-an-hap-dan-mytour.html) · [Foody](https://www.foody.vn/lam-dong/nha-hang-ca-tam-da-lat-80-trieu-viet-vuong) | trung bình | có dấu hiệu yếu (bài tổng hợp 11/2026) |
| 8 | Tiệm Táo Đỏ - Cafe & Bistro | cà phê nhỏ, cà phê trứng | lệch: 12B (Foody) / 16 (mia) | [Foody](https://www.foody.vn/lam-dong/tiem-tao-do-cafe-bistro) · [mia.vn 2023](https://mia.vn/cam-nang-du-lich/dung-chan-ben-tiem-tao-do-da-lat-yen-binh-de-thuong-thuc-mon-cafe-trung-ngon-tuyet-1486) | thấp | không rõ |

Ghi chú từng nơi:
- Dinh III: giá vé lệch (mia/VinWonders 30.000 đ; OSM có điểm "Ticket 60k") → không ghi giá.
- Thảo: trang Foody "Thảo - Bánh Ướt Lòng Gà" lại ghi 9 Đồng Tâm (bình luận cũ 2023) → nghi là chỗ cũ, không dùng làm nguồn. B6-12A là lô trong khu quy hoạch 12A, có thể nằm trong hẻm.
- "Tạm nghỉ" hiện trên các trang Foody là chữ mẫu của khung giờ, không phải quán báo nghỉ.
- Tiệm Táo Đỏ: mia tả "vừa qua nhà thờ An Bình", xa khu số nhỏ gần Dinh III → số 12B/16 chưa khớp vị trí; đừng ghim theo số.

## Cần kiểm thêm (1 nguồn hoặc chưa đối chiếu được)

| Tên | Số nhà | Nguồn | Vì sao |
|---|---|---|---|
| 180°C Bakery | 12A | [OSM node/14131062401](https://www.openstreetmap.org/node/14131062401) | chỉ OSM (thêm 28/08/2026) |
| Tiệm Bánh Nhà Mèo | 22 | [OSM node/13904182101](https://www.openstreetmap.org/node/13904182101) | chỉ OSM; Wanderlog có "Tiệm Bánh Nhà Mèo" ở 222/3 Tô Ngọc Vân (Cam Ly) — chưa rõ có phải chi nhánh |
| Cơm Tấm Hằng | 33 | [OSM node/13925656801](https://www.openstreetmap.org/node/13925656801) | chỉ OSM |
| Kan Coffee | 50 | [Foody](https://www.foody.vn/lam-dong/kan-coffee) | chỉ Foody; OSM ghi số 50 là BB Decor |
| Viva Coffee & House | 5 | [Foody](https://www.foody.vn/lam-dong/viva-coffee-house) | chỉ Foody, ghi P. 9; bình luận nói quán đã dời |
| Nhà Hàng Trên Đỉnh Đồi Trăng | 1 | [Foody](https://www.foody.vn/lam-dong/nha-hang-tren-dinh-doi-trang-trieu-viet-vuong) | chỉ Foody; trùng số 1 với Dinh III |
| Quán Abao - Bánh Mì & Bò Né | 91A | [Foody](https://www.foody.vn/lam-dong/quan-abao-banh-mi-bo-ne) | chỉ Foody |
| The Deer - Coffee And Lounge | 30B | [Foody](https://www.foody.vn/lam-dong/the-deer-coffee-and-lounge) | chỉ Foody |
| Dalat Family Hostel | 19A | [OSM](https://www.openstreetmap.org/node/4568750678) · [Hostelworld](https://www.hostelworld.com/st/hostels/p/302311/dalat-family-hostel/) | Hostelworld không hiện địa chỉ khi tải bằng máy |
| Hugo's Family | T21A | [Booking](https://sp.booking.com/hotel/vn/hugo-hostel.html) · [OSM](https://www.openstreetmap.org/node/11491411562) | địa chỉ chỉ thấy trong đoạn trích tìm kiếm; OSM không có số nhà |

Còn nhiều tên khác trên Foody (Tuấn Coffee 12A, Cơm Gà Xối Mỡ Như Ý 4 số 17, Bún Quậy Cù Lao 37E, HOTPOT CENTER 7, Tiệm Cá Trong Hẻm 7A, Cái Tiệm HiHe 14, Nem Nướng Ninh Hoà Khánh Ngọc 26, Phở Hà Nội & Lẩu Bò 73…) — chỉ 1 nguồn, chưa đưa vào.

## Chỗ còn nghi
1. Tên "Phố Dinh III" là em đặt theo mốc nổi bật nhất; đường không có một món đặc trưng dày đặc như Tăng Bạt Hổ hay Hoàng Diệu.
2. Up Coffee, Tiệm Táo Đỏ: không có dấu hiệu còn mở sau 7/2025.
3. Bánh Ngọt Hoàng Phát: hai nguồn đều là danh bạ (Foody không bình luận, OSM do người dùng thêm) — đủ luật 2 nguồn nhưng mỏng.
4. Đường dài khoảng 2,1 km theo OpenStreetMap (em đo từ `duong.json`), kéo về phía nam (homestay, hostel), em chưa tìm kỹ đoạn đó.

## Kiểm thêm 25/11/2026

Tìm thêm nguồn cho các nơi trong "Cần kiểm thêm" (WebSearch + đọc trang bằng curl; không dùng Google Maps). Cách tính: ≥ 2 trang khác nhau; VinWonders/Vinpearl tính 1; bài chép lại tính 1.

**Chuyển sang danh sách chính: 0. Đã đóng hẳn: 0.**

- **Dalat Family Hostel**: [Kayak](https://www.kayak.com/Dalat-Hotels-Dalat-Family-Hostel.719800.ksp) (552 đánh giá) ghi 3/4 Ngô Quyền, Phường 6 — không ở Triệu Việt Vương. Đề nghị loại khỏi phố này (điểm OSM 19A có thể là chỗ cũ).
- Hugo's Family: có trang Trip.com nhưng chưa đọc được số nhà → chưa đủ.
- Các nơi chỉ có Foody/OSM khác chưa kịp tìm lần này.
