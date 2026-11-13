# tools/color

Gerador reproduzível das paletas exploradas em [docs/color/palette-exploration.md](../../docs/color/palette-exploration.md).

```sh
cd tools/color
python gen.py   # escalas 50–950 em OKLCH a partir das cores-âncora → scales.json
python sem.py   # mapeamento semântico Light/Dark + contraste WCAG → semantic.json
```

- `palette.py`: conversões sRGB ↔ OKLCH, geração de escala, contraste WCAG 2.2.
- `scales.json` / `semantic.json`: saída usada nos boards do Figma (`01 — Color Foundations`).

Estes arquivos são **dados de exploração**. Os tokens oficiais ficam em `tokens/` depois da aprovação da paleta.
