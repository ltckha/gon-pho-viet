# Trường Đại học Đà Lạt — khuôn viên đồi thông, số 1 Phù Đổng Thiên Vương (26/11/2026)

Kết quả: `data/pho/dai-hoc-da-lat.json`, chuyện: `data/chuyen/dai-hoc-da-lat.json`. Loại nơi: **điểm** (`diem`). Theo hướng mới: địa lý và lịch sử là chính, không bày quán.
**4 nơi đạt ≥ 2 nguồn ở 2 trang khác nhau** (2 nơi độ tin "cao", 2 nơi "khá"), 4 mục cần kiểm thêm.

Cách làm: tải OSM quanh trường (bbox 108.438,11.950,108.452,11.963), hỏi Nominatim (User-Agent "gon-pho-viet-map/1.0", cách nhau ≥ 1,2 giây), đọc báo (Thanh Niên, SGGP, Tuổi Trẻ, Báo Lâm Đồng, Tia Sáng), bài nghiên cứu của Đỗ Hữu Nghiêm (vietcatholicnews 2008), Wikipedia (Việt, Anh, Pháp), bài EFEO 2025, blog kiến trúc sư Trần Công Hòa, blog Mực Tím Sơn Đen, dulich24. Không dùng Google Maps. Trang lịch sử chính thức `dlu.edu.vn` và kho `museum.dlu.edu.vn` báo lỗi 503; `giaophandalat.com` báo 403 → chưa đối chiếu được.

## Tên đường — tự kiểm
Cổng trường ở **Phù Đổng Thiên Vương** số 1 (OSM `addr:street`, Nominatim). Trong `duong.json` có "Phù Đổng Thiên Vương" (rìa tây khuôn viên, đoạn gần nhất cách tâm khoảng 330 m), "Võ Trường Toản" (rìa bắc, Nominatim ghi thư viện nằm phía đường này), "Đinh Tiên Hoàng" (gặp ở Ngã năm Đại học). Đường nội bộ "Đường vào A3" có trong OSM, không dùng làm tên.

## Phường

