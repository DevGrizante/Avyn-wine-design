# Janela de consumo

O componente-assinatura do AVYN. Responde à pergunta que o colecionador mais faz: abro agora ou espero?

## Anatomia

- **Régua de anos** (`fill.secondary`, cápsula, 10 pt de altura; 6 pt na versão compacta).
- **Faixa da janela** (`accent.subtle` com contorno de 1 pt em `accent.default`): anos em que o vinho está bom para beber.
- **Auge** (`accent.default` cheio): os melhores anos dentro da janela.
- **Marcador "Hoje"** (`tint.default`, 3 pt): onde estamos. Rótulo "Hoje" acima, só na versão grande.
- **Anos** nas pontas e no meio, `typography.caption`.
- **Selo de estado** no cabeçalho: Guardar, No ponto, Beber logo ou Passou do ponto.

## Exemplos de estado

| Estado | Janela | Auge | Régua | Hoje (nov/2026) |
|---|---|---|---|---|
| Guardar | 2028–2036 | 2030–2033 | 2026–2038 | antes da janela |
| No ponto | 2024–2032 | 2026–2029 | 2022–2034 | dentro do auge |
| Beber logo | 2020–2028 | 2022–2025 | 2018–2030 | depois do auge |
| Passou do ponto | 2015–2024 | 2018–2021 | 2013–2028 (estendida até hoje) | depois da janela |

## Variantes

- **Grande:** no detalhe do vinho, dentro de um card. Com título "Janela de consumo", selo, rótulo "Hoje" e anos.
- **Compacta:** dentro da célula da adega, sem textos (o estado vai na linha de procedência).

## Regras

1. **Sempre com texto.** O selo e o rótulo de acessibilidade dizem a janela em palavras. A cor só reforça.
2. **A régua começa dois anos antes da janela e termina dois depois**, para "Hoje" nunca encostar na borda. Se hoje estiver fora desse intervalo, a régua se estende até hoje.
3. **Estado** a partir da posição de hoje: antes da janela = Guardar; na janela, antes do fim do auge = No ponto; depois do auge e até o fim da janela = Beber logo; depois da janela = Passou do ponto.
4. **Fonte do dado:** produtor ou crítica. Sem dado, o componente não aparece. Janela estimada só com o aviso "estimativa".

## Movimento

Ao abrir o detalhe, nada anima. Ao trocar a safra num seletor, a faixa e o marcador deslizam com `motion.spring.smooth`; com Reduzir Movimento, fade.

## Acessibilidade

Elemento único com rótulo: "Janela de consumo de 2024 a 2032, auge de 2026 a 2029. Hoje: no ponto."
