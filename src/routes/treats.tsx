import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { PACKAGES, TREATS } from "@/data/venue";
import { formatEuro } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/treats")({
  component: TreatsPage,
});

function TreatsPage() {
  const drinks = TREATS.filter((t) => t.category === "drinks");
  const food = TREATS.filter((t) => t.category === "food");
  const extras = TREATS.filter((t) => t.category === "extras");

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <SectionHeader
          eyebrow="Treats & packages"
          title="Fuel the night"
          description="Signature packages for groups, plus à la carte treats — milkshakes, meal deals, champagne, and more. Add them during booking or on the night."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {PACKAGES.filter((p) => p.highlight).map((pkg, i) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-2xl border border-border bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong fade-up stagger-${i + 1}`}
            >
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="size-4 text-fg-subtle" />
                <span className="text-xs font-medium uppercase tracking-widest text-fg-subtle">
                  Signature
                </span>
              </div>
              <h3 className="text-xl font-semibold text-fg">{pkg.name}</h3>
              <p className="mt-2 text-sm text-fg-muted">{pkg.description}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-fg-muted">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-fg-subtle">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <span className="text-2xl font-semibold tabular-nums text-fg">
                  {formatEuro(pkg.price)}
                </span>
                <Button asChild size="sm" variant="secondary">
                  <Link to="/book">Add in booking</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-bg-elevated/40">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-fg">
          More packages
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {PACKAGES.filter((p) => !p.highlight).map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-semibold text-fg">{pkg.name}</h3>
                <p className="mt-1 text-sm text-fg-muted">{pkg.description}</p>
                <p className="mt-2 text-xs text-fg-subtle">
                  {pkg.includes.join(" · ")}
                </p>
              </div>
              <p className="shrink-0 text-xl font-semibold tabular-nums text-fg">
                {formatEuro(pkg.price)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-fg">
          À la carte
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          <TreatList title="Drinks" items={drinks} />
          <TreatList title="Food" items={[...food, ...extras]} />
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/book">Book & add treats</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

function TreatList({
  title,
  items,
}: {
  title: string;
  items: typeof TREATS;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-fg-subtle">
        {title}
      </h3>
      <ul className="divide-y divide-border rounded-2xl border border-border">
        {items.map((t) => (
          <li
            key={t.id}
            className="flex items-start justify-between gap-4 px-4 py-4"
          >
            <div>
              <p className="font-medium text-fg">{t.name}</p>
              <p className="mt-0.5 text-sm text-fg-muted">{t.description}</p>
            </div>
            <span className="shrink-0 tabular-nums text-sm font-medium text-fg">
              {formatEuro(t.price)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
