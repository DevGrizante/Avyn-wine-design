# Exploração de paleta

> **Status:** em avaliação, aguardando aprovação (gate G1). Decisão registrada em [ADR 0001](../decisions/0001-palette-direction.md).
> **Figma:** página `Brand` › Section `01 — Color Foundations` (node `7:5`). Boards `Palette / Direção 1–3` (`8:5`, `8:471`, `8:937`) e `Palette / Recomendação` (`10:2`).
> **Captura:** [`assets/exports/figma-pages/01-color-foundations-exploration.png`](../../assets/exports/figma-pages/01-color-foundations-exploration.png) (feita antes do ajuste de truncamento nas linhas da lista) e [`01-color-foundations-recommendation.png`](../../assets/exports/figma-pages/01-color-foundations-recommendation.png).

## Método

1. **Quatro famílias obrigatórias** em todas as direções: vinho/bordô, dourado, preto e branco. Muda só a tonalidade, a saturação e o contraste.
2. **Cor-âncora** por família, escolhida à mão (os HEX do briefing não são aleatórios; veja a justificativa de cada direção).
3. **Escalas tonais 50–950 geradas em OKLCH** a partir da âncora: luminosidade perceptual fixa por passo, croma reduzido nos extremos, matiz constante. Gerador reproduzível em [`tools/color/`](../../tools/color/) (`python gen.py && python sem.py`).
4. **Semânticas Light/Dark** derivadas das escalas, com contraste verificado por WCAG 2.2 antes de desenhar.
5. **Mesma simulação de iPhone** (Catálogo + "Melhor preço hoje" + lista) nas três direções, em Light e Dark, para a comparação ser justa. Conteúdo fictício.

### Achado transversal: o dourado não é cor de texto no Light Mode

Nas três direções, o dourado sobre fundo claro fica entre **2,4:1 e 3,3:1** e reprova AA para texto. Consequência para qualquer direção escolhida:

- **Primary/tint = vinho** (≥ 8,7:1 no Light; versão clareada ≥ 6,6:1 no Dark).
- **Accent = dourado**, decorativo no Light (estrelas de avaliação, filetes, fundos de selo), e pode ser texto no Dark (≥ 10:1).
- **`accent-ink`** (dourado escurecido, passo 600) quando o dourado precisar virar texto no Light (≥ 5,2:1).

## As três direções

### Direção 1 — Luxury Wine
*Sofisticada · profunda · exclusiva.* Dark-first: bordô quase negro `#5B1024`, dourado antigo `#B08D57`, noir `#0D0A0B`, marfim `#F3EEE6`.

- **Por que essa combinação:** o bordô quase negro carrega o peso de uma adega à luz baixa, o dourado antigo dessaturado evita o amarelo e o marfim tira a frieza do branco.
- **Força:** é excelente no Dark Mode (superfícies grafite, acento dourado a 10,5:1).
- **Riscos:** no Light Mode o bordô lê como preto e a marca perde a cor. A atmosfera tende ao clássico/sisudo, perto da "vinícola tradicional" que o briefing quer evitar.

### Direção 2 — Modern Minimal
*Contemporânea · limpa · minimalista.* Vinho `#7A1E33` como única cor, dourado `#A8884F` só como filete e avaliação, preto `#111111`, branco puro `#FFFFFF`.

- **Por que essa combinação:** neutros sem temperatura (croma ≈ 0) deixam o vinho como único ponto de cor. Tem a máxima legibilidade e é a mais próxima do iOS nativo.
- **Força:** leitura densa de preços e listas.
- **Riscos:** é a menos proprietária. Sem o vinho, a interface é indistinguível de qualquer app iOS. O dourado quase desaparece e o acolhimento é baixo.

### Direção 3 — Warm & Friendly Premium
*Sofisticada · acolhedora · com personalidade.* Granada `#7E2236`, mel `#C29A5B`, quase-preto amadeirado `#16110F`, creme `#F8F3EC`.

- **Por que essa combinação:** todos os neutros compartilham a mesma temperatura (matiz OKLCH ≈ 45°), então o creme do Light e o quase-preto do Dark parecem a mesma marca com a luz acesa ou apagada. A granada tem mais vida que o bordô sem virar vermelho, e o mel é dourado sem amarelo.
- **Força:** personalidade e reconhecimento nos dois modos.
- **Riscos:** creme em excesso pode parecer "papelaria". O controle vem de usar o dourado com disciplina e de superfícies quase brancas nos cards.

