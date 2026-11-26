# Chùa Linh Phước (chùa Ve Chai) — Trại Mát, phía đông Đà Lạt (26/11/2026)

Kết quả: `data/pho/chua-linh-phuoc.json`, chuyện: `data/chuyen/chua-linh-phuoc.json`. Loại nơi: **điểm** (`diem`). Theo hướng mới: địa lý và lịch sử là chính, không bày quán, không giá vé, giờ mở.
**5 mốc trong khuôn viên đạt ≥ 2 nguồn ở 2 trang khác nhau**, 3 mục cần kiểm thêm. Ga Trại Mát và thánh thất Cao Đài Đa Phước (đều cách chùa khoảng 300 m) đã có ở nơi `trai-mat`, em không chép lịch sử của chúng sang đây.

Cách làm: tải OSM quanh chùa (bbox 108.4965,11.9420,108.5025,11.9465), hỏi Nominatim (User-Agent "gon-pho-viet-map/1.0", cách nhau ≥ 1,2 giây), đọc báo (Tuổi Trẻ, Báo Pháp Luật, Thanh Tra, VTC News, VietNamNet, Báo Văn hóa, DTiNews), Wikipedia tiếng Anh, và vài trang du lịch (mia, vietnamtourism, greensm) chỉ để đối chiếu. Không dùng Google Maps.

## Tên đường — tự kiểm
Địa chỉ báo ghi **120 Tự Phước** (Tuổi Trẻ 2013, VietNamNet 2016, VTC 2023). Trong `duong.json` có "Tự Phước" (cách tâm chùa khoảng 180–230 m) và "Lương Định Của" (khoảng 100 m, đường sát khuôn viên; OSM còn một đoạn ghi "Đường Lương Định Của"). Nominatim gắn tháp chùa vào đường Lương Định Của. Không có trang Wikipedia tiếng Việt riêng cho chùa (trang em thử trả 404).

## Phường

