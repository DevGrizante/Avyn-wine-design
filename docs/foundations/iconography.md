# Ícones

## No app: SF Symbols

O app usa **SF Symbols**, que acompanham o peso e o tamanho do texto e o Dynamic Type. Peso `regular` ao lado de texto `body`; `semibold` em barras. Tamanhos: `size.icon-small` (17 pt, ao lado de texto) e `size.icon-regular` (22 pt, barras e ações).

| Uso | Símbolo sugerido |
|---|---|
| Buscar | `magnifyingglass` |
| Adega | `wineglass` (ou símbolo próprio, ver abaixo) |
| Perfil | `person` |
| Filtros | `line.3.horizontal.decrease` |
| Ordenar | `arrow.up.arrow.down` |
| Melhor preço | `tag` |
| Preço caiu | `arrow.down` |
| Alerta de preço | `bell` |
| Adicionar / remover | `plus` / `minus` |
| Compartilhar | `square.and.arrow.up` |
| Janela de consumo | `clock` |

## Símbolos próprios

Só dois, exportados como *custom symbol* (template do SF Symbols) para herdar peso e escala:

- **Taça-lupa** (a partir do símbolo da marca): candidata ao ícone da aba Buscar se a navegação final pedir identidade própria.
- **Garrafa**: miniatura usada quando não há foto do rótulo (no showcase, preenchida com a cor do tipo de vinho).

## No showcase (web)

SF Symbols não podem ser usados como fonte web. O showcase usa ícones SVG desenhados no mesmo espírito (traço 1,8, pontas arredondadas) apenas para ilustrar. Na implementação, troque pelos SF Symbols da tabela.

## Regras

- Ícone de ação sempre em `tint.default`; ícone informativo em `label.secondary`.
- Ícone sozinho precisa de rótulo de acessibilidade.
- Nada de emoji no lugar de ícone.
