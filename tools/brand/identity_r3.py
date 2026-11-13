"""AVYN identity round 3 (logo-design skill, showcase level).
One geometry -> black SVGs (concept sheets), colour SVGs and app-icon tiles.
Run: python tools/brand/identity_r3.py   (writes into tools/brand/out-r3/)"""
import math, os

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "out-r3")
for sub in ("black", "color", "tile"):
    os.makedirs(os.path.join(OUT, sub), exist_ok=True)

# palette: only gold / black / wine / white families
WINE, WINE_DEEP, WINE_LIGHT = "#7E2236", "#4A0F1E", "#B4475B"
GOLD, GOLD_LIGHT = "#C29A5B", "#E3C68C"
NOIR, CREAM = "#16110F", "#F8F3EC"
INK = "#111111"

def f(v): return f"{v:.1f}".rstrip("0").rstrip(".")
def M(pts): return "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts)
def circ(cx, cy, r):
    return f"M{f(cx-r)} {f(cy)} A{f(r)} {f(r)} 0 1 0 {f(cx+r)} {f(cy)} A{f(r)} {f(r)} 0 1 0 {f(cx-r)} {f(cy)} Z"
def seg_below(cx, cy, r, y):
    """Circle segment of circle (cx,cy,r) below the horizontal line y."""
    dy = y - cy; dx = math.sqrt(max(r*r - dy*dy, 0))
    large = 1 if dy < 0 else 0
    return f"M{f(cx-dx)} {f(y)} H{f(cx+dx)} A{f(r)} {f(r)} 0 {large} 1 {f(cx-dx)} {f(y)} Z"
def rot(p, th, o=(0, 0)):
    a = math.radians(th); x, y = p[0]-o[0], p[1]-o[1]
    return (o[0] + x*math.cos(a) - y*math.sin(a), o[1] + x*math.sin(a) + y*math.cos(a))

# element = (kind, role, data, extra)  kind: F fill path | S stroke path | G raw group open/close
def F(role, d, rule="evenodd"): return ("F", role, d, rule)
def S(role, d, w): return ("S", role, d, w)

def render(els, cmap, size=(256, 256), wrap=None):
    out = []
    for k, role, d, x in els:
        col = cmap.get(role, cmap.get("*", INK))
        if k == "F": out.append(f'<path fill="{col}" fill-rule="{x}" d="{d}"/>')
        else: out.append(f'<path fill="none" stroke="{col}" stroke-width="{f(x)}" stroke-linecap="round" stroke-linejoin="round" d="{d}"/>')
    body = "".join(out)
    if wrap: body = f'<g transform="{wrap}">{body}</g>'
    return body

def svg(w, h, body, title, bg=None, rx=0):
    b = f'<rect width="{w}" height="{h}" rx="{rx}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">'
            f"<title>{title}</title>{b}{body}</svg>")

def write(path, text): open(os.path.join(OUT, path), "w", encoding="utf-8").write(text)

# ---------------------------------------------------------------- wordmark "avyn" (rounded monoline, x-height 100)
SW = 26
def wordmark(variant=None):
    e = []
    # a
    if variant == "a-giro":
        e.append(S("mark", circ(50, 50, 37), SW))
        e.append(F("accent", wave_in_circle(50, 50, 19)))
    else:
        e.append(S("mark", circ(50, 50, 37), SW))
    e.append(S("mark", "M87 13 V87", SW))
    # v
    x = 135; e.append(S("mark", M([(x, 13), (x+44, 87), (x+88, 13)]), SW))
    # y
    x = 267
    if variant == "y-taca":
        e += goblet_y(x)
    else:
        e.append(S("mark", M([(x, 13), (x+44, 87)]), SW))
        e.append(S("mark", M([(x+88, 13), (x+6.5, 150)]), SW))
    # n
    x = 403
    e.append(S("mark", f"M{x} 13 V87", SW))
    e.append(S("mark", f"M{x} 87 V50 A37 37 0 0 1 {x+74} 50 V87", SW))
    return e
WM_W, WM_H = 490, 163

