export type RoomAccent = "blue" | "red" | "pink" | "green" | "amber";

export type Room = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  capacity: string;
  accent: RoomAccent;
  image: string;
  popular?: boolean;
};

export type DurationOption = 1 | 2 | 3;

export type RateBand = "standard" | "peak";

export type PricingTier = Record<
  RateBand,
  Record<DurationOption, number>
>;

export type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  includes: string[];
  highlight?: boolean;
};

export type Treat = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "drinks" | "food" | "extras";
};

export const STUDIO = {
  name: "Ronan Buckley",
  mark: "RB",
  studio: "Off The Clock",
  headline: "I make the thing you thought needed a whole team.",
  subhead:
    "Websites that feel illegal. Apps that actually get used. Campaigns that move people. Games that swallow weekends. Built by one Irish contractor who does not clock out.",
  location: "Dublin-born · Spain-based · remote everywhere",
  email: "hello@offtheclock247.com",
};

export const ROOMS: Room[] = [
  {
    id: "pool",
    name: "Web & Product",
    tagline: "Sites that stop the scroll.",
    description:
      "100+ websites designed and shipped for real clients — not templates with extra padding. Brand systems, conversion funnels, booking engines, and interfaces that feel like they cost ten times more than they did.",
    features: [
      "Custom marketing and product sites",
      "Design systems that scale",
      "Conversion-first UX",
      "Motion, atmosphere, and craft",
      "Built around the exact brief — not a theme",
    ],
    capacity: "Startups · venues · personal brands",
    accent: "blue",
    image: "/rooms/pool.jpg",
    popular: true,
  },
  {
    id: "dj",
    name: "Apps & Platforms",
    tagline: "Software that earns its keep.",
    description:
      "Customer analysis tools, employee management platforms, safety systems, and trading-grade applications. Shipped in the orbit of Revolut, Remote, and Chosanta LTD across Ireland, Spain, and the rest of Europe.",
    features: [
      "Customer analysis dashboards",
      "Employee / ops management",
      "Safety and compliance apps",
      "Hedge-fund style trading tools",
      "Full-stack product builds",
    ],
    capacity: "Operators who hate busywork",
    accent: "red",
    image: "/rooms/dj.jpg",
    popular: true,
  },
  {
    id: "karaoke",
    name: "Marketing & Campaigns",
    tagline: "Culture, not calendar filler.",
    description:
      "Campaigns and creative for people who already have an audience — including UK rapper Tunde and Irish boxer-influencer Ben Williams. Strategy, identity, content systems, and advertising that does not apologise for existing.",
    features: [
      "Brand identity and positioning",
      "Campaign concepts and rollout",
      "Talent and personality marketing",
      "Social, film, and stills direction",
      "Irish wit, international polish",
    ],
    capacity: "Artists · athletes · ambitious brands",
    accent: "pink",
    image: "/rooms/karaoke.jpg",
  },
  {
    id: "gaming",
    name: "Games & Worlds",
    tagline: "Dublin, but make it legendary.",
    description:
      "Currently building Irish Outlaws: Dublin Vendetta in Unreal Engine 5 — a less graphic, GTA-style open city set in Dublin city centre for a client I cannot name. The games market is massive. I am addicted. Come in.",
    features: [
      "Unreal Engine 5 production",
      "Open-world Dublin setting",
      "Narrative + systems design",
      "Cinematic presentation",
      "Studio partnership ready",
    ],
    capacity: "Studios · publishers · wild briefs",
    accent: "green",
    image: "/rooms/gaming.jpg",
    popular: true,
  },
  {
    id: "vip",
    name: "AI & Systems",
    tagline: "Models, machines, leverage.",
    description:
      "I train LLMs on my own supercomputer — RTX 5090 in the rack — and wire intelligence into products. Analysis apps, automation, custom models, and the unglamorous glue that makes a company feel ten people bigger.",
    features: [
      "Custom LLM training and fine-tunes",
      "Internal tools with real brains",
      "Automation that replaces busywork",
      "Data products and customer insight",
      "Hardware-to-product pipeline",
    ],
    capacity: "Founders who want an unfair edge",
    accent: "amber",
    image: "/rooms/vip.jpg",
  },
];

