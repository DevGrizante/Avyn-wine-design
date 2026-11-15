# ADR 0006 — Sem mascote nesta versão: só o logo

- **Status:** Aceito (pedido do usuário em 2026-11-15)
- **Suspende:** a parte do mascote do [ADR 0005](0005-logo-and-mascot.md). O logo taça-lupa continua valendo.

## Contexto
O ADR 0005 criou um mascote derivado do logo (a taça-lupa com um olho) para estados vazios e toasts. Depois de ver as telas, o usuário pediu:

> Ajuste para não utilizar o mascote agora, apenas a logo mesmo.

## Decisão
- O app não usa mascote nesta versão. A única figura da marca é o símbolo taça-lupa.
- Nos estados vazios, o símbolo sem o fundo do ícone (`assets/brand/logo/taca-lupa/simbolo-claro.svg` e `simbolo-escuro.svg`) ocupa o lugar da ilustração, a 88 pt (`size.empty-symbol`, que substitui `size.mascot-empty`).
- No toast de confirmação, o mascote dá lugar ao ícone de confirmação do sistema (`checkmark`, em `status.success`).

## Consequências
- A marca dentro do app fica em cor, tipografia, símbolo e janela de consumo.
- Mais sóbrio e mais próximo do iOS, o que reforça o "nada infantil" do briefing.
- O mascote perde a regra "nunca junto do logo" por não existir mais na interface.
- Os arquivos do mascote (`assets/brand/mascot/taca-lupa/`, `tools/brand/mascot_taca_lupa.py`, `docs/brand/mascot.md`) ficam como histórico. Se o mascote voltar, este ADR é substituído.
