import cacao from "@/assets/p-cacao.jpg";
import pistachio from "@/assets/p-pistachio.jpg";
import granola from "@/assets/p-granola.jpg";
import bar from "@/assets/p-bar.jpg";
import butter from "@/assets/p-butter.jpg";
import truffle from "@/assets/p-truffle.jpg";
import editorial from "@/assets/editorial.jpg";
import ingredients from "@/assets/ingredients.jpg";
import lifestyle from "@/assets/lifestyle.jpg";
import hero from "@/assets/hero.jpg";

export const IMG = { cacao, pistachio, granola, bar, butter, truffle, editorial, ingredients, lifestyle, hero };

export type Nutrient = { label: string; value: string };

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAt?: number;
  image: string;
  gallery: string[];
  collections: string[];
  tags: string[];
  flavors: string[];
  weight: string;
  soldOut?: boolean;
  badge?: string;
  rating: number;
  reviews: number;
  ingredients: string;
  nutrition: Nutrient[];
  story: string;
  benefits: string[];
};

const baseNutrition = (kcal: string, protein: string, fibre: string, sugars: string): Nutrient[] => [
  { label: "Energy", value: kcal },
  { label: "Protein", value: protein },
  { label: "Fibre", value: fibre },
  { label: "Sugars (naturally occurring)", value: sugars },
  { label: "Added sugar", value: "0 g" },
];

