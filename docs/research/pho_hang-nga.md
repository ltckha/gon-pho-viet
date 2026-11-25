# Biệt thự Hằng Nga (Crazy House) và khu quanh đó — Huỳnh Thúc Kháng, Lê Hồng Phong, Huyền Trân Công Chúa (25/11/2026)

Kết quả: `data/pho/hang-nga.json`, chuyện của nơi này: `data/chuyen/hang-nga.json`. Theo hướng mới (trang 3 phần: địa lý, lịch sử, nay có gì), em không đi từng quán mà tìm các mốc lâu đời, công trình. Có 5 nơi đạt ≥ 2 nguồn ở 2 trang web khác nhau, 4 nơi cần kiểm thêm.

Cách làm: em tải dữ liệu OSM quanh biệt thự (`api.openstreetmap.org/api/0.6/map`, bbox 108.424,11.928,108.438,11.940 và 108.416,11.930,108.424,11.944), lọc các điểm có tên không phải quán ăn, khách sạn, rồi tìm từng nơi trên báo, Wikipedia, văn bản cũ. Đường gần nhất đo trên `duong.json`, phường kiểm bằng `phuong.json`, khoảng cách là chim bay.
Quy ước nguồn giống trang Ga Đà Lạt: hai bài cùng một trang chỉ tính 1; bài chép lại (Việt Báo dẫn VietNamNet) tính chung 1; không dùng Google Maps, không dùng Vinpearl; chưa đi thực tế. Không trùng nơi nào đã có trong `data/pho/*.json` (Dinh III thuộc trang Triệu Việt Vương, nhà thờ Con Gà thuộc trang Trần Phú). Kho game không có nghiên cứu nào về Hằng Nga.

## Địa lý

- Biệt thự ở **3 Huỳnh Thúc Kháng**, gần ngã ba với Lê Hồng Phong (khoảng 70 m) và Trần Phú (khoảng 140 m).
- Cách **Chợ Đà Lạt khoảng 1,2 km** chim bay về phía tây nam; Dinh III khoảng 530 m; nhà thờ Con Gà khoảng 760 m.
- Tên trong OSM (`duong.json`, trường `ten`): "Huỳnh Thúc Kháng", "Lê Hồng Phong", "Trần Phú", "Huyền Trân Công Chúa" — đều khớp. `duong.json` chưa có mốc Biệt thự Hằng Nga (trong OSM có điểm "Biệt Thự Hằng Nga" node/1152347338 và khối nhà "Crazy House" relation/20657435).

| Đường | Đoạn | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|---|
| Huỳnh Thúc Kháng | trọn đường (biệt thự số 3) | P4 | **Xuân Hương - Đà Lạt** | chắc | [thuviennhadat huynh-thuc-khang-phuong-4](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/huynh-thuc-khang-phuong-4) |
| Lê Hồng Phong | trọn đường (Viện Pasteur số 18) | P4 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat le-hong-phong-phuong-4](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/le-hong-phong-phuong-4) |
| Trần Phú | giáp Cty CP Địa ốc Đà Lạt – vòng xoay Hoàng Văn Thụ/Trần Lê (nhà thờ Thánh Tâm số 40) | P4 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat tran-phu-phuong-4](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/tran-phu-phuong-4) |
| Huyền Trân Công Chúa | cả hai đoạn (Couvent des Oiseaux, nhà thờ Du Sinh) | P5 | **Cam Ly - Đà Lạt** | chắc | [thuviennhadat huyen-tran-cong-chua-phuong-5](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/huyen-tran-cong-chua-phuong-5) |

Bảng giá đất QĐ 02/2020/QĐ-UBND (sửa bởi QĐ 16/2021), hết hiệu lực 01/01/2026. Đổi phường theo `nq1671.json`: mục 99 (P1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt), mục 100 (P5, P6, xã Tà Nung → Cam Ly - Đà Lạt). Kiểm `phuong.json`: biệt thự trong Xuân Hương, cách ranh khoảng 630 m; Couvent des Oiseaux và Du Sinh trong Cam Ly. Wikipedia tiếng Việt cũng ghi biệt thự "phường Xuân Hương" và trường Dân tộc Nội trú "phường Cam Ly".

