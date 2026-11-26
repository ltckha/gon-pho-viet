# Thác Datanla — bên đèo Prenn, phía nam Đà Lạt (26/11/2026)

Kết quả: `data/pho/datanla.json`, chuyện: `data/chuyen/datanla.json`. Loại nơi: **điểm** (`diem`), không phải con đường. Theo hướng mới: địa lý và lịch sử là chính, không bày quán.
**6 nơi đạt ≥ 2 nguồn ở 2 trang khác nhau**, 4 mục cần kiểm thêm. Thác Prenn và Thiền viện Trúc Lâm đã có trong nơi `truc-lam`; ở đây chỉ ghi làm mốc gần.

Cách làm: tải OSM quanh thác (bbox 108.440,11.893,108.458,11.908), hỏi Nominatim (User-Agent "gon-pho-viet-map/1.0", cách nhau ≥ 1,2 giây), tìm báo (Tuổi Trẻ, Dân trí, Thanh Niên, Báo Lâm Đồng, Báo Thanh Tra, Doanh nhân – Báo Pháp luật, Tiền Phong, Nhân Dân, SGGP), văn bản tỉnh (QĐ 298/QĐ-UBND năm 2007), Wikipedia, RCDB. Không dùng Google Maps.

## Tên đường — tự kiểm
Thác nằm bên **đường Đèo Prenn** (Quốc lộ 20 đoạn qua đèo). Trong `duong.json` có "Đèo Prenn" (đoạn gần nhất cách điểm thác khoảng 130 m) và "Quốc lộ 20" (chủ yếu là đoạn đi Trại Mát). Đường "Trúc Lâm Yên Tử" rẽ khỏi đèo cạnh thác (khoảng 440 m), dẫn vào Thiền viện Trúc Lâm. Trên OSM có một hẻm ghi sai chính tả "Hẻm 63 Đèo Prem"; em không dùng.

## Phường