export const PRODUCTS: Product[] = [
  {
    id: "cacao-hazelnut",
    name: "Cacao & Hazelnut Bites",
    tagline: "Stone-rolled raw cacao, toasted hazelnut, medjool date.",
    description:
      "Our signature bite. Cold-processed Criollo cacao folded through hand-pitted medjool dates and Piedmont hazelnuts, rolled slowly so the fruit sugars stay intact and the fats stay raw. Dense, deep, quietly indulgent.",
    price: 14,
    compareAt: 17,
    image: cacao,
    gallery: [cacao, ingredients, editorial],
    collections: ["best", "snacks"],
    tags: ["Raw", "Vegan", "No Added Sugar"],
    flavors: ["Classic Cacao", "Double Cacao", "Cacao + Sea Salt"],
    weight: "12 bites · 180 g",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 412,
    ingredients:
      "Organic medjool dates, organic raw hazelnuts (22%), organic raw Criollo cacao (14%), organic coconut oil, organic cacao nibs, Himalayan pink salt.",
    nutrition: baseNutrition("142 kcal / bite", "4.1 g", "3.8 g", "9.2 g"),
    story:
      "It began in a small atelier kitchen with one rule: nothing above 42°C. Everything we make still follows it.",
    benefits: ["Slow-release energy", "Magnesium rich", "Nothing refined"],
  },
  {
    id: "pistachio-rose",
    name: "Pistachio & Rose Bites",
    tagline: "Sicilian pistachio, damask rose, raw cashew cream.",
    description:
      "A quieter, more floral bite. Whole Bronte pistachios are stone-milled into a fresh cream, lifted with damask rose water and a whisper of cardamom, then rolled in crushed pistachio and petals.",
    price: 15,
    image: pistachio,
    gallery: [pistachio, ingredients, lifestyle],
    collections: ["new", "snacks", "limited"],
    tags: ["Raw", "Vegan", "Gluten-Free"],
    flavors: ["Rose & Cardamom", "Pistachio Pure", "Rose & Lemon"],
    weight: "12 bites · 180 g",
    badge: "New",
    rating: 4.8,
    reviews: 128,
    ingredients:
      "Organic cashews, organic Bronte pistachios (26%), organic medjool dates, organic rose water, organic cardamom, dried rose petals, sea salt.",
    nutrition: baseNutrition("138 kcal / bite", "4.6 g", "2.9 g", "8.1 g"),
    story: "Inspired by the pastry counters of Palermo — rebuilt with nothing but fruit, nut and flower.",
    benefits: ["Plant protein", "Antioxidant rich", "Naturally sweetened"],
  },
  {
    id: "buckwheat-granola",
    name: "Activated Buckwheat Granola",
    tagline: "Sprouted buckwheat, almond, coconut, goji.",
    description:
      "Buckwheat soaked for 12 hours, sprouted, then dried low and slow for 36 hours until it shatters. Clusters of almond, coconut and goji with nothing to bind it but date paste.",
    price: 18,
    compareAt: 21,
    image: granola,
    gallery: [granola, ingredients, editorial],
    collections: ["best", "superfoods"],
    tags: ["Activated", "Vegan", "Gluten-Free"],
    flavors: ["Original", "Cacao & Coconut", "Berry & Vanilla"],
    weight: "400 g jar",
    rating: 4.9,
    reviews: 307,
    ingredients:
      "Organic sprouted buckwheat (41%), organic almonds, organic coconut flakes, organic pumpkin seeds, organic date paste, organic goji berries, vanilla bean, sea salt.",
    nutrition: baseNutrition("186 kcal / 40 g", "6.2 g", "5.4 g", "6.8 g"),
    story: "Thirty-six hours of patience is the only ingredient we can't list on the back of the jar.",
    benefits: ["36h low-dried", "High fibre", "Prebiotic"],
  },
  {
    id: "superfood-bars",
    name: "Raw Superfood Bars",
    tagline: "Six dense bars. Cacao-dipped. Nothing refined.",
    description:
      "A full box of six. Dense pressed nut and date base, dipped in 72% raw cacao, finished with Maldon-style flakes. The one our customers rebuy most.",
    price: 26,
    compareAt: 30,
    image: bar,
    gallery: [bar, editorial, ingredients],
    collections: ["best", "snacks", "superfoods"],
    tags: ["Raw", "Vegan", "High Protein"],
    flavors: ["Cacao & Sea Salt", "Almond & Vanilla", "Mixed Box"],
    weight: "6 × 55 g",
    badge: "Best Seller",
    rating: 5,
    reviews: 589,
    ingredients:
      "Organic dates, organic almonds, organic raw cacao (18%), organic cashew butter, organic hemp protein, organic chia, cacao butter, sea salt.",
    nutrition: baseNutrition("232 kcal / bar", "9.4 g", "6.1 g", "12.4 g"),
    story: "Built for long mornings, long trails and the 4pm hour that undoes most people.",
    benefits: ["9.4 g plant protein", "Cold-pressed cacao", "Zero added sugar"],
  },
  {
    id: "almond-butter",
    name: "Stone-Ground Almond Butter",
    tagline: "One ingredient. Ground for nine hours.",
    description:
      "Spanish Marcona almonds, activated and stone-milled for nine hours until the oils release on their own. No palm, no sugar, no emulsifier. Just almond, and the air we fold into it.",
    price: 19,
    image: butter,
    gallery: [butter, ingredients, lifestyle],
    collections: ["superfoods", "new"],
    tags: ["Single Origin", "Vegan", "1 Ingredient"],
    flavors: ["Pure Almond", "Almond & Cacao", "Almond & Vanilla"],
    weight: "280 g glass",
    rating: 4.9,
    reviews: 221,
    ingredients: "Organic activated Marcona almonds (100%). That is the entire list.",
    nutrition: baseNutrition("198 kcal / 30 g", "7.1 g", "3.3 g", "1.2 g"),
    story: "We tried adding salt once. Our head maker quietly removed it the following morning.",
    benefits: ["Stone-milled", "Activated nuts", "Nothing added"],
  },
  {
    id: "date-tahini-truffles",
    name: "Date & Tahini Truffles",
    tagline: "A gifting box of sixteen. Sesame, date, cacao butter.",
    description:
      "Our most giftable piece. Silk-smooth Ethiopian sesame tahini set with date caramel and cacao butter, finished in toasted sesame and coconut. Presented in a hand-folded ivory box.",
    price: 32,
    compareAt: 38,
    image: truffle,
    gallery: [truffle, editorial, lifestyle],
    collections: ["treats", "limited", "best"],
    tags: ["Gifting", "Raw", "Vegan"],
    flavors: ["Classic", "Cacao Dusted", "Pistachio Finish"],
    weight: "16 truffles · 240 g",
    badge: "Limited",
    rating: 4.9,
    reviews: 163,
    ingredients:
      "Organic medjool dates, organic hulled sesame tahini (31%), organic cacao butter, organic coconut, organic vanilla, sea salt.",
    nutrition: baseNutrition("118 kcal / truffle", "3.2 g", "2.1 g", "7.9 g"),
    story: "Folded by hand, boxed by hand, sealed with a wax mark that never looks quite the same twice.",
    benefits: ["Hand-finished", "Calcium rich", "Gift-ready box"],
  },
  {
    id: "golden-turmeric",
    name: "Golden Turmeric Bites",
    tagline: "Turmeric, black pepper, coconut, cashew.",
    description:
      "An adaptogenic bite built around fresh-pressed turmeric and a precise pinch of black pepper for absorption. Warm, bright, faintly citrus.",
    price: 15,
    image: pistachio,
    gallery: [pistachio, ingredients, editorial],
    collections: ["superfoods", "new"],
    tags: ["Adaptogen", "Raw", "Vegan"],
    flavors: ["Turmeric & Ginger", "Turmeric & Orange"],
    weight: "12 bites · 180 g",
    rating: 4.7,
    reviews: 94,
    ingredients:
      "Organic cashews, organic coconut, organic dates, organic turmeric (4%), organic ginger, black pepper, orange zest, sea salt.",
    nutrition: baseNutrition("126 kcal / bite", "3.4 g", "2.8 g", "7.4 g"),
    story: "Developed with a nutritionist over fourteen iterations. The pepper was the thing.",
    benefits: ["Curcumin + piperine", "Anti-inflammatory", "No fillers"],
  },
  {
    id: "espresso-cacao",
    name: "Espresso Cacao Bites",
    tagline: "Single-origin espresso, raw cacao, almond.",
    description:
      "Cold-extracted Ethiopian espresso through a dense cacao and almond base. One bite is roughly a half shot — made for the hour before a long afternoon.",
    price: 16,
    image: cacao,
    gallery: [cacao, editorial, ingredients],
    collections: ["snacks", "limited"],
    tags: ["Caffeine", "Raw", "Vegan"],
    flavors: ["Espresso", "Espresso & Orange"],
    weight: "12 bites · 180 g",
    soldOut: true,
    badge: "Sold Out",
    rating: 4.8,
    reviews: 276,
    ingredients:
      "Organic dates, organic almonds, organic raw cacao, cold-extracted organic espresso (6%), cacao nibs, sea salt.",
    nutrition: baseNutrition("134 kcal / bite", "4.2 g", "3.4 g", "8.6 g"),
    story: "A limited run with a roaster in Oslo. It sells out in under three days, every time.",
    benefits: ["Natural caffeine", "Slow release", "Small batch"],
  },
  {
    id: "coconut-lucuma",
    name: "Coconut & Lucuma Clusters",
    tagline: "Peruvian lucuma, young coconut, cashew.",
    description:
      "Soft-set clusters of young coconut and lucuma — the Andean fruit that tastes like caramel without ever having met sugar.",
    price: 17,
    image: granola,
    gallery: [granola, ingredients, lifestyle],
    collections: ["treats", "superfoods"],
    tags: ["Raw", "Vegan", "Gluten-Free"],
    flavors: ["Lucuma", "Lucuma & Cacao"],
    weight: "220 g",
    soldOut: true,
    rating: 4.7,
    reviews: 88,
    ingredients: "Organic young coconut, organic cashews, organic lucuma (9%), organic dates, vanilla, sea salt.",
    nutrition: baseNutrition("164 kcal / 40 g", "3.8 g", "4.2 g", "8.8 g"),
    story: "Harvested by a seven-family cooperative outside Cusco. When their season ends, so does ours.",
    benefits: ["Low glycemic", "Mineral dense", "Single harvest"],
  },
  {
    id: "cacao-sea-salt-bar",
    name: "Cacao & Sea Salt Slab",
    tagline: "72% raw cacao, Atlantic salt, cacao nibs.",
    description:
      "A thick, hand-broken slab of stone-conched raw cacao at 72%, scattered with nibs and flakes of hand-harvested Atlantic salt.",
    price: 12,
    image: bar,
    gallery: [bar, ingredients, editorial],
    collections: ["treats", "snacks"],
    tags: ["Raw", "Vegan", "Single Origin"],
    flavors: ["72% Sea Salt", "85% Pure", "72% Orange"],
    weight: "90 g slab",
    rating: 4.9,
    reviews: 344,
    ingredients: "Organic raw cacao mass (72%), organic coconut sugar, cacao butter, cacao nibs, Atlantic sea salt.",
    nutrition: baseNutrition("172 kcal / 30 g", "3.1 g", "4.6 g", "9.4 g"),
    story: "Stone-conched for 48 hours at low temperature, the way chocolate was made before machines got fast.",
    benefits: ["48h stone-conched", "Flavanol rich", "Hand broken"],
  },
  {
    id: "discovery-box",
    name: "The Discovery Box",
    tagline: "Nine pieces across our full range.",
    description:
      "The whole house, in one box. Nine pieces spanning bites, bars, truffles and granola — our recommended first order, and our most-gifted set.",
    price: 54,
    compareAt: 68,
    image: ingredients,
    gallery: [ingredients, truffle, editorial],
    collections: ["bundles", "best"],
    tags: ["Bundle", "Save 20%", "Gifting"],
    flavors: ["Classic Selection", "Cacao Lovers", "Low Sugar"],
    weight: "9 pieces · 820 g",
    badge: "Save $14",
    rating: 5,
    reviews: 198,
    ingredients: "A curated selection — see each product for its full ingredient declaration.",
    nutrition: baseNutrition("Varies by piece", "—", "—", "—"),
    story: "If you only ever order from us once, order this.",
    benefits: ["20% saving", "Nine pieces", "Ships in gift box"],
  },
  {
    id: "morning-ritual",
    name: "The Morning Ritual Set",
    tagline: "Granola, almond butter, cacao bites.",
    description:
      "Three products that live on the same shelf: the granola, the almond butter and a box of cacao bites. Enough for a fortnight of better mornings.",
    price: 46,
    compareAt: 55,
    image: lifestyle,
    gallery: [lifestyle, granola, butter],
    collections: ["bundles", "new"],
    tags: ["Bundle", "Save 16%"],
    flavors: ["Original", "Cacao Forward"],
    weight: "3 products",
    badge: "Save $9",
    rating: 4.9,
    reviews: 142,
    ingredients: "A curated selection — see each product for its full ingredient declaration.",
    nutrition: baseNutrition("Varies by product", "—", "—", "—"),
    story: "Built after a thousand customers told us they ordered the same three things, every time.",
    benefits: ["Three full products", "16% saving", "Free shipping"],
  },
];

