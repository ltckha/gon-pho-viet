# Nhà thờ Con Gà (Nhà thờ Chính tòa Thánh Nicôla Bari) — đường Trần Phú (26/11/2026)

Kết quả: `data/pho/nha-tho-con-ga.json`, chuyện: `data/chuyen/nha-tho-con-ga.json`. Loại nơi: **điểm** (`diem`). Theo hướng mới: địa lý và lịch sử là chính, không bày quán.
**4 mục đạt ≥ 2 nguồn ở 2 trang khác nhau** (nhà thờ + 3 mốc trong khuôn viên), 4 mục cần kiểm thêm.
Lịch sử chỉ của chính nhà thờ và hai ngôi tiền thân (1920, 1923); không lấy chuyện khách sạn Palace, Du Parc hay đường Trần Phú.

Cách làm: tải OSM quanh nhà thờ (bbox 108.4365,11.9350,108.4390,11.9372), hỏi Nominatim (User-Agent "gon-pho-viet-map/1.0", cách nhau ≥ 1,2 giây), đọc Wikipedia tiếng Việt (bản thô) và tiếng Anh, trang Giáo phận Đà Lạt, VOV, Thanh Niên, Vietnamnet, Báo Lâm Đồng, Tiền Phong, GCatholic, triển lãm EFEO về Đà Lạt, localvietnam. Không dùng Google Maps (GCatholic chỉ có Plus Code dẫn sang Google — không lấy).

## Tên đường — tự kiểm
Nhà thờ ở **đường Trần Phú** (đoạn gần nhất trong `duong.json` cách tâm nhà thờ khoảng 45 m). Quanh nhà thờ trên OSM còn: "Lê Đại Hành" (khoảng 60 m), "Hẻm 17 Trần Phú", "Nhà Chung" (khoảng 105 m). Tên OSM của nhà thờ: "Nhà thờ Chánh tòa" (name:fr "Cathédrale Saint Nicolas").

## Phường

