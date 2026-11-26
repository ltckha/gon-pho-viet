# Viện Pasteur Đà Lạt (nay Công ty Vắc xin Pasteur Đà Lạt – DAVAC) — 26/11/2026

Kết quả: `data/pho/vien-pasteur.json`, chuyện: `data/chuyen/vien-pasteur.json`. Loại nơi: **điểm** (`diem`). Theo hướng mới: địa lý và lịch sử là chính, không bày quán.
**3 mốc đạt ≥ 2 nguồn ở 2 trang khác nhau** (1 mốc tin cậy trung bình), 3 mục cần kiểm thêm. Lịch sử chỉ của chính viện; không dùng chuyện Biệt thự Hằng Nga, Couvent des Oiseaux, đường Pasteur, Lycée Yersin.

Cách làm: tải OSM quanh viện (`api.openstreetmap.org/api/0.6/map`, bbox 108.4245,11.9315,108.4300,11.9355), hỏi Nominatim (User-Agent "gon-pho-viet-map/1.0", cách nhau ≥ 1,2 giây), đọc trang lịch sử của DAVAC, báo 1936–1952 chép trên entreprises-coloniales.fr, triển lãm Đà Lạt của EFEO (PDF phần 2, 3), Thanh Niên, Báo Lâm Đồng, Báo Pháp luật, Wikipedia (Việt, Anh), hai bài khoa học về nấm P. marneffei. Không dùng Google Maps. Trang Địa chí Đà Lạt trên lamdong.gov.vn lỗi 503, bản lưu web.archive.org không tải được qua proxy → chỉ dùng Địa chí qua chú thích của Wikipedia tiếng Việt.

## Tên đường — tự kiểm
Địa chỉ chính thức: **18 Lê Hồng Phong** (DAVAC, trungtamthuoc, Wikipedia tiếng Việt). Thanh Niên 2024 ghi "18 đường Pasteur". Khối nhà OSM way/1305208733 nằm giữa hai đường: cách "Pasteur" khoảng 44 m, "Lê Hồng Phong" khoảng 60 m (đo với `duong.json`). Cả hai tên có trong `duong.json` đúng chữ: "Lê Hồng Phong", "Pasteur". Đường gần khác: Nguyễn Viết Xuân, Ngô Thì Sỹ (khoảng 57 m), Triệu Việt Vương (khoảng 60 m).

## Phường

