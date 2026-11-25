# Phố Quán Ăn Ngã Năm — Nguyễn Công Trứ (25/11/2026)

Kết quả: `data/pho/nguyen-cong-tru.json`, chuyện của phố: `data/chuyen/nguyen-cong-tru.json`. 7 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 9 nơi cần kiểm thêm, 1 nơi đã đóng (không đưa vào).

**Nói thẳng về đặc trưng:** đường này không nổi tiếng như Hoàng Diệu hay Phan Đình Phùng. Đặc trưng có thật nhưng nhạt: dãy quán ăn bình dân ở đầu ngã năm Đại học (cơm tấm, mì Quảng, hủ tiếu, cơm quê, nướng) và quán xưởng cà phê Là Việt. Câu "thiên đường ăn uống của sinh viên" chỉ có ở 1 bài mia.vn (bài quảng bá khách sạn). Không nguồn nào đếm số quán → không ghi số quán. Không tìm được homestay nào trên đường có đủ 2 nguồn; chỉ có khách sạn.

Cách làm: kho game không có phố này (chỉ có trong dữ liệu OSM thô `osm_dalat_trung_tam.json`). Em tải OSM quanh đường (`api.openstreetmap.org/api/0.6/map`, bbox 108.4310,11.9525,108.4440,11.9590), lọc quán trong 45 m quanh tim đường, rồi tìm quán trên Foody, báo, trang du lịch.
Quy ước nguồn: Mytour chép gần nguyên bài Toplist (Thuận Phát) và bài mia (Hồng Thủy) → không tính riêng. Hotels.com, Expedia, Travelocity cùng tập đoàn → tính 1. Vinpearl không dùng. Không dùng Google Maps. Chưa đi thực tế.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Nguyễn Công Trứ | Ngã năm Đại học – ngã ba Lý Nam Đế (bên số chẵn) | P8 | Lâm Viên - Đà Lạt | chắc | [thuviennhadat …-phuong-8](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/nguyen-cong-tru-phuong-8) |
| Nguyễn Công Trứ | Nhà số 47 (số cũ 3G) – ngã ba Lý Nam Đế (bên số lẻ) | P2 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat …-phuong-2](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/nguyen-cong-tru-phuong-2) |
| Nguyễn Công Trứ | Lý Nam Đế – Xô Viết Nghệ Tĩnh (bên số lẻ) | P2 | Xuân Hương - Đà Lạt | chắc | cùng trang P2 |
| Nguyễn Công Trứ | "Đoạn còn lại" (bên số chẵn, bảng không ghi mốc) | P8 | Lâm Viên - Đà Lạt | khá chắc | cùng trang P8 |
| Nguyễn Công Trứ | Nhánh qua Xô Viết Nghệ Tĩnh xuống phía Phan Đình Phùng (khoảng 800 m, 3 đoạn OSM) | chưa rõ | Xuân Hương (theo phuong.json) | chưa rõ | `phuong.json` |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021) ghi đường ở **cả hai phường cũ trên cùng một quãng** → đường là ranh: một bên P8, một bên P2. Đổi theo `nq1671.json`: mục 101 (Phường 8, 9, 12 → Lâm Viên - Đà Lạt), mục 99 (Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt).
Bên nào là bên nào (suy từ địa chỉ quán, "khá chắc"): số chẵn = P8/Lâm Viên (Foody: 30, 136, 170, 198, 200; Wanderlog và Spinach ghi 198, 200 là "Lâm Viên - Đà Lạt"); số lẻ = P2/Xuân Hương (Foody: 77, 129, 157, 209; mia.vn ghi 209 và trang Quê Xưa ghi 157 là "Xuân Hương - Đà Lạt"). Ngoại lệ chưa giải thích: số 9 (mia: P8, trước nhà số 47 nên có thể đúng), 65 và 129A (Foody ghi P8).
`ward` = **Lâm Viên - Đà Lạt**: 4/7 nơi chính ở bên chẵn, và `phuong.json` đặt cả đoạn chính trong Lâm Viên.
**Lệch bản đồ:** `phuong.json` vẽ ranh Lâm Viên / Xuân Hương chạy song song cách tim đường khoảng 50–100 m về phía nam, không trùng tim đường như bảng giá đất. Nên nhà bên số lẻ trên bản đồ sẽ nằm trong Lâm Viên dù địa chỉ ghi Xuân Hương.
Tên trong OSM (`duong.json`, trường `ten`): "Nguyễn Công Trứ" — khớp (6 đoạn; đoạn chính 99660915 dài khoảng 1.064 m từ ngã năm tới Xô Viết Nghệ Tĩnh, Lý Nam Đế ở mét thứ 415). OSM còn có "Hẻm 33 Nguyễn Công Trứ", "Hẻm 1P Nguyễn Công Trứ" (không đưa vào `duong`).

