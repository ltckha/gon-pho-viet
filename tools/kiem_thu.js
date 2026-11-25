// Kiểm thử Gọn Phố Việt trên khung điện thoại (iPhone 13) — đi hết các tầng, chụp màn hình, báo lỗi.
//
// Cách chạy (trong thư mục kho):
//   python3 -m http.server 8765 &        (mở trang ở máy)
//   node tools/kiem_thu.js <thư mục lưu ảnh>
// Cần Playwright (máy Claude đã có sẵn). Thoát mã 1 nếu có lỗi.
const { chromium, devices } = require('playwright');
const OUT = process.argv[2] || '.';
const URL = process.env.URL || 'http://localhost:8765/';

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ ...devices['iPhone 13'] });
  const errs = [];
  const fail = (m) => errs.push(m);
  p.on('pageerror', (e) => fail('Lỗi trang: ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error') fail('Lỗi console: ' + m.text()); });
  const shot = (n) => p.screenshot({ path: `${OUT}/${n}.png` });
  const tapEl = async (loc) => { const x = await loc.boundingBox(); await p.touchscreen.tap(x.x + x.width / 2, x.y + x.height / 2); await p.waitForTimeout(400); };
  const zoomOn = async (loc, n) => {
    for (let i = 0; i < n; i++) { const x = await loc.boundingBox(); await p.mouse.move(x.x + x.width / 2, x.y + x.height / 2); await p.mouse.wheel(0, -400); await p.waitForTimeout(120); }
  };

  // 1. Việt Nam
  await p.goto(URL); await p.waitForTimeout(1500);
  const nTinh = await p.locator('#land path.prov').count();
  if (nTinh !== 34) fail(`Tầng Việt Nam có ${nTinh} tỉnh, phải là 34`);
  await shot('1_viet_nam');
  // kéo không được tính là bấm
  await p.mouse.move(200, 400); await p.mouse.down(); await p.mouse.move(260, 440, { steps: 5 }); await p.mouse.up();
  if (await p.isVisible('#sheet')) fail('Kéo bản đồ mà lại mở thẻ (phải là bấm mới mở)');
  await p.click('#zfit');
  await tapEl(p.locator('path.prov.open').first());
  if (!(await p.isVisible('#sheet'))) fail('Bấm Lâm Đồng không ra thẻ');
  await shot('2_the_lam_dong');

  // 2. Lâm Đồng
  await p.click('[data-go]'); await p.waitForTimeout(1500);
  const nXa = await p.locator('#land path.prov:not(.ctx)').count();
  if (nXa !== 124) fail(`Tầng Lâm Đồng có ${nXa} xã/phường, phải là 124`);
  await shot('3_lam_dong');
  await zoomOn(p.locator('path.prov.open').first(), 4);
  await tapEl(p.locator('path.prov.open').nth(1));
  await shot('4_the_phuong');

  // 3. Đường Đà Lạt
  const go = p.locator('[data-go="da-lat"]');
  if (await go.count()) { await go.click(); } else { fail('Thẻ phường không có nút xem đường'); await p.goto(URL + '#da-lat'); }
  await p.waitForTimeout(2500);
  const nPin = await p.locator('.pin-body').count();
  if (nPin < 6) fail(`Tầng đường có ${nPin} ghim phố, phải ≥ 6`);
  await shot('5_da_lat');
  await zoomOn(p.locator('.pin-body').first(), 10);
  await p.waitForTimeout(300);
  await shot('6_da_lat_gan');
  const nName = await p.locator('text.road-name:not([hidden])').count();
  if (nName < 5) fail(`Phóng gần mà chỉ hiện ${nName} tên đường`);
  await tapEl(p.locator('.pin-body').nth(2));
  if (!(await p.isVisible('#sheet'))) fail('Bấm ghim phố không ra thẻ');
  await shot('7_the_pho');

  // 4. Quay lại bằng nút quay lại
  await p.goBack(); await p.waitForTimeout(1200);
  if ((await p.locator('#land path.prov:not(.ctx)').count()) !== 124) fail('Nút quay lại không về tầng Lâm Đồng');

  await b.close();
  if (errs.length) { console.log('CÓ LỖI:\n- ' + errs.join('\n- ')); process.exit(1); }
  console.log('Ổn: 34 tỉnh, 124 xã/phường, ' + nPin + ' ghim, ' + nName + ' tên đường hiện khi phóng gần. Ảnh ở ' + OUT);
})();
