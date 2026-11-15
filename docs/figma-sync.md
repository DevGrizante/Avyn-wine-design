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

## Design System v0.1 (2026-11-15): repositório primeiro

Com a cota do MCP esgotada, o Design System foi montado só no repositório (tokens, documentação e showcase em HTML). **Nada disso está no Figma ainda.** Quando a cota voltar, levar nesta ordem, agrupando cada etapa em uma única chamada `use_figma`:

| Etapa | Origem no repositório | Destino no Figma |
|---|---|---|
| 1. Variáveis de cor `Primitives` | `tokens/color.primitives.json` | Coleção `Primitives` |
| 2. Variáveis `Semantic` (modos Light/Dark) | `tokens/color.light.json`, `tokens/color.dark.json` | Coleção `Semantic` |
| 3. Espaço, raio, tamanho | `tokens/dimension.json` | Coleção `Dimension` |
| 4. Estilos de texto (Playfair Display + DM Sans) | `tokens/typography.json` | Estilos de texto; a variável `font/family/ui` do ADR 0003 deixa de ser usada |
| 5. Logo e símbolo (sem mascote, ADR 0006) | `assets/brand/logo/taca-lupa/` | `Brand` › `00 — Brand Identity` |
| 6. Componentes do MVP | `docs/components/`, `docs/showcase/` | `Components & Patterns` |

## Checklist de sincronização (a cada mudança)
1. Identificar os documentos afetados (tabela acima).
2. Atualizar o documento e, se for o caso, o arquivo em `tokens/`.
3. Procurar referências antigas (`grep` pelo HEX/valor antigo em `docs/` e `tokens/`).
4. Registrar a mudança em um ADR (se for decisão) e no [CHANGELOG](../CHANGELOG.md).
5. Conferir o Figma lendo variáveis/estilos e o repositório antes de declarar sincronizado.

## Limitações conhecidas do ambiente
- **Plano Starter:** 3 páginas por arquivo e sem publicação de biblioteca.
- **Figma MCP no Starter:** a cota mensal de chamadas de ferramenta se esgotou em 2026-11-12, durante a Fase 2 (a documentação da Figma cita 20 chamadas/mês). Leituras e `use_figma` ficaram bloqueados até o reset mensal ou upgrade. Ferramentas que consomem créditos de IA (`generate_image`) não contam nesse limite.
- **SF Pro** não renderiza no servidor do Figma. Desde o [ADR 0004](decisions/0004-typography.md) isso só afeta os elementos desenhados pelo sistema (alertas, teclado, seletores); a UI do app usa Playfair Display e DM Sans, que renderizam. O Inter do [ADR 0003](decisions/0003-ui-font-stand-in.md) deixa de ser usado.
- **Kit "iOS and iPadOS 27" da Apple:** já está adicionado ao arquivo, mas a importação falha até alguém aceitar o EULA da Apple no Figma. As simulações usam status bar e home indicator desenhados localmente.
