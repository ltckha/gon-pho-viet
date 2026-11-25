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
                ['doi_che', 108.5575, 11.8822, 'Đồi chè Cầu Đất', '24805', 2.5], ['rung_thong', 108.4138, 12.0326, 'Núi Lang Biang', '24846', 2.5],
                // Spark đợt 42 — toạ độ từ OpenStreetMap (Nominatim); hang núi lửa Krông Nô và Phú Quý lấy tâm xã/đặc khu
                ['mui_ne', 108.2954, 10.9491, 'Đồi cát Mũi Né', '22918'], ['phan_thiet', 108.1461, 10.9361, 'Tháp Po Sah Inư', '22924'],
                ['ta_cu', 107.9001, 10.8151, 'Núi Tà Cú', '23110'], ['ke_ga', 107.9916, 10.6953, 'Hải đăng Kê Gà', '23143'],
                ['phu_quy', 108.9423, 10.5321, 'Đảo Phú Quý', '23272'], ['bai_da_bay_mau', 108.7158, 11.1795, 'Cổ Thạch', '22969'],
                ['bao_loc', 107.7429, 11.642, 'Thác Dambri', '24820'], ['ta_dung', 108.0362, 11.8889, 'Hồ Tà Đùng', '24637'],
                ['krong_no', 107.8014, 12.4357, 'Hang núi lửa Krông Nô', '24688'], ['pongour', 108.2654, 11.6875, 'Thác Pongour', '24976'],
                ['da_nhim', 108.6147, 11.8797, 'Hồ Đa Nhim', '24934'], ['bidoup', 108.4727, 12.1516, 'Bidoup Núi Bà', '24848']],
      legend: [['open', 'Có phố đã nghiên cứu'], ['dalat', 'Phường khác của Đà Lạt (có đường)'], ['ward', 'Phường'], ['soon', 'Xã, đặc khu']],
      card: cardPhuong
    },
    'da-lat': {
      kind: 'duong', file: 'data/lam-dong/da-lat/duong.json', prec: 4,
      crumb: [['Việt Nam', ''], ['Lâm Đồng', 'lam-dong'], ['Đà Lạt', 'da-lat']],
      context: { layer: 'lam-dong' },
      extra: { key: 'pho', file: 'data/lam-dong/da-lat/pho.json' },
      legend: [['pin', 'Phố đã nghiên cứu'], ['road', 'Đường thật (OpenStreetMap)'], ['water', 'Hồ']],
      card: cardPho
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
    var r = svg.getBoundingClientRect(), z = view.s / fit.s, fs = 11 / view.s;
    var boxes = [];
    function free(b) {
      for (var i = 0; i < boxes.length; i++) {
        var o = boxes[i];
        if (b.x1 > o.x0 && b.x0 < o.x1 && b.y1 > o.y0 && b.y0 < o.y1) return false;
      }
      return true;
    }
    // ghim trước (quan trọng nhất): chỗ của mọi ghim, rồi mới tới chữ
    pins.forEach(function (g) {
      var sx = g._x * view.s + view.x, sy = g._y * view.s + view.y;
      boxes.push({ x0: sx - 11, x1: sx + 11, y0: sy - 28, y1: sy });
    });
    pins.forEach(function (g) {
      if (g._fixed) return;
      var sx = g._x * view.s + view.x, sy = g._y * view.s + view.y;
      var w = g._n * 13 * 0.6 + 6, lb = g.lastChild;
      var right = { x0: sx + 12, x1: sx + 14 + w, y0: sy - 26, y1: sy - 6 };
      var left = { x0: sx - 14 - w, x1: sx - 12, y0: sy - 26, y1: sy - 6 };
      // chữ không được tràn khỏi mép màn hình (tên dài như "Thiền viện Trúc Lâm – Hồ Tuyền Lâm")
      var vuaPhai = right.x1 < r.width - 6, vuaTrai = left.x0 > 6;
      if (!vuaPhai && !vuaTrai) { if (sx > r.width / 2) vuaTrai = true; else vuaPhai = true; }
      if (vuaPhai && free(right)) { lb.setAttribute('x', 14); lb.setAttribute('text-anchor', 'start'); lb.removeAttribute('hidden'); boxes.push(right); }
      else if (vuaTrai && free(left)) { lb.setAttribute('x', -14); lb.setAttribute('text-anchor', 'end'); lb.removeAttribute('hidden'); boxes.push(left); }
      else lb.setAttribute('hidden', '');
    });
    roadLbl.slice().sort(function (a, b) { return a.rank - b.rank || b.len - a.len; }).forEach(function (L) {
      var show = z >= L.minZ && L.n * fs * 0.58 < L.len * 0.85;
      if (show) {
        var sx = L.x * view.s + view.x, sy = L.y * view.s + view.y, hw = L.n * 11 * 0.58 / 2 + 4;
        if (sx < -50 || sy < -50 || sx > r.width + 50 || sy > r.height + 50) show = false;
        else {
          var b = { x0: sx - hw, x1: sx + hw, y0: sy - hw * 0.5 - 7, y1: sy + hw * 0.5 + 7 };
          if (free(b)) boxes.push(b); else show = false;
        }
      }
      if (show) L.el.removeAttribute('hidden'); else L.el.setAttribute('hidden', '');
    });
    // hồ, mốc: sau tên đường, chỗ nào còn trống mới hiện
    pointLbl.forEach(function (L) {
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

  function draw() {
    land.textContent = '';
    labels.textContent = '';
    pinsRoot.textContent = '';
    pins = []; roadLbl = []; pointLbl = []; mocs = [];
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
      land.appendChild(el('path', { d: pathOf(t.hinh), 'class': 'prov' + (c ? ' ' + c : ''), 'data-i': i }));
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
    var r = svg.getBoundingClientRect(), boxes = [], cx = r.width / 2, cy = r.height / 2, dem = 0, MOC_TOI_DA = 5;
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
    var sr = svg.getBoundingClientRect();
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
    var r = svg.getBoundingClientRect();
    var top = 56, bottom = 20, side = 12;
    var w = r.width - side * 2, h = r.height - top - bottom;
    var bw = bounds.maxX - bounds.minX, bh = bounds.maxY - bounds.minY;
    var s = Math.min(w / bw, h / bh);
    fit = { s: s, x: side + (w - bw * s) / 2 - bounds.minX * s, y: top + (h - bh * s) / 2 - bounds.minY * s };
    view = { s: fit.s, x: fit.x, y: fit.y };
    apply();
  }

  function apply() {
    world.setAttribute('transform', 'translate(' + view.x.toFixed(2) + ' ' + view.y.toFixed(2) + ') scale(' + view.s.toFixed(5) + ')');
    var z = view.s / fit.s;                       // 1 = vừa khung
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
    var ns = Math.max(fit.s * 0.8, Math.min(fit.s * (layer && layer.kind === 'duong' ? 120 : 60), view.s * f));
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
      if (!start.moved && e.type === 'pointerup') tap(start.target);
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
    var r = svg.getBoundingClientRect();
    zoomAt(f, r.width / 2, r.height / 2);
  }
  document.getElementById('zin').addEventListener('click', function () { centerZoom(1.6); });
  document.getElementById('zout').addEventListener('click', function () { centerZoom(1 / 1.6); });
  document.getElementById('zfit').addEventListener('click', fitAll);
  window.addEventListener('resize', function () { if (bounds) fitAll(); });

  /* ---------- thẻ thông tin ---------- */
  function tap(target) {
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

  function cardTinh(t) {
    var full = (t.loai === 'Thành phố' ? 'Thành phố ' : 'Tỉnh ') + t.ten;
    var gop = t.tinh_cu.length ? 'Gộp từ ' + t.tinh_cu.map(esc).join(', ') : 'Giữ nguyên, không sáp nhập';
    var h = '<h2>' + esc(full) + '</h2><div>';
    if (t.loai === 'Thành phố') h += '<span class="tag">★ Thành phố trực thuộc trung ương</span> ';
    h += t.da_mo ? '<span class="tag open">Có bản đồ phố</span>' : '<span class="tag">Bản đồ phố: sắp có</span>';
    h += '</div><dl class="facts">' +
      '<dt>Hình thành</dt><dd>' + gop + '</dd>' +
      '<dt>Diện tích</dt><dd>' + fmt(t.dien_tich_km2) + ' km²</dd>' +
      '<dt>Xã/phường</dt><dd>' + fmt(t.so_xa_phuong) + '</dd>';
    if (t.len_thanh_pho) h += '<dt>Lên thành phố</dt><dd>từ ' + esc(t.len_thanh_pho.ngay) + '</dd>';
    h += '</dl>';
    if (t.da_mo) h += '<button class="go" type="button" data-go="lam-dong">Vào ' + esc(t.ten) + ' →</button>';
    h += '<p class="note">Theo địa giới mới từ 1/7/2025 (Nghị quyết 202/2025/QH15).</p>';
    return h;
  }

  function cardPhuong(p) {
    var h = '<h2>' + esc(p.loai + ' ' + p.ten) + '</h2><div>';
    if (p.so_pho) h += '<span class="tag open">' + p.so_pho + ' phố đã nghiên cứu</span> ';
    if (p.da_lat) h += '<span class="tag">Đà Lạt</span>';
    h += '</div><dl class="facts">' +
      '<dt>Gộp từ</dt><dd>' + esc(p.gop_tu) + '</dd>' +
      '<dt>Diện tích</dt><dd>' + fmt(p.dien_tich_km2, 1) + ' km²</dd>' +
      '</dl>';
    if (p.da_lat) h += '<button class="go" type="button" data-go="da-lat">Xem đường phố Đà Lạt →</button>';
    h += '<p class="note">Theo Nghị quyết 1671/NQ-UBTVQH15, Điều 1 khoản ' + p.muc_nq + '.</p>';
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
      if (!r.ten || ph.duong.indexOf(r.ten) < 0) return false;
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
    var r = svg.getBoundingClientRect(), top = 70, pad = 40, bottom = 140;  // chừa chỗ ô chú thích phía dưới
    var w = r.width - pad * 2, h = r.height - top - pad - bottom;
    var s = Math.min(w / Math.max(b.maxX - b.minX, 0.01), h / Math.max(b.maxY - b.minY, 0.01));
    s = Math.min(s, fit.s * 120);
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
      h += '<div class="ten-xua"><span class="nhan">Tên xưa</span>' + c.ten_cu.map(function (t) {
        return '<span class="chip-ten">' + esc(t.ten.replace(/\s*\(.*$/, '')) + '</span>';
      }).join('<span class="mui">→</span>') + '</div>';
    }
    if (c.moc.length) {
      h += '<ol class="dong-tg">' + c.moc.map(function (m) {
        return '<li><details><summary><b class="nam">' + esc(m.nam) + '</b><span>' + esc(ngan(m.su_kien)) + dau(m.muc, m.mot_nguon) + '</span></summary>' +
          '<p>' + esc(m.su_kien) + '</p>' + src(m.nguon, m.mot_nguon, m.muc) + '</details></li>';
      }).join('') + '</ol>';
    }
    if (c.chuyen.length) {
      h += '<div class="chuyen-the"><span class="nhan">Chuyện kể · chạm để đọc</span>' + c.chuyen.map(function (t) {
        return '<details class="mau-chuyen"><summary>📖 ' + esc(t.tieu_de) + dau(t.muc, t.mot_nguon) + '</summary><p>' + esc(t.noi_dung) + '</p>' + src(t.nguon, t.mot_nguon, t.muc) + '</details>';
      }).join('') + '</div>';
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
  function bieuTuong(t) { for (var i = 0; i < BT.length; i++) if (BT[i][0].test(t)) return BT[i][1]; return '•'; }
  function hoaDau(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
  function showPho(ph) {
    phoBox = highlight(ph);
    var ten = ph.ten_hien || ph.ten_pho;
    var moc = (ph.moc_lau_doi || []).map(function (t) { for (var i = 0; i < ph.dia_diem.length; i++) if (ph.dia_diem[i].ten === t) return i; return -1; })
      .filter(function (i) { return i >= 0; });
    ph._moc = moc;
    // Địa lý: phường, đường, mốc quen gần, cách Chợ Đà Lạt (tính từ dữ liệu sẵn có)
    function met(a, b) { return Math.hypot((a[0] - b[0]) * 108900, (a[1] - b[1]) * 110540); }
    var tenMoc = (ph.moc_lau_doi || []).join('|');
    var gan = (data && data.moc || []).map(function (m) { return { ten: m.ten, d: met([m.lon, m.lat], [ph.lon, ph.lat]) }; })
      .filter(function (m) { return m.d < 1500 && tenMoc.indexOf(m.ten) < 0; })
      .sort(function (a, b) { return a.d - b.d; }).slice(0, 3);
    var kc = Math.round(met([108.43721, 11.94342], [ph.lon, ph.lat]) / 50) * 50;
    var h = (ph.anh ? '<img class="banner" src="' + esc(ph.anh) + '" alt="Tranh đầu ' + esc(ten) + '">'
                    : '<div class="banner none">Tranh đầu phố: đang chờ vẽ</div>') +
      '<h2>' + esc(ten) + '</h2>' +
      (ph.dac_trung ? '<p class="dac-trung">' + esc(ph.dac_trung) + '</p>' : '') +
      '<section class="phan dia-ly"><h3>🗺️ Địa lý</h3>' +
      '<div id="soDo" class="so-do" aria-label="Bản đồ ' + esc(ten) + '"><p class="note">Đang vẽ bản đồ…</p></div>' +
      '<div class="o-bt">' +
      '<span>📍 ' + esc(ph.ward.replace(' - Đà Lạt', '')) + '</span>' +
      '<span>🛣️ ' + ph.duong.filter(function (d) { return !/^Hẻm /.test(d); }).slice(0, 3).map(esc).join(', ') + '</span>' +
      '<span>🚶 ' + (kc <= 100 ? 'sát Chợ Đà Lạt' : (kc >= 2000 ? fmt(kc / 100) / 10 + ' km' : fmt(kc) + ' m') + ' tới Chợ Đà Lạt') + '</span>' +
      gan.map(function (m) { return '<span>' + bieuTuong(m.ten) + ' ' + esc(m.ten) + '</span>'; }).join('') +
      '</div>' +
      '<button class="go" type="button" id="seeMap">Xem trên bản đồ thật</button></section>';
    if (ph.chuyen) h += chuyenHtml(ph.chuyen);
    h += '<section class="phan nay"><h3>🧺 Nay có gì</h3>';
    if (ph.ban_gi) {
      h += '<div class="o-bt mon">' + ph.ban_gi.replace(/\.$/, '').split(/[;,]\s*|\s+và\s+/).map(function (x) {
        x = x.replace(/^(dọc phố có|dọc đường là|dọc đường có|quanh đó có|quanh ga có|quanh đó|gần đó|thêm|sáng có|buổi sáng|tối có|chiều tối|ban ngày là|tối thành|đầu dốc gần hồ có|rẽ sang Trương Công Định là|đi dạo quanh hồ|ven hồ có)\s*/i, '').trim();
        return x ? '<span>' + bieuTuong(x) + ' ' + esc(x.charAt(0).toUpperCase() + x.slice(1)) + '</span>' : '';
      }).join('') + '</div>';
    }
    if (moc.length) {
      h += '<h4>Mốc lâu đời</h4><ol class="bd-list">' + moc.map(function (i, k) {
        var d = ph.dia_diem[i];
        return '<li><button type="button" data-q="' + i + '"><span class="so' + (d.vi_tri ? '' : ' none') + '">' + (d.vi_tri ? k + 1 : '–') + '</span>' +
          '<b>' + bieuTuong(d.ten + ' ' + d.loai) + ' ' + esc(d.ten.replace(/\s*\(.*\)$/, '')) + '</b></button></li>';
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
    renderSoDo(ph);
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
      bd.moc.forEach(function (m) { var q = B(m.lon, m.lat); boxes.push({ x0: q[0] - 85, x1: q[0] + 85, y0: q[1] - 115, y1: q[1] + 60 }); });
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

  function showQuan(ph, d) {
    var c = document.getElementById('quanCard');
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

  function closeSheet() {
    sheet.classList.remove('full');
    if (/^#pho-/.test(location.hash)) location.replace('#da-lat');   // đóng trang phố = về bản đồ đường
    sheet.hidden = true;
    if (picked) { picked.classList.remove('picked'); picked = null; }
  }
  document.getElementById('close').addEventListener('click', closeSheet);
  document.getElementById('srcBtn').addEventListener('click', function () { closeSheet(); srcSheet.hidden = false; });
  document.getElementById('srcClose').addEventListener('click', function () { srcSheet.hidden = true; });

  /* ---------- đường dẫn tầng, chú thích ---------- */
  function renderChrome() {
    var c = document.getElementById('crumb');
    c.innerHTML = layer.crumb.map(function (b, i) {
      var last = i === layer.crumb.length - 1;
      return last ? '<span>' + esc(b[0]) + '</span>' : '<a href="#' + b[1] + '">' + esc(b[0]) + '</a>';
    }).join(' › ');
    document.getElementById('legend').innerHTML = layer.legend.map(function (l) {
      var sw = l[0] === 'star' ? '<i class="star">★</i>' : l[0] === 'pin' ? '<i class="star pin-ico">⬤</i>' : '<i class="sw ' + l[0] + '"></i>';
      return '<span>' + sw + esc(l[1]) + '</span>';
    }).join('');
    var nguon = data.nguon.concat(cache.ngoai && layer.kind !== 'duong' ? [cache.ngoai.nguon] : []);
    document.getElementById('srcList').innerHTML = nguon.map(function (n) {
      return '<li>' + esc(n.ten) + '<br><a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.link) + '</a></li>';
    }).join('');
    document.getElementById('lichBtn').hidden = layer.kind !== 'duong';
    var name = layer.crumb[layer.crumb.length - 1][0];
    svg.setAttribute('aria-label', name === 'Việt Nam' ? 'Bản đồ 34 tỉnh, thành phố Việt Nam' : 'Bản đồ xã, phường tỉnh ' + name);
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
    closeSheet(); srcSheet.hidden = true;
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
      document.getElementById('map').classList.toggle('nen-spark', id === 'viet-nam' || id === 'lam-dong');   // tầng cả nước: nét bản đồ game Gọn Phố
      document.querySelector('.osm-credit').hidden = L.kind !== 'duong';   // chỉ tầng đường dùng dữ liệu OpenStreetMap
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
