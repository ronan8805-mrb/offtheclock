import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Gamepad2, Megaphone, Sparkles, Terminal } from "lucide-react";
import { HOW_IT_WORKS, ROOMS, STUDIO } from "@/data/venue";
import { RoomCard } from "@/components/room-card";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const ROLES = [
  "websites that refuse to be ignored",
  "apps operators actually open",
  "campaigns with a pulse",
  "Unreal worlds set in Dublin",
  "models trained on my own iron",
];

const TICKER = [
  "TypeScript",
  "React",
  "Unreal Engine 5",
  "Python",
  "LLM training",
  "Graphic design",
  "Advertising",
  "Trading systems",
  "Safety apps",
  "Customer analytics",
  "Brand identity",
  "NCI Computing",
];

function RoleCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % ROLES.length), 2400);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span key={i} className="fade-up text-fg">
      {ROLES[i]}
    </span>
  );
}

export function HomePage() {
  const [cmd, setCmd] = useState(0);
  const lines = [
    "$ whoami",
    "ronan_buckley — contractor, builder, marketer, game director",
    "$ ls ./shipped",
    "100+_sites  revolut_adjacent_apps  remote_ops  chosanta_safety_eu",
    "tunde_campaigns  ben_williams  irish_outlaws_ue5  llm_lab_rtx5090",
    "$ status",
    "always_on=true  timezone=Dublin/Spain  available=yes",
  ];
  useEffect(() => {
    if (cmd >= lines.length) return;
    const t = window.setTimeout(() => setCmd((n) => n + 1), 380);
    return () => window.clearTimeout(t);
  }, [cmd, lines.length]);

  return (
    <>
      <section className="relative min-h-[90dvh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 aurora" />
        <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
        <div className="relative mx-auto flex min-h-[90dvh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
          <div className="fade-up mb-7">
            <Logo className="h-10 sm:h-12 max-h-12" />
          </div>
          <p className="fade-up stagger-1 mb-5 text-xs font-medium uppercase tracking-[0.22em] text-fg-subtle">
            {STUDIO.location}
          </p>
          <h1 className="fade-up stagger-2 max-w-4xl text-4xl font-semibold tracking-tight text-fg sm:text-6xl md:text-7xl">
            I make <RoleCycle />.
          </h1>
          <p className="fade-up stagger-3 mt-6 max-w-xl text-base leading-relaxed text-fg-muted">
            {STUDIO.subhead}
          </p>
          <div className="fade-up stagger-4 mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/book" search={{ fresh: "1" as const }}>
                Start a brief
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/rooms">See the work</Link>
            </Button>
          </div>

          <div className="fade-up stagger-5 mt-16 grid max-w-3xl grid-cols-2 gap-4 border-t border-border/60 pt-8 sm:grid-cols-4">
            {[
              { n: "100+", l: "websites shipped" },
              { n: "EU", l: "apps in production" },
              { n: "UE5", l: "Dublin open world" },
              { n: "24/7", l: "contractor mode" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-2xl font-semibold tabular-nums text-fg">{s.n}</p>
                <p className="mt-1 text-xs text-fg-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-bg-elevated/60 py-3">
        <div className="marquee flex w-max gap-10 text-xs uppercase tracking-[0.2em] text-fg-subtle">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
      </div>

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="The pitch"
              title="Best of both worlds — the tech and the taste"
              description="Level 8 Computing, National College of Ireland. Then seven years of shipping as a self-employed contractor. I design it, code it, advertise it, and stay on the hook. Lived in Canada, the USA, Mexico, and Spain. Still Irish as hell."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Sparkles, t: "Web & product", d: "Sites that feel custom because they are." },
                { icon: Cpu, t: "Apps & AI", d: "Ops tools, trading systems, LLMs on a 5090." },
                { icon: Megaphone, t: "Campaigns", d: "Tunde. Ben Williams. Brands with heat." },
                { icon: Gamepad2, t: "Games", d: "Irish Outlaws: Dublin Vendetta." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-2xl border border-border bg-surface p-4">
                  <Icon className="mb-3 size-4 text-fg-subtle" />
                  <p className="text-sm font-semibold text-fg">{t}</p>
                  <p className="mt-1 text-xs text-fg-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-black p-5 font-mono text-[12px] leading-relaxed text-green-400 sm:p-6">
            <div className="mb-4 flex items-center gap-2 text-fg-subtle">
              <Terminal className="size-3.5" />
              <span>studio.exec</span>
            </div>
            {lines.slice(0, cmd).map((line, i) => (
              <p key={i} className={line.startsWith("$") ? "mt-3 text-fg" : "text-green-400/90"}>
                {line}
              </p>
            ))}
            <span className="inline-block h-4 w-2 animate-pulse bg-green-400 align-middle" />
          </div>
        </div>
      </Section>

      <Section className="bg-bg-elevated/50">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Disciplines"
            title="Five ways in. One standard."
            description="Pick a lane or smash them together. Most of the interesting work lives in the overlap."
          />
          <Button asChild variant="outline" className="shrink-0 self-start sm:self-auto">
            <Link to="/rooms">All work</Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Process" title="How a brief becomes a thing" align="center" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={item.step} className={`rounded-2xl border border-border bg-surface p-6 fade-up stagger-${i + 1}`}>
              <p className="mb-4 font-mono text-sm text-fg-subtle">{item.step}</p>
              <h3 className="mb-2 text-base font-semibold text-fg">{item.title}</h3>
              <p className="text-sm leading-relaxed text-fg-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 aurora opacity-50" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Got something that should not be average?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-fg-muted sm:text-base">
              I go over and beyond. That is not a slogan — that is what happens when you have only ever worked for yourself.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/book" search={{ fresh: "1" as const }}>
                  Start a brief
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Say hello</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