## Recomendação

**Direção 3 — Warm & Friendly Premium**, pelos critérios pedidos:

| Critério | Luxury | Minimal | **Warm** |
|---|---|---|---|
| Legibilidade (texto/fundo L · D) | 15,8 · 17,1 | 18,9 · 19,3 | 15,5 · 16,2 |
| Acessibilidade (primária/fundo L · D) | 11,8 · 7,1 | 10,2 · 7,5 | 8,8 · 6,7 |
| Personalidade / briefing ("premium, não sisudo") | fraca (clássica) | fraca (genérica) | **forte** |
| Identidade reconhecível em Light **e** Dark | só no Dark | fraca nos dois | **forte nos dois** |
| Usabilidade iOS (um tint, listas nativas) | boa | ótima | ótima |

Todas passam AA. O que decide é personalidade + coerência Light/Dark, e aí a Direção 3 é a única que atende as duas.

**Ajustes previstos se aprovada** (antes de virar token):
- A primária do Dark (`#D7828D`) lê como rosé no chip selecionado. Vou deslocá-la para um tom mais quente e menos rosado, mantendo ≥ 4,5:1.
- Calibrar o `background-grouped` do Light para não ficar com aspecto de papel.

## Dados completos

### Escalas — Direção 1 — Luxury Wine

| Passo | Vinho | Dourado | Neutro |
|---|---|---|---|
| 50 | `#FEF4F5` <sub>rgb(254, 244, 245)</sub> | `#FFF5E8` <sub>rgb(255, 245, 232)</sub> | `#FBF5F5` <sub>rgb(251, 245, 245)</sub> |
| 100 | `#FEE4E6` <sub>rgb(254, 228, 230)</sub> | `#FFE8C6` <sub>rgb(255, 232, 198)</sub> | `#EFEAE9` <sub>rgb(239, 234, 233)</sub> |
| 200 | `#FEC7CD` <sub>rgb(254, 199, 205)</sub> | `#F0D3A8` <sub>rgb(240, 211, 168)</sub> | `#DED5D5` <sub>rgb(222, 213, 213)</sub> |
| 300 | `#EBA9B1` <sub>rgb(235, 169, 177)</sub> | `#DAB885` <sub>rgb(218, 184, 133)</sub> | `#C4BBBB` <sub>rgb(196, 187, 187)</sub> |
| 400 | `#CD8992` <sub>rgb(205, 137, 146)</sub> | `#B08D57` <sub>rgb(176, 141, 87)</sub> | `#A59C9C` <sub>rgb(165, 156, 156)</sub> |
| 500 | `#AF6973` <sub>rgb(175, 105, 115)</sub> | `#9A7A48` <sub>rgb(154, 122, 72)</sub> | `#867E7E` <sub>rgb(134, 126, 126)</sub> |
| 600 | `#944D59` <sub>rgb(148, 77, 89)</sub> | `#7D6134` <sub>rgb(125, 97, 52)</sub> | `#6C6464` <sub>rgb(108, 100, 100)</sub> |
| 700 | `#7D3542` <sub>rgb(125, 53, 66)</sub> | `#644B23` <sub>rgb(100, 75, 35)</sub> | `#554E4D` <sub>rgb(85, 78, 77)</sub> |
| 800 | `#681F30` <sub>rgb(104, 31, 48)</sub> | `#4F3914` <sub>rgb(79, 57, 20)</sub> | `#423B3B` <sub>rgb(66, 59, 59)</sub> |
| 900 | `#5B1024` <sub>rgb(91, 16, 36)</sub> | `#382504` <sub>rgb(56, 37, 4)</sub> | `#2E2727` <sub>rgb(46, 39, 39)</sub> |
| 950 | `#31000D` <sub>rgb(49, 0, 13)</sub> | `#211300` <sub>rgb(33, 19, 0)</sub> | `#1A1414` <sub>rgb(26, 20, 20)</sub> |

### Semânticas — Direção 1 — Luxury Wine

