# Componentes

Componentes do MVP (busca de vinhos, adega e avisos por WhatsApp). Cada página traz anatomia, variantes, estados, tokens, comportamento no iOS e acessibilidade. Todos podem ser vistos, nos dois modos, no [showcase](../showcase/index.html).

| Componente | Onde aparece | Base no iOS |
|---|---|---|
| [Botões](buttons.md) | Todas as telas | `Button` com estilo próprio (cápsula) |
| [Busca e filtros](search.md) | Aba Buscar | `.searchable` + chips em `ScrollView` horizontal |
| [Preço, selos e avaliação](price-and-badges.md) | Busca, detalhe, adega | Texto + forma |
| [Vinho na lista](wine-row.md) | Resultados da busca | Célula de `List` |
| [Comparação de preços](price-comparison.md) | Detalhe do vinho | `Section` de `List` inset grouped |
| [Janela de consumo](drinking-window.md) | Detalhe, adega | Componente próprio (assinatura) |
| [Adega](cellar.md) | Aba Adega | Resumo + `List` com `Stepper` e swipe actions |
| [Estados vazios e toast](empty-states.md) | Busca, adega | `ContentUnavailableView` com o símbolo |
| [Aviso no WhatsApp](whatsapp-notice.md) | Fora do app | Template de mensagem |

Elementos que o sistema desenha (alertas, menus de ação, seletores, sheets, tab bar e barra de navegação) não ganham componente próprio: usam o padrão do iOS com o tint e as fontes do AVYN. Ver [padrões iOS](../patterns/ios-patterns.md).
