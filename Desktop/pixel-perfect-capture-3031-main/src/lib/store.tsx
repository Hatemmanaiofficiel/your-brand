import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import hero from "@/assets/hero.jpg";
import sweets from "@/assets/sweets.jpg";
import drinks from "@/assets/drinks.jpg";
import pantry from "@/assets/pantry.jpg";

export const images = { hero, sweets, drinks, pantry };

export type Lang = "fr" | "ar";
type L = { fr: string; ar: string };

export type Category = { id: string; name: L; img: string; emoji: string };
export const categories: Category[] = [
  { id: "biscuits", name: { fr: "Biscuits & Gâteaux", ar: "بسكويت وحلويات" }, img: sweets, emoji: "🍪" },
  { id: "chocolat", name: { fr: "Chocolat", ar: "شوكولاتة" }, img: sweets, emoji: "🍫" },
  { id: "snacks", name: { fr: "Snacks salés", ar: "مقرمشات" }, img: pantry, emoji: "🥨" },
  { id: "boissons", name: { fr: "Boissons", ar: "مشروبات" }, img: drinks, emoji: "🥤" },
  { id: "petit-dej", name: { fr: "Petit-déjeuner", ar: "فطور الصباح" }, img: pantry, emoji: "🥣" },
  { id: "conserves", name: { fr: "Conserves", ar: "معلبات" }, img: pantry, emoji: "🥫" },
];

export type Product = {
  id: string; name: L; cat: string; brand: string; price: number; old?: number | undefined;
  img: string; weight: string; rating: number; tags: ("best" | "new" | "promo")[]; desc: L;
};

const p = (id: string, fr: string, ar: string, cat: string, brand: string, price: number, old: number | undefined, img: string, weight: string, rating: number, tags: Product["tags"]): Product => ({
  id, name: { fr, ar }, cat, brand, price, old, img, weight, rating, tags,
  desc: {
    fr: `${fr} sélectionné pour sa qualité constante. Conditionnement soigné, idéal pour la famille comme pour les professionnels. Conservez dans un endroit sec et frais.`,
    ar: `${ar} مختار بعناية لجودته الثابتة. تعبئة محكمة، مثالي للعائلة والمهنيين. يحفظ في مكان جاف وبارد.`,
  },
});

export const products: Product[] = [
  p("p1", "Cookies pépites de chocolat", "كوكيز برقائق الشوكولاتة", "biscuits", "Marque A", 4.9, 5.8, sweets, "300 g", 4.8, ["best", "promo"]),
  p("p2", "Gaufrettes vanille", "ويفر بالفانيليا", "biscuits", "Marque B", 2.35, undefined, sweets, "150 g", 4.5, ["new"]),
  p("p3", "Tablette chocolat noir 70%", "شوكولاتة داكنة 70%", "chocolat", "Marque C", 6.2, 7.4, sweets, "100 g", 4.9, ["best", "promo"]),
  p("p4", "Biscuits fourrés confiture", "بسكويت محشو بالمربى", "biscuits", "Marque A", 3.1, undefined, sweets, "250 g", 4.4, ["best"]),
  p("p5", "Jus d'orange 100% pur", "عصير برتقال طبيعي 100%", "boissons", "Marque D", 3.95, 4.6, drinks, "1 L", 4.7, ["promo", "best"]),
  p("p6", "Eau gazeuse naturelle", "مياه غازية طبيعية", "boissons", "Marque E", 1.2, undefined, drinks, "1 L", 4.6, ["new"]),
  p("p7", "Soda orange — pack de 6", "مشروب غازي برتقال — 6 علب", "boissons", "Marque D", 7.5, 8.9, drinks, "6 × 33 cl", 4.3, ["promo"]),
  p("p8", "Corn flakes croustillants", "رقائق الذرة المقرمشة", "petit-dej", "Marque F", 8.4, undefined, pantry, "500 g", 4.5, ["best"]),
  p("p9", "Miel de fleurs", "عسل الزهور", "petit-dej", "Marque G", 18.9, 22.0, pantry, "500 g", 4.9, ["promo", "new"]),
  p("p10", "Confiture de fraises", "مربى الفراولة", "petit-dej", "Marque G", 4.75, undefined, pantry, "370 g", 4.6, ["new"]),
  p("p11", "Dattes Deglet Nour", "تمر دقلة نور", "snacks", "Marque H", 9.5, undefined, pantry, "500 g", 5.0, ["best", "new"]),
  p("p12", "Tomates pelées", "طماطم مقشرة", "conserves", "Marque I", 2.6, 3.0, pantry, "400 g", 4.4, ["promo"]),
  p("p13", "Café moulu torréfié", "قهوة مطحونة محمصة", "petit-dej", "Marque J", 11.8, undefined, pantry, "250 g", 4.7, ["new"]),
  p("p14", "Chocolat au lait noisettes", "شوكولاتة بالحليب والبندق", "chocolat", "Marque C", 5.4, undefined, sweets, "100 g", 4.8, ["best"]),
  p("p15", "Biscuits au beurre", "بسكويت بالزبدة", "biscuits", "Marque B", 2.9, 3.5, sweets, "200 g", 4.5, ["promo"]),
  p("p16", "Harissa traditionnelle", "هريسة تقليدية", "conserves", "Marque I", 3.4, undefined, pantry, "380 g", 4.9, ["best", "new"]),
];

