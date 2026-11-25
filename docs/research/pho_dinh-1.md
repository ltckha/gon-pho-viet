# Dinh I — đồi thông Trần Quang Diệu, phía đông Đà Lạt (25/11/2026)

Kết quả: `data/pho/dinh-1.json`, chuyện: `data/chuyen/dinh-1.json`. Theo hướng mới (trang 3 phần địa lý · lịch sử · nay có gì), em tập trung vào lịch sử của dinh và vài mốc quanh đó, không bày quán.
**3 nơi đạt ≥ 2 nguồn ở 2 trang khác nhau** (dưới mức 5 anh giao), 3 nơi cần kiểm thêm. Quanh Dinh 1 trong bán kính khoảng 1 km, các mốc lâu đời có nguồn tốt (Bảo tàng Lâm Đồng, Chùa Linh Phong, Ga Đà Lạt, Ga Trại Mát) đều đã có trong phố khác nên em không lặp lại.

Cách làm: tải OSM quanh dinh (`api.openstreetmap.org/api/0.6/map`, bbox 108.462,11.938,108.476,11.950), tìm báo (Tuổi Trẻ, SGGP, VietnamPlus, Báo Văn hóa, Báo Pháp luật, Báo Lâm Đồng), Wikipedia, trang du lịch. Ưu tiên báo hơn blog; Vinpearl không dùng; không dùng Google Maps. Hai bài cùng một báo chỉ tính 1 trang.

## Phường

