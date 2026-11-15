# tokens

Fonte da verdade do Design System do AVYN, no formato [W3C Design Tokens (DTCG)](https://www.designtokens.org/). Todo valor de cor, tipo, medida e movimento usado no app sai daqui.

| Arquivo | Conteúdo | Como é mantido |
|---|---|---|
| `color.primitives.json` | Escalas (vinho, mel, neutro), cores de marca, estados, misturas e cores de tipo de vinho | Gerado: `python tools/tokens/make_primitives.py` |
| `color.light.json` | Papéis semânticos do modo claro | Gerado: `python tools/tokens/make_semantic.py` |
| `color.dark.json` | Papéis semânticos do modo escuro (mesmas chaves) | Gerado: `python tools/tokens/make_semantic.py` |
| `typography.json` | Famílias, pesos e estilos de texto ligados aos text styles do iOS | Editado à mão |
| `dimension.json` | Espaço, layout, tamanhos, raios e bordas | Editado à mão |
| `effects.json` | Sombras e movimento (durações, curvas, springs) | Editado à mão |

## Regras

- **Na interface, só papéis semânticos** (`color.tint.default`, `color.label.secondary`…). As primitivas são matéria-prima e não aparecem em componente.
- **Os dois modos têm as mesmas chaves.** O script de semântica garante isso; o `build.py` falha se não tiverem.
- **Unidades em pt.** No iOS, 1 pt = 1 ponto; no Flutter, 1 pt = 1 logical pixel.
- **Transparência em hex8** (`#16110F24`), como pede o DTCG.

## Fluxo

```sh
python tools/tokens/make_primitives.py   # se mudou uma escala ou cor de marca
python tools/tokens/make_semantic.py     # se mudou um papel semântico
python tools/tokens/build.py             # valida contraste e gera o CSS do showcase
```

O `build.py` resolve os aliases, mede o contraste WCAG de cada par de uso nos dois modos (relatório em [`docs/foundations/contrast.md`](../docs/foundations/contrast.md)) e sai com erro se algum par obrigatório falhar. Também gera [`docs/showcase/tokens.css`](../docs/showcase/tokens.css).

## Para o Flutter (etapa futura)

Os arquivos seguem o DTCG para serem convertidos por ferramentas como Style Dictionary. Sugestão de mapeamento:

- `color.light.json` / `color.dark.json` → `ThemeExtension<AvynColors>` com uma instância por `Brightness`.
- `typography.json` → `TextTheme`, usando `$extensions.com.avyn.ios.textStyle` para escalar com `MediaQuery.textScalerOf`.
- `dimension.json` → constantes `AvynSpace`, `AvynRadius` (sempre `ContinuousRectangleBorder`).
- `effects.json` → `SpringDescription` e `Duration`.
