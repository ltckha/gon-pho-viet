# Nhà thờ Domaine de Marie (nhà thờ Mai Anh) — đồi Mai Anh, đường Ngô Quyền (25/11/2026)

Kết quả: `data/pho/domaine-de-marie.json`, chuyện của nơi: `data/chuyen/domaine-de-marie.json`. Có 7 nơi đạt ≥ 2 nguồn ở 2 trang khác nhau (nhà thờ + 6 mốc quanh đó), 6 nơi cần kiểm thêm.

Hướng mới: trang 3 phần (địa lý, lịch sử, nay có gì), không đi từng quán → mốc chọn là công trình lâu đời, không lấy quán ăn.
Cách làm: tải OSM quanh đồi (`api.openstreetmap.org/api/0.6/map`, bbox 108.422,11.941,108.438,11.958), lấy điểm có tên rồi tìm từng nơi trên báo (VnExpress, Thanh Niên, NLĐ, PLO, SGGP, Báo Lâm Đồng), Wikipedia, trang giáo xứ. Phường kiểm bằng `phuong.json`, tên đường đối chiếu `duong.json`. Không dùng Google Maps. Không trùng nơi đã có trong `data/pho/*.json` (Chùa Linh Sơn thuộc Nguyễn Văn Trỗi, Chùa Linh Quang thuộc Hai Bà Trưng, Lăng Nguyễn Hữu Hào và thác Cam Ly thuộc Vạn Thành).

