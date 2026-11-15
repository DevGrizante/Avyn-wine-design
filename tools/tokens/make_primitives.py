"""Gera tokens/color.primitives.json (W3C DTCG) a partir das escalas aprovadas.

Fonte: tools/color/scales.json, chave "warm" (ADR 0001, aceito em 2026-11-15).
Acrescenta as cores de marca, as cores de estado e as misturas usadas pelos
papéis semânticos. Rode de novo sempre que uma escala mudar:

    python tools/tokens/make_primitives.py
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools" / "color"))
from palette import from_oklch, hex2rgb, in_gamut, rgb2hex, to_oklch  # noqa: E402

scales = json.loads((ROOT / "tools/color/scales.json").read_text(encoding="utf-8"))["warm"]


def c(value, desc=None):
    tok = {"$type": "color", "$value": value}
    if desc:
        tok["$description"] = desc
    return tok


def mix(fg, bg, alpha):
    """Cor sólida equivalente a `fg` com opacidade `alpha` sobre `bg`."""
    f, b = hex2rgb(fg), hex2rgb(bg)
    return rgb2hex([alpha * x + (1 - alpha) * y for x, y in zip(f, b)])


def oklch(L, C, H):
    while C > 0 and not in_gamut(L, C, H):
        C -= 0.002
    return rgb2hex(from_oklch(L, C, H))


WINE, WINE_NIGHT, GOLD, NOIR, IVORY = "#7E2236", "#B4475B", "#C29A5B", "#16110F", "#F8F3EC"
WINE_H = to_oklch(WINE)[2]
WINE_NIGHT_INK = oklch(0.70, 0.095, WINE_H + 8)  # vinho para texto no escuro, menos rosado

out = {
    "color": {
        "$description": "Primitivas de cor do AVYN. Não use direto na interface: use os papéis semânticos (color.light.json / color.dark.json).",
        "brand": {
            "wine": c(WINE, "Granada. Cor principal da marca e tint no modo claro."),
            "wine-night": c(WINE_NIGHT, "Vinho do logo escuro. Preenchimento de ações no modo escuro."),
            "wine-night-ink": c(WINE_NIGHT_INK, "Vinho claro e pouco rosado para texto, ícones e links no modo escuro."),
            "gold": c(GOLD, "Mel. Acento decorativo; nunca texto no modo claro."),
            "noir": c(NOIR, "Quase-preto amadeirado."),
            "ivory": c(IVORY, "Creme. Fundo do modo claro."),
            "paper": c("#FFFDF9", "Superfície mais clara do modo claro."),
        },
        "neutral": {k: c(v) for k, v in scales["neutral"].items()},
        "wine": {k: c(v) for k, v in scales["wine"].items()},
        "gold": {k: c(v) for k, v in scales["gold"].items()},
        "state": {
            "$description": "Cores de estado calibradas para 4,5:1 sobre todos os fundos do respectivo modo.",
            "success-light": c("#457325", "Verde de vinhedo, modo claro."),
            "success-dark": c("#6A9B4D", "Verde de vinhedo, modo escuro."),
            "warning-light": c("#9E5504", "Âmbar (afastado do dourado da marca), modo claro."),
            "warning-dark": c("#D0792A", "Âmbar, modo escuro."),
            "danger-light": c("#BB3924", "Vermelhão (distinto do vinho da marca), modo claro."),
            "danger-dark": c("#E9644C", "Vermelhão, modo escuro."),
        },
        "mix": {
            "$description": "Misturas sólidas (cor a X% sobre o fundo base do modo), para fundos tingidos.",
            "wine-on-ivory-10": c(mix(WINE, IVORY, 0.10)),
            "wine-on-ivory-16": c(mix(WINE, IVORY, 0.16)),
            "wine-ink-on-noir-16": c(mix(WINE_NIGHT_INK, NOIR, 0.16)),
            "wine-ink-on-noir-24": c(mix(WINE_NIGHT_INK, NOIR, 0.24)),
            "gold-on-ivory-18": c(mix(GOLD, IVORY, 0.18)),
            "gold-on-noir-18": c(mix("#DEB77B", NOIR, 0.18)),
            "success-on-ivory-8": c(mix("#457325", IVORY, 0.08)),
            "success-on-noir-14": c(mix("#6A9B4D", NOIR, 0.14)),
            "warning-on-ivory-8": c(mix("#9E5504", IVORY, 0.08)),
            "warning-on-noir-14": c(mix("#D0792A", NOIR, 0.14)),
            "danger-on-ivory-8": c(mix("#BB3924", IVORY, 0.08)),
            "danger-on-noir-14": c(mix("#E9644C", NOIR, 0.14)),
            "wine-pressed": c(scales["wine"]["800"], "Ação pressionada, modo claro."),
            "wine-night-pressed": c(mix(NOIR, WINE_NIGHT, 0.18), "Ação pressionada, modo escuro."),
        },
        "wine-type": {
            "$description": "Cores de dado para o tipo de vinho. Sempre acompanhadas do nome do tipo.",
            "tinto": c(WINE),
            "branco": c(scales["gold"]["200"]),
            "rose": c(scales["wine"]["300"]),
            "espumante": c(scales["gold"]["100"]),
            "laranja": c(oklch(0.72, 0.13, 62)),
            "fortificado": c(scales["gold"]["600"]),
        },
    }
}

dest = ROOT / "tokens" / "color.primitives.json"
dest.parent.mkdir(exist_ok=True)
dest.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("ok", dest.relative_to(ROOT), "wine-night-ink =", WINE_NIGHT_INK)
