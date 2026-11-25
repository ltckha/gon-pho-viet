# Phố Đồi Chè Cầu Đất — Cầu Đất / Trạm Hành (Xuân Trường cũ) (25/11/2026)

Kết quả: `data/pho/cau-dat.json`, chuyện của phố: `data/chuyen/cau-dat.json`. 7 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 8 mục cần kiểm thêm, chưa thấy nơi nào đã đóng.

Cách làm: kho game không có phố này. Em tải OSM 4 ô quanh Cầu Đất (`api.openstreetmap.org/api/0.6/map`, bbox 108.53–108.59, 11.86–11.92), kiểm từng điểm bằng ranh giới `phuong.json`, rồi tìm từng nơi trên báo, trang du lịch, Foody.
Quy ước nguồn: nhiều bài cùng một trang (mia, VinWonders, Báo Lâm Đồng) chỉ tính 1. Hotels.com/Expedia cùng tập đoàn, tính 1. Không dùng Google Maps, Vinpearl. Chưa đi thực tế.

## Phường

| Đường (tên OSM) | Đoạn | Đơn vị cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Quốc lộ 20 | giáp Xuân Thọ – ngã ba Đất Làng – trạm y tế xã – đầu cầu – ngã ba Trường Sơn – giáp Trạm Hành | xã Xuân Trường | Xuân Trường - Đà Lạt | chắc | [thuviennhadat QL20 xã Xuân Trường](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/mat-tien-quoc-lo-20-xa-xuan-truong) |
| Quốc lộ 20 | giáp Xuân Trường – ngã ba thôn Trường Thọ – hết điểm công nghiệp Phát Chi – đoạn còn lại | xã Trạm Hành | Xuân Trường - Đà Lạt | chắc | [thuviennhadat QL20 xã Trạm Hành](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/mat-tien-quoc-lo-20-xa-tram-hanh) |
| Quốc lộ 20 | ngã ba cây mai Lộc Quý – ngã ba đường tổ 7 (thôn Đa Lộc) | xã Xuân Thọ | Xuân Trường - Đà Lạt | chắc | [thuviennhadat QL20 xã Xuân Thọ](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/mat-tien-quoc-lo-20-xa-xuan-tho) |
| Quốc lộ 20 (bảng giá gọi Hùng Vương) | khúc Trại Mát | Phường 11 | Xuân Trường - Đà Lạt | chắc | [thuviennhadat Hùng Vương (QL20) P11](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/hung-vuong-quoc-lo-20-phuong-11) |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021), thuviennhadat ghi đã hết hiệu lực từ 01/01/2026 nhưng vẫn dùng được để biết đường thuộc xã nào. Đổi theo `data/lam-dong/nq1671.json` mục 102 (Phường 11 + xã Xuân Thọ, Xuân Trường, Trạm Hành → **Xuân Trường - Đà Lạt**).
Trang du lịch ghi lẫn "xã Trạm Hành" (mia) và "xã Xuân Trường" (Vietnam+, VnExpress, danh bạ doanh nghiệp) cho cùng khu đồi chè; cả hai xã đều về một phường nên không ảnh hưởng.
Kiểm chéo `phuong.json`: 394/409 điểm của "Quốc lộ 20" trong `duong.json` nằm trong Xuân Trường - Đà Lạt; điểm OSM "Đồi trà cầu đất", "Phát Chi", hầm số 5, Cloud9 đều nằm trong phường.
Tên đường: trong `duong.json` khu Cầu Đất chỉ có "Quốc lộ 20" có tên (đường nhánh vào đồi chè, Trường Thọ, Phát Chi không tên; "Đường Đất Làng" mia ghi không có trên OSM) → `duong: ["Quốc lộ 20"]`.

## Câu giới thiệu

"Phố Đồi Chè Cầu Đất: theo Quốc lộ 20 chừng 22–25 km về phía đông nam Đà Lạt, tới sở trà người Pháp lập năm 1927 ở độ cao khoảng 1.600–1.650 m; nay còn khoảng 200 ha chè, xưởng chè cũ thành bảo tàng, sáng sớm săn mây trên đồi, xa xa hàng tuabin gió."

