# Phố Khách Sạn Cạnh Chợ — Phan Bội Châu (25/11/2026)

Kết quả: `data/pho/phan-boi-chau.json`, chuyện của phố: `data/chuyen/phan-boi-chau.json`. 7 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 11 nơi cần kiểm thêm, chưa thấy nơi nào đã đóng hẳn.

Cách làm: kho game đã xét Phan Bội Châu nhưng loại vì "nguồn rất ít; chỉ có trong danh sách nâng cấp đường 10/2026" (`2026-11-24_pho_moi_da_lat.md`). Em tìm từ đầu trên Foody, VinWonders, mia.vn, Mytour, trang đặt phòng (Trip.com, Kayak), Wanderlog, báo (Thanh tra, Báo Lâm Đồng), và tải OSM quanh đường qua `api.openstreetmap.org` (25/11/2026).
Quy ước nguồn: 2 bài cùng một trang chỉ tính 1. Wanderlog dùng dữ liệu Google Maps → tính 1 nguồn. Kayak và HotelsCombined cùng tập đoàn; Hotels.com và Expedia cùng tập đoàn. Atlas Obscura, Lonely Planet chặn tải (403) → không tính. Không dùng Google Maps. Chưa đi thực tế.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Phan Bội Châu | Từ đầu đường – Lê Thị Hồng Gấm (KS Việt Hà và Vũ Tuấn) | P1 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat phan-boi-chau-phuong-1](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/phan-boi-chau-phuong-1): QĐ 02/2020 (sửa bởi QĐ 16/2021) ghi "Phan Bội Châu - PHƯỜNG 1" |
| Phan Bội Châu | Đoạn còn lại | P1 | Xuân Hương - Đà Lạt | chắc | cùng trang trên |

Đổi phường theo `data/lam-dong/nq1671.json` mục 99: Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt.
Vài trang cũ ghi "phường 2" cho số 42, 145 (Mytour, vietnambooking) — Phường 2 cũng vào Xuân Hương - Đà Lạt nên không đổi kết quả.
Kiểm chéo: cả 19 điểm của 2 đoạn "Phan Bội Châu" trong `duong.json` đều nằm trong ranh giới Xuân Hương - Đà Lạt (`phuong.json`). Bài 2025–2026 (mia.vn, Trip.com, VinWonders) ghi "phường Xuân Hương - Đà Lạt".
Tên trong OSM (`duong.json`, trường `ten`): "Phan Bội Châu" — khớp. Đầu tây gặp Khu Hòa Bình / Nguyễn Thị Minh Khai (sát chợ), đầu đông gặp Bùi Thị Xuân / Lý Tự Trọng; giữa đường cắt Nguyễn Văn Trỗi, Lê Thị Hồng Gấm. OSM còn "Hẻm 60 Phan Bội Châu", "Hẻm 29B Phan Bội Châu" (không đưa vào `duong`).

