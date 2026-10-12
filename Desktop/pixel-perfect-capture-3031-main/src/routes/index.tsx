import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle2,
  CreditCard,
  Handshake,
  Leaf,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { categories, products, brands, images, useStore, fmt } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import {
  CruxEditorialMarquee,
  CruxIngredientWheel,
} from "@/components/MotionDecorations";
import { MovingSectionDivider } from "@/components/MovingSectionDivider";
import groceryHero from "@/assets/grocery_hero.jpg";
import snackFlat from "@/assets/snack_flat.jpg";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Your Brand — L'épicerie tunisienne, autrement" },
      { name: "description", content: "Biscuits, chocolat, boissons, dattes et conserves livrés partout en Tunisie en 24–48h." },
      { property: "og:title", content: "Your Brand — L'épicerie tunisienne, autrement" },
      { property: "og:description", content: "5 000+ produits essentiels livrés partout en Tunisie." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
}));

const TABS = ["all", "best", "new", "promo"] as const;
type Tab = (typeof TABS)[number];

const TAB_LABELS: Record<Tab, { fr: string; ar: string }> = {
  all:   { fr: "Tout", ar: "الكل" },
  best:  { fr: "Meilleures ventes", ar: "الأكثر مبيعاً" },
  new:   { fr: "Nouveautés", ar: "جديد" },
  promo: { fr: "Promotions", ar: "عروض" },
};

const REVIEWS = [
  { name: "Sarra B.", city: "Tunis", rating: 5, text: { fr: "Livraison ultra-rapide, produits impeccables. Je recommande à tous !", ar: "توصيل سريع جداً ومنتجات ممتازة. أنصح به الجميع!" } },
  { name: "Khaled M.", city: "Sfax", rating: 5, text: { fr: "Meilleure épicerie en ligne que j'ai essayée en Tunisie. Prix imbattables.", ar: "أفضل بقالة إلكترونية جربتها في تونس. أسعار لا تقاوم." } },
  { name: "Amira T.", city: "Sousse", rating: 5, text: { fr: "Les Dattes Deglet Nour sont incroyables. Fraîcheur garantie !", ar: "تمر دقلة نور رائع ومميز. الطازجة مضمونة دائماً!" } },
];

const COMPARE_ROWS: { key: string; fr: string; ar: string; us: boolean; them: boolean }[] = [
  { key: "r1", fr: "Livraison 24–48h en Tunisie", ar: "توصيل 24-48 ساعة في تونس", us: true, them: false },
  { key: "r2", fr: "Paiement à la livraison (COD)", ar: "الدفع عند الاستلام", us: true, them: false },
  { key: "r3", fr: "Produits authentiques tunisiens", ar: "منتجات تونسية أصيلة", us: true, them: true },
  { key: "r4", fr: "Interface bilingue FR / العربية", ar: "واجهة ثنائية اللغة FR / عربي", us: true, them: false },
  { key: "r5", fr: "Prix transparents sans frais cachés", ar: "أسعار شفافة بلا رسوم مخفية", us: true, them: true },
  { key: "r6", fr: "Service client réactif & humain", ar: "دعم عملاء سريع وإنساني", us: true, them: false },
];

