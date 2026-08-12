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

export const ROOMS: Room[] = [
  {
    id: "pool",
    name: "Pool Room",
    tagline: "Precision. Atmosphere. Competition.",
    description:
      "A private billiards lounge wrapped in deep charcoal and electric blue light. Full-size pool table, leather seating, and a quiet bar corner — built for late-night games and group energy.",
    features: [
      "Full-size professional pool table",
      "Leather lounge seating for 10",
      "Bluetooth audio system",
      "Ambient blue cove lighting",
      "Private mini-bar setup",
    ],
    capacity: "Up to 10 guests",
    accent: "blue",
    image: "/rooms/pool.jpg",
    popular: true,
  },
  {
    id: "dj",
    name: "DJ Room",
    tagline: "Your night. Your set.",
    description:
      "A red-lit private booth with pro decks, thick velvet seating, and club-grade sound. Perfect for birthday parties, after-work drops, or friends who take the playlist seriously.",
    features: [
      "Professional DJ decks & mixer",
      "Club-quality sound system",
      "Curved velvet lounge seating",
      "Red atmospheric LED design",
      "Smoke / haze atmosphere option",
    ],
    capacity: "Up to 12 guests",
    accent: "red",
    image: "/rooms/dj.jpg",
  },
  {
    id: "karaoke",
    name: "Karaoke Room",
    tagline: "Private stage. Zero judgement.",
    description:
      "An intimate pink-lit karaoke suite with dual mics, a massive screen, and plush curved seating. Built for sing-alongs, birthday chaos, and nights that turn into legends.",
    features: [
      "Dual wireless microphones",
      "Large HD karaoke display",
      "Extensive song catalogue",
      "Plush curved sofa lounge",
      "Soft pink ambient lighting",
    ],
    capacity: "Up to 10 guests",
    accent: "pink",
    image: "/rooms/karaoke.jpg",
    popular: true,
  },
  {
    id: "gaming",
    name: "Gaming & Movie Room",
    tagline: "Screens, simulators, pure escape.",
    description:
      "Cinema-grade recliners, console gaming, a wall-size display, and a virtual golf simulator. Ideal for match nights, movie marathons, or friendly competition.",
    features: [
      "4K OLED wall display",
      "Latest consoles & controllers",
      "Virtual golf simulator",
      "Cinema recliners for 8",
      "Green accent lighting design",
    ],
    capacity: "Up to 8 guests",
    accent: "green",
    image: "/rooms/gaming.jpg",
  },
  {
    id: "vip",
    name: "VIP Chill Room",
    tagline: "Low lights. High standards.",
    description:
      "Our most exclusive suite — amber glow, modular lounges, soft rugs, and a champagne-ready table. Designed for private conversations, celebrations, and unhurried nights.",
    features: [
      "Premium modular lounge layout",
      "Warm amber lighting design",
      "Champagne service setup",
      "Private entrance access",
      "Dedicated host on request",
    ],
    capacity: "Up to 8 guests",
    accent: "amber",
    image: "/rooms/vip.jpg",
  },
];

export const ROOM_PRICING: Record<string, PricingTier> = {
  pool: {
    standard: { 1: 60, 2: 100, 3: 135 },
    peak: { 1: 80, 2: 140, 3: 190 },
  },
  dj: {
    standard: { 1: 75, 2: 130, 3: 175 },
    peak: { 1: 100, 2: 175, 3: 240 },
  },
  karaoke: {
    standard: { 1: 65, 2: 110, 3: 150 },
    peak: { 1: 85, 2: 150, 3: 205 },
  },
  gaming: {
    standard: { 1: 70, 2: 120, 3: 160 },
    peak: { 1: 95, 2: 165, 3: 220 },
  },
  vip: {
    standard: { 1: 90, 2: 155, 3: 210 },
    peak: { 1: 120, 2: 210, 3: 285 },
  },
};

export const PACKAGES: Package[] = [
  {
    id: "love-island",
    name: "Love Island Special",
    description: "Date-night energy with shareable treats and a toast.",
    price: 45,
    includes: [
      "Bottle of prosecco",
      "Two signature milkshakes",
      "Sharing sweet platter",
      "Mood lighting request",
    ],
    highlight: true,
  },
  {
    id: "girls-night",
    name: "Girls Night In",
    description: "The full group treatment — snacks, sips, and vibes.",
    price: 85,
    includes: [
      "Two large milkshakes",
      "Chicken fillet roll mega deal (x2)",
      "Loaded nachos",
      "Selection of soft drinks",
    ],
    highlight: true,
  },
  {
    id: "vip-indulgence",
    name: "VIP Indulgence",
    description: "For birthdays and big nights that deserve more.",
    price: 120,
    includes: [
      "Champagne bottle",
      "Premium grazing board",
      "Four signature drinks",
      "Personalised welcome note",
    ],
    highlight: true,
  },
  {
    id: "game-night",
    name: "Game Night Fuel",
    description: "Sustained energy for long sessions.",
    price: 55,
    includes: [
      "Two mega meal deals",
      "Sharing fries",
      "Soft drink selection",
      "Chocolate brownie bites",
    ],
  },
  {
    id: "after-hours",
    name: "After Hours",
    description: "Late session essentials, no fuss.",
    price: 40,
    includes: [
      "Four soft drinks",
      "Loaded fries",
      "Mixed sweet selection",
    ],
  },
];

