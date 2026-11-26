# Thác Prenn – đèo Prenn — cửa ngõ phía nam Đà Lạt (26/11/2026)

Kết quả: `data/pho/prenn.json`, chuyện: `data/chuyen/prenn.json`. Loại nơi "diem" (ghim đúng điểm thác). Theo hướng mới: địa lý + lịch sử là chính, không bày quán.
**6 mốc đạt ≥ 2 nguồn ở 2 trang khác nhau** (4 mốc có nguồn báo/Wikipedia vững, 2 mốc chỉ dựa 2 bài báo), 5 mục cần kiểm thêm. Không đụng thác Datanla (phiên khác làm). Đèo Prenn đã có trong `truc-lam.json` (là đường của nơi Thiền viện Trúc Lâm); ở đây đèo chỉ là mốc, không tô đường.

Cách làm: Nominatim (User-Agent "gon-pho-viet-map/1.0", cách nhau 1,5 giây), tải OSM bbox 108.462,11.868,108.480,11.886 qua api.openstreetmap.org, đối chiếu `phuong.json`; tìm báo (SGGP, Nhân Dân, Tiền Phong, VnExpress, Báo Văn hóa, VOV, vietnamnet, Báo Đấu thầu, Báo Đầu tư, Kiến Thức, DTiNews), Wikipedia, mia, vinwonders. Không dùng Google Maps.

## Tên đường — tự kiểm
`duong.json` (trường `ten`): "Đèo Prenn" (14 đoạn), "Quốc lộ 20" (vài đoạn sát thác, 108.468–108.471 / 11.874–11.879), "Đèo Mimosa" (7 đoạn); mốc "Thác Prenn" 108.4701, 11.87652 — khớp OSM node/4096525696. OSM còn có khung "Khu Du Lịch Prenn" (way/407607923, ghi "Approx boundary") và suối "Đa Prenn" (way/1239025883). Nominatim gọi đường cạnh khu du lịch là "Đường cao tốc Liên Khương - Prenn" (tên này không có trong `duong.json`).

## Phường