function Home() {
  const { t, tl, lang } = useStore();
  const ar = lang === "ar";
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filteredProducts = (() => {
    const all = products.slice(0, 8);
    if (activeTab === "all")   return all;
    if (activeTab === "best")  return products.filter((p) => p.tags.includes("best")).slice(0, 8);
    if (activeTab === "new")   return products.filter((p) => p.tags.includes("new")).slice(0, 8);
    if (activeTab === "promo") return products.filter((p) => p.old).slice(0, 8);
    return all;
  })();

  const deal = products.find((p) => p.id === "p9");

  return (
    <div>
      {/* ── 1. HERO ── */}
      <section className="relative bg-hero text-[var(--hero-text)] overflow-hidden">
        <div className="container-x grid md:grid-cols-2 items-center gap-8 py-14 md:py-20 lg:py-24 relative z-10">
          {/* Left: copy */}
          <div className="order-2 md:order-1 animate-editorial-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--hero-text)]/20 border border-[var(--hero-text)]/30 px-3.5 py-1 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
              <span>{ar ? "بقالتك الأولى في تونس" : "L'épicerie #1 en Tunisie"}</span>
            </div>

            <h1 className="font-display text-4xl font-black uppercase leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
              {ar ? (
                <>
                  كل ما تحتاجه،
                  <br />
                  <span className="text-card">يُوصَّل لبابك.</span>
                </>
              ) : (
                <>
                  Tout votre quotidien,
                  <br />
                  <span className="text-card">livré chez vous.</span>
                </>
              )}
            </h1>

            <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed opacity-90 font-medium">
              {t("heroSub")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/boutique" className="btn btn-hero text-base px-7! shadow-lift hover:scale-105 transition-transform">
                {t("shopNow")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link to="/boutique" search={{ promo: true }} className="btn btn-outline border-[var(--hero-text)]! text-[var(--hero-text)]! text-base px-6! hover:bg-[var(--hero-text)]! hover:text-foreground!">
                {t("seePromos")}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center gap-4 opacity-90 text-xs font-bold">
              <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-[var(--hero-text)]" />{ar ? "توصيل مجاني +80 د.ت" : "Livraison offerte +80 DT"}</span>
              <span className="flex items-center gap-1.5"><Banknote className="h-4 w-4 text-[var(--hero-text)]" />{ar ? "دفع عند الاستلام" : "Paiement à la livraison"}</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[var(--hero-text)]" />{ar ? "شراء آمن 100%" : "100% sécurisé"}</span>
            </div>
          </div>

          {/* Right: hero image with authentic CRUX badges */}
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-foreground shadow-[0_20px_60px_oklch(0_0_0/35%)] animate-pop-in bg-card">
              <img
                src={groceryHero}
                alt={ar ? "منتجات بقالة تونسية" : "Produits épicerie tunisienne"}
                width={1000}
                height={700}
                className="w-full object-cover aspect-[4/3] md:aspect-[3/2] transition duration-700 hover:scale-105"
              />
            </div>

            {/* Floating Energy badge (CRUX style) */}
            <div className="absolute -bottom-4 -start-4 z-20 animate-float rounded-2xl bg-card text-foreground px-4 py-3 shadow-lift border-2 border-foreground">
              <div className="text-[11px] font-bold text-muted-foreground uppercase">{ar ? "المبيعات الشهرية" : "Ventes / mois"}</div>
              <div className="font-display text-xl font-black text-primary">+5 000 🎉</div>
            </div>

            {/* Stars floating badge */}
            <div className="absolute -top-4 -end-4 z-20 animate-float-alt rounded-full bg-[var(--hero-text)] text-foreground border-2 border-foreground px-3.5 py-2 shadow-card text-xs font-black">
              ⭐ 4.9 / 5
            </div>

            {/* 100% Bio Wiggle Sticker */}
            <div className="absolute top-6 -start-5 z-20 animate-wiggle rounded-full bg-accent border-2 border-foreground px-3 py-1 text-xs font-black text-foreground shadow-card hidden sm:flex items-center gap-1">
              <span>⚡</span>
              <span>{ar ? "طبيعي ١٠٠٪" : "100% PUR"}</span>
            </div>
          </div>
        </div>

        {/* Fluid Organic Wave Divider that morphs and changes shape smoothly */}
        <MovingSectionDivider
          topColor="var(--hero-bg)"
          bottomColor="var(--primary)"
          variant="fluid"
          height={58}
          speedSeconds={6}
        />
      </section>

      {/* ── 2. HIGH-IMPACT CRUX MARQUEE TICKER ── */}
      <CruxEditorialMarquee
        items={[
          "SMART ↗",
          "STAY STRONG ↗",
          "FEEL LIGHTER ↗",
          "FUEL YOUR DAY ↗",
          "ÉPICERIE TUNISIENNE ↗",
          "100% AUTHENTIQUE ↗",
          "LIVRAISON 24-48H ↗",
          "QUALITÉ GARANTIE ↗",
        ]}
      />

      {/* Fluid Organic Wave Divider into main content */}
      <MovingSectionDivider
        topColor="var(--primary)"
        bottomColor="var(--background)"
        variant="fluid"
        height={52}
        speedSeconds={7}
      />

      {/* ── 3. CATEGORIES ── */}
      <section className="container-x mt-16 sm:mt-20">
        <div className="text-center mb-10">
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">{ar ? "استكشف" : "Explorer"}</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl uppercase">{t("categories")}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, idx) => {
            const emojis = ["🍪", "🍫", "🥨", "🥤", "🥣", "🥫"];
            return (
              <Link
                key={cat.id}
                to="/boutique"
                search={{ cat: cat.id }}
                className="group flex flex-col items-center gap-2 rounded-2xl border-2 border-foreground bg-card p-5 text-center transition duration-300 hover:bg-hero hover:border-[var(--hero-bg)] hover:text-[var(--hero-text)] hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="text-3xl group-hover:animate-wiggle">{emojis[idx] ?? "🛒"}</span>
                <span className="font-display text-sm font-semibold leading-tight">{tl(cat.name)}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 4. BEST SELLERS with Tabs ── */}
      <section className="container-x mt-16 sm:mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">{ar ? "الأكثر طلباً" : "Best sellers"}</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl uppercase">{ar ? "قرّاؤنا اختاروا جيداً." : "Reader, they chose well."}</h2>
          </div>
          <Link to="/boutique" className="btn btn-outline shrink-0">
            {t("seeAll")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pill ${activeTab === tab ? "pill-active" : ""}`}
            >
              {TAB_LABELS[tab][lang]}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* ── 5. FEATURE DEAL (editorial large section) ── */}
      {deal && (
        <section className="mt-20 bg-secondary relative">
          {/* Moving Scallop Divider into Deal */}
          <MovingSectionDivider
            topColor="var(--background)"
            bottomColor="var(--secondary)"
            variant="scallop"
            height={34}
            speedSeconds={18}
          />

          <div className="container-x grid md:grid-cols-2 items-center gap-0 overflow-hidden rounded-none md:rounded-3xl my-0 md:my-8">
            {/* Copy */}
            <div className="p-8 sm:p-12 lg:p-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-widest mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                {ar ? "عرض الأسبوع" : "Édition limitée"}
              </div>
              <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl lg:text-5xl leading-[1.05]">
                {tl(deal.name)}
              </h2>
              <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm">
                {tl(deal.desc)}
              </p>
              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <div>
                  <div className="font-display text-4xl font-bold text-primary">{fmt(deal.price, lang)}</div>
                  {deal.old && <div className="text-sm line-through text-muted-foreground">{fmt(deal.old, lang)}</div>}
                </div>
                <Link to="/produit/$id" params={{ id: deal.id }} className="btn btn-primary">
                  {t("shopNow")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden min-h-72 md:min-h-full">
              <img
                src={deal.img}
                alt={tl(deal.name)}
                className="h-full w-full object-cover aspect-[4/3] md:aspect-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Moving Wave Divider leaving Deal */}
          <MovingSectionDivider
            topColor="var(--secondary)"
            bottomColor="var(--background)"
            variant="wave"
            height={38}
            speedSeconds={20}
          />
        </section>
      )}

      {/* ── 6. USPs / INGREDIENTS "stuff you can trust" ── */}
      <section className="container-x mt-16 sm:mt-24">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          {/* Image side */}
          <div className="relative rounded-3xl overflow-hidden border-3 border-foreground shadow-lift">
            <img
              src={snackFlat}
              alt={ar ? "منتجات طبيعية تونسية" : "Ingrédients authentiques tunisiens"}
              className="w-full h-full object-cover aspect-[4/3] transition duration-700 hover:scale-105"
            />
          </div>

          {/* Content side */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">{ar ? "جودة حقيقية" : "Ingrédients de qualité"}</p>
            <h2 className="font-display text-3xl font-black sm:text-4xl uppercase leading-[1.05]">
              {ar ? "مكونات تعرفها.\nطبيعية ومضمونة." : "Des ingrédients\nque vous reconnaissez."}
            </h2>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-sm">
              {ar
                ? "نختار منتجاتنا بعناية من موردين موثوقين في تونس. تمر دقلة نور، هريسة تقليدية، زيت زيتون أصيل — كلها منتجات تعرف أصلها."
                : "Nous sélectionnons nos produits auprès de fournisseurs tunisiens de confiance. Dattes Deglet Nour, harissa traditionnelle, huile d'olive authentique — des produits dont vous connaissez l'origine."}
            </p>

            <ul className="mt-6 space-y-3">
              {[
                { icon: Leaf, fr: "Produits authentiques sélectionnés", ar: "منتجات أصيلة مختارة بعناية" },
                { icon: ShieldCheck, fr: "Dates limites vérifiées à chaque envoi", ar: "تواريخ الصلاحية مفحوصة قبل كل طلب" },
                { icon: Zap, fr: "Emballage soigné pour garder la fraîcheur", ar: "تغليف محكم للحفاظ على الطازجية" },
                { icon: Truck, fr: "Livraison partout en Tunisie en 24–48h", ar: "توصيل لكامل تونس في 24-48 ساعة" },
              ].map(({ icon: Icon, fr, ar: arText }) => (
                <li key={fr} className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-sm font-bold">{ar ? arText : fr}</span>
                </li>
              ))}
            </ul>

            <Link to="/boutique" className="btn btn-primary mt-8 inline-flex shadow-lift hover:scale-105 transition-transform">
              {t("shopNow")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* CRUX Iconic "Stuff You Can Pronounce" Interactive Component */}
        <CruxIngredientWheel lang={lang as "fr" | "ar"} />
      </section>

      {/* ── 7. COMPARISON TABLE ── */}
      <section className="mt-16 sm:mt-24 bg-secondary border-y-2 border-foreground relative overflow-hidden">
        {/* Moving Sawtooth Zigzag Divider into Comparison */}
        <MovingSectionDivider
          topColor="var(--background)"
          bottomColor="var(--secondary)"
          variant="zigzag"
          height={26}
          speedSeconds={15}
        />

        <div className="container-x py-14 sm:py-20">
          <div className="text-center mb-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">{ar ? "لماذا نحن؟" : "Pourquoi nous ?"}</p>
            <h2 className="font-display text-3xl font-black sm:text-4xl uppercase">
              {ar ? "الفرق الحقيقي." : "Snacks for you.\nSee the difference."}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl mx-auto rounded-2xl border-2 border-foreground bg-card shadow-lift overflow-hidden">
              <thead className="bg-muted border-b-2 border-foreground">
                <tr>
                  <th className="text-start text-xs sm:text-sm font-black p-4 w-1/2 uppercase">{ar ? "المعيار" : "Critère"}</th>
                  <th className="text-center text-xs sm:text-sm font-black p-4 text-primary uppercase">Your Brand</th>
                  <th className="text-center text-xs sm:text-sm font-bold p-4 text-muted-foreground uppercase">{ar ? "المنافسون" : "Autres"}</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-foreground/10">
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.key} className="transition hover:bg-card/50">
                    <td className="py-3.5 text-sm font-medium">{ar ? row.ar : row.fr}</td>
                    <td className="py-3.5 text-center">
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm ${row.us ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {row.us ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-3 w-3" />}
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm ${row.them ? "bg-muted text-muted-foreground" : "bg-destructive/10 text-destructive"}`}>
                        {row.them ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-3 w-3" />}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link to="/boutique" className="btn btn-primary">
              {ar ? "تسوّق الآن" : "Découvrir la boutique"} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Moving Scallop Divider leaving Comparison */}
        <MovingSectionDivider
          topColor="var(--secondary)"
          bottomColor="var(--background)"
          variant="scallop"
          height={34}
          speedSeconds={18}
        />
      </section>

      {/* ── 8. REVIEWS ── */}
      <section className="container-x mt-16 sm:mt-24">
        <div className="text-center mb-10">
          <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">{ar ? "آراء العملاء" : "Avis clients"}</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl uppercase">
            4.9 / 5
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            {ar ? "من أكثر من 50,000 عميل راضٍ 🎉" : "depuis 50 000+ clients satisfaits 🎉"}
          </p>
          {/* Stars row */}
          <div className="flex justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[var(--hero-text)] text-[var(--hero-text)]" />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-card hover:-translate-y-1 transition duration-300">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[var(--hero-text)] text-[var(--hero-text)]" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/80 mb-4">"{r.text[lang as "fr" | "ar"]}"</p>
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-primary font-display font-bold text-xs text-primary-foreground">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city}, Tunisie</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. TRUST FEATURES ── */}
      <section className="container-x mt-14 sm:mt-20 mb-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Truck, title: ar ? "توصيل 24–48 ساعة" : "Livraison 24–48h", copy: ar ? "في كامل تونس" : "Partout en Tunisie" },
            { icon: CreditCard, title: ar ? "دفع إلكتروني آمن" : "E-paiement sécurisé", copy: ar ? "بطاقات CIB وe-Dinar" : "Cartes CIB, e-Dinar" },
            { icon: Banknote, title: ar ? "دفع عند الاستلام" : "Paiement livraison", copy: ar ? "نقداً للمندوب" : "Espèces au livreur" },
            { icon: ShieldCheck, title: ar ? "شراء 100% آمن" : "Achat 100% protégé", copy: ar ? "خطوات واضحة ومضمونة" : "Parcours transparent" },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex flex-col items-center gap-2 rounded-2xl bg-card border-2 border-foreground p-4 sm:p-6 text-center shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-extrabold uppercase">{title}</h3>
              <p className="text-xs text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. BUSINESS PANELS ── */}
      <section className="container-x mt-10 mb-16 grid gap-4 md:grid-cols-2">
        <BusinessPanel
          to="/pro"
          icon={Building2}
          title={ar ? "فضاء المهنيين" : "Espace professionnels"}
          copy={ar ? "حلول شراء مخصصة للمقاهي والفنادق والمطاعم." : "Solutions d'achat dédiées aux cafés, hôtels et restaurants tunisiens."}
          action={ar ? "طلب عرض سعر" : "Demander un devis"}
          dark
        />
        <BusinessPanel
          to="/fournisseur"
          icon={Handshake}
          title={t("supplier")}
          copy={ar ? "قدّم منتجاتك لعملاء في كامل ولايات تونس." : "Proposez vos produits à des clients dans toute la Tunisie."}
          action={ar ? "تقديم منتجاتي" : "Proposer mes produits"}
        />
      </section>
    </div>
  );
}

function BusinessPanel({
  to, icon: Icon, title, copy, action, dark = false,
}: {
  to: "/pro" | "/fournisseur";
  icon: typeof Building2;
  title: string;
  copy: string;
  action: string;
  dark?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative flex min-h-64 flex-col justify-between rounded-2xl p-7 transition duration-300 overflow-hidden ${
        dark
          ? "bg-charcoal text-charcoal-foreground"
          : "bg-secondary text-foreground border-2 border-foreground"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5 rtl:rotate-180" />
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold uppercase sm:text-3xl mt-8">{title}</h2>
        <p className={`mt-3 text-sm leading-relaxed max-w-sm ${dark ? "opacity-65" : "text-muted-foreground"}`}>
          {copy}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-sm border-b-2 border-current pb-0.5">
          {action} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}
