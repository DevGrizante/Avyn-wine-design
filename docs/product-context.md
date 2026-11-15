# Contexto do produto

Síntese do documento de visão *Projeto de aplicativo de vinhos.docx* (fora do repositório) e das confirmações do responsável pelo produto em 2026-11-12. A versão para agentes de design está em [`PRODUCT.md`](../PRODUCT.md).

## Visão
Ecossistema digital do vinho que reúne num só app o que hoje está espalhado por Vivino (comunidade e avaliações), Wine-Searcher (preços), CellarTracker, InVintory e Oeni (adega).

**Posicionamento (provisório, pendente de confirmação):** *"O aplicativo que transforma qualquer pessoa em um especialista em vinho."* O diferencial é uma IA que reconhece o vinho por foto e responde produtor, região, janela de consumo, harmonização e ofertas mais baratas.

## Escopo de lançamento (confirmado)
1. **Catálogo de vinhos.**
2. **Busca e comparação de preços ("Buscapé" de vinhos) e busca geral.**
3. **Canal WhatsApp:** ofertas enviadas ao usuário e sommelier virtual que responde pelo WhatsApp (detalhes abaixo).

Visão posterior: adega virtual, análise sensorial guiada, harmonização, aprendizado, compra e venda, comunidade/confrarias, enoturismo, IA sommelier.

## Canal WhatsApp (MVP)
Pedido do responsável pelo produto em mensagem de 2026-11-14; confirmado como parte do MVP. O WhatsApp funciona nos dois sentidos:

- **App → usuário (ativo):** ofertas e promoções de vinho e de tudo relacionado, no estilo Trivago.
- **Usuário → app (receptivo):** um sommelier virtual que responde dúvidas por mensagem. Exemplos:
  - "Qual vinho tomar com pizza de calabresa?"
  - "Por quanto tempo preciso decantar um Brunello 2020?"
- **Pesquisa sob demanda:** o usuário pede informações sobre um vinho específico e o sommelier busca o melhor preço na internet.

**Referência:** Magie, assistente de IA brasileiro que funciona inteiro pelo WhatsApp: o usuário conversa e o assistente executa, sem precisar abrir um app.

**Plano: grátis** (decisão de 2026-11-15). Os alertas de preço por WhatsApp continuam no Premium.

**Implicações para o design (a planejar):** avatar e nome do perfil no WhatsApp, tom de voz conversacional do sommelier e modelos de mensagem de oferta. Precisam funcionar dentro da interface do WhatsApp, sem os componentes do app.

## Públicos
| Público | Quem | Dores |
|---|---|---|
| Entusiastas (primário, 25–65) | Compram vinho, frequentam restaurantes, fazem cursos | Insegurança na compra, dificuldade com aromas/sabores, opiniões isoladas |
| Colecionadores | Adega doméstica, vinhos premium, confrarias | Controle da adega, momento ideal de consumo, histórico das garrafas |
| Compradores (transversal) | Qualquer pessoa comprando | Preços muito variados, não sabem onde está mais barato |
| Vinícolas e importadoras | Enoturismo, divulgação | Pouca conexão direta com o consumidor |

## Mercado
Brasil · PT-BR · R$. Plataforma de design: **iOS primeiro** (HIG); o app será implementado em Flutter numa etapa futura.

## Monetização (valores a definir)
- **Grátis:** cadastro, busca de preços limitada, adega virtual, análise sensorial, comunidade, sommelier no WhatsApp.
- **Premium:** IA Sommelier, alertas de preço (app e WhatsApp), análise avançada da adega, busca global, classificados entre particulares.
## Premissas desta etapa
- Não há fotos, parceiros, lojas ou dados reais. Todo conteúdo nas simulações é **fictício** (vinhos, lojas, preços).
- A estrutura de abas mostrada nas simulações (Catálogo, Buscar, Adega, Perfil) é **placeholder**, não uma decisão de navegação.
