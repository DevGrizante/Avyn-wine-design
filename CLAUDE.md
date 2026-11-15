# CLAUDE.md

Guia para o Claude Code neste repositório. Detalhes completos em [`docs/product-context.md`](docs/product-context.md) e [`PRODUCT.md`](PRODUCT.md).

## O produto: AVYN
Ecossistema digital do vinho que reúne num só app o que hoje está espalhado: comunidade e avaliações (Vivino), comparação de preços (Wine-Searcher) e adega (CellarTracker, InVintory, Oeni).

- **Posicionamento (provisório, pendente de confirmação):** *"O aplicativo que transforma qualquer pessoa em um especialista em vinho."* Diferencial: IA que reconhece o vinho por foto e responde produtor, região, janela de consumo, harmonização e ofertas mais baratas.
- **Escopo de lançamento (confirmado, revisado em 2026-11-15):** foco em busca e adega. 1) busca de vinhos (catálogo e comparação de preços, "Buscapé" de vinhos); 2) adega virtual; 3) notificações e avisos por WhatsApp (tipos a definir).
- **WhatsApp:** no MVP, **só avisos** do app para o usuário. O sommelier conversacional (responder dúvidas como "Qual vinho com pizza de calabresa?" e buscar o melhor preço de um vinho) fica para depois, por ser avançado demais para o MVP; quando vier, será grátis. Referência: **Magie** (assistente de IA que funciona inteiro pelo WhatsApp). Detalhes em `docs/product-context.md`.
- **Visão posterior:** análise sensorial guiada, harmonização, aprendizado, compra e venda, comunidade/confrarias, enoturismo, IA Sommelier (no app e pelo WhatsApp).
- **Públicos:** entusiastas 25–65 (primário; insegurança na compra), colecionadores (controle da adega, momento ideal de consumo), compradores em geral (preços muito variados), vinícolas e importadoras (pouca conexão com o consumidor).
- **Monetização (valores a definir):** grátis = busca de preços limitada, adega, análise sensorial, comunidade, sommelier no WhatsApp (pós-MVP); premium = IA Sommelier, alertas de preço (app e WhatsApp), análise avançada da adega, busca global, classificados.
- **Mercado:** Brasil · PT-BR · R$. Design **iOS primeiro** (HIG); app em Flutter numa etapa futura.
- Fonte original: `Projeto de aplicativo de vinhos.docx` (fora do repositório).

## Escopo deste repositório
Fonte oficial de **documentação, decisões e tokens** da marca e do Design System iOS. O Figma é o ambiente visual; tudo decidido lá é registrado aqui. **Sem** código Flutter, backend ou telas completas do produto nesta etapa.

Todo conteúdo de simulação (vinhos, lojas, preços) é **fictício** e marcado como tal. As abas mostradas em simulações (Catálogo, Buscar, Adega, Perfil) são placeholder, não decisão de navegação.

## Regras de trabalho
- **Nunca** fazer commit ou push sem pedir.
- Toda documentação em **PT-BR**.
- Toda decisão tomada no Figma é registrada no repo: `docs/`, ADRs em `docs/decisions/`, `CHANGELOG.md` e `docs/figma-sync.md`.
- O trabalho segue fases com aprovação (gates). G1 e G2 estão fechados (2026-11-15); o Design System v0.1 está montado no repositório e aguarda revisão visual do usuário.
- Não avançar de fase sem aprovação explícita.

## Design System
- **Fonte da verdade:** `tokens/` (W3C DTCG). Nunca edite `docs/showcase/tokens.css` nem `docs/foundations/contrast.md` à mão: rode `python tools/tokens/make_primitives.py`, `make_semantic.py` e `build.py` (o `build.py` falha se algum par de contraste cair abaixo do AA).
- **Na interface, só papéis semânticos** (`tint.default`, `label.secondary`…), nunca primitivas.
- **Cor:** Warm & Friendly Premium (ADR 0001). Um tint só (vinho). Dourado não é texto no claro (`accent.ink` para texto). No escuro, ação `#B4475B` e texto interativo `#D38686`.
- **Tipografia:** Playfair Display (títulos, nomes de vinhos, destaques; mínimo 18 pt) + DM Sans (textos, menus, botões, informações, preços). SF Pro só no que o iOS desenha (ADR 0004). Dynamic Type obrigatório.
- **Controles são os do iOS.** A marca entra por cor, tipografia, o símbolo taça-lupa e um componente próprio: a janela de consumo.
- Docs: `docs/foundations/`, `docs/components/`, `docs/patterns/`. Showcase: `docs/showcase/index.html` (servir com `python -m http.server`).

## Identidade visual
- Cores restritas às famílias **dourado/mel, preto, vinho/granada e branco/creme**. Nada infantil.
- **Logo:** taça-lupa (`assets/brand/logo/taca-lupa/`, ADR 0005).
- **Sem mascote nesta versão** (ADR 0006). Nos estados vazios entra o símbolo sem fundo (`simbolo-claro.svg` / `simbolo-escuro.svg`). A proposta de mascote taça-lupa fica como histórico em `assets/brand/mascot/taca-lupa/` e `docs/brand/mascot.md`; não usar.
- Pendentes: wordmark/lockup da rota taça-lupa e camadas do ícone para o Icon Composer.

## Figma
Arquivo [Avyn Wine Project](https://www.figma.com/design/Szhpv9ZTbYJCWpuhcmfkV0/Avyn-Wine-Project), plano **Starter**:
- Máximo de 3 páginas: `Brand`, `Foundations`, `Components & Patterns`, com Sections `00`–`06` (ADR 0002).
- Cota mensal de chamadas MCP baixa (~20/mês). Economizar: agrupar construção e `node.screenshot()` numa única chamada `use_figma`; evitar leituras exploratórias. `generate_image` usa créditos de IA e não conta na cota.
- Fontes do Figma: Playfair Display e DM Sans (Google Fonts, renderizam no servidor). O Inter do ADR 0003 não é mais usado.
- O Design System v0.1 ainda não está no Figma; a ordem para levá-lo está em `docs/figma-sync.md`.
- O kit iOS/iPadOS 27 só importa após aceitar o EULA da Apple.

## Estrutura
```
PRODUCT.md            contexto de produto (para agentes de design)
CHANGELOG.md          histórico de mudanças
tokens/               fonte da verdade do Design System (W3C DTCG)
docs/
  product-context.md  síntese da visão do produto
  foundations/        cor, contraste (gerado), tipografia, layout, movimento, ícones
  components/         componentes do MVP
  patterns/           padrões iOS e fluxos
  showcase/           showcase HTML (tokens.css gerado)
  figma-sync.md       mapa Figma ↔ docs, checklist de sincronização, limitações
  brand/              logo e explorações (mascote suspenso)
  color/              exploração de paleta
  decisions/          ADRs
tools/                tokens/ (geração e contraste), color/ (escalas OKLCH), brand/ (identidade)
assets/               fonts/ (OFL), brand/ (logo, explorações)
```
