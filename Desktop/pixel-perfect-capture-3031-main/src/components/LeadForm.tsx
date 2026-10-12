import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

export function LeadForm({ fields, cta }: { fields: { fr: string; ar: string; full?: boolean; area?: boolean }[]; cta: { fr: string; ar: string } }) {
  const { tl, lang } = useStore();
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div className="animate-rise border border-foreground bg-card p-10 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-fresh" />
      <p className="mt-3 font-bold">{lang === "ar" ? "شكرا! سيتصل بك فريقنا خلال 48 ساعة." : "Merci ! Notre équipe vous contacte sous 48h."}</p>
    </div>
  );
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-3 border border-foreground bg-card p-6 sm:grid-cols-2 sm:p-8">
      {fields.map((f) => f.area
        ? <textarea key={f.fr} required rows={4} className="field sm:col-span-2" placeholder={tl(f)} />
        : <input key={f.fr} required className={`field ${f.full ? "sm:col-span-2" : ""}`} placeholder={tl(f)} />)}
      <button className="btn btn-primary sm:col-span-2">{tl(cta)}</button>
    </form>
  );
}
