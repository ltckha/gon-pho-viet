# Gọn Phố Việt — sổ tay cho Claude

Bản đồ phố Việt Nam cho điện thoại: tên đường thật (OpenStreetMap), địa giới mới từ 1/7/2025.
Tầng: Việt Nam (34 tỉnh/thành) → tỉnh (xã/phường) → đường → phố & địa điểm. Bắt đầu: Lâm Đồng · Đà Lạt.
Người dùng: anh Kha. Lộ trình (Artifact): https://claude.ai/artifact/U8sJFA1rYdmCCQpPcmsoKG · Bản xem thử: https://claude.ai/artifact/DiBZWq5m3XeaE3E5HWk6MH

## Luật làm việc với anh Kha
- Xưng em, gọi anh. Tiếng Việt thường ngày, không thuật ngữ (cần thì giải thích 1 câu). Anh đọc trên điện thoại: kết luận trước, chi tiết sau, việc anh cần làm để cuối tin (bấm đâu, mất bao lâu).
- Việc mới, tốn tiền, tải phần mềm, đụng hệ thống đang chạy, đưa lên mạng: soạn kế hoạch ngắn rồi **chờ anh nói "làm"**. Nghiên cứu thì cứ làm.
- Số liệu phải thật, có nguồn; không biết thì nói không biết.
- Tự kiểm trước khi báo xong (`tools/kiem_thu.js`), báo đúng sự thật kể cả khi sai.
- Không đưa khoá, mật khẩu, token vào kho. Đưa lên mạng: Cloudflare Pages, tài khoản "Gọn" (anh tự đăng nhập).
- Nhờ Spark (Gemini) vẽ: soạn 1 khối để anh dán, mở đầu "nét vẽ y hệt đợt trước"; không bắt Spark mở Drive.
- Kho game `ltckha/giang-ho-ai` chỉ đọc, không sửa. Thấy game ghi sai thì báo anh để phiên game sửa.
- Tên brand viết đầy đủ. Không dùng chữ "ASMR".

## Cấu trúc
- `index.html`, `style.css`, `app.js` — trang tĩnh, không thư viện ngoài. Mỗi tầng khai báo trong `LAYERS` của `app.js`; địa chỉ `#lam-dong`, `#da-lat` để nút quay lại điện thoại dùng được.
- `data/viet-nam.json` · `data/lam-dong/phuong.json` · `data/lam-dong/nq1671.json` · `data/lam-dong/da-lat/duong.json` · `data/lam-dong/da-lat/pho.json` (trang phố, `#pho-hoang-dieu`…)
- `assets/dau_pho/*.webp` — tranh đầu phố (Spark, của anh Kha), chép từ kho game.
- `tools/` — dựng dữ liệu, tải OSM, kiểm thử, gom bản xem thử. `docs/research/` — nghiên cứu, biên bản đối chiếu.

## Dựng lại dữ liệu
```
# 1. Ranh giới (MIT, dựng từ sapnhap.bando.com.vn) — ~4 GB, clone nông
GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 https://github.com/ThangLeQuoc/vietnamese-provinces-database /tmp/vpd
python3 tools/build_data.py /tmp/vpd/json/geojson          # viet-nam.json + lam-dong/phuong.json
# 2. Đường thật (OSM) cho phường cần vẽ
python3 tools/tai_osm.py /tmp/vpd/json/geojson /tmp/osm '68_lam_dong/wards/*_xuan_huong_da_lat' '68_lam_dong/wards/*_cam_ly_da_lat'
python3 tools/build_streets.py /tmp/osm /tmp/vpd/json/geojson
# 3. Trang phố (đọc kho game, chỉ đọc)
python3 tools/build_pho.py /home/user/ltckha/giang-ho-ai
```
`build_data.py` dừng báo lỗi nếu tên xã/phường không khớp văn bản NQ — đừng tắt kiểm tra đó, sửa đúng gốc.

## Mỗi lần làm xong một phần
1. `python3 -m http.server 8765 &` rồi `node tools/kiem_thu.js <thư mục ảnh>` — phải ra "Ổn". Xem ảnh chụp.
2. `python3 tools/xem_thu.py <thư mục>` rồi đăng lại Artifact bản xem thử (cùng file → cùng link).
3. Commit, push. Cập nhật trang lộ trình (chặng xong → "Xong", chặng kế → nổi).
4. Báo anh: kết luận, anh thấy gì, việc anh cần làm.

## Bẫy đã gặp
- Overpass (overpass-api.de, private.coffee, mail.ru) hay 504 qua proxy → dùng `api.openstreetmap.org/api/0.6/map` theo ô (`tools/tai_osm.py`).
- Trang web đứng riêng không có sẵn `[hidden]{display:none}` → thẻ đóng vẫn che bản đồ. Đã thêm vào `style.css`, đừng xoá.
- Toạ độ tầng đường cần 4 số lẻ (`prec: 4`), 1 số lẻ thì đường lệch cả trăm mét.
- Tên đường: OSM chia đường thành nhiều đoạn ngắn → nối đoạn cùng tên (`ten_duong`) để đặt chữ; chữ chỉ hiện khi đủ chỗ và không đè (hàm `layout()`).
- **Tên quán trong nghiên cứu của game là tên đặt lại** (game không dùng tên quán thật). Không đưa các tên đó lên bản đồ như tên thật; `build_pho.py` chỉ lấy loại quán, đặc trưng, nguồn.
- OSM ở Đà Lạt ghi tiệm rất thiếu; dò tên quán trong OSM ra toàn trùng nhầm — đừng dùng làm vị trí quán.
- Từ 20/9/2026 có 9 thành phố trực thuộc trung ương (thêm Đồng Nai, Quảng Ninh, Bắc Ninh). Game còn ghi 6.

## Agent có sẵn (`.claude/agents/`)
- `nghien-cuu-pho` — nghiên cứu một phố mới: phường, đặc trưng, địa điểm (≥2 nguồn), ra file JSON đúng mẫu.
- `kiem-thu-ban-do` — chạy kiểm thử điện thoại, xem ảnh, báo lỗi bằng lời dễ hiểu.
