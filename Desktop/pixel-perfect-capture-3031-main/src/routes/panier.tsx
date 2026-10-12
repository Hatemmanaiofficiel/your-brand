import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { fmt, products, useStore } from "@/lib/store";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Mon panier — Your Brand" },
      { name: "description", content: "Vérifiez votre panier et passez commande en quelques secondes." },
      { property: "og:title", content: "Mon panier — Your Brand" },
      { property: "og:description", content: "Votre panier de courses en ligne." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cart,
});

export function useTotals() {
  const { subtotal } = useStore();
  const delivery = subtotal >= 80 || subtotal === 0 ? 0 : 7;
  return { subtotal, delivery, total: subtotal + delivery };
}

export function Summary({ children }: { children?: React.ReactNode }) {
  const { t, lang } = useStore();
  const { subtotal, delivery, total } = useTotals();
  return (
    <div className="space-y-3 border border-foreground bg-card p-6 lg:sticky lg:top-40">
      <div className="flex justify-between text-sm"><span>{t("subtotal")}</span><span className="font-semibold">{fmt(subtotal, lang)}</span></div>
      <div className="flex justify-between text-sm"><span>{t("delivery")}</span><span className="font-semibold">{delivery ? fmt(delivery, lang) : <span className="text-fresh">{t("free")}</span>}</span></div>
      {subtotal < 80 && subtotal > 0 && <div className="border-s-4 border-primary bg-secondary p-2 text-xs">{lang === "ar" ? `أضف ${fmt(80 - subtotal, lang)} للتوصيل المجاني` : `Plus que ${fmt(80 - subtotal, lang)} pour la livraison offerte`}</div>}
      <div className="flex justify-between border-t pt-3 text-lg font-bold"><span>{t("total")}</span><span className="text-primary">{fmt(total, lang)}</span></div>
      {children}
    </div>
  );
}

function Cart() {
  const { cart, setQty, tl, lang, t } = useStore();
  const items = Object.entries(cart).flatMap(([id, q]) => {
    const p = products.find((product) => product.id === id);
    return p ? [{ p, q }] : [];
  });
  if (!items.length) return (
    <div className="container-x py-24 text-center">
      <ShoppingBag className="mx-auto h-14 w-14 text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-bold">{t("emptyCart")}</h1>
      <Link to="/boutique" className="btn btn-primary mt-6">{t("shopNow")}</Link>
    </div>
  );
  return (
    <div className="container-x py-8 sm:py-12">
      <p className="text-[10px] font-extrabold uppercase text-primary">{lang === "ar" ? "طلبك / 03" : "Votre sélection / 03"}</p>
      <h1 className="mt-2 border-b border-foreground pb-6 text-4xl font-extrabold uppercase sm:text-6xl">{t("cart")}</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map(({ p, q }) => (
            <div key={p.id} className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 border border-foreground bg-card p-3">
              <img src={p.img} alt="" className="h-[72px] w-[72px] object-cover" />
              <div className="min-w-0">
                <div className="truncate font-semibold">{tl(p.name)}</div>
                <div className="text-sm text-muted-foreground">{fmt(p.price, lang)} · {p.weight}</div>
                <div className="mt-2 inline-flex items-center border border-foreground">
                  <button className="p-1.5" onClick={() => setQty(p.id, q - 1)} aria-label="-"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-7 text-center text-sm font-bold">{q}</span>
                  <button className="p-1.5" onClick={() => setQty(p.id, q + 1)} aria-label="+"><Plus className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold">{fmt(p.price * q, lang)}</span>
                <button onClick={() => setQty(p.id, 0)} className="text-muted-foreground hover:text-destructive" aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
        <Summary><Link to="/commande" className="btn btn-primary w-full">{t("checkout")}</Link></Summary>
      </div>
    </div>
  );
}
