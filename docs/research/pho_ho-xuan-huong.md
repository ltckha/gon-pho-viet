# Phố Hồ Xuân Hương — đường Trần Quốc Toản ven hồ (25/11/2026)

Kết quả: `data/pho/ho-xuan-huong.json`, chuyện của phố: `data/chuyen/ho-xuan-huong.json`. Có 11 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 5 nơi cần kiểm thêm, 2 thứ đã dừng (xe ngựa quanh hồ, phố đi bộ Trần Quốc Toản).

Cách làm: kho game không có phố hồ Xuân Hương. Em tải OSM quanh hồ (`api.openstreetmap.org/api/0.6/map`, 4 ô trong bbox 108.437,11.937,108.454,11.952) để lấy điểm có tên, rồi tìm từng nơi trên báo, Wikipedia, trang du lịch, Foody. Đường của từng nơi lấy theo đường OSM gần nhất (đo trên `duong.json`).
Quy ước nguồn: 2 bài cùng một trang chỉ tính 1. Wikipedia và mytour chép cùng câu chữ (bài Đồi Cù) nên tính 1. Không dùng Vinpearl, không dùng Google Maps (toạ độ trên Foody chỉ xem để biết bờ nào, không chép). Chưa đi thực tế.
Không trùng nơi với các phố đã có: Công viên Yersin, Khách sạn Công Đoàn (phố Yersin), Dalat Palace, Du Parc (phố Trần Phú), Sunshine Coffee (Trần Hưng Đạo), Windmills (phố Cà Phê) — đều để ngoài.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Trần Quốc Toản (Nguyễn Thái Học cũ) | trọn đoạn | P1 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-quoc-toan-nguyen-thai-hoc-cu-phuong-1) |
| Trần Quốc Toản | trọn đoạn thuộc P3 | P3 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-quoc-toan-phuong-3) |
| Trần Quốc Toản (Yersin cũ) | Hồ Tùng Mậu – ngã ba Trần Quốc Toản/Yersin (Nhà khách Công Đoàn) | P10 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-quoc-toan-yersin-cu-phuong-10) |
| Trần Quốc Toản (Bà Huyện Thanh Quan cũ) | ngã ba Yersin (Nhà khách Công Đoàn) – Đinh Tiên Hoàng | P10 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-quoc-toan-ba-huyen-thanh-quan-cu-phuong-10) |
| Trần Quốc Toản | mút đông bắc, chỗ gặp Trần Nhân Tông cạnh Vườn hoa | ? | Lâm Viên (ranh giới) / Xuân Hương (bảng giá) | **chưa rõ** | `phuong.json`; [Foody Vườn hoa](https://www.foody.vn/lam-dong/vuon-hoa-thanh-pho-da-lat) ghi "Trần Quốc Toản, P. 8" |
| Hồ Tùng Mậu | trọn đường | P3, P10 | Xuân Hương - Đà Lạt | chắc | [P3](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/ho-tung-mau-phuong-3) · [P10](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/ho-tung-mau-phuong-10) |
| Trần Nhân Tông | trọn đường | P8 | Lâm Viên - Đà Lạt | chắc | [thuviennhadat](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-nhan-tong-phuong-8) |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021, hết hiệu lực từ 01/01/2026). Đổi phường theo `nq1671.json` mục 99: Phường 1, 2, 3, 4, 10 → **Xuân Hương - Đà Lạt**; mục 101: Phường 8, 9, 12 → Lâm Viên - Đà Lạt.
`ward` = **Xuân Hương - Đà Lạt**, độ chắc **chắc** (cho gần hết đường; chỉ Vườn hoa thành phố nằm bên Lâm Viên).

Kiểm chéo bằng ranh giới `phuong.json`: 33/40 điểm của Trần Quốc Toản nằm trong Xuân Hương, 7 điểm ở mút đông bắc nằm trong Lâm Viên. Thủy Tạ, Thanh Thủy, quảng trường, bến đạp vịt nằm trong Xuân Hương. Sân golf: gần hết diện tích trong Xuân Hương, dù cổng ghi đường Phù Đổng Thiên Vương (P8 cũ). Vườn hoa thành phố trong Lâm Viên.

