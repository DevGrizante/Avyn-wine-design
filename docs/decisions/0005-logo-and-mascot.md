# ADR 0005 — Logo taça-lupa e mascote derivado dele

- **Status:** Aceito para o logo. A parte do mascote foi **suspensa pelo [ADR 0006](0006-no-mascot.md)** (2026-11-15).
- **Histórico:** logo escolhido pelo usuário em 2026-11-15; mascote criado a pedido no mesmo dia
- **Fecha:** o checkpoint da rodada 3 de identidade ([identity-r3.md](../brand/identity-r3.md)) e a escolha de mascote e monograma do gate G2
- **Detalhes:** [docs/brand/logo.md](../brand/logo.md), [docs/brand/mascot.md](../brand/mascot.md)

## Contexto
A rodada 3 terminou com cinco logos e quatro mascotes à espera de escolha. Em paralelo, o ícone taça-lupa em versões clara e escura foi adicionado ao repositório (PR #1, `assets/brand/logo/taca-lupa/`). Para montar o Design System, o usuário escolheu esse ícone e pediu um mascote "com a mesma ideia da logo".

## Decisão
- **Logo:** taça-lupa (`assets/brand/logo/taca-lupa/`).
- **Mascote:** a mesma taça-lupa com um olho: a lente vira o olho e o vinho vira a íris. Cinco poses (neutro, buscando, sem resultado, vazio, brinde), claro e escuro, geradas por `tools/brand/mascot_taca_lupa.py`.

## Alternativas consideradas para o mascote
1. **Dois olhos sobre o vinho em meia-lua.** Descartada: o vinho lia como boca aberta e o conjunto virava emoji, o que fere a regra de não ser infantil.
2. **Um olho (lente = olho, vinho = íris).** Escolhida.
3. Candidatos da rodada 3 (Bigode de uva, Taça sorriso, Rolha provada, Cacho): não usados, porque o pedido foi um mascote derivado do logo.

## Consequências
- O mascote compartilha geometria e traço com o símbolo, mas **nunca aparece junto dele**.
- Os candidatos das rodadas 1–3 ficam como histórico em `assets/brand/*/exploration/`.
- O briefing original dizia "mascote: uva". Com esta decisão, o mascote passa a ser a taça-lupa; `PRODUCT.md` foi atualizado.
- Pendentes: wordmark/lockup da rota taça-lupa e camadas do ícone para o Icon Composer.