## Câu giới thiệu
"Phố Quán Ăn Ngã Năm: đường Nguyễn Công Trứ chạy khoảng 1 km từ ngã năm Đại học Đà Lạt tới Xô Viết Nghệ Tĩnh, dọc đường là quán ăn bình dân quen của sinh viên (cơm tấm sáng, mì Quảng, hủ tiếu Nam Vang, cơm quê Quê Xưa) và quán cà phê kiêm xưởng rang Là Việt ở số 200."
- "khoảng 1 km": đo trên `duong.json` (OSM), đoạn chính 1.064 m.
- "ngã năm Đại học": tên dùng trong [bảng giá đất P8](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/nguyen-cong-tru-phuong-8); đầu đường gặp Bùi Thị Xuân, Phù Đổng Thiên Vương, Đinh Tiên Hoàng (đo trên `duong.json`).
- "quen của sinh viên": [mia.vn](https://mia.vn/cam-nang-du-lich/hong-tung-hotel-diem-dung-chan-sang-chanh-tai-pho-hoa-xinh-dep-5917) ("khu vực ngã năm của trường Đại học Đà Lạt – thiên đường ăn uống quen thuộc của các bạn sinh viên"), [Foody Vị Cay](https://www.foody.vn/lam-dong/vi-cay-quan-nuong-ngoi) (khách khen giá hợp sinh viên). Ý này yếu: 1 bài quảng bá + 1 bình luận.
- "số 200": Foody, Spinach, Vietnam Tourism, Rusty Compass, Grantourismo.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | La Viet Coffee (Là Việt) | cà phê đặc sản, xưởng rang | 200 | [Foody](https://www.foody.vn/lam-dong/la-viet-coffee-nguyen-cong-tru) · [Spinach](https://spinach.guide/venues/la-viet-coffee-191174/) · [Vietnam Tourism](https://vietnam.travel/things-to-do/cool-cafes-vietnam) · [Rusty Compass](https://rustycompass.com/vietnam-travel-guide-233/dalat-33/eating-16/cafe-54) · [Grantourismo](https://grantourismotravels.com/dalat-coffee-tours/) · [OSM](https://www.openstreetmap.org/node/4601279191) | cao | có dấu hiệu (Spinach ghi phường mới) |
| 2 | Barn House BBQ & Beer | quán nướng, bia | 198 | [VinWonders EN 2024](https://vinwonders.com/en/wonderpedia/news/dalat-restaurants/) · [Wanderlog](https://wanderlog.com/place/details/1186367/barn-house-bbq-and-beer) · [Foody](https://www.foody.vn/lam-dong/barn-house-bbq-beer) · [OSM](https://www.openstreetmap.org/node/7056510985) | cao | có dấu hiệu (Wanderlog ghi phường mới) |
| 3 | Mì Quảng Nhà Shin | mì Quảng | 209 | [mia.vn 08/2026](https://mia.vn/cam-nang-du-lich/san-lung-top-5-quan-mi-quang-ngon-me-ly-tai-da-lat-1291) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/mi-quang-da-lat/) · [Toplist](https://toplist.vn/top-list/dia-chi-an-my-quang-ngon-nhat-tai-da-lat-31170.htm) · [Foody](https://www.foody.vn/lam-dong/mi-quang-nha-shin-nguyen-cong-tru) · [OSM](https://www.openstreetmap.org/node/13590794901) | cao | có dấu hiệu (mia 8/2026) |
| 4 | Quán Cơm Quê Xưa (CN1) | cơm quê | 157 | [trang quán](http://quanquexua.com/) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/quan-com-da-lat/) · [Wanderlog](https://wanderlog.com/place/details/4754502) · [Foody](https://www.foody.vn/lam-dong/quan-que-xua-mon-an-thanh-dam) | cao | có dấu hiệu (trang quán ghi phường mới) |
| 5 | Hủ Tiếu Nam Vang Thuận Phát | hủ tiếu | 136 | [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/hu-tieu-nam-vang-da-lat/) · [Toplist](https://toplist.vn/top-list/dia-chi-an-hu-tieu-nam-vang-chat-luong-nhat-da-lat-31751.htm) | trung bình | chưa rõ |
| 6 | Cơm tấm Hồng Thủy (Foody: "Quán Thủy") | cơm tấm sáng | 9 | [mia.vn 2024](https://mia.vn/cam-nang-du-lich/bo-tui-top-10-quan-com-tam-da-lat-ngon-nuc-tieng-ma-ban-phai-thu-1327) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/an-trua-da-lat/) | trung bình | chưa rõ |
| 7 | Hồng Tùng Hotel | khách sạn 2 sao | 85 (mia: 85–87) | [mia.vn 2023](https://mia.vn/cam-nang-du-lich/hong-tung-hotel-diem-dung-chan-sang-chanh-tai-pho-hoa-xinh-dep-5917) · [Travelated](https://www.travelated.com/vietnam/da-lat/hong-tung-hotel) | trung bình | chưa rõ (Travelated còn bán phòng) |

Bên chẵn (Lâm Viên): 1, 2, 5, 6. Bên lẻ (Xuân Hương): 3, 4, 7.

## Cần kiểm thêm (chưa đủ 2 nguồn độc lập, hoặc không trên mặt đường)

| Tên | Số nhà | Nguồn có | Vì sao |
|---|---|---|---|
| Vị Cay - Quán Nướng Ngói | 129A | [Foody](https://www.foody.vn/lam-dong/vi-cay-quan-nuong-ngoi) | 1 nguồn, Foody báo lâu chưa có tương tác |
| Lương Sơn Quán - Gà Nướng Cơm Lam | 129 | [Foody](https://www.foody.vn/lam-dong/luong-son-quan-ga-nuong-com-lam-nguyen-cong-tru) | 1 nguồn |
| Tây Nguyên Quán | 170 | [Foody](https://www.foody.vn/lam-dong/tay-nguyen-quan-nguyen-cong-tru) | 1 nguồn; Foody có cả "Cu Đức - Quán Nướng Ngói" cùng số 170 |
| Tony Restaurant (lẩu, nướng) | 156 | [Mytour](https://mytour.vn/en/blog/xep-hang/top-16-most-popular-and-beloved-restaurants-and-eateries-in-da-lat-mytour.html) | 1 nguồn |
| Chay Nhà Tâm | 241 | [OSM](https://www.openstreetmap.org/node/13857139501) | chỉ OSM |
| Quán Nhậu Út Vân | 65 | [Foody](https://www.foody.vn/lam-dong/quan-nhau-ut-van-nguyen-cong-tru) | 1 nguồn, lâu chưa có tương tác |
| Khách sạn Hoàng Nguyên | 68A hoặc 5 | [Vietnambooking](https://www.vietnambooking.com/hotel/vietnam/khach-san-hoang-nguyen-da-lat.html) · [Hotels.com](https://in.hotels.com/ho740201248) | số nhà lệch giữa 2 trang |
| Fujiya Sushi Đà Lạt | Lô 34 / Lô 38 KQH | [VinWonders EN](https://vinwonders.com/en/wonderpedia/news/dalat-restaurants/) · [Toplist](https://toplist.vn/top-list/dia-chi-thuong-thuc-sushi-ngon-nhat-tinh-lam-dong-50310.htm) | ở khu quy hoạch, không trên mặt đường; số lô lệch |
| Bánh canh cua (VinWonders) | Lô 29 KQH | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/banh-canh-da-lat/) | 1 nguồn, ở khu quy hoạch |

Đã đóng (không đưa vào): Com Chay số 70 — [HappyCow](https://www.happycow.net/reviews/com-chay-da-lat-78695) ghi "Reported closed December 2016".

## Chỗ còn nghi
- **Ranh phường**: bảng giá đất nói đường là ranh P2/P8; `phuong.json` lại vẽ ranh lệch về nam 50–100 m. Quy tắc chẵn = Lâm Viên, lẻ = Xuân Hương là em suy từ địa chỉ quán, có 3 ngoại lệ trên Foody.
- **La Viet**: OSM ghi số 198, mọi trang khác ghi 200 → dùng 200. Năm 2013 (Đại biểu Nhân dân, trang Là Việt) là năm ra đời thương hiệu/quán đầu tiên, không nói là ở số 200.
- **Số 136**: Thuận Phát (VinWonders 2025, Toplist) và Nem Nướng Hạnh (Foody cũ) cùng số → có thể đã đổi quán.
- **Hồng Thủy / Quán Thủy**: cùng số 9, tên lệch giữa các trang.
- **Mì Quảng Nhà Shin**: OSM ghi "Nha Shin - Pho" không số nhà, nằm bên số lẻ gần La Viet — khớp vị trí nhưng cần soát tay trước khi thêm `ALIAS`.
- **Tên cũ "Dankir"** (file chuyện): chỉ có ở [bảng của blog](https://didulichdalat.wordpress.com/2010/10/24/ten-d%C6%B0%E1%BB%9Dng-da-l%E1%BA%A1t-x%C6%B0a-va-nay/), ghi `mot_nguon: true`; bảng ghi Dankir tách thành Đinh Tiên Hoàng + Nguyễn Công Trứ + Tôn Thất Thuyết + Nguyễn Hoàng, không rõ đoạn nào.
- **Giờ mở** lệch giữa các trang (ghi trong `con_mo`, `dac_trung`).

## Kiểm thêm 25/11/2026

Tìm thêm nguồn cho các nơi trong "Cần kiểm thêm" (WebSearch + đọc trang bằng curl; không dùng Google Maps). Cách tính: ≥ 2 trang khác nhau; VinWonders/Vinpearl tính 1; bài chép lại tính 1.

**Chuyển sang danh sách chính: 0. Đã đóng hẳn: 0.**

- Fujiya Sushi: Toplist + Foody cùng ghi Lô 34 KQH → số lô chốt 34; vẫn để lại vì không trên mặt đường.
- Khách sạn Hoàng Nguyên: Skyscanner ghi 5, Vietnambooking ghi 68A → vẫn vênh.
- Tây Nguyên Quán (170): đoạn trích Foody ghi "Chưa mở cửa", điểm 1.0; không có trang thứ hai.