export const TREATS: Treat[] = [
  {
    id: "oreo-shake",
    name: "Large Oreo Milkshake",
    description: "Thick, cold, unapologetically extra.",
    price: 8,
    category: "drinks",
  },
  {
    id: "strawberry-shake",
    name: "Strawberry Cream Shake",
    description: "Classic pink-tier indulgence.",
    price: 8,
    category: "drinks",
  },
  {
    id: "fillet-mega",
    name: "Chicken Fillet Roll Mega Meal Deal",
    description: "Roll, fries, and a drink — sorted.",
    price: 14,
    category: "food",
  },
  {
    id: "loaded-nachos",
    name: "Loaded Nachos",
    description: "Cheese, salsa, jalapeños, the works.",
    price: 12,
    category: "food",
  },
  {
    id: "fries",
    name: "Truffle Fries",
    description: "Crispy, herbed, shareable.",
    price: 7,
    category: "food",
  },
  {
    id: "brownie",
    name: "Warm Brownie Bites",
    description: "With salted caramel drizzle.",
    price: 9,
    category: "food",
  },
  {
    id: "prosecco",
    name: "Bottle of Prosecco",
    description: "Chilled and ready to pour.",
    price: 28,
    category: "drinks",
  },
  {
    id: "soft-pack",
    name: "Soft Drink Selection (x4)",
    description: "Mix of classics for the table.",
    price: 10,
    category: "drinks",
  },
  {
    id: "grazing",
    name: "Premium Grazing Board",
    description: "Cured meats, cheese, fruit, crackers.",
    price: 36,
    category: "food",
  },
];

export const TIME_SLOTS = [
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export const FAQ_ITEMS = [
  {
    q: "Do I need to be 18 to book?",
    a: "Yes. Off The Clock is an 18+ private social venue. Age verification is required on entry.",
  },
  {
    q: "How many people can I bring?",
    a: "Each room has a listed capacity (typically 8–12). If you need more space, contact us about combining rooms.",
  },
  {
    q: "What's the difference between Standard and Peak?",
    a: "Peak rates apply Friday–Sunday evenings from 18:00, plus bank holidays. All other times are Standard.",
  },
  {
    q: "Can I bring my own food or drinks?",
    a: "Outside alcohol is not permitted. You can order our treats and packages online, or ask the host on arrival for available options.",
  },
  {
    q: "How do I cancel or reschedule?",
    a: "Cancellations 24+ hours ahead receive a full credit. Inside 24 hours, room fees are non-refundable; packages may be rescheduled once.",
  },
  {
    q: "Is parking available?",
    a: "Street parking and nearby multi-storey options are available. We'll share directions in your confirmation.",
  },
  {
    q: "Can I host a birthday or private event?",
    a: "Absolutely. Book online, then message us with any special requests — balloons, music cues, or VIP upgrades.",
  },
  {
    q: "What should I wear?",
    a: "Smart casual. Comfortable enough for the room you've booked — no formal dress code, just good energy.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose your room",
    body: "Pool, DJ, Karaoke, Gaming & Movie, or VIP Chill — each with its own atmosphere and capacity.",
  },
  {
    step: "02",
    title: "Pick a time",
    body: "Select date, start time, and duration. Peak and Standard rates are calculated automatically.",
  },
  {
    step: "03",
    title: "Add treats",
    body: "Optional packages and individual treats — milkshakes, meal deals, champagne, grazing boards.",
  },
  {
    step: "04",
    title: "Arrive & unwind",
    body: "Check in, settle in, and enjoy a private space built entirely around your group.",
  },
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
  const day = d.getDay(); // 0 Sun … 6 Sat
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
  blue: {
    text: "text-room-blue",
    bg: "bg-room-blue/10",
    border: "border-room-blue/30",
    glow: "room-glow-blue",
    solid: "bg-room-blue",
  },
  red: {
    text: "text-room-red",
    bg: "bg-room-red/10",
    border: "border-room-red/30",
    glow: "room-glow-red",
    solid: "bg-room-red",
  },
  pink: {
    text: "text-room-pink",
    bg: "bg-room-pink/10",
    border: "border-room-pink/30",
    glow: "room-glow-pink",
    solid: "bg-room-pink",
  },
  green: {
    text: "text-room-green",
    bg: "bg-room-green/10",
    border: "border-room-green/30",
    glow: "room-glow-green",
    solid: "bg-room-green",
  },
  amber: {
    text: "text-room-amber",
    bg: "bg-room-amber/10",
    border: "border-room-amber/30",
    glow: "room-glow-amber",
    solid: "bg-room-amber",
  },
};
