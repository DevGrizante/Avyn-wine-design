# Adega

## Resumo da adega

Card no topo da aba Adega com três números lado a lado, separados por linhas finas:

| Número | Estilo | Cor |
|---|---|---|
| Garrafas | Playfair 600, 28 pt | `label.primary` |
| No ponto | Playfair 600, 28 pt | `status.success` |
| Beber logo | Playfair 600, 28 pt | `label.primary` |

Rótulos em `typography.footnote`, `label.secondary`. Tocar num número filtra a lista. O valor estimado da adega é Premium ("análise avançada") e não aparece no resumo grátis.

## Filtros

Chips iguais aos da [busca](search.md): Todas, No ponto, Beber logo, Guardar.

## Garrafa na adega

- Miniatura, nome (`typography.wine-name` a 17 pt), procedência com o estado em cor de estado e peso 600 ("Douro · **no ponto**"), e a [janela de consumo](drinking-window.md) compacta.
- **Quantidade:** na lista, "×3" em `label.secondary`. Para mudar, o detalhe da garrafa tem a linha "Garrafas" com o número e o `Stepper` do sistema (dois segmentos − | +, sem o número dentro).
- **Ordem padrão:** por urgência (beber logo, no ponto, guardar, passou do ponto); dentro de cada grupo, pela safra.

## Comportamento

- **Adicionar à adega** (vindo da busca ou do detalhe): o contador do resumo sobe com `motion.spring.cellar`, haptic `.success` e toast "Adicionado à adega · Desfazer" com ícone de confirmação.
- **Swipe para a esquerda:** "Abrir garrafa" (diminui 1 e registra a data) e "Remover" (destrutivo, com confirmação).
- **Adega vazia:** [estado vazio](empty-states.md) com o símbolo da taça-lupa.

## Acessibilidade

O resumo é lido como "24 garrafas, 7 no ponto, 3 para beber logo". As swipe actions também ficam disponíveis como ações do VoiceOver.
