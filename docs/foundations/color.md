# Cor

Direção aprovada: **Warm & Friendly Premium** ([ADR 0001](../decisions/0001-palette-direction.md)). Quatro famílias: vinho granada `#7E2236`, mel `#C29A5B`, quase-preto `#16110F` e creme `#F8F3EC`. Os neutros têm a mesma temperatura quente nos dois modos, o que mantém o app reconhecível no escuro.

## Papéis semânticos

Componentes usam só estes papéis. Valores em [`tokens/color.light.json`](../../tokens/color.light.json) e [`tokens/color.dark.json`](../../tokens/color.dark.json).

| Papel | Claro | Escuro | Uso |
|---|---|---|---|
| `background.base` | `#F8F3EC` | `#16110F` | Fundo das telas |
| `background.grouped` | `#F1E9DF` | `#16110F` | Fundo de listas inset grouped |
| `surface.default` | `#FFFDF9` | `#221A18` | Células, cards, campos |
| `surface.elevated` | `#FFFFFF` | `#2E2421` | Sheets, popovers, menus |
| `surface.tinted` | `#ECDEDA` | `#342422` | Destaque discreto da marca (melhor oferta) |
| `fill.primary/secondary/tertiary` | noir 14/9/6% | creme 18/13/9% | Trilhos, chips, campo de busca |
| `label.primary` | `#221A17` | `#F5EDE3` | Texto principal |
| `label.secondary` | `#6C6460` | `#A59C98` | Apoio e placeholder (passa 4,5:1) |
| `label.tertiary` | `#877E7A` | `#877E7A` | Só desabilitado ou decorativo |
| `label.on-action` | `#FFFDF9` | `#F8F3EC` | Texto sobre o botão principal |
| `separator.default/strong` | neutro 200/300 | neutro 800/700 | Linhas entre células, bordas |
| `tint.default` | `#7E2236` | `#D38686` | Tudo que é tocável (o tint do iOS) |
| `action.primary` | `#7E2236` | `#B4475B` | Preenchimento do botão principal |
| `action.secondary` | `#ECDEDA` | `#342422` | Botão secundário (texto em tint) |
| `accent.default` | `#C29A5B` | `#DEB77B` | Dourado decorativo |
| `accent.ink` | `#7F602F` | `#DEB77B` | Dourado como texto |
| `accent.subtle` | `#EEE3D2` | `#3A2F22` | Fundo do selo dourado |
| `status.success/warning/danger` | `#457325` `#9E5504` `#BB3924` | `#6A9B4D` `#D0792A` `#E9644C` | Estados |
| `scrim.default` | noir 40% | preto 55% | Véu atrás de sheets |

## Regras

1. **Um tint só.** `tint.default` marca tudo que é tocável. Vinho não é decoração: se não toca, não é vinho.
2. **Dourado não é texto no claro.** `accent.default` tem 2,4:1 sobre o creme e serve para estrelas, filetes e a janela de consumo. Texto dourado usa `accent.ink`.
3. **No escuro, ação e texto interativo usam vinhos diferentes.** O botão usa `#B4475B`, o mesmo vinho do ícone escuro (texto creme a 4,76:1). Links e ícones usam `#D38686`, um vinho mais claro e menos rosado que o 400 da escala (6,7:1 sobre o fundo). Isso resolve a pendência do ADR 0001 sobre a primária do escuro.
4. **Erro não é vinho.** O vermelhão de `status.danger` tem matiz e luminosidade distintos do granada. O âmbar de `status.warning` foi afastado do dourado da marca.
5. **Estado nunca só por cor.** Selos de estado sempre trazem texto.
6. **Sombra só no claro.** No escuro, profundidade vem de `surface.elevated`.

## Tipos de vinho

Cores de dado, sempre com o nome do tipo ao lado: tinto `#7E2236`, branco `#F4D29F`, rosé `#F6A3AD`, espumante `#FEE8C6`, laranja `#DE9046`, fortificado `#7F602F`. São usadas no ponto ao lado do tipo e na miniatura de garrafa quando não há foto.

## Contraste

Todos os pares obrigatórios passam WCAG 2.2 AA nos dois modos. O relatório é gerado por `python tools/tokens/build.py`: [contrast.md](contrast.md).

## Aumentar Contraste (iOS)

Quando o usuário ativa *Aumentar Contraste*, use `label.primary` no lugar de `label.secondary` em preços e metadados, e `separator.strong` no lugar de `separator.default`. Um conjunto completo de alto contraste fica para a implementação.
