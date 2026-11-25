# Phố Chợ Đêm — Nguyễn Thị Minh Khai (25/11/2026)

Kết quả: `data/pho/nguyen-thi-minh-khai.json`, chuyện: `data/chuyen/nguyen-thi-minh-khai.json`. 7 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 7 nơi cần kiểm thêm, không có nơi nào em thấy đã đóng hẳn.

Cách làm: kho game không có phố này. Em tìm từ đầu trên báo (Báo Lâm Đồng, VTC News), trang du lịch (Vietnam Airlines, mia.vn, VinWonders, Mytour, Vietnamtourism), Foody, trang đặt phòng (Vietnambooking, Trip.com), Wanderlog (dữ liệu Google) và trang chính thức Langfarm.
Quy ước nguồn: 2 bài cùng một trang chỉ tính 1; VinWonders + Vinpearl cùng tập đoàn chỉ tính 1. Wanderlog/Airbnb đều lấy dữ liệu Google, đi cùng nhau không tính là 2. Không dùng Google Maps. Hotels.com chặn tải (429) nên chỉ ghi khi có nguồn khác đọc được. Chưa đi thực tế.

Đường ngắn: trên OSM chỉ là 1 đoạn chừng 230 m từ chợ Đà Lạt xuống bùng binh phía hồ Xuân Hương. Gần như mọi thứ trên đường xoay quanh chợ Đà Lạt và chợ đêm; quán ăn có tên tuổi đứng riêng thì ít, phần lớn là quầy, sạp trong chợ (không có số nhà rõ) và khách sạn.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Nguyễn Thị Minh Khai | Trọn đường | P1 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat nguyen-thi-minh-khai-phuong-1](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/nguyen-thi-minh-khai-phuong-1): bảng giá đất QĐ 02/2020 (sửa bởi QĐ 16/2021) ghi "Nguyễn Thị Minh Khai - PHƯỜNG 1, Trọn đường", vị trí 1: 56.000.000 đ/m² |

Đổi phường theo `data/lam-dong/nq1671.json` mục 99: Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt.
Kiểm chéo: hai đầu đoạn OSM "Nguyễn Thị Minh Khai" (id 51561533) trong `duong.json` đều nằm trong ranh giới Xuân Hương - Đà Lạt (`phuong.json`). Báo Lâm Đồng (10/11/2026), trang Langfarm, VinWonders (2025) đều ghi "phường Xuân Hương - Đà Lạt".
Tên trong OSM (`duong.json`, trường `ten`): "Nguyễn Thị Minh Khai" — khớp, 1 đoạn.