## Phường

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Ngô Quyền | trọn đường (2 đoạn giá, ranh ở số 43) | P6 | Cam Ly - Đà Lạt | chắc | [thuviennhadat ngo-quyen-phuong-6](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/ngo-quyen-phuong-6) |
| Thi Sách | trọn đường | P6 | Cam Ly - Đà Lạt | chắc | [thuviennhadat thi-sach-phuong-6](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/thi-sach-phuong-6) |
| Nhà thờ (1 Ngô Quyền) | | P6 (vinhson.net, mia) | Cam Ly - Đà Lạt | chắc | [Thanh Niên 30/03/2026](https://thanhnien.vn/nha-tho-domaine-de-marie-lanh-dia-duc-ba-giua-long-da-lat-185260329222936747.htm) ghi "P.Cam Ly - Đà Lạt" |
| Mai Hắc Đế, Phạm Ngọc Thạch, Đồi Mai Anh | chân đồi | chưa rõ | Cam Ly - Đà Lạt | khá chắc | [Thanh Niên 18/06/2026](https://thanhnien.vn/benh-vien-da-khoa-tinh-lam-dong-diem-sang-y-te-vung-tay-nguyen-185260618082519492.htm) ghi BV "01 Phạm Ngọc Thạch, phường Cam Ly"; `phuong.json` |

Bảng giá QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021), hết hiệu lực 01/01/2026. NQ 1671 mục 100: Phường 5, Phường 6, xã Tà Nung → Cam Ly - Đà Lạt. Điểm OSM nhà thờ (way/361692265) và mọi đoạn Ngô Quyền, Đồi Mai Anh, Mai Hắc Đế, Phạm Ngọc Thạch, Thi Sách trong `duong.json` đều nằm trong Cam Ly. **Kết luận: Cam Ly - Đà Lạt, chắc.**

Địa lý: nhà thờ cách Chợ Đà Lạt khoảng 1,0 km đường chim bay (điểm OSM, về phía tây bắc chợ). Ngô Quyền trong `duong.json` chạy từ phía bắc xuống, cuối đường gặp Mai Hắc Đế / Phạm Ngọc Thạch ngay chân đồi (tinbds: dài khoảng 1,4 km, từ Bạch Đằng tới Mai Hắc Đế — 1 nguồn).

## Lịch sử nhà thờ — đối chiếu nguồn

| Ý | Nguồn đồng ý | Ghi chú |
|---|---|---|
| Khởi công 1940 | [Thanh Niên 2026](https://thanhnien.vn/nha-tho-domaine-de-marie-lanh-dia-duc-ba-giua-long-da-lat-185260329222936747.htm), [Wikipedia EN](https://en.wikipedia.org/wiki/Domaine_de_Marie), [VnExpress 2014](https://vnexpress.net/nha-tho-doc-dao-tren-doi-mai-anh-dao-da-lat-2964644.html) ("1940–1944") | [vinhson.net](https://vinhson.net/giao-xu-mai-anh-domaine-de-marie.html): đặt đá 8/1939, Đức cha Jean Cassaigne (1 nguồn) |
| Xong 1942 | vinhson.net, Wikipedia EN (khánh thành 11/1942) | VnExpress "1940–1944"; trang du lịch "1930–1943"; Wikipedia VI "từ 1938" (tự mâu thuẫn) → còn lệch |
| Bà Suzanne Humbert (vợ Toàn quyền Jean Decoux) vận động quyên góp | VnExpress, Thanh Niên, Wikipedia VI/EN | |
| Bà mất 1944, tai nạn đèo Prenn, mộ sau nhà thờ | VnExpress, Thanh Niên, Wikipedia VI/EN | ngày 6/1/1944 chỉ blog → bỏ |
| Dòng Nữ tử Bác ái Thánh Vinh Sơn | VnExpress, Thanh Niên, Wikipedia | |
| Khuôn viên 12 ha | VnExpress, Wikipedia VI/EN | |
| 11 x 33 m, mặt bằng chữ thập, mái kiểu nhà rông, tường hồng | VnExpress, Thanh Niên, Wikipedia VI | |
| Vôi + mật mía, không xi măng | Thanh Niên, VnExpress | |
| Tượng Đức Mẹ 3 m, 1 tấn, 1943, Jonchère, bà Decoux dâng | VnExpress, Thanh Niên, Wikipedia VI | tên viết Jonchère / Janchère / Jouchère; vinhson.net: làm ở Hà Nội, về đồi 15/8/1944 |
| Trước 1975: hơn 50 nữ tu, nhà trẻ, mồ côi, trường tiểu học chương trình Pháp | VnExpress, mapstore | |
| Sau 1975 lập giáo xứ Mai Anh; cha Giuse Nguyễn Văn Hân từ 12/1975 | vinhson.net, mapstore | 29/06/1976 chỉ mapstore |
| 4/2000 giao Tu hội Truyền giáo Vinh Sơn | vinhson.net | 1 nguồn |
| Kiến trúc sư thiết kế nhà nguyện | — | chưa nguồn nào nêu |

## Tên xưa của đường

| Tên cũ | Nay | Nguồn | Ghi chú |
|---|---|---|---|
| Calmette | Thi Sách và Ngô Quyền | [Báo Lâm Đồng 13/11/2013](https://baolamdong.vn/dalatxuanay/201311/da-lat-nhung-con-duong-ap-cu-pho-xua-2446126/) ("CALMETTE - Thi Sách và Ngô Quyền"), [trangdulichdalat](https://trangdulichdalat.wordpress.com/2018/12/08/da-lat-ten-duong-xua-va-nay/) (thêm một đoạn nay là Phạm Ngọc Thạch) | [tinbds](https://tinbds.com/lam-dong/da-lat/duong-ngo-quyen) ghi đổi năm 1953; Báo Lâm Đồng chỉ ghi "tên trước 1953 và tên ngày nay" → năm đổi chưa chắc |
| Cassaigne | Mai Hắc Đế | Báo Lâm Đồng 2013 ("CASSAIGUE"), trangdulichdalat | không nối với Đức cha Cassaigne vì chưa nguồn nào nói |
| Hôpital | Hải Thượng | Báo Lâm Đồng 2013 | 1 nguồn |

## Mốc quanh đó (danh sách chính)

| Nơi | Cách nhà thờ | Ý chính | Nguồn | Tin cậy |
|---|---|---|---|---|
| Trung tâm Lưu trữ quốc gia IV (Biệt điện Trần Lệ Xuân), 2 Yết Kiêu | ~550 m | 3 biệt thự khởi công 1958, ~1,3 ha; 2007 trùng tu làm TTLTQG IV; gần 35.000 mộc bản triều Nguyễn, UNESCO 2009 | [NLĐ 2016](https://tuoitre.vn/nld/thoi-su-trong-nuoc/xa-hoa-nhu-biet-dien-tran-le-xuan-20160126220548738.htm), [Thanh Niên 2023](https://thanhnien.vn/goc-ky-hoa-biet-dien-tran-le-xuan-185231216194917196.htm), [SGGP](https://www.sggp.org.vn/noi-bao-quan-ky-uc-trieu-nguyen-giua-da-lat-post856008.html), OSM way/1016426047 | cao |
| Bệnh viện Đa khoa tỉnh Lâm Đồng, 01 Phạm Ngọc Thạch | ~370 m | "gần một thế kỷ", 800 giường; tiền thân Dân Y Viện Đà Lạt những năm 1930 | [Thanh Niên 2026](https://thanhnien.vn/benh-vien-da-khoa-tinh-lam-dong-diem-sang-y-te-vung-tay-nguyen-185260618082519492.htm), [hellobacsi](https://hellobacsi.com/care/benh-vien/benh-vien-da-khoa-tinh-lam-dong-2247/), OSM way/473556887 | trung bình (năm 1930 chỉ trang thương mại) |
| Nhà thờ giáo xứ Vinh Sơn (xóm Lạc Vang cũ), 51 Yết Kiêu | ~560 m | nhà thờ gỗ Phục Sinh 1957, dòng Vinh Sơn từ 1962, giáo xứ 02/01/1972, nhà thờ mới khánh thành 04/06/2025 | [mapstore](https://mapstore.vn/tin-tuc/nha-tho-giao-xu-vinh-son-giao-phan-da-lat), [giothanhle](https://giothanhle.net/gio-le/nha-tho-vinh-son-da-lat/), OSM way/1355656405 | trung bình (trang Công giáo, không có báo) |
| Nhà thờ Cam Ly (Sơn Cước) | ~1,1 km | mái nhà rông cao ~17 m, ~80.000 viên ngói; cha Boutary khởi xướng, cha Kermarrec vẽ | [Thanh Niên 2026](https://thanhnien.vn/nha-tho-cam-ly-khi-chua-va-yang-cung-chung-mot-mai-nha-185260330220522158.htm), [Wikipedia](https://vi.wikipedia.org/wiki/Nh%C3%A0_th%E1%BB%9D_Cam_Ly), [mia](https://mia.vn/cam-nang-du-lich/nha-tho-cam-ly-da-lat-kham-pha-kien-truc-nha-tho-dam-mau-sac-dan-toc-mien-son-cuoc-o-da-lat-1609), OSM way/515288602 | cao (năm xây lệch 1959/1960/1961–1968; nhà thầu lệch) |
| Dinh Tỉnh trưởng (Đồi Dinh), cuối Lý Tự Trọng | ~900 m (phường Xuân Hương) | Pháp xây trước 1910; sau 1975 Cung thiếu nhi, 1978–1999 Bảo tàng Lâm Đồng, nay trưng bày kỷ vật Đà Lạt | [Thanh Niên 2023](https://thanhnien.vn/goc-ky-hoa-dinh-tinh-truong-da-lat-185230715200426634.htm), [PLO 2023](https://tuoitre.vn/plo/nuoi-tiec-cong-trinh-kien-truc-dinh-tinh-truong-o-da-lat-se-bi-di-doi-post760283.html), OSM way/618049072 | cao |
| Cụm biệt thự Pháp cổ Lê Lai (Ana Mandara Villas) | ~840 m | biệt thự cổ giữa rừng thông, đã trùng tu làm khu nghỉ | [VnExpress 2007](https://vnexpress.net/biet-thu-co-giua-ngan-thong-2935144.html), [mia](https://mia.vn/cam-nang-du-lich/ana-mandara-villas-dalat-resort-spa-ngoi-lang-co-kinh-nuoc-phap-5898), OSM node/12882531037 | trung bình (số biệt thự 19/17, năm 1920–1930 chỉ trang du lịch) |

## Cần kiểm thêm

| Nơi | Lý do |
|---|---|
| Trường Cao đẳng Y tế Lâm Đồng (6B Ngô Quyền) | chỉ OSM + tinbds, chưa có lịch sử |
| Museum Madam De Dalat (trong khu Biệt điện) | chỉ OSM |
| Ni viện Tuệ Quang | chỉ OSM |
| Đình Mỹ Thành | chỉ OSM (ghi 1945) |
| Đình Bao La | chỉ OSM |
| Vườn dâu Công nghệ cao Bình Yên (19A Mai Hắc Đế) | chỉ OSM, không phải mốc lâu đời |

## Còn nghi
1. Năm xây xong nhà thờ (1942 / 1943 / 1944) và năm đặt đá (8/1939 hay 1940).
2. Kiến trúc sư nhà nguyện: không rõ.
3. Năm đổi Calmette → Ngô Quyền (1953 chỉ trang bất động sản).
4. Chưa có bài Báo Lâm Đồng / Nhân Dân riêng về nhà thờ; trang du lịch tỉnh (lamdong.gov.vn) mở bị 503.
