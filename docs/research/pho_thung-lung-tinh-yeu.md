# Phố Thung Lũng Tình Yêu — Phù Đổng Thiên Vương · Mai Anh Đào (25/11/2026)

Kết quả: `data/pho/thung-lung-tinh-yeu.json`, chuyện của phố: `data/chuyen/thung-lung-tinh-yeu.json`. **10 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau** (danh sách chính, gồm 5 điểm tham quan/khách sạn và 5 quán ăn/trường), 11 nơi cần kiểm thêm, chưa thấy nơi nào ghi đã đóng hẳn.

Cách làm: kho game không có phố này (tìm "Thung lũng Tình Yêu", "Mai Anh Đào", "Phù Đổng" trong `content/streets` và `docs/research` chỉ ra tên quán đặt lại, không liên quan). Em tải OSM khu này (`api.openstreetmap.org/api/0.6/map`, 2 ô: bbox 108.437,11.952,108.457,11.968 và 108.437,11.968,108.457,11.986) để lấy danh sách nơi có `addr:street` là hai đường, rồi tìm từng nơi trên báo, trang du lịch, Foody, Wanderlog.
Quy ước nguồn: 2 bài cùng một trang (2 bài mia, 2 bài VinWonders) chỉ tính 1; VinWonders/Vinpearl tính chung 1; Mytour chép bài mia về XQ → không tính riêng. Không dùng Google Maps. Chưa đi thực tế.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Phù Đổng Thiên Vương | Ngã năm Đại học – đầu đường Nguyễn Hữu Cảnh (nhà 237 cũ) | P8 | Lâm Viên - Đà Lạt | chắc | [thuviennhadat phu-dong-thien-vuong-phuong-8](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/phu-dong-thien-vuong-phuong-8) |
| Phù Đổng Thiên Vương | Đoạn còn lại (tới Mai Anh Đào) | P8 | Lâm Viên - Đà Lạt | chắc | cùng trang trên |
| Mai Anh Đào | Trọn đường | P8 | Lâm Viên - Đà Lạt | chắc | [thuviennhadat mai-anh-dao-phuong-8](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/mai-anh-dao-phuong-8) |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021). Đổi phường theo `data/lam-dong/nq1671.json` mục 101 (Phường 8, Phường 9, Phường 12 → Lâm Viên - Đà Lạt).
`ward` = **Lâm Viên - Đà Lạt**.
Kiểm chéo bằng ranh giới `phuong.json`: mọi điểm của 4 đoạn "Phù Đổng Thiên Vương" (khoảng 2,5 km) và đoạn chính "Mai Anh Đào" (way 308445212, khoảng 1,35 km), cùng khu Thung Lũng Tình Yêu, Đồi Mộng Mơ, hồ Đa Thiện trên OSM đều nằm trong Lâm Viên - Đà Lạt.
Tên trong OSM (`duong.json`, trường `ten`): "Phù Đổng Thiên Vương" (4 đoạn, có 2 đoạn một chiều ở đầu Ngã năm) và "Mai Anh Đào" — khớp. **Bẫy:** `duong.json` có thêm 1 đoạn ngắn cũng tên "Mai Anh Đào" (way 542466482, khoảng 130 m) ở tận phía nam (11.894, 108.439), thuộc Xuân Hương - Đà Lạt — không phải đường này; khi nối đoạn theo tên đừng gộp vào. OSM còn có "Hẻm 61 Phù Đổng Thiên Vương" (không đưa vào `duong`).

