"""Gera tokens/color.light.json e tokens/color.dark.json (W3C DTCG).

Cada papel semântico aponta para uma primitiva por alias. Os dois modos têm
exatamente as mesmas chaves (garantido por este script). Para mudar um papel,
edite a tabela ROLES e rode:

    python tools/tokens/make_semantic.py
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]

# papel: (alias claro, alias escuro, descrição)
ROLES = {
    "background": {
        "base": ("brand.ivory", "brand.noir", "Fundo das telas."),
        "grouped": ("#F1E9DF", "brand.noir", "Fundo de listas agrupadas (inset grouped)."),
    },
    "surface": {
        "default": ("brand.paper", "#221A18", "Células, cards e campos sobre o fundo."),
        "elevated": ("#FFFFFF", "#2E2421", "Sheets, popovers e menus."),
        "tinted": ("mix.wine-on-ivory-10", "mix.wine-ink-on-noir-16", "Destaque discreto da marca (ex.: card de oferta)."),
    },
    "fill": {
        "primary": ("#16110F24", "#F8F3EC2E", "Trilho de controles (switch, slider)."),
        "secondary": ("#16110F17", "#F8F3EC21", "Chips e controles segmentados."),
        "tertiary": ("#16110F0F", "#F8F3EC17", "Campo de busca e campos de texto."),
    },
    "label": {
        "primary": ("#221A17", "#F5EDE3", "Texto principal."),
        "secondary": ("neutral.600", "neutral.400", "Texto de apoio e placeholder (passa 4,5:1)."),
        "tertiary": ("neutral.500", "neutral.500", "Só texto desabilitado ou decorativo. Não passa 4,5:1."),
        "on-action": ("brand.paper", "brand.ivory", "Texto e ícone sobre action.primary."),
    },
    "separator": {
        "default": ("neutral.200", "neutral.800", "Linhas entre células."),
        "strong": ("neutral.300", "neutral.700", "Bordas de controles e cards de adega (3:1 contra o fundo não é exigido)."),
    },
    "tint": {
        "default": ("brand.wine", "brand.wine-night-ink", "Cor interativa do app: links, ícones de ação, seleção. Equivale ao tint do iOS."),
    },
    "action": {
        "primary": ("brand.wine", "brand.wine-night", "Preenchimento do botão principal."),
        "primary-pressed": ("mix.wine-pressed", "mix.wine-night-pressed", "Botão principal pressionado."),
        "secondary": ("mix.wine-on-ivory-10", "mix.wine-ink-on-noir-16", "Preenchimento do botão secundário (texto em tint)."),
        "secondary-pressed": ("mix.wine-on-ivory-16", "mix.wine-ink-on-noir-24", "Botão secundário pressionado."),
    },
    "accent": {
        "default": ("brand.gold", "gold.300", "Dourado decorativo: estrelas, filetes, ícones de destaque. Nunca texto no claro."),
        "ink": ("gold.600", "gold.300", "Dourado quando precisa ser texto."),
        "subtle": ("mix.gold-on-ivory-18", "mix.gold-on-noir-18", "Fundo de selo dourado (ex.: melhor preço)."),
    },
    "status": {
        "success": ("state.success-light", "state.success-dark", "No ponto para beber, preço caiu, sucesso."),
        "success-subtle": ("mix.success-on-ivory-8", "mix.success-on-noir-14", "Fundo do selo de sucesso."),
        "warning": ("state.warning-light", "state.warning-dark", "Beber logo, atenção."),
        "warning-subtle": ("mix.warning-on-ivory-8", "mix.warning-on-noir-14", "Fundo do selo de atenção."),
        "danger": ("state.danger-light", "state.danger-dark", "Erro, ação destrutiva, passou do ponto."),
        "danger-subtle": ("mix.danger-on-ivory-8", "mix.danger-on-noir-14", "Fundo do selo de erro."),
    },
    "scrim": {
        "default": ("#16110F66", "#0000008C", "Véu atrás de sheets e diálogos."),
    },
}


def value(ref):
    return ref if ref.startswith("#") else "{color." + ref + "}"


def build(mode):
    idx = 0 if mode == "light" else 1
    doc = {"color": {"$description": f"Papéis semânticos de cor, modo {'claro' if mode == 'light' else 'escuro'}. Mesmas chaves nos dois modos."}}
    for group, roles in ROLES.items():
        g = doc["color"].setdefault(group, {})
        for name, spec in roles.items():
            g[name] = {"$type": "color", "$value": value(spec[idx]), "$description": spec[2]}
    return doc


for mode in ("light", "dark"):
    dest = ROOT / "tokens" / f"color.{mode}.json"
    dest.write_text(json.dumps(build(mode), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("ok", dest.relative_to(ROOT))
