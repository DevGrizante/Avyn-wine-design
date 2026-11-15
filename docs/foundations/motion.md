# Movimento

Valores em [`tokens/effects.json`](../../tokens/effects.json).

## Princípio

O app se move como o iOS: push para navegar, sheet para tarefas curtas, gesto de borda para voltar, swipe actions em listas. Nada disso é redesenhado.

A marca ganha **um único momento autoral**: quando uma garrafa entra na adega, o contador da adega sobe com uma mola curta (`motion.spring.cellar`, 500 ms, bounce 0,2) e o toast de confirmação aparece. Esse spring não é usado em nenhum outro lugar.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `motion.spring.snappy` | 300 ms, bounce 0 | Estados de controle, chips, stepper |
| `motion.spring.smooth` | 450 ms, bounce 0 | Expandir células, reordenar lista |
| `motion.spring.cellar` | 500 ms, bounce 0,2 | Garrafa entrando na adega (só aqui) |
| `motion.duration.fast` | 150 ms | Feedback de toque |
| `motion.duration.base` | 250 ms | Aparecer e sumir |
| `motion.duration.slow` | 400 ms | Mudanças maiores de layout |
| `motion.duration.fade` | 200 ms | Substituto com Reduzir Movimento |

No SwiftUI: `.spring(duration: 0.5, bounce: 0.2)`. No Flutter: `SpringDescription.withDampingRatio` com valores equivalentes.

## Regras

1. **Toque responde na hora:** botões escalam para 0,97 enquanto pressionados (`motion.duration.fast`).
2. **Interrompível:** toda animação pode ser interrompida por um novo toque ou gesto.
3. **Reduzir Movimento:** todo deslocamento e mola vira fade de 200 ms. O contador da adega troca o número sem pular.
4. **Sem loop.** Símbolo, carregamento e selos não animam em loop. Carregamento usa o indicador do sistema.
5. **Haptics:** `.success` ao adicionar à adega; `.selection` ao trocar filtro. Nada além disso.
