# CLAUDE.md

Guia para o Claude Code neste repositório. Detalhes completos em [`docs/product-context.md`](docs/product-context.md) e [`PRODUCT.md`](PRODUCT.md).

## O produto: AVYN
Ecossistema digital do vinho que reúne num só app o que hoje está espalhado: comunidade e avaliações (Vivino), comparação de preços (Wine-Searcher) e adega (CellarTracker, InVintory, Oeni).

- **Posicionamento (provisório, pendente de confirmação):** *"O aplicativo que transforma qualquer pessoa em um especialista em vinho."* Diferencial: IA que reconhece o vinho por foto e responde produtor, região, janela de consumo, harmonização e ofertas mais baratas.
- **Escopo de lançamento (confirmado):** 1) catálogo de vinhos; 2) busca e comparação de preços ("Buscapé" de vinhos) e busca geral; 3) **canal WhatsApp**.
- **Canal WhatsApp (MVP, pedido de 2026-11-14):** nos dois sentidos. O app envia ofertas e promoções (estilo Trivago); o usuário conversa com um sommelier virtual que responde dúvidas ("Qual vinho com pizza de calabresa?", "Quanto decantar um Brunello 2020?") e pesquisa o melhor preço de um vinho na internet. Referência: **Magie** (assistente de IA que funciona inteiro pelo WhatsApp). Detalhes em `docs/product-context.md`.
- **Visão posterior:** adega virtual, análise sensorial guiada, harmonização, aprendizado, compra e venda, comunidade/confrarias, enoturismo, IA Sommelier.
- **Públicos:** entusiastas 25–65 (primário; insegurança na compra), colecionadores (controle da adega, momento ideal de consumo), compradores em geral (preços muito variados), vinícolas e importadoras (pouca conexão com o consumidor).
- **Monetização (valores a definir):** grátis = busca de preços limitada, adega, análise sensorial, comunidade, sommelier no WhatsApp; premium = IA Sommelier, alertas de preço (app e WhatsApp), análise avançada da adega, busca global, classificados.
- **Mercado:** Brasil · PT-BR · R$. Design **iOS primeiro** (HIG); app em Flutter numa etapa futura.
- Fonte original: `Projeto de aplicativo de vinhos.docx` (fora do repositório).

## Escopo deste repositório
Fonte oficial de **documentação, decisões e tokens** da marca e do Design System iOS. O Figma é o ambiente visual; tudo decidido lá é registrado aqui. **Sem** código Flutter, backend ou telas completas do produto nesta etapa.

Todo conteúdo de simulação (vinhos, lojas, preços) é **fictício** e marcado como tal. As abas mostradas em simulações (Catálogo, Buscar, Adega, Perfil) são placeholder, não decisão de navegação.

## Regras de trabalho
- **Nunca** fazer commit ou push sem pedir.
- Toda documentação em **PT-BR**.
- Toda decisão tomada no Figma é registrada no repo: `docs/`, ADRs em `docs/decisions/`, `CHANGELOG.md` e `docs/figma-sync.md`.
- O trabalho segue fases com aprovação (gates):
  - **G1:** direção de paleta (recomendada: Warm & Friendly Premium, ADR 0001 *proposto*), direções de mascote, rotas de monograma.
  - **G2:** mascote escolhido, monograma final, serifa editorial (Newsreader / Source Serif 4 / Gloock).
  - Depois: tokens (W3C DTCG JSON em `tokens/`), componentes, padrões iOS, showcase, validação.
- Não avançar de fase sem aprovação explícita.

## Identidade visual
- Cores restritas às famílias **dourado/mel, preto, vinho/granada e branco/creme**.
- Nada infantil. Estilo de referência: showcase da skill logo-design (uma ideia inteligente por marca, formas fortes, app icons coloridos).
- O mascote é identidade **do produto**: aparece só dentro da experiência (onboarding, conquistas, estados vazios, IA) e nunca acompanha nem substitui o logotipo.
- Estado atual e candidatos: ver `docs/brand/` (rodada mais recente em `docs/brand/identity-r3.md`).

## Figma
Arquivo [Avyn Wine Project](https://www.figma.com/design/Szhpv9ZTbYJCWpuhcmfkV0/Avyn-Wine-Project), plano **Starter**:
- Máximo de 3 páginas: `Brand`, `Foundations`, `Components & Patterns`, com Sections `00`–`06` (ADR 0002).
- Cota mensal de chamadas MCP baixa (~20/mês). Economizar: agrupar construção e `node.screenshot()` numa única chamada `use_figma`; evitar leituras exploratórias. `generate_image` usa créditos de IA e não conta na cota.
- SF Pro não renderiza no servidor do Figma: **Inter** é o substituto, via variável `font/family/ui` (ADR 0003).
- O kit iOS/iPadOS 27 só importa após aceitar o EULA da Apple.

## Estrutura
```
PRODUCT.md            contexto de produto (para agentes de design)
CHANGELOG.md          histórico de mudanças
docs/
  product-context.md  síntese da visão do produto
  figma-sync.md       mapa Figma ↔ docs, checklist de sincronização, limitações
  brand/              identidade (logo, símbolo, mascote)
  color/              paleta
  decisions/          ADRs
tools/                geradores (escalas de cor OKLCH, explorações de identidade)
assets/               exportações e explorações de marca
```
