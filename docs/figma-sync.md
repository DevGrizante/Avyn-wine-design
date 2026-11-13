# Sincronização Figma ↔ GitHub

O Figma é o ambiente de criação; este repositório é a fonte oficial de documentação e tokens.

- **Arquivo:** [Avyn Wine Project](https://www.figma.com/design/Szhpv9ZTbYJCWpuhcmfkV0/Avyn-Wine-Project) (`Szhpv9ZTbYJCWpuhcmfkV0`)
- **Estrutura:** 3 páginas + 7 Sections ([ADR 0002](decisions/0002-figma-file-structure.md))

## Mapa atual

| Página / Section | Node | Conteúdo no Figma | Documento | Tokens | Estado |
|---|---|---|---|---|---|
| `Brand` | `0:1` | — | — | — | criada |
| └ `00 — Brand Identity` | `7:4` | vazia; na raiz da página `Brand` estão os 6 mascotes descartados (`14:2`–`14:7`) e os 3 candidatos de IA v2 (`19:2`–`19:4`). Quando o MCP voltar, os v2 vão para dentro da Section e os descartados para uma área de histórico | [brand/identity-exploration.md](brand/identity-exploration.md) | — | parcial |
| └ `01 — Color Foundations` | `7:5` | 3 boards de exploração + recomendação | [color/palette-exploration.md](color/palette-exploration.md) | — (exploração; tokens só após aprovação) | sincronizado em 2026-11-12 |
| `Foundations` | `7:2` | vazia | — | — | criada |
| `Components & Patterns` | `7:3` | vazia | — | — | criada |

**Identidade rodada 3 (2026-11-12):** 19 SVGs importados como vetores editáveis via `upload_assets` e ainda soltos na raiz da página `Brand` (camadas com prefixo `r3-`):

| Grupo | Nodes |
|---|---|
| Ícones de app dos logos (L2, L5, L6, L3, L4) | `23:2`, `23:7`, `23:13`, `23:19`, `23:26` |
| Lockups sobre tile | `23:33`, `23:45`, `23:59`, `23:72`, `23:87` |
| Ícones de app dos mascotes (M1, M3, M2, M4) | `23:104`, `23:136`, `23:145`, `23:157` |
| Mascotes em cor | `23:185`, `23:215`, `23:222`, `23:232` |
| Wordmark | `23:258` |

A organização dentro da Section `00` (`use_figma`) foi bloqueada pela cota do Starter; o upload funcionou.

Nodes da exploração de paleta: `8:5` (Direção 1), `8:471` (Direção 2), `8:937` (Direção 3), `10:2` (Recomendação), `8:2` (cabeçalho).

## Checklist de sincronização (a cada mudança)
1. Identificar os documentos afetados (tabela acima).
2. Atualizar o documento e, se for o caso, o arquivo em `tokens/`.
3. Procurar referências antigas (`grep` pelo HEX/valor antigo em `docs/` e `tokens/`).
4. Registrar a mudança em um ADR (se for decisão) e no [CHANGELOG](../CHANGELOG.md).
5. Conferir o Figma lendo variáveis/estilos e o repositório antes de declarar sincronizado.

## Limitações conhecidas do ambiente
- **Plano Starter:** 3 páginas por arquivo e sem publicação de biblioteca.
- **Figma MCP no Starter:** a cota mensal de chamadas de ferramenta se esgotou em 2026-11-12, durante a Fase 2 (a documentação da Figma cita 20 chamadas/mês). Leituras e `use_figma` ficaram bloqueados até o reset mensal ou upgrade. Ferramentas que consomem créditos de IA (`generate_image`) não contam nesse limite.
- **SF Pro** não renderiza no servidor do Figma: Inter é a substituta ([ADR 0003](decisions/0003-ui-font-stand-in.md)).
- **Kit "iOS and iPadOS 27" da Apple:** já está adicionado ao arquivo, mas a importação falha até alguém aceitar o EULA da Apple no Figma. As simulações usam status bar e home indicator desenhados localmente.
