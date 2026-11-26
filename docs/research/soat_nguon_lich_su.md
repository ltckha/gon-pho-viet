# Soát nguồn phần lịch sử (bước 3 hướng mới, 25/11/2026)

Cách chia (tự động trong `tools/build_pho.py`, hàm `loai_nguon`):

- **Chắc**: có ít nhất 1 nguồn là báo, tạp chí, văn bản nhà nước (gov.vn, bảng giá đất, Nghị quyết) hoặc nghiên cứu (tạp chí khoa học, EFEO, lưu trữ thời Pháp).
- **Chỉ Wikipedia**: không có báo/văn bản, chỉ Wikipedia và trang du lịch. Trang ghi "Chỉ có Wikipedia và trang du lịch".
- **Chỉ blog**: chỉ trang du lịch, blog, trang rao (mia.vn, vinwonders, mytour, tinbds, wordpress…). Trang ghi "Chỉ dựa trang du lịch, blog — chưa chắc".

Tổng: 373 ý (tên xưa, mốc năm, chuyện) — 284 chắc, 29 chỉ Wikipedia, 60 chỉ blog. Riêng 121 ý chỉ có 1 nguồn đã ghi "Mới có 1 nguồn" từ trước.

Việc kế: tìm báo, văn bản cho các ý dưới đây; tìm được thì thêm vào `data/chuyen/<slug>.json`, dựng lại là nhãn tự mất.

## Đường Tăng Bạt Hổ (`tang-bat-ho`) — 4 ý

- [chỉ Wikipedia] Tên xưa: Tăng Bạt Hổ (kèm hai đoạn ngắn Nguyễn Quyền, Lương Văn Can, nay gộp làm một) — nguồn: tinbds.com, vi.wikipedia.org
- [chỉ blog] Mốc: 1953: Đường sau chợ mang tên Tăng Bạt Hổ (cùng hai đoạn ngắn Nguyễn Quyền, Lương Văn Can). — nguồn: tinbds.com
- [chỉ blog] Mốc: 1975 hoặc 1976: Đường Minh Mạng đổi tên thành Trương Công Định. — nguồn: tinbds.com, trangdulichdalat.wordpress.com
- [chỉ blog] Chuyện: Dốc một chiều quanh chợ — nguồn: muctimsonden.com

## Dốc Nguyễn Chí Thanh (`pho-ca-phe`) — 3 ý

- [chỉ blog] Mốc: 1976: Đường Thành Thái đổi tên thành Nguyễn Chí Thanh (trangdulichdalat ghi 1975). — nguồn: tinbds.com, trangdulichdalat.wordpress.com
- [chỉ blog] Mốc: 1981: Rạp chiếu bóng Ngọc Lan (có trước 1975) sửa thành khách sạn Ngọc Lan, nay là 42 Nguyễn Chí Thanh; năm 2007 nâng lên 4 sao. — nguồn: 2trip.vn, bestprice.vn, ticotravel.com.vn
- [chỉ blog] Chuyện: Rạp Eden thành Ngọc Lan — nguồn: muctimsonden.com

## Đường Phan Đình Phùng (`phan-dinh-phung`) — 6 ý

- [chỉ blog] Tên xưa: Rue des Jardins — nguồn: muctimsonden.com
- [chỉ blog] Mốc: trước 1953: Gần khúc cua từ dốc Minh Mạng (Trương Công Định) xuống có một chiếc cầu gỗ, nên dân gọi là đường Cầu Quẹo. — nguồn: tinbds.com, muctimsonden.com
- [chỉ blog] Mốc: khoảng 1955–1963: Cầu ở Cầu Quẹo chuyển từ cầu gỗ sang cầu xi-măng cốt sắt, bên dưới đặt ống cống lớn (theo hồi ức tác giả blog). — nguồn: muctimsonden.com
- [chỉ blog] Mốc: trước 1975: Cây xăng Esso ở ngã ba đầu đường, người Đà Lạt gọi là 'cây xăng Ngã Ba Chùa'. — nguồn: muctimsonden.com
- [chỉ blog] Chuyện: Vì sao gọi Cầu Quẹo — nguồn: tinbds.com, muctimsonden.com
- [chỉ blog] Chuyện: Rạp LangBian — nguồn: muctimsonden.com

