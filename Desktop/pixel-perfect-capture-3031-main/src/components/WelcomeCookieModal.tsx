import { useState, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  Lock,
  ExternalLink,
  Scale,
  Check,
  X,
  Cookie,
} from "lucide-react";
import { useStore, type CookieSettings } from "@/lib/store";

/* ── Animated organic wavy separator ── */
function WavySep() {
  return (
    <div className="w-full overflow-hidden leading-none select-none pointer-events-none" style={{ height: 44 }} aria-hidden="true">
      <svg viewBox="0 0 1440 44" preserveAspectRatio="none" className="w-full h-full">
        <path fill="var(--background)" d="M0,22 C240,44 480,0 720,22 C960,44 1200,0 1440,22 L1440,44 L0,44 Z">
          <animate attributeName="d" dur="6s" repeatCount="indefinite"
            values="M0,22 C240,44 480,0 720,22 C960,44 1200,0 1440,22 L1440,44 L0,44 Z;M0,30 C200,8 460,42 720,16 C980,42 1240,8 1440,30 L1440,44 L0,44 Z;M0,18 C280,42 520,4 720,26 C920,4 1160,42 1440,18 L1440,44 L0,44 Z;M0,22 C240,44 480,0 720,22 C960,44 1200,0 1440,22 L1440,44 L0,44 Z"
          />
        </path>
      </svg>
    </div>
  );
}

/* ── Animated zigzag polyline ── */
function ZigzagLine({ color = "currentColor" }: { color?: string }) {
  const pts1 = "0,12 20,2 40,12 60,2 80,12 100,2 120,12 140,2 160,12 180,2 200,12 220,2 240,12 260,2 280,12 300,2 320,12 340,2 360,12 380,2 400,12 420,2 440,12 460,2 480,12 500,2 520,12 540,2 560,12 580,2 600,12 620,2 640,12 660,2 680,12 700,2 720,12 740,2 760,12 780,2 800,12 820,2 840,12 860,2 880,12 900,2 920,12 940,2 960,12 980,2 1000,12 1020,2 1040,12 1060,2 1080,12 1100,2 1120,12 1140,2 1160,12 1180,2 1200,12 1220,2 1240,12 1260,2 1280,12 1300,2 1320,12 1340,2 1360,12 1380,2 1400,12 1440,2";
  const pts2 = "0,2 20,12 40,2 60,12 80,2 100,12 120,2 140,12 160,2 180,12 200,2 220,12 240,2 260,12 280,2 300,12 320,2 340,12 360,2 380,12 400,2 420,12 440,2 460,12 480,2 500,12 520,2 540,12 560,2 580,12 600,2 620,12 640,2 660,12 680,2 700,12 720,2 740,12 760,2 780,12 800,2 820,12 840,2 860,12 880,2 900,12 920,2 940,12 960,2 980,12 1000,2 1020,12 1040,2 1060,12 1080,2 1100,12 1120,2 1140,12 1160,2 1180,12 1200,2 1220,12 1240,2 1260,12 1280,2 1300,12 1320,2 1340,12 1360,2 1380,12 1400,2 1440,12";
  return (
    <svg height="14" className="w-full block" preserveAspectRatio="none" aria-hidden="true">
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={pts1}>
        <animate attributeName="points" dur="3s" repeatCount="indefinite" values={`${pts1};${pts2};${pts1}`} />
      </polyline>
    </svg>
  );
}