export const brands = ["Marque A", "Marque B", "Marque C", "Marque D", "Marque E", "Marque F", "Marque G", "Marque H", "Marque I", "Marque J"];

export const governorates = ["Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja", "Jendouba", "Le Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Médenine", "Tataouine", "Gafsa", "Tozeur", "Kébili"];

export const fmt = (n: number, lang: Lang) =>
  lang === "ar" ? `${n.toFixed(3).replace(".", ",")} د.ت` : `${n.toFixed(3).replace(".", ",")} DT`;

const dict = {
  search: { fr: "Rechercher un produit, une marque…", ar: "ابحث عن منتج أو علامة…" },
  shop: { fr: "Boutique", ar: "المتجر" },
  promos: { fr: "Promotions", ar: "العروض" },
  pro: { fr: "Espace Pro", ar: "فضاء المهنيين" },
  supplier: { fr: "Devenir fournisseur", ar: "كن مزوّدا" },
  cart: { fr: "Panier", ar: "السلة" },
  add: { fr: "Ajouter", ar: "أضف" },
  added: { fr: "Ajouté au panier", ar: "أضيف إلى السلة" },
  freeDelivery: { fr: "Livraison offerte dès 80 DT · Partout en Tunisie · Paiement à la livraison", ar: "توصيل مجاني ابتداءً من 80 د.ت · في كامل تونس · الدفع عند الاستلام" },
  heroKicker: { fr: "Votre épicerie en ligne", ar: "بقالتك على الإنترنت" },
  heroTitle: { fr: "Toute l'épicerie, livrée chez vous en 24h.", ar: "كل مستلزمات البقالة، تصلك في 24 ساعة." },
  heroSub: { fr: "Plus de 5 000 références : biscuits, chocolat, boissons, petit-déjeuner et conserves aux meilleurs prix.", ar: "أكثر من 5000 منتج: بسكويت، شوكولاتة، مشروبات، فطور ومعلبات بأفضل الأسعار." },
  shopNow: { fr: "Faire mes courses", ar: "تسوّق الآن" },
  seePromos: { fr: "Voir les promos", ar: "شاهد العروض" },
  categories: { fr: "Rayons", ar: "الأقسام" },
  bestSellers: { fr: "Meilleures ventes", ar: "الأكثر مبيعا" },
  newProducts: { fr: "Nouveautés", ar: "منتجات جديدة" },
  specialOffers: { fr: "Offres spéciales", ar: "عروض خاصة" },
  brandsT: { fr: "Marques populaires", ar: "علامات مشهورة" },
  forYou: { fr: "Recommandé pour vous", ar: "مقترحات لك" },
  seeAll: { fr: "Tout voir", ar: "عرض الكل" },
  filters: { fr: "Filtres", ar: "التصفية" },
  sort: { fr: "Trier", ar: "ترتيب" },
  all: { fr: "Tout", ar: "الكل" },
  emptyCart: { fr: "Votre panier est vide.", ar: "سلتك فارغة." },
  checkout: { fr: "Commander", ar: "إتمام الطلب" },
  subtotal: { fr: "Sous-total", ar: "المجموع الفرعي" },
  delivery: { fr: "Livraison", ar: "التوصيل" },
  total: { fr: "Total", ar: "المجموع" },
  free: { fr: "Offerte", ar: "مجاني" },
  wishlist: { fr: "Favoris", ar: "المفضلة" },
  cookiesTitle: { fr: "Cookies & Confidentialité", ar: "الكوكيز والخصوصية" },
  termsTitle: { fr: "Conditions Générales", ar: "الشروط والأحكام" },
  marhbaBik: { fr: "Marhba Bik — Bienvenue", ar: "مرحبا بي · مرحباً بك" },
  acceptAll: { fr: "Tout Accepter", ar: "قبول الكل" },
  customize: { fr: "Personnaliser", ar: "تخصيص الخيارات" },
  essentialOnly: { fr: "Essentiels uniquement", ar: "الضروري فقط" },
  saveSettings: { fr: "Enregistrer mes choix", ar: "حفظ اختياراتي" },
  viewTerms: { fr: "Consulter les Termes", ar: "قراءة الشروط" },
  manageCookies: { fr: "Gérer les cookies", ar: "إدارة الكوكيز" },
} satisfies Record<string, L>;
export type Key = keyof typeof dict;

