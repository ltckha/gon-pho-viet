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
- Nhờ Spark (Gemini) vẽ: soạn 1 khối để anh dán theo mẫu của game: "Vẽ tiếp đợt N… nét vẽ y hệt <đợt trước>" · quy cách (cỡ, nền, không chữ) · danh sách đánh số `tên_file: mô tả` · dòng cuối "Lưu lên Google Drive vào Spark/Inbox/Game_ve_thu/dotN_<tên>/, đúng tên file trên (.png)." (Spark tự lưu được; không bắt Spark mở Drive xem mẫu). Số đợt đánh chung với game. **Anh báo "xong N" là tự làm luôn, không hỏi lại**: `python3 -I tools/lay_spark.py N <thư mục tạm>` (thư mục mẹ `Game_ve_thu` đã mở link xem từ 26/11 nên KHÔNG cần gọi công cụ chia sẻ Drive nữa — anh không muốn bấm cho phép mỗi đợt), soát hình, thu nhỏ webp, ghép, kiểm thử, đăng bản xem thử.
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
python3 tools/to_mau.py data/lam-dong/phuong.json        # màu xã/phường (hai nơi sát nhau khác màu) — chạy lại sau build_data
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
- Bản đồ Việt Nam giống màn bản đồ game Gọn Phố (anh Kha chốt): đất xanh phẳng, bờ biển nâu đậm + quầng trắng (lớp `bo-bien`), biển xanh có sóng, biểu tượng mốc tỉnh Spark đợt 36 (`assets/vn/moc_*.webp`, chép từ `public/assets/ui/` của game). Ranh giới vẫn là dữ liệu thật. Không dùng nền cỏ trải (anh đã chê). Mốc hiện theo chỗ đang phóng: gần giữa màn hình hiện trước, tối đa 8 cái (`layoutMoc`, anh Kha nâng từ 5), ưu tiên Lâm Đồng, Hà Nội, rồi thành phố trực thuộc TW; chữ tên tỉnh không đè mốc. Đủ mốc 34 tỉnh: 14 từ game (đợt 36) + 20 Spark đợt 41 (anh Kha đánh số chung với game; khối gốc `docs/spark/dot2_viet_nam.md`) + 5 hình nhỏ `deco_*` (nằm dưới mốc, vướng thì ẩn). Ảnh Spark gốc ở Drive thư mục `dot41_moc_tinh`; công cụ Drive không tắt được chia sẻ link — nếu phải bật thì nhắc anh tự tắt.
- Tầng tỉnh (Lâm Đồng) cùng nét bản đồ Việt Nam: mốc theo toạ độ thật (`mocDiem`: hình, kinh độ, vĩ độ, tên, mã phường, phóng từ, phóng tới). Cả tỉnh chỉ một mốc "Đà Lạt"; phóng ≥2,5 lần hiện Lang Biang, Cầu Đất; ≥7 lần hiện chợ, nhà thờ, ga… Đà Lạt có thêm 13 mốc Spark đợt 44 (Dinh I, III, Trúc Lâm, chùa Ve Chai, Hằng Nga, Domaine de Marie, Hồ Than Thở, làng hoa, Đại học, Lycée Yersin, Datanla, Thung lũng Tình Yêu; hiện từ phóng 4 hoặc 7). Phần còn lại của tỉnh: 12 mốc Spark đợt 42 (Drive `dot42_moc_lam_dong`, toạ độ OpenStreetMap qua Nominatim). Anh Kha để thư mục Drive Spark mở link, không cần tắt.
- Tầng tỉnh tô mỗi xã/phường một màu pastel (trường `mau`, `tools/to_mau.py`), anh Kha chê "cùng một màu xanh đậm nhạt khó nhìn". Đà Lạt nổi bằng viền xanh đậm, không bằng màu.
- **Bản đồ minh hoạ trong trang phố đang TẠM TẮT** (anh Kha 26/11 muốn xem thử không có): công tắc `BAN_DO_PHO = false` trong `app.js`; bật lại là hiện như cũ, code và tranh nền vẫn giữ.
- Hình mốc vẽ trong tranh nền Đà Lạt (chợ, nhà thờ, ga…) giữ cỡ ~80 điểm (~200 m). Từng để 140–160 điểm → hình đè lên chính các đường quanh mốc, anh Kha thấy dốc Nguyễn Chí Thanh "không ăn khớp".
- Dòng thời gian Lịch sử chỉ hiện năm (anh Kha 26/11: "ai thích nhấn vô năm thì coi"), chạm năm mới mở chuyện + nguồn.
- "Mốc lâu đời" trong trang phố dùng hình Spark (`hinhMoc()`/`MOC_HINH` khớp tên → `assets/vn/moc_*.webp`, đợt 46–47; quán lâu đời dùng hình món đợt 45). Thêm mốc mới thì thêm dòng vào `MOC_HINH`.
- Ô "Nay có gì" dùng hình món Spark đợt 45 (`assets/bt/bt_*.webp`, hàm `hinhMon()` khớp từ khoá, cụ thể trước chung sau); chữ chưa có hình thì về biểu tượng cũ (`bieuTuong()`).
- Từ 20/9/2026 có 9 thành phố trực thuộc trung ương (thêm Đồng Nai, Quảng Ninh, Bắc Ninh). Game còn ghi 6.

