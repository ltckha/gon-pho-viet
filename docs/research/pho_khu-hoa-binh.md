# Phố Chợ Cũ — Khu Hòa Bình (25/11/2026)

Kết quả: `data/pho/khu-hoa-binh.json`, chuyện của phố: `data/chuyen/khu-hoa-binh.json`. 7 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 4 nơi cần kiểm thêm, 2 quán ki-ốt đã dời đi (không đưa vào).

Cách làm: kho game có phố Cà Phê (Nguyễn Chí Thanh, Lê Đại Hành) nhưng không có Khu Hòa Bình làm phố riêng. Em đọc lại `data/pho/pho-ca-phe.json` và `data/chuyen/pho-ca-phe.json`, dùng lại nguồn, **không lặp** 6 nơi của phố Cà Phê. Tải dữ liệu OSM quanh Khu Hòa Bình (`api.openstreetmap.org/api/0.6/map`, bbox 108.4340,11.9418,108.4380,11.9452), lọc điểm cách vòng đường dưới 35 m và điểm có `addr:street=Khu Hòa Bình`, rồi tìm từng nơi trên báo, trang du lịch, trang đặt phòng.
Quy ước nguồn: 2 bài cùng một trang (2 bài Znews) chỉ tính 1. Bài đăng lại (Báo Mới đăng lại VietnamNet; Người Quan Sát dẫn Tuổi Trẻ) không tính thêm. Momondo và Kayak cùng tập đoàn — em không dùng cả hai cho cùng một nơi. Không dùng Google Maps. Chưa đi thực tế.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Khu Hòa Bình | Trọn đường, kể cả khu vực bến xe nội thành | P1 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat khu-hoa-binh-phuong-1](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/khu-hoa-binh-phuong-1) |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021). Đổi phường theo `data/lam-dong/nq1671.json` mục 99 (Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt).
Kiểm chéo bằng ranh giới `phuong.json`: 4 góc vòng Khu Hòa Bình và điểm số 50-52 phía nam đều nằm trong Xuân Hương - Đà Lạt. Báo 2025–2026 (Znews, Tuổi Trẻ, Báo Lâm Đồng) đều ghi "khu Hòa Bình, phường Xuân Hương - Đà Lạt".
Tên trong OSM (`duong.json`, trường `ten`): "Khu Hòa Bình" — khớp (4 đoạn, vòng một chiều khoảng 250 m quanh khối rạp Hòa Bình). Số nhà mang tên Khu Hòa Bình còn trải xuống phía nam vòng (OSM có số 39 và 50-52, cách vòng khoảng 50 m).