def goblet_y(x):
    c = (x+44, 22)
    e = [S("mark", f"M{x} 13 V22 A44 44 0 0 0 {x+88} 22 V13", SW),
         S("mark", f"M{x+44} 66 V150", SW),
         S("mark", f"M{x+16} 150 H{x+72}", SW)]
    e.append(F("accent", seg_below(c[0], c[1], 44-13-7, c[1]+4)))
    return e

def wave_in_circle(cx, cy, r):
    L = (cx - r*math.cos(math.radians(12)), cy + r*math.sin(math.radians(12)))
    R = (cx + r*math.cos(math.radians(28)), cy - r*math.sin(math.radians(28)))
    return (f"M{f(L[0])} {f(L[1])} C{f(L[0]+r*0.7)} {f(L[1]-r*0.6)} {f(R[0]-r*0.9)} {f(R[1]+r*0.9)} {f(R[0])} {f(R[1])} "
            f"A{f(r)} {f(r)} 0 1 1 {f(L[0])} {f(L[1])} Z")

# ---------------------------------------------------------------- logo symbols (256 grid)
def brinde_a():
    """Two glasses clink: together they draw an A; the levelled wine is the crossbar."""
    e = []; s = 1.32; tilt = 20; level = 128
    for side in (-1, 1):
        th = -side*tilt            # left glass leans right (+), right glass leans left
        ox = 128 + side*36*s; oy = 46
        def W(p): q = rot((p[0]*s, p[1]*s), th); return (ox + q[0], oy + q[1])
        u = [W((-36, 0))] + [W((36*math.cos(math.radians(a)), 20 + 36*math.sin(math.radians(a)))) for a in range(180, -1, -10)][::-1]
        u = [W((-36, 0))] + [W((-36*math.cos(math.radians(a)), 20 + 36*math.sin(math.radians(a)))) for a in range(0, 181, 10)] + [W((36, 0))]
        e.append(S("mark", M(u), 14*s))
        e.append(S("mark", M([W((0, 56)), W((0, 104))]), 14*s))
        e.append(S("mark", M([W((-24, 104)), W((24, 104))]), 14*s))
        cx, cy = W((0, 20))
        e.append(F("accent", seg_below(cx, cy, (36-7-6)*s, level)))
    return e

def garrafa_etiqueta():
    """The bottle is a price tag: an eyelet in the neck and a string."""
    d = ("M-22 -84 A12 12 0 0 1 -10 -96 H10 A12 12 0 0 1 22 -84 V-56 Q44 -40 44 -10 V92 A18 18 0 0 1 26 110 "
         "H-26 A18 18 0 0 1 -44 92 V-10 Q-44 -40 -22 -56 Z " + circ(0, -72, 10))
    lbl = "M-44 30 H44 V62 H-44 Z"
    return [F("mark", d), F("ko", lbl), F("accent", "M-30 38 H30 V54 H-30 Z"),
            S("mark", "M0 -72 C-34 -104 26 -128 -6 -150", 9)], "translate(122 134) rotate(45) scale(0.94) translate(0 -2)"

def lupa_taca():
    c, Ro, Ri = (104, 104), 82, 54
    d = (math.sqrt(.5), math.sqrt(.5))
    return [F("mark", circ(*c, Ro) + " " + circ(*c, Ri)),
            F("accent", seg_below(*c, Ri - 10, c[1] + 4)),
            S("mark", M([(c[0]+d[0]*72, c[1]+d[1]*72), (c[0]+d[0]*150, c[1]+d[1]*150)]), 34)]

def a_giro():
    ring = circ(112, 140, 95) + " " + circ(112, 140, 49)
    stem = "M161 68 A23 23 0 0 1 207 68 V212 A23 23 0 0 1 161 212 Z"
    return [F("mark", ring), F("mark", stem, "nonzero"), F("accent", wave_in_circle(112, 140, 38))]

def decanter_a():
    """The A is a decanter: empty glass = counter, wine = crossbar, punt = leg gap."""
    outer = ("M112 30 H144 V58 C144 92 218 140 218 194 V204 A12 12 0 0 1 206 216 H168 A40 40 0 0 0 88 216 H50 "
             "A12 12 0 0 1 38 204 V194 C38 140 112 92 112 58 Z")
    hole = "M128 92 L165 146 H91 Z"
    wine = "M86 158 H170 L178 170 C182 176 182 184 176 188 H80 C74 184 74 176 78 170 Z"
    return [F("mark", outer + " " + hole), F("accent", wine)]

