/* FORNO & FARINA — til almashtirish (EN / RU / UZ) */
(function () {
  "use strict";

  const DICT = {
    en: {
      "menu.back": "Back to home", "nav.menu": "Menu", "nav.craft": "Craft", "nav.visit": "Visit", "nav.reserve": "Reserve",
      "hero.eyebrow": "Forno & Farina · Est. Napoli Tradition",
      "hero.title1": "Crafted by fire.", "hero.title2": "Perfected by hand.",
      "hero.sub": "Neapolitan pizza, born in a 485°C wood-fired oven and shaped by hands that never rush.",
      "hero.orderNow": "Order Now", "hero.scrollCue": "Scroll to Experience",
      "hero.step2of4": "02 / 04", "hero.step3of4": "03 / 04",
      "dough.title1": "72-Hour", "dough.title2": "Fermented", "dough.title3": "Dough",
      "dough.lead": "Organic stone-ground flour, cold spring water and sea salt — hand-kneaded on rustic oak tables, then left to rest for three slow days until it\u2019s light, airy and deeply flavourful.",
      "dough.stat1": "Cold rest", "dough.stat2": "Ingredients", "dough.stat3": "Organic",
      "ingr.title1": "Pure Ingredients", "ingr.title2": "in Motion",
      "ingr.item1": "Sun-ripened in volcanic Campanian soil",
      "ingr.item2": "Aged mozzarella from the Agerola hills",
      "ingr.item3": "Picked fresh every morning",
      "served.title1": "From our oven", "served.title2": "to your table.",
      "served.exploreMenu": "Explore the Menu", "served.reserveTable": "Reserve a Table",
      "stageLabels.kitchen": "The Kitchen", "stageLabels.dough": "The Dough",
      "stageLabels.toppings": "The Toppings", "stageLabels.table": "The Table",
      "menu.title1": "Six pizzas.", "menu.title2": "No shortcuts.",
      "menu.intro": "Each pie spends ninety seconds in the fire and three days in the making. Baked to order, served blistered and soft.",
      "menu.addToOrder": "Add to Order",
      "badge.signature": "Signature", "badge.chefsPick": "Chef's Pick", "badge.new": "New",
      "pizza.margherita.desc": "San Marzano tomato, aged fior di latte, sweet basil, Ligurian olive oil.",
      "pizza.diavola.desc": "Calabrian spianata, fior di latte, chilli-infused wildflower honey.",
      "pizza.tartufo.desc": "Black truffle, wild porcini & chanterelles, fior di latte cream, thyme.",
      "pizza.prosciutto.desc": "24-month Prosciutto di Parma, wild rocket, shaved Parmigiano Reggiano.",
      "pizza.formaggi.desc": "Gorgonzola, taleggio, Parmigiano, fior di latte, acacia honey, walnut.",
      "pizza.burrata.desc": "Mortadella IGP, whole Puglian burrata, Bronte pistachio pesto.",
      "tag.sanMarzano": "San Marzano", "tag.fiorDiLatte": "Fior di Latte", "tag.basil": "Basil",
      "tag.spianata": "Spianata", "tag.chilliHoney": "Chilli Honey", "tag.smoked": "Smoked",
      "tag.blackTruffle": "Black Truffle", "tag.porcini": "Porcini", "tag.bianca": "Bianca",
      "tag.parma24m": "Parma 24m", "tag.rocket": "Rocket", "tag.parmigiano": "Parmigiano",
      "tag.gorgonzola": "Gorgonzola", "tag.honey": "Honey", "tag.walnut": "Walnut",
      "tag.burrata": "Burrata", "tag.brontePistachio": "Bronte Pistachio", "tag.mortadella": "Mortadella",
      "craft.eyebrow": "Craft & Tradition", "craft.title1": "Fire, time", "craft.title2": "& Italy.",
      "craft.intro": "Three obsessions behind every pizza we serve. Nothing frozen, nothing rushed, nothing borrowed from a shortcut.",
      "craft.oven.text": "A hand-built Neapolitan dome oven, fired with seasoned oak and beech. Ninety seconds is all it takes to blister the crust and keep the heart soft.",
      "craft.cold.text": "Cold fermentation for a lighter, more digestible dough with real depth of flavour.",
      "craft.imported": "Imported",
      "craft.quote.text": "We don\u2019t rush the fire, and we never rush the dough.",
      "craft.quote.by": "— Our Pizzaioli",
      "craft.four.flour": "Flour", "craft.four.water": "Water", "craft.four.salt": "Salt", "craft.four.time": "Time",
      "craft.four.text": "Four ingredients in our dough. The last one is the hardest to find.",
      "visit.eyebrow": "Visit · Location & Hours", "visit.title1": "A table by", "visit.title2": "the fire.",
      "visit.address": "Address", "visit.telephone": "Telephone", "visit.email": "Email",
      "visit.hours": "Opening Hours", "visit.closed": "Closed", "visit.directions": "Directions",
      "day.monday": "Monday", "day.tueThu": "Tue – Thu", "day.friSat": "Fri – Sat", "day.sunday": "Sunday",
      "footer.tagline": "Wood-fired since the first spark",
      "drawer.title": "Your Order", "drawer.empty": "Nothing in the oven yet.",
      "drawer.subtotal": "Subtotal", "drawer.placeOrder": "Place Order",
      "drawer.emptyText": "Pick a signature pizza from the menu to start your order.",
      "drawer.browseMenu": "Browse the Menu",
      "drawer.pizzasReady": (c) => `${c} pizza${c > 1 ? "s" : ""} ready for the fire.`,
      "drawer.openAria": (c) => `Open order, ${c} items`,
      "drawer.removeAria": (name) => `Remove ${name}`,
      "reserve.lead": "Tell us when you\u2019d like to join us by the fire.",
      "reserve.name": "Name", "reserve.email": "Email", "reserve.date": "Date", "reserve.guests": "Guests",
      "reserve.time": "Time", "reserve.confirm": "Confirm Request",
      "auth.title": "Join to order", "auth.lead": "Create an account to place your order. It takes less than a minute.",
      "auth.tab.register": "Sign up", "auth.tab.login": "Log in",
      "auth.name": "Full name", "auth.email": "Email", "auth.password": "Password", "auth.confirm": "Repeat password",
      "auth.passHint": "At least 6 characters",
      "auth.register": "Create account", "auth.login": "Log in",
      "auth.haveAccount": "Already have an account?", "auth.noAccount": "New here?",
      "auth.signIn": "Sign in", "auth.logout": "Log out",
      "auth.account": (n) => `Account: ${n}`,
      "auth.loginTitle": "Welcome back", "auth.loginLead": "Log in to continue with your order.",
      "auth.needed": "Please sign up or log in to order.",
      "auth.err.exists": "An account with this email already exists. Try logging in.",
      "auth.err.bad": "Wrong email or password.",
      "auth.err.short": "Password must be at least 6 characters.",
      "auth.err.match": "Passwords do not match.",
      "auth.err.storage": "Could not save your account. Is private mode on?",
      "auth.err.generic": "Something went wrong. Please try again.",
      "auth.toast.welcome": (n) => n ? `Welcome, ${n}!` : "Welcome!",
      "auth.toast.bye": "You have been logged out.",
      "toast.added": (name) => `${name} added to your order`,
      "toast.viewOrder": "View order",
      "toast.orderReceived": "Order received — your pizzas are heading for the fire.",
      "toast.orderReceivedDesc": "Ready for pickup in about 25 minutes.",
      "toast.thanks": (name, guests) => `Thanks, ${name}! Table for ${guests} requested.`,
      "toast.thanksDesc": (date, slot) => `${date} at ${slot}. We'll confirm by email.`
    },
    ru: {
      "menu.back": "Назад на главную", "nav.menu": "Меню", "nav.craft": "Традиции", "nav.visit": "Контакты", "nav.reserve": "Бронь",
      "hero.eyebrow": "Forno & Farina · Неаполитанская традиция",
      "hero.title1": "Рождено в огне.", "hero.title2": "Доведено до совершенства руками.",
      "hero.sub": "Неаполитанская пицца из дровяной печи при 485°C, созданная руками, которые никогда не спешат.",
      "hero.orderNow": "Заказать", "hero.scrollCue": "Листайте дальше",
      "hero.step2of4": "02 / 04", "hero.step3of4": "03 / 04",
      "dough.title1": "72 часа", "dough.title2": "ферментации", "dough.title3": "теста",
      "dough.lead": "Органическая мука грубого помола, холодная родниковая вода и морская соль — вымешано вручную на дубовых столах и оставлено отдыхать на три неспешных дня, пока тесто не станет лёгким, воздушным и насыщенным вкусом.",
      "dough.stat1": "Холодная расстойка", "dough.stat2": "Ингредиента", "dough.stat3": "Органика",
      "ingr.title1": "Чистые ингредиенты", "ingr.title2": "в движении",
      "ingr.item1": "Дозревают на солнце в вулканической почве Кампании",
      "ingr.item2": "Выдержанная моцарелла с холмов Агеролы",
      "ingr.item3": "Собирается свежим каждое утро",
      "served.title1": "Из нашей печи", "served.title2": "на ваш стол.",
      "served.exploreMenu": "Смотреть меню", "served.reserveTable": "Забронировать столик",
      "stageLabels.kitchen": "Кухня", "stageLabels.dough": "Тесто",
      "stageLabels.toppings": "Начинка", "stageLabels.table": "Стол",
      "menu.title1": "Шесть видов пиццы.", "menu.title2": "Без компромиссов.",
      "menu.intro": "Каждая пицца проводит девяносто секунд в огне и три дня в приготовлении. Выпекается на заказ, подаётся хрустящей и мягкой.",
      "menu.addToOrder": "Добавить в заказ",
      "badge.signature": "Фирменное", "badge.chefsPick": "Выбор шефа", "badge.new": "Новинка",
      "pizza.margherita.desc": "Томаты Сан-Марцано, выдержанная фиор ди латте, свежий базилик, лигурийское оливковое масло.",
      "pizza.diavola.desc": "Калабрийская спьяната, фиор ди латте, мёд с перцем чили.",
      "pizza.tartufo.desc": "Чёрный трюфель, лесные белые грибы и лисички, крем фиор ди латте, тимьян.",
      "pizza.prosciutto.desc": "24-месячная пармская ветчина, руккола, стружка пармезана.",
      "pizza.formaggi.desc": "Горгонзола, таледжо, пармезан, фиор ди латте, акациевый мёд, грецкий орех.",
      "pizza.burrata.desc": "Мортаделла IGP, цельная бурата из Апулии, песто из бронтских фисташек.",
      "tag.sanMarzano": "Сан-Марцано", "tag.fiorDiLatte": "Фиор ди латте", "tag.basil": "Базилик",
      "tag.spianata": "Спьяната", "tag.chilliHoney": "Мёд с чили", "tag.smoked": "Копчёное",
      "tag.blackTruffle": "Чёрный трюфель", "tag.porcini": "Белые грибы", "tag.bianca": "Бьянка",
      "tag.parma24m": "Пармская 24м", "tag.rocket": "Руккола", "tag.parmigiano": "Пармезан",
      "tag.gorgonzola": "Горгонзола", "tag.honey": "Мёд", "tag.walnut": "Грецкий орех",
      "tag.burrata": "Бурата", "tag.brontePistachio": "Бронтская фисташка", "tag.mortadella": "Мортаделла",
      "craft.eyebrow": "Мастерство и традиции", "craft.title1": "Огонь, время", "craft.title2": "и Италия.",
      "craft.intro": "Три страсти, стоящие за каждой нашей пиццей. Ничего замороженного, ничего поспешного, никаких компромиссов.",
      "craft.oven.text": "Ручная неаполитанская печь-купол, топится выдержанным дубом и буком. Девяносто секунд — и корочка хрустящая, а сердцевина мягкая.",
      "craft.cold.text": "Холодная ферментация даёт более лёгкое, легче усваиваемое тесто с настоящей глубиной вкуса.",
      "craft.imported": "Из Италии",
      "craft.quote.text": "Мы не торопим огонь и никогда не торопим тесто.",
      "craft.quote.by": "— Наши пиццайоло",
      "craft.four.flour": "Мука", "craft.four.water": "Вода", "craft.four.salt": "Соль", "craft.four.time": "Время",
      "craft.four.text": "Четыре ингредиента в нашем тесте. Последний найти труднее всего.",
      "visit.eyebrow": "Контакты · Адрес и часы", "visit.title1": "Столик", "visit.title2": "у огня.",
      "visit.address": "Адрес", "visit.telephone": "Телефон", "visit.email": "Email",
      "visit.hours": "Часы работы", "visit.closed": "Выходной", "visit.directions": "Маршрут",
      "day.monday": "Понедельник", "day.tueThu": "Вт – Чт", "day.friSat": "Пт – Сб", "day.sunday": "Воскресенье",
      "footer.tagline": "На дровах с самой первой искры",
      "drawer.title": "Ваш заказ", "drawer.empty": "В печи пока пусто.",
      "drawer.subtotal": "Итого", "drawer.placeOrder": "Оформить заказ",
      "drawer.emptyText": "Выберите фирменную пиццу из меню, чтобы начать заказ.",
      "drawer.browseMenu": "Смотреть меню",
      "drawer.pizzasReady": (c) => `${c} ${c === 1 ? "пицца готовится" : "пиццы готовятся"} к огню.`,
      "drawer.openAria": (c) => `Открыть заказ, позиций: ${c}`,
      "drawer.removeAria": (name) => `Удалить ${name}`,
      "reserve.lead": "Скажите, когда вы хотите присоединиться к нам у огня.",
      "reserve.name": "Имя", "reserve.email": "Email", "reserve.date": "Дата", "reserve.guests": "Гостей",
      "reserve.time": "Время", "reserve.confirm": "Подтвердить заявку",
      "auth.title": "Войдите, чтобы заказать", "auth.lead": "Создайте аккаунт, чтобы оформить заказ. Это займёт меньше минуты.",
      "auth.tab.register": "Регистрация", "auth.tab.login": "Вход",
      "auth.name": "Имя и фамилия", "auth.email": "Email", "auth.password": "Пароль", "auth.confirm": "Повторите пароль",
      "auth.passHint": "Не менее 6 символов",
      "auth.register": "Создать аккаунт", "auth.login": "Войти",
      "auth.haveAccount": "Уже есть аккаунт?", "auth.noAccount": "Впервые у нас?",
      "auth.signIn": "Войти", "auth.logout": "Выйти",
      "auth.account": (n) => `Аккаунт: ${n}`,
      "auth.loginTitle": "С возвращением", "auth.loginLead": "Войдите, чтобы продолжить заказ.",
      "auth.needed": "Зарегистрируйтесь или войдите, чтобы заказать.",
      "auth.err.exists": "Аккаунт с таким email уже существует. Попробуйте войти.",
      "auth.err.bad": "Неверный email или пароль.",
      "auth.err.short": "Пароль должен содержать не менее 6 символов.",
      "auth.err.match": "Пароли не совпадают.",
      "auth.err.storage": "Не удалось сохранить аккаунт. Включён приватный режим?",
      "auth.err.generic": "Что-то пошло не так. Попробуйте ещё раз.",
      "auth.toast.welcome": (n) => n ? `Добро пожаловать, ${n}!` : "Добро пожаловать!",
      "auth.toast.bye": "Вы вышли из аккаунта.",
      "toast.added": (name) => `«${name}» добавлено в заказ`,
      "toast.viewOrder": "Открыть заказ",
      "toast.orderReceived": "Заказ принят — ваши пиццы отправляются в печь.",
      "toast.orderReceivedDesc": "Будет готово примерно через 25 минут.",
      "toast.thanks": (name, guests) => `Спасибо, ${name}! Столик на ${guests} запрошен.`,
      "toast.thanksDesc": (date, slot) => `${date} в ${slot}. Подтвердим по email.`
    },
    uz: {
      "menu.back": "Bosh sahifaga qaytish", "nav.menu": "Menyu", "nav.craft": "An'ana", "nav.visit": "Manzil", "nav.reserve": "Bron qilish",
      "hero.eyebrow": "Forno & Farina · Neapolь an'anasi",
      "hero.title1": "Olovda yaratilgan.", "hero.title2": "Qo'lda mukammallashtirilgan.",
      "hero.sub": "485°C li o'tinli pechda tayyorlanadigan Neapolь pitsasi — hech qachon shoshilmaydigan qo'llar bilan.",
      "hero.orderNow": "Buyurtma berish", "hero.scrollCue": "Davom etish uchun aylantiring",
      "hero.step2of4": "02 / 04", "hero.step3of4": "03 / 04",
      "dough.title1": "72 soat", "dough.title2": "bijg'itilgan", "dough.title3": "xamir",
      "dough.lead": "Organik, do'ng tош tegirmonda maydalangan un, sovuq buloq suvi va dengiz tuzi — eman stollarda qo'lda yo'g'rilib, uch kun davomida sekin dam oladi, toki yengil, havodor va chuqur ta'mli bo'lguncha.",
      "dough.stat1": "Sovuq dam olish", "dough.stat2": "Tarkibiy qism", "dough.stat3": "Organik",
      "ingr.title1": "Sof mahsulotlar", "ingr.title2": "harakatda",
      "ingr.item1": "Kampaniyaning vulqon tuprog'ida quyoshda pishgan",
      "ingr.item2": "Agerola tepaliklaridan yetilgan motsarella",
      "ingr.item3": "Har kuni ertalab yangi terilgan",
      "served.title1": "Bizning pechimizdan", "served.title2": "sizning stolingizga.",
      "served.exploreMenu": "Menyuni ko'rish", "served.reserveTable": "Stol bron qilish",
      "stageLabels.kitchen": "Oshxona", "stageLabels.dough": "Xamir",
      "stageLabels.toppings": "Ustki qatlam", "stageLabels.table": "Stol",
      "menu.title1": "Olti xil pitsa.", "menu.title2": "Hech qanday yengil yo'l yo'q.",
      "menu.intro": "Har bir pitsa olovda to'qson soniya va tayyorlashda uch kun o'tkazadi. Buyurtma asosida pishiriladi, qarsildoq va yumshoq holda tortiladi.",
      "menu.addToOrder": "Buyurtmaga qo'shish",
      "badge.signature": "Maxsus", "badge.chefsPick": "Oshpaz tanlovi", "badge.new": "Yangi",
      "pizza.margherita.desc": "San-Martsano pomidori, yetilgan fior di latte, shirin rayhon, liguriya zaytun moyi.",
      "pizza.diavola.desc": "Kalabriya spiyanatasi, fior di latte, achchiq qalampirli yovvoyi gul asali.",
      "pizza.tartufo.desc": "Qora tryufel, yovvoyi porchini va chanterel qo'ziqorinlari, fior di latte kremi, tyme.",
      "pizza.prosciutto.desc": "24 oylik Parma prosciuttosi, yovvoyi ruccola, pармиджано reggiano targ'il.",
      "pizza.formaggi.desc": "Gorgonzola, taleggio, parmijano, fior di latte, akatsiya asali, yong'oq.",
      "pizza.burrata.desc": "Mortadella IGP, butun Pulya burratasi, Bronte pistasi pestosi.",
      "tag.sanMarzano": "San-Martsano", "tag.fiorDiLatte": "Fior di latte", "tag.basil": "Rayhon",
      "tag.spianata": "Spiyanata", "tag.chilliHoney": "Achchiq asal", "tag.smoked": "Tutatilgan",
      "tag.blackTruffle": "Qora tryufel", "tag.porcini": "Porchini", "tag.bianca": "Bianka",
      "tag.parma24m": "Parma 24oy", "tag.rocket": "Ruccola", "tag.parmigiano": "Parmijano",
      "tag.gorgonzola": "Gorgonzola", "tag.honey": "Asal", "tag.walnut": "Yong'oq",
      "tag.burrata": "Burrata", "tag.brontePistachio": "Bronte pistasi", "tag.mortadella": "Mortadella",
      "craft.eyebrow": "Hunarmandlik va an'ana", "craft.title1": "Olov, vaqt", "craft.title2": "va Italiya.",
      "craft.intro": "Bizning har bir pitsamiz ortidagi uchta ishtiyoq. Hech narsa muzlatilmagan, hech narsa shoshilinch emas, hech qanday yengil yo'l yo'q.",
      "craft.oven.text": "Qo'lda qurilgan Neapolь gumbazsimon pechi, eski eman va bук o'tini bilan yoqiladi. Qobiqni qarsildoq va yuragini yumshoq qilish uchun bor-yo'g'i to'qson soniya kerak.",
      "craft.cold.text": "Sovuq bijg'ish yengilroq, osonroq hazm bo'ladigan va chuqur ta'mli xamir beradi.",
      "craft.imported": "Italiyadan",
      "craft.quote.text": "Biz olovni shoshiltirmaymiz va xamirni hech qachon shoshiltirmaymiz.",
      "craft.quote.by": "— Bizning pitsayolarimiz",
      "craft.four.flour": "Un", "craft.four.water": "Suv", "craft.four.salt": "Tuz", "craft.four.time": "Vaqt",
      "craft.four.text": "Xamirimizda to'rtta tarkibiy qism bor. Oxirgisini topish eng qiyini.",
      "visit.eyebrow": "Manzil · Joylashuv va ish vaqti", "visit.title1": "Olov yonida", "visit.title2": "bir stol.",
      "visit.address": "Manzil", "visit.telephone": "Telefon", "visit.email": "Email",
      "visit.hours": "Ish vaqti", "visit.closed": "Yopiq", "visit.directions": "Yo'nalish",
      "day.monday": "Dushanba", "day.tueThu": "Sesh – Pay", "day.friSat": "Jum – Shan", "day.sunday": "Yakshanba",
      "footer.tagline": "Birinchi uchqundan beri o'tinda",
      "drawer.title": "Sizning buyurtmangiz", "drawer.empty": "Hozircha pechda hech narsa yo'q.",
      "drawer.subtotal": "Jami", "drawer.placeOrder": "Buyurtma berish",
      "drawer.emptyText": "Buyurtmani boshlash uchun menyudan maxsus pitsa tanlang.",
      "drawer.browseMenu": "Menyuni ko'rish",
      "drawer.pizzasReady": (c) => `${c} ta pitsa olovga tayyor.`,
      "drawer.openAria": (c) => `Buyurtmani ochish, ${c} ta mahsulot`,
      "drawer.removeAria": (name) => `${name}ni o'chirish`,
      "reserve.lead": "Olov yonida qachon qo'shilishni xohlaysiz — bizga ayting.",
      "reserve.name": "Ism", "reserve.email": "Email", "reserve.date": "Sana", "reserve.guests": "Mehmonlar",
      "reserve.time": "Vaqt", "reserve.confirm": "So'rovni tasdiqlash",
      "auth.title": "Buyurtma uchun kiring", "auth.lead": "Buyurtma berish uchun hisob yarating. Bir daqiqadan kam vaqt oladi.",
      "auth.tab.register": "Ro'yxatdan o'tish", "auth.tab.login": "Kirish",
      "auth.name": "Ism va familiya", "auth.email": "Email", "auth.password": "Parol", "auth.confirm": "Parolni takrorlang",
      "auth.passHint": "Kamida 6 ta belgi",
      "auth.register": "Hisob yaratish", "auth.login": "Kirish",
      "auth.haveAccount": "Hisobingiz bormi?", "auth.noAccount": "Yangi mijozmisiz?",
      "auth.signIn": "Kirish", "auth.logout": "Chiqish",
      "auth.account": (n) => `Hisob: ${n}`,
      "auth.loginTitle": "Xush kelibsiz", "auth.loginLead": "Buyurtmani davom ettirish uchun kiring.",
      "auth.needed": "Buyurtma berish uchun ro'yxatdan o'ting yoki kiring.",
      "auth.err.exists": "Bu email bilan hisob allaqachon mavjud. Kirib ko'ring.",
      "auth.err.bad": "Email yoki parol noto'g'ri.",
      "auth.err.short": "Parol kamida 6 ta belgidan iborat bo'lishi kerak.",
      "auth.err.match": "Parollar mos kelmadi.",
      "auth.err.storage": "Hisobni saqlab bo'lmadi. Maxfiy rejim yoqilganmi?",
      "auth.err.generic": "Xatolik yuz berdi. Qayta urinib ko'ring.",
      "auth.toast.welcome": (n) => n ? `Xush kelibsiz, ${n}!` : "Xush kelibsiz!",
      "auth.toast.bye": "Siz hisobdan chiqdingiz.",
      "toast.added": (name) => `${name} buyurtmaga qo'shildi`,
      "toast.viewOrder": "Buyurtmani ko'rish",
      "toast.orderReceived": "Buyurtma qabul qilindi — pitsalaringiz olovga yuborilmoqda.",
      "toast.orderReceivedDesc": "Taxminan 25 daqiqada tayyor bo'ladi.",
      "toast.thanks": (name, guests) => `Rahmat, ${name}! ${guests} kishilik stol so'raldi.`,
      "toast.thanksDesc": (date, slot) => `${date}, soat ${slot}. Email orqali tasdiqlaymiz.`
    }
  };

  const LANGS = ["en", "ru", "uz"];
  const STORAGE_KEY = "ff-lang";
  let current = (() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.includes(saved)) return saved;
    } catch (e) {}
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : "en";
  })();

  function t(key, ...args) {
    const entry = (DICT[current] && DICT[current][key]) ?? (DICT.en && DICT.en[key]);
    if (typeof entry === "function") return entry(...args);
    return entry ?? key;
  }

  function applyToDom() {
    document.documentElement.setAttribute("lang", current);
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (typeof val === "string") el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
    });
    const curBtn = document.getElementById("lang-current");
    if (curBtn) curBtn.textContent = current.toUpperCase();
    document.querySelectorAll("#lang-menu li").forEach((li) => {
      li.setAttribute("aria-selected", String(li.dataset.lang === current));
    });
    document.dispatchEvent(new CustomEvent("ff-lang-changed", { detail: { lang: current } }));
  }

  function setLang(lang) {
    if (!LANGS.includes(lang) || lang === current) {
      if (lang === current) applyToDom();
      return;
    }
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyToDom();
  }

  window.FF_I18N = { t, setLang, getLang: () => current, LANGS };

  document.addEventListener("DOMContentLoaded", () => {
    applyToDom();
    const btn = document.getElementById("lang-btn");
    const menu = document.getElementById("lang-menu");
    const wrap = document.getElementById("lang-switch");
    if (!btn || !menu || !wrap) return;
    const close = () => { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); };
    const open = () => { menu.hidden = false; btn.setAttribute("aria-expanded", "true"); };
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menu.hidden) open(); else close();
    });
    menu.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-lang]");
      if (!li) return;
      setLang(li.dataset.lang);
      close();
    });
    document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  });
})();
