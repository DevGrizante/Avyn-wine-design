# Layout e forma

Valores em [`tokens/dimension.json`](../../tokens/dimension.json) e [`tokens/effects.json`](../../tokens/effects.json).

## Espaço

Base de 4 pt: `space.0-5` 2 · `space.1` 4 · `space.2` 8 · `space.3` 12 · `space.4` 16 · `space.5` 20 · `space.6` 24 · `space.8` 32 · `space.10` 40 · `space.12` 48 · `space.16` 64.

- **Dentro de um grupo, apertado; entre grupos, generoso.** Nome e procedência do vinho ficam a 2 pt; seções de uma tela, a 32 pt (`layout.section-gap`).
- **Mais espaço acima de um título do que abaixo.**
- **Margem lateral:** 16 pt (`layout.margin`), 20 pt em iPhones grandes e listas inset (`layout.margin-wide`). Use as margens de layout do sistema sempre que possível.
- **iPad:** texto corrido limitado a 672 pt (`layout.readable-width`, o readableContentGuide).

## Toque

- **Mínimo de 44 × 44 pt** para qualquer área tocável (`size.touch-target`), mesmo quando o desenho é menor (`size.control-small` de 32 pt mantém 44 de área).
- Botão principal de tela: 50 pt (`size.control-large`). Botões, busca e chips: 44 pt.
- Célula: altura mínima de 44 pt (`size.row-min`); célula de oferta, 64 pt.

## Raios

Sempre **cantos contínuos** (squircle): `.continuous` no SwiftUI, `ContinuousRectangleBorder` no Flutter.

| Token | Valor | Uso |
|---|---|---|
| `radius.xs` | 6 | Selos |
| `radius.sm` | 10 | Miniatura de garrafa, campos |
| `radius.md` | 14 | Avisos isolados |
| `radius.lg` | 22 | Cards e grupos de lista |
| `radius.xl` | 32 | Sheets (o sistema aplica o próprio) |
| `radius.full` | cápsula | Botões, busca, chips |

## Profundidade

- **Claro:** `shadow.card` (duas camadas suaves) em cards sobre o fundo; `shadow.floating` em toast e botão flutuante.
- **Escuro:** sem sombra. A profundidade vem de `surface.default` → `surface.elevated`.
- **Barras e sheets:** materiais do sistema (Liquid Glass). Não desenhe vidro próprio.
- **Sem card dentro de card.** Dentro de um card, separe com espaço e linhas (`separator.default`, 0,5 pt).
