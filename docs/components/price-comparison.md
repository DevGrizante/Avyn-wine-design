# Comparação de preços

O "Buscapé" do vinho, na tela de detalhe. É uma seção de lista inset grouped com uma oferta por linha.

## Anatomia da oferta

- **Logo da loja** 36 pt, `radius.sm` (iniciais sobre `fill.secondary` quando não houver logo).
- **Loja** em `typography.headline`; abaixo, frete e prazo em `typography.footnote` ("Frete R$ 19,90 · chega em 3 dias", "Retirar na loja · Porto Alegre").
- **Preço** à direita, `typography.body-strong`.
- Altura mínima 64 pt.

## Regras

1. **Ordenada do menor para o maior preço** (preço do produto; o frete aparece mas não reordena, a não ser que o usuário peça "Menor preço com frete").
2. **A mais barata** ganha fundo `surface.tinted` e o selo "Melhor preço".
3. **Preço e frete sempre visíveis.** Nada de esconder frete em outra tela.
4. **Data da coleta do preço** no rodapé da seção ("Preços atualizados hoje às 9h").
5. Mostrar as 3–5 melhores ofertas e um botão simples "Ver todas as lojas (12)".

## Comportamento

- Toque abre a página da loja no navegador do sistema (`SFSafariViewController`), com o vinho já na URL.
- O botão "Criar alerta de preço" (Premium) fica abaixo da seção, em estilo secundário.

## Acessibilidade

Cada oferta é um elemento: "Empório do Sul, 189 reais e 90 centavos, frete 19 reais e 90, chega em 3 dias. Melhor preço."