| Nơi | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Trần Phú: Trần Hưng Đạo (khách sạn Palace) → hết Công ty CP Địa ốc Đà Lạt | P3 | **Xuân Hương - Đà Lạt** | chắc | [thuviennhadat tran-phu-phuong-3](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-phu-phuong-3) (QĐ 02/2020, cùng bảng có "Hẻm 21 Trần Phú - PHƯỜNG 3") |
| Nhà thờ Chính tòa | P3 | Xuân Hương - Đà Lạt | chắc | [GCatholic](https://gcatholic.org/churches/asia/1902) ("Phường 3"); [Wikipedia](https://vi.wikipedia.org/wiki/Nh%C3%A0_th%E1%BB%9D_ch%C3%ADnh_t%C3%B2a_%C4%90%C3%A0_L%E1%BA%A1t) ("phường Xuân Hương – Đà Lạt") |

NQ 1671 mục 99: Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt. Nominatim ghi "Phường Xuân Hương - Đà Lạt"; theo ranh `phuong.json` điểm nhà thờ nằm trong Xuân Hương (mã 24781).
Cách Chợ Đà Lạt khoảng 810 m đường chim bay (OSM, điểm chợ trong `duong.json`).

## Câu giới thiệu
"Nhà thờ Con Gà: nhà thờ chính tòa Thánh Nicôla Bari trên đường Trần Phú, xây từ 1931 đến 1942 theo đồ án của linh mục Céleste Nicolas; tháp chuông cao 47 m, trên đỉnh có con gà chỉ hướng gió, trong nhà thờ có 70 ô kính màu làm ở Pháp; cách Chợ Đà Lạt khoảng 800 m."
- "1931–1942": Wikipedia tiếng Việt, [localvietnam](https://localvietnam.com/lam-dong/dalat/dalat-cathedral/), [VOV 2005](https://english.vov.vn/en/travel/beautiful-churches-in-the-central-highland-city-of-da-lat-35342.vov), [Thanh Niên 18/06/2023](https://thanhnien.vn/goc-ky-hoa-nha-tho-con-ga-da-lat-185230617211949771.htm), [Vietnamnet 20/04/2025](https://vietnamnet.vn/chiem-nguong-kien-truc-chau-au-gan-100-tuoi-cua-nha-tho-con-ga-giua-pho-da-lat-2390652.html).
- "Céleste Nicolas": Wikipedia tiếng Việt, localvietnam.
- "47 m": Wikipedia, VOV, Thanh Niên, [Giáo phận Đà Lạt 06/05/2022](https://giaophandalat.com/nha-tho-chinh-toa.html), Vietnamnet.
- "70 ô kính màu làm ở Pháp": Giáo phận Đà Lạt, VOV, Thanh Niên (70), Wikipedia (xưởng Louis Balmet, Grenoble).
- "800 m": đo chim bay trên OSM (khoảng 810 m).

## Danh sách chính (≥ 2 nguồn)

| # | Tên | Loại | Đường OSM | Nguồn | Tin cậy | Vị trí OSM |
|---|---|---|---|---|---|---|
| 1 | Nhà thờ Chính tòa Đà Lạt (nhà thờ Con Gà) | nhà thờ chính tòa, 1931–1942 | Trần Phú | [Wikipedia VI](https://vi.wikipedia.org/wiki/Nh%C3%A0_th%E1%BB%9D_ch%C3%ADnh_t%C3%B2a_%C4%90%C3%A0_L%E1%BA%A1t) · [Wikipedia EN](https://en.wikipedia.org/wiki/St._Nicholas_Cathedral,_Da_Lat) · [VOV 2005](https://english.vov.vn/en/travel/beautiful-churches-in-the-central-highland-city-of-da-lat-35342.vov) · [Thanh Niên 2023](https://thanhnien.vn/goc-ky-hoa-nha-tho-con-ga-da-lat-185230617211949771.htm) · [Giáo phận Đà Lạt](https://giaophandalat.com/nha-tho-chinh-toa.html) · [GCatholic](https://gcatholic.org/churches/asia/1902) · [OSM](https://www.openstreetmap.org/way/452519411) | cao | way/452519411 (108.4376882, 11.9362368) |
| 2 | Tháp chuông và con gà chỉ hướng gió | tháp chuông 47 m, con gà 0,66 x 0,58 m | Trần Phú | Wikipedia VI · Wikipedia EN · VOV · [localvietnam](https://localvietnam.com/lam-dong/dalat/dalat-cathedral/) · Thanh Niên · Giáo phận | cao (chất liệu lệch) | không (OSM không vẽ riêng tháp) |
| 3 | 70 ô kính màu Louis Balmet | kính màu, làm ở Grenoble (Pháp) | Trần Phú | Giáo phận · VOV · Thanh Niên · Wikipedia VI · localvietnam | cao (năm lắp chưa rõ) | không |
| 4 | 14 phù điêu Đàng Thánh Giá của Xuân Thi | phù điêu xi măng – sắt, 1 x 0,8 m | Trần Phú | Giáo phận · Thanh Niên · Wikipedia VI · localvietnam | cao (năm làm chưa rõ) | không |

## Cần kiểm thêm

| Tên | Nguồn có | Vì sao |
|---|---|---|
| Tượng Chúa Kitô bằng đá cẩm thạch (sân trước) | [OSM node/12869705006](https://www.openstreetmap.org/node/12869705006) | chỉ OSM |
| Vườn tượng Đức Mẹ dưới tán thông | [Vietnamnet 2025](https://vietnamnet.vn/chiem-nguong-kien-truc-chau-au-gan-100-tuoi-cua-nha-tho-con-ga-giua-pho-da-lat-2390652.html) | 1 nguồn |
| Hiệu sách Phaolô sau nhà thờ | Vietnamnet (bản Việt + [bản Anh](https://vietnamnet.vn/en/da-lat-s-chicken-church-showcases-french-architecture-from-the-1930s-2393617.html)) | cùng một báo → 1 nguồn |
| Chuông hiện nay trên tháp | — | không tìm thấy nguồn ghi số chuông, nơi đúc |

## Lịch sử (tóm, chi tiết trong `data/chuyen/nha-tho-con-ga.json`)
- Tên xưa: **Église Saint-Nicolas** (bảng 1932–1940 của triển lãm [EFEO](https://www.efeo.fr/exposition-virtuelle/da-lat/Expo_Dalat_Partie2.pdf): "L'église Saint-Nicolas et le cimetière"); thành "cathédrale" từ 1960.
- **1917** linh mục Nicolas Couveur xây dưỡng viện cho giáo sĩ, một phần nay là nhà xứ (Wikipedia VI, localvietnam).
- **10/5/1920** cha Frédéric Sidot làm cha xứ đầu tiên, dựng nhà thờ nhỏ 24 x 7 m, trên cửa khắc "Hic Domus Est Dei" (Wikipedia VI, localvietnam, VOV, Thanh Niên).
- **1922–1923** nhà thờ thứ hai 26 x 8 m, tháp chuông 16 m, khánh thành 17/2/1923, nay không còn (Wikipedia VI, VOV, localvietnam, Wikipedia EN). 4 chuông Paccard: chỉ Wikipedia VI và localvietnam.
- **19/7/1931** Khâm sứ Colomban Dreyer đặt viên đá đầu tiên (Wikipedia VI, EN, localvietnam).
- **30/3/1932** xong cung thánh, hậu tẩm, hai gian cánh (Wikipedia; localvietnam chỉ ghi năm).
- **14/11/1934** đặt thánh giá có con gà lên đỉnh tháp (Wikipedia VI, EN, localvietnam).
- **25/1/1942** khánh thành; **2/1942** làm phép (Wikipedia VI, EN, localvietnam, VOV).
- **24/11/1960** lập Giáo phận Đà Lạt, nhà thờ thành chính tòa ([GCatholic](https://gcatholic.org/dioceses/diocese/dala0.htm), [Wikipedia EN](https://en.wikipedia.org/wiki/Roman_Catholic_Diocese_of_%C4%90%C3%A0_L%E1%BA%A1t)).
- Chuyện: con gà chỉ hướng gió (gà Gaulois hay sám hối); hai ngôi nhà thờ trước nhà thờ Con Gà; "Bài thánh ca buồn" (năm lệch, có dấu ?).
- Nay: Báo Lâm Đồng 25/12/2025 tả lễ đêm Giáng sinh 20h–21h15; [Tiền Phong 24/12/2024](https://tienphong.vn/hang-nghin-nguoi-chen-chan-check-in-ben-cay-thong-cao-17m-o-nha-tho-con-ga-post1703819.tpo): hàng nghìn người bên cây thông cao 17 m.

## Không hiện (giữ làm tư liệu)
- 1893 linh mục Robert đi cùng Yersin — chuyện chung của Đà Lạt (`moc_khong_hien`).
- "Nhà thờ Con Gà", "Nhà thờ Chánh tòa" — tên gọi hiện nay; "Hic Domus Est Dei" — chữ khắc, không phải tên (`ten_khac_khong_hien`).

## Chỗ còn nghi
1. **Số nhà**: 13 (Wikipedia VI), 15 (mia), 17 (Thanh Niên 2023) → không ghi.
2. **Con gà**: đồng (VOV, Vietnamnet) hay hợp kim nhẹ rỗng phủ hoá chất (Wikipedia, localvietnam, Thanh Niên); "cách mặt đất 27 m" không khớp tháp 47 m → không dùng.
3. **Tước hiệu**: trang Giáo phận ghi Thánh Nicôla Bari "sau được đổi là tước hiệu Đức Maria Mẹ Thiên Chúa" — 1 nguồn, không năm; GCatholic vẫn ghi Thánh Nicola Bari.
4. Wikipedia VI viết tháng 4/1920 "thành lập Giáo phận Đà Lạt" — nhầm (giáo phận lập 1960); 1920 là giáo sở.
5. Wikipedia EN ghi "nhà thờ xây năm 1917"; nguồn khác: 1917 là dưỡng viện.
6. Năm sáng tác "Bài thánh ca buồn": 1972 (Thanh Niên) / 1944 (Wikipedia).
7. Không đọc được: lamdong.gov.vn (503), dalat.vn (503), danviet.vn (403), dalatgis.vn bản lưu (nguồn gốc của Wikipedia VI). Không tìm thấy văn bản xếp hạng di tích.
