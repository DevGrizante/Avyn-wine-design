# Botões

Cápsulas (`radius.full`) com texto em DM Sans 600, 17 pt. O texto é sempre a ação ("Adicionar à adega", "Ver ofertas"), nunca "OK" ou "Clique aqui".

## Variantes

| Variante | Fundo | Texto | Quando |
|---|---|---|---|
| Principal | `action.primary` | `label.on-action` | A ação mais importante da tela. Uma por tela. |
| Secundário | `action.secondary` | `tint.default` | Ações de apoio ("Criar alerta", "Buscar 'malbec'") |
| Simples | transparente | `tint.default` | Ações de baixa ênfase, links em listas |
| Destrutivo | `status.danger-subtle` | `status.danger` | Remover da adega. Sempre pede confirmação (action sheet do sistema). |

## Tamanhos

- **Grande:** 50 pt (`size.control-large`), largura total da margem. Botão principal no rodapé ou no corpo da tela.
- **Padrão:** 44 pt (`size.control-regular`).
- **Compacto:** 32 pt de desenho (`size.control-small`), 44 pt de área tocável.
- **Só ícone:** círculo de 44 pt em `action.secondary`, com rótulo de acessibilidade.

## Estados

- **Pressionado:** fundo `*-pressed` e escala 0,97 (`motion.duration.fast`).
- **Desabilitado:** fundo `fill.secondary`, texto `label.tertiary`. Prefira explicar por que a ação não está disponível a desabilitar sem aviso.
- **Carregando:** indicador do sistema no lugar do ícone, texto no gerúndio ("Buscando preços"), botão continua do mesmo tamanho.

## Acessibilidade

- Rótulo = texto visível. Botão só com ícone precisa de `accessibilityLabel`.
- No Dynamic Type grande, o texto quebra em duas linhas e o botão cresce na altura; nunca trunca.
