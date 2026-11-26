# Đường hầm đất sét (Đường hầm điêu khắc) — bờ hồ Tuyền Lâm, phía nam Đà Lạt (26/11/2026)

Kết quả: `data/pho/duong-ham-dat-set.json`, chuyện: `data/chuyen/duong-ham-dat-set.json`. Loại nơi: `diem`. Theo hướng mới: địa lý và lịch sử là chính, không bày quán.
**4 nơi đạt ≥ 2 nguồn ở 2 trang khác nhau** (2 cao, 2 trung bình), 3 nơi cần kiểm thêm. Không trùng Thiền viện Trúc Lâm, Hồ Tuyền Lâm, Cáp treo (đã ở trang `truc-lam`). Lưu ý: `data/pho/truc-lam.json` đang có sẵn mục "Đường hầm điêu khắc" và có Hoa Hồng trong `duong` → cần quyết bỏ hay giữ để không trùng.

Cách làm: Nominatim (tìm "Đường hầm điêu khắc"), tải OSM bbox 108.402,11.875,108.420,11.890 qua api.openstreetmap.org, bảng giá đất thuviennhadat, báo (VnExpress, Zing/Lao Động, Đại Đoàn Kết, Báo Pháp Luật, DTiNews, SGGP English, VnExpress International), trang du lịch (mia, VinWonders). Không dùng Google Maps.

## Bước 0 — khả thi
- Toạ độ OSM: **node/4368051989** "Đường hầm điêu khắc" (name:en "Clay Tunnels - Dalat Star", tourism=attraction), lon 108.4112222, lat 11.8828709. Có thêm way/1237254137 (leisure=park "Clay Tunnels - Dalat Star") và node/6547332885 (artwork).
- Phường mới: điểm nằm trong vùng **Xuân Hương - Đà Lạt** (mã 24781, `phuong.json`); Nominatim cũng ghi vậy.
- Đường có tên trong `duong.json`: **Hoa Hồng** cách điểm khoảng 54 m (OSM way/220068811, tertiary); kế đó Hoa Tường Vi ~770 m, Hoa Phượng Tím ~930 m. → khả thi.
- Cách Chợ Đà Lạt khoảng 7,3 km đường chim bay (tính từ toạ độ OSM); báo ghi 10 km (Báo Pháp Luật, VnExpress Intl) đến 14 km (DTiNews 2015, VinWonders) đường đi.

## Phường

| Đoạn / nơi | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| KDL hồ Tuyền Lâm, nhánh phải: Trần Thánh Tông → công ty CP Sao Đà Lạt (khu có đường hầm) | P4 | **Xuân Hương - Đà Lạt** | chắc | [thuviennhadat khu-du-lich-ho-tuyen-lam-phuong-4](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/khu-du-lich-ho-tuyen-lam-phuong-4) |
| KDL hồ Tuyền Lâm, nhánh trái: Trúc Lâm Yên Tử → dự án Đá Tiên | P3 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat …-nhanh-trai-phuong-3](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/khu-du-lich-ho-tuyen-lam-nhanh-trai-phuong-3) |

Bảng giá đất là QĐ 02/2020 (sửa bởi 16/2021), đã hết hiệu lực 01/01/2026, nhưng vẫn dùng được để biết phường cũ. NQ 1671 mục 99: Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt. mia và VinWonders cũng ghi "Phường 4 cũ, nay Xuân Hương". "Sao Đà Lạt" = Dalat Star (Báo Pháp Luật "khu du lịch Sao Đà Lạt"; OSM "Dalat Star").