| Con số | Nguồn | Ghi chú |
|---|---|---|
| 22–25 km | [Vietnam+ 2019](https://www.vietnamplus.vn/kham-pha-vung-trong-tra-gan-100-nam-tuoi-tai-da-lat-post613650.vnp) 22 km · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/doi-che-cau-dat/) 23 km · [VnExpress 2022](https://vnexpress.net/bao-tang-tra-da-lat-4427714.html), [SGGP 2026](https://www.sggp.org.vn/so-tra-dau-tien-cua-xu-dong-duong-post850083.html), [mia](https://mia.vn/cam-nang-du-lich/kham-pha-cau-dat-farm-14120) 25 km | lệch nhau → ghi khoảng |
| 1927 | [VnExpress 2018](https://vnexpress.net/thoi-su/ly-do-tra-cau-dat-qua-tram-nam-van-thom-ngon-3765604.html), Vietnam+ 2019, SGGP 2026 | SGGP ghi "sở trà đầu tiên ở xứ Đông Dương" năm 1927, bài viết về Cầu Đất |
| 1.600–1.650 m | VnExpress 2018 (trên 1.650 m), [Nhân Dân 2021](https://nhandan.vn/ocop/bao-tang-tra-dau-tien-o-viet-nam-post641126.html) 1.650 m, SGGP 2026 1.600–1.650 m, VinWonders 1.650 m | |
| khoảng 200 ha | Vietnam+ "còn khoảng 200 ha"; mia 220 ha; VinWonders 230 ha | một bài mia khác ghi 250 ha |
| xưởng chè thành bảo tàng | VnExpress 2022, [Doanh nghiệp Hội nhập](https://doanhnghiephoinhap.vn/bao-tang-tra-cau-dat-khong-gian-van-hoa-dac-sac-76562.html), Nhân Dân 2021 | |
| tuabin gió | [Báo Lâm Đồng 2024](https://baolamdong.vn/nhieu-du-an-dien-gio-cham-tien-do-272408.html), [mia](https://mia.vn/cam-nang-du-lich/muon-co-anh-xinh-den-ngay-dien-gio-cau-dat-da-lat-4942), VinWonders | |

## Địa điểm (≥ 2 nguồn)

| # | Tên | Loại | Đặc trưng chính | Địa chỉ | Nguồn | Tin cậy |
|---|---|---|---|---|---|---|
| 1 | Cầu Đất Farm – Đồi chè Cầu Đất | đồi chè, nông trại | Sở trà 1927; 1931 trên 600 ha, nay khoảng 200 ha, 3 ha chè cổ; cổng miễn phí, 7:30–17:00, tour trà 90.000 đ (tham khảo), cà phê 360 độ, cầu gỗ săn mây | thôn Trường Thọ, rẽ từ QL20 | [Vietnam+](https://www.vietnamplus.vn/kham-pha-vung-trong-tra-gan-100-nam-tuoi-tai-da-lat-post613650.vnp) · [VnExpress 2018](https://vnexpress.net/thoi-su/ly-do-tra-cau-dat-qua-tram-nam-van-thom-ngon-3765604.html) · [mia](https://mia.vn/cam-nang-du-lich/kham-pha-cau-dat-farm-14120) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/doi-che-cau-dat/) · [Foody](https://www.foody.vn/lam-dong/doi-che-cau-dat) · [OSM node 11916396494](https://www.openstreetmap.org/node/11916396494) | cao |
| 2 | Bảo tàng trà cổ Cầu Đất Farm | bảo tàng | xưởng chè Pháp xây 1929, khuôn viên 1,2 ha, đón khách từ đầu 2021, máy làm chè gần 100 năm | trong Cầu Đất Farm | [VnExpress 2022](https://vnexpress.net/bao-tang-tra-da-lat-4427714.html) · [Doanh nghiệp Hội nhập](https://doanhnghiephoinhap.vn/bao-tang-tra-cau-dat-khong-gian-van-hoa-dac-sac-76562.html) · [Nhân Dân 2021](https://nhandan.vn/ocop/bao-tang-tra-dau-tien-o-viet-nam-post641126.html) · mia | cao |
| 3 | Bảo tàng trà Long Đỉnh | bảo tàng trà | Công ty CP trà Long Đỉnh, hàng trăm hiện vật, cây chè gần trăm năm | thôn Phát Chi (Trạm Hành cũ) | [Báo Lào Cai/QĐND 2024](https://baolaocai.vn/an-tuong-bao-tang-tra-tai-da-lat-post380061.html) · [Báo Lâm Đồng 2025](https://baolamdong.vn/doc-dao-khong-gian-van-hoa-am-thuc-tra-382999.html) · [mia](https://mia.vn/cam-nang-du-lich/bao-tang-tra-long-dinh-da-lat-18679) · [Klook](https://www.klook.com/activity/114867-da-lat-long-dinh-tea-museum-ticket) | cao |
| 4 | Điện gió Cầu Đất | cảnh tuabin gió | Công ty CP NL tái tạo Đại Dương, hơn 27,5 ha, giai đoạn 1 68,9 MW, đã hoà lưới, nghiệm thu 12/2023; khách ghé chụp ảnh | Trạm Hành cũ / thôn Trường Thọ | [Báo Lâm Đồng 2024](https://baolamdong.vn/nhieu-du-an-dien-gio-cham-tien-do-272408.html) · [GE 2021](https://www.ge.com/news/press-releases/ge-renewable-energy-to-build-the-first-wind-farm-in-lam-dong-province-in-vietnam) · [mia](https://mia.vn/cam-nang-du-lich/muon-co-anh-xinh-den-ngay-dien-gio-cau-dat-da-lat-4942) · VinWonders · [GEM wiki](https://gem.wiki/Cau_Dat_wind_farm) | cao |
| 5 | Ladora Winery | nhà làm rượu vang | Ladofoods, 6 ha ở Phát Chi, khánh thành 2016; xem hầm, nếm vang | QL20, Phát Chi | [Doanh nhân Plus 2016](https://doanhnhanplus.vn/ladofoods-khanh-thanh-nha-lam-ruou-vang-va-ra-mat-san-pham-moi-206787.html) · [winetourism](https://www.winetourism.com/winery/ladora-winery/) | trung bình |
| 6 | Đường hầm hỏa xa (hầm xe lửa cổ) | di tích đường sắt | hầm tuyến răng cưa bỏ hoang, trên đường lên Cầu Đất | QL20, thôn Đa Thọ (Xuân Thọ cũ) | [mia 2025](https://mia.vn/cam-nang-du-lich/duong-ham-xe-lua-co-da-lat-dia-diem-check-in-noi-tieng-tai-da-lat-1377) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/duong-ham-hoa-xa-da-lat/) · OSM node 4380328291 (chưa chắc đúng hầm) | trung bình |
| 7 | Cloud9 & Cloud View Glamping | cắm trại, cà phê săn mây | lều trên đồi, lửa trại, ăn tối nướng | khu săn mây Trường Thọ | [OSM way 1391378373](https://www.openstreetmap.org/way/1391378373) · [Trip.com](https://uk.trip.com/hotels/tram-hanh-hotel-detail-119237139/cloud9-and-cloud-view-glamping) | trung bình |

## Cần kiểm thêm (chưa đủ nguồn hoặc thiếu vị trí)

| Tên | Nguồn | Lý do |
|---|---|---|
| Ga Cầu Đất (Entrerays) | [Wikipedia](https://en.wikipedia.org/wiki/Da_Lat%E2%80%93Thap_Cham_railway), [SGGP 2017](https://www.sggp.org.vn/theo-dau-tich-duong-sat-co-da-lat-phan-rang-post435805.html) | độ cao lệch (1.466 / 1.600 m), không nguồn nào tả hiện trạng, OSM không có điểm ga |
| The Diff House's | [mia](https://mia.vn/cam-nang-du-lich/the-diff-houses-da-lat-20950) | chỉ 1 trang; 066/3 Đường Đất Làng |
| Mộc Trà Farm | [mia](https://mia.vn/cam-nang-du-lich/moc-tra-farm-quan-ca-phe-voi-con-duong-dep-nhu-phim-han-quoc-1542) | chỉ 1 trang; 073/4 Trường An |
| Nơi Này Có Mây, Hiên Nhà Có Mây, San Mây Nhà Gỗ, Ôlong Châu | OSM | chỉ có trên OSM |
| Chợ Trạm Hành, Hồ Suối Cái | [mia](https://mia.vn/cam-nang-du-lich/mot-ngay-o-tram-hanh-khong-gian-chua-lanh-day-nhe-nhang-9734) | chỉ nhắc tên |
| Phở hủ tiếu gà Út, Hải Yến, Gia Huy, Quán cô Thảo | [mia](https://mia.vn/cam-nang-du-lich/san-may-doi-che-cau-dat-19414) | chỉ nhắc tên |
| Nhà thờ, chùa | — | chưa tìm được nơi cụ thể có nguồn |

## Chỗ còn nghi
1. Số lệch giữa các trang: khoảng cách (22–25 km), diện tích chè (200–250 ha), diện tích Long Đỉnh (3,4 ha hay 3.500 m²), số phòng bảo tàng Cầu Đất Farm (5 hay 6), độ cao ga Cầu Đất.
2. Năm: sở trà 1927 (3 nguồn), xưởng 1929 (2 nguồn), máy 1931 (1 nguồn).
3. Điện gió: hợp đồng GE 15 tuabin × 4 MW = 60 MW, lệch 68,9 MW → không ghi số tuabin đang đứng.
4. Hầm hỏa xa báo tả có phải "hầm số 5" trên OSM không — chưa chắc, chưa gắn điểm.
5. Gốc tên Cầu Đất / Trạm Hành: chưa có nguồn. Ý "Yersin phát hiện Hòn Bà (nay là Cầu Đất) năm 1915" chỉ VnExpress 2018 → đánh `mot_nguon`.
6. Không có số nhà cho nơi nào trong danh sách chính; vị trí để trống chờ `vi_tri_quan.py`.
