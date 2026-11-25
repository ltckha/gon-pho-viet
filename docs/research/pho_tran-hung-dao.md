# Phố Biệt Thự Pháp — Trần Hưng Đạo (25/11/2026)

Kết quả: `data/pho/tran-hung-dao.json`, chuyện của phố: `data/chuyen/tran-hung-dao.json`. 9 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 9 nơi cần kiểm thêm, 1 nơi đã đóng (không đưa vào).

Cách làm: kho game không có phố này (tìm "Trần Hưng Đạo" trong `content/`, `docs/` không ra). Em tải dữ liệu OSM khu Trần Hưng Đạo (`api.openstreetmap.org/api/0.6/map`, bbox 108.4395,11.9320,108.4600,11.9420), lấy các nơi có `addr:street=Trần Hưng Đạo` hoặc cách đường dưới 90 m, rồi tìm từng nơi trên báo, trang du lịch, Foody.
Quy ước nguồn: 2 bài cùng một trang (2 bài VinWonders, 2 bài mia) chỉ tính 1. Wanderlog lấy dữ liệu Google nên chỉ dùng để xem còn mở, ghi rõ. Vinpearl không dùng. Không dùng Google Maps. Chưa đi thực tế.

**Gợi ý "Dinh Tỉnh trưởng" không đúng với đường này**: mia.vn (17/05/2025) ghi Dinh Tỉnh trưởng ở 1 Lý Tự Trọng (Trung tâm Văn hoá Nghệ thuật Lâm Đồng dùng). Dinh trên đường Trần Hưng Đạo là **Dinh 2 (dinh Toàn quyền)**, số 12.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Trần Hưng Đạo | Trần Phú – hết Đài Phát thanh Truyền hình Lâm Đồng (số 10) | P3 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat tran-hung-dao-phuong-3](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-hung-dao-phuong-3) |
| Trần Hưng Đạo | Đài PTTH Lâm Đồng – Sở Điện lực Lâm Đồng, UBND Phường 10 (cũ) | P10 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat tran-hung-dao-phuong-10](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-hung-dao-phuong-10) |
| Trần Hưng Đạo | Nhánh: thửa 108 tờ 27 – ngã ba thửa 123 tờ 27 | P10 | Xuân Hương - Đà Lạt | chắc | cùng trang trên (chỉ ghi số thửa, chưa định được trên bản đồ) |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021). Đổi phường theo `data/lam-dong/nq1671.json` mục 99 (Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt): cả hai phường cũ đều vào **Xuân Hương - Đà Lạt**, nên cả đường một phường.
Kiểm chéo bằng ranh giới `phuong.json`: 8 điểm dọc đường, từ Trần Phú (108.4411, 11.9367) tới đầu phía đông (108.4580, 11.9400), đều nằm trong Xuân Hương - Đà Lạt.
Đài PTTH Lâm Đồng ở số 10: [Báo Lâm Đồng 17/06/2025](https://baolamdong.vn/chuan-bi-tru-so-lam-viec-va-cho-o-cho-can-bo-cong-chuc-den-da-lat-lam-viec-tu-ngay-1-7-270634.html) (đài sẽ dời khỏi số 10).
Tên trong OSM (`duong.json`, trường `ten`): "Trần Hưng Đạo" — khớp (13 đoạn, gồm các đoạn một chiều ở vòng xoay đầu đường). OSM còn có "Hẻm 02 Trần Hưng Đạo" và "2 Trần Hưng Đạo" (đường nội bộ) — không đưa vào `duong`.

## Câu giới thiệu
"Phố Biệt Thự Pháp: đường Trần Hưng Đạo (thời Pháp tên Paul Doumer) chạy trên đồi thông phía nam hồ Xuân Hương, qua Dinh 2 – dinh Toàn quyền Đông Dương xây 1933–1937 – và cụm biệt thự Pháp nay là Dalat Cadasa Resort; là một trong hai khu biệt thự được quy hoạch bảo tồn của Đà Lạt (cùng khu Lê Lai), có trụ sở UBND tỉnh và vài quán cà phê nhìn ra hồ."
- "Paul Doumer": [bảng tên đường xưa và nay (blog)](https://didulichdalat.wordpress.com/2010/10/24/ten-d%C6%B0%E1%BB%9Dng-da-l%E1%BA%A1t-x%C6%B0a-va-nay/), [mia.vn 23/07/2026](https://mia.vn/cam-nang-du-lich/dinh-2-da-lat-dinh-toan-quyen-decoux-dinh-thu-xa-hoa-long-lay-giua-doi-thong-1309).
- "1933–1937": [Tuổi Trẻ News 12/02/2018](https://news.tuoitre.vn/untold-stories-of-da-lat-p3-royal-partition-10344111.htm), [mia.vn](https://mia.vn/cam-nang-du-lich/dinh-2-da-lat-dinh-toan-quyen-decoux-dinh-thu-xa-hoa-long-lay-giua-doi-thong-1309); OSM ghi năm xây 1937.
- "hai khu biệt thự được quy hoạch bảo tồn (cùng khu Lê Lai)": [Báo Pháp luật 25/01/2011](https://baophapluat.vn/kien-truc-co-hon-pho-da-lat-post95106.html) ("xác định 2 khu bảo tồn kiến trúc là khu biệt thự Lê Lai và khu biệt thự Trần Hưng Đạo"); [SGGP 01/12/2024](https://www.sggp.org.vn/nhat-nhoa-di-san-canh-quan-kien-truc-da-lat-post770861.html) cũng nêu cặp hai khu này (đã phục hồi, tôn tạo).
- Không ghi số biệt thự Cadasa vào câu vì các nguồn vênh: 16 căn ([VietnamFinance 30/10/2020](https://vietnamfinance.vn/theo-dong-lich-su-dalat-cadasa-resort-thien-duong-phap-giua-long-da-lat-d57284.html), [VOV 12/07/2011](https://english.vov.vn/en/travel/old-villas-amidst-flowers-242619.vov)) và 13 căn ([Báo Đầu tư 24/06/2021](https://baodautu.vn/lam-dong-nho-toa-an-doi-lai-tai-san-cong-d145619.html), Báo Pháp luật 2011).
- Tên "Phố Biệt Thự Pháp": đặc trưng dễ nhận nhất là dinh và các biệt thự Pháp; quán ăn, cà phê có nhưng ít, không nguồn nào đếm.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Dinh 2 (Dinh Toàn quyền) | dinh thự thời Pháp | 12 | [mia.vn 23/07/2026](https://mia.vn/cam-nang-du-lich/dinh-2-da-lat-dinh-toan-quyen-decoux-dinh-thu-xa-hoa-long-lay-giua-doi-thong-1309) · [VinWonders 09/12/2025](https://vinwonders.com/vi/wonderpedia/news/dinh-bao-dai-da-lat/) · [Tuổi Trẻ News 2018](https://news.tuoitre.vn/untold-stories-of-da-lat-p3-royal-partition-10344111.htm) · [tatinta](https://tatinta.com/en/diem-den/dinh-ii-da-lat/8254) · [OSM](https://www.openstreetmap.org/way/777438901) | cao | mở hạn chế (nhà khách UBND tỉnh; mia: 7:30–17:00, vé 30.000 đ, nên hỏi trước) |
| 2 | Dalat Cadasa Resort (cụm biệt thự cổ) | cụm biệt thự Pháp, khu nghỉ dưỡng | 16 | [VietnamFinance](https://vietnamfinance.vn/theo-dong-lich-su-dalat-cadasa-resort-thien-duong-phap-giua-long-da-lat-d57284.html) · [VOV](https://english.vov.vn/en/travel/old-villas-amidst-flowers-242619.vov) · [mia.vn](https://mia.vn/cam-nang-du-lich/me-man-ve-dep-co-kinh-cua-dalat-cadasa-resort-5543) · [Foody](https://www.foody.vn/lam-dong/cadasa-da-lat) · [Báo Đầu tư](https://baodautu.vn/lam-dong-nho-toa-an-doi-lai-tai-san-cong-d145619.html) · [Báo Lâm Đồng 29/10/2026](https://baolamdong.vn/danh-thuc-nguon-luc-tu-nhung-biet-thu-cong-da-lat-471832.html) · [OSM](https://www.openstreetmap.org/way/515193501) | cao | chưa rõ (Báo Lâm Đồng 10/2026: vắng khách, xuống cấp trở lại; tỉnh kiện đòi lại 13 biệt thự từ 2017) |
| 3 | Trụ sở UBND tỉnh Lâm Đồng | trụ sở tỉnh, mốc quen | 4 | [Cổng TTĐT Chính phủ](https://chinhphu.vn/thong-tin-tinh-thanh?city=1365) · [Báo Lâm Đồng 17/06/2025](https://baolamdong.vn/chuan-bi-tru-so-lam-viec-va-cho-o-cho-can-bo-cong-chuc-den-da-lat-lam-viec-tu-ngay-1-7-270634.html) · [OSM](https://www.openstreetmap.org/way/542486101) | cao | cơ quan, không tham quan |
| 4 | Bánh canh Phan Rang Dung | bánh canh chả cá | 15 | [Foody](https://www.foody.vn/lam-dong/dung-banh-canh-cha-cuon) · [VinWonders 16/07/2025](https://vinwonders.com/vi/wonderpedia/news/banh-canh-da-lat/) · [mia.vn 18/01/2026](https://mia.vn/cam-nang-du-lich/banh-canh-da-lat-19914) · [OSM](https://www.openstreetmap.org/node/6165405886) | cao | có dấu hiệu (mia 1/2026) |
| 5 | Sunshine Coffee (Sunshine Tím) | cà phê nhìn ra hồ | 9 | [VinWonders 15/07/2025](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/sunshine-tim-diem-hen-ho-doc-dao-voi-phong-cach-bohemian-1541) · [Foody](https://www.foody.vn/lam-dong/sunshine-coffee-tran-hung-dao) · [Wanderlog](https://wanderlog.com/place/details/1324471) · [OSM](https://www.openstreetmap.org/node/4926652122) | cao | có dấu hiệu (Wanderlog ghi phường mới, 7:00–22:00) |
| 6 | Nhà Lồng Coffee (The Green House) | cà phê nhà kính | 6A | [mia.vn](https://mia.vn/cam-nang-du-lich/nha-long-coffee-quan-cafe-lung-linh-voi-view-thung-lung-cuc-dep-1528) · [VinWonders 15/07/2025](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) · [Foody](https://www.foody.vn/lam-dong/nha-long-coffee) · [OSM "Nha Long"](https://www.openstreetmap.org/node/7101246971) | cao | có dấu hiệu (VinWonders 7/2025) |
| 7 | Sương Mai (buffet chay) | quán chay | 8 (OSM: 8B) | [HappyCow](https://www.happycow.net/reviews/suong-mai-da-lat-160210) · [Spinach](https://spinach.guide/venues/suong-mai-190361/) · [Wanderlog](https://wanderlog.com/place/details/1762469) · [OSM](https://www.openstreetmap.org/node/5950492626) | trung bình | có dấu hiệu (Spinach, Wanderlog ghi phường mới, 7:00–19:00) |
| 8 | Hoa Violet Café | cà phê trong biệt thự Pháp | 14 | [Foody](https://www.foody.vn/lam-dong/hoa-violet-cafe) · [OSM](https://www.openstreetmap.org/way/1302653954) | trung bình | chưa rõ (bình luận mới nhất 2018) |
| 9 | Nhà hàng Đà Lạt Xưa (Villa HQ) | nhà hàng món Việt, gà nướng cơm lam | 27 | [Foody](https://www.foody.vn/lam-dong/nha-hang-da-lat-xua) · [VinWonders 08/07/2025](https://vinwonders.com/vi/wonderpedia/news/ga-nuong-com-lam-da-lat/) | trung bình | chưa rõ (Foody mới nhất 2019) |

Tất cả thuộc Xuân Hương - Đà Lạt.

## Cần kiểm thêm (chưa đủ 2 nguồn độc lập)

| Tên | Số nhà | Nguồn có | Vì sao |
|---|---|---|---|
| Gà nướng cơm lam Lửa Hồng | 2 | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/ga-nuong-com-lam-da-lat/) | 1 nguồn; số 2 là HĐND tỉnh, có thể ở hẻm 2 |
| Nem nướng Bà Hùng (chi nhánh) | 3 | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/an-gi-o-da-lat/) | 1 nguồn; dòng tìm kiếm Airbnb ghi "Permanently closed" nhưng em mở trang thì lỗi → chưa rõ còn hay đóng |
| Mộc Coffee | 15A | [Foody](https://www.foody.vn/lam-dong/moc-coffee-tran-hung-dao) | 1 nguồn, bình luận 2018–2019 |
| Nhà hàng Ming | 7 | [Foody](https://www.foody.vn/lam-dong/nha-hang-ming-tran-hung-dao) | 1 nguồn, bình luận 2018–2019 |
| Vườn Hạt Dẻ | — | [OSM](https://www.openstreetmap.org/way/1304080965) | chỉ OSM |
| Coffee Em và Trịnh | — | [OSM](https://www.openstreetmap.org/node/12845217201) | chỉ OSM |
| Nhà sáng tác Đà Lạt - Lâm Đồng | — | [OSM](https://www.openstreetmap.org/way/1304080968) | chỉ OSM |
| Lang Ko Ho farmstay | — | [OSM](https://www.openstreetmap.org/node/14088928801) | chỉ OSM, chưa chắc mở ra đường này |
| Biệt thự công số 3 và số 5 | 3, 5 | [Báo Lâm Đồng 29/10/2026](https://baolamdong.vn/danh-thuc-nguon-luc-tu-nhung-biet-thu-cong-da-lat-471832.html) | 1 nguồn, đang xuống cấp, không phải điểm tham quan |

## Đã đóng (không đưa vào)

| Tên | Số nhà | Nguồn |
|---|---|---|
| Brew and Breakfast | 2 (trong hẻm) | [HappyCow](https://www.happycow.net/reviews/brew-and-breakfast-da-lat-104422): "Confirmed closed, Apr 2021". OSM vẫn còn điểm [node/5470270058](https://www.openstreetmap.org/node/5470270058). |

## Chỗ còn nghi
- **Dinh 2**: hay bị gọi "Dinh Bảo Đại 2" (VinWonders, tatinta); Tuổi Trẻ News và mia ghi là dinh Toàn quyền. Decoux làm Toàn quyền từ 1940, sau khi dinh xây xong, nên em chỉ ghi "Decoux dùng làm dinh nghỉ hè", không ghi ai cho xây.
- **Cadasa**: 13 hay 16 biệt thự (xem trên); năm trùng tu 2006 (VietnamFinance) hay 2010 (VOV); đang kinh doanh tới đâu chưa rõ.
- **Hoa Violet Café**: số 14 chỉ có ở Foody; toà OSM nằm sát cụm Cadasa, có thể là một căn của Cadasa.
- **Sương Mai**: Báo Lâm Đồng 6/2025 ghi toà số 8 sẽ giao cho UBND tỉnh; quán ghi 8/8B — chưa rõ có bị ảnh hưởng.
- **Gắn vị trí**: tên OSM khác tên thật ("Nha Long", "Sunshine cafe", "Súóng Mai", "Bánh canh chả cá Phan Rang", "Dinh Toàn Quyền", "Khu nghỉ dưỡng Biệt thự cổ Đà Lạt Cadasa"); nhiều nơi OSM không có số nhà → `vi_tri_quan.py` có thể không khớp, cần soát tay và thêm `ALIAS`.

## Kiểm thêm 25/11/2026

Tìm thêm nguồn cho các nơi trong "Cần kiểm thêm" (WebSearch + đọc trang bằng curl; không dùng Google Maps). Cách tính: ≥ 2 trang khác nhau; VinWonders/Vinpearl tính 1; bài chép lại tính 1.

**Chuyển sang danh sách chính: 2 nơi. Đã đóng hẳn: 0.**

| Tên | Số nhà | Nguồn | Độ tin cậy | Còn mở? |
|---|---|---|---|---|
| Gà nướng cơm lam Lửa Hồng | 2 (nhiều khả năng đầu hẻm 2) | [VinWonders 08/07/2025](https://vinwonders.com/vi/wonderpedia/news/ga-nuong-com-lam-da-lat/) · [Mytour 1/11/2026](https://mytour.vn/vi/blog/xep-hang/top-5-quan-ga-nuong-com-lam-da-lat-thom-ngon-dam-da-huong-vi-nui-rung-mytour.html) · [Trip.com](https://ph.trip.com/restaurant/vietnam/dalat/detail/G%C3%80%20N%C6%AF%E1%BB%9ANG%20C%C6%A0M%20LAM%20%C4%90%C3%80%20L%E1%BA%A0T%20L%E1%BB%ACA%20H%E1%BB%92NG-150681490) | cao | có dấu hiệu (Trip.com ghi phường mới) |
| Nem nướng Bà Hùng (cơ sở Trần Hưng Đạo) | 3 | [VinWonders 13/07/2025](https://vinwonders.com/vi/wonderpedia/news/an-gi-o-da-lat/) · [Toplist](https://toplist.vn/top-list/quan-an-dem-ngon-nhat-tai-da-lat-37718.htm) · [Mytour 1/11/2026](https://mytour.vn/vi/blog/bai-viet/bat-mi-top-5-quan-nem-nuong-chuan-vi-da-lat-mytour.html) | trung bình | **không rõ** — đoạn trích Airbnb ghi "Permanently closed", không mở được trang để xác nhận |

Mộc Coffee (15A): Wanderlog trang Tỏi Đen Coffee Roastery nay ghi 15A Trần Hưng Đạo → số 15A có thể đã là Tỏi Đen; chỉ 1 nguồn nên chưa ghi Mộc Coffee đóng hẳn.

Vẫn chưa đủ: các nơi chỉ có OSM/Foody còn lại chưa kịp tìm lần này.