| Nơi | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Đèo Prenn: ngã ba Mimosa – Prenn → Cầu Prenn | P3 | **Xuân Hương - Đà Lạt** | chắc | [thuviennhadat deo-prenn-phuong-3](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/deo-prenn-phuong-3) |
| Dự án khu du lịch sinh thái thác Datanla | P3 | Xuân Hương - Đà Lạt | chắc | [Doanh nhân – Báo Pháp luật 04/2017](https://doanhnhan.baophapluat.vn/lam-dong-dau-tu-3242-ty-xay-dung-khu-du-lich-sinh-thai-thac-datanla-1647.html) ("phường 3"); [Báo Thanh Tra 07/2026](https://thanhtra.com.vn/ket-luan-thanh-tra-E17BD7A25/lam-dong-thanh-tra-chi-ro-ton-tai-kien-nghi-thao-go-vuong-mac-tai-du-an-khu-du-lich-sinh-thai-thac-datanla-818acd62f.html) ("phường Xuân Hương - Đà Lạt") |

NQ 1671 mục 99: Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt. Nominatim cũng ghi "Phường Xuân Hương - Đà Lạt". Theo ranh `phuong.json`, điểm thác, ga xe trượt và thác Prenn đều nằm trong Xuân Hương.
Cách Chợ Đà Lạt khoảng 4,9 km đường chim bay (theo OSM); báo ghi khoảng 5 km.

## Câu giới thiệu
"Thác Datanla: thác cao khoảng 20 m bên đèo Prenn (người Pháp mở năm 1943), cách trung tâm Đà Lạt khoảng 5 km; tên gốc tiếng K'Ho 'Đạh Tam N'ha' nghĩa là 'dưới lá có nước', nay là khu du lịch có đường xe trượt xuyên rừng thông xuống chân thác."
- "20 m": [Wikipedia](https://vi.wikipedia.org/wiki/Th%C3%A1c_%C4%90atanla), [Dân trí 27/02/2016](https://dantri.com.vn/du-lich/kham-pha-ngon-thac-tu-than-khien-ba-du-khach-tu-nan-tren-da-lat-20160226221337186.htm) (cả hai ghi "khoảng 20 m").
- "1943": [Thanh Niên 25/11/2026](https://thanhnien.vn/ky-thu-nhung-cung-deo-giai-ma-ten-goi-deo-prenn-185261124202911093.htm) (khởi công tháng 2/1943), [DTiNews 14/12/2023](https://dtinews.dantri.com.vn/print/20231214134302770.htm) ("built by France in 1943").
- "5 km": Dân trí 2016, [Tuổi Trẻ 26/02/2016](https://tuoitre.vn/3-du-khach-nuoc-ngoai-tu-nan-tai-thac-datanla-da-lat-1057687.htm), [Báo Lâm Đồng 10/02/2026](https://baolamdong.vn/print/423389.html).
- "Đạh Tam N'ha – dưới lá có nước": Wikipedia, Dân trí 2016, Thanh Niên 2026 ("nước giấu dưới tán lá").

## Danh sách chính (≥ 2 nguồn)

| # | Tên | Loại | Đường OSM | Nguồn | Tin cậy | Vị trí OSM |
|---|---|---|---|---|---|---|
| 1 | Thác Datanla (Đatanla) | thác nước, cao khoảng 20 m | Đèo Prenn | [Wikipedia](https://vi.wikipedia.org/wiki/Th%C3%A1c_%C4%90atanla) · [Dân trí 2016](https://dantri.com.vn/du-lich/kham-pha-ngon-thac-tu-than-khien-ba-du-khach-tu-nan-tren-da-lat-20160226221337186.htm) · [Thanh Niên 2026](https://thanhnien.vn/ky-thu-nhung-cung-deo-giai-ma-ten-goi-deo-prenn-185261124202911093.htm) · [OSM](https://www.openstreetmap.org/node/4502225092) | cao | node/4502225092 (108.4488444, 11.9011774) |
| 2 | Đường xe trượt Datanla | alpine coaster | Đèo Prenn | [Tuổi Trẻ 2023](https://tuoitre.vn/cam-nang-du-lich-da-lat-diem-den-da-ngoai-ket-hop-the-thao-20230408171213813.htm) · [RCDB đường cũ](https://rcdb.com/14139.htm) · [RCDB đường mới](https://rcdb.com/18600.htm) · [VCCI 07/2010](https://www.vccinews.com/prode/20789/.html) · [Báo Lâm Đồng 2026](https://baolamdong.vn/print/423389.html) | cao (chiều dài lệch) | way/1275560475 "Xe Truot Moi" (108.4475498, 11.90299) |
| 3 | Khu du lịch sinh thái thác Datanla | khu du lịch mạo hiểm | Đèo Prenn | [Báo Thanh Tra 07/2026](https://thanhtra.com.vn/ket-luan-thanh-tra-E17BD7A25/lam-dong-thanh-tra-chi-ro-ton-tai-kien-nghi-thao-go-vuong-mac-tai-du-an-khu-du-lich-sinh-thai-thac-datanla-818acd62f.html) · [Doanh nhân 04/2017](https://doanhnhan.baophapluat.vn/lam-dong-dau-tu-3242-ty-xay-dung-khu-du-lich-sinh-thai-thac-datanla-1647.html) · [Báo Lâm Đồng 2026](https://baolamdong.vn/print/423389.html) · [Tuổi Trẻ 2016](https://tuoitre.vn/3-du-khach-nuoc-ngoai-tu-nan-tai-thac-datanla-da-lat-1057687.htm) · [QĐ 298/QĐ-UBND 2007](https://caselaw.vn/van-ban-phap-luat/219276-quyet-dinh-so-298-qd-ubnd-ngay-18-01-2007-ve-muc-thu-nop-che-do-quan-ly-su-dung-phi-vao-cong-tham-quan-va-phi-trong-giu-xe-tai-khu-du-lich-thac-datanla-da-lat-lam-dong-do-uy-ban-nhan-dan-tinh-lam-dong-ban-hanh-van-ban-het-hieu-luc) | cao | không (OSM không có ranh khu) |
| 4 | Đèo Prenn | con đèo, 1943 | Đèo Prenn | [Thanh Niên 2026](https://thanhnien.vn/ky-thu-nhung-cung-deo-giai-ma-ten-goi-deo-prenn-185261124202911093.htm) · [DTiNews 2023](https://dtinews.dantri.com.vn/print/20231214134302770.htm) · [Tiền Phong 2024](https://tienphong.vn/thong-xe-toan-tuyen-deo-prenn-tu-ngay-3112024-post1608879.tpo) · [Nhân Dân 2024](https://nhandan.vn/ocop/thong-xe-tuyen-deo-prenn-thanh-pho-da-lat-tu-sang-311-post794457.html) | cao | không (là đường) |
| 5 | Thác Prenn | thác, khu du lịch | Quốc lộ 20 | [SGGP 10/2026](https://www.sggp.org.vn/doi-thay-o-khu-du-lich-thac-prenn-post875448.html) · [mia](https://mia.vn/cam-nang-du-lich/kham-pha-ve-dep-hung-vi-cua-thac-prenn-da-lat-1465) · [Thanh Niên 2026](https://thanhnien.vn/ky-thu-nhung-cung-deo-giai-ma-ten-goi-deo-prenn-185261124202911093.htm) · [OSM](https://www.openstreetmap.org/node/4096525696) | cao | node/4096525696 (108.4701041, 11.8765192) |
| 6 | Thiền viện Trúc Lâm | thiền viện, 1993–1994 | Trúc Lâm Yên Tử | [Wikipedia](https://vi.wikipedia.org/wiki/Thi%E1%BB%81n_vi%E1%BB%87n_Tr%C3%BAc_L%C3%A2m_(%C4%90%C3%A0_L%E1%BA%A1t)) · [Wikipedia EN](https://en.wikipedia.org/wiki/Tr%C3%BAc_L%C3%A2m_Monastery_of_Da_Lat) · [vietnamtourism.com](https://www.vietnamtourism.com/vi/thien-vien-truc-lam-da-lat-lich-su-diem-tham-quan-va-cach) · [OSM](https://www.openstreetmap.org/way/1356287796) | cao | way/1356287796 (108.4347865, 11.9041575) |

Khoảng cách chim bay từ thác (OSM): ga xe trượt mới khoảng 250 m về phía tây bắc; Thiền viện Trúc Lâm khoảng 1,6 km về phía tây; thác Prenn khoảng 3,6 km về phía đông nam.

## Cần kiểm thêm

| Tên | Nguồn có | Vì sao |
|---|---|---|
| Suối Đa Tan La (dòng suối qua thác) | [OSM way/753496276](https://www.openstreetmap.org/way/753496276) | chỉ OSM |
| Tên người Lạch "Liang Đam Rơpu Kwăng" (thác con trâu đực té) | [lamdong.gov.vn](https://lamdong.gov.vn/sites/duongpho/tpdalat/SitePages/deo-prenn.aspx) | chỉ thấy qua đoạn trích tìm kiếm; trang lỗi 503 |
| Datanla Pine Karts (2026) | [Báo Lâm Đồng 2026](https://baolamdong.vn/print/423389.html) | 1 nguồn |
| Tai nạn hai sinh viên 25/3/2010 | [Wikipedia](https://vi.wikipedia.org/wiki/Th%C3%A1c_%C4%90atanla) | chỉ Wikipedia |

## Lịch sử (tóm, chi tiết trong `data/chuyen/datanla.json`)
- Tên K'Ho **Đạh Tam N'ha** – "dưới lá có nước"; người Pháp đọc thành Datanla; có khi chép nhầm "Dalanta".
- **2/1943** người Pháp khởi công đèo Prenn (Thanh Niên, DTiNews).
- **1976** thành lập Công ty Du lịch Lâm Đồng (chỉ Báo Lâm Đồng — 1 nguồn).
- **≤ 2006** đã có đường xe trượt (RCDB; VCCI 2010 xác nhận có trước 2010).
- **18/1/2007** QĐ 298/QĐ-UBND về phí vào cổng khu du lịch thác Đatanla (văn bản, 1 nguồn).
- **26/2/2016** ba du khách Anh tử nạn khi vượt thác theo tour của công ty tư nhân (Tuổi Trẻ, Dân trí, Lonely Planet).
- **10/4/2017** tỉnh chấp thuận dự án khu du lịch sinh thái 324,2 tỷ đồng (Báo Thanh Tra, Doanh nhân); RCDB ghi đường xe trượt mới năm 2017.
- **12/2023 – 31/1/2024** mở rộng đèo Prenn, đoạn từ thác Datanla thông xe trước.
- **1/7/2025** vào phường Xuân Hương - Đà Lạt; **4/12/2025** sạt lở đèo gần thác.
- **10/6/2026** kết luận thanh tra: dự án chậm tiến độ (1 nguồn).
- Chuyện: ba truyền thuyết về tên (quân Chăm thua vì không biết dưới lá có nước; tiên tắm; K'Lang – Hơbiang và Vực Tử Thần); cảnh phim Ván bài lật ngửa (chỉ Thanh Niên — 1 nguồn).

## Chỗ còn nghi
1. **Chiều dài xe trượt**: 2.400 m (Tuổi Trẻ) / khoảng 1.000 m (Wikipedia) / 805 m và 1.700 m (RCDB, hai đường) → không ghi.
2. **Diện tích**: 312 ha (Dân trí 2016) / dự án 106,09 ha (Báo Thanh Tra 2026).
3. **Năm có xe trượt đầu tiên**: chưa rõ, chỉ biết muộn nhất 2006.
4. Không tìm thấy văn bản xếp hạng di tích hay danh thắng cho thác Datanla.
5. Wikipedia ghi "cách thác Prenn 8 km"; OSM đo khoảng 3,6 km chim bay → không dùng.
6. Không ghi giá vé (các trang ghi khác nhau, hay đổi).
