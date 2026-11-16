// Garrafas desenhadas em SVG para o protótipo (substituem fotos de produto).
// Cada vinho tem formato, vidro, cápsula e rótulo próprios, definidos em data.js.
window.AV_BOTTLE = (() => {
  let uid = 0;
  const SHAPES = {
    bordeaux: { d: "M40 8H60V16H58V78C58 96 86 98 86 120V304Q86 312 78 312H22Q14 312 14 304V120C14 98 42 96 42 78V16H40Z", cap: 72, body: [14, 86], label: 168 },
    burgundy: { d: "M40 8H60V16H58V68C58 108 88 118 88 150V304Q88 312 80 312H20Q12 312 12 304V150C12 118 42 108 42 68V16H40Z", cap: 64, body: [12, 88], label: 178 },
    champagne: { d: "M38 6H62V20H60V64C60 106 90 116 90 152V304Q90 312 82 312H18Q10 312 10 304V152C10 116 40 106 40 64V20H38Z", cap: 104, body: [10, 90], label: 184 },
    flute: { d: "M41 8H59V16H57V90C57 122 80 130 80 162V304Q80 312 72 312H28Q20 312 20 304V162C20 130 43 122 43 90V16H41Z", cap: 74, body: [20, 80], label: 188 },
    porto: { d: "M39 8H61V22H58V60C64 66 64 74 58 80C58 98 86 100 86 122V304Q86 312 78 312H22Q14 312 14 304V122C14 100 42 98 42 80C36 74 36 66 42 60V22H39Z", cap: 26, body: [14, 86], label: 170 },
  };
  const FOIL = { tinto: "#5C1828", branco: "#B89254", espumante: "#C29A5B", rose: "#E7B9B3", fortificado: "#2A1E16", laranja: "#B4703A" };
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const SKIP = /^(Bodega|Tenuta|Herdade da|Herdade|Domaine des|Domaine|Finca|Casa|Pago de|Quinta do|Quinta|Château)\s+/;

  function labelLines(w) {
    const brand = (w.producer || w.name).replace(SKIP, "");
    let sub = w.type === "espumante" ? "Brut Nature" : w.type === "fortificado" ? "Tawny 10 anos" : w.grape.split(" e ")[0];
    if (w.id === "sassoscuro") sub = "Brunello";
    if (w.custom) sub = w.region || "";
    return [brand, sub];
  }

  function label(w, s, id) {
    const [L, R] = s.body, x = L + 5, wd = R - L - 10, y = s.label, h = 84, cx = L + (R - L) / 2;
    const { bg, ink, accent, style } = w.label;
    const [brand, sub] = labelLines(w);
    const year = w.vintage || "";
    const serif = "Playfair Display, Georgia, serif", sans = "DM Sans, Helvetica, sans-serif";
    const bs = brand.length > 11 ? 8.2 : 10;
    let g = `<rect x="${x}" y="${y}" width="${wd}" height="${h}" rx="1.5" fill="${bg}"/>`;
    if (style === "classic") {
      g += `<rect x="${x + 3}" y="${y + 3}" width="${wd - 6}" height="${h - 6}" fill="none" stroke="${accent}" stroke-width=".7"/>
        <text x="${cx}" y="${y + 36}" text-anchor="middle" font-family="${serif}" font-weight="700" font-size="${bs}" fill="${ink}">${esc(brand)}</text>
        <line x1="${cx - 10}" x2="${cx + 10}" y1="${y + 44}" y2="${y + 44}" stroke="${accent}" stroke-width=".6"/>
        <text x="${cx}" y="${y + 56}" text-anchor="middle" font-family="${sans}" font-size="5.6" fill="${ink}">${esc(sub)}</text>
        <text x="${cx}" y="${y + 72}" text-anchor="middle" font-family="${sans}" font-weight="600" font-size="6" fill="${ink}">${year}</text>`;
    } else if (style === "band") {
      g += `<rect x="${x}" y="${y + 10}" width="${wd}" height="15" fill="${accent}"/>
        <text x="${cx}" y="${y + 20.5}" text-anchor="middle" font-family="${sans}" font-weight="700" font-size="5.4" letter-spacing=".6" fill="${bg}">${esc(sub)}</text>
        <text x="${cx}" y="${y + 48}" text-anchor="middle" font-family="${serif}" font-weight="700" font-size="${bs}" fill="${ink}">${esc(brand)}</text>
        <text x="${cx}" y="${y + 70}" text-anchor="middle" font-family="${sans}" font-weight="600" font-size="6" fill="${ink}">${year}</text>`;
    } else if (style === "crest") {
      g += `<path d="M${cx - 18} ${y + 40}a18 22 0 0 1 36 0" fill="none" stroke="${accent}" stroke-width="1"/>
        <circle cx="${cx}" cy="${y + 26}" r="4" fill="${accent}"/>
        <text x="${cx}" y="${y + 52}" text-anchor="middle" font-family="${serif}" font-weight="700" font-size="${bs}" fill="${ink}">${esc(brand)}</text>
        <text x="${cx}" y="${y + 63}" text-anchor="middle" font-family="${serif}" font-style="italic" font-size="6" fill="${ink}">${esc(sub)}</text>
        <text x="${cx}" y="${y + 76}" text-anchor="middle" font-family="${sans}" font-weight="600" font-size="5.6" fill="${ink}">${year}</text>`;
    } else {
      g += `<rect x="${x + 6}" y="${y + 14}" width="6" height="6" fill="${accent}"/>
        <text x="${x + 6}" y="${y + 40}" font-family="${sans}" font-weight="700" font-size="${bs - 0.6}" fill="${ink}">${esc(brand)}</text>
        <text x="${x + 6}" y="${y + 52}" font-family="${sans}" font-size="5.6" fill="${ink}">${esc(sub)}</text>
        <text x="${x + 6}" y="${y + 74}" font-family="${sans}" font-weight="600" font-size="5.6" fill="${accent}">${year}</text>`;
    }
    return g;
  }

  return function bottle(w, opts = {}) {
    const s = SHAPES[w.shape] || SHAPES.bordeaux;
    const id = "b" + (++uid);
    const foil = FOIL[w.type] || FOIL.tinto;
    const light = !!w.liquid;
    const cls = opts.cls ? ` class="${opts.cls}"` : "";
    const shadow = opts.shadow === false ? "" : `<ellipse cx="50" cy="314" rx="34" ry="4" fill="#16110F" opacity=".22"/>`;
    return `<svg${cls} viewBox="0 0 100 320" role="img" aria-label="Garrafa de ${esc(w.full)}">
      <defs>
        <clipPath id="${id}c"><path d="${s.d}"/></clipPath>
        <linearGradient id="${id}s" x1="0" x2="1">
          <stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".22" stop-color="#000" stop-opacity=".05"/>
          <stop offset=".33" stop-color="#fff" stop-opacity=".28"/><stop offset=".40" stop-color="#fff" stop-opacity=".04"/>
          <stop offset=".78" stop-color="#000" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".55"/>
        </linearGradient>
        <linearGradient id="${id}f" x1="0" x2="1">
          <stop offset="0" stop-color="${foil}"/><stop offset=".35" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="${foil}"/><stop offset="1" stop-color="#000" stop-opacity=".35"/>
        </linearGradient>
      </defs>
      ${shadow}
      <g clip-path="url(#${id}c)">
        <rect width="100" height="320" fill="${w.glass}"/>
        ${light ? `<rect y="120" width="100" height="200" fill="${w.liquid}" opacity=".85"/>` : ""}
        <rect width="100" height="${s.cap}" fill="${foil}"/>
        <rect width="100" height="${s.cap}" fill="url(#${id}f)" opacity=".7"/>
        ${label(w, s, id)}
        <rect width="100" height="320" fill="url(#${id}s)"/>
      </g>
    </svg>`;
  };
})();
