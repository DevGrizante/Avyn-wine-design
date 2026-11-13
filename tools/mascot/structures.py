"""AVYN mascot — structural silhouette tests (no face, no color).
One geometry source -> SVG files (repo) + PIL renders (evaluation)."""
import math, os
from PIL import Image, ImageDraw, ImageFont

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(REPO, "assets", "brand", "mascot", "structure-tests")
os.makedirs(OUT, exist_ok=True)
BG, INK = "#E7E6E3", "#141414"
GAP = 5  # knock-out ring between overlapping berries (in 400-unit space)

def bez(p0, p1, p2, n=24):
    return [((1-t)**2*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0], (1-t)**2*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]) for t in [i/n for i in range(n+1)]]

def rot(pt, ang, origin):
    a = math.radians(ang); x, y = pt[0]-origin[0], pt[1]-origin[1]
    return (origin[0]+x*math.cos(a)-y*math.sin(a), origin[1]+x*math.sin(a)+y*math.cos(a))

def leaf_lobes(base, axis_deg, lobes):
    """Leaf = union of circles. lobes: list of (angle_offset, distance, radius)."""
    out = []
    for off, d, r in lobes:
        a = math.radians(axis_deg + off)
        out.append((base[0] + d*math.cos(a), base[1] + d*math.sin(a), r))
    return out

# ---------------- structures ----------------
def leaf_poly(c, R, axis, peaks, w=24, base=0.6, amp=0.4, n=360):
    """Palmate vine leaf: polar profile with gaussian lobes and a heart-shaped petiole sinus at the back."""
    pts = []
    for i in range(n):
        phi = -180 + 360*i/n
        f = base + amp*max(math.exp(-((phi-p)/w)**2) for p in peaks)
        b = abs(phi)
        if b > 125: f *= max(0.12, 1 - ((b-125)/55)**1.4*0.88)
        a = math.radians(axis + phi)
        pts.append((c[0] + R*f*math.cos(a), c[1] + R*f*math.sin(a)))
    return pts

def back_pt(c, R, axis, k=0.18):
    a = math.radians(axis + 180); return (c[0] + R*k*math.cos(a), c[1] + R*k*math.sin(a))

def struct_A():
    rows = [(4, 36, 150), (3, 34, 207), (2, 32, 260), (1, 30, 309)]
    berries = []
    for n, r, y in rows:
        pitch = r*1.78
        for i in range(n):
            berries.append((200 + (i-(n-1)/2)*pitch, y, r))
    stem = bez((200, 120), (197, 92), (190, 66))
    c, R, ax = (258, 74), 40, -20
    leaf = leaf_poly(c, R, ax, [0, -64, 64], w=30, base=0.7, amp=0.3)
    pet = bez((198, 100), (214, 98), back_pt(c, R, ax), 8)
    return dict(berries=berries, stems=[stem, pet], polys=[leaf], veins=[], stem_w=10)

def struct_B():
    berries = [
        (152, 150, 33), (216, 138, 37), (280, 156, 30),
        (100, 190, 29),
        (160, 210, 33), (226, 204, 34), (284, 218, 25),
        (196, 264, 31), (256, 266, 27),
        (232, 316, 26),
    ]
    stem = bez((214, 104), (210, 80), (200, 58))
    c, R, ax = (284, 70), 46, -16
    leaf = leaf_poly(c, R, ax, [0, -48, 48, -100, 100], w=21, base=0.68, amp=0.32)
    pet = bez((211, 88), (230, 86), back_pt(c, R, ax), 8)
    return dict(berries=berries, stems=[stem, pet], polys=[leaf], veins=[], stem_w=10)

def struct_C():
    r, pitch = 30, 66
    dy = pitch*0.866
    berries = []
    for k, n in enumerate([4, 3, 2, 1]):
        for i in range(n):
            berries.append((200 + (i-(n-1)/2)*pitch, 152 + k*dy, r))
    stem = [[(200, 118), (200, 76)], [(200, 76), (226, 76)]]
    o, L, Wd, ang = (226, 76), 70, 40, -32   # leaf rises from the stem end
    a = math.radians(ang); ux, uy = math.cos(a), math.sin(a); nx, ny = -uy, ux
    P = lambda t, s: (o[0] + ux*L*t + nx*Wd/2*s, o[1] + uy*L*t + ny*Wd/2*s)
    diamond = [P(0, 0), P(0.5, -1), P(1, 0), P(0.5, 1)]
    vein = [P(0.12, 0), P(0.78, 0)]
    return dict(berries=berries, stems=stem, polys=[diamond], round_polys=True, veins=[vein], stem_w=9, gap=0)

STRUCTS = {"A": struct_A(), "B": struct_B(), "C": struct_C()}

