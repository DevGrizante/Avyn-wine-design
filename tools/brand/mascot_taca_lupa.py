"""Mascote taça-lupa: gera os SVGs a partir da mesma geometria do símbolo.

Ideia: a lente da taça-lupa é o olho do mascote, e o vinho é a íris. O corpo
reaproveita as peças do logo (assets/brand/logo/taca-lupa): os dois arcos do
bojo/lente, a haste e o pé, com o mesmo traço de 26 e pontas arredondadas.
A expressão vem só da inclinação do corpo e da posição da íris. Sem boca,
bochecha ou membros, para não ficar infantil.

Alternativa descartada (2026-11-15): dois olhos sobre o vinho em meia-lua. O
vinho lia como boca aberta, e o conjunto virava emoji. Prévia em
assets/brand/mascot/taca-lupa/exploracao/.

    python tools/brand/mascot_taca_lupa.py

Saída: assets/brand/mascot/taca-lupa/mascote-<pose>-<claro|escuro>.svg
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "brand" / "mascot" / "taca-lupa"

THEMES = {
    "claro": {"ink": "#16110F", "wine": "#7E2236", "glint": "#F8F3EC"},
    "escuro": {"ink": "#F8F3EC", "wine": "#B4475B", "glint": "#16110F"},
}

# Peças do símbolo, em coordenadas locais (centro da lente em 0,0; raio 54).
LOWER_ARC = "M 53.47 7.52 A 54 54 0 0 1 -53.47 7.52"
UPPER_ARC = "M -44.77 -30.2 A 54 54 0 0 1 44.77 -30.2"
STEM = "M 0 54 V 124 M -30 124 H 30"


def iris(x, y, r=21):
    """Íris de vinho com um brilho no canto superior esquerdo."""
    return (
        f'<circle cx="{x}" cy="{y}" r="{r}" fill="{{wine}}"/>'
        f'<circle cx="{x - r * 0.36:.1f}" cy="{y - r * 0.36:.1f}" r="{r * 0.24:.1f}" fill="{{glint}}"/>'
    )


def empty_eye():
    """Taça sem vinho: só a pupila, olhando para o fundo."""
    return '<circle cx="0" cy="24" r="8" fill="{ink}"/>'


POSES = {
    # nome: (rotação em graus, olho, uso)
    "neutro": (-12, iris(0, 2), "Apresentação, onboarding, avisos neutros."),
    "buscando": (-45, iris(10, -12), "Busca: carregando ou convite para buscar. Mesma pose do símbolo."),
    "sem-resultado": (-38, iris(-12, 14), "Busca sem resultado: olha para baixo, de lado."),
    "vazio": (-8, empty_eye(), "Adega vazia: a taça sem vinho olha para o próprio fundo."),
    "brinde": (10, iris(4, -10, r=23), "Sucesso: garrafa adicionada, preço caiu. Corpo inclinado para trás, olhando para cima."),
}


def svg(rotation, eye, theme):
    t = THEMES[theme]
    face = eye.replace("{wine}", t["wine"]).replace("{glint}", t["glint"]).replace("{ink}", t["ink"])
    # gira em torno do meio da figura (0, 35) e centraliza no quadro 256
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">\n'
        f'  <g transform="translate(128 128) scale(0.78125) rotate({rotation}) translate(0 -35)">\n'
        f'    <g fill="none" stroke="{t["ink"]}" stroke-width="26" stroke-linecap="round">\n'
        f'      <path d="{LOWER_ARC}"/>\n      <path d="{STEM}"/>\n      <path d="{UPPER_ARC}"/>\n'
        "    </g>\n"
        f"    {face}\n"
        "  </g>\n</svg>\n"
    )


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (rot, eye, _use) in POSES.items():
        for theme in THEMES:
            (OUT / f"mascote-{name}-{theme}.svg").write_text(svg(rot, eye, theme), encoding="utf-8")
    print("ok", len(POSES) * len(THEMES), "arquivos em", OUT.relative_to(ROOT).as_posix())
