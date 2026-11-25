# Đánh giá khả thi Gọn Phố Việt (25/11/2026)

Người viết: một phiên Claude độc lập, không tham gia xây dự án. Em đọc kho ở nhánh `claude/nghien-cuu-phuong` (commit `daa9463`), đọc trang lộ trình, chạy thử trang trên khung điện thoại và đo dung lượng. Em không sửa code, không sửa dữ liệu.

## Kết luận

**Nên tiếp tục, nhưng thu hẹp: chỉ làm Đà Lạt cho thật chắc, tạm dừng ý "34 tỉnh".**

- Phần đã làm chạy được thật: kiểm thử ra "Ổn", đi đủ 4 tầng từ Việt Nam tới trang phố.
- Điểm mạnh thật sự là **chuyện của phố, cách gom quán theo phố và địa giới mới**. Google Maps không có ba thứ này.
- Điểm yếu lớn nhất: **chưa có quán nào được người thật đi kiểm**. Toàn bộ 220 nơi lấy từ bài viết trên mạng, một nửa chưa có vị trí trên bản đồ.
- Tiền trực tiếp: em không thấy đường nào thực tế trong ngắn hạn. Lợi ích có thật là gián tiếp (dữ liệu cho game, nội dung làm video, ghim tiệm của anh).
- Lợi thế duy nhất không ai chép được là **anh sống ở Đà Lạt**. Sang tỉnh khác lợi thế này mất, chất lượng sẽ tụt xuống ngang các trang gom bài.

## Em đã kiểm gì

| Việc | Kết quả |
|---|---|
| Chạy `tools/kiem_thu.js` | "Ổn: 34 tỉnh, 124 xã/phường, 24 ghim, 11 tên đường, trang phố 11 nơi" |
| Xem ảnh chụp 11 màn hình | Bản đồ Việt Nam, Lâm Đồng, Đà Lạt, trang phố đều hiện đúng, chữ không đè nhau |
| Đếm dữ liệu `data/lam-dong/da-lat/pho.json` | 24 phố, 220 nơi, 110 nơi có vị trí |
| Đo dung lượng tải (trình duyệt giả iPhone 13) | xem mục 5 |
| Lịch sử kho | cả 48 lần lưu đều trong ngày 25/11/2026 |

Em **không** kiểm được: kho game `ltckha/giang-ho-ai` (máy này không có), tốc độ trên điện thoại thật, kho này đang công khai hay riêng tư.

## 1. Giá trị cho người dùng

**Khác các nơi khác ở đâu**

| | Gọn Phố Việt | Google Maps / Apple Maps | Foody | Blog du lịch |
|---|---|---|---|---|
| Chỉ đường, giờ mở, ảnh, đánh giá | không có | có, rất mạnh | có một phần | không |
| Gom quán theo từng con phố, có câu giới thiệu | **có** | không | không | có, rải rác |
| Chuyện của phố (tên xưa, mốc năm, có nguồn) | **có** | không | không | hiếm |
| Phường mới sau 1/7/2025, gộp từ phường cũ nào | **có** | em chưa kiểm họ cập nhật tới đâu | em chưa kiểm | hầu hết còn ghi phường cũ |
| Lịch đi bộ 1 ngày theo phố | có (mới 1 lịch) | không | không | có |
| Số quán | 220 nơi | gần như đủ | nhiều | ít |

**Ai sẽ dùng**

