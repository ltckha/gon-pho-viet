# Phố Trường Xưa — Yersin (25/11/2026)

Kết quả: `data/pho/yersin.json`, chuyện của phố: `data/chuyen/yersin.json`. 10 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 6 nơi cần kiểm thêm, chưa thấy nơi nào ghi đã đóng hẳn.

Cách làm: kho game không có phố này (chỉ có ghi chú OSM "Yersin 4 (cà phê)" trong `2026-11-23_osm_tiem_da_lat.md`). Em tải dữ liệu OSM khu Yersin (`api.openstreetmap.org/api/0.6/map`, bbox 108.4465,11.9375,108.4580,11.9515) để lấy danh sách quán có `addr:street=Yersin`, rồi tìm từng quán trên báo, trang du lịch, Foody.
Quy ước nguồn: 2 bài cùng một trang (2 bài VinWonders, 2 bài mia) chỉ tính 1. Mytour chép gần nguyên bài mia về Cô Bông → không tính riêng. Wikipedia tiếng Việt và tiếng Anh tính 1. Vinpearl không dùng. Không dùng Google Maps. Chưa đi thực tế.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Yersin | Cổng khách sạn Công Đoàn (gần hồ) – đầu đường Nguyễn Trãi | P10 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat yersin-thong-nhat-cu-phuong-10](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/yersin-thong-nhat-cu-phuong-10) |
| Yersin | Đầu đường Nguyễn Trãi – cổng Trường Cao đẳng Sư phạm | P10 | Xuân Hương - Đà Lạt | chắc | cùng trang trên |
| Yersin | Cổng Trường Cao đẳng Sư phạm – Nguyễn Đình Chiểu | P9 | Lâm Viên - Đà Lạt | chắc | [thuviennhadat yersin-thong-nhat-cu-phuong-9](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/yersin-thong-nhat-cu-phuong-9) |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021) ghi tên đường là "Yersin (Thống Nhất cũ)". Đổi phường theo `data/lam-dong/nq1671.json`: mục 99 (Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt), mục 101 (Phường 8, 9, 12 → Lâm Viên - Đà Lạt).
`ward` = **Xuân Hương - Đà Lạt** (đoạn hồ – cổng trường, có nhiều quán nhất).
Kiểm chéo bằng ranh giới `phuong.json`: từ Trần Quốc Toản tới khoảng cổng trường (11.9452, 108.4526) nằm trong Xuân Hương; đoạn trên (khoảng 850 m tới Nguyễn Đình Chiểu) chạy dọc ranh Xuân Hương / Lâm Viên.
Tên trong OSM (`duong.json`, trường `ten`): "Yersin" — khớp (10 đoạn, kể cả nhánh). OSM còn có "KQH Yersin" và "Hẻm 4 Yersin" (không đưa vào `duong`).

