import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, CheckCircle2, CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { governorates, useStore, fmt } from "@/lib/store";
import { Summary, useTotals } from "./panier";

export const Route = createFileRoute("/commande")({
  head: () => ({
    meta: [
      { title: "Paiement rapide — Your Brand" },
      { name: "description", content: "Finalisez votre commande : carte bancaire tunisienne ou paiement à la livraison." },
      { property: "og:title", content: "Paiement rapide — Your Brand" },
      { property: "og:description", content: "Checkout express : e-paiement ou paiement à la livraison." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lang, t, count, clear, openCookieModal } = useStore();
  const { total } = useTotals();
  const ar = lang === "ar";
  const [pay, setPay] = useState<"card" | "cod">("card");
  const [done, setDone] = useState<null | number>(null);
  const [phoneErr, setPhoneErr] = useState(false);

  if (done !== null) return (
    <div className="container-x py-24 text-center animate-rise">
      <CheckCircle2 className="mx-auto h-16 w-16 text-fresh" />
      <h1 className="mt-4 text-3xl font-bold">{ar ? "تم تأكيد طلبك!" : "Commande confirmée !"}</h1>
      <p className="mt-2 text-muted-foreground">{ar ? `المبلغ: ${fmt(done, lang)} — سنتصل بك لتأكيد التوصيل.` : `Montant : ${fmt(done, lang)} — nous vous appelons pour confirmer la livraison.`}</p>
      <Link to="/" className="btn btn-primary mt-6">{ar ? "العودة للرئيسية" : "Retour à l'accueil"}</Link>
    </div>
  );
  if (!count) return <div className="container-x py-24 text-center"><h1 className="text-2xl font-bold">{t("emptyCart")}</h1><Link to="/boutique" className="btn btn-primary mt-6">{t("shopNow")}</Link></div>;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = String(new FormData(e.currentTarget).get("phone") || "").replace(/\s/g, "");
    if (!/^(\+216)?[2-9]\d{7}$/.test(phone)) { setPhoneErr(true); return; }
    setDone(total); clear();
  };
  const opt = (v: "card" | "cod") => `flex cursor-pointer items-start gap-3 border-2 p-4 transition ${pay === v ? "border-primary bg-secondary" : "border-foreground bg-card hover:border-primary"}`;

  return (
    <div className="container-x py-8 sm:py-12">
      <p className="text-[10px] font-extrabold uppercase text-primary">{ar ? "الخطوة الأخيرة / 04" : "Dernière étape / 04"}</p>
      <h1 className="mt-2 border-b border-foreground pb-6 text-4xl font-extrabold uppercase sm:text-6xl">{ar ? "إتمام الطلب" : "Paiement express"}</h1>
      <form onSubmit={submit} className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <legend className="mb-3 text-lg font-bold">1. {ar ? "معلومات التوصيل" : "Livraison"}</legend>
            <input required name="name" className="field" placeholder={ar ? "الاسم واللقب" : "Nom et prénom"} />
            <div>
              <div className="flex"><span className="field w-auto! rounded-e-none! border-e-0 text-muted-foreground" dir="ltr">+216</span><input required name="phone" dir="ltr" inputMode="tel" className="field rounded-s-none!" placeholder="20 123 456" onChange={() => setPhoneErr(false)} /></div>
              {phoneErr && <p className="mt-1 text-xs text-destructive">{ar ? "رقم هاتف تونسي غير صالح (8 أرقام)" : "Numéro tunisien invalide (8 chiffres)"}</p>}
            </div>
            <select required name="gov" className="field" defaultValue=""><option value="" disabled>{ar ? "الولاية" : "Gouvernorat"}</option>{governorates.map((g) => <option key={g}>{g}</option>)}</select>
            <input required name="city" className="field" placeholder={ar ? "المدينة / المعتمدية" : "Ville / Délégation"} />
            <input required name="address" className="field sm:col-span-2" placeholder={ar ? "العنوان الكامل" : "Adresse complète"} />
          </fieldset>
          <fieldset className="space-y-3">
            <legend className="mb-3 text-lg font-bold">2. {ar ? "طريقة الدفع" : "Paiement"}</legend>
            <label className={opt("card")}>
              <input type="radio" checked={pay === "card"} onChange={() => setPay("card")} className="mt-1 accent-primary" />
              <CreditCard className="h-6 w-6 shrink-0 text-primary" />
              <div><div className="font-bold">{ar ? "بطاقة بنكية تونسية / دفع إلكتروني" : "Carte bancaire tunisienne / e-paiement"}</div><div className="text-sm text-muted-foreground">{ar ? "بطاقات CIB وبطاقات e-Dinar — دفع آمن 3D Secure" : "Cartes CIB, e-Dinar — paiement sécurisé 3D Secure"}</div></div>
            </label>
            {pay === "card" && (
              <div className="grid animate-rise grid-cols-2 gap-3 border border-foreground bg-card p-4" dir="ltr">
                <input className="field col-span-2" placeholder="Numéro de carte" inputMode="numeric" />
                <input className="field" placeholder="MM/AA" />
                <input className="field" placeholder="CVV" inputMode="numeric" />
                <p className="col-span-2 flex items-center gap-1.5 text-xs text-muted-foreground"><Lock className="h-3.5 w-3.5" />{ar ? "نموذج تجريبي — لا يتم أي خصم" : "Démo — aucun débit réel"}</p>
              </div>
            )}
            <label className={opt("cod")}>
              <input type="radio" checked={pay === "cod"} onChange={() => setPay("cod")} className="mt-1 accent-primary" />
              <Banknote className="h-6 w-6 shrink-0 text-fresh" />
              <div><div className="font-bold">{ar ? "الدفع عند الاستلام" : "Paiement à la livraison"}</div><div className="text-sm text-muted-foreground">{ar ? "ادفع نقدا للمندوب عند الاستلام" : "Réglez en espèces au livreur"}</div></div>
            </label>
          </fieldset>
        </div>
        <Summary>
          <button type="submit" className="btn btn-primary w-full">{ar ? "تأكيد الطلب" : "Confirmer la commande"} · {fmt(total, lang)}</button>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            {ar ? (
              <span>
                بتأكيد طلبك، فإنك توافق على{" "}
                <button type="button" onClick={openCookieModal} className="font-bold underline text-foreground hover:text-primary">
                  الشروط العامة وسياسة الكوكيز
                </button>
                .
              </span>
            ) : (
              <span>
                En confirmant votre commande, vous acceptez nos{" "}
                <button type="button" onClick={openCookieModal} className="font-bold underline text-foreground hover:text-primary">
                  Conditions Générales & Politique de Cookies
                </button>
                .
              </span>
            )}
          </p>
        </Summary>
      </form>
    </div>
  );
}