| Token | Light | Dark |
|---|---|---|
| `background` | `#F3EEE6` <sub>rgb(243, 238, 230)</sub> | `#0D0A0B` <sub>rgb(13, 10, 11)</sub> |
| `background-grouped` | `#EAE3D8` <sub>rgb(234, 227, 216)</sub> | `#0D0A0B` <sub>rgb(13, 10, 11)</sub> |
| `surface` | `#FBF8F3` <sub>rgb(251, 248, 243)</sub> | `#1A1414` <sub>rgb(26, 20, 20)</sub> |
| `surface-elevated` | `#FFFFFF` <sub>rgb(255, 255, 255)</sub> | `#251E20` <sub>rgb(37, 30, 32)</sub> |
| `text-primary` | `#1A1414` <sub>rgb(26, 20, 20)</sub> | `#F3EEE6` <sub>rgb(243, 238, 230)</sub> |
| `text-secondary` | `#6C6464` <sub>rgb(108, 100, 100)</sub> | `#A59C9C` <sub>rgb(165, 156, 156)</sub> |
| `separator` | `#DED5D5` <sub>rgb(222, 213, 213)</sub> | `#423B3B` <sub>rgb(66, 59, 59)</sub> |
| `primary` | `#5B1024` <sub>rgb(91, 16, 36)</sub> | `#CD8992` <sub>rgb(205, 137, 146)</sub> |
| `on-primary` | `#F3EEE6` <sub>rgb(243, 238, 230)</sub> | `#0D0A0B` <sub>rgb(13, 10, 11)</sub> |
| `primary-subtle` | `#FEF4F5` <sub>rgb(254, 244, 245)</sub> | `#31000D` <sub>rgb(49, 0, 13)</sub> |
| `accent` | `#B08D57` <sub>rgb(176, 141, 87)</sub> | `#DAB885` <sub>rgb(218, 184, 133)</sub> |
| `accent-ink` | `#7D6134` <sub>rgb(125, 97, 52)</sub> | `#DAB885` <sub>rgb(218, 184, 133)</sub> |

**Contraste (WCAG 2.2):**

| Par | Light | Dark |
|---|---|---|
| text-primary / background | 15.76:1 | 17.07:1 |
| text-secondary / background | 4.99:1 | 7.35:1 |
| text-secondary / surface | 5.44:1 | 6.79:1 |
| primary / background | 11.77:1 | 7.12:1 |
| on-primary / primary | 11.77:1 | 7.12:1 |
| accent / background | 2.68:1 | 10.49:1 |
| accent-ink / surface | 5.46:1 | 9.68:1 |

### Escalas — Direção 2 — Modern Minimal

| Passo | Vinho | Dourado | Neutro |
|---|---|---|---|
| 50 | `#FFF4F4` <sub>rgb(255, 244, 244)</sub> | `#FFF6E6` <sub>rgb(255, 246, 230)</sub> | `#F7F6F6` <sub>rgb(247, 246, 246)</sub> |
| 100 | `#FFE4E6` <sub>rgb(255, 228, 230)</sub> | `#FEE8C3` <sub>rgb(254, 232, 195)</sub> | `#ECEBEA` <sub>rgb(236, 235, 234)</sub> |
| 200 | `#FFC7CC` <sub>rgb(255, 199, 204)</sub> | `#EED4A7` <sub>rgb(238, 212, 167)</sub> | `#D8D7D6` <sub>rgb(216, 215, 214)</sub> |
| 300 | `#F5A4AD` <sub>rgb(245, 164, 173)</sub> | `#D8B984` <sub>rgb(216, 185, 132)</sub> | `#BFBDBC` <sub>rgb(191, 189, 188)</sub> |
| 400 | `#D7828D` <sub>rgb(215, 130, 141)</sub> | `#B99962` <sub>rgb(185, 153, 98)</sub> | `#9F9E9D` <sub>rgb(159, 158, 157)</sub> |
| 500 | `#B8626E` <sub>rgb(184, 98, 110)</sub> | `#A8884F` <sub>rgb(168, 136, 79)</sub> | `#81807F` <sub>rgb(129, 128, 127)</sub> |
| 600 | `#9D4554` <sub>rgb(157, 69, 84)</sub> | `#7C6131` <sub>rgb(124, 97, 49)</sub> | `#676665` <sub>rgb(103, 102, 101)</sub> |
| 700 | `#852B3D` <sub>rgb(133, 43, 61)</sub> | `#634C1F` <sub>rgb(99, 76, 31)</sub> | `#514F4F` <sub>rgb(81, 79, 79)</sub> |
| 800 | `#7A1E33` <sub>rgb(122, 30, 51)</sub> | `#4E3910` <sub>rgb(78, 57, 16)</sub> | `#3E3D3C` <sub>rgb(62, 61, 60)</sub> |
| 900 | `#52001A` <sub>rgb(82, 0, 26)</sub> | `#372501` <sub>rgb(55, 37, 1)</sub> | `#2A2928` <sub>rgb(42, 41, 40)</sub> |
| 950 | `#31000C` <sub>rgb(49, 0, 12)</sub> | `#1F1400` <sub>rgb(31, 20, 0)</sub> | `#171615` <sub>rgb(23, 22, 21)</sub> |

