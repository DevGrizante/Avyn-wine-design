# Contexto do produto

Síntese do documento de visão *Projeto de aplicativo de vinhos.docx* (fora do repositório) e das confirmações do responsável pelo produto em 2026-11-12. A versão para agentes de design está em [`PRODUCT.md`](../PRODUCT.md).

## Visão
Ecossistema digital do vinho que reúne num só app o que hoje está espalhado por Vivino (comunidade e avaliações), Wine-Searcher (preços), CellarTracker, InVintory e Oeni (adega).

**Posicionamento (provisório, pendente de confirmação):** *"O aplicativo que transforma qualquer pessoa em um especialista em vinho."* O diferencial é uma IA que reconhece o vinho por foto e responde produtor, região, janela de consumo, harmonização e ofertas mais baratas.

## Escopo de lançamento (confirmado)
Revisado em 2026-11-15: o foco do MVP é busca e adega.

1. **Busca de vinhos:** catálogo e comparação de preços ("Buscapé" de vinhos) dentro da busca.
2. **Adega virtual.**
3. **Notificações e avisos por WhatsApp** (tipos a definir; detalhes abaixo).

Visão posterior: análise sensorial guiada, harmonização, aprendizado, compra e venda, comunidade/confrarias, enoturismo, IA sommelier (no app e conversando pelo WhatsApp).

## Canal WhatsApp
Pedido do responsável pelo produto em mensagem de 2026-11-14.

### No MVP: só notificações e avisos
O app envia mensagens ao usuário; o usuário não conversa com o app. Os tipos de aviso ainda estão **a definir**. As ofertas e promoções no estilo Trivago, do pedido original, são candidatas.

### Visão posterior: sommelier conversacional
Fica fora do MVP por ser avançado demais para a primeira versão. O usuário mandaria mensagens e o app responderia:
- dúvidas, por exemplo "Qual vinho tomar com pizza de calabresa?" ou "Por quanto tempo preciso decantar um Brunello 2020?";
- pesquisa sob demanda sobre um vinho específico, com a busca do melhor preço na internet.

**Referência:** Magie, assistente de IA brasileiro que funciona inteiro pelo WhatsApp: o usuário conversa e o assistente executa, sem precisar abrir um app.

**Plano: grátis** (decisão de 2026-11-15). Os alertas de preço por WhatsApp continuam no Premium.

### Implicações para o design (a planejar)
- **MVP:** avatar e nome do perfil no WhatsApp e modelos de mensagem de aviso. Precisam funcionar dentro da interface do WhatsApp, sem os componentes do app.
- **Depois:** tom de voz conversacional do sommelier.

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
- **Grátis:** cadastro, busca de preços limitada, adega virtual, análise sensorial, comunidade, sommelier no WhatsApp (pós-MVP).
- **Premium:** IA Sommelier, alertas de preço (app e WhatsApp), análise avançada da adega, busca global, classificados entre particulares.

## Premissas desta etapa
- Não há fotos, parceiros, lojas ou dados reais. Todo conteúdo nas simulações é **fictício** (vinhos, lojas, preços).
- A estrutura de abas mostrada nas simulações (Catálogo, Buscar, Adega, Perfil) é **placeholder**, não uma decisão de navegação.
