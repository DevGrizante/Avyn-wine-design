# Padrões iOS

Como o AVYN usa a estrutura do iOS. A regra geral: **estrutura, navegação e controles são os do sistema**; o AVYN entra pelo tint, pelas fontes, pelos conteúdos e pelos poucos componentes próprios.

## Navegação

- **Tab bar** com as seções de topo. A estrutura final ainda não foi decidida; as telas de referência usam Buscar · Adega · Perfil como **placeholder**. Abas são seções, nunca ações.
- **Pilha de navegação** (push) para descer na hierarquia: busca → vinho → loja.
- **Título grande** (`typography.large-title`, Playfair) nas telas de topo, recolhendo para título inline (`typography.headline`, DM Sans) ao rolar. Telas de detalhe usam título inline.
- **Gesto de voltar pela borda** sempre ativo.
- Barras usam o material do sistema (Liquid Glass). O tint dos ícones é `tint.default`.

## Modalidade

- **Sheet** para tarefas curtas e autocontidas: filtros, adicionar à adega com quantidade, criar alerta de preço. Cancelar à esquerda, Concluir à direita, e arrastar para fechar (com confirmação só se houver dados não salvos).
- **Action sheet do sistema** para confirmar ações destrutivas ("Remover da adega?").
- **Alerta do sistema** só para erros que pedem decisão.
- Nada de tela cheia modal no MVP.

## Listas

- Listas **inset grouped** para detalhe e configurações; lista simples para resultados de busca.
- **Swipe actions** do sistema: na busca, "Adicionar à adega"; na adega, "Abrir garrafa" e "Remover".
- **Menu de contexto** (toque longo) com prévia nas células de vinho.
- **Puxar para atualizar** na adega e nas ofertas.

## Carregamento e erro

- Indicador do sistema; células esqueleto estáticas em listas.
- Erro diz o problema e a saída: "Não conseguimos atualizar os preços. Tentar de novo."
- Conteúdo já carregado continua visível durante uma nova busca.

## Aparência

- **Modo escuro é de primeira classe.** Toda tela é desenhada e testada nos dois modos (as telas de referência alternam claro e escuro de propósito).
- O app segue a aparência do sistema; não há seletor próprio no MVP.

## Acessibilidade (checklist por tela)

- [ ] Dynamic Type até AX5 sem truncar nome de vinho nem preço.
- [ ] VoiceOver: cada célula é um elemento com rótulo completo; ações de swipe também como ações do VoiceOver.
- [ ] Contraste: só papéis semânticos (todos validados em [contrast.md](../foundations/contrast.md)).
- [ ] Alvos de 44 × 44 pt.
- [ ] Reduzir Movimento: molas viram fade.
- [ ] Aumentar Contraste: metadados sobem para `label.primary`.
- [ ] Estado nunca só por cor.

## Fluxos do MVP

1. **Buscar e comparar:** Buscar → digita → resultados (menor preço primeiro) → detalhe → ofertas → loja no Safari.
2. **Guardar:** detalhe → "Adicionar à adega" → sheet com quantidade → toast com Desfazer → contador da adega sobe.
3. **Cuidar da adega:** Adega → filtro "Beber logo" → garrafa → "Abrir garrafa".
4. **Aviso:** WhatsApp → botão da mensagem → link universal abre o app na tela do vinho ou da adega.
