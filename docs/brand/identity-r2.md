# Identidade — rodada 2 (skill logo-design)

> **Status (2026-11-12):** conceitos em preto, no **checkpoint** da skill: escolha de direção pendente. Kit completo (cor, lockups, ícones, guia) só depois da escolha.
> **Arquivos:** logos em [`assets/brand/logo/exploration/r2/`](../../assets/brand/logo/exploration/r2/) (quadro `logos-r2.png`); mascotes em [`assets/brand/mascot/exploration/r2/`](../../assets/brand/mascot/exploration/r2/) (quadro `mascotes-r2.png`).
> **Gerador:** [`tools/brand/identity_r2.py`](../../tools/brand/identity_r2.py) (SVG construído à mão em grade 256; grava em `tools/brand/out-r2/`).
> **Processo:** skill [logo-design](https://github.com/kaankiziltug/logo-design-skill): brief, clichês, mapa de palavras, conceitos, construção em preto, `svg_audit.py`, `concept_sheet.py`.

## Brief

- **Resumo:** AVYN é o ecossistema digital do vinho no Brasil (catálogo, busca e comparação de preço, adega, IA sommelier) para quem quer escolher e entender vinho com segurança.
- **Público:** entusiastas de 25 a 65 anos e colecionadores. A marca aparece sobretudo como ícone de app no iOS, em tela e em comunicação digital.
- **Adjetivos:** sofisticado, contemporâneo, acolhedor, confiável, com personalidade. **Evitar:** vinícola antiga, brasão, infantil, e-commerce genérico.
- **Promessa:** encontrar, entender e escolher o vinho certo.
- **Hipótese de tipo de marca:** combinação liderada pelo wordmark. O nome é curto (4 letras) e inédito, e o símbolo compacto é obrigatório para o ícone de app.
- **Precisa funcionar em:** ícone iOS, favicon de 16 px, Light/Dark, uma cor, invertido.
- **Restrições:** famílias de cor dourado, preto, vinho e branco. O mascote é independente do logo.
- **Premissas (corrigir se estiverem erradas):** quem decide é o fundador; o posicionamento continua provisório; não há marca anterior a preservar.

## Clichês da categoria (evitados ou usados com desvio)
Taça frontal, garrafa, cacho de uva no logo, folha de videira, rolha, mancha de vinho, brasão, serifa clássica dourada sobre bordô, fileiras de vinhedo.

## Mapa de palavras (cruzamentos que viraram conceito)
- buscar × taça → **lupa que é taça**
- degustar × movimento → **vinho girando**
- nome (V de vinho) × lágrimas do vinho → **lágrima sob o V**

## Conceitos de logo (todos em preto, auditados)

| | Conceito | Tipo | Ideia em uma frase | Teste | Risco honesto |
|---|---|---|---|---|---|
| **A** (recomendado) | Taça-lupa | Pictórico + wordmark | A lupa cheia de vinho: buscar e degustar num só sinal. | Audit 100/100; lê bem a 16 px | Lupa é sinal comum de busca; a originalidade depende do vinho dentro, que precisa de cor. A versão com pé (`A-taca-lupa-v1-com-pe.svg`) lia como chave e foi descartada. |
| B | Giro | Abstrato + wordmark | O vinho girando na taça: movimento, cor e acolhimento. | Audit 100/100; a onda some a 16 px | A 1ª versão era um sorriso dentro do círculo, perto demais de marcas conhecidas. A onda em S reduziu o risco, mas o contorno ainda é genérico (anel). |
| C | V-lágrima | Wordmark + letterform | Uma lágrima de vinho escorre do V: o nome assinado pelo vinho. | Audit 100/100 (V em 60° exatos) | O V isolado como ícone fica perto do universo Vivino. O wordmark com a lágrima é o ponto forte; o símbolo é o fraco. |

**Wordmark (comum aos três):** caixa alta construída em polígonos (altura 96, hastes de ~18):
- A com ápice reto;
- espaçamento óptico com as diagonais A–V paralelas;
- diagonal do N ajustada para 60° exatos depois do audit.

## Conceitos de mascote (independentes do logo)

| | Conceito | Ideia | Pontos fortes | Riscos |
|---|---|---|---|---|
| **M3** (recomendado) | Bagos-olhos (monolinha) | Dois bagos do cacho viram os olhos | Elegante e leve, combina com "sofisticado"; o cacho continua sendo cacho; folha simples com nervura | O rosto pode dominar o cacho; traço fino pede peso mínimo em tamanho pequeno |
| M2 | Gavinha expressiva | A gavinha muda com a emoção, como uma antena | Sólido, legível a 32 px; dá um "gesto" para animação | Fileira de cima pode parecer chapéu; folha estrelada |
| M1 | Silhueta com rosto vazado | Um só recorte de cacho com o rosto vazado | O mais forte em uma cor e como adesivo | O topo recortado pode lembrar orelhas (urso); perde a contagem de bagos |

**Ajustes feitos depois da 1ª renderização:**
- miolo da silhueta preenchido, porque sobravam triângulos vazados;
- bagos externos de cima rebaixados, para a M1 não lembrar orelhas;
- folhas maiores com recortes mais claros;
- folha em gota com nervura na monolinha.

**Pendência técnica:** os vazados dos mascotes ainda são formas brancas por cima (o audit sinaliza). Na arte final viram furos reais (`evenodd`) para funcionar sobre cor.

## Próximo passo
Escolher uma direção de logo e uma de mascote. Depois disso vem o kit:
- paleta aplicada e versões em uma cor e invertida;
- lockups horizontal e empilhado;
- corte para tamanho pequeno;
- favicon, ícone de app e ícones web;
- quadro de apresentação com mockups;
- guia de uso de uma página;
- expressões do mascote.
