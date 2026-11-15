# Vinho na lista

Célula de resultado da busca.

## Anatomia

```
┌──────┬────────────────────────────────┬────────────┐
│ foto │ Nome do vinho e safra (Playfair)│  R$ 119,90 │
│ ou   │ Produtor · Região, País         │   em 9 lojas│
│garrafa│ ★ 4,2   [Melhor preço]          │            │
└──────┴────────────────────────────────┴────────────┘
```

- **Miniatura** 40 × 56 pt, `radius.sm`. Com foto do rótulo, a foto; sem foto, a garrafa desenhada na cor do tipo sobre `fill.tertiary`.
- **Nome** `typography.wine-name` (18 pt), até 3 linhas, safra no fim.
- **Procedência** `typography.subheadline`, `label.secondary`.
- **Rodapé:** avaliação e, quando for o caso, um selo.
- **Preço** `typography.body-strong` alinhado à direita, com "em N lojas" em `typography.footnote`.

## Comportamento

- Toque abre o detalhe do vinho (push).
- Arrastar para a esquerda: "Adicionar à adega" (swipe action em `tint.default`).
- Toque longo: menu de contexto do sistema com prévia (Adicionar à adega, Compartilhar).

## Dynamic Type

Nos tamanhos de acessibilidade, o preço desce para baixo do nome e a miniatura fica no topo.

## Acessibilidade

Uma célula = um elemento: "Cerro Azul Malbec Reserva 2021, Mendoza, Argentina. Nota 4,2. Menor preço 119 reais e 90 centavos em 9 lojas. Melhor preço."
