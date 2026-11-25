#!/usr/bin/env python3
"""Vẽ bản đồ minh hoạ Đà Lạt (nét Spark như game) làm nền cho trang phố: hướng Bắc ở trên, đúng tỉ lệ, có mốc quen.

Cách chạy:
  python3 tools/ve_ban_do_dalat.py /home/user/ltckha/giang-ho-ai
(đọc hình Spark trong kho game — chỉ đọc; dựa trên tools/level-maker/make_big_map.py của game)

Đọc: data/lam-dong/da-lat/duong.json (đường, hồ thật OSM), data/lam-dong/da-lat/pho.json (khung phủ hết các phố)
Ra:  assets/ban_do_dalat.webp + data/lam-dong/da-lat/ban_do.json (khung toạ độ để trang web đặt phố, quán lên đúng chỗ)
"""
import json
import math
import os
import random
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INK = (43, 26, 18)
PX_PER_M = 0.4
MARGIN_M = 450
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
# Mốc (hình Spark đợt 35 trong kho game): tên hình, vĩ độ, kinh độ, cỡ
LANDMARKS = [
    ('moc_cho_da_lat', 11.94342, 108.43721, 150),
    ('moc_nha_tho_con_ga', 11.93632, 108.43775, 140),
    ('moc_quang_truong', 11.93884, 108.44501, 140),
    ('moc_ga_da_lat', 11.94180, 108.45470, 160),
    ('moc_vuon_hoa', 11.95020, 108.44930, 140),
]
MOC_TEN = {'moc_cho_da_lat': 'Chợ Đà Lạt', 'moc_nha_tho_con_ga': 'Nhà thờ Con Gà', 'moc_quang_truong': 'Quảng trường Lâm Viên',
           'moc_ga_da_lat': 'Ga Đà Lạt', 'moc_vuon_hoa': 'Vườn hoa thành phố'}


