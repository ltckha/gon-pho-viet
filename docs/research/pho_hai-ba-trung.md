# Phố Ốc Nhồi — Hai Bà Trưng (25/11/2026)

Kết quả: `data/pho/hai-ba-trung.json`. **11 nơi** đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), **14 nơi** cần kiểm thêm.

Cách làm: tìm bài tổng hợp quán (mia.vn, VinWonders, Toplist, Vietnam Airlines, Foody, VnExpress International), đối chiếu thêm điểm OpenStreetMap tải ngày 25/11/2026 (API 0.6, ô quanh đường). Không dùng Google Maps. Chưa đi thực tế.
Quy ước nguồn: 2 bài cùng một trang chỉ tính 1. Mytour hay viết lại/dịch lại bài của mia.vn hoặc Toplist (cùng câu chữ, cùng câu chỉ đường) → khi trùng nội dung thì không tính Mytour là nguồn riêng. VinWonders và Vinpearl cùng tập đoàn → tính 1 (Vinpearl chặn tải bằng máy, không dùng).

## Phường

| Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Hải Thượng → Tản Đà | P6 | Cam Ly - Đà Lạt | chắc | [thuviennhadat: Hai Bà Trưng - Phường 6](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/hai-ba-trung-phuong-6) (QĐ 02/2020, sửa bởi QĐ 16/2021) |
| Tản Đà → La Sơn Phu Tử | P6 | Cam Ly - Đà Lạt | chắc | như trên |
| Đoạn còn lại | P6 | Cam Ly - Đà Lạt | chắc | như trên |

- Bảng giá đất chỉ có mục Hai Bà Trưng ở Phường 6 (kèm "Hẻm số 3 Hai Bà Trưng", cũng Phường 6); không thấy mục ở P1/P2.
- Đổi phường theo `data/lam-dong/nq1671.json` mục 100: Phường 5, Phường 6 và xã Tà Nung → **Cam Ly - Đà Lạt**. Cả đường nằm trong 1 phường mới.
- Bài VinWonders sau 7/2025 ghi số 05 và 133 Hai Bà Trưng thuộc "phường Cam Ly – Đà Lạt" (khớp).
- Lưu ý: ranh giới đã làm gọn trong `data/lam-dong/phuong.json` cho vài điểm đầu đường (gần Hải Thượng) rơi sang Xuân Hương. Đó là do ranh vẽ thô; theo bảng giá đất cả đoạn đầu vẫn là P6.
- Tên trên OSM (`duong.json`, trường `ten`): "Hai Bà Trưng" (2 đoạn, way 125322555 và 126621370) — khớp.

## Tên phố và câu giới thiệu

**Phố Ốc Nhồi** — "Phố Ốc Nhồi: dọc Hai Bà Trưng là các quán ốc nhồi thịt mang tên "33", xen lẩu gà lá é, gà nướng cơm lam, bún đậu; giữa đường có chùa Linh Quang, được gọi là ngôi chùa đầu tiên của Đà Lạt." (Không có con số; "33" là tên quán.)

