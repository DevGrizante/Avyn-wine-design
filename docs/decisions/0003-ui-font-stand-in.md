# ADR 0003 — Inter como fonte substituta do SF Pro no Figma

- **Status:** Aceito (aprovado pelo usuário em 2026-11-12)

## Contexto
O iOS usa a fonte do sistema (SF Pro / SF Compact), e a HIG pede que ela carregue a UI. O SF Pro aparece em `listAvailableFontsAsync()` porque está instalado localmente na máquina do usuário.

## Problema
Um teste de renderização mostrou que o **renderizador do servidor Figma não tem SF Pro nem SF Pro Rounded**: texto nessas fontes some em screenshots, exportações e para qualquer pessoa sem a fonte instalada. Isso impediria validar o trabalho visualmente e exportar páginas para o repositório.

## Alternativas consideradas
1. **SF Pro nos estilos:** máxima fidelidade só na máquina do usuário; sem validação visual e sem exportações com texto.
2. **Inter como substituta:** métricas próximas do SF, renderiza em qualquer lugar, open source (OFL).

## Decisão
No Figma, os estilos de texto de UI usam **Inter** (`Regular`, `Medium`, `Semi Bold`, `Bold`). A família fica numa variável de string (`font/family/ui`) ligada aos estilos, então trocar para `SF Pro` é uma edição só.

## Consequências
- **Código/tokens:** a família de UI em `tokens/typography.json` é a fonte do sistema iOS (SF Pro). Inter é só a substituta de design.
- O Inter é um pouco mais largo que o SF Pro em corpo pequeno. Os layouts ganham uma pequena folga, e títulos que quebram no Inter podem caber no SF (nunca o contrário).
- A serifa editorial (a decidir no gate G2) precisa estar no Google Fonts para renderizar no Figma e ser usada no Flutter.
