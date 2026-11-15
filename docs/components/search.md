# Busca e filtros

A busca é a porta de entrada do MVP. Usa o campo de busca do sistema (`.searchable` no SwiftUI) com a aparência do AVYN.

## Campo de busca

- **Anatomia:** ícone de lupa, texto, botão de limpar (aparece com texto).
- **Fundo** `fill.tertiary`, cápsula, 44 pt. Placeholder em `label.secondary`: "Vinho, uva, produtor ou região".
- **Foco:** anel de 2 pt em `tint.default`; cursor em `tint.default`.
- **Sugestões:** enquanto digita, sugestões do sistema (`searchSuggestions`) com vinhos, produtores e regiões. Buscas recentes aparecem com o campo vazio.

## Filtros (chips)

- Linha horizontal que rola, logo abaixo do campo. Altura 34 pt de desenho, 44 de área.
- **Inativo:** `fill.secondary` + `label.primary`. **Ativo:** invertido (`label.primary` de fundo, `background.base` de texto).
- O primeiro chip, "Filtros", abre um sheet com todos os filtros (tipo, preço, país, uva, avaliação). Os chips seguintes são atalhos dos filtros mais usados.
- O chip de ordenação mostra a ordem atual ("Menor preço") e abre um menu do sistema.
- Abaixo dos chips, uma linha em `typography.footnote` diz o que a lista mostra: "38 vinhos · preços de 12 lojas · menor preço primeiro".

## Estados

- **Carregando:** lista com células esqueleto (sem brilho animado); indicador do sistema se a busca passar de 1 s.
- **Sem resultado:** [estado vazio](empty-states.md) com o símbolo da taça-lupa e uma sugestão de grafia, quando houver.
- **Erro de rede:** mensagem curta com o problema e o botão "Tentar de novo".

## Acessibilidade

- Chips anunciam o estado ("Tinto, selecionado").
- A linha de contagem é anunciada quando os resultados mudam.
