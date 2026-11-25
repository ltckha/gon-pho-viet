# Làng Hoa Vạn Thành — Vạn Thành (25/11/2026)

Kết quả: `data/pho/van-thanh.json`, chuyện của phố: `data/chuyen/van-thanh.json`. 7 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau (danh sách chính), 5 nơi cần kiểm thêm, 1 nơi loại vì không ở Vạn Thành. Chưa thấy nơi nào ghi đã đóng hẳn.

Cách làm: kho game không có gì về Vạn Thành (tìm "vạn thành" trong kho game: không thấy). Em tải dữ liệu OSM quanh đường Vạn Thành và thác Cam Ly (`api.openstreetmap.org/api/0.6/map`, bbox 108.396,11.943,108.414,11.954 · 108.405,11.943,108.414,11.954 · 108.414,11.937,108.424,11.948) để lấy tên nơi có thật, rồi tìm từng nơi trên báo, trang du lịch, Foody, Wikipedia.
Quy ước nguồn: 2 bài cùng một trang (2 bài VnExpress, 2 bài mia, 2 bài Kiến Thức, 2 bài VinWonders) chỉ tính 1. Mytour chép Wikipedia (lăng Nguyễn Hữu Hào) và chép mia (nhà thờ Vạn Thành) → không tính riêng. Vinpearl không dùng. Không dùng Google Maps. Chưa đi thực tế.

## Phường

