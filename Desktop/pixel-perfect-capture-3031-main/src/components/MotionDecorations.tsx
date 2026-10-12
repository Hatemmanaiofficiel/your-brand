import React, { useState } from "react";
import { Sparkles, ArrowUpRight, Zap, Check, Heart, ShieldCheck } from "lucide-react";

/**
 * Animated SVG Zigzag Doodle line that moves/oscillates dynamically.
 * Styled after the energetic doodle squiggles in CRUX & ZUGA branding.
 */
export function AnimatedZigzagLine({
  color = "currentColor",
  strokeWidth = 3,
  className = "",
  direction = "horizontal",
  animated = true,
}: {
  color?: string;
  strokeWidth?: number;
  className?: string;
  direction?: "horizontal" | "vertical";
  animated?: boolean;
}) {
  if (direction === "vertical") {
    return (
      <svg
        viewBox="0 0 24 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`overflow-visible ${animated ? "animate-zigzag-vertical" : ""} ${className}`}
        aria-hidden="true"
      >
        <path
          d="M12 2 L20 18 L4 36 L20 54 L4 72 L20 90 L4 108 L12 118"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? "stroke-dash-move" : ""}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 140 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible ${animated ? "animate-zigzag-horizontal" : ""} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 12 L14 4 L28 20 L42 4 L56 20 L70 4 L84 20 L98 4 L112 20 L126 4 L138 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "stroke-dash-move" : ""}
      />
    </svg>
  );
}

/**
 * Continuous flowing SVG zigzag border banner
 */
export function ZigzagBorderBanner({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`w-[200%] md:w-[150%] h-4 md:h-5 text-current animate-marquee ${
          flip ? "rotate-180" : ""
        }`}
        viewBox="0 0 1200 20"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,0 L10,18 L20,0 L30,18 L40,0 L50,18 L60,0 L70,18 L80,0 L90,18 L100,0 L110,18 L120,0 L130,18 L140,0 L150,18 L160,0 L170,18 L180,0 L190,18 L200,0 L210,18 L220,0 L230,18 L240,0 L250,18 L260,0 L270,18 L280,0 L290,18 L300,0 L310,18 L320,0 L330,18 L340,0 L350,18 L360,0 L370,18 L380,0 L390,18 L400,0 L410,18 L420,0 L430,18 L440,0 L450,18 L460,0 L470,18 L480,0 L490,18 L500,0 L510,18 L520,0 L530,18 L540,0 L550,18 L560,0 L570,18 L580,0 L590,18 L600,0 L610,18 L620,0 L630,18 L640,0 L650,18 L660,0 L670,18 L680,0 L690,18 L700,0 L710,18 L720,0 L730,18 L740,0 L750,18 L760,0 L770,18 L780,0 L790,18 L800,0 L810,18 L820,0 L830,18 L840,0 L850,18 L860,0 L870,18 L880,0 L890,18 L900,0 L910,18 L920,0 L930,18 L940,0 L950,18 L960,0 L970,18 L980,0 L990,18 L1000,0 L1010,18 L1020,0 L1030,18 L1040,0 L1050,18 L1060,0 L1070,18 L1080,0 L1090,18 L1100,0 L1110,18 L1120,0 L1130,18 L1140,0 L1150,18 L1160,0 L1170,18 L1180,0 L1190,18 L1200,0 L1200,20 L0,20 Z" />
      </svg>
    </div>
  );
}

/**
 * Editorial Scallop / Organic Wavy Divider inspired by CRUX photo
 * Separates sections with a rhythmic moving organic wave.
 */
