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
      if (free(right)) { lb.setAttribute('x', 14); lb.setAttribute('text-anchor', 'start'); lb.removeAttribute('hidden'); boxes.push(right); }
      else if (free(left)) { lb.setAttribute('x', -14); lb.setAttribute('text-anchor', 'end'); lb.removeAttribute('hidden'); boxes.push(left); }
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
      inner._x = px(p.lon); inner._y = py(p.lat); inner._n = p.ten_pho.length;
      inner.appendChild(el('path', { d: 'M0 0 C-4 -7 -10 -10 -10 -17 A10 10 0 1 1 10 -17 C10 -10 4 -7 0 0Z', 'class': 'pin-body', 'data-i': i }));
      inner.appendChild(el('circle', { cx: 0, cy: -17, r: 4, 'class': 'pin-dot', 'data-i': i }));
      inner.appendChild(el('text', { x: 14, y: -14, 'class': 'pin-label', 'data-i': i }, p.ten_pho));
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
    pins = []; roadLbl = []; pointLbl = [];
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
      var lb = el('text', {
        x: px(t.nhan[0]).toFixed(1), y: py(t.nhan[1]).toFixed(1),
        'class': 'lbl' + (c === 'open' ? ' open' : ''), 'data-min': layer.minZoom(t)
      }, layer.label(t));
      if (c === 'open') top.push(lb); else labels.appendChild(lb);
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

  // Tô sáng các đường của phố; trả về khung bao để phóng tới
  function highlight(names) {
    var old = document.getElementById('hl');
    if (old) old.remove();
    var g = el('g', { id: 'hl', 'class': 'hl' });
    var b = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    data.duong.forEach(function (r) {
      if (!r.ten || names.indexOf(r.ten) < 0) return;
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
    function src(list, one) {
      return '<span class="src">' + (one ? 'Mới có 1 nguồn: ' : 'Nguồn: ') + list.map(function (n) {
        return '<a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.trang) + '</a>';
      }).join(' · ') + '</span>';
    }
    var h = '<section class="chuyen"><h3>Chuyện của phố</h3>';
    if (c.ten_cu.length) {
      h += '<p class="ten-cu"><b>Tên xưa:</b> ' + c.ten_cu.map(function (t) {
        return esc(t.ten) + (t.thoi_gian ? ' <span class="muted">(' + esc(t.thoi_gian) + ')</span>' : '');
      }).join(' → ') + '</p>';
    }
    if (c.moc.length) {
      h += '<ol class="moc-nam">' + c.moc.map(function (m) {
        return '<li><b>' + esc(m.nam) + '</b><span>' + esc(m.su_kien) + '</span>' + src(m.nguon, m.mot_nguon) + '</li>';
      }).join('') + '</ol>';
    }
    c.chuyen.forEach(function (t) {
      h += '<div class="mau-chuyen"><b>' + esc(t.tieu_de) + '</b><span>' + esc(t.noi_dung) + '</span>' + src(t.nguon, t.mot_nguon) + '</div>';
    });
    return h + '</section>';
  }

  function showPho(ph) {
    phoBox = highlight(ph.duong);
    var h = (ph.anh ? '<img class="banner" src="' + esc(ph.anh) + '" alt="Tranh đầu ' + esc(ph.ten_pho) + '">'
                    : '<div class="banner none">Tranh đầu phố: đang chờ vẽ</div>') +
      '<h2>' + esc(ph.ten_pho) + '</h2>' +
      '<div>' + ph.duong.map(function (d) { return '<span class="tag open">' + esc(d) + '</span>'; }).join(' ') +
      ' <span class="tag">' + esc('Phường ' + ph.ward) + '</span></div>' +
      '<p>' + esc(ph.gioi_thieu) + '</p>' +
      '<div id="soDo" class="so-do" aria-label="Sơ đồ phố ' + esc(ph.ten_pho) + '"><p class="note">Đang vẽ phố…</p></div>' +
      '<div id="quanCard" class="quan-card" hidden></div>' +
      '<button class="go" type="button" id="seeMap">Xem cả phố trên bản đồ thật</button>' +
      '';
    if (ph.chuyen) h += chuyenHtml(ph.chuyen);
    if (ph.can_kiem_them) h += '<p class="note">Còn ' + ph.can_kiem_them + ' nơi khác chưa đủ 2 nguồn nên chưa đưa lên.</p>';
    h += ph.ten_that
      ? '<p class="note">Tên quán thật, mỗi nơi có nguồn ở ít nhất 2 trang khác nhau. Vị trí lấy từ OpenStreetMap (đúng tên quán hoặc đúng số nhà), hoặc ước theo số nhà khi ghi rõ. <a href="' + esc(ph.nghien_cuu) + '" target="_blank" rel="noopener">Xem nghiên cứu</a>.</p>'
      : '<p class="note">Chưa ghi tên quán và vị trí từng quán. Theo <a href="' + esc(ph.nghien_cuu) + '" target="_blank" rel="noopener">nghiên cứu phố</a> của game Gọn Phố.</p>';
    sheetBody.innerHTML = h;
    sheet.classList.add('full');
    sheet.scrollTop = 0;
    srcSheet.hidden = true;
    sheet.hidden = false;
    document.getElementById('seeMap').addEventListener('click', function () { closeSheet(); zoomTo(phoBox); });
    renderSoDo(ph);
    Array.prototype.forEach.call(sheetBody.querySelectorAll('[data-place]'), function (btn) {
      btn.addEventListener('click', function () {
        goPlace(ph.dia_diem[Number(btn.getAttribute('data-place'))]);
      });
    });
  }

  function goPlace(d) {
    {
      {
        closeSheet();
        if (d.vi_tri) {
          markPlace(d);
          var x = px(d.vi_tri.lon), y = py(d.vi_tri.lat), m = 0.0012 * K;   // khung ~130 m quanh quán
          zoomTo({ minX: x - m, maxX: x + m, minY: y - m, maxY: y + m });
        } else {
          zoomTo(highlight([d.duong]));
        }
      }
    }
  }

  /* ---------- bản đồ phố minh hoạ (nền: bản đồ Đà Lạt nét Spark, hướng Bắc ở trên, đúng tỉ lệ) ---------- */
  function loadJSON(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
  var banDo = null;

  function renderSoDo(ph) {
    var host = document.getElementById('soDo');
    (banDo ? Promise.resolve(banDo) : loadJSON('data/lam-dong/da-lat/ban_do.json')).then(function (bd) {
      banDo = bd;
      if (!document.getElementById('soDo')) return;
      function B(lon, lat) { return [(lon - bd.lon0) * bd.kx * bd.M * bd.px_per_m, (bd.lat1 - lat) * bd.M * bd.px_per_m]; }
      var lines = data.duong.filter(function (r) { return r.ten && ph.duong.indexOf(r.ten) >= 0; })
        .map(function (r) { return r.pts.map(function (q) { return B(q[0], q[1]); }); });
      var xs = [], ys = [];
      lines.forEach(function (l) { l.forEach(function (p) { xs.push(p[0]); ys.push(p[1]); }); });
      var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
      var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      // mốc quen gần nhất (để luôn thấy ít nhất 1 mốc trong khung) và khoảng cách tới Chợ Đà Lạt
      var cLon = ph.lon, cLat = ph.lat;
      function met(a, b) { return Math.hypot((a.lon - b.lon) * 108900, (a.lat - b.lat) * 110540); }
      var near = bd.moc.slice().sort(function (a, b) { return met(a, { lon: cLon, lat: cLat }) - met(b, { lon: cLon, lat: cLat }); })[0];
      var nb = B(near.lon, near.lat);
      if (met(near, { lon: cLon, lat: cLat }) < 900) {
        x0 = Math.min(x0, nb[0]); x1 = Math.max(x1, nb[0]); y0 = Math.min(y0, nb[1] - 40); y1 = Math.max(y1, nb[1] + 30);
      }
      // khung đủ rộng để thấy cả xóm xung quanh (≥ 1,3 km ngang), không quá cao so với bề ngang
      var pad = 80, w = Math.max(x1 - x0 + pad * 2, 300), h = Math.max(y1 - y0 + pad * 2, w * 1.1);
      w = Math.max(w, h * 0.78);
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
      ph.dia_diem.forEach(function (d) { if (d.vi_tri) { var q = B(d.vi_tri.lon, d.vi_tri.lat); boxes.push({ x0: q[0] - 13 * k, x1: q[0] + 13 * k, y0: q[1] - 13 * k, y1: q[1] + 13 * k }); } });
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
      ph.dia_diem.forEach(function (d, i) { if (d.vi_tri) { var q = B(d.vi_tri.lon, d.vi_tri.lat); dots.push({ i: i, ox: q[0], oy: q[1], x: q[0], y: q[1] }); } });
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
      var so = 0;
      ph.dia_diem.forEach(function (d, i) {
        if (!d.vi_tri) return;
        so++;
        var p = [dotAt[i].x, dotAt[i].y], r = 11 * k;
        g += '<g class="bd-cham" data-q="' + i + '" tabindex="0" role="button" aria-label="' + so + '. ' + esc(d.ten) + '">' +
          '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + r + '" class="' + (d.vi_tri.uoc ? 'uoc' : '') + '" style="stroke-width:' + (2.5 * k) + '"/>' +
          '<text x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" style="font-size:' + (12 * k) + 'px">' + so + '</text></g>';
        d._so = so;
      });
      g += '</svg>';
      var cho = bd.moc[0], kc = Math.round(met(cho, { lon: cLon, lat: cLat }) / 50) * 50;
      var list = '<ol class="bd-list">';
      ph.dia_diem.forEach(function (d, i) {
        list += '<li><button type="button" data-q="' + i + '"><span class="so' + (d._so ? '' : ' none') + '">' + (d._so || '–') + '</span>' +
          '<b>' + esc(d.ten.replace(/\s*\(.*\)$/, '')) + '</b><small>' + esc(d.dia_chi) + '</small></button></li>';
      });
      list += '</ol>';
      host.innerHTML = g +
        '<p class="bd-ghichu">' + (kc > 100 ? 'Cách Chợ Đà Lạt khoảng ' + fmt(kc) + ' m (đường chim bay). ' : 'Ngay cạnh Chợ Đà Lạt. ') +
        'Chấm số là quán; chấm viền đứt là vị trí ước theo số nhà; "–" là chưa có vị trí.</p>' + list;
      Array.prototype.forEach.call(host.querySelectorAll('[data-q]'), function (el2) {
        function open() { showQuan(ph, ph.dia_diem[Number(el2.getAttribute('data-q'))]); }
        el2.addEventListener('click', open);
        el2.addEventListener('keydown', function (e) { if (e.key === 'Enter') open(); });
      });
    }).catch(function () { host.innerHTML = '<p class="note">Chưa vẽ được bản đồ phố này.</p>'; });
  }

  function showQuan(ph, d) {
    var c = document.getElementById('quanCard');
    c.innerHTML = '<button class="close" type="button" id="quanClose" aria-label="Đóng">×</button>' +
      '<b>' + esc(d.ten) + '</b><span class="addr">' + esc(d.dia_chi) + ' · ' + esc(d.loai) + '</span>' +
      '<span>' + esc(d.dac_trung) + '</span>' +
      (/^không rõ/i.test(d.con_mo || '') ? '<span class="src warn">Chưa rõ còn mở</span>' : '') +
      (d.vi_tri && d.vi_tri.uoc ? '<span class="src">Vị trí ước theo số nhà, lệch khoảng ' + d.vi_tri.lech_m + ' m</span>' : '') +
      '<span class="src">Nguồn: ' + d.nguon.map(function (n) { return '<a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.trang) + '</a>'; }).join(' · ') + '</span>' +
      '<button class="mini" type="button" id="quanGo">Xem trên bản đồ thật</button>';
    c.hidden = false;
    c.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    document.getElementById('quanClose').addEventListener('click', function () { c.hidden = true; });
    document.getElementById('quanGo').addEventListener('click', function () { goPlace(d); });
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