## Câu giới thiệu
"Phố Khách Sạn Cạnh Chợ: đường Phan Bội Châu ngắn, chạy từ Khu Hòa Bình sát chợ Đà Lạt xuống Bùi Thị Xuân, có khách sạn lớn Colline và Mường Thanh Holiday (đi bộ 3–4 phút tới chợ), quán bar mê cung 100 Roofs, quán nướng buffet và lẩu cháo mở tới khuya."
- "3–4 phút": [Trip.com Colline](https://uk.trip.com/hotels/dalat-hotel-detail-29515862/colline-dalat) ("a 3-minute walk from Da Lat Market"), [Trip.com Mường Thanh](https://nz.trip.com/hotels/dalat-hotel-detail-713901/muong-thanh-holiday-da-lat-hotel) ("4-minute walk"), [Kayak Lake View](https://www.kayak.com/Dalat-Hotels-Lake-View-Hotel.2930564.ksp) ("4-minute walk").
- "từ Khu Hòa Bình … xuống Bùi Thị Xuân": theo OSM (`duong.json`).
- "mở tới khuya": Cút Kít tới 23h (VinWonders, Foody), lẩu cháo 40 tới 23h (VinWonders, Foody), 100 Roofs tới 24h (Trip.com, Wanderlog).
- Tên "Phố Khách Sạn Cạnh Chợ": nơi có nhiều nguồn nhất trên đường là khách sạn (Colline, Mường Thanh, Lake View) và 100 Roofs. Không có nguồn đếm số khách sạn/quán → câu không ghi số. Mytour gọi đường là "thiên đường của các quán nướng Đà Lạt" — chỉ 1 nguồn nên không lấy làm tên phố.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Hôtel Colline | khách sạn 4 sao, mở 2019 | 10 | [Trip.com](https://uk.trip.com/hotels/dalat-hotel-detail-29515862/colline-dalat) · [Thanh tra 23/08/2019](https://thanhtra.com.vn/du-lich-E19590D86/khach-san-colline-noi-trai-nghiem-thu-vi-95F58B85.html) · [Mytour](https://mytour.vn/en/blog/bai-viet/hotel-colline-review-a-little-europe-in-the-heart-of-dalat.html) | cao | có dấu hiệu (Trip.com phường mới, đánh giá 10/2026) |
| 2 | Mường Thanh Holiday Đà Lạt | khách sạn | 42 | [mia.vn](https://mia.vn/cam-nang-du-lich/muong-thanh-holiday-da-lat-hotel-thien-duong-nghi-duong-dang-cap-bac-nhat-6120) · [Trip.com](https://nz.trip.com/hotels/dalat-hotel-detail-713901/muong-thanh-holiday-da-lat-hotel) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/ho-xuan-huong-da-lat/) | cao | có dấu hiệu (mia, Trip.com ghi phường mới) |
| 3 | 100 Roofs Café (100 Mái, Đường Lên Trăng, Maze Bar) | bar - cà phê kiến trúc mê cung | 57 | [Trip.com](https://nz.trip.com/restaurant/vietnam/dalat/detail/maze-bar-149433915/) · [Wanderlog](https://app.wanderlog.com/place/details/1461945) · [Thaiest](https://thaiest.com/vietnam/travel/most-unique-themed-cafes-in-dalat) · [Foody](https://www.foody.vn/lam-dong/100-mai-cafe) | cao | có dấu hiệu (Trip.com, Wanderlog ghi phường mới) |
| 4 | Cút Kít BBQ & Beer | quán nướng buffet | 145 | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/quan-nuong-da-lat/) · [Foody](https://www.foody.vn/lam-dong/cut-kit-bbq-beer-phan-boi-chau) · [Mytour](https://mytour.vn/vi/blog/bai-viet/danh-sach-cac-quan-nuong-da-lat-hap-dan-ban-khong-the-bo-qua.html) | trung bình | dấu hiệu yếu (VinWonders ghi phường mới; Foody "hơn 3 tháng chưa có tương tác") |
| 5 | Mộc Thủy - Lẩu Cháo (cháo bồ câu) | lẩu cháo, cháo bồ câu | 40 | [Foody](https://www.foody.vn/lam-dong/moc-thuy-lau-chao) · [VinWonders](https://vinwonders.com/vi/bai-viet-du-lich/quan-chao-da-lat-ngon-kho-cuong/) | trung bình | chưa rõ |
| 6 | Kem Xôi Dừa Kim Cúc | kem xôi dừa | 8 (Wanderlog: 8A) | [Foody](https://www.foody.vn/lam-dong/kem-xoi-dua-kim-cuc-8-phan-boi-chau) · [Wanderlog](https://wanderlog.com/place/details/9635992/kem-x%C3%B4i-d%E1%BB%ABa-kim-c%C3%BAc-kim-cuc-ice-cream) | trung bình | có dấu hiệu (Google qua Wanderlog ghi phường mới) |
| 7 | Lake View Hotel | khách sạn 2 sao | 121 | [Kayak](https://www.kayak.com/Dalat-Hotels-Lake-View-Hotel.2930564.ksp) · [Foody](https://www.foody.vn/lam-dong/lake-view-hotel) | trung bình | có dấu hiệu (Kayak nhận tìm phòng 12/2026) |

OSM có điểm cho Colline (số 10), Mường Thanh (42), 100 Roofs Café (57) — `vi_tri_quan.py` sẽ dò.

## Cần kiểm thêm (chưa đủ 2 nguồn độc lập, hoặc số nhà mâu thuẫn)

| Tên | Số nhà | Nguồn có | Vì sao |
|---|---|---|---|
| Phở Tam Hoa | 115 | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/an-gi-o-da-lat/) | 1 nguồn; số 115 bị ghi cho 4 nơi |
| Xàm buffet | 115 | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/quan-nuong-da-lat/) · [Mytour](https://mytour.vn/vi/blog/bai-viet/danh-sach-cac-quan-nuong-da-lat-hap-dan-ban-khong-the-bo-qua.html) | đủ 2 trang nhưng số 115 còn được ghi cho Phở Tam Hoa, Lagim - Buffet Rau, Thi Thảo Cafe → chưa rõ ai đang ở đó |
| Lagim - Buffet Rau | 115 | [Foody tìm kiếm](https://www.foody.vn/lam-dong/tim-kiem/115%20phan%20b%E1%BB%99i%20ch%C3%A2u) | 1 nguồn; trùng 115 |
| Tiệm ăn Bếp Đà Lạt | 10 | [VinWonders](https://vinwonders.com/vi/bai-viet-du-lich/an-toi-da-lat/) | 1 nguồn; trùng số 10 với Colline |
| Rum Vàng Hotel | 38 | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/ho-xuan-huong-da-lat/) | 1 nguồn; trang đặt phòng ghi Rum Vàng ở Lê Đại Hành / Đường 3/4 |
| Cháo Đêm - Phan Bội Châu | 15 | [Foody](https://www.foody.vn/lam-dong/chao-dem-phan-boi-chau) | 1 nguồn, bình luận 2015 |
| Sữa Đậu Nành - Phan Bội Châu | 3 | [Foody](https://www.foody.vn/lam-dong/sua-dau-nanh-phan-boi-chau) | 1 nguồn |
| Tiệm Cơm Út Miền Tây | 3 | [Foody](https://www.foody.vn/lam-dong/tiem-com-ut-mien-tay-phan-boi-chau) | 1 nguồn; trùng số 3 |
| HongKong Quán | 77 | [OSM node 11840608641](https://www.openstreetmap.org/node/11840608641) | chỉ OSM |
| Cà Phê Bốn Mùa | chưa rõ | [vietnamtourism.com](https://www.vietnamtourism.com/vi/am-thuc-a-lat-ca-phe-lau-va-o-an-uong-pho) | 1 nguồn (trang tư nhân), không số nhà |
| Nghĩa Lân Hotel | 97/5 hoặc 99 | [easyJet hotels](https://hotels.easyjet.com/reviews/vn/hotel/nghia-lan.en.html?aid=356980) | số nhà mỗi trang một khác |

## Chuyện của phố (`data/chuyen/phan-boi-chau.json`)

| Ý | Nguồn | 1 nguồn? |
|---|---|---|
| Tên cũ thời Pháp "Van Vollenhoven" (trước 1953) | [blog didulichdalat](https://didulichdalat.wordpress.com/2010/10/24/ten-d%C6%B0%E1%BB%9Dng-da-l%E1%BA%A1t-x%C6%B0a-va-nay/) | có — tìm tiếng Việt/Pháp/Anh không ra trang thứ hai |
| Đầu đường (Khu Hòa Bình) thời Pháp là quảng trường chợ "Marché" | cùng blog | có |
| 2007 Mường Thanh mở (sửa 2014) | [Trip.com](https://nz.trip.com/hotels/dalat-hotel-detail-713901/muong-thanh-holiday-da-lat-hotel) | có |
| 2019 Colline mở; Thanh tra gọi đường là "cung đường huyết mạch" | [Thanh tra](https://thanhtra.com.vn/du-lich-E19590D86/khach-san-colline-noi-trai-nghiem-thu-vi-95F58B85.html) · [Trip.com](https://uk.trip.com/hotels/dalat-hotel-detail-29515862/colline-dalat) | không |
| 10/2026 Phan Bội Châu trong 9 tuyến nâng cấp, xong dự kiến 7/2027 | [Báo Lâm Đồng 20/10/2026](https://baolamdong.vn/da-lat-nang-cap-loat-tuyen-duong-noi-do-470184.html) | có |
| 100 Roofs "Đường Lên Trăng", mê cung, vườn sân thượng | Foody · Thaiest · Trip.com | không |
| Món: lẩu cháo/cháo bồ câu, nướng buffet, kem xôi dừa | xem danh sách chính | không |

## Chỗ còn nghi
- **Số 115**: 4 nơi khác nhau (Phở Tam Hoa, Xàm buffet, Lagim - Buffet Rau "view tầng 8", Thi Thảo Cafe). Có thể là toà nhà cao nhiều quán, hoặc quán đổi chủ — cần người đi xem.
- **Số 10**: Colline, Dalat Center Residence (OSM) và Bếp Đà Lạt (VinWonders) cùng số.
- **Mộc Thủy**: VinWonders không ghi tên quán, chỉ "cháo bồ câu 40 Phan Bội Châu"; Foody không có bình luận mới gần đây.
- **Nhiều trang Foody cũ** ("hơn 3 tháng chưa có tương tác") → trạng thái mở cửa của quán nhỏ trên đường này nhìn chung chưa chắc.
- **Tên cũ Van Vollenhoven** chỉ 1 nguồn; tên trùng Joost van Vollenhoven (quyền Toàn quyền Đông Dương 1913–1915, [Wikipedia tiếng Pháp](https://fr.wikipedia.org/wiki/Joost_van_Vollenhoven)) nhưng chưa có nguồn nói đường đặt theo ông. Trang Đường phố Đà Lạt của tỉnh không tải được.
- **Số phòng khách sạn** các nguồn lệch nhau (Colline 150/155, Mường Thanh 67/71) → không dùng.
- Đang thi công nâng cấp mặt đường, vỉa hè (Báo Lâm Đồng 20/10/2026) → đi thực tế lúc này có thể thấy rào chắn.