### Semânticas — Direção 2 — Modern Minimal

| Token | Light | Dark |
|---|---|---|
| `background` | `#FFFFFF` <sub>rgb(255, 255, 255)</sub> | `#000000` <sub>rgb(0, 0, 0)</sub> |
| `background-grouped` | `#F7F6F6` <sub>rgb(247, 246, 246)</sub> | `#000000` <sub>rgb(0, 0, 0)</sub> |
| `surface` | `#FFFFFF` <sub>rgb(255, 255, 255)</sub> | `#1C1C1E` <sub>rgb(28, 28, 30)</sub> |
| `surface-elevated` | `#FFFFFF` <sub>rgb(255, 255, 255)</sub> | `#2C2C2E` <sub>rgb(44, 44, 46)</sub> |
| `text-primary` | `#111111` <sub>rgb(17, 17, 17)</sub> | `#F5F5F4` <sub>rgb(245, 245, 244)</sub> |
| `text-secondary` | `#676665` <sub>rgb(103, 102, 101)</sub> | `#9F9E9D` <sub>rgb(159, 158, 157)</sub> |
| `separator` | `#D8D7D6` <sub>rgb(216, 215, 214)</sub> | `#3E3D3C` <sub>rgb(62, 61, 60)</sub> |
| `primary` | `#7A1E33` <sub>rgb(122, 30, 51)</sub> | `#D7828D` <sub>rgb(215, 130, 141)</sub> |
| `on-primary` | `#FFFFFF` <sub>rgb(255, 255, 255)</sub> | `#000000` <sub>rgb(0, 0, 0)</sub> |
| `primary-subtle` | `#FFF4F4` <sub>rgb(255, 244, 244)</sub> | `#31000C` <sub>rgb(49, 0, 12)</sub> |
| `accent` | `#A8884F` <sub>rgb(168, 136, 79)</sub> | `#D8B984` <sub>rgb(216, 185, 132)</sub> |
| `accent-ink` | `#7C6131` <sub>rgb(124, 97, 49)</sub> | `#D8B984` <sub>rgb(216, 185, 132)</sub> |

**Contraste (WCAG 2.2):**

| Par | Light | Dark |
|---|---|---|
| text-primary / background | 18.88:1 | 19.25:1 |
| text-secondary / background | 5.73:1 | 7.85:1 |
| text-secondary / surface | 5.73:1 | 6.36:1 |
| primary / background | 10.19:1 | 7.47:1 |
| on-primary / primary | 10.19:1 | 7.47:1 |
| accent / background | 3.33:1 | 11.19:1 |
| accent-ink / surface | 5.82:1 | 9.07:1 |

### Escalas — Direção 3 — Warm & Friendly Premium

