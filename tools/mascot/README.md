# tools/mascot

`structures.py` gera os testes de silhueta das estruturas de cacho do mascote a partir de uma única geometria (círculos dos bagos, curvas de haste e pecíolo, polígono da folha).

```
python tools/mascot/structures.py
```

Requer Pillow. Grava em `assets/brand/mascot/structure-tests/`:
- `{A,B,C}-silhouette.svg`: com anel de separação entre bagos;
- `{A,B,C}-contour-only.svg`: sem separação interna;
- `{A,B,C}-silhouette.png`: 800 px;
- `evaluation-sheet.png`: prancha comparativa (separação, contorno, 64/32/16 px e ampliação ×4).

`mascots.py` importa as estruturas e aplica rosto e cor provisória (A, B, AB, C × 6 expressões). Grava em `assets/brand/mascot/candidates-v2/` (SVGs, PNGs de 800 px, `candidates-sheet.png`, `AB-expressions.png`). Rode de dentro de `tools/mascot/`: `python mascots.py`.

Critérios e resultados em [`docs/brand/mascot-structure.md`](../../docs/brand/mascot-structure.md).