export const ROOM_PRICING: Record<string, PricingTier> = {
  pool: {
    standard: { 1: 2400, 2: 4200, 3: 5800 },
    peak: { 1: 3200, 2: 5600, 3: 7800 },
  },
  dj: {
    standard: { 1: 3800, 2: 6800, 3: 9400 },
    peak: { 1: 5200, 2: 9200, 3: 12800 },
  },
  karaoke: {
    standard: { 1: 1800, 2: 3200, 3: 4400 },
    peak: { 1: 2600, 2: 4600, 3: 6400 },
  },
  gaming: {
    standard: { 1: 4500, 2: 8200, 3: 11400 },
    peak: { 1: 6200, 2: 11200, 3: 15600 },
  },
  vip: {
    standard: { 1: 3000, 2: 5400, 3: 7600 },
    peak: { 1: 4200, 2: 7600, 3: 10800 },
  },
};

export const PACKAGES: Package[] = [
  {
    id: "site-sprint",
    name: "Site Sprint",
    description: "A flagship website in weeks, not quarters.",
    price: 4800,
    includes: [
      "Strategy + sitemap",
      "Custom design system",
      "Build, motion, launch",
      "Analytics and handover",
    ],
    highlight: true,
  },
  {
    id: "product-build",
    name: "Product Build",
    description: "An app or internal platform that staff actually open.",
    price: 12000,
    includes: [
      "Discovery and architecture",
      "Design + engineering",
      "Auth, data, dashboards",
      "Deploy and training",
    ],
    highlight: true,
  },
  {
    id: "campaign-drop",
    name: "Campaign Drop",
    description: "A launch that feels like culture, not a LinkedIn post.",
    price: 3500,
    includes: [
      "Positioning and concept",
      "Visual identity pack",
      "Content system",
      "Rollout plan",
    ],
    highlight: true,
  },
  {
    id: "world-proto",
    name: "World Prototype",
    description: "UE5 vertical slice — proof you can fund the rest.",
    price: 18000,
    includes: [
      "Look-dev and blockout",
      "Player loop",
      "Cinematic moment",
      "Playable build",
    ],
  },
  {
    id: "always-on",
    name: "Always On",
    description: "A contractor who treats your product like it is his.",
    price: 6500,
    includes: [
      "Retainer days each month",
      "Priority queue",
      "Design + code + campaigns",
      "No agency telephone game",
    ],
  },
];

export const TREATS: Treat[] = [
  { id: "ts", name: "TypeScript / React", description: "The daily driver for product and web.", price: 0, category: "drinks" },
  { id: "ue5", name: "Unreal Engine 5", description: "Irish Outlaws and the worlds after it.", price: 0, category: "drinks" },
  { id: "python", name: "Python / ML", description: "Models, analysis, training loops.", price: 0, category: "drinks" },
  { id: "design", name: "Graphic design", description: "Identity, advertising, stills, motion direction.", price: 0, category: "food" },
  { id: "ads", name: "Advertising", description: "Campaigns for talent and brands that already have heat.", price: 0, category: "food" },
  { id: "full-stack", name: "Full-stack platforms", description: "From schema to the button the CEO slams.", price: 0, category: "food" },
  { id: "llm", name: "LLM training", description: "Fine-tunes on my own RTX 5090 rig.", price: 0, category: "extras" },
  { id: "ops", name: "Ops & safety systems", description: "Chosanta LTD — Ireland, Spain, Europe.", price: 0, category: "extras" },
  { id: "trading", name: "Trading systems", description: "Hedge-fund grade tooling, no theatre.", price: 0, category: "extras" },
];

export const TIME_SLOTS = [
  "09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00",
];