## Câu giới thiệu
"Phố Chợ Cũ: Khu Hòa Bình là quảng trường trên nền Chợ Cây dựng năm 1929; năm 1960 Chợ Mới mở dưới thung lũng, chợ cũ thành rạp Hòa Bình 800 chỗ (ngừng chiếu phim từ 2018), quanh đó có Cafe Tùng ở số 6 và quán cóc cà phê Lan đầu cầu thang xuống chợ, bán từ tờ mờ sáng."
- "1929", "1960", "800 chỗ": [Thanh Niên 07/04/2019](https://thanhnien.vn/da-lat-chuyen-khu-hoa-binh-tu-cho-cay-xua-den-rap-hoa-binh-nay-185839710.htm), [VnExpress 10/10/2026](https://vnexpress.net/rap-hoa-binh-ky-uc-vang-son-giua-long-da-lat-5127901.html); 1929 và 1960 có thêm [Wikipedia Chợ Đà Lạt](https://vi.wikipedia.org/wiki/Ch%E1%BB%A3_%C4%90%C3%A0_L%E1%BA%A1t).
- "ngừng chiếu từ 2018": [Tuổi Trẻ 26/03/2026](https://tuoitre.vn/rap-hoa-binh-da-lat-va-nhieu-biet-thu-cong-dang-bi-hu-hai-20260326164128795.htm) (kết luận thanh tra tỉnh); [Người Quan Sát 22/09/2026](https://nguoiquansat.vn/chinh-thuc-thao-do-rap-chieu-phim-hon-70-nam-cua-viet-nam-317761.html) nhắc lại (dẫn Tuổi Trẻ) — thực chất 1 nguồn gốc.
- "số 6": [Thương Gia](https://thuonggiaonline.vn/cafe-tung-tren-nhung-dau-chim-di-post553449.html), [Mytour](https://mytour.vn/vi/blog/bai-viet/hoi-uc-ve-thanh-pho-hoa-gui-den-tung-da-lat.html), [Foody](https://www.foody.vn/lam-dong/khu-vuc-hoa-binh), [OSM](https://www.openstreetmap.org/node/4070796725).
- "cà phê Lan đầu cầu thang, bán từ tờ mờ sáng": [Znews 25/10/2025](https://znews.vn/dien-mao-moi-cua-ca-phe-khu-hoa-binh-da-lat-post1596644.html) (từ 4:30 dọn hàng, bán 5:00–10:00), [VietnamNet 17/11/2022](https://vietnamnet.vn/da-lat-14-do-c-du-khach-co-ro-thuong-thuc-ca-phe-vot-ngam-thanh-pho-thuc-giac-2075896.html) (từ 3:30).
- Tên "Phố Chợ Cũ": đặc trưng thật dễ nhận nhất là quảng trường trên nền chợ cũ (Place du Marché, Chợ Cây). Không có nguồn đếm số quán → không ghi số quán.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Rạp Hòa Bình (Rạp 3 Tháng 4) | công trình lịch sử, rạp cũ | (Foody: 5) | [Thanh Niên](https://thanhnien.vn/da-lat-chuyen-khu-hoa-binh-tu-cho-cay-xua-den-rap-hoa-binh-nay-185839710.htm) · [VnExpress 10/2026](https://vnexpress.net/rap-hoa-binh-ky-uc-vang-son-giua-long-da-lat-5127901.html) · [Tuổi Trẻ 03/2026](https://tuoitre.vn/rap-hoa-binh-da-lat-va-nhieu-biet-thu-cong-dang-bi-hu-hai-20260326164128795.htm) · [Người Quan Sát 09/2026](https://nguoiquansat.vn/chinh-thuc-thao-do-rap-chieu-phim-hon-70-nam-cua-viet-nam-317761.html) · [Báo Lâm Đồng 11/2026](https://baolamdong.vn/print/473411.html) · [Foody](https://www.foody.vn/lam-dong/rap-hoa-binh-3-4-khu-hoa-binh) · [OSM](https://www.openstreetmap.org/way/308446691) | cao | không chiếu phim từ 2018; từ 17/9/2026 tháo dỡ bên trong, giữ mặt tiền |
| 2 | Cafe Tùng | cà phê lâu đời | 6 | [Thương Gia 07/2024](https://thuonggiaonline.vn/cafe-tung-tren-nhung-dau-chim-di-post553449.html) · [Mytour](https://mytour.vn/vi/blog/bai-viet/hoi-uc-ve-thanh-pho-hoa-gui-den-tung-da-lat.html) · [VinWonders](https://vinwonders.com/vi/bai-viet-du-lich/cafe-da-lat/) · [Foody](https://www.foody.vn/lam-dong/khu-vuc-hoa-binh) · [OSM](https://www.openstreetmap.org/node/4070796725) | cao | có dấu hiệu (VinWonders ghi phường mới; 7:30–22:00) |
| 3 | Cà phê cô Lan (quán cóc) | cà phê cóc sáng sớm | — | [Znews 10/2025](https://znews.vn/dien-mao-moi-cua-ca-phe-khu-hoa-binh-da-lat-post1596644.html) · [Znews 10/2025](https://znews.vn/nguoi-ban-ca-phe-khu-hoa-binh-da-lat-doi-di-dau-khi-ki-ot-thao-do-post1589843.html) (cùng trang, tính 1) · [VietnamNet 11/2022](https://vietnamnet.vn/da-lat-14-do-c-du-khach-co-ro-thuong-thuc-ca-phe-vot-ngam-thanh-pho-thuc-giac-2075896.html) | trung bình | có dấu hiệu (Znews 10/2025: vẫn bán 5:00–10:00, 20.000 đ/ly) |
| 4 | Chạm Cafe & Kem Bơ - Khu Hòa Bình | kem bơ, cà phê (chuỗi) | 8 | [chamdalat.vn](https://chamdalat.vn/) (trang chính thức) · [Wanderlog](https://wanderlog.com/place/details/7490119) · [Trip.com](https://uk.trip.com/restaurant/vietnam/dalat/detail/CH%E1%BA%A0M%20Cafe%20%26%20Kem%20B%C6%A1%20%C4%90%C3%A0%20L%E1%BA%A1t-151080579) | cao | có dấu hiệu (trang chính thức ghi phường mới; 7:30–22:00) |
| 5 | Diamond Hotel (Dimond) | khách sạn | 14-16 | [Ostrovok](https://ostrovok.ru/hotel/vietnam/da_lat/mid6947722/diamond_hotel_18) · [Momondo](https://momondo.com/hotels/da-lat/Diamond-Hotel.mhd849975.ksp) · [Vietnam Booking 2017](https://www.vietnambooking.com/khach-san/tin-tuc-khach-san/diem-qua-3-khach-san-nen-o-ngay-khu-trung-tam-hoa-binh-da-lat.html) | trung bình | có dấu hiệu (Momondo còn chào giá 11/2026) |
| 6 | Anh Đào Hotel | khách sạn | 50-52 (Kayak: 52-54) | [ViaMichelin](https://www.viamichelin.de/karten-stadtplan/hotels/poi/dalat-_-20506b60) · [Kayak](https://www.vn.kayak.com/Dalat-Hotels-Anh-Dao-Hotel-Dalat.658758.ksp) · [Vietnam Booking 2017](https://www.vietnambooking.com/khach-san/tin-tuc-khach-san/diem-qua-3-khach-san-nen-o-ngay-khu-trung-tam-hoa-binh-da-lat.html) | trung bình | chưa rõ |
| 7 | Điểm xe buýt Khu Hòa Bình | đón xe buýt đi Langbiang, Đức Trọng… | — | [Wikivoyage](https://en.wikivoyage.org/wiki/Da_Lat) · [Dalat Trip](https://www.dalattrip.com/the-round-dalat-bus/) · [OSM](https://www.openstreetmap.org/node/5147395022) | trung bình | chưa rõ (Dalat Trip: bến đã dời ra Mai Anh Đào nhưng xe vẫn ghé Hòa Bình đón khách) |

## Cần kiểm thêm (chưa đủ 2 nguồn độc lập)

| Tên | Số nhà | Nguồn có | Vì sao |
|---|---|---|---|
| Hồng Trà Hòa Bình | 50-52 | [OSM](https://www.openstreetmap.org/node/14305140754) | chỉ OSM (sửa 24/10/2026); có thể cùng toà nhà Anh Đào Hotel |
| Là Việt Coffee Kiosk | — | [OSM](https://www.openstreetmap.org/node/12770400401) | chỉ OSM (4/2025); pulled.coffee chép từ OSM; có thể đã mất khi tháo ki-ốt 9/2025 |
| Bánh tráng nướng, sữa đậu nành nóng Cô Mén | — | [Znews 01/10/2025](https://znews.vn/nguoi-ban-ca-phe-khu-hoa-binh-da-lat-doi-di-dau-khi-ki-ot-thao-do-post1589843.html) | 1 nguồn; nay bán tối từ 17:00 |
| Bún bò Bình | — | [OSM](https://www.openstreetmap.org/node/5231659322) | chỉ OSM (2017) |

## Đã dời / đã đóng (không đưa vào)
- **Cà phê Phố (ki-ốt số 4)**: tháng 6/2025 dời về đường Hai Bà Trưng (phường Cam Ly - Đà Lạt), cách khoảng 2,5 km ([Znews](https://znews.vn/nguoi-ban-ca-phe-khu-hoa-binh-da-lat-doi-di-dau-khi-ki-ot-thao-do-post1589843.html)).
- **Cà phê Khói và 7 ki-ốt Phong Lan**: ki-ốt tháo từ 10/9/2025, chỗ cũ thành bồn hoa ([Znews](https://znews.vn/dien-mao-moi-cua-ca-phe-khu-hoa-binh-da-lat-post1596644.html)).

## Không lặp phố Cà Phê
Café Nga, Phê La, Retro 1992, Artista, Tiệm bánh Cối Xay Gió, Windmills (Nguyễn Chí Thanh, Lê Đại Hành) đã ở phố Cà Phê → không đưa vào đây. Cafe Tùng và cà phê Lan bên phố Cà Phê chỉ nằm trong file chuyện (vì không nằm trên 2 đường đó), nên ở đây em đưa vào danh sách địa điểm.

## Chỗ còn nghi
- **Rạp Hòa Bình** để trong danh sách chính như một **mốc công trình**, không phải rạp đang chiếu: ngừng chiếu từ 2018, từ 17/9/2026 tháo dỡ bên trong (giữ mặt tiền, trần vòm), khu đất cho thuê kinh doanh 10 năm. Nếu anh muốn chỉ giữ nơi "đang mở cửa đón khách" thì bỏ nơi này. Năm dựng lệch: Tuổi Trẻ ghi 1952, các bài lịch sử ghi chợ gạch 1934/1937 → thành rạp sau 1960. Số nhà 5 chỉ có ở Foody.
- **Cà phê cô Lan**: quán cóc không số nhà; Znews tả ở mặt đường Nguyễn Thị Minh Khai, bên trái rạp, đầu cầu thang xuống chợ — sát Khu Hòa Bình nhưng địa chỉ có thể tính là Nguyễn Thị Minh Khai. Điểm "Cô Lan" trên OSM cách khoảng 125 m về phía bắc, không khớp → không dùng. Giờ và giá đổi theo năm (2022: 3:30–13:00, 12.000 đ; 2025: 5:00–10:00, 20.000 đ).
- **Cafe Tùng**: OSM có 2 điểm ("Cafe Tùng" số 6 lệch bắc khoảng 40 m; "Tùng Coffee" ngay trên vòng đường) — có thể là 1 quán ghi 2 lần, cần soát tay khi gắn vị trí. Chưa thấy bài báo 2026.
- **Anh Đào Hotel**: số nhà lệch 50-52 (ViaMichelin) / 52-54 (Kayak); Kayak ghim gần Trickland (sai chỗ). Không có nguồn 2025–2026.
- **Diamond Hotel**: Vietnam Booking viết "Dimond", 3 sao (2017); trang đặt phòng ghi 2 sao.
- **Điểm xe buýt**: nguồn không ghi ngày rõ; chưa có nhà xe hay báo xác nhận năm 2025–2026.
- **Mốc năm** (file chuyện): chợ gạch 1934 (Người Đô Thị) hay 1937 (Thanh Niên, Wikipedia); trưng cầu dân ý 1955, "rạp tối tân nhứt" 1962, "ba ngọn tháp", 25 năm khai thác rạp — mỗi ý 1 nguồn (`mot_nguon: true`).
