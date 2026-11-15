# Tipografia

Decisão em [ADR 0004](../decisions/0004-typography.md).

- **Playfair Display**: títulos, nomes de vinhos e destaques. Variável, peso 400–900. Arquivos em [`assets/fonts/playfair-display/`](../../assets/fonts/playfair-display/).
- **DM Sans**: textos, menus, botões e informações. Variável, peso 100–1000, eixo óptico 9–40. Arquivos em [`assets/fonts/dm-sans/`](../../assets/fonts/dm-sans/).
- **SF Pro**: só nos elementos que o próprio iOS desenha (alertas, menus de ação, teclado, seletores, barra de status).

As duas fontes têm licença OFL: podem ser embarcadas no app e usadas na web.

## Estilos

Tamanhos no tamanho padrão do Dynamic Type (Large). Cada estilo escala com o text style do iOS indicado.

| Token | Fonte | Peso | Tamanho/linha | Escala como | Uso |
|---|---|---|---|---|---|
| `large-title` | Playfair | 600 | 34/40 | largeTitle | Título das telas de topo |
| `title-1` | Playfair | 600 | 28/34 | title1 | Nome do vinho no detalhe |
| `title-2` | Playfair | 600 | 22/28 | title2 | Títulos de seção e de sheet |
| `title-3` | Playfair | 600 | 20/25 | title3 | Subtítulos, destaques |
| `wine-name` | Playfair | 600 | 18/23 | headline | Nome do vinho em listas e cards |
| `price-hero` | DM Sans | 600 | 28/32 | title1 | Melhor preço no detalhe |
| `headline` | DM Sans | 600 | 17/22 | headline | Rótulos fortes, título inline |
| `body` | DM Sans | 400 | 17/24 | body | Texto corrido |
| `body-strong` | DM Sans | 600 | 17/22 | body | Botões, preços em lista |
| `callout` | DM Sans | 400 | 16/22 | callout | Texto de apoio em cards |
| `subheadline` | DM Sans | 400 | 15/20 | subheadline | Produtor, região, safra |
| `footnote` | DM Sans | 400 | 13/18 | footnote | Frete, notas |
| `caption` | DM Sans | 500 | 12/16 | caption1 | Selos, legendas |
| `caption-2` | DM Sans | 500 | 11/13 | caption2 | Rótulos da tab bar (piso de 11 pt) |

## Regras

1. **Playfair só a partir de 18 pt.** Abaixo disso os traços finos somem na tela.
2. **Preço é sempre DM Sans.** É dado de confiança e precisa ler rápido.
3. **A DM Sans não tem algarismos tabulares.** Em colunas de preço, alinhe à direita e use o mesmo formato (`R$ 189,90`). Não anime números que trocam de dígito.
4. **Formato brasileiro:** `R$ 189,90`, `1.284 avaliações`, `14%`, `750 ml`, datas `15/11/2026`.
5. **Nome de vinho quebra linha, nunca trunca** (no máximo 3 linhas em listas). Safra fica no fim do nome.
6. **Sem itálico de enfeite.** A Playfair tem itálico, mas o sistema não usa; ênfase vem de peso e tamanho.

## Dynamic Type

Público até 65 anos: Dynamic Type é obrigatório.

- **iOS:** registre as fontes no `Info.plist` e escale com `UIFontMetrics(forTextStyle:)` (`Font.custom(_:size:relativeTo:)` no SwiftUI), usando o text style da tabela.
- **Flutter:** aplique `MediaQuery.textScalerOf(context)`; não trave a escala.
- Nos tamanhos de acessibilidade (AX1–AX5), listas trocam o layout horizontal por empilhado: miniatura em cima, preço abaixo do nome.
- O eixo óptico da DM Sans (`opsz`) acompanha o tamanho: no iOS, passe o tamanho final como valor do eixo.
