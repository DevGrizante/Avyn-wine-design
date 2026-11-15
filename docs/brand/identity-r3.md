# Identidade — rodada 3 (logo-design skill, nível "showcase")

> **Status (2026-11-15):** checkpoint fechado. O usuário escolheu o ícone taça-lupa (PR #1) e pediu um mascote derivado dele; nenhum candidato desta rodada foi adotado. Ver [ADR 0005](../decisions/0005-logo-and-mascot.md), [logo.md](logo.md) e [mascot.md](mascot.md). O que segue é histórico.
> **Ver primeiro:** [`app-icons-grid.png`](../../assets/brand/logo/exploration/r3/app-icons-grid.png) (todas as ideias como ícone de app, em cor) · [`logos-r3.png`](../../assets/brand/logo/exploration/r3/logos-r3.png) · [`mascotes-r3.png`](../../assets/brand/mascot/exploration/r3/mascotes-r3.png) · prévia em mockups no [`board/`](../../assets/brand/logo/exploration/r3/board/) (abre também como `board.html`): Decanter-A em `slide-03`/`04`, a-giro em `05`/`06`, Lupa-taça em `07`/`08`, comparação e recomendação em `09`/`10`.
> **Gerador:** [`tools/brand/identity_r3.py`](../../tools/brand/identity_r3.py) (uma geometria → SVG preto, colorido e tile de app; grava em `tools/brand/out-r3/`).

## O que mudou em relação às rodadas 1–2
- O pedido passou a ser chegar perto dos exemplos do repositório da skill: uma ideia esperta por marca, formas pesadas, cor no ícone e wordmark próprio.
- **Mantido:**
  - só as famílias dourado, preto, vinho e branco (vinho `#7E2236`, `#4A0F1E`, `#B4475B`; mel `#C29A5B`, `#E3C68C`; quase-preto `#16110F`; creme `#F8F3EC`);
  - nada infantil.
- **Liberado:**
  - mascote fora do cacho;
  - mascote podendo conversar com o logo;
  - mais ideias.

## Brief
- **Adjetivos:** sofisticado, esperto, acolhedor, contemporâneo.
- **Clichês evitados:** taça frontal, garrafa genérica, cacho no logo, folha de videira, rolha literal, brasão, serifa dourada.
- **Wordmark comum:** `avyn` em minúsculas geométricas arredondadas, construído em traço de 26 com altura x de 100 (a de um andar, y geométrico, n com arco).

## Longlist (uma frase cada) e o que foi feito

| Conceito | Ideia | Resultado |
|---|---|---|
| **Decanter-A** | O A é um decanter: o vazio é o miolo, o vinho a travessa e o fundo côncavo abre as pernas | **Recomendado** |
| a-giro | O a do nome guarda vinho girando | Construído |
| Lupa-taça | Lupa cheia de vinho: buscar e degustar | Construído |
| Garrafa-etiqueta | A garrafa é a etiqueta de preço com ilhós e barbante | Construído |
| y-taça | O y do wordmark vira taça com pé | Construído |
| Brinde-A | Duas taças brindando formam o A; o vinho nivelado é a travessa | **Descartado:** lia como "W" com pernas |
| Giro / V-lágrima / Taça-lupa com pé | Ideias das rodadas 1–2 | Superadas |
| **Bigode de uva** (mascote) | Um bago com bigode de uvas: o sommelier que sabe das coisas | **Recomendado** |
| Taça sorriso (mascote) | A superfície do vinho é o sorriso da taça | Construído |
| Rolha provada (mascote) | Rolha com o fundo manchado de vinho, olhos fechados saboreando | Construído |
| Cacho (mascote) | O cacho, adulto: compacto, olhos fechados, folha dourada | Construído (continuidade) |

## Testes e ajustes
- **Audit (`svg_audit.py`):** símbolos com nota de 96 a 99 e mascotes de 90 a 98. Os avisos restantes são vazados brancos deliberados: a faixa do rótulo da garrafa e o bigode e o rosto em preto. Na arte final viram furos reais.
- **Correções feitas depois da renderização:**
  - Decanter-A: o miolo preenchido virou furo e o vinho virou faixa interna, e só aí passou a ler como A;
  - a-giro: refeito em formas preenchidas, porque o quadro de conceitos cortava os traços;
  - garrafa: reduzida para o barbante caber;
  - y-taça: reposicionado;
  - Cacho: subido 8 px (vazava da área);
  - Bigode de uva: duas rodadas. Primeiro parecia colar de contas, depois barba. Os pontos que resolveram foram o centro grosso, as pontas finas enroladas para cima e a gavinha no lugar da folha, porque com folha lia como maçã.
- **Leitura a 16 px:** Decanter-A, a-giro e Lupa-taça seguram; a garrafa e o y-taça viram mancha. Os mascotes servem a partir de 32 px.

## Riscos honestos
- **Decanter-A:** o gargalo longo pode lembrar um frasco de laboratório se a cor não deixar claro que é vinho.
- **a-giro:** a de um andar dentro de anel é uma forma comum em apps; a onda de vinho é o que diferencia.
- **Lupa-taça:** a lupa é o sinal genérico de busca.
- **Bigode de uva:** em tamanho pequeno o rosto lê como ameixa; o bigode precisa de pelo menos 48 px.
- **Rolha:** objeto clichê; a mancha é o desvio.
- **Board:** o cartão de visita usa o nome fictício do modelo da skill.

## Próximo passo
Escolher um logo e um mascote. O kit traz:
- paleta aplicada;
- versões em uma cor e invertida;
- logos horizontal e empilhado;
- versão simplificada para tamanho pequeno;
- favicon, ícone de app e ícones web;
- quadro final;
- guia de uso;
- expressões do mascote.