def y_taca_symbol():
    e = goblet_y(0)
    return e, "translate(78 30) scale(1.13)"

# ---------------------------------------------------------------- mascots
def m_bigode():
    """A grape with a grape moustache: the sommelier who knows."""
    e = [S("leaf", "M128 52 Q128 36 136 26", 12), S("leaf", "M134 34 C150 22 168 30 160 42 C154 50 144 44 150 38", 7),
         F("mark", "M128 46 C182 46 214 92 214 146 C214 200 176 236 128 236 C80 236 42 200 42 146 C42 92 74 46 128 46 Z")]
    for cx in (102, 154): e.append(F("ko", circ(cx, 110, 9)))
    for side in (-1, 1):
        for i, (dx, dy, r) in enumerate([(12, 148, 14), (22, 166, 10), (35, 152, 12), (54, 146, 9.5), (64, 134, 7.5), (64, 120, 6)]):
            e.append(F("accent2", circ(128 + side*dx, dy, r + 4)))
            e.append(F("accent", circ(128 + side*dx, dy, r)))
    return e

def m_rolha():
    """A cork that has tasted: its bottom is stained with wine, eyes closed, savouring."""
    body = "M84 40 H172 A16 16 0 0 1 188 56 L180 204 A14 14 0 0 1 166 218 H90 A14 14 0 0 1 76 204 L68 56 A16 16 0 0 1 84 40 Z"
    stain = "M72.4 168 H183.6 L180 204 A14 14 0 0 1 166 218 H90 A14 14 0 0 1 76 204 Z"
    e = [F("mark", body), F("ko", "M70 160 H186 V170 H70 Z"), F("accent", stain)]
    e += [S("face", "M100 106 Q110 114 120 106", 8), S("face", "M136 106 Q146 114 156 106", 8),
          S("face", "M120 132 Q128 138 136 132", 8)]
    for x, y in [(100, 66), (154, 74), (126, 82)]: e.append(F("ko", circ(x, y, 4.5)))
    return e

def m_taca():
    """The glass smiles: the wine surface is the smile."""
    c, R = (128, 92), 78
    e = [S("mark", f"M{c[0]-R} {c[1]-30} V{c[1]} A{R} {R} 0 0 0 {c[0]+R} {c[1]} V{c[1]-30}", 18),
         S("mark", f"M128 {c[1]+R} V214", 18), S("mark", "M92 222 H164", 18)]
    r = R - 9 - 8
    L = (c[0]-r*math.cos(math.radians(14)), c[1]+r*math.sin(math.radians(14)))
    Rr = (c[0]+r*math.cos(math.radians(14)), c[1]+r*math.sin(math.radians(14)))
    e.append(F("accent", f"M{f(L[0])} {f(L[1])} Q128 {f(L[1]+44)} {f(Rr[0])} {f(Rr[1])} A{f(r)} {f(r)} 0 0 1 {f(L[0])} {f(L[1])} Z"))
    e += [F("face", circ(104, 96, 9)), F("face", circ(152, 96, 9))]
    return e

def m_cacho():
    """The cluster, grown up: compact, with closed eyes and a gold leaf."""
    rows = [(4, 86, 31, 54), (3, 133, 30, 54), (2, 178, 29, 54), (1, 219, 27, 54)]
    e = [S("leaf", "M128 58 Q126 38 118 28", 11),
         F("leaf", "M124 42 C138 20 172 18 184 34 C166 50 140 52 124 42 Z")]
    for n, y, r, p in rows:
        for i in range(n):
            x = 128 + (i-(n-1)/2)*p
            e += [F("ko", circ(x, y, r+5)), F("mark", circ(x, y, r))]
    e += [S("face", "M89 133 Q101 123 113 133", 8), S("face", "M143 133 Q155 123 167 133", 8),
          S("face", "M118 178 Q128 186 138 178", 8)]
    return e

