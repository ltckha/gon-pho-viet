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
python3 tools/tai_osm.py /tmp/vpd/json/geojson /tmp/osm '68_lam_dong/wards/*_da_lat'   # cả 5 phường Đà Lạt (~210 ô, ~100 MB)
python3 tools/build_streets.py /tmp/osm /tmp/vpd/json/geojson
# 2b. Nước láng giềng (Natural Earth)
curl -sL -o /tmp/c10.json https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-10m.json && python3 tools/build_lang_gieng.py /tmp/c10.json
# 3. Trang phố (đọc kho game, chỉ đọc) — dò vị trí quán trước
python3 tools/vi_tri_quan.py /tmp/osm
python3 tools/build_pho.py /home/user/ltckha/giang-ho-ai   # gắn cả data/chuyen/<slug>.json (chuyện của phố)
# 4. Bản đồ minh hoạ nét Spark (nền trang phố) và lịch trình đi bộ
python3 tools/ve_ban_do_dalat.py /home/user/ltckha/giang-ho-ai
python3 tools/lich_trinh.py /tmp/osm
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
- OSM ở Đà Lạt ghi tiệm thiếu; so tên lỏng ra trùng nhầm ("Café Nga" ≠ "Miến gà Nga"). `vi_tri_quan.py` so tên hai chiều + số, số nhà đúng y tên đường; tên viết khác thì soát tay rồi thêm vào `ALIAS`. Không khớp thì để trống, không đoán.
- Điều khoản Google không cho máy tự lấy dữ liệu Google Maps (kể cả toạ độ) đưa sang bản đồ khác → không chép toạ độ từ Google Maps vào kho.
- Đường dài (Huỳnh Tấn Phát 6 km, quốc lộ) → ghim phố không lấy điểm giữa đường mà lấy điểm đường gần tâm các quán (`build_pho.py`); đường của phố lọc theo khoảng cách 2,2 km (`roadsOf` trong `app.js`) vì OSM có đoạn trùng tên ở xa.
- Khung bản đồ phố không được lớn hơn tấm tranh khu (tranh vùng ven nằm ngang) — kẻo lòi nền trống. Khu trung tâm = phố trong 2,5 km quanh Chợ Đà Lạt; xa hơn mỗi khu một tấm `assets/ban_do_<slug>.webp`.
- So số nhà: điểm OSM đã mang tên một nơi khác trong cùng phố thì không lấy (La Viet Coffee ghi số 198 ≠ Barn House).
- Số phố mỗi phường (`so_pho` trong `phuong.json`) do `build_pho.py` tự đếm, đừng gõ tay.
- Từ 20/9/2026 có 9 thành phố trực thuộc trung ương (thêm Đồng Nai, Quảng Ninh, Bắc Ninh). Game còn ghi 6.

## Anh Kha đã chốt (25/11/2026)
- Trang phố vẽ trên **bản đồ minh hoạ nét Spark, hướng Bắc ở trên, đúng tỉ lệ, có mốc quen** (Chợ, hồ, nhà thờ). Không xoay đường, không sơ đồ trừu tượng — người Đà Lạt nhìn phải nhận ra ngay.
- Đường trên bản đồ không bao giờ cụt giữa khung.
- Tên đường phải chạy uốn theo con đường (textPath, làm mềm Chaikin), đường cong gắt thì bỏ tên; tên không đè nhau, không đè mốc, không đè chấm quán. Không in tên đường cứng vào ảnh nền.
- Làm: lịch trình theo phố, chuyện của phố. Không làm: người dùng xác nhận/đánh giá.
- Nghiên cứu, thêm phố thì cứ làm, không hỏi; chỉ hỏi khi đưa lên mạng/tốn tiền.

## Agent có sẵn (`.claude/agents/`)
- `nghien-cuu-pho` — nghiên cứu một phố mới: phường, đặc trưng, địa điểm tên thật (≥2 nguồn ở 2 trang khác nhau), ra `data/pho/<slug>.json`. Sau đó chạy `python3 tools/vi_tri_quan.py /tmp/osm` rồi `tools/build_pho.py`.
- `kiem-thu-ban-do` — chạy kiểm thử điện thoại, xem ảnh, báo lỗi bằng lời dễ hiểu.
