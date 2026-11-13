# Changelog

Formato: data · o que mudou · onde (Figma / repo).

## 2026-11-12 — Identidade rodada 3 (nível "showcase")

- Novo pedido: chegar perto dos exemplos da skill, mantendo as famílias de cor e o "nada infantil". O resto foi liberado e o pedido era por várias ideias.
- 5 logos:
  - Decanter-A (recomendado), a-giro, Lupa-taça, Garrafa-etiqueta, y-taça;
  - Brinde-A foi descartado porque lia como "W".
- 4 mascotes: Bigode de uva (recomendado), Taça sorriso, Rolha provada, Cacho.
- Novo wordmark `avyn` em minúsculas arredondadas.
- Saídas:
  - grade de ícones de app em cor;
  - quadros de conceito em cinza;
  - board com mockups (`presentation_board.py`).
- Novos: `docs/brand/identity-r3.md`, `tools/brand/identity_r3.py`, `assets/brand/logo/exploration/r3/`, `assets/brand/mascot/exploration/r3/`.

## 2026-11-12 — Identidade rodada 2 (skill logo-design)

- A pedido, apagados `assets/brand/mascot/structure-tests/` e `assets/brand/mascot/candidates-v2/` (incluindo os PNGs da IA; os originais continuam no Figma, `19:2`–`19:4`). Em `assets/brand/mascot/` ficou só `exploration/`.
- Novo processo com a skill logo-design:
  - brief, clichês e mapa de palavras;
  - 3 logos: A Taça-lupa (recomendado), B Giro, C V-lágrima;
  - 3 mascotes: M3 Bagos-olhos (recomendado), M2 Gavinha, M1 Silhueta;
  - tudo em preto, com `svg_audit` e quadros de conceito.
- Novos: `docs/brand/identity-r2.md`, `tools/brand/identity_r2.py`, `assets/brand/logo/exploration/r2/`, `assets/brand/mascot/exploration/r2/`.

## 2026-11-12 — Mascote: redesenho pela estrutura de cacho (Etapas 1–2)

- Os 6 mascotes A1–C2 foram descartados como referência (liam como maçã, pêssego, pera ou cereja). Os arquivos ficam como histórico.
- 3 estruturas de cacho (A compacta, B orgânica, C geométrica) testadas em silhueta preta, sem rosto e sem cor: com separação, só contorno e reduzidas a 64/32/16 px. Foram 3 rodadas; as folhas de A e B foram refeitas porque liam como topete e depois como estrela.
- Novos: `docs/brand/mascot-structure.md`, `tools/mascot/structures.py`, `assets/brand/mascot/structure-tests/` (9 arquivos + prancha).
- Aguardando escolha da estrutura (recomendação: A com o ombro sutil de B).
- Candidatos de personagem v2, a pedido:
  - 4 vetoriais (A, B, AB, C) com 6 expressões cada, gerados por `tools/mascot/mascots.py` → `assets/brand/mascot/candidates-v2/`.
  - 3 gerações de IA com prompt de anatomia de cacho → Figma `Brand` (`19:2`–`19:4`, na raiz da página) e `candidates-v2/ai/`.

## 2026-11-12 — Conceitos de identidade (antecipados a pedido)

- 6 candidatos de mascote (A1–C2) gerados com IP as Logo via `generate_image` → Figma `Brand` (`14:2`–`14:7`) e `assets/brand/mascot/exploration/`.
- Wordmark geométrico ΛVYN (3 variantes) e 3 rotas de símbolo (Y-taça, A-bago, Selo-bago) em SVG → `assets/brand/logo/exploration/` (21 arquivos).
- Rota iii trocada de "ligadura V+Y" para "Selo-bago" (a ligadura lia como "W"); veja `docs/brand/identity-exploration.md`.

## 2026-11-12 — Fase 1 (análise) e Fase 2 (direção visual)

### Repositório
- `README.md` reescrito em UTF-8 (o original era UTF-16, com só o título).
- `PRODUCT.md`: contexto de produto para agentes de design (Impeccable).
- `docs/product-context.md`: síntese do documento de visão.
- `docs/color/palette-exploration.md`: três direções de paleta com escalas OKLCH, semânticas Light/Dark, contraste WCAG e recomendação.
- `docs/brand/identity-exploration.md`: propostas de mascote (A/B/C) e de monograma (i/ii/iii).
- `docs/decisions/`: ADR 0001 (paleta, *proposto*), 0002 (estrutura Figma, *aceito*), 0003 (Inter como substituta do SF Pro, *aceito*).
- `docs/figma-sync.md`: mapa Figma ↔ docs e limitações do ambiente.
- `tools/color/`: gerador reproduzível das escalas e semânticas.
- `assets/exports/figma-pages/`: capturas da exploração de paleta.

### Figma
- "Page 1" renomeada para `Brand`; criadas as páginas `Foundations` e `Components & Patterns`.
- Sections `00 — Brand Identity` e `01 — Color Foundations` na página `Brand`.
- Exploração de paleta: 3 boards (swatches, escalas, semânticas, contraste, justificativa, simulações iPhone Light/Dark) + board de recomendação.