- Khách sắp đi Đà Lạt muốn biết "phố nào ăn gì, đi bộ được không". Đây là nhóm hợp nhất. Lâm Đồng đón gần 12 triệu lượt khách trong 6 tháng đầu 2026 (theo báo [Nhân Dân](https://nhandan.vn/tao-dong-luc-tang-truong-kinh-te-tu-du-lich-post976100.html)). Con số riêng Đà Lạt em không tìm được.
- Người cần tra phường mới của một con đường (giấy tờ, giao hàng). Nhu cầu có thật nhưng dùng một lần rồi thôi.
- Người chơi game Gọn Phố muốn xem phố thật.

**Nói thẳng**

- Người ta sẽ không bỏ Google Maps để dùng trang này. Trang này là thứ đọc **trước khi đi**, còn lúc đi vẫn mở Google Maps. Hiện trang chưa có nút "mở chỉ đường", nên người đọc xong phải tự gõ lại tên quán.
- Tên phố như "Phố Dân Sinh", "Phố Kem Bơ", "Phố Di Sản" là tên game đặt, người Đà Lạt không gọi vậy. Trên một bản đồ nói là "tên thật" thì dễ gây hiểu lầm. Bản vùng ven đã sửa theo cách dân gọi (Ga Trại Mát, Chân núi Lang Biang), phần trung tâm chưa.
- Chưa có ai ngoài anh dùng thử. Mọi nhận định về "người dùng thích" đều là đoán.

## 2. Pháp lý và dữ liệu

| Hạng mục | Tình trạng | Việc cần làm trước khi đưa lên mạng |
|---|---|---|
| Đường, hồ từ OpenStreetMap | Dùng được, kể cả kiếm tiền ([hỏi đáp giấy phép](https://osmfoundation.org/wiki/Licence/Licence_and_Legal_FAQ)) | Dòng ghi công đang nằm sau nút "Nguồn dữ liệu". Hướng dẫn của OpenStreetMap yêu cầu ghi công hiện ở góc bản đồ, được phép tự thu lại sau 5 giây hoặc khi người dùng chạm ([hướng dẫn ghi công](https://osmfoundation.org/wiki/Licence/Attribution_Guidelines)). Cần thêm dòng "© OpenStreetMap" hiện sẵn, cả trên bản đồ minh hoạ nét Spark vì nó vẽ từ đường OpenStreetMap. |
| Vị trí quán lấy từ OpenStreetMap | 97 nơi lấy thẳng, 13 nơi ước theo số nhà | Giấy phép yêu cầu: phần dữ liệu lấy và sửa từ OpenStreetMap phải chia sẻ lại cùng giấy phép nếu có người hỏi. Phần anh tự nghiên cứu (giới thiệu, chuyện phố) là của anh. Nên tách rõ hai phần trong file. Đây là cách em hiểu, không phải tư vấn luật. |
| Ranh giới tỉnh, phường | Bộ vietnamese-provinces-database, giấy phép MIT, đã đối chiếu số lượng với Nghị quyết 202 và 1671 | Ranh giới do cá nhân dựng lại từ trang tra cứu của nhà xuất bản bản đồ, không phải bản chính thức. Nên ghi rõ "ranh giới tham khảo". |
| Hoàng Sa, Trường Sa | Có đủ, em đã xem ảnh chụp | Em không rành quy định về đưa bản đồ Việt Nam lên mạng (có cần giấy phép xuất bản hay không). Việc này nên hỏi người rành luật trước khi quảng bá rộng. |
| Tên quán thật | Ghi tên, địa chỉ, loại quán là thông tin công khai | Có câu nhận xét dễ gây chuyện, ví dụ "có quán khác mạo danh tên" (Phố Lẩu Bò). Nên bỏ các câu chê hoặc so sánh quán. Quán đã đóng mà vẫn ghi mở cũng làm mất uy tín. |
| Lời mô tả quán | Viết lại từ bài báo, blog | Viết lại ý thì ổn. Em không soát từng câu xem có chép nguyên văn không. |
| Tranh Spark | Anh tự tạo bằng Gemini | Em chưa đọc điều khoản Gemini về dùng hình cho việc kinh doanh. Tranh máy vẽ thường khó giữ bản quyền, tức người khác chép cũng khó kiện. Rủi ro thấp. |
| Google Maps | Điều khoản cấm tải hàng loạt và cấm dùng Google Maps để làm dày một bộ dữ liệu bản đồ khác ([điều khoản, mục 2](https://www.google.com/help/terms_maps/)) | Sổ tay đã cấm chép toạ độ, và em tìm trong `data/`, `docs/` không thấy link Google Maps nào. Nhưng file hướng dẫn agent `nghien-cuu-pho` vẫn liệt kê "Google Maps" là một loại nguồn, trái với sổ tay. Nên sửa câu đó. Đặt link "mở trong Google Maps" theo tên quán thì được. |

## 3. Chi phí và công duy trì

**Tiền máy chủ:** gần như không. Cloudflare Pages gói miễn phí không tính băng thông, cho 500 lần cập nhật mỗi tháng, tối đa 20.000 file, mỗi file dưới 25 MB ([giới hạn của Cloudflare](https://developers.cloudflare.com/pages/platform/limits)). Kho hiện có khoảng 12 MB.

**Tiền Claude:** em không biết anh đang trả gói nào nên không ghi số.

**Công giữ dữ liệu đúng: đây là chỗ khó nhất.**

- Dựng nhanh: 24 phố và 220 nơi làm trong một ngày. Dựng không phải là vấn đề.
- Giữ đúng mới là vấn đề. Số liệu trong kho:
  - 0 nơi được đi kiểm tận nơi (các biên bản nghiên cứu ghi "chưa đi thực tế").
  - 110 trên 220 nơi chưa có vị trí.
  - 186 nơi nằm trong mục "cần kiểm thêm" vì mới có 1 nguồn.
  - 7 nơi phát hiện đã đóng ngay trong lúc nghiên cứu.
  - Chỉ 6 trên 24 phố có tranh đầu phố.
- Nguồn chủ yếu là trang gom bài: mia.vn (131 lần dẫn), vinwonders.com (97), foody.vn (81), toplist.vn (46). Báo chính thống ít hơn nhiều (Báo Lâm Đồng 17, VnExpress 10, Tuổi Trẻ 12). Các trang gom bài hay chép lẫn nhau, nên "2 nguồn" chưa chắc là 2 lần kiểm độc lập. Có chỗ số nhà của cùng một quán lệch nhau giữa 3 nguồn.
- "Còn mở hay không" đang đoán theo ngày đăng bài. Máy không tự biết quán đóng. Em không có số liệu về tỉ lệ quán Đà Lạt đóng mỗi năm.

**Một mình anh cộng Claude có giữ nổi không?**

- Vài chục phố ở Đà Lạt: **được**, nếu anh nhận phần mà máy không làm được là đi ngang nhìn tận mắt. Mỗi phố anh xác nhận một lần, ghi ngày kiểm, mỗi năm soát lại.
- Cả 34 tỉnh ở mức chi tiết như Đà Lạt: **không thực tế**. Cả nước có 3.321 xã, phường; riêng Lâm Đồng 124. Máy dựng được, nhưng không ai đi kiểm, nên sẽ thành một trang gom bài nữa. Em không ước ra con số giờ công vì không có cơ sở.
- Phần mở rộng rẻ và bền là **tầng ranh giới và đường** (chỉ đổi khi có nghị quyết mới). Phần đắt là **quán xá**.

## 4. Đường kiếm tiền và lợi ích gián tiếp

| Đường | Thực tế không | Vì sao |
|---|---|---|
| Quảng cáo, thu phí quán | Chưa | Chưa có người dùng. Trang hiện là một trang duy nhất, mỗi phố chỉ là phần đuôi địa chỉ (`#pho-hoang-dieu`), nên Google gần như không tìm thấy từng phố. Muốn có khách từ tìm kiếm phải làm mỗi phố thành một trang riêng. |
| Tiếp thị liên kết Shopee | Yếu | Người đọc bản đồ phố không ở tâm thế mua hàng. Gắn link Shopee vào trang phố dễ làm mất vẻ đáng tin. Hợp hơn: dùng tranh và chuyện phố làm chất liệu cho video của anh. |
| Hiệu giày Hải Nancy, Yen Handmade Leather | Có, nhỏ | Ghim tiệm của anh lên đúng phố là việc không tốn gì và chính đáng (nên ghi rõ "tiệm của người làm bản đồ"). Lợi ích tỉ lệ với số người mở trang, hiện là 0. |
| Game Gọn Phố | Có, rõ nhất | Game đã dùng chung nghiên cứu phố và tranh. Bản đồ là nơi giữ dữ liệu thật cho game và đã bắt được lỗi cho game (9 thành phố trực thuộc trung ương thay vì 6). |
| Anh học được cách dùng "nhân viên số" | Có | Kho có sổ tay, agent, kiểm thử tự động. Cách làm này dùng lại được cho việc khác của anh. |

Tóm lại: nên coi đây là **dự án phụ nuôi game và nội dung**, không phải nguồn thu.

## 5. Rủi ro kỹ thuật

**Dung lượng (em đo, chưa nén)**

| Màn hình | Tải về | Nặng nhất |
|---|---|---|
| Trang đầu (Việt Nam) | 0,41 MB | bản đồ Việt Nam 153 KB |
| Tầng đường Đà Lạt | 1,74 MB | file đường 747 KB, file phố 485 KB |
| Trang phố trung tâm | 5,10 MB | ảnh bản đồ minh hoạ 1,68 MB |
| Trang Chân núi Lang Biang | 7,11 MB | ảnh bản đồ minh hoạ 3,74 MB |

- Khi đưa lên Cloudflare, file dữ liệu sẽ được nén (file đường còn khoảng 177 KB, file phố 91 KB), nhưng ảnh thì không nén thêm được. Trang phố vẫn cỡ 2 MB trở lên, Lang Biang gần 4 MB. Em không có số đo tốc độ 4G ở Đà Lạt; với sóng yếu thì ảnh 3,7 MB là chậm thấy rõ.
- Khi mở thẳng link một phố, em thấy file đường và file phố bị tải 2 lần. Cần phiên xây kiểm lại.
- File phố chứa cả 24 phố trong một file. Thêm phố thì ai mở phố nào cũng phải tải hết. Tới vài trăm phố sẽ phải tách.
- Trang gọi phông chữ từ Google Fonts. Sổ tay ghi "không thư viện ngoài" nhưng vẫn có một chỗ phụ thuộc bên ngoài này.

**Cập nhật OpenStreetMap**

- Dữ liệu đường là bản chụp ngày 25/11/2026. Dựng lại phải chạy tay 5 bước, tải bộ ranh giới khoảng 4 GB. Làm được nhưng chỉ Claude làm, anh không tự làm được.
- OpenStreetMap ở Đà Lạt ghi tiệm thiếu, nên một nửa quán không ghim được. Cách sửa bền là anh tự thêm quán lên OpenStreetMap bằng ứng dụng điện thoại (kho đã gợi ý Organic Maps, StreetComplete). Việc này vừa có vị trí hợp lệ vừa giúp cộng đồng.

**Phụ thuộc**

- Bản đồ minh hoạ vẽ bằng hình Spark nằm trong kho game. Mất kho game hoặc đổi nét vẽ thì không dựng lại được nền.
- Kiểm thử hiện chỉ kiểm "trang có chạy", không kiểm "quán có đúng". Báo "Ổn" không có nghĩa dữ liệu đúng.
- Trang lộ trình còn ghi 22 phố, 203 nơi, 100 có vị trí; kho thật là 24 phố, 220 nơi, 110 có vị trí. Lệch nhỏ, do chưa cập nhật.

## 6. Nên làm gì

**Tiếp tục, thu hẹp về Đà Lạt.** Không thêm tỉnh, không thêm phố mới cho tới khi xong 3 việc dưới.

1. **Làm thật chắc 6 phố trung tâm bằng mắt người.** Anh đi ngang từng phố (anh ở sẵn Đà Lạt), xác nhận quán còn mở, đánh dấu quán thiếu lên OpenStreetMap. Mỗi quán thêm dòng "đã kiểm ngày…". Đây là thứ duy nhất làm trang này hơn các trang gom bài.
2. **Sửa cho đủ điều kiện đưa lên mạng.** Hiện dòng "© OpenStreetMap" ngay trên bản đồ; bỏ câu chê quán; thêm nút "mở chỉ đường" theo tên quán; thu nhỏ ảnh bản đồ minh hoạ (nhất là Lang Biang 3,7 MB); sửa câu "Google Maps" trong hướng dẫn agent.
3. **Cho 5 đến 10 người thật dùng thử rồi mới quyết mở rộng.** Khách quen của tiệm, bạn bè sắp lên Đà Lạt. Hỏi một câu: "Anh chị có mở lại lần hai không?". Nếu không ai mở lại, giữ dự án ở mức kho dữ liệu cho game và dừng phần trang web.

**Dấu hiệu nên dừng hẳn phần trang web:** sau khi lên mạng 2 đến 3 tháng mà không ai ngoài anh mở, hoặc anh không có thời gian đi kiểm quán.

## Nguồn

- Giấy phép OpenStreetMap: https://osmfoundation.org/wiki/Licence/Licence_and_Legal_FAQ · https://osmfoundation.org/wiki/Licence/Attribution_Guidelines
- Điều khoản Google Maps: https://www.google.com/help/terms_maps/
- Giới hạn Cloudflare Pages: https://developers.cloudflare.com/pages/platform/limits
- Khách du lịch Lâm Đồng 6 tháng đầu 2026: https://nhandan.vn/tao-dong-luc-tang-truong-kinh-te-tu-du-lich-post976100.html
- Số liệu về kho: em đếm từ `data/pho/*.json`, `data/lam-dong/da-lat/pho.json`, `docs/research/quan_chua_ghim.md` và đo bằng trình duyệt tự động ngày 25/11/2026.
