/* Loading sahifani boshqarish. Xatosiz: hamma narsa try/catch ichida, 6 soniyada majburan yopiladi. */
(() => {
  const root = document.documentElement, el = document.getElementById("loader");
  if (!el) { root.classList.remove("loading"); root.classList.add("ready"); return; }
  const bar = el.querySelector(".ld-bar i"), pct = el.querySelector(".ld-pct");
  let seen = false;
  try { seen = sessionStorage.getItem("ff-seen") === "1"; } catch (e) {}
  const MIN = seen ? 450 : 1900, MAX = 6000, t0 = performance.now();
  let done = false, shown = 0;
  const paint = (v) => {
    shown = Math.max(shown, v);
    if (bar) bar.parentElement.style.setProperty("--p", (shown / 100).toFixed(2));
    if (pct) pct.textContent = Math.round(shown) + "%";
  };
  // Haqiqiy yuklanishga yaqin sekin o'sadigan progress
  const iv = setInterval(() => { if (!done) paint(Math.min(92, shown + (92 - shown) * 0.08 + 0.4)); }, 120);
  const finish = () => {
    if (done) return; done = true; clearInterval(iv); paint(100);
    try { sessionStorage.setItem("ff-seen", "1"); } catch (e) {}
    setTimeout(() => {
      el.classList.add("out");
      root.classList.remove("loading");
      root.classList.add("ready");
      setTimeout(() => el.remove(), 1200);
    }, 350);
  };
  const ready = new Promise((r) => document.readyState === "complete" ? r() : addEventListener("load", r, { once: true }));
  const fonts = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]) : Promise.resolve();
  const minWait = new Promise((r) => setTimeout(r, Math.max(0, MIN - (performance.now() - t0))));
  Promise.all([Promise.race([ready, new Promise((r) => setTimeout(r, 4000))]), fonts, minWait]).then(finish, finish);
  setTimeout(finish, MAX);
})();
