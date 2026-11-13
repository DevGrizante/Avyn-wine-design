# Mascote: redesenho pela estrutura de cacho

> **Atualização (2026-11-12):** os arquivos de `structure-tests/` e `candidates-v2/` foram apagados a pedido do usuário. O trabalho continua na [rodada 2](identity-r2.md). Este documento fica como registro do método e do que se aprendeu. Os geradores em `tools/mascot/` recriam os arquivos se for preciso.

> **Status (2026-11-12):** Etapas 1 e 2 concluídas (estruturas + teste de silhueta). **Aguardando escolha da estrutura** antes de personalidade, expressões e cor.
> **Arquivos:** [`assets/brand/mascot/structure-tests/`](../../assets/brand/mascot/structure-tests/) (SVG com separação, SVG só contorno, PNG 800 px, prancha `evaluation-sheet.png`).
> **Gerador:** [`tools/mascot/structures.py`](../../tools/mascot/structures.py) (uma geometria → SVG + PNG; `python tools/mascot/structures.py`).

## Por que recomeçar
Os 6 candidatos anteriores (A1–C2, em `assets/brand/mascot/exploration/`) estão **descartados como referência visual**. Todos eram uma esfera única com rosto: liam como maçã, pêssego, pera ou cereja, e a "uva" só aparecia pela cor. O briefing de redesenho inverte a ordem. Primeiro vem a estrutura de cacho validada sem rosto e sem cor, e só depois a personalidade.

Em relação à skill IP as Logo, o briefing relaxa duas regras (a silhueta contínua de 4–7 formas e a entrega sem filtragem). A identidade AVYN e o briefing têm prioridade.

## Método do teste
- Silhuetas **construídas em vetor** (círculos, curvas e polígono da folha), e não geradas por IA. O teste é estrutural, então é preciso controlar exatamente quantos bagos há, em que fileira, quanto se sobrepõem e onde a folha encaixa. O gerador de imagem tende a fundir tudo de volta numa fruta só.
- Preto chapado `#141414` sobre neutro `#E7E6E3`, sem rosto, cor, textura ou sombra.
- Três leituras por estrutura:
  1. **com separação:** anel de 5 u (em 400) entre bagos sobrepostos;
  2. **só contorno:** sem nenhuma separação interna, para ver se o recorte externo sozinho diz "cacho";
  3. **redução:** 64, 32 e 16 px, mais ampliação ×4 por vizinho mais próximo para inspecionar os pixels.

## Etapa 1 — As três estruturas

| | A · Compacta arredondada | B · Orgânica irregular | C · Geométrica estilizada |
|---|---|---|---|
| Bagos | 10, fileiras 4–3–2–1, raio 36→30 de cima para baixo | 10, posicionados à mão, raios 25–37 | 10, fileiras 4–3–2–1, raio único 30 |
| Organização | Simétrica, sobreposição leve com anel de separação | Ombro à esquerda, ponta deslocada para a direita | Malha triangular exata (passo 66, bagos tangentes, sem sobreposição) |
| Folha | 3 lóbulos arredondados, presa por pecíolo à haste, sai para a direita como bandeirinha | 5 lóbulos, maior, sai para o lado oposto ao ombro (direita) | Losango arredondado com nervura vazada, sobe a 32° a partir de uma haste em ângulo reto |
| Rosto previsto | Nos 2–3 bagos centrais de cima | Na região mais larga (2º–3º bagos da linha alta) | Olhos nos bagos centrais, boca mínima |
| Caráter | Amigável, icônico, estável | Natural, vivo, mais "personagem" | Mínimo, gráfico, quase monograma |

## Etapa 2 — Iterações do teste

| Rodada | O que mudou | Resultado |
|---|---|---|
| 1 | Folhas de A e B como união de círculos, em cima da haste; folha da C em losango alinhado à haste | **Reprovado.** Cachos OK nas três, mas as folhas de A e B viraram uma "nuvem" no topo que lê como **topete/cabelo** (proibido). O losango da C, alinhado à haste horizontal, lia como **seta**. |
| 2 | Folha redesenhada como perfil palmado (lóbulos gaussianos + seio peciolar em coração) e deslocada para a lateral por um pecíolo; folha da C inclinada 32° com nervura | Folhas leem como folha e não como cabelo. Mas A e B ficaram pontudas (pareciam **estrela/flor**) e sumiam a 32 px. |
| 3 | Folhas maiores (A: R 40; B: R 46) e lóbulos mais cheios (base 0,7 / 0,68) | **Aprovado nas três.** |

## Avaliação final (rodada 3)

