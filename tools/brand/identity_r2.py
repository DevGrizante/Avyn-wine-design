"""AVYN identity round 2 (logo-design skill): 3 logo concepts + 3 mascot concepts, black first."""
import math, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out-r2")
os.makedirs(OUT, exist_ok=True)
K = "#111111"

def f(v): return f"{v:.1f}".rstrip("0").rstrip(".")
def poly(pts): return "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts) + " Z"
def circ(cx, cy, r):  # circle as path (two arcs)
    return f"M{f(cx-r)} {f(cy)} A{f(r)} {f(r)} 0 1 0 {f(cx+r)} {f(cy)} A{f(r)} {f(r)} 0 1 0 {f(cx-r)} {f(cy)} Z"
def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">'
            f'<title>{title}</title>{body}</svg>')
def save(name, w, h, body, title):
    open(os.path.join(OUT, name), "w", encoding="utf-8").write(svg(w, h, body, title))
def P(d, fill=K, rule=None):
    r = f' fill-rule="{rule}"' if rule else ""
    return f'<path fill="{fill}"{r} d="{d}"/>'

# ---------------- wordmark (constructed caps, cap height 96, stems ~18-20) ----------------
def letter_A(x):
    o = [(0, 96), (34, 0), (54, 0), (88, 96), (68, 96), (44, 28.2), (20, 96)]
    bar = [(30, 60), (58, 60), (63, 75), (25, 75)]
    return [[(x+a, b) for a, b in o], [(x+a, b) for a, b in bar]]
def letter_V(x):
    return [[(x+a, b) for a, b in [(0, 0), (20, 0), (44, 67.8), (68, 0), (88, 0), (54, 96), (34, 96)]]]
def letter_Y(x):
    return [[(x+a, b) for a, b in [(0, 0), (21, 0), (44, 34), (67, 0), (88, 0), (53, 52), (53, 96), (35, 96), (35, 52)]]]
def letter_N(x):
    return [[(x+a, b) for a, b in [(0, 96), (0, 0), (24, 0), (62, 65.8), (62, 0), (80, 0), (80, 96), (60, 96), (18, 23.3), (18, 96)]]]
WM_W = 352
def wordmark(x0, y0, s=1.0, drop=False):
    shapes = letter_A(0) + letter_V(70) + letter_Y(170) + letter_N(272)
    out = "".join(P(poly([(x0 + a*s, y0 + b*s) for a, b in sh])) for sh in shapes)
    if drop:  # tear under the V vertex
        cx = 70 + 44
        out += P(teardrop(x0 + cx*s, y0 + 104*s, y0 + 128*s, 10*s))
    return out

def teardrop(cx, tip_y, cy, r):
    """Tip up at (cx, tip_y), round bottom circle radius r centred (cx, cy)."""
    a = math.asin(r / (cy - tip_y)); t = (cy - tip_y)*math.cos(a)
    lx, ly = cx - t*math.sin(a)*math.cos(a)/math.cos(a)*1, 0  # placeholder replaced below
    # tangent points from tip to circle
    d = cy - tip_y; ang = math.acos(r/d)
    pl = (cx - r*math.sin(ang), cy - r*math.cos(ang))
    pr = (cx + r*math.sin(ang), cy - r*math.cos(ang))
    return (f"M{f(cx)} {f(tip_y)} L{f(pr[0])} {f(pr[1])} A{f(r)} {f(r)} 0 1 1 {f(pl[0])} {f(pl[1])} Z")

def lockup(name, symbol_body, title):
    body = symbol_body + wordmark(296, 80)
    save(name, 296 + WM_W + 24, 256, body, title)

# ---------------- Logo A: Taca-lupa ----------------
def taca_lupa(foot=True):
    c, Ro, Ri, Rw = (110, 110), 78, 56, 46
    ring = P(circ(*c, Ro) + " " + circ(*c, Ri), rule="evenodd")
    lvl = c[1] + 4; dx = math.sqrt(Rw**2 - (lvl - c[1])**2)
    wine = P(f"M{f(c[0]-dx)} {f(lvl)} H{f(c[0]+dx)} A{Rw} {Rw} 0 0 1 {f(c[0]-dx)} {f(lvl)} Z")
    d, n = (math.sqrt(.5), math.sqrt(.5)), (-math.sqrt(.5), math.sqrt(.5))
    at = lambda t, s: (c[0] + d[0]*t + n[0]*s, c[1] + d[1]*t + n[1]*s)
    stem = P(poly([at(70, -11), at(150, -11), at(150, 11), at(70, 11)]))
    body = ring + wine + stem
    if foot:
        body += P(poly([at(146, -36), at(164, -36), at(164, 36), at(146, 36)]))
    return body