| Nơi | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Chùa Linh Phước, 120 Tự Phước | P11 | **Xuân Trường - Đà Lạt** | chắc | [Tuổi Trẻ 12/2013](https://tuoitre.vn/chua-manh-chai---linh-phuoc-583186.htm) · [VietNamNet 11/2016](https://vietnamnet.vn/en/linh-phuoc-the-pagoda-of-records-E166161.html) · [VTC 11/2023](https://vtcnews.vn/ngoi-chua-nao-co-kien-truc-ve-chai-doc-dao-giu-nhieu-ky-luc-nhat-viet-nam-ar834043.html) ("phường 11") |
| Tự Phước (bảng giá 2020 ghi "Hùng Vương (Quốc lộ 20)") | P11 | Xuân Trường - Đà Lạt | chắc | [thuviennhadat](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/hung-vuong-quoc-lo-20-phuong-11) (dùng lại từ `trai-mat`) |

NQ 1671 mục 102: Phường 11 + xã Xuân Thọ, Xuân Trường, Trạm Hành → Xuân Trường - Đà Lạt. Nominatim ghi "Phường Xuân Trường - Đà Lạt"; theo ranh `phuong.json` (mã 24805) tâm chùa và tháp đều nằm trong Xuân Trường.
Khoảng cách chim bay (OSM): Chợ Đà Lạt khoảng 6,8 km (báo ghi khoảng 8 km theo quốc lộ 20); ga Trại Mát khoảng 300 m về phía đông bắc; thánh thất Cao Đài khoảng 300 m về phía đông.

## Câu giới thiệu
"Chùa Linh Phước (chùa Ve Chai): chùa ở Trại Mát khởi công năm 1949, xây lại lớn từ năm 1990, khắp nơi khảm mảnh chai, mảnh sành — con rồng dài 49 m trong sân ghép từ khoảng 12.000 vỏ chai, tháp 7 tầng treo đại hồng chung đúc năm 1999 nặng 8.500 kg; cách ga Trại Mát khoảng 300 m."
- "1949": Tuổi Trẻ 2013, Báo Pháp Luật 2018, Thanh Tra 2012, VTC 2023, Báo Văn hóa 2017.
- "1990": Báo Pháp Luật, Thanh Tra, VTC, VietNamNet.
- "49 m": Tuổi Trẻ, Báo Pháp Luật, Thanh Tra, VietNamNet, Wikipedia. "12.000 vỏ chai": Báo Pháp Luật, Wikipedia.
- "7 tầng": Tuổi Trẻ, Báo Pháp Luật, Thanh Tra; OSM building:levels=7.
- "1999", "8.500 kg": Tuổi Trẻ (1999), Báo Pháp Luật, Thanh Tra, VietNamNet (8.500 kg).
- "300 m": đo trên OSM (way/1048566814 → node/3377406129).

## Danh sách chính (≥ 2 nguồn)

| # | Tên | Loại | Đường OSM | Nguồn | Tin cậy | Vị trí OSM |
|---|---|---|---|---|---|---|
| 1 | Chính điện khảm sành | chính điện, dài 33 m | Tự Phước | [Báo Pháp Luật 2018](https://baophapluat.vn/nhung-duyen-ngo-ky-la-o-ngoi-chua-ket-thanh-tu-hang-trieu-manh-ve-chai-post293846.html) · [Thanh Tra 2012](https://thanhtra.com.vn/van-hoa-the-thao-BE2162E3A/ngoan-canh-chua-ve-chai-FE52732F.html) · [Tuổi Trẻ 2013](https://tuoitre.vn/chua-manh-chai---linh-phuoc-583186.htm) · [vietnamtourism](https://www.vietnamtourism.com/vi/chua-linh-phuoc-ngoi-chua-kham-sanh-da-lat-lich-su-tham-quan) | cao (rộng lệch) | không (2 khối nhà thờ không tên) |
| 2 | Rồng ve chai ở Long Hoa Viên | tác phẩm khảm, 49 m | Tự Phước | Tuổi Trẻ · Báo Pháp Luật · Thanh Tra · [VietNamNet 2016](https://vietnamnet.vn/en/linh-phuoc-the-pagoda-of-records-E166161.html) · [VTC 2023](https://vtcnews.vn/ngoi-chua-nao-co-kien-truc-ve-chai-doc-dao-giu-nhieu-ky-luc-nhat-viet-nam-ar834043.html) · [Wikipedia](https://en.wikipedia.org/wiki/Linh_Ph%C6%B0%E1%BB%9Bc_Temple) | cao | không |
| 3 | Tháp chuông 7 tầng (Linh tháp) | tháp chuông | Lương Định Của | Tuổi Trẻ · Thanh Tra · Báo Pháp Luật · [DTiNews 2017](https://dtinews.dantri.com.vn/print/20171219094216580.htm) · VTC · [OSM](https://www.openstreetmap.org/way/522159670) | cao (chiều cao lệch) | way/522159670 (108.499451, 11.944229) |
| 4 | Đại hồng chung | chuông, 1999, 8.500 kg | Lương Định Của | Tuổi Trẻ · Báo Pháp Luật · Thanh Tra · VietNamNet · Wikipedia | cao | không (trong tháp) |
| 5 | Tượng Quan Âm hoa bất tử | tượng bằng hoa, 17 m | Tự Phước | Tuổi Trẻ · Báo Pháp Luật · [Báo Văn hóa 2017](https://baovanhoa.vn/di-san/chua-linh-phuoc-da-lat-xac-lap-ky-luc-the-gioi-45356.html) · DTiNews 2017 | cao (số bông lệch) | không (3 điểm tượng không tên) |

Toạ độ chính của nơi: **way/1048566814** "Chùa Linh Phước" (landuse=religious), tâm theo Nominatim **108.4993994, 11.9442799**.

## Cần kiểm thêm

| Tên | Nguồn có | Vì sao |
|---|---|---|
| Hòa thượng Thích Đức Liên chỉ đạo xây chùa 1949 | [greensm 2025](https://www.greensm.com/vn-vi/news/chua-linh-phuoc-da-lat) | 1 nguồn, trang doanh nghiệp |
| Đường hầm 18 tầng địa ngục, dài khoảng 300 m | VTC 2023 (tên kỷ lục) · [mia](https://mia.vn/cam-nang-du-lich/chua-linh-phuoc-chua-ve-chai-kham-pha-ngoi-chua-co-11-cai-nhat-va-kien-truc-dac-sac-o-da-lat-1344) | chiều dài chỉ blog, năm làm chưa rõ |
| Tháp chuông được ghi kỷ lục năm 2008 | mia · [vinpearl](https://vinpearl.com/vi/chua-linh-phuoc-da-lat) | chỉ blog du lịch |

## Lịch sử (tóm, chi tiết trong `data/chuyen/chua-linh-phuoc.json`)
- Không tìm thấy tên xưa khác; "chùa Ve Chai / Mảnh Chai" là tên dân gọi → `ten_khac_khong_hien`.
- **1949** khởi công (5 báo); **1952** xong (Báo Pháp Luật, Thanh Tra, VietNamNet, Wikipedia; greensm, mia ghi sớm hơn).
- **1951** trụ trì đầu tiên được ghi tên: Thích Minh Thể; 5 đời trụ trì tới nay (VTC, VietNamNet, Wikipedia).
- **1985** Thích Tâm Vị trụ trì; **1990** xây lại lớn, khảm mảnh chai, sành.
- **1999** đúc đại hồng chung 8.500 kg (nghệ nhân Huế).
- **25/11–31/12/2009** kết tượng Quan Âm hoa bất tử 17 m; **2010** ra mắt dịp Festival Hoa, kỷ lục Việt Nam; **2012** kỷ lục châu Á; **2017** kỷ lục thế giới (DTiNews, Báo Văn hóa).
- **1/7/2025** vào phường Xuân Trường - Đà Lạt.
- Chuyện: vì sao gọi chùa Ve Chai; đi xin ve chai (chỉ Báo Pháp Luật — 1 nguồn); pho tượng kết bằng hoa.

## Chỗ còn nghi
1. **Năm xong**: 1952 (3 báo + Wikipedia) / khoảng 1950–1951 (greensm, mia).
2. **Thích Minh Đức trụ trì từ** 1959 (VTC, VietNamNet, Wikipedia) hay 1957 (Báo Pháp Luật).
3. **Chiều cao tháp**: 36 m / 37 m / 27 m (VietNamNet) / OSM height=20 → không ghi số.
4. **Số bông hoa**: 600.000 (Tuổi Trẻ, Báo Pháp Luật) / 650.000 (Báo Văn hóa, DTiNews, mia).
5. **Số kỷ lục**: 11 (Báo Pháp Luật 2018) / 13 VN + 1 châu Á + 1 thế giới (Báo Văn hóa 2017) / 16 VN + 1 châu Á + 1 thế giới (VTC 2023) → không ghi một con số.
6. Người khai sơn chưa rõ. Không có văn bản xếp hạng di tích nào em tìm thấy.
7. Chùa đang là một địa điểm trong nơi `trai-mat` (và là mốc trong `hien_thi.json` của `trai-mat`); khi thêm nơi riêng cần quyết giữ hay bỏ ở đó.