# ---------------- renderers ----------------
def to_svg(s, gaps=True, size=400):
    g = s.get("gap", GAP) if gaps else 0
    parts = [f'<rect width="400" height="400" fill="{BG}"/>']
    for line in s["stems"]:
        d = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in line)
        parts.append(f'<path d="{d}" stroke="{INK}" stroke-width="{s["stem_w"]}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>')
    for poly in s["polys"]:
        pts = " ".join(f"{x:.1f},{y:.1f}" for x, y in poly)
        extra = f' stroke="{INK}" stroke-width="10" stroke-linejoin="round"' if s.get("round_polys") else ""
        parts.append(f'<polygon points="{pts}" fill="{INK}"{extra}/>')
    for v in s["veins"]:
        d = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in v)
        parts.append(f'<path d="{d}" stroke="{BG}" stroke-width="3.5" stroke-linecap="round" fill="none"/>')
    for x, y, r in s["berries"]:
        if g: parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r+g}" fill="{BG}"/>')
        parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{INK}"/>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="{size}" height="{size}">' + "".join(parts) + "</svg>"

def to_png(s, gaps=True, px=400, ss=4):
    k = px*ss/400; g = s.get("gap", GAP) if gaps else 0
    im = Image.new("RGB", (px*ss, px*ss), BG); d = ImageDraw.Draw(im)
    def C(x, y, r, col): d.ellipse([(x-r)*k, (y-r)*k, (x+r)*k, (y+r)*k], fill=col)
    def L(line, col, w):
        pts = [(x*k, y*k) for x, y in line]
        d.line(pts, fill=col, width=max(1, int(w*k)), joint="curve")
        for x, y in (line[0], line[-1]): C(x, y, w/2, col)
    for line in s["stems"]: L(line, INK, s["stem_w"])
    for poly in s["polys"]:
        pts = [(x*k, y*k) for x, y in poly]
        d.polygon(pts, fill=INK)
        if s.get("round_polys"):
            L(poly + [poly[0]], INK, 10)
    for v in s["veins"]: L(v, BG, 3.5)
    for x, y, r in s["berries"]:
        if g: C(x, y, r+g, BG)
        C(x, y, r, INK)
    return im.resize((px, px), Image.LANCZOS)

def main():
    # files
    for key, s in STRUCTS.items():
        open(os.path.join(OUT, f"{key}-silhouette.svg"), "w", encoding="utf-8").write(to_svg(s, True))
        open(os.path.join(OUT, f"{key}-contour-only.svg"), "w", encoding="utf-8").write(to_svg(s, False))

    # evaluation sheet: rows = A,B,C ; cols = with gaps | contour only | 64 | 32 | 16 px | 32 and 16 px zoomed x4
    try: F = ImageFont.truetype("arial.ttf", 18); FB = ImageFont.truetype("arialbd.ttf", 26)
    except OSError: F = FB = ImageFont.load_default()
    NAMES = {"A": "A  Compacta 4-3-2-1", "B": "B  Organica assimetrica", "C": "C  Geometrica 4-3-2-1"}
    LBL = 64
    W, H = LBL + 400*2 + 64 + 32 + 16 + 32*4 + 16*4 + 9*24, 3*464 + 64
    sheet = Image.new("RGB", (W, H), "#FFFFFF"); dr = ImageDraw.Draw(sheet)
    heads = [("com separacao", 400), ("so contorno", 400), ("64", 64), ("32", 32), ("16", 16), ("32 x4", 128), ("16 x4", 64)]
    x = LBL + 24
    for t, w in heads:
        dr.text((x, 24), t, fill="#555555", font=F); x += w + 24
    for row, (key, s) in enumerate(STRUCTS.items()):
        y = 64 + row*464; x = LBL + 24
        dr.text((24, y + 4), key, fill="#141414", font=FB)
        dr.text((x, y + 408), NAMES[key], fill="#555555", font=F)
        for im in (to_png(s, True), to_png(s, False)):
            sheet.paste(im, (x, y)); x += 424
        for px in (64, 32, 16):
            sheet.paste(to_png(s, True, px), (x, y + 400 - px)); x += px + 24
        for px in (32, 16):
            z = to_png(s, True, px).resize((px*4, px*4), Image.NEAREST)
            sheet.paste(z, (x, y + 400 - px*4)); x += px*4 + 24
    sheet.save(os.path.join(OUT, "evaluation-sheet.png"))
    for key, s in STRUCTS.items():
        to_png(s, True, 800).save(os.path.join(OUT, f"{key}-silhouette.png"))
    print("ok", [len(s["berries"]) for s in STRUCTS.values()])

if __name__ == "__main__":
    main()
