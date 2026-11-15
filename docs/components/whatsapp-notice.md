# Aviso no WhatsApp

No MVP, o WhatsApp só envia avisos do app para o usuário; o usuário não conversa com o app ([contexto do produto](../product-context.md#canal-whatsapp)). Os tipos de aviso ainda estão **a definir**. Este padrão vale para qualquer um deles.

## Perfil

- **Nome:** AVYN.
- **Foto:** ícone escuro da taça-lupa ([`assets/brand/logo/taca-lupa/icone-escuro-512.png`](../../assets/brand/logo/taca-lupa/icone-escuro-512.png)). O fundo escuro dá mais contraste dentro do recorte circular do WhatsApp.

## Mensagem

- **Uma ideia por mensagem**, até três linhas.
- **Começa pelo fato** ("O preço caiu no vinho que você acompanha"), sem saudação longa.
- **Preço sempre com a loja**; preço anterior riscado quando houver.
- **Um botão de ação** que abre o app na tela certa (link universal): "Ver ofertas", "Abrir a adega".
- Quando houver imagem (card do vinho), ela segue as cores do app: creme, nome em Playfair, preço em DM Sans no vinho granada.
- Sem emoji de enfeite e sem caixa alta.

## Candidatos de aviso (a confirmar)

| Aviso | Exemplo | Observação |
|---|---|---|
| Preço caiu | "O preço caiu no Cerro Azul Malbec 2021: R$ 119,90 (era R$ 136,00) no Empório do Sul." | Alertas de preço são Premium |
| Janela da adega | "Da sua adega: Casa Serrana Brut Nature está no fim da janela de consumo." | |
| Promoções | "Espumante da semana: Casa Serrana Brut Nature por R$ 59,90 no Empório do Sul, o menor preço entre 4 lojas." | Ofertas estilo Trivago, do pedido original |

## Regras de envio (para a implementação)

- Só com opt-in explícito no app, com o tipo de aviso escolhido pelo usuário.
- Mensagens fora da janela de 24 h exigem templates aprovados na API do WhatsApp Business; escreva os textos já pensando nisso.
- Todo aviso tem como parar de receber ("Responda PARAR" ou ajuste no app).