export const FAQ_ITEMS = [
  { q: "Who is this actually for?", a: "Founders, operators, artists, and studios who want one person who can design it, build it, market it, and not disappear after the invoice. If you need a 40-person deck first, I am the wrong room." },
  { q: "Where are you based?", a: "Dublin-born. Lived in Canada, the USA, Mexico, and now Spain. Work lands everywhere. Timezones are a suggestion; delivery is not." },
  { q: "Have you shipped real products or just pretty sites?", a: "Both, on purpose. 100+ websites. Customer analysis and employee platforms around Revolut and Remote. Safety apps for Chosanta LTD across Ireland and Europe. Trading tools at hedge-fund intensity. Campaigns for Tunde and Ben Williams. And a UE5 Dublin open-world in production." },
  { q: "Do you take small jobs or only moonshots?", a: "I take work that deserves to exist. A tight site for a serious operator can be more interesting than a bloated app. If the brief is lazy, I will say so." },
  { q: "How do projects start?", a: "Send the brief. I reply fast. We lock scope, timeline, and a number. Then I go over and beyond — contractor habit, not a slogan." },
  { q: "Can you join an existing team?", a: "Yes. I have always been self-employed. Drop me into design, engineering, campaigns, or the ugly glue between them." },
  { q: "What is Irish Outlaws?", a: "Irish Outlaws: Dublin Vendetta is an Unreal Engine 5 game set in Dublin city centre. Think GTA energy with less graphic excess. Built for a major client I cannot name yet. The gaming market is enormous. I am all in." },
  { q: "How do we pay / what are rates?", a: "Project fees or a monthly always-on retainer. Indicative starting points live on the Services page. Serious briefs get a precise quote, not a menu surprise." },
];

export const HOW_IT_WORKS = [
  { step: "01", title: "Tell me the unreasonably good version", body: "Not the safe brief. The one you would build if you trusted the person on the other side. I will tell you what is real in a week versus a quarter." },
  { step: "02", title: "I design the attack", body: "Scope, stack, look, and the first thing the user feels. No 40-slide archaeology. A plan you can smell." },
  { step: "03", title: "Build in public-to-you", body: "Tight loops. Working software, working campaigns, working worlds. You see progress, not status theatre." },
  { step: "04", title: "Ship, then keep the knife sharp", body: "Launch is the start. I stay on as the contractor who actually answers, or I hand you a system you can run without me." },
];

export function getRoom(id: string): Room | undefined {
  return ROOMS.find((r) => r.id === id);
}

export function normalizeDuration(d: unknown): DurationOption {
  const n = Number(d);
  if (n === 1 || n === 2 || n === 3) return n;
  return 2;
}

export function isPeakTime(dateIso: string, time: string): boolean {
  if (!dateIso || !time) return false;
  const d = new Date(dateIso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return false;
  const day = d.getDay();
  const hour = parseInt(time.split(":")[0] ?? "0", 10);
  const isWeekend = day === 0 || day === 5 || day === 6;
  return isWeekend && hour >= 18;
}

export function getRoomPrice(
  roomId: string,
  duration: DurationOption | number | string,
  dateIso: string,
  time: string,
): { band: RateBand; amount: number } {
  const tiers = ROOM_PRICING[roomId];
  if (!tiers) return { band: "standard", amount: 0 };
  const dur = normalizeDuration(duration);
  const band: RateBand = isPeakTime(dateIso, time) ? "peak" : "standard";
  const amount = tiers[band][dur] ?? 0;
  return { band, amount };
}

export const ACCENT_CLASSES: Record<
  RoomAccent,
  { text: string; bg: string; border: string; glow: string; solid: string }
> = {
  blue: { text: "text-room-blue", bg: "bg-room-blue/10", border: "border-room-blue/30", glow: "room-glow-blue", solid: "bg-room-blue" },
  red: { text: "text-room-red", bg: "bg-room-red/10", border: "border-room-red/30", glow: "room-glow-red", solid: "bg-room-red" },
  pink: { text: "text-room-pink", bg: "bg-room-pink/10", border: "border-room-pink/30", glow: "room-glow-pink", solid: "bg-room-pink" },
  green: { text: "text-room-green", bg: "bg-room-green/10", border: "border-room-green/30", glow: "room-glow-green", solid: "bg-room-green" },
  amber: { text: "text-room-amber", bg: "bg-room-amber/10", border: "border-room-amber/30", glow: "room-glow-amber", solid: "bg-room-amber" },
};
