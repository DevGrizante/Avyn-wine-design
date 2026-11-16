# Protótipo navegável

Protótipo em HTML para validar os fluxos do MVP antes do app em Flutter. Não é código do app: serve para olhar, tocar e decidir. Todo o conteúdo (vinhos, produtores, lojas, preços, pessoa do perfil) é **fictício**.

## Como abrir

Online: <https://devgrizante.github.io/Avyn-wine-design/docs/prototype/> (GitHub Pages, atualizado a cada push na `main`).

Localmente, na raiz do repositório:

```sh
python -m http.server 8000
# abra http://localhost:8000/docs/prototype/
```

No computador, o aparelho aparece ao centro com atalhos para cada fluxo. No celular, o protótipo ocupa a tela inteira. A adega em 3D usa o three.js (r128) carregado do cdnjs, então precisa de internet; sem WebGL, a adega abre em lista.

## Fluxos

| Fluxo | O que mostra |
|---|---|
| Abertura | O símbolo com o vinho subindo na lente, depois as boas-vindas |
| Entrar ou criar conta | Google ou conta do app (e-mail e senha), com o Google também na tela Entrar e link para trocar entre as duas. Campos com rótulo em cima e erro em cada campo; regra da senha (8 caracteres) confere enquanto digita. No cadastro, avisos no WhatsApp começam desligados e, ao ligar, pedem o celular com DDD. Em Entrar, "Esqueci minha senha" envia um link por e-mail |
| Buscar | Campo com atalho para a câmera, card de escanear, preços que caíram, buscas recentes; resultados com filtros e menor preço primeiro |
| Vinho | Garrafa, nota, lojas ordenadas por preço (frete visível), alerta de preço (Premium), janela de consumo e "Adicionar à adega" |
| Escanear rótulo | Câmera simulada que foca e reconhece o rótulo; folha com o vinho encontrado, menor preço e ações; modo código de barras |
| Adicionar sem escanear | Botão **Digitar** ao lado do disparador, ou **Não é este vinho** quando o scanner erra (mostra vinhos parecidos com o que foi lido e a opção de escanear de novo). Busca no catálogo pelo nome; se o vinho não estiver lá, **Cadastrar vinho** com nome (obrigatório), produtor, safra, região e tipo. O vinho cadastrado vai para a adega sem preços, nota nem janela de consumo |
| Adicionar à adega | Quantidade e onde guardar: escolher um lugar no rack 3D (espaços livres acendem) ou só na lista |
| Ofertas | Por loja (quantos vinhos com desconto, desconto máximo, frete ou retirada, garrafas em promoção) e por vinho; filtros de retirada perto e frete grátis; página da loja |
| Adega | Rack em 3D: arrastar gira, tocar puxa a garrafa e mostra a janela de consumo; filtros por estado acendem só as garrafas certas; alternância para lista |
| Garrafa na adega | Aberta por "Ver detalhes" no rack ou por um item da lista: quando abrir, quantas garrafas, onde estão no rack (com "Ver no rack"), desde quando, preço pago, menor preço hoje e anotação. "Abrir uma garrafa" tira uma da adega e do rack. A página de compra do vinho continua acessível por "Ver preços e avaliações do vinho" |
| Perfil | Plano, tipos de aviso no WhatsApp (os tipos ainda são candidatos), sair |

## Referências de design

Revisadas em 2026-11-15. Cada app é referência só para a parte indicada:

| Referência | Para quê | No protótipo |
|---|---|---|
| **Spotify** | Navegação e descoberta | Ainda não aplicado |
| **Notion** | Organização, perfil e lista da adega | Em parte: a página da garrafa na adega usa uma lista de propriedades |
| **Duolingo** | Só o onboarding | Ainda não aplicado (hoje a abertura vai direto para entrar ou criar conta) |
| **Vivino e Wine-Searcher** | Escaneamento e preços | Aplicado: garrafa em destaque, nota, câmera sempre à mão, lojas por preço com frete |
| **InVintory** | Rack 3D | Aplicado: rack com a cápsula de cada garrafa, girar e tocar para puxar |

A paleta e as fontes são as do Design System, sem mudança. As cores vêm de `../showcase/tokens.css` e os componentes (botões, chips, selos, janela de consumo, stepper, toast) de `../showcase/components.css`.

## Decisões provisórias

- **Abas** Buscar, Ofertas, Adega e Perfil, com o botão de escanear separado à direita (como a busca no iOS 26). A navegação final ainda não foi decidida.
- **Garrafas desenhadas** (`bottles.js`) no lugar de fotos de produto, até existir catálogo com imagens.
- O reconhecimento do rótulo é simulado: sempre encontra o mesmo vinho.
- **Login** só com Google ou conta do app (decisão de 2026-11-15, ver `docs/product-context.md`).

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página, aparelho e ícones |
| `app.css` | Estilos das telas |
| `app.js` | Telas, navegação em pilha, abas, folhas e fluxos |
| `data.js` | Dados fictícios: vinhos, lojas, ofertas e a adega |
| `bottles.js` | Gerador das garrafas em SVG |
| `cellar3d.js` | Adega em 3D (three.js) |