save("A-taca-lupa-v1-com-pe.svg", 256, 256, taca_lupa(True), "AVYN A Taca-lupa com pe")
save("A-taca-lupa.svg", 256, 256, taca_lupa(False), "AVYN A Taca-lupa")
lockup("A-lockup.svg", taca_lupa(False), "AVYN A lockup")

# ---------------- Logo B: Giro ----------------
def giro():
    c, Ro, Ri, Rw = (128, 128), 108, 80, 66
    ring = P(circ(*c, Ro) + " " + circ(*c, Ri), rule="evenodd")
    pt = lambda th: (c[0] + Rw*math.cos(math.radians(th)), c[1] + Rw*math.sin(math.radians(th)))
    L, R = pt(172), pt(-20)
    wine = P(f"M{f(L[0])} {f(L[1])} C{f(L[0]+44)} {f(L[1]-34)} {f(R[0]-60)} {f(R[1]+44)} {f(R[0])} {f(R[1])} A{Rw} {Rw} 0 0 1 {f(L[0])} {f(L[1])} Z")
    return ring + wine
save("B-giro.svg", 256, 256, giro(), "AVYN B Giro")
lockup("B-lockup.svg", giro(), "AVYN B lockup")

# ---------------- Logo C: V-lagrima ----------------
def v_lagrima():
    t60 = math.tan(math.radians(60))
    top, bot = 24, 174
    ox = (bot - top)/t60                      # outer edges at exactly 60 deg
    apex = top + 48*t60                       # inner edges at exactly 60 deg
    V = [(114-ox, top), (80, top), (128, apex), (176, top), (142+ox, top), (142, bot), (114, bot)]
    return P(poly(V)) + P(teardrop(128, 188, 218, 20))
save("C-v-lagrima.svg", 256, 256, v_lagrima(), "AVYN C V-lagrima")
save("C-wordmark.svg", WM_W + 48, 256, wordmark(24, 72, drop=True), "AVYN C wordmark")

# ---------------- mascots ----------------
BGC = "#FFFFFF"
def leaf(c, R, axis, peaks, w, base, amp, n=180):
    pts = []
    for i in range(n):
        phi = -180 + 360*i/n
        fct = base + amp*max(math.exp(-((phi-p)/w)**2) for p in peaks)
        b = abs(phi)
        if b > 125: fct *= max(0.12, 1 - ((b-125)/55)**1.4*0.88)
        a = math.radians(axis + phi)
        pts.append((c[0] + R*fct*math.cos(a), c[1] + R*fct*math.sin(a)))
    return poly(pts)
def stroke(d, w, col=K): return f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>'

def vesica(base, L, ang, bulge=0.32):
    a = math.radians(ang); ux, uy = math.cos(a), math.sin(a); nx, ny = -uy, ux
    tip = (base[0] + ux*L, base[1] + uy*L)
    m1 = (base[0] + ux*L/2 + nx*L*bulge, base[1] + uy*L/2 + ny*L*bulge)
    m2 = (base[0] + ux*L/2 - nx*L*bulge, base[1] + uy*L/2 - ny*L*bulge)
    return (f"M{f(base[0])} {f(base[1])} Q{f(m1[0])} {f(m1[1])} {f(tip[0])} {f(tip[1])} "
            f"Q{f(m2[0])} {f(m2[1])} {f(base[0])} {f(base[1])} Z"), tip