| Nơi / đường | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Trần Quang Diệu, trọn đường (Dinh 1 ở số 1) | P10 | **Xuân Hương - Đà Lạt** | chắc | [thuviennhadat tran-quang-dieu-phuong-10](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-quang-dieu-phuong-10) |
| Hùng Vương, Sở Điện lực – Trần Quý Cáp | P10 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat hung-vuong-phuong-10](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/hung-vuong-phuong-10) |
| Nhà lao thiếu nhi (đồi Chi Lăng) | P9 (Báo Lâm Đồng) | Lâm Viên - Đà Lạt | khá chắc | [Báo Lâm Đồng 03/2025](https://baolamdong.vn/co-mot-nha-tu-doc-nhat-vo-nhi-tren-the-gioi-ky-i-283885.html), `phuong.json` |

Đổi theo `nq1671.json`: mục 99 (P1, 2, 3, 4, 10 → Xuân Hương), mục 101 (P8, 9, 12 → Lâm Viên). Báo 2026 (SGGP, Tuổi Trẻ, Báo Văn hóa) và mia 07/2026 đều ghi Dinh 1 ở phường Xuân Hương; điểm OSM "Dinh Bao Dai 1" nằm trong Xuân Hương theo `phuong.json`.

Tên đường trong `duong.json`: "Trần Quang Diệu", "Vòng Dinh", "Trần Thái Tông", "Hùng Vương" — khớp. Lối vào dinh là đường nội bộ không tên trên OSM; điểm dinh cách Trần Thái Tông 215 m, Trần Quang Diệu 254 m, Vòng Dinh 330 m. `duong.json` chưa có mốc Dinh 1 (có Dinh III).
Cách Chợ Đà Lạt khoảng 3,6 km đường chim bay (mia: khoảng 4 km về hướng đông nam trung tâm).

## Câu giới thiệu
"Dinh I: biệt thự trên đồi thông phía đông Đà Lạt, xây khoảng năm 1940 cho triệu phú Pháp Robert Clément Bourgery, sau về tay Bảo Đại rồi thành nơi nghỉ của các đời lãnh đạo Sài Gòn; từ 2014 là khu King Palace của Công ty Hoàn Cầu Đà Lạt, đóng cửa từ 26/4/2024 vì vụ cho thuê không đấu giá."
- "1940", "Robert Clément Bourgery": [Tuổi Trẻ 26/09/2018](https://tuoitre.vn/dinh-i-va-nhung-thong-tin-sai-lech-20180926103022948.htm) (dẫn Nguyễn Đắc Xuân), [Wikipedia](https://vi.wikipedia.org/wiki/Dinh_I), [VietnamPlus 21/08/2026](https://www.vietnamplus.vn/lam-dong-thao-go-vuong-mac-dua-dinh-1-da-lat-tro-lai-hoat-dong-post1131535.vnp) ("từ năm 1940"), [Báo Pháp luật 10/2024](https://baophapluat.vn/giac-ngu-cua-dinh-1-post529034.html) ("thập niên 1940").
- "nơi nghỉ của các đời lãnh đạo Sài Gòn": Wikipedia, VietnamPlus.
- "2014", "King Palace", "Hoàn Cầu": [SGGP 15/06/2026](https://www.sggp.org.vn/dinh-1-bao-dai-mo-cua-tro-lai-sau-hon-2-nam-tam-ngung-don-khach-post857458.html), [Tuổi Trẻ 21/08/2026](https://tuoitre.vn/lam-dong-tiep-tuc-cho-hoan-cau-da-lat-thue-dinh-1-sau-nhieu-nam-vuong-viec-thu-hoi-100260821103738552.htm), VietnamPlus, Báo Pháp luật.
- "26/4/2024": SGGP, Tuổi Trẻ, Báo Pháp luật.
- Em không đưa chuyện "mở lại 15/6/2026" vào câu vì VietnamPlus 21/08/2026 lại viết dinh vẫn đóng (xem "Chỗ còn nghi").

## Danh sách chính (≥ 2 nguồn)

| # | Tên | Loại | Đường OSM | Nguồn | Tin cậy |
|---|---|---|---|---|---|
| 1 | Dinh I (Dinh 1, King Palace) | dinh thự, biệt thự nhóm 1 | Trần Quang Diệu · 1 | [Tuổi Trẻ 2018](https://tuoitre.vn/dinh-i-va-nhung-thong-tin-sai-lech-20180926103022948.htm) · [Wikipedia](https://vi.wikipedia.org/wiki/Dinh_I) · [VietnamPlus 08/2026](https://www.vietnamplus.vn/lam-dong-thao-go-vuong-mac-dua-dinh-1-da-lat-tro-lai-hoat-dong-post1131535.vnp) · [Tuổi Trẻ 08/2026](https://tuoitre.vn/lam-dong-tiep-tuc-cho-hoan-cau-da-lat-thue-dinh-1-sau-nhieu-nam-vuong-viec-thu-hoi-100260821103738552.htm) · [SGGP 06/2026](https://www.sggp.org.vn/dinh-1-bao-dai-mo-cua-tro-lai-sau-hon-2-nam-tam-ngung-don-khach-post857458.html) · [SGGP 09/2023 phân loại biệt thự](https://www.sggp.org.vn/nhieu-biet-thu-co-da-lat-duoc-phan-loai-lai-post704760.html) · [Báo Văn hóa](https://baovanhoa.vn/du-lich/dinh-1-da-lat-mo-cua-tro-lai-sau-hon-hai-nam-ngung-hoat-dong-239661.html) · [Báo Pháp luật 10/2024](https://baophapluat.vn/giac-ngu-cua-dinh-1-post529034.html) · [mia 07/2026](https://mia.vn/cam-nang-du-lich/dinh-1-da-lat-dinh-bao-dai-dinh-thu-do-so-kieu-au-giua-rung-thong-da-lat-1281) · [OSM](https://www.openstreetmap.org/node/1152345096) | cao |
| 2 | Nhà lao thiếu nhi Đà Lạt | di tích quốc gia (2009) | Hồ Xuân Hương (theo OSM) | [Báo Lâm Đồng 03/2025](https://baolamdong.vn/co-mot-nha-tu-doc-nhat-vo-nhi-tren-the-gioi-ky-i-283885.html) · [SGGP 06/2024](https://www.sggp.org.vn/hon-300-cuu-tu-tham-lai-dia-chi-do-nha-lao-thieu-nhi-da-lat-post745638.html) · [Kiến Thức](https://kienthuc.net.vn/kho-tri-thuc/vao-chon-dia-nguc-tran-gian-cua-tre-em-giua-da-lat-942898.html) (chỉ đọc đoạn trích) · [OSM](https://www.openstreetmap.org/relation/7758125) | cao |
| 3 | Đường sắt răng cưa, đoạn Đà Lạt – Trại Mát | tuyến đường sắt cũ, tàu du lịch | chạy phía bắc Hùng Vương | [VnExpress 2024](https://vnexpress.net/mo-tau-dem-da-lat-trai-mat-4733423.html) · [Nhân Dân 06/2026](https://nhandan.vn/doc-dao-kien-truc-ga-da-lat-post968689.html) · [Wikipedia tuyến](https://vi.wikipedia.org/wiki/%C4%90%C6%B0%E1%BB%9Dng_s%E1%BA%AFt_Th%C3%A1p_Ch%C3%A0m_%E2%80%93_%C4%90%C3%A0_L%E1%BA%A1t) · [OSM](https://www.openstreetmap.org/way/99661030) | cao |

Khoảng cách tới Dinh 1 (chim bay, theo OSM): Nhà lao khoảng 850 m về phía bắc; đường ray khoảng 700 m về phía bắc. Nơi 3 là mốc địa lý (hai ga đầu cuối đã nằm ở phố Ga Đà Lạt và Trại Mát).

## Cần kiểm thêm

| Tên | Nguồn có | Vì sao |
|---|---|---|
| Nhà thờ Thánh Giuse Thợ – Giáo xứ Tạo Tác | [OSM](https://www.openstreetmap.org/way/542725615) · [wanderlog](https://wanderlog.com/place/details/10376088/tạo-tác-church) | không trang nào ghi năm xây, lịch sử giáo xứ |
| Làng trẻ em SOS Đà Lạt (Trường PT Hermann Gmeiner) | [VOV 09/2026](https://vov.vn/xa-hoi/trung-thu-yeu-thuong-o-lang-tre-em-sos-da-lat-post1335828.vov) · [SOS Canada](https://www.soschildrensvillages.ca/vietnam/sos-childrens-village-dalat) · [OSM](https://www.openstreetmap.org/way/696794335) | chưa có năm lập, không phải mốc lâu đời |
| Bãi trực thăng, đường hầm sau đồi | [mia](https://mia.vn/cam-nang-du-lich/dinh-1-da-lat-dinh-bao-dai-dinh-thu-do-so-kieu-au-giua-rung-thong-da-lat-1281) | chỉ mia kể chi tiết; nằm trong khuôn viên dinh |

## Lịch sử (tóm, chi tiết trong `data/chuyen/dinh-1.json`)
- Khoảng 1940: xây cho Robert Clément Bourgery; khu đất tên **Domain Bourgerie** (Tuổi Trẻ, 1 nguồn).
- 1949 (Wikipedia, mia) hoặc cuối 1951 (Tuổi Trẻ): Bảo Đại mua; theo Nguyễn Đắc Xuân đây là nơi làm việc của **Văn Võ phòng Quốc trưởng**, không phải tổng hành dinh.
- Thời Ngô Đình Diệm: sửa lại, làm đường hầm (Wikipedia, mia). 1963–1975: nơi nghỉ của các nguyên thủ chế độ Sài Gòn.
- 2014: cho Công ty CP Hoàn Cầu Đà Lạt thuê 50 năm (King Palace), mở đón khách 9/2015. 2018: gỡ bảng thuyết minh sai. 2020: Thanh tra Chính phủ kết luận cho thuê không đấu giá là sai. 2023: một trong 3 biệt thự nhóm 1 (cùng Dinh 2, Dinh 3). 26/4/2024: đóng cửa. 19/8/2026: QĐ 4218/QĐ-UBND cho tiếp tục thuê.
- Chuyện hay nhất: Tuổi Trẻ 2018 — "biệt thự Nam Phương", "biệt thự Bảo Đại" thật ra là nhà người giúp việc của ông Bourgery; "phòng bà Từ Cung" không có; Bảo Đại rất ít khi lên Dinh I (1 nguồn, đã đánh `mot_nguon`).

## Chỗ còn nghi
1. **Năm Bảo Đại mua**: 1949 / cuối 1951.
2. **Diện tích khuôn viên**: 60 ha (Wikipedia, Báo Pháp luật) / hơn 18 ha (Tuổi Trẻ, VietnamPlus) / gần 16 ha (SGGP, Báo Văn hóa) → không đưa số lên trang. Chỉ giữ 711 m² cho toà biệt thự chính (SGGP, Báo Văn hóa).
3. **Đang mở hay đóng**: SGGP 15/06/2026 báo mở miễn phí từ 15/6; VietnamPlus 21/08/2026 viết vẫn đóng hơn hai năm, dự kiến mở lại 8/2026.
4. Nhiều trang du lịch (mia, Kiến Thức) vẫn gọi dinh là "tổng hành dinh" của Bảo Đại — cách kể Tuổi Trẻ 2018 cho là sai.
