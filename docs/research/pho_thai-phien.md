# Làng Hoa Thái Phiên — đường Thái Phiên (25/11/2026)

Kết quả: `data/pho/thai-phien.json`, chuyện của phố: `data/chuyen/thai-phien.json`. **5 nơi** đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 5 nơi cần kiểm thêm, chưa thấy nơi nào đã đóng hẳn.

**Nói thẳng:** dọc đường Thái Phiên em **không tìm được quán ăn, cà phê hay homestay nào có đủ 2 nguồn**. Bài du lịch về "làng hoa Thái Phiên" gần như chỉ tả vườn hoa chung chung. Vì vậy danh sách chính toàn là mốc của làng: đình, chợ, trường, hồ, núi Hòn Bồ.

Cách làm: kho game không có phố này. Em tải dữ liệu OSM khu Thái Phiên (`api.openstreetmap.org/api/0.6/map`, 6 ô trong bbox 108.466–108.496, 11.955–11.992). OSM ở đây rất thưa: chỉ có Chợ Thái Phiên, Trường Tiểu học Thái Phiên, Hồ Thái Phiên, 1 chùa chưa ghi tên, cây xăng. Sau đó em tìm trên báo (Báo Lâm Đồng, Thanh Niên, Sức khỏe & Đời sống, VnExpress), trang Hiệp hội Hoa Đà Lạt (dfa.com.vn) và trang du lịch.
Quy ước nguồn: 2 bài cùng một trang chỉ tính 1. Mytour chép gần nguyên bài mia về Hòn Bồ → không tính riêng. mia "Làng hoa Thái Phiên" ghi nguồn halotravel → tính chung với halotravel. Báo Pháp luật đăng lại bài Báo Lâm Đồng (LĐ online 31/01/2011) → tính là Báo Lâm Đồng. Không dùng Google Maps, không dùng Vinpearl. Chưa đi thực tế.
Cổng thông tin tỉnh (`lamdong.gov.vn`, trang "Đường phố Đà Lạt – Thái Phiên" và Địa chí Đà Lạt) trả lỗi 503 khi em mở (curl và WebFetch, cả http lẫn https). Những ý lấy từ trang này em chỉ đọc được qua **đoạn trích của công cụ tìm kiếm**, nên đều ghi rõ.

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Thái Phiên | Đầu đường (ngã ba Ngô Gia Tự) – Nguyễn Hữu Cầu | P12 | Lâm Viên - Đà Lạt | chắc | [thuviennhadat thai-phien-phuong-12](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/thai-phien-phuong-12) |
| Thái Phiên | Nguyễn Hữu Cầu – đập nước (hồ Thái Phiên) | P12 | Lâm Viên - Đà Lạt | chắc | cùng trang trên |
| Thái Phiên | Qua đập tới đầu phía bắc (khoảng 570 m) | chưa rõ (bảng giá chỉ ghi tới đập) | Lâm Viên - Đà Lạt | khá chắc | ranh giới `phuong.json` |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021) ghi "Thái Phiên - PHƯỜNG 12", 2 đoạn: đầu đường → Nguyễn Hữu Cầu (4.000.000 đ/m²) và Nguyễn Hữu Cầu → Đập nước (2.400.000 đ/m²). Đổi theo `data/lam-dong/nq1671.json` mục 101 (Phường 8, 9, 12 → Lâm Viên - Đà Lạt).
`ward` = **Lâm Viên - Đà Lạt**. Kiểm chéo: mọi điểm của 3 đoạn OSM "Thái Phiên" đều nằm trong ranh Lâm Viên (`phuong.json`); [Báo Lâm Đồng 12/10/2026](https://baolamdong.vn/lang-hoa-thai-phien-truoc-them-festival-468966.html) cũng viết "Thái Phiên, phường Lâm Viên - Đà Lạt".
Tên trong OSM (`duong.json`, trường `ten`): "Thái Phiên" — khớp (3 đoạn: 969 m + 1.933 m + 568 m ≈ 3,5 km). Đầu phía tây nối đúng vào Ngô Gia Tự. `duong.json` còn có mốc "Chợ Thái Phiên" và mặt nước "Hồ Thái Phiên".

Chiều dài lệch: cổng tỉnh (đoạn trích) ghi **1.830 m, lộ giới 20 m, từ Ngô Gia Tự tới đập Thái Phiên**; [tinbds](https://tinbds.com/lam-dong/da-lat/duong-thai-phien) ghi khoảng 3,5 km tới Huỳnh Tấn Phát. Theo OSM tới đập khoảng 2,9 km, cả đoạn qua đập khoảng 3,5 km. Em không ghi chiều dài vào câu giới thiệu.

## Câu giới thiệu
"Làng Hoa Thái Phiên: ấp do khoảng 40 hộ người Việt từ Lào hồi hương lập năm 1956 trên vùng đồi từng là nơi vua Bảo Đại săn bắn, nay là làng nghề trồng hoa truyền thống (tỉnh công nhận cuối năm 2009) với khoảng 150 ha hoa, phần lớn trong nhà kính, chủ lực là hoa cúc; đêm xuống đèn nhà kính sáng cả triền đồi."
- "khoảng 40 hộ … từ Lào hồi hương", "1956": [Hiệp hội Hoa Đà Lạt](http://www.dfa.com.vn/content-c/tin-tuc/lang-nghe-truyen-thong-lang-hoa-thai-phien-phuong-12-thanh-pho-da-lat.html) · [Sức khỏe & Đời sống 01/11/2013](https://suckhoedoisong.vn/thai-phien-lang-hoa-lang-du-lich-16921470.htm) · [Thanh Niên 16/01/2010](https://thanhnien.vn/lang-hoa-ti-phu-185262951.htm) (40 hộ hồi hương, năm 1956 lập ấp).
- "nơi vua Bảo Đại săn bắn": cả 3 nguồn trên.
- "làng nghề truyền thống, công nhận cuối năm 2009": QĐ 3108/QĐ-UBND ngày 16/12/2009 ([Hiệp hội Hoa](http://www.dfa.com.vn/content-c/tin-tuc/lang-nghe-truyen-thong-lang-hoa-thai-phien-phuong-12-thanh-pho-da-lat.html)); [Thanh Niên 01/2010](https://thanhnien.vn/lang-hoa-ti-phu-185262951.htm) "mới đây chính thức được công nhận… đầu tiên tại TP Đà Lạt"; [Báo Lâm Đồng 2011 (bản đăng lại)](https://baophapluat.vn/thai-phien-lang-hoa-thai-binh-post85877.html) "đầu năm 2010… chính thức công nhận".
- "khoảng 150 ha, phần lớn trong nhà kính", "hoa cúc chủ lực": [Báo Lâm Đồng 12/10/2026](https://baolamdong.vn/lang-hoa-thai-phien-truoc-them-festival-468966.html) · [hoadalattravel](https://hoadalattravel.vn/dia-diem-du-lich/lang-hoa-thai-phien/) (150 ha); [Báo Lâm Đồng 28/07/2025](https://baolamdong.vn/lam-vien-da-lat-noi-hoi-tu-cac-lang-hoa-noi-tieng-384040.html) (chuyên canh cúc).
- "đèn nhà kính sáng cả triền đồi": [Thanh Niên 2010](https://thanhnien.vn/lang-hoa-ti-phu-185262951.htm) ("hàng ngàn bóng đèn 3U") · [mia.vn](https://mia.vn/cam-nang-du-lich/lang-hoa-thai-phien-thien-duong-quy-tu-cac-loai-hoa-da-lat-1532).
- Tên "Làng Hoa Thái Phiên": tên chính thức của làng nghề, đúng đặc trưng; không có nguồn nào đếm số nhà vườn trên riêng con đường → không ghi số hộ.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Đình Thái Phiên (đình ấp Thái Phiên) | đình làng, di tích cấp tỉnh | chưa rõ | [Hiệp hội Hoa Đà Lạt](http://www.dfa.com.vn/content-c/tin-tuc/lang-nghe-truyen-thong-lang-hoa-thai-phien-phuong-12-thanh-pho-da-lat.html) · [Sức khỏe & Đời sống 2013](https://suckhoedoisong.vn/thai-phien-lang-hoa-lang-du-lich-16921470.htm) · [cổng tỉnh (đoạn trích)](https://lamdong.gov.vn/sites/duongpho/tpdalat/SitePages/thai-phien.aspx) | trung bình | còn (di tích); nguồn mới nhất 2013 |
| 2 | Chợ Thái Phiên | chợ dân sinh | chưa rõ | [OSM](https://www.openstreetmap.org/way/1362459080) · [mia.vn 06/2026](https://mia.vn/cam-nang-du-lich/trekking-dinh-hon-bo-da-lat-san-bien-may-benh-bong-1478) · [Farmvina](https://caykieng.farmvina.com/cay-mo-hoa-cuc/) · [cổng tỉnh (đoạn trích)](https://lamdong.gov.vn/sites/duongpho/tpdalat/SitePages/thai-phien.aspx) | cao | còn (OSM 02/2025, mia 06/2026) |
| 3 | Trường Tiểu học Thái Phiên | trường học, mốc rẽ lên Hòn Bồ | chưa rõ (OSM: addr:street Thái Phiên) | [OSM](https://www.openstreetmap.org/way/1362459079) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/hon-bo-da-lat/) · [mia.vn](https://mia.vn/cam-nang-du-lich/trekking-dinh-hon-bo-da-lat-san-bien-may-benh-bong-1478) | cao | còn là trường; không phải điểm tham quan |
| 4 | Hồ Thái Phiên (đập Thái Phiên) | hồ chứa nước tưới, cuối đường | — | [OSM](https://www.openstreetmap.org/way/294905687) · [bảng giá đất](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/thai-phien-phuong-12) ("Đến Đập nước") · [Báo Lâm Đồng 2011 (bản đăng lại)](https://baophapluat.vn/thai-phien-lang-hoa-thai-binh-post85877.html) · [cổng tỉnh (đoạn trích)](https://lamdong.gov.vn/sites/duongpho/tpdalat/SitePages/thai-phien.aspx) | cao | hồ đang dùng; chưa rõ có lối tham quan |
| 5 | Đỉnh Hòn Bồ (Hòn Người Thương) | núi 1.709 m, săn mây, cắm trại | — (rẽ hông trường tiểu học) | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/hon-bo-da-lat/) · [mia.vn 24/06/2026](https://mia.vn/cam-nang-du-lich/trekking-dinh-hon-bo-da-lat-san-bien-may-benh-bong-1478) · [Thanh Niên 2010](https://thanhnien.vn/lang-hoa-ti-phu-185262951.htm) | cao | mở tự do, miễn phí (mia 2026) |

Cả 5 nơi ở phường Lâm Viên - Đà Lạt (Phường 12 cũ). Vị trí OSM: chợ cách mép đường khoảng 20 m, trường khoảng 40 m, tâm hồ khoảng 120 m. Đình và Hòn Bồ chưa có trên OSM → chưa có vị trí, không đoán.
Hòn Bồ không nằm trên đường Thái Phiên; ghi `duong` = Thái Phiên vì lối lên rẽ từ đây (hông Trường Tiểu học Thái Phiên, qua cổng "Tổ dân phố Hòn Bồ").

## Cần kiểm thêm (chưa đủ 2 nguồn độc lập)

| Tên | Đường / số nhà | Nguồn có | Vì sao |
|---|---|---|---|
| Chùa Thiền Lâm | Thái Phiên, chưa rõ số | [mia.vn](https://mia.vn/cam-nang-du-lich/trekking-dinh-hon-bo-da-lat-san-bien-may-benh-bong-1478) · [cổng tỉnh (đoạn trích)](https://lamdong.gov.vn/sites/duongpho/tpdalat/SitePages/thai-phien.aspx) | Nguồn thứ hai chỉ đọc qua đoạn trích. OSM có 1 chùa Phật giáo **chưa ghi tên** giữa chợ và trường ([way/1450009877](https://www.openstreetmap.org/way/1450009877)) — khớp thứ tự "chợ, chùa Thiền Lâm, trường" của mia nhưng không có tên nên không gắn. |
| Farm House Villa | 36 Hòn Bồ, đường Thái Phiên | [hoadalattravel](https://hoadalattravel.vn/dia-diem-du-lich/phuong-12-da-lat/) | 1 nguồn |
| Lãng Villa | Hẻm 1 Thái Phiên | [hoadalattravel](https://hoadalattravel.vn/dia-diem-du-lich/phuong-12-da-lat/) | 1 nguồn; tìm thêm không ra |
| Hoa Anh Hùng Coffee | "Tổ Hòn Bồ", chưa rõ đường | [hoadalattravel](https://hoadalattravel.vn/dia-diem-du-lich/phuong-12-da-lat/) | 1 nguồn |
| Quán nướng Tây Bắc | 76 Ngô Gia Tự | [halotravel](https://halotravel.vn/lang-hoa-thai-phien/) | 1 nguồn, không rõ còn mở |

Không đưa vào: vườn ươm cúc của một hộ dân (46 Bế Văn Đàn, gần chợ — [Farmvina](https://caykieng.farmvina.com/cay-mo-hoa-cuc/)) vì là nhà riêng, không treo biển. Trang hanoidep.vn (bài "Chợ Thái Phiên…") viết chung chung, không dùng làm nguồn.

## Chỗ còn nghi
- **Quán "view làng hoa Thái Phiên"**: blog hay nhắc Panorama Café (Vòng xoay 723, Trại Mát), Túi Mơ To (Hẻm 31 Sào Nam), Sunny Farm, Dốc Sương Mờ. Các quán này ở phía Trại Mát, phường **Xuân Trường - Đà Lạt** (ranh `phuong.json`), cách đầu đường Thái Phiên khoảng 3 km → không thuộc phố này. Hướng dẫn đường của halotravel/mia ("đi hết Hùng Vương rồi rẽ Tự Phước") cũng dẫn về phía Trại Mát chứ không phải đường Thái Phiên.
- **Khoảng cách tới trung tâm**: 7 km (VnExpress, Hiệp hội Hoa, Thanh Niên) hay 12 km (halotravel; mia chép lại) → dùng 7 km nếu cần.
- **Năm hồi hương**: 1954 (Hiệp hội Hoa, SK&ĐS) và "1955–1957" (Báo Lâm Đồng 2011). Năm lập ấp 1956 thì khớp.
- **Tên người đại diện lập ấp**: "Lê Phương Miễn" (Thanh Niên, SK&ĐS). Một đoạn tóm tắt tìm kiếm về Địa chí Đà Lạt ghi "Nguyễn Phương Miễn" — em không mở được Địa chí nên giữ "Lê".
- **mia.vn ghi "người dân Lào" di cư tới** — sai ý: là người Việt sống ở Lào hồi hương.
- **Đình Thái Phiên**: năm khánh thành 1958 / xây lại 1964 và vị trí "dọc đường Thái Phiên" chỉ có ở cổng tỉnh (đoạn trích). Chưa có số nhà.
- **Diện tích** đổi theo năm và cách tính: 78 ha làng nghề, 255 hộ (2010); 250 ha (Báo LĐ 2011) / 260 ha (Hiệp hội Hoa) nhà kính; 436 ha đất nông nghiệp phường 12 (2010); khoảng 150 ha hoa (2026).
- **Dự án nâng đập 6 m** (Báo Lâm Đồng 2011): chưa rõ đã làm chưa.

## Nguồn chính đã đọc
| Nguồn | Ngày | Dùng cho |
|---|---|---|
| [Báo Lâm Đồng — Làng hoa Thái Phiên trước thềm Festival](https://baolamdong.vn/lang-hoa-thai-phien-truoc-them-festival-468966.html) | 12/10/2026 | 150 ha, hơn 40 giống cúc, phường Lâm Viên, chiếu sáng điều tiết hoa |
| [Báo Lâm Đồng — Lâm Viên - Đà Lạt, nơi hội tụ các làng hoa](https://baolamdong.vn/lam-vien-da-lat-noi-hoi-tu-cac-lang-hoa-noi-tieng-384040.html) | 28/07/2025 | phường mới gộp 8, 9, 12; Thái Phiên chuyên canh cúc |
| [Báo Lâm Đồng (đăng lại trên Báo Pháp luật) — Thái Phiên, làng hoa thái bình](https://baophapluat.vn/thai-phien-lang-hoa-thai-binh-post85877.html) | 31/01/2011 | lập ấp 1955–1957, sau 1975, nhà kính 30 → 250 ha, đập Thái Phiên |
| [Hiệp hội Hoa Đà Lạt — Làng nghề truyền thống làng hoa Thái Phiên](http://www.dfa.com.vn/content-c/tin-tuc/lang-nghe-truyen-thong-lang-hoa-thai-phien-phuong-12-thanh-pho-da-lat.html) | chưa rõ | 1954, 1956, giống hoa Cầu Đất, QĐ 3108/2009, khu đình |
| [Sức khỏe & Đời sống — Thái Phiên, làng hoa, làng du lịch](https://suckhoedoisong.vn/thai-phien-lang-hoa-lang-du-lich-16921470.htm) | 01/11/2013 | Lê Phương Miễn, tỉnh trưởng Cao Minh Hiệu, đình di tích cấp tỉnh |
| [Thanh Niên — Làng hoa tỉ phú](https://thanhnien.vn/lang-hoa-ti-phu-185262951.htm) | 16/01/2010 | lời cụ Ngô Đàm, tên ấp, Hòn Bồ, đèn 3U, 90% là cúc |
| [VnExpress — Ba làng hoa nổi tiếng Đà Lạt](https://vnexpress.net/ba-lang-hoa-noi-tieng-da-lat-2919943.html) | chưa rõ | cách trung tâm 7 km, nước suối ra hồ Than Thở |
| [cổng tỉnh — Đường phố Đà Lạt: Thái Phiên](https://lamdong.gov.vn/sites/duongpho/tpdalat/SitePages/thai-phien.aspx) | — | chỉ đọc qua đoạn trích tìm kiếm (trang lỗi 503) |
