# Phố Cà Phê Đồi — Hoàng Hoa Thám (25/11/2026)

Kết quả: `data/pho/hoang-hoa-tham.json`. 8 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 8 nơi cần kiểm thêm, 1 nơi đã đóng hẳn (không đưa vào).

Cách làm: kho game không có phố này (chỉ có ghi chú OSM "Hoàng Hoa Thám 5 điểm cà phê" trong `2026-11-23_osm_tiem_da_lat.md`), nên em tìm từ đầu trên các trang du lịch, Foody, trang đặt phòng.
Quy ước nguồn: 2 bài cùng một trang (ví dụ 2 bài mia.vn) chỉ tính 1. Mytour (tiếng Việt) chép gần nguyên văn bài Toplist (cùng số điện thoại, cùng câu chữ) → không tính là nguồn riêng khi đi cùng Toplist. Wanderlog dùng dữ liệu Google Maps (địa chỉ đã đổi phường mới, số đánh giá, trạng thái đóng cửa); benable cũng lấy địa chỉ Google → hai trang này đi cùng nhau không tính là 2 nguồn độc lập.
Vinpearl chặn tải (403) nên em không dùng bài nào của Vinpearl. Không dùng Google Maps. Chưa đi thực tế.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Hoàng Hoa Thám | Từ đầu đường – Chùa Linh Phong | P10 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat hoang-hoa-tham-phuong-10](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/hoang-hoa-tham-phuong-10): bảng giá đất QĐ 02/2020 (sửa bởi QĐ 16/2021) ghi "Hoàng Hoa Thám - PHƯỜNG 10" |
| Hoàng Hoa Thám | Đoạn còn lại | P10 | Xuân Hương - Đà Lạt | chắc | cùng trang trên |

Đổi phường theo `data/lam-dong/nq1671.json` mục 99: Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt.
Kiểm chéo: cả 17 điểm của đường "Hoàng Hoa Thám" trong `duong.json` đều nằm trong ranh giới Xuân Hương - Đà Lạt (`phuong.json`). Bài 2025–2026 (VinWonders 15/07/2025, mia.vn, Trip.com) đều ghi "phường Xuân Hương - Đà Lạt".
Tên trong OSM (`duong.json`, trường `ten`): "Hoàng Hoa Thám" — khớp. OSM còn có 2 đoạn "Hẻm Hoàng Hoa Thám" (không đưa vào `duong`).