## Đường Nguyễn Văn Trỗi (`nguyen-van-troi`) — 3 ý

- [chỉ blog] Mốc: 1936: Bà Từ Cung (mẹ vua Bảo Đại) cùng Giáo hội Tăng già Trung Phần đề nghị dựng một ngôi chùa ở Đà Lạt. Đó là chùa Linh Sơn sau này. — nguồn: vinwonders.com
- [chỉ Wikipedia] Mốc: 1938–1940: Xây chùa Linh Sơn trên đồi thấp ở số 120, khánh thành năm 1940. Trụ trì đầu tiên là Hoà thượng Thích Trí Thủ. — nguồn: en.wikipedia.org, vinwonders.com
- [chỉ Wikipedia] Mốc: 1952: Đúc tượng Phật bằng đồng nặng 1.250 kg cho chính điện chùa Linh Sơn. — nguồn: en.wikipedia.org

## Ba Toa – đường Hoàng Diệu (`hoang-dieu`) — 1 ý

- [chỉ blog] Chuyện: Đường Abattoir thời Pháp — nguồn: didulichdalat.wordpress.com

## Đường Bùi Thị Xuân (`bui-thi-xuan`) — 6 ý

- [chỉ blog] Tên xưa: Thouard — nguồn: tinbds.com, didulichdalat.wordpress.com
- [chỉ blog] Tên xưa: Võ Tánh — nguồn: tinbds.com, didulichdalat.wordpress.com
- [chỉ blog] Tên xưa: Bùi Thị Xuân — nguồn: tinbds.com, didulichdalat.wordpress.com
- [chỉ blog] Mốc: 1953: Đường Thouard đổi tên thành Võ Tánh. — nguồn: tinbds.com
- [chỉ blog] Mốc: 1975 hoặc 1976: Đường Võ Tánh đổi tên thành Bùi Thị Xuân. — nguồn: didulichdalat.wordpress.com, tinbds.com
- [chỉ blog] Chuyện: Ba tên trong một thế kỷ — nguồn: tinbds.com, didulichdalat.wordpress.com

## Đồi chè Cầu Đất (`cau-dat`) — 4 ý

- [chỉ Wikipedia] Tên xưa: Entrerays (tên Pháp của ga Cầu Đất) — nguồn: en.wikipedia.org
- [chỉ Wikipedia] Mốc: 1908–1932: Người Pháp làm tuyến đường sắt Tháp Chàm – Đà Lạt dài 84 km, khởi công 1908, hơn 24 năm mới thông; ga Cầu Đất ở km 66. — nguồn: mia.vn, vinwonders.com, en.wikipedia.org
- [chỉ Wikipedia] Mốc: 1977: Xã Xuân Trường và Xuân Thọ (huyện Đơn Dương) nhập về thành phố Đà Lạt (Quyết định 51-CP ngày 10/3/1977). — nguồn: vi.wikipedia.org
- [chỉ blog] Chuyện: Săn mây trên đồi chè — nguồn: mia.vn, vinwonders.com, mia.vn

## Ga Đà Lạt (`ga-da-lat`) — 1 ý

- [chỉ Wikipedia] Mốc: 1972: Tuyến Tháp Chàm – Đà Lạt ngừng chạy; nhà ga bị hư hại. — nguồn: vi.wikipedia.org, vinwonders.com

## Đường Hai Bà Trưng (`hai-ba-trung`) — 6 ý

