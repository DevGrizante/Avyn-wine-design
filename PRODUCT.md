# Product

<!-- impeccable:product-schema 1 -->

## Platform

ios

## Stack

Flutter (implementação futura, fora do escopo desta etapa). O Design System é projetado iOS-first segundo as Apple Human Interface Guidelines; Android será uma adaptação posterior. Tokens em W3C DTCG JSON para conversão futura (ex.: Style Dictionary → Dart).

## Users

- **Primário — Entusiastas de vinho (25–65 anos):** compram vinho, frequentam restaurantes, fazem cursos e querem aprender. Dores: não sabem identificar aromas e sabores, compram sem segurança, dependem de opiniões isoladas e têm dificuldade de evoluir no conhecimento.
- **Secundário — Colecionadores:** têm adega doméstica e vinhos premium, se interessam por envelhecimento e confrarias (online e presenciais). Dores: não controlam a adega, esquecem vinhos guardados, não sabem o melhor momento de consumo e perdem o histórico das garrafas.
- **Terciário — Vinícolas e importadoras:** querem vender experiências (enoturismo), divulgar produtos e captar consumidores. Dor: pouca conexão direta com o consumidor.
- **Compradores (transversal):** os preços variam muito, eles não sabem onde está mais barato e perdem oportunidades.

## Product Purpose

Ecossistema digital do vinho que reúne, num único app, o que hoje está espalhado por vários (Vivino, Wine-Searcher, CellarTracker, InVintory, Oeni). Funcionalidades iniciais confirmadas: **1. Catálogo de vinhos** e **2. Busca e comparação de preços ("Buscapé" de vinhos) e busca geral**. Visão posterior: adega virtual, análise sensorial guiada (com registro técnico e fotográfico), harmonização, aprendizado, compra/venda de garrafas, comunidade e confrarias, experiências em vinícolas e IA sommelier.

## Positioning

**Provisório (pendente de confirmação):** "O aplicativo que transforma qualquer pessoa em um especialista em vinho." O diferencial é uma IA que reconhece o vinho por foto e responde com produtor, região, janela de consumo, harmonização e ofertas mais baratas, além de adicioná-lo à adega do usuário.

## Operating Context

- Mercado de lançamento: **Brasil**, idioma **PT-BR**, moeda **R$ (BRL)**.
- Uso típico: no supermercado ou na loja (comparar preço, decidir a compra), no restaurante, em casa (adega, registro de degustação) e em eventos/confrarias.
- Monetização híbrida (valores a definir). Grátis: cadastro, busca de preços limitada, adega virtual, análise sensorial e comunidade. Premium: IA Sommelier, alertas de preço (app e WhatsApp), análise avançada da adega, busca global de preços e classificados entre particulares.

## Capabilities and Constraints

- Esta etapa: identidade visual + Design System iOS no Figma, documentados no repositório. Sem código Flutter, sem backend, sem telas completas do produto.
- Indefinidos (não inventar): preços do Premium, estrutura final de navegação (abas), parceiros/lojas reais, conteúdo editorial.

## Brand Commitments

- Nome: **AVYN**. Segmento: Wine & Lifestyle / Digital Product.
- Atributos obrigatórios: sofisticação, exclusividade, elegância, modernidade, confiança, personalidade, acolhimento. Premium, mas não sisudo ou tradicional; deve parecer uma empresa digital premium contemporânea.
- Famílias de cor obrigatórias: dourado, preto, vinho/bordô, branco. A identidade precisa ser reconhecível em Light e Dark Mode.
- Mascote: uva original, fofa, minimalista e carismática, independente do logotipo e sem dominar a identidade.
- Evitar: estética de vinícola antiga, brasões, excesso de classicismo, visual corporativo, gradientes genéricos, aparência infantil, interfaces genéricas de IA e cara de e-commerce genérico.

## Evidence on Hand

- Documento de visão: `Projeto de aplicativo de vinhos.docx` (fora do repositório; síntese em `docs/product-context.md`).
- Não há fotos de produto, depoimentos, dados de uso, parceiros ou lojas reais. Simulações usam conteúdo fictício marcado como tal.

## Product Principles

1. **Confiança antes de persuasão:** preço, avaliação e informação técnica têm que ser legíveis e verificáveis; a estética nunca esconde o dado.
2. **Do iniciante ao colecionador:** a mesma interface acolhe quem está começando sem infantilizar quem já é especialista.
3. **Um ecossistema, uma linguagem:** catálogo, preço, adega e comunidade compartilham componentes e tom; o produto pode crescer sem mudar de cara.
4. **Nativo primeiro:** convenções do iOS acima de invenção; a marca vive em cor, tipografia, conteúdo e microinterações.

## Accessibility & Inclusion

- Mínimo WCAG 2.2 AA para contraste de texto (4,5:1; 3:1 para texto grande e elementos de UI).
- Dynamic Type obrigatório (público até 65 anos), alvos de toque ≥ 44 × 44 pt, suporte a VoiceOver, Reduce Motion e Increase Contrast.