# M1 — silhueta unica com rosto vazado
def m1(expr="neutral"):
    rows = [(4, 84, 30, 52), (3, 128, 29, 52), (2, 172, 28, 52), (1, 214, 27, 52)]
    circles = []
    for n, y, r, p in rows:
        for i in range(n):
            dy = 10 if (n == 4 and i in (0, 3)) else 0
            circles.append((128 + (i-(n-1)/2)*p, y + dy, r))
    body = "".join(P(circ(*cc)) for cc in circles)
    body += P(poly([(50, 84), (206, 84), (128, 214)]))
    body += stroke("M128 58 Q126 42 118 30", 9)
    body += stroke("M126 46 Q140 42 150 40", 7)
    body += P(leaf((176, 36), 30, -12, [0, -70, 70], 26, 0.62, 0.38))
    # face carved (white = background)
    if expr == "happy":
        body += stroke("M103 102 Q112 92 121 102", 6.5, BGC) + stroke("M135 102 Q144 92 153 102", 6.5, BGC)
        body += P("M114 118 H142 A14 14 0 0 1 114 118 Z", BGC)
    else:
        body += P(circ(112, 100, 8.5), BGC) + P(circ(144, 100, 8.5), BGC)
        body += stroke("M118 122 Q128 131 138 122", 6.5, BGC)
    return body
save("M1-silhueta.svg", 256, 256, m1(), "Mascote M1 silhueta")
save("M1-silhueta-feliz.svg", 256, 256, m1("happy"), "Mascote M1 feliz")

# M2 — cacho gordinho com gavinha expressiva
def m2(expr="neutral"):
    berries = [(70, 104, 36), (128, 98, 38), (186, 104, 36), (99, 160, 35), (157, 160, 35), (128, 213, 32)]
    body = stroke("M128 62 Q128 46 124 34", 10)
    if expr == "happy":
        body += stroke("M126 44 C140 22 170 22 172 42 C174 58 152 60 150 46", 8)  # springy curl up
    else:
        body += stroke("M126 46 C146 40 166 44 168 58 C170 70 154 72 152 62", 8)  # relaxed curl
    body += P(leaf((86, 40), 30, 195, [0, -70, 70], 26, 0.62, 0.38))
    for x, y, r in berries:
        body += P(circ(x, y, r + 6), BGC) + P(circ(x, y, r))
    if expr == "happy":
        body += stroke("M90 156 Q99 146 108 156", 7, BGC) + stroke("M148 156 Q157 146 166 156", 7, BGC)
        body += P("M114 200 H142 A14 14 0 0 1 114 200 Z", BGC)
    else:
        body += P(circ(103, 156, 8.5), BGC) + P(circ(153, 156, 8.5), BGC)
        body += stroke("M118 202 Q128 210 138 202", 6, BGC)
    return body
save("M2-gavinha.svg", 256, 256, '<g transform="translate(0,-8)">' + m2() + "</g>", "Mascote M2 gavinha")
save("M2-gavinha-feliz.svg", 256, 256, '<g transform="translate(0,-8)">' + m2("happy") + "</g>", "Mascote M2 feliz")

# M3 — monolinha
def m3(expr="neutral"):
    rows = [(3, 92, 34, 66), (2, 150, 33, 66), (1, 206, 31, 66)]
    body = ""
    circles = []
    for n, y, r, p in rows:
        for i in range(n): circles.append((128 + (i-(n-1)/2)*p, y, r))
    for cc in circles: body += stroke(circ(*cc), 9)
    body += stroke("M128 58 Q128 44 122 32", 9)
    vd, tip = vesica((130, 44), 58, -28)
    body += stroke(vd, 9) + stroke(f"M130 44 L{f(130+(tip[0]-130)*0.6)} {f(44+(tip[1]-44)*0.6)}", 7)
    if expr == "happy":
        body += stroke("M90 150 Q99 141 108 150", 8) + stroke("M148 150 Q157 141 166 150", 8)
        body += stroke("M116 196 Q128 212 140 196", 8)
    else:
        body += P(circ(101, 150, 7)) + P(circ(155, 150, 7))
        body += stroke("M118 198 Q128 206 138 198", 8)
    return body
save("M3-monolinha.svg", 256, 256, m3(), "Mascote M3 monolinha")
save("M3-monolinha-feliz.svg", 256, 256, m3("happy"), "Mascote M3 feliz")
print("ok", sorted(os.listdir(OUT)))