| Nơi | Phường cũ | Phường mới | Độ chắc | Nguồn |
|---|---|---|---|---|
| Lê Hồng Phong (viện số 18) | P4 | **Xuân Hương - Đà Lạt** | chắc | [thuviennhadat le-hong-phong-phuong-4](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/le-hong-phong-phuong-4) |
| Pasteur | P4 | Xuân Hương - Đà Lạt | chắc | [thuviennhadat pasteur-phuong-4](https://thuviennhadat.vn/bang-gia-dat/lam-dong/thanh-pho-da-lat/pasteur-phuong-4) |
| Công ty Vắc xin Pasteur Đà Lạt | P4 | Xuân Hương - Đà Lạt | chắc | [DAVAC Liên hệ](https://www.davac.com.vn/lien-he/) (ghi cả địa chỉ cũ "Phường 4" và mới "Phường Xuân Hương - Đà Lạt") |

NQ 1671 mục 99: Phường 1, 2, 3, 4, 10 → Xuân Hương - Đà Lạt. Điểm OSM nằm trong ranh Xuân Hương của `phuong.json`; Nominatim cũng ghi "Phường Xuân Hương - Đà Lạt".
Khoảng cách chim bay (theo OSM): Chợ Đà Lạt khoảng 1,6 km; Dinh III khoảng 450 m; nhà thờ Thánh Tâm khoảng 580 m.

## Câu giới thiệu
"Viện Pasteur Đà Lạt: viện Pasteur cuối cùng ở Đông Dương, mở năm 1936 theo đề xuất của bác sĩ Yersin để làm vắc xin nơi trời mát; toà nhà chính hai tầng có chân dung Louis Pasteur đắp nổi trên mặt tiền, nay là Công ty Vắc xin Pasteur Đà Lạt (DAVAC), làm vắc xin thương hàn."
- "cuối cùng ở Đông Dương": [Wikipedia VI](https://vi.wikipedia.org/wiki/C%C3%B4ng_ty_V%E1%BA%AFc_xin_Pasteur_%C4%90%C3%A0_L%E1%BA%A1t) (Địa chí Đà Lạt tr. 318), [DAVAC](https://www.davac.com.vn/gioi-thieu/lich-su-hinh-thanh/), [Thanh Niên 15/09/2024](https://thanhnien.vn/noi-tung-la-co-so-san-xuat-vac-xin-lon-nhat-dong-duong-185240914202442191.htm).
- "mở năm 1936": [báo 1936 qua entreprises-coloniales](https://www.entreprises-coloniales.fr/inde-indochine/Institut_Pasteur_Dalat.pdf) (mở cửa 1/1/1936), Wikipedia VI, [Báo Lâm Đồng 16/02/2021](https://baolamdong.vn/vac-xin-tu-da-lat-289397.html), [EFEO phần 2](https://www.efeo.fr/exposition-virtuelle/da-lat/Expo_Dalat_Partie2.pdf) (khánh thành 8/1936).
- "đề xuất của Yersin": Báo Lâm Đồng 2021, Wikipedia VI, Thanh Niên 2024.
- "trời mát": báo 1936 (chuyển phòng vắc xin lên vì khí hậu), [Báo Lâm Đồng 10/07/2014](https://baolamdong.vn/da-lat-nam-1937-tiep-theo-va-het-283844.html), Thanh Niên 2024.
- "hai tầng, chân dung Pasteur": Wikipedia VI, DAVAC, Thanh Niên 2024.
- "vắc xin thương hàn": Báo Lâm Đồng 2021 (sản phẩm chính, doanh nghiệp duy nhất ở Việt Nam làm), DAVAC.

## Danh sách chính (≥ 2 nguồn)

| # | Tên | Loại | Đường OSM | Nguồn | Tin cậy | Vị trí OSM |
|---|---|---|---|---|---|---|
| 1 | Toà nhà chính Viện Pasteur Đà Lạt | công trình thời Pháp, trụ sở viện | Lê Hồng Phong · 18 | [DAVAC](https://www.davac.com.vn/gioi-thieu/lich-su-hinh-thanh/) · [Wikipedia VI](https://vi.wikipedia.org/wiki/C%C3%B4ng_ty_V%E1%BA%AFc_xin_Pasteur_%C4%90%C3%A0_L%E1%BA%A1t) · [Thanh Niên 2024](https://thanhnien.vn/noi-tung-la-co-so-san-xuat-vac-xin-lon-nhat-dong-duong-185240914202442191.htm) · [entreprises-coloniales](https://www.entreprises-coloniales.fr/inde-indochine/Institut_Pasteur_Dalat.pdf) · [Wikipedia EN](https://en.wikipedia.org/wiki/Institut_Pasteur_de_Dalat) · [EFEO phần 3](https://www.efeo.fr/exposition-virtuelle/da-lat/Expo_Dalat_Partie3.pdf) · [OSM](https://www.openstreetmap.org/way/1305208733) | cao | way/1305208733 (108.4272447, 11.9333644) |
| 2 | Chân dung Louis Pasteur đắp nổi trên mặt tiền | phù điêu | Lê Hồng Phong · 18 | [Wikipedia VI](https://vi.wikipedia.org/wiki/C%C3%B4ng_ty_V%E1%BA%AFc_xin_Pasteur_%C4%90%C3%A0_L%E1%BA%A1t) · [DAVAC](https://www.davac.com.vn/gioi-thieu/lich-su-hinh-thanh/) · [Thanh Niên 2024](https://thanhnien.vn/noi-tung-la-co-so-san-xuat-vac-xin-lon-nhat-dong-duong-185240914202442191.htm) | cao | (trên toà nhà 1) |
| 3 | Các biệt thự của bác sĩ quanh viện | nhà ở thời Pháp | Lê Hồng Phong | [Wikipedia VI](https://vi.wikipedia.org/wiki/C%C3%B4ng_ty_V%E1%BA%AFc_xin_Pasteur_%C4%90%C3%A0_L%E1%BA%A1t) (Nguyễn Tri Diện 2000 tr. 223) · [DAVAC](https://www.davac.com.vn/gioi-thieu/lich-su-hinh-thanh/) | trung bình (câu chữ giống nhau, có thể cùng gốc; không chỉ rõ căn nào) | không |

Ghi chú: đoạn tả kiến trúc của DAVAC gần như chép từ cùng gốc với Wikipedia VI (Địa chí Đà Lạt 2008 tr. 319); Thanh Niên 2024 (Lam Yên) là nguồn độc lập, thêm ý ảnh hưởng Bauhaus và Art Deco. Kiến trúc sư Paul Veysseyre và một đồng nghiệp người Việt: entreprises-coloniales (chú thích ảnh), Wikipedia EN.

## Cần kiểm thêm

| Tên | Nguồn có | Vì sao |
|---|---|---|
| Tượng / bia Yersin trong khuôn viên | — | đã tìm, không nguồn nào nói có → không đưa vào |
| Nhà máy vắc xin xây 2004 (hơn 5 triệu USD, 6 triệu liều/năm) | [Wikipedia VI](https://vi.wikipedia.org/wiki/C%C3%B4ng_ty_V%E1%BA%AFc_xin_Pasteur_%C4%90%C3%A0_L%E1%BA%A1t) · [Báo Pháp luật 2011](https://baophapluat.vn/cong-ty-vac-xin-pasteur-da-lat-chon-huong-di-dung-dan-den-thanh-cong-post142494.html) | không biết là toà nào → để thành mốc năm 2004 |
| Khu trồng canh ki na ở xã Xuân Thọ cũ | Wikipedia VI · DAVAC | ngoài khu viện, chưa rõ năm và vị trí |

## Lịch sử (tóm, chi tiết trong `data/chuyen/vien-pasteur.json`)
- Tên xưa: **Institut Pasteur de Dalat** (1936–1975); **Viện Pasteur Việt Nam – Chi nhánh Đà Lạt** (dòng chữ mặt tiền; DAVAC: từ thoả ước 25/11/1958 — năm chưa chắc); **Phân viện Vắc xin Đà Lạt** (1982–2007).
- **11/1931** hiệp định xây viện Pasquier – Bablet (chỉ DAVAC); **2/1/1935** nghị định cấp hai lô đất (chỉ EFEO).
- **1932–1935** xây viện (nguồn lệch: 1932 – 6/1935 hay 1933–1934 + trang bị 1935).
- **1/1/1936** mở cửa theo đề xuất của Yersin, giám đốc đầu tiên Louis Souchard; EFEO ghi khánh thành 8/1936.
- **1936** năm đầu làm 3.018.060 liều, 2.446.170 là vắc xin tả (báo cáo 1937; Wikipedia EN; Thanh Niên ghi "1937 – 3 triệu liều").
- **1946** viện bị đập phá (chỉ DAVAC); **1963** dây chuyền thứ hai (chỉ DAVAC).
- **1955–1956** phân lập nấm Penicillium marneffei ở viện ([Clin Microbiol Rev 2006](https://pmc.ncbi.nlm.nih.gov/articles/PMC1360277): 1956; [CDC EID 2021](https://wwwnc.cdc.gov/eid/article/27/9/21-0318_article): 1955).
- **1975** tiếp quản; **1982** Phân viện Vắc xin Đà Lạt; **1995–1996** nhận chuyển giao vắc xin thương hàn từ Mỹ; **2004** nhà máy mới; **12/2007** Công ty Vắc xin Pasteur Đà Lạt; **30/6/2010** Công ty TNHH MTV (DAVAC); **1/7/2025** phường Xuân Hương - Đà Lạt.
- Chuyện: "Vắc xin cần trời mát", "Chân dung Pasteur trên mặt tiền", "Một loài nấm mang tên Đà Lạt".

## Chỗ còn nghi
1. **Năm xây**: 1932 – 6/1935 (DAVAC, Wikipedia VI) / 1933–1934 (báo 1936).
2. **Ngày mở**: 1/1/1936 (báo 1936, Địa chí) / khánh thành 8/1936 (EFEO).
3. **Người đứng đầu**: Souchard (báo 1936, DAVAC) / Yersin (Wikipedia EN) → ghi "theo đề xuất của Yersin".
4. **Địa chỉ**: 18 Lê Hồng Phong / 18 Pasteur (Thanh Niên).
5. **Năm thành công ty**: 12/2007 (DAVAC, Báo Pháp luật) / 2008 (Wikipedia VI); năm tiếp quản 1975 (Wikipedia EN) / 1978 (trungtamthuoc).
6. **Năm chuyển giao vắc xin thương hàn**: 1995 (Báo Lâm Đồng) / 1996 (DAVAC).
7. Không thấy nguồn nói viện mở cửa tham quan; đây là nơi sản xuất đang chạy.