export const COLLECTIONS = [
  { id: "all", label: "All" },
  { id: "best", label: "Best Sellers" },
  { id: "new", label: "New" },
  { id: "snacks", label: "Snacks" },
  { id: "superfoods", label: "Superfoods" },
  { id: "treats", label: "Treats" },
  { id: "bundles", label: "Bundles" },
  { id: "limited", label: "Limited Edition" },
];

export const FEATURED_COLLECTIONS = [
  {
    id: "best",
    name: "The Signatures",
    count: 6,
    copy: "The pieces that built the house.",
    image: cacao,
  },
  { id: "superfoods", name: "Superfoods", count: 5, copy: "Dense, functional, quietly powerful.", image: granola },
  { id: "treats", name: "Treats", count: 4, copy: "Indulgence without the compromise.", image: truffle },
  { id: "bundles", name: "Bundles", count: 3, copy: "Mix your favourites. Save more.", image: ingredients },
  { id: "new", name: "New Arrivals", count: 4, copy: "Fresh from the atelier.", image: pistachio },
  { id: "limited", name: "Limited Edition", count: 3, copy: "Small batches. Single seasons.", image: bar },
];

export const STORY_TABS = [
  {
    id: "ingredients",
    label: "The Ingredients",
    kicker: "01 — Sourcing",
    heading: "Nine ingredients, or fewer.",
    body: "Every recipe we have ever released fits on the front of the pack. Medjool dates hand-pitted in the Jordan Valley. Bronte pistachios from a single Sicilian slope. Criollo cacao fermented at origin in Peru. If an ingredient cannot earn its place by taste and by nutrition, it does not go in — which is why you will never find a gum, a stabiliser, a natural flavouring or a refined sugar anywhere in our range.",
    stat: "9",
    statLabel: "Max ingredients per recipe",
    image: ingredients,
  },
  {
    id: "raw",
    label: "Kept Raw",
    kicker: "02 — Method",
    heading: "Nothing goes above 42°C.",
    body: "Heat is fast, and fast is cheap. We dry low and slow — up to thirty-six hours — so the enzymes, the delicate fats and the fat-soluble vitamins arrive in the pack the way they left the farm. It costs us more in time, energy and yield than any other decision we have made. It is also the reason our cacao still tastes of fruit.",
    stat: "42°C",
    statLabel: "Our hard ceiling",
    image: editorial,
  },
  {
    id: "craft",
    label: "The Craft",
    kicker: "03 — Making",
    heading: "Rolled, pressed and folded by hand.",
    body: "Our atelier runs in batches of ninety. Each batch is mixed, rested, rolled and weighed by a maker whose initials go on the box. We stone-mill our nut butters for nine hours rather than ninety seconds, because the oils should release on their own. Small numbers, slow hands, no shortcuts — the texture is the proof.",
    stat: "90",
    statLabel: "Pieces per batch",
    image: editorial,
  },
  {
    id: "nutrition",
    label: "The Nutrition",
    kicker: "04 — Density",
    heading: "Dense, not empty.",
    body: "We build every recipe around nutrient density: plant protein, fibre, magnesium, healthy fats and naturally occurring fruit sugars — never added ones. A single bar carries 9.4g of plant protein and 6.1g of fibre. The point is not fewer calories. The point is that each one of them is doing something for you.",
    stat: "0 g",
    statLabel: "Added sugar, across the range",
    image: ingredients,
  },
  {
    id: "earth",
    label: "The Earth",
    kicker: "05 — Responsibility",
    heading: "Grown well, packed lightly.",
    body: "Certified organic across every ingredient line. Direct, long-term agreements with eleven grower cooperatives, paid above fair-trade floor. Home-compostable inner film, FSC outer board, plastic-free since the first order we ever shipped. We measure what we take and we publish it once a year, in full.",
    stat: "11",
    statLabel: "Grower partnerships",
    image: editorial,
  },
];

