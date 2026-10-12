import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Box, Candy, Coffee, Cookie, PackageOpen, SlidersHorizontal, Wine } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { brands, categories, products, useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

const schema = z.object({
  q: z.string().optional(), cat: z.string().optional(),
  promo: z.boolean().optional(), fav: z.boolean().optional(),
});

export const Route = createFileRoute("/boutique")({
  validateSearch: (s) => schema.parse(s),
  head: () => ({
    meta: [
      { title: "Boutique — Your Brand" },
      { name: "description", content: "Parcourez tous les rayons : biscuits, chocolat, snacks, boissons, petit-déjeuner, conserves. Filtres et tri rapides." },
      { property: "og:title", content: "Boutique — Your Brand" },
      { property: "og:description", content: "Tous les produits alimentaires, filtrés et triés en un clic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const s = Route.useSearch();
  const nav = useNavigate({ from: "/boutique" });
  const { t, tl, lang, wish } = useStore();
  const ar = lang === "ar";
  const [sort, setSort] = useState("pop");
  const [max, setMax] = useState(25);
  const [sel, setSel] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const list = useMemo(() => {
    let l = products.filter((p) =>
      (!s.cat || p.cat === s.cat) && (!s.promo || p.old) && (!s.fav || wish.includes(p.id)) &&
      p.price <= max && (!sel.length || sel.includes(p.brand)) &&
      (!s.q || (p.name.fr + p.name.ar + p.brand).toLowerCase().includes(s.q.toLowerCase())));
    if (sort === "asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "desc") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rate") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [s, sort, max, sel, wish]);

  const categoryIcons = [Cookie, Candy, PackageOpen, Wine, Coffee, Box];
  const chip = (active: boolean) => `shrink-0 border px-4 py-2 text-xs font-extrabold uppercase transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-foreground bg-card hover:bg-foreground hover:text-background"}`;
  const currentCategory = categories.find((category) => category.id === s.cat);

  return (
    <div className="container-x py-8 sm:py-12">
      <div className="border-b border-foreground pb-6">
        <p className="text-[10px] font-extrabold uppercase text-primary">{ar ? "الفهرس / 02" : "Catalogue / 02"}</p>
        <h1 className="mt-2 text-4xl font-extrabold uppercase sm:text-6xl">{s.fav ? t("wishlist") : s.promo ? t("promos") : currentCategory ? tl(currentCategory.name) : t("shop")}</h1>
      </div>
      {s.q && <p className="mt-1 text-muted-foreground">« {s.q} »</p>}
      <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-2">
        <button className={chip(!s.cat)} onClick={() => nav({ search: { ...s, cat: undefined } })}>{t("all")}</button>
        {categories.map((c, index) => { const Icon = categoryIcons[index] ?? Box; return <button key={c.id} className={`${chip(s.cat === c.id)} flex items-center gap-2`} onClick={() => nav({ search: { ...s, cat: c.id } })}><Icon className="h-4 w-4" />{tl(c.name)}</button>; })}
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className={`${open ? "block" : "hidden"} space-y-6 border border-foreground bg-card p-5 lg:block lg:self-start`}>
          <div>
            <div className="mb-2 text-sm font-bold">{ar ? "السعر الأقصى" : "Prix maximum"} : {max} DT</div>
            <input type="range" min={1} max={25} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-primary" />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={!!s.promo} onChange={(e) => nav({ search: { ...s, promo: e.target.checked || undefined } })} className="accent-primary" />{t("promos")}
          </label>
          <div>
            <div className="mb-2 text-sm font-bold">{ar ? "العلامات" : "Marques"}</div>
            <div className="space-y-1.5">{brands.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-primary" checked={sel.includes(b)} onChange={() => setSel((x) => x.includes(b) ? x.filter((y) => y !== b) : [...x, b])} />{b}</label>
            ))}</div>
          </div>
        </aside>
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <button onClick={() => setOpen(!open)} className="btn btn-ghost py-2! lg:hidden"><SlidersHorizontal className="h-4 w-4" />{t("filters")}</button>
            <span className="text-sm text-muted-foreground">{list.length} {ar ? "منتج" : "produits"}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="field w-auto! py-2!">
              <option value="pop">{ar ? "الأكثر شعبية" : "Popularité"}</option>
              <option value="asc">{ar ? "السعر: تصاعدي" : "Prix croissant"}</option>
              <option value="desc">{ar ? "السعر: تنازلي" : "Prix décroissant"}</option>
              <option value="rate">{ar ? "الأعلى تقييما" : "Mieux notés"}</option>
            </select>
          </div>
          {list.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          ) : <div className="border border-foreground bg-card p-12 text-center text-muted-foreground">{ar ? "لا توجد منتجات." : "Aucun produit trouvé."}</div>}
        </div>
      </div>
    </div>
  );
}
