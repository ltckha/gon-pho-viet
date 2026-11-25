# Phố Thiền và Thác: Trúc Lâm Yên Tử, Đèo Prenn (25/11/2026)

Kết quả: `data/pho/truc-lam.json`, chuyện của phố: `data/chuyen/truc-lam.json`. Có 9 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 8 nơi cần kiểm thêm, 1 nơi đã đóng (Zen Cafe).

Cách làm: kho game không có khu này. Em tải dữ liệu OSM theo ô 0,02° phủ 108.40–108.48, 11.87–11.93 (`api.openstreetmap.org/api/0.6/map`, ngày 25/11/2026) để lấy tên, điểm các nơi, rồi đo khoảng cách tới đường trong `duong.json`. Sau đó tìm từng nơi trên báo, trang du lịch, Foody.
Quy ước nguồn: hai bài cùng một trang (ví dụ 2 bài mia) chỉ tính 1. Vinpearl và VinWonders không dùng làm nguồn. Wikipedia tiếng Việt và tiếng Anh tính 1. Không dùng Google Maps. Wanderlog (lấy dữ liệu Google) chỉ dùng làm nguồn phụ, như ở phố Yersin. vietnamtourism.com là trang tư nhân, không phải trang của Cục Du lịch (vietnamtourism.gov.vn). Em chưa đi thực tế.

## Phường

