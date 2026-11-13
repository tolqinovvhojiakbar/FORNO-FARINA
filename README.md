# FORNO & FARINA — oddiy HTML sayt (build kerak emas)

## 1. Kompyuterda ochish
VS Code'da shu papkani oching → `index.html` ustiga o'ng tugma → **Open with Live Server**.
(Live Server o'rnatilmagan bo'lsa: papkada terminal ochib `npx http-server` yozing.)
Faylni qo'sh bosib ochmang: video skrollda ishlashi uchun server kerak.

## 2. Domenni almashtirish (Google uchun shart)
VS Code'da **Cmd/Ctrl + Shift + H** → qidirishga `https://YOUR-DOMAIN.com` →
o'rniga haqiqiy manzilni yozing (oxirida "/" bo'lmasin) → **Replace All**.
Bu `index.html`, `robots.txt` va `sitemap.xml` ichida almashadi.

## 3. Internetga joylash (bepul)
Eng oson: https://app.netlify.com/drop → shu papkani sudrab tashlang → manzil tayyor.
Boshqa variantlar: Cloudflare Pages, GitHub Pages, Vercel.

## 4. Google'da chiqishi
1. https://search.google.com/search-console → manzilni qo'shing.
2. **Sitemaps** → `sitemap.xml` yuboring.
3. Bosh sahifa manzilini tekshirib, **Request indexing** bosing.

## O'zgartirish kerak bo'lgan ma'lumotlar (hozir vaqtincha)
Manzil, telefon, email, ish vaqti, pizza nomlari va narxlari. `index.html` ichida
(va pastdagi `application/ld+json` blokida ham) almashtiring.
