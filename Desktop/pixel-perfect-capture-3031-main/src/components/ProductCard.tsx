import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { fmt, useStore, type Product } from "@/lib/store";

export function ProductCard({ p, featured = false }: { p: Product; featured?: boolean }) {
  const { tl, lang, add, wish, toggleWish, t } = useStore();
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const liked = wish.includes(p.id);

  return (
    <article className={`group relative flex flex-col rounded-2xl bg-card border-2 border-foreground overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-lift ${featured ? "lg:flex-row" : ""}`}>
      {/* Image area */}
      <Link
        to="/produit/$id"
        params={{ id: p.id }}
        className={`relative block overflow-hidden bg-muted ${featured ? "lg:w-1/2 aspect-square lg:aspect-auto" : "aspect-[4/3]"}`}
      >
        <img
          src={p.img}
          alt={tl(p.name)}
          loading="lazy"
          width={600}
          height={600}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06] saturate-[.88] group-hover:saturate-100"
        />

        {/* Badges */}
        <div className="absolute start-3 top-3 flex flex-col gap-1.5">
          {off > 0 && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-primary-foreground shadow-sm">
              -{off}%
            </span>
          )}
          {p.tags.includes("new") && (
            <span className="rounded-full bg-[var(--hero-text)] px-2.5 py-0.5 text-[10px] font-bold uppercase text-foreground shadow-sm">
              {lang === "ar" ? "جديد" : "Nouveau"}
            </span>
          )}
          {p.tags.includes("best") && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-foreground shadow-sm">
              ⭐ {lang === "ar" ? "الأفضل" : "Best"}
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        aria-label={t("wishlist")}
        onClick={() => toggleWish(p.id)}
        className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-card/90 backdrop-blur shadow-sm border border-foreground/10 transition hover:scale-110"
      >
        <Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : "text-foreground/60"}`} />
      </button>

      {/* Content */}
      <div className={`flex flex-1 flex-col gap-2 p-4 ${featured ? "lg:p-6 lg:justify-center" : ""}`}>
        {/* Brand + rating row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="truncate font-medium">{p.brand} · {p.weight}</span>
          <span className="flex shrink-0 items-center gap-0.5 font-semibold">
            <Star className="h-3 w-3 fill-[var(--hero-text)] text-[var(--hero-text)]" />
            {p.rating}
          </span>
        </div>

        {/* Name */}
        <Link
          to="/produit/$id"
          params={{ id: p.id }}
          className="line-clamp-2 font-display text-base font-semibold leading-tight hover:text-primary transition"
        >
          {tl(p.name)}
        </Link>

        {/* Short description */}
        {featured && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{tl(p.desc)}</p>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="min-w-0">
            <div className="font-display text-lg font-black text-primary leading-none">
              {fmt(p.price, lang)}
            </div>
            {p.old && (
              <div className="text-xs text-muted-foreground line-through mt-0.5">
                {fmt(p.old, lang)}
              </div>
            )}
          </div>

          <button
            onClick={() => add(p.id)}
            aria-label={t("add")}
            className="btn btn-dark py-2! px-4! text-xs! flex items-center gap-1.5! shadow-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {t("add")}
          </button>
        </div>
      </div>
    </article>
  );
}
