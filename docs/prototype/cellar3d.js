// Adega em 3D (three.js r128). Nicho de madeira com fundo iluminado: cada garrafa é de vidro
// translúcido, com o vinho dentro e o rótulo impresso. Deitada no rack ela mostra a cápsula;
// ao tocar, sai do nicho e fica de pé, com o rótulo de frente. Arrastar gira o rack.
// Tem dois temas (claro e escuro), trocados por setTheme().
window.AV_CELLAR = (() => {
  const COLS = 6, ROWS = 5, CELL = 0.27, DEPTH = 0.62, BOARD = 0.02;
  const W = COLS * CELL, H = ROWS * CELL;
  const FOIL = { tinto: 0x5c1828, branco: 0xc29a5b, espumante: 0xd8b273, rose: 0xe7b9b3, fortificado: 0x2a1e16, laranja: 0xb4703a };
  const LIQUID = { tinto: "#3d0714", fortificado: "#431a09", laranja: "#c8792e", branco: "#e6cf84", espumante: "#ecd990", rose: "#f2a6a8" };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Perfis [raio, altura] de cada formato. R = raio do corpo; label = faixa de altura do rótulo.
  const SHAPES = {
    bordeaux: { R: 0.1, label: [0.115, 0.33], p: [[0, 0.012], [0.05, 0.004], [0.094, 0], [0.1, 0.012], [0.1, 0.4], [0.098, 0.425], [0.088, 0.455], [0.066, 0.49], [0.045, 0.515], [0.036, 0.54], [0.034, 0.65], [0.038, 0.655], [0.038, 0.685], [0.033, 0.692], [0, 0.692]] },
    burgundy: { R: 0.103, label: [0.08, 0.275], p: [[0, 0.012], [0.05, 0.004], [0.097, 0], [0.103, 0.012], [0.103, 0.3], [0.099, 0.345], [0.085, 0.4], [0.064, 0.46], [0.045, 0.51], [0.036, 0.55], [0.034, 0.65], [0.038, 0.655], [0.038, 0.685], [0.033, 0.692], [0, 0.692]] },
    champagne: { R: 0.107, label: [0.07, 0.255], foil: 0.21, p: [[0, 0.016], [0.05, 0.005], [0.1, 0], [0.107, 0.014], [0.107, 0.28], [0.102, 0.33], [0.086, 0.4], [0.064, 0.47], [0.046, 0.53], [0.038, 0.57], [0.036, 0.65], [0.042, 0.655], [0.042, 0.685], [0.036, 0.692], [0, 0.692]] },
    flute: { R: 0.083, label: [0.08, 0.275], p: [[0, 0.01], [0.04, 0.004], [0.078, 0], [0.083, 0.01], [0.083, 0.3], [0.078, 0.36], [0.064, 0.44], [0.048, 0.52], [0.038, 0.58], [0.034, 0.65], [0.037, 0.655], [0.037, 0.685], [0.032, 0.692], [0, 0.692]] },
  };
  SHAPES.porto = SHAPES.bordeaux;
  const Z0 = -0.3; // deslocamento do fundo da garrafa

  // glassOp: opacidade do vidro no rack [escuro, claro]; glassSel: vidro da garrafa em destaque (quase invisível).
  const THEMES = {
    dark: {
      wood: 0x2a1a11, woodEdge: 0x1a100a, back: 0x140d09, glow: 0xff9a4d, glowK: 0.55, led: 0xffd9a0, brass: 0xc29a5b,
      hemi: [0xffe9cf, 0x120c09, 0.22], key: [0xffe2b8, 0.9], rim: [0xc29a5b, 0.3], exposure: 1.0, env: 0.55,
      liquidGlow: 0.08, glassOp: [0.8, 0.42], glassSel: 0.14, shadow: 0.5, ring: 0xdeb77b,
      sky: ["#0c0806", "#2b1a10", "#6b4526"], box: "#ffd7a0", veil: 0x16110f,
    },
    // Claro: nogueira média sobre fundo areia, para o móvel não estourar no branco.
    light: {
      wood: 0x5c3820, woodEdge: 0x45291a, back: 0xb89b74, glow: 0xffd9a6, glowK: 0.22, led: 0xfff1d8, brass: 0xa98450,
      hemi: [0xfff6ea, 0x6b5640, 0.42], key: [0xfff1dc, 0.8], rim: [0xffe2b8, 0.2], exposure: 0.88, env: 0.42,
      liquidGlow: 0.0, glassOp: [0.84, 0.46], glassSel: 0.18, shadow: 0.35, ring: 0x7e2236,
      sky: ["#8f7a62", "#d8c8b2", "#fbf6ee"], box: "#ffffff", veil: 0xf8f3ec,
    },
  };

  function supported() {
    try { const c = document.createElement("canvas"); return !!(window.THREE && (c.getContext("webgl2") || c.getContext("webgl"))); } catch (e) { return false; }
  }

  const lathe = (pts, seg) => { const g = new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg); g.rotateX(Math.PI / 2); g.translate(0, 0, Z0); return g; };
  const geoCache = {};
  function shapeGeo(name) {
    const s = SHAPES[name] || SHAPES.bordeaux;
    if (geoCache[name]) return geoCache[name];
    // O vinho vai até o começo do ombro, onde a superfície é larga e dá para ver o balanço.
    const bodyTop = s.p.filter(([r]) => r >= s.R - 1e-6).pop()[1];
    const level = bodyTop - 0.012, rTop = s.R - 0.008;
    const wall = [[0, 0.02], ...s.p.filter(([, y]) => y < level).slice(1).map(([r, y]) => [Math.max(0.001, r - 0.008), Math.max(0.014, y)]), [rTop, level]];
    // Superfície: disco com anéis internos (para ondular) na altura do nível.
    const surf = new THREE.RingGeometry(0.0005, rTop, 48, 6);
    surf.translate(0, 0, Z0 + level);
    const [y0, y1] = s.label, arc = 2.5;
    const label = new THREE.CylinderGeometry(s.R + 0.0016, s.R + 0.0016, y1 - y0, 40, 1, true, -arc / 2, arc);
    label.rotateX(Math.PI / 2);
    label.translate(0, 0, Z0 + (y0 + y1) / 2);
    const top = s.p[s.p.length - 3][0], fl = s.foil || 0.14;
    const foil = new THREE.CylinderGeometry(top + 0.0025, top + 0.0005, fl, 28);
    foil.rotateX(Math.PI / 2);
    foil.translate(0, 0, Z0 + 0.694 - fl / 2);
    const disc = new THREE.CircleGeometry(top - 0.008, 24);
    disc.translate(0, 0, Z0 + 0.6945);
    return (geoCache[name] = { s, glass: lathe(s.p, 48), wall: lathe(wall, 48), surf, top: Z0 + level, rTop, label, foil, disc });
  }

  // Rótulo desenhado em canvas a partir dos dados do vinho (mesmos estilos das garrafas em SVG).
  const SKIP = /^(Bodega|Tenuta|Herdade da|Herdade|Domaine des|Domaine|Finca|Casa|Pago de|Quinta do|Quinta|Château)\s+/;
  function drawLabel(cv, w) {
    const x = cv.getContext("2d"), Wd = cv.width, Hd = cv.height;
    const L = w.label || { bg: "#F4EFE6", ink: "#221A17", accent: "#7E2236", style: "classic" };
    const serif = '"Playfair Display", Georgia, serif', sans = '"DM Sans", Helvetica, sans-serif';
    const brand = (w.producer || w.name || "").replace(SKIP, "");
    let sub = w.type === "espumante" ? "Brut Nature" : w.type === "fortificado" ? "Tawny 10 anos" : (w.grape || "").split(" e ")[0];
    if (w.custom) sub = w.region || "";
    const year = w.vintage ? String(w.vintage) : "";
    const fitText = (t, font, size, max) => { do { x.font = font.replace("%", size); size -= 2; } while (x.measureText(t).width > max && size > 14); };
    x.fillStyle = L.bg; x.fillRect(0, 0, Wd, Hd);
    x.textAlign = "center"; x.textBaseline = "middle";
    const cx = Wd / 2;
    if (L.style === "band") {
      x.fillStyle = L.accent; x.fillRect(0, 44, Wd, 62);
      x.fillStyle = L.bg; x.font = `700 24px ${sans}`; x.fillText(sub.toUpperCase(), cx, 76);
      x.fillStyle = L.ink; fitText(brand, `700 %px ${serif}`, 58, Wd - 70); x.fillText(brand, cx, 182);
      x.font = `600 26px ${sans}`; x.fillText(year, cx, 268);
    } else if (L.style === "minimal") {
      x.textAlign = "left";
      x.fillStyle = L.accent; x.fillRect(46, 52, 30, 30);
      x.fillStyle = L.ink; fitText(brand, `700 %px ${sans}`, 52, Wd - 92); x.fillText(brand, 46, 158);
      x.font = `400 25px ${sans}`; x.fillText(sub, 46, 208);
      x.fillStyle = L.accent; x.font = `600 25px ${sans}`; x.fillText(year, 46, 272);
    } else if (L.style === "crest") {
      x.strokeStyle = L.accent; x.lineWidth = 3;
      x.beginPath(); x.ellipse(cx, 124, 70, 78, 0, Math.PI, 0); x.stroke();
      x.fillStyle = L.accent; x.beginPath(); x.arc(cx, 84, 15, 0, 7); x.fill();
      x.fillStyle = L.ink; fitText(brand, `700 %px ${serif}`, 54, Wd - 60); x.fillText(brand, cx, 176);
      x.font = `italic 400 26px ${serif}`; x.fillText(sub, cx, 224);
      x.font = `600 23px ${sans}`; x.fillText(year, cx, 276);
    } else {
      x.strokeStyle = L.accent; x.lineWidth = 2.5; x.strokeRect(18, 18, Wd - 36, Hd - 36);
      x.fillStyle = L.ink; fitText(brand, `700 %px ${serif}`, 58, Wd - 76); x.fillText(brand, cx, 124);
      x.fillStyle = L.accent; x.fillRect(cx - 40, 164, 80, 2.5);
      x.fillStyle = L.ink; x.font = `400 25px ${sans}`; x.fillText(sub, cx, 204);
      x.font = `600 26px ${sans}`; x.fillText(year, cx, 266);
    }
    // Textura leve de papel
    const g = x.createLinearGradient(0, 0, Wd, 0);
    g.addColorStop(0, "rgba(0,0,0,.16)"); g.addColorStop(0.18, "rgba(0,0,0,0)"); g.addColorStop(0.82, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.16)");
    x.fillStyle = g; x.fillRect(0, 0, Wd, Hd);
  }

  function canvasTex(w, h, draw) {
    const cv = document.createElement("canvas"); cv.width = w; cv.height = h; draw(cv.getContext("2d"), w, h);
    const t = new THREE.CanvasTexture(cv); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; return t;
  }
  const woodTex = () => {
    const t = canvasTex(256, 256, (x, w, h) => {
      x.fillStyle = "#e9e2da"; x.fillRect(0, 0, w, h);
      let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      for (let i = 0; i < 150; i++) {
        const y = rnd() * h, a = 0.04 + rnd() * 0.13, amp = 1 + rnd() * 5, ph = rnd() * 6;
        x.strokeStyle = rnd() > 0.25 ? `rgba(60,36,20,${a})` : `rgba(255,255,255,${a})`; x.lineWidth = 0.6 + rnd() * 2;
        x.beginPath(); for (let px = 0; px <= w; px += 8) x.lineTo(px, y + Math.sin(px / 40 + ph) * amp); x.stroke();
      }
    });
    t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  };
  // Brilho no fundo: uma faixa de luz no alto de cada fileira, como um LED sob a prateleira.
  const glowTex = () => canvasTex(64, 512, (x, w, h) => {
    x.fillStyle = "#000"; x.fillRect(0, 0, w, h);
    for (let r = 0; r < ROWS; r++) {
      const y0 = (r / ROWS) * h, g = x.createLinearGradient(0, y0, 0, y0 + h / ROWS);
      g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.45, "rgba(255,255,255,.38)"); g.addColorStop(1, "rgba(255,255,255,.07)");
      x.fillStyle = g; x.fillRect(0, y0, w, h / ROWS);
    }
  });
  const shadowTex = () => canvasTex(128, 128, (x, w, h) => {
    const g = x.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(0,0,0,.85)"); g.addColorStop(0.55, "rgba(0,0,0,.3)"); g.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = g; x.fillRect(0, 0, w, h);
  });

  // Ambiente para os reflexos do vidro: céu em degradê e três "janelas" de luz.
  function envMap(renderer, th) {
    const T = THREE, s = new T.Scene();
    const sky = canvasTex(8, 128, (x, w, h) => { const g = x.createLinearGradient(0, h, 0, 0); th.sky.forEach((c, i) => g.addColorStop(i / (th.sky.length - 1), c)); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    s.add(new T.Mesh(new T.SphereGeometry(20, 24, 12), new T.MeshBasicMaterial({ map: sky, side: T.BackSide })));
    const box = (w, h, px, py, pz) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: th.box, side: T.DoubleSide })); m.position.set(px, py, pz); m.lookAt(0, 0, 0); s.add(m); };
    box(5, 9, -8, 5, 7); box(3, 8, 9, 3, 5); box(10, 2.5, 0, 11, 3);
    const p = new T.PMREMGenerator(renderer), tex = p.fromScene(s, 0.035).texture;
    p.dispose(); return tex;
  }

  function mount(container, opts) {
    if (!supported()) return null;
    const T = THREE;
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(30, 1, 0.1, 50);
    const hemi = new T.HemisphereLight(0xffffff, 0x000000, 0.4);
    const key = new T.SpotLight(0xffffff, 1, 16, 0.6, 0.7);
    key.position.set(1.2, 2.8, 3.6);
    const rim = new T.DirectionalLight(0xffffff, 0.3);
    rim.position.set(-2.4, -0.4, 2.2);
    scene.add(hemi, key, rim);

    const rack = new T.Group();
    scene.add(rack);
    key.target = rack;

    // ----- Estrutura do nicho -----
    const grain = woodTex();
    const wood = new T.MeshStandardMaterial({ map: grain, roughness: 0.62, metalness: 0.02 });
    const woodEdge = new T.MeshStandardMaterial({ map: grain, roughness: 0.7 });
    const brass = new T.MeshStandardMaterial({ roughness: 0.28, metalness: 1 });
    const backMat = new T.MeshStandardMaterial({ roughness: 0.9, emissiveMap: glowTex(), emissive: 0xffffff });
    const ledMat = new T.MeshBasicMaterial({ color: 0xffffff });
    const box = (w, h, d, mat, x, y, z) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); rack.add(m); return m; };
    const SIDE = 0.05, TOPH = 0.055, BASEH = 0.1;
    // Laterais, tampo e base (moldura grossa)
    box(SIDE, H + BOARD, DEPTH + 0.02, wood, -W / 2 - SIDE / 2, 0, 0);
    box(SIDE, H + BOARD, DEPTH + 0.02, wood, W / 2 + SIDE / 2, 0, 0);
    box(W + SIDE * 2 + 0.05, TOPH, DEPTH + 0.07, wood, 0, H / 2 + BOARD / 2 + TOPH / 2, 0.01);
    box(W + SIDE * 2 + 0.05, BASEH, DEPTH + 0.07, woodEdge, 0, -H / 2 - BOARD / 2 - BASEH / 2, 0.01);
    box(W + SIDE * 2 + 0.052, 0.008, 0.008, brass, 0, H / 2 + BOARD / 2 + 0.006, DEPTH / 2 + 0.046);
    box(W + SIDE * 2 + 0.052, 0.008, 0.008, brass, 0, -H / 2 - BOARD / 2 - 0.012, DEPTH / 2 + 0.046);
    // Prateleiras com filete de latão na frente e LED embaixo, no fundo
    for (let j = 0; j <= ROWS; j++) {
      const y = H / 2 - j * CELL;
      box(W, BOARD, DEPTH, wood, 0, y, 0);
      box(W, BOARD * 0.5, 0.006, brass, 0, y, DEPTH / 2 + 0.003);
      if (j < ROWS) box(W - 0.02, 0.006, 0.014, ledMat, 0, y - BOARD / 2 - 0.004, -DEPTH / 2 + 0.03);
    }
    // Divisórias finas e recuadas, para o rack parecer mais leve
    for (let i = 1; i < COLS; i++) box(0.012, H, DEPTH - 0.1, woodEdge, -W / 2 + i * CELL, 0, -0.05);
    const back = new T.Mesh(new T.PlaneGeometry(W, H), backMat);
    back.position.z = -DEPTH / 2 + 0.004;
    rack.add(back);
    const shadowMat = new T.MeshBasicMaterial({ map: shadowTex(), transparent: true, depthWrite: false });
    const shadow = new T.Mesh(new T.PlaneGeometry(W * 1.7, DEPTH * 3.4), shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -H / 2 - BOARD / 2 - BASEH - 0.002, 0.1);
    rack.add(shadow);

    // Véu entre o rack e a garrafa em destaque: o rack recua e só a garrafa fica em foco.
    const veilMat = new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });
    const veil = new T.Mesh(new T.PlaneGeometry(W * 4, H * 4), veilMat);
    veil.position.z = DEPTH / 2 + 0.3;
    veil.renderOrder = 0;
    rack.add(veil);

    const slotX = (c) => -W / 2 + (c + 0.5) * CELL;
    const cellFloor = (r) => H / 2 - (r + 1) * CELL + BOARD / 2;

    // ----- Garrafas -----
    const bottles = [], labelTex = {};
    let theme = THEMES.dark;
    function labelFor(w) {
      if (labelTex[w.id]) return labelTex[w.id];
      const cv = document.createElement("canvas"); cv.width = 400; cv.height = 320;
      drawLabel(cv, w);
      const t = new T.CanvasTexture(cv); t.encoding = T.sRGBEncoding; t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      t.userData = { cv, w };
      return (labelTex[w.id] = t);
    }
    document.fonts && document.fonts.ready.then(() => Object.values(labelTex).forEach(t => { drawLabel(t.userData.cv, t.userData.w); t.needsUpdate = true; }));

    const lum = (c) => 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
    function makeBottle(item) {
      const w = opts.wine(item.id), G = shapeGeo(w.shape);
      const g = new T.Group(), spin = new T.Group();
      g.add(spin);
      const glassColor = new T.Color(w.glass || "#1E2A22"), pale = lum(glassColor) > 0.3;
      const liquidColor = new T.Color(w.liquid || LIQUID[w.type] || LIQUID.tinto);
      // Vidro claro: quase transparente no meio e mais visível nas bordas (efeito Fresnel),
      // assim a garrafa some e o vinho aparece, mas o contorno continua legível.
      const glass = new T.MeshPhysicalMaterial({ color: pale ? glassColor.clone().lerp(new T.Color(0xffffff), 0.35) : glassColor.clone().multiplyScalar(1.25), roughness: 0.04, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03, transparent: true, depthWrite: false, envMapIntensity: 1.1 });
      glass.onBeforeCompile = (sh) => {
        sh.fragmentShader = sh.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
          "float fres = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 1.4); " +
          "gl_FragColor = vec4( mix(outgoingLight, outgoingLight * 0.55, fres), clamp(diffuseColor.a + fres * 0.7, 0.0, 0.92) );");
      };
      const liquid = new T.MeshStandardMaterial({ color: liquidColor, emissive: liquidColor, roughness: 0.42, metalness: 0, envMapIntensity: 0.3, transparent: true, side: T.DoubleSide });
      const label = new T.MeshStandardMaterial({ map: labelFor(w), roughness: 0.82, transparent: true, side: T.DoubleSide });
      const foil = new T.MeshStandardMaterial({ color: FOIL[w.type] || FOIL.tinto, roughness: 0.34, metalness: 0.85, transparent: true });
      const disc = new T.MeshStandardMaterial({ color: 0xc29a5b, roughness: 0.3, metalness: 1, transparent: true });
      const mk = (geo, mat, order) => { const m = new T.Mesh(geo, mat); m.renderOrder = order; spin.add(m); return m; };
      // Cada garrafa tem a própria cópia do vinho, porque a superfície se deforma quando balança.
      const wallGeo = G.wall.clone(), surfGeo = G.surf.clone();
      mk(wallGeo, liquid, 1); mk(surfGeo, liquid, 1); mk(G.label, label, 2); mk(G.foil, foil, 2); mk(G.disc, disc, 2); mk(G.glass, glass, 3);
      const home = new T.Vector3(slotX(item.c), cellFloor(item.r) + G.s.R, 0.01);
      const roll = Math.PI + (((item.r * 7 + item.c * 13) % 9) - 4) * 0.09;
      g.position.copy(home);
      g.rotation.order = "ZXY"; // a inclinação (z) acontece depois de a garrafa ficar de pé (x)
      spin.rotation.z = roll;
      const wave = { wall: wallGeo, surf: surfGeo, wallBase: wallGeo.attributes.position.array.slice(), surfBase: surfGeo.attributes.position.array.slice(), top: G.top, r: G.rTop, live: false };
      g.userData = { item, spin, home, roll, pale, glass, liquid, wave, mats: [[liquid, 1], [label, 1], [foil, 1], [disc, 1], [glass, 0]],
        sel: 0, tsel: 0, drop: 0, op: 1, ang: 0, angVel: 0, lean: 0, leanT: 0, slosh: 0, sloshVel: 0, ripple: 0, wasUp: false };
      rack.add(g);
      bottles.push(g);
      return g;
    }
    opts.items.forEach(makeBottle);

    // Espaços livres (modo de guardar)
    const slots = [];
    const ringGeo = new T.RingGeometry(0.058, 0.08, 40);
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const m = new T.Mesh(ringGeo, new T.MeshBasicMaterial({ color: 0xdeb77b, transparent: true, opacity: 0.9 }));
      m.position.set(slotX(c), H / 2 - (r + 0.5) * CELL, DEPTH / 2 + 0.008);
      m.visible = false;
      m.userData = { r, c };
      rack.add(m);
      slots.push(m);
    }
    const occupied = (r, c) => bottles.some(b => b.userData.item.r === r && b.userData.item.c === c);

    // ----- Tema -----
    const envs = {};
    function setTheme(dark) {
      const name = dark ? "dark" : "light";
      theme = THEMES[name];
      envs[name] = envs[name] || envMap(renderer, theme);
      scene.environment = envs[name];
      renderer.toneMappingExposure = theme.exposure;
      wood.color.setHex(theme.wood); woodEdge.color.setHex(theme.woodEdge); brass.color.setHex(theme.brass);
      backMat.color.setHex(theme.back); backMat.emissive.setHex(theme.glow); backMat.emissiveIntensity = theme.glowK;
      ledMat.color.setHex(theme.led);
      hemi.color.setHex(theme.hemi[0]); hemi.groundColor.setHex(theme.hemi[1]); hemi.intensity = theme.hemi[2];
      key.color.setHex(theme.key[0]); key.intensity = theme.key[1];
      rim.color.setHex(theme.rim[0]); rim.intensity = theme.rim[1];
      shadowMat.opacity = theme.shadow;
      veilMat.color.setHex(theme.veil);
      [wood, woodEdge, brass, backMat].forEach(m => (m.envMapIntensity = theme.env));
      slots.forEach(s => s.material.color.setHex(theme.ring));
      bottles.forEach(b => (b.userData.liquid.emissiveIntensity = theme.liquidGlow));
      if (!running) renderer.render(scene, camera);
    }

    // ----- Câmera e gesto -----
    let rotY = reduce ? -0.3 : -0.95, rotX = 0.1, tY = -0.3, tX = 0.1;
    function fit() {
      const w = container.clientWidth, h = container.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const vH = (H + 0.36) / 2 / Math.tan((camera.fov * Math.PI) / 360);
      const vW = (W + 0.4) / 2 / (Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
      camera.position.set(0, 0.04, Math.max(vH, vW) + DEPTH / 2);
      camera.lookAt(0, -0.02, 0);
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(fit);
    ro.observe(container);
    fit();

    const el = renderer.domElement;
    el.style.touchAction = "none";
    let down = null, moved = 0;
    el.addEventListener("pointerdown", (e) => { down = { x: e.clientX, y: e.clientY }; moved = 0; el.setPointerCapture(e.pointerId); });
    el.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      moved += Math.abs(dx) + Math.abs(dy);
      if (selected) {
        // Com uma garrafa em destaque, arrastar gira a garrafa (e o vinho reage), não o rack.
        const u = selected.userData;
        u.ang += dx * 0.014;
        u.angVel = dx * 0.9;
        u.leanT = Math.max(-0.22, Math.min(0.22, u.leanT - dx * 0.008));
      } else {
        tY = Math.max(-0.75, Math.min(0.75, tY + dx * 0.006));
        tX = Math.max(-0.2, Math.min(0.32, tX + dy * 0.004));
      }
      down = { x: e.clientX, y: e.clientY };
    });
    el.addEventListener("pointerup", (e) => { if (down && moved < 8) tap(e); down = null; });
    el.addEventListener("pointercancel", () => { down = null; });

    const ray = new T.Raycaster(), ndc = new T.Vector2();
    function tap(e) {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (placing) {
        const hit = ray.intersectObjects(slots.filter(s => s.visible))[0];
        if (hit) place(hit.object.userData.r, hit.object.userData.c);
        return;
      }
      const hit = ray.intersectObjects(bottles, true)[0];
      if (!hit) return select(null);
      let g = hit.object; while (g.parent !== rack) g = g.parent;
      select(selected === g ? null : g);
    }

    let selected = null;
    function select(g) {
      selected = g;
      bottles.forEach(b => (b.userData.tsel = b === g ? 1 : 0));
      // O rack vira de frente para a garrafa vir direto na direção de quem olha
      if (g) { tY = 0; tX = 0.04; Object.assign(g.userData, { ang: 0, angVel: 0, lean: 0, leanT: 0, wasUp: false }); }
      opts.onSelect && opts.onSelect(g ? g.userData.item : null);
    }

    let filter = () => true;
    function setFilter(fn) {
      filter = fn;
      bottles.forEach(b => (b.userData.ok = filter(b.userData.item)));
      if (selected && !filter(selected.userData.item)) select(null);
    }

    let placing = null;
    function startPlacing(wineId) {
      placing = wineId;
      select(null);
      slots.forEach(s => (s.visible = !occupied(s.userData.r, s.userData.c)));
      tX = 0.06; tY = -0.12;
    }
    function cancelPlacing() { placing = null; slots.forEach(s => (s.visible = false)); }
    function place(r, c) {
      const item = { id: placing, r, c, fresh: true };
      const g = makeBottle(item);
      g.userData.liquid.emissiveIntensity = theme.liquidGlow;
      g.userData.drop = reduce ? 0 : 0.9;
      cancelPlacing();
      opts.onPlace && opts.onPlace(item);
      setTimeout(() => select(g), reduce ? 0 : 520);
    }

    // ----- Animação: só roda com a adega visível -----
    const ease = (t) => t * t * (3 - 2 * t);
    const SHOW_Z = DEPTH / 2 + 0.85, SHOW_SCALE = 1.4;

    // Superfície do vinho: um plano que fica nivelado no mundo enquanto a garrafa inclina,
    // com uma mola (balanço que vai e volta) e ondinhas concêntricas.
    function shapeWave(u, tx, tz, t) {
      const W = u.wave, phi = u.spin.rotation.z;
      const a = tx * Math.cos(phi) - tz * Math.sin(phi), b = -tx * Math.sin(phi) - tz * Math.cos(phi);
      const amp = 0.006 * u.ripple;
      const pw = W.wall.attributes.position, pa = pw.array, wb = W.wallBase;
      for (let i = 0; i < pa.length; i += 3) if (Math.abs(wb[i + 2] - W.top) < 1e-5) pa[i + 2] = W.top + a * wb[i] + b * wb[i + 1];
      pw.needsUpdate = true;
      const ps = W.surf.attributes.position, sa = ps.array, sb = W.surfBase;
      for (let i = 0; i < sa.length; i += 3) {
        const x = sb[i], y = sb[i + 1], d = Math.hypot(x, y) / W.r;
        sa[i + 2] = W.top + a * x + b * y + amp * Math.sin(d * 9 - t * 7) * (1 - d * d);
      }
      ps.needsUpdate = true;
      W.surf.computeVertexNormals();
      W.live = true;
    }
    function flatWave(u) {
      const W = u.wave; if (!W.live) return;
      W.wall.attributes.position.array.set(W.wallBase); W.wall.attributes.position.needsUpdate = true;
      W.surf.attributes.position.array.set(W.surfBase); W.surf.attributes.position.needsUpdate = true;
      W.surf.computeVertexNormals(); W.live = false;
    }

    let raf = 0, running = false, t0 = performance.now();
    function frame(now) {
      const dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
      const k = reduce ? 1 : 1 - Math.pow(0.0008, dt);
      rotY += (tY - rotY) * (reduce ? 1 : 1 - Math.pow(0.02, dt));
      rotX += (tX - rotX) * k;
      rack.rotation.set(rotX, rotY, 0);
      const focus = bottles.reduce((m, b) => Math.max(m, b.userData.sel), 0);
      veilMat.opacity = 0.82 * focus; veil.visible = focus > 0.01;
      const pulse = 0.55 + 0.35 * Math.sin(now / 320);
      slots.forEach(s => s.visible && (s.material.opacity = reduce ? 0.9 : pulse));
      bottles.forEach(b => {
        const u = b.userData;
        u.sel += (u.tsel - u.sel) * (reduce ? 1 : 1 - Math.pow(0.003, dt));
        u.drop += (0 - u.drop) * k;
        // Primeiro sai do nicho (out), depois sobe e fica de pé (up)
        const out = ease(Math.min(1, u.sel * 1.8)), up = ease(Math.max(0, u.sel * 1.6 - 0.6));
        b.position.set(u.home.x * (1 - up), u.home.y + (0.0 - u.home.y) * up, u.home.z + SHOW_Z * out + u.drop);
        b.rotation.x = -Math.PI / 2 * up;
        b.scale.setScalar(1 + (SHOW_SCALE - 1) * up);

        // Giro com inércia e inclinação ao arrastar
        u.ang += u.angVel * dt; u.angVel *= Math.pow(0.04, dt);
        if (b === selected && !down && !reduce && Math.abs(u.angVel) < 0.05) u.ang += dt * 0.18; // gira devagar sozinha
        const prevLean = u.lean;
        u.leanT *= Math.pow(0.03, dt);
        u.lean += (u.leanT - u.lean) * (reduce ? 1 : 1 - Math.pow(0.002, dt));
        b.rotation.z = u.lean * up;
        u.spin.rotation.z = u.roll * (1 - up) + u.ang * up;

        // Vinho: mola subamortecida. A inclinação e a chegada da garrafa dão o empurrão.
        if (up > 0.02 && !reduce) {
          if (up > 0.95 && !u.wasUp) { u.wasUp = true; u.sloshVel += 1.6; }
          u.sloshVel += (-48 * u.slosh - 1.6 * u.sloshVel) * dt - (u.lean - prevLean) * 9;
          u.slosh += u.sloshVel * dt;
          u.ripple += (Math.min(1, Math.abs(u.sloshVel) * 0.5 + Math.abs(u.angVel) * 0.25) - u.ripple) * (1 - Math.pow(0.05, dt));
          const rel = Math.max(-0.5, Math.min(0.5, u.slosh - u.lean * up));
          shapeWave(u, Math.tan(rel), 0, now / 1000);
        } else if (up <= 0.02) { flatWave(u); u.slosh = u.sloshVel = 0; }

        // Foco: com uma garrafa em destaque, as outras ficam apagadas
        const want = u.ok === false ? 0.1 : selected && b !== selected ? 0.28 : 1;
        u.op += (want - u.op) * k;
        const gOp = b === selected ? theme.glassOp[u.pale ? 1 : 0] + (theme.glassSel - theme.glassOp[u.pale ? 1 : 0]) * up : theme.glassOp[u.pale ? 1 : 0];
        u.mats.forEach(([m, solid]) => { m.opacity = solid ? u.op : gOp * u.op; if (solid) m.depthWrite = u.op > 0.9; });
      });
      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(frame);
    }
    function resume() { if (running) return; running = true; t0 = performance.now(); fit(); raf = requestAnimationFrame(frame); }
    function pause() { running = false; cancelAnimationFrame(raf); }
    setTheme(opts.dark !== false);
    resume();

    function remove(item) {
      const i = bottles.findIndex(b => b.userData.item === item);
      if (i < 0) return;
      const g = bottles[i];
      if (selected === g) select(null);
      bottles.splice(i, 1);
      rack.remove(g);
    }

    return { remove, setFilter, setTheme, select: (item) => select(bottles.find(b => b.userData.item === item) || null), startPlacing, cancelPlacing, pause, resume, isPlacing: () => !!placing };
  }

  return { mount, supported, COLS, ROWS };
})();