## Câu giới thiệu
"Phố Thung Lũng Tình Yêu: từ Ngã năm Đại học, đường Phù Đổng Thiên Vương đi ngang Trường Đại học Đà Lạt (tiền thân Viện Đại học Đà Lạt, khóa đầu năm 1958) và các quán gà nướng cơm lam, lẩu gà lá é, rồi nối sang đường Mai Anh Đào tới Thung lũng Tình Yêu rộng gần 140 ha, có hồ Đa Thiện đắp đập năm 1972, kề bên là Đồi Mộng Mơ và làng tranh thêu XQ."
- "Ngã năm Đại học": tên mốc trong [bảng giá đất](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/phu-dong-thien-vuong-phuong-8).
- "1958": [SGGP](https://www.sggp.org.vn/truong-dai-hoc-da-lat-gap-mat-65-nam-hinh-thanh-va-phat-trien-post714660.html) ("thành lập năm 1958, tiền thân là Viện Đại học Đà Lạt"), [Tuổi Trẻ 16/11/2023](https://tuoitre.vn/truong-dai-hoc-da-lat-hanh-trinh-65-nam-thu-nhan-khai-phong-ban-sac-2023111610494645.htm) ("65 năm kể từ đợt tuyển sinh đầu tiên"), [Wikipedia](https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_L%E1%BA%A1t) (lập 1957, hoạt động từ 1958).
- "gần 140 ha": [Vietnam Pictorial / VNA 21/02/2016](https://vietnam.vnanet.vn/english/the-valley-of-love/220372.html), [VietNamNet 30/10/2016](https://vietnamnet.vn/en/the-valley-of-love-vietnams-most-romantic-sight-E166025.html), [Báo Nghệ An](https://baonghean.vn/en/thung-lung-tinh-yeu-noi-tieng-nhat-viet-nam-10118140.html). (Wikipedia: khu gộp với Đồi Mộng Mơ 137 ha.)
- "1972": Vietnam Pictorial, Báo Nghệ An, [Wikipedia](https://vi.wikipedia.org/wiki/Thung_l%C5%A9ng_T%C3%ACnh_Y%C3%AAu).
- "quán gà nướng cơm lam, lẩu gà lá é": các quán số 8–10 dưới đây. Không có nguồn đếm số quán → không ghi số.
- Tên "Phố Thung Lũng Tình Yêu": đặc trưng dễ nhận nhất là khu du lịch ở cuối đường. **Không** gọi "đường hoa mai anh đào": em không tìm thấy nguồn nào nói đường Mai Anh Đào có hàng mai anh đào (các bài ngắm hoa nhắc Trần Hưng Đạo, Lê Đại Hành, dốc Đa Quý, hồ Xuân Hương).

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Đường · số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Khu du lịch Thung Lũng Tình Yêu (TTC World) | điểm tham quan | Mai Anh Đào · 3-5-7 | [Vietnam Pictorial](https://vietnam.vnanet.vn/english/the-valley-of-love/220372.html) · [VietNamNet](https://vietnamnet.vn/en/the-valley-of-love-vietnams-most-romantic-sight-E166025.html) · [Báo Nghệ An](https://baonghean.vn/en/thung-lung-tinh-yeu-noi-tieng-nhat-viet-nam-10118140.html) · [Wikipedia](https://vi.wikipedia.org/wiki/Thung_l%C5%A9ng_T%C3%ACnh_Y%C3%AAu) · [mia.vn (sửa 23/07/2026)](https://mia.vn/cam-nang-du-lich/thung-lung-tinh-yeu-co-gi-18817) · [TTC 12/08/2026](https://www.ttcgroup.vn/en-US/business-sectors/hospitality/other-news-3/ttc-world-valley-of-love-launches-dalazoo-expanding-its-ecosystem-of-experiences) · [index.vn 27/04/2026](https://index.vn/en/news/love-valley-concert-2026-attendees-eligible-for-free-admission-to-thung-lung-tinh-yeu-on-may-1-2026) · [Foody](https://www.foody.vn/lam-dong/khu-du-lich-thung-lung-tinh-yeu) · [OSM](https://www.openstreetmap.org/way/473771564) | cao | mở (tin 4/2026, 8/2026) |
| 2 | Hồ Đa Thiện | hồ trong khu TLTY | Mai Anh Đào · — | Vietnam Pictorial · Báo Nghệ An · Wikipedia · [OSM](https://www.openstreetmap.org/way/141724748) | cao | theo vé TLTY |
| 3 | Đồi Mộng Mơ (nay: Khu nghỉ dưỡng TTC Đồi Mộng Mơ) | điểm tham quan, nghỉ dưỡng | Mai Anh Đào · 5 | [VnExpress 07/4/2015](https://vnexpress.net/nhung-dieu-chua-biet-ve-doi-mong-mo-3178612.html) · [mia.vn](https://mia.vn/cam-nang-du-lich/doi-mong-mo-da-lat-ve-dep-tru-tinh-xu-so-ngan-hoa-1432) · [Mytour 04/2024](https://mytour.vn/vi/blog/bai-viet/doi-mong-mo-da-lat-ve-dep-tho-mong-cua-xu-so-ngan-hoa.html) · [VinWonders 12/2025](https://vinwonders.com/vi/wonderpedia/news/doi-mong-mo-da-lat/) · [trip.com](https://uk.trip.com/hotels/dalat-hotel-detail-2550571/mong-mo-resort) · [vietnambooking](https://www.vietnambooking.com/hotel/vietnam/ttc-resort-doi-mong-mo.html) · [Foody](https://www.foody.vn/lam-dong/khu-du-lich-doi-mong-mo) · [OSM](https://www.openstreetmap.org/way/473551454) | cao | resort còn bán phòng (25/11/2026) |
| 4 | XQ Đà Lạt Sử Quán | làng tranh thêu | Mai Anh Đào · 80A | [mia.vn (sửa 23/07/2026)](https://mia.vn/cam-nang-du-lich/xq-su-quan-chiem-nguong-nghe-thuat-theu-tranh-truyen-thong-dinh-cao-1543) · [Wanderlog](https://wanderlog.com/place/details/1641619) · [vietnambooking](https://www.vietnambooking.com/du-lich/blog-du-lich/co-mot-nhat-ban-dep-me-man-giua-long-da-lat.html) · [AAA TripCanvas](https://www.aaa.com/tripcanvas/attraction/xq-historical-village-VA21332) · [OSM](https://www.openstreetmap.org/node/4135863789) | cao | có dấu hiệu (8:00–17:30) |
| 5 | Khách sạn Ladalat | khách sạn | Mai Anh Đào · 106A | [trang chính thức](https://ladalathotel.com.vn/) · [mia.vn](https://mia.vn/cam-nang-du-lich/ladalat-hotel-dam-chim-trong-cung-dien-long-lay-sang-trong-5887) · [vietnambooking](https://www.vietnambooking.com/hotel/vietnam/khach-san-ladalat.html) · [OSM](https://www.openstreetmap.org/node/5447660821) | cao | mở |
| 6 | Trường Đại học Đà Lạt | trường đại học | Phù Đổng Thiên Vương · 1 | [Wikipedia](https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_L%E1%BA%A1t) · [SGGP](https://www.sggp.org.vn/truong-dai-hoc-da-lat-gap-mat-65-nam-hinh-thanh-va-phat-trien-post714660.html) · [Tuổi Trẻ](https://tuoitre.vn/truong-dai-hoc-da-lat-hanh-trinh-65-nam-thu-nhan-khai-phong-ban-sac-2023111610494645.htm) · [OSM](https://www.openstreetmap.org/way/969458761) | cao | đang là trường |
| 7 | Bún Bò Huế Công | bún bò Huế | Phù Đổng Thiên Vương · 14 | [Mytour 01/2025](https://mytour.vn/en/blog/xep-hang/top-10-must-visit-long-established-restaurants-in-da-lat-mytour.html) · [OSM](https://www.openstreetmap.org/node/11921362053) · [Foody](https://www.foody.vn/lam-dong/bun-bo-hue-cong) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/mon-ngon-da-lat/) | trung bình | có dấu hiệu (2025) |
| 8 | Gà nướng cơm lam Chiêng | gà nướng cơm lam | Phù Đổng Thiên Vương · 232 | [mia.vn 23/02/2026](https://mia.vn/cam-nang-du-lich/ga-nuong-com-lam-da-lat-20029) · [VinWonders 08/07/2025](https://vinwonders.com/vi/wonderpedia/news/ga-nuong-com-lam-da-lat/) | trung bình | có dấu hiệu (2/2026) |
| 9 | Cơm lam gà nướng Tửu Lầu | gà nướng cơm lam | Phù Đổng Thiên Vương · (108 hay 125) | mia.vn 23/02/2026 (108) · VinWonders 07/2025 (125) | trung bình | có dấu hiệu (2/2026) |
| 10 | Lẩu Gà Lá É Phú Yên | lẩu gà lá é | Phù Đổng Thiên Vương · 178 | [Foody](https://foody.vn/lam-dong/lau-ga-la-e-phu-yen) · [VinWonders 30/07/2025](https://vinwonders.com/vi/bai-viet-du-lich/quan-lau-ga-la-e-da-lat-ngon-nhat/) | trung bình | có dấu hiệu (2025) |

Cả 10 nơi ở phường Lâm Viên - Đà Lạt.

## Cần kiểm thêm (chưa đủ 2 nguồn độc lập, hoặc nguồn lệch)

| Tên | Đường · số nhà | Nguồn có | Vì sao |
|---|---|---|---|
| Quán cơm lam gà nướng Thống Nhất | Mai Anh Đào · 10 | [mia.vn](https://mia.vn/cam-nang-du-lich/ga-nuong-com-lam-mon-an-dan-da-khong-the-bo-qua-khi-du-lich-da-lat-1277) · Vinpearl (không mở được, 403) | chỉ đọc được 1 nguồn |
| German House / German Beer House Dalat | Mai Anh Đào · 223/4 hay 72 | [OSM](https://www.openstreetmap.org/node/9643408087) · [Wanderlog](https://wanderlog.com/place/details/1476035) | tên và số nhà lệch |
| La Mappa (cà phê sân vườn) | Mai Anh Đào · — | [Znews 10/6/2019](https://znews.vn/quan-ca-phe-an-giau-trong-khu-vuon-nho-an-yen-o-da-lat-post952131.html) | 1 nguồn, cũ |
| Onion Coffee and Pastry Da Lat | Phù Đổng Thiên Vương · 278 | [OSM](https://www.openstreetmap.org/node/12534048559) | chỉ OSM |
| Lài (cà phê) | Phù Đổng Thiên Vương · hẻm 12 | [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/cafe-da-lat) | 1 nguồn |
| Quán Tơ (mì Quảng) | Phù Đổng Thiên Vương · 165 | VinWonders (món ngon) | 1 nguồn |
| Tao Ngộ 8 – Lẩu gà lá é | Phù Đổng Thiên Vương · 33 hay 99 | [mia.vn](https://mia.vn/cam-nang-du-lich/quan-lau-ga-la-e-tao-ngo-da-lat-16331) (33) · [OSM](https://www.openstreetmap.org/node/11921431577) (99) | số nhà lệch |
| Xiên nướng than | Phù Đổng Thiên Vương · 15 | VinWonders | 1 nguồn |
| Bánh Tráng Trộn, Gỏi Xoài & Xắp Xắp | Phù Đổng Thiên Vương · 54 | VinWonders | 1 nguồn |
| An Lac Tam 3 | Phù Đổng Thiên Vương · 68 | [OSM](https://www.openstreetmap.org/node/13953856801) | chỉ OSM |
| Memories +84 Gallery | Phù Đổng Thiên Vương · 17 | [OSM](https://www.openstreetmap.org/node/13953793101) | chỉ OSM |

## Chỗ còn nghi
- **Số nhà Thung lũng Tình Yêu**: 3-5-7 (TTC, Wikipedia, mia, Vietnam Airlines, index.vn); Foody 7; Mytour 05-07; một bài mia cũ ghi "357" (gộp nhầm). Dùng 3-5-7.
- **Số nhà Đồi Mộng Mơ**: 5 (Foody, vietnambooking), 05-07 (mia), 3-5-7 (trip.com). Dùng 5.
- **XQ**: mia, Wanderlog ghi 80A; OSM và AAA ghi 258. Dùng 80A → `vi_tri_quan.py` sẽ không khớp điểm OSM (258); cần soát tay nếu muốn gắn vị trí.
- **Bún Bò Huế Công**: 14 (Mytour, OSM) / 1/1B (Foody, VinWonders) / 1A (VinWonders bài khác). Dùng 14.
- **Tửu Lầu**: 108 (mia) / 125 (VinWonders) → để trống `so_nha`.
- **Đường đi**: [Vietnam Airlines](https://www.vietnamairlines.com/go/vi/plan-book/travel/travel-guide/thung-lung-tinh-yeu) ghi từ Ngã năm Đại học theo Phù Đổng Thiên Vương khoảng 2,4 km rồi vào Mai Anh Đào khoảng 1 km tới cổng; đo trên `duong.json`: Phù Đổng Thiên Vương khoảng 2,5 km, Mai Anh Đào khoảng 1,35 km — khớp.
- **Mốc năm** (file chuyện): Viện Đại học Đà Lạt 1957 (Wikipedia) hay 1958 (SGGP, Tuổi Trẻ: khóa đầu); mốc Đồi Mộng Mơ 1978/1992/2003 chỉ VinWonders; XQ lập 1994 chỉ mia; DalaZoo 2026 chỉ tin của TTC; "đập 3 / hồ Đa Thiện 3" chỉ Wikipedia — đều ghi `mot_nguon: true`.
- **Tên cũ**: Vallée d'Amour, Thung lũng Hòa Bình có nhiều nguồn. **Không tìm được nguồn cho "Thung lũng Ái Ân"** → không đưa vào. Tên cũ thời Pháp của hai đường: chưa rõ (blog [tên đường Đà Lạt xưa và nay](https://didulichdalat.wordpress.com/2010/10/24/ten-d%C6%B0%E1%BB%9Dng-da-l%E1%BA%A1t-x%C6%B0a-va-nay/) không có hai đường này).
- **Thiền viện Vạn Hạnh** (gần đó) nằm trên đường Vạn Hạnh theo OSM, không thuộc hai đường của phố → không đưa vào.
- Giờ mở và giá vé lệch giữa các trang; ghi rõ ngày nguồn trong `con_mo`.
