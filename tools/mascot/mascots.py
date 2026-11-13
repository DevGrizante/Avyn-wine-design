"""AVYN mascot — character candidates built on the validated cluster structures.
Primitives -> SVG (source) + PIL PNG (preview/evaluation). Run: python tools/mascot/mascots.py"""
import math, os
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from structures import struct_A, struct_B, struct_C, leaf_poly, back_pt, bez, GAP

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(REPO, "assets", "brand", "mascot", "candidates-v2")
os.makedirs(OUT, exist_ok=True)

# provisional colours (stage 5 will refine): 2 main colours = grape + leaf
BG = "#F4EDE3"
GRAPE, GRAPE_HI = "#5E1F3D", "#8A4363"
LEAF, STEM = "#6F8A4A", "#4F6436"
EYE, PUPIL = "#FBF6EE", "#1C0B14"

def struct_AB():
    """A's rows + B's shoulder: left top berry dropped and smaller, tip offset right."""
    berries = [(104, 164, 33), (168, 148, 37), (234, 146, 37), (298, 154, 34),
               (136, 210, 34), (202, 206, 35), (266, 210, 32),
               (172, 262, 32), (234, 262, 30),
               (212, 312, 28)]
    stem = bez((201, 114), (198, 90), (190, 64))
    c, R, ax = (258, 72), 40, -20
    leaf = leaf_poly(c, R, ax, [0, -64, 64], w=30, base=0.7, amp=0.3)
    pet = bez((198, 96), (214, 94), back_pt(c, R, ax), 8)
    return dict(berries=berries, stems=[stem, pet], polys=[leaf], veins=[], stem_w=10)

# face anchors: indices of (left eye berry, right eye berry, mouth berry)
CHARS = {
    "A": (struct_A(), (1, 2, 5)),
    "B": (struct_B(), (4, 5, 7)),
    "AB": (struct_AB(), (1, 2, 5)),
    "C": (struct_C(), (1, 2, 5)),
}

# ---------- primitives ----------
def circ(x, y, r, c): return ("c", x, y, r, c)
def ell(x, y, rx, ry, c): return ("e", x, y, rx, ry, c)
def line(pts, c, w): return ("l", pts, c, w)
def poly(pts, c, rounded=False): return ("p", pts, c, rounded)

def arc_pts(cx, cy, rx, ry, a0, a1, n=20):
    return [(cx + rx*math.cos(math.radians(a0 + (a1-a0)*i/n)), cy + ry*math.sin(math.radians(a0 + (a1-a0)*i/n))) for i in range(n+1)]

def eye(x, y, r, kind, side):
    rx, ry, pr = 0.35*r, 0.45*r, 0.24*r
    lw = 0.13*r
    if kind == "happy":    # closed upward arcs ^ ^
        return [line(arc_pts(x, y + 0.12*r, rx, ry*0.8, 200, 340), EYE, lw)]
    if kind == "sleepy":   # closed downward arcs
        return [line(arc_pts(x, y - 0.05*r, rx, ry*0.6, 20, 160), EYE, lw)]
    look = {"neutral": (0, 0.06), "curious": (0.07, -0.08), "thinking": (-0.09, -0.12), "concerned": (0, 0.06)}[kind]
    k = 1.15 if kind == "curious" else 1.0
    out = [ell(x, y, rx*k, ry*k, EYE),
           circ(x + look[0]*r, y + look[1]*r + 0.04*r, pr*k, PUPIL),
           circ(x + look[0]*r - 0.07*r, y + look[1]*r - 0.06*r, 0.07*r, EYE)]
    if kind == "concerned":  # brows slanting up toward the centre
        s = 1 if side == "L" else -1
        y0 = y - ry - 0.18*r
        out.append(line([(x - s*0.34*r, y0 + 0.08*r), (x + s*0.30*r, y0 - 0.10*r)], EYE, lw))
    return out

def mouth(x, y, r, kind):
    lw = 0.13*r
    if kind == "neutral":   return [line(arc_pts(x, y - 0.20*r, 0.30*r, 0.24*r, 25, 155), EYE, lw)]
    if kind == "happy":
        pts = arc_pts(x, y - 0.28*r, 0.42*r, 0.42*r, 0, 180)
        return [poly(pts, PUPIL), line(pts + [pts[0]], EYE, lw*0.8)]
    if kind == "curious":   return [circ(x, y, 0.17*r, EYE), circ(x, y, 0.09*r, PUPIL)]
    if kind == "thinking":  return [line([(x - 0.22*r, y + 0.02*r), (x + 0.20*r, y - 0.06*r)], EYE, lw)]
    if kind == "sleepy":    return [line(arc_pts(x, y - 0.10*r, 0.14*r, 0.10*r, 25, 155), EYE, lw)]
    if kind == "concerned": return [line(arc_pts(x, y + 0.20*r, 0.26*r, 0.18*r, 205, 335), EYE, lw)]

def character(s, anchors, expr="neutral", face=True):
    g = s.get("gap", GAP)
    P = []
    for ln in s["stems"]: P.append(line(ln, STEM, s["stem_w"]))
    for pl in s["polys"]: P.append(poly(pl, LEAF, s.get("round_polys", False)))
    for v in s["veins"]: P.append(line(v, BG, 3.5))
    face_ix = set(anchors) if face else set()
    for i, (x, y, r) in enumerate(s["berries"]):
        if g: P.append(circ(x, y, r + g, BG))
        P.append(circ(x, y, r, GRAPE))
        if i not in face_ix:  # no highlight where the face sits (it read as a third eye)
            P.append(circ(x - 0.40*r, y - 0.44*r, 0.20*r, GRAPE_HI))
    if face:
        b = s["berries"]; le, re_, mo = (b[i] for i in anchors)
        P += eye(le[0], le[1] + 0.06*le[2], le[2], expr, "L")
        P += eye(re_[0], re_[1] + 0.06*re_[2], re_[2], expr, "R")
        P += mouth(mo[0], mo[1] + 0.05*mo[2], mo[2], expr)
    return P