- [chỉ blog] Tên xưa: Pasteur — nguồn: tinbds.com, didulichdalat.wordpress.com
- [chỉ blog] Tên xưa: Hai Bà Trưng — nguồn: tinbds.com, didulichdalat.wordpress.com
- [chỉ blog] Mốc: 1933: Nhờ Phật tử cúng dường, thảo am được xây thành ngôi Tam bảo. — nguồn: mia.vn, vinwonders.com
- [chỉ Wikipedia] Mốc: 1938: Vua Bảo Đại ban sắc tứ cho chùa Linh Quang. — nguồn: vi.wikipedia.org, vinwonders.com
- [chỉ blog] Mốc: 1953: Đường Pasteur đổi tên thành Hai Bà Trưng. — nguồn: tinbds.com
- [chỉ blog] Chuyện: Con phố nhiều quán '33' — nguồn: vinwonders.com, foody.vn

## Quanh hồ Xuân Hương (`ho-xuan-huong`) — 13 ý

- [chỉ Wikipedia] Tên xưa: Grand Lac (Hồ Lớn) — nguồn: vi.wikipedia.org, mia.vn, openstreetmap.org
- [chỉ Wikipedia] Tên xưa: Đà Lạt Central Square / Quảng trường trung tâm Đà Lạt — nguồn: en.wikipedia.org
- [chỉ blog] Tên xưa: Vườn hoa Bích Câu / Công viên hoa Đà Lạt — nguồn: mytour.vn, vinwonders.com
- [chỉ Wikipedia] Mốc: 1919: Công sứ Cunhac đề xướng, kỹ sư công chánh Labbé đắp đập ngăn suối Cam Ly, tạo hồ. — nguồn: vi.wikipedia.org, mia.vn
- [chỉ Wikipedia] Mốc: 1922: Sân golf trên Đồi Cù khánh thành (H. S. Colt, C. H. Alison thiết kế), được gọi là sân golf đầu tiên của Việt Nam. — nguồn: golfpass.com, vi.wikipedia.org
- [chỉ Wikipedia] Mốc: 1923: Xây thêm một đập phía dưới, hồ thành hai hồ nối nhau. — nguồn: vi.wikipedia.org, mia.vn
- [chỉ Wikipedia] Mốc: 3/1932: Bão lớn làm vỡ cả hai đập, ngập vùng dưới hồ. — nguồn: vi.wikipedia.org, mia.vn
- [chỉ Wikipedia] Mốc: 1934–1935: Xây đập đá lớn (dân gọi Cầu Ông Đạo), hồ có hình dáng như bây giờ. — nguồn: vi.wikipedia.org, mia.vn
- [chỉ Wikipedia] Mốc: 1953: Hồ đổi tên từ Grand Lac thành hồ Xuân Hương. — nguồn: vi.wikipedia.org, mia.vn
- [chỉ blog] Mốc: 1966: Bắt đầu xây Vườn hoa Bích Câu (nay là Vườn hoa thành phố); sau bị bỏ hoang, khôi phục năm 1985. — nguồn: mytour.vn, vinwonders.com
- [chỉ Wikipedia] Mốc: 8/8/1990: Tỉnh Lâm Đồng cấp phép nâng sân golf lên 18 lỗ (Dalat Palace Golf Club), 71,5 ha, thời hạn 50 năm. — nguồn: vi.wikipedia.org, mytour.vn
- [chỉ Wikipedia] Chuyện: Cái đập thành cây cầu — nguồn: vi.wikipedia.org, mia.vn
- [chỉ Wikipedia] Chuyện: Đồi Cù: lưng cừu hay đánh cù — nguồn: vi.wikipedia.org, mytour.vn

## Đường Hoàng Hoa Thám (`hoang-hoa-tham`) — 6 ý

