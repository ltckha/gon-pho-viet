/* Gọn Phố Việt — tầng Việt Nam (chặng 1).
   Vẽ 34 tỉnh/thành từ data/viet-nam.json bằng SVG; kéo 1 ngón, phóng 2 ngón; bấm tỉnh ra thẻ thông tin.
   Không dùng thư viện ngoài. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var K = 100;                                  // điểm vẽ cho 1 độ
  var COS = Math.cos(16 * Math.PI / 180);       // nắn kinh độ ở vĩ độ giữa Việt Nam
  var LON0 = 100, LAT0 = 25;
  var TAP_SLOP = 6;                             // kéo quá 6 điểm thì không tính là bấm (giống game)
  // Phóng tới mức nào thì hiện tên (1 = cả nước). Tầm cả nước chỉ hiện vài tên cách xa nhau cho khỏi đè.
  var LABEL_ZOOM = { '68': 0, '01': 0, '79': 0, '46': 0, '48': 0, '92': 0, '31': 1.8, '22': 1.8, '24': 1.8, '75': 1.8 };
  var LABEL_ALL_ZOOM = 2.6;
  var LON_MAX_FIT = 116;                        // khung mở đầu: cắt bớt biển trống phía đông Trường Sa

  var svg = document.getElementById('svg');
  var world = document.getElementById('world');
  var land = document.getElementById('land');
  var labels = document.getElementById('labels');
  var sheet = document.getElementById('sheet');
  var sheetBody = document.getElementById('sheetBody');
  var srcSheet = document.getElementById('srcSheet');

  var view = { s: 1, x: 0, y: 0 };              // phóng và dời (điểm màn hình)
  var fit = { s: 1, x: 0, y: 0 };
  var bounds = null;
  var data = null;
  var picked = null;

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

  function fmt(n) { return Number(n).toLocaleString('vi-VN', { maximumFractionDigits: 0 }); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- vẽ ---------- */
  function draw() {
    var openLabels = [];
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    data.tinh.forEach(function (t) {
      var p = el('path', { d: pathOf(t.hinh), 'class': 'prov' + (t.da_mo ? ' open' : ''), 'data-ma': t.ma });
      land.appendChild(p);
      t.hinh.forEach(function (pl) {
        pl[0].forEach(function (c) {
          var x = px(c[0]), y = py(c[1]);
          if (x < minX) minX = x; if (x > maxX && c[0] <= LON_MAX_FIT) maxX = x;
          if (y < minY) minY = y; if (y > maxY) maxY = y;
        });
      });
      var lb = el('text', {
        x: px(t.nhan[0]).toFixed(1), y: py(t.nhan[1]).toFixed(1),
        'class': 'lbl' + (t.da_mo ? ' open' : ''),
        'data-min': t.ma in LABEL_ZOOM ? LABEL_ZOOM[t.ma] : LABEL_ALL_ZOOM
      }, (t.loai === 'Thành phố' ? '★ ' : '') + t.ten);
      if (t.da_mo) openLabels.push(lb); else labels.appendChild(lb);
    });
    // Tên hai quần đảo (thuộc Đà Nẵng và Khánh Hoà)
    [['Quần đảo Hoàng Sa', 111.9, 17.25], ['Quần đảo Trường Sa', 113.4, 11.3]].forEach(function (q) {
      labels.appendChild(el('text', { x: px(q[1]), y: py(q[2]), 'class': 'lbl sea', 'data-min': 0 }, q[0]));
    });
    openLabels.forEach(function (lb) { labels.appendChild(lb); });  // tên tỉnh đã mở nằm trên cùng
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
    var z = view.s / fit.s;                       // 1 = cả nước
    var fs = 11 / view.s, sw = 3 / view.s;
    labels.setAttribute('font-size', fs.toFixed(3));
    labels.setAttribute('stroke-width', sw.toFixed(3));
    var list = labels.childNodes;
    for (var i = 0; i < list.length; i++) {
      if (z < Number(list[i].getAttribute('data-min'))) list[i].setAttribute('hidden', ''); else list[i].removeAttribute('hidden');
    }
  }

  function zoomAt(f, cx, cy) {
    var ns = Math.max(fit.s * 0.8, Math.min(fit.s * 40, view.s * f));
    f = ns / view.s;
    view.x = cx - (cx - view.x) * f;
    view.y = cy - (cy - view.y) * f;
    view.s = ns;
    apply();
  }

  /* ---------- kéo, phóng, bấm ---------- */
  var pts = {};       // ngón đang chạm
  var start = null;   // {x,y,moved,target}
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
    if (count() === 1) {           // còn 1 ngón: tiếp tục kéo từ chỗ ngón đó
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
    var ma = target && target.getAttribute && target.getAttribute('data-ma');
    if (!ma) { closeSheet(); return; }
    var t = data.tinh.filter(function (x) { return x.ma === ma; })[0];
    if (picked) picked.classList.remove('picked');
    picked = target; picked.classList.add('picked');
    land.appendChild(target);   // đưa lên trên để viền không bị che
    show(t);
  }

  function show(t) {
    var full = (t.loai === 'Thành phố' ? 'Thành phố ' : 'Tỉnh ') + t.ten;
    var gop = t.tinh_cu.length
      ? 'Gộp từ ' + t.tinh_cu.map(esc).join(', ')
      : 'Giữ nguyên, không sáp nhập';
    var html = '<h2>' + esc(full) + '</h2><div>';
    if (t.loai === 'Thành phố') html += '<span class="tag">★ Thành phố trực thuộc trung ương</span> ';
    html += t.da_mo ? '<span class="tag open">Có bản đồ phố</span>' : '<span class="tag">Bản đồ phố: sắp có</span>';
    html += '</div><dl class="facts">' +
      '<dt>Hình thành</dt><dd>' + gop + '</dd>' +
      '<dt>Diện tích</dt><dd>' + fmt(t.dien_tich_km2) + ' km²</dd>' +
      '<dt>Xã/phường</dt><dd>' + fmt(t.so_xa_phuong) + '</dd>';
    if (t.len_thanh_pho) html += '<dt>Lên thành phố</dt><dd>từ ' + esc(t.len_thanh_pho.ngay) + '</dd>';
    html += '</dl>';
    if (t.da_mo) {
      html += '<button class="go" type="button" disabled>Vào ' + esc(t.ten) + ' · ' + esc(t.da_mo) + ' (chặng 2, sắp có)</button>';
    }
    html += '<p class="note">Theo địa giới mới từ 1/7/2025 (Nghị quyết 202/2025/QH15).</p>';
    sheetBody.innerHTML = html;
    srcSheet.hidden = true;
    sheet.hidden = false;
  }

  function closeSheet() {
    sheet.hidden = true;
    if (picked) { picked.classList.remove('picked'); picked = null; }
  }
  document.getElementById('close').addEventListener('click', closeSheet);
  document.getElementById('srcBtn').addEventListener('click', function () { closeSheet(); srcSheet.hidden = false; });
  document.getElementById('srcClose').addEventListener('click', function () { srcSheet.hidden = true; });

  /* ---------- tải dữ liệu ---------- */
  fetch('data/viet-nam.json')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (d) {
      data = d;
      document.getElementById('srcList').innerHTML = d.nguon.map(function (n) {
        return '<li>' + esc(n.ten) + '<br><a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.link) + '</a></li>';
      }).join('');
      draw();
      document.getElementById('loading').hidden = true;
    })
    .catch(function () {
      document.getElementById('loading').textContent = 'Chưa tải được bản đồ. Anh tải lại trang thử nhé.';
    });
})();
