"""Valida os tokens e gera as saídas derivadas.

    python tools/tokens/build.py

1. Lê tokens/*.json (W3C DTCG) e resolve os aliases ({color.brand.wine}).
2. Confere o contraste WCAG 2.2 de cada par de uso, nos dois modos, e grava
   docs/foundations/contrast.md. Sai com código 1 se algum par obrigatório falhar.
3. Gera docs/showcase/tokens.css (variáveis CSS, claro e escuro) para o showcase.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools" / "color"))
from palette import cr, hex2rgb, rgb2hex  # noqa: E402

TOK = ROOT / "tokens"


def load(name):
    return json.loads((TOK / name).read_text(encoding="utf-8"))


def flatten(node, path=(), out=None):
    out = {} if out is None else out
    if isinstance(node, dict) and "$value" in node:
        out[".".join(path)] = node
        return out
    if isinstance(node, dict):
        for k, v in node.items():
            if not k.startswith("$"):
                flatten(v, path + (k,), out)
    return out


def merge(*docs):
    out = {}
    for d in docs:
        out.update(flatten(d))
    return out


def resolve(tokens, ref, seen=()):
    m = re.fullmatch(r"\{([^}]+)\}", ref) if isinstance(ref, str) else None
    if not m:
        return ref
    key = m.group(1)
    if key in seen or key not in tokens:
        raise SystemExit(f"alias inválido: {ref}")
    return resolve(tokens, tokens[key]["$value"], seen + (key,))


prim = load("color.primitives.json")
modes = {m: merge(prim, load(f"color.{m}.json")) for m in ("light", "dark")}
typo = merge(load("typography.json"))
dim = merge(load("dimension.json"))
fx = merge(load("effects.json"))

# paridade de chaves entre os modos
keys = {m: {k for k in flatten(load(f"color.{m}.json"))} for m in modes}
if keys["light"] != keys["dark"]:
    raise SystemExit(f"modos com chaves diferentes: {keys['light'] ^ keys['dark']}")


def col(mode, key):
    return resolve(modes[mode], modes[mode]["color." + key]["$value"])


def over(fg, bg):
    """Compõe cor hex8 sobre um fundo sólido."""
    if len(fg) == 9:
        a = int(fg[7:9], 16) / 255
        f, b = hex2rgb(fg[:7]), hex2rgb(bg)
        return rgb2hex([a * x + (1 - a) * y for x, y in zip(f, b)])
    return fg


GROUNDS = ["background.base", "background.grouped", "surface.default", "surface.elevated"]
TEXTS = ["label.primary", "label.secondary", "tint.default", "accent.ink", "status.success", "status.warning", "status.danger"]
PAIRS = []  # (texto, fundo, mínimo, observação)
for t in TEXTS:
    for g in GROUNDS:
        PAIRS.append((t, g, 4.5, "texto"))
PAIRS += [
    ("label.primary", "surface.tinted", 4.5, "texto"),
    ("tint.default", "surface.tinted", 4.5, "texto"),
    ("label.on-action", "action.primary", 4.5, "texto do botão"),
    ("label.on-action", "action.primary-pressed", 4.5, "texto do botão"),
    ("tint.default", "action.secondary", 4.5, "texto do botão"),
    ("tint.default", "action.secondary-pressed", 4.5, "texto do botão"),
    ("accent.ink", "accent.subtle", 4.5, "selo"),
    ("status.success", "status.success-subtle", 4.5, "selo"),
    ("status.warning", "status.warning-subtle", 4.5, "selo"),
    ("status.danger", "status.danger-subtle", 4.5, "selo"),
    ("label.secondary", "fill.tertiary", 4.5, "placeholder no campo de busca"),
    ("label.primary", "fill.tertiary", 4.5, "texto no campo de busca"),
    ("action.primary", "background.base", 3.0, "forma do botão (não texto)"),
    ("action.primary", "surface.default", 3.0, "forma do botão (não texto)"),
    ("accent.default", "background.base", None, "decorativo: só informativo"),
    ("label.tertiary", "background.base", None, "desabilitado: só informativo"),
]

rows, failures = [], 0
for mode in ("light", "dark"):
    base = col(mode, "background.base")
    for fg, bg, minimum, note in PAIRS:
        bgc = over(col(mode, bg), base)
        fgc = over(col(mode, fg), bgc)
        ratio = cr(fgc, bgc)
        ok = minimum is None or ratio >= minimum
        failures += 0 if ok else 1
        status = "—" if minimum is None else ("passa" if ok else "**FALHA**")
        rows.append(f"| {'Claro' if mode == 'light' else 'Escuro'} | `{fg}` | `{bg}` | {fgc} / {bgc} | {ratio:.2f} | {minimum or '—'} | {status} | {note} |")

report = ROOT / "docs" / "foundations" / "contrast.md"
report.parent.mkdir(parents=True, exist_ok=True)
report.write_text(
    "# Contraste dos tokens de cor\n\n"
    "Gerado por `python tools/tokens/build.py`. Não edite à mão.\n\n"
    "Mínimos WCAG 2.2 AA: 4,5:1 para texto, 3:1 para texto grande e formas de controle. "
    "Cores com transparência são compostas sobre o fundo antes da medida.\n\n"
    "| Modo | Frente | Fundo | Cores | Razão | Mínimo | Resultado | Uso |\n|---|---|---|---|---|---|---|---|\n"
    + "\n".join(rows) + "\n",
    encoding="utf-8",
)

# ---------- CSS ----------
def var(key):
    return "--" + key.replace(".", "-")


def pt(v):
    return v.replace("pt", "px") if isinstance(v, str) else v


def color_block(mode):
    sem = flatten(load(f"color.{mode}.json"))
    lines = [f"  {var(k)}: {resolve(modes[mode], v['$value'])};" for k, v in sem.items()]
    return "\n".join(lines)


def shadow_css(key):
    return ", ".join(f"{pt(s['offsetX'])} {pt(s['offsetY'])} {pt(s['blur'])} {pt(s['spread'])} {s['color']}" for s in fx[key]["$value"])


prim_lines = "\n".join(f"  {var('color.' + k)}: {v['$value']};" for k, v in flatten(prim["color"]).items())
dim_lines = "\n".join(f"  {var(k)}: {pt(v['$value'])};" for k, v in dim.items())
fam = {k: v["$value"] for k, v in typo.items() if k.startswith("font.family")}
fam_lines = "\n".join(f"  {var(k)}: {', '.join(repr(x).replace(chr(39), chr(34)) if ' ' in x else x for x in v)};" for k, v in fam.items())
motion_lines = "\n".join(
    f"  {var(k)}: {v['$value'] if v['$type'] == 'duration' else 'cubic-bezier(' + ', '.join(map(str, v['$value'])) + ')'};"
    for k, v in fx.items() if k.startswith(("motion.duration", "motion.easing"))
)

type_rules = []
for k, v in typo.items():
    if not k.startswith("typography."):
        continue
    val = v["$value"]
    family = "var(" + var(val["fontFamily"].strip("{}")) + ")"
    name = k.split(".", 1)[1]
    type_rules.append(
        f".type-{name} {{ font-family: {family}; font-weight: {val['fontWeight']}; font-size: {pt(val['fontSize'])}; "
        f"line-height: {pt(val['lineHeight'])}; letter-spacing: {val['letterSpacing']}; }}"
    )

css = f"""/* Gerado por tools/tokens/build.py a partir de tokens/*.json. Não edite à mão. */
@font-face {{ font-family: "Playfair Display"; src: url("../../assets/fonts/playfair-display/PlayfairDisplay[wght].ttf") format("truetype"); font-weight: 400 900; font-style: normal; font-display: swap; }}
@font-face {{ font-family: "Playfair Display"; src: url("../../assets/fonts/playfair-display/PlayfairDisplay-Italic[wght].ttf") format("truetype"); font-weight: 400 900; font-style: italic; font-display: swap; }}
@font-face {{ font-family: "DM Sans"; src: url("../../assets/fonts/dm-sans/DMSans[opsz,wght].ttf") format("truetype"); font-weight: 100 1000; font-style: normal; font-display: swap; }}
@font-face {{ font-family: "DM Sans"; src: url("../../assets/fonts/dm-sans/DMSans-Italic[opsz,wght].ttf") format("truetype"); font-weight: 100 1000; font-style: italic; font-display: swap; }}