export const STORES = [
  { name: "Erewhon", type: "Grocer", city: "Los Angeles", region: "CA", locations: 9 },
  { name: "Whole Foods Market", type: "Grocer", city: "Nationwide", region: "US", locations: 142 },
  { name: "Selfridges Foodhall", type: "Department", city: "London", region: "UK", locations: 3 },
  { name: "Eataly", type: "Market", city: "New York", region: "NY", locations: 6 },
  { name: "Le Bon Marché", type: "Department", city: "Paris", region: "FR", locations: 1 },
  { name: "Planet Organic", type: "Grocer", city: "London", region: "UK", locations: 14 },
  { name: "Mercado Little Spain", type: "Market", city: "New York", region: "NY", locations: 2 },
  { name: "Bite Society", type: "Specialty", city: "Austin", region: "TX", locations: 4 },
  { name: "Foodhallen", type: "Market", city: "Amsterdam", region: "NL", locations: 3 },
  { name: "The Source Bulk Foods", type: "Grocer", city: "Sydney", region: "AU", locations: 21 },
  { name: "KaDeWe Feinkost", type: "Department", city: "Berlin", region: "DE", locations: 1 },
  { name: "Harvey Nichols", type: "Department", city: "Manchester", region: "UK", locations: 5 },
];

export const SOCIALS = [
  { name: "Instagram", handle: "@izhar.organics", href: "https://instagram.com" },
  { name: "TikTok", handle: "@izhar", href: "https://tiktok.com" },
  { name: "YouTube", handle: "Izhar Kitchen", href: "https://youtube.com" },
  { name: "Pinterest", handle: "Izhar", href: "https://pinterest.com" },
  { name: "Substack", handle: "The Raw Letter", href: "https://substack.com" },
  { name: "Reddit", handle: "r/izhar", href: "https://reddit.com" },
];

export const RIBBON_WORDS = [
  "Organic",
  "Raw",
  "Vegan",
  "Gluten-Free",
  "No Added Sugar",
  "Nutritionally Dense",
];

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
