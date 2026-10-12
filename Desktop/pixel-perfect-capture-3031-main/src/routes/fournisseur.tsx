import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/fournisseur")({
  head: () => ({
    meta: [
      { title: "Devenir fournisseur — Your Brand" },
      { name: "description", content: "Producteurs et distributeurs tunisiens : référencez vos produits alimentaires et touchez des milliers de clients." },
      { property: "og:title", content: "Devenir fournisseur — Your Brand" },
      { property: "og:description", content: "Rejoignez notre réseau de fournisseurs alimentaires en Tunisie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Supplier,
});

function Supplier() {
  const { lang } = useStore();
  const ar = lang === "ar";
  const steps = ar
    ? ["قدّم ملفك ومنتجاتك", "دراسة الملف خلال 5 أيام", "إدراج المنتجات وتحديد الأسعار", "ابدأ البيع في كامل تونس"]
    : ["Soumettez votre dossier", "Étude sous 5 jours ouvrés", "Référencement et tarifs", "Vendez dans toute la Tunisie"];
  return (
    <div className="container-x py-12">
      <div className="grid border border-foreground lg:grid-cols-2">
        <div className="border-b border-foreground p-7 lg:border-b-0 lg:border-e lg:p-10">
          <div className="text-[10px] font-extrabold uppercase text-primary">{ar ? "شراكة / 06" : "Partenariat / 06"}</div>
          <h1 className="mt-4 max-w-full break-words text-4xl font-extrabold uppercase leading-none sm:text-5xl">{ar ? "كن مزوّدا" : "Devenez fournisseur."}</h1>
          <p className="mt-4 max-w-md text-muted-foreground">{ar ? "منتجون، مصنعون وموزعون: انضموا إلى منصتنا." : "Producteurs, industriels et distributeurs : rejoignez notre plateforme et développez vos ventes."}</p>
          <ol className="mt-10 space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-foreground bg-charcoal font-display text-lg font-bold text-charcoal-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="p-6 lg:p-10"><LeadForm cta={{ fr: "Envoyer ma candidature", ar: "إرسال الملف" }} fields={[
          { fr: "Nom de l'entreprise", ar: "اسم المؤسسة" }, { fr: "Matricule fiscal", ar: "المعرف الجبائي" },
          { fr: "Catégorie de produits", ar: "صنف المنتجات" }, { fr: "Gouvernorat", ar: "الولاية" },
          { fr: "Téléphone (+216)", ar: "الهاتف (+216)" }, { fr: "E-mail", ar: "البريد الإلكتروني" },
          { fr: "Présentez vos produits et capacités", ar: "قدّم منتجاتك وطاقتك الإنتاجية", area: true },
        ]} /></div>
      </div>
    </div>
  );
}
