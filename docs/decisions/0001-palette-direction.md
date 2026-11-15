# ADR 0001 — Direção de paleta

- **Status:** Aceito (aprovado pelo usuário em 2026-11-15)
- **Implementação:** tokens em [`tokens/`](../../tokens/), regras em [`docs/foundations/color.md`](../foundations/color.md). A primária do escuro foi resolvida assim: ação em `#B4475B` (o vinho do ícone escuro) e texto interativo em `#D38686` (menos rosado que o 400 da escala).
- **Data:** 2026-11-12
- **Figma:** `Brand` › `01 — Color Foundations` (node `7:5`)
- **Detalhes:** [docs/color/palette-exploration.md](../color/palette-exploration.md)

## Contexto
O AVYN precisa de uma paleta que use as quatro famílias obrigatórias (dourado, preto, vinho, branco), transmita sofisticação **sem** parecer sisuda ou tradicional e continue reconhecível em Light e Dark Mode num app iOS.

## Problema
Com as mesmas quatro famílias dá para fazer marcas muito diferentes. Faltava escolher a combinação de tonalidade, saturação e contraste com base em legibilidade, acessibilidade, personalidade e usabilidade, e não por gosto.

## Alternativas consideradas
1. **Luxury Wine:** bordô quase negro, dourado antigo, noir, marfim. Dark-first.
2. **Modern Minimal:** vinho como única cor, neutros sem temperatura, branco puro.
3. **Warm & Friendly Premium:** granada, mel, quase-preto amadeirado, creme; neutros com a mesma temperatura.

## Decisão (proposta)
Adotar a **Direção 3 — Warm & Friendly Premium**.

## Justificativa
- Todas as três passam WCAG AA para texto nos dois modos, então acessibilidade não desempata.
- A Luxury perde o vinho no Light Mode (bordô lê como preto) e se aproxima da estética de vinícola tradicional que o briefing proíbe.
- A Minimal é a mais legível, mas a menos proprietária: a interface vira "iOS padrão + uma cor".
- A Warm é a única que mantém a identidade nos dois modos (neutros com a mesma temperatura) e entrega acolhimento + personalidade sem perder sofisticação.

## Consequências
- **Primary/tint = vinho** em qualquer direção. O dourado é `accent`, decorativo no Light; como texto no Light, só via `accent-ink` (passo 600).
- A primária do Dark será ajustada para um tom menos rosado antes de virar token.
- Depois da aprovação: o ADR muda para *Aceito*, as escalas viram variáveis `Primitives` e o mapeamento semântico vira a coleção `Semantic` (Light/Dark) no Figma e em `tokens/`.
