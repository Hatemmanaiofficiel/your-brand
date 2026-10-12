import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, Truck, Menu, X, CheckCircle2, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";
import { MovingSectionDivider } from "./MovingSectionDivider";

export function Header() {
  const { t, lang, setLang, count, wish } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const nav = useNavigate();
  const go = (e: React.FormEvent) => { e.preventDefault(); nav({ to: "/boutique", search: { q } }); setSearchOpen(false); };
  const ar = lang === "ar";
  const links = [
    { to: "/boutique" as const, label: t("shop") },
    { to: "/pro" as const, label: t("pro") },
    { to: "/fournisseur" as const, label: t("supplier") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b-2 border-foreground">
      {/* Free delivery banner */}
      <div className="bg-[var(--hero-bg)] py-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-[var(--hero-text)]">
        <Truck className="me-1.5 inline h-3 w-3" />
        {t("freeDelivery")}
      </div>

      <div className="container-x flex items-center justify-between gap-3 py-3 md:gap-5">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--hero-bg)] font-display text-sm font-black text-[var(--hero-text)]">
              Y/B
            </span>
            <span className="hidden font-display text-xl font-bold sm:block tracking-tight">
              Your Brand
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition"
              activeProps={{ className: "text-primary!" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/boutique"
            search={{ promo: true }}
            className="text-sm font-bold text-primary inline-flex items-center gap-1"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("promos")}
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Search toggle (mobile) */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-full hover:bg-muted transition"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Desktop search bar */}
          <form onSubmit={go} className="relative hidden md:block">
            <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search")}
              className="field! rounded-full! ps-10 h-9 w-56 lg:w-72 text-sm"
              style={{ borderRadius: "9999px", padding: "0 1rem 0 2.5rem" }}
            />
          </form>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
            className="pill text-xs font-bold"
          >
            {lang === "fr" ? "عربي" : "FR"}
          </button>

          {/* Wishlist */}
          <Link
            to="/boutique"
            search={{ fav: true }}
            className="relative hidden p-2 sm:block rounded-full hover:bg-muted transition"
            aria-label={t("wishlist")}
          >
            <Heart className="h-5 w-5" />
            {wish.length > 0 && <Badge n={wish.length} />}
          </Link>

          {/* Cart */}
          <Link
            to="/panier"
            className="relative btn btn-primary py-2! px-3!"
            aria-label={t("cart")}
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {count > 0 && <span className="font-bold">{count}</span>}
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="container-x pb-3 md:hidden animate-rise">
          <form onSubmit={go} className="relative">
            <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search")}
              autoFocus
              className="field! ps-10"
              style={{ borderRadius: "9999px" }}
            />
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {open && (
        <nav className="container-x flex flex-col gap-1 pb-4 md:hidden border-t border-foreground/10 pt-3 animate-rise">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-semibold hover:text-primary transition"
              activeProps={{ className: "text-primary!" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/boutique"
            search={{ promo: true }}
            onClick={() => setOpen(false)}
            className="py-2 text-sm font-bold text-primary inline-flex items-center gap-1"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("promos")} ↗
          </Link>
        </nav>
      )}
    </header>
  );
}

function Badge({ n, dark }: { n: number; dark?: boolean }) {
  return (
    <span className={`absolute -end-1 -top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full px-1 text-[10px] font-black ${dark ? "bg-foreground text-background" : "bg-[var(--hero-text)] text-foreground"}`}>
      {n}
    </span>
  );
}

export function Footer() {
  const { lang, openCookieModal } = useStore();
  const ar = lang === "ar";

  return (
    <footer className="mt-20 bg-charcoal text-charcoal-foreground relative">
      {/* Moving Scalloped Wavy Section Divider separating content from Footer */}
      <MovingSectionDivider
        topColor="transparent"
        bottomColor="var(--charcoal)"
        variant="scallop"
        height={34}
        speedSeconds={18}
      />

      <div className="container-x grid gap-10 pt-6 pb-14 md:grid-cols-4">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-sm font-black text-primary-foreground">Y/B</span>
            <span className="font-display text-xl font-bold">Your Brand</span>
          </div>

          <p className="text-sm opacity-65 leading-relaxed">
            {ar ? "بقالتك التونسية على الإنترنت — توصيل سريع في 24–48 ساعة لكامل تونس." : "Votre épicerie tunisienne en ligne — livraison 24–48h partout en Tunisie."}
          </p>
          <button
            onClick={openCookieModal}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-charcoal-foreground/30 bg-charcoal-foreground/10 px-3.5 py-1.5 text-xs font-bold text-charcoal-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
          >
            <span>🍪</span>
            <span>{ar ? "مرحبا بي · إدارة الكوكيز" : "Cookies & Confidentialité"}</span>
          </button>
        </div>

        {/* Column 2: Shop */}
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[var(--secondary)] mb-3">{ar ? "التسوق" : "Boutique"}</div>
          <ul className="space-y-2 text-sm opacity-75">
            {(ar
              ? ["المتجر", "العروض الترويجية", "منتجات جديدة", "الأكثر مبيعاً"]
              : ["Boutique", "Promotions", "Nouveautés", "Meilleures ventes"]
            ).map((i) => (
              <li key={i}>
                <Link to="/boutique" className="hover:text-[var(--secondary)] transition">{i}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Pro */}
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[var(--secondary)] mb-3">{ar ? "المهنيون" : "Professionnels"}</div>
          <ul className="space-y-2 text-sm opacity-75">
            {[
              { label: ar ? "فضاء المهنيين" : "Espace Pro", to: "/pro" as const },
              { label: ar ? "كن مزوّدا" : "Devenir fournisseur", to: "/fournisseur" as const },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-[var(--secondary)] transition">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[var(--secondary)] mb-3">{ar ? "قانوني" : "Légal"}</div>
          <ul className="space-y-2 text-sm opacity-75">
            {(ar
              ? ["سياسة الكوكيز", "الشروط العامة للبيع", "حماية المعطيات (INPDP)", "التوصيل والدفع"]
              : ["Politique cookies", "Conditions générales", "Données personnelles", "Livraison & paiement"]
            ).map((label) => (
              <li key={label}>
                <button onClick={openCookieModal} className="hover:text-[var(--secondary)] transition text-start">{label}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-foreground/10 py-4 text-center">
        <p className="text-xs opacity-50 flex flex-wrap items-center justify-center gap-3">
          <span>© 2026 Your Brand · {ar ? "تونس" : "Tunisie"}</span>
          <span>·</span>
          <button onClick={openCookieModal} className="hover:text-[var(--secondary)] underline">
            {ar ? "إدارة الكوكيز والشروط" : "Cookies & Termes"}
          </button>
          <span>·</span>
          <span className="font-display font-semibold text-primary" style={{ color: "var(--hero-text)", opacity: 1 }}>
            مرحبا بي · Marhba Bik
          </span>
        </p>
      </div>
    </footer>
  );
}

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 start-1/2 z-50 flex -translate-x-1/2 animate-rise items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-charcoal-foreground shadow-float rtl:translate-x-1/2">
      <CheckCircle2 className="h-4 w-4 text-fresh" />
      {toast}
    </div>
  );
}

export function SectionHead({ title, kicker, action }: { title: string; kicker?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="min-w-0">
        {kicker && <div className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">{kicker}</div>}
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