- [chỉ blog] Tên xưa: Dốc Trại Hầm — nguồn: tinbds.com, didulichdalat.wordpress.com
- [chỉ blog] Tên xưa: Hoàng Hoa Thám — nguồn: tinbds.com, didulichdalat.wordpress.com
- [chỉ blog] Mốc: khoảng 1930: Cụ Hầm dựng trại gần ngã ba Hoàng Hoa Thám - Hùng Vương ngày nay; con dốc được gọi theo tên trại. — nguồn: tinbds.com
- [chỉ blog] Mốc: 1948–1962: Ni sư Thích Nữ Tú Hương trùng tu chỗ tụng niệm cũ thành chùa Linh Phong. — nguồn: vietnamtourismgroup.blogspot.com
- [chỉ blog] Mốc: 1953: Dốc Trại Hầm đổi tên thành đường Hoàng Hoa Thám. — nguồn: tinbds.com
- [chỉ blog] Chuyện: Con dốc mang tên một cái trại — nguồn: tinbds.com, didulichdalat.wordpress.com

## Chân núi Lang Biang (`lang-biang`) — 3 ý

- [chỉ Wikipedia] Mốc: 1977: Xã Lát (khi ấy thuộc huyện Đức Trọng) được nhập về thành phố Đà Lạt (Quyết định 51-CP ngày 10/3/1977). — nguồn: vi.wikipedia.org
- [chỉ Wikipedia] Mốc: 1979: Lập huyện Lạc Dương (Quyết định 116-CP ngày 14/3/1979), gồm cả xã Lát; lập thị trấn Lạc Dương từ một phần xã Lát, làm huyện lỵ. — nguồn: vi.wikipedia.org
- [chỉ Wikipedia] Mốc: 1986: Phường 7 (Đà Lạt) được tách ra từ Phường 4 cũ (Quyết định 67-HĐBT ngày 6/6/1986). — nguồn: vi.wikipedia.org

## Đường Nguyễn Công Trứ (`nguyen-cong-tru`) — 5 ý

- [chỉ blog] Tên xưa: Dankir (đường thời Pháp) — nguồn: didulichdalat.wordpress.com
- [chỉ Wikipedia] Mốc: 1957: Viện Đại học Đà Lạt ra đời (hoạt động từ 1958), nay là Trường Đại học Đà Lạt ở số 1 Phù Đổng Thiên Vương, ngay ngã năm đầu đường Nguyễ — nguồn: vi.wikipedia.org
- [chỉ blog] Mốc: 1975: Đường Tôn Thất Thuyết và Nguyễn Hoàng (cùng gốc đường Dankir thời Pháp với Nguyễn Công Trứ) đổi thành Xô Viết Nghệ Tĩnh — con đường ở  — nguồn: didulichdalat.wordpress.com
- [chỉ blog] Chuyện: Ngã năm của sinh viên — nguồn: mia.vn, foody.vn
- [chỉ blog] Chuyện: Xưởng cà phê giữa phố quán — nguồn: grantourismotravels.com, vietnam.travel

## Chợ đêm Đà Lạt (`nguyen-thi-minh-khai`) — 3 ý

- [chỉ Wikipedia] Mốc: 1937: Sau một trận cháy lớn, công ty SIDEC xây chợ gạch thay cho Chợ Cây. — nguồn: vi.wikipedia.org
- [chỉ blog] Chuyện: Bánh tráng nướng, dâu lắc — nguồn: vietnamtourism.com, vietnamairlines.com
- [chỉ blog] Chuyện: Một con dốc, bốn cửa hàng Langfarm — nguồn: langfarm.com

## Đường Phan Bội Châu (`phan-boi-chau`) — 4 ý

- [chỉ blog] Tên xưa: Van Vollenhoven — nguồn: didulichdalat.wordpress.com
- [chỉ blog] Mốc: 2007: Khách sạn Mường Thanh Holiday Đà Lạt ở số 42 mở cửa (sửa lại năm 2014). — nguồn: nz.trip.com
- [chỉ blog] Chuyện: Quán bar mê cung 'Đường Lên Trăng' — nguồn: foody.vn, thaiest.com, nz.trip.com
- [chỉ blog] Chuyện: Đầu đường là quảng trường chợ cũ — nguồn: didulichdalat.wordpress.com

## Thung lũng Tình Yêu (`thung-lung-tinh-yeu`) — 7 ý

