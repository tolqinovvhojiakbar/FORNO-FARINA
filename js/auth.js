/* FORNO & FARINA — ro'yxatdan o'tish va kirish.
   MUHIM: bu statik sayt, serveri yo'q. Hisoblar brauzerning localStorage'ida saqlanadi
   (parol SHA-256 + tuz bilan xeshlanadi). Haqiqiy ishlab chiqarish uchun backend kerak. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const t = (key, ...a) => (window.FF_I18N ? window.FF_I18N.t(key, ...a) : key);
  const USERS = "ff-users", SESSION = "ff-session";

  /* ---------- Saqlash ---------- */
  const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  const users = () => { const u = read(USERS, []); return Array.isArray(u) ? u : []; };

  async function hash(pw, salt) {
    const data = salt + ":" + pw;
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    let h = 2166136261; // eski brauzerlar/http uchun oddiy zaxira
    for (let i = 0; i < data.length; i++) { h ^= data.charCodeAt(i); h = Math.imul(h, 16777619); }
    return "f" + (h >>> 0).toString(16);
  }
  const newSalt = () => {
    if (window.crypto && crypto.getRandomValues) return Array.from(crypto.getRandomValues(new Uint8Array(12))).map((b) => b.toString(16).padStart(2, "0")).join("");
    return String(Math.random()).slice(2) + Date.now();
  };

  /* ---------- Holat ---------- */
  const user = () => {
    const email = read(SESSION, null);
    const u = email && users().find((x) => x.email === email);
    return u ? { name: u.name, email: u.email } : null;
  };

  async function register(name, email, pw) {
    email = email.trim().toLowerCase();
    const list = users();
    if (list.some((u) => u.email === email)) throw new Error("auth.err.exists");
    const salt = newSalt();
    list.push({ name: name.trim(), email, salt, hash: await hash(pw, salt), created: Date.now() });
    if (!write(USERS, list)) throw new Error("auth.err.storage");
    write(SESSION, email);
  }
  async function login(email, pw) {
    email = email.trim().toLowerCase();
    const u = users().find((x) => x.email === email);
    if (!u || (await hash(pw, u.salt)) !== u.hash) throw new Error("auth.err.bad");
    write(SESSION, email);
  }
  function logout() { try { localStorage.removeItem(SESSION); } catch (e) {} changed(); }
  const changed = () => { paintAccount(); document.dispatchEvent(new CustomEvent("ff-auth-changed", { detail: user() })); };

  /* ---------- Oyna ---------- */
  const dlg = $("#auth");
  if (!dlg) return;
  const forms = { register: $("#register-form"), login: $("#login-form") };
  const tabs = $$("[data-auth-tab]", dlg);
  let pending = null;

  function showTab(name) {
    Object.entries(forms).forEach(([k, f]) => { f.hidden = k !== name; });
    tabs.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.authTab === name)));
    $$(".form-err", dlg).forEach((e) => { e.textContent = ""; });
    const first = $("input", forms[name]);
    if (first) setTimeout(() => first.focus(), 30);
  }
  function openAuth(tab) {
    showTab(tab || "register");
    if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute("open", "");
  }
  const closeAuth = () => { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); };

  tabs.forEach((b) => b.addEventListener("click", () => showTab(b.dataset.authTab)));
  $$("[data-auth-switch]", dlg).forEach((b) => b.addEventListener("click", () => showTab(b.dataset.authSwitch)));
  $("#auth-close").addEventListener("click", closeAuth);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) closeAuth(); });
  dlg.addEventListener("close", () => { pending = null; Object.values(forms).forEach((f) => f.reset()); });

  async function submit(form, fn) {
    const err = $(".form-err", form), btn = $("button[type=submit]", form);
    err.textContent = "";
    btn.disabled = true;
    try {
      await fn(new FormData(form));
      const cb = pending; pending = null;
      const u = user();
      closeAuth(); changed();
      window.FF_TOAST && window.FF_TOAST(t("auth.toast.welcome", u ? u.name.split(" ")[0] : ""));
      if (cb) cb();
    } catch (e) {
      err.textContent = t(e && e.message && e.message.startsWith("auth.") ? e.message : "auth.err.generic");
    } finally { btn.disabled = false; }
  }
  const val = (f, k) => String(f.get(k) || "");

  forms.register.addEventListener("submit", (e) => {
    e.preventDefault();
    submit(forms.register, async (f) => {
      if (val(f, "password").length < 6) throw new Error("auth.err.short");
      if (val(f, "password") !== val(f, "confirm")) throw new Error("auth.err.match");
      await register(val(f, "name"), val(f, "email"), val(f, "password"));
    });
  });
  forms.login.addEventListener("submit", (e) => {
    e.preventDefault();
    submit(forms.login, (f) => login(val(f, "email"), val(f, "password")));
  });

  /* ---------- Navigatsiyadagi hisob tugmasi ---------- */
  const btn = $("#acct-btn"), menu = $("#acct-menu"), wrap = $("#acct");
  const initial = $(".initial", btn), who = $("#acct-who");
  function paintAccount() {
    const u = user();
    btn.classList.toggle("in", !!u);
    initial.textContent = u ? u.name.trim().charAt(0).toUpperCase() || "?" : "";
    btn.setAttribute("aria-label", u ? t("auth.account", u.name) : t("auth.signIn"));
    btn.setAttribute("aria-haspopup", u ? "menu" : "dialog");
    who.textContent = u ? u.name : "";
    $("#acct-email").textContent = u ? u.email : "";
    if (!u) closeMenu();
  }
  const closeMenu = () => { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); };
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!user()) return openAuth("login");
    menu.hidden = !menu.hidden;
    btn.setAttribute("aria-expanded", String(!menu.hidden));
  });
  $("#logout").addEventListener("click", () => { closeMenu(); logout(); window.FF_TOAST && window.FF_TOAST(t("auth.toast.bye")); });
  document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) closeMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("ff-lang-changed", paintAccount);

  /* Boshqa varaqda kirilsa/chiqilsa — shu yerda ham yangilansin */
  window.addEventListener("storage", (e) => { if (e.key === SESSION) changed(); });

  /* ---------- Tashqi API ---------- */
  window.FF_AUTH = {
    user,
    /* Kirgan bo'lsa darhol cb() ni ishga tushiradi; aks holda ro'yxatdan o'tish oynasini ochadi
       va muvaffaqiyatdan keyin cb() ni bajaradi. */
    require(cb) {
      if (user()) { cb && cb(); return true; }
      pending = cb || null;
      openAuth("register");
      return false;
    },
  };
  paintAccount();
})();