# ---------------------------------------------------------------- catalogue
LOGOS = [  # key, name, builder, wordmark variant, colours (tile, roles)
    ("L2", "Decanter-A", decanter_a, None, NOIR, {"mark": GOLD, "accent": WINE}),
    ("L3", "Garrafa-etiqueta", garrafa_etiqueta, None, GOLD, {"mark": NOIR, "accent": WINE, "ko": GOLD}),
    ("L4", "y-taca", y_taca_symbol, "y-taca", CREAM, {"mark": WINE, "accent": GOLD}),
    ("L5", "a-giro", a_giro, "a-giro", WINE, {"mark": CREAM, "accent": GOLD}),
    ("L6", "Lupa-taca", lupa_taca, None, NOIR, {"mark": CREAM, "accent": WINE_LIGHT}),
]
MASCOTS = [
    ("M1", "Bigode de uva", m_bigode, CREAM, {"mark": WINE, "accent": GOLD, "accent2": WINE, "leaf": NOIR, "ko": CREAM}),
    ("M2", "Rolha provada", m_rolha, WINE, {"mark": GOLD_LIGHT, "accent": WINE_DEEP, "face": NOIR, "ko": WINE}),
    ("M3", "Taca sorriso", m_taca, GOLD, {"mark": NOIR, "accent": WINE, "face": NOIR}),
    ("M4", "Cacho", m_cacho, NOIR, {"mark": WINE_LIGHT, "leaf": GOLD, "face": CREAM, "ko": NOIR}),
]

def build(builder):
    r = builder()
    return r if isinstance(r, tuple) else (r, None)

def black_map(extra=None):
    m = {"*": INK, "ko": "#FFFFFF"}
    if extra: m.update(extra)
    return m
BLACK_EXTRA = {"M1": {"accent2": "#FFFFFF"}, "M2": {"face": "#FFFFFF"}, "M4": {"face": "#FFFFFF"}}

def main():
    items = []
    for key, name, b, wm, tile, cm in LOGOS:
        els, wrap = build(b)
        body_k = render(els, black_map(), wrap=wrap)
        write(f"black/{key}-symbol.svg", svg(256, 256, body_k, f"AVYN {name}"))
        # lockup: symbol + wordmark (wordmark x-height 64)
        s = 0.64; wx = 296
        wm_k = render(wordmark(wm), black_map(), wrap=f"translate({wx} 96) scale({s})")
        write(f"black/{key}-lockup.svg", svg(int(wx + WM_W*s + 24), 256, body_k + wm_k, f"AVYN {name} lockup"))
        cm2 = dict(cm); cm2.setdefault("ko", tile)
        body_c = render(els, cm2, wrap=wrap)
        write(f"color/{key}-symbol.svg", svg(256, 256, body_c, f"AVYN {name}"))
        wm_c = render(wordmark(wm), {"mark": cm2["mark"], "accent": cm2.get("accent", GOLD)}, wrap=f"translate({wx} 96) scale({s})")
        write(f"color/{key}-lockup-on-tile.svg", svg(int(wx + WM_W*s + 24), 256, body_c + wm_c, f"AVYN {name} lockup", bg=tile))
        inner = render(els, cm2, wrap=(f"translate(28 28) scale(0.78125)" + (f" {wrap}" if wrap else "")))
        write(f"tile/{key}.svg", svg(256, 256, inner, f"AVYN {name} icon", bg=tile, rx=56))
        items.append((key, name))
    for key, name, b, tile, cm in MASCOTS:
        els, wrap = build(b)
        write(f"black/{key}-mascot.svg", svg(256, 256, render(els, black_map(BLACK_EXTRA.get(key)), wrap=wrap), f"AVYN mascote {name}"))
        write(f"color/{key}-mascot.svg", svg(256, 256, render(els, cm, wrap=wrap), f"AVYN mascote {name}"))
        inner = render(els, cm, wrap="translate(28 28) scale(0.78125)")
        write(f"tile/{key}.svg", svg(256, 256, inner, f"AVYN mascote {name}", bg=tile, rx=56))
        items.append((key, name))
    # wordmark alone
    write("black/wordmark.svg", svg(WM_W + 48, WM_H + 48, render(wordmark(), black_map(), wrap="translate(24 24)"), "avyn wordmark"))
    print("ok", len(items))

if __name__ == "__main__":
    main()
