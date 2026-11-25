# Phố Ăn Đêm — Tăng Bạt Hổ & Trương Công Định (25/11/2026)

Kết quả: `data/pho/tang-bat-ho.json`. 12 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 2 nơi dự bị (cũng đủ 2 nguồn), 14 nơi cần kiểm thêm.

Cách làm: mở các bài trong `places[].sources` của `street_tang_bat_ho.json` (kho game, chỉ đọc) để lấy **tên quán thật**, rồi tìm thêm nguồn thứ hai. Tên trong game (Mimosa, Sương Mai, Dã Quỳ…) là tên đặt lại, không dùng.
Quy ước nguồn: 2 bài cùng một trang (ví dụ 2 bài Toplist) chỉ tính 1. Bản tiếng Anh trên mytour.vn của bài cocktail Toplist là bản dịch lại → không tính là nguồn riêng. Wanderlog dùng dữ liệu Google Maps (có địa chỉ đã đổi sang "Xuân Hương - Đà Lạt", số đánh giá, trạng thái đóng cửa).
Chưa đi thực tế, chưa mở Google Maps trực tiếp.

## Phường

| Đường | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Trương Công Định | P1 | Xuân Hương - Đà Lạt | chắc | [bảng giá đất TCĐ P1](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/truong-cong-dinh-phuong-1) |
| Tăng Bạt Hổ | P1 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat tang-bat-ho-phuong-1](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tang-bat-ho-phuong-1): danh mục bảng giá đất (QĐ 02/2020, sửa bởi QĐ 16/2021) ghi "Tăng Bạt Hổ (đường chính) / (Đường nhánh 1) / (Đường nhánh 2) - PHƯỜNG 1". Bảng chi tiết hiện "Không có dữ liệu" khi tải bằng máy. Các bài quán cũng ghi "Phường 1" (mia.vn, Foody) |

Đổi phường theo `data/lam-dong/nq1671.json` mục 99: Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt.
Tên trong OSM (`duong.json`, trường `ten`): "Tăng Bạt Hổ", "Trương Công Định" — khớp.

