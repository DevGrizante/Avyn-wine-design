# ADR 0004 — Tipografia: Playfair Display + DM Sans

- **Status:** Aceito (escolha do usuário em 2026-11-15)
- **Substitui:** [ADR 0003](0003-ui-font-stand-in.md) e a escolha de serifa editorial prevista no gate G2 (Newsreader / Source Serif 4 / Gloock)
- **Implementação:** [`tokens/typography.json`](../../tokens/typography.json), [`docs/foundations/typography.md`](../foundations/typography.md), arquivos em [`assets/fonts/`](../../assets/fonts/)

## Contexto
O plano previa SF Pro na UI e uma serifa editorial a escolher no G2. O usuário definiu as duas famílias:

> Playfair Display: títulos, nomes dos vinhos e destaques.
> DM Sans: textos, menus, botões e informações.

## Problema
A HIG recomenda que a fonte do sistema carregue a UI. Era preciso decidir onde a DM Sans entra e como manter Dynamic Type e legibilidade com duas fontes próprias.

## Alternativas consideradas
1. **DM Sans só no conteúdo**, SF Pro em botões, abas e barras: mais nativo, menos marca.
2. **DM Sans em tudo que é do app**, SF Pro só no que o sistema desenha (alertas, menus de ação, teclado, seletores, barra de status).

## Decisão
Alternativa 2, escolhida pelo usuário. Playfair Display (variável, 400–900) nos títulos, nomes de vinhos e destaques; DM Sans (variável, 100–1000, eixo óptico) em textos, menus, botões, abas e informações; SF Pro apenas no que o iOS desenha.

## Justificativa
- As duas têm licença OFL: podem ir no app, na web e no Figma (que renderiza Google Fonts no servidor, o que elimina o problema do ADR 0003).
- A Playfair dá o lado editorial e de vinho; a DM Sans é geométrica, legível e moderna, o que evita o "classicismo excessivo" proibido no briefing.

## Consequências
- **Playfair só a partir de 18 pt** (os traços finos somem abaixo disso). Nome de vinho em lista usa 18 pt.
- **Preço sempre em DM Sans.** A DM Sans não tem algarismos tabulares: colunas de preço alinham à direita e números não animam trocando dígitos.
- **Dynamic Type obrigatório:** cada estilo é ligado a um text style do iOS e escala com `UIFontMetrics` (iOS) ou `textScaler` (Flutter).
- As fontes precisam ser embarcadas no app (`Info.plist` no iOS, `pubspec.yaml` no Flutter).
- No Figma, os estilos de texto passam de Inter para DM Sans e Playfair Display.