def main(game):
    BD = os.path.join(game, 'art', 'ban_do')
    SP = os.path.join(game, 'art', 'spark')
    duong = json.load(open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'duong.json'), encoding='utf-8'))
    pho = json.load(open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'pho.json'), encoding='utf-8'))
    names = {n for p in pho['pho'] for n in p['duong']}
    pts = [q for d in duong['duong'] if d.get('ten') in names for q in d['pts']] + [(lo, la) for _, la, lo, _ in LANDMARKS]
    lon0 = min(p[0] for p in pts); lon1 = max(p[0] for p in pts)
    lat0 = min(p[1] for p in pts); lat1 = max(p[1] for p in pts)
    M = 111320.0
    kx = math.cos(math.radians((lat0 + lat1) / 2))
    dlon = MARGIN_M / (M * kx); dlat = MARGIN_M / M
    lon0 -= dlon; lon1 += dlon; lat0 -= dlat; lat1 += dlat
    W = int((lon1 - lon0) * kx * M * PX_PER_M)
    H = int((lat1 - lat0) * M * PX_PER_M)

    def P(lon, lat):
        return ((lon - lon0) * kx * M * PX_PER_M, (lat1 - lat) * M * PX_PER_M)

    def load(path, size=None):
        if not os.path.exists(path):
            return None
        im = Image.open(path).convert('RGBA')
        bb = im.getbbox()
        if bb:
            im = im.crop(bb)
        if size:
            im.thumbnail((size, size), Image.LANCZOS)
        return im

    def tiled(name, tile):
        t = Image.open(os.path.join(BD, name + '.png')).convert('RGBA').resize((tile, tile), Image.LANCZOS)
        out = Image.new('RGBA', (W, H))
        for y in range(0, H, tile):
            for x in range(0, W, tile):
                out.paste(t, (x, y))
        return out

    rnd = random.Random(35)
    # 1. nền cỏ + mảng đất đỏ
    im = tiled('nen_bd_co_thong', 240)
    dirt = tiled('nen_bd_dat_doi', 240)
    mask = Image.new('L', (W, H), 0)
    md = ImageDraw.Draw(mask)
    for _ in range(int(W * H / 90000)):
        cx, cy, r = rnd.uniform(0, W), rnd.uniform(0, H), rnd.uniform(90, 200)
        md.ellipse([cx - r, cy - r * 0.7, cx + r, cy + r * 0.7], fill=170)
    im.paste(dirt, (0, 0), mask.filter(ImageFilter.GaussianBlur(30)))
    d = ImageDraw.Draw(im)
    # 2. hồ
    water = tiled('nen_bd_nuoc_ho', 200)
    wm = Image.new('L', (W, H), 0)
    wd = ImageDraw.Draw(wm)
    for w in duong['nuoc']:
        q = [P(*p) for p in w['pts']]
        if len(q) >= 3:
            wd.polygon(q, fill=255)
    im.paste(water, (0, 0), wm)
    d = ImageDraw.Draw(im)
    for w in duong['nuoc']:
        q = [P(*p) for p in w['pts']]
        if len(q) >= 3:
            d.line(q + [q[0]], fill=INK, width=4)
    # 3. đường: đường lớn rộng, đường nhỏ hẹp (đường phố nào cũng vẽ)
    WID = {1: 18, 2: 15, 3: 12, 4: 7}
    roads = [r for r in duong['duong'] if r['loai'] <= 4]
    roads.sort(key=lambda r: -r['loai'])
    for r in roads:
        q = [P(*p) for p in r['pts']]
        d.line(q, fill=(112, 86, 60), width=WID[r['loai']] + 5, joint='curve')
    for r in roads:
        q = [P(*p) for p in r['pts']]
        d.line(q, fill=(246, 234, 206), width=WID[r['loai']], joint='curve')
    # 4. nhà ven đường, cây thông xa đường (lưới để dò nhanh)
    G = 60
    grid = {}
    for r in roads:
        q = [P(*p) for p in r['pts']]
        for a, b in zip(q, q[1:]):
            for gx in range(int(min(a[0], b[0]) // G) - 1, int(max(a[0], b[0]) // G) + 2):
                for gy in range(int(min(a[1], b[1]) // G) - 1, int(max(a[1], b[1]) // G) + 2):
                    grid.setdefault((gx, gy), []).append((a, b))

    def segd(p, a, b):
        dx, dy = b[0] - a[0], b[1] - a[1]
        t = max(0, min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / ((dx * dx + dy * dy) or 1)))
        return math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)

    def near_road(p):
        segs = grid.get((int(p[0] // G), int(p[1] // G)), [])
        return min((segd(p, a, b) for a, b in segs), default=999)

    in_lake = lambda p: wm.getpixel((int(min(max(p[0], 0), W - 1)), int(min(max(p[1], 0), H - 1)))) > 0
    lm_pts = [P(lo, la) for _, la, lo, _ in LANDMARKS]
    houses = [h for h in (load(os.path.join(SP, 'deco_%s.png' % n), 46) for n in
                          ['nha_dalat_1', 'nha_dalat_2', 'nha_pho_1', 'nha_pho_2', 'nha_pho_3']) if h]
    tree = load(os.path.join(SP, 'deco_cay_thong.png'), 56)
    sakura = load(os.path.join(SP, 'deco_cay_mai_anh_dao.png'), 54)
    items, placed = [], []
    nh = nt = 0
    for _ in range(int(W * H / 150)):
        p = (rnd.uniform(20, W - 20), rnd.uniform(30, H - 20))
        if in_lake(p) or any(math.hypot(p[0] - q[0], p[1] - q[1]) < 38 for q in placed[-400:]):
            continue
        if any(math.hypot(p[0] - q[0], p[1] - q[1]) < 100 for q in lm_pts):
            continue
        dr = near_road(p)
        if 16 < dr < 30 and houses and nh < W * H / 6000:
            items.append((p, rnd.choice(houses))); placed.append(p); nh += 1
        elif dr > 45 and tree and nt < W * H / 5000:
            items.append((p, sakura if (sakura is not None and rnd.random() < 0.15) else tree)); placed.append(p); nt += 1
    for name, la, lo, size in LANDMARKS:
        img = load(os.path.join(BD, name + '.png'), size)
        if img is not None:
            items.append((P(lo, la), img))
    for p, img in sorted(items, key=lambda t: t[0][1]):
        im.alpha_composite(img, (int(p[0] - img.width / 2), int(p[1] - img.height * 0.8)))
    # 5. tên đường thật dọc đường, tên mốc, tên hồ, tên phường
    d = ImageDraw.Draw(im)
    road_font = ImageFont.truetype(FONT, 15)
    big = ImageFont.truetype(FONT, 26)
    mid_font = ImageFont.truetype(FONT, 17)
    # Tên đường KHÔNG in vào ảnh: trang web tự ghi tên chạy uốn theo đường (anh Kha: chữ phải ôm theo con đường)
    d = ImageDraw.Draw(im)
    for name, la, lo, size in LANDMARKS:
        x, y = P(lo, la)
        t = MOC_TEN[name]
        tw = d.textlength(t, font=mid_font)
        d.text((x - tw / 2, y + size * 0.22), t, font=mid_font, fill=(90, 40, 20), stroke_width=4, stroke_fill=(255, 248, 228))
    for w in duong['nuoc']:
        if w.get('ten') in ('Hồ Xuân Hương', 'Hồ Tuyền Lâm', 'Hồ Than Thở', 'Hồ Chiến Thắng'):
            q = [P(*p) for p in w['pts']]
            lx = sum(p[0] for p in q) / len(q); ly = sum(p[1] for p in q) / len(q)
            if 0 < lx < W and 0 < ly < H:
                tw = d.textlength(w['ten'], font=big)
                d.text((lx - tw / 2, ly - 14), w['ten'], fill=(255, 255, 255), font=big, stroke_width=4, stroke_fill=(40, 90, 130))
    small = ImageFont.truetype(FONT, 16)
    txt = '© OpenStreetMap contributors · hình: Spark (Gọn Phố)'
    tw = d.textlength(txt, font=small)
    d.rounded_rectangle([W - tw - 26, H - 34, W - 6, H - 8], 8, fill=INK)
    d.text((W - tw - 16, H - 31), txt, fill=(250, 244, 226), font=small)

    out = os.path.join(ROOT, 'assets', 'ban_do_dalat.webp')
    im.convert('RGB').save(out, 'WEBP', quality=72, method=6)
    meta = {'anh': 'assets/ban_do_dalat.webp', 'w': W, 'h': H, 'lon0': lon0, 'lat1': lat1, 'kx': kx, 'px_per_m': PX_PER_M, 'M': M,
            'moc': [{'ten': MOC_TEN[n], 'lon': lo, 'lat': la} for n, la, lo, _ in LANDMARKS],
            'nguon': '© OpenStreetMap contributors · hình Spark của game Gọn Phố'}
    json.dump(meta, open(os.path.join(ROOT, 'data', 'lam-dong', 'da-lat', 'ban_do.json'), 'w', encoding='utf-8'), ensure_ascii=False)
    print(out, W, 'x', H, os.path.getsize(out) // 1024, 'KB')


if __name__ == '__main__':
    main(sys.argv[1])
