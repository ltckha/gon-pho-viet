# Phố Cà Phê — Nguyễn Chí Thanh và Lê Đại Hành (Xuân Hương - Đà Lạt)

Ngày nghiên cứu: 25/11/2026. File dữ liệu: `data/pho/pho-ca-phe.json`.

**Kết luận:** 6 nơi đạt ≥ 2 nguồn ở 2 trang khác nhau (2 nơi "cao", 3 nơi "trung bình", 1 nơi "thấp" vì nghi đã đóng). 4 nơi để mục "cần kiểm thêm" (2 nơi chỉ có 1 nguồn, 2 nơi Google ghi đã đóng). Hai đường này ít quán có tên tuổi; các quán nổi tiếng nhất của khu (Cafe Tùng, cà phê Lan) nằm ở Khu Hòa Bình / Nguyễn Thị Minh Khai, không nằm trên 2 đường này.

Điểm xuất phát: `content/streets/street_pho_ca_phe.json` trong kho game (chỉ đọc). **Không dùng tên trong `places[].name`** vì đó là tên đặt lại cho game; tên dưới đây lấy từ các bài trong `sources`.

## Phường

| Mục | Kết quả | Nguồn | Độ chắc |
|---|---|---|---|
| Phường cũ | Phường 1 (cả 2 đường) | mia.vn, toplist, foody, vietnamairlines đều ghi "Phường 1" cho số nhà trên 2 đường | |
| Phường mới | **Xuân Hương - Đà Lạt** | `data/lam-dong/nq1671.json` mục 99 (gộp Phường 1, 2, 3, 4, 10); phela.vn, vinwonders, wanderlog ghi "Xuân Hương - Đà Lạt" | **chắc** (đã kiểm ở phiên trước) |
| Tên OSM | `Nguyễn Chí Thanh`, `Lê Đại Hành`, `Khu Hòa Bình` — có đúng như vậy trong `data/lam-dong/da-lat/duong.json` | | khớp |

## Câu giới thiệu

> Phố Cà Phê: con dốc Nguyễn Chí Thanh lên Khu Hòa Bình, có Café Nga mở từ 5 giờ sáng đã hơn 20 năm, bên cạnh tiệm trà chuỗi mới Phê La.

