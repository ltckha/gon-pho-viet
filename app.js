/* Gọn Phố Việt — bản đồ nhiều tầng: Việt Nam (chặng 1) → Lâm Đồng (chặng 2) → …
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
      legend: [['open', 'Có phố (bản đồ đường sắp có)'], ['dalat', 'Phường khác của Đà Lạt'], ['ward', 'Phường'], ['soon', 'Xã, đặc khu']],
      card: cardPhuong
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

  var view = { s: 1, x: 0, y: 0 };
  var fit = { s: 1, x: 0, y: 0 };
  var bounds = null;
  var layer = null, layerId = null, data = null, picked = null;
  var cache = {};

  function px(lon) { return (lon - LON0) * K * COS; }
  function py(lat) { return (LAT0 - lat) * K; }

  function pathOf(polys) {
    var d = '';
    for (var i = 0; i < polys.length; i++) {
      for (var j = 0; j < polys[i].length; j++) {
        var r = polys[i][j];
        for (var k = 0; k < r.length; k++) {
          d += (k ? 'L' : 'M') + px(r[k][0]).toFixed(1) + ' ' + py(r[k][1]).toFixed(1);
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
  function draw() {
    land.textContent = '';
    labels.textContent = '';
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
    var list = labels.childNodes;
    for (var i = 0; i < list.length; i++) {
      var mx = list[i].getAttribute('data-max');
      var hide = z < Number(list[i].getAttribute('data-min')) || (mx && z >= Number(mx));
      if (hide) list[i].setAttribute('hidden', ''); else list[i].removeAttribute('hidden');
    }
  }

  function zoomAt(f, cx, cy) {
    var ns = Math.max(fit.s * 0.8, Math.min(fit.s * 60, view.s * f));
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
    picked = target; picked.classList.add('picked');
    land.appendChild(target);   // đưa lên trên để viền không bị che
    sheetBody.innerHTML = layer.card(data[layer.list][Number(i)]);
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
    if (p.so_pho) h += '<button class="go" type="button" disabled>Bản đồ đường (chặng 3, sắp có)</button>';
    h += '<p class="note">Theo Nghị quyết 1671/NQ-UBTVQH15, Điều 1 khoản ' + p.muc_nq + '.</p>';
    return h;
  }

  function closeSheet() {
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
      var sw = l[0] === 'star' ? '<i class="star">★</i>' : '<i class="sw ' + l[0] + '"></i>';
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
    if (!LAYERS[id]) id = 'viet-nam';
    if (id === layerId) return;
    closeSheet(); srcSheet.hidden = true;
    loading.hidden = false; loading.textContent = 'Đang tải bản đồ…';
    var L = LAYERS[id];
    function load(k) {
      return cache[k] ? Promise.resolve(cache[k]) : fetch(LAYERS[k].file).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      }).then(function (d) { cache[k] = d; return d; });
    }
    Promise.all([load(id), L.context ? load(L.context.layer) : null]).then(function (res) {
      var d = res[0];
      data = d; layer = L; layerId = id;
      renderChrome();
      draw();
      loading.hidden = true;
    }).catch(function () {
      loading.textContent = 'Chưa tải được bản đồ. Anh tải lại trang thử nhé.';
    });
  }
  window.addEventListener('hashchange', go);
  go();
})();
