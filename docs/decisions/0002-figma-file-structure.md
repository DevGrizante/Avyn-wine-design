# ADR 0002 — Estrutura do arquivo Figma (3 páginas + 7 Sections)

- **Status:** Aceito (aprovado pelo usuário em 2026-11-12)
- **Figma:** arquivo `Avyn Wine Project` (`Szhpv9ZTbYJCWpuhcmfkV0`)

## Contexto
O briefing pede 7 páginas: `00 — Brand Identity` … `06 — Design System Showcase`.

## Problema
O plano **Starter** do Figma limita cada arquivo a **3 páginas** (erro: *"The Starter plan only comes with 3 pages"*). Esse plano também não publica bibliotecas. Dividir o sistema em vários arquivos quebraria o compartilhamento de variáveis, estilos e componentes.

## Alternativas consideradas
1. 3 páginas com 7 Sections, num único arquivo.
2. Upgrade para Professional (páginas ilimitadas).
3. Vários arquivos (descartado: sem publicação de biblioteca no Starter).

## Decisão
Um único arquivo com 3 páginas, cada uma contendo as Sections nomeadas como no briefing:

| Página | Sections |
|---|---|
| `Brand` | `00 — Brand Identity`, `01 — Color Foundations` |
| `Foundations` | `02 — Typography`, `03 — Design Tokens` |
| `Components & Patterns` | `04 — Components`, `05 — iOS UI Patterns`, `06 — Design System Showcase` |

## Consequências
- A nomenclatura 00–06 é preservada, e a navegação acontece por Sections.
- Se o plano mudar para Professional, cada Section pode virar uma página própria sem refazer conteúdo (mover a Section).
