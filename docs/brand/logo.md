# Logo: taça-lupa

Escolhido em 2026-11-15 ([ADR 0005](../decisions/0005-logo-and-mascot.md)). Desde o [ADR 0006](../decisions/0006-no-mascot.md), é a única figura da marca: não há mascote nesta versão. Arquivos em [`assets/brand/logo/taca-lupa/`](../../assets/brand/logo/taca-lupa/), adicionados pelo PR #1.

## Ideia

O bojo da taça é a lente de uma lupa e a haste é o cabo. O símbolo diz o que o app faz, olhar o vinho de perto para saber o que é e quanto custa, sem precisar de texto. Inclinado a −45°, lê como lupa; o vinho em meia-lua dentro da lente lembra que é uma taça.

## Arquivos

| Arquivo | Uso |
|---|---|
| `icone-claro.svg` | Ícone do app (aparência clara), favicon, materiais em fundo claro |
| `icone-escuro.svg` | Ícone do app (aparência escura), foto de perfil no WhatsApp |
| `icone-{claro,escuro}-{16,32,64,512}.png` | Exportações em bitmap |
| `simbolo-claro.svg` / `simbolo-escuro.svg` | Só o símbolo, sem o fundo do ícone, para usar dentro do app (fundo claro / fundo escuro) |

## Origem dos arquivos

Os SVGs são a fonte. Os PNGs (16, 32, 64 e 512 px, claro e escuro) foram exportados desses SVGs e entraram junto com eles no PR #1 (commit `a52b26c`, 2026-11-15). A ferramenta de exportação não foi registrada. Para reexportar, gere os PNGs a partir de `icone-claro.svg` e `icone-escuro.svg` nos mesmos tamanhos e confira o teste de 16 px.

## Construção

- Traço de 26 sobre lente de raio 54, pontas arredondadas, rotação −45°.
- Cores: traço `#16110F` sobre `#F8F3EC` (claro); traço `#F8F3EC` sobre `#16110F` (escuro). Vinho `#7E2236` no claro e `#B4475B` no escuro.
- Teste de tamanho: continua legível a 16 px.

## Regras

- Não girar, não trocar as cores fora dos pares acima, não aplicar sombra ou contorno.
- Área de respiro mínima: metade do raio da lente em volta do símbolo.

## Símbolo dentro do app

- **Onde:** estados vazios (adega vazia, busca sem resultado, antes da primeira busca, sem conexão), a 88 pt (`size.empty-symbol`), uma vez por tela.
- **Onde não:** ícones de ação, abas, toasts e selos usam SF Symbols. O símbolo não anima.
- `simbolo-claro.svg` sobre fundos claros e `simbolo-escuro.svg` sobre fundos escuros. Os arquivos foram feitos a partir da mesma geometria dos SVGs do ícone (sem o retângulo de fundo e com o enquadramento ajustado ao desenho).

## Pendências

- **Ícone do app no iOS 26+:** gerar as camadas para Icon Composer (claro, escuro e tingido), com o vinho como camada separada.
- **Wordmark:** o lockup símbolo + "AVYN" ainda não foi definido para esta rota. O wordmark arredondado da rodada 3 (`assets/brand/logo/exploration/r3/svg/wordmark.svg`) é um candidato.