| Đường / nơi | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Đèo Prenn: ngã ba Ba Tháng Tư – Đống Đa → ngã ba Mimosa – Prenn | P3 | **Xuân Hương - Đà Lạt** | chắc | [thuviennhadat deo-prenn-phuong-3](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/deo-prenn-phuong-3) |
| Đèo Prenn: ngã ba Mimosa – Prenn → Cầu Prenn (sát thác) | P3 | Xuân Hương - Đà Lạt | chắc | cùng trang trên |
| Mimosa: Chùa Tàu → ngã ba Mimosa – Prenn | P10 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat mimosa-phuong-10](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/mimosa-phuong-10) |
| Thác Prenn | P3 (mia) | Xuân Hương - Đà Lạt | chắc | [SGGP 08/10/2026](https://www.sggp.org.vn/doi-thay-o-khu-du-lich-thac-prenn-post875448.html), [Wikipedia](https://vi.wikipedia.org/wiki/Th%C3%A1c_Prenn), Nominatim, `phuong.json` |
| QL20 / cao tốc ngay dưới chân đèo, mép nam khu du lịch | chưa rõ (Đức Trọng cũ) | Hiệp Thạnh | khá chắc | `phuong.json`; [Báo Văn hóa 2024](https://baovanhoa.vn/van-hoa/lam-dong-xu-ly-nghiem-xay-dung-trai-phep-tai-thang-canh-quoc-gia-thac-prenn-34495.html) (huyện Đức Trọng cùng xử lý vi phạm ở khu thác) |

NQ 1671 mục 99: P1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt. Ranh rất sát: điểm thác ở Xuân Hương, nhưng chỉ vài trăm mét về phía nam là xã Hiệp Thạnh (mục 6: Hiệp An, Liên Hiệp, Hiệp Thạnh). 2/18 điểm khung khu du lịch trên OSM rơi vào Hiệp Thạnh.
Cách Chợ Đà Lạt khoảng 8,2 km đường chim bay (theo OSM); báo ghi "khoảng 10 km" (đường đi).

## Câu giới thiệu
"Thác Prenn: thác nước dưới chân đèo Prenn, cửa ngõ phía nam Đà Lạt, cách trung tâm khoảng 10 km; con đèo hiện nay do người Pháp làm từ năm 1943 thay con đường cũ đi từ thác lên phố (nay là đèo Mimosa), thác là thắng cảnh quốc gia từ năm 1998, và đèo được mở rộng lên 4 làn xe đầu năm 2024."
- "10 km": [SGGP 2026](https://www.sggp.org.vn/doi-thay-o-khu-du-lich-thac-prenn-post875448.html), [Wikipedia Thác Prenn](https://vi.wikipedia.org/wiki/Th%C3%A1c_Prenn), [vietnamnet EN 2016](https://vietnamnet.vn/en/the-most-famous-waterfalls-in-lam-dong-E163468.html), [VnExpress 2014](https://vnexpress.net/nhung-con-deo-no-hoa-dan-den-da-lat-2957340.html).
- "1943, thay đường cũ": [Wikipedia Đèo Prenn](https://vi.wikipedia.org/wiki/%C4%90%C3%A8o_Prenn) (dẫn Địa chí Lâm Đồng 2001, Đường phố Đà Lạt 2003), [mia 2023](https://mia.vn/cam-nang-du-lich/chinh-phuc-cung-duong-deo-prenn-ngoan-canh-da-lat-mong-mo-1400), [DTiNews 04/12/2023](https://dtinews.dantri.com.vn/print/20231204113308107.htm) ("built by France in 1943"), [vinwonders](https://vinwonders.com/vi/wonderpedia/news/deo-prenn-da-lat/).
- "nay là đèo Mimosa": Wikipedia, mia (có thể chung gốc).
- "1998": [Báo Văn hóa 2024](https://baovanhoa.vn/van-hoa/lam-dong-xu-ly-nghiem-xay-dung-trai-phep-tai-thang-canh-quoc-gia-thac-prenn-34495.html), [vietnamnet EN 2016](https://vietnamnet.vn/en/the-most-famous-waterfalls-in-lam-dong-E163468.html) (Wikipedia ghi 2000).
- "4 làn, đầu 2024": [Tiền Phong 30/01/2024](https://tienphong.vn/thong-xe-toan-tuyen-deo-prenn-tu-ngay-3112024-post1608879.tpo), [Nhân Dân](https://nhandan.vn/ocop/thong-xe-tuyen-deo-prenn-thanh-pho-da-lat-tu-sang-311-post794457.html).

## Danh sách chính (≥ 2 nguồn)

| # | Tên | Loại | Đường OSM | Nguồn | Tin cậy | Vị trí OSM |
|---|---|---|---|---|---|---|
| 1 | Thác Prenn | thác, thắng cảnh quốc gia 1998 | Quốc lộ 20 | [Wikipedia](https://vi.wikipedia.org/wiki/Th%C3%A1c_Prenn) · [SGGP 2026](https://www.sggp.org.vn/doi-thay-o-khu-du-lich-thac-prenn-post875448.html) · [vietnamnet EN 2016](https://vietnamnet.vn/en/the-most-famous-waterfalls-in-lam-dong-E163468.html) · [Báo Văn hóa 2024](https://baovanhoa.vn/van-hoa/lam-dong-xu-ly-nghiem-xay-dung-trai-phep-tai-thang-canh-quoc-gia-thac-prenn-34495.html) · [mia](https://mia.vn/cam-nang-du-lich/kham-pha-ve-dep-hung-vi-cua-thac-prenn-da-lat-1465) · [OSM](https://www.openstreetmap.org/node/4096525696) | cao | node/4096525696 (108.470104, 11.876519) |
| 2 | Đèo Prenn | đèo, cửa ngõ phía nam | Đèo Prenn | [Wikipedia](https://vi.wikipedia.org/wiki/%C4%90%C3%A8o_Prenn) · [DTiNews 2023](https://dtinews.dantri.com.vn/print/20231204113308107.htm) · [mia 2023](https://mia.vn/cam-nang-du-lich/chinh-phuc-cung-duong-deo-prenn-ngoan-canh-da-lat-mong-mo-1400) · [Tiền Phong 2024](https://tienphong.vn/thong-xe-toan-tuyen-deo-prenn-tu-ngay-3112024-post1608879.tpo) · [Nhân Dân 2024](https://nhandan.vn/ocop/thong-xe-tuyen-deo-prenn-thanh-pho-da-lat-tu-sang-311-post794457.html) · [Báo Đấu thầu 2016](https://baodauthau.vn/cai-tao-duong-qua-deo-mimosa-theo-hinh-thuc-ppp-post19987.html) | cao | way/1239534570 (108.46186, 11.889527, giữa đèo) |
| 3 | Đèo Mimosa (đường Prenn cũ) | đèo, nay là QL20 | Đèo Mimosa | [Wikipedia](https://vi.wikipedia.org/wiki/%C4%90%C3%A8o_Prenn) · [mia 2023](https://mia.vn/cam-nang-du-lich/chinh-phuc-cung-duong-deo-prenn-ngoan-canh-da-lat-mong-mo-1400) · [VnExpress 2014](https://vnexpress.net/nhung-con-deo-no-hoa-dan-den-da-lat-2957340.html) · [Báo Đấu thầu 2016](https://baodauthau.vn/cai-tao-duong-qua-deo-mimosa-theo-hinh-thuc-ppp-post19987.html) | trung bình (ý "đường cũ" chỉ Wikipedia + mia) | way/1346631591 (108.471329, 11.880357, gần ngã ba Mimosa – Prenn) |
| 4 | Đền thờ Âu Lạc | đền thờ Hùng Vương | Quốc lộ 20 | [SGGP 2026](https://www.sggp.org.vn/doi-thay-o-khu-du-lich-thac-prenn-post875448.html) · [Wikipedia](https://vi.wikipedia.org/wiki/Th%C3%A1c_Prenn) · [VOV 2024](https://vov.vn/van-hoa/gio-to-hung-vuong-o-thac-prenn-da-lat-thu-hut-nhieu-du-khach-post1089895.vov) · [vietnamnet EN 2016](https://vietnamnet.vn/en/the-most-famous-waterfalls-in-lam-dong-E163468.html) | cao (năm xây lệch) | không có trên OSM |
| 5 | Biệt thự cổ trên đèo ("nhà ma") | biệt thự cũ, chuyện đồn | Đèo Prenn | [vietnamnet/Người Lao Động 2016](https://vietnamnet.vn/biet-thu-co-hon-da-lat-nha-ma-tren-deo-prenn-286325.html) · [Kiến Thức 2018](https://kienthuc.net.vn/kho-tri-thuc/ngoi-nha-ma-tru-danh-da-lat-bay-gio-ra-sao-1088164.html) | trung bình (gốc nhà lệch, nhà tư) | không có trên OSM |
| 6 | Cao tốc Liên Khương – Prenn | đường tới | Quốc lộ 20 | [SGGP 27/08/2024](https://www.sggp.org.vn/gan-280-ty-dong-lam-duong-gom-dan-sinh-tuyen-cao-toc-lien-khuong-prenn-post755959.html) · [Báo Đầu tư 23/03/2025](https://baodautu.vn/de-xuat-dau-tu-xay-dung-duong-gom-cao-toc-lien-khuong---prenn-d257992.html) | trung bình (2 bài có thể chung gốc tin) | — |

## Cần kiểm thêm

| Tên | Nguồn có | Vì sao |
|---|---|---|
| Cầu Prenn | [thuviennhadat](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/deo-prenn-phuong-3) | chỉ là mốc trong bảng giá đất |
| Vườn thú khu thác (từ 1963?) | [vinwonders](https://vinwonders.com/vi/wonderpedia/news/thac-prenn-da-lat/) | năm 1963 chỉ 1 trang du lịch qua tóm tắt tìm kiếm; khách nói thú không còn |
| Cáp treo qua thác | Frommer's (qua tóm tắt tìm kiếm) | khách nói đã gỡ |
| Hoàng gia (Thái Lan / "Nữ hoàng") thăm thác 1959 | không có | không tìm được nguồn nào; Vua Bhumibol và Hoàng hậu Sirikit có thăm miền Nam 18–21/12/1959 nhưng không nguồn nào nói tới Prenn |
| Tên cũ "Liang Tarding" | không mở được trang gốc | 1 trang du lịch tiếng Anh |

## Lịch sử (tóm, chi tiết trong `data/chuyen/prenn.json`)
- Tên: **Prềnh** (K'Ho, "cà đắng") hoặc gốc Chăm "vùng lấn chiếm"; có người gọi **thác Tiên Sa**; đèo Mimosa còn gọi **Prenn 2**.
- **1943** nhà thầu Gross (Pháp) làm đèo Prenn hiện nay, thay đường cũ từ thác vào phố.
- **1998** thắng cảnh quốc gia (Wikipedia: 2000).
- **2002** Đền thờ Âu Lạc hoạt động. **Đầu những năm 2000** đường cũ khôi phục thành đèo Mimosa.
- **2008** cao tốc Liên Khương – Prenn dùng từng đoạn.
- **11/2016** Mimosa thành Quốc lộ 20, Prenn giao tỉnh.
- **10/2/2023 – 31/1/2024** mở rộng đèo lên 4 làn. **11–12/2025** sạt lở, đóng tạm ([Thanh Tra](https://thanhtra.com.vn/an-sinh-AFA9C5670/lam-dong-sat-lo-tai-deo-prenn-phuong-xuan-huong-da-lat-fd59ebaab.html), [DTiNews](https://dtinews.dantri.com.vn/print/20251205120247590.htm)).

## Chỗ còn nghi
1. Chiều cao thác: gần 10 m (mia) / hơn 10 m (SGGP) / hơn 20 m (Wikipedia, một đoạn) → không ghi.
2. Năm thắng cảnh quốc gia 1998 / 2000; số quyết định chưa tìm được.
3. Năm xây Đền Âu Lạc 2002 (SGGP, Wikipedia) / 2003 (mia, vinwonders) / 2004 (vietnamnet EN).
4. Ý "đèo Mimosa là đường Prenn cũ" và năm 2002 chỉ Wikipedia + mia (có thể chung gốc). Năm mở đường cũ, năm làm xong đèo 1943: chưa rõ.
5. Biệt thự "nhà ma": gốc nhà kể khác nhau (Hoa kiều thập niên 1920 / người Pháp 1942 / 1912); Nhất Linh mua 1955 chỉ Kiến Thức; nay còn cho vào xem không: chưa rõ.
6. Tháng 1/2024 Đà Lạt phạt công ty quản lý khu thác 240 triệu đồng (6 bungalow sai phép, tượng rồng 70 m không phép): chỉ Báo Văn hóa.
7. Chiều dài đèo 7,4 km / 11 km; vốn mở rộng 514 / 522 / 552 / 553 tỷ → không ghi.
