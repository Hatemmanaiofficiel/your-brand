import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Star, Truck, Banknote, CreditCard } from "lucide-react";
import { useState } from "react";
import { fmt, products, useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/Layout";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => loaderData ? {
    meta: [
      { title: `${loaderData.p.name.fr} — Your Brand` },
      { name: "description", content: loaderData.p.desc.fr },
      { property: "og:title", content: `${loaderData.p.name.fr} — Your Brand` },
      { property: "og:description", content: loaderData.p.desc.fr },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  } : { meta: [{ title: "Produit introuvable" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => <div className="container-x py-24 text-center"><h1 className="text-3xl font-bold">Produit introuvable</h1><Link to="/boutique" className="btn btn-primary mt-6">Boutique</Link></div>,
  component: ProductPage,
});

function ProductPage() {
  const { p } = Route.useLoaderData();
  const { tl, lang, add, wish, toggleWish, t } = useStore();
  const ar = lang === "ar";
  const [q, setQ] = useState(1);
  const related = products.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  return (
    <div className="container-x py-8 sm:py-12">
      <div className="grid border border-foreground md:grid-cols-2">
        <div className="group overflow-hidden border-b border-foreground bg-card md:border-b-0 md:border-e"><img src={p.img} alt={tl(p.name)} className="aspect-square h-full w-full object-cover saturate-[.85] transition duration-700 group-hover:scale-[1.03] group-hover:saturate-100" /></div>
        <div className="animate-rise p-6 sm:p-10">
          <div className="text-[10px] font-extrabold uppercase text-primary">{p.brand} / {p.cat}</div>
          <h1 className="mt-4 text-3xl font-extrabold uppercase leading-none sm:text-5xl">{tl(p.name)}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Star className="h-4 w-4 fill-accent text-accent" />{p.rating} · {p.weight}</div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-primary">{fmt(p.price, lang)}</span>
            {p.old && <span className="text-lg text-muted-foreground line-through">{fmt(p.old, lang)}</span>}
          </div>
          <p className="mt-6 leading-relaxed text-muted-foreground">{tl(p.desc)}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-foreground bg-card">
              <button className="p-3" onClick={() => setQ(Math.max(1, q - 1))} aria-label="-"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-bold">{q}</span>
              <button className="p-3" onClick={() => setQ(q + 1)} aria-label="+"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => add(p.id, q)} className="btn btn-primary flex-1">{t("add")} · {fmt(p.price * q, lang)}</button>
            <button onClick={() => toggleWish(p.id)} className="btn btn-ghost p-3!" aria-label={t("wishlist")}><Heart className={`h-5 w-5 ${wish.includes(p.id) ? "fill-primary text-primary" : ""}`} /></button>
          </div>
          <div className="mt-8 space-y-3 border border-foreground bg-secondary p-5 text-sm">
            <div className="flex items-center gap-3"><Truck className="h-5 w-5 text-primary" />{ar ? "توصيل في 24-48 ساعة في كامل تونس" : "Livraison 24–48h dans toute la Tunisie"}</div>
            <div className="flex items-center gap-3"><CreditCard className="h-5 w-5 text-primary" />{ar ? "دفع ببطاقة بنكية تونسية" : "Paiement par carte bancaire tunisienne"}</div>
            <div className="flex items-center gap-3"><Banknote className="h-5 w-5 text-fresh" />{ar ? "أو الدفع نقدا عند الاستلام" : "Ou paiement en espèces à la livraison"}</div>
          </div>
        </div>
      </div>
      {related.length > 0 && <section className="mt-16"><SectionHead title={ar ? "منتجات مشابهة" : "Produits similaires"} kicker={ar ? "اختيار إضافي" : "À découvrir"} /><div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div></section>}
    </div>
  );
}