## Anh Kha đã chốt hướng mới (sau đánh giá khả thi `docs/danh_gia_kha_thi.md`, nhánh `claude/danh-gia-kha-thi`)
- **Bản đồ để hiểu một vùng đất, kết hợp địa lý và lịch sử** — thay cho "bản đồ quán xá". "Phố" = một nơi đáng biết: con đường hoặc điểm tham quan nổi bật.
- Mỗi nơi một trang ngắn 3 phần: **Địa lý** (bản đồ minh hoạ, phường, đường, gần mốc nào, cách Chợ Đà Lạt) · **Lịch sử** (tên xưa, mốc năm, chuyện — có nguồn) · **Nay có gì** (giới thiệu, "Ở đây bán gì" ở mức cả khu, vài mốc lâu đời).
- **Ít chữ, nhiều hình** (anh Kha dặn): lịch sử là dòng thời gian mỗi năm một dòng ngắn, chạm mới mở chi tiết + nguồn; chuyện kể gập lại; địa lý, "nay có gì" là ô biểu tượng (`bieuTuong()` trong `app.js`). Thêm gì mới cũng ưu tiên hình, biểu tượng hơn đoạn văn.
- Không bày từng quán: không số nhà, giờ mở, giá, nhận xét quán (`gonQuan()` trong `app.js` lọc giờ/giá khỏi thẻ mốc). Chỉ giữ vài mốc lâu đời (chùa, chợ, ga, dinh, quán vài chục năm).
- Dữ liệu 220+ nơi đã nghiên cứu giữ nguyên trong kho (`data/pho/*.json`), làm căn cứ và chất liệu cho game.
- **Hai loại nơi** (anh Kha chốt 26/11, sau lỗi Dốc Nguyễn Chí Thanh): `loai: 'duong'` = đúng MỘT con đường (`duong_chinh`), ghim giữa đường, tô sáng đúng đường đó; `loai: 'diem'` = hồ, dinh, ga, nhà thờ, làng, núi, khu — ghim đúng toạ độ `diem` (OSM), không tô đường, ô Địa lý ghi "Đường tới". Không để một đường thuộc hai nơi. Khai trong `data/hien_thi.json`; `ph.duong` gốc giữ cho game, trang dùng `duong_hien`.
- Tên hiện trên bản đồ là tên người ta thật sự gọi (`data/hien_thi.json`: `ten`, `dac_trung`, `ban_gi`, `moc`). **`ten_pho` giữ nguyên** vì dùng chung với game. Thêm nơi mới thì phải thêm dòng vào `hien_thi.json` (build_pho.py dừng nếu thiếu).
- Vùng ven gọi theo cách người Đà Lạt gọi (Ga Trại Mát, Chân núi Lang Biang, Đồi chè Cầu Đất…), trung tâm gọi theo tên đường/khu (Đường Phan Đình Phùng, Khu Hoà Bình, Chợ đêm Đà Lạt…).
- Kế hoạch 5 bước: (1) trang 3 phần ✔ (2) đổi tên ✔ (3) soát nguồn lịch sử ✔ (`docs/research/soat_nguon_lich_su.md`, mốc chỉ dựa blog có dấu ?) (4) thêm điểm tham quan lớn ✔ 26/11: Thác Datanla, Thác Prenn – đèo Prenn, Đường hầm đất sét (32 nơi; tranh + mốc Spark đợt 48 đã ghép) (5) © OpenStreetMap ✔, câu Google Maps ✔, ảnh: trang đầu ~635 KB, tranh bản đồ 1–3 MB chỉ tải khi bật `BAN_DO_PHO`.
- **Lịch sử chỉ của CHÍNH nơi đó** (anh Kha 26/11: "ko để lấy tên đường đổi tên của nơi này đưa qua nơi kia"): tên xưa, mốc năm, chuyện kể đều phải nói về đúng con đường/điểm của trang. Chuyện của đường bên cạnh, khu bên cạnh (vd. chợ, Khu Hoà Bình trên trang Tăng Bạt Hổ; đường Darles trên trang Dinh III; Maréchal Foch trên trang Trần Phú) thì không hiện — để ở `moc_khong_hien`, `chuyen_khong_hien`, `ten_khac_khong_hien`. Năm đổi tên sau giải phóng là 1976 (Niên biểu Đà Lạt), không ghi 1975.
- "Tên xưa" (soát 26/11, `docs/research/soat_nguon_lich_su.md`) chạm tên mới hiện năm + nguồn, tên nghi có dấu ? (`chua_chac`); chỉ hiện tên thật sự xưa của CHÍNH nơi đó; tên chép nhầm, tên du khách gọi, tên của đường khác để ở `ten_khac_khong_hien` trong `data/chuyen/<slug>.json`.

## Anh Kha đã chốt trước đó (25/11/2026)
- Trang phố vẽ trên **bản đồ minh hoạ nét Spark, hướng Bắc ở trên, đúng tỉ lệ, có mốc quen** (Chợ, hồ, nhà thờ). Không xoay đường, không sơ đồ trừu tượng — người Đà Lạt nhìn phải nhận ra ngay.
- Đường trên bản đồ không bao giờ cụt giữa khung.
- Tên đường phải chạy uốn theo con đường (textPath, làm mềm Chaikin), đường cong gắt thì bỏ tên; tên không đè nhau, không đè mốc, không đè chấm quán. Không in tên đường cứng vào ảnh nền.
- Làm: lịch trình theo phố, chuyện của phố. Không làm: người dùng xác nhận/đánh giá, đi kiểm từng quán.
- Nghiên cứu, thêm phố thì cứ làm, không hỏi; chỉ hỏi khi đưa lên mạng/tốn tiền.

## Agent có sẵn (`.claude/agents/`)
- `nghien-cuu-pho` — nghiên cứu một phố mới: phường, đặc trưng, địa điểm tên thật (≥2 nguồn ở 2 trang khác nhau), ra `data/pho/<slug>.json`. Sau đó chạy `python3 tools/vi_tri_quan.py /tmp/osm` rồi `tools/build_pho.py`.
- `kiem-thu-ban-do` — chạy kiểm thử điện thoại, xem ảnh, báo lỗi bằng lời dễ hiểu.