| Đường (tên OSM) | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Vạn Thành | cuối Hoàng Văn Thụ – ngã ba Tà Nung (ĐT 725 / Cam Ly - Phước Thành), khoảng 1,76 km | P5 | Cam Ly - Đà Lạt | chắc | [thuviennhadat hoang-van-thu-phuong-5](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/hoang-van-thu-phuong-5) · [Báo Lâm Đồng 06/01/2022](https://baolamdong.vn/phat-trien-cac-lang-hoa-da-lat-nhin-tu-nghi-quyet-07-282319.html) ("làng hoa Vạn Thành (Phường 5)") |
| Hoàng Văn Thụ | Huyền Trân Công Chúa – thác Cam Ly – ngã ba Tà Nung | P5 | Cam Ly - Đà Lạt | chắc | cùng trang thuviennhadat trên |
| Phi trường Cam Ly | đường trên nền đường băng cũ | P5 (theo ranh giới) | Cam Ly - Đà Lạt | khá chắc | `phuong.json` (bảng giá đất không có dòng này) |
| Long Mỹ Quận công | đường lên lăng Nguyễn Hữu Hào | P5 (theo ranh giới) | Cam Ly - Đà Lạt | khá chắc | `phuong.json` |

**Bảng giá đất (QĐ 02/2020/QĐ-UBND, sửa QĐ 16/2021) không có dòng nào tên "Vạn Thành".** Đường Vạn Thành trên OSM (way 172307603) nối điểm cuối Hoàng Văn Thụ với ngã ba ĐT 725 / Cam Ly - Phước Thành. Bảng giá đất ghi đúng đoạn đó dưới tên Hoàng Văn Thụ: "Hoàng Văn Thụ - PHƯỜNG 5: Từ giáp thác Cam Ly, nhà số 58, nhà số 02 – Đến hết ngã ba Tà Nung"; còn "[Cam Ly - PHƯỜNG 5](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/cam-ly-phuong-5)" bắt đầu "Từ Ngã 3 Tà Nung (ĐT 725)". Cả hai đều Phường 5. Thêm: VnExpress 2011 nhắc đại biểu HĐND Phường 5 ở làng; Vietnam Airlines ghi "81A1 Van Thanh Street, Ward 5".
Đổi phường theo `data/lam-dong/nq1671.json` mục 100: Phường 5, Phường 6 và xã Tà Nung → **Cam Ly - Đà Lạt**.
Kiểm chéo ranh giới `phuong.json`: mọi điểm của Vạn Thành, Phi trường Cam Ly, cùng toạ độ thác Cam Ly, lăng Nguyễn Hữu Hào, Làng Cổ Tích, điểm "Làng Hoa Van Thành" trên OSM đều nằm trong Cam Ly - Đà Lạt.
Tên trong OSM (`duong.json`, trường `ten`): "Vạn Thành" (1 đoạn), "Hoàng Văn Thụ", "Phi trường Cam Ly" (2 đoạn, khoảng 1,3 km mỗi đoạn), "Long Mỹ Quận công" (7 đoạn ngắn) — đều khớp, đã ghi vào `duong`.

## Câu giới thiệu
"Làng Hoa Vạn Thành: đường Vạn Thành chạy giữa thung lũng nhà kính của làng hoa do người gốc Bắc (nhiều nhà quê Hà Nam) lập từ cuối thập niên 1950, nay gần 300 hộ chuyên trồng ly, cúc, hồng, đồng tiền; dọc đường có Làng Cổ Tích nhà hobbit và vườn Fresh Garden, đi về phía phố là thác Cam Ly và lăng Nguyễn Hữu Hào."
- "cuối thập niên 1950", "gốc Bắc": [VnExpress 12/12/2011](https://vnexpress.net/lang-trong-hoa-sam-oto-di-lam-vuon-2285896.html) ("từ những năm cuối thập niên 50", trên 70% gốc Bắc); [mia 24/07/2026](https://mia.vn/cam-nang-du-lich/lang-hoa-van-thanh-lac-vao-vuon-dia-duong-chon-da-lat-mong-mo-1355) ("hình thành vào những năm 1950", người Hà Nam).
- "Hà Nam": [VnExpress 08/12/2013](https://vnexpress.net/ba-lang-hoa-noi-tieng-da-lat-2919943.html), mia (trên).
- "gần 300 hộ": [Báo Văn Hoá 08/01/2018](https://baovanhoa.vn/du-lich/lang-hoa-vao-mua-tat-bat-75941.html) ("gần 300 hộ nông dân chuyển sang chuyên canh trồng hoa"), mia 2026 ("300 hộ canh tác").
- Loại hoa: Báo Văn Hoá, VnExpress, mia.
- Tên "Làng Hoa Vạn Thành": đặc trưng thật và tên người ta vẫn gọi. Không ghi diện tích vì các nguồn lệch (170 / 200 / 220 ha).

## Danh sách chính (≥ 2 nguồn)

| # | Tên thật | Loại | Đường · số nhà | Nguồn | Tin cậy | Còn mở? |
|---|---|---|---|---|---|---|
| 1 | Làng hoa Vạn Thành | làng hoa, nhà kính | Vạn Thành · (lệch: 81A1 / 40) | [VnExpress 2011](https://vnexpress.net/lang-trong-hoa-sam-oto-di-lam-vuon-2285896.html) · [Báo Văn Hoá 2018](https://baovanhoa.vn/du-lich/lang-hoa-vao-mua-tat-bat-75941.html) · [Báo Lâm Đồng 2022](https://baolamdong.vn/phat-trien-cac-lang-hoa-da-lat-nhin-tu-nghi-quyet-07-282319.html) · [mia 07/2026](https://mia.vn/cam-nang-du-lich/lang-hoa-van-thanh-lac-vao-vuon-dia-duong-chon-da-lat-mong-mo-1355) · [Vietnam Airlines](https://www.vietnamairlines.com/en/useful-information/travel-guide/vuon-hoa-da-lat) · [OSM](https://www.openstreetmap.org/node/4444199589) | cao | còn (mia 7/2026 ghi giờ mở khu tham quan) |
| 2 | Fresh Garden Dalat | vườn hoa tham quan | Vạn Thành · 90B | [mia 07/2026](https://mia.vn/cam-nang-du-lich/fresh-garden-dalat-vuon-hoa-khong-lo-khoe-sac-ruc-ro-giua-long-da-lat-1454) · [Vietnam Airlines](https://www.vietnamairlines.com/en/useful-information/travel-guide/vuon-hoa-da-lat) (ghi "90") · [Vietnambooking](https://www.vietnambooking.com/du-lich/blog-du-lich/fresh-garden-da-lat.html) · [VinWonders 07/2025](https://vinwonders.com/vi/wonderpedia/news/lang-hoa-van-thanh/) | cao | có dấu hiệu (mia 7/2026) |
| 3 | Làng Cổ Tích (Dalat Fairytale Land) | nhà hobbit, hầm rượu Vĩnh Tiến | Vạn Thành · (các trang ghi "81D Hoàng Văn Thụ") | [mia 07/2026](https://mia.vn/cam-nang-du-lich/bo-tui-kinh-nghiem-vui-choi-tai-dalat-fairytale-land-chi-tiet-nhat-1665) · [Foody](https://www.foody.vn/lam-dong/dalat-fairytale-land) · [Travelbinger 08/2026](https://www.travelbinger.com/fairytale-land-dalat) · [VietNamNet 2022](https://vietnamnet.vn/en/da-lat-city-s-attractive-tourist-destinations-2043060.html) · [OSM](https://www.openstreetmap.org/node/13072770501) | cao | có dấu hiệu (8/2026) |
| 4 | Thác Cam Ly | thác, thắng cảnh | Hoàng Văn Thụ | [Wikipedia](https://vi.wikipedia.org/wiki/Th%C3%A1c_Cam_Ly) · [Kiến Thức 09/2023](https://kienthuc.net.vn/di-san/kham-pha-ba-dia-diem-mang-ten-cam-ly-cuc-hot-cua-da-lat-1896885.html) · [VinWonders 06/2025](https://vinwonders.com/en/wonderpedia/news/cam-ly-waterfall-da-lat/) · [mia](https://mia.vn/cam-nang-du-lich/thac-cam-ly-da-lat-truyen-thuyet-cua-su-tuong-nho-1295) · [OSM](https://www.openstreetmap.org/node/4097464935) · [bảng giá đất](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/hoang-van-thu-phuong-5) (mốc) | cao | chưa rõ 2026 (VinWonders 6/2025 còn ghi giờ mở) |
| 5 | Lăng Nguyễn Hữu Hào | lăng cổ (cha mẹ Nam Phương hoàng hậu) | Long Mỹ Quận công | [Wikipedia](https://vi.wikipedia.org/wiki/L%C4%83ng_Nguy%E1%BB%85n_H%E1%BB%AFu_H%C3%A0o) · [mia 09/2023](https://mia.vn/cam-nang-du-lich/an-tuong-lang-nguyen-huu-hao-da-lat-voi-kien-truc-cung-dinh-hue-dac-trung-5012) · [Kiến Thức 10/2023](https://kienthuc.net.vn/kho-tri-thuc/loat-dia-diem-mang-dau-an-hoang-hau-nam-phuong-o-da-lat-1909010.html) · [OSM](https://www.openstreetmap.org/way/1244767000) | cao | không giờ mở chính thức; chưa khai thác du lịch |
| 6 | Sân bay Cam Ly (đường băng cũ) | sân bay cũ, đường băng thành đường đi | Phi trường Cam Ly | [Wikipedia](https://vi.wikipedia.org/wiki/S%C3%A2n_bay_Cam_Ly) · [Kiến Thức 09/2023](https://kienthuc.net.vn/di-san/kham-pha-ba-dia-diem-mang-ten-cam-ly-cuc-hot-cua-da-lat-1896885.html) · [OSM](https://www.openstreetmap.org/node/13122726423) | cao | ngừng bay; đường băng là đường đi của dân |
| 7 | Vạn Thành Hill | đồi check-in, cà phê | Vạn Thành · (không số) | [Znews 04/2021](https://znews.vn/ngon-doi-song-ao-moi-noi-o-da-lat-post1203440.html) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/dia-diem-check-in-moi-o-da-lat/) | trung bình | chưa rõ (không có nguồn 2025–2026) |

Nơi số 1, 2, 3, 7 ở trên đường Vạn Thành; 4 ở Hoàng Văn Thụ (cách đầu đường Vạn Thành khoảng 1 km); 5 trên đường nhánh Long Mỹ Quận công rẽ từ Hoàng Văn Thụ gần thác; 6 song song phía bắc Vạn Thành.

## Cần kiểm thêm

| Tên | Đường · số | Nguồn có | Vì sao |
|---|---|---|---|
| Nhà thờ Giáo xứ Vạn Thành | — | [mia 12/2023](https://mia.vn/cam-nang-du-lich/kham-pha-10-nha-tho-da-lat-13967) · [VnExpress 2011](https://vnexpress.net/lang-trong-hoa-sam-oto-di-lam-vuon-2285896.html) | mia chỉ ghi "Phường 5", không đường/số; Mytour chép mia; VnExpress nói về xứ đạo, không tả nhà thờ. Không có trên OSM. |
| Sơn Roastery & Café by Sơn Pacamara | Hoàng Văn Thụ · 20C | [VinWonders](https://vinwonders.com/vi/wonderpedia/news/lang-hoa-van-thanh/) · [Wanderlog](https://wanderlog.com/place/details/2666622) · [Saigoneer 2019](https://saigoneer.com/saigon-food-culture/15538-da-lat,-the-unlikely-home-of-el-salvador-s-rare-pacamara-coffee-beans) | lệch đường: "20C Hoàng Văn Thụ" vs "20C Van Thanh". Theo bảng giá đất, số 20 Hoàng Văn Thụ ở trước thác Cam Ly. |
| Rừng Đom Đóm Cafe | Vạn Thành · 76 | VinWonders | 1 nguồn |
| Bánh cuốn Duy Tân | Hoàng Văn Thụ · 41 | VinWonders | 1 nguồn; OSM có quán khác ("Camly 9") cùng số 41 |
| Langfarm Center | Hoàng Văn Thụ | [mia](https://mia.vn/cam-nang-du-lich/langfarm-center-nong-trai-co-tich-21204) · [OSM](https://www.openstreetmap.org/way/1381319196) | lệch số nhà (1B / 5); gần thác, xa Vạn Thành |

Không đưa vào: **Nông trại cún Puppy Farm** — các trang hay nhắc "gần làng hoa" nhưng ở Phường 7 cũ (Traveloka, Mytour), mia ghi cách làng hoa khoảng 4,2 km.
Chùa: không tìm được chùa nào có nguồn nằm trên đường Vạn Thành. Vườn cẩm tú cầu: mia có nhắc cẩm tú cầu trong làng, nhưng vườn cẩm tú cầu nổi tiếng mà Vietnam Airlines ghi là ở Tự Tạo, Phường 11 cũ — không thuộc phố này.

## Chỗ còn nghi
- **Tên đường**: chưa tìm được văn bản đặt tên "Vạn Thành". NQ 26/2021/NQ-HĐND (đặt tên 7 đường Đà Lạt) không có Vạn Thành. Saigoneer 01/2019 đã ghi "Van Thanh" làm địa chỉ, nhưng bảng giá đất 2020 vẫn gộp đoạn này vào Hoàng Văn Thụ. Vì vậy số nhà cũ (81D của Làng Cổ Tích) có thể theo Hoàng Văn Thụ — em để trống số nhà trong `so_nha` cho nơi đó.
- **Số nhà làng hoa**: Vietnam Airlines "81A1 Vạn Thành", mia "40 Vạn Thành", VinWonders "43 Đường Vạn Hạnh" (gần như gõ nhầm). Để trống.
- **Lăng Nguyễn Hữu Hào**: Wikipedia ghi "ngã ba Hoàng Văn Thụ – Vạn Thành", mia ghi "đường Vạn Thành"; toạ độ Wikipedia khớp OSM, sát đường "Long Mỹ Quận công", cách Hoàng Văn Thụ khoảng 170 m, cách đầu đường Vạn Thành khoảng 500 m. Năm 1998 di tích quốc gia chỉ có ở VinWonders.
- **Thác Cam Ly**: chiều cao lệch (10 m / 30 m) → không ghi. Tình trạng 2026 chưa rõ; nước ô nhiễm nhiều năm.
- **Diện tích làng**: 170 ha (2011), 220 ha (2018), 200 ha (2025–2026) — không đưa vào câu giới thiệu.
- Bài baomoi "Những thế hệ trồng hoa ở làng hoa" (Báo Lâm Đồng) không đọc được thân bài.
- VnExpress 2011 về ô tô (gần 80 xe) chỉ 1 nguồn → để `mot_nguon: true` trong file chuyện.
