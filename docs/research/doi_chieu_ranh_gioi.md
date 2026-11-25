# Chặng 0: đối chiếu dữ liệu ranh giới (25/11/2026)

## Chọn bộ nào
**Dùng: vietnamese-provinces-database v5.2.0** (ThangLeQuoc, giấy phép MIT)
- https://github.com/ThangLeQuoc/vietnamese-provinces-database
- Ranh giới dựng từ "Bản đồ tra cứu các đơn vị hành chính Việt Nam" https://sapnhap.bando.com.vn của NXB Tài nguyên, Môi trường và Bản đồ Việt Nam (Bộ Nông nghiệp và Môi trường).
- Cập nhật tới văn bản 388/NQ-UBTVQH16, xuất dữ liệu ngày 20/9/2026.

**Không dùng: Free-GIS-Data** (nguyenduy1133) — chỉ có ranh giới cấp tỉnh, không có ranh giới phường/xã (chỉ có điểm trụ sở), và README ghi dựng theo "kế hoạch" sắp xếp.

## Kết quả đối chiếu
| Kiểm | Kết quả | Văn bản đối chiếu |
|---|---|---|
| Số tỉnh/thành | 34 ✔ | NQ 202/2025/QH15, Điều 1 khoản 24 |
| Tổng xã/phường/đặc khu | 3.321 ✔ | con số 3.321 cũng ghi ở Free-GIS-Data; chưa có văn bản gốc trong tay |
| Lâm Đồng | 124 đơn vị = 103 xã + 20 phường + 1 đặc khu ✔ | NQ 1671/NQ-UBTVQH15 (theo thuvienphapluat.vn / thuviennhadat.vn) |
| Lâm Đồng diện tích | 24.233,07 km² ✔ trùng | NQ 202, khoản 14 |
| 5 phường Đà Lạt | Xuân Hương, Cam Ly, Lâm Viên, Xuân Trường, Lang Biang — đủ ✔ | NQ 1671 |
| Hoàng Sa | có, là đặc khu thuộc Đà Nẵng ✔ | |
| Trường Sa | có, là đặc khu thuộc Khánh Hoà ✔ | |

## Điều mới phát hiện: nay có 9 thành phố trực thuộc trung ương
Bộ dữ liệu ghi Quảng Ninh, Bắc Ninh, Đồng Nai là "Thành phố". Kiểm lại thì đúng:
- Đồng Nai: hiệu lực 30/4/2026 — https://baochinhphu.vn/quoc-hoi-thong-qua-nghi-quyet-thanh-lap-thanh-pho-dong-nai-truc-thuoc-trung-uong-hieu-luc-tu-30-4-2026-102260424101215806.htm
- Quảng Ninh: hiệu lực 1/9/2026; Bắc Ninh: hiệu lực 20/9/2026 — https://thanhnien.vn/viet-nam-co-9-thanh-pho-truc-thuoc-trung-uong-185260824143128386.htm · https://thethaovanhoa.vn/9-thanh-pho-truc-thuoc-trung-uong-20260920071143767.htm

→ Game Gọn Phố (`src/core/cities.ts`) đang ghi 6 thành phố, cần báo phiên game sửa. Kho này không sửa kho game.

## Tỉnh cũ gộp vào
Lấy từ bản tiếng Anh của NQ 202/2025/QH15 trên LuatVietnam: https://static3.luatvietnam.vn/uploaded/vietlawfile/2025/6/202_2025_qh15_130625135937.pdf — chép vào `tools/build_data.py` (biến `TINH_CU`).