export type CookieSettings = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  termsAccepted: boolean;
  timestamp: string;
};

type Ctx = {
  lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string; tl: (l: L) => string;
  cart: Record<string, number>; add: (id: string, q?: number) => void; setQty: (id: string, q: number) => void; clear: () => void;
  wish: string[]; toggleWish: (id: string) => void; toast: string | null; count: number; subtotal: number;
  cookieConsent: CookieSettings | null;
  isCookieModalOpen: boolean;
  openCookieModal: () => void;
  closeCookieModal: () => void;
  saveCookieConsent: (settings: CookieSettings) => void;
  resetCookieConsent: () => void;
};
const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [wish, setWish] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [cookieConsent, setCookieConsent] = useState<CookieSettings | null>(null);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const s = JSON.parse(localStorage.getItem("store") || "{}");
      if (s.lang) setLang(s.lang); if (s.cart) setCart(s.cart); if (s.wish) setWish(s.wish);

      const savedCookie = localStorage.getItem("cookie_consent_v1");
      if (savedCookie) {
        setCookieConsent(JSON.parse(savedCookie));
      } else {
        // Welcome pop-up appears automatically for visitors who have not yet consented
        timer = setTimeout(() => setIsCookieModalOpen(true), 450);
      }
    } catch { /* ignore */ }
    setReady(true);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => { if (ready) localStorage.setItem("store", JSON.stringify({ lang, cart, wish })); }, [lang, cart, wish, ready]);
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; }, [lang]);

  const add = (id: string, q = 1) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + q }));
    setToast(dict.added[lang]); setTimeout(() => setToast(null), 1800);
  };
  const setQty = (id: string, q: number) => setCart((c) => { const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = q; return n; });
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((s, [id, q]) => s + (products.find((x) => x.id === id)?.price || 0) * q, 0);

  const saveCookieConsent = (settings: CookieSettings) => {
    setCookieConsent(settings);
    try {
      localStorage.setItem("cookie_consent_v1", JSON.stringify(settings));
    } catch { /* ignore */ }
    setIsCookieModalOpen(false);
    setToast(lang === "ar" ? "تم حفظ تفضيلات الخصوصية بنجاح" : "Préférences de cookies enregistrées");
    setTimeout(() => setToast(null), 2200);
  };

  const resetCookieConsent = () => {
    try {
      localStorage.removeItem("cookie_consent_v1");
    } catch { /* ignore */ }
    setCookieConsent(null);
    setIsCookieModalOpen(true);
  };

  return (
    <StoreCtx.Provider value={{
      lang, setLang, t: (k) => dict[k][lang], tl: (l) => l[lang], cart, add, setQty, clear: () => setCart({}),
      wish, toggleWish: (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])), toast, count, subtotal,
      cookieConsent,
      isCookieModalOpen,
      openCookieModal: () => setIsCookieModalOpen(true),
      closeCookieModal: () => setIsCookieModalOpen(false),
      saveCookieConsent,
      resetCookieConsent,
    }}>{children}</StoreCtx.Provider>
  );
}
export const useStore = () => { const c = useContext(StoreCtx); if (!c) throw new Error("no store"); return c; };
