/* Gọn Phố Việt — bản đồ nhiều tầng: Việt Nam (chặng 1) → Lâm Đồng (chặng 2) → đường Đà Lạt (chặng 3) → trang phố (chặng 4).
   Trang phố có địa chỉ riêng (#pho-hoang-dieu…) để gửi link và để nút quay lại đóng trang.
   Mỗi tầng là một file JSON trong data/. Vẽ bằng SVG; kéo 1 ngón, phóng 2 ngón; bấm vùng ra thẻ thông tin.
   Địa chỉ trang đổi theo tầng (#lam-dong) nên nút quay lại của điện thoại dùng được. Không dùng thư viện ngoài. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var K = 100;                                  // điểm vẽ cho 1 độ
  var COS = Math.cos(16 * Math.PI / 180);       // nắn kinh độ ở vĩ độ giữa Việt Nam
  var LON0 = 100, LAT0 = 25;
  var TAP_SLOP = 6;                             // kéo quá 6 điểm thì không tính là bấm (giống game)

  /* ---------- các tầng ---------- */
  var LAYERS = {
    'viet-nam': {
      file: 'data/viet-nam.json', list: 'tinh', crumb: [['Việt Nam', '']],
      lonMax: 116,                              // khung mở đầu: cắt bớt biển trống phía đông Trường Sa
      cls: function (t) { return t.da_mo ? 'open' : ''; },
      // Tầm cả nước chỉ hiện vài tên cách xa nhau cho khỏi đè; phóng thêm mới hiện hết
      minZoom: function (t) {
        var z = { '68': 0, '01': 0, '79': 0, '46': 0, '48': 0, '92': 0, '31': 1.8, '22': 1.8, '24': 1.8, '75': 1.8 };
        return t.ma in z ? z[t.ma] : 2.6;
      },
      label: function (t) { return (t.loai === 'Thành phố' ? '★ ' : '') + t.ten; },
      extraLabels: [['Quần đảo Hoàng Sa', 111.9, 17.25], ['Quần đảo Trường Sa', 113.4, 11.3]],
      // Biểu tượng mốc tỉnh (Spark đợt 36 của game Gọn Phố): mã tỉnh → hình trong assets/vn/
      moc: { '01': 'ha_noi', '31': 'hai_phong', '22': 'quang_ninh', '15': 'lao_cai', '37': 'ninh_binh', '44': 'quang_tri',
             '46': 'hue', '48': 'da_nang', '52': 'gia_lai', '56': 'khanh_hoa', '68': 'lam_dong', '79': 'tp_hcm', '92': 'can_tho', '91': 'an_giang',
             // Spark đợt 41 (vẽ cho Gọn Phố Việt, tính chung số đợt với game)
             '04': 'cao_bang', '08': 'tuyen_quang', '11': 'dien_bien', '12': 'lai_chau', '14': 'son_la', '19': 'thai_nguyen', '20': 'lang_son',
             '24': 'bac_ninh', '25': 'phu_tho', '33': 'hung_yen', '38': 'thanh_hoa', '40': 'nghe_an', '42': 'ha_tinh', '51': 'quang_ngai',
             '66': 'dak_lak', '75': 'dong_nai', '80': 'tay_ninh', '82': 'dong_thap', '86': 'vinh_long', '96': 'ca_mau' },
      // Hình nhỏ rải cho sinh động (đợt 41): [tên, kinh độ, vĩ độ] — nằm dưới mốc, vướng mốc thì ẩn
      deco: [['thuyen_buom', 110.2, 15.6], ['ca_heo', 109.6, 9.4], ['hai_dang', 107.08, 10.33], ['nui_da', 103.6, 21.9], ['rung_thong', 107.9, 14.3],
             ['thuyen_buom', 106.6, 19.4], ['ca_heo', 112.5, 13.8]],
      legend: [['open', 'Có bản đồ phố'], ['soon', 'Sắp có'], ['star', 'Thành phố trực thuộc trung ương']],
      card: cardTinh
    },
    'lam-dong': {
      file: 'data/lam-dong/phuong.json', list: 'phuong', crumb: [['Việt Nam', ''], ['Lâm Đồng', 'lam-dong']],
      context: { layer: 'viet-nam', skip: '68' },  // vẽ mờ các tỉnh xung quanh để không lẫn với biển
      cls: function (p) { return p.so_pho ? 'open' : (p.da_lat ? 'dalat' : (p.loai === 'Phường' ? 'ward' : '')); },  // 5 phường Đà Lạt đều có đường
      minZoom: function (p) { return p.da_lat ? 3.2 : (p.loai === 'Xã' ? 4.5 : 2.2); },
      label: function (p) { return p.ten; },
      // Tên gom "Đà Lạt" ở tầm cả tỉnh, phóng tới 5 phường thì ẩn đi
      extraLabels: [['Đà Lạt', 108.44, 11.97, 0, 3.2, 'open']],
      // Mốc (Spark của game, nét bản đồ Việt Nam): [hình, kinh độ, vĩ độ, tên, mã phường]; phóng tới đâu mốc gần đó hiện
      // phần tử 6, 7: hiện từ mức phóng … tới dưới mức … (1 = vừa khung cả tỉnh); tầm cả tỉnh chỉ một mốc "Đà Lạt"
      mocDiem: [['ho_xuan_huong', 108.4436, 11.9418, 'Đà Lạt', '24781', 0, 7], ['ho_xuan_huong', 108.4436, 11.9418, 'Hồ Xuân Hương', '24781', 7], ['cho_da_lat', 108.43721, 11.94342, 'Chợ Đà Lạt', '24781', 7],
                ['nha_tho_con_ga', 108.43775, 11.93632, 'Nhà thờ Con Gà', '24781', 7], ['ga_da_lat', 108.4547, 11.9418, 'Ga Đà Lạt', '24781', 7],
                ['vuon_hoa', 108.4493, 11.9502, 'Vườn hoa thành phố', '24781', 7], ['quang_truong', 108.44501, 11.93884, 'Quảng trường Lâm Viên', '24781', 7],
                ['doi_che', 108.5575, 11.8822, 'Đồi chè Cầu Đất', '24805', 2.5], ['lang_biang', 108.4138, 12.0326, 'Núi Lang Biang', '24846', 2.5],
                // Spark đợt 42 — toạ độ từ OpenStreetMap (Nominatim); hang núi lửa Krông Nô và Phú Quý lấy tâm xã/đặc khu
                ['mui_ne', 108.2954, 10.9491, 'Đồi cát Mũi Né', '22918'], ['phan_thiet', 108.1461, 10.9361, 'Tháp Po Sah Inư', '22924'],
                ['ta_cu', 107.9001, 10.8151, 'Núi Tà Cú', '23110'], ['ke_ga', 107.9916, 10.6953, 'Hải đăng Kê Gà', '23143'],
                ['phu_quy', 108.9423, 10.5321, 'Đảo Phú Quý', '23272'], ['bai_da_bay_mau', 108.7158, 11.1795, 'Cổ Thạch', '22969'],
                ['bao_loc', 107.7429, 11.642, 'Thác Dambri', '24820'], ['ta_dung', 108.0362, 11.8889, 'Hồ Tà Đùng', '24637'],
                ['krong_no', 107.8014, 12.4357, 'Hang núi lửa Krông Nô', '24688'], ['pongour', 108.2654, 11.6875, 'Thác Pongour', '24976'],
                ['da_nhim', 108.6147, 11.8797, 'Hồ Đa Nhim', '24934'], ['bidoup', 108.4727, 12.1516, 'Bidoup Núi Bà', '24848'],
                // Spark đợt 44 — mốc Đà Lạt (vị trí từ dữ liệu phố / OpenStreetMap), hiện khi phóng vào Đà Lạt
                ['dinh_3', 108.42967, 11.93005, 'Dinh III', '24781', 7],
                ['hang_nga', 108.43093, 11.93476, 'Biệt thự Hằng Nga', '24781', 7],
                ['domaine_de_marie', 108.43012, 11.94970, 'Nhà thờ Domaine de Marie', '24787', 7],
                ['lycee_yersin', 108.45256, 11.94617, 'Trường Lycée Yersin', '24781', 7],
                ['dai_hoc_da_lat', 108.44557, 11.95654, 'Đại học Đà Lạt', '24778', 7],
                ['dinh_1', 108.46756, 11.94328, 'Dinh I', '24781', 4],
                ['truc_lam', 108.43456, 11.90388, 'Thiền viện Trúc Lâm', '24781', 4],
                ['datanla', 108.44884, 11.90118, 'Thác Datanla', '24781', 4],
                ['thac_prenn', 108.47010, 11.87652, 'Thác Prenn', '24781', 4],
                ['duong_ham_dat_set', 108.41122, 11.88287, 'Đường hầm đất sét', '24781', 4],
                ['chua_ve_chai', 108.49938, 11.94422, 'Chùa Ve Chai', '24805', 4],
                ['ho_than_tho', 108.47849, 11.95707, 'Hồ Than Thở', '24778', 4],
                ['thung_lung_tinh_yeu', 108.44992, 11.97819, 'Thung lũng Tình Yêu', '24778', 4],
                ['lang_hoa', 108.41447, 11.94734, 'Làng hoa Vạn Thành', '24787', 4],
                ['lang_hoa', 108.47698, 11.96869, 'Làng hoa Thái Phiên', '24778', 4],
                // Spark đợt 46 — mốc lâu đời (vị trí từ dữ liệu phố, OpenStreetMap)
                ['chua_linh_son', 108.43702, 11.95027, 'Chùa Linh Sơn', '24781', 7],
                ['chua_linh_quang', 108.42842, 11.95694, 'Chùa Linh Quang', '24787', 7],
                ['chua_linh_phong', 108.46494, 11.92958, 'Chùa Linh Phong', '24781', 7],
                ['dinh_2', 108.44796, 11.93563, 'Dinh 2', '24781', 7],
                ['bao_tang_lam_dong', 108.45990, 11.94058, 'Bảo tàng Lâm Đồng', '24781', 7],
                ['thuy_ta', 108.44209, 11.94001, 'Thủy Tạ', '24781', 7],
                ['san_golf', 108.44498, 11.94761, 'Sân golf Đồi Cù', '24781', 7],
                ['vien_pasteur', 108.42730, 11.93332, 'Viện Pasteur', '24781', 7],
                ['couvent_des_oiseaux', 108.42234, 11.93839, 'Couvent des Oiseaux', '24787', 7],
                ['luu_tru_iv', 108.42653, 11.94619, 'Lưu trữ quốc gia IV', '24787', 7],
                ['nha_tho_cam_ly', 108.42201, 11.94391, 'Nhà thờ Cam Ly', '24787', 7],
                ['thac_cam_ly', 108.42048, 11.94185, 'Thác Cam Ly', '24787', 7],
                ['lang_nguyen_huu_hao', 108.41513, 11.94299, 'Lăng Nguyễn Hữu Hào', '24787', 7],
                ['rap_hoa_binh', 108.43598, 11.94348, 'Rạp Hoà Bình', '24781', 7],
                ['thuy_dien_ankroet', 108.36055, 11.99687, 'Thuỷ điện Ankroet', '24846', 4],
                ['nha_lao_thieu_nhi', 108.47075, 11.95208, 'Nhà lao thiếu nhi', '24778', 4],
                ['cap_treo', 108.44343, 11.92304, 'Cáp treo Đà Lạt', '24781', 4],
                ['bao_tang_tra', 108.56330, 11.88470, 'Bảo tàng trà Cầu Đất', '24805', 4]],
      legend: [['open', 'Viền xanh đậm: có phố đã nghiên cứu'], ['dalat', 'Viền xanh: phường khác của Đà Lạt']],
      card: cardPhuong
    },
    'da-lat': {
      kind: 'duong', file: 'data/lam-dong/da-lat/duong.json', prec: 4,
      crumb: [['Việt Nam', ''], ['Lâm Đồng', 'lam-dong'], ['Đà Lạt', 'da-lat']],
      context: { layer: 'lam-dong' },
      extra: { key: 'pho', file: 'data/lam-dong/da-lat/pho.json' },
      sang: ['Xem Đà Lạt 1963', 'da-lat-1963'],        // nút sang bản đồ 1963
      legend: [['pin', 'Phố đã nghiên cứu'], ['road', 'Đường thật (OpenStreetMap)'], ['water', 'Hồ']],
      card: cardPho
    },
    // Đà Lạt 1963: vẽ lại hoàn toàn từ bản đồ AMS L909 Đà Lạt 1:12.500 (tools/dung_1963.py) — không hiện gì của hiện tại
    'da-lat-1963': {
      kind: 'duong', y1963: true, file: 'data/lam-dong/da-lat/1963.json', prec: 5,
      extra: { key: 'dd63', file: 'data/lam-dong/da-lat/1963_dia_diem.json' },   // năm 1963 là gì → nay → qua các năm
      crumb: [['Đà Lạt', 'da-lat'], ['Năm 1963', 'da-lat-1963']],
      sang: ['Hôm nay', 'da-lat'],
      legend: [['road63', 'Đường năm 1963'], ['dat63', 'Đường đất nay đã mất'], ['mon63', 'Đường mòn'], ['nha63', 'Khu nhà'], ['nhago63', 'Nhà gỗ, nhà lá (phóng gần thấy)'], ['vuon63', 'Vườn'], ['rung63', 'Rừng thưa'], ['ram63', 'Rừng rậm'], ['dam63', 'Đầm lầy'], ['water', 'Hồ'], ['kv63', 'Khuôn viên công trình'], ['dm63', 'Vòng cao độ, cách nhau 5 m'], ['cao63', 'Độ cao đỉnh (mét)']],
      card: function () { return ''; }
    },
    // Sài Gòn 1961: vẽ lại từ bản đồ Sài Gòn 1:10.000, ấn bản 2-AMS 1961 (tools/sg1961/) — đang làm, mới khu trung tâm
    'sai-gon-1961': {
      kind: 'duong', y1963: true, sg: true, file: 'data/sai-gon/1961.json', prec: 5,
      mo: [106.688, 10.768, 106.712, 10.792],
      crumb: [['Việt Nam', ''], ['Sài Gòn 1961', 'sai-gon-1961']],
      legend: [['road63', 'Đường năm 1961'], ['nha63', 'Khối phố'], ['rung63', 'Công viên'], ['water', 'Sông rạch']],
      card: function () { return ''; }
    }
  };

  var svg = document.getElementById('svg');
  var world = document.getElementById('world');
  var land = document.getElementById('land');
  var labels = document.getElementById('labels');
  var sheet = document.getElementById('sheet');
  var sheetBody = document.getElementById('sheetBody');
  var srcSheet = document.getElementById('srcSheet');
  var loading = document.getElementById('loading');
  var pinsRoot = document.getElementById('pins');

  var view = { s: 1, x: 0, y: 0 };
  var fit = { s: 1, x: 0, y: 0 };
  var bounds = null;
  var layer = null, layerId = null, data = null, picked = null;
  var cache = {};

  function px(lon) { return (lon - LON0) * K * COS; }
  function py(lat) { return (LAT0 - lat) * K; }

  function pathOf(polys, prec) {
    var n = prec || (layer && layer.prec) || 1;
    var d = '';
    for (var i = 0; i < polys.length; i++) {
      for (var j = 0; j < polys[i].length; j++) {
        var r = polys[i][j];
        for (var k = 0; k < r.length; k++) {
          d += (k ? 'L' : 'M') + px(r[k][0]).toFixed(n) + ' ' + py(r[k][1]).toFixed(n);
        }
        d += 'Z';
      }
    }
    return d;
  }

  function el(tag, attrs, text) {
    var e = document.createElementNS(NS, tag);
    for (var a in attrs) e.setAttribute(a, attrs[a]);
    if (text) e.textContent = text;
    return e;
  }

  function fmt(n, d) { return Number(n).toLocaleString('vi-VN', { maximumFractionDigits: d || 0 }); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- vẽ một tầng ---------- */
  function lineOf(pts) {
    var n = layer.prec || 1, d = '';
    for (var k = 0; k < pts.length; k++) d += (k ? 'L' : 'M') + px(pts[k][0]).toFixed(n) + ' ' + py(pts[k][1]).toFixed(n);
    return d;
  }

  // Đường cong mềm đi QUA đúng các điểm (Catmull-Rom → Bézier), tay nắm ≤ 40% đoạn kề để không vọt lố
  // (anh Kha 27/11 "các đường cong… chưa đẹp"). kin = true: vùng khép kín (rừng, vườn, hồ).
  function congOf(pts, kin) {
    // Làm mềm sẵn thành nhiều đoạn thẳng ngắn (Catmull-Rom, chia mỗi đoạn theo độ dài) — KHÔNG dùng lệnh cong 'C' của SVG:
    // điện thoại vẽ hàng nghìn đường cong Bézier rất chậm khi phóng gần (anh Kha 27/11 "zoom vô là chậm, treo"; đo: kéo 105 s → 0,5 s).
    var n = layer.prec || 1, P = pts.map(function (p) { return [px(p[0]), py(p[1])]; }), m = P.length;
    if (m < 3) return lineOf(pts) + (kin ? 'Z' : '');
    if (kin && P[0][0] === P[m - 1][0] && P[0][1] === P[m - 1][1]) { P.pop(); m--; }
    function at(i) { return kin ? P[(i + m) % m] : P[Math.max(0, Math.min(m - 1, i))]; }
    var buoc = 0.00006 * K;                       // ~6 m một đoạn nhỏ
    var d = 'M' + P[0][0].toFixed(n) + ' ' + P[0][1].toFixed(n), end = kin ? m : m - 1;
    for (var i = 0; i < end; i++) {
      var p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      var L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]), k = Math.max(1, Math.min(6, Math.round(L / buoc)));
      for (var j = 1; j <= k; j++) {
        var t = j / k, t2 = t * t, t3 = t2 * t, x, y;
        if (j === k) { x = p2[0]; y = p2[1]; }
        else {
          x = 0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
          y = 0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
        }
        d += 'L' + x.toFixed(n) + ' ' + y.toFixed(n);
      }
    }
    return d + (kin ? 'Z' : '');
  }

  // Làm mềm đường (Chaikin 2 lượt) cho chữ chạy uốn êm theo đường, không gãy khúc
  function smooth(pts, n) {
    var p = pts;
    for (var t = 0; t < (n || 2); t++) {
      if (p.length < 3) return p;
      var q = [p[0]];
      for (var i = 0; i < p.length - 1; i++) {
        var a = p[i], b = p[i + 1];
        q.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
      }
      q.push(p[p.length - 1]);
      p = q;
    }
    return p;
  }
  // Độ gắt khúc cong lớn nhất (độ) trên đoạn giữa đường — cong quá thì không ghi tên
  function maxTurn(pts) {
    var m = 0;
    for (var i = 1; i < pts.length - 1; i++) {
      var a1 = Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]);
      var a2 = Math.atan2(pts[i + 1][1] - pts[i][1], pts[i + 1][0] - pts[i][0]);
      var d = Math.abs(a2 - a1) * 180 / Math.PI; if (d > 180) d = 360 - d;
      m = Math.max(m, d);
    }
    return m;
  }

  function meters(pts) {
    var m = 0;
    for (var k = 1; k < pts.length; k++) {
      m += Math.hypot((pts[k][0] - pts[k - 1][0]) * 108900, (pts[k][1] - pts[k - 1][1]) * 110540);
    }
    return m;
  }

  /* Xếp chữ trên tầng đường: tên đường chỉ hiện khi đoạn đường đủ dài để chứa chữ và không đè tên khác;
     tên ghim đặt bên phải, chật thì sang trái, vẫn chật thì ẩn chữ (ghim vẫn còn). Tính lại sau mỗi lần kéo/phóng. */
  var roadLbl = [], pointLbl = [];
  var layoutQueued = false;
  function queueLayout() {
    if (layoutQueued) return;
    layoutQueued = true;
    requestAnimationFrame(function () { layoutQueued = false; layout(); });
  }
  function layout() {
    if (!layer || layer.kind !== 'duong') return;
    var r = khungSvg(), z = view.s / fit.s, fs = 11 / view.s;
    var boxes = [];
    function free(b) {
      for (var i = 0; i < boxes.length; i++) {
        var o = boxes[i];
        if (b.x1 > o.x0 && b.x0 < o.x1 && b.y1 > o.y0 && b.y0 < o.y1) return false;
      }
      return true;
    }
    // Đà Lạt 1963: biểu tượng theo hạng và mức phóng — xa chỉ mốc lớn (≤ 8), vừa thêm nơi có hình (≤ 16), gần hiện hết;
    // cái nào chồng lên cái hạng cao hơn thì ẩn (cách "ưu tiên + chống chồng" của Mapbox, Google).
    // Đà Lạt 1963 — biểu tượng (góp ý Antigravity 27/11, theo Mapbox/Google: ưu tiên + chống đè):
    //  trần theo mức 6 / 10 / 16 / không trần; bỏ vùng bị thanh tìm (trên 115) và nút đáy (65) che; xếp hạng → độ nổi tiếng →
    //  đã hiện ở lần trước (phóng to không làm mất mốc đang thấy) → nằm thấp hơn trên màn hình trước (quy tắc Google CollisionBehavior).
    //  Hạng 1: đặt hình + chữ TRƯỚC tên đường; hạng 2, 3: chữ đặt sau tên đường; hạng 3 vướng chữ thì ẩn cả chấm.
    var pinDat = [];
    if (layer.y1963) {
      var muc = +svg.getAttribute('data-zm') || 0, tran = [6, 10, 16, 999][muc], hangMax = muc === 0 ? 1 : muc === 1 ? 2 : 3, dem = 0;
      var tren = 115, duoi = r.height - 110, phongTo = z >= (layout._zTruoc || 0);
      layout._zTruoc = z;
      pins.slice().sort(function (a, b) {
        return a._hang - b._hang || a._thu - b._thu || (phongTo ? (b._daHien ? 1 : 0) - (a._daHien ? 1 : 0) : 0) || b._y - a._y;
      }).forEach(function (g) {
        var sx = g._x * view.s + view.x, sy = g._y * view.s + view.y, rr = g._r, ok = g._hang <= hangMax && dem < tran;
        var bx = { x0: sx - rr - 4, x1: sx + rr + 4, y0: sy - 2 * rr - 4, y1: sy + 4 };
        if (ok && (sx < -30 || sy < tren - 20 || sx > r.width + 30 || sy > duoi + 30)) ok = false;
        else if (ok && !free(bx)) ok = false;
        g._an = !ok;
        if (ok) { boxes.push(bx); pinDat.push(g); if (sx > 0 && sy > tren && sx < r.width && sy < duoi) dem++; }
      });
      pins.forEach(function (g) { g._daHien = !g._an; });
    }
    // ghim trước (quan trọng nhất): chỗ của mọi ghim, rồi mới tới chữ.
    if (!layer.y1963) pins.forEach(function (g) {
      var sx = g._x * view.s + view.x, sy = g._y * view.s + view.y;
      boxes.push({ x0: sx - 11, x1: sx + 11, y0: sy - 28, y1: sy });
    });
    // chữ cạnh ghim. 1963: hình Spark thử DƯỚI chân hình → phải → trái → trên; chấm nhỏ thử phải → trái → dưới → trên
    function nhanGhim(ds) { ds.forEach(function (g) {
      if (g._fixed || g._an) return;
      var sx = g._x * view.s + view.x, sy = g._y * view.s + view.y, lb = g.lastChild;
      if (layer.y1963) {
        var w = g._n * 11.5 * 0.58 + 4, rr = g._r, hinh = g._hinh, cy = hinh ? -rr : -8;
        var cho = {
          duoi: { b: { x0: sx - w / 2, x1: sx + w / 2, y0: sy + 5, y1: sy + 19 }, x: 0, y: 14, a: 'middle' },
          phai: { b: { x0: sx + rr + 5, x1: sx + rr + 5 + w, y0: sy + cy - 8, y1: sy + cy + 8 }, x: rr + 3, y: cy + 4, a: 'start' },
          trai: { b: { x0: sx - rr - 5 - w, x1: sx - rr - 5, y0: sy + cy - 8, y1: sy + cy + 8 }, x: -rr - 3, y: cy + 4, a: 'end' },
          tren: { b: { x0: sx - w / 2, x1: sx + w / 2, y0: sy - 2 * rr - 19, y1: sy - 2 * rr - 5 }, x: 0, y: -2 * rr - 6, a: 'middle' }
        };
        var thu = hinh ? ['duoi', 'phai', 'trai', 'tren'] : ['phai', 'trai', 'duoi', 'tren'], dat = null;
        for (var k = 0; k < thu.length; k++) {
          var c = cho[thu[k]];
          if (c.b.x0 > 4 && c.b.x1 < r.width - 4 && free(c.b)) { dat = c; break; }
        }
        if (dat) {
          lb.setAttribute('x', dat.x); lb.setAttribute('y', dat.y); lb.setAttribute('text-anchor', dat.a); lb.removeAttribute('hidden'); boxes.push(dat.b);
        } else {
          lb.setAttribute('hidden', '');
          if (!hinh) g._an = true;          // chấm vô danh không chữ chỉ là rác — ẩn luôn
        }
        return;
      }
      var w = g._n * 13 * 0.6 + 6, o = g._r ? g._r + 1 : 12, cy = g._r ? -g._r : -16;
      var right = { x0: sx + o, x1: sx + o + 2 + w, y0: sy + cy - 10, y1: sy + cy + 10 };
      var left = { x0: sx - o - 2 - w, x1: sx - o, y0: sy + cy - 10, y1: sy + cy + 10 };
      // chữ không được tràn khỏi mép màn hình (tên dài như "Thiền viện Trúc Lâm – Hồ Tuyền Lâm")
      var vuaPhai = right.x1 < r.width - 6, vuaTrai = left.x0 > 6;
      if (!vuaPhai && !vuaTrai) { if (sx > r.width / 2) vuaTrai = true; else vuaPhai = true; }
      if (g._r) lb.setAttribute('y', cy + 4);
      if (vuaPhai && free(right)) { lb.setAttribute('x', o + 2); lb.setAttribute('text-anchor', 'start'); lb.removeAttribute('hidden'); boxes.push(right); }
      else if (vuaTrai && free(left)) { lb.setAttribute('x', -o - 2); lb.setAttribute('text-anchor', 'end'); lb.removeAttribute('hidden'); boxes.push(left); }
      else lb.setAttribute('hidden', '');
    }); }
    if (!layer.y1963) nhanGhim(pins);
    else nhanGhim(pinDat.filter(function (g) { return g._hang === 1; }));
    var daDat = {};
    roadLbl.slice().sort(function (a, b) { return a.rank - b.rank || b.len - a.len; }).forEach(function (L) {
      var show = z >= L.minZ && L.n * fs * 0.64 < L.len * 0.92;
      if (show) {
        var sx = L.x * view.s + view.x, sy = L.y * view.s + view.y, hw = L.n * 11 * 0.58 / 2 + 4;
        if (sx < -50 || sy < -50 || sx > r.width + 50 || sy > r.height + 50) show = false;
        else if (L.pe) {
          // chữ chạy dọc đường: đo bằng các ô nhỏ dọc theo đúng đoạn chữ nằm (không dùng một hình chữ nhật ngang lớn)
          var hl = L.n * fs * 0.64 / 2 + 3 / view.s, bs = [];
          for (var t = -hl; t <= hl + 1e-9; t += Math.max(hl / 4, 1e-6)) {
            var q = L.mau ? L.mau[Math.round(Math.max(0, Math.min(1, 0.5 + t / L.len)) * 40)] : null, qp = q ? null : L.pe.getPointAtLength(Math.max(0, Math.min(L.len, L.len / 2 + t)));
            var qx = (q ? q[0] : qp.x) * view.s + view.x, qy = (q ? q[1] : qp.y) * view.s + view.y;
            bs.push({ x0: qx - 6, x1: qx + 6, y0: qy - 7, y1: qy + 7 });
          }
          var gan = (daDat[L.ten] || []).some(function (q) { return Math.hypot(q[0] - sx, q[1] - sy) < (layer.y1963 ? 310 : 220); });
          if (!gan && bs.every(free)) { bs.forEach(function (b) { boxes.push(b); }); (daDat[L.ten] = daDat[L.ten] || []).push([sx, sy]); } else show = false;
        } else {
          var b = { x0: sx - hw, x1: sx + hw, y0: sy - hw * 0.5 - 7, y1: sy + hw * 0.5 + 7 };
          if (free(b)) boxes.push(b); else show = false;
        }
      }
      if (show) L.el.removeAttribute('hidden'); else L.el.setAttribute('hidden', '');
    });
    if (layer.y1963) {
      nhanGhim(pinDat.filter(function (g) { return g._hang === 2; }));
      nhanGhim(pinDat.filter(function (g) { return g._hang === 3; }));
      pins.forEach(function (g) { g.parentNode.classList.toggle('an', !!g._an); g._daHien = !g._an; });
    }
    // hồ, mốc: sau tên đường, chỗ nào còn trống mới hiện
    pointLbl.slice().sort(function (a, b) { return (a.cuoi ? 1 : 0) - (b.cuoi ? 1 : 0); }).forEach(function (L) {
      var show = z >= L.minZ;
      if (show) {
        var sx = L.x * view.s + view.x, sy = L.y * view.s + view.y, w = L.n * 11 * 0.58;
        var b = L.mid ? { x0: sx - w / 2, x1: sx + w / 2, y0: sy - 8, y1: sy + 8 } : { x0: sx - 2, x1: sx + w, y0: sy - 8, y1: sy + 8 };
        if (sx < -w || sy < -20 || sx > r.width + 20 || sy > r.height + 20 || !free(b)) show = false;
        else boxes.push(b);
      }
      if (show) L.el.removeAttribute('hidden'); else L.el.setAttribute('hidden', '');
    });
  }

  /* Tầng đường: vẽ phường, hồ, đường (có viền), tên đường chạy dọc đường, mốc, ghim phố */
  var pins = [];
  function drawStreets() {
    var lam = cache['lam-dong'], onSet = {};
    data.phuong.forEach(function (m) { onSet[m] = 1; });
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    lam.phuong.forEach(function (w) {
      var on = onSet[w.ma];
      land.appendChild(el('path', { d: pathOf(w.hinh, 3), 'class': 'prov ' + (on ? 'w-on' : 'ctx') }));
      if (on && w.so_pho) {   // khung mở đầu: 2 phường trung tâm có phố; 3 phường kia kéo ra là thấy
        w.hinh.forEach(function (pl) {
          pl[0].forEach(function (q) {
            var x = px(q[0]), y = py(q[1]);
            minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
          });
        });
      }
      if (on) labels.appendChild(el('text', { x: px(w.nhan[0]), y: py(w.nhan[1]), 'class': 'lbl ward-name', 'data-min': 0, 'data-max': 3 }, 'Phường ' + w.ten));
    });
    var water = el('g', { 'class': 'water' });
    data.nuoc.forEach(function (n) { water.appendChild(el('path', { d: lineOf(n.pts) + 'Z' })); });
    land.appendChild(water);
    // đường: vẽ nhỏ trước, to sau; đường lớn có viền nâu
    var roads = data.duong.slice().sort(function (a, b) { return b.loai - a.loai; });
    var casing = el('g', { 'class': 'road-casing' }), fill = el('g', { 'class': 'road-fill' });
    roads.forEach(function (r) {
      var d = lineOf(r.pts);
      if (r.loai <= 3) casing.appendChild(el('path', { d: d, 'class': 'r' + r.loai }));
      fill.appendChild(el('path', { d: d, 'class': 'r' + r.loai }));
    });
    land.appendChild(casing); land.appendChild(fill);
    // tên đường chạy dọc theo đường (mỗi đoạn đủ dài một tên)
    var defs = el('defs', {});
    land.appendChild(defs);
    roadLbl = []; pointLbl = [];
    var roadLabels = el('g', {});
    labels.appendChild(roadLabels);
    var minLen = { 1: 120, 2: 120, 3: 140, 4: 120, 5: 150 };
    var showAt = { 1: 1.6, 2: 2, 3: 3, 4: 6, 5: 10 };
    (data.ten_duong || []).forEach(function (r, i) {
      if (meters(r.pts) < minLen[r.loai]) return;
      var id = 'rd' + i;
      var sm = smooth(r.pts, 3);
      if (maxTurn(smooth(r.pts, 1)) > 50) return;          // đường gãy gắt: bỏ tên cho khỏi rối
      var pe0 = el('path', { id: id, d: lineOf(sm) });
      defs.appendChild(pe0);
      var L0 = pe0.getTotalLength();
      if (pe0.getPointAtLength(L0 * 0.6).x < pe0.getPointAtLength(L0 * 0.4).x) {
        pe0.setAttribute('d', lineOf(sm.slice().reverse()));  // chữ chạy trái sang phải, không lộn ngược
      }
      var t = el('text', { 'class': 'lbl road-name r' + r.loai, dy: '0.35em', hidden: '' });
      var tp = el('textPath', { href: '#' + id, startOffset: '50%' }, r.ten);
      t.appendChild(tp);
      roadLabels.appendChild(t);
      var pe = defs.lastChild, L = pe.getTotalLength(), m = pe.getPointAtLength(L / 2);
      roadLbl.push({ el: t, len: L, x: m.x, y: m.y, n: r.ten.length, minZ: showAt[r.loai], rank: r.loai });
    });
    data.nuoc.forEach(function (n) {
      if (!n.ten || n.pts.length < 4) return;
      var cx = 0, cy = 0;
      n.pts.forEach(function (q) { cx += q[0]; cy += q[1]; });
      var t = el('text', { x: px(cx / n.pts.length), y: py(cy / n.pts.length), 'class': 'lbl sea', hidden: '' }, n.ten);
      labels.appendChild(t);
      pointLbl.push({ el: t, x: px(cx / n.pts.length), y: py(cy / n.pts.length), n: n.ten.length, minZ: 2.5, mid: true });
    });
    data.moc.forEach(function (m) {
      var t = el('text', { x: px(m.lon), y: py(m.lat), 'class': 'lbl moc', hidden: '' }, '• ' + m.ten);
      labels.appendChild(t);
      pointLbl.push({ el: t, x: px(m.lon), y: py(m.lat), n: m.ten.length + 2, minZ: 4.5, mid: false });
    });
    // ghim phố: giữ cỡ cố định trên màn hình
    pins = [];
    var pinLayer = el('g', {});
    var phoList = (cache.pho && cache.pho.pho) || data.pho;   // ghim lấy từ pho.json (có cả phố mới)
    phoList.forEach(function (p, i) {
      var g = el('g', { 'class': 'pin', transform: 'translate(' + px(p.lon).toFixed(4) + ' ' + py(p.lat).toFixed(4) + ')' });
      var inner = el('g', { 'data-i': i });
      inner._x = px(p.lon); inner._y = py(p.lat); inner._n = (p.ten_ngan || p.ten_hien || p.ten_pho).length;
      inner.appendChild(el('path', { d: 'M0 0 C-4 -7 -10 -10 -10 -17 A10 10 0 1 1 10 -17 C10 -10 4 -7 0 0Z', 'class': 'pin-body', 'data-i': i }));
      inner.appendChild(el('circle', { cx: 0, cy: -17, r: 4, 'class': 'pin-dot', 'data-i': i }));
      inner.appendChild(el('text', { x: 14, y: -14, 'class': 'pin-label', 'data-i': i }, p.ten_ngan || p.ten_hien || p.ten_pho));
      g.appendChild(inner);
      pinLayer.appendChild(g);
      pins.push(inner);
    });
    pinsRoot.textContent = '';
    pinsRoot.appendChild(pinLayer);
    bounds = { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    fitAll();
  }

  /* ---------- Đà Lạt 1963 (tầng riêng) ----------
     Mọi nét lấy từ bản đồ quân đội Mỹ AMS L909 Đà Lạt 1:12.500 năm 1963 (tools/dung_1963.py): đường (tâm khe giữa hai mép in),
     hồ, rừng, nhà; tên đường theo bảng chỉ dẫn in trên bản đồ. Anh Kha chốt 26/11: không ghép gì của hiện tại. */
  var BIEU_TUONG_63 = true;
  var tim63 = document.getElementById('tim63'), timKq = document.getElementById('timKq');
  function draw1963() {
    var k = data.khung, ox = k[0], oy = k[1];
    var minLen = { 1: 90, 2: 90, 3: 110, 4: 130 }, showAt = { 1: 1.4, 2: 1.8, 3: 2.6, 4: 4 };
    function poly(list, cls) {
      var g = el('g', { 'class': cls }), d = '';
      list.forEach(function (p) { d += congOf(p, true); });
      g.appendChild(el('path', { d: d }));
      land.appendChild(g);
    }
    land.appendChild(el('rect', { x: px(k[0]), y: py(k[3]), width: px(k[2]) - px(k[0]), height: py(k[1]) - py(k[3]), 'class': 'giay63' }));
    // vườn (ô kẻ có chấm) và đầm lầy (búi cỏ) theo chú thích bản đồ: tô nền nhạt + hoa văn chấm / búi cỏ, ~25 m một ô
    var o25 = px(ox + 0.00025) - px(ox), pd = el('defs', {}); land.appendChild(pd);
    var pv = el('pattern', { id: 'vuon63p', patternUnits: 'userSpaceOnUse', width: o25, height: o25 });
    pv.appendChild(el('rect', { width: o25, height: o25, 'class': 'vuon63-nen' }));
    pv.appendChild(el('circle', { cx: o25 / 2, cy: o25 / 2, r: o25 * 0.07, 'class': 'vuon63-cham' })); pd.appendChild(pv);
    var pdm = el('pattern', { id: 'dam63p', patternUnits: 'userSpaceOnUse', width: o25 * 1.4, height: o25 });
    pdm.appendChild(el('path', { d: 'M' + o25 * 0.45 + ' ' + o25 * 0.6 + 'h' + o25 * 0.5 + 'M' + o25 * 0.6 + ' ' + o25 * 0.6 + 'l-' + o25 * 0.08 + ' -' + o25 * 0.2 +
      'M' + o25 * 0.7 + ' ' + o25 * 0.6 + 'v-' + o25 * 0.24 + 'M' + o25 * 0.8 + ' ' + o25 * 0.6 + 'l' + o25 * 0.08 + ' -' + o25 * 0.2, 'class': 'dam63-bui' })); pd.appendChild(pdm);
    poly(data.rung, 'rung63');
    poly(data.rung_ram || [], 'rung63 ram63');
    poly(data.vuon || [], 'vuon63');
    poly(data.dam || [], 'dam63');
    poly(data.khu || [], 'khu63');
    poly(data.nha_dac || [], 'dac63');           // Sài Gòn 1961: công trình lớn in đen đặc
    // Sài Gòn 1961: tranh nền Spark vẽ lại theo bản quét (đặt bằng 3 góc: trên-trái, trên-phải, dưới-trái) — đè lên nét dò máy
    (data.anh_nen || []).forEach(function (a) {
      var x0 = px(a.tt[0]), y0 = py(a.tt[1]), ax = px(a.tp[0]) - x0, ay = py(a.tp[1]) - y0, bx = px(a.dt[0]) - x0, by = py(a.dt[1]) - y0;
      // khung 1000×1000 (không phải 1×1): trình duyệt làm tròn toạ độ ảnh ở hệ riêng của nó — khung 1×1 làm tranh lệch 20–30 m
      // so với tên đường (anh Kha 27/11 "tên lệch ra nhiều lắm")
      var im = el('image', { href: a.file.replace('sg1961/', 'sg1961/nho/'), x: 0, y: 0, width: 1000, height: 1000, preserveAspectRatio: 'none', 'class': 'nen61',
        transform: 'matrix(' + [ax / 1000, ay / 1000, bx / 1000, by / 1000, x0, y0].map(function (v) { return v.toPrecision(10); }).join(' ') + ')' });
      // khung ô (toạ độ bản đồ) + bề ngang → chọn tranh nhỏ / vừa / nét theo chỗ đang nhìn (nenSac)
      im._nen = { f: a.file, m: 'nho', w: Math.hypot(ax, ay), x1: Math.min(x0, x0 + ax, x0 + bx, x0 + ax + bx), x2: Math.max(x0, x0 + ax, x0 + bx, x0 + ax + bx),
        y1: Math.min(y0, y0 + ay, y0 + by, y0 + ay + by), y2: Math.max(y0, y0 + ay, y0 + by, y0 + ay + by) };
      land.appendChild(im);
    });
    if (data.net_lop || data.net) {              // Sài Gòn 1961: CHÉP Y NÉT IN của bản gốc, tô màu theo loại nét
      var tl = data.net_tl || 1e5;
      var veNet = function (list) {
        var d = '';
        list.forEach(function (f) {
          var x = f[0], y = f[1];
          d += 'M' + px(ox + x / tl).toFixed(5) + ' ' + py(oy + y / tl).toFixed(5);
          for (var i = 2; i < f.length; i += 2) { x += f[i]; y += f[i + 1]; d += 'L' + px(ox + x / tl).toFixed(5) + ' ' + py(oy + y / tl).toFixed(5); }
          d += 'Z';
        });
        return d;
      };
      var lop = data.net_lop || { vien: data.net };
      // gạch chéo nhà: mẫu SVG ~4 m một vạch (như bản in), sắc ở mọi mức phóng
      var o4 = px(ox + 0.00004) - px(ox), pdn = el('defs', {}); land.appendChild(pdn);
      var ph = el('pattern', { id: 'gach61', patternUnits: 'userSpaceOnUse', width: o4, height: o4, patternTransform: 'rotate(45)' });
      ph.appendChild(el('rect', { width: o4, height: o4, 'class': 'gach61-nen' }));
      ph.appendChild(el('rect', { width: o4 * 0.32, height: o4, 'class': 'gach61-vach' }));
      pdn.appendChild(ph);
      ['nen_nha', 'gach', 'dac'].forEach(function (k) {
        if (!lop[k] || !lop[k].length) return;
        var gl = el('g', { 'class': 'net61 n61-' + k }); gl.appendChild(el('path', { d: veNet(lop[k]) })); land.appendChild(gl);
      });
    }
    if (data.vien) {                             // Sài Gòn 1961: nét in mảnh chép từ bản gốc (viền khối, lề đường)
      var gv = el('g', { 'class': 'vien61' }), dv = '';
      data.vien.forEach(function (p) { dv += congOf(p); });
      gv.appendChild(el('path', { d: dv })); land.appendChild(gv);
    }
    poly(data.nuoc, 'water nuoc63');
    // khuôn viên công trình (khung đỏ mảnh in trên bản đồ) — 13 nơi lớn, hiện khi phóng vừa trở lên
    var gkv = el('g', { 'class': 'kv63' }), dkv = '';
    (data.khuon_vien || []).forEach(function (k) { dkv += congOf(k.pts, true); });
    gkv.appendChild(el('path', { d: dkv })); land.appendChild(gkv);
    // vòng cao độ (đường đồng mức cách 5 m) — nét nâu mờ dưới đường, nhà
    var gdm = el('g', { 'class': 'dm63' }), ddm = '';
    (data.dong_muc || []).forEach(function (p) { ddm += congOf(p); });
    gdm.appendChild(el('path', { d: ddm })); land.appendChild(gdm);
    var dn = '';
    data.nha.forEach(function (f) {
      var x = f[0], y = f[1];
      dn += 'M' + px(ox + x / 1e5).toFixed(5) + ' ' + py(oy + y / 1e5).toFixed(5);
      for (var i = 2; i < f.length; i += 2) { x += f[i]; y += f[i + 1]; dn += 'L' + px(ox + x / 1e5).toFixed(5) + ' ' + py(oy + y / 1e5).toFixed(5); }
      dn += 'Z';
    });
    var gn = el('g', { 'class': 'nha63g' }); gn.appendChild(el('path', { d: dn })); land.appendChild(gn);
    var dg = '';                                   // nhà gỗ / nhà lá (in xám trên bản đồ)
    (data.nha_go || []).forEach(function (f) {
      var x = f[0], y = f[1];
      dg += 'M' + px(ox + x / 1e5).toFixed(5) + ' ' + py(oy + y / 1e5).toFixed(5);
      for (var i = 2; i < f.length; i += 2) { x += f[i]; y += f[i + 1]; dg += 'L' + px(ox + x / 1e5).toFixed(5) + ' ' + py(oy + y / 1e5).toFixed(5); }
      dg += 'Z';
    });
    // khối đã nắn chữ nhật (dia_hinh_1963.py vuong_nha): [cx, cy (1e-6 độ), dài, rộng (dm), góc 0,1°]
    function hcn(list) {
      var s = '', KX = 111320 * Math.cos(11.94 * Math.PI / 180), KY = 110574;
      list.forEach(function (r) {
        var cx = ox + r[0] / 1e6, cy = oy + r[1] / 1e6, w = r[2] / 20, h = r[3] / 20, g = r[4] / 10 * Math.PI / 180;
        var ux = Math.cos(g), uy = Math.sin(g);
        [[-w, -h], [w, -h], [w, h], [-w, h]].forEach(function (c, i) {
          var ex = c[0] * ux - c[1] * uy, ny = c[0] * uy + c[1] * ux;
          s += (i ? 'L' : 'M') + px(cx + ex / KX).toFixed(5) + ' ' + py(cy + ny / KY).toFixed(5);
        });
        s += 'Z';
      });
      return s;
    }
    gn.firstChild.setAttribute('d', dn + hcn(data.nha_hcn || []));
    var gg = el('g', { 'class': 'nha63g nhago63' }); gg.appendChild(el('path', { d: dg + hcn(data.nha_go_hcn || []) })); land.appendChild(gg);
    var roads = data.duong.slice().sort(function (a, b) { return b.loai - a.loai; });
    var casing = el('g', { 'class': 'road-casing duong63' }), fill = el('g', { 'class': 'road-fill duong63' });
    roads.forEach(function (r) {
      var d = congOf(r.pts);
      casing.appendChild(el('path', { d: d, 'class': 'r' + r.loai }));
      fill.appendChild(el('path', { d: d, 'class': 'r' + r.loai }));
    });
    land.appendChild(casing); land.appendChild(fill);
    var mon = el('g', { 'class': 'mon63' });          // đường mòn một nét đứt
    (data.duong_mon || []).forEach(function (r) { mon.appendChild(el('path', { d: congOf(r.pts) })); });
    land.appendChild(mon);
    var dat = el('g', { 'class': 'dat63' });          // đường đất bản cũ có, nay không còn: nét đứt đôi
    (data.duong_mat || []).forEach(function (r) { dat.appendChild(el('path', { d: congOf(r.pts) })); });
    land.appendChild(dat);
    Array.prototype.slice.call(land.querySelectorAll('.nen61')).forEach(function (n) { land.appendChild(n); });   // tranh nền Spark nằm trên nét dò, dưới chữ
    var hl = el('g', { id: 'hl63', 'class': 'hl63' }); land.appendChild(hl);
    var defs = el('defs', {}); land.appendChild(defs);
    var roadLabels = el('g', {}); labels.appendChild(roadLabels);
    roadLbl = []; pointLbl = [];
    // Tên đường 1963: chia mỗi khúc có tên thành cửa sổ ~300 m; cửa sổ nào đủ thẳng thì là một chỗ có thể đặt chữ.
    // layout() chọn chỗ không đè, cùng tên thì cách nhau ≥ 220 điểm màn hình (đường dài hiện tên vài lần, như bản đồ thật).
    var nWin = 0;
    data.ten_duong.forEach(function (r) {
      if (r.an) return;                             // Sài Gòn 1961: tên không khớp lòng đường nào trong tranh → chỉ để tìm, không in
      var ten = r.ten.replace(/^(Đường|Phố) /, '');     // tên nay cũng không ghi "Đường"; giữ "Đại lộ", "Công trường"
      var pts = r.pts, acc = [0];
      for (var k = 1; k < pts.length; k++) acc.push(acc[k - 1] + meters([pts[k - 1], pts[k]]));
      var tong = acc[acc.length - 1];
      if (tong < 50) return;
      // nhiều cỡ cửa sổ (300, 600, 1200 m, cả khúc): phóng xa dùng cửa sổ dài, phóng gần dùng cửa sổ ngắn
      var cua = [];
      [450, 900, tong].forEach(function (c) {      // ít cỡ cửa sổ (Antigravity: 499 cửa sổ quá nhiều)
        if (c > tong * 1.01 && c !== tong) return;
        var so = Math.max(1, Math.round(tong / c)), buoc = tong / so;
        for (var w = 0; w < so; w++) cua.push([w * buoc, (w + 1) * buoc]);
      });
      cua.forEach(function (cw) {
        var lo = cw[0], hi = cw[1], seg = [];
        for (var j = 0; j < pts.length; j++) if (acc[j] >= lo - 1 && acc[j] <= hi + 1) seg.push(pts[j]);
        if (seg.length < 2) return;
        if (maxTurn(smooth(seg, 2)) > 70) return;
        var sm = smooth(seg, 3), id = 'n63_' + (nWin++);
        // độ dài, điểm giữa, 41 điểm mẫu tính bằng tay trên chính dãy điểm (không gọi getPointAtLength — trên iPhone hàm này
        // rất chậm, gọi hàng chục nghìn lần lúc mở làm bản đồ đứng; anh Kha 27/11 "bản đồ bị đứng luôn")
        var P = sm.map(function (q) { return [px(q[0]), py(q[1])]; }), ac = [0];
        for (var j2 = 1; j2 < P.length; j2++) ac.push(ac[j2 - 1] + Math.hypot(P[j2][0] - P[j2 - 1][0], P[j2][1] - P[j2 - 1][1]));
        var L = ac[ac.length - 1];
        function diem(d) {
          var lo2 = 0, hi2 = ac.length - 1;
          while (hi2 - lo2 > 1) { var mi = (lo2 + hi2) >> 1; if (ac[mi] < d) lo2 = mi; else hi2 = mi; }
          var k2 = ac[hi2] - ac[lo2] || 1, f = (d - ac[lo2]) / k2;
          return [P[lo2][0] + (P[hi2][0] - P[lo2][0]) * f, P[lo2][1] + (P[hi2][1] - P[lo2][1]) * f];
        }
        var nguoc = diem(L * 0.6)[0] < diem(L * 0.4)[0];
        if (nguoc) { sm = sm.slice().reverse(); P = P.slice().reverse(); ac = ac.map(function (v) { return L - v; }).reverse(); }
        var pe = el('path', { id: id, d: lineOf(sm) }); defs.appendChild(pe);
        var t = el('text', { 'class': 'lbl road-name ten-1963', dy: '0.35em', 'font-size': '0.88em', hidden: '' });
        t.appendChild(el('textPath', { href: '#' + id, startOffset: '50%' }, ten));
        roadLabels.appendChild(t);
        var mm = diem(L / 2), m = { x: mm[0], y: mm[1] }, mau = [];
        for (var u = 0; u <= 40; u++) mau.push(diem(L * u / 40));
        roadLbl.push({ el: t, pe: pe, len: L, x: m.x, y: m.y, n: ten.length * 0.88, ten: ten, minZ: /^(Đại lộ|Công trường)/.test(r.ten) ? 1.6 : 2.5, rank: /^(Đại lộ|Công trường)/.test(r.ten) ? 1 : 2, mau: mau });
      });
    });
    // tên ấp, khu, hồ, rừng in trên bản đồ (chép tay) + quảng trường trong bảng chỉ dẫn
    var CLS = { ap: 'ap63', ho: 'sea', rung: 'rung63-ten' }, MINZ = { ap: 0, ho: 1.2, rung: 1.8 };
    (data.dia_danh || []).concat(data.diem || []).forEach(function (p) {
      var c = CLS[p.loai], mid = !!c;
      var t = el('text', { x: px(p.lon), y: py(p.lat), 'class': 'lbl ' + (c || 'diem-1963'), hidden: '' }, mid ? p.ten : '◆ ' + p.ten);
      labels.appendChild(t);
      pointLbl.push({ el: t, x: px(p.lon), y: py(p.lat), n: p.ten.length + 2, minZ: p.loai in MINZ ? MINZ[p.loai] : 2.5, mid: mid });
    });
    // điểm cao độ in trên bản đồ (mét so với mực biển) — chỉ hiện khi phóng gần
    (data.do_cao || []).forEach(function (p) {
      var t = el('text', { x: px(p.lon), y: py(p.lat), 'class': 'lbl cao63', hidden: '' }, '• ' + p.m);
      labels.appendChild(t);
      pointLbl.push({ el: t, x: px(p.lon), y: py(p.lat), n: p.m.length + 2, minZ: 5.5, mid: false });
    });
    // 109 công trình đánh số in ở lề bản đồ (chợ, nhà thờ, chùa, trường, dinh, ga…): dấu + tên tiếng Việt in trên bản đồ
    var DAU = { tho: '✝', chua: '卍', truong: '▲', dinh: '★', cho: '■', ga: '■', benh: '✚', choi: '●', cong: '●', thuong: '●' };
    var CHUNG = { 'Trường Học': 1, 'Miếu': 1, 'Nhà Thờ': 1, 'Chùa': 1, 'Nhà Máy Nước': 1 };
    var gct = el('g', { 'class': 'ct63' }); labels.appendChild(gct);
    var dd = {};
    // TẠM ẨN biểu tượng địa điểm (anh Kha 27/11: "tạm thời bỏ các biểu tượng ra"); bật lại: BIEU_TUONG_63 = true
    if (BIEU_TUONG_63) ((cache.dd63 && cache.dd63.dia_diem) || []).forEach(function (x) { dd[x.so] = x; });
    // mốc lớn: chợ, nhà thờ lớn, 3 dinh, ga, Palace, Võ Bị, Đại học, sân cù
    var HANG1 = { 6: 1, 44: 1, 24: 1, 25: 1, 26: 1, 105: 1, 3: 1, 84: 1, 81: 1, 52: 1 };
    pins = []; var pinLayer = el('g', {});
    // vị trí: tâm khung khuôn viên nếu có (đúng chỗ), không thì tâm ô lưới 100 m của bảng chỉ dẫn
    var tamKV = {};
    (data.khuon_vien || []).forEach(function (k) {
      var sx = 0, sy = 0; k.pts.forEach(function (p) { sx += p[0]; sy += p[1]; });
      tamKV[k.so] = [sx / k.pts.length, sy / k.pts.length];
    });
    var THU = [6, 44, 105, 52, 24, 25, 26, 3, 84, 81];
    (data.cong_trinh || []).forEach(function (c) {
      var x = dd[c.so];
      if (!x) return;
      var lon = tamKV[c.so] ? tamKV[c.so][0] : c.lon, lat = tamKV[c.so] ? tamKV[c.so][1] : c.lat;
      // tên hiện: ba "Dinh Tổng Thống" ghi thêm Dinh I / II / III cho khỏi trùng
      var ten = c.ten, m = x.nay && x.nay.ten && x.nay.ten.match(/^Dinh (I{1,3})\b/);
      if (m) ten = 'Dinh ' + m[1];
      var g = el('g', { 'class': 'pin dd63', transform: 'translate(' + px(lon).toFixed(5) + ' ' + py(lat).toFixed(5) + ')' });
      var inner = el('g', { 'data-ct': c.so });
      inner._x = px(lon); inner._y = py(lat); inner._n = ten.length;
      // hạng: 1 = mốc lớn ai cũng biết (hiện từ xa), 2 = có hình, 3 = chấm theo loại (chỉ khi phóng gần)
      inner._hang = HANG1[c.so] ? 1 : x.hinh ? 2 : 3;
      inner._thu = THU.indexOf(c.so) < 0 ? 99 : THU.indexOf(c.so);
      inner._r = x.hinh ? 15 : 8; inner._hinh = !!x.hinh;
      if (x.hinh) {
        inner.appendChild(el('image', { href: 'assets/vn/moc_' + x.hinh + '.webp', x: -15, y: -27, width: 30, height: 26.4, 'class': 'dd63-hinh', 'data-ct': c.so }));
      } else {
        inner.appendChild(el('circle', { cx: 0, cy: -8, r: 7, 'class': 'dd63-tron n-' + c.nhom, 'data-ct': c.so }));
        inner.appendChild(el('text', { x: 0, y: -8, 'class': 'dd63-dau', 'data-ct': c.so }, DAU[c.nhom]));
      }
      inner.appendChild(el('text', { x: 14, y: -14, 'class': 'pin-label dd63-ten', 'data-ct': c.so, hidden: '' }, ten));
      g.appendChild(inner); pinLayer.appendChild(g); pins.push(inner);
      c._co = 1;
    });
    (data.cong_trinh || []).forEach(function (c) {
      if (c._co || !BIEU_TUONG_63) return;
      var t = el('text', { x: px(c.lon), y: py(c.lat), 'class': 'lbl ct63-ten n-' + c.nhom + (CHUNG[c.ten] ? ' chung63' : ''), hidden: '' }, DAU[c.nhom] + ' ' + c.ten);
      gct.appendChild(t);
      var lon = { dinh: 1, cho: 1, ga: 1 }[c.nhom] || c.ten === 'Nhà Thờ Lớn' || c.ten === 'Sân Cù';
      pointLbl.push({ el: t, x: px(c.lon), y: py(c.lat), n: c.ten.length + 2, minZ: lon ? 1.6 : CHUNG[c.ten] ? 9 : 4.8, mid: false, cuoi: !!CHUNG[c.ten] });
    });
    pinsRoot.textContent = ''; pinsRoot.appendChild(pinLayer);
    bounds = { minX: px(k[0]), maxX: px(k[2]), minY: py(k[3]), maxY: py(k[1]) };
    fitAll();
    var mo = layer.mo || [108.432, 11.927, 108.45, 11.957];   // Đà Lạt: mở vào trung tâm quanh Hồ Xuân Hương
    zoomTo({ minX: px(mo[0]), maxX: px(mo[2]), minY: py(mo[3]), maxY: py(mo[1]) });
  }
  // tìm tên đường: gõ tên năm 1963 hoặc tên nay → chạy tới, tô sáng đúng các đoạn
  function boDau(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); }
  // khớp từ đầu một chữ ("cho" ≠ "school"); gõ có dấu thì so có dấu ("dinh" ra cả Đinh, "dinh" có dấu chỉ ra Dinh)
  var coDau = false;
  function khop(chu, q) { var c = coDau ? (chu || '').normalize('NFC').toLowerCase() : boDau(chu || ''); return (' ' + c).indexOf(' ' + q) >= 0; }
  // Bộ gõ tiếng Việt trên điện thoại (anh Kha 27/11 "gõ minh mạng nhấn vô ko được"): chữ đang gõ chưa "chốt", chạm vào kết quả
  // thì bàn phím chốt chữ → lại phát sự kiện gõ → danh sách bị dựng lại đúng lúc chạm, cú chạm rơi vào nút cũ đã mất.
  // Nên: chữ tìm không đổi thì giữ nguyên danh sách; chuẩn hoá dấu (NFC) vì có bộ gõ ra dấu rời (a + dấu nặng).
  var timTruoc = null;
  function timDuong() {
    var raw = tim63.value.normalize('NFC').trim().toLowerCase();
    coDau = boDau(raw) !== raw;
    var q = coDau ? raw : boDau(raw);
    if (q === timTruoc && !timKq.hidden) return;
    timTruoc = q;
    timKq.textContent = '';
    if (q.length < 2 || !data || !layer.y1963) { timKq.hidden = true; timTruoc = null; return; }
    var seen = {}, kq = [];
    data.ten_duong.forEach(function (r) {
      if (seen[r.ten]) return;
      if (khop(r.ten, q) || khop(r.nay, q)) { seen[r.ten] = 1; kq.push(r); }
    });
    (data.cong_trinh || []).forEach(function (c) {
      if (khop(c.ten, q) || khop(c.anh, q)) kq.push({ ct: c });
    });
    kq.slice(0, 8).forEach(function (r) {
      var b = document.createElement('button');
      b.type = 'button';
      if (r.ct) {
        b.innerHTML = '<b>' + esc(r.ct.ten) + '</b><span>số ' + r.ct.so + ' trên bản đồ 1963</span>';
        b.addEventListener('click', function () { denDiem(r.ct); });
      } else {
        b.innerHTML = '<b>' + esc(r.ten) + '</b><span>nay: ' + esc(r.nay || '—') + '</span>';
        b.addEventListener('click', function () { denDuong(r.ten); });
      }
      timKq.appendChild(b);
    });
    if (!kq.length) timKq.innerHTML = '<p>Không có tên này trên bản đồ 1963 (hoặc em chưa dò được).</p>';
    timKq.hidden = false;
  }
  function denDiem(c) {
    var hl = document.getElementById('hl63'); hl.textContent = '';
    hl.appendChild(el('circle', { cx: px(c.lon), cy: py(c.lat), r: 0.0006 * K, 'class': 'hl63-diem' }));
    tim63.value = c.ten; hl._ten = c.ten; timXoa.hidden = false;
    timKq.hidden = true; timTruoc = null; tim63.blur();
    var pad = 0.004 * K, x = px(c.lon), y = py(c.lat);
    zoomTo({ minX: x - pad, maxX: x + pad, minY: y - pad, maxY: y + pad });
  }
  function denDuong(ten) {
    var hl = document.getElementById('hl63'), b = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }, d = '';
    data.ten_duong.forEach(function (r) {
      if (r.ten !== ten) return;
      d += congOf(r.pts);
      r.pts.forEach(function (p) {
        var x = px(p[0]), y = py(p[1]);
        b.minX = Math.min(b.minX, x); b.maxX = Math.max(b.maxX, x); b.minY = Math.min(b.minY, y); b.maxY = Math.max(b.maxY, y);
      });
    });
    // tô cho thấy rõ (anh Kha 27/11 "chuyển tới ko thấy rõ rệt"): quầng nhấp nháy + viền trắng + nét cam đậm
    hl.textContent = '';
    hl.appendChild(el('path', { d: d, 'class': 'hl-quang' }));
    hl.appendChild(el('path', { d: d, 'class': 'hl-vien' }));
    hl.appendChild(el('path', { d: d, 'class': 'hl-net' }));
    tim63.value = ten; timTruoc = null; hl._ten = ten; timXoa.hidden = false;       // ô tìm ghi đủ tên đã chọn
    timKq.hidden = true; timTruoc = null; tim63.blur();
    var pad = 0.003 * K;
    zoomTo({ minX: b.minX - pad, maxX: b.maxX + pad, minY: b.minY - pad, maxY: b.maxY + pad });
  }
  // thôi tìm (anh Kha 27/11 "nhấn ko kiếm nữa vẫn hiện đỏ"): nút × xoá chữ + bỏ tô; xoá hết chữ hoặc gõ tên khác cũng bỏ tô
  var timXoa = document.getElementById('timXoa');
  function boTo() {
    var hl = document.getElementById('hl63'); if (hl) hl.textContent = '';
    timXoa.hidden = !tim63.value;
  }
  timXoa.addEventListener('click', function () { tim63.value = ''; timKq.hidden = true; timTruoc = null; boTo(); });
  tim63.addEventListener('input', function () {
    var hl = document.getElementById('hl63');
    if (hl && hl.childNodes.length && tim63.value !== hl._ten) boTo();
    timXoa.hidden = !tim63.value;
  });
  tim63.addEventListener('input', timDuong);
  tim63.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var f = timKq.querySelector('button'); if (f) f.click(); } });

  function draw() {
    land.textContent = '';
    labels.textContent = '';
    pinsRoot.textContent = '';
    pins = []; roadLbl = []; pointLbl = []; mocs = [];
    if (layer.y1963) return draw1963();
    if (layer.kind === 'duong') return drawStreets();
    var top = [];
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    var lonMax = layer.lonMax || 999;
    // nước láng giềng vẽ mờ dưới cùng, để đất nước bạn không bị tô màu biển
    if (cache.ngoai) {
      cache.ngoai.nuoc.forEach(function (n) {
        land.appendChild(el('path', { d: pathOf(n.hinh, 2), 'class': 'prov ngoai' }));
        labels.appendChild(el('text', { x: px(n.nhan[0]).toFixed(1), y: py(n.nhan[1]).toFixed(1), 'class': 'lbl ngoai-name', 'data-min': 0 }, n.ten));
      });
    }
    if (layer.context && cache[layer.context.layer]) {
      var ctx = cache[layer.context.layer];
      ctx[LAYERS[layer.context.layer].list].forEach(function (t) {
        if (t.ma === layer.context.skip) return;
        land.appendChild(el('path', { d: pathOf(t.hinh), 'class': 'prov ctx' }));
        labels.appendChild(el('text', { x: px(t.nhan[0]).toFixed(1), y: py(t.nhan[1]).toFixed(1), 'class': 'lbl ctx', 'data-min': 0 }, t.ten));
      });
    }
    (layer.deco || []).forEach(function (d) {
      var g = el('g', { 'class': 'deco', transform: 'translate(' + px(d[1]).toFixed(1) + ' ' + py(d[2]).toFixed(1) + ')' });
      var inner = el('g', {});
      inner.appendChild(el('image', { href: 'assets/vn/deco_' + d[0] + '.webp', x: -15, y: -26, width: 30, height: 30 }));
      inner._x = px(d[1]); inner._y = py(d[2]); inner._deco = true;
      g.appendChild(inner); pinsRoot.appendChild(g); pins.push(inner); mocs.push(inner);
    });
    if (layer.moc || layer.mocDiem) {
      var vien = el('g', { 'class': 'bo-bien' });
      data[layer.list].forEach(function (t) { vien.appendChild(el('path', { d: pathOf(t.hinh), 'class': 'bo-hao' })); });
      data[layer.list].forEach(function (t) { vien.appendChild(el('path', { d: pathOf(t.hinh), 'class': 'bo-net' })); });
      land.appendChild(vien);
    }
    data[layer.list].forEach(function (t, i) {
      var c = layer.cls(t);
      // tầng tỉnh: mỗi xã/phường một màu nhạt, hai nơi sát nhau không trùng màu (tools/to_mau.py)
      land.appendChild(el('path', { d: pathOf(t.hinh), 'class': 'prov' + (c ? ' ' + c : '') + (t.mau != null ? ' m' + t.mau : ''), 'data-i': i }));
      t.hinh.forEach(function (pl) {
        pl[0].forEach(function (q) {
          var x = px(q[0]), y = py(q[1]);
          if (x < minX) minX = x; if (x > maxX && q[0] <= lonMax) maxX = x;
          if (y < minY) minY = y; if (y > maxY) maxY = y;
        });
      });
      if (layer.moc && layer.moc[t.ma]) {
        var g = el('g', { 'class': 'moc' + (c === 'open' ? ' mo' : ''), transform: 'translate(' + px(t.nhan[0]).toFixed(1) + ' ' + py(t.nhan[1]).toFixed(1) + ')' });
        var inner = el('g', { 'data-i': i });
        var sz = c === 'open' ? 54 : 40;
        if (c === 'open') inner.appendChild(el('image', { href: 'assets/vn/bd_ghim_tinh_mo.webp', x: sz * 0.18, y: -sz * 0.8 - 10, width: 22, height: 22, 'data-i': i }));
        inner.appendChild(el('image', { href: 'assets/vn/moc_' + layer.moc[t.ma] + '.webp', x: -sz / 2, y: -sz * 0.8, width: sz, height: sz * 132 / 150, 'data-i': i }));
        inner.appendChild(el('text', { x: 0, y: sz * 0.32 + 8, 'class': 'moc-ten', 'data-i': i }, layer.label(t)));
        g.appendChild(inner); pinsRoot.appendChild(g); pins.push(inner);
        // chữ tên dự phòng: hiện khi mốc bị ẩn vì chồng lên mốc khác
        var du = el('text', { x: px(t.nhan[0]).toFixed(1), y: py(t.nhan[1]).toFixed(1), 'class': 'lbl' + (c === 'open' ? ' open' : ''), 'data-min': 0 }, layer.label(t));
        labels.appendChild(du);
        inner._x = px(t.nhan[0]); inner._y = py(t.nhan[1]); inner._sz = sz; inner._du = du;
        inner._uu = c === 'open' ? 0 : (t.loai === 'Thành phố' ? 1 : 2);
        inner._thu_do = t.ma === '01';
        mocs.push(inner);
        return;
      }
      var lb = el('text', {
        x: px(t.nhan[0]).toFixed(1), y: py(t.nhan[1]).toFixed(1),
        'class': 'lbl' + (c === 'open' ? ' open' : ''), 'data-min': layer.minZoom(t)
      }, layer.label(t));
      if (c === 'open') top.push(lb); else labels.appendChild(lb);
    });
    (layer.mocDiem || []).forEach(function (m) {
      var i = -1;
      data[layer.list].forEach(function (t, k) { if (t.ma === m[4]) i = k; });
      var g = el('g', { 'class': 'moc', transform: 'translate(' + px(m[1]).toFixed(1) + ' ' + py(m[2]).toFixed(1) + ')' });
      var inner = el('g', { 'data-i': i }), sz = 40;
      inner.appendChild(el('image', { href: 'assets/vn/moc_' + m[0] + '.webp', x: -sz / 2, y: -sz * 0.8, width: sz, height: sz * 132 / 150, 'data-i': i }));
      inner.appendChild(el('text', { x: 0, y: sz * 0.32 + 8, 'class': 'moc-ten', 'data-i': i }, m[3]));
      g.appendChild(inner); pinsRoot.appendChild(g); pins.push(inner);
      var du = el('text', { x: px(m[1]).toFixed(1), y: py(m[2]).toFixed(1), 'class': 'lbl', 'data-min': 99 }, '');   // không có chữ dự phòng
      inner._x = px(m[1]); inner._y = py(m[2]); inner._sz = sz; inner._du = du; inner._uu = m[5] ? 2 : 1;
      inner._zmin = m[5] || 0; inner._zmax = m[6] || 1e9;
      mocs.push(inner);
    });
    (layer.extraLabels || []).forEach(function (q) {
      var a = { x: px(q[1]), y: py(q[2]), 'class': 'lbl ' + (q[5] || 'sea'), 'data-min': q[3] || 0 };
      if (q[4]) a['data-max'] = q[4];
      top.push(el('text', a, q[0]));
    });
    top.forEach(function (lb) { labels.appendChild(lb); });  // tên nổi bật nằm trên cùng
    bounds = { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    fitAll();
  }

  // Mốc tỉnh: ưu tiên tỉnh có bản đồ phố, rồi thành phố trực thuộc trung ương; mốc chồng lên mốc khác thì ẩn (phóng to mới hiện)
  var mocs = [];
  function layoutMoc() {
    if (!mocs.length) return;
    // phóng tới đâu, mốc gần giữa màn hình hiện trước; tối đa MOC_TOI_DA mốc một lúc (tỉnh có bản đồ phố luôn được ưu tiên)
    var r = khungSvg(), boxes = [], cx = r.width / 2, cy = r.height / 2, dem = 0, MOC_TOI_DA = 8;
    function kc(g) { return Math.hypot(g._x * view.s + view.x - cx, g._y * view.s + view.y - cy) * (g._thu_do ? 0.35 : g._uu === 1 ? 0.6 : 1); }   // thủ đô, rồi thành phố trực thuộc TW được ưu tiên hơn
    function hangMoc(g) { return g._deco ? 1e9 : (g._uu === 0 ? -1e9 : kc(g)); }
    mocs.slice().sort(function (a, b) { return hangMoc(a) - hangMoc(b); }).forEach(function (g) {
      var sx = g._x * view.s + view.x, sy = g._y * view.s + view.y, h = g._sz || 30;
      if (g._deco) {
        var bd = { x0: sx - 16, x1: sx + 16, y0: sy - 27, y1: sy + 5 };
        var hien = sx > 10 && sx < r.width - 10 && sy > 70 && sy < r.height - 130 && !boxes.some(function (o) { return bd.x1 > o.x0 && bd.x0 < o.x1 && bd.y1 > o.y0 && bd.y0 < o.y1; });
        if (hien) { boxes.push(bd); g.parentNode.removeAttribute('display'); } else g.parentNode.setAttribute('display', 'none');
        return;
      }
      var b = { x0: sx - h * 0.62, x1: sx + h * 0.62, y0: sy - h * 0.85, y1: sy + h * 0.32 + 14 };
      var z = view.s / fit.s;
      var ok = dem < MOC_TOI_DA && z >= (g._zmin || 0) && z < (g._zmax || 1e9) && sx > h * 0.4 && sx < r.width - h * 0.4 && sy > 70 && sy < r.height - 130 &&   // chừa ô chú thích ở đáy
        
        !boxes.some(function (o) { return b.x1 > o.x0 && b.x0 < o.x1 && b.y1 > o.y0 && b.y0 < o.y1; });
      if (ok) { dem++; boxes.push(b); g.parentNode.removeAttribute('display'); g._du.setAttribute('hidden', ''); }
      else { g.parentNode.setAttribute('display', 'none'); g._du.removeAttribute('hidden'); }
    });
    // chữ tên tỉnh: không đè mốc, không đè chữ khác; ưu tiên tỉnh có bản đồ phố, rồi thành phố (★), rồi tỉnh thường; tên biển, nước bạn giữ nguyên
    var sr = khungSvg();
    var ds = Array.prototype.filter.call(labels.childNodes, function (t) { return !t.hasAttribute('hidden') && !/\b(sea|ngoai-name)\b/.test(t.getAttribute('class')); });
    function hang(t) { return /\bopen\b/.test(t.getAttribute('class')) ? 0 : (t.textContent.charAt(0) === '★' ? 1 : 2); }
    ds.sort(function (a, b) { return hang(a) - hang(b); }).forEach(function (t) {
      var q = t.getBoundingClientRect();
      var b = { x0: q.left - sr.left, x1: q.right - sr.left, y0: q.top - sr.top, y1: q.bottom - sr.top };
      if (boxes.some(function (o) { return b.x1 > o.x0 && b.x0 < o.x1 && b.y1 > o.y0 && b.y0 < o.y1; })) t.setAttribute('hidden', '');
      else boxes.push(b);
    });
  }

  function fitAll() {
    var r = khungSvg();
    var top = 56, bottom = 20, side = 12;
    var w = r.width - side * 2, h = r.height - top - bottom;
    var bw = bounds.maxX - bounds.minX, bh = bounds.maxY - bounds.minY;
    var s = Math.min(w / bw, h / bh);
    fit = { s: s, x: side + (w - bw * s) / 2 - bounds.minX * s, y: top + (h - bh * s) / 2 - bounds.minY * s };
    view = { s: fit.s, x: fit.x, y: fit.y };
    apply();
  }

  // Đà Lạt 1963 (góp ý Antigravity 27/11): 4 mức nét ở z 2,2 / 4,8 / 9 (thu nhỏ lùi 10% mới đổi, khỏi nhấp nháy);
  // bề rộng đường nội suy mượt theo log2 z giữa các mốc (lòng / tổng có viền, điểm màn hình).
  var MUC63 = [2.2, 4.8, 9], mucCu = -1, rongCu = {};
  var RONG63 = { z: [1.5, 3.3, 6.5, 12], f1: [2.6, 4.4, 7.2, 11], c1: [4, 6, 9.2, 13.4], f2: [1.8, 3.2, 5.4, 8.2], c2: [3, 4.6, 7.2, 10.4],
    f3: [0, 1.8, 3.6, 5.8], c3: [1, 3, 5.2, 7.6], f4: [0, 0, 2, 3.6], c4: [0, 1.1, 3.2, 5] };
  function datMuc63(z) {
    var m = 0; while (m < 3 && z >= MUC63[m]) m++;
    if (mucCu > 0 && m < mucCu && z >= MUC63[mucCu - 1] * 0.9) m = mucCu;      // vùng trễ khi thu nhỏ
    if (m !== mucCu || svg.getAttribute('data-zm') !== String(m)) svg.setAttribute('data-zm', m);
    mucCu = m;
    var nha = z >= 6.5; if (nha !== svg.hasAttribute('data-nha')) { if (nha) svg.setAttribute('data-nha', ''); else svg.removeAttribute('data-nha'); }
    var L = Math.log2(z), Z = RONG63.z.map(Math.log2), i = 0;
    while (i < Z.length - 2 && L > Z[i + 1]) i++;
    var t = Math.max(0, Math.min(1, (L - Z[i]) / (Z[i + 1] - Z[i])));
    ['f1', 'c1', 'f2', 'c2', 'f3', 'c3', 'f4', 'c4'].forEach(function (k) {
      // làm tròn 0,25 điểm và chỉ ghi khi đổi — mỗi lần ghi bắt trình duyệt tính lại kiểu cho hàng nghìn nét
      var v = (Math.round((RONG63[k][i] + (RONG63[k][i + 1] - RONG63[k][i]) * t) * 4) / 4).toFixed(2) + 'px';
      if (rongCu[k] !== v) { rongCu[k] = v; svg.style.setProperty('--' + k, v); }
    });
  }
  // Đà Lạt 1963 (anh Kha 27/11 "zoom ko mượt như bản đồ hôm nay"): bản 1963 có hơn 12 nghìn khối nhà, rừng, vườn, vòng đồi —
  // vẽ lại cả tờ mỗi lần ngón tay nhích thì giật. TRONG LÚC kéo / phóng chỉ co giãn tấm hình đã vẽ (CSS transform, máy làm bằng
  // bộ xử lý đồ hoạ, nhẹ như phóng ảnh); dừng tay 0,2 giây mới vẽ lại sắc nét, đổi mức, đặt chữ. Cách các bản đồ lớn vẫn làm.
  // khung bản đồ trên màn hình: đo ở #map (không bị co giãn tạm thời như #svg lúc kéo / phóng)
  function khungSvg() { return svg.parentNode.getBoundingClientRect(); }
  var ve63 = null, lop63 = null;                // ve63: khung nhìn đã vẽ thật vào SVG
  // Sài Gòn 1961 (anh Kha 27/11 "chưa coi được"): 57 tranh nét bung ra ~550 MB, điện thoại không mở nổi. Mỗi tranh có 3 cỡ
  // (nho = 1/4, vua = 1/2, gốc); nhìn xa dùng cỡ nhỏ, chỉ ô đang trong màn hình và đủ to mới đổi sang cỡ nét. Ô ra khỏi màn hình về cỡ nhỏ.
  var NEN_GOC = true;                          // bản xem thử trên Artifact đặt false (giới hạn 16 MB), chỉ dùng cỡ nhỏ / vừa
  function nenSac() {
    var b = khungSvg(), dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    var vx1 = -view.x / view.s, vy1 = -view.y / view.s, vx2 = vx1 + b.width / view.s, vy2 = vy1 + b.height / view.s;
    var ds = land.querySelectorAll('.nen61');
    for (var i = 0; i < ds.length; i++) {
      var n = ds[i]._nen; if (!n) continue;
      var thay = n.x2 > vx1 && n.x1 < vx2 && n.y2 > vy1 && n.y1 < vy2;
      var dp = n.w * view.s * dpr, m = !thay || dp < 500 ? 'nho' : dp < 1000 || !NEN_GOC ? 'vua' : 'goc';
      if (m !== n.m) { n.m = m; ds[i].setAttribute('href', m === 'goc' ? n.f : n.f.replace('sg1961/', 'sg1961/' + m + '/')); }
    }
  }
  function chot63() {
    clearTimeout(apply._ngung);
    if (layer && layer.sg) nenSac();
    ve63 = { s: view.s, x: view.x, y: view.y }; lop63 = layer;
    world.setAttribute('transform', 'translate(' + view.x.toFixed(2) + ' ' + view.y.toFixed(2) + ') scale(' + view.s.toFixed(5) + ')');
    svg.style.transform = '';
    datMuc63(view.s / fit.s);
    labels.setAttribute('font-size', (11 / view.s).toFixed(4));
    labels.setAttribute('stroke-width', (3 / view.s).toFixed(4));
    for (var p = 0; p < pins.length; p++) pins[p].setAttribute('transform', 'scale(' + (1 / view.s).toFixed(6) + ')');
    layout();
  }
  function apply() {
    var z = view.s / fit.s;                       // 1 = vừa khung
    if (layer && layer.y1963) {
      if (lop63 !== layer || !ve63) { chot63(); return; }
      var k = view.s / ve63.s, tx = view.x - ve63.x * k, ty = view.y - ve63.y * k;
      svg.style.transformOrigin = '0 0';
      svg.style.transform = 'matrix(' + k.toFixed(5) + ',0,0,' + k.toFixed(5) + ',' + tx.toFixed(1) + ',' + ty.toFixed(1) + ')';
      clearTimeout(apply._ngung);
      apply._ngung = setTimeout(chot63, 200);
      return;
    }
    if (svg.style.transform) svg.style.transform = '';
    lop63 = null;
    world.setAttribute('transform', 'translate(' + view.x.toFixed(2) + ' ' + view.y.toFixed(2) + ') scale(' + view.s.toFixed(5) + ')');
    labels.setAttribute('font-size', (11 / view.s).toFixed(4));
    labels.setAttribute('stroke-width', (3 / view.s).toFixed(4));
    for (var p = 0; p < pins.length; p++) pins[p].setAttribute('transform', 'scale(' + (1 / view.s).toFixed(6) + ')');
    queueLayout();
    var list = labels.childNodes;
    for (var i = 0; i < list.length; i++) {
      if (list[i].getAttribute('data-min') === null) continue;
      var mx = list[i].getAttribute('data-max');
      var hide = z < Number(list[i].getAttribute('data-min')) || (mx && z >= Number(mx));
      if (hide) list[i].setAttribute('hidden', ''); else list[i].removeAttribute('hidden');
    }
    layoutMoc();
  }

  function zoomAt(f, cx, cy) {
    var ns = Math.max(fit.s * 0.8, Math.min(fit.s * (layer && layer.y1963 ? 20 : layer && layer.kind === 'duong' ? 120 : 60), view.s * f));
    f = ns / view.s;
    view.x = cx - (cx - view.x) * f;
    view.y = cy - (cy - view.y) * f;
    view.s = ns;
    apply();
  }

  /* ---------- kéo, phóng, bấm ---------- */
  var pts = {};
  var start = null;
  var pinch = null;

  function count() { return Object.keys(pts).length; }
  function mid() {
    var k = Object.keys(pts), a = pts[k[0]], b = pts[k[1]];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, d: Math.hypot(a.x - b.x, a.y - b.y) };
  }

  svg.addEventListener('pointerdown', function (e) {
    pts[e.pointerId] = { x: e.clientX, y: e.clientY };
    try { svg.setPointerCapture(e.pointerId); } catch (_) {}
    if (count() === 1) start = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, moved: false, target: e.target };
    if (count() === 2) { pinch = mid(); if (start) start.moved = true; }
  });
  svg.addEventListener('pointermove', function (e) {
    if (!pts[e.pointerId]) return;
    pts[e.pointerId] = { x: e.clientX, y: e.clientY };
    if (count() === 2 && pinch) {
      var m = mid();
      view.x += m.x - pinch.x; view.y += m.y - pinch.y;
      if (pinch.d > 0) zoomAt(m.d / pinch.d, m.x, m.y); else apply();
      pinch = m;
    } else if (count() === 1 && start) {
      if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > TAP_SLOP) start.moved = true;
      view.x += e.clientX - start.lx; view.y += e.clientY - start.ly;
      start.lx = e.clientX; start.ly = e.clientY;
      apply();
    }
  });
  function up(e) {
    if (!pts[e.pointerId]) return;
    delete pts[e.pointerId];
    if (count() < 2) pinch = null;
    if (count() === 1) {
      var k = Object.keys(pts)[0];
      start = { x: pts[k].x, y: pts[k].y, lx: pts[k].x, ly: pts[k].y, moved: true, target: null };
    }
    if (count() === 0 && start) {
      if (!start.moved && e.type === 'pointerup') {
        var r0 = khungSvg(), tx = start.x - r0.left, ty = start.y - r0.top;
        var gan = layer && layer.kind === 'duong' ? pins.filter(function (g) {
          if (g._fixed) return false;
          var sx = g._x * view.s + view.x, sy = g._y * view.s + view.y - 17;
          return Math.hypot(sx - tx, sy - ty) < 26;
        }) : [];
        if (gan.length > 1 && view.s < fit.s * 12) { closeSheet(); zoomAt(2.6, tx, ty); }   // nhiều ghim chồng nhau: phóng to cho tách ra, không mở bừa
        else if (gan.length > 1) {   // đã phóng gần mà vẫn chồng (2 phố gần như cùng một điểm): mở ghim gần ngón tay nhất
          gan.sort(function (a, b) { return Math.hypot(a._x * view.s + view.x - tx, a._y * view.s + view.y - 17 - ty) - Math.hypot(b._x * view.s + view.x - tx, b._y * view.s + view.y - 17 - ty); });
          tap(gan[0]);
        } else tap(start.target);
      }
      start = null;
    }
  }
  svg.addEventListener('pointerup', up);
  svg.addEventListener('pointercancel', up);
  svg.addEventListener('wheel', function (e) {
    e.preventDefault();
    zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY);
  }, { passive: false });

  function centerZoom(f) {
    var r = khungSvg();
    zoomAt(f, r.width / 2, r.height / 2);
  }
  document.getElementById('zin').addEventListener('click', function () { centerZoom(1.6); });
  document.getElementById('zout').addEventListener('click', function () { centerZoom(1 / 1.6); });
  document.getElementById('zfit').addEventListener('click', fitAll);
  window.addEventListener('resize', function () { if (bounds) fitAll(); });

  /* ---------- thẻ thông tin ---------- */
  function tap(target) {
    if (layer && layer.y1963) {
      var so = target && target.getAttribute && target.getAttribute('data-ct');
      if (so) moThe63(Number(so)); else closeSheet();
      return;
    }
    var i = target && target.getAttribute && target.getAttribute('data-i');
    if (i === null || i === undefined || i === '') { closeSheet(); return; }
    // bấm vào hình mốc tỉnh → coi như bấm vào tỉnh đó
    if (layer.kind !== 'duong' && target.closest && target.closest('.moc')) target = land.querySelector('path.prov[data-i="' + i + '"]') || target;
    if (picked) picked.classList.remove('picked');
    if (layer.kind !== 'duong') {
      picked = target; picked.classList.add('picked');
      land.appendChild(target);   // đưa lên trên để viền không bị che
    }
    if (layer.kind === 'duong') {          // ghim phố → mở trang phố
      var ph = phoById(((cache.pho && cache.pho.pho) || data.pho)[Number(i)].id);
      if (ph) { location.hash = 'pho-' + ph.slug; return; }
    }
    sheetBody.innerHTML = layer.card(data[layer.kind === 'duong' ? 'pho' : layer.list][Number(i)]);
    var btn = sheetBody.querySelector('[data-go]');
    if (btn) btn.addEventListener('click', function () { location.hash = btn.getAttribute('data-go'); });
    srcSheet.hidden = true;
    sheet.hidden = false;
  }

  // Thẻ địa điểm trên bản đồ 1963: năm 1963 là gì · nay là gì · qua các năm (chạm năm mới mở chi tiết + nguồn)
  function moThe63(so) {
    var x = ((cache.dd63 && cache.dd63.dia_diem) || []).filter(function (d) { return d.so === so; })[0];
    if (!x) return;
    function nguon(list, one) {
      return '<span class="src">' + (one ? 'Mới có 1 nguồn: ' : 'Nguồn: ') + list.map(function (n) {
        return '<a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.trang) + '</a>';
      }).join(' · ') + '</span>';
    }
    var h = the(x.hinh ? 'assets/vn/moc_' + x.hinh + '.webp' : '', x.ten_1963, 'Số ' + x.so + ' trên bản đồ năm 1963');
    h += '<section class="phan"><h3>📍 Nay</h3>';
    if (x.nay && x.nay.ten) {
      h += '<p class="nay63"><b>' + esc(x.nay.ten) + '</b>' + (x.cung_cho !== 'chắc' ? ' <i class="chua-chac" title="chưa chắc là cùng chỗ">?</i>' : '') +
        (x.nay.mo_ta ? '<br>' + esc(x.nay.mo_ta) : '') + '</p>' + (x.nay.nguon.length ? nguon(x.nay.nguon, new Set(x.nay.nguon.map(function (n) { return n.trang; })).size < 2) : '') +
        (x.cung_cho !== 'chắc' && x.cung_cho_ghi_chu ? '<span class="src warn">' + esc(x.cung_cho_ghi_chu) + '</span>' : '');
    } else h += '<p class="nay63">Chưa rõ nay là gì.</p>';
    h += '</section>';
    if (x.moc.length) {
      h += '<section class="phan"><h3>🕰️ Qua các năm</h3><ol class="dong-tg">' + x.moc.map(function (m) {
        // chỉ hiện năm (anh Kha 27/11: "các mốc năm ko ghi gì hết, ai cần nhấn vô sẽ thả xuống"); chạm năm → đoạn kể dài + nguồn
        return '<li><details><summary><b class="nam">' + esc(m.nam) + '</b>' + (m.mot_nguon ? ' <i class="chua-chac" title="chưa chắc">?</i>' : '') +
          // gọn như trang Hôm nay (anh Kha 27/11): một câu ngắn + nguồn; đoạn kể dài gập sau "Kể thêm"
          '</summary><p>' + esc(m.su_kien) + '</p>' +
          (m.chi_tiet && m.chi_tiet !== m.su_kien ? '<details class="ke-them"><summary>Kể thêm</summary>' +
            m.chi_tiet.split(/\n+/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</details>' : '') +
          nguon(m.nguon, m.mot_nguon) + '</details></li>';
      }).join('') + (x.nay && x.nay.ten ? '<li class="tg-nay"><b class="nam">Nay</b> <span class="tg-ngan">' + esc(x.nay.ten) + '</span></li>' : '') + '</ol></section>';
    }
    if (x.trang) h += '<button class="go lon" type="button" data-go="pho-' + esc(x.trang) + '">Xem trang hôm nay →</button>';
    sheetBody.innerHTML = h;
    var btn = sheetBody.querySelector('[data-go]');
    if (btn) btn.addEventListener('click', function () { location.hash = btn.getAttribute('data-go'); });
    srcSheet.hidden = true; sheet.hidden = false;
  }

  // Thẻ tỉnh / phường: ít chữ, nhiều hình — hình mốc Spark ở đầu, các ô biểu tượng, một nút đi tiếp
  function the(hinh, ten, phu) {
    return '<div class="the-dau">' + (hinh ? '<img src="' + esc(hinh) + '" alt="">' : '') +
      '<div><h2>' + esc(ten) + '</h2>' + (phu ? '<p class="dac-trung">' + phu + '</p>' : '') + '</div></div>';
  }
  function cardTinh(t) {
    var moc = LAYERS['viet-nam'].moc[t.ma];
    var tp = t.loai === 'Thành phố';
    var h = the(moc ? 'assets/vn/moc_' + moc + '.webp' : '', (tp ? 'Thành phố ' : 'Tỉnh ') + t.ten,
      t.da_mo ? '🟢 Có bản đồ phố' : '🔒 Bản đồ phố: sắp có');
    h += '<div class="o-bt">' + (tp ? '<span>★ Thành phố trực thuộc trung ương</span>' : '') +
      '<span>📐 ' + fmt(t.dien_tich_km2) + ' km²</span><span>🏘️ ' + fmt(t.so_xa_phuong) + ' xã, phường</span>' +
      (t.len_thanh_pho ? '<span>⬆️ Lên thành phố ' + esc(t.len_thanh_pho.ngay) + '</span>' : '') + '</div>';
    h += '<p class="nhan-nho">🧩 ' + (t.tinh_cu.length ? 'Gộp từ' : 'Giữ nguyên, không sáp nhập') + '</p>';
    if (t.tinh_cu.length) h += '<div class="o-bt gop">' + t.tinh_cu.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('<span class="cong">+</span>') + '</div>';
    if (t.da_mo) h += '<button class="go lon" type="button" data-go="lam-dong">Vào ' + esc(t.ten) + ' →</button>';
    h += '<p class="note">Địa giới mới từ 1/7/2025 (Nghị quyết 202/2025/QH15).</p>';
    return h;
  }

  function cardPhuong(p) {
    var mocs = (LAYERS['lam-dong'].mocDiem || []).filter(function (m) { return m[4] === p.ma && !m[6]; });
    var h = the(mocs.length ? 'assets/vn/moc_' + mocs[0][0] + '.webp' : '', p.loai + ' ' + p.ten,
      p.so_pho ? '🟢 ' + p.so_pho + ' nơi đã có trang' : (p.da_lat ? '🛣️ Có bản đồ đường thật' : ''));
    var cu = (p.gop_tu || '').normalize('NFC').replace(/\s*\([^)]*\)/g, '').replace(/^(các |cả )/, '').split(/,\s*|\s+và\s+|\s+và các\s+/).map(function (x) { return x.trim(); }).filter(Boolean);
    h += '<div class="o-bt"><span>📐 ' + fmt(p.dien_tich_km2, 1) + ' km²</span>' +
      mocs.slice(0, 3).map(function (m) { return '<span>' + bieuTuong(m[3]) + ' ' + esc(m[3]) + '</span>'; }).join('') + '</div>';
    if (cu.length) h += '<p class="nhan-nho">🧩 Gộp từ</p><div class="o-bt gop">' + cu.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('<span class="cong">+</span>') + '</div>';
    if (p.so_pho) h += '<div id="phoTrongPhuong" class="pho-nho"></div>';
    if (p.da_lat) h += '<button class="go lon" type="button" data-go="da-lat">Xem đường phố Đà Lạt →</button>';
    h += '<p class="note">Nghị quyết 1671/NQ-UBTVQH15, Điều 1 khoản ' + p.muc_nq + '.</p>';
    if (p.so_pho) setTimeout(function () {   // danh sách nơi đã có trang trong phường: hình đầu phố nhỏ, bấm là mở
      (cache.pho ? Promise.resolve(cache.pho) : loadJSON('data/lam-dong/da-lat/pho.json')).then(function (d) {
        cache.pho = cache.pho || d;
        var box = document.getElementById('phoTrongPhuong'); if (!box) return;
        box.innerHTML = d.pho.filter(function (x) { return x.ward === p.ten; }).map(function (x) {
          return '<a href="#pho-' + esc(x.slug) + '">' + (x.anh ? '<img src="' + esc(x.anh) + '" alt="">' : '') + '<b>' + esc(x.ten_hien || x.ten_pho) + '</b></a>';
        }).join('');
      });
    }, 0);
    return h;
  }

  function cardPho(p) {
    return '<h2>' + esc(p.ten_pho) + '</h2>' +
      '<div><span class="tag open">' + esc(p.road) + '</span> <span class="tag">' + esc('Phường ' + p.ward) + '</span></div>' +
      '<p>' + esc(p.gioi_thieu) + '</p>' +
      '<dl class="facts"><dt>Gồm</dt><dd>' + esc(p.roads) + '</dd></dl>' +
      '<button class="go" type="button" disabled>Trang phố đầy đủ (chặng 4, sắp có)</button>' +
      '<p class="note">Vị trí ghim: giữa đường ' + esc(p.road) + ' trên OpenStreetMap. Giới thiệu theo nghiên cứu phố của game Gọn Phố.</p>';
  }

  /* ---------- trang phố ---------- */
  function phoById(id) {
    var list = (cache.pho && cache.pho.pho) || [];
    for (var k = 0; k < list.length; k++) if (list[k].id === id || list[k].slug === id) return list[k];
    return null;
  }

  // Các đoạn đường của phố: đúng tên và có điểm cách ghim phố / quán dưới 2,2 km
  // (OSM có đoạn trùng tên ở chỗ khác, ví dụ một đoạn "Mai Anh Đào" ngắn ở Xuân Hương)
  function roadsOf(ph) {
    var an = [[ph.lon, ph.lat]];
    (ph.dia_diem || []).forEach(function (d) { if (d.vi_tri) an.push([d.vi_tri.lon, d.vi_tri.lat]); });
    return data.duong.filter(function (r) {
      var ds = ph.duong_hien || ph.duong;   // loại 'diem' không tô đường nào
      if (!r.ten || ds.indexOf(r.ten) < 0) return false;
      if (ph.lon == null) return true;
      return r.pts.some(function (q) {
        return an.some(function (a) { return Math.hypot((q[0] - a[0]) * 108900, (q[1] - a[1]) * 110540) < 2200; });
      });
    });
  }

  // Tô sáng các đường của phố; trả về khung bao để phóng tới
  function highlight(ph) {
    var old = document.getElementById('hl');
    if (old) old.remove();
    var g = el('g', { id: 'hl', 'class': 'hl' });
    var b = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    roadsOf(ph).forEach(function (r) {
      g.appendChild(el('path', { d: lineOf(r.pts) }));
      r.pts.forEach(function (q) {
        var x = px(q[0]), y = py(q[1]);
        b.minX = Math.min(b.minX, x); b.maxX = Math.max(b.maxX, x); b.minY = Math.min(b.minY, y); b.maxY = Math.max(b.maxY, y);
      });
    });
    var fillG = land.querySelector('.road-fill');
    land.insertBefore(g, fillG ? fillG.nextSibling : null);
    return b;
  }

  function zoomTo(b) {
    var r = khungSvg(), top = 70, pad = 40, bottom = 140;  // chừa chỗ ô chú thích phía dưới
    var w = r.width - pad * 2, h = r.height - top - pad - bottom;
    var s = Math.min(w / Math.max(b.maxX - b.minX, 0.01), h / Math.max(b.maxY - b.minY, 0.01));
    s = Math.min(s, fit.s * (layer && layer.y1963 ? 20 : 120));   // 1963: tối đa ~1 m/điểm ảnh — sâu hơn Safari iPhone dễ hết bộ nhớ
    view = { s: s, x: pad + (w - (b.maxX - b.minX) * s) / 2 - b.minX * s, y: top + pad + (h - (b.maxY - b.minY) * s) / 2 - b.minY * s };
    apply();
  }

  var phoBox = null;
  // Đánh dấu một quán: chấm vàng có tên, cỡ cố định trên màn hình
  function markPlace(d) {
    var old = document.getElementById('placeMark');
    if (old) old.remove();
    var g = el('g', { id: 'placeMark', 'class': 'pin place', transform: 'translate(' + px(d.vi_tri.lon).toFixed(4) + ' ' + py(d.vi_tri.lat).toFixed(4) + ')' });
    var inner = el('g', {});
    inner.appendChild(el('circle', { r: 9, 'class': 'place-dot' + (d.vi_tri.uoc ? ' uoc' : '') }));
    inner.appendChild(el('text', { x: 0, y: -16, 'class': 'pin-label', 'text-anchor': 'middle' }, d.ten));
    inner._x = px(d.vi_tri.lon); inner._y = py(d.vi_tri.lat); inner._n = 0; inner._fixed = true;
    g.appendChild(inner);
    pinsRoot.appendChild(g);
    pins.push(inner);
  }
  // Chuyện của phố: tên cũ, mốc năm, chuyện ngắn. Ý chỉ có 1 nguồn thì ghi rõ.
  function chuyenHtml(c) {
    // muc: 'chac' (có báo / văn bản / nghiên cứu) · 'wiki' (chỉ Wikipedia + trang du lịch) · 'blog' (chỉ trang du lịch, blog)
    var CANH = { wiki: 'Chỉ có Wikipedia và trang du lịch, chưa có báo hay văn bản', blog: 'Chỉ dựa trang du lịch, blog — chưa chắc' };
    function src(list, one, muc) {
      return '<span class="src">' + (one ? 'Mới có 1 nguồn: ' : 'Nguồn: ') + list.map(function (n) {
        return '<a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.trang) + '</a>';
      }).join(' · ') + '</span>' + (CANH[muc] ? '<span class="src warn">' + CANH[muc] + '</span>' : '');
    }
    // một dòng ngắn: câu đầu, tối đa ~70 chữ cái
    function ngan(t) {
      var a = (t || '').split(/(?<=[.;])\s|\s\(/)[0].replace(/[.;]$/, '');
      return a.length > 72 ? a.slice(0, a.lastIndexOf(' ', 70)) + '…' : a;
    }
    function dau(muc, one) { return muc === 'blog' || one ? ' <i class="chua-chac" title="chưa chắc">?</i>' : ''; }
    var h = '<section class="chuyen phan"><h3>🕰️ Lịch sử</h3>';
    if (c.ten_cu.length) {
      // chạm tên xưa mới hiện năm + nguồn (ít chữ); tên còn nghi có dấu ?
      h += '<div class="ten-xua"><span class="nhan">Tên xưa · chạm để xem năm</span>' + c.ten_cu.map(function (t, k) {
        return '<button type="button" class="chip-ten" data-tc="' + k + '">' + esc(t.ten.replace(/\s*\(.*$/, '').split(' / ')[0]) +
          (t.chua_chac || t.mot_nguon || t.muc === 'blog' ? ' <i class="chua-chac" title="chưa chắc">?</i>' : '') + '</button>';
      }).join('<span class="mui">→</span>') + '</div>' + c.ten_cu.map(function (t, k) {
        return '<div class="ten-ct" data-tc="' + k + '" hidden><b>' + esc(t.ten) + '</b>' + (t.thoi_gian ? '<span>' + esc(hoaDau(t.thoi_gian)) + '</span>' : '') +
          (t.chua_chac ? '<span class="src warn">Chưa chắc</span>' : '') + src(t.nguon, t.mot_nguon, t.muc) + '</div>';
      }).join('');
    }
    if (c.moc.length) {
      // gọn: hiện 6 mốc đầu, còn lại gập vào "Xem thêm"
      var li = c.moc.map(function (m) {
        return '<li><details><summary><b class="nam">' + esc(m.nam) + '</b>' + dau(m.muc, m.mot_nguon) + '</summary>' +
          '<p>' + esc(m.su_kien) + '</p>' + src(m.nguon, m.mot_nguon, m.muc) + '</details></li>';
      });
      h += '<ol class="dong-tg">' + li.slice(0, 6).join('') + '</ol>';
      if (li.length > 6) h += '<details class="xem-them"><summary>Xem thêm ' + (li.length - 6) + ' mốc năm</summary><ol class="dong-tg">' + li.slice(6).join('') + '</ol></details>';
    }
    if (c.chuyen.length) {
      var ct = c.chuyen.map(function (t) {
        return '<details class="mau-chuyen"><summary>📖 ' + esc(t.tieu_de) + dau(t.muc, t.mot_nguon) + '</summary><p>' + esc(t.noi_dung) + '</p>' + src(t.nguon, t.mot_nguon, t.muc) + '</details>';
      });
      h += '<div class="chuyen-the"><span class="nhan">Chuyện kể · chạm để đọc</span>' + ct.slice(0, 3).join('') +
        (ct.length > 3 ? '<details class="xem-them"><summary>Xem thêm ' + (ct.length - 3) + ' chuyện</summary><div class="chuyen-the">' + ct.slice(3).join('') + '</div></details>' : '') + '</div>';
    }
    return h + '</section>';
  }


  // Biểu tượng theo từ khoá (để đọc nhanh bằng mắt, ít chữ)
  var BT = [[/chùa|thiền viện|đình|thánh thất|lăng/i, '🛕'], [/nhà thờ/i, '⛪'], [/ga |ga$|tàu|đường sắt|hỏa xa|xe lửa/i, '🚂'],
    [/trường|đại học|lycée/i, '🏫'], [/dinh|biệt thự|khách sạn|resort|nghỉ dưỡng|villa|homestay|hostel/i, '🏛️'], [/chợ|siêu thị/i, '🛒'],
    [/hồ|suối|thác|đập/i, '🌊'], [/núi|đồi|đỉnh|thung lũng|rừng|săn mây/i, '⛰️'], [/hoa|vườn|làng hoa|nhà kính/i, '🌷'],
    [/chè|trà/i, '🍵'], [/cà phê|cafe|café|coffee/i, '☕'], [/kem|chè|bánh ngọt|tiệm bánh|dâu/i, '🍨'],
    [/lẩu|nướng|nem|gà|bò|ốc|dê|cá|cơm|phở|bún|mì|hủ tiếu|bánh căn|bánh mì|bánh ướt|bánh bèo|bánh tráng|xíu mại|cháo|ăn/i, '🍲'],
    [/bar|bia|rượu|vang/i, '🍷'], [/áo len|đặc sản|thổ cẩm|nhà sách|thuốc|thuê xe/i, '🛍️'], [/golf|quảng trường|công viên|bảo tàng|cáp treo|tuabin|điện gió|khu du lịch|vui chơi|cắm trại|leo núi/i, '🎟️']];
  // Hình Spark đợt 45 cho món, đặc sản, nghề (assets/bt/): khớp từ khoá cụ thể trước, không khớp thì dùng biểu tượng cũ
  var BT_HINH = [[/bánh căn/i, 'banh_can'], [/bánh mì|xíu mại/i, 'banh_mi_xiu_mai'], [/bánh tráng/i, 'banh_trang_nuong'],
    [/lẩu gà|lá é/i, 'lau_ga_la_e'], [/lẩu/i, 'lau_bo'], [/nem/i, 'nem_nuong'], [/gà nướng|cơm lam/i, 'ga_nuong_com_lam'],
    [/ốc/i, 'oc_nhoi'], [/kem/i, 'kem_bo'], [/sữa đậu nành|bánh bò/i, 'sua_dau_nanh'], [/trà|đồi chè|chè cầu đất/i, 'tra'], [/chè/i, 'che'],
    [/phở|bún|mì|hủ tiếu|bánh canh|cháo|bánh ướt|bánh bèo|cơm|quán ăn/i, 'bun_pho'], [/cà phê|cafe|café|coffee|xưởng rang/i, 'ca_phe'],
    [/dâu/i, 'dau_tay'], [/atiso|atisô/i, 'atiso'], [/mứt|đặc sản|ăn vặt|bánh ngọt|tiệm bánh/i, 'mut_dac_san'],
    [/vang|rượu/i, 'ruou_vang'], [/áo len|thổ cẩm/i, 'ao_len'], [/hoa|nhà kính/i, 'hoa'],
    [/khách sạn|hostel|homestay|biệt thự|nghỉ dưỡng|ngủ lại/i, 'khach_san'], [/bar|cocktail/i, 'bar'], [/đạp vịt|xe đạp/i, 'xe_dap_doi'],
    [/chợ|siêu thị|sạp/i, 'cho']];
  // hình Spark cho "Mốc lâu đời" (assets/vn/moc_*.webp); không có thì về biểu tượng cũ
  var MOC_HINH = [
    // đợt 49: mốc cụ thể đứng trước mốc chung (rồng ve chai trước 've chai', tháp con gà trước 'con gà', chân dung trước 'pasteur')
    [/rồng ve chai/i, 'rong_ve_chai'], [/tháp chuông 7 tầng/i, 'thap_chuong_linh_phuoc'], [/đại hồng chung/i, 'dai_hong_chung'], [/tháp sao|nguyện đường/i, 'thap_sao'], [/^thư viện/i, 'thu_vien_dai_hoc'],
    [/chân dung louis pasteur/i, 'chan_dung_pasteur'], [/tháp chuông và con gà/i, 'thap_con_ga'], [/kính màu/i, 'kinh_mau'], [/phù điêu/i, 'phu_dieu'],
    [/ve chai|linh phước/i, 'chua_ve_chai'], [/linh sơn/i, 'chua_linh_son'], [/linh quang/i, 'chua_linh_quang'], [/linh phong/i, 'chua_linh_phong'],
    [/trúc lâm/i, 'truc_lam'], [/con gà|chính tòa/i, 'nha_tho_con_ga'], [/domaine|mai anh/i, 'domaine_de_marie'], [/cam ly.*nhà thờ|nhà thờ cam ly|sơn cước/i, 'nha_tho_cam_ly'],
    [/thác cam ly/i, 'thac_cam_ly'], [/chợ đà lạt/i, 'cho_da_lat'], [/ga đà lạt|ga hỏa xa/i, 'ga_da_lat'], [/hồ xuân hương/i, 'ho_xuan_huong'],
    [/than thở/i, 'ho_than_tho'], [/dinh iii|dinh 3/i, 'dinh_3'], [/dinh 2|toàn quyền/i, 'dinh_2'], [/dinh i\b|dinh 1/i, 'dinh_1'],
    [/hằng nga|crazy/i, 'hang_nga'], [/thung lũng tình yêu/i, 'thung_lung_tinh_yeu'], [/lang biang/i, 'lang_biang'], [/trại mát/i, 'ga_trai_mat'], [/tuyền lâm/i, 'ho_tuyen_lam'], [/đa thiện/i, 'ho_da_thien'], [/suối vàng|đankia/i, 'ho_suoi_vang'],
    [/hồ thái phiên|đập thái phiên/i, 'ho_thai_phien'], [/chợ thái phiên/i, 'cho_thai_phien'], [/công viên yersin/i, 'cong_vien_yersin'], [/palace heritage/i, 'khach_san_palace'], [/du parc/i, 'khach_san_du_parc'],
    [/lục quân|võ bị/i, 'hoc_vien_luc_quan'], [/sân bay cam ly/i, 'san_bay_cam_ly'], [/hầm hỏa xa|hầm xe lửa/i, 'duong_ham_hoa_xa'], [/hai mộ/i, 'doi_thong_hai_mo'], [/^thác datanla/i, 'datanla'],
    [/xe trượt/i, 'xe_truot_datanla'], [/^thác prenn/i, 'thac_prenn'], [/^đèo prenn/i, 'deo_prenn'], [/âu lạc/i, 'den_au_lac'], [/hầm điêu khắc|hầm đất sét/i, 'duong_ham_dat_set'], [/nhà đất sét/i, 'nha_dat_set'], [/vô cực/i, 'ho_vo_cuc'], [/đồi chè|cầu đất farm –/i, 'doi_che'],
    [/bảo tàng trà/i, 'bao_tang_tra'], [/bảo tàng lâm đồng/i, 'bao_tang_lam_dong'], [/thủy tạ/i, 'thuy_ta'], [/sân golf|đồi cù/i, 'san_golf'],
    [/pasteur/i, 'vien_pasteur'], [/couvent/i, 'couvent_des_oiseaux'], [/lưu trữ/i, 'luu_tru_iv'], [/nguyễn hữu hào/i, 'lang_nguyen_huu_hao'],
    [/đình thái phiên/i, 'dinh_thai_phien'], [/cao đài/i, 'thanh_that_cao_dai'], [/ankroet/i, 'thuy_dien_ankroet'], [/nhà lao/i, 'nha_lao_thieu_nhi'],
    [/cáp treo/i, 'cap_treo'], [/rạp hòa bình|rạp hoà bình/i, 'rap_hoa_binh'], [/lycée|cao đẳng đà lạt/i, 'lycee_yersin'], [/đại học đà lạt/i, 'dai_hoc_da_lat'],
    [/vạn thành|làng hoa/i, 'lang_hoa'], [/vườn hoa/i, 'vuon_hoa'], [/quảng trường/i, 'quang_truong']
  ];
  function hinhMoc(d) {
    for (var i = 0; i < MOC_HINH.length; i++) if (MOC_HINH[i][0].test(d.ten)) return '<img class="moc-hinh" src="assets/vn/moc_' + MOC_HINH[i][1] + '.webp" alt="">';
    // quán lâu đời: dùng hình món (đợt 45)
    return '<span class="moc-hinh bt">' + hinhMon(d.ten + ' ' + d.loai) + '</span>';
  }
  function hinhMon(t) {
    for (var i = 0; i < BT_HINH.length; i++) if (BT_HINH[i][0].test(t)) return '<img class="bt-hinh" src="assets/bt/bt_' + BT_HINH[i][1] + '.webp" alt="">';
    return bieuTuong(t);
  }
  function bieuTuong(t) { for (var i = 0; i < BT.length; i++) if (BT[i][0].test(t)) return BT[i][1]; return '•'; }
  // Anh Kha 26/11: tạm bỏ bản đồ minh hoạ trong trang phố để xem thử; đổi thành true là hiện lại
  var BAN_DO_PHO = false;
  function hoaDau(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
  function showPho(ph) {
    phoBox = highlight(ph);
    if (ph.loai_noi === 'diem' || !(phoBox.maxX > phoBox.minX)) {   // điểm: khung ~400 m quanh ghim
      var cxp = px(ph.lon), cyp = py(ph.lat), mm = 0.0036 * K;
      phoBox = { minX: cxp - mm, maxX: cxp + mm, minY: cyp - mm, maxY: cyp + mm };
    }
    var ten = ph.ten_hien || ph.ten_pho;
    var moc = (ph.moc_lau_doi || []).map(function (t) { for (var i = 0; i < ph.dia_diem.length; i++) if (ph.dia_diem[i].ten === t) return i; return -1; })
      .filter(function (i) { return i >= 0; });
    ph._moc = moc;
    // Địa lý: phường, đường, mốc quen gần, cách Chợ Đà Lạt (tính từ dữ liệu sẵn có)
    function met(a, b) { return Math.hypot((a[0] - b[0]) * 108900, (a[1] - b[1]) * 110540); }
    var tenMoc = (ph.moc_lau_doi || []).join('|');
    var gan = (data && data.moc || []).map(function (m) { return { ten: m.ten, d: met([m.lon, m.lat], [ph.lon, ph.lat]) }; })
      .filter(function (m) { return m.d < 1500 && (ph.loai_noi !== 'diem' || m.d > 150) && tenMoc.indexOf(m.ten) < 0; })   // nơi loại điểm: mốc trong 150 m chính là nơi đó (nhà thờ Con Gà ≠ 'gần Nhà thờ Chánh tòa')
      .sort(function (a, b) { return a.d - b.d; }).slice(0, 3);
    var kc = Math.round(met([108.43721, 11.94342], [ph.lon, ph.lat]) / 50) * 50;
    var h = (ph.anh ? '<img class="banner" src="' + esc(ph.anh) + '" alt="Tranh đầu ' + esc(ten) + '">'
                    : '<div class="banner none">Tranh đầu phố: đang chờ vẽ</div>') +
      '<h2>' + esc(ten) + '</h2>' +
      (ph.dac_trung ? '<p class="dac-trung">' + esc(ph.dac_trung) + '</p>' : '') +
      '<section class="phan dia-ly"><h3>🗺️ Địa lý</h3>' +
      (BAN_DO_PHO ? '<div id="soDo" class="so-do" aria-label="Bản đồ ' + esc(ten) + '"><p class="note">Đang vẽ bản đồ…</p></div>' : '') +
      '<div class="o-bt">' +
      '<span>📍 ' + esc(ph.ward.replace(' - Đà Lạt', '')) + '</span>' +
      (ph.loai_noi === 'diem'
        ? '<span>🛣️ Đường tới: ' + ph.duong.filter(function (d) { return !/^(Hẻm |Đường tỉnh|Quốc lộ)/.test(d); }).slice(0, 3).map(esc).join(', ') + '</span>'
        : '<span>🛣️ Đường ' + esc((ph.duong_hien || ph.duong)[0]) + '</span>') +
      '<span>🚶 ' + (kc <= 100 ? 'sát Chợ Đà Lạt' : (kc >= 2000 ? fmt(kc / 100) / 10 + ' km' : fmt(kc) + ' m') + ' tới Chợ Đà Lạt') + '</span>' +
      gan.map(function (m) { return '<span>' + bieuTuong(m.ten) + ' ' + esc(m.ten) + '</span>'; }).join('') +
      '</div>' +
      '<button class="go" type="button" id="seeMap">Xem trên bản đồ thật</button></section>';
    if (ph.chuyen) h += chuyenHtml(ph.chuyen);
    h += '<section class="phan nay"><h3>🧺 Nay có gì</h3>';
    if (ph.ban_gi) {
      h += '<div class="o-bt mon">' + ph.ban_gi.replace(/\.$/, '').split(/[;,]\s*|\s+và\s+/).map(function (x) {
        x = x.replace(/^(dọc phố có|dọc đường là|dọc đường có|quanh đó có|quanh ga có|quanh đó|gần đó|thêm|sáng có|buổi sáng|tối có|chiều tối|ban ngày là|tối thành|đầu dốc gần hồ có|rẽ sang Trương Công Định là|đi dạo quanh hồ|ven hồ có)\s*/i, '').trim();
        return x ? '<span>' + hinhMon(x) + ' ' + esc(x.charAt(0).toUpperCase() + x.slice(1)) + '</span>' : '';
      }).join('') + '</div>';
    }
    if (moc.length) {
      h += '<h4>Mốc lâu đời</h4><ol class="bd-list">' + moc.map(function (i, k) {
        var d = ph.dia_diem[i];
        return '<li><button type="button" data-q="' + i + '">' + (BAN_DO_PHO ? '<span class="so' + (d.vi_tri ? '' : ' none') + '">' + (d.vi_tri ? k + 1 : '–') + '</span>' : '') +
          hinhMoc(d) + '<b>' + esc(d.ten.replace(/\s*\(.*\)$/, '')) + '</b></button></li>';
      }).join('') + '</ol>';
    }
    h += '<details class="doc-them"><summary>Đọc thêm giới thiệu</summary><p>' + esc(hoaDau(ph.gioi_thieu.replace(/^[^:]{0,60}:\s*/, ''))) + '</p></details>';
    h += '<div id="quanCard" class="quan-card" hidden></div></section>' +
      '<p class="note">Mỗi ý ghi nguồn bấm được; ý chỉ có 1 nguồn, hay chỉ dựa trang du lịch, blog thì ghi rõ. Đường và vị trí: © OpenStreetMap. ' +
      '<a href="' + esc(ph.nghien_cuu) + '" target="_blank" rel="noopener">Xem nghiên cứu</a>.</p>';
    sheetBody.innerHTML = h;
    sheet.classList.add('full');
    sheet.scrollTop = 0;
    srcSheet.hidden = true;
    sheet.hidden = false;
    document.getElementById('seeMap').addEventListener('click', function () { closeSheet(); zoomTo(phoBox); });
    Array.prototype.forEach.call(sheetBody.querySelectorAll('.bd-list [data-q]'), function (b2) {
      b2.addEventListener('click', function () { showQuan(ph, ph.dia_diem[Number(b2.getAttribute('data-q'))]); });
    });
    if (BAN_DO_PHO) renderSoDo(ph);
  }

  function goPlace(d, ph) {
    {
      {
        closeSheet();
        if (d.vi_tri) {
          markPlace(d);
          var x = px(d.vi_tri.lon), y = py(d.vi_tri.lat), m = 0.0012 * K;   // khung ~130 m quanh quán
          zoomTo({ minX: x - m, maxX: x + m, minY: y - m, maxY: y + m });
        } else {
          zoomTo(highlight({ duong: [d.duong], lon: ph.lon, lat: ph.lat, dia_diem: ph.dia_diem }));
        }
      }
    }
  }

  /* ---------- bản đồ phố minh hoạ (nền: bản đồ Đà Lạt nét Spark, hướng Bắc ở trên, đúng tỉ lệ) ---------- */
  function loadJSON(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
  var banDo = null;

  function renderSoDo(ph) {
    var host = document.getElementById('soDo');
    (banDo ? Promise.resolve(banDo) : loadJSON('data/lam-dong/da-lat/ban_do.json')).then(function (all) {
      banDo = all;
      var bd = all.vung.filter(function (v) { return v.pho.indexOf(ph.slug) >= 0; })[0] || all.vung[0];   // tấm bản đồ của khu chứa phố
      if (!document.getElementById('soDo')) return;
      function B(lon, lat) { return [(lon - bd.lon0) * bd.kx * bd.M * bd.px_per_m, (bd.lat1 - lat) * bd.M * bd.px_per_m]; }
      var lines = roadsOf(ph)
        .map(function (r) { return r.pts.map(function (q) { return B(q[0], q[1]); }); });
      var xs = [], ys = [];
      // chỉ tính khung theo phần đường nằm trong tấm tranh (đường dài như quốc lộ chạy ra ngoài tranh)
      lines.forEach(function (l) { l.forEach(function (p) { if (p[0] >= 0 && p[0] <= bd.w && p[1] >= 0 && p[1] <= bd.h) { xs.push(p[0]); ys.push(p[1]); } }); });
      var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
      var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      // mốc quen gần nhất (để luôn thấy ít nhất 1 mốc trong khung) và khoảng cách tới Chợ Đà Lạt
      var cLon = ph.lon, cLat = ph.lat;
      function met(a, b) { return Math.hypot((a.lon - b.lon) * 108900, (a.lat - b.lat) * 110540); }
      var near = bd.moc.slice().sort(function (a, b) { return met(a, { lon: cLon, lat: cLat }) - met(b, { lon: cLon, lat: cLat }); })[0];
      var nb = near ? B(near.lon, near.lat) : null;
      if (near && met(near, { lon: cLon, lat: cLat }) < 900) {
        x0 = Math.min(x0, nb[0]); x1 = Math.max(x1, nb[0]); y0 = Math.min(y0, nb[1] - 40); y1 = Math.max(y1, nb[1] + 30);
      }
      // khung đủ rộng để thấy cả xóm xung quanh (≥ 1,3 km ngang), không quá cao so với bề ngang
      var pad = 80, w = Math.max(x1 - x0 + pad * 2, 300), h = Math.max(y1 - y0 + pad * 2, w * 1.1);
      w = Math.max(w, h * 0.78);
      // khung không bao giờ lớn hơn tấm tranh (vùng ven tranh nằm ngang, ép cao quá thì lòi nền trống)
      w = Math.min(w, bd.w); h = Math.min(h, bd.h);
      cx = (x0 + x1) / 2; cy = (y0 + y1) / 2;
      var vx = Math.max(0, Math.min(bd.w - w, cx - w / 2)), vy = Math.max(0, Math.min(bd.h - h, cy - h / 2));
      var k = w / 360;   // cỡ chấm, chữ theo khung
      function path(l) { return l.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(''); }
      var g = '<svg viewBox="' + vx.toFixed(1) + ' ' + vy.toFixed(1) + ' ' + w.toFixed(1) + ' ' + h.toFixed(1) + '" class="so-do-svg" role="img" aria-label="Bản đồ ' + esc(ph.ten_pho) + '">' +
        '<image href="' + esc(bd.anh) + '" width="' + bd.w + '" height="' + bd.h + '"/>';
      lines.forEach(function (l) { g += '<path d="' + path(l) + '" class="bd-pho-vien" style="stroke-width:' + (16 * k) + '"/>'; });
      lines.forEach(function (l) { g += '<path d="' + path(l) + '" class="bd-pho" style="stroke-width:' + (8 * k) + '"/>'; });
      var boxes = [];
      function hit(b) { return boxes.some(function (o) { return b.x1 > o.x0 && b.x0 < o.x1 && b.y1 > o.y0 && b.y0 < o.y1; }); }
      // hình mốc vẽ sẵn trong ảnh (Chợ, nhà thờ, quảng trường…) và tên của nó chiếm chỗ trước
      bd.moc.forEach(function (m) { var q = B(m.lon, m.lat); boxes.push({ x0: q[0] - 50, x1: q[0] + 50, y0: q[1] - 66, y1: q[1] + 36 }); });
      // chấm quán chiếm chỗ trước
      (ph._moc || []).map(function (i) { return ph.dia_diem[i]; }).forEach(function (d) { if (d.vi_tri) { var q = B(d.vi_tri.lon, d.vi_tri.lat); boxes.push({ x0: q[0] - 13 * k, x1: q[0] + 13 * k, y0: q[1] - 13 * k, y1: q[1] + 13 * k }); } });
      // tên mốc thật trong khung (chùa, chợ, dinh, công viên…) để định hướng; tối đa 4 mốc gần phố nhất
      var tenQuan = ph.dia_diem.map(function (d) { return d.ten; }).join('|');
      data.moc.map(function (m) { return { m: m, p: B(m.lon, m.lat) }; })
        .filter(function (o) { return o.p[0] > vx + 30 && o.p[0] < vx + w - 30 && o.p[1] > vy + 20 && o.p[1] < vy + h - 20 && tenQuan.indexOf(o.m.ten) < 0; })
        .sort(function (a, b) { return Math.hypot(a.p[0] - cx, a.p[1] - cy) - Math.hypot(b.p[0] - cx, b.p[1] - cy); })
        .filter(function (o) {      // bỏ mốc trùng chỗ một quán đã có chấm (vd Dinh III)
          return !ph.dia_diem.some(function (d) { if (!d.vi_tri) return false; var q = B(d.vi_tri.lon, d.vi_tri.lat); return Math.hypot(q[0] - o.p[0], q[1] - o.p[1]) < 25 * k; });
        })
        .filter(function (o) {      // trùng tên mốc đã vẽ sẵn (vd "Chợ Đà Lạt") thì bỏ
          return !bd.moc.some(function (m) { return o.m.ten.indexOf(m.ten) >= 0 || m.ten.indexOf(o.m.ten) >= 0; });
        })
        .filter(function (o) {      // tên mốc không đè chấm quán, không đè tên mốc khác
          var tw = o.m.ten.length * 12 * k * 0.56, phai = o.p[0] > vx + w * 0.6;
          var b = { x0: phai ? o.p[0] - tw - 8 * k : o.p[0] - 5 * k, x1: phai ? o.p[0] + 5 * k : o.p[0] + tw + 8 * k, y0: o.p[1] - 9 * k, y1: o.p[1] + 9 * k };
          if (hit(b)) return false;
          boxes.push(b); return true;
        })
        .slice(0, 3).forEach(function (o) {
          var phai = o.p[0] > vx + w * 0.6;     // gần mép phải thì viết chữ sang trái
          g += '<circle cx="' + o.p[0].toFixed(1) + '" cy="' + o.p[1].toFixed(1) + '" r="' + (4 * k) + '" class="bd-moc-cham"/>' +
            '<text x="' + (o.p[0] + (phai ? -7 : 7) * k).toFixed(1) + '" y="' + o.p[1].toFixed(1) + '" class="bd-moc" text-anchor="' + (phai ? 'end' : 'start') + '" style="font-size:' + (12 * k) + 'px;stroke-width:' + (4 * k) + 'px">' + esc(o.m.ten) + '</text>';
        });
      // tên đường chạy uốn theo đường (textPath), chỉ đường đủ dài, không quá cong, không đè nhau
      var fsz = 12 * k, defs = '', txt = '';
      (data.ten_duong || []).slice().sort(function (a, b) { return a.loai - b.loai; }).forEach(function (r, ri) {
        if (r.loai > 4 || /^(Hẻm|Bùng binh|Công trường)/.test(r.ten) || ph.duong.indexOf(r.ten) >= 0) return;   // tên phố đã ghi ở đầu trang
        var q = r.pts.map(function (z) { return B(z[0], z[1]); });
        var inside = q.filter(function (z) { return z[0] > vx + 10 && z[0] < vx + w - 10 && z[1] > vy + 10 && z[1] < vy + h - 10; });
        if (inside.length < 2) return;
        // cắt đoạn nằm trong khung, làm mềm
        var seg = [], best = [];
        q.forEach(function (z) {
          var ok = z[0] > vx && z[0] < vx + w && z[1] > vy && z[1] < vy + h;
          if (ok) seg.push(z); else { if (seg.length > best.length) best = seg; seg = []; }
        });
        if (seg.length > best.length) best = seg;
        if (best.length < 2) return;
        var sm = smooth(best, 3);
        if (maxTurn(smooth(best, 1)) > 45) return;
        var L = 0; for (var i = 1; i < sm.length; i++) L += Math.hypot(sm[i][0] - sm[i - 1][0], sm[i][1] - sm[i - 1][1]);
        var tw = r.ten.length * fsz * 0.56;
        if (tw > L * 0.8) return;
        // giữa đoạn
        var acc = 0, mid = sm[0];
        for (var j = 1; j < sm.length; j++) { var dl = Math.hypot(sm[j][0] - sm[j - 1][0], sm[j][1] - sm[j - 1][1]); if (acc + dl >= L / 2) { mid = sm[j]; break; } acc += dl; }
        // khung chữ theo hướng thật của đoạn giữa (không phải hình vuông) để khỏi bỏ sót nhiều tên
        var ang = Math.atan2(sm[Math.min(sm.length - 1, j + 1)][1] - sm[Math.max(0, j - 1)][1], sm[Math.min(sm.length - 1, j + 1)][0] - sm[Math.max(0, j - 1)][0]);
        var hx = Math.abs(Math.cos(ang)) * tw / 2 + fsz * 0.6, hy = Math.abs(Math.sin(ang)) * tw / 2 + fsz * 0.6;
        var bx = { x0: mid[0] - hx, x1: mid[0] + hx, y0: mid[1] - hy, y1: mid[1] + hy };
        if (hit(bx)) return;
        boxes.push(bx);
        if (sm[sm.length - 1][0] < sm[0][0]) sm = sm.slice().reverse();
        var id = 'bdr' + ri;
        defs += '<path id="' + id + '" d="' + path(sm) + '"/>';
        txt += '<text class="bd-ten-duong" style="font-size:' + fsz + 'px;stroke-width:' + (3.5 * k) + 'px" dy="0.35em"><textPath href="#' + id + '" startOffset="50%">' + esc(r.ten) + '</textPath></text>';
      });
      g += '<defs>' + defs + '</defs>' + txt;
      // chấm quán: chấm nào đè nhau thì đẩy dần ra cho tách hẳn, kèm nét nối về đúng chỗ quán
      var dots = [];
      (ph._moc || []).forEach(function (i) { var d = ph.dia_diem[i]; if (d.vi_tri) { var q = B(d.vi_tri.lon, d.vi_tri.lat); dots.push({ i: i, ox: q[0], oy: q[1], x: q[0], y: q[1] }); } });
      var R = 12 * k;
      for (var it = 0; it < 120; it++) {
        var moved = false;
        for (var a1 = 0; a1 < dots.length; a1++) for (var b1 = a1 + 1; b1 < dots.length; b1++) {
          var A = dots[a1], Bd = dots[b1], dx = Bd.x - A.x, dy = Bd.y - A.y, dd = Math.hypot(dx, dy);
          if (dd < R * 2.15) {
            if (dd < 0.01) { dx = Math.cos(b1); dy = Math.sin(b1); dd = 1; }
            var push = (R * 2.15 - dd) / 2;
            A.x -= dx / dd * push; A.y -= dy / dd * push; Bd.x += dx / dd * push; Bd.y += dy / dd * push; moved = true;
          }
        }
        if (!moved) break;
      }
      var dotAt = {};
      dots.forEach(function (o) { dotAt[o.i] = o; if (Math.hypot(o.x - o.ox, o.y - o.oy) > 3 * k) g += '<line x1="' + o.ox.toFixed(1) + '" y1="' + o.oy.toFixed(1) + '" x2="' + o.x.toFixed(1) + '" y2="' + o.y.toFixed(1) + '" class="bd-noi" style="stroke-width:' + (1.6 * k) + '"/><circle cx="' + o.ox.toFixed(1) + '" cy="' + o.oy.toFixed(1) + '" r="' + (2.5 * k) + '" class="bd-goc"/>'; });
      (ph._moc || []).forEach(function (i, k2) {
        var d = ph.dia_diem[i];
        if (!d.vi_tri) return;
        var p = [dotAt[i].x, dotAt[i].y], r = 11 * k;
        g += '<g class="bd-cham" data-q="' + i + '" tabindex="0" role="button" aria-label="' + (k2 + 1) + '. ' + esc(d.ten) + '">' +
          '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + r + '" class="' + (d.vi_tri.uoc ? 'uoc' : '') + '" style="stroke-width:' + (2.5 * k) + '"/>' +
          '<text x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" style="font-size:' + (12 * k) + 'px">' + (k2 + 1) + '</text></g>';
      });
      g += '</svg>';
      host.innerHTML = g + ((ph._moc || []).length ? '<p class="bd-ghichu">Chấm số là mốc lâu đời, xem tên ở phần "Nay có gì" bên dưới.</p>' : '');
      Array.prototype.forEach.call(host.querySelectorAll('[data-q]'), function (el2) {
        function open() { showQuan(ph, ph.dia_diem[Number(el2.getAttribute('data-q'))]); }
        el2.addEventListener('click', open);
        el2.addEventListener('keydown', function (e) { if (e.key === 'Enter') open(); });
      });
    }).catch(function () { host.innerHTML = '<p class="note">Chưa vẽ được bản đồ phố này.</p>'; });
  }

  // Hướng mới: không bày giờ mở cửa, giá, số nhà của từng quán
  function gonQuan(t) {
    var bo = /\d{1,2}\s*(:|h|giờ)\s*\d{0,2}|\d[\d.]*\s*(–|-)?\s*[\d.]*\s*(đ|đồng)(?![\wà-ỹ])/i;
    var out = (t || '').replace(/\.\s*$/, '').split(/;\s*/).map(function (c) {
      return c.split(/,\s*/).filter(function (x) { return !bo.test(x); }).join(', ');
    }).filter(function (c) { return c.trim(); }).join('; ');
    return out ? out + '.' : '';
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.chip-ten');
    if (!b) return;
    var box = b.closest('.chuyen'), k = b.getAttribute('data-tc');
    Array.prototype.forEach.call(box.querySelectorAll('.ten-ct'), function (x) { x.hidden = x.getAttribute('data-tc') !== k || !x.hidden; });
    Array.prototype.forEach.call(box.querySelectorAll('.chip-ten'), function (x) { x.classList.toggle('dang-mo', x === b && !box.querySelector('.ten-ct[data-tc="' + k + '"]').hidden); });
  });
  function showQuan(ph, d) {
    var c = document.getElementById('quanCard');
    // thẻ hiện ngay dưới mốc vừa chạm (không dồn xuống cuối trang); chạm lại mốc đang mở thì đóng
    var nut = sheetBody.querySelector('.bd-list [data-q="' + ph.dia_diem.indexOf(d) + '"]');
    if (nut) {
      if (!c.hidden && c.parentNode === nut.parentNode) { c.hidden = true; return; }
      nut.parentNode.appendChild(c);
    }
    c.innerHTML = '<button class="close" type="button" id="quanClose" aria-label="Đóng">×</button>' +
      '<b>' + esc(d.ten) + '</b><span class="addr">' + esc(d.loai) + '</span>' +
      '<span>' + esc(gonQuan(d.dac_trung)) + '</span>' +
      (/^không rõ/i.test(d.con_mo || '') ? '<span class="src warn">Chưa rõ còn mở</span>' : '') +
      
      '<span class="src">Nguồn: ' + d.nguon.map(function (n) { return '<a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.trang) + '</a>'; }).join(' · ') + '</span>' +
      '<button class="mini" type="button" id="quanGo">Xem trên bản đồ thật</button>';
    c.hidden = false;
    c.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    document.getElementById('quanClose').addEventListener('click', function () { c.hidden = true; });
    document.getElementById('quanGo').addEventListener('click', function () { goPlace(d, ph); });
  }

  /* ---------- lịch trình đi bộ theo phố ---------- */
  var lich = null;
  function moLich() {
    (lich ? Promise.resolve(lich) : loadJSON('data/lam-dong/da-lat/lich_trinh.json')).then(function (L) {
      lich = L;
      var h = '<h2>Đi bộ theo phố</h2><p class="note">Quãng đường đo trên đường thật (OpenStreetMap). Thời gian tính đi bộ 4 km/giờ vì Đà Lạt nhiều dốc.</p>';
      L.lich.forEach(function (l, li) {
        h += '<section class="lich"><h3>' + esc(l.ten) + ' <span class="muted">· ' + fmt(l.tong_m / 100) / 10 + ' km, khoảng ' + l.tong_phut + ' phút đi bộ</span></h3><ol>';
        l.chang.forEach(function (c, i) {
          if (c.quang_duong_m) h += '<li class="di-bo">↓ đi bộ ' + fmt(c.quang_duong_m) + ' m, khoảng ' + c.phut + ' phút</li>';
          h += '<li class="chang"><span class="buoi">' + esc(c.buoi) + '</span><button type="button" class="ten-pho" data-pho="' + esc(c.slug) + '">' + (i + 1) + '. ' + esc(c.ten_pho) + ' →</button><span>' + esc(c.goi_y) + '</span></li>';
        });
        h += '</ol><button class="go" type="button" data-lich="' + li + '">Xem đường đi trên bản đồ</button></section>';
      });
      sheetBody.innerHTML = h;
      sheet.classList.add('full'); sheet.scrollTop = 0; srcSheet.hidden = true; sheet.hidden = false;
      Array.prototype.forEach.call(sheetBody.querySelectorAll('[data-pho]'), function (b) {
        b.addEventListener('click', function () { location.hash = 'pho-' + b.getAttribute('data-pho'); });
      });
      Array.prototype.forEach.call(sheetBody.querySelectorAll('[data-lich]'), function (b) {
        b.addEventListener('click', function () { veLich(lich.lich[Number(b.getAttribute('data-lich'))]); });
      });
    });
  }

  function veLich(l) {
    closeSheet();
    var old = document.getElementById('lichDuong');
    if (old) old.remove();
    var g = el('g', { id: 'lichDuong', 'class': 'lich-duong' });
    var bx = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    l.chang.forEach(function (c) {
      if (!c.duong_di) return;
      g.appendChild(el('path', { d: lineOf(c.duong_di) }));
      c.duong_di.forEach(function (q) {
        var x = px(q[0]), y = py(q[1]);
        bx.minX = Math.min(bx.minX, x); bx.maxX = Math.max(bx.maxX, x); bx.minY = Math.min(bx.minY, y); bx.maxY = Math.max(bx.maxY, y);
      });
    });
    var fillG = land.querySelector('.road-fill');
    land.insertBefore(g, fillG ? fillG.nextSibling : null);
    zoomTo(bx);
  }
  document.getElementById('lichBtn').addEventListener('click', moLich);
  document.getElementById('sangBtn').addEventListener('click', function () { location.hash = this.getAttribute('data-go'); });

  function closeSheet(giuDiaChi) {
    sheet.classList.remove('full');
    // đóng trang phố = về bản đồ đường; riêng lúc đang chuyển tầng (go) thì giữ địa chỉ, kẻo tải bản đồ hai lần chồng nhau
    if (!giuDiaChi && /^#pho-/.test(location.hash)) location.replace('#da-lat');
    sheet.hidden = true;
    if (picked) { picked.classList.remove('picked'); picked = null; }
  }
  document.getElementById('close').addEventListener('click', closeSheet);
  document.getElementById('srcBtn').addEventListener('click', function () { closeSheet(); srcSheet.hidden = false; });
  document.getElementById('srcClose').addEventListener('click', function () { srcSheet.hidden = true; });

  /* ---------- đường dẫn tầng, chú thích ---------- */
  function veLegend(list) {
    var lg = document.getElementById('legend');
    lg.classList.toggle('gap', !!(layer && layer.y1963));    // Đà Lạt 1963: chú thích gập lại thành một nút nhỏ
    lg.classList.remove('mo');
    if (layer && layer.y1963) lg.removeAttribute('aria-hidden'); else lg.setAttribute('aria-hidden', 'true');
    lg.innerHTML = (layer && layer.y1963 ? '<button type="button" class="lg-nut" aria-label="Chú thích">Chú thích</button>' : '') + list.map(function (l) {
      var sw = l[0] === 'cao63' ? '<i class="star cao63-ico">•</i>' : l[0] === 'star' ? '<i class="star">★</i>' : l[0] === 'pin' ? '<i class="star pin-ico">⬤</i>' : '<i class="sw ' + l[0] + '"></i>';
      return '<span>' + sw + esc(l[1]) + '</span>';
    }).join('');
    var nut = lg.querySelector('.lg-nut');
    if (nut) nut.addEventListener('click', function () { lg.classList.toggle('mo'); });
  }
  function renderChrome() {
    var c = document.getElementById('crumb');
    c.innerHTML = layer.crumb.map(function (b, i) {
      var last = i === layer.crumb.length - 1;
      return last ? '<span>' + esc(b[0]) + '</span>' : '<a href="#' + b[1] + '">' + esc(b[0]) + '</a>';
    }).join(' › ');
    veLegend(layer.legend);
    var nguon = data.nguon.concat(cache.ngoai && layer.kind !== 'duong' ? [cache.ngoai.nguon] : []);
    document.getElementById('srcList').innerHTML = nguon.map(function (n) {
      return '<li>' + esc(n.ten) + (n.link ? '<br><a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.link) + '</a>' : '') + '</li>';
    }).join('');
    document.getElementById('lichBtn').hidden = layer.kind !== 'duong';
    var sang = document.getElementById('sangBtn');
    sang.hidden = !layer.sang;
    if (layer.sang) { sang.textContent = layer.sang[0]; sang.setAttribute('data-go', layer.sang[1]); }
    svg.classList.toggle('y63', !!layer.y1963);
    svg.classList.toggle('sg61', !!layer.sg);
    document.getElementById('timBox').hidden = !layer.y1963;
    if (layer.y1963) { document.getElementById('lichBtn').hidden = true; tim63.value = ''; timKq.hidden = true; timXoa.hidden = true; }
    var name = layer.crumb[layer.crumb.length - 1][0];
    svg.setAttribute('aria-label', layer.y1963 ? 'Bản đồ Đà Lạt năm 1963' : name === 'Việt Nam' ? 'Bản đồ 34 tỉnh, thành phố Việt Nam' : 'Bản đồ xã, phường tỉnh ' + name);
  }

  /* ---------- tải tầng ---------- */
  function go() {
    var id = location.hash.replace('#', '') || 'viet-nam';
    var phoSlug = null;
    if (/^pho-/.test(id)) { phoSlug = id.slice(4); id = 'da-lat'; }
    if (!LAYERS[id]) id = 'viet-nam';
    if (id === layerId) {
      if (phoSlug && phoById(phoSlug)) showPho(phoById(phoSlug));
      else if (!phoSlug && sheet.classList.contains('full')) { sheet.classList.remove('full'); sheet.hidden = true; }
      return;
    }
    closeSheet(true); srcSheet.hidden = true;
    loading.hidden = false; loading.textContent = 'Đang tải bản đồ…';
    var L = LAYERS[id];
    function load(k) {
      return cache[k] ? Promise.resolve(cache[k]) : fetch(LAYERS[k].file).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      }).then(function (d) { cache[k] = d; return d; });
    }
    function loadExtra(x) {
      return cache[x.key] ? Promise.resolve(cache[x.key]) : fetch(x.file).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      }).then(function (d) { cache[x.key] = d; return d; });
    }
    Promise.all([load(id), L.context ? load(L.context.layer) : null, L.extra ? loadExtra(L.extra) : null,
      loadExtra({ key: 'ngoai', file: 'data/lang-gieng.json' }).catch(function () { return null; })]).then(function (res) {
      var d = res[0];
      data = d; layer = L; layerId = id;
      document.getElementById('map').classList.toggle('nen-spark', id === 'viet-nam' || id === 'lam-dong');
      document.getElementById('map').classList.toggle('tang-tinh', id === 'lam-dong');   // tầng cả nước: nét bản đồ game Gọn Phố
      document.querySelector('.osm-credit').hidden = L.kind !== 'duong';   // cả tầng 1963: đường dò theo mốc OpenStreetMap → phải ghi công (ODbL)   // chỉ tầng đường dùng dữ liệu OpenStreetMap
      renderChrome();
      draw();
      loading.hidden = true;
      if (phoSlug && phoById(phoSlug)) showPho(phoById(phoSlug));
    }).catch(function () {
      loading.textContent = 'Chưa tải được bản đồ. Anh tải lại trang thử nhé.';
    });
  }
  window.addEventListener('hashchange', go);
  go();
})();
