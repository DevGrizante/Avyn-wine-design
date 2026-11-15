# Preço, selos e avaliação

## Preço

- **DM Sans 600.** Em listas, `typography.body-strong` (17 pt); no detalhe, `typography.price-hero` (28 pt).
- **Formato:** `R$ 189,90`. O símbolo `R$` fica menor (72%) e em `label.secondary`.
- **Preço anterior:** riscado, `typography.footnote`, `label.secondary`, à direita do preço atual.
- **Alinhamento:** à direita em listas e comparações. A DM Sans não tem algarismos tabulares, então colunas alinham pela direita.
- Nunca "a partir de" sem dizer onde. Preço sempre acompanha a loja ou o número de lojas.

## Selos

Altura 22 pt, `radius.xs`, DM Sans 600 12 pt. Ícone opcional de 13 pt.

| Selo | Fundo | Texto | Uso |
|---|---|---|---|
| Melhor preço | `accent.subtle` | `accent.ink` | Uma vez por lista, só na oferta mais barata |
| Preço caiu | `status.success-subtle` | `status.success` | Com a variação ("Caiu 12%") |
| No ponto | `status.success-subtle` | `status.success` | Estado da garrafa |
| Beber logo | `status.warning-subtle` | `status.warning` | Estado da garrafa |
| Passou do ponto | `status.danger-subtle` | `status.danger` | Estado da garrafa |
| Guardar | `fill.secondary` | `label.secondary` | Estado da garrafa |
| Premium | `fill.secondary` | `label.secondary` | Recurso pago (ex.: alerta de preço) |

## Avaliação

Uma estrela em `accent.default`, nota com uma casa decimal ("4,3") em DM Sans 600 e, quando couber, o número de avaliações em `label.secondary` ("(1.284)"). Nunca cinco estrelas parciais: são difíceis de ler e de comparar.

## Tipo de vinho

Ponto de 10 pt na cor do tipo (`wine-type.*`) seguido do nome. A cor nunca aparece sem o nome.

## Acessibilidade

- Preço é lido por extenso: "cento e oitenta e nove reais e noventa centavos" (formatação de moeda do sistema).
- Selo de estado é parte do rótulo da célula ("No ponto para beber").
