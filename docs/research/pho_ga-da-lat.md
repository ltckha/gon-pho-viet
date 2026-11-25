# Phố Ga Đà Lạt — quanh Ga Đà Lạt: Quang Trung, Nguyễn Trãi, Phạm Hồng Thái (25/11/2026)

Kết quả: `data/pho/ga-da-lat.json`, chuyện của phố: `data/chuyen/ga-da-lat.json`. Có 10 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 10 nơi cần kiểm thêm, chưa thấy nơi nào ghi đã đóng hẳn.

Cách làm: em tải dữ liệu OSM quanh ga (`api.openstreetmap.org/api/0.6/map`, bbox 108.447,11.935,108.462,11.948) để lấy các điểm có tên, rồi tìm từng nơi trên báo, Wikipedia, trang du lịch, Foody, trang đặt phòng. Đường của từng nơi lấy theo đường OSM gần nhất (đo trên `duong.json`), phường kiểm bằng `phuong.json`.
Quy ước nguồn giống phố Trại Mát: 2 bài cùng một trang (2 bài Nhân Dân) chỉ tính 1; Vinpearl không dùng; không dùng Google Maps; chưa đi thực tế. Không trùng nơi nào với các phố đã có (đã đọc `data/pho/*.json`; Le J' Cafe, Bánh căn Lệ, xíu mại Hồng thuộc phố Yersin; Hoa Violet, Coffee Em và Trịnh thuộc phố Trần Hưng Đạo).

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Quang Trung | trọn đường | P9 | Lâm Viên - Đà Lạt | chắc | [thuviennhadat quang-trung-phuong-9](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/quang-trung-phuong-9) |
| Nhà ga (1 Quang Trung) | sân ga, phía nam đường | P10 (mia, mytour) / P9 (trip.com) | **Xuân Hương - Đà Lạt** | khá chắc | [Wikipedia](https://vi.wikipedia.org/wiki/Ga_%C4%90%C3%A0_L%E1%BA%A1t) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/ga-xe-lua-da-lat/) · [Nhân Dân 07/03/2026](https://nhandan.vn/mang-lai-trai-nghiem-thu-vi-cho-du-khach-post946628.html) ghi Xuân Hương; [Nhân Dân 12/06/2026](https://nhandan.vn/doc-dao-kien-truc-ga-da-lat-post968689.html) lại ghi Lâm Viên |
| Nguyễn Trãi | từ đầu đường Yersin đến Ga Đà Lạt | P9 | Lâm Viên - Đà Lạt | chắc | [thuviennhadat nguyen-trai-phuong-9](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/nguyen-trai-phuong-9) |
| Nguyễn Trãi khúc sát ga | 17/1, hẻm 17, 26A | P10 (Foody, OSM, trang đặt phòng) | Xuân Hương - Đà Lạt | **chưa rõ** | trái với bảng giá; `phuong.json` xếp vào Xuân Hương |
| Phạm Hồng Thái | trọn đường (gồm khu quy hoạch) | P10 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat pham-hong-thai-phuong-10](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/pham-hong-thai-phuong-10) |
| Hùng Vương | số 4 (Bảo tàng) | P10 (mia, trip.com) | Xuân Hương - Đà Lạt | khá chắc | [Nhân Dân 08/2025](https://nhandan.vn/noi-luu-giu-ky-uc-nam-tay-nguyen-post899294.html) |
| Nguyễn Du | số 3 (Grand Mercure) | P9 (Accor) | Lâm Viên - Đà Lạt | khá chắc | [Accor](https://all.accor.com/hotel/B8H0/index.en.shtml) |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021), hết hiệu lực 01/01/2026; bảng giá 2026 (NQ 82/2025/NQ-HĐND) em chưa mở được phụ lục. Đổi phường theo `nq1671.json`: mục 99 (P1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt), mục 101 (P8, 9, 12 → Lâm Viên - Đà Lạt).

**Kết luận:** ga nằm ngay trên ranh hai phường. Ranh giới `phuong.json` chạy sát mép nam đường Quang Trung: điểm OSM "Ga Đà Lạt", khu quy hoạch Phạm Hồng Thái, dốc hẻm 17 Nguyễn Trãi nằm trong **Xuân Hương**; lòng đường Quang Trung (11/14 điểm), Nguyễn Trãi phía bắc (Still Cafe), Nguyễn Du nằm trong **Lâm Viên**. Anh giao "Xuân Hương" — em giữ `ward` = **Xuân Hương - Đà Lạt** cho nhà ga, độ chắc **khá chắc** (không phải "chắc" vì báo ghi lệch, bảng giá ghi Quang Trung là P9). Trường `road` = Quang Trung, nhưng phần lớn đường Quang Trung thuộc Lâm Viên.

Tên trong OSM (`duong.json`, trường `ten`): "Quang Trung", "Nguyễn Trãi", "Hẻm 17 Nguyễn Trãi", "Phạm Hồng Thái", "Hùng Vương", "Nguyễn Du" — đều khớp. `duong.json` **chưa có mốc ga Đà Lạt** (OSM chỉ có điểm `tourism=attraction` "Ga Đà Lạt", không có `railway=station`); có mốc "Bảo Tàng Lâm Đồng".

## Câu giới thiệu
"Phố Ga Đà Lạt: nhà ga ba chóp mái người Pháp xây 1932–1938, đầu đoạn đường sắt gần 7 km còn chạy tàu du lịch đi Trại Mát; quanh ga có quán cà phê trong toa tàu cũ, phở atisô sợi hồng và khách sạn nhỏ trong khu quy hoạch Phạm Hồng Thái."
- "1932–1938": [Nhân Dân 06/2026](https://nhandan.vn/doc-dao-kien-truc-ga-da-lat-post968689.html) (dẫn Địa chí Đà Lạt), [Wikipedia](https://vi.wikipedia.org/wiki/Ga_%C4%90%C3%A0_L%E1%BA%A1t), [VinWonders](https://vinwonders.com/vi/wonderpedia/news/ga-xe-lua-da-lat/). Lệch: [VnExpress 2018](https://vnexpress.net/nha-ga-xe-lua-co-nhat-dong-duong-o-da-lat-3824481.html) ghi khởi công 1932, "đưa vào sử dụng 4 năm sau".
- "ba chóp mái": Nhân Dân (2 bài), Wikipedia, VinWonders.
- "gần 7 km": Nhân Dân 06/2026 và 03/2026, [VnExpress 2024](https://vnexpress.net/mo-tau-dem-da-lat-trai-mat-4733423.html), Wikipedia.
- Không đưa "500 nghìn lượt khách năm 2025" vào câu vì chỉ Nhân Dân 03/2026 ghi (đã ghi trong đặc trưng của ga).

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Đường OSM · số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Ga Đà Lạt | nhà ga, di tích | Quang Trung · 1 | [Wikipedia](https://vi.wikipedia.org/wiki/Ga_%C4%90%C3%A0_L%E1%BA%A1t) · [Nhân Dân 06/2026](https://nhandan.vn/doc-dao-kien-truc-ga-da-lat-post968689.html) · [Nhân Dân 03/2026](https://nhandan.vn/mang-lai-trai-nghiem-thu-vi-cho-du-khach-post946628.html) · [VnExpress 2018](https://vnexpress.net/nha-ga-xe-lua-co-nhat-dong-duong-o-da-lat-3824481.html) · [Thời báo Sài Gòn 04/2024](https://tuoitre.vn/saigontimes/tuyen-tau-co-da-lat-trai-mat-chay-them-buoi-toi-tu-giua-thang-4-106908518.htm) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/ga-xe-lua-da-lat/) · [mia 2023](https://mia.vn/cam-nang-du-lich/review-toan-canh-ga-da-lat-nha-ga-co-nhat-viet-nam-2655) · [vietnambooking 2023](https://www.vietnambooking.com/du-lich/blog-du-lich/ga-da-lat.html) · [OSM](https://www.openstreetmap.org/node/5661470624) | cao | mở (Nhân Dân 06/2026) |
| 2 | Quán cà phê trong ga (Train Café) | cà phê sân ga | Quang Trung · 1 | [mia 2023](https://mia.vn/cam-nang-du-lich/review-toan-canh-ga-da-lat-nha-ga-co-nhat-viet-nam-2655) · [OSM](https://www.openstreetmap.org/node/11715800432) | trung bình | chưa rõ |
| 3 | Dalat Train Villa & Cafe (cà phê Xe Lửa) | cà phê toa tàu, biệt thự cho thuê | Quang Trung · 1 (Villa #3) | [trip.com](https://uk.trip.com/travel-guide/foods/Dalat-1393-restaurant/Dalat%20Train%20Cafe-19667950) · [vietnambooking](https://www.vietnambooking.com/du-lich/blog-du-lich/dua-nhau-di-check-in-quan-ca-phe-toa-tau-xanh-ngat-giua-long-da-lat.html) · [Znews 2015](https://znews.vn/ca-phe-xe-lua-lang-du-tai-da-lat-post613399.html) · [VnExpress Intl 2020](https://e.vnexpress.net/news/video/da-lat-cafe-goes-back-a-century-on-a-train-car-4116008.html) · [OSM](https://www.openstreetmap.org/node/5547854021) | trung bình | chưa rõ (bài mới nhất 2020–2024) |
| 4 | Still Cafe | cà phê kiểu Nhật hoài cổ | Nguyễn Trãi · 59 | [mia 01/2025](https://mia.vn/cam-nang-du-lich/cung-still-coffee-tim-hieu-ve-mot-da-lat-rat-co-xua-1443) · [Foody](https://www.foody.vn/lam-dong/still-cafe) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) · [wanderlog](https://wanderlog.com/place/details/1324500/still-cafe) · [OSM](https://www.openstreetmap.org/node/6152524285) | cao | có dấu hiệu (mia 01/2025) |
| 5 | Gare De Cafe (Cà phê Dốc Ga) | cà phê nhỏ | Hẻm 17 Nguyễn Trãi · 17/1 | [Foody](https://www.foody.vn/lam-dong/gare-de-cafe) · [OSM](https://www.openstreetmap.org/node/6175932386) | thấp | chưa rõ (Foody mới nhất 01/2020) |
| 6 | Atispho – Phở Atiso Đà Lạt | quán phở | Phạm Hồng Thái · lô H19–H20 KQH | [wanderlog](https://wanderlog.com/place/details/7403035/atispho-ph%E1%BB%9F-atiso-%C4%91%C3%A0-l%E1%BA%A1t) · [OSM](https://www.openstreetmap.org/node/11840597521) · [Báo Lâm Đồng 07/2026](https://baolamdong.vn/doc-la-pho-atiso-da-lat-451656.html) (món, không địa chỉ) | trung bình | có dấu hiệu (Báo Lâm Đồng 07/2026) |
| 7 | Clivia Hotel | khách sạn nhỏ | Nguyễn Trãi · 26A | [trip.com](https://ae.trip.com/hotels/dalat-hotel-detail-114994223/clivia-hotel) · [hotels.com](https://hotels.com/ho3695703488) · [OSM](https://www.openstreetmap.org/way/971572472) | trung bình | còn nhận đặt phòng |
| 8 | Pinus CASA Villa | biệt thự nguyên căn | Phạm Hồng Thái · H32 KQH | [Airbnb](https://www.airbnb.com/rooms/861272405640464846) · [OSM](https://www.openstreetmap.org/node/10978202298) | trung bình | chưa rõ |
| 9 | Grand Mercure Dalat (Mercure Dalat Resort) | khu nghỉ dưỡng | Nguyễn Du · 3 | [Accor](https://all.accor.com/hotel/B8H0/index.en.shtml) · [Travelocity](https://www.travelocity.com/Da-Lat-Hotels-Mercure-Dalat-Resort.h2835118.Hotel-Reviews) · [OSM](https://www.openstreetmap.org/way/542725585) | cao | mở (Accor nhận đặt) |
| 10 | Bảo tàng Lâm Đồng | bảo tàng | Hùng Vương · 4 | [mia 12/2023](https://mia.vn/cam-nang-du-lich/tham-quan-bao-tang-lam-dong-14093) · [Nhân Dân 08/2025](https://nhandan.vn/noi-luu-giu-ky-uc-nam-tay-nguyen-post899294.html) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/bao-tang-lam-dong-da-lat/) · [trip.com](https://uk.trip.com/travel-guide/attraction/dalat/lm-ng-museum-142805891?curr=GBP) · [OSM](https://www.openstreetmap.org/node/1152350875) | cao | mở (Nhân Dân 08/2025) |

Khoảng cách tới ga (chim bay, theo OSM): 1–8 trong vòng 300 m; Grand Mercure khoảng 700 m (Accor: 900 m đi bộ); Bảo tàng khoảng 600 m. Nơi 5 và 8 chỉ vừa đủ 2 nguồn, nguồn cũ hoặc không ngày → nên kiểm lại trước khi đặt chấm.

## Cần kiểm thêm

| Tên | Đường · số | Nguồn có | Vì sao |
|---|---|---|---|
| Đà Lạt Coffee Train (King Coffee) | Quang Trung · ga | [Báo Lâm Đồng 14/12/2025](https://baolamdong.vn/trai-nghiem-va-thuong-thuc-ca-phe-viet-tren-hanh-trinh-chuyen-tau-co-da-lat-410362.html) | 1 nguồn đọc được; Việt Nam News 2026 bị chặn (403); là chuyến tàu, không phải điểm cố định |
| The Choco (chi nhánh ga) | Quang Trung | [wanderlog](https://wanderlog.com/place/details/10027284/the-choco) · [Foody](https://www.foody.vn/lam-dong/the-choco-truong-cong-dinh/binh-luan) · [OSM](https://www.openstreetmap.org/node/6842597086) | địa chỉ rối (wanderlog ghi cả 36 Nguyễn Văn Trỗi lẫn 1 Quang Trung), Foody mới nhất 01/2021 |
| Milano Coffee – Nguyễn Trãi | Nguyễn Trãi · 25 | [Foody](https://www.foody.vn/lam-dong/milano-coffee-nguyen-trai) · [OSM](https://www.openstreetmap.org/node/6029373130) | Foody ghi sai phường (P. 6), bình luận mới nhất 2019 |
| Đồi Cù (sân golf Dalat Palace) | — | [GolfPass](https://www.golfpass.com/courses/22024-dalat-palace-golf-club/) · [OSM](https://www.openstreetmap.org/way/99661171) | cách ga khoảng 800 m về phía hồ Xuân Hương, đi qua Yersin → hợp với phố hồ hơn; năm lập (1922) và người thiết kế các trang ghi lệch |
| Cocaland Da Lat | Nguyễn Trãi · 39 | [OSM](https://www.openstreetmap.org/node/11836930635) | chỉ OSM |
| Lan Manh Hostel | Phạm Hồng Thái | [OSM](https://www.openstreetmap.org/node/13827347802) | chỉ OSM |
| Kim Cương Hotel Đà Lạt | Phạm Hồng Thái · F76 KQH | [OSM](https://www.openstreetmap.org/way/1141843722) | chỉ OSM |
| Góc Hiên Nhà - Đà Lạt | Phạm Hồng Thái · E29 KQH | [OSM](https://www.openstreetmap.org/node/11899981529) | chỉ OSM |
| Cà Phê Xóm Ruộng | Quang Trung | [OSM](https://www.openstreetmap.org/node/13827574801) | chỉ OSM |
| Đường Sắt (nhà hàng, khách sạn) | Quang Trung | [OSM nhà hàng](https://www.openstreetmap.org/node/1152353013) · [OSM khách sạn](https://www.openstreetmap.org/node/1152313710) | chỉ OSM |

## Chuyện của phố (`data/chuyen/ga-da-lat.json`)
- Mốc: 1908 khởi công tuyến · 1932 khởi công ga · 1938 xong · 1972 ngừng chạy · 1991 khôi phục đoạn Trại Mát · 2001 di tích quốc gia (chỉ Nhân Dân, `mot_nguon`; VinWonders ghi 2011) · 14/4/2024 tàu đêm + phòng chiếu phim tài liệu · 2025 đổi phường, Coffee Train 15/12 (`mot_nguon`).
- Chuyện: "Ba chóp mái" (Lang Biang hay nhà rông), "Toa tàu thành quán cà phê" (toa 1910 mua ở Bình Dương — chi tiết chỉ Znews), "Đầu tuyến răng cưa, nay chỉ còn bảy cây số", "Ga về đêm".
- Món: phở atisô sợi hồng, trà atisô trên tàu, cà phê trong sân ga (`mot_nguon`), cà phê trên toa di sản (`mot_nguon`).

## Chỗ còn nghi
1. Phường của nhà ga (Xuân Hương hay Lâm Viên) — nguồn lệch, chưa có văn bản; bảng giá 2026 chưa đọc được.
2. Năm xong ga 1938 / khoảng 1936; năm di tích 2001 / 2011.
3. Dalat Train Villa & Cafe, Gare De Cafe, quán trong ga: chưa có nguồn 2025–2026 xác nhận còn mở.
4. Giá vé vào ga (10.000 / 5.000 đ) và giá vé tàu đều cũ → không ghi.