**Ga Đà Lạt không nằm trên đường Yersin.** Ga ở đường Quang Trung ([Wikipedia](https://vi.wikipedia.org/wiki/Ga_%C4%90%C3%A0_L%E1%BA%A1t)); từ ngã ba Yersin – Nguyễn Trãi đi theo Nguyễn Trãi khoảng 250 m (đo trên `duong.json`). Vì vậy em không đưa ga vào danh sách địa điểm, chỉ ghi vào mốc năm trong file chuyện.

## Câu giới thiệu
"Phố Trường Xưa: đường Yersin đi từ công viên Yersin bên hồ Xuân Hương lên ngôi trường gạch đỏ Lycée Yersin mở năm 1927 (nay là Trường Cao đẳng Đà Lạt, một trong 1.000 công trình kiến trúc tiêu biểu thế kỷ XX do Hội Kiến trúc sư Thế giới chọn); đầu dốc gần hồ là chỗ ăn sáng với bánh căn Lệ, bánh mì xíu mại Cô Hồng, mì Quảng."
- "1927": [Nhân Dân 24/04/2026](https://nhandan.vn/doc-dao-kien-truc-truong-cao-dang-da-lat-post958014.html) (Petit Lycée khánh thành 1927, dẫn Địa chí Đà Lạt), [Wikipedia](https://en.wikipedia.org/wiki/Lyc%C3%A9e_Yersin) (mở 16/9/1927).
- "1.000 công trình… UIA": [Báo Lâm Đồng 29/01/2026](https://baolamdong.vn/khoac-ao-moi-cho-di-tich-quoc-gia-truong-cao-dang-da-lat-421271.html), [Báo Lâm Đồng 21/07/2026](https://baolamdong.vn/kien-truc-truong-cao-dang-su-pham-da-lat-di-san-the-ky-xx-giua-long-thanh-pho-454619.html), [Nhân Dân](https://nhandan.vn/doc-dao-kien-truc-truong-cao-dang-da-lat-post958014.html).
- Tên "Phố Trường Xưa": đặc trưng thật dễ nhận nhất của đường là ngôi trường; quán ăn, cà phê có nhưng không có nguồn nào đếm số quán → không ghi số.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Trường Cao đẳng Đà Lạt (Lycée Yersin cũ) | di tích kiến trúc, trường | 109 | [Báo Lâm Đồng](https://baolamdong.vn/khoac-ao-moi-cho-di-tich-quoc-gia-truong-cao-dang-da-lat-421271.html) · [Báo Lâm Đồng](https://baolamdong.vn/kien-truc-truong-cao-dang-su-pham-da-lat-di-san-the-ky-xx-giua-long-thanh-pho-454619.html) · [Nhân Dân](https://nhandan.vn/doc-dao-kien-truc-truong-cao-dang-da-lat-post958014.html) · [Wikipedia](https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_Cao_%C4%91%E1%BA%B3ng_S%C6%B0_ph%E1%BA%A1m_%C4%90%C3%A0_L%E1%BA%A1t) · [OSM](https://www.openstreetmap.org/way/971585499) | cao | còn là trường (báo 2026) |
| 2 | Công viên Yersin | công viên, tượng Yersin | (đầu đường) | [SGGP 2008](https://en.sggp.org.vn/da-lat-unveils-statue-of-alexandre-yersin-to-mark-its-115th-anniversary-post34098.html) · [Báo Lâm Đồng 07/10/2026](https://baolamdong.vn/go-vuong-mat-bang-cong-vien-yersin-468111.html) · [Wanderlog](https://wanderlog.com/place/details/2582217) · [OSM](https://www.openstreetmap.org/relation/20594897) | cao | mở |
| 3 | Bánh Căn Lệ | bánh căn | 27/44 (hẻm) | [mia.vn 07/2025](https://mia.vn/cam-nang-du-lich/review-quan-banh-can-le-da-lat-18801) · [VinWonders 07/2025](https://vinwonders.com/vi/bai-viet-du-lich/an-sang-da-lat/) · [Foody](https://www.foody.vn/lam-dong/banh-can-le-yersin) · [Znews 2021](https://znews.vn/4-quan-banh-can-hut-khach-o-da-lat-post1195480.html) · [Mytour](https://mytour.vn/vi/blog/bai-viet/top-nhung-quan-banh-can-ngon-nhat-o-da-lat.html) | cao | có dấu hiệu (2025 ghi phường mới) |
| 4 | Bánh mì xíu mại Cô Hồng | bánh mì xíu mại | 72 | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/banh-mi-xiu-mai-da-lat/) · [mia.vn 07/2026](https://mia.vn/cam-nang-du-lich/banh-mi-xiu-mai-da-lat-18910) · [Toplist](https://toplist.vn/top-list/quan-banh-mi-ngon-nhat-da-lat-57112.htm) · [Foody](https://www.foody.vn/lam-dong/banh-mi-xiu-mai-yersin) · [OSM](https://www.openstreetmap.org/node/7003724789) | cao | có dấu hiệu (mia 7/2026) |
| 5 | Mì Quảng Hội An - Yersin | mì Quảng | 14 (OSM: 14A) | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/mi-quang-da-lat/) · [Toplist](https://toplist.vn/top-list/dia-chi-mi-quang-ngon-nhat-da-lat-30604.htm) · [Mytour](https://mytour.vn/vi/blog/bai-viet/tim-kiem-top-5-quan-mi-quang-ngon-nhat-tai-da-lat.html) · [OSM](https://www.openstreetmap.org/node/6152514285) | cao | có dấu hiệu (VinWonders 7/2025) |
| 6 | Bún Cá Tầm A Huy | bún cá tầm | 21 | [Vietnam Coracle 01/2026](https://vietnamcoracle.com/dalat-where-to-eat-drink) · [OSM](https://www.openstreetmap.org/way/1356812882) | trung bình | có dấu hiệu (Coracle 2026) |
| 7 | Le J' Cafe | cà phê đặc sản | hẻm 51 | [Tatler Asia 15/06/2026](https://www.tatlerasia.com/dining/food/duc-rules-at-his-cafe-lej-vn) · [Spinach](https://spinach.guide/venues/le-j-cafe-191171/) · [Thaiest](https://thaiest.com/vietnam/travel/best-cafes-coffee-shops-in-dalat) · [OSM](https://www.openstreetmap.org/node/13026138101) | cao | có dấu hiệu (Tatler 6/2026) |
| 8 | Tiệm Cà-phê Cô Bông | cà phê hoài cổ | 238 | [Foody](https://www.foody.vn/lam-dong/tiem-ca-phe-co-bong-yersin) · [mia.vn](https://mia.vn/cam-nang-du-lich/ghe-tiem-ca-phe-co-bong-da-lat-mua-mot-ve-tro-ve-tuoi-tho-1562) · [Toplist](https://toplist.vn/top-list/quan-ca-phe-hot-nhat-tai-da-lat-33327.htm) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) · [Caffeinated Excursions](https://caffeinatedexcursions.com/the-complete-guide-to-cafes-in-dalat-vietnam) · [OSM](https://www.openstreetmap.org/node/7140136187) | cao | có dấu hiệu (VinWonders 7/2025) |
| 9 | Tiệm cà phê Hoa Hồng | cà phê nhà gỗ, vườn hồng | 123 | [Foody](https://www.foody.vn/lam-dong/tiem-ca-phe-hoa-hong) · [Toplist](https://toplist.vn/top-list/quan-ca-phe-hot-nhat-tai-da-lat-33327.htm) · [Thaiest](https://thaiest.com/vietnam/travel/best-cafes-coffee-shops-in-dalat) | trung bình | chưa rõ (nguồn mới nhất 2020) |
| 10 | Khách sạn Công Đoàn (Biệt thự Tường Vy) | khách sạn, mốc đầu đường | 1 (mia: 1A) | [OSM](https://www.openstreetmap.org/way/777438261) · [mia.vn](https://mia.vn/cam-nang-du-lich/top-10-khach-san-da-lat-duong-yersin-duoc-nhieu-nguoi-yeu-thich-10488) · [bảng giá đất](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/yersin-thong-nhat-cu-phuong-10) (mốc đầu đường) | trung bình | chưa rõ |

Số 8 và 9 ở đoạn trên (Phường 9 cũ → Lâm Viên - Đà Lạt); các nơi còn lại ở đoạn Phường 10 cũ (Xuân Hương - Đà Lạt).

## Cần kiểm thêm (chưa đủ 2 nguồn độc lập, hoặc nghi đóng)

| Tên | Số nhà | Nguồn có | Vì sao |
|---|---|---|---|
| The Lost Cafe Dalat | 26B | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) | 1 nguồn |
| Bách Du Tea House | 142 | [Toplist](https://toplist.vn/top-list/tiem-ca-phe-tra-banh-ngon-view-dep-nhat-tai-da-lat-33563.htm) · [Wanderlog](https://wanderlog.com/place/details/4361470) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) | Wanderlog (dữ liệu Google) ghi "Temporarily Closed" (xem 25/11/2026) |
| Bánh Mì Xíu Mại 40 Yersin | 40 | [Wanderlog](https://wanderlog.com/place/details/11103188) | 1 nguồn |
| Ốc Yersin - Hải Sản & Món Nướng | 27/57 | [Foody](https://www.foody.vn/lam-dong/oc-yersin) | 1 nguồn, bình luận cũ (2018) |
| Bánh Căn Yersin (vỉa hè) | — | [Foody](https://www.foody.vn/lam-dong/banh-can-yersin) | 1 nguồn, không số nhà |
| Cafe Bồ Công Anh | 1 | [OSM](https://www.openstreetmap.org/way/777438259) | chỉ OSM |

## Chỗ còn nghi
- **Bánh Căn Lệ**: các trang ghi 27/44 Yersin (trong hẻm, Mytour chỉ vào hẻm 27 từ phía Trần Quốc Toản); OSM có điểm "Banh Can Le" ghi 44 Yersin ở mặt đường. Cần soát tay trước khi gắn vị trí.
- **Trường Cao đẳng Đà Lạt**: Wikipedia và OSM ghi số 109; mia.vn ghi 29 → dùng 109.
- **Le J'**: Thaiest ghi "51a … Ward 10", Spinach ghi "Hẻm 51 Yersin". Tatler tải bằng curl bị chặn (403), em đọc qua WebFetch.
- **Bún Cá Tầm A Huy**: số 21 chỉ có ở Vietnam Coracle; OSM có nhà đúng tên sát mặt đường Yersin nhưng không ghi số.
- **Hoa Hồng, Khách sạn Công Đoàn**: không có nguồn 2025–2026 → `con_mo` để "chưa rõ".
- **Giờ mở** các quán ăn lệch nhau giữa các trang (ghi rõ trong `con_mo`).
- **Mốc năm** (file chuyện): Grand Lycée xong 1935 (localvietnam) hay 1941 (Nhân Dân dẫn Địa chí); ga xong 1936 (VnExpress) hay 1938 (Wikipedia); tháp chuông "54 m" (Wikipedia, Báo Lâm Đồng) em thấy bất thường nên chưa đưa vào. Tên cũ Albert Sarraut và năm đổi tên 1993 chỉ có ở [bảng của blog](https://didulichdalat.wordpress.com/2010/10/24/ten-d%C6%B0%E1%BB%9Dng-da-l%E1%BA%A1t-x%C6%B0a-va-nay/) (ghi `mot_nguon: true`); tên Thống Nhất có thêm bảng giá đất.
