// Protótipo navegável do AVYN. Conteúdo fictício (data.js).
(() => {
  const D = window.AV_DATA, B = window.AV_BOTTLE, C3 = window.AV_CELLAR;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const app = $("#app"), tabbar = $("#tabbar"), authEl = $("#auth"), scanEl = $("#scan");
  const sheet = $("#sheet"), scrim = $("#scrim"), toastEl = $("#toast"), splash = $("#splash");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Formatação ----------
  const brl = (n) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (n) => `<span class="cur">R$</span>${brl(n)}`;
  const int = (n) => n.toLocaleString("pt-BR");
  const one = (n) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const icon = (id, cls = "") => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const bottle = (w, cls = "") => `<div class="bottle-img ${cls}">${B(w)}</div>`;
  // Preço que "rola" até o valor final (efeito de contador). Respeita quem pediu menos movimento.
  function rollPrices(root) {
    root.querySelectorAll("[data-roll]").forEach(el => {
      const end = +el.dataset.roll, from = end * 0.82, t0 = performance.now(), dur = 900;
      if (reduce) { el.textContent = brl(end); return; }
      const step = (now) => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4); el.textContent = brl(from + (end - from) * e); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
  const origin = (w) => [w.region, w.country].filter(Boolean).join(", ") || "Região não informada";
  const pct = (o) => Math.round((1 - o.price / o.old) * 100);
  const bestDeal = (w) => w.offers.filter(o => o.old).sort((a, b) => pct(b) - pct(a))[0];
  const stars = (r) => `<span class="stars" aria-hidden="true">${[1, 2, 3, 4, 5].map(i => `<svg class="${r >= i - 0.25 ? "" : "half"}"><use href="#i-star"/></svg>`).join("")}</span>`;
  const norm = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const typeVar = (t) => `var(--color-wine-type-${t})`;
  const plural = (n, a, b) => `${n} ${n === 1 ? a : b}`;

  function windowHTML(w, compact) {
    if (!w.window) return `<p class="nowin">Janela de consumo não informada</p>`;
    const [from, to, pf, pt] = w.window;
    const rf = Math.min(from - 2, Math.floor(D.TODAY)), rt = Math.max(to + 2, Math.ceil(D.TODAY) + 1);
    const P = (x) => ((x - rf) / (rt - rf)) * 100;
    const st = D.STATUS[D.status(w)];
    const label = `Janela de consumo de ${from} a ${to}, auge de ${pf} a ${pt}. Hoje: ${st.label.toLowerCase()}.`;
    const track = `<div class="track"${compact ? "" : ' style="margin-top:22px"'}><span class="range" style="left:${P(from)}%;right:${100 - P(to)}%"></span><span class="peak" style="left:${P(pf)}%;right:${100 - P(pt)}%"></span><span class="now" style="left:${P(D.TODAY)}%"${compact ? "" : ' data-label="Hoje"'}></span></div>`;
    if (compact) return `<div class="av-window av-window--compact" role="img" aria-label="${label}">${track}</div>`;
    return `<div class="av-window" role="img" aria-label="${label}">
      <div class="head"><span class="av-meta">${from} a ${to}, auge de ${pf} a ${pt}</span><span class="av-badge av-badge--${st.cls}">${st.label}</span></div>
      ${track}<div class="years"><span>${rf}</span><span>${Math.round((rf + rt) / 2)}</span><span>${rt}</span></div></div>`;
  }

  function wineRow(w, opts = {}) {
    const o = opts.offer || w.best;
    const deal = opts.offer ? (o.old ? o : null) : bestDeal(w);
    const side = opts.offer
      ? `<b>${money(o.price)}</b>${o.old ? `<s class="muted">${money(o.old)}</s>` : ""}`
      : `<b>${money(o.price)}</b><span>${opts.storeName ? "no " + D.stores[o.store].name : "em " + plural(w.offers.length, "loja", "lojas")}</span>`;
    return `<button type="button" class="wrow" data-go="wine" data-id="${w.id}">
      ${bottle(w)}
      <div><div class="name">${w.full}</div><div class="origin">${origin(w)}</div>
        <div class="rate">${stars(w.rating)}<b>${one(w.rating)}</b><span class="muted">(${int(w.reviews)})</span></div></div>
      <div class="aside">${side}${deal ? `<span class="av-badge av-badge--success">${icon("down")}${pct(deal)}%</span>` : ""}</div>
    </button>`;
  }

  // ---------- Telas ----------
  const GOOGLE = `<svg class="g-mark" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;
  const VIEWS = {};
  const TITLES = { bottle: "Garrafa", home: "Buscar", results: "Resultados", wine: "Vinho", ofertas: "Ofertas", store: "Loja", adega: "Adega", perfil: "Perfil", welcome: "Voltar", signup: "Criar conta", signin: "Entrar" };
  const backBtn = (label) => `<button type="button" class="back" data-back>${icon("chev-l")}${label}</button>`;

  VIEWS.welcome = () => ({
    cls: "welcome no-tabs", theme: "dark",
    html: `<div class="hero" aria-hidden="true">
        <div class="b b1">${B(D.byId["lune-blanche"], { shadow: false })}</div>
        <div class="b b2">${B(D.byId["sassoscuro"], { shadow: false })}</div>
        <div class="b b3">${B(D.byId["serrana-brut"], { shadow: false })}</div>
      </div>
      <div class="copy"><h1>O vinho certo, pelo menor preço.</h1>
        <p>Escaneie o rótulo, compare as lojas e saiba quando abrir cada garrafa da sua adega.</p></div>
      <div class="actions">
        <button type="button" class="av-btn av-btn--lg av-btn--block btn-google" data-action="auth-done" data-msg="Boas-vindas ao AVYN">${GOOGLE}Continuar com o Google</button>
        <button type="button" class="av-btn av-btn--lg av-btn--block btn-email" data-auth="signup">Criar conta com e-mail</button>
        <button type="button" class="av-btn av-btn--plain already" data-auth="signin">Já tenho conta</button>
      </div>
      <p class="legal">Ao continuar, você aceita os Termos de uso e a Política de privacidade.</p>`,
  });

  const field = (v, label, input, extra = "") => `<div class="f" data-f="${v}"><label for="f-${v}">${label}</label><div class="box">${input}</div>${extra}<p class="msg err" id="e-${v}" hidden></p></div>`;
  const authHead = (title, sub, google = true) => `<div class="navbar">${backBtn("Voltar")}<span></span></div>
      <div class="auth-head"><img src="../../assets/brand/logo/taca-lupa/simbolo-${isDark() ? "escuro" : "claro"}.svg" alt=""><h1>${title}</h1><p>${sub}</p></div>
      ${google ? `<button type="button" class="av-btn av-btn--lg av-btn--block btn-g" data-action="auth-done" data-msg="Boas-vindas ao AVYN">${GOOGLE}Continuar com o Google</button>
      <p class="or">ou com e-mail</p>` : ""}`;

  VIEWS.signup = () => ({
    cls: "no-tabs auth",
    html: `${authHead("Criar conta", "Sua adega e seus avisos ficam salvos na conta.", false)}
      <form novalidate data-auth-form>
      ${field("nome", "Nome", `<input id="f-nome" data-v="nome" autocomplete="given-name" placeholder="Como quer ser chamado" aria-describedby="e-nome">`)}
      ${field("email", "E-mail", `<input id="f-email" data-v="email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" placeholder="nome@exemplo.com" aria-describedby="e-email">`)}
      ${field("senha", "Senha", `<input id="f-senha" data-v="senha" type="password" autocomplete="new-password" aria-describedby="r-senha e-senha"><button type="button" class="eye" data-action="peek" aria-label="Mostrar senha">${icon("eye")}</button>`,
        `<p class="msg rule" id="r-senha">${icon("check")}Pelo menos 8 caracteres</p>`)}
      <div class="wa-card">
        <div class="row"><span class="ic">${icon("whatsapp")}</span><div><b>Avisos no WhatsApp</b><small>Quando o preço cair e quando uma garrafa da adega estiver no ponto.</small></div>
          <button type="button" class="switch" role="switch" aria-checked="false" aria-label="Receber avisos no WhatsApp" data-action="toggle-wa"></button></div>
        <div class="wa-phone" hidden>${field("tel", "Celular com DDD", `<input id="f-tel" data-v="tel" type="tel" autocomplete="tel-national" inputmode="tel" placeholder="(11) 90000-0000" aria-describedby="e-tel">`)}
          <p class="msg">Você escolhe os tipos de aviso no perfil e pode parar quando quiser.</p></div>
      </div>
      <button type="submit" class="av-btn av-btn--primary av-btn--lg av-btn--block cta" data-msg="Conta criada">Criar conta</button>
      </form>
      <p class="legal-s">Ao criar a conta, você aceita os Termos de uso e a Política de privacidade.</p>
      <p class="swap">Já tem conta? <button type="button" data-action="auth-swap" data-to="signin">Entrar</button></p>`,
  });

  VIEWS.signin = () => ({
    cls: "no-tabs auth",
    html: `${authHead("Entrar", "Use o e-mail e a senha da sua conta AVYN.")}
      <form novalidate data-auth-form>
      ${field("email", "E-mail", `<input id="f-email" data-v="email" type="email" autocomplete="username" inputmode="email" autocapitalize="off" placeholder="nome@exemplo.com" aria-describedby="e-email">`)}
      ${field("senha", "Senha", `<input id="f-senha" data-v="senha" type="password" autocomplete="current-password" aria-describedby="e-senha"><button type="button" class="eye" data-action="peek" aria-label="Mostrar senha">${icon("eye")}</button>`)}
      <button type="button" class="forgot" data-action="forgot">Esqueci minha senha</button>
      <button type="submit" class="av-btn av-btn--primary av-btn--lg av-btn--block cta" data-msg="Que bom te ver de novo">Entrar</button>
      </form>
      <p class="swap">Ainda não tem conta? <button type="button" data-action="auth-swap" data-to="signup">Criar conta</button></p>`,
  });

  const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  function checkField(scr, v, signup) {
    const f = $(`.f[data-f="${v}"]`, scr);
    if (!f || f.closest("[hidden]")) return "";
    const val = $("input", f).value.trim();
    const msg = v === "nome" ? (!val ? "Informe seu nome." : "")
      : v === "email" ? (!val ? "Informe seu e-mail." : !EMAIL.test(val) ? "Confira o e-mail. Ele precisa ter o formato nome@exemplo.com." : "")
      : v === "senha" ? (!val ? "Informe sua senha." : signup && val.length < 8 ? "A senha precisa ter pelo menos 8 caracteres." : "")
      : v === "tel" ? (val.replace(/\D/g, "").length < 10 ? "Informe o celular com DDD, ou desligue os avisos." : "") : "";
    f.classList.toggle("is-invalid", !!msg);
    $("input", f).setAttribute("aria-invalid", !!msg);
    const e = $(".msg.err", f); e.hidden = !msg; e.textContent = msg;
    return msg;
  }
  function submitAuth(form) {
    const scr = form.closest(".screen"), signup = scr.dataset.view === "signup";
    const bad = (signup ? ["nome", "email", "senha", "tel"] : ["email", "senha"]).filter(v => checkField(scr, v, signup));
    if (bad.length) { $(`#f-${bad[0]}`, scr).focus(); return; }
    finishAuth($("[type=submit]", form).dataset.msg);
  }
  function forgotSheet(email) {
    return `<div class="grabber"></div>
      <div class="sheet-nav"><button type="button" data-action="close-sheet">Cancelar</button><b>Nova senha</b><span style="width:62px"></span></div>
      <p class="manual-note">Enviamos um link para o seu e-mail. Por ele você cria uma senha nova.</p>
      <div class="auth-sheet">${field("reset", "E-mail", `<input id="f-reset" data-v="email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" value="${email.replace(/"/g, "&quot;")}" placeholder="nome@exemplo.com" autofocus aria-describedby="e-reset">`)}</div>
      <div class="sheet-actions"><button type="button" class="av-btn av-btn--primary av-btn--lg av-btn--block" data-action="forgot-send">Enviar link</button></div>`;
  }

  VIEWS.home = () => {
    const deals = D.wines.filter(bestDeal).sort((a, b) => pct(bestDeal(b)) - pct(bestDeal(a))).slice(0, 6);
    const popular = [...D.wines].sort((a, b) => b.reviews - a.reviews).slice(0, 3);
    return {
      html: `<h1 class="large-title">Buscar</h1>
        <div class="search-wrap"><label class="av-search">${icon("search")}<input type="search" data-search placeholder="Vinho, uva, produtor ou região" enterkeyhint="search"><button type="button" class="scan" data-action="scan" aria-label="Escanear rótulo">${icon("scan", "lg")}</button></label></div>
        <button type="button" class="scan-card" data-action="scan">
          <div class="txt"><div><h2>Aponte para o rótulo</h2><p>Em segundos você vê a nota, a loja mais barata e se já está na hora de abrir.</p></div><span class="go">${icon("scan")}Abrir câmera</span></div>
          <div class="viz" aria-hidden="true"><i></i><i></i><i></i><i></i>${bottle(D.byId["piedra-sola"])}</div>
        </button>
        <div class="section-title"><h2>Baixaram de preço</h2><button type="button" data-tab-go="ofertas">Ver ofertas</button></div>
        <div class="rail">${deals.map(w => { const d = bestDeal(w); return `<button type="button" class="deal" data-go="wine" data-id="${w.id}">
          <div class="shot"><span class="av-badge av-badge--success off">${icon("down")}${pct(d)}%</span>${bottle(w)}</div>
          <div class="n">${w.full}</div><div class="p"><b>${money(d.price)}</b><s>${money(d.old)}</s></div><div class="s"><em>${brl(d.old - d.price).replace(/,00$/, "")} a menos</em><br>${D.stores[d.store].name}</div></button>`; }).join("")}</div>
        <div class="section-title"><h2>Buscas recentes</h2></div>
        <div class="recent">${["Malbec", "Espumante brasileiro", "Douro", "Até R$ 100"].map(q => `<button type="button" class="av-chip" data-go="results" data-q="${q}">${q}</button>`).join("")}</div>
        <div class="section-title"><h2>Mais bem avaliados</h2></div>
        <div class="list">${popular.map(w => wineRow(w)).join("")}</div>`,
    };
  };

  VIEWS.results = (p) => {
    const state = { q: p.q || "", f: new Set() };
    if (/^até r\$ 100$/i.test(state.q)) { state.q = ""; state.f.add("100"); }
    const FILTERS = [["tinto", "Tinto"], ["branco", "Branco"], ["espumante", "Espumante"], ["100", "Até R$ 100"], ["Argentina", "Argentina"]];
    const list = () => {
      const q = norm(state.q);
      let ws = D.wines.filter(w => !q || norm([w.full, w.producer, w.grape, w.region, w.country, D.TYPES[w.type]].join(" ")).includes(q));
      state.f.forEach(f => { ws = ws.filter(w => f === "100" ? w.best.price <= 100 : f === "Argentina" ? w.country === f : w.type === f); });
      return ws.sort((a, b) => a.best.price - b.best.price);
    };
    const body = () => {
      const ws = list();
      const stores = new Set(ws.flatMap(w => w.offers.map(o => o.store))).size;
      if (!ws.length) return `<div class="av-empty"><img src="../../assets/brand/logo/taca-lupa/simbolo-${isDark() ? "escuro" : "claro"}.svg" alt=""><h2>Nenhum vinho para “${state.q}”</h2><p>Confira a grafia ou tente pela uva, pelo produtor ou pela região.</p><button type="button" class="av-btn av-btn--secondary" data-action="clear-filters">Limpar filtros</button></div>`;
      return `<p class="footnote pad" style="margin:2px 0 10px">${plural(ws.length, "vinho", "vinhos")}, preços de ${plural(stores, "loja", "lojas")}, menor preço primeiro</p><div class="list">${ws.map(w => wineRow(w)).join("")}</div>`;
    };
    return {
      html: `<div class="navbar">${backBtn(p.back)}<span></span></div>
        <div class="search-wrap"><label class="av-search">${icon("search")}<input type="search" data-search value="${state.q}" placeholder="Vinho, uva, produtor ou região" enterkeyhint="search"><button type="button" class="scan" data-action="scan" aria-label="Escanear rótulo">${icon("scan", "lg")}</button></label></div>
        <div class="av-chips pad" style="margin:12px 0">${FILTERS.map(([k, l]) => `<button type="button" class="av-chip" data-action="filter" data-f="${k}" aria-pressed="${state.f.has(k)}">${l}</button>`).join("")}</div>
        <div data-results>${body()}</div>`,
      state, body,
    };
  };

  VIEWS.wine = (p) => {
    const w = D.byId[p.id];
    if (w.custom) return {
      cls: "no-tabs",
      html: `<div class="wine-hero"><div class="navbar">${backBtn(p.back)}<span></span></div>${bottle(w)}</div>
        <div class="wine-head">${w.producer ? `<div class="producer">${w.producer}</div>` : ""}<h1>${w.full}</h1><div class="origin">${origin(w)}</div></div>
        <div class="facts"><span class="fact"><i class="dot" style="background:${typeVar(w.type)}"></i>${D.TYPES[w.type]}</span><span class="fact">Cadastrado por você</span></div>
        <p class="footnote pad" style="margin-top:18px">Este vinho não está no catálogo, então não mostramos preços, nota nem janela de consumo.</p>`,
    };
    const deal = bestDeal(w);
    return {
      cls: "no-tabs has-cta",
      html: `<div class="wine-hero" data-theme="dark">
          <div class="navbar">${backBtn(p.back)}<div class="acts"><button type="button" class="round" data-action="toast" data-msg="Alerta de preço é um recurso Premium." aria-label="Avisar quando o preço cair">${icon("bell")}</button><button type="button" class="round" data-action="toast" data-msg="Link do vinho copiado." aria-label="Compartilhar">${icon("share")}</button></div></div>
          ${bottle(w)}
        </div>
        <div class="wine-head"><div class="producer">${w.producer}</div><h1>${w.full}</h1><div class="origin">${origin(w)}</div></div>
        <div class="meta-line"><span class="score"><b>${one(w.rating)}</b>${stars(w.rating)}</span><span>${int(w.reviews)} avaliações</span><span><i class="dot" style="background:${typeVar(w.type)}"></i>${D.TYPES[w.type]}</span><span>${w.grape}</span></div>
        ${(() => { const top = Math.max(...w.offers.map(o => o.price)), save = deal ? deal.old - deal.price : top - w.best.price;
          return `<div class="price-hero"><small>Menor preço hoje, no ${D.stores[w.best.store].name}</small><div class="big"><span class="cur">R$</span><span data-roll="${w.best.price}">${brl(w.best.price)}</span></div>
          ${save > 0.5 ? `<p class="save">${icon("down")}R$ ${brl(save).replace(/,00$/, "")} a menos ${deal ? "que o preço anterior" : "que a loja mais cara"}</p>` : ""}</div>`; })()}
        <div class="section-title"><h2>Onde comprar mais barato</h2><span class="footnote">${plural(w.offers.length, "loja", "lojas")}</span></div>
        <div class="price-table">${w.offers.map((o, i) => { const s = D.stores[o.store]; return `<button type="button" class="offer${i === 0 ? " is-best" : ""}" style="width:100%;border:0;text-align:left;cursor:pointer;background-color:${i === 0 ? "" : "transparent"}" data-action="toast" data-msg="Abriria a página da ${s.name} no Safari.">
            <span class="mono" style="background:${s.color}">${s.mono}</span>
            <span class="who"><b>${s.name}</b><span>${s.ship}, ${s.eta}</span></span>
            <span class="pr"><b>${money(o.price)}</b>${i === 0 ? `<span class="av-badge av-badge--best">Melhor preço</span>` : o.old ? `<s>${money(o.old)}</s>` : ""}</span></button>`; }).join("")}</div>
        <p class="table-foot">Preços de hoje, às 9h. O frete aparece ao lado, mas a ordem é só pelo preço da garrafa.</p>
        <button type="button" class="link-row pad-row" data-action="toast" data-msg="Alerta de preço é um recurso Premium.">${icon("bell")}Me avise quando baixar de preço${icon("chev-r")}</button>
        <div class="section-title"><h2>Quando abrir</h2></div>
        <div class="window-card">${windowHTML(w)}</div>
        <div class="sticky-cta"><div class="p"><small>${deal ? `Caiu ${pct(deal)}%` : "Menor preço"}</small><b>${money(w.best.price)}</b></div><button type="button" class="av-btn av-btn--primary av-btn--lg" data-action="add" data-id="${w.id}">${icon("plus")}Adicionar à adega</button></div>`,
    };
  };

  const storeDeals = (id) => D.wines.flatMap(w => w.offers.filter(o => o.store === id && o.old).map(o => ({ w, o }))).sort((a, b) => pct(b.o) - pct(a.o));

  VIEWS.ofertas = () => {
    const state = { mode: "lojas", f: "todas" };
    const stores = () => Object.keys(D.stores).map(id => ({ id, s: D.stores[id], deals: storeDeals(id) }))
      .filter(x => x.deals.length && (state.f === "todas" || (state.f === "perto" ? x.s.eta.startsWith("a ") : x.s.ship === "Frete grátis")))
      .sort((a, b) => b.deals.length - a.deals.length || pct(b.deals[0].o) - pct(a.deals[0].o));
    const body = () => {
      if (state.mode === "vinhos") {
        const all = D.wines.map(w => ({ w, d: bestDeal(w) })).filter(x => x.d && (state.f === "todas" || (state.f === "perto" ? D.stores[x.d.store].eta.startsWith("a ") : D.stores[x.d.store].ship === "Frete grátis"))).sort((a, b) => pct(b.d) - pct(a.d));
        return `<div class="list">${all.map(x => wineRow(x.w, { offer: x.d })).join("")}</div>`;
      }
      return stores().map(({ id, s, deals }) => `<div class="store-card">
          <button type="button" class="top" data-go="store" data-id="${id}"><span class="mono" style="background:${s.color}">${s.mono}</span>
            <span><b>${s.name}</b><span>${plural(deals.length, "vinho com desconto", "vinhos com desconto")}, até ${pct(deals[0].o)}%</span><br><span>${s.ship}, ${s.eta}</span></span>${icon("chev-r", "chev")}</button>
          <div class="strip">${deals.map(({ w, o }) => `<button type="button" class="mini" data-go="wine" data-id="${w.id}"><div class="shot"><span class="av-badge av-badge--success">${pct(o)}%</span>${bottle(w)}</div><b>${money(o.price)}</b> <s>${money(o.old)}</s><span>${w.name}</span></button>`).join("")}</div>
        </div>`).join("") || `<p class="footnote pad">Nenhuma loja com esse filtro hoje.</p>`;
    };
    return {
      html: `<h1 class="large-title">Ofertas</h1>
        <div class="segmented" role="group" aria-label="Agrupar ofertas"><button type="button" data-action="offer-mode" data-m="lojas" aria-pressed="true">Por loja</button><button type="button" data-action="offer-mode" data-m="vinhos" aria-pressed="false">Por vinho</button></div>
        <div class="av-chips pad" style="margin:12px 0 6px">${[["todas", "Todas as lojas"], ["perto", "Retirar perto de mim"], ["frete", "Frete grátis"]].map(([k, l], i) => `<button type="button" class="av-chip" data-action="offer-filter" data-f="${k}" aria-pressed="${i === 0}">${k === "perto" ? icon("pin") : k === "frete" ? icon("truck") : ""}${l}</button>`).join("")}</div>
        <p class="footnote pad" style="margin:0 0 14px">Desconto sobre o preço anterior da própria loja. Atualizado hoje às 9h.</p>
        <div data-offers>${body()}</div>`,
      state, body,
    };
  };

  VIEWS.store = (p) => {
    const s = D.stores[p.id], deals = storeDeals(p.id);
    return {
      cls: "no-tabs",
      html: `<div class="navbar">${backBtn(p.back)}<span></span></div>
        <div class="store-head"><span class="mono" style="background:${s.color}">${s.mono}</span><div><h1>${s.name}</h1><p>${s.kind}</p></div></div>
        <div class="store-facts"><div><b>${deals.length}</b><span>com desconto</span></div><div><b>${pct(deals[0].o)}%</b><span>maior desconto</span></div><div><b>${s.ship.replace("Frete ", "").replace("Retirar hoje", "Retirada")}</b><span>${s.ship.startsWith("Frete") ? "frete" : s.eta}</span></div></div>
        <div class="pad" style="margin-top:14px"><button type="button" class="av-btn av-btn--secondary av-btn--block" data-action="toast" data-msg="Abriria o site da ${s.name} no Safari.">Abrir site da loja</button></div>
        <div class="section-title"><h2>Em promoção</h2></div>
        <div class="list">${deals.map(({ w, o }) => wineRow(w, { offer: o })).join("")}</div>`,
    };
  };

  // ---------- Adega ----------
  const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const fakeAdded = (id) => { const h = [...id].reduce((n, ch) => n + ch.charCodeAt(0), 0), m = 10 - (4 + (h % 26)); const y = 2026 + Math.floor(m / 12), mm = ((m % 12) + 12) % 12; return { y: m < 0 ? 2026 + Math.floor(m / 12) : y, m: mm }; };
  let cellar = D.cellar.map(x => ({ ...x, added: fakeAdded(x.id) }));
  const notes = {};
  let lastSel = null;
  let cellarApi = null, cellarView = null, placing = null;
  const CELLAR_FILTERS = [["todas", "Todas"], ["ponto", "No ponto"], ["logo", "Beber logo"], ["guardar", "Guardar"]];

  VIEWS.adega = () => ({
    cls: "cellar", theme: "dark", // a adega é sempre escura, nos dois modos
    html: `<div class="head"><h1 class="large-title">Adega</h1><button type="button" class="round" data-action="cellar-mode" aria-label="Ver em lista">${icon("list")}</button></div>
      <div class="sum" data-sum></div>
      <div class="controls"><div class="av-chips" data-cellar-chips></div></div>
      <div class="rack" data-rack><div class="placing" hidden data-placing></div><p class="hint" data-hint>Arraste para girar a adega</p></div>
      <div class="detail is-empty" data-detail>Toque numa garrafa para saber se ela já está pronta para abrir.</div>
      <div class="list cellar-list" data-cellar-list></div>`,
    mount(el) {
      cellarView = el;
      refreshCellar();
      const rack = $("[data-rack]", el);
      cellarApi = C3.mount(rack, { items: cellar.filter(x => x.r >= 0), wine: (id) => D.byId[id], onSelect: showBottle, onPlace: placed, dark: true });
      if (!cellarApi) {
        rack.insertAdjacentHTML("beforeend", `<p class="fallback">Este navegador não mostra a adega em 3D. Use a lista.</p>`);
        el.classList.add("mode-list");
      }
    },
  });

  let cellarFilter = "todas";
  function refreshCellar() {
    if (!cellarView) return;
    const counts = { todas: cellar.length, ponto: 0, logo: 0, guardar: 0, passou: 0, sem: 0 };
    cellar.forEach(x => counts[D.status(D.byId[x.id])]++);
    $("[data-sum]", cellarView).innerHTML = `<span><b>${counts.todas}</b> garrafas</span><span class="ok"><b>${counts.ponto}</b> no ponto</span><span class="warn"><b>${counts.logo}</b> beber logo</span>`;
    $("[data-cellar-chips]", cellarView).innerHTML = CELLAR_FILTERS.map(([k, l]) => `<button type="button" class="av-chip" data-action="cellar-filter" data-f="${k}" aria-pressed="${cellarFilter === k}">${l}<span class="count">${counts[k]}</span></button>`).join("");
    const groups = {};
    cellar.filter(x => cellarFilter === "todas" || D.status(D.byId[x.id]) === cellarFilter).forEach(x => (groups[x.id] = (groups[x.id] || 0) + 1));
    const order = { logo: 0, ponto: 1, guardar: 2, passou: 3, sem: 4 };
    $("[data-cellar-list]", cellarView).innerHTML = Object.entries(groups).sort((a, b) => order[D.status(D.byId[a[0]])] - order[D.status(D.byId[b[0]])]).map(([id, n]) => {
      const w = D.byId[id], st = D.STATUS[D.status(w)];
      return `<button type="button" class="wrow" data-go="bottle" data-id="${id}">${bottle(w)}<div><div class="name">${w.full}</div><div class="origin">${w.region ? w.region + ", " : ""}<b style="color:${D.status(w) === "sem" ? "var(--color-label-secondary)" : `var(--color-status-${st.cls === "neutral" ? "success" : st.cls})`};font-weight:600">${st.label.toLowerCase()}</b></div>${windowHTML(w, true)}</div><div class="aside"><b>×${n}</b></div></button>`;
    }).join("");
  }

  function showBottle(item) {
    lastSel = item;
    const d = $("[data-detail]", cellarView);
    $("[data-hint]", cellarView).textContent = item ? "Arraste para girar a garrafa. Toque fora para guardar." : "Arraste para girar a adega";
    if (!item) { d.className = "detail is-empty"; d.innerHTML = "Toque numa garrafa para ver quando abrir."; return; }
    const w = D.byId[item.id], st = D.STATUS[D.status(w)];
    const same = cellar.filter(x => x.id === item.id).length;
    d.className = "detail";
    d.innerHTML = `${bottle(w)}<div><div class="nm">${w.full}</div><div class="og">${w.region ? w.region + ", " : ""}fileira ${item.r + 1}. ${plural(same, "garrafa", "garrafas")} na adega.</div>${windowHTML(w, true)}
      <div class="row"><span class="av-badge av-badge--${st.cls}">${st.label}</span><button type="button" class="av-btn av-btn--sm av-btn--secondary" data-go="bottle" data-id="${w.id}" data-r="${item.r}" data-c="${item.c}">Ver detalhes</button></div></div>`;
  }

  function startPlacing(id, qty) {
    placing = { id, left: qty };
    const free = C3.COLS * C3.ROWS - cellar.filter(x => x.r >= 0).length;
    if (!cellarApi || free < 1) { addUnplaced(); return; }
    cellarFilter = "todas"; refreshCellar(); cellarApi.setFilter(() => true);
    cellarView.classList.remove("mode-list");
    banner();
    cellarApi.startPlacing(id);
  }
  function banner() {
    const b = $("[data-placing]", cellarView), w = D.byId[placing.id];
    b.hidden = false;
    b.innerHTML = `<span>Toque num espaço livre para guardar <b>${w.name}</b>${placing.left > 1 ? ` (faltam ${placing.left})` : ""}.</span><button type="button" data-action="cancel-placing">Cancelar</button>`;
  }
  function placed(item) {
    item.added = "hoje";
    cellar.push(item);
    placing.left--;
    refreshCellar();
    if (placing.left > 0 && C3.COLS * C3.ROWS > cellar.filter(x => x.r >= 0).length) { banner(); setTimeout(() => cellarApi.startPlacing(placing.id), reduce ? 0 : 450); return; }
    if (placing.left > 0) return addUnplaced();
    $("[data-placing]", cellarView).hidden = true;
    haptic();
    toast(`Guardado na fileira ${item.r + 1} da adega`);
    placing = null;
  }
  function addUnplaced() {
    for (let i = 0; i < placing.left; i++) cellar.push({ id: placing.id, r: -1, c: -1, added: "hoje" });
    toast(placing.left > 1 ? `${placing.left} garrafas adicionadas à lista da adega` : "Adicionada à lista da adega");
    placing = null;
    if (cellarView) { $("[data-placing]", cellarView).hidden = true; refreshCellar(); }
  }

  const andList = (xs) => xs.length < 2 ? xs.join("") : xs.slice(0, -1).join(", ") + " e " + xs[xs.length - 1];
  const fmtAdded = (a) => a === "hoje" ? "hoje" : `${MONTHS[a.m]} de ${a.y}`;
  const paidOf = (w) => w.custom ? null : Math.round((w.best.old || w.best.price * 1.06) * 0.97) - 0.1;
  function whereText(its) {
    const rows = {};
    its.filter(x => x.r >= 0).forEach(x => (rows[x.r] = rows[x.r] || []).push(x.c + 1));
    const parts = Object.keys(rows).sort((a, b) => a - b).map(r => { const cs = rows[r].sort((a, b) => a - b); return `Fileira ${+r + 1}, ${cs.length > 1 ? "espaços" : "espaço"} ${andList(cs.map(String))}`; });
    const loose = its.filter(x => x.r < 0).length;
    if (loose) parts.push(`${loose} sem lugar no rack`);
    return parts.join("<br>");
  }
  function bottleBody(p) {
    const w = D.byId[p.id], its = cellar.filter(x => x.id === p.id), st = D.STATUS[D.status(w)];
    const placedIts = its.filter(x => x.r >= 0);
    const oldest = its.map(x => x.added).filter(a => a !== "hoje").sort((a, b) => a.y - b.y || a.m - b.m)[0] || "hoje";
    const paid = paidOf(w);
    const prop = (ic, k, v) => `<div class="prop">${icon(ic)}<span class="k">${k}</span><div class="v">${v}</div></div>`;
    const state = D.status(w) === "sem" ? `<p class="footnote" style="margin:0">Janela de consumo não informada. Vinhos cadastrados por você não têm essa informação.</p>`
      : windowHTML(w);
    return `<div class="section-title"><h2>Quando abrir</h2></div>
      <div class="window-card">${state}</div>
      <div class="section-title"><h2>Na sua adega</h2></div>
      <div class="props">
        ${prop("rack", "Garrafas", `${its.length}`)}
        ${prop("pin", "Onde está", `${whereText(its)}${placedIts.length ? `<button type="button" data-action="see-rack" data-id="${w.id}">Ver no rack</button>` : ""}`)}
        ${prop("calendar", "Na adega desde", fmtAdded(oldest))}
        ${prop("wallet", "Preço pago", paid ? `${money(paid)} <small>por garrafa</small>` : `<span class="muted">Não informado</span>`)}
        ${prop("tag", "Menor preço hoje", w.custom ? `<span class="muted">Fora do catálogo</span>` : `${money(w.best.price)} <small>no ${D.stores[w.best.store].name}</small>`)}
      </div>
      <div class="section-title"><h2>Anotação</h2></div>
      <div class="pad"><textarea class="note" data-note="${w.id}" rows="3" placeholder="Ex.: presente de aniversário, abrir com o pessoal da confraria" aria-label="Anotação sobre este vinho">${(notes[w.id] || "").replace(/</g, "&lt;")}</textarea></div>
      ${w.custom ? "" : `<div class="pad"><button type="button" class="link-row" data-go="wine" data-id="${w.id}">Ver preços e avaliações do vinho${icon("chev-r")}</button></div>`}
      <div class="sticky-cta"><div class="p"><small>${st.label}</small><b>${plural(its.length, "garrafa", "garrafas")}</b></div><button type="button" class="av-btn av-btn--primary av-btn--lg" data-action="open-bottle" data-id="${w.id}">Abrir uma garrafa</button></div>`;
  }
  VIEWS.bottle = (p) => {
    const w = D.byId[p.id];
    return {
      cls: "no-tabs has-cta", theme: "dark",
      html: `<div class="wine-hero" data-theme="dark">
          <div class="navbar">${backBtn(p.back)}<div class="acts"><button type="button" class="round" data-action="toast" data-msg="Editar a garrafa ainda não está no protótipo." aria-label="Editar">${icon("edit")}</button></div></div>
          ${bottle(w)}
        </div>
        <div class="wine-head">${w.producer ? `<div class="producer">${w.producer}</div>` : ""}<h1>${w.full}</h1><div class="origin">${origin(w)}</div></div>
        <div class="facts"><span class="fact"><i class="dot" style="background:${typeVar(w.type)}"></i>${D.TYPES[w.type]}</span>${w.grape ? `<span class="fact">${w.grape}</span>` : ""}${w.custom ? `<span class="fact">Cadastrado por você</span>` : ""}</div>
        <div data-bottle-body>${bottleBody(p)}</div>`,
    };
  };
  function pickOpen(p) {
    const its = cellar.filter(x => x.id === p.id);
    return its.find(x => x.r === +p.r && x.c === +p.c) || its.find(x => x.r < 0) || its[its.length - 1];
  }
  function openBottle(p) {
    const item = pickOpen(p);
    if (!item) return;
    cellar.splice(cellar.indexOf(item), 1);
    if (item.r >= 0 && cellarApi) cellarApi.remove(item);
    refreshCellar();
    if (cellarView) showBottle(lastSel && cellar.includes(lastSel) ? lastSel : null);
    const left = cellar.filter(x => x.id === p.id).length;
    haptic();
    toast(left ? `Garrafa aberta. ${plural(left, "fica", "ficam")} ${left} na adega.` : "Garrafa aberta. Era a última deste vinho.");
    const scr = top(active());
    if (!left) { pop(); return; }
    if (scr && scr.dataset.view === "bottle") { scr._p.r = undefined; $("[data-bottle-body]", scr).innerHTML = bottleBody(scr._p); }
  }
  function setCellarList(list) {
    cellarView.classList.toggle("mode-list", list);
    const b = $("[data-action=cellar-mode]", cellarView);
    b.setAttribute("aria-label", list ? "Ver rack em 3D" : "Ver em lista");
    b.innerHTML = icon(list ? "rack" : "list");
  }

  VIEWS.perfil = () => ({
    html: `<h1 class="large-title">Perfil</h1>
      <div class="me"><span class="avatar">MC</span><div><b>Marina Costa</b><span>marina@exemplo.com</span></div></div>
      <div class="premium"><b>AVYN Premium</b><p>Alertas de preço no app e no WhatsApp, análise da adega e busca em lojas de outros países.</p><button type="button" class="av-btn av-btn--primary av-btn--sm" style="justify-self:start" data-action="toast" data-msg="Os planos ainda não têm preço definido.">Conhecer o Premium</button></div>
      <p class="group-label">Avisos no WhatsApp</p>
      <div class="cells">
        <div class="switch-row"><div>Receber avisos<small>Para o número terminado em 4321</small></div><button type="button" class="switch" role="switch" aria-checked="true" aria-label="Receber avisos no WhatsApp" data-action="switch"></button></div>
        <div class="switch-row"><div>Garrafas no ponto<small>Quando uma garrafa da adega entra ou sai da janela</small></div><button type="button" class="switch" role="switch" aria-checked="true" aria-label="Garrafas no ponto" data-action="switch"></button></div>
        <div class="switch-row"><div>Promoções da semana<small>Uma mensagem por semana</small></div><button type="button" class="switch" role="switch" aria-checked="false" aria-label="Promoções da semana" data-action="switch"></button></div>
        <div class="switch-row"><div>Preço caiu <span class="av-badge av-badge--best">Premium</span><small>Vinhos que você acompanha</small></div><button type="button" class="switch" role="switch" aria-checked="false" aria-label="Preço caiu" data-action="toast" data-msg="Alerta de preço é um recurso Premium."></button></div>
      </div>
      <p class="group-label">Conta</p>
      <div class="cells">
        <button type="button" class="cell" data-action="toast" data-msg="A aparência segue o iPhone. Teste no seletor ao lado do aparelho.">Aparência<span class="v">Sistema</span></button>
        <button type="button" class="cell" data-action="toast" data-msg="Exportaria a adega em planilha.">Exportar adega<span class="v">CSV</span></button>
        <button type="button" class="cell danger" data-action="logout">Sair</button>
      </div>`,
  });

  // ---------- Navegação ----------
  const ROOT = { buscar: "home", ofertas: "ofertas", adega: "adega", perfil: "perfil" };
  const TABBAR_ON = new Set(["home", "results", "ofertas", "adega", "perfil"]);
  const stacks = { auth: [], buscar: [], ofertas: [], adega: [], perfil: [] };
  let current = "buscar";
  const holder = (tab) => (tab === "auth" ? authEl : $(`.tabview[data-tab="${tab}"]`));
  const top = (tab) => stacks[tab][stacks[tab].length - 1];
  const active = () => (stacks.auth.length ? "auth" : current);
  const titleOf = (el) => (el ? (el.dataset.view === "store" ? D.stores[el._p.id].name : TITLES[el.dataset.view]) : "");

  function build(name, params = {}) {
    const v = VIEWS[name](params);
    const el = document.createElement("section");
    el.className = "screen " + (v.cls || "");
    el.dataset.view = name;
    if (v.theme) el.dataset.theme = v.theme;
    el.innerHTML = (/cellar|welcome/.test(v.cls || "") ? "" : '<div class="statusfill"></div>') + v.html;
    el._v = v; el._p = params;
    el.classList.add("enter");
    setTimeout(() => el.classList.remove("enter"), 1200);
    requestAnimationFrame(() => rollPrices(el));
    return el;
  }
  function ensureRoot(tab) {
    if (stacks[tab].length) return;
    const el = build(ROOT[tab]);
    holder(tab).appendChild(el);
    stacks[tab].push(el);
    el._v.mount && el._v.mount(el);
  }
  function showTab(tab) {
    if (current === "adega" && tab !== "adega" && cellarApi) cellarApi.pause();
    current = tab;
    $$(".tabview").forEach(t => (t.hidden = t.dataset.tab !== tab));
    ensureRoot(tab);
    $$("[data-tab-go]", tabbar).forEach(b => (b.dataset.tabGo === tab ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current")));
    if (tab === "adega" && cellarApi) cellarApi.resume();
    chrome();
  }
  function push(name, params = {}, tab = active()) {
    params.back = params.back || titleOf(top(tab)) || "Voltar";
    const el = build(name, params), prev = top(tab);
    el.classList.add("is-entering");
    holder(tab).appendChild(el);
    stacks[tab].push(el);
    el._v.mount && el._v.mount(el);
    requestAnimationFrame(() => requestAnimationFrame(() => { el.classList.remove("is-entering"); prev && prev.classList.add("is-behind"); }));
    if (tab === "adega" && cellarApi) cellarApi.pause();
    chrome();
  }
  function pop(tab = active()) {
    const s = stacks[tab];
    if (s.length < 2) return;
    const el = s.pop(), prev = top(tab);
    el.classList.add("is-leaving");
    prev.classList.remove("is-behind");
    setTimeout(() => el.remove(), reduce ? 230 : 480);
    if (tab === "adega" && s.length === 1 && cellarApi) cellarApi.resume();
    chrome();
  }
  function popToRoot(tab) { while (stacks[tab].length > 1) stacks[tab].pop().remove(); stacks[tab][0] && stacks[tab][0].classList.remove("is-behind"); if (tab === "adega" && cellarApi && current === "adega") cellarApi.resume(); }

  function isDark() {
    const t = document.documentElement.dataset.theme;
    return t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function chrome() {
    const authOpen = stacks.auth.length > 0, scanOpen = !scanEl.classList.contains("is-hidden");
    const v = top(active()), name = v && v.dataset.view;
    tabbar.classList.toggle("is-hidden", authOpen || scanOpen || !TABBAR_ON.has(name));
    if (!authOpen && name === "adega") tabbar.dataset.theme = "dark"; else delete tabbar.dataset.theme;
    app.classList.toggle("status-light", !splash.hidden || scanOpen || (v && v.dataset.theme === "dark") || isDark());
  }

  function openAuth(name = "welcome") {
    closeSheet(); closeScan(true);
    stacks.auth.forEach(el => el.remove());
    stacks.auth = [];
    const el = build(name, { back: "Voltar" });
    authEl.appendChild(el);
    stacks.auth.push(el);
    chrome();
  }
  function finishAuth(msg) {
    const els = stacks.auth.splice(0);
    els.forEach(el => { el.style.transition = "opacity 320ms"; el.style.opacity = "0"; });
    setTimeout(() => els.forEach(el => el.remove()), 340);
    showTab("buscar");
    popToRoot("buscar");
    if (msg) setTimeout(() => toast(msg), 250);
  }

  // ---------- Escanear ----------
  let scanTimers = [];
  function openScan() {
    closeSheet();
    const subject = D.byId["cerro-azul"];
    scanEl.innerHTML = `<div class="cam" aria-hidden="true">
        <div class="ghost" style="left:-70px">${B(D.byId["altos-uco"], { shadow: false })}</div>
        <div class="ghost" style="right:-70px">${B(D.byId["lua-cheia"], { shadow: false })}</div>
        <div class="subject">${B(subject, { shadow: false })}</div>
        <div class="shelf" style="top:684px"></div>
      </div>
      <div class="top"><button type="button" data-action="scan-close" aria-label="Fechar">${icon("x", "lg")}</button><button type="button" data-action="toast" data-msg="Flash ligado" aria-label="Flash">${icon("flash", "lg")}</button></div>
      <div class="hint"><b data-scan-hint>Aponte para o rótulo</b></div>
      <div class="frame" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="bottom">
        <div class="modes" role="group" aria-label="O que escanear"><button type="button" data-action="scan-mode" data-m="rotulo" aria-pressed="true">Rótulo</button><button type="button" data-action="scan-mode" data-m="codigo" aria-pressed="false">Código de barras</button></div>
        <div class="controls"><button type="button" class="side" data-action="shoot"><span class="ico">${icon("image", "lg")}</span>Galeria</button><button type="button" class="shutter" data-action="shoot" aria-label="Fotografar rótulo"><span></span></button><button type="button" class="side" data-action="manual" aria-label="Adicionar sem escanear, digitando o nome"><span class="ico">${icon("edit", "lg")}</span>Digitar</button></div>
      </div>`;
    scanEl.classList.remove("is-hidden", "is-focused", "is-locked");
    chrome();
    autoScan();
  }
  let scanMode = "rotulo";
  function autoScan() {
    clearScanTimers();
    const h = $("[data-scan-hint]", scanEl); if (h) h.textContent = scanMode === "codigo" ? "Aponte para o código de barras" : "Aponte para o rótulo";
    scanEl.classList.remove("is-focused", "is-locked");
    scanTimers.push(setTimeout(() => scanEl.classList.add("is-focused"), reduce ? 0 : 700));
    scanTimers.push(setTimeout(recognize, reduce ? 900 : 2400));
  }
  function recognize() {
    clearScanTimers();
    scanEl.classList.add("is-focused", "is-locked");
    const h = $("[data-scan-hint]", scanEl); if (h) h.textContent = "Rótulo reconhecido";
    haptic();
    scanTimers.push(setTimeout(() => openSheet(matchSheet(D.byId["cerro-azul"]), true), reduce ? 0 : 550));
  }
  function clearScanTimers() { scanTimers.forEach(clearTimeout); scanTimers = []; }
  function closeScan(silent) {
    clearScanTimers();
    if (scanEl.classList.contains("is-hidden")) return;
    scanEl.classList.add("is-hidden");
    setTimeout(() => { if (scanEl.classList.contains("is-hidden")) scanEl.innerHTML = ""; }, 450);
    if (!silent) chrome();
  }

  function matchSheet(w) {
    const deal = bestDeal(w);
    return `<div class="grabber"></div>
      <div class="match">${bottle(w)}<div><span class="found">${icon("check")}Encontramos este vinho</span><h2>${w.full}</h2><p>${w.producer}<br>${origin(w)}</p><div class="rate">${stars(w.rating)}<b>${one(w.rating)}</b><span class="muted">${int(w.reviews)} avaliações</span></div></div></div>
      <div class="sheet-price"><div><small>Menor preço hoje</small><b>${money(w.best.price)}</b><small>no ${D.stores[w.best.store].name}, entre ${plural(w.offers.length, "loja", "lojas")}</small></div>${deal ? `<span class="av-badge av-badge--success">${icon("down")}${pct(deal)}%</span>` : ""}</div>
      <div class="sheet-actions">
        <button type="button" class="av-btn av-btn--primary av-btn--lg av-btn--block" data-action="add" data-id="${w.id}">${icon("plus")}Adicionar à adega</button>
        <button type="button" class="av-btn av-btn--secondary av-btn--lg av-btn--block" data-action="scan-details" data-id="${w.id}">Ver preços e detalhes</button>
        <button type="button" class="av-btn av-btn--plain" data-action="manual" data-from="wrong">Não é este vinho</button>
      </div>`;
  }

  function pickRow(w) {
    return `<button type="button" class="wrow" data-action="add" data-id="${w.id}">${bottle(w)}<div><div class="name">${w.full}</div><div class="origin">${origin(w)}</div></div><span class="aside add">${icon("plus")}</span></button>`;
  }
  function manualResults(q, from) {
    const n = norm(q.trim());
    let title, ws;
    if (!n) {
      const read = D.byId["cerro-azul"];
      if (from === "wrong") { title = "Parecidos com o que o scanner leu"; ws = D.wines.filter(w => w !== read && (w.grape === read.grape || w.country === read.country)); }
      else { title = "Mais buscados"; ws = [...D.wines].sort((a, b) => b.reviews - a.reviews).slice(0, 4); }
    } else {
      ws = D.wines.filter(w => norm([w.full, w.producer, w.grape, w.region, w.country].join(" ")).includes(n));
      title = ws.length ? plural(ws.length, "vinho no catálogo", "vinhos no catálogo") : "";
    }
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const list = ws.length ? `<p class="sheet-label">${title}</p><div class="list in-sheet">${ws.map(pickRow).join("")}</div>`
      : `<p class="manual-empty">Nenhum vinho do catálogo com “${esc(q.trim())}”.</p>`;
    return `${list}<button type="button" class="manual-new" data-action="custom-wine">${icon("plus")}<span><b>Não encontrou? Cadastrar vinho</b><small>Você preenche nome, produtor e safra.</small></span></button>`;
  }
  function manualSheet(from) {
    return `<div class="grabber"></div>
      <div class="sheet-nav"><button type="button" data-action="close-sheet">Cancelar</button><b>Adicionar vinho</b><span style="width:62px"></span></div>
      ${from === "wrong" ? `<p class="manual-note">O scanner pode ter lido o rótulo errado. Procure o vinho pelo nome ou <button type="button" data-action="scan-retry">escaneie de novo</button>.</p>` : ""}
      <label class="av-search">${icon("search")}<input type="search" data-manual-q autofocus autocomplete="off" placeholder="Nome, produtor ou uva" enterkeyhint="search" aria-label="Buscar vinho pelo nome"></label>
      <div data-manual-results>${manualResults("", from)}</div>`;
  }
  const CUSTOM_TYPES = ["tinto", "branco", "rose", "espumante", "fortificado"];
  function customSheet(q) {
    return `<div class="grabber"></div>
      <div class="sheet-nav"><button type="button" data-action="manual" data-from="${sheet.dataset.from || ""}">${icon("chev-l")}Voltar</button><b>Cadastrar vinho</b><span style="width:62px"></span></div>
      <p class="manual-note">O vinho fica só na sua adega. Como não está no catálogo, ele não tem preços nem nota.</p>
      <div class="field in-sheet">
        <label><span>Nome</span><input name="c-nome" value="${q.replace(/"/g, "&quot;")}" placeholder="Obrigatório" autocomplete="off"></label>
        <label><span>Produtor</span><input name="c-prod" placeholder="Vinícola" autocomplete="off"></label>
        <label><span>Safra</span><input name="c-safra" inputmode="numeric" maxlength="4" placeholder="Ex.: 2021" autocomplete="off"></label>
        <label><span>Região</span><input name="c-reg" placeholder="Ex.: Serra Gaúcha" autocomplete="off"></label>
      </div>
      <p class="sheet-label">Tipo</p>
      <div class="av-chips">${CUSTOM_TYPES.map((t, i) => `<button type="button" class="av-chip" data-action="custom-type" data-t="${t}" aria-pressed="${i === 0}">${D.TYPES[t]}</button>`).join("")}</div>
      <p class="inline-error" hidden></p>
      <div class="sheet-actions"><button type="button" class="av-btn av-btn--primary av-btn--lg av-btn--block" data-action="custom-save">Continuar</button></div>`;
  }
  let customN = 0;
  function saveCustom() {
    const v = (n) => $(`input[name=${n}]`, sheet).value.trim();
    const name = v("c-nome"), safra = v("c-safra"), err = $(".inline-error", sheet);
    const msg = !name ? "Informe o nome do vinho." : safra && !(/^\d{4}$/.test(safra) && +safra >= 1900 && +safra <= 2026) ? "A safra precisa ter 4 dígitos, como 2021." : "";
    err.hidden = !msg; err.textContent = msg;
    if (msg) return null;
    const type = $("[data-action=custom-type][aria-pressed=true]", sheet).dataset.t;
    const tpl = D.wines.find(x => x.type === type) || D.wines[0];
    const w = { id: `meu-${++customN}`, custom: true, name, vintage: safra ? +safra : null, producer: v("c-prod"), region: v("c-reg"), country: "", type, grape: "",
      shape: tpl.shape, glass: tpl.glass, liquid: tpl.liquid, label: { bg: "#F8F3EC", ink: "#16110F", accent: "#7E2236", style: "minimal" }, window: null, offers: [], best: null };
    w.full = w.vintage ? `${name} ${w.vintage}` : name;
    D.byId[w.id] = w;
    return w;
  }

  function addSheet(w) {
    return `<div class="grabber"></div>
      <div class="sheet-nav"><button type="button" data-action="close-sheet">Cancelar</button><b>Adicionar à adega</b><span style="width:62px"></span></div>
      <div class="match" style="grid-template-columns:52px 1fr;align-items:center">${bottle(w)}<div><h2 style="font-size:19px;line-height:24px">${w.full}</h2><p>${origin(w)}</p></div></div>
      <p class="group-label" style="margin-left:14px">Quantidade</p>
      <div class="qty-row"><span>Garrafas</span><output data-qty>1</output>
        <div class="av-stepper" role="group" aria-label="Quantidade de garrafas"><button type="button" data-action="qty" data-d="-1" aria-label="Menos uma garrafa" disabled>${icon("minus")}</button><button type="button" data-action="qty" data-d="1" aria-label="Mais uma garrafa">${icon("plus")}</button></div></div>
      <p class="group-label" style="margin-left:14px">Onde guardar</p>
      <div class="choice" role="radiogroup">
        <button type="button" role="radio" aria-checked="true" data-action="where" data-w="rack"><span>Escolher um lugar no rack<small>Você toca no espaço livre da adega em 3D.</small></span>${icon("check", "tick")}</button>
        <button type="button" role="radio" aria-checked="false" data-action="where" data-w="lista"><span>Sem lugar definido<small>A garrafa fica só na lista da adega.</small></span>${icon("check", "tick")}</button>
      </div>
      <div class="sheet-actions"><button type="button" class="av-btn av-btn--primary av-btn--lg av-btn--block" data-action="confirm-add" data-id="${w.id}">Adicionar</button></div>`;
  }

  // ---------- Sheet e toast ----------
  function openSheet(html, dark, tall) {
    sheet.innerHTML = html;
    sheet.classList.toggle("is-tall", !!tall);
    if (dark || isDark()) sheet.dataset.theme = "dark"; else delete sheet.dataset.theme;
    scrim.classList.add("is-open");
    sheet.classList.add("is-open");
    setTimeout(() => { const f = sheet.querySelector("[autofocus]") || sheet.querySelector("button"); f && f.focus({ preventScroll: true }); }, 50);
  }
  function closeSheet() { sheet.classList.remove("is-open"); scrim.classList.remove("is-open"); }
  let toastT = 0;
  function toast(msg) {
    toastEl.innerHTML = `<div class="av-toast"${isDark() || (top(active()) && top(active()).dataset.theme === "dark") ? ' data-theme="dark"' : ""}>${icon("check", "av-toast-ok")}<span>${msg}</span></div>`;
    toastEl.classList.add("is-open");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("is-open"), 2800);
  }
  function haptic() { try { navigator.vibrate && navigator.vibrate(12); } catch (e) {} }

  // ---------- Abertura ----------
  function runSplash() {
    closeSheet(); closeScan(true);
    splash.hidden = false;
    splash.classList.remove("is-done");
    splash.innerHTML = `<svg viewBox="-72 -72 198 198" role="img" aria-label="AVYN"><g transform="rotate(-45)" fill="none" stroke="#F8F3EC" stroke-width="26" stroke-linecap="round"><path d="M 53.47 7.52 A 54 54 0 0 1 -53.47 7.52"/><path d="M 0 54 V 124 M -30 124 H 30"/><path d="M -44.77 -30.2 A 54 54 0 0 1 44.77 -30.2"/><path class="wine" d="M -31.81 12 H 31.81 A 34 34 0 0 1 -31.81 12 Z" fill="#B4475B" stroke="none"/></g></svg>`;
    openAuth("welcome");
    chrome();
    setTimeout(() => { splash.classList.add("is-done"); setTimeout(() => { splash.hidden = true; chrome(); }, 430); }, reduce ? 700 : 1900);
  }

  // ---------- Eventos ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-go], [data-back]");
    if (!t) return;
    if (t.matches("[data-jump]")) return jump(t.dataset.jump);
    if (t.matches("[data-appearance]")) return appearance(t.dataset.appearance);
    if (t.matches("[data-tab-go]")) {
      const tab = t.dataset.tabGo;
      if (tab === current && stacks[tab].length > 1) { popToRoot(tab); chrome(); } else showTab(tab);
      return;
    }
    if (t.matches("[data-back]")) return pop();
    if (t.matches("[data-auth]")) return push(t.dataset.auth, { back: "Voltar" }, "auth");
    if (t.matches("[data-go]")) {
      if (sheet.classList.contains("is-open")) closeSheet();
      return push(t.dataset.go, { id: t.dataset.id, q: t.dataset.q, r: t.dataset.r, c: t.dataset.c });
    }
    const a = t.dataset.action;
    if (!a) return;
    const scr = t.closest(".screen");
    switch (a) {
      case "toast": toast(t.dataset.msg); break;
      case "scan": openScan(); break;
      case "scan-close": closeScan(); break;
      case "shoot": recognize(); break;
      case "scan-retry": closeSheet(); autoScan(); break;
      case "manual": {
        clearScanTimers();
        scanEl.classList.remove("is-focused", "is-locked");
        { const h = $("[data-scan-hint]", scanEl); if (h) h.textContent = scanMode === "codigo" ? "Aponte para o código de barras" : "Aponte para o rótulo"; }
        const from = t.dataset.from || "";
        openSheet(manualSheet(from), !scanEl.classList.contains("is-hidden") || isDark(), true);
        sheet.dataset.from = from;
        break;
      }
      case "custom-wine": openSheet(customSheet(($("[data-manual-q]", sheet) || {}).value || ""), !!sheet.dataset.theme, true); break;
      case "custom-type": $$("[data-action=custom-type]", sheet).forEach(b => b.setAttribute("aria-pressed", b === t)); break;
      case "custom-save": { const w = saveCustom(); if (w) openSheet(addSheet(w), !!sheet.dataset.theme); break; }
      case "scan-mode":
        scanMode = t.dataset.m;
        $$("[data-action=scan-mode]", scanEl).forEach(b => b.setAttribute("aria-pressed", b === t));
        autoScan(); break;
      case "scan-details":
        closeSheet(); closeScan(); showTab("buscar"); popToRoot("buscar");
        setTimeout(() => push("wine", { id: t.dataset.id }, "buscar"), 120); break;
      case "add": openSheet(addSheet(D.byId[t.dataset.id]), !scanEl.classList.contains("is-hidden")); break;
      case "close-sheet": closeSheet(); if (!scanEl.classList.contains("is-hidden")) autoScan(); break;
      case "qty": {
        const out = $("[data-qty]", sheet), n = Math.max(1, Math.min(6, Number(out.textContent) + Number(t.dataset.d)));
        out.textContent = n;
        $$("[data-action=qty]", sheet).forEach(b => (b.disabled = (b.dataset.d === "-1" && n === 1) || (b.dataset.d === "1" && n === 6)));
        break;
      }
      case "where": $$("[data-action=where]", sheet).forEach(b => b.setAttribute("aria-checked", b === t)); break;
      case "confirm-add": {
        const id = t.dataset.id, qty = Number($("[data-qty]", sheet).textContent);
        const rack = $("[data-action=where][aria-checked=true]", sheet).dataset.w === "rack";
        closeSheet(); closeScan(true);
        showTab("adega"); popToRoot("adega"); chrome();
        placing = { id, left: qty };
        setTimeout(() => (rack ? startPlacing(id, qty) : addUnplaced()), 200);
        break;
      }
      case "cancel-placing": cellarApi && cellarApi.cancelPlacing(); addUnplaced(); break;
      case "cellar-filter":
        cellarFilter = t.dataset.f; refreshCellar();
        cellarApi && cellarApi.setFilter((item) => cellarFilter === "todas" || D.status(D.byId[item.id]) === cellarFilter);
        break;
      case "cellar-mode": {
        const list = !cellarView.classList.contains("mode-list");
        setCellarList(list);
        if (!list && cellarApi) cellarApi.resume();
        break;
      }
      case "open-bottle": {
        const w = D.byId[t.dataset.id], n = cellar.filter(x => x.id === w.id).length;
        openSheet(`<div class="grabber"></div><div class="confirm"><h2>Abrir uma garrafa?</h2><p>Uma garrafa de ${w.full} sai da adega.${n > 1 ? ` Ficam ${n - 1}.` : " Era a última."}</p></div>
          <div class="sheet-actions"><button type="button" class="av-btn av-btn--primary av-btn--lg av-btn--block" data-action="confirm-open">Abrir garrafa</button><button type="button" class="av-btn av-btn--plain" data-action="close-sheet">Cancelar</button></div>`, true);
        break;
      }
      case "confirm-open": closeSheet(); openBottle(top(active())._p); break;
      case "see-rack": {
        const p = scr._p, item = cellar.find(x => x.id === p.id && x.r === +p.r && x.c === +p.c) || cellar.find(x => x.id === p.id && x.r >= 0);
        while (stacks.adega.length > 1) pop("adega");
        if (cellarApi) { setCellarList(false); cellarFilter = "todas"; refreshCellar(); cellarApi.setFilter(() => true); setTimeout(() => cellarApi.select(item), reduce ? 0 : 420); }
        break;
      }
      case "auth-swap": {
        const old = stacks.auth.pop(), el = build(t.dataset.to);
        el.classList.add("fade-in");
        authEl.appendChild(el); stacks.auth.push(el); old.remove();
        break;
      }
      case "forgot": openSheet(forgotSheet($("#f-email", scr).value.trim()), isDark(), false); break;
      case "forgot-send": {
        const f = $(".f", sheet), val = $("input", f).value.trim(), msg = !EMAIL.test(val) ? "Confira o e-mail. Ele precisa ter o formato nome@exemplo.com." : "";
        f.classList.toggle("is-invalid", !!msg); $(".msg.err", f).hidden = !msg; $(".msg.err", f).textContent = msg;
        if (msg) { $("input", f).focus(); break; }
        sheet.innerHTML = `<div class="grabber"></div><div class="confirm sent">${icon("check")}<h2>Link enviado</h2><p>Mandamos o link para ${val.replace(/</g, "&lt;")}. Ele vale por 1 hora. Se não chegar, confira a caixa de spam.</p></div>
          <div class="sheet-actions"><button type="button" class="av-btn av-btn--primary av-btn--lg av-btn--block" data-action="close-sheet">OK</button></div>`;
        break;
      }
      case "filter": {
        const v = scr._v, f = t.dataset.f;
        v.state.f.has(f) ? v.state.f.delete(f) : v.state.f.add(f);
        t.setAttribute("aria-pressed", v.state.f.has(f));
        $("[data-results]", scr).innerHTML = v.body();
        break;
      }
      case "clear-filters": {
        const v = scr._v; v.state.f.clear(); v.state.q = "";
        $("[data-search]", scr).value = "";
        $$("[data-action=filter]", scr).forEach(b => b.setAttribute("aria-pressed", "false"));
        $("[data-results]", scr).innerHTML = v.body();
        break;
      }
      case "offer-mode": case "offer-filter": {
        const v = scr._v;
        if (a === "offer-mode") v.state.mode = t.dataset.m; else v.state.f = t.dataset.f;
        $$(`[data-action=${a}]`, scr).forEach(b => b.setAttribute("aria-pressed", b === t));
        $("[data-offers]", scr).innerHTML = v.body();
        break;
      }
      case "toggle-wa": {
        const on = t.getAttribute("aria-checked") !== "true";
        t.setAttribute("aria-checked", on);
        $(".wa-phone", scr).hidden = !on;
        if (on) setTimeout(() => $("#f-tel", scr).focus(), 50);
        break;
      }
      case "switch": t.setAttribute("aria-checked", t.getAttribute("aria-checked") !== "true"); break;
      case "peek": {
        const i = t.parentElement.querySelector("input");
        i.type = i.type === "password" ? "text" : "password";
        t.setAttribute("aria-label", i.type === "password" ? "Mostrar senha" : "Esconder senha");
        break;
      }
      case "auth-done": finishAuth(t.dataset.msg); break;
      case "logout": openAuth("welcome"); break;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.matches("[data-search]")) {
      const q = e.target.value.trim();
      if (!q) return;
      const scr = e.target.closest(".screen");
      if (scr.dataset.view === "results") { scr._v.state.q = q; $("[data-results]", scr).innerHTML = scr._v.body(); }
      else push("results", { q });
      e.target.blur();
    }
    if (e.key === "Escape") { if (sheet.classList.contains("is-open")) closeSheet(); else if (!scanEl.classList.contains("is-hidden")) closeScan(); }
  });
  scrim.addEventListener("click", () => { closeSheet(); if (!scanEl.classList.contains("is-hidden")) autoScan(); });
  document.addEventListener("submit", (e) => { if (e.target.matches("[data-auth-form]")) { e.preventDefault(); submitAuth(e.target); } });
  document.addEventListener("input", (e) => {
    const el = e.target;
    if (el.matches("[data-note]")) notes[el.dataset.note] = el.value;
    if (el.matches("[data-v=tel]")) {
      const d = el.value.replace(/\D/g, "").slice(0, 11);
      el.value = d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}` : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
    }
    const f = el.closest && el.closest(".f");
    if (f && f.classList.contains("is-invalid")) { f.classList.remove("is-invalid"); el.removeAttribute("aria-invalid"); $(".msg.err", f).hidden = true; }
    if (el.matches("#f-senha") && el.closest(".screen").dataset.view === "signup") $("#r-senha", el.closest(".screen")).classList.toggle("ok", el.value.length >= 8);
    if (e.target.matches("[data-manual-q]")) $("[data-manual-results]", sheet).innerHTML = manualResults(e.target.value, sheet.dataset.from);
  });
  document.addEventListener("scroll", (e) => { const s = e.target; if (s.classList && s.classList.contains("screen")) s.classList.toggle("is-scrolled", s.scrollTop > 6); }, true);

  // ---------- Atalhos e aparência ----------
  function jump(where) {
    if (where === "splash") return runSplash();
    if (where === "welcome") return openAuth("welcome");
    if (stacks.auth.length) finishAuth();
    closeSheet(); closeScan(true);
    if (where === "scan") { showTab("buscar"); popToRoot("buscar"); return openScan(); }
    showTab(where); popToRoot(where); chrome();
  }
  const store = { get() { try { return localStorage.getItem("avyn-proto-theme"); } catch (e) { return null; } }, set(v) { try { localStorage.setItem("avyn-proto-theme", v); } catch (e) {} } };
  function appearance(mode) {
    if (mode === "system") delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = mode;
    $$("[data-appearance]").forEach(b => b.setAttribute("aria-pressed", b.dataset.appearance === mode));
    store.set(mode);
    chrome();
  }
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", chrome);

  appearance(store.get() || "system");
  showTab("buscar");
  runSplash();
})();
