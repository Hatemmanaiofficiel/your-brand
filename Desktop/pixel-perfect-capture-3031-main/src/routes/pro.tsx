import { createFileRoute } from "@tanstack/react-router";
import { BadgePercent, FileText, Truck, UserCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/pro")({
  head: () => ({
    meta: [
      { title: "Espace Professionnels — Achat en gros | Your Brand" },
      { name: "description", content: "Cafés, hôtels, restaurants et entreprises : tarifs de gros, facturation avec matricule fiscal, livraison planifiée." },
      { property: "og:title", content: "Espace Professionnels — Your Brand" },
      { property: "og:description", content: "Achat alimentaire en gros pour les professionnels en Tunisie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pro,
});

function Pro() {
  const { lang } = useStore();
  const ar = lang === "ar";
  const perks = [
    { i: BadgePercent, h: ar ? "أسعار تنازلية" : "Tarifs dégressifs", s: ar ? "حتى -25% حسب الكمية" : "Jusqu'à -25% selon volumes" },
    { i: FileText, h: ar ? "فاتورة بالمعرف الجبائي" : "Facture avec matricule fiscal", s: ar ? "دفع بالتحويل أو مؤجل" : "Virement ou paiement différé" },
    { i: Truck, h: ar ? "توصيل مبرمج" : "Livraison planifiée", s: ar ? "بالمنصات، في الموعد" : "Sur palettes, à heure fixe" },
    { i: UserCheck, h: ar ? "مستشار مخصص" : "Conseiller dédié", s: ar ? "متابعة شخصية لحسابك" : "Suivi personnalisé du compte" },
  ];
  return (
    <div>
      <section className="border-b border-foreground bg-charcoal text-charcoal-foreground">
        <div className="container-x py-16 sm:py-24">
          <div className="text-[10px] font-extrabold uppercase text-primary">B2B / 05</div>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold uppercase leading-none sm:text-7xl">{ar ? "الشراء بالجملة للمهنيين" : "L'achat en gros, pensé pour les pros."}</h1>
          <p className="mt-4 max-w-xl opacity-90">{ar ? "مقاهي، فنادق، مطاعم، مغازات، شركات وإدارات." : "Cafés, hôtels, restaurants, supérettes, entreprises et administrations."}</p>
        </div>
      </section>
      <section className="container-x grid border-s border-foreground sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(({ i: I, h, s }) => (
          <div key={h} className="min-h-48 border-b border-e border-foreground bg-card p-6"><I className="h-8 w-8 text-primary" /><div className="mt-10 font-bold uppercase">{h}</div><div className="mt-2 text-sm text-muted-foreground">{s}</div></div>
        ))}
      </section>
      <section className="container-x mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold uppercase sm:text-5xl">{ar ? "اطلب عرض سعر" : "Demandez votre devis"}</h2>
          <p className="mt-3 text-muted-foreground">{ar ? "املأ النموذج وسيرسل لك مستشارنا عرضا مخصصا." : "Remplissez le formulaire, un conseiller vous envoie une offre sur mesure."}</p>
        </div>
        <LeadForm cta={{ fr: "Envoyer la demande", ar: "إرسال الطلب" }} fields={[
          { fr: "Raison sociale", ar: "اسم الشركة" }, { fr: "Matricule fiscal", ar: "المعرف الجبائي" },
          { fr: "Nom du contact", ar: "اسم المسؤول" }, { fr: "Téléphone (+216)", ar: "الهاتف (+216)" },
          { fr: "E-mail professionnel", ar: "البريد المهني", full: true },
          { fr: "Produits et volumes mensuels estimés", ar: "المنتجات والكميات الشهرية التقديرية", area: true },
        ]} />
      </section>
    </div>
  );
}