# ---------- renderers ----------
def svg(P, size=400):
    out = [f'<rect width="400" height="400" fill="{BG}"/>']
    for p in P:
        t = p[0]
        if t == "c": out.append(f'<circle cx="{p[1]:.1f}" cy="{p[2]:.1f}" r="{p[3]:.1f}" fill="{p[4]}"/>')
        elif t == "e": out.append(f'<ellipse cx="{p[1]:.1f}" cy="{p[2]:.1f}" rx="{p[3]:.1f}" ry="{p[4]:.1f}" fill="{p[5]}"/>')
        elif t == "l":
            d = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in p[1])
            out.append(f'<path d="{d}" stroke="{p[2]}" stroke-width="{p[3]:.1f}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>')
        elif t == "p":
            pts = " ".join(f"{x:.1f},{y:.1f}" for x, y in p[1])
            extra = f' stroke="{p[2]}" stroke-width="10" stroke-linejoin="round"' if p[3] else ""
            out.append(f'<polygon points="{pts}" fill="{p[2]}"{extra}/>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="{size}" height="{size}">' + "".join(out) + "</svg>"

def png(P, px=400, ss=4):
    k = px*ss/400
    im = Image.new("RGB", (px*ss, px*ss), BG); d = ImageDraw.Draw(im)
    def C(x, y, r, c): d.ellipse([(x-r)*k, (y-r)*k, (x+r)*k, (y+r)*k], fill=c)
    def Ln(pts, c, w):
        d.line([(x*k, y*k) for x, y in pts], fill=c, width=max(1, int(w*k)), joint="curve")
        for x, y in (pts[0], pts[-1]): C(x, y, w/2, c)
    for p in P:
        t = p[0]
        if t == "c": C(p[1], p[2], p[3], p[4])
        elif t == "e": d.ellipse([(p[1]-p[3])*k, (p[2]-p[4])*k, (p[1]+p[3])*k, (p[2]+p[4])*k], fill=p[5])
        elif t == "l": Ln(p[1], p[2], p[3])
        elif t == "p":
            d.polygon([(x*k, y*k) for x, y in p[1]], fill=p[2])
            if p[3]: Ln(p[1] + [p[1][0]], p[2], 10)
    return im.resize((px, px), Image.LANCZOS)

EXPRS = ["neutral", "happy", "curious", "thinking", "sleepy", "concerned"]

def main():
    try: F = ImageFont.truetype("arial.ttf", 18); FB = ImageFont.truetype("arialbd.ttf", 22)
    except OSError: F = FB = ImageFont.load_default()
    names = {"A": "A  Compacta", "B": "B  Organica", "AB": "AB  Compacta + ombro (recomendada)", "C": "C  Geometrica"}

    # 1) candidates sheet: neutral 360 | happy 360 | blurred (squint test) | 64 | 32
    keys = list(CHARS)
    W, H = 24 + 2*384 + 160 + 24 + 64 + 24 + 32 + 24, 56 + len(keys)*420
    sh = Image.new("RGB", (W, H), "#FFFFFF"); dr = ImageDraw.Draw(sh)
    for x, t in [(24, "neutro"), (408, "feliz"), (792, "desfocado"), (976, "64"), (1064, "32")]:
        dr.text((x, 20), t, fill="#555555", font=F)
    for row, key in enumerate(keys):
        s, an = CHARS[key]; y = 56 + row*420
        for expr in EXPRS:
            P = character(s, an, expr)
            open(os.path.join(OUT, f"{key}-{expr}.svg"), "w", encoding="utf-8").write(svg(P))
        neu, hap = png(character(s, an, "neutral"), 360), png(character(s, an, "happy"), 360)
        sh.paste(neu, (24, y)); sh.paste(hap, (408, y))
        sh.paste(neu.resize((160, 160), Image.LANCZOS).filter(ImageFilter.GaussianBlur(3)), (792, y + 200))
        sh.paste(png(character(s, an, "neutral"), 64), (976, y + 296))
        sh.paste(png(character(s, an, "neutral"), 32), (1064, y + 328))
        dr.text((24, y + 366), names[key], fill="#333333", font=FB)
        png(character(s, an, "neutral"), 800).save(os.path.join(OUT, f"{key}-neutral.png"))
    sh.save(os.path.join(OUT, "candidates-sheet.png"))

    # 2) expressions of the recommended structure
    s, an = CHARS["AB"]
    ex = Image.new("RGB", (24 + 3*324, 24 + 2*360), "#FFFFFF"); dr = ImageDraw.Draw(ex)
    for i, expr in enumerate(EXPRS):
        x, y = 24 + (i % 3)*324, 24 + (i // 3)*360
        ex.paste(png(character(s, an, expr), 300), (x, y))
        dr.text((x, y + 306), expr, fill="#333333", font=F)
    ex.save(os.path.join(OUT, "AB-expressions.png"))
    print("ok", len(os.listdir(OUT)))

if __name__ == "__main__":
    main()
