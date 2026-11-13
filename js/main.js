/* FORNO & FARINA — oddiy JavaScript (kutubxonasiz). */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const t = (key, ...args) => (window.FF_I18N ? window.FF_I18N.t(key, ...args) : key);
  const fmtLocale = () => ({ en: "en-IE", ru: "ru-RU", uz: "uz-UZ" }[window.FF_I18N ? window.FF_I18N.getLang() : "en"] || "en-IE");
  const fmt = (n) => new Intl.NumberFormat(fmtLocale(), { style: "currency", currency: "EUR" }).format(n);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;

  /* ---------- Toast ---------- */
  const toastBox = $("#toasts");
  function toast(msg, opts = {}) {
    const el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    const text = document.createElement("div");
    text.textContent = msg;
    if (opts.desc) {
      const s = document.createElement("small");
      s.textContent = opts.desc;
      text.appendChild(s);
    }
    el.appendChild(text);
    if (opts.action) {
      const b = document.createElement("button");
      b.textContent = opts.action.label;
      b.onclick = () => { opts.action.onClick(); remove(); };
      el.appendChild(b);
    }
    toastBox.appendChild(el);
    const remove = () => { el.classList.add("out"); setTimeout(() => el.remove(), 300); };
    setTimeout(remove, opts.duration || 3500);
  }

  window.FF_TOAST = (msg, opts) => toast(msg, opts);

  /* ---------- Savat ---------- */
  const PIZZAS = {};
  $$(".pizza").forEach((el) => {
    PIZZAS[el.dataset.id] = { id: el.dataset.id, name: el.dataset.name, price: +el.dataset.price, img: el.dataset.img };
  });
  let lines = [];
  try { lines = JSON.parse(localStorage.getItem("ff-cart") || "[]").filter((l) => PIZZAS[l.id]); } catch (e) { lines = []; }
  const save = () => { try { localStorage.setItem("ff-cart", JSON.stringify(lines)); } catch (e) {} };

  const drawer = $("#drawer"), overlay = $("#overlay");
  const countEl = $("#cart-count"), body = $("#drawer-body"), foot = $("#drawer-foot"), sub = $("#drawer-sub");
  const count = () => lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = () => lines.reduce((n, l) => n + PIZZAS[l.id].price * l.qty, 0);

  function setQty(id, qty) {
    if (qty <= 0) lines = lines.filter((l) => l.id !== id);
    else lines = lines.map((l) => (l.id === id ? { ...l, qty } : l));
    save(); render();
  }
  function add(id) {
    const ex = lines.find((l) => l.id === id);
    if (ex) ex.qty += 1; else lines.push({ id, qty: 1 });
    save(); render();
  }
  function render() {
    const c = count();
    const prev = countEl.textContent;
    countEl.textContent = c;
    countEl.hidden = c === 0;
    if (c > 0 && String(c) !== prev) { countEl.classList.remove("bump"); void countEl.offsetWidth; countEl.classList.add("bump"); }
    $("#cart-open").setAttribute("aria-label", t("drawer.openAria", c));
    sub.textContent = c === 0 ? t("drawer.empty") : t("drawer.pizzasReady", c);
    if (!lines.length) {
      body.innerHTML = `<div class="empty"><span class="ico">${icon("bag")}</span><p>${t("drawer.emptyText")}</p><button class="btn btn-line" data-browse>${t("drawer.browseMenu")}</button></div>`;
      foot.hidden = true;
      return;
    }
    foot.hidden = false;
    $("#drawer-total").textContent = fmt(subtotal());
    $("#place-total").textContent = fmt(subtotal());
    body.innerHTML = "";
    const ul = document.createElement("ul");
    lines.forEach((l) => {
      const p = PIZZAS[l.id];
      const li = document.createElement("li");
      li.className = "line";
      li.innerHTML = `<img src="${p.img}" alt="" width="80" height="80"><div class="mid"><div class="top"><p></p><button aria-label="Remove"></button></div><div class="bot"><div class="qty"><button aria-label="Decrease">${icon("minus")}</button><span>${l.qty}</span><button aria-label="Increase">${icon("plus")}</button></div><span class="p">${fmt(p.price * l.qty)}</span></div></div>`;
      $("p", li).textContent = p.name;
      const [rm] = $$(".top button", li);
      rm.innerHTML = icon("x");
      rm.setAttribute("aria-label", t("drawer.removeAria", p.name));
      rm.onclick = () => setQty(l.id, 0);
      const [dec, inc] = $$(".qty button", li);
      dec.onclick = () => setQty(l.id, l.qty - 1);
      inc.onclick = () => setQty(l.id, l.qty + 1);
      ul.appendChild(li);
    });
    body.appendChild(ul);
  }
  function openDrawer() {
    drawer.classList.add("open"); overlay.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    $(".close", drawer).focus();
  }
  function closeDrawer() {
    drawer.classList.remove("open"); overlay.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }
  $("#cart-open").addEventListener("click", openDrawer);
  overlay.addEventListener("click", closeDrawer);
  $(".close", drawer).addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });
  body.addEventListener("click", (e) => {
    if (e.target.closest("[data-browse]")) { closeDrawer(); $("#menu").scrollIntoView({ behavior: "smooth" }); }
  });
  const placeOrder = () => {
    toast(t("toast.orderReceived"), { desc: t("toast.orderReceivedDesc") });
    lines = []; save(); render(); closeDrawer();
  };
  // Buyurtma faqat ro'yxatdan o'tgan/kirgan foydalanuvchiga
  const needAuth = (fn) => {
    if (window.FF_AUTH) return window.FF_AUTH.require(fn);
    fn(); return true;
  };
  $("#place-order").addEventListener("click", () => {
    if (!lines.length) return;
    if (window.FF_AUTH && !window.FF_AUTH.user()) closeDrawer();
    needAuth(() => placeOrder());
  });
  $$("[data-add]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.closest(".pizza").dataset.id;
      needAuth(() => {
        add(id);
        toast(t("toast.added", PIZZAS[id].name), { action: { label: t("toast.viewOrder"), onClick: openDrawer } });
      });
    })
  );
  render();

  /* ---------- Bron qilish oynasi ---------- */
  const dlg = $("#reserve");
  const slotsWrap = $("#slots");
  let slot = "19:30";
  ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].forEach((t) => {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = t;
    b.setAttribute("aria-pressed", String(t === slot));
    b.onclick = () => { slot = t; $$("button", slotsWrap).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); };
    slotsWrap.appendChild(b);
  });
  const dateInput = $("#r-date");
  const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  dateInput.min = d.toISOString().slice(0, 10);
  dateInput.value = dateInput.min;
  $$("[data-reserve]").forEach((b) => b.addEventListener("click", () => {
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }));
  $("#reserve-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  $("#reserve-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const name = String(f.get("name") || "").trim().split(" ")[0] || "";
    toast(t("toast.thanks", name, f.get("guests")), { desc: t("toast.thanksDesc", f.get("date"), slot) });
    e.target.reset(); dateInput.value = dateInput.min;
    dlg.close();
  });

  /* ---------- Maxsus dropdown va kalendar ---------- */
  const lang = () => (window.FF_I18N && window.FF_I18N.getLang()) || "en";
  const pops = [];
  const closeAll = (except) => pops.forEach((p) => p !== except && p.close());
  function makePop(btn, pop, onOpen) {
    const api = {
      isOpen: () => !pop.hidden,
      open() { closeAll(api); onOpen && onOpen(); pop.hidden = false; btn.setAttribute("aria-expanded", "true"); },
      close(refocus) { if (pop.hidden) return; pop.hidden = true; btn.setAttribute("aria-expanded", "false"); if (refocus) btn.focus(); },
    };
    btn.addEventListener("click", () => (api.isOpen() ? api.close() : api.open()));
    pop.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.stopPropagation(); e.preventDefault(); api.close(true); } });
    btn.addEventListener("keydown", (e) => { if (e.key === "Escape" && api.isOpen()) { e.stopPropagation(); e.preventDefault(); api.close(true); } });
    pops.push(api);
    return api;
  }
  dlg.addEventListener("click", (e) => { if (!e.target.closest(".dd")) closeAll(); });
  dlg.addEventListener("cancel", (e) => { if (pops.some((p) => p.isOpen())) { e.preventDefault(); closeAll(); } });
  dlg.addEventListener("close", () => closeAll());

  // Mehmonlar soni
  const gInput = $("#r-guests"), gBtn = $("#r-guests-btn"), gPop = $("#guests-pop");
  const gVal = $(".dd-val", gBtn);
  const syncGuests = () => { gVal.textContent = gInput.value; $$("button", gPop).forEach((b) => b.setAttribute("aria-selected", String(b.dataset.v === gInput.value))); };
  for (let n = 1; n <= 8; n++) {
    const b = document.createElement("button");
    b.type = "button"; b.dataset.v = n; b.textContent = n; b.setAttribute("role", "option");
    b.onclick = () => { gInput.value = n; syncGuests(); gPopApi.close(true); };
    gPop.appendChild(b);
  }
  const gPopApi = makePop(gBtn, gPop);
  syncGuests();

  // Sana kalendari
  const dBtn = $("#r-date-btn"), dPop = $("#cal-pop"), dVal = $(".dd-val", dBtn);
  const iso = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return { y, m: m - 1, d }; };
  let view = parse(dateInput.value || dateInput.min);
  const fmtDay = (s) => { const p = parse(s); return new Date(p.y, p.m, p.d).toLocaleDateString(lang(), { day: "numeric", month: "long", year: "numeric" }); };
  const syncDate = () => { dVal.textContent = dateInput.value ? fmtDay(dateInput.value) : ""; };
  function renderCal() {
    const L = lang(), min = parse(dateInput.min), today = iso(min.y, min.m, min.d);
    const first = new Date(view.y, view.m, 1), days = new Date(view.y, view.m + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // hafta dushanbadan boshlanadi
    dPop.innerHTML = "";
    const head = document.createElement("div"); head.className = "cal-head";
    const mk = (cls, label, dis, fn) => { const b = document.createElement("button"); b.type = "button"; b.className = "cal-nav " + cls; b.setAttribute("aria-label", label); b.disabled = dis; b.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-chev"/></svg>'; b.onclick = fn; return b; };
    const title = document.createElement("span"); title.className = "cal-title";
    title.textContent = first.toLocaleDateString(L, { month: "long", year: "numeric" });
    const atMin = view.y === min.y && view.m === min.m;
    head.append(mk("prev", "Prev", atMin, () => { view = { y: view.m ? view.y : view.y - 1, m: (view.m + 11) % 12 }; renderCal(); }), title, mk("next", "Next", false, () => { view = { y: view.m === 11 ? view.y + 1 : view.y, m: (view.m + 1) % 12 }; renderCal(); }));
    const grid = document.createElement("div"); grid.className = "cal-grid";
    for (let i = 0; i < 7; i++) { const w = document.createElement("span"); w.className = "cal-wd"; w.textContent = new Date(2024, 0, 1 + i).toLocaleDateString(L, { weekday: "short" }).slice(0, 2); grid.appendChild(w); }
    for (let i = 0; i < lead; i++) grid.appendChild(document.createElement("span"));
    for (let d = 1; d <= days; d++) {
      const s = iso(view.y, view.m, d), b = document.createElement("button");
      b.type = "button"; b.className = "cal-day" + (s === today ? " today" : ""); b.textContent = d;
      b.disabled = s < dateInput.min; b.setAttribute("aria-pressed", String(s === dateInput.value));
      b.onclick = () => { dateInput.value = s; syncDate(); dPopApi.close(true); };
      grid.appendChild(b);
    }
    dPop.append(head, grid);
  }
  const dPopApi = makePop(dBtn, dPop, () => { view = parse(dateInput.value || dateInput.min); renderCal(); });
  dateInput.addEventListener("change", syncDate);
  $("#reserve-form").addEventListener("reset", () => setTimeout(() => { syncGuests(); syncDate(); }, 0));
  document.addEventListener("ff-lang-changed", () => { syncDate(); if (dPopApi.isOpen()) renderCal(); });
  syncDate();

  /* ---------- Navigatsiya ---------- */
  const nav = $(".nav");
  const onScrollNav = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------- Mobil menyu ---------- */
  const menuBtn = $("#menu-btn"), mMenu = $("#mobile-menu");
  if (menuBtn && mMenu) {
    const isOpen = () => mMenu.classList.contains("open");
    const setMenu = (open) => { mMenu.classList.toggle("open", open); mMenu.inert = !open; document.querySelector(".site-header").classList.toggle("menu-open", open); document.documentElement.classList.toggle("menu-lock", open); menuBtn.setAttribute("aria-expanded", String(open)); };
    menuBtn.addEventListener("click", (e) => { e.stopPropagation(); setMenu(!isOpen()); });
    mMenu.addEventListener("click", (e) => { if (e.target.closest("a, button")) setMenu(false); });
    document.addEventListener("click", (e) => { if (isOpen() && !mMenu.contains(e.target)) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    window.matchMedia("(min-width:768px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });
  }
  $$("[data-goto]").forEach((b) => b.addEventListener("click", () => $("#" + b.dataset.goto).scrollIntoView({ behavior: "smooth" })));
  $$("[data-href]").forEach((b) => b.addEventListener("click", () => { location.href = b.dataset.href; }));

  if ($("#hero") && $("#hero-video")) {
  /* ---------- Hero: skroll bilan video ---------- */
  const hero = $("#hero"), video = $("#hero-video");
  const interp = (p, xs, ys) => {
    if (p <= xs[0]) return ys[0];
    for (let i = 1; i < xs.length; i++) {
      if (p <= xs[i]) { const t = (p - xs[i - 1]) / (xs[i] - xs[i - 1] || 1); return ys[i - 1] + (ys[i] - ys[i - 1]) * t; }
    }
    return ys[ys.length - 1];
  };
  const STAGES = [
    { el: $(".s1"), x: [0, 0.13, 0.2], o: [1, 1, 0], y: [0, 0, -48], b: [0, 0, 10] },
    { el: $(".s2"), x: [0.22, 0.27, 0.42, 0.47], o: [0, 1, 1, 0], y: [48, 0, 0, -48], b: [10, 0, 0, 10] },
    { el: $(".s3"), x: [0.5, 0.55, 0.71, 0.76], o: [0, 1, 1, 0], y: [48, 0, 0, -48], b: [10, 0, 0, 10] },
    { el: $(".s4"), x: [0.8, 0.86, 1], o: [0, 1, 1], y: [48, 0, 0], b: [10, 0, 0] },
  ];
  const rail = $(".rail i");
  const dots = $$(".stage-labels div");
  const centers = [0.08, 0.35, 0.63, 0.92];

  let duration = 0, current = 0, target = 0, raf = 0;
  const onMeta = () => { duration = video.duration || 0; };
  video.addEventListener("loadedmetadata", onMeta);
  if (video.readyState >= 1) onMeta();
  video.pause();
  // iOS: birinchi tegishdan keyin kadrlarni ko'rsatish uchun
  window.addEventListener("touchstart", () => { video.play().then(() => video.pause()).catch(() => {}); }, { once: true, passive: true });

  function progress() {
    const r = hero.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
  }
  function paintStages(p) {
    STAGES.forEach((s) => {
      const o = interp(p, s.x, s.o), y = interp(p, s.x, s.y), b = interp(p, s.x, s.b);
      s.el.style.opacity = o.toFixed(3);
      s.el.style.visibility = o < 0.02 ? "hidden" : "visible";
      s.el.style.transform = `translateY(${y.toFixed(1)}px)`;
      s.el.style.filter = b > 0.2 ? `blur(${b.toFixed(1)}px)` : "none";
      s.el.style.pointerEvents = o > 0.6 ? "auto" : "none";
    });
    if (rail) rail.style.transform = `scaleY(${p.toFixed(3)})`;
    dots.forEach((el, i) => { el.style.opacity = interp(p, [Math.max(0, centers[i] - 0.16), centers[i], Math.min(1, centers[i] + 0.16)], [0.35, 1, 0.35]).toFixed(2); });
  }
  function tick() {
    const p = progress();
    paintStages(p);
    if (duration > 0) {
      target = p * (duration - 0.04);
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.002) current = target;
      if (!video.seeking && Math.abs(video.currentTime - current) > 0.008) video.currentTime = current;
    }
    raf = requestAnimationFrame(tick);
  }
  // Faqat hero ekranda bo'lganda ishlaymiz (batareya va tezlik uchun)
  const heroObs = new IntersectionObserver((en) => {
    if (en[0].isIntersecting) { if (!raf) raf = requestAnimationFrame(tick); }
    else { cancelAnimationFrame(raf); raf = 0; paintStages(progress()); }
  }, { rootMargin: "100px" });
  heroObs.observe(hero);
  }

  /* ---------- Paydo bo'lish animatsiyalari ---------- */
  const revObs = new IntersectionObserver((en) => {
    en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revObs.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -60px 0px", threshold: 0.05 });
  $$(".reveal").forEach((el) => revObs.observe(el));

  const countObs = new IntersectionObserver((en) => {
    en.forEach((e) => {
      if (!e.isIntersecting) return;
      countObs.unobserve(e.target);
      const to = +e.target.dataset.count, suf = e.target.dataset.suffix || "", t0 = performance.now(), dur = 2200;
      const step = (t) => {
        const k = clamp((t - t0) / dur, 0, 1), ease = 1 - Math.pow(1 - k, 4);
        e.target.textContent = Math.round(to * ease) + suf;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  $$("[data-count]").forEach((el) => { el.textContent = "0" + (el.dataset.suffix || ""); countObs.observe(el); });

  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Til almashganda dinamik matnlarni yangilash ---------- */
  document.addEventListener("ff-lang-changed", () => { render(); });
})();
