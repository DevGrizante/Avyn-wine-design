# Avyn-wine-design

Identidade visual e Design System iOS do **AVYN**, um ecossistema digital do vinho. O MVP tem foco em busca de vinhos (catálogo e comparação de preços), adega virtual e avisos por WhatsApp.

## Objetivo deste repositório
Fonte oficial de **documentação, decisões e tokens** da marca e do Design System. O Figma é o ambiente visual; tudo o que é decidido lá é registrado aqui. Esta etapa **não** inclui código do app (Flutter) nem backend; as telas existem como protótipo navegável em HTML.

## Status atual

| Fase | Estado |
|---|---|
| 1. Análise do ambiente | ✅ concluída |
| 2. Direção visual (paleta) | ✅ Warm & Friendly Premium aprovada ([ADR 0001](docs/decisions/0001-palette-direction.md)) |
| 3. Identidade (logo, tipografia) | ✅ logo taça-lupa, sem mascote nesta versão, e Playfair Display + DM Sans ([ADR 0004](docs/decisions/0004-typography.md), [ADR 0005](docs/decisions/0005-logo-and-mascot.md), [ADR 0006](docs/decisions/0006-no-mascot.md)) |
| 4. Design System (tokens, componentes, padrões iOS) | ✅ v0.1 montado no repositório |
| 5. Validação e Figma | ⏳ contraste validado por script; falta revisão visual do usuário e levar ao Figma |

## Online (GitHub Pages)
O repositório é publicado no GitHub Pages a partir da raiz da branch `main`:

- Protótipo navegável: <https://devgrizante.github.io/Avyn-wine-design/docs/prototype/>
- Showcase do Design System: <https://devgrizante.github.io/Avyn-wine-design/docs/showcase/>
- Documentação (fundamentos, componentes, padrões): <https://devgrizante.github.io/Avyn-wine-design/docs/foundations/>, <https://devgrizante.github.io/Avyn-wine-design/docs/components/>, <https://devgrizante.github.io/Avyn-wine-design/docs/patterns/>

Cada push na `main` atualiza o site em um ou dois minutos. **Tudo o que está no repositório fica público no site**, inclusive `PRODUCT.md`, `docs/product-context.md` e as ADRs. Antes de subir algo que não deva ser público, ver a seção "GitHub Pages" em `CLAUDE.md`.

## Ver o Design System
O showcase mostra fundamentos, componentes e telas de referência nos modos claro e escuro. Online no link acima ou localmente:

```sh
python -m http.server 8000
# abra http://localhost:8000/docs/showcase/
```

(Servir por HTTP garante que as fontes carreguem; abrir o arquivo direto pode bloquear as fontes em alguns navegadores.)

## Ver o protótipo navegável
Abertura, entrar/criar conta, busca com comparação de preços, escanear rótulo, ofertas por loja e adega em 3D. Online em <https://devgrizante.github.io/Avyn-wine-design/docs/prototype/> ou, com o mesmo servidor acima:

```
http://localhost:8000/docs/prototype/
```

Detalhes em [docs/prototype/README.md](docs/prototype/README.md).

## Estrutura

```
PRODUCT.md                 contexto de produto (para agentes de design)
CHANGELOG.md               histórico de mudanças
CLAUDE.md                  guia do repositório para o Claude Code
tokens/                    fonte da verdade: cor, tipografia, medidas, movimento (W3C DTCG)
docs/
  product-context.md       síntese da visão do produto
  foundations/             cor, contraste, tipografia, layout, movimento, ícones
  components/              componentes do MVP
  patterns/                padrões iOS e fluxos do MVP
  showcase/                showcase em HTML (gerado a partir dos tokens)
  prototype/               protótipo navegável das telas do MVP
  brand/                   logo e explorações de identidade
  color/                   exploração de paleta
  decisions/               registro de decisões (ADR)
  figma-sync.md            mapa Figma ↔ repositório, limitações
assets/
  brand/logo/taca-lupa/    ícone do app e símbolo (claro e escuro)
  brand/mascot/            explorações de mascote (suspenso, histórico)
  fonts/                   Playfair Display e DM Sans (OFL)
tools/
  tokens/                  geração e validação dos tokens
  color/                   gerador das escalas de cor (OKLCH)
  brand/                   geradores de identidade
```

## Tokens

```sh
python tools/tokens/make_primitives.py   # escalas e cores de marca
python tools/tokens/make_semantic.py     # papéis semânticos claro/escuro
python tools/tokens/build.py             # valida contraste e gera o CSS do showcase
```

Detalhes em [tokens/README.md](tokens/README.md).

## Figma
[Avyn Wine Project](https://www.figma.com/design/Szhpv9ZTbYJCWpuhcmfkV0/Avyn-Wine-Project): 3 páginas (`Brand`, `Foundations`, `Components & Patterns`) com as Sections `00`–`06` ([ADR 0002](docs/decisions/0002-figma-file-structure.md)). O Design System v0.1 foi montado primeiro no repositório porque a cota do Figma MCP no plano Starter se esgotou; ver [docs/figma-sync.md](docs/figma-sync.md).

## Próximas etapas
1. Revisão visual do showcase pelo responsável pelo produto.
2. Levar tokens (variáveis), estilos de texto e componentes ao Figma quando a cota voltar.
3. Wordmark/lockup da rota taça-lupa e camadas do ícone para o Icon Composer.
4. Definir os tipos de aviso do WhatsApp e a navegação final (abas).
