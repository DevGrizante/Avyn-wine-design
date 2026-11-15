# Estados vazios e toast

## Estado vazio

Baseado em `ContentUnavailableView`, com o [símbolo da taça-lupa](../brand/logo.md#símbolo-dentro-do-app) no lugar do ícone. Esta versão do app não tem mascote ([ADR 0006](../decisions/0006-no-mascot.md)).

- **Anatomia:** símbolo (88 pt, `size.empty-symbol`; `simbolo-claro.svg` ou `simbolo-escuro.svg` conforme o modo) · título em Playfair 600 22 pt · uma ou duas linhas de explicação em `typography.callout`, `label.secondary` · uma ação.
- **O texto diz o que aconteceu e o que fazer.** Uma ação só.
- O símbolo é o mesmo em todas as situações; o que muda é o texto.

| Situação | Título | Ação |
|---|---|---|
| Adega vazia | Sua adega está vazia | Buscar vinhos (principal) |
| Busca sem resultado | Nenhum vinho para "malbek" | Buscar "malbec" (secundário), quando houver sugestão |
| Antes da primeira busca | Encontre o menor preço de qualquer vinho | — (o campo de busca já é a ação) |
| Sem conexão | Sem conexão | Tentar de novo |

## Toast

Confirmação curta de uma ação que já aconteceu.

- Cápsula em `surface.elevated` com `shadow.floating` (no escuro, contorno de `separator.default`).
- Ícone de confirmação (SF Symbol `checkmark`, 20 pt, `status.success`) · texto em DM Sans 500 15 pt · ação opcional em `tint.default` ("Desfazer").
- Aparece acima da tab bar, some em 3 s. Com VoiceOver, é anunciado e fica até ser dispensado.
- Para erros que pedem decisão, use um alerta do sistema, não toast.