## Câu giới thiệu
"Phố Cà Phê Đồi: con đường Hoàng Hoa Thám chạy dọc đồi thông, nhiều quán cà phê và homestay nhìn ra núi, thung lũng — Bình Minh Ơi mở từ 4:30 sáng để khách đón bình minh, giữa đường có chùa Linh Phong trên đồi."
- "4:30": [mia.vn](https://mia.vn/cam-nang-du-lich/tiem-ca-phe-binh-minh-oi-12697), [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/cafe-da-lat), [Trip.com](https://nz.trip.com/restaurant/vietnam/dalat/detail/bnh-minh-i-c-ph-tim-c-ph-bnh-minh-i-lt-145047907/).
- "nhiều quán": em không có số đếm có nguồn nên không ghi số. Vietnambooking gọi đây là "con đường có view đẹp và 'gắt' nhất nhì Đà Lạt… có rất nhiều địa điểm du lịch". Foody ra 26 kết quả khi tìm "hoàng hoa thám" nhưng lẫn nơi ở đường khác → không dùng.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Tiệm Cà Phê Bình Minh Ơi | cà phê đón bình minh, nhìn núi | 89 | [mia.vn](https://mia.vn/cam-nang-du-lich/tiem-ca-phe-binh-minh-oi-12697) · [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/cafe-da-lat) · [VinWonders 15/07/2025](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) · [Trip.com](https://nz.trip.com/restaurant/vietnam/dalat/detail/bnh-minh-i-c-ph-tim-c-ph-bnh-minh-i-lt-145047907/) · [Wanderlog](https://wanderlog.com/list/geoCategory/16965) | cao | có dấu hiệu (VinWonders 7/2025, mia 6/2026 ghi phường mới) |
| 2 | Đà Lạt Mountain View | cà phê nhà gỗ nhìn đồi thông | 25 (số cũ 03) | [Toplist](https://toplist.vn/top-list/quan-ca-phe-hot-nhat-tai-da-lat-33327.htm) · [Vietnambooking](https://www.vietnambooking.com/du-lich/blog-du-lich/mountain-view-da-lat.html) · [mia.vn](https://mia.vn/cam-nang-du-lich/den-da-lat-mountain-view-coffee-trai-nghiem-khong-gian-bac-au-ben-nui-doi-mong-mo-1513) · [Wanderlog](https://wanderlog.com/list/geoCategory/16965) | cao | có dấu hiệu (mia bài săn mây cập nhật 15/07/2026 ghi phường mới) |
| 3 | Émai Italian Restaurant & Gardens | nhà hàng Ý có vườn | 88 | [Trip.com](https://sa.trip.com/travel-guide/dalat-1393-restaurant/Emai%20Dalat-45818151) · [Wanderlog](https://wanderlog.com/list/geoCategory/65160) | cao | có dấu hiệu (Wanderlog cập nhật 11/07/2026, 1.104 đánh giá Google, không ghi đóng) |
| 4 | The Hillside | cà phê nhìn rừng thông | 26 | [Toplist](https://toplist.vn/top-list/quan-ca-phe-hot-nhat-tai-da-lat-33327.htm) · [Wanderlog](https://wanderlog.com/place/details/7195904/the-hillside-cafe-%C4%91%C3%A0-l%E1%BA%A1t) | trung bình | có dấu hiệu (Google ghi phường mới) — nghi đổi tên, xem dưới |
| 5 | Chùa Linh Phong | chùa sư nữ trên đồi | 72C | [Mytour](https://mytour.vn/vi/blog/bai-viet/top-10-ngoi-chua-noi-tieng-o-da-lat-ma-nhieu-du-khach-thuong-lui-toi.html) · [mia.vn](https://mia.vn/cam-nang-du-lich/diem-danh-8-ngoi-chua-da-lat-co-view-dep-nhu-tien-canh-1530) · [Wanderlog](https://wanderlog.com/place/details/4427074/linh-phong-pagoda) · [bảng giá đất](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/hoang-hoa-tham-phuong-10) (mốc chia đoạn) | cao | có dấu hiệu (chùa lâu năm; mia 7/2026 vẫn giới thiệu) |
| 6 | Tổ Chim Homestay Coffee | homestay + cà phê trên đồi | 1B | [mia.vn 07/11/2025](https://mia.vn/cam-nang-du-lich/review-to-chim-homestay-coffee-da-lat-19571) · [Toplist](https://toplist.vn/top-list/homestay-dep-nhat-tai-da-lat-5436.htm) · [Foody](https://www.foody.vn/lam-dong/to-chim-homestay) | cao | có dấu hiệu (mia 11/2025 ghi phường mới) |
| 7 | LengKeng Dalat Homestay | homestay nhìn thung lũng | 57/4 | [Trip.com](https://nz.trip.com/hotels/dalat-hotel-detail-114978406/lengkeng-dalat-homestay) · [mia.vn](https://mia.vn/cam-nang-du-lich/homestay-da-lat-view-cuc-chill-14668) | trung bình | có dấu hiệu (Trip.com phường mới, nhận đặt phòng) |
| 8 | Cà Phê - Kem Việt Hưng | quán kem + cà phê nhìn đồi chè | 2A/1 | [VinWonders 22/07/2025](https://vinwonders.com/vi/wonderpedia/news/15-quan-kem-da-lat-duoc-review-nhieu-nhat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/top-10-quan-kem-ngon-tai-da-lat-danh-cho-hoi-sanh-an-1300) · [Mytour](https://mytour.vn/vi/blog/bai-viet/top-10-quan-kem-ngon-va-chat-luong-tai-da-lat.html) · [Foody (tìm kiếm)](https://www.foody.vn/lam-dong/tim-kiem/ho%C3%A0ng-hoa-th%C3%A1m) | cao | dấu hiệu yếu (VinWonders 7/2025 còn giới thiệu, chưa ghi phường mới) |

## Cần kiểm thêm (chưa đủ 2 nguồn độc lập)

| Tên | Số nhà | Nguồn có | Vì sao |
|---|---|---|---|
| Chồn Coffee | 135E | [Foody](https://www.foody.vn/lam-dong/chon-coffee) | 1 nguồn mở được; bài Vinpearl ("Weasel Coffee Farm", cùng 135E) bị chặn tải |
| WEECAFE | 86 | [Wanderlog](https://wanderlog.com/place/details/3635120/weecafe) · [benable](https://benable.com/minutemuncher/expert-s-guide-to-the-best-cafe-s-in-da-l-t) | cả hai lấy địa chỉ Google; trùng số 86 với "Búp rau"; Foody tả "Wee Cafe" ở dốc Nguyễn Thị Định |
| Búp rau | 86 | [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/cafe-da-lat) | 1 nguồn; trùng số nhà |
| Sân Mây Homestay | 56 | [mia.vn](https://mia.vn/cam-nang-du-lich/homestay-da-lat-view-cuc-chill-14668) | 1 nguồn |
| Đà Lạt Nhớ Homestay | 45 | [mia.vn](https://mia.vn/cam-nang-du-lich/homestay-da-lat-view-cuc-chill-14668) | 1 nguồn |
| Dreams on Dalat | 3 | [Toplist](https://toplist.vn/top-list/homestay-co-view-thung-lung-dep-nhat-o-da-lat-30737.htm) | 1 nguồn |
| Bánh Căn Cô Thương | 2A | [Wanderlog](https://wanderlog.com/list/geoCategory/1807019) | 1 nguồn |
| Bánh mỳ que Đà Nẵng | 71 | [Wanderlog](https://wanderlog.com/list/geoCategory/1807019) | 1 nguồn |

## Đã đóng hẳn (không đưa vào)
| Tên | Số nhà | Nguồn |
|---|---|---|
| Muối Coffee & Stay (A Place Like No Other) | 182 | [Wanderlog](https://wanderlog.com/place/details/3377663) ghi "Permanently Closed" (xem 25/11/2026); Toplist/Mytour vẫn còn bài cũ |

## Chỗ còn nghi
- **The Hillside / Vườn Cà Phê Mộc Lan** (26): Toplist gọi The Hillside, Mytour gọi "Vườn Cà Phê Mộc Lan" — cùng số 26, cùng số điện thoại 0933 118 900 & 0938 038 033. Có thể đã đổi tên; Google (qua Wanderlog) vẫn ghi "The Hillside cafe Đà Lạt".
- **Số 86**: Búp rau (Vietnam Airlines) và WEECAFE (Google) cùng số → chưa rõ nơi nào đang ở đó.
- **LengKeng**: 57/4 (Trip.com, mia 2026), "Số 57" (mia 2023), 57/6 (vài trang đặt phòng).
- **Đặc trưng "nhiều quán cà phê"**: có nhiều bài nhắc từng quán, nhưng không có nguồn đếm số quán trên đường → câu giới thiệu không ghi số.
- Kem Việt Hưng: bài mia gốc từ 2021 — trạng thái hiện tại chỉ dựa vào VinWonders 7/2025 và Foody.

## Kiểm thêm 25/11/2026

Tìm thêm nguồn cho các nơi trong "Cần kiểm thêm" (WebSearch + đọc trang bằng curl; không dùng Google Maps). Cách tính: ≥ 2 trang khác nhau; VinWonders/Vinpearl tính 1; bài chép lại tính 1.

**Chuyển sang danh sách chính: 1 nơi. Đã đóng hẳn: 0.**

| Tên | Số nhà | Nguồn | Độ tin cậy | Còn mở? |
|---|---|---|---|---|
| Chồn Coffee (Trại Hầm – trang trại cà phê chồn) | 135E | [Foody](https://www.foody.vn/lam-dong/chon-coffee) · [VinWonders EN 13/06/2024](https://vinwonders.com/en/wonderpedia/news/dalat-coffee-where-to-go/) · [Tiền Phong (cũ)](https://tienphong.vn/xa-hoi/659282/Ca-phe-chon---Huyen-thoai-va-hien-thuc-tpp.html) | trung bình | không rõ (mới nhất 6/2024) |

Ghi chú: dòng Tiền Phong ("điểm cà phê chồn đầu tiên ở Lâm Đồng khai thác du lịch", 135E P.10) em lấy từ đoạn trích kết quả tìm kiếm; tải trang bằng máy không thấy chữ "135E". Không có nó vẫn đủ 2 trang (Foody + VinWonders).

Vẫn chưa đủ: Sân Mây Homestay, Đà Lạt Nhớ Homestay (chỉ mia.vn), Bánh Căn Cô Thương (không ra trang nào). Phụ: VinWonders bài ăn tối (17/07/2025) ghi Tiệm ăn Bếp Đà Lạt có địa chỉ 89 Hoàng Hoa Thám — trùng số với Bình Minh Ơi, em chưa kiểm.