- [chỉ Wikipedia] Tên xưa: Đập 3 / hồ Đa Thiện 3 — nguồn: vi.wikipedia.org
- [chỉ blog] Tên xưa: Khu du lịch Hồ Rồng — nguồn: vinwonders.com, mytour.vn
- [chỉ Wikipedia] Mốc: 1939: Trường Thiếu sinh quân hỗn hợp Âu Á (École d'Enfants de Troupe de Dalat) được lập — cơ sở về sau Viện Đại học Đà Lạt kế thừa. — nguồn: vi.wikipedia.org
- [chỉ blog] Mốc: 1978 / 1992 / 2003: Đồi Mộng Mơ (từ Hồ Rồng) khởi công 1978, thành khu du lịch 1992, khai trương 2003 dịp 110 năm Đà Lạt. — nguồn: vinwonders.com
- [chỉ blog] Mốc: 1994: Lập làng tranh thêu XQ ở Đà Lạt với khoảng 20 nghệ nhân; năm 1996 thành Công ty XQ Sử Quán Đà Lạt. — nguồn: mia.vn
- [chỉ blog] Mốc: 2026: Tháng 8/2026 TTC World – Thung Lũng Tình Yêu mở vườn thú tương tác DalaZoo (hơn 50 con vật). — nguồn: ttcgroup.vn
- [chỉ Wikipedia] Chuyện: Hai khu du lịch thành một — nguồn: vi.wikipedia.org, uk.trip.com, vinwonders.com, mytour.vn

## Ga Trại Mát (`trai-mat`) — 2 ý

- [chỉ blog] Tên xưa: Trại Mát (tên vùng) — nguồn: mia.vn
- [chỉ blog] Mốc: 1938: Đạo Cao Đài đến Đà Lạt; về sau thánh thất đặt ở tổ Đa Phước, gần ga Trại Mát. — nguồn: vinwonders.com, localvietnam.com

## Đường Trần Hưng Đạo (`tran-hung-dao`) — 1 ý

- [chỉ blog] Tên xưa: Paul Doumer — nguồn: didulichdalat.wordpress.com, mia.vn

## Dinh III Bảo Đại (`trieu-viet-vuong`) — 5 ý

- [chỉ blog] Tên xưa: Darles — nguồn: tinbds.com, didulichdalat.wordpress.com
- [chỉ blog] Tên xưa: Triệu Việt Vương — nguồn: tinbds.com, didulichdalat.wordpress.com
- [chỉ blog] Mốc: 1953: Đường Darles đổi tên thành Triệu Việt Vương. — nguồn: tinbds.com
- [chỉ Wikipedia] Mốc: giữa năm 2000: Dinh được giao cho Công ty du lịch dịch vụ Xuân Hương quản lý. Trước đó, sau năm 1975, dinh thuộc Ban tài chính quản trị Tỉnh — nguồn: vi.wikipedia.org
- [chỉ blog] Chuyện: Đường nằm trên ranh hai khu phố — nguồn: tinbds.com

## Thiền viện Trúc Lâm – Hồ Tuyền Lâm (`truc-lam`) — 1 ý

- [chỉ blog] Chuyện: Datanla: nước dưới lá — nguồn: enjoydalat.blogspot.com

## Làng Hoa Vạn Thành (`van-thanh`) — 2 ý

- [chỉ blog] Mốc: 1998: Thác Cam Ly được công nhận thắng cảnh quốc gia (VinWonders). — nguồn: vinwonders.com
- [chỉ blog] Mốc: 2019: Fresh Garden (90B Vạn Thành) bắt đầu đón khách; Làng Cổ Tích 'gây sốt' đầu 2019. — nguồn: mia.vn

## Đường Yersin (`yersin`) — 3 ý

- [chỉ blog] Tên xưa: Albert Sarraut — nguồn: didulichdalat.wordpress.com
- [chỉ blog] Tên xưa: Yersin — nguồn: didulichdalat.wordpress.com
- [chỉ Wikipedia] Chuyện: Vết đồng hồ trên tháp chuông — nguồn: vi.wikipedia.org, en.wikipedia.org

## Đợt tìm nguồn mạnh (25/11/2026)

Thêm được nguồn báo, EFEO, tạp chí cho 14 ý: hồ Xuân Hương 8 ý (VOV, VietnamNet, VietnamPlus, EFEO), Nguyễn Văn Trỗi 2, Cầu Đất 1, Ga Đà Lạt 1, Trại Mát 1, Vạn Thành 1. Khoảng 75 ý chưa tìm được, phần lớn là tên đường cũ — trang "Đường phố Đà Lạt" của tỉnh (lamdong.gov.vn/sites/duongpho) báo lỗi 503, nên thử lại lúc khác.

**Nguồn mạnh nói khác dữ liệu (chưa sửa nội dung, chờ quyết):**
1. Hồ Xuân Hương — bão 1932: EFEO ghi tháng 5/1932 (dữ liệu ghi tháng 3). Đã sửa: chỉ ghi năm 1932.
2. Chợ đêm — mốc 1937: Kiến Thức ghi Chợ Cây cháy năm 1931, 1937 chính quyền thành phố xây chợ gạch, không nhắc SIDEC.
3. Cầu Đất — đường sắt: EFEO ghi đoạn Sông Pha – Đà Lạt làm 1922–1932 (không nói khởi công 1908); SGGP ghi ga Cầu Đất cách Đà Lạt 25 km.
4. Sân golf Đồi Cù: VOV ghi câu lạc bộ golf xây 1936, "sân đầu tiên ở Đông Dương", 1992 mới làm sân 18 lỗ (dữ liệu: khánh thành 1922, giấy phép 18 lỗ 8/8/1990).
5. Chùa Linh Quang: Tạp chí Nghiên cứu Phật học ghi có từ 1921 (dữ liệu đã ghi "1921 hoặc 1931").

Nguồn nên dùng tiếp: bộ tài liệu triển lãm Đà Lạt của EFEO (efeo.fr/exposition-virtuelle/da-lat/Expo_Dalat_Partie1..4.pdf); bài Tạp chí Nghiên cứu Phật học về Phật giáo Lâm Đồng.

## Soát "Tên xưa" (26/11/2026)
- 81 dòng → ẩn 42 dòng không phải tên cũ của chính nơi đó (tên đường/nơi khác, đơn vị hành chính, tên gọi khác hiện nay, nguồn nghi); giữ trong `ten_khac_khong_hien` của `data/chuyen/<slug>.json`.
- Kiểm 42 dòng còn lại bằng Địa chí Đà Lạt, trang Đường phố Đà Lạt của tỉnh, Báo Lâm Đồng, báo lớn. Sửa:
  - Trần Phú: bỏ "Maréchal Foch" (là đường 3 Tháng 2 — Địa chí Đà Lạt, Thanh Niên).
  - Yersin: Thống Nhất từ 1953 (không phải "chưa rõ"), Yersin từ 1993.
  - Đợt đổi tên sau giải phóng là năm 1976 (Niên biểu Đà Lạt: đổi tên 22 đường); "1975" chỉ ở blog.
  - Trần Hưng Đạo: từ 1953. Nguyễn Chí Thanh: tên cũ Đồng Khánh, Thành Thái (thứ tự chưa chắc).
  - Khu An Nam: khu người Việt trong quy hoạch Hébrard 1923. Dinh I: "Domaine Bourgery" (sửa chính tả, chưa chắc).
  - Ẩn "Ga hỏa xa" (cách gọi, không phải tên đổi), "ấp Vạn Thành" (giống tên nay).
  - Đánh dấu chưa chắc (?): Thung lũng Hòa Bình, Prềnh, L'Arbre Broyé, Domaine Bourgery.
- Lưu ý: lamdong.gov.vn lỗi 503 lúc kiểm; các chỗ dẫn trang tỉnh đọc qua đoạn trích máy tìm kiếm.