## Câu giới thiệu
"Đường hầm đất sét: hầm lộ thiên đắp bằng đất đỏ bazan không nung bên hồ Tuyền Lâm, bắt đầu làm năm 2010, dài khoảng 1,2 km theo báo năm 2014, hai bên vách tái hiện Đà Lạt từ thời Yersin tới nay; ngôi nhà đất sét cạnh hầm có 2 kỷ lục Việt Nam."
- "2010": [DTiNews 05/04/2014](https://dtinews.dantri.com.vn/print/20140404141122937.htm), [SGGP English 12/05/2014](https://en.sggp.org.vn/artist-creates-clay-replicas-of-buildings-by-da-lat-lake-post7042.html), [DTiNews 01/04/2015](https://dtinews.dantri.com.vn/print/20150331210930940.htm).
- "1,2 km": [VnExpress 03/09/2014](https://vnexpress.net/cong-trinh-dieu-khac-dat-set-o-da-lat-3038274.html), [Zing 03/11/2014](https://znews.vn/can-canh-nha-dat-set-duong-ham-dieu-khac-doc-dao-tai-da-lat-post475603.html), [Đại Đoàn Kết 31/07/2016](https://daidoanket.vn/lang-dat-set-10046325.html), SGGP, DTiNews 2014.
- "2 kỷ lục": VnExpress 2014, Đại Đoàn Kết 2016, [Báo Pháp Luật 25/10/2020](https://doanhnhan.baophapluat.vn/ngoi-nha-dat-do-bazan-doc-dao-nhat-viet-nam-34488.html), [VnExpress International 26/10/2020](https://e.vnexpress.net/news/travel/places/mud-house-attracts-curiosity-seekers-in-da-lat-4182320.html).

## Danh sách chính (≥ 2 nguồn)

| # | Tên | Loại | OSM | Nguồn | Tin cậy |
|---|---|---|---|---|---|
| 1 | Đường hầm điêu khắc (Đường hầm đất sét) | hầm điêu khắc đất sét lộ thiên | node/4368051989 | [VnExpress 2014](https://vnexpress.net/cong-trinh-dieu-khac-dat-set-o-da-lat-3038274.html) · [Zing 2014](https://znews.vn/can-canh-nha-dat-set-duong-ham-dieu-khac-doc-dao-tai-da-lat-post475603.html) · [Đại Đoàn Kết 2016](https://daidoanket.vn/lang-dat-set-10046325.html) · [SGGP EN 2014](https://en.sggp.org.vn/artist-creates-clay-replicas-of-buildings-by-da-lat-lake-post7042.html) · [DTiNews 2014](https://dtinews.dantri.com.vn/print/20140404141122937.htm) · [OSM](https://www.openstreetmap.org/node/4368051989) | cao |
| 2 | Ngôi nhà đất sét (đất đỏ bazan không nung) | nhà, 2 kỷ lục Việt Nam | chưa có | VnExpress 2014 · Đại Đoàn Kết 2016 · [Báo Pháp Luật 2020](https://doanhnhan.baophapluat.vn/ngoi-nha-dat-do-bazan-doc-dao-nhat-viet-nam-34488.html) · [VnExpress Intl 2020](https://e.vnexpress.net/news/travel/places/mud-house-attracts-curiosity-seekers-in-da-lat-4182320.html) · Zing · SGGP | cao |
| 3 | Hồ Vô Cực (Infinity lake) | hồ nhỏ, chỗ chụp ảnh | node/12646957834 | [mia 07/2026](https://mia.vn/cam-nang-du-lich/duong-ham-dieu-khac-19769) · [VinWonders 12/2025](https://vinwonders.com/vi/wonderpedia/news/duong-ham-dieu-khac/) · [OSM](https://www.openstreetmap.org/node/12646957834) · [Tri thức qua Báo Mới (chỉ tiêu đề)](https://baomoi.com/ngoai-ho-vo-cuc-duong-ham-dat-set-da-lat-con-goc-check-in-nao-c33178458.epi) | trung bình (chỉ trang du lịch + OSM) |
| 4 | Khu du lịch Đá Tiên | khu du lịch rừng thông ven hồ | node/4926652121 | [thuviennhadat P3 (dự án Đá Tiên)](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/khu-du-lich-ho-tuyen-lam-nhanh-trai-phuong-3) · [mia](https://mia.vn/cam-nang-du-lich/khu-du-lich-da-tien-da-lat-canh-sac-hoang-so-thien-nhien-huu-tinh-1536) · [OSM](https://www.openstreetmap.org/node/4926652121) | trung bình (chưa có báo về lịch sử) |

Khoảng cách tới điểm đường hầm (chim bay, OSM): Hồ Vô Cực ~160 m; Đá Tiên ~700 m về phía đông.

## Mốc lịch sử

| Năm | Việc | Nguồn | Ghi chú |
|---|---|---|---|
| 2008 | Ông Trịnh Bá Dũng tìm ra công thức làm cứng đất bazan không nung (sau 4 năm thử) | Đại Đoàn Kết 2016 | **1 nguồn** cho năm; Báo Pháp Luật, VnExpress Intl xác nhận chuyện công thức, không ghi năm |
| 2010 | Bắt đầu xây nhà đất và đường hầm | DTiNews 2014, SGGP EN 2014, DTiNews 2015, VinWonders | Zing/Lao Động ghi khởi công 2013 — lệch |
| 2014 | Báo ghi sắp xong (dự kiến cuối 2014); nhà đã có 2 kỷ lục Việt Nam | DTiNews 2014, SGGP 2014, VnExpress 09/2014 | Tháng 9/2013 công nhận kỷ lục: chỉ mytour (blog) → không dùng |
| 2015 | Xong sau hơn 3 năm làm, đã bán vé đón khách | DTiNews 04/2015 | **1 nguồn**; ngày mở cửa chính thức chưa rõ |

## Cần kiểm thêm

| Tên | Nguồn có | Vì sao |
|---|---|---|
| Reo 20° Chill in Dalat / Reo Có Gì | [OSM](https://www.openstreetmap.org/node/13057480901) | chỉ OSM, quán mới |
| Modern castle's ruin | [OSM](https://www.openstreetmap.org/node/13057481001) | chỉ OSM, không rõ là gì |
| Nhà hàng Đất Sét, Sơn Lâm Quán | VinWonders | 1 nguồn, lại là quán |

## Chỗ còn nghi
1. **Chiều dài hầm**: 1,2 km (5 báo 2014–2016) / hơn 2 km (mia, VinWonders 2025–2026; có thể đã nới thêm, chưa có báo xác nhận).
2. **Diện tích nhà đất sét**: 90 m² (VnExpress, DTiNews 2014) / gần 100 m² (Zing, Đại Đoàn Kết) / 150 m² (DTiNews 2015) → không ghi.
3. **Năm khởi công**: 2010 (3 báo) / 2013 (Zing).
4. **Vốn**: ~10 triệu USD (DTiNews 2014) / 200 tỷ đồng (blog) → không ghi.
5. **Ngày mở cửa chính thức**: chưa rõ. "Dài nhất thế giới": lời quảng bá, không dùng.
6. Tên tượng ở Hồ Vô Cực (K'Lang – H'Biang): chỉ mia.
7. Đường vào thật sự từ Trần Thánh Tông ("nhánh phải" trong bảng giá đất) — OSM đặt tên đoạn gần nhất là Hoa Hồng; chưa đối chiếu được tên Hoa Hồng với văn bản nhà nước.