:root {{
{prim_lines}
{fam_lines}
{dim_lines}
{motion_lines}
}}

/* Modo claro: padrão, ou forçado em qualquer contêiner com data-theme="light". */
:root, [data-theme="light"] {{
{color_block('light')}
  --shadow-card: {shadow_css('shadow.card')};
  --shadow-floating: {shadow_css('shadow.floating')};
  color-scheme: light;
}}

/* Modo escuro: preferência do sistema, ou forçado com data-theme="dark". */
@media (prefers-color-scheme: dark) {{
  :root:not([data-theme="light"]) {{
{color_block('dark')}
  --shadow-card: none;
  --shadow-floating: none;
  color-scheme: dark;
  }}
}}

[data-theme="dark"] {{
{color_block('dark')}
  --shadow-card: none;
  --shadow-floating: none;
  color-scheme: dark;
}}

{chr(10).join(type_rules)}
"""
out_css = ROOT / "docs" / "showcase" / "tokens.css"
out_css.parent.mkdir(parents=True, exist_ok=True)
out_css.write_text(css, encoding="utf-8")

print(f"contraste: {len(rows)} pares, {failures} falha(s) -> {report.relative_to(ROOT)}")
print(f"css -> {out_css.relative_to(ROOT)}")
sys.exit(1 if failures else 0)