| Đường (tên OSM) | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Đèo Prenn | Ngã ba Ba Tháng Tư – Đống Đa → ngã ba Mimosa – Prenn | P3 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat deo-prenn-phuong-3](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/deo-prenn-phuong-3) |
| Đèo Prenn | Ngã ba Mimosa – Prenn → Cầu Prenn | P3 | Xuân Hương - Đà Lạt | chắc | cùng trang trên |
| Trúc Lâm Yên Tử | Trọn đường | P3 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat truc-lam-yen-tu-phuong-3](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/truc-lam-yen-tu-phuong-3) |
| Trần Thánh Tông | Tới Thiền viện Trúc Lâm (thửa giáp ranh P3/P4) | P4 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat tran-thanh-tong-phuong-4](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-thanh-tong-phuong-4) |
| Hoa Cẩm Tú Cầu, Hoa Hồng | Đường nội khu hồ Tuyền Lâm | P3 / P4 | Xuân Hương - Đà Lạt | khá chắc | không có trong bảng giá đất; [mia](https://mia.vn/cam-nang-du-lich/den-the-seen-house-coffee-va-ngam-ho-tuyen-lam-dep-nhu-tranh-thuy-mac-1531) ghi "KDL Hồ Tuyền Lâm, Phường 3"; [mia](https://mia.vn/cam-nang-du-lich/duong-ham-dieu-khac-19769) ghi Đường hầm điêu khắc "trước đây thuộc phường 4, nay thuộc phường Xuân Hương" |
| Quốc lộ 20 | Đoạn ngang thác Prenn | P3 | Xuân Hương - Đà Lạt | chắc | [SGGP 08/10/2026](https://www.sggp.org.vn/doi-thay-o-khu-du-lich-thac-prenn-post875448.html) ghi "phường Xuân Hương - Đà Lạt" |

Bảng giá đất là QĐ 02/2020/QĐ-UBND, sửa bởi QĐ 16/2021. Đổi sang phường mới theo `data/lam-dong/nq1671.json` mục 99 (Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt). Phường 3 và Phường 4 cũ đều vào cùng một phường mới, nên **cả khu chỉ thuộc 1 phường: Xuân Hương - Đà Lạt**.
Em kiểm thêm bằng ranh `phuong.json`: mọi điểm của Trúc Lâm Yên Tử, Đèo Prenn, Trần Thánh Tông, Hoa Cẩm Tú Cầu, Hoa Hồng, cùng các mốc Thác Datanla, Thác Prenn và ga cáp treo, đều nằm trong Xuân Hương. Riêng "Quốc lộ 20" trên OSM chủ yếu là đoạn đi Trại Mát (Xuân Trường - Đà Lạt); phố này chỉ dùng đoạn ngang thác Prenn.

Tên trong OSM (`duong.json`, trường `ten`) đều khớp: "Trúc Lâm Yên Tử" (5 đoạn), "Đèo Prenn" (10 đoạn), "Trần Thánh Tông", "Hoa Cẩm Tú Cầu", "Hoa Hồng", "Quốc lộ 20". Trên OSM có một hẻm ghi sai chính tả "Hẻm 63 Đèo Prem"; em không đưa hẻm này vào.

## Câu giới thiệu
"Phố Thiền và Thác: từ đầu đèo Prenn, cáp treo đồi Robin chạy hơn 2 km trên rừng thông tới Thiền viện Trúc Lâm (khánh thành năm 1994) trên núi Phụng Hoàng nhìn xuống hồ Tuyền Lâm; xuôi đèo là thác Datanla có đường xe trượt xuyên rừng, cuối đèo là thác Prenn."
- "hơn 2 km": mọi nguồn đều trên 2 km. [remontees-mecaniques](https://remontees-mecaniques.net/bdd/reportage-tcd4-dalat-doppelmayr-2222.html) ghi 2.227 m, [mia 31/10/2025](https://mia.vn/cam-nang-du-lich/cap-treo-da-lat-co-gi-dac-sac-19550) ghi 2.267 m, [localvietnam](https://localvietnam.com/blog/truc-lam-pagoda-dalat-cable-car/) ghi 2,3 km. Vì lệch nên em không ghi số chính xác.
- "1994": [Wikipedia tiếng Việt](https://vi.wikipedia.org/wiki/Thi%E1%BB%81n_vi%E1%BB%87n_Tr%C3%BAc_L%C3%A2m_(%C4%90%C3%A0_L%E1%BA%A1t)), [Wikipedia tiếng Anh](https://en.wikipedia.org/wiki/Tr%C3%BAc_L%C3%A2m_Monastery_of_Da_Lat) (13/3/1994), [vietnamtourism.com](https://www.vietnamtourism.com/vi/thien-vien-truc-lam-da-lat-lich-su-diem-tham-quan-va-cach), [VOH](https://voh.com.vn/du-lich/thien-vien-truc-lam-da-lat-noi-tim-thay-binh-yen-giua-bon-be-cuoc-song-331987.html).
- Tên "Phố Thiền và Thác": đặc trưng thật của khu là thiền viện, cáp treo và hai thác trên cùng một con đèo. Đây là phố tham quan, không phải phố ăn, nên không có số quán.

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Đường OSM / số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Thiền viện Trúc Lâm | thiền viện | Trúc Lâm Yên Tử / — | [Wikipedia vi](https://vi.wikipedia.org/wiki/Thi%E1%BB%81n_vi%E1%BB%87n_Tr%C3%BAc_L%C3%A2m_(%C4%90%C3%A0_L%E1%BA%A1t)) · [Wikipedia en](https://en.wikipedia.org/wiki/Tr%C3%BAc_L%C3%A2m_Monastery_of_Da_Lat) · [vietnamtourism.com 10/2026](https://www.vietnamtourism.com/vi/thien-vien-truc-lam-da-lat-lich-su-diem-tham-quan-va-cach) · [mia 07/2026](https://mia.vn/cam-nang-du-lich/thien-vien-truc-lam-da-lat-20040) · [VOH 2019](https://voh.com.vn/du-lich/thien-vien-truc-lam-da-lat-noi-tim-thay-binh-yen-giua-bon-be-cuoc-song-331987.html) · [OSM](https://www.openstreetmap.org/way/1356287796) | cao | mở (giờ lệch giữa các trang) |
| 2 | Cáp treo Đà Lạt (ga đồi Robin) | cáp treo | Đèo Prenn / — | [mia 10/2025](https://mia.vn/cam-nang-du-lich/cap-treo-da-lat-co-gi-dac-sac-19550) · [localvietnam 2023](https://localvietnam.com/blog/truc-lam-pagoda-dalat-cable-car/) · [remontees-mecaniques 2008](https://remontees-mecaniques.net/bdd/reportage-tcd4-dalat-doppelmayr-2222.html) · [vietnamtourism.com](https://www.vietnamtourism.com/vi/thien-vien-truc-lam-da-lat-lich-su-diem-tham-quan-va-cach) · [OSM](https://www.openstreetmap.org/node/357447237) | cao | có dấu hiệu còn chạy (2025–2026) |
| 3 | Hồ Tuyền Lâm | hồ, khu du lịch quốc gia | Hoa Cẩm Tú Cầu (bến thuyền) / — | [VnExpress 2020](https://vnexpress.net/ngay-moi-tren-ho-tuyen-lam-4036525.html) · [Tạp chí Công Thương 2024](https://tapchicongthuong.vn/ho-tuyen-lam---canh-dep-khong-bao-gio-cu-115828.htm) · [Báo Văn hóa 2022](https://baovanhoa.vn/du-lich/khu-du-lich-quoc-gia-ho-tuyen-lam-da-lat%C2%A0-bai-toan-hieu-qua-va-ben-vung-1969.html) · [mia 07/2025](https://mia.vn/cam-nang-du-lich/ho-tuyen-lam-da-lat-18911) · [Tuổi Trẻ 2023](https://tuoitre.vn/cam-nang-du-lich-da-lat-diem-den-da-ngoai-ket-hop-the-thao-20230408171213813.htm) · [OSM](https://www.openstreetmap.org/node/11598941137) | cao | mặt hồ công cộng |
| 4 | Khu du lịch thác Datanla | thác, trò mạo hiểm | Đèo Prenn / — | [Tuổi Trẻ 2023](https://tuoitre.vn/cam-nang-du-lich-da-lat-diem-den-da-ngoai-ket-hop-the-thao-20230408171213813.htm) · [mia 09/2026](https://mia.vn/cam-nang-du-lich/review-kinh-nghiem-chinh-phuc-thac-datanla-da-lat-1600) · [Thanh Tra 07/2026](https://thanhtra.com.vn/ket-luan-thanh-tra-E17BD7A25/lam-dong-thanh-tra-chi-ro-ton-tai-kien-nghi-thao-go-vuong-mac-tai-du-an-khu-du-lich-sinh-thai-thac-datanla-818acd62f.html) · [RCDB](https://rcdb.com/18600.htm) · [OSM](https://www.openstreetmap.org/node/1164597191) | cao | mở (2026) |
| 5 | Khu du lịch thác Prenn | thác, đền Âu Lạc | Quốc lộ 20 / — | [SGGP 10/2026](https://www.sggp.org.vn/doi-thay-o-khu-du-lich-thac-prenn-post875448.html) · [mia 2023](https://mia.vn/cam-nang-du-lich/kham-pha-ve-dep-hung-vi-cua-thac-prenn-da-lat-1465) · [OSM](https://www.openstreetmap.org/node/4096525696) | cao | mở (SGGP 10/2026) |
| 6 | Tiệm cà phê Nhà Bên Suối | cà phê bên suối | Trúc Lâm Yên Tử / 3 | [VnExpress 2021](https://vnexpress.net/2-quan-ca-phe-moi-mo-hut-gioi-tre-da-lat-4304565.html) · [mia 06/2025](https://mia.vn/cam-nang-du-lich/tiem-ca-phe-nha-ben-suoi-18475) · [OSM](https://www.openstreetmap.org/node/11840673733) | cao | có dấu hiệu (mia 6/2025) |
| 7 | The Seen House | cà phê, homestay ven hồ | Hoa Cẩm Tú Cầu / — | [mia 07/2026](https://mia.vn/cam-nang-du-lich/den-the-seen-house-coffee-va-ngam-ho-tuyen-lam-dep-nhu-tranh-thuy-mac-1531) · [Vietnam Coracle 2022](https://vietnamcoracle.com/19-coffee-shops-in-da-lat-with-a-view) · [Wanderlog](https://wanderlog.com/place/details/2945570/the-seen-house) · [OSM](https://www.openstreetmap.org/node/8310652209) | cao | có dấu hiệu (mia 7/2026) |
| 8 | Đường hầm điêu khắc (Clay Tunnels - Dalat Star) | điêu khắc đất sét | Hoa Hồng / — | [VnExpress 2014](https://vnexpress.net/cong-trinh-dieu-khac-dat-set-o-da-lat-3038274.html) · [mia 07/2026](https://mia.vn/cam-nang-du-lich/duong-ham-dieu-khac-19769) · [OSM](https://www.openstreetmap.org/node/4368051989) | cao | có dấu hiệu (mia 7/2026) |
| 9 | Lululola Coffee+ | cà phê, nhạc sống | Đèo Prenn / — | [mia 2023](https://mia.vn/cam-nang-du-lich/lululola-coffee-da-lat-12641) · [Foody](https://www.foody.vn/lam-dong/lululola-coffee) · [OSM](https://www.openstreetmap.org/node/7236155987) | trung bình | chưa rõ (không có nguồn 2025–2026) |

Vị trí tự ghim (`vi_tri_quan.py`, ngưỡng 80 m): theo em đo, Thác Prenn (cách Quốc lộ 20 khoảng 31 m), The Seen House (cách Hoa Cẩm Tú Cầu khoảng 30 m), Đường hầm điêu khắc (cách Hoa Hồng khoảng 37 m) và Hồ Tuyền Lâm (điểm ngắm cảnh "Hồ Tuyền Lâm" cách Hoa Cẩm Tú Cầu khoảng 38 m) sẽ khớp theo tên. Nhà Bên Suối sẽ khớp theo số nhà OSM "3 Trúc Lâm Yên Tử". Có 4 nơi cách đường hơn 80 m nên sẽ không được ghim, em cũng không đoán: Thiền viện (khoảng 190 m), ga cáp treo (khoảng 110 m), Thác Datanla (khoảng 120 m), Lululola (khoảng 210 m). Em chưa chạy `vi_tri_quan.py` vì cần `/tmp/osm` và vì lệnh đó ghi lại mọi file `data/pho/`.

## Cần kiểm thêm

| Tên | Đường | Nguồn có | Vì sao |
|---|---|---|---|
| Lavenderdalat Coffee House | "1 Hoa Hoàng Anh" (không có trong OSM) | [mia 2023](https://mia.vn/cam-nang-du-lich/lavenderdalat-coffee-house-quan-ca-phe-co-view-ho-tuyen-lam-quyen-ru-khien-ai-cung-say-long-tai-da-lat-1470) · [Wanderlog](https://wanderlog.com/place/details/5539184/lavenderdalat-cafe) | đủ 2 trang nhưng không gắn được đường OSM, nguồn mới nhất có ngày là 2023 |
| Quán Đà Tiên | chưa rõ | [Foody](https://www.foody.vn/lam-dong/quan-da-tien) | 1 nguồn |
| Cafe Ngày Mới (Cafe Vườn Thương cũ) | Hoa Cẩm Tú Cầu | [Wanderlog](https://wanderlog.com/place/details/8631831/cafe-ngày-mới) | 1 nguồn; OSM có "Vuon Thuong" nhưng chưa chắc là cùng nơi |
| Anna's Coffee House | Đèo Prenn (cổng cáp treo) | [Vietnam Coracle](https://vietnamcoracle.com/19-coffee-shops-in-da-lat-with-a-view) | 1 nguồn |
| Sam Cafe - Hồ Tuyền Lâm | Hoa Cẩm Tú Cầu | [OSM](https://www.openstreetmap.org/node/14301547901) | chỉ OSM |
| Tay Mo Amateurs Cafe | Đèo Prenn | [OSM](https://www.openstreetmap.org/node/13518499072) | chỉ OSM |
| Dalat Edensee Lake Resort & Spa | Hoa Phượng Tím | [OSM](https://www.openstreetmap.org/way/473736708) | chỉ OSM (chưa mở trang Foody) |
| Nhà Ma đèo Prenn | Đèo Prenn | [Foody](https://www.foody.vn/lam-dong/nha-ma-deo-prenn) | 1 nguồn; bình luận nói không còn là điểm tham quan |

**Đã đóng (không đưa vào):** Zen Cafe ven hồ Tuyền Lâm. [Vietnam Coracle](https://vietnamcoracle.com/19-coffee-shops-in-da-lat-with-a-view) ghi tạm đóng, bình luận năm 2023 nói đã đóng hẳn.

## Chỗ còn nghi
- **Tên đường của Thiền viện**: mia 07/2026 ghi "Trúc Lâm Yên Tử"; VOH 2019 và bài mia cũ ghi "Trần Thánh Tông" (VOH còn ghi nhầm "Phường 10"). Bảng giá đất cho thấy cả hai đường đều dẫn tới thiền viện. Em ghi Trúc Lâm Yên Tử.
- **Ga cáp treo**: mia ghi "số 01 Đống Đa". Tuy vậy, điểm ga trên OSM cách đầu đường Đống Đa khoảng 450 m và cách Đèo Prenn khoảng 110 m, nên em ghi đường Đèo Prenn, không ghi số nhà để khỏi ghim sai.
- **Giờ mở Thiền viện** lệch nhau: OSM ghi 07:00–11:30, 13:30–17:00; vietnamtourism.com 10/2026 ghi khoảng 07:00–17:00; mia 2026 và VOH ghi 5:00–21:00.
- **Số liệu lệch**: mặt hồ khoảng 320 ha (VnExpress) hay 360 ha (mia); xe trượt Datanla dài 2.400 m (Tuổi Trẻ) hay khoảng 1.700 m (RCDB ghi 5.577,4 ft); đường hầm điêu khắc dài 1,2 km (VnExpress 2014) hay hơn 2 km (mia 2026); thác Prenn cao gần 10 m (mia) hay hơn 10 m (SGGP). Giá vé thác Prenn chênh từ 50.000 đến 250.000 đồng giữa các trang, nên em không ghi.
- **Lululola**: các trang ghi "Đường 3/4", nhưng điểm OSM nằm trên đồi, gần Đèo Prenn hơn. Chưa có nguồn 2025–2026, nên ghi "chưa rõ".
- **Chuyện chỉ có 1 nguồn** (`mot_nguon: true`): Đền thờ Âu Lạc (chỉ SGGP); nghĩa tên Datanla "nước dưới lá" (chỉ một blog); ông Farraut người Pháp thuê vùng hồ thập niên 1930 (chỉ VnExpress, ghi trong ghi chú chuyện).
- **Quán ăn**: chưa có quán ăn nào trên đúng các đường này đạt 2 nguồn, nên mục món trong file chuyện để trống.
