/* FORNO & FARINA — yengil animatsiyalar (main.js'ga tegmaydi) */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Sarlavhalar va bloklarga paydo bo'lish effekti qo'shish (main.js kuzatadi) */
  const add = (sel, fx, step = 0) => $$(sel).forEach((el, i) => {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
    if (fx) el.classList.add(fx);
    if (step && !el.style.getPropertyValue("--d")) el.style.setProperty("--d", (i * step).toFixed(2) + "s");
  });
  add(".info-card", "fx-left");
  add(".map", "fx-right");
  add(".tile.oven", "fx-zoom");

  /* Reveal tugagach hover uchun kechikishni olib tashlash */
  const mo = new MutationObserver((list) => list.forEach((m) => {
    const el = m.target;
    if (el.classList.contains("in") && !el.classList.contains("done")) setTimeout(() => el.classList.add("done"), 1300);
  }));
  $$(".reveal").forEach((el) => mo.observe(el, { attributes: true, attributeFilter: ["class"] }));

  if (reduce) return;

  /* Scroll progress + menyu rasmlari parallax */
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  const imgs = $$(".pizza .photo img");
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    imgs.forEach((img) => {
      if (img.matches(":hover")) return;
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.transform = `translateY(${(k * -14).toFixed(1)}px) scale(1.08)`;
    });
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();

  /* Sichqoncha bo'yicha yengil "magnit" effekti tugmalarda */
  if (matchMedia("(hover:hover)").matches) {
    $$(".btn-xl, .btn-gold").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${((e.clientX - r.left) / r.width - .5) * 8}px ${((e.clientY - r.top) / r.height - .5) * 6}px`;
      });
      b.addEventListener("pointerleave", () => { b.style.translate = ""; });
    });
  }
})();