## Câu giới thiệu
"Phố Ăn Đêm sau chợ Đà Lạt: dốc Tăng Bạt Hổ sáng bánh căn, bánh ướt lòng gà, tối sữa đậu nành nóng; rẽ sang Trương Công Định là hostel, cà phê đồ cũ và bar dưới tầng hầm." (không có con số; từng ý lấy từ các nơi bên dưới)

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Địa chỉ | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Bánh căn Cây Bơ | bánh căn, sáng | 56 Tăng Bạt Hổ | [VinWonders 14/07/2025](https://vinwonders.com/vi/wonderpedia/news/banh-khot-da-lat/) · [Toplist](https://www.toplist.vn/top-list/dia-chi-an-cuc-ngon-tai-duong-tang-bat-ho-ma-ban-khong-nen-bo-qua-khi-den-voi-da-lat-27259.htm) · [Foody](https://www.foody.vn/lam-dong/banh-can-cay-bo) · [Wanderlog](https://wanderlog.com/place/details/4854630/b%C3%A1nh-c%C4%83n-c%C3%A2y-b%C6%A1) | cao | có dấu hiệu (VinWonders 7/2025 ghi phường mới) |
| 2 | Quán Hoa Sữa | sữa đậu nành nóng, chiều tối | 64 Tăng Bạt Hổ (Toplist ghi 3F) | [VinWonders 08/07/2025](https://vinwonders.com/vi/wonderpedia/news/sua-dau-nanh-da-lat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/thuong-thuc-sua-dau-nanh-nong-thom-giua-tiet-troi-da-lat-se-lanh-1299) · [Toplist](https://www.toplist.vn/top-list/dia-chi-an-cuc-ngon-tai-duong-tang-bat-ho-ma-ban-khong-nen-bo-qua-khi-den-voi-da-lat-27259.htm) · [Foody](https://www.foody.vn/lam-dong/quan-hoa-sua-tang-bat-ho) | cao | có dấu hiệu (VinWonders 7/2025) |
| 3 | Liên Bánh Ướt Lòng Gà | bánh ướt lòng gà | 44 Tăng Bạt Hổ | [Toplist](https://www.toplist.vn/top-list/dia-chi-an-cuc-ngon-tai-duong-tang-bat-ho-ma-ban-khong-nen-bo-qua-khi-den-voi-da-lat-27259.htm) · [mia.vn 18/01/2026](https://mia.vn/cam-nang-du-lich/banh-uot-long-ga-da-lat-19912) | cao | có dấu hiệu (mia 1/2026) |
| 4 | Bánh ướt lòng gà Trang | bánh ướt lòng gà | 15F Tăng Bạt Hổ | [VinWonders 03/07/2025](https://vinwonders.com/vi/bai-viet-du-lich/banh-uot-long-ga-da-lat/) · [mia.vn 18/01/2026](https://mia.vn/cam-nang-du-lich/banh-uot-long-ga-da-lat-19912) | cao | có dấu hiệu (mia 1/2026) |
| 5 | Bánh ướt lòng gà – Bánh căn Chip Chip | bánh ướt, bánh căn | Tăng Bạt Hổ, số nhà lệch (28 / 4) | [VinWonders](https://vinwonders.com/vi/bai-viet-du-lich/banh-uot-long-ga-da-lat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/banh-uot-long-ga-da-lat-19912) | trung bình | có dấu hiệu (mia 1/2026) |
| 6 | Bánh căn 07 Tăng Bạt Hổ | bánh căn, trưa–tối | 7 Tăng Bạt Hổ | [Toplist](https://www.toplist.vn/top-list/dia-chi-an-cuc-ngon-tai-duong-tang-bat-ho-ma-ban-khong-nen-bo-qua-khi-den-voi-da-lat-27259.htm) · [VinWonders 16/07/2025](https://vinwonders.com/vi/wonderpedia/news/12-quan-banh-can-da-lat-sieu-ngon/) | trung bình | không rõ |
| 7 | Bicycle Up Cafe | cà phê đồ cũ | 82 Trương Công Định | [mia.vn](https://mia.vn/cam-nang-du-lich/review-bicyle-up-cafe-quan-cafe-voi-khong-gian-retro-dac-biet-giua-long-da-lat-2693) · [Toplist](https://toplist.vn/top-list/quan-ca-phe-co-kinh-don-tim-du-khach-o-da-lat-31672.htm) · [Foody](https://www.foody.vn/lam-dong/bicycle-up-cafe) | cao | không rõ |
| 8 | On The Rocks Cocktail Bar | bar dưới tầng hầm | tầng hầm 69 Trương Công Định | [Toplist](https://toplist.vn/top-list/quan-cocktail-bar-dang-cap-nhat-tai-tp-da-lat-lam-dong-57973.htm) · [Mytour](https://mytour.vn/vi/blog/bai-viet/kham-pha-9-quan-ruou-khong-the-bo-qua-khi-den-da-lat.html) · [Wanderlog](https://wanderlog.com/list/geoCategory/248821) | cao | có dấu hiệu (Google: địa chỉ phường mới, 1.121 đánh giá, không ghi đóng) |
| 9 | B21 Bar | bar, DJ tối | 68 Trương Công Định | [Toplist](https://toplist.vn/top-list/quan-cocktail-dep-nhat-tai-da-lat-57085.htm) · [Wanderlog](https://wanderlog.com/list/geoCategory/248821) | cao | có dấu hiệu (Google: địa chỉ phường mới) |
| 10 | Woody Classic Bar | bar cocktail nhỏ | 49A Trương Công Định | [Toplist](https://toplist.vn/top-list/quan-cocktail-dep-nhat-tai-da-lat-57085.htm) · [Wanderlog](https://wanderlog.com/list/geoCategory/248821) · [Foody](https://www.foody.vn/lam-dong/bar-pub-phuc-vu-bia) | cao | có dấu hiệu (Google: phường mới, 404 đánh giá) |
| 11 | Fox's Den | bar cocktail kín | 56 Tăng Bạt Hổ | [Toplist](https://toplist.vn/top-list/quan-cocktail-bar-dang-cap-nhat-tai-tp-da-lat-lam-dong-57973.htm) · [Wanderlog](https://wanderlog.com/place/details/1781655/foxs-den) | trung bình | không rõ — danh sách Wanderlog ghi "tạm đóng" |
| 12 | Dalat YOLO Hostel (Yolo Hostel n Bar) | hostel + bar | 31 Trương Công Định | [hostelmanagement](https://hostelmanagement.com/vietnam/dalat/dalat-yolo-hostel) · [Mytour](https://mytour.vn/vi/blog/bai-viet/da-lat-kham-pha-yolo-hostel-n-bar-trai-nghiem-moi-tai-da-lat.html) · [Ostrovok](https://ostrovok.ru/hotel/vietnam/da_lat/mid6796041/dalat_yolo_hostel) | cao | không rõ |

Dự bị (đủ 2 nguồn, để ngoài 12): Moi Craft Beer, 38 Trương Công Định (Toplist + Wanderlog; Foody ghi 49B) · Beepub Hostel, 74 Trương Công Định (Toplist + Foody; bình luận mới nhất 2018).

Đối chiếu với game (để `build_pho.py` biết loại nào ứng với quán thật nào): sữa nóng → Quán Hoa Sữa; bánh căn → Bánh căn 07 / các quán bánh căn trên dốc; quán sáng gốc cây → Bánh căn Cây Bơ; hostel thuê xe → Dalat YOLO Hostel; bar hầm → On The Rocks; cà phê xe đạp → Bicycle Up Cafe. Tiệm bánh quà, khách sạn mini, tiệm ăn vặt, giặt sấy: game không có nguồn, em cũng chưa tìm.

## Cần kiểm thêm (1 nguồn, lệch số, hoặc đã đóng)

| Tên | Địa chỉ | Nguồn | Vì sao |
|---|---|---|---|
| Quán Hen (sữa đậu nành) | 50 Tăng Bạt Hổ | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/sua-dau-nanh-da-lat/) | 1 nguồn |
| Phở Hiếu | 23 Tăng Bạt Hổ | [VinWonders 05/07/2025](https://vinwonders.com/vi/wonderpedia/news/pho-da-lat/) | 1 nguồn; game ghi có 1 quán phở đã dời khỏi Tăng Bạt Hổ, chưa rõ là quán nào |
| Phở Bắc Nam | 1C Tăng Bạt Hổ | Toplist (bài Tăng Bạt Hổ) | 1 nguồn |
| Bánh mì xíu mại 3B | 3B Tăng Bạt Hổ | Toplist | 1 nguồn |
| Bánh ướt lòng gà 18 | 18 Tăng Bạt Hổ | Toplist | 1 nguồn |
| Quán Phố | 5 Tăng Bạt Hổ | Toplist | 1 nguồn |
| Bánh căn 14 (hai Cô) | 30 Tăng Bạt Hổ | [mia.vn](https://mia.vn/cam-nang-du-lich/banh-can-da-lat-top-nhung-quan-ngon-nhat-tai-thanh-pho-suong-mu-1343) | 1 nguồn ghi tên này; có thể trùng "Bánh căn Tăng Bạt Hổ, số 14" của VinWonders |
| Don Quixote (bar) | 19 Tăng Bạt Hổ | Wanderlog | 1 nguồn |
| Quán bánh ướt 21 Trương Công Định | 21 Trương Công Định | VinWonders | 1 nguồn, không có tên |
| Gemination Eatery & Bar | 24 Trương Công Định | Wanderlog | 1 nguồn |
| NO bar | 63 Trương Công Định | Wanderlog | 1 nguồn |
| Coi Kissa + Bossa Jazz Spot | 60 hoặc 69 Trương Công Định | [Vietcetera 12/2021](https://vietcetera.com/en/blending-cocktails-and-the-arts-at-cu-ru-and-bossa-jazz-spot-in-da-lat) · Mytour | lệch số nhà, bài cũ |
| The Fog Bar | 76 Trương Công Định | Toplist · [Tatinta](https://tatinta.com/diem-den/the-fog-bar-da-lat/3076) · [Wanderlog](https://wanderlog.com/place/details/1482627/the-fog-on-site) | Google ghi **đã đóng hẳn** |
| The Chairman | 30 Trương Công Định | Wanderlog | 1 nguồn, Google ghi đã đóng hẳn |

## Chỗ còn nghi
1. **Số nhà Tăng Bạt Hổ đã đổi**: Hoa Sữa ghi 64 (VinWonders, mia, Foody) và 3F (Toplist); kết quả tìm kiếm Foody có "3F (số 64 cũ)". Chip Chip ghi 28 hoặc 4. Nhiều quán "bánh căn Tăng Bạt Hổ" ghi số 4, 7, 14, 30 — chưa tách được đâu là một quán. Cần đi thực tế hoặc chụp biển.
2. **Số 56 Tăng Bạt Hổ** vừa là Bánh căn Cây Bơ (sáng) vừa là Fox's Den (tối); Fox's Den đang ghi "tạm đóng" ở 1 trang.
3. **Tầng hầm số 69 Trương Công Định**: kết quả tìm kiếm có nhắc trang trvlogue.com gọi chỗ này là "Karma Lounge" (em không đọc được trang đó). Mytour lại ghi Bossa Jazz Spot cùng số 69.
4. "Còn mở" chủ yếu dựa vào bài tổng hợp cập nhật 7/2025–1/2026 và dữ liệu Google qua Wanderlog — không phải xác nhận trực tiếp.
5. Không thấy lỗi gì trong file game cần báo; ghi chú của game "1 quán phở đã dời khỏi Tăng Bạt Hổ" khớp với việc em chưa đủ nguồn cho Phở Hiếu / Phở Bắc Nam.
