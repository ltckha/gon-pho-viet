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
      cls: function (p) { return p.so_pho ? 'open' : (p.da_lat ? 'dalat' : (p.loai === 'Phường' ? 'ward' : '')); },
      minZoom: function (p) { return p.da_lat ? 3.2 : (p.loai === 'Xã' ? 4.5 : 2.2); },
      label: function (p) { return p.ten; },
      // Tên gom "Đà Lạt" ở tầm cả tỉnh, phóng tới 5 phường thì ẩn đi
      extraLabels: [['Đà Lạt', 108.44, 11.97, 0, 3.2, 'open']],
      legend: [['open', 'Có phố, bấm để xem đường'], ['dalat', 'Phường khác của Đà Lạt'], ['ward', 'Phường'], ['soon', 'Xã, đặc khu']],
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
      if (on) {
        w.hinh.forEach(function (pl) {
          pl[0].forEach(function (q) {
            var x = px(q[0]), y = py(q[1]);
            minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
          });
        });
        labels.appendChild(el('text', { x: px(w.nhan[0]), y: py(w.nhan[1]), 'class': 'lbl ward-name', 'data-min': 0, 'data-max': 3 }, 'Phường ' + w.ten));
      }
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
      var pe0 = el('path', { id: id, d: lineOf(r.pts) });
      defs.appendChild(pe0);
      var L0 = pe0.getTotalLength();
      if (pe0.getPointAtLength(L0 * 0.6).x < pe0.getPointAtLength(L0 * 0.4).x) {
        pe0.setAttribute('d', lineOf(r.pts.slice().reverse()));  // chữ chạy trái sang phải, không lộn ngược
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
    data.pho.forEach(function (p, i) {
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
      var ph = phoById(data.pho[Number(i)].id);
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
    if (p.so_pho) h += '<button class="go" type="button" data-go="da-lat">Xem đường phố Đà Lạt →</button>';
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
    inner.appendChild(el('circle', { r: 9, 'class': 'place-dot' }));
    inner.appendChild(el('text', { x: 0, y: -16, 'class': 'pin-label', 'text-anchor': 'middle' }, d.ten));
    inner._x = px(d.vi_tri.lon); inner._y = py(d.vi_tri.lat); inner._n = 0; inner._fixed = true;
    g.appendChild(inner);
    pinsRoot.appendChild(g);
    pins.push(inner);
  }
  function showPho(ph) {
    phoBox = highlight(ph.duong);
    var h = '<img class="banner" src="' + esc(ph.anh) + '" alt="Tranh đầu ' + esc(ph.ten_pho) + '">' +
      '<h2>' + esc(ph.ten_pho) + '</h2>' +
      '<div>' + ph.duong.map(function (d) { return '<span class="tag open">' + esc(d) + '</span>'; }).join(' ') +
      ' <span class="tag">' + esc('Phường ' + ph.ward) + '</span></div>' +
      '<p>' + esc(ph.gioi_thieu) + '</p>' +
      '<button class="go" type="button" id="seeMap">Xem cả phố trên bản đồ</button>' +
      '<h3>Nơi tiêu biểu <span class="muted">(' + ph.dia_diem.length + ' nơi, mỗi nơi ≥ 2 nguồn)</span></h3><ol class="places">';
    ph.dia_diem.forEach(function (d, k) {
      h += '<li>' + (d.ten
        ? '<b>' + esc(d.ten) + '</b><span class="addr">' + esc(d.dia_chi) + ' · ' + esc(d.loai) + '</span>'
        : '<b>' + esc(d.loai) + '</b>') +
        '<span>' + esc(d.dac_trung) + '</span>' +
        (d.ten ? (d.vi_tri
          ? '<button class="mini" type="button" data-place="' + k + '">Xem chỗ quán trên bản đồ</button>'
          : '<button class="mini" type="button" data-place="' + k + '">Xem đường ' + esc(d.duong) + '</button><span class="src">Chưa có vị trí chính xác trên bản đồ</span>') : '') +
        '<span class="src">Nguồn: ' +
        d.nguon.map(function (n, k) {
          var dup = d.nguon.filter(function (m) { return m.trang === n.trang; }).length > 1;
          return '<a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.trang) + (dup ? ' (bài ' + (k + 1) + ')' : '') + '</a>';
        }).join(' · ') +
        '</span></li>';
    });
    h += '</ol>';
    if (ph.can_kiem_them) h += '<p class="note">Còn ' + ph.can_kiem_them + ' nơi khác chưa đủ 2 nguồn nên chưa đưa lên.</p>';
    h += ph.ten_that
      ? '<p class="note">Tên quán thật, mỗi nơi có nguồn ở ít nhất 2 trang khác nhau. Vị trí chỉ ghi khi OpenStreetMap có đúng tên quán hoặc đúng số nhà. <a href="' + esc(ph.nghien_cuu) + '" target="_blank" rel="noopener">Xem nghiên cứu</a>.</p>'
      : '<p class="note">Chưa ghi tên quán và vị trí từng quán. Theo <a href="' + esc(ph.nghien_cuu) + '" target="_blank" rel="noopener">nghiên cứu phố</a> của game Gọn Phố.</p>';
    sheetBody.innerHTML = h;
    sheet.classList.add('full');
    sheet.scrollTop = 0;
    srcSheet.hidden = true;
    sheet.hidden = false;
    document.getElementById('seeMap').addEventListener('click', function () { closeSheet(); zoomTo(phoBox); });
    Array.prototype.forEach.call(sheetBody.querySelectorAll('[data-place]'), function (btn) {
      btn.addEventListener('click', function () {
        var d = ph.dia_diem[Number(btn.getAttribute('data-place'))];
        closeSheet();
        if (d.vi_tri) {
          markPlace(d);
          var x = px(d.vi_tri.lon), y = py(d.vi_tri.lat), m = 0.0012 * K;   // khung ~130 m quanh quán
          zoomTo({ minX: x - m, maxX: x + m, minY: y - m, maxY: y + m });
        } else {
          zoomTo(highlight([d.duong]));
        }
      });
    });
  }

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
    document.getElementById('srcList').innerHTML = data.nguon.map(function (n) {
      return '<li>' + esc(n.ten) + '<br><a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.link) + '</a></li>';
    }).join('');
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
    Promise.all([load(id), L.context ? load(L.context.layer) : null, L.extra ? loadExtra(L.extra) : null]).then(function (res) {
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
