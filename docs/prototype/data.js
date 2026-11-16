// Dados FICTÍCIOS para o protótipo. Vinhos, produtores, lojas e preços não existem.
window.AV_DATA = (() => {
  const stores = {
    emporio: { name: "Empório do Sul", mono: "ES", color: "#7E2236", kind: "Loja online", ship: "Frete R$ 19,90", eta: "chega em 3 dias" },
    central: { name: "Adega Central", mono: "AC", color: "#16110F", kind: "Loja física e online", ship: "Retirar hoje", eta: "a 2,4 km" },
    vinhocia: { name: "Vinho & Cia", mono: "V&", color: "#7F602F", kind: "Loja online", ship: "Frete grátis", eta: "chega em 5 dias" },
    sommelier: { name: "Casa do Sommelier", mono: "CS", color: "#B4475B", kind: "Loja física", ship: "Retirar hoje", eta: "a 4,1 km" },
    uva: { name: "Mercado Uva", mono: "MU", color: "#3A2F22", kind: "Supermercado", ship: "Frete R$ 9,90", eta: "chega amanhã" },
    rolha: { name: "Clube da Rolha", mono: "CR", color: "#5C1828", kind: "Clube de assinatura", ship: "Frete grátis", eta: "chega em 4 dias" },
  };

  // label.style: "classic" (nome central serifado), "band" (faixa de cor), "minimal" (bloco), "crest" (moldura)
  const wines = [
    { id: "cerro-azul", name: "Cerro Azul Malbec Reserva", vintage: 2021, producer: "Bodega Cerro Azul", region: "Mendoza", country: "Argentina", type: "tinto", grape: "Malbec", rating: 4.2, reviews: 1284,
      shape: "bordeaux", glass: "#1E2A22", label: { bg: "#F4EFE6", ink: "#1C2B4A", accent: "#1C2B4A", style: "classic" },
      window: [2023, 2031, 2025, 2028],
      offers: [["emporio", 119.9, 136.0], ["uva", 124.5, null], ["vinhocia", 129.9, 139.9], ["central", 134.0, null], ["sommelier", 141.0, null]] },
    { id: "altos-uco", name: "Altos de Uco Malbec", vintage: 2022, producer: "Altos de Uco", region: "Valle de Uco", country: "Argentina", type: "tinto", grape: "Malbec", rating: 4.0, reviews: 812,
      shape: "bordeaux", glass: "#1A1F1A", label: { bg: "#16110F", ink: "#E8D9B5", accent: "#C29A5B", style: "minimal" },
      window: [2024, 2030, 2025, 2028],
      offers: [["vinhocia", 134.5, 159.0], ["emporio", 138.9, null], ["rolha", 142.0, null]] },
    { id: "piedra-sola", name: "Finca Piedra Sola Malbec", vintage: 2020, producer: "Finca Piedra Sola", region: "Salta", country: "Argentina", type: "tinto", grape: "Malbec", rating: 4.4, reviews: 356,
      shape: "burgundy", glass: "#22291F", label: { bg: "#EDE4D3", ink: "#5B2B1E", accent: "#5B2B1E", style: "crest" },
      window: [2022, 2030, 2024, 2027],
      offers: [["sommelier", 148.0, 175.0], ["central", 152.0, null], ["emporio", 159.9, null]] },
    { id: "vale-alto", name: "Quinta do Vale Alto Reserva", vintage: 2019, producer: "Quinta do Vale Alto", region: "Douro", country: "Portugal", type: "tinto", grape: "Touriga Nacional", rating: 4.3, reviews: 642,
      shape: "bordeaux", glass: "#1B201B", label: { bg: "#FBF8F2", ink: "#16110F", accent: "#9C2A2A", style: "band" },
      window: [2022, 2032, 2024, 2028],
      offers: [["central", 189.9, 229.0], ["emporio", 196.0, null], ["sommelier", 205.0, null], ["vinhocia", 211.9, null]] },
    { id: "serrana-brut", name: "Casa Serrana Brut Nature", vintage: null, producer: "Casa Serrana", region: "Serra Gaúcha", country: "Brasil", type: "espumante", grape: "Chardonnay e Pinot Noir", rating: 4.1, reviews: 2210,
      shape: "champagne", glass: "#25301F", label: { bg: "#16110F", ink: "#E3C78F", accent: "#C29A5B", style: "minimal" },
      window: [2023, 2026, 2023, 2025],
      offers: [["emporio", 59.9, 74.9], ["uva", 62.9, 69.9], ["vinhocia", 66.0, null], ["central", 68.5, null]] },
    { id: "lune-blanche", name: "Château Lune Blanche", vintage: 2020, producer: "Château Lune Blanche", region: "Bordeaux", country: "França", type: "branco", grape: "Sémillon e Sauvignon Blanc", rating: 4.0, reviews: 418,
      shape: "bordeaux", glass: "#C9C49A", liquid: "#E8D38E", label: { bg: "#FFFFFF", ink: "#2A2A2A", accent: "#B48A3C", style: "crest" },
      window: [2027, 2035, 2029, 2032],
      offers: [["sommelier", 219.0, null], ["central", 224.0, null], ["rolha", 239.0, null]] },
    { id: "sassoscuro", name: "Tenuta Sassoscuro Brunello di Montalcino", vintage: 2018, producer: "Tenuta Sassoscuro", region: "Toscana", country: "Itália", type: "tinto", grape: "Sangiovese", rating: 4.5, reviews: 977,
      shape: "bordeaux", glass: "#141814", label: { bg: "#EFE6D2", ink: "#3A1A14", accent: "#7E2236", style: "crest" },
      window: [2024, 2036, 2027, 2032],
      offers: [["sommelier", 389.0, 459.0], ["emporio", 412.0, null], ["central", 425.0, null]] },
    { id: "vale-ventos-rose", name: "Vale dos Ventos Rosé", vintage: 2024, producer: "Vale dos Ventos", region: "Campanha Gaúcha", country: "Brasil", type: "rose", grape: "Pinot Noir", rating: 3.9, reviews: 530,
      shape: "flute", glass: "#F3E7E2", liquid: "#F2A6A8", label: { bg: "#FFFFFF", ink: "#7E2236", accent: "#F2A6A8", style: "minimal" },
      window: [2025, 2027, 2025, 2026],
      offers: [["uva", 54.9, 64.9], ["emporio", 57.0, null], ["vinhocia", 59.9, null]] },
    { id: "lua-cheia", name: "Herdade da Lua Cheia Tinto", vintage: 2021, producer: "Herdade da Lua Cheia", region: "Alentejo", country: "Portugal", type: "tinto", grape: "Aragonez e Trincadeira", rating: 3.9, reviews: 1460,
      shape: "burgundy", glass: "#1E241C", label: { bg: "#E9DCC4", ink: "#1F1F1F", accent: "#C29A5B", style: "band" },
      window: [2023, 2028, 2024, 2026],
      offers: [["uva", 79.9, 99.9], ["vinhocia", 84.0, null], ["central", 86.9, null], ["emporio", 89.9, null]] },
    { id: "pago-arenas", name: "Pago de Arenas Crianza", vintage: 2020, producer: "Pago de Arenas", region: "Rioja", country: "Espanha", type: "tinto", grape: "Tempranillo", rating: 3.8, reviews: 2045,
      shape: "bordeaux", glass: "#1D221D", label: { bg: "#F7F1E3", ink: "#7E2236", accent: "#C29A5B", style: "classic" },
      window: [2022, 2027, 2023, 2025],
      offers: [["rolha", 92.0, 118.0], ["uva", 96.5, null], ["emporio", 99.9, null]] },
    { id: "cailloux", name: "Domaine des Cailloux Chardonnay", vintage: 2022, producer: "Domaine des Cailloux", region: "Bourgogne", country: "França", type: "branco", grape: "Chardonnay", rating: 4.1, reviews: 288,
      shape: "burgundy", glass: "#B9B88A", liquid: "#E6CF84", label: { bg: "#F6F2EA", ink: "#23303A", accent: "#23303A", style: "classic" },
      window: [2024, 2030, 2025, 2028],
      offers: [["vinhocia", 179.0, 199.0], ["sommelier", 185.0, null]] },
    { id: "laguna-sb", name: "Bodega Laguna Sauvignon Blanc", vintage: 2024, producer: "Bodega Laguna", region: "Casablanca", country: "Chile", type: "branco", grape: "Sauvignon Blanc", rating: 3.7, reviews: 3120,
      shape: "burgundy", glass: "#C6C9A0", liquid: "#EEE1A0", label: { bg: "#E8F0EC", ink: "#1E3A34", accent: "#1E3A34", style: "minimal" },
      window: [2025, 2026, 2025, 2026],
      offers: [["uva", 49.9, 59.9], ["central", 52.0, null], ["emporio", 54.9, null]] },
    { id: "quinta-velha", name: "Quinta Velha Porto Tawny 10 anos", vintage: null, producer: "Quinta Velha", region: "Porto", country: "Portugal", type: "fortificado", grape: "Blend do Douro", rating: 4.3, reviews: 704,
      shape: "porto", glass: "#2A1C12", label: { bg: "#EFE3C8", ink: "#3A2412", accent: "#7F602F", style: "crest" },
      window: [2020, 2040, 2020, 2040],
      offers: [["sommelier", 169.0, 199.0], ["emporio", 174.9, null], ["central", 179.0, null]] },
  ];

  wines.forEach(w => {
    w.offers = w.offers.map(([s, p, o]) => ({ store: s, price: p, old: o })).sort((a, b) => a.price - b.price);
    w.best = w.offers[0];
    w.full = w.vintage ? `${w.name} ${w.vintage}` : w.name;
  });
  const byId = Object.fromEntries(wines.map(w => [w.id, w]));

  // Adega: rack de 6 colunas × 5 linhas. [vinhoId, linha, coluna]
  const cellar = [
    ["vale-alto", 0, 0], ["vale-alto", 0, 1], ["vale-alto", 0, 2], ["sassoscuro", 0, 3], ["sassoscuro", 0, 4], ["lune-blanche", 0, 5],
    ["piedra-sola", 1, 0], ["piedra-sola", 1, 1], ["cerro-azul", 1, 2], ["cerro-azul", 1, 3], ["cailloux", 1, 4], ["cailloux", 1, 5],
    ["serrana-brut", 2, 0], ["lua-cheia", 2, 1], ["lua-cheia", 2, 2], ["pago-arenas", 2, 3], ["quinta-velha", 2, 5],
    ["altos-uco", 3, 0], ["altos-uco", 3, 1], ["vale-ventos-rose", 3, 2], ["laguna-sb", 3, 4],
    ["lune-blanche", 4, 1], ["sassoscuro", 4, 2], ["quinta-velha", 4, 4],
  ].map(([id, r, c]) => ({ id, r, c }));

  const TODAY = 2026.9;
  const status = (w) => {
    if (!w.window) return "sem";
    const [from, to, , peakTo] = w.window;
    if (TODAY < from) return "guardar";
    if (TODAY <= peakTo) return "ponto";
    if (TODAY <= to + 0.99) return "logo";
    return "passou";
  };
  const STATUS = {
    guardar: { label: "Guardar", cls: "neutral" },
    ponto: { label: "No ponto", cls: "success" },
    logo: { label: "Beber logo", cls: "warning" },
    passou: { label: "Passou do ponto", cls: "danger" },
    sem: { label: "Sem janela", cls: "neutral" },
  };
  const TYPES = { tinto: "Tinto", branco: "Branco", rose: "Rosé", espumante: "Espumante", fortificado: "Fortificado", laranja: "Laranja" };

  return { stores, wines, byId, cellar, status, STATUS, TYPES, TODAY };
})();
