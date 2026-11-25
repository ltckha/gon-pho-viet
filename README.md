# Gọn Phố Việt

Bản đồ phố Việt Nam: ghi đúng tên đường thật, chia theo địa giới mới từ 1/7/2025.
Đi từ ngoài vào trong: Việt Nam → 34 tỉnh/thành → phường/xã → đường → phố & địa điểm.

## Đang có
- Chặng 1: bản đồ Việt Nam 34 tỉnh/thành, có Hoàng Sa và Trường Sa. Bấm tỉnh ra thẻ thông tin (gộp từ tỉnh nào, diện tích, số xã/phường).
- Chặng 2: bản đồ 124 xã/phường/đặc khu của Lâm Đồng (`#lam-dong`), mỗi nơi ghi gộp từ xã/phường cũ nào theo NQ 1671.
- Chặng 3: đường thật phường Xuân Hương và Cam Ly (`#da-lat`), tên đường chạy dọc đường, hồ, mốc, ghim 6 phố.
- Chặng 4: trang phố (bấm ghim hoặc mở `#pho-hoang-dieu`…): tranh đầu phố, giới thiệu, nơi tiêu biểu có ≥2 nguồn, tô sáng đường của phố.

## Cấu trúc
- `index.html`, `style.css`, `app.js` — trang web tĩnh, không cần cài gì, không dùng thư viện ngoài.
- `data/viet-nam.json` — tầng Việt Nam (tạo bằng `tools/build_data.py`).
- `docs/research/` — nghiên cứu, nguồn, biên bản đối chiếu.

## Chạy thử trên máy
```
python3 -m http.server 8000
```
rồi mở http://localhost:8000

## Nguồn
- Ranh giới: vietnamese-provinces-database (MIT), dựng từ sapnhap.bando.com.vn.
- Địa giới: NQ 202/2025/QH15, NQ 1671/NQ-UBTVQH15.
- Đường phố (chặng 3): © OpenStreetMap contributors.