export function CruxWavyDivider({
  bgColor = "var(--hero-bg)",
  fillColor = "var(--background)",
  height = "h-10 md:h-14",
  flip = false,
}: {
  bgColor?: string;
  fillColor?: string;
  height?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none ${height}`}
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`w-[120%] -ms-[10%] h-full animate-wave-shift ${flip ? "rotate-180" : ""}`}
        style={{ fill: fillColor }}
      >
        <path d="M0,45 C180,75 360,15 540,45 C720,75 900,15 1080,45 C1260,75 1440,15 1620,45 L1620,80 L0,80 Z" />
      </svg>
    </div>
  );
}

/**
 * High-Impact CRUX-style Marquee Ribbon with angled bold arrows
 */
export function CruxEditorialMarquee({
  items,
  bgClass = "bg-primary text-primary-foreground",
}: {
  items?: string[];
  bgClass?: string;
}) {
  const defaultItems = [
    "SMART ↗",
    "STAY STRONG ↗",
    "FEEL LIGHTER ↗",
    "FUEL YOUR DAY ↗",
    "100% TUNISIEN ↗",
    "QUALITÉ SUPÉRIEURE ↗",
    "LIVRAISON 24-48H ↗",
  ];
  const list = items || defaultItems;

  return (
    <div className={`relative overflow-hidden py-3 font-display font-black text-sm uppercase tracking-widest border-y-2 border-foreground shadow-sm ${bgClass}`}>
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap items-center select-none" dir="ltr">
        {[...list, ...list, ...list].map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-3">
            <span>{item}</span>
            <span className="opacity-40 text-xs">⚡</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Interactive "Stuff You Can Pronounce" ingredient radar/wheel
 * Direct recreation of the iconic CRUX nutritional component from the reference photo!
 */
export function CruxIngredientWheel({
  lang = "fr",
}: {
  lang?: "fr" | "ar";
}) {
  const ar = lang === "ar";
  const [activeIdx, setActiveIdx] = useState(0);

  const ingredients = [
    {
      id: "ing-1",
      nameFr: "Dattes Deglet Nour",
      nameAr: "تمر دقلة نور أصيل",
      originFr: "Tozeur & Kebili, 100% Naturel",
      originAr: "توزر وقبلي، طبيعي ١٠٠٪",
      descFr: "Énergie propre sans sucre raffiné, riche en fibres solubles et potassium.",
      descAr: "طاقة نقية بدون سكر مكرر، غني بالألياف الطبيعية والبوتاسيوم والحديد.",
      pct: "35%",
      color: "from-amber-600 to-amber-700",
      icon: "🌴",
    },
    {
      id: "ing-2",
      nameFr: "Chocolat Noir 70%",
      nameAr: "شوكولاتة سوداء ٧٠٪",
      originFr: "Pur Cacao équitable",
      originAr: "كاكاو نقي ومضمون",
      descFr: "Antioxydants puissants, magnésium et goût intense sans amertume excessive.",
      descAr: "مضادات أكسدة طبيعية، مغنيسيوم وطعم غني متوازن يمنحك التركيز طوال اليوم.",
      pct: "25%",
      color: "from-amber-950 to-neutral-900",
      icon: "🍫",
    },
    {
      id: "ing-3",
      nameFr: "Amandes Grillées",
      nameAr: "لوز تونسي محمص",
      originFr: "Sfax & Zaghouan",
      originAr: "صفاقس وزغوان، حبة كاملة",
      descFr: "Protéines végétales de qualité, graisses saines insaturées et croquant parfait.",
      descAr: "بروتينات نباتية عالية الجودة، دهون صحية وقرمشة تونسية لا تُقاوم.",
      pct: "20%",
      color: "from-amber-700 to-yellow-800",
      icon: "🥜",
    },
    {
      id: "ing-4",
      nameFr: "Miel Sauvage de Thym",
      nameAr: "عسل سدر وزعتر بري",
      originFr: "Monts de Béja",
      originAr: "جبال باجة، خام وغير مبستر",
      descFr: "Index glycémique modéré, propriétés antibactériennes et douceur subtile.",
      descAr: "مؤشر سكري متوازن، يقوي المناعة ويضفي حلاوة طبيعية فريدة.",
      pct: "12%",
      color: "from-yellow-500 to-amber-500",
      icon: "🍯",
    },
    {
      id: "ing-5",
      nameFr: "Fleur de Sel de Salines",
      nameAr: "ملح نقي من الملاحات",
      originFr: "Salines de Sahline",
      originAr: "ملاحات الساحلين التقليدية",
      descFr: "Minéraux marins essentiels, sublimant les saveurs sucrées naturellement.",
      descAr: "معادن بحرية نقية تبرز نكهات المكونات الطبيعية بكل توازن.",
      pct: "8%",
      color: "from-slate-400 to-slate-500",
      icon: "🧂",
    },
  ];

  const current = ingredients[activeIdx] ?? ingredients[0]!;

  return (
    <div className="relative rounded-3xl border-2 border-foreground bg-card p-6 sm:p-8 shadow-card overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left: Circular Ingredient Interactive Pie / Wheel */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="relative h-60 w-60 sm:h-72 sm:w-72 rounded-full border-4 border-foreground p-3 bg-secondary/30 flex items-center justify-center shadow-lift">
            {/* Slices representation with interactive buttons */}
            <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
              {ingredients.map((ing, idx) => {
                const angle = (idx / ingredients.length) * 360;
                const isSelected = activeIdx === idx;
                return (
                  <button
                    key={ing.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`absolute inset-0 transition-transform duration-300 ${
                      isSelected ? "scale-105" : "hover:opacity-90"
                    }`}
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: "center center",
                    }}
                    title={ar ? ing.nameAr : ing.nameFr}
                  >
                    <div
                      className={`h-1/2 w-1.5 mx-auto rounded-full transition-all duration-300 ${
                        isSelected ? "bg-primary w-3 shadow-glow" : "bg-foreground/40"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Center Core Badge */}
            <div className="relative z-10 flex flex-col items-center justify-center h-32 w-32 sm:h-36 sm:w-36 rounded-full border-2 border-foreground bg-background p-3 text-center shadow-card animate-pulse-slow">
              <span className="text-2xl sm:text-3xl animate-bounce-subtle">{current.icon}</span>
              <span className="font-display text-sm font-extrabold text-primary uppercase mt-1">
                {current.pct}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase truncate w-24">
                {ar ? "نسبة طبيعية" : "ingrédient pur"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Ingredient details & Selector */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-black uppercase text-primary tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{ar ? "مكونات يمكنك نطقها وتثق بها" : "Stuff you can pronounce."}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-foreground leading-tight">
            {ar ? current.nameAr : current.nameFr}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-xs font-bold text-primary">
            <span>📍 {ar ? current.originAr : current.originFr}</span>
            <span>·</span>
            <span className="bg-foreground text-background px-2 py-0.5 rounded-full text-[10px]">
              {current.pct} du total
            </span>
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {ar ? current.descAr : current.descFr}
          </p>

          {/* Interactive Chips to quickly switch between ingredients */}
          <div className="mt-6 flex flex-wrap gap-2">
            {ingredients.map((ing, idx) => (
              <button
                key={ing.id}
                onClick={() => setActiveIdx(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 ${
                  activeIdx === idx
                    ? "border-primary bg-primary text-primary-foreground shadow-sm scale-105"
                    : "border-foreground bg-card hover:bg-muted text-foreground"
                }`}
              >
                <span>{ing.icon}</span>
                <span>{ar ? ing.nameAr : ing.nameFr}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