**Tên đường**: bảng giá cho thấy Trần Quốc Toản bây giờ gồm cả đoạn trước đây tên Nguyễn Thái Học, Bà Huyện Thanh Quan, Yersin. Em chưa tìm được văn bản và năm đổi tên. OSM vẫn còn một đường khác tên Bà Huyện Thanh Quan (chạy bắc–nam phía đông quảng trường) và Tòa Giám mục ghi "9 Nguyễn Thái Học".

Tên trong OSM (`duong.json`, trường `ten`): "Trần Quốc Toản" (8 đoạn, tổng khoảng 4,9 km, ôm gần trọn hồ), "Hồ Tùng Mậu", "Trần Nhân Tông" — khớp. Mặt nước "Hồ Xuân Hương", mốc "Vườn hoa thành phố Đà Lạt". OSM không có đường tên "Nguyễn Thái Học" ở Đà Lạt. `duong` gồm: Trần Quốc Toản, Hồ Tùng Mậu, Trần Nhân Tông.

## Câu giới thiệu
"Phố Hồ Xuân Hương: đường Trần Quốc Toản ôm quanh hồ chừng 5 km (hồ có từ năm 1919, danh thắng quốc gia từ 1988); bờ nam là Quảng trường Lâm Viên với nụ hoa atiso kính cao 15 m, bờ bắc là sân golf Đồi Cù mở năm 1922; ven hồ có Thủy Tạ, Thanh Thủy, bến đạp vịt."
- "chừng 5 km" (vòng quanh hồ): [Wikipedia](https://vi.wikipedia.org/wiki/H%E1%BB%93_Xu%C3%A2n_H%C6%B0%C6%A1ng_(h%E1%BB%93_n%C6%B0%E1%BB%9Bc)) "khoảng 5 km"; [mia.vn 11/2026](https://mia.vn/cam-nang-du-lich/ho-xuan-huong-diem-den-chua-bao-gio-cu-cua-thanh-pho-mong-mo-1329) "khoảng 5,1 km"; OSM: Trần Quốc Toản khoảng 4,9 km. (VietnamNet 2011 ghi "gần 7 km" — lệch, không theo.)
- "1919": Wikipedia, mia.vn.
- "1988": mia.vn, [Báo Văn hóa](https://baovanhoa.vn/van-hoa/lam-dong-bo-sung-chinh-sua-ho-so-khoa-hoc-di-tich-danh-thang-ho-xuan-huong-200580.html).
- "15 m": [Tuổi Trẻ 2015](https://tuoitre.vn/xay-quang-truong-lam-vien-da-lat-xong-du-111-ti-983047.htm), [Người Quan Sát 2024](https://nguoiquansat.vn/quang-truong-gan-700-ty-la-bieu-tuong-cua-thanh-pho-ngan-hoa-co-suc-chua-gap-1-5-lan-san-my-dinh-146050.html), [Wikipedia EN](https://en.wikipedia.org/wiki/Lam_Vien_Square); mia ghi "hơn 15 m".
- "1922": [golfpass](https://www.golfpass.com/courses/22024-dalat-palace-golf-club/), [Wikipedia Đồi Cù](https://vi.wikipedia.org/wiki/%C4%90%E1%BB%93i_C%C3%B9).
- Không ghi diện tích hồ: Wikipedia 25 ha, mia 33 ha, báo về đạp vịt "phạm vi 38 ha".

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Đường OSM · số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Hồ Xuân Hương | hồ, danh thắng | Trần Quốc Toản · — | [Wikipedia](https://vi.wikipedia.org/wiki/H%E1%BB%93_Xu%C3%A2n_H%C6%B0%C6%A1ng_(h%E1%BB%93_n%C6%B0%E1%BB%9Bc)) · [mia.vn 11/2026](https://mia.vn/cam-nang-du-lich/ho-xuan-huong-diem-den-chua-bao-gio-cu-cua-thanh-pho-mong-mo-1329) · [Báo Văn hóa](https://baovanhoa.vn/van-hoa/lam-dong-bo-sung-chinh-sua-ho-so-khoa-hoc-di-tich-danh-thang-ho-xuan-huong-200580.html) · [Foody](https://www.foody.vn/lam-dong/ho-xuan-huong) · [OSM](https://www.openstreetmap.org/relation/2390139) | cao | mặt hồ công cộng |
| 2 | Quảng trường Lâm Viên | quảng trường | Trần Quốc Toản · — | [Tuổi Trẻ 2015](https://tuoitre.vn/xay-quang-truong-lam-vien-da-lat-xong-du-111-ti-983047.htm) · [Người Quan Sát 2024](https://nguoiquansat.vn/quang-truong-gan-700-ty-la-bieu-tuong-cua-thanh-pho-ngan-hoa-co-suc-chua-gap-1-5-lan-san-my-dinh-146050.html) · [mia.vn](https://mia.vn/cam-nang-du-lich/quang-truong-lam-vien-bieu-tuong-cua-thanh-pho-da-lat-tho-mong-1340) · [Wikipedia EN](https://en.wikipedia.org/wiki/Lam_Vien_Square) · [MoMo](https://www.momo.vn/du-lich-di-lai/diem-den/da-lat/quang-truong-lam-vien-76) · [Foody](https://www.foody.vn/lam-dong/quang-truong-lam-vien) · [OSM](https://www.openstreetmap.org/way/1303837487) | cao | mở, miễn phí |
| 3 | Highlands Coffee Nụ hoa Atiso (trước: DOHA Café, K'fe House) | cà phê | Trần Quốc Toản · 2 | [Đại Biểu Nhân Dân 11/2024](https://daibieunhandan.vn/kinh-doanh-kieu-highlands-coffee-nhieu-mat-bang-mo-cua-hang-deu-thuoc-dang-co-tien-cung-kho-thue-10351645.html) · [Tinh tế](https://tinhte.vn/thread/4040360) (403, chỉ thấy qua tìm kiếm) · [OSM](https://www.openstreetmap.org/node/5201427721) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/quan-ca-phe-dep-o-da-lat/) (ghi Doha) · [Caffeinated Excursions 2019](https://caffeinatedexcursions.com/the-complete-guide-to-cafes-in-dalat-vietnam) (ghi K'fe House) | trung bình | có dấu hiệu (khai trương 11/2024) |
| 4 | GO! Đà Lạt (trước: Big C) | siêu thị | Hồ Tùng Mậu · 1 | [OSM](https://www.openstreetmap.org/node/3770188796) · [Wikipedia EN](https://en.wikipedia.org/wiki/Lam_Vien_Square) · [mia.vn](https://mia.vn/cam-nang-du-lich/quang-truong-lam-vien-bieu-tuong-cua-thanh-pho-da-lat-tho-mong-1340) | trung bình | có dấu hiệu (OSM sửa 04/2026) |
| 5 | Nhà hàng Thủy Tạ | nhà hàng, cà phê, công trình cổ | Trần Quốc Toản · 2-4 | [Báo Lâm Đồng 08/2025](https://baolamdong.vn/print/388586.html) · [Foody](https://www.foody.vn/lam-dong/thuy-ta-nha-hang-cafe) · [Tuổi Trẻ 11/2023](https://tuoitre.vn/khong-duoc-doi-ten-thuy-ta-o-ho-xuan-huong-nguoi-trung-thau-bo-coc-rut-lui-20231123100938959.htm) · [Wikipedia](https://vi.wikipedia.org/wiki/H%E1%BB%93_Xu%C3%A2n_H%C6%B0%C6%A1ng_(h%E1%BB%93_n%C6%B0%E1%BB%9Bc)) · [OSM](https://www.openstreetmap.org/node/1150940211) | cao | **chưa rõ** (vướng đấu giá từ 2023) |
| 6 | Thanh Thủy Cafe | cà phê, nhà hàng ven hồ | Trần Quốc Toản · — | [Foody](https://www.foody.vn/lam-dong/thanh-thuy-cafe) · [Wikipedia](https://vi.wikipedia.org/wiki/H%E1%BB%93_Xu%C3%A2n_H%C6%B0%C6%A1ng_(h%E1%BB%93_n%C6%B0%E1%BB%9Bc)) · [mia.vn 11/2026](https://mia.vn/cam-nang-du-lich/ho-xuan-huong-diem-den-chua-bao-gio-cu-cua-thanh-pho-mong-mo-1329) · [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/ho-xuan-huong-da-lat) · [OSM](https://www.openstreetmap.org/way/1239012817) | trung bình | chưa rõ |
| 7 | Xuân Hương Garden Coffee | cà phê sân vườn | Trần Quốc Toản · 1 | [mia.vn 12/2025](https://mia.vn/cam-nang-du-lich/xuan-huong-garden-coffee-review-19830) · [Foody](https://www.foody.vn/lam-dong/xuan-huong-garden-coffee) · [Wanderlog](https://wanderlog.com/place/details/1324468/xuân-hương-garden-coffee) | trung bình | có dấu hiệu (mia 12/2025) |
| 8 | Bích Câu Coffee | cà phê trên mỏm đất nhô ra hồ | Trần Quốc Toản · — | [Foody](https://www.foody.vn/lam-dong/bich-cau-coffee) · [Zing 2015](https://znews.vn/9-quan-ca-phe-ban-nen-ghe-khi-den-da-lat-post589171.html) · [mia.vn 11/2026](https://mia.vn/cam-nang-du-lich/ho-xuan-huong-diem-den-chua-bao-gio-cu-cua-thanh-pho-mong-mo-1329) · [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/ho-xuan-huong-da-lat) | trung bình | chưa rõ (có bình luận "Chưa mở cửa") |
| 9 | Bến xe đạp nước (đạp vịt) | bến thuyền | Trần Quốc Toản · — (giao Đinh Tiên Hoàng) | [VOH 08/2025](https://voh.com.vn/du-lich/da-lat-cho-phep-dich-vu-xe-dap-nuoc-tren-ho-xuan-huong-hoat-dong-tro-lai-611828.html) · [Dân Trí 08/2025](https://dtinews.dantri.com.vn/print/20250821093419355.htm) · [Zing 11/2024](https://lifestyle.zingnews.vn/da-lat-dung-dap-vit-tren-ho-xuan-huong-post1508060.html) · [Người Quan Sát 11/2024](https://nguoiquansat.vn/da-lat-cham-dut-hoat-dong-thuyen-dap-vit-tren-ho-xuan-huong-173459.html) · [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/ho-xuan-huong-da-lat) · [OSM](https://www.openstreetmap.org/node/11510015102) · [OSM](https://www.openstreetmap.org/node/5330468303) | cao | tạm chạy lại từ 8/2025 |
| 10 | Sân golf Dalat Palace (Đồi Cù) | sân golf | Trần Quốc Toản · — (cổng Phù Đổng Thiên Vương) | [golfpass](https://www.golfpass.com/courses/22024-dalat-palace-golf-club/) · [Wikipedia Đồi Cù](https://vi.wikipedia.org/wiki/%C4%90%E1%BB%93i_C%C3%B9) (= [mytour](https://mytour.vn/vi/blog/bai-viet/doi-cu.html)) · [OSM](https://www.openstreetmap.org/way/99661171) | cao | sân tư nhân |
| 11 | Vườn hoa thành phố Đà Lạt | vườn hoa (có vé) | Trần Nhân Tông · 2 | [Foody](https://www.foody.vn/lam-dong/vuon-hoa-thanh-pho-da-lat) · [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/plan-book/travel/travel-guide/vuon-hoa-da-lat) · [mytour](https://mytour.vn/vi/blog/bai-viet/vuon-hoa-da-lat-diem-den-noi-tieng-nhat-trong-xu-so-suong-mu.html) · [VinWonders 12/2025](https://vinwonders.com/vi/wonderpedia/news/vuon-hoa-thanh-pho-da-lat/) · [OSM](https://www.openstreetmap.org/node/11916349146) | cao | mở (giờ lệch giữa các trang) |

Bờ nam: quảng trường, nụ atiso, GO!, Thủy Tạ. Bờ tây bắc: Thanh Thủy, bến đạp vịt. Bờ bắc: sân golf. Mút đông bắc: Vườn hoa (Lâm Viên). Xuân Hương Garden và Bích Câu không có trên OSM.

Ghi chú từng nơi:
- **Thủy Tạ**: chuyện câu lạc bộ bơi, cầu nhảy 3 cấp, tên "La Grenouillère – Đầm Ếch" chỉ Báo Lâm Đồng 2025 có. Đấu giá 10/2023 vượt 15 tỉ/năm (khởi điểm 3,04 tỉ), người trúng bỏ cọc vì không được đổi tên; 2024 tỉnh duyệt đấu giá lại, giá khởi điểm hơn 36 tỉ/10 năm. Chưa thấy tin kết quả. Số "2 - 4 Trần Quốc Toản" chỉ Foody ghi, trùng số 2 với nụ atiso.
- **Nụ atiso**: VinWonders 07/2025 vẫn ghi "Doha Coffee" dù Highlands đã vào từ 11/2024 — bài cũ chép lại. Chưa có nguồn ghi số nhà cho Highlands.
- **Quảng trường**: số liệu lệch — diện tích 72.000 m² (Tuổi Trẻ, Wikipedia) / hơn 70.000 m² (mia, Người Quan Sát); dã quỳ cao 17 / 18 / gần 20 m → không ghi chiều cao dã quỳ; vốn: Tuổi Trẻ 2015 ghi tổng khoảng 570 tỉ, dư 111 tỉ so với 681,5 tỉ được duyệt.
- **Sân golf**: câu "Bảo Đại yêu cầu cải tạo năm 1920" (Wikipedia, mytour) không dùng: năm 1920 Bảo Đại mới 7 tuổi. Nguồn tiếng Anh lệch về năm lên 18 lỗ, năm hồi phục (1959/1993).
- **Vườn hoa**: VinWonders ghi "1996" (gõ nhầm 1966, vì cùng bài nói khôi phục 1985). Diện tích "700 m²" (mytour, VinWonders) mâu thuẫn với 7.000 m² (trang khác) → không ghi.
- **Đạp vịt**: Zing ghi "gần 30 năm", Người Quan Sát "hơn 30 năm". Chạy lại 13/8 (VOH) hay 20/8/2025 (Dân Trí).

## Cần kiểm thêm

| Tên | Đường · số | Nguồn có | Vì sao |
|---|---|---|---|
| Cầu Ông Đạo (đập đá 1934–1935) | — | [Wikipedia](https://vi.wikipedia.org/wiki/H%E1%BB%93_Xu%C3%A2n_H%C6%B0%C6%A1ng_(h%E1%BB%93_n%C6%B0%E1%BB%9Bc)) · [mia.vn](https://mia.vn/cam-nang-du-lich/ho-xuan-huong-diem-den-chua-bao-gio-cu-cua-thanh-pho-mong-mo-1329) | đủ nguồn nhắc, nhưng không nguồn nào ghi rõ vị trí; OSM không có điểm tên này → để vào chuyện của phố |
| Coffee One Day | Trần Quốc Toản · 05 | [OSM](https://www.openstreetmap.org/node/4394491091) | chỉ OSM |
| Cafe Bồ Công Anh | Yersin · 1 | [OSM](https://www.openstreetmap.org/way/777438259) | chỉ OSM; nằm trong khuôn viên Công Đoàn, hợp phố Yersin hơn |
| Cà Fê Đồi Cù (OSM: "Dồi Cù") | Trần Quốc Toản | [OSM](https://www.openstreetmap.org/node/13838617601) | chỉ OSM |
| K'fe House / "Ar Ti So" (điểm cũ OSM) | Trần Quốc Toản · 2 | [OSM](https://www.openstreetmap.org/node/11882697300) · [OSM](https://www.openstreetmap.org/node/9633116697) | tên cũ của quán trong nụ atiso, nay Highlands; OSM cần sửa |

## Đã dừng (không đưa lên bản đồ)

| Tên | Nguồn | Ghi chú |
|---|---|---|
| Xe ngựa chở khách quanh hồ | [Nhân Dân 02/2025](https://nhandan.vn/da-lat-ngung-dich-vu-xe-ngua-cho-khach-quanh-ho-xuan-huong-post861785.html) · [Báo Lâm Đồng 04/2026](https://baolamdong.vn/tiep-tuc-cam-xe-ngua-hoat-dong-quanh-ho-xuan-huong-438660.html) | ngừng từ 31/3/2025; tháng 4/2026 tỉnh vẫn cấm. Số xe lệch: 30 (Nhân Dân) / 22 xe, khoảng 30 hộ (Báo Lâm Đồng) |
| Phố đi bộ Trần Quốc Toản (1,6 km) | [Nhân Dân 06/2024](https://nhandan.vn/ocop/them-mot-tuyen-pho-di-bo-lang-man-tai-pho-nui-da-lat-post813400.html) · [Tuổi Trẻ 10/2025](https://news.tuoitre.vn/vietnams-da-lat-shuts-down-lakeside-pedestrian-street-because-of-congestion-low-foot-traffic-103251024152652755.htm) · [Báo Lâm Đồng](https://baolamdong.vn/kinh-te-dem-da-lat-khong-chi-la-nhung-pho-dong-nguoi-468577.html) | mở 8/6/2024, phường đóng sau hơn 1 năm (ít khách, kẹt đường xung quanh) |

## Chuyện của phố (tóm tắt `data/chuyen/ho-xuan-huong.json`)
- Tên cũ: Nguyễn Thái Học, Bà Huyện Thanh Quan, Yersin (đoạn của Trần Quốc Toản, chỉ bảng giá đất → 2 mục sau `mot_nguon: true`); Grand Lac (tên hồ); Vườn hoa Bích Câu; Đà Lạt Central Square (`mot_nguon: true`).
- 17 mốc: 1919 tạo hồ · 1922 sân golf · 1923 đập thứ hai · đầu 1930s Thủy Tạ (1 nguồn) · 3/1932 vỡ đập · 1934–35 đập đá · 1953 đổi tên · 1966 vườn hoa · 1988 danh thắng · 1990 golf 18 lỗ (1 nguồn) · 2009–2016 quảng trường · 10/2023 đấu giá Thủy Tạ · 8/6/2024 phố đi bộ · 11/2024 dừng đạp vịt, Highlands vào nụ atiso · 31/3/2025 dừng xe ngựa · 8/2025 đạp vịt chạy lại · 10/2025 đóng phố đi bộ.
- 7 chuyện: Đầm Ếch thành Thủy Tạ (1 nguồn) · 15 tỉ một năm mà không được đổi tên · Cái đập thành cây cầu · Ngựa rời hồ · Ba mươi năm đạp vịt chưa có giấy phép · Phố đi bộ chỉ sống được một năm · Đồi Cù: lưng cừu hay đánh cù (1 nguồn).
- Món: "cà phê run" ở Thủy Tạ (1 nguồn, Báo Lâm Đồng).

## Còn nghi
1. Năm đổi tên các đoạn thành Trần Quốc Toản: chưa có văn bản.
2. Mút đông bắc Trần Quốc Toản (cạnh Vườn hoa): Lâm Viên theo ranh giới, bảng giá không có P8.
3. Thủy Tạ, Thanh Thủy, Bích Câu: chưa có nguồn 2026 xác nhận đang mở.
4. Diện tích hồ (25 / 33 / 38 ha) không thống nhất.