| Passo | Vinho | Dourado | Neutro |
|---|---|---|---|
| 50 | `#FEF4F5` <sub>rgb(254, 244, 245)</sub> | `#FFF5E7` <sub>rgb(255, 245, 231)</sub> | `#FBF5F3` <sub>rgb(251, 245, 243)</sub> |
| 100 | `#FEE4E6` <sub>rgb(254, 228, 230)</sub> | `#FEE8C6` <sub>rgb(254, 232, 198)</sub> | `#F0EAE7` <sub>rgb(240, 234, 231)</sub> |
| 200 | `#FEC7CC` <sub>rgb(254, 199, 204)</sub> | `#F4D29F` <sub>rgb(244, 210, 159)</sub> | `#DFD5D1` <sub>rgb(223, 213, 209)</sub> |
| 300 | `#F6A3AD` <sub>rgb(246, 163, 173)</sub> | `#DEB77B` <sub>rgb(222, 183, 123)</sub> | `#C5BBB7` <sub>rgb(197, 187, 183)</sub> |
| 400 | `#D7828D` <sub>rgb(215, 130, 141)</sub> | `#C29A5B` <sub>rgb(194, 154, 91)</sub> | `#A59C98` <sub>rgb(165, 156, 152)</sub> |
| 500 | `#B9626E` <sub>rgb(185, 98, 110)</sub> | `#9C7A42` <sub>rgb(156, 122, 66)</sub> | `#877E7A` <sub>rgb(135, 126, 122)</sub> |
| 600 | `#9E4553` <sub>rgb(158, 69, 83)</sub> | `#7F602F` <sub>rgb(127, 96, 47)</sub> | `#6C6460` <sub>rgb(108, 100, 96)</sub> |
| 700 | `#7E2236` <sub>rgb(126, 34, 54)</sub> | `#654A1E` <sub>rgb(101, 74, 30)</sub> | `#564E4A` <sub>rgb(86, 78, 74)</sub> |
| 800 | `#6E162C` <sub>rgb(110, 22, 44)</sub> | `#50380F` <sub>rgb(80, 56, 15)</sub> | `#433B38` <sub>rgb(67, 59, 56)</sub> |
| 900 | `#520019` <sub>rgb(82, 0, 25)</sub> | `#382501` <sub>rgb(56, 37, 1)</sub> | `#2E2724` <sub>rgb(46, 39, 36)</sub> |
| 950 | `#31000C` <sub>rgb(49, 0, 12)</sub> | `#201300` <sub>rgb(32, 19, 0)</sub> | `#1B1412` <sub>rgb(27, 20, 18)</sub> |

### Semânticas — Direção 3 — Warm & Friendly Premium

| Token | Light | Dark |
|---|---|---|
| `background` | `#F8F3EC` <sub>rgb(248, 243, 236)</sub> | `#16110F` <sub>rgb(22, 17, 15)</sub> |
| `background-grouped` | `#F1E9DF` <sub>rgb(241, 233, 223)</sub> | `#16110F` <sub>rgb(22, 17, 15)</sub> |
| `surface` | `#FFFDF9` <sub>rgb(255, 253, 249)</sub> | `#221A18` <sub>rgb(34, 26, 24)</sub> |
| `surface-elevated` | `#FFFFFF` <sub>rgb(255, 255, 255)</sub> | `#2E2421` <sub>rgb(46, 36, 33)</sub> |
| `text-primary` | `#221A17` <sub>rgb(34, 26, 23)</sub> | `#F5EDE3` <sub>rgb(245, 237, 227)</sub> |
| `text-secondary` | `#6C6460` <sub>rgb(108, 100, 96)</sub> | `#A59C98` <sub>rgb(165, 156, 152)</sub> |
| `separator` | `#DFD5D1` <sub>rgb(223, 213, 209)</sub> | `#433B38` <sub>rgb(67, 59, 56)</sub> |
| `primary` | `#7E2236` <sub>rgb(126, 34, 54)</sub> | `#D7828D` <sub>rgb(215, 130, 141)</sub> |
| `on-primary` | `#FFFDF9` <sub>rgb(255, 253, 249)</sub> | `#16110F` <sub>rgb(22, 17, 15)</sub> |
| `primary-subtle` | `#FEF4F5` <sub>rgb(254, 244, 245)</sub> | `#31000C` <sub>rgb(49, 0, 12)</sub> |
| `accent` | `#C29A5B` <sub>rgb(194, 154, 91)</sub> | `#DEB77B` <sub>rgb(222, 183, 123)</sub> |
| `accent-ink` | `#7F602F` <sub>rgb(127, 96, 47)</sub> | `#DEB77B` <sub>rgb(222, 183, 123)</sub> |

**Contraste (WCAG 2.2):**

| Par | Light | Dark |
|---|---|---|
| text-primary / background | 15.49:1 | 16.15:1 |
| text-secondary / background | 5.24:1 | 6.96:1 |
| text-secondary / surface | 5.7:1 | 6.35:1 |
| primary / background | 8.77:1 | 6.66:1 |
| on-primary / primary | 9.53:1 | 6.66:1 |
| accent / background | 2.36:1 | 9.96:1 |
| accent-ink / surface | 5.72:1 | 9.09:1 |