Vì sao chọn "ốc nhồi": trên đường có ít nhất 5 số nhà bán ốc nhồi thịt có nguồn (32, 41, 157, 181, 224), cộng Ốc Khánh Như (4B) và ốc vỉa hè 239. Một người viết trên Foody nhận xét "nguyên con đường toàn quán ốc nhồi thịt" và "quán nào cũng ghi là quán 33" ([Foody – Quán 33](https://www.foody.vn/thuong-hieu/quan-33)). VnExpress International chọn 2 trong 4 địa chỉ ốc nhồi Đà Lạt nên ăn là trên Hai Bà Trưng ([VnExpress 20/01/2023](https://e.vnexpress.net/news/food/dont-miss-these-da-lat-dishes-4553978.html)).
Gợi ý "cà phê, nhà xưa": **chưa thấy nguồn**. OSM có vài quán cà phê nhỏ (Kafein 451, RÒM 365, Highlands 01-03) nhưng không có bài viết thứ hai; không tìm được nhà xưa/biệt thự cổ nào ghi địa chỉ Hai Bà Trưng (Biệt điện Trần Lệ Xuân, nhà thờ Domaine de Marie ở gần nhưng mang địa chỉ đường khác).

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Quán 33 – Ốc nhồi thịt & lẩu đuôi bò (quán gốc) | ốc nhồi, lẩu | 32 | [mia.vn 19/07/2026](https://mia.vn/cam-nang-du-lich/oc-33-da-lat-review-tu-a-den-z-21086) · [Toplist tiệm lâu đời](https://toplist.vn/top-list/tiem-an-lau-doi-thu-hut-nhat-da-lat-31834.htm) · [Toplist quán nhậu](https://toplist.vn/top-list/nhung-quan-nhau-khong-the-bo-qua-khi-di-du-lich-da-lat-30820.htm) | cao | có dấu hiệu (mia 7/2026) |
| 2 | Quán 33 – cơ sở 181 (số cũ 33) | ốc nhồi, lẩu | 181 | [mia.vn 19/07/2026](https://mia.vn/cam-nang-du-lich/oc-33-da-lat-review-tu-a-den-z-21086) · [VinWonders 28/07/2025](https://vinwonders.com/vi/wonderpedia/news/oc-nhoi-thit-da-lat/) · [Foody](https://www.foody.vn/thuong-hieu/quan-33) · [Toplist](https://toplist.vn/top-list/tiem-an-lau-doi-thu-hut-nhat-da-lat-31834.htm) | cao | có dấu hiệu (mia 7/2026) |
| 3 | Quán 33 – cơ sở 41 ("4D–41") | ốc nhồi | 41 | [VinWonders 28/07/2025](https://vinwonders.com/vi/wonderpedia/news/oc-nhoi-thit-da-lat/) · [VnExpress 01/2023](https://e.vnexpress.net/news/food/dont-miss-these-da-lat-dishes-4553978.html) · [Foody](https://www.foody.vn/lam-dong/quan-33-oc-nhoi-thit-lau-duoi-bo) | trung bình | không rõ (Foody mới nhất 12/2020) |
| 4 | Quán 33 – cơ sở 157 | ốc nhồi | 157 | [VnExpress 01/2023](https://e.vnexpress.net/news/food/dont-miss-these-da-lat-dishes-4553978.html) · [Foody](https://www.foody.vn/thuong-hieu/quan-33) | trung bình | không rõ |
| 5 | Bích 33 – Ốc nhồi thịt | ốc nhồi, lẩu bò | 224 | [mia.vn 05/06/2025](https://mia.vn/cam-nang-du-lich/nguoi-ta-len-do-di-day-con-minh-len-do-ngoi-le-oc-nhoi-thit-da-lat-1311) · [VinWonders 28/07/2025](https://vinwonders.com/vi/wonderpedia/news/oc-nhoi-thit-da-lat/) · [OSM node 5811550053](https://www.openstreetmap.org/node/5811550053) | cao | có dấu hiệu (2025) |
| 6 | Ốc Khánh Như | quán ốc chiều tối | 4B | [VinWonders 18/07/2025](https://vinwonders.com/vi/wonderpedia/news/quan-oc-da-lat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/nguoi-ta-len-do-di-day-con-minh-len-do-ngoi-le-oc-nhoi-thit-da-lat-1311) · [Foody](https://www.foody.vn/lam-dong/oc-khanh-nhu) · [Mytour](https://mytour.vn/vi/blog/bai-viet/6-quan-oc-noi-tieng-khong-the-bo-lo-tai-tp-da-lat-lam-dong-mytour.html) | cao | dấu hiệu yếu (VinWonders 7/2025; Foody mới nhất 10/2020) |
| 7 | Lẩu gà lá é 89 Hai Bà Trưng (Tao Ngộ) | lẩu gà lá é | 89 | [VinWonders 30/07/2025](https://vinwonders.com/vi/bai-viet-du-lich/quan-lau-ga-la-e-da-lat-ngon-nhat/) · [mia.vn 23/07/2026](https://mia.vn/cam-nang-du-lich/quan-lau-ga-la-e-da-lat-16285) · [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/lau-ga-la-e-da-lat) · [Foody](https://www.foody.vn/lam-dong/lau-ga-la-e-hai-ba-trung) | cao | có dấu hiệu (mia 7/2026) |
| 8 | Gà nướng ôm xôi – cơm lam Tư Béo | gà nướng cơm lam, lẩu gà | 321 | [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/ga-nuong-com-lam-da-lat) · [mia.vn 10/01/2026](https://mia.vn/cam-nang-du-lich/quan-an-ngon-da-lat-19896) · [mia.vn 23/02/2026](https://mia.vn/cam-nang-du-lich/ga-nuong-com-lam-da-lat-20029) | cao | có dấu hiệu (mia 1–2/2026) |
| 9 | Chùa Linh Quang | chùa | 133 | [VinWonders 14/12/2025](https://vinwonders.com/vi/wonderpedia/news/chua-linh-quang-da-lat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/chua-linh-quang-da-lat-13839) · [Tatinta](https://tatinta.com/diem-den/chua-linh-quang/8259) | cao | còn hoạt động (VinWonders 12/2025, ghi phường Cam Ly) |
| 10 | Bún đậu Cô Oanh | bún đậu mắm tôm | 5 | [VinWonders 14/07/2025](https://vinwonders.com/vi/wonderpedia/news/bun-dau-mam-tom-da-lat/) · [Toplist](https://toplist.vn/top-list/quan-bun-dau-ngon-nhat-tp-da-lat-lam-dong-57924.htm) · [Foody](https://www.foody.vn/lam-dong/bun-dau-co-oanh) | trung bình | dấu hiệu yếu (VinWonders ghi phường Cam Ly; Foody báo >3 tháng không tương tác) |
| 11 | Hương Quê Quán | cơm gia đình, gà nướng | hẻm 27 | [Toplist](https://toplist.vn/top-list/quan-an-trong-hem-ngon-va-dong-khach-nhat-da-lat-31900.htm) · [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/ga-nuong-com-lam-da-lat) | trung bình | không rõ |

## Cần kiểm thêm

| Tên | Số nhà | Nguồn | Vì sao |
|---|---|---|---|
| Hủ tiếu Nam Vang Gia Cát | 221/9 (hẻm Cây Đa) | Toplist (2 bài) · Mytour (bản dịch) | VinWonders ghi 15 Trần Bình Trọng → chỉ 1 nguồn độc lập cho địa chỉ Hai Bà Trưng |
| Quán ăn Dung 65 | 291 | mia.vn · Mytour | Mytour viết lại bài mia → 1 nguồn; Foody không có trang |
| Cô Ba Cà Phê (cà phê trứng) | 105 | Toplist | 1 nguồn; trang web riêng của quán nay là trang khác hẳn → nghi đã đổi/đóng |
| Lẩu gà lá é 313 | 313 | Mytour | 1 nguồn, không tên riêng |
| Gà nướng cơm lam Huy Hoàng | 116 | Vietnam Airlines | 1 nguồn |
| 18 Độ C (cà phê) | 286 | Vietnam Airlines | 1 nguồn |
| Lẩu cá tầm Ngư Sơn (chi nhánh) | 58 | Toplist | 1 nguồn |
| Lẩu Dê Tay Cầm Ngân (chi nhánh) | 134 | Toplist | 1 nguồn |
| Ốc vỉa hè 20k | 239 | VinWonders | 1 nguồn |
| Ghiền Ăn (chi nhánh 2) | 234 | Toplist · Mytour (chép lại) | 1 nguồn |
| Nhà hàng Memory | 293 | VinWonders | 1 nguồn |
| Kafein Coffee | 451 | OSM | chỉ OSM |
| Tiệm Cà Phê & Bánh Mì RÒM | 365 | OSM | chỉ OSM |
| Highlands Coffee | 01-03 | OSM | chỉ OSM; chuỗi lớn |

## Chỗ còn nghi
1. **"33" là tên nhiều quán**: Quán 33 có cơ sở 32 (gốc theo mia), 181 (số cũ 33), 3/10–3/12, 41, 157; còn "Bích 33" ở 224. Bài 16 quán ốc của VinWonders gán 181/32 cho Bích 33 — lẫn tên. Chưa rõ các "33" là một chủ hay nhiều chủ. Em tách theo số nhà, ghi đúng tên từng nguồn dùng.
2. **Số nhà đổi**: 181 = số cũ 33 (mia 2026). Hẻm 27 cũ có thể là hẻm 3 nay (Mytour ghi "3/10 hẻm 27 cũ") → Hương Quê Quán chưa có số nhà chắc. "4D và 41" chưa rõ là 1 hay 2 chỗ.
3. **Lẩu gà 89 có phải "Tao Ngộ"?** mia và Vietnam Airlines gọi Tao Ngộ; VinWonders, Foody không. Tao Ngộ nổi tiếng nhất ở đường 3/4.
4. **Năm lập chùa Linh Quang** lệch: 1931 (mia, Tatinta) và 1921 (VinWonders). Không đưa năm vào câu giới thiệu.
5. "Còn mở" dựa vào bài tổng hợp cập nhật 2025–2026, không phải xác nhận trực tiếp. Vietnam Airlines không ghi ngày.
6. Kho game không có phố Hai Bà Trưng; tài liệu game (2026-11-24_pho_moi_da_lat.md) từng loại đường này vì "rời rạc, ít nguồn mới" — em thấy nguồn mới đủ cho chủ đề ốc nhồi. Không thấy game ghi sai gì cần báo.

## Kiểm thêm 25/11/2026

Tìm thêm nguồn cho các nơi trong "Cần kiểm thêm" (WebSearch + đọc trang bằng curl; không dùng Google Maps). Cách tính: ≥ 2 trang khác nhau; VinWonders/Vinpearl tính 1; bài chép lại tính 1.

**Chuyển sang danh sách chính: 4 nơi. Đã đóng hẳn: 0.**

| Tên | Số nhà | Nguồn | Độ tin cậy | Còn mở? |
|---|---|---|---|---|
| Hủ tiếu Nam Vang Gia Cát | 221/9 (hẻm) | [Toplist](https://toplist.vn/top-list/dia-chi-an-hu-tieu-nam-vang-chat-luong-nhat-da-lat-31751.htm) · [VinWonders 20/07/2025](https://vinwonders.com/vi/wonderpedia/news/hu-tieu-nam-vang-da-lat/) · [Foody](https://www.foody.vn/lam-dong/gia-cat-hu-tieu-nam-vang-dua-dam-da-lat) | trung bình | không rõ (Foody bình luận mới nhất 01/2021) |
| Gà nướng cơm lam Huy Hoàng | 453 | [Toplist](https://toplist.vn/top-list/quan-com-lam-ngon-va-chat-luong-nhat-tai-lam-dong-33101.htm) · [mia.vn 09/2023](https://mia.vn/cam-nang-du-lich/ga-nuong-com-lam-mon-an-dan-da-khong-the-bo-qua-khi-du-lich-da-lat-1277) · [Mytour 1/11/2026](https://mytour.vn/vi/blog/xep-hang/top-5-quan-ga-nuong-com-lam-da-lat-thom-ngon-dam-da-huong-vi-nui-rung-mytour.html) | trung bình | có dấu hiệu (Mytour 11/2026) |
| Lẩu cá tầm Ngư Sơn (cơ sở 2) | 58 | [Toplist quán nhậu](https://toplist.vn/top-list/nhung-quan-nhau-khong-the-bo-qua-khi-di-du-lich-da-lat-30820.htm) · [mia.vn 28/11/2025](https://mia.vn/cam-nang-du-lich/top-quan-lau-da-lat-ngon-nuc-tieng-19708) | trung bình | có dấu hiệu (mia 11/2025) |
| Lẩu Dê Tay Cầm Ngân | 32C | [Foody](https://www.foody.vn/lam-dong/de-tay-cam-ngan-hai-ba-trung) · [mia.vn 09/2023](https://mia.vn/cam-nang-du-lich/de-mia-vn-dat-ban-den-top-8-quan-lau-ngon-tai-da-lat-1332) | trung bình | không rõ (mới nhất 10/2023) |

Chốt số nhà:
- **Huy Hoàng**: 3 trang ghi 453; Vietnam Airlines (không rõ ngày) ghi 116, số điện thoại khác → chốt 453, ghi chú 116 trong `ghi_chu`.
- **Cầm Ngân**: Foody + mia ghi 32C; Toplist hai bài ghi 134 và 34 → chốt 32C. Số 134 cũ trong mục cần kiểm là sai.
- **Gia Cát**: VinWonders bài hủ tiếu ghi 221/9 (bài quán ăn ngon ghi 15 Trần Bình Trọng, có thể là cơ sở 2).

Vẫn chưa đủ: Dung 65 (chỉ mia.vn + Mytour chép), Ghiền Ăn (chỉ Toplist), 18 Độ C (không thấy trang nào khác; Foody "18 độ C" là quán ở TP.HCM). Các nơi còn lại chưa kịp tìm lần này.