| Critério | A | B | C |
|---|---|---|---|
| Lê como cacho sem rosto e sem cor | Sim, imediato | Sim | Sim, imediato |
| Só o contorno já diz "cacho" | Sim (borda recortada em bagos, triângulo invertido) | Sim, mas menos triangular | Sim, o mais nítido |
| Bagos separados e contáveis | Sim | Sim | Sim (tangentes) |
| Mais largo em cima, afunila embaixo | Sim | Sim, com ponta deslocada | Sim |
| Folha lê como folha (não cabelo, chapéu ou topete) | Sim, lateral | Sim, lateral e maior | Sim; leve risco de "bandeira" |
| Não lê como maçã, pêssego, pera ou cereja | Sim | Sim | Sim |
| 32 px | Cacho + folha visíveis | Cacho visível; folha vira mancha | Cacho visível; folha mínima |
| 16 px | Triângulo escuro; bagos se fundem | Idem | Idem |

**16 px está abaixo do requisito** (o briefing pede 32 px). Nesse tamanho, as três viram um triângulo; para isso o símbolo AVYN serve melhor que o mascote.

### Leitura de cada uma
- **A — Compacta:** a mais reconhecível e a mais estável em tamanho pequeno. A fileira de cima, mais larga e com bagos maiores, dá uma "testa" natural para o rosto sem quebrar o cacho. Risco: ficar genérica, perto do emoji de uva. A personalidade vai precisar vir da folha e da expressão.
- **B — Orgânica:** a que mais parece personagem. O ombro e a ponta deslocada sugerem postura e movimento, o que ajuda nas expressões (inclinar, "olhar" para o lado). Risco: com rosto, a assimetria pode virar bagunça; o contorno é o menos triangular dos três.
- **C — Geométrica:** a mais limpa e a mais nítida só pelo contorno. Risco duplo: parece **ícone** mais do que personagem (pouca massa para expressão) e chega perto das rotas de símbolo ii/iii, que também usam bago. Isso conflita com a regra de não misturar mascote e logo.

### Recomendação
**A como estrutura principal, emprestando de B o ombro sutil** (um bago deslocado na fileira de cima ou de baixo), para ganhar postura sem perder a leitura imediata. **C não é recomendada como mascote**; serve melhor como ícone utilitário (p. ex. categoria "uvas/castas"), longe do logo.

## Candidatos de personagem v2 (a pedido, antes da escolha da estrutura)

O usuário pediu para ver mascotes completos com a ideia do cacho. Por isso, rosto e cor provisória foram aplicados sobre as estruturas validadas em duas frentes. As cores ainda são provisórias (Etapa 5): uva `#5E1F3D` com brilho `#8A4363`, folha `#6F8A4A`, haste `#4F6436`, fundo `#F4EDE3`.

### Vetoriais (geometria garantida)
- Gerador: [`tools/mascot/mascots.py`](../../tools/mascot/mascots.py). Saída em [`assets/brand/mascot/candidates-v2/`](../../assets/brand/mascot/candidates-v2/): `{A,B,AB,C}-{6 expressões}.svg`, PNGs neutros de 800 px, `candidates-sheet.png` e `AB-expressions.png`.
- **AB** é a estrutura nova recomendada: as fileiras de A com o ombro de B. O bago superior esquerdo fica mais baixo e menor, e a ponta se desloca para a direita.
- Rosto: olhos nos dois bagos centrais de cima, boca no bago central da segunda fileira. Os bagos do rosto não recebem o brilho, porque ele competia com os olhos e lia como um terceiro olho.
- Expressões: neutral, happy, curious, thinking (IA), sleepy (estado vazio), concerned (erro).
- **Teste desfocado:** em todos, o rosto some e o cacho continua. Isso atende ao critério "reconhecer o cacho antes do rosto".

### IA (Figma `generate_image`, `gpt-image-2.5-flare`, 1024 px)
O prompt descreve a anatomia do cacho: contagem por fileira, separação, folha lateral e rosto distribuído pelos bagos. A linha `Constraints:` proíbe esfera única, maçã, cereja, ameixa, pêssego e pera, folha como cabelo, chapéu, braços e pernas. Os arquivos estão em `candidates-v2/ai/`, com a prancha comparativa em `ai-sheet.png`.

| # | Figma | Leitura | Pontos fortes | Riscos |
|---|---|---|---|---|
| IA1 compacta flat | `19:2` | Cacho imediato | Quase igual ao vetor A; flat, fácil de vetorizar | Rosto pequeno, pouca personalidade |
| IA2 orgânica | `19:3` | Cacho imediato | Rosto maior e expressivo, com sobrancelhas; folha de videira inconfundível | Folha serrilhada, detalhada demais (some a 32 px); os bagos de baixo formam um "rabo" em gancho |
| IA3 volume | `19:4` | Cacho imediato | A com mais personalidade; gavinha e brilho dourado como detalhe | Sombreado e variação de cor dificultam o vetor e a leitura a 32 px; perto do "uva fofa" genérica |

## Próximo passo (só após a escolha)
Etapa 3: confirmar a estrutura. Etapa 4: personalidade e expressões. Etapa 5: cor e acabamento (bordô, roxo-uva profundo, verde-folha natural, dourado só como detalhe).