**Kết luận:** `ward` = **Xuân Hương - Đà Lạt**, độ chắc **chắc**. Hai mốc phía tây (cách 1–1,4 km) sang phường Cam Ly.

## Câu giới thiệu
"Biệt thự Hằng Nga (Crazy House): ngôi nhà bê tông hình gốc cây, hang động do kiến trúc sư Đặng Việt Nga xây từ năm 1990 trên đường Huỳnh Thúc Kháng, từng suýt bị phá, năm 2008 mới được tỉnh công nhận quyền sở hữu; quanh đó là Viện Pasteur Đà Lạt mở năm 1936 và trường dòng Couvent des Oiseaux thập niên 1930."
- "1990": [VnExpress 2008](https://vnexpress.net/cong-nhan-nha-dien-tai-da-lat-2100046.html), [Tiền Phong 2011](https://tienphong.vn/Phong-Su/549292/Nu-nghe-si-doc-lap-va-%E2%80%9CNgoi-nha-ky-di%E2%80%9D-tpp.html), [VietNamNet 08/2026](https://vietnamnet.vn/en/da-lat-s-bizarre-crazy-house-still-draws-crowds-decades-later-2548773.html), [crazyhouse.vn](https://www.crazyhouse.vn/) (tháng 2/1990).
- "suýt bị phá", "2008": VnExpress 13/02/2008 (UBND tỉnh cấp quyền sở hữu sau 18 năm), Tiền Phong 2011 (năm 1993 bị đe doạ phá).
- "Viện Pasteur mở năm 1936": [L'Avenir du Tonkin 1936 qua entreprises-coloniales](https://www.entreprises-coloniales.fr/inde-indochine/Institut_Pasteur_Dalat.pdf), [Báo Lâm Đồng](https://baolamdong.vn/vac-xin-tu-da-lat-289397.html), [Wikipedia EN](https://en.wikipedia.org/wiki/Institut_Pasteur_de_Dalat).
- "Couvent des Oiseaux thập niên 1930": [VIR 2016](https://vir.com.vn/a-historic-monastery-in-dalat-43154.html) (xây 1935), [Wikipedia VI](https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_Ph%E1%BB%95_th%C3%B4ng_D%C3%A2n_t%E1%BB%99c_N%E1%BB%99i_tr%C3%BA_L%C3%A2m_%C4%90%E1%BB%93ng) (khai giảng 1936).

## Danh sách chính (≥ 2 nguồn)

| # | Tên | Loại | Đường OSM · số nhà | Cách biệt thự | Nguồn | Tin cậy |
|---|---|---|---|---|---|---|
| 1 | Biệt thự Hằng Nga (Crazy House) | công trình, điểm tham quan, nhà nghỉ | Huỳnh Thúc Kháng · 3 | — | [VnExpress 02/2008](https://vnexpress.net/cong-nhan-nha-dien-tai-da-lat-2100046.html) · [Tiền Phong 08/2011](https://tienphong.vn/Phong-Su/549292/Nu-nghe-si-doc-lap-va-%E2%80%9CNgoi-nha-ky-di%E2%80%9D-tpp.html) · [VietNamNet 08/2026](https://vietnamnet.vn/en/da-lat-s-bizarre-crazy-house-still-draws-crowds-decades-later-2548773.html) · [Người Quan Sát 09/2026](https://nguoiquansat.vn/phat-hien-ngoi-nha-dien-o-viet-nam-gay-sot-tren-truyen-thong-quoc-te-tung-lot-top-15-ky-quan-ngoan-muc-nhat-the-gioi-317413.html) · [Wikipedia VI](https://vi.wikipedia.org/wiki/Bi%E1%BB%87t_th%E1%BB%B1_H%E1%BA%B1ng_Nga) · [Wikipedia EN](https://en.wikipedia.org/wiki/H%E1%BA%B1ng_Nga_Guesthouse) · [crazyhouse.vn](https://www.crazyhouse.vn/) · [VinWonders](https://vinwonders.com/vi/wonderpedia/news/biet-thu-hang-nga/) · [OSM](https://www.openstreetmap.org/node/1152347338) | cao |
| 2 | Viện Pasteur Đà Lạt (nay Cty Vắc xin Pasteur Đà Lạt) | công trình thời Pháp, sản xuất vắc xin | Lê Hồng Phong · 18 | ~430 m | [entreprises-coloniales (báo 1936)](https://www.entreprises-coloniales.fr/inde-indochine/Institut_Pasteur_Dalat.pdf) · [Wikipedia EN](https://en.wikipedia.org/wiki/Institut_Pasteur_de_Dalat) · [Báo Lâm Đồng](https://baolamdong.vn/vac-xin-tu-da-lat-289397.html) · [trungtamthuoc](https://trungtamthuoc.com/thuong-hieu/davac) · [OSM](https://www.openstreetmap.org/way/1305208733) | cao |
| 3 | Couvent des Oiseaux (nay Trường PT DTNT Lâm Đồng) | công trình thời Pháp, trường học | Huyền Trân Công Chúa · 2 | ~1 km | [VIR 07/2016](https://vir.com.vn/a-historic-monastery-in-dalat-43154.html) · [Wikipedia VI](https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_Ph%E1%BB%95_th%C3%B4ng_D%C3%A2n_t%E1%BB%99c_N%E1%BB%99i_tr%C3%BA_L%C3%A2m_%C4%90%E1%BB%93ng) · [OSM](https://www.openstreetmap.org/way/542486117) | cao |
| 4 | Nhà thờ Du Sinh | nhà thờ dáng đình chùa | Huyền Trân Công Chúa · (12B hay 40/8, lệch) | ~1,4 km | [Kiến Thức 12/2016](https://kienthuc.net.vn/kho-tri-thuc/top-nha-tho-hot-nhat-da-lat-mua-giang-sinh-793237.html) · [toplist](https://toplist.vn/top-list/nha-tho-dep-nhat-o-da-lat-5945.htm) · [dalat.app](https://dalat.app/blog/news/du-sinh-church-unique-architecture-da-lat) · [OSM](https://www.openstreetmap.org/way/542486128) | trung bình |
| 5 | Nhà thờ Thánh Tâm | nhà thờ | Trần Phú · 40 | ~300 m | [toplist](https://toplist.vn/top-list/nha-tho-dep-nhat-o-da-lat-5945.htm) · [mia](https://mia.vn/cam-nang-du-lich/kham-pha-10-nha-tho-da-lat-13967) · [OSM](https://www.openstreetmap.org/way/361851889) | thấp |

Ghi chú từng nơi:
1. **Biệt thự Hằng Nga** — còn mở (VietNamNet 08/2026, Người Quan Sát 09/2026 vẫn kể khách tham quan). Lệch: 10 phòng (VnExpress 2008, Wikipedia VI) / 11 phòng (VietNamNet 2026, crazyhouse.vn, VinWonders); khuôn viên "gần 4.000 m²" (Wikipedia VI) / "ban đầu gần 1.900 m²" (Người Quan Sát); "hoàn thành 2010" chỉ Người Quan Sát. "Lonely Planet xếp thứ 11/15 kỳ quan" chỉ Người Quan Sát; "nhận ảnh hưởng Gaudí" chỉ Wikipedia EN → không đưa vào. Giờ mở lệch (OSM 08:30–19:00, VinWonders 08:30–18:00) → không ghi giờ, giá.
2. **Viện Pasteur** — năm xây 1933–1934, trang bị 1935, mở 1/1/1936: báo L'Avenir du Tonkin 21/09/1936 (chép trên entreprises-coloniales). Wikipedia EN ghi Yersin đứng đầu năm 1936, còn báo 1936 ghi giám đốc là Dr Louis Souchard → em ghi "theo đề xuất của Yersin" như Báo Lâm Đồng. Là nhà máy đang chạy, chưa thấy nguồn nói cho khách vào.
3. **Couvent des Oiseaux** — VIR: xây 1935, trường hoạt động 1940–1975; Wikipedia VI: nữ tu đến 3/10/1935, khai giảng 26/10/1936 (lệch năm mở trường). Kiến trúc sư: chưa rõ.
4. **Nhà thờ Du Sinh** — 1955, cha Bửu Dưỡng: Kiến Thức + toplist. Khánh thành 1957, tháp chuông 1962: chỉ toplist. Xa nhất (1,4 km), nên coi là "đi thêm".
5. **Nhà thờ Thánh Tâm** — đủ 2 nguồn cho tên, địa chỉ, nhưng **không có năm xây** → đừng chọn làm mốc lâu đời cho tới khi có nguồn lịch sử.

## Cần kiểm thêm

| Tên | Đường · số | Nguồn có | Vì sao |
|---|---|---|---|
| Biệt thự Hoa Hồng | Huỳnh Thúc Kháng · 17 | [Báo Lâm Đồng 09/2025](https://baolamdong.vn/dai-tuong-niem-cam-ly-noi-mau-da-do-giua-ngan-hoa-388961.html) | 1 nguồn: 11/5/1951 đội cảm tử Phan Như Thạch bắn Haasz (Chánh Thanh tra mật thám) ở đây; chưa rõ nhà cũ còn không |
| Chùa Lộc Uyển | Đào Duy Từ | [OSM](https://www.openstreetmap.org/way/515193537) | chỉ OSM |
| Toà nhà "Điện lực Đà Lạt thời Pháp thuộc" | Ba Tháng Hai | [OSM](https://www.openstreetmap.org/way/361851837) | chỉ tên OSM, không có năm |
| Trường THPT chuyên Thăng Long | Trần Phú · 10 | [tuyensinh247](https://diemthi.tuyensinh247.com/tuyen-sinh-lop10-truong/thpt-chuyen-thang-long-da-lat-1301.html) | năm lập lệch 1975 / 1991; sát nhà thờ Con Gà (trang Trần Phú) |

## Chuyện (`data/chuyen/hang-nga.json`)
- Tên gọi: Crazy House, Ngôi nhà điên, nhà gốc cây, lâu đài mạng nhện (VnExpress 2008, Người Quan Sát, VinWonders). Chưa có nguồn giải thích chữ "Hằng Nga".
- Mốc: 1933–1936 Viện Pasteur · 1935–1936 Couvent des Oiseaux · 1951 biệt thự Hoa Hồng (`mot_nguon`) · 1955 nhà thờ Du Sinh · 1983 bà Nga vào Đà Lạt · 2/1990 khởi công biệt thự · 1992–1993 Nhà 100 mái bị phá, biệt thự bị đe doạ (`mot_nguon` phần 1993) · 2008 cấp quyền sở hữu · 2009 People's Daily · 2010 DAVAC · 2025 đổi phường.
- Chuyện: "Ngôi nhà suýt bị phá", "Con gái Tổng Bí thư học kiến trúc ở Mátxcơva", "Gốc cây, hang động và phòng mang tên con vật", "Vay bạn bè để xây" (`mot_nguon`), "Vắc xin làm trên cao nguyên" (`mot_nguon`), "Trường của các tiểu thư", "Nhà thờ dáng chùa".
- Món: không có món đặc trưng có nguồn → để trống.

## Chỗ còn nghi
1. Số phòng (10/11), diện tích (4.000/1.900 m²), "hoàn thành 2010" của biệt thự.
2. Người đứng đầu Viện Pasteur năm 1936 (Yersin hay Souchard).
3. Năm mở trường Couvent des Oiseaux (1936 hay 1940).
4. OSM gắn tên cũ "Nguyễn Tường Tam" (old_name:1964) cho đường Huỳnh Thúc Kháng — không tìm được nguồn khác, chưa dùng.
5. Nhà thờ Thánh Tâm chưa có nguồn lịch sử; nhà thờ Du Sinh địa chỉ lệch.
6. Chưa có nguồn nào nói bà Đặng Việt Nga hiện còn trực tiếp quản lý hay không (crazyhouse.vn vẫn ghi tên bà) → không ghi.