| Nơi | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Phù Đổng Thiên Vương: Ngã năm Đại học → đầu đường Nguyễn Hữu Cảnh | P8 | **Lâm Viên - Đà Lạt** | chắc | [thuviennhadat phu-dong-thien-vuong-phuong-8](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/phu-dong-thien-vuong-phuong-8) (QĐ 02/2020, sửa bởi QĐ 16/2021) |
| Khuôn viên trường | P8 | Lâm Viên - Đà Lạt | chắc | [OSM way/969458761](https://www.openstreetmap.org/way/969458761) + Nominatim ("Phường Lâm Viên - Đà Lạt"); Wikipedia ghi "Phường Lâm Viên" |

NQ 1671 mục 101: Phường 8, 9, 12 → Lâm Viên - Đà Lạt. Theo ranh `phuong.json`: tâm khuôn viên, thư viện, nhà A1, A31, cổng trước, Hồ Đại Học, Ngã năm Đại học đều trong Lâm Viên; Xuân Hương bắt đầu ngay phía nam (Vườn hoa thành phố).
Khoảng cách chim bay (OSM): tâm khuôn viên → Chợ Đà Lạt khoảng 1,66 km; → Ngã năm Đại học khoảng 370 m; → Vườn hoa thành phố khoảng 810 m.

## Câu giới thiệu
"Trường Đại học Đà Lạt: khuôn viên khoảng 38 ha trên đồi thông ở số 1 Phù Đổng Thiên Vương, cách Chợ Đà Lạt khoảng 1,7 km đường chim bay; năm 1939 là Trường Thiếu sinh quân Âu – Á của Pháp, năm 1957 thành Viện Đại học Đà Lạt (khóa đầu 1958), từ ngày 27/10/1976 là Trường Đại học Đà Lạt."
- "38 ha": [Wikipedia](https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_L%E1%BA%A1t) (dẫn Nguyễn Tiến Quỳnh, *Đường phố Đà Lạt*, 2003, tr. 151), [Thanh Niên 31/03/2024](https://thanhnien.vn/goc-ky-hoa-truong-dai-hoc-da-lat-185240330224034094.htm), [Đỗ Hữu Nghiêm 2008](http://vietcatholicnews.org/News/Html/55503.htm) ("chừng 38-40 ha"). Lệch: dulich24 có chỗ ghi "gần 30 ha"; Wikipedia tiếng Anh ghi 1,7 ha và 40 ha.
- "1,7 km": em đo trên OSM (1,66 km).
- "1939": Wikipedia, Thanh Niên 2024, [wiki tiếng Pháp](https://franco.wiki/fr/Enfant_de_troupe.html), [EFEO 2025](https://www.efeo.fr/uploads/2026/01/alter-2025-2_dolin-violette.pdf).
- "1957", "1958": Đỗ Hữu Nghiêm (Nghị định 67/BNV/NA/P5 ngày 8/8/1957; niên khóa 1958–1959), [Wikipedia EN](https://en.wikipedia.org/wiki/Dalat_University) (8/8/1957), [Tuổi Trẻ 11/2023](https://tuoitre.vn/truong-dai-hoc-da-lat-hanh-trinh-65-nam-thu-nhan-khai-phong-ban-sac-2023111610494645.htm) ("65 năm kể từ đợt tuyển sinh đầu tiên"), [Tia Sáng 2019](https://tiasang.com.vn/truong-dai-hoc-da-lat-tham-lang-va-chuyen-tam-4973692.html).
- "27/10/1976": [SGGP 18/11/2023](https://www.sggp.org.vn/truong-dai-hoc-da-lat-gap-mat-65-nam-hinh-thanh-va-phat-trien-post714660.html) (Quyết định 426), [Báo Lâm Đồng 24/10/2026](https://baolamdong.vn/truong-dai-hoc-da-lat-dot-pha-tu-duy-doi-moi-chat-luong-day-va-hoc-471080.html).

## Danh sách chính (≥ 2 nguồn)

| # | Tên | Loại | Đường OSM | Nguồn | Tin cậy | Vị trí OSM |
|---|---|---|---|---|---|---|
| 1 | Trường Đại học Đà Lạt | khuôn viên đồi thông, 1939 / 1957 / 1976 | Phù Đổng Thiên Vương | [Wikipedia](https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_L%E1%BA%A1t) · [Thanh Niên 2024](https://thanhnien.vn/goc-ky-hoa-truong-dai-hoc-da-lat-185240330224034094.htm) · [SGGP 2023](https://www.sggp.org.vn/truong-dai-hoc-da-lat-gap-mat-65-nam-hinh-thanh-va-phat-trien-post714660.html) · [Báo Lâm Đồng 2026](https://baolamdong.vn/truong-dai-hoc-da-lat-dot-pha-tu-duy-doi-moi-chat-luong-day-va-hoc-471080.html) · [Đỗ Hữu Nghiêm](http://vietcatholicnews.org/News/Html/55503.htm) · [OSM](https://www.openstreetmap.org/way/969458761) | cao | way/969458761 (108.4453785, 11.9560857) |
| 2 | Nguyện đường Năng Tĩnh và tháp chuông (tháp Sao) | nhà nguyện cũ, nay giảng đường; tháp 38 m | Phù Đổng Thiên Vương | [Tia Sáng 2019](https://tiasang.com.vn/truong-dai-hoc-da-lat-tham-lang-va-chuyen-tam-4973692.html) · [blog KTS Trần Công Hòa](http://dalatarchi-tranconghoakts.blogspot.com/2014/10/dalatarchi-vien-ai-hoc-lat.html) · [Thanh Niên 2024](https://thanhnien.vn/goc-ky-hoa-truong-dai-hoc-da-lat-185240330224034094.htm) · [Mực Tím Sơn Đen 2024](https://www.muctimsonden.com/2024/01/vien-ai-hoc-lat-xua.html) · [dulich24](https://dulich24.com.vn/du-lich-thanh-pho-da-lat/truong-dai-hoc-da-lat-id-4569) | khá (năm xây chưa rõ; "tháp Sao = tháp Năng Tĩnh" do em nối) | không (dulich24 ghi ở nhà A25, way/543357227 — 1 nguồn, không lấy) |
| 3 | Các giảng đường mang tên chữ trong sách Nho (Thụ Nhân, Minh Thành, Tri Nhất, Thượng Chí, Đôn Hóa…) | giảng đường, đại học xá | Phù Đổng Thiên Vương | [Wikipedia](https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_L%E1%BA%A1t) · [Thanh Niên 2024](https://thanhnien.vn/goc-ky-hoa-truong-dai-hoc-da-lat-185240330224034094.htm) · [dulich24](https://dulich24.com.vn/du-lich-thanh-pho-da-lat/truong-dai-hoc-da-lat-id-4569) · [Wikipedia Viện ĐH](https://vi.wikipedia.org/wiki/Vi%E1%BB%87n_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_L%E1%BA%A1t) | cao | không (OSM chỉ ghi số nhà A1…A32) |
| 4 | Thư viện (Trung tâm Thông tin – Thư viện) | thư viện, có từ thời Viện | Võ Trường Toản | [Đỗ Hữu Nghiêm](http://vietcatholicnews.org/News/Html/55503.htm) · [Nguyễn Vĩnh Nguyên – Doanh nhân Plus 2023](https://doanhnhanplus.vn/thanh-pho-thu-vien-625391.html) · [Wikipedia](https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_L%E1%BA%A1t) · [OSM](https://www.openstreetmap.org/way/542490161) | khá (chưa rõ tòa nay có phải tòa cũ) | way/542490161 (108.4449192, 11.9571918) |

## Cần kiểm thêm

| Tên | Nguồn có | Vì sao |
|---|---|---|
| Hồ Đại Học | [OSM way/99660981](https://www.openstreetmap.org/way/99660981) | chỉ OSM |
| Nhà A1 – văn phòng "gần 50 năm" | [dulich24](https://dulich24.com.vn/du-lich-thanh-pho-da-lat/truong-dai-hoc-da-lat-id-4569) | 1 nguồn, bài không ghi năm |
| Đồ án mở rộng do KTS Ngô Viết Thụ | [blog Trần Công Hòa](http://dalatarchi-tranconghoakts.blogspot.com/2014/10/dalatarchi-vien-ai-hoc-lat.html) | 1 nguồn (blog) |
| Sân khấu ngoài trời | [OSM way/1460217465](https://www.openstreetmap.org/way/1460217465) | chỉ OSM, không có lịch sử |

## Lịch sử (tóm, chi tiết trong `data/chuyen/dai-hoc-da-lat.json`)
- Tên xưa: **Trường Thiếu sinh quân Hỗn hợp Âu – Á (École d'Enfants de Troupe de Dalat)** từ 1939; **Camp Robert** (tên trại lúc Việt Nam tiếp quản, có dấu ?); **Viện Đại học Đà Lạt** 1957–1975.
- **1939** trại lính thành trường thiếu sinh quân (Wikipedia, Thanh Niên, wiki Pháp; EFEO 2025 xác nhận năm). Thập niên 1920 là trại lính — chỉ Thanh Niên.
- **8/8/1957** Nghị định 67/BNV/NA/P5 cho Hội Đại học Đà Lạt (Đỗ Hữu Nghiêm, Wikipedia EN/VI, blog Trần Công Hòa).
- **1958** khai giảng niên khóa 1958–1959 (Tia Sáng, Tuổi Trẻ, Thanh Niên, Đỗ Hữu Nghiêm).
- **8/1958** xổ số đặc biệt và ứng 5 triệu đồng xây trường (1 nguồn: Đỗ Hữu Nghiêm).
- **3/1960** Chính phủ cho Viện chiếm hữu khuôn viên vô hạn định (1 nguồn).
- **1970** thư viện 400 m², 108 chỗ, khoảng 20 ngàn cuốn (1 nguồn: Nguyễn Vĩnh Nguyên).
- **27/10/1976** Quyết định 426 lập Trường Đại học Đà Lạt (SGGP, Báo Lâm Đồng, Wikipedia).
- **1/7/2025** vào phường Lâm Viên - Đà Lạt; **24/10/2026** lễ 50 năm (1 nguồn: Báo Lâm Đồng).
- Chuyện: trại lính thành giảng đường; tháp chuông Năng Tĩnh đổi thánh giá lấy ngôi sao (chi tiết đổi thánh giá chỉ blog hồi ức); tên nhà lấy từ sách Nho, chữ "Thụ nhân" còn trong khẩu hiệu.

## Không đưa vào (nơi khác)
Thung lũng Tình Yêu, Đồi Mộng Mơ, Lycée Yersin, Trường Võ bị Đà Lạt, Trung tâm Nguyên tử (Ngô Viết Thụ) — không phải chuyện của khuôn viên này.

## Chỗ còn nghi
1. **Diện tích**: 38 ha / 38–40 ha / gần 30 ha / 1,7 ha → dùng "khoảng 38 ha".
2. **Năm lập Viện**: nghị định 8/8/1957 nhưng SGGP ghi "thành lập năm 1958"; một nghiên cứu ghi 1959 (Đỗ Hữu Nghiêm nhắc là ý lẻ).
3. **Giá chuyển nhượng khu trại**: Đỗ Hữu Nghiêm (nhà nước nhận 1 đồng rồi bán lại cho Hội giá cao hơn) ≠ Wikipedia (nhượng cho Viện 1 đồng).
4. **Năm xây nguyện đường Năng Tĩnh** chưa rõ; "tháp Sao" là tháp Năng Tĩnh do em nối từ hai nguồn.
5. **Thư viện**: chưa rõ tòa hiện nay (OSM, phía Võ Trường Toản) là tòa thời Viện hay tòa mới.
6. Trang lịch sử chính thức của trường (dlu.edu.vn) lỗi 503, chưa đối chiếu.
7. `data/hien_thi.json` hiện ghi "Trường Đại học Đà Lạt" là một mốc của nơi `thung-lung-tinh-yeu` — nếu thêm nơi này thì nên bỏ mốc đó bên Thung lũng Tình Yêu để một chỗ không thuộc hai nơi.
