// Adega em 3D (three.js r128). Rack de madeira escura; cada garrafa deitada mostra a cápsula,
// como numa adega real. Arrastar gira; tocar puxa a garrafa para fora.
window.AV_CELLAR = (() => {
  const COLS = 6, ROWS = 5, CELL = 0.27, DEPTH = 0.62, BOARD = 0.022;
  const W = COLS * CELL, H = ROWS * CELL;
  const FOIL = { tinto: 0x5c1828, branco: 0xc29a5b, espumante: 0xd8b273, rose: 0xe7b9b3, fortificado: 0x2a1e16, laranja: 0xb4703a };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function supported() {
    try { const c = document.createElement("canvas"); return !!(window.THREE && (c.getContext("webgl2") || c.getContext("webgl"))); } catch (e) { return false; }
  }

  function bottleGeometry() {
    const p = [[0, 0], [0.096, 0], [0.1, 0.012], [0.1, 0.4], [0.096, 0.43], [0.076, 0.475], [0.046, 0.515], [0.035, 0.545], [0.033, 0.655], [0.037, 0.66], [0.037, 0.69], [0.031, 0.695], [0, 0.695]];
    const g = new THREE.LatheGeometry(p.map(([r, y]) => new THREE.Vector2(r, y)), 36);
    g.rotateX(Math.PI / 2);
    g.translate(0, 0, -0.3);
    return g;
  }

  function mount(container, opts) {
    if (!supported()) return null;
    const T = THREE;
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(30, 1, 0.1, 50);
    scene.add(new T.HemisphereLight(0xfff1dd, 0x1a1210, 0.42));
    const spot = new T.SpotLight(0xffe2b8, 1.45, 14, 0.55, 0.6);
    spot.position.set(1.0, 2.6, 3.4);
    scene.add(spot);
    const rim = new T.DirectionalLight(0xc29a5b, 0.45);
    rim.position.set(-2.4, -0.6, 2.2);
    scene.add(rim);

    const rack = new T.Group();
    scene.add(rack);
    spot.target = rack;

    // Estrutura
    const wood = new T.MeshStandardMaterial({ color: 0x1b110b, roughness: 0.74, metalness: 0.04 });
    const woodDark = new T.MeshStandardMaterial({ color: 0x0c0806, roughness: 0.95 });
    for (let i = 0; i <= COLS; i++) {
      const m = new T.Mesh(new T.BoxGeometry(BOARD, H + BOARD, DEPTH), wood);
      m.position.set(-W / 2 + i * CELL, 0, 0);
      rack.add(m);
    }
    for (let j = 0; j <= ROWS; j++) {
      const m = new T.Mesh(new T.BoxGeometry(W + BOARD, BOARD, DEPTH), wood);
      m.position.set(0, H / 2 - j * CELL, 0);
      rack.add(m);
    }
    const back = new T.Mesh(new T.BoxGeometry(W, H, 0.01), woodDark);
    back.position.z = -DEPTH / 2;
    rack.add(back);
    const top = new T.Mesh(new T.BoxGeometry(W + 0.08, 0.05, DEPTH + 0.04), wood);
    top.position.y = H / 2 + 0.036;
    rack.add(top);
    const base = new T.Mesh(new T.BoxGeometry(W + 0.08, 0.09, DEPTH + 0.04), wood);
    base.position.y = -H / 2 - 0.056;
    rack.add(base);

    const geo = bottleGeometry();
    const capGeo = new T.CylinderGeometry(0.039, 0.039, 0.15, 28);
    capGeo.rotateX(Math.PI / 2);
    const discGeo = new T.CircleGeometry(0.024, 24);
    const slotX = (c) => -W / 2 + (c + 0.5) * CELL;
    const slotY = (r) => H / 2 - (r + 0.5) * CELL - (CELL / 2 - 0.1 - BOARD / 2);

    const bottles = [];
    function makeBottle(item) {
      const w = opts.wine(item.id);
      const g = new T.Group();
      const glassColor = new T.Color(w.glass);
      const glass = new T.MeshStandardMaterial({ color: glassColor, roughness: 0.16, metalness: 0.3, transparent: true, opacity: 1 });
      const foil = new T.MeshStandardMaterial({ color: FOIL[w.type] || FOIL.tinto, roughness: 0.32, metalness: 0.75, transparent: true, opacity: 1, emissive: 0x000000 });
      const disc = new T.MeshStandardMaterial({ color: 0xc29a5b, roughness: 0.4, metalness: 0.8, transparent: true, opacity: 1 });
      const body = new T.Mesh(geo, glass);
      const cap = new T.Mesh(capGeo, foil);
      cap.position.z = 0.32;
      const top = new T.Mesh(discGeo, disc);
      top.position.z = 0.3955;
      g.add(body, cap, top);
      g.position.set(slotX(item.c), slotY(item.r), 0);
      g.rotation.z = (item.r * 7 + item.c * 13) % 10 * 0.3;
      g.userData = { item, mats: [glass, foil, disc], z: 0, tz: 0, op: 1, top: 1 };
      rack.add(g);
      bottles.push(g);
      return g;
    }
    opts.items.forEach(makeBottle);

    // Espaços livres (modo de guardar)
    const slots = [];
    const ringGeo = new T.RingGeometry(0.06, 0.082, 40);
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const m = new T.Mesh(ringGeo, new T.MeshBasicMaterial({ color: 0xdeb77b, transparent: true, opacity: 0.9 }));
      m.position.set(slotX(c), H / 2 - (r + 0.5) * CELL, DEPTH / 2 + 0.005);
      m.visible = false;
      m.userData = { r, c };
      rack.add(m);
      slots.push(m);
    }
    const occupied = (r, c) => bottles.some(b => b.userData.item.r === r && b.userData.item.c === c);

    // Câmera e gesto
    let rotY = reduce ? -0.32 : -0.95, rotX = 0.1, tY = -0.32, tX = 0.1;
    function fit() {
      const w = container.clientWidth, h = container.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const vH = (H + 0.2) / 2 / Math.tan((camera.fov * Math.PI) / 360);
      const vW = (W + 0.28) / 2 / (Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
      camera.position.set(0, 0.05, Math.max(vH, vW) + DEPTH / 2);
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
      tY = Math.max(-0.75, Math.min(0.75, tY + dx * 0.006));
      tX = Math.max(-0.2, Math.min(0.32, tX + dy * 0.004));
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
      bottles.forEach(b => (b.userData.tz = b === g ? 0.3 : 0));
      opts.onSelect && opts.onSelect(g ? g.userData.item : null);
    }

    let filter = () => true;
    function setFilter(fn) {
      filter = fn;
      bottles.forEach(b => (b.userData.top = filter(b.userData.item) ? 1 : 0.16));
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
      g.userData.z = reduce ? 0 : 0.9;
      g.position.z = g.userData.z;
      cancelPlacing();
      opts.onPlace && opts.onPlace(item);
      setTimeout(() => select(g), reduce ? 0 : 520);
    }

    // Laço de animação: só roda com a adega visível
    let raf = 0, running = false, t0 = performance.now();
    function frame(now) {
      const dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
      const k = reduce ? 1 : 1 - Math.pow(0.0008, dt);
      rotY += (tY - rotY) * (reduce ? 1 : 1 - Math.pow(0.02, dt));
      rotX += (tX - rotX) * k;
      rack.rotation.set(rotX, rotY, 0);
      const pulse = 0.55 + 0.35 * Math.sin(now / 320);
      slots.forEach(s => s.visible && (s.material.opacity = reduce ? 0.9 : pulse));
      bottles.forEach(b => {
        const u = b.userData;
        u.z += (u.tz - u.z) * k; b.position.z = u.z;
        u.op += (u.top - u.op) * k;
        u.mats.forEach(m => { m.opacity = u.op; m.depthWrite = u.op > 0.9; });
        u.mats[1].emissive.setHex(b === selected ? 0x3a2410 : 0x000000);
      });
      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(frame);
    }
    function resume() { if (running) return; running = true; t0 = performance.now(); fit(); raf = requestAnimationFrame(frame); }
    function pause() { running = false; cancelAnimationFrame(raf); }
    resume();

    function remove(item) {
      const i = bottles.findIndex(b => b.userData.item === item);
      if (i < 0) return;
      const g = bottles[i];
      if (selected === g) select(null);
      bottles.splice(i, 1);
      rack.remove(g);
    }

    return { remove, setFilter, select: (item) => select(bottles.find(b => b.userData.item === item) || null), startPlacing, cancelPlacing, pause, resume, isPlacing: () => !!placing };
  }

  return { mount, supported, COLS, ROWS };
})();
