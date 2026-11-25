# Phố Chân Núi — Lang Biang (Lạc Dương cũ) (25/11/2026)

Kết quả: `data/pho/lang-biang.json`, chuyện của phố: `data/chuyen/lang-biang.json`. 10 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 9 nơi cần kiểm thêm, chưa thấy nơi nào ghi đã đóng hẳn.

Cách làm: kho game không có phố này (chỉ có dòng NQ 1671 trong `dia_gioi_2025.md`). Em tải OSM hai ô (`api.openstreetmap.org/api/0.6/map`, bbox 108.405,12.000,108.445,12.050 và 108.355,11.985,108.40,12.035), tra Nominatim (OSM) cho Cù Lần, Ankroet, Thung Lũng Vàng, rồi tìm từng nơi trên báo, trang du lịch, Foody.
Quy ước nguồn: 2 bài cùng một trang (2 bài Báo Lâm Đồng, 2 bài mia, 2 bài VinWonders) chỉ tính 1. Wikipedia tiếng Việt và tiếng Anh tính 1. Vinpearl không dùng. Không dùng Google Maps (Wanderlog có dữ liệu lấy từ Google, chỉ dùng để xem còn mở). Chưa đi thực tế.

## Phường

| Đường (tên OSM) | Đoạn | Đơn vị cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Lang Biang | Giáp Đà Lạt cũ (cầu Phước Thành) – đầu đường Phạm Hùng | TT Lạc Dương | Lang Biang - Đà Lạt | chắc | [thuviennhadat duong-lang-biang-thi-tran-lac-duong](https://thuviennhadat.vn/bang-gia-dat/lam-dong/huyen-lac-duong/duong-lang-biang-thi-tran-lac-duong) |
| Lang Biang | Đầu đường Phạm Hùng – cổng khu du lịch Lang Biang | TT Lạc Dương | Lang Biang - Đà Lạt | chắc | cùng trang trên |
| Lang Biang | Cổng khu du lịch – đồi Ra Đa (đường nhựa trong khu du lịch) | TT Lạc Dương (theo ranh giới) | Lang Biang - Đà Lạt | khá chắc | `phuong.json` (không có trong bảng giá đất) |
| Đường Biđoúp | Ngã tư Lang Biang – cầu Đăng Lèn | TT Lạc Dương | Lang Biang - Đà Lạt | chắc | [thuviennhadat duong-bi-doup](https://thuviennhadat.vn/bang-gia-dat/lam-dong/huyen-lac-duong/duong-bi-doup-thi-tran-lac-duong) |
| Duy Tân | Hàn Mặc Tử – 14 tháng 3 | TT Lạc Dương | Lang Biang - Đà Lạt | chắc | [thuviennhadat duong-duy-tan](https://thuviennhadat.vn/bang-gia-dat/lam-dong/huyen-lac-duong/duong-duy-tan-thi-tran-lac-duong) |
| Ankroet | trọn đường | Phường 7 | Lang Biang - Đà Lạt | chắc | [thuviennhadat ankroet-phuong-7](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/ankroet-phuong-7) |
| Đường Trường Sơn Đông (ĐT 722) | giáp TT Lạc Dương – cầu Suối Cạn – hết xã | xã Lát | Lang Biang - Đà Lạt | chắc | [thuviennhadat dt-722 xã Lát](https://thuviennhadat.vn/bang-gia-dat/lam-dong/huyen-lac-duong/duong-dt-722-duong-truong-son-dong-xa-lat) |
| Đường tỉnh 726 | giáp Đà Lạt – ngã 5 Đạ Nghịt – giáp Lâm Hà | xã Lát | Lang Biang - Đà Lạt | chắc | [thuviennhadat dt-726 xã Lát](https://thuviennhadat.vn/bang-gia-dat/lam-dong/huyen-lac-duong/duong-dt-726-doan-tu-giap-thanh-pho-da-lat-den-giap-huyen-lam-ha-xa-lat) |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021). Đổi phường theo `data/lam-dong/nq1671.json` mục 103 (Phường 7, thị trấn Lạc Dương và xã Lát → phường Lang Biang - Đà Lạt).
`ward` = **Lang Biang - Đà Lạt**, cả con đường và cả 10 nơi đều ở phường này.
Kiểm chéo bằng ranh giới `phuong.json`: cả 164 điểm của 24 đoạn "Lang Biang" trong `duong.json` đều nằm trong Lang Biang - Đà Lạt; điểm OSM của từng nơi trong danh sách cũng vậy.
Tên trong OSM (`duong.json`, trường `ten`): "Lang Biang" — khớp (24 đoạn, khoảng 8,9 km, kể cả đường nhựa lên đồi Ra Đa). Bảng giá đất viết "Bi Đóup", OSM viết "Đường Biđoúp"; ĐT 722 trong OSM tên là "Đường Trường Sơn Đông". Danh sách `duong` của phố: Lang Biang, Đường Biđoúp, Duy Tân, Ankroet, Đường Trường Sơn Đông, Đường tỉnh 726 (đều có trong `duong.json`). Không có đường "Dankia" hay "Đường tỉnh 723" trong danh sách vì không nơi nào chính nằm trên đó.

## Câu giới thiệu
"Phố Chân Núi: đường Lang Biang đi qua thị trấn Lạc Dương cũ tới cổng khu du lịch núi Lang Biang, cách trung tâm Đà Lạt chừng 12 km — đỉnh núi Bà cao 2.167 m, đồi Ra Đa 1.929 m có xe đưa lên; dưới chân núi là các buôn người K'Ho với cồng chiêng, rượu cần và cà phê Arabica."
- "12 km", "2.167 m", "1.929 m", "chở lên bằng ô tô": [Báo Lâm Đồng 06/03/2026](https://baolamdong.vn/kham-pha-cung-duong-leo-nui-xuyen-rung-dep-nhat-da-lat-428005.html), [Wikipedia Núi Langbiang](https://vi.wikipedia.org/wiki/N%C3%BAi_Lang_Biang); 2.167 m và 1.929 m có thêm [mia.vn 30/05/2026](https://mia.vn/cam-nang-du-lich/du-lich-lac-duong-da-lat-20629).
- Cồng chiêng, rượu cần: [VOV 18/06/2026](https://vov.vn/van-hoa/nghe-nhan-lang-biang-da-lat-ton-vinh-van-hoa-truyen-thong-post1307569.vov), [Thanh Tra 12/11/2021](https://thanhtra.com.vn/van-hoa-the-thao-BE2162E3A/lam-dong-ngan-xa-tieng-cong-chieng-duoi-chan-nui-langbiang-5BEB2E7F.html), [Báo Lâm Đồng 10/02/2026](https://baolamdong.vn/dalattourist-hanh-trinh-nua-the-ky-gan-bo-va-phat-trien-cung-da-lat-lam-dong-423389.html), mia.vn.
- Cà phê Arabica: [Vietnam Tourism](https://www.vietnam.travel/vi/things-to-do/tour-coffee-lovers-da-lat), [Lonely Planet](https://www.lonelyplanet.com/points-of-interest/kho-coffee/1526225), [Vietnam Coracle](https://vietnamcoracle.com/19-coffee-shops-in-da-lat-with-a-view).
- Tên "Phố Chân Núi": đường Lang Biang kết thúc ở cổng khu du lịch dưới chân núi; quán xá, buôn làng đều quây quanh chân núi. Không nguồn nào đếm số quán → không ghi số quán.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Đường (OSM) · số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Khu du lịch Lang Biang | khu du lịch núi | Lang Biang · cổng cuối đường | [Báo Lâm Đồng 03/2026](https://baolamdong.vn/kham-pha-cung-duong-leo-nui-xuyen-rung-dep-nhat-da-lat-428005.html) · [Báo Lâm Đồng 02/2026](https://baolamdong.vn/dalattourist-hanh-trinh-nua-the-ky-gan-bo-va-phat-trien-cung-da-lat-lam-dong-423389.html) · [VOV 06/2026](https://vov.vn/van-hoa/nghe-nhan-lang-biang-da-lat-ton-vinh-van-hoa-truyen-thong-post1307569.vov) · [Wikipedia](https://vi.wikipedia.org/wiki/N%C3%BAi_Lang_Biang) · [Tuổi Trẻ 03/2026](https://tuoitre.vn/giai-chay-bang-rung-lang-biang-mang-den-da-lat-hon-12-000-khach-giua-mua-vang-20260328094913538.htm) · [bảng giá đất](https://thuviennhadat.vn/bang-gia-dat/lam-dong/huyen-lac-duong/duong-lang-biang-thi-tran-lac-duong) | cao | mở (báo 2026) |
| 2 | Đồi Ra Đa (đỉnh Radar) | điểm ngắm cảnh | Lang Biang · cuối đường nhựa | [Báo Lâm Đồng](https://baolamdong.vn/kham-pha-cung-duong-leo-nui-xuyen-rung-dep-nhat-da-lat-428005.html) · [Wikipedia](https://vi.wikipedia.org/wiki/N%C3%BAi_Lang_Biang) · [mia.vn](https://mia.vn/cam-nang-du-lich/du-lich-lac-duong-da-lat-20629) · [OSM](https://www.openstreetmap.org/node/2090212777) | cao | mở theo khu du lịch |
| 3 | Làng Cù Lần | làng du lịch kiểu K'Ho | Đường Trường Sơn Đông (ĐT 722) · thôn Suối Cạn | [Nhân Dân 2019](https://nhandan.vn/duoi-chan-nui-lang-biang-post355206.html) · [mia.vn 07/2026](https://mia.vn/cam-nang-du-lich/lang-cu-lan-da-lat-16228) · [Foody](https://www.foody.vn/lam-dong/khu-du-lich-sinh-thai-lang-cu-lan) · [VTC News 10/2026](https://vtcnews.vn/ten-goi-lang-cu-lan-co-nghia-gi-ar1044221.html) · [OSM](https://www.openstreetmap.org/way/1509937793) | cao | có dấu hiệu (2026) |
| 4 | Nhà máy thủy điện Ankroet | di tích công nghiệp | Đường tỉnh 726 (cách ~700 m) | [Tuổi Trẻ 2015](https://news.tuoitre.vn/a-visit-to-indochinas-first-hydroelectric-plant-near-vietnams-da-lat-10338454.htm) · [Tạp chí Công Thương 2023](https://tapchicongthuong.vn/kham-pha-thuy-dien-co-nhat-viet-nam-110870.htm) · [Wikipedia](https://vi.wikipedia.org/wiki/Nh%C3%A0_m%C3%A1y_th%E1%BB%A7y_%C4%91i%E1%BB%87n_Ankroet) · [OSM](https://www.openstreetmap.org/way/542458425) | cao | còn phát điện; vào thăm chưa rõ |
| 5 | Hồ Đankia – Suối Vàng | hồ | Đường Trường Sơn Đông (đập cách ~75 m) | [mia.vn](https://mia.vn/cam-nang-du-lich/du-lich-lac-duong-da-lat-20629) · [Tạp chí Công Thương](https://tapchicongthuong.vn/kham-pha-thuy-dien-co-nhat-viet-nam-110870.htm) · [Wikipedia](https://vi.wikipedia.org/wiki/Nh%C3%A0_m%C3%A1y_th%E1%BB%A7y_%C4%91i%E1%BB%87n_Ankroet) · OSM [Hồ Đan Kia](https://www.openstreetmap.org/way/64737684), [Hồ Suối Vàng](https://www.openstreetmap.org/way/141724809) | cao | hồ ngoài trời |
| 6 | Khu du lịch Thung Lũng Vàng | rừng thông, cắm trại | Ankroet (theo mia) | [mia.vn 02/2026](https://mia.vn/cam-nang-du-lich/thung-lung-vang-thung-lung-day-tho-mong-tai-cao-nguyen-lam-vien-1315) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/thung-lung-vang-da-lat/) · [OSM](https://www.openstreetmap.org/node/4293297115) | trung bình | có dấu hiệu (giá vé 2026) |
| 7 | Langbiang Land | khu vui chơi, văn hoá K'Ho | Đường Biđoúp · 93A | [Báo Lâm Đồng 03/2025](https://baolamdong.vn/langbiang-land-noi-thien-nhien-hoa-cung-van-hoa-ban-dia-281535.html) · [Thanh Niên 06/2026](https://thanhnien.vn/langbiang-land-ban-hoa-ca-giua-dai-ngan-da-lat-185260617174110467.htm) · [mia.vn 01/2026](https://mia.vn/cam-nang-du-lich/langbiang-land-da-lat-review-19858) | cao | có dấu hiệu (2026) |
| 8 | K'Ho Coffee | cà phê Arabica, hợp tác xã | Duy Tân (theo điểm OSM) · không số | [Vietnam Tourism](https://www.vietnam.travel/vi/things-to-do/tour-coffee-lovers-da-lat) · [Lonely Planet](https://www.lonelyplanet.com/points-of-interest/kho-coffee/1526225) · [Vietnam Coracle 2022](https://vietnamcoracle.com/19-coffee-shops-in-da-lat-with-a-view) · [OSM](https://www.openstreetmap.org/node/4798005122) | trung bình | chưa rõ (gọi trước) |
| 9 | Quán ăn Liên Mút | quán ăn Tây Nguyên | Lang Biang · trong khu du lịch | [Foody](https://www.foody.vn/lam-dong/lien-mut-quan-am-thuc-tay-nguyen) · [Wanderlog](https://wanderlog.com/place/details/5357521) | trung bình | chưa rõ (Wanderlog không ghi đóng) |
| 10 | Gà nướng cơm lam Khương Duy | gà nướng, cơm lam | Ankroet · ngã ba Măng Line | [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/ga-nuong-com-lam-da-lat/) · [Toplist](https://toplist.vn/top-list/quan-com-lam-ngon-va-chat-luong-nhat-tai-lam-dong-33101.htm) | trung bình | có dấu hiệu (2025) |

Đặc trưng và số liệu từng nơi ghi trong `data/pho/lang-biang.json` (trường `dac_trung`, `ghi_chu`).

## Cần kiểm thêm (chưa đủ 2 nguồn độc lập, hoặc nghi đóng)

| Tên | Đường | Nguồn có | Vì sao |
|---|---|---|---|
| Chợ Lạc Dương | Chợ Lạc Dương | [OSM](https://www.openstreetmap.org/node/13114217050) | chỉ OSM |
| Nhà thờ Lang Biang (Giáo xứ Đức Mẹ Trái Tim Chúa Giêsu) | — | [GCatholic](https://gcatholic.org/churches/asia-east/149643.htm) | 1 nguồn, không địa chỉ |
| Nhà thờ Tin Lành B'Nơr C | Duy Tân | [OSM](https://www.openstreetmap.org/node/6267254693) | chỉ OSM (bảng giá đất Duy Tân có mốc "thửa 423 (nhà thờ)" ở đầu Hàn Mặc Tử, không ghi tên) |
| Làng Đồng trụ LangBiang | Đường Biđoúp | [OSM](https://www.openstreetmap.org/node/13114679227) | chỉ OSM; chưa rõ có phải Langbiang Land |
| Hoàng Hạc Quán | Ankroet? | [Foody](https://www.foody.vn/lam-dong/hoang-hac-quan) · [Toplist](https://toplist.vn/top-list/quan-com-lam-ngon-va-chat-luong-nhat-tai-lam-dong-33101.htm) | không có nguồn sau 2020; "Đập Suối Vàng" nằm sát Đường Trường Sơn Đông |
| Bon Langbiang Village | Lang Biang? | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/ga-nuong-com-lam-da-lat/) · [Toplist](https://toplist.vn/top-list/quan-com-lam-ngon-va-chat-luong-nhat-tai-lam-dong-33101.htm) | chỉ ghi "chân núi", không rõ là gì |
| Cơm Lam Gà nướng Tuyết Hoa | Ankroet? | [OSM](https://www.openstreetmap.org/node/7234583385) | chưa mở được trang thứ hai |
| Twin Beans Farm | — | [Vietnam Coracle](https://vietnamcoracle.com/19-coffee-shops-in-da-lat-with-a-view) | 1 nguồn, không địa chỉ |
| Khu du lịch Quỷ Núi | — | [Vietnamnet 2020](https://vietnamnet.vn/them-mot-diem-den-hap-dan-cho-du-lich-da-lat-654724.html) · [mia.vn](https://mia.vn/cam-nang-du-lich/khu-du-lich-quy-nui-luong-sinh-khi-moi-cua-vung-dat-mong-mo-1428) | hai nguồn ghi lệch nơi (Đạ Nghịt / Suối Cạn); không có nguồn 2025–2026 |

## Chuyện của phố (tóm tắt nguồn)
- Yersin lên cao nguyên Lang Biang 21/6/1893: [yersin.edu.vn](https://yersin.edu.vn/en/?p=1931), [Znews](https://lifestyle.zingnews.vn/da-lat-duoc-tim-ra-tu-nam-nao-post792275.html).
- Tên Lang Biang (chuyện K'Lang – H'Biang, hai cách kể) và "Lâm Viên" đọc ra từ Langbiang: [Wikipedia Núi Langbiang](https://vi.wikipedia.org/wiki/N%C3%BAi_Lang_Biang), [bài Đại học Đà Lạt 2024 về địa danh Lạc Dương](https://www.vjol.info.vn/dhdl/en/article/download/146069/119519/264438) (DOI 10.37569/DalatUniversity.14.4.1340(2024)), [VinWonders](https://vinwonders.com/vi/wonderpedia/news/langbiang-da-lat/).
- Người Cơ Ho dời về chân núi khi Pháp lập Đà Lạt: [Nhân Dân](https://nhandan.vn/duoi-chan-nui-lang-biang-post355206.html), bài Đại học Đà Lạt.
- Khu dự trữ sinh quyển Lang Biang 9/6/2015: [NBCA](https://en.nbca.gov.vn/khu-du-tru-sinh-quyen-lang-biang-tinh-lam-dong-khu-dtsq-lang-biang/), [tờ rơi JICA](https://www.jica.go.jp/project/english/vietnam/037/materials/c8h0vm0000bky6a5-att/leaflet_06.pdf).
- Mốc 1977, 1979, 1986 (xã Lát, huyện và thị trấn Lạc Dương, Phường 7): chỉ [Wikipedia phường Lang Biang - Đà Lạt](https://vi.wikipedia.org/wiki/Lang_Biang_%E2%80%93_%C4%90%C3%A0_L%E1%BA%A1t) → `mot_nguon: true`.

## Chỗ còn nghi
- **"Nhà thờ Con Gà Lạc Dương"**: em không tìm thấy nơi nào mang tên này. "Nhà thờ Con Gà" là Nhà thờ Chính toà Đà Lạt (đường Trần Phú). Ở Lang Biang chỉ thấy Giáo xứ Đức Mẹ Trái Tim Chúa Giêsu (GCatholic) và Nhà thờ Tin Lành B'Nơr C (OSM), mỗi nơi 1 nguồn.
- **Chợ Lạc Dương**: chỉ có trên OSM; không có báo nào tả chợ.
- **Đường của các nơi xa trục chính**: nhà máy Ankroet cách Đường tỉnh 726 khoảng 700 m; Thung Lũng Vàng chỉ mia ghi "đường Ankroet" nhưng điểm OSM cách đường Ankroet khoảng 1,7 km; K'Ho Coffee không nguồn nào ghi tên đường (em lấy "Duy Tân" theo điểm OSM ở ngã ba Duy Tân – Hàn Mặc Tử). Các nơi này `tools/vi_tri_quan.py` (ngưỡng 80 m) có thể không gắn được vị trí — cần soát tay.
- **Số nhà**: chỉ Langbiang Land có số nhà (93A Bidoup, riêng mia ghi).
- **Giá vé** khu du lịch Lang Biang các trang ghi lệch (30.000 / 50.000 đồng), giá jeep lệch → không ghi.
- **Mốc năm**: nâng công suất Ankroet lên 3.100 kW năm 1960 (Tạp chí Công Thương) hay 1962 (Wikipedia, Tuổi Trẻ); lễ hội 100 năm Đà Lạt (1993) ở "Thung lũng Trăm Năm" chỉ Wikipedia ghi → không đưa vào mốc.
- **Vườn quốc gia Bidoup - Núi Bà**: bảng giá đất có "Đường vào khu hành chính Vườn quốc gia Biđoúp-Núi bà - XÃ ĐẠ NHIM"; xã Đạ Nhim nay thuộc xã Lạc Dương (NQ 1671 mục 1), không thuộc phường Lang Biang → không đưa vào địa điểm.
- Lonely Planet chặn WebFetch (403), em đọc bằng curl.