- "con dốc", "Coffee Street" dọc Nguyễn Chí Thanh: [Airbnb, gợi ý của người địa phương 9/2018](https://www.airbnb.com/things-to-do/places/2994762)
- Café Nga mở 5h–22h30, "ngót nghét hơn 20 năm": [mia.vn 06/06/2025](https://mia.vn/cam-nang-du-lich/4-quan-cafe-xua-cu-o-da-lat-cho-ngay-song-cham-giua-long-pho-thi-7861)
- Phê La số 7 Nguyễn Chí Thanh: [phela.vn](https://phela.vn/)

## Địa điểm chính (≥ 2 nguồn, 2 trang khác nhau)

| # | Tên thật | Đường | Số nhà | Loại | Đặc trưng | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|---|---|
| 1 | Café Nga | Nguyễn Chí Thanh | 2A | cà phê truyền thống | Hơn 20 năm, mở 5h sáng, khách quen người địa phương lớn tuổi; 20–40 nghìn | [mia.vn 06/06/2025](https://mia.vn/cam-nang-du-lich/4-quan-cafe-xua-cu-o-da-lat-cho-ngay-song-cham-giua-long-pho-thi-7861); [vietnamairlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/cafe-da-lat); (thêm [mia.vn cà phê sáng 2023](https://mia.vn/cam-nang-du-lich/tim-hieu-ve-van-hoa-ca-phe-sang-o-da-lat-binh-di-giua-doi-thuong-10354), cùng trang nên không tính) | cao | có dấu hiệu 2025 (mia 6/2025 ghi giờ mở); chưa thấy nguồn 2026 |
| 2 | Phê La Đà Lạt | Nguyễn Chí Thanh | 7 | tiệm trà ô long (chuỗi) | Chuỗi trà ô long, không gian nhiều hoa | [phela.vn](https://phela.vn/); [vinwonders](https://vinwonders.com/vi/wonderpedia/news/review-20-quan-tra-sua-da-lat-ngon-quen-sau/); [wanderlog (dữ liệu Google)](https://wanderlog.com/place/details/5146217/ph%C3%AA-la-%C4%91%C3%A0-l%E1%BA%A1t) | cao | có dấu hiệu 2025–2026: phela.vn ghi tên phường mới |
| 3 | Retro 1992 | Nguyễn Chí Thanh | 23 | cà phê hoài cổ | Đồ gỗ cũ, đèn vàng, bậc thang nhiều màu lên dốc | [toplist](https://toplist.vn/top-list/quan-ca-phe-co-kinh-don-tim-du-khach-o-da-lat-31672.htm); [Znews 4/11/2019](https://znews.vn/nhung-tiem-ca-phe-phong-cach-retro-o-da-lat-post1008585.html) (không số nhà); [mytour EN](https://mytour.vn/en/blog/bai-viet/top-11-charming-vintage-cafes-that-capture-the-hearts-of-visitors-in-da-lat-lam-dong-mytour.html) (có vẻ dịch từ toplist) | trung bình | không rõ |
| 4 | Artista - Cafe Nghệ Sỹ | Nguyễn Chí Thanh | 9 | cà phê kiểu Âu | Trang trí kiểu châu Âu, lò sưởi củi, nhìn phố | [foody](https://www.foody.vn/lam-dong/cafe-nghe-sy); [Airbnb](https://www.airbnb.com/things-to-do/places/2994762) (chỉ ghi "đường Nguyễn Chí Thanh") | trung bình | không rõ (foody mới nhất 12/2020) |
| 5 | Tiệm bánh Cối Xay Gió - Nguyễn Chí Thanh | Nguyễn Chí Thanh | 11A (foody: 11) | tiệm bánh, cà phê | "Tường vàng đồ si" hơn 1.300 áo vàng; mỗi lượt check-in góp 1.000đ cho học sinh | [mia.vn](https://mia.vn/cam-nang-du-lich/co-gi-dac-biet-o-tiem-banh-coi-xay-gio-noi-tieng-nhat-xu-so-suong-mu-da-lat-1369); [foody khu Hòa Bình](https://www.foody.vn/lam-dong/khu-vuc-hoa-binh) | trung bình | không rõ (foody mới nhất 3/2021) |
| 6 | Windmills – Nhà 9 Cánh | Lê Đại Hành | 1 | cà phê sân thượng | Sân thượng khách sạn cũ, nhìn hồ và chợ; cappuccino, bánh Pháp | [vinwonders](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/); [mytour](https://mytour.vn/vi/blog/bai-viet/dl-kham-pha-da-lat-ghe-tham-windmills.html) ("bên phải đường lên Hòa Bình") | thấp | **nghi đã đóng** — xem ghi chú 2 |

## Cần kiểm thêm

| Tên | Đường | Số nhà | Nguồn | Lý do |
|---|---|---|---|---|
| Phượng Tím Cafe | Nguyễn Chí Thanh | 11 | [foody](https://www.foody.vn/lam-dong/phuong-tim-cafe) | 1 nguồn; trùng số 11 với Cối Xay Gió; foody mới nhất 12/2020 |
| Little Paris Coffee Dalat | Lê Đại Hành | 1 | [vinwonders](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) | 1 nguồn; trùng số 1 với Windmills |
| Veronica Cafe - Lê Đại Hành | Lê Đại Hành | 2 | [foody](https://www.foody.vn/lam-dong/veronica-cafe-le-dai-hanh); [wanderlog](https://wanderlog.com/place/details/1781633/veronica-cafe) | Google ghi **đóng hẳn** |
| Len's Cafe & Restaurant | Nguyễn Chí Thanh | 5-7 | [foody](https://www.foody.vn/lam-dong/cafe-phuc-vu-cafe-kem); [wanderlog](https://wanderlog.com/place/details/1507360/lens-coffee) | Google ghi **đóng hẳn**; số 7 nay là Phê La |

## Đối chiếu với nguồn của game (kho game ghi gì, thật là gì)

| Nguồn game dùng | Quán thật trong bài | Nằm trên 2 đường? |
|---|---|---|
| mia.vn 4 quán cafe xưa | Cafe Tùng (6 Khu Hòa Bình), Café Nga (2A Nguyễn Chí Thanh) | Nga: có. Tùng: không (Khu Hòa Bình) |
| mia.vn văn hoá cà phê sáng | Cà phê Nga, khu Hòa Bình | có |
| vinwonders trà sữa | Phê La, 07 Nguyễn Chí Thanh | có |
| trip.com CHẠM Cafe & Kem Bơ | 8 Khu Hòa Bình | không |
| toplist quán cổ kính | Cafe Tùng (6 Khu Hòa Bình); Retro 1992 (23 Nguyễn Chí Thanh) | Retro 1992: có |
| vinwonders cafe-da-lat | Cafe Tùng; cà phê vợt khu Hòa Bình | không |
| vinwonders quán cà phê đẹp | Windmills – Nhà 9 Cánh, Little Paris (1 Lê Đại Hành) | có |
| wanderlog Windmills (7558830) | Windmills **133A Phan Đình Phùng**, đóng hẳn | **không** — game dẫn nhầm chi nhánh |
| foody Phượng Tím | 11 Nguyễn Chí Thanh | có |

## Ghi chú, chỗ còn nghi

1. **Ít quán "lâu đời, nổi tiếng" thật sự nằm trên 2 đường.** Cafe Tùng (6 Khu Hòa Bình) là quán nổi tiếng nhất khu nhưng địa chỉ là Khu Hòa Bình; [mytour](https://mytour.vn/vi/blog/bai-viet/hoi-uc-ve-thanh-pho-hoa-gui-den-tung-da-lat.html) kể chỗ đầu tiên của quán ở đường Thành Thái (nay là Nguyễn Chí Thanh), rồi mới dời. Không đưa vào danh sách vì không nằm trên 2 đường.
2. **Windmills – Nhà 9 Cánh:** đủ 2 nguồn nhưng 2 chi nhánh Windmills khác đã đóng ([133A Phan Đình Phùng](https://wanderlog.com/place/details/7558830/windmills), [7A Ba Tháng Hai](https://wanderlog.com/place/details/1137835)), Airbnb "Windmills Cafe" ghi đóng hẳn, và vinwonders ghi thêm Little Paris ở cùng số 1 Lê Đại Hành. Rất có thể đã đổi thành Little Paris. Cần mở Google Maps xem.
3. **Số 11 Nguyễn Chí Thanh:** foody có cả Phượng Tím Cafe và Tiệm bánh Cối Xay Gió (mia ghi 11A). Có thể là 2 tầng / 2 căn sát nhau, hoặc cùng một chỗ đổi chủ.
4. **Còn mở hay không:** chỉ Phê La có dấu hiệu rõ (trang chính thức ghi tên phường mới). Café Nga có bài 6/2025. Các nơi còn lại nguồn mới nhất 2019–2021. Không truy được Google Maps (cần khoá API). OpenStreetMap không có tiệm nào quanh 2 đường (theo `docs/research/2026-11-23_osm_tiem_da_lat.md` của game).
5. **Khu Hòa Bình 2025:** tháng 9–10/2025 phường tháo 7 ki-ốt Phong Lan cạnh chợ, nhiều quán cà phê cóc dời đi, cà phê Lan còn bán ở mặt đường Nguyễn Thị Minh Khai ([Znews 25/10/2025](https://znews.vn/dien-mao-moi-cua-ca-phe-khu-hoa-binh-da-lat-post1596644.html)). Không nằm trên 2 đường nhưng ảnh hưởng không khí "phố cà phê sáng" của khu.
6. Câu "Coffee Street" chỉ có 1 nguồn (Airbnb, chủ villa viết 2018), không thấy báo nào gọi Nguyễn Chí Thanh là "phố cà phê". Tên "Phố Cà Phê" là tên game đặt.
