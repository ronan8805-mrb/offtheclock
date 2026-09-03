export const SITE = {
  name: "Ronan Buckley",
  short: "RB",
  title: "Ronan Buckley — Web, apps, marketing, games",
  tagline: "I build the thing that makes people stare.",
  description:
    "Dublin-born builder. Websites, apps, campaigns, and games — designed, shipped, and obsessed over. Available for the next impossible brief.",
  email: "ronan@offtheclock247.com",
  instagram: "https://instagram.com",
  location: "Dublin · Spain · wherever the brief lives",
  city: "Dublin",
};

export const SERVICES = [
  {
    id: "web",
    title: "Websites that actually land",
    punch: "Not templates. Instruments.",
    body: "100+ sites built to a brief — brand worlds, booking engines, product pages, and the kind of homepage that makes a CFO say wait, scroll back.",
    tags: ["Brand sites", "Product", "E-commerce", "CMS"],
    accent: "#c8f542",
  },
  {
    id: "apps",
    title: "Apps people keep open",
    punch: "Customer analysis. Ops. Safety.",
    body: "Customer-analysis tools, employee platforms, safety apps for Ireland and Europe — including work that touched Revolut, Remote, and Chosanta LTD.",
    tags: ["Product apps", "Dashboards", "Ops tools", "Safety"],
    accent: "#7dd3fc",
  },
  {
    id: "marketing",
    title: "Campaigns with a pulse",
    punch: "Personality, not stock energy.",
    body: "Creative + media thinking for people who already have an audience. Campaign work includes UK rapper Tunde and Irish boxer / influencer Ben Williams.",
    tags: ["Identity", "Social", "Launch", "Talent"],
    accent: "#fb7185",
  },
  {
    id: "games",
    title: "Worlds you can walk into",
    punch: "Unreal. Dublin. Ambition.",
    body: "Currently building Irish Outlaws: Dublin Vendetta in Unreal Engine 5 — a less-graphic, GTA-style sandbox set in Dublin city centre for a client I can't name. The games market is enormous. I'm in it.",
    tags: ["Unreal Engine 5", "Open world", "Narrative"],
    accent: "#fbbf24",
  },
];

export const WORK = [
  {
    id: "revolut-remote",
    client: "Fintech & remote ops",
    title: "Customer analysis & employee platforms",
    meta: "Apps · Europe",
    body: "Built customer-analysis and employee-management applications used in high-velocity environments — including work connected to Revolut and Remote.",
    year: "Ongoing",
  },
  {
    id: "chosanta",
    client: "Chosanta LTD",
    title: "Safety apps for Ireland and Europe",
    meta: "Product · ES / IE / EU",
    body: "Safety applications designed to travel — Ireland first, then Spain and the rest of the continent. Practical, regulated, no theatre.",
    year: "Shipped",
  },
  {
    id: "tunde",
    client: "Tunde",
    title: "Campaigns for a UK rap voice",
    meta: "Marketing · Music",
    body: "Marketing that respects the artist. Visuals, drops, and the kind of digital presence that doesn't feel like a label intern designed it.",
    year: "Campaigns",
  },
  {
    id: "ben-williams",
    client: "Ben Williams",
    title: "Irish boxer. Irish internet.",
    meta: "Marketing · Sport / influence",
    body: "Brand and campaign work for an Irish boxer and influencer who already knows how to fill a room. I make the pixels keep up.",
    year: "Campaigns",
  },
  {
    id: "sites-100",
    client: "Dozens of briefs",
    title: "100+ websites, zero photocopies",
    meta: "Web · Custom",
    body: "Comprehensive sites built to exact customer needs — not a theme with the logo swapped. If it looks like everyone else's, I didn't make it.",
    year: "100+",
  },
  {
    id: "irish-outlaws",
    client: "Confidential",
    title: "Irish Outlaws: Dublin Vendetta",
    meta: "Game · UE5",
    body: "Open-world, GTA-adjacent Dublin. Less graphic, more swagger. Built in Unreal Engine 5. Client unnamed. If you know the streets from O'Connell to the Liberties, you'll feel it.",
    year: "In production",
  },
];

export const STATS = [
  { value: "100+", label: "Websites shipped" },
  { value: "UE5", label: "Game in production" },
  { value: "EU", label: "Ireland → Spain → out" },
  { value: "24/7", label: "Contractor energy" },
];

export const SKILLS = [
  "TypeScript",
  "React",
  "Product design",
  "Unreal Engine 5",
  "Brand systems",
  "Campaigns",
  "LLM training",
  "Hedge-fund trading UIs",
  "Graphic design",
  "Advertising",
  "Safety / compliance apps",
  "Customer analytics",
];

export const TIMELINE = [
  {
    when: "Now",
    title: "Games + anything ambitious",
    body: "Irish Outlaws in UE5. Still taking websites, apps, and campaigns. Self-employed. Always have been.",
  },
  {
    when: "Recent",
    title: "Apps that move money and people",
    body: "Customer analysis, employee platforms, safety products. Work that had to survive real users — Revolut, Remote, Chosanta LTD.",
  },
  {
    when: "Always",
    title: "Marketing for people with a name",
    body: "Tunde. Ben Williams. Others who don't need an introduction in their city.",
  },
  {
    when: "7 years back",
    title: "Level 8 BSc Computing — NCI",
    body: "National College of Ireland. The modules stuck. The obsession started earlier.",
  },
  {
    when: "Life",
    title: "Dublin. Canada. USA. Mexico. Spain.",
    body: "Irish as hell. Passport well-used. I design like I've lived in more than one timezone — because I have.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "What do you actually take on?",
    a: "Websites, web apps, internal tools, campaigns, brand systems, and game worlds. If it needs to look expensive and work on a Tuesday, that's me.",
  },
  {
    q: "Are you a studio or a one-man army?",
    a: "I'm Ronan. Self-employed contractor. I go over and beyond because my name is on it. When a brief needs a crew, I pull one.",
  },
  {
    q: "Where are you based?",
    a: "Dublin-born. Time in Canada, the US, Mexico. I live in Spain. I work wherever the work is.",
  },
  {
    q: "Do you train models too?",
    a: "Yes. I've trained LLMs on my own hardware — RTX 5090 supercomputer setup. If your product needs a brain as well as a face, we can talk.",
  },
  {
    q: "Can you work inside an existing team?",
    a: "That's most of the job. I slot in, ship, and don't need a three-week onboarding ritual.",
  },
  {
    q: "How fast do you move?",
    a: "Uncomfortably fast, in a good way. I learn systems like it's a sport. If the brief is clear, you'll see pixels before the fourth meeting.",
  },
];

export const LAB_COMMANDS = [
  { cmd: "ronan --who", out: "Dublin-born builder. Web · apps · marketing · games." },
  { cmd: "ronan --stack", out: "TypeScript, React, UE5, brand systems, campaign craft, LLMs." },
  { cmd: "ronan --clients", out: "Fintech, remote ops, safety (EU), music, sport, 100+ custom sites." },
  { cmd: "ronan --now", out: "Irish Outlaws: Dublin Vendetta — Unreal Engine 5." },
  { cmd: "ronan --hire", out: "Yes. Over-delivers. Reply to the brief like it owes you money." },
];