export function WelcomeCookieModal() {
  const { isCookieModalOpen, closeCookieModal, saveCookieConsent, cookieConsent, lang } = useStore();
  const ar = lang === "ar";

  const [analytics, setAnalytics] = useState(cookieConsent?.analytics ?? true);
  const [marketing, setMarketing] = useState(cookieConsent?.marketing ?? false);
  const [showLegalDrawer, setShowLegalDrawer] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<"cookies" | "cgv" | "inpdp" | "mentions">("cookies");
  const [phase, setPhase] = useState<"welcome" | "cookie">("welcome");

  useEffect(() => {
    if (!isCookieModalOpen) { setPhase("welcome"); return; }
    const id = setTimeout(() => setPhase("cookie"), 3000);
    return () => clearTimeout(id);
  }, [isCookieModalOpen]);

  if (!isCookieModalOpen) return null;

  const save = (opts: Omit<CookieSettings, "essential" | "timestamp">) =>
    saveCookieConsent({ essential: true, timestamp: new Date().toISOString(), ...opts });

  const handleEssentialOnly = () => save({ analytics: false, marketing: false, termsAccepted: true });
  const handleSaveCustom    = () => save({ analytics, marketing, termsAccepted: true });
  const handleAcceptAll     = () => save({ analytics: true, marketing: true, termsAccepted: true });

  /* ── Phase 1: Cinematic full-screen welcome ── */
  if (phase === "welcome") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "var(--hero-bg)" }}>
        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: "radial-gradient(var(--hero-text) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* top zigzag */}
        <div className="absolute top-0 left-0 right-0 opacity-40">
          <ZigzagLine color="var(--hero-text)" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-8"
          style={{ color: "var(--hero-text)" }}>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-current px-4 py-1.5 text-[11px] font-black uppercase tracking-widest mb-10 opacity-80"
            style={{ animation: "wc-in 0.55s ease both", animationDelay: "0ms" }}>
            <Sparkles className="h-3 w-3 animate-spin-slow" />
            {ar ? "متجرك الأول في تونس" : "L'ÉPICERIE #1 EN TUNISIE"}
          </div>

          {/* Giant Arabic */}
          <div style={{ animation: "wc-in 0.7s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "100ms" }}>
            <h1 className="font-display font-black leading-none"
              style={{ fontSize: "clamp(4rem,16vw,9rem)", textShadow: "0 4px 60px oklch(from var(--hero-text) l c h / 0.3)" }}>
              مرحبا بي
            </h1>
          </div>

          {/* Latin transliteration */}
          <div style={{ animation: "wc-in 0.7s ease both", animationDelay: "220ms" }}>
            <p className="font-display font-extrabold uppercase tracking-[0.2em] mt-2 opacity-60"
              style={{ fontSize: "clamp(0.9rem,3.5vw,2rem)" }}>
              MARHBE BIK
            </p>
          </div>

          {/* Zigzag accent */}
          <div className="w-48 my-7" style={{ animation: "wc-in 0.5s ease both", animationDelay: "330ms" }}>
            <ZigzagLine color="var(--hero-text)" />
          </div>

          {/* Sub-text */}
          <p className="max-w-sm text-sm sm:text-base font-medium leading-relaxed opacity-70"
            style={{ animation: "wc-in 0.6s ease both", animationDelay: "420ms" }}>
            {ar
              ? "نحن سعداء بوجودك. استعد لتجربة تسوق لا تُنسى في تونس."
              : "On est ravis de vous accueillir. Préparez-vous pour une expérience épicerie unique."}
          </p>

          {/* Skip link */}
          <button onClick={() => setPhase("cookie")}
            className="mt-12 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-90 transition-opacity"
            style={{ animation: "wc-in 0.5s ease both", animationDelay: "560ms", color: "var(--hero-text)" }}>
            {ar ? "تخطي ←" : "Continuer →"}
          </button>
        </div>

        {/* Progress bar + bottom zigzag */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-[3px] bg-current opacity-20" style={{ color: "var(--hero-text)" }}>
            <div className="h-full bg-current" style={{ animation: "wc-progress 3s linear both", color: "var(--hero-text)" }} />
          </div>
          <div className="opacity-40"><ZigzagLine color="var(--hero-text)" /></div>
        </div>

        <style>{`
          @keyframes wc-in      { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:none; } }
          @keyframes wc-progress{ from { width:0 } to { width:100% } }
        `}</style>
      </div>
    );
  }

  /* ── Phase 2: Cookie consent card ── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-3 sm:p-5"
      style={{ background: "oklch(0.10 0.028 48 / 0.90)", backdropFilter: "blur(10px)" }}>

      <div className="relative my-auto w-full max-w-[560px] overflow-hidden rounded-3xl border-4 border-foreground bg-background text-foreground"
        style={{ boxShadow: "8px 8px 0 var(--primary)", animation: "wc-in2 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
        role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">

        <style>{`@keyframes wc-in2 { from { opacity:0; transform:scale(0.9) translateY(20px); } to { opacity:1; transform:none; } }`}</style>

        {/* ── Hero band: dark, editorial ── */}
        <div className="relative overflow-hidden" style={{ background: "var(--hero-bg)", color: "var(--hero-text)" }}>
          {/* bg dot pattern */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

          <div className="relative z-10 px-6 pt-6 pb-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                {/* Eyebrow chip */}
                <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-current px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3 opacity-80">
                  <Cookie className="h-3 w-3" />
                  {ar ? "الكوكيز والخصوصية" : "COOKIES & CONFIDENTIALITÉ"}
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-ping" />
                </div>

                {/* Main heading */}
                <h2 id="cookie-modal-title" className="font-display font-black uppercase leading-none">
                  <span className="animate-marhba-glow" style={{ fontSize: "clamp(2rem,6vw,3rem)" }}>
                    مرحبا بي
                  </span>
                  <br />
                  <span className="text-[0.5em] font-extrabold tracking-[0.16em] opacity-60">MARHBE BIK</span>
                </h2>

                <p className="mt-2 text-xs leading-relaxed opacity-70 max-w-xs">
                  {ar
                    ? "نستخدم الكوكيز لحفظ سلتك وتحسين تجربتك. اختر ما يناسبك."
                    : "Nous utilisons des cookies pour sauvegarder votre panier et améliorer votre navigation."}
                </p>
              </div>

              {cookieConsent && (
                <button onClick={closeCookieModal} aria-label="Fermer"
                  className="grid h-8 w-8 place-items-center rounded-full border-2 border-current opacity-70 hover:opacity-100 hover:bg-current hover:text-[var(--hero-bg)] transition shrink-0 mt-1">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Scrolling marquee */}
            <div className="mt-4 -mx-6 border-t border-current/20 pt-2 pb-0 overflow-hidden">
              <div className="flex w-max whitespace-nowrap gap-8 text-[10px] font-black uppercase tracking-widest animate-marquee select-none opacity-50" dir="ltr">
                {["MARHBE BIK ✦", "CONFIDENTIALITÉ ✦", "INPDP 2004-63 ✦", "PANIER SÉCURISÉ ✦", "LIVRAISON 24H ✦",
                  "MARHBE BIK ✦", "CONFIDENTIALITÉ ✦", "INPDP 2004-63 ✦", "PANIER SÉCURISÉ ✦", "LIVRAISON 24H ✦"]
                  .map((t, i) => <span key={i} className="inline-flex items-center gap-3">{t}</span>)}
              </div>
            </div>
          </div>

          {/* Organic wave transition into white card body */}
          <WavySep />
        </div>

        {/* ── Cookie toggles ── */}
        <div className="px-5 pb-1 pt-1 space-y-2.5">
          {[
            {
              icon: <Lock className="h-4 w-4" />,
              label: ar ? "١. الكوكيز الأساسية" : "1. Essentiels",
              desc: ar ? "السلة، الجلسة، اللغة — لا يعمل الموقع بدونها." : "Panier, session, langue. Requis.",
              always: true,
            },
            {
              icon: <Sparkles className="h-4 w-4" />,
              label: ar ? "٢. أداء وإحصاء" : "2. Performance",
              desc: ar ? "إحصائيات مجهولة لتحسين الموقع." : "Statistiques anonymes pour optimiser le catalogue.",
              always: false,
              val: analytics,
              set: () => setAnalytics(!analytics),
            },
            {
              icon: <ShieldCheck className="h-4 w-4" />,
              label: ar ? "٣. عروض مخصصة" : "3. Personnalisation",
              desc: ar ? "اقتراحات وتخفيضات حسب ذوقك." : "Promotions et suggestions selon vos goûts.",
              always: false,
              val: marketing,
              set: () => setMarketing(!marketing),
            },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border-2 border-foreground bg-card px-4 py-3 hover:shadow-card transition">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                {row.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-extrabold uppercase">{row.label}</div>
                <div className="text-[10px] text-muted-foreground leading-snug mt-0.5 line-clamp-1">{row.desc}</div>
              </div>
              {row.always ? (
                <span className="shrink-0 rounded-full bg-fresh text-white px-2.5 py-0.5 text-[10px] font-black uppercase">
                  {ar ? "دائماً" : "REQUIS"}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={row.set}
                  className={`shrink-0 relative h-6 w-11 rounded-full border-2 border-foreground transition-all duration-200 ${row.val ? "bg-primary" : "bg-muted"}`}
                  aria-pressed={row.val}
                >
                  <span
                    className="absolute top-0.5 h-4 w-4 rounded-full bg-white border border-foreground/20 shadow transition-all duration-200"
                    style={{ left: row.val ? "calc(100% - 1.2rem)" : "2px" }}
                  />
                </button>
              )}
            </div>
          ))}

          {/* Legal link */}
          <div className="flex items-center justify-between py-2">
            <button type="button" onClick={() => setShowLegalDrawer(true)}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground hover:underline transition-colors">
              <Scale className="h-3.5 w-3.5 text-primary" />
              {ar ? "قراءة السياسة الكاملة (INPDP)" : "Politique complète & Loi INPDP"}
              <ExternalLink className="h-3 w-3" />
            </button>
            <span className="text-[10px] text-muted-foreground">{ar ? "تونس · 2004-63" : "Tunisie · 2004-63"}</span>
          </div>
        </div>

        {/* Zigzag separator */}
        <ZigzagLine color="oklch(0.12 0.030 48 / 0.1)" />

        {/* ── CTA buttons ── */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 p-5 bg-secondary/30">
          <button type="button" onClick={handleEssentialOnly}
            className="btn btn-outline text-xs font-bold flex-1">
            {ar ? "الضروري فقط" : "Essentiels seulement"}
          </button>
          <button type="button" onClick={handleSaveCustom}
            className="btn btn-ghost text-xs font-bold flex-1 border-2 border-foreground">
            <Check className="h-3.5 w-3.5" />
            {ar ? "حفظ خياراتي" : "Enregistrer"}
          </button>
          <button type="button" onClick={handleAcceptAll}
            className="btn btn-primary text-xs font-extrabold flex-1 shadow-lift hover:scale-105 transition-transform">
            <Sparkles className="h-4 w-4" />
            {ar ? "قبول الكل ✦" : "Tout Accepter ✦"}
          </button>
        </div>
      </div>

      {/* ── Legal drawer ── */}
      {showLegalDrawer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
          style={{ background: "oklch(0.10 0.028 48 / 0.94)", backdropFilter: "blur(14px)" }}>
          <div className="relative flex flex-col h-[90vh] max-h-[820px] w-full max-w-2xl rounded-3xl border-4 border-foreground bg-background text-foreground overflow-hidden"
            style={{ boxShadow: "8px 8px 0 var(--primary)" }}>

            <div className="flex items-center justify-between border-b-2 border-foreground p-5 bg-secondary">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {ar ? "الإطار القانوني التونسي" : "CADRE LÉGAL TUNISIE"}
                </span>
                <h3 className="font-display text-xl font-black uppercase">
                  {ar ? "الشروط والخصوصية" : "CGV & Confidentialité"}
                </h3>
              </div>
              <button onClick={() => setShowLegalDrawer(false)} aria-label="Fermer"
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex border-b-2 border-foreground bg-card overflow-x-auto no-scrollbar">
              {[
                { key: "cookies", fr: "Cookies",     ar: "الكوكيز" },
                { key: "cgv",     fr: "CGV",          ar: "شروط البيع" },
                { key: "inpdp",   fr: "INPDP",        ar: "حماية البيانات" },
                { key: "mentions",fr: "Mentions",     ar: "البيانات القانونية" },
              ].map((tab) => (
                <button key={tab.key} onClick={() => setActiveLegalTab(tab.key as any)}
                  className={`px-4 py-3 text-xs font-bold uppercase tracking-wider shrink-0 transition ${activeLegalTab === tab.key ? "border-b-4 border-primary bg-background text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                  {ar ? tab.ar : tab.fr}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm leading-relaxed">
              {activeLegalTab === "cookies" && (
                <div className="space-y-4">
                  <h4 className="font-display text-lg font-bold uppercase text-primary">{ar ? "سياسة الكوكيز" : "Politique Cookies"}</h4>
                  <p className="text-muted-foreground text-xs">{ar ? "الكوكي ملف نصي صغير يُحفظ في متصفحك لضمان عمل السلة وحفظ اللغة والدفع الآمن." : "Un cookie est un petit fichier texte déposé sur votre terminal pour sauvegarder votre panier."}</p>
                  <div className="rounded-2xl border-2 border-foreground p-4 bg-muted/20 text-xs text-muted-foreground space-y-1">
                    <div className="font-bold text-foreground uppercase text-[11px]">{ar ? "الكوكيز الإلزامية:" : "Cookies obligatoires :"}</div>
                    <p>{ar ? "سلة الشراء، الجلسة، حفظ اللغة. لا يعمل الموقع بدونها." : "Panier d'achat, session, mémorisation de la langue (FR/AR)."}</p>
                  </div>
                  <div className="rounded-2xl border-2 border-foreground p-4 bg-muted/20 text-xs text-muted-foreground space-y-1">
                    <div className="font-bold text-foreground uppercase text-[11px]">{ar ? "مدة الصلاحية:" : "Durée :"}</div>
                    <p>{ar ? "موافقتك محفوظة 13 شهراً. التعديل عبر زر «الكوكيز» بأسفل الصفحة." : "Vos préférences sont conservées 13 mois. Modifiables via « Cookies » en pied de page."}</p>
                  </div>
                </div>
              )}
              {activeLegalTab === "cgv" && (
                <div className="space-y-4">
                  <h4 className="font-display text-lg font-bold uppercase text-primary">{ar ? "شروط البيع" : "Conditions de Vente"}</h4>
                  <div className="space-y-3 text-xs text-muted-foreground">
                    <p><strong>1. {ar ? "الأسعار:" : "Prix :"}</strong> {ar ? "بالدينار التونسي (د.ت) شاملة الضرائب." : "Exprimés en Dinars Tunisiens (TND) TTC."}</p>
                    <p><strong>2. {ar ? "الدفع:" : "Paiement :"}</strong> {ar ? "نقداً عند الاستلام أو بطاقة بنكية تونسية." : "Espèces à la livraison ou carte bancaire tunisienne."}</p>
                    <p><strong>3. {ar ? "التوصيل:" : "Livraison :"}</strong> {ar ? "24 إلى 48 ساعة، مجاني فوق 80 د.ت." : "24 à 48h. Offerte dès 80 DT, sinon 7 DT."}</p>
                  </div>
                </div>
              )}
              {activeLegalTab === "inpdp" && (
                <div className="space-y-4">
                  <h4 className="font-display text-lg font-bold uppercase text-primary">{ar ? "حماية البيانات (قانون 63 / 2004)" : "Protection des Données (INPDP)"}</h4>
                  <p className="text-xs text-muted-foreground">{ar ? "نلتزم بالقانون التونسي عدد 63 لسنة 2004 المتعلق بحماية المعطيات الشخصية." : "Nous respectons la Loi organique tunisienne n° 2004-63 du 27 juillet 2004."}</p>
                  <div className="rounded-2xl border-2 border-foreground bg-muted/20 p-4 text-xs text-muted-foreground space-y-1.5">
                    <div className="font-bold text-foreground uppercase text-[11px]">{ar ? "حقوقك:" : "Vos droits :"}</div>
                    <ul className="list-disc ps-5 space-y-1">
                      <li>{ar ? "الاطلاع على بياناتك." : "Accès et consultation."}</li>
                      <li>{ar ? "تصحيح أي معلومة غير دقيقة." : "Rectification."}</li>
                      <li>{ar ? "الحذف والاعتراض على الاستخدام الدعائي." : "Effacement et opposition."}</li>
                    </ul>
                  </div>
                </div>
              )}
              {activeLegalTab === "mentions" && (
                <div className="space-y-4">
                  <h4 className="font-display text-lg font-bold uppercase text-primary">{ar ? "البيانات القانونية" : "Mentions Légales"}</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p><strong>{ar ? "اسم المتجر:" : "Raison sociale :"}</strong> Your Brand SARL</p>
                    <p><strong>{ar ? "السجل التجاري:" : "RC :"}</strong> RC B0123456789 – Tunis</p>
                    <p><strong>{ar ? "العنوان:" : "Siège :"}</strong> Avenue Habib Bourguiba, Tunis</p>
                    <p><strong>{ar ? "الهاتف:" : "Tél :"}</strong> +216 71 000 000</p>
                    <p><strong>{ar ? "البريد:" : "Email :"}</strong> contact@yourbrand.tn</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t-2 border-foreground p-4 bg-secondary flex justify-end">
              <button type="button" onClick={() => setShowLegalDrawer(false)} className="btn btn-dark text-xs px-5 rounded-full font-bold">
                {ar ? "فهمت، أغلق" : "Fermer la notice"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Floating badge to re-open the modal ── */
export function CookieFloatingBadge() {
  const { openCookieModal, lang } = useStore();
  const ar = lang === "ar";

  return (
    <aside aria-label={ar ? "إدارة الخصوصية والكوكيز" : "Gestion des cookies"} className="fixed bottom-4 start-4 z-40">
      <button
        onClick={openCookieModal}
        className="group flex items-center gap-2 rounded-full border-2 border-foreground bg-background/95 px-3.5 py-1.5 text-xs font-black uppercase shadow-card backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 hover:scale-105"
        title={ar ? "إدارة الكوكيز والخصوصية" : "Gérer les cookies & confidentialité"}
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground group-hover:bg-background group-hover:text-foreground text-[11px] font-black">
          🍪
        </span>
        <span className="font-display tracking-wide">
          {ar ? "مرحبا · الكوكيز" : "Cookies & Termes"}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-fresh animate-ping" />
      </button>
    </aside>
  );
}
