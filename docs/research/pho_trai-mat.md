# Phố Tàu Cổ Trại Mát — khu Trại Mát: Huỳnh Tấn Phát, Tự Phước (25/11/2026)

Kết quả: `data/pho/trai-mat.json`, chuyện của phố: `data/chuyen/trai-mat.json`. Có 7 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 9 nơi cần kiểm thêm, chưa thấy nơi nào ghi đã đóng hẳn.

Cách làm: kho game không có Trại Mát. Em tải dữ liệu OSM quanh Trại Mát (`api.openstreetmap.org/api/0.6/map`, bbox 108.486,11.940,108.506,11.952) để lấy các điểm có tên, rồi tìm từng nơi trên báo, Wikipedia, trang du lịch, Foody. Đường của từng nơi lấy theo đường OSM gần nhất (đo trên `duong.json`).
Quy ước nguồn: 2 bài cùng một trang (2 bài VinWonders, 2 bài mia) chỉ tính 1. Vinpearl không dùng. Wikipedia tiếng Việt và tiếng Anh tính 1. Không dùng Google Maps. Chưa đi thực tế.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Huỳnh Tấn Phát (ĐT723) | Vòng xoay Trại Mát (thửa 727, 235 tờ 10) – cầu (thửa 170, 172 tờ 5) | P11 | Xuân Trường - Đà Lạt | chắc | [thuviennhadat huynh-ten-phat-dt723-phuong-11](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/huynh-ten-phat-dt723-phuong-11) (đường dẫn của trang viết sai "ten") |
| Huỳnh Tấn Phát | Đoạn còn lại (phía bắc) | P11 | Xuân Trường (bảng giá) / Lâm Viên (ranh giới) | **chưa rõ** | [thuviennhadat huynh-tan-phat-phuong-11](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/huynh-tan-phat-phuong-11) |
| Tự Phước (bảng giá ghi "Hùng Vương (Quốc lộ 20)") | Huỳnh Tấn Phát – Trường Tiểu học Trại Mát – Nhà Ga – giáp xã Xuân Thọ | P11 | Xuân Trường - Đà Lạt | chắc | [thuviennhadat hung-vuong-quoc-lo-20-phuong-11](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/hung-vuong-quoc-lo-20-phuong-11) |
| Sào Nam, hẻm 31 Sào Nam, Xóm Lèo, Hùng Vương (khúc dốc số 7) | quanh bùng binh | P11 | Xuân Trường - Đà Lạt | khá chắc | Foody/mia ghi "P. 11"; ranh giới `phuong.json` |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021). Đổi phường theo `data/lam-dong/nq1671.json` mục 102: Phường 11 + xã Xuân Thọ, Xuân Trường, Trạm Hành → **Xuân Trường - Đà Lạt**. [VTC News 31/08/2026](https://vtcnews.vn/tai-nan-hy-huu-giua-tau-du-lich-co-o-da-lat-va-oto-con-ar1037422.html) và [Wikipedia Ga Trại Mát](https://vi.wikipedia.org/wiki/Ga_Tr%E1%BA%A1i_M%C3%A1t) cũng ghi phường Xuân Trường - Đà Lạt.
`ward` = **Xuân Trường - Đà Lạt**, độ chắc **chắc** (cho khúc Trại Mát, nơi có tất cả địa điểm).

Kiểm chéo bằng ranh giới `phuong.json`: bùng binh Trại Mát, ga Trại Mát, cả đường Tự Phước nằm trong Xuân Trường. Huỳnh Tấn Phát dài khoảng 6,4 km theo OSM: khoảng 1,9 km phía nam (từ bùng binh lên tới khoảng 11.9566, 108.4881) nằm trong Xuân Trường, khoảng 4,5 km phía bắc nằm trong Lâm Viên - Đà Lạt. Bảng giá thì chỉ ghi Phường 11 cho cả đường → phần phía bắc em để "chưa rõ".

**Tự Phước**: bảng giá 2020 không có tên này; khúc qua ga ghi là "Hùng Vương (Quốc lộ 20)". Nhưng [Tuổi Trẻ 2013](https://tuoitre.vn/chua-manh-chai---linh-phuoc-583186.htm) đã ghi "120 đường Tự Phước". Em chưa tìm được văn bản đặt tên, nên không kết luận đâu là tên cũ.

Tên trong OSM (`duong.json`, trường `ten`): "Huỳnh Tấn Phát" (3 đoạn), "Tự Phước", "Bùng binh Trại Mát", "Xóm Lèo", "Sào Nam", "Hẻm 31 Sào Nam", "Hùng Vương" — đều khớp. Mốc ga trong `duong.json` tên "Trại Mát" (loai: ga). `duong` gồm: Huỳnh Tấn Phát, Tự Phước, Xóm Lèo, Sào Nam, Hùng Vương.

## Câu giới thiệu
"Phố Tàu Cổ Trại Mát: ga cuối của đoạn đường sắt gần 7 km còn chạy tàu du lịch từ ga Đà Lạt (khúc còn lại của tuyến răng cưa Tháp Chàm – Đà Lạt dài khoảng 84 km), sát chùa Linh Phước khảm ve chai có con rồng dài 49 m; chiều tối lên dốc Xóm Lèo đầu đường Huỳnh Tấn Phát ngắm thung lũng nhà kính lên đèn."
- "gần 7 km": [VnExpress 12/04/2024](https://vnexpress.net/mo-tau-dem-da-lat-trai-mat-4733423.html), [VTC 31/08/2026](https://vtcnews.vn/tai-nan-hy-huu-giua-tau-du-lich-co-o-da-lat-va-oto-con-ar1037422.html), [Nhân Dân 2019](https://nhandan.vn/cung-duong-hoai-niem-post371581.html).
- "khoảng 84 km": VTC 31/08/2026, [Wikipedia](https://vi.wikipedia.org/wiki/%C4%90%C6%B0%E1%BB%9Dng_s%E1%BA%AFt_Th%C3%A1p_Ch%C3%A0m_%E2%80%93_%C4%90%C3%A0_L%E1%BA%A1t); VnExpress ghi "hơn 83 km".
- "rồng dài 49 m": [Tuổi Trẻ 2013](https://tuoitre.vn/chua-manh-chai---linh-phuoc-583186.htm), [Báo Pháp Luật 2018](https://baophapluat.vn/nhung-duyen-ngo-ky-la-o-ngoi-chua-ket-thanh-tu-hang-trieu-manh-ve-chai-post293846.html), [Wikipedia](https://en.wikipedia.org/wiki/Linh_Ph%C6%B0%E1%BB%9Bc_Temple), [Foody](https://www.foody.vn/lam-dong/chua-linh-phuoc).
- Tên "Phố Tàu Cổ Trại Mát": đặc trưng dễ nhận nhất là ga cuối tuyến tàu cổ. Quán ăn ở Trại Mát rất ít được viết; không nguồn nào đếm số quán → không ghi số.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Đường OSM · số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Ga Trại Mát | ga xe lửa | Tự Phước · — | [Wikipedia](https://vi.wikipedia.org/wiki/Ga_Tr%E1%BA%A1i_M%C3%A1t) · [VnExpress 2024](https://vnexpress.net/mo-tau-dem-da-lat-trai-mat-4733423.html) · [VTC 08/2026](https://vtcnews.vn/tai-nan-hy-huu-giua-tau-du-lich-co-o-da-lat-va-oto-con-ar1037422.html) · [Nhân Dân 2019](https://nhandan.vn/cung-duong-hoai-niem-post371581.html) · [Tuổi Trẻ 2013](https://tuoitre.vn/tren-7km-duong-ray-539282.htm) · [SGGP 12/2024](https://www.sggp.org.vn/khai-thac-doan-tau-hoang-hau-phuc-vu-du-khach-tai-da-lat-post774695.html) · [Đại Đoàn Kết 2024](https://daidoanket.vn/trai-nghiem-hoa-xa-da-lat-10291022.html) · [OSM](https://www.openstreetmap.org/node/3377406129) | cao | tàu còn chạy (VTC 31/08/2026) |
| 2 | Chùa Linh Phước (chùa Ve Chai) | chùa | Tự Phước · 120 | [Tuổi Trẻ 2013](https://tuoitre.vn/chua-manh-chai---linh-phuoc-583186.htm) · [Báo Pháp Luật 2018](https://baophapluat.vn/nhung-duyen-ngo-ky-la-o-ngoi-chua-ket-thanh-tu-hang-trieu-manh-ve-chai-post293846.html) · [VTC 2023](https://vtcnews.vn/ngoi-chua-nao-co-kien-truc-ve-chai-doc-dao-giu-nhieu-ky-luc-nhat-viet-nam-ar834043.html) · [Wikipedia](https://en.wikipedia.org/wiki/Linh_Ph%C6%B0%E1%BB%9Bc_Temple) · [Foody](https://www.foody.vn/lam-dong/chua-linh-phuoc) · [OSM](https://www.openstreetmap.org/way/1048566814) | cao | mở (mia sửa bài 07/2026) |
| 3 | Thánh thất Cao Đài Đa Phước | thánh thất | Tự Phước · — | [Báo Thanh Tra 2021](https://thanhtra.com.vn/xa-hoi/van-hoa/kham-pha-thanh-that-lon-nhat-viet-nam-cua-dao-cao-dai-187973.html) · [localvietnam 05/2026](https://localvietnam.com/lam-dong/dalat/dalat-cao-dai-temple/) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/thanh-that-da-phuoc/) · [OSM](https://www.openstreetmap.org/node/4698647291) | cao | mở 7:00–19:00, miễn phí (localvietnam 2026) |
| 4 | Panorama Đà Lạt Cafe | cà phê ngắm cảnh | Huỳnh Tấn Phát · — (cạnh vòng xoay) | [Foody](https://www.foody.vn/lam-dong/panorama-da-lat-cafe) · [mia.vn (sửa 10/2025)](https://mia.vn/cam-nang-du-lich/review-cafe-panorama-da-lat-den-day-mot-lan-du-anh-up-nua-nam-2654) · [Toplist](https://toplist.vn/top-list/quan-ca-phe-co-view-nha-kinh-dep-nuoc-uong-ngon-tai-da-lat-33184.htm) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) | trung bình | có dấu hiệu (VinWonders 7/2025) |
| 5 | Xóm Lèo | dốc ngắm hoàng hôn | Xóm Lèo · — | [mia.vn (sửa 08/2026)](https://mia.vn/cam-nang-du-lich/xom-leo-da-lat-toa-do-san-hoang-hon-va-thuong-thuc-ca-phe-cuc-xin-12163) · [vietnambooking 2023](https://www.vietnambooking.com/du-lich/blog-du-lich/xom-leo-da-lat.html) · [Vietnam Airlines](https://www.vietnamairlines.com/gb/vi/plan-book/travel/travel-guide/xom-leo-da-lat) · [Wanderlog](https://wanderlog.com/place/details/4301210) · [OSM](https://www.openstreetmap.org/node/13118691101) | cao | dốc công cộng |
| 6 | Tiệm Cà Phê Túi Mơ To | cà phê nhà vườn | Sào Nam · hẻm 31 | [Foody](https://www.foody.vn/lam-dong/tiem-ca-phe-tui-mo-to) · [Toplist](https://toplist.vn/top-list/quan-ca-phe-co-view-nha-kinh-dep-nuoc-uong-ngon-tai-da-lat-33184.htm) · [Vietnam Coracle 2022](https://vietnamcoracle.com/19-coffee-shops-in-da-lat-with-a-view) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/cafe-da-lat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/trai-mat-da-lat-co-gi-18974) | cao | có dấu hiệu (VinWonders 7/2025) |
| 7 | Sunny Farm Cafe | cà phê ngắm nhà kính | Hùng Vương · — (Dốc số 7) | [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) · [mia.vn (sửa 09/2023)](https://mia.vn/cam-nang-du-lich/sunny-farm-da-lat-ban-muon-vui-ve-u-moi-ban-ve-team-minh-1564) · [OSM](https://www.openstreetmap.org/node/6418806785) | trung bình | có dấu hiệu (VinWonders 7/2025) |

Ga, chùa, thánh thất nằm trên/gần Tự Phước (phía đông bùng binh); Panorama và Xóm Lèo ở đầu Huỳnh Tấn Phát; Túi Mơ To và Sunny Farm ở thung lũng phía tây nam bùng binh. Tất cả trong Xuân Trường - Đà Lạt.

## Cần kiểm thêm

| Tên | Đường · số | Nguồn có | Vì sao |
|---|---|---|---|
| Chợ Trại Mát | — | [Nhân Dân 2019](https://nhandan.vn/cung-duong-hoai-niem-post371581.html) · [Tuổi Trẻ 2013](https://tuoitre.vn/tren-7km-duong-ray-539282.htm) · [mia.vn](https://mia.vn/cam-nang-du-lich/review-trai-mat-da-lat-18972) | đủ nguồn nhắc tên, nhưng không nguồn nào ghi địa chỉ, OSM không có, chưa có nguồn mới xác nhận còn họp |
| Hai Ả Homestay – Cafe | Sào Nam · 77 | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/trai-mat-da-lat-co-gi-18974) | chỉ VinWonders ghi số nhà |
| Thung Lũng Đèn Coffee | Hùng Vương (Dốc số 7) | [Foody](https://www.foody.vn/lam-dong/thung-lung-den-coffee) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) | không có vị trí cụ thể, bình luận Foody cũ |
| Tiệm nướng Xóm Lèo | Huỳnh Tấn Phát | [mia.vn](https://mia.vn/cam-nang-du-lich/tiem-nuong-xom-leo-14084) | 1 nguồn |
| D'Lats - Xông Hơi Công Cộng & Cafe | Sào Nam · hẻm 31 | [Foody](https://www.foody.vn/lam-dong/d-lats-xong-hoi-cong-cong-cafe) | 1 nguồn |
| Kapi Café - Café Capybara Đà Lạt | gần Tự Phước | [OSM](https://www.openstreetmap.org/node/12657835101) | chỉ OSM |
| Lời Của Gió | Huỳnh Tấn Phát | [OSM](https://www.openstreetmap.org/node/11840626298) | chỉ OSM |
| Sữa đậu nành hoàng hôn | Xóm Lèo | [OSM](https://www.openstreetmap.org/node/10694523206) | chỉ OSM |
| Cơm Chay Bồ Đề (OSM: "Com Chay Bô Dê") | gần ga, Tự Phước | [OSM](https://www.openstreetmap.org/node/6029369291) | chỉ OSM, tên không dấu |

## Chỗ còn nghi
- **Huỳnh Tấn Phát phía bắc**: bảng giá ghi Phường 11 nhưng ranh giới mới đặt khoảng 4,5 km phía bắc vào Lâm Viên - Đà Lạt → chưa rõ.
- **Tự Phước / Hùng Vương**: bảng giá 2020 gọi khúc qua ga là Hùng Vương (Quốc lộ 20); báo và OSM gọi Tự Phước. Một số trang cũng ghi "Dốc số 7 đường Tự Phước" (VinWonders) trong khi OSM xếp Dốc số 7 vào Hùng Vương.
- **Panorama**: Foody/mia chỉ "vòng xoay 723" (= Huỳnh Tấn Phát), Toplist ghi "đường Hùng Vương". Em gắn Huỳnh Tấn Phát.
- **Túi Mơ To**: Foody/Toplist ghi hẻm 31 Sào Nam; VinWonders ghi 36 Tự Phước. Em theo hẻm 31 Sào Nam.
- **Chùa Linh Phước**: năm xong 1952 hay 1950; 11 hay 16 kỷ lục Việt Nam. Khuôn viên chùa lùi khoảng 180 m khỏi Tự Phước (OSM).
- **Thánh thất**: "lớn nhất Việt Nam" (Thanh Tra) và "lớn nhất sau Tòa Thánh Tây Ninh" (localvietnam) mâu thuẫn → không dùng chữ "lớn nhất".
- **Xóm Lèo**: Vietnam Airlines viết là "làng cổ do người Pháp xây từ thế kỷ 19" — trái với mia.vn và không có nguồn khác → không dùng.
- Nguồn gốc tên "Trại Mát" (trại nghỉ mát của Bảo Đại / trại công nhân làm đường 1915) chỉ có ở mia.vn.
- Không đọc được trang moc.gov.vn về giảm giá vé tàu (không trả về) → không ghi giá vé.