## Câu giới thiệu
"Phố Chợ Đêm: đoạn dốc Nguyễn Thị Minh Khai trước chợ Đà Lạt, ban ngày là chợ, tối thành chợ đêm với 591 hộ kinh doanh bán áo len, đặc sản, đồ ăn vặt như bánh tráng nướng, dâu lắc."
- "591 hộ kinh doanh… quần áo, sản phẩm len, đặc sản…": [Báo Lâm Đồng 10/11/2026](https://baolamdong.vn/da-lat-them-khong-gian-kinh-te-dem-truoc-them-festival-hoa-473734.html), lời Phó Chủ tịch UBND phường Xuân Hương - Đà Lạt. Một nguồn, nhưng là báo tỉnh dẫn lời phường.
- Các nguồn khác ghi khác: [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/cho-dem-da-lat) "từ năm 2019… hơn 150 gian hàng"; dalat.app "khoảng hơn 200 gian" (trang này ghi sai phường và địa chỉ Big C nên không dùng).
- "dốc": [mia.vn](https://mia.vn/cam-nang-du-lich/review-cho-dem-da-lat-18843) gọi "dốc chợ Đà Lạt".
- "bánh tráng nướng, dâu lắc": [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/cho-dem-da-lat), [Vietnamtourism](https://www.vietnamtourism.com/vi/am-thuc-a-lat-ca-phe-lau-va-o-an-uong-pho) ("hàng chục quầy" bánh tráng nướng).

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Chợ Đà Lạt | chợ trung tâm | chưa rõ | [Wikipedia](https://vi.wikipedia.org/wiki/Ch%E1%BB%A3_%C4%90%C3%A0_L%E1%BA%A1t) · [Vietnambooking](https://www.vietnambooking.com/du-lich/blog-du-lich/tham-quan-cho-da-lat.html) · [mia.vn](https://mia.vn/cam-nang-du-lich/kham-pha-cho-da-lat-khu-cho-sam-uat-hang-dau-thanh-pho-ngan-hoa-1331) · [Wanderlog](https://wanderlog.com/place/details/9768813) | cao | có (mia cập nhật 10/08/2026 ghi phường mới) |
| 2 | Chợ đêm Đà Lạt (chợ Âm Phủ) | chợ đêm | chưa rõ (VinWonders ghi 6B) | [Báo Lâm Đồng](https://baolamdong.vn/da-lat-them-khong-gian-kinh-te-dem-truoc-them-festival-hoa-473734.html) · [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/cho-dem-da-lat) · [mia.vn](https://mia.vn/cam-nang-du-lich/review-cho-dem-da-lat-18843) · [VinWonders 14/12/2025](https://vinwonders.com/vi/wonderpedia/news/cho-dem-da-lat/) · [Wanderlog](https://app.wanderlog.com/place/details/2184408) | cao | đang họp (Báo Lâm Đồng 11/2026) |
| 3 | Langfarm Buffet & Store Chợ Đêm Đà Lạt | đặc sản, buffet đồ sấy | 6 | [Langfarm (chính thức)](https://www.langfarm.com/stores) · [Mytour](https://mytour.vn/vi/blog/bai-viet/langfarm-thien-duong-mua-sam-tai-da-lat.html) | cao | có dấu hiệu (trang chính thức ghi phường mới) |
| 4 | Fungi Chingu Chợ Đêm | quán nướng Hàn Quốc | 1 | [Foody](https://www.foody.vn/lam-dong/fungi-chingu-quan-nuong-han-quoc) · [VinWonders 17/07/2025](https://vinwonders.com/vi/bai-viet-du-lich/an-toi-da-lat/) · [Wanderlog](https://wanderlog.com/place/details/2625653) | cao | có dấu hiệu (VinWonders 7/2025 phường mới; Wanderlog không ghi đóng) |
| 5 | Khách sạn Nice Dream | khách sạn | 01 | [Vietnambooking](https://www.vietnambooking.com/hotel/vietnam/khach-san-nice-dream-da-lat.html) · [Trip.com](https://ph.trip.com/hotels/dalat-hotel-detail-6097660/nice-dream-hotel/) · [mia.vn](https://mia.vn/cam-nang-du-lich/top-10-khach-san-da-lat-gia-re-gan-cho-dem-ban-nen-biet-10452) | cao | có (đang nhận đặt phòng) |
| 6 | TTC Hotel – Đà Lạt (TTC Premium) | khách sạn | 4 | [Vietnambooking](https://www.vietnambooking.com/hotel/vietnam/ttc-hotel-da-lat.html) · [mia.vn](https://mia.vn/cam-nang-du-lich/top-10-khach-san-da-lat-gia-re-gan-cho-dem-ban-nen-biet-10452) · [Trip.com](https://ae.trip.com/hotels/dalat-hotel-detail-713949/ttc-hotel-premium-da-lat) | cao | có (đang nhận đặt phòng) |
| 7 | Sandals Flora Hotel | khách sạn | 37-40 | [Vietnambooking](https://www.vietnambooking.com/hotel/vietnam/khach-san-sandals-flora-da-lat.html) · [Trip.com](https://nz.trip.com/hotels/dalat-hotel-detail-88787563/sandals-flora-hotel) · [mia.vn](https://mia.vn/cam-nang-du-lich/top-10-khach-san-da-lat-gia-re-gan-cho-dem-ban-nen-biet-10452) | cao | có (Trip.com: đặt gần nhất 19 giờ trước) |

Ghi chú từng nơi:
- Chợ Đà Lạt: Wanderlog ghi "24 Nguyễn Thị Minh Khai", một kết quả tìm kiếm ghi "01" → để trống số nhà.
- Langfarm: trang chính thức còn 3 điểm khác trên cùng đường (số 2 "Bùng Binh Nước", "Mộng Đẹp" ở cầu thang chợ, điểm trong khách sạn Thanh Bình ở bùng binh chợ). Em gộp làm 1 nơi, chỉ ghi số 6.
- Fungi Chingu số 1 trùng số với khách sạn Nice Dream (Foody ghi các quán KATINAT, Flora ở tầng 2–3 khối văn phòng Nice Dream, 01 Nguyễn Thị Minh Khai).
- Sandals Flora: Vietnambooking, Trip.com ghi "37-40", mia.vn ghi "40".

## Cần kiểm thêm (1 nguồn hoặc nguồn chưa đủ độc lập)

| Tên | Số nhà | Nguồn | Lý do |
|---|---|---|---|
| Quán kem bơ, chè cô Huyền | trong chợ | [VinWonders](https://vinwonders.com/?p=104948), [Vinpearl](https://vinpearl.com/vi/kem-bo-da-lat) | cùng tập đoàn → 1 nguồn; tuổi quán ghi khác nhau (30 / 40 năm) |
| Kem Phụng Chợ Đà Lạt | 76 | [Wanderlog](https://wanderlog.com/list/geoCategory/50880) | 1 nguồn; VinWonders ghi kem Phụng ở 97A Nguyễn Văn Trỗi |
| Sữa đậu nành Sự | 9-52 | [Wanderlog](https://wanderlog.com/list/geoCategory/25890) | 1 nguồn; "9-52" giống số sạp |
| Cao Nguyên Cần (rượu cần) | 28 | [Grantourismo](https://grantourismotravels.com/dalat-markets/) | 1 nguồn, bài cũ |
| Anh Đào - Đặc sản Đà Lạt | 1D | [Foody](https://www.foody.vn/lam-dong/anh-dao-dac-san-da-lat) | 1 nguồn, Foody ghi hơn 3 tháng không tương tác |
| KATINAT - Nguyễn Thị Minh Khai | 01 | [Foody](https://www.foody.vn/lam-dong/katinat-nguyen-thi-minh-khai-da-lat) | 1 nguồn, 0 bình luận |
| Công viên Nguyễn Thị Minh Khai | — | [Báo Lâm Đồng](https://baolamdong.vn/da-lat-them-khong-gian-kinh-te-dem-truoc-them-festival-hoa-473734.html) | 1 nguồn; ~3.000 m², mới là đề xuất làm khu ẩm thực |

Loại ra: "Đà Lạt Phố Cafe - Nguyễn Thị Minh Khai" trên Foody là ở 306 Nguyễn Thị Minh Khai, Quận 3, TP.HCM, không phải Đà Lạt. "Cõi Riêng Cafe" Foody ghi 96/17 Nguyễn Thị Minh Khai, có vẻ ở Bảo Lộc. Foody còn nhiều quán Nguyễn Thị Minh Khai ở Bảo Lộc — không dùng.

## Chuyện của phố (nguồn)

| Ý | Nguồn | 1 nguồn? |
|---|---|---|
| 1929 Chợ Cây; 1937 cháy, SIDEC xây chợ gạch | [Wikipedia](https://vi.wikipedia.org/wiki/Ch%E1%BB%A3_%C4%90%C3%A0_L%E1%BA%A1t); [Saigoneer](https://saigoneer.com/vietnam-heritage/10837-photos-a-nostalgic-look-at-da-lat-market-through-time) (chỉ tên Chợ Cây) | năm 1929, 1937: 1 nguồn |
| 1958 khởi công trên đất sình, KTS Nguyễn Duy Đức, xong 1960; Ngô Viết Thụ sửa mặt tiền | Wikipedia, Saigoneer, [mia.vn](https://mia.vn/cam-nang-du-lich/kham-pha-cho-da-lat-khu-cho-sam-uat-hang-dau-thanh-pho-ngan-hoa-1331) (1958–1960) | không |
| Tên "chợ Âm Phủ": đèn dầu, sương, hàng rong dọc bậc thang trước 1990 | [VTC News 15/08/2026](https://vtcnews.vn/vi-sao-mot-so-ngoi-cho-duoc-goi-la-cho-am-phu-ar1034471.html), [mia.vn](https://mia.vn/cam-nang-du-lich/review-cho-dem-da-lat-18843) | không (nhưng đều là chuyện kể) |
| 2026: 591 hộ, dời hộ bán len sang Lê Thị Hồng Gấm, công viên 3.000 m², 26 tỷ đồng | [Báo Lâm Đồng 10/11/2026](https://baolamdong.vn/da-lat-them-khong-gian-kinh-te-dem-truoc-them-festival-hoa-473734.html) | có |
| Bánh tráng nướng "hàng chục quầy", dâu lắc | [Vietnamtourism](https://www.vietnamtourism.com/vi/am-thuc-a-lat-ca-phe-lau-va-o-an-uong-pho), [Vietnam Airlines](https://www.vietnamairlines.com/vn/vi/useful-information/travel-guide/cho-dem-da-lat) | không |
| 4 điểm Langfarm trên đường | [Langfarm](https://www.langfarm.com/stores) | có |

## Chỗ còn nghi

1. **Tên cũ của đường:** chưa tìm thấy. Bảng tên đường xưa và nay (didulichdalat.wordpress.com) không có dòng Nguyễn Thị Minh Khai.
2. **Số gian/hộ chợ đêm:** 150 (Vietnam Airlines, từ 2019), hơn 200 (dalat.app, không tin), 591 hộ (Báo Lâm Đồng 11/2026). Em dùng 591 vì là số mới nhất từ báo tỉnh dẫn lời phường.
3. **Chợ đêm sắp được sắp xếp lại** trước Festival Hoa 2026 (dời hàng len đi chỗ khác). Câu giới thiệu có thể phải sửa sau đợt này.
4. **Quầy ăn trong chợ** (kem bơ, sữa đậu nành, bánh tráng nướng) có nhiều bài nhắc nhưng thường không có tên/số rõ hoặc chỉ 1 nguồn; cần người đi tận nơi.
5. Danh sách chính có 3 khách sạn: đúng là trên đường này, đủ nguồn, nhưng không phải "đặc trưng" của phố. Nếu anh muốn chỉ giữ chợ, ăn uống, đặc sản thì bỏ 3 dòng đó, còn 4 nơi.
