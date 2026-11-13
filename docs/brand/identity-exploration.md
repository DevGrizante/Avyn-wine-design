# Exploração de identidade

> **Status (2026-11-12):** conceitos gerados para comparação, aguardando escolha (gate G2). Cores da direção recomendada (Warm & Friendly Premium), ainda não aprovada.
> **Visualização:** página privada "AVYN Brand Sketches" (Artifact no claude.ai) com wordmark, rotas, lockups, ícones, teste de redução e mascotes.
> **Arquivos:** logos em [`assets/brand/logo/exploration/`](../../assets/brand/logo/exploration/) (21 SVGs); mascotes **descartados** em [`assets/brand/mascot/exploration/`](../../assets/brand/mascot/exploration/) (6 PNGs, 1024 px, só histórico); testes de estrutura do novo mascote em [`assets/brand/mascot/structure-tests/`](../../assets/brand/mascot/structure-tests/).
> **Figma:** os mascotes estão na página `Brand` (nodes `14:2`–`14:7`). Os logos ainda não foram para o Figma (cota do MCP esgotada) e serão reconstruídos lá como vetores nativos depois da escolha.

## Princípio de separação
- **Identidade da marca:** logotipo AVYN, símbolo/monograma, cor, tipografia. É ela que assina o produto.
- **Identidade do produto:** o mascote, que aparece só *dentro* da experiência (onboarding, conquistas, feedbacks, estados vazios, IA). Nunca acompanha o logotipo e nunca o substitui.

## Mascote: três tratamentos de uva

> **Descartado (2026-11-12).** As direções abaixo e os 6 candidatos gerados (A1–C2) foram rejeitados como referência visual: a esfera única com rosto lia como maçã, pêssego, pera ou cereja. O mascote está sendo redesenhado a partir da estrutura de **cacho**. Veja [mascot-structure.md](mascot-structure.md). O registro abaixo fica só como histórico.

Sujeito fixo (descartado): **uma uva**, não um cacho com olhos. Cada direção trabalhava uma silhueta e uma personalidade.

| # | Direção | Conexão com o produto | Silhueta definidora |
|---|---|---|---|
| A | **Bago solo** | O "sommelier de bolso": companhia da IA que explica o vinho | Esfera levemente oval com um talo curto e grosso no topo |
| B | **Bago com folha-boina** | O conhecedor acolhedor: aprendizado e cultura do vinho | Esfera com uma folha de videira arredondada, inclinada como boina |
| C | **Bago com gavinha** | Curiosidade e descoberta: busca e comparação | Esfera com uma única gavinha espiral, grossa e de ponta arredondada |

**Regras da skill aplicadas:** 4–7 formas grandes, no máximo um traço definidor, duas cores do personagem (tiradas da paleta aprovada) + uma cor de fundo levemente dessaturada, legível em 32 × 32 px, entrando pelo canto inferior esquerdo, sem contornos finos nem pontas agudas.

**Proposta de geração:** 6 candidatos independentes, 2 por direção (A1, A2, B1, B2, C1, C2), via `generate_image` do Figma (consome créditos de IA do Figma; autorizado). O escolhido é redesenhado como **vetor nativo editável** com variações de expressão.

## Símbolo/monograma: três rotas (sem brasões)

| Rota | Ideia | Por que funciona | Risco |
|---|---|---|---|
| i | **Y-taça:** o Y de AVYN desenhado como taça com haste | O nome já contém a forma; liga marca e produto sem ilustração | Pode ficar literal demais se a taça for descritiva |
| ii | **A-bago:** a contraforma do A vira uma gota/bago | Discreto, funciona em tamanho pequeno (app icon) | Contraforma pequena pode sumir em 16 px |
| iii | ~~**V+Y em ligadura**~~ → **Selo-bago:** bago sólido com talinho e o A vazado | A mais forte em tamanho pequeno e como ícone de app | Forma circular é comum; a personalidade depende do talo e do A vazado |

**Por que a rota iii mudou:** desenhada lado a lado, a ligadura V+Y vira um zigue-zague que lê como "W" e perde o nome. O Selo-bago mantém a regra de não usar brasões e cobre a lacuna das outras duas rotas: uma forma de massa sólida, legível a 16 px.

### Wordmark
Geométrico e construído à mão, monolinear com terminais arredondados (traço 10 em altura de 100). O **A sem travessão (Λ)** espelha o V e cria o ritmo Λ-V-Y. Há três variantes, uma por rota:
- `base`: ΛVYN puro (rota iii).
- `glass`: o Y ganha o bojo curvo de taça (rota i).
- `berry`: um bago no lugar da barra do A (rota ii).

Ponto em aberto: o Λ pode ser lido como "A" ou como lambda. No contexto do nome funciona; a validação final é com usuários.

## Relatório de geração do mascote (IP as Logo)

- **Modelo:** `gpt-image-2.5-flare` via `generate_image` do Figma (créditos de IA do Figma; fora da cota do MCP).
- **Restrições:** linha `Constraints:` dentro do prompt principal (modelo moderno, sem parâmetro negativo).
- **Prompt:** o esqueleto da skill, sem citar logo/ícone. Muda por candidato só o sujeito e as cores.
- **Composição:** todos entram pelo canto inferior esquerdo. Pedido: 1536 px; nativo entregue: **1024 × 1024**, preservado sem reamostragem.
- **Entrega:** sem filtragem nem retoque, conforme a skill.

| # | Direção | Corpo | Traço/boca | Fundo | Arquivo | Figma |
|---|---|---|---|---|---|---|
| A1 | Bago solo | granada `#7E2236` | talo mel `#C29A5B` | pêssego `#EED9C4` | `A1-bago-solo.png` | `14:2` |
| A2 | Bago solo | mel `#D2AE70` (uva branca) | granada `#6E162C` | rosé `#C9A3A6` | `A2-bago-solo.png` | `14:3` |
| B1 | Folha-boina | granada `#7E2236` | boina mel `#C29A5B` | creme `#E9DCCB` | `B1-folha-boina.png` | `14:4` |
| B2 | Folha-boina | mel `#DEB77B` (uva branca) | boina `#9E4553` | ameixa `#4A3436` | `B2-folha-boina.png` | `14:5` |
| C1 | Gavinha | granada `#7E2236` | gavinha mel `#C29A5B` | areia `#D8C7B5` | `C1-gavinha.png` | `14:6` |
| C2 | Gavinha | vinho `#9E4553` | quase-preto `#31000C` | sálvia `#B9C2A8` | `C2-gavinha.png` | `14:7` |

Observação: o modelo acrescentou bochechas (A1, B1, B2, C1) e brilho nos olhos. A skill manda entregar como saiu; no redesenho vetorial do escolhido, esses detalhes podem ser mantidos ou removidos.
