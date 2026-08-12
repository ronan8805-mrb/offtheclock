import { createFileRoute, Link } from "@tanstack/react-router";
import { HOW_IT_WORKS } from "@/data/venue";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="How it works"
        title="Four steps to your night"
        description="We kept booking simple so you can focus on who you're bringing — not paperwork."
      />
      <div className="relative space-y-0">
        {HOW_IT_WORKS.map((item, i) => (
          <div
            key={item.step}
            className="grid gap-4 border-t border-border py-10 md:grid-cols-[120px_1fr] md:gap-10"
          >
            <p className="font-mono text-3xl text-fg-subtle">{item.step}</p>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-fg">
                {item.title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-fg-muted">
                {item.body}
              </p>
            </div>
            {i < HOW_IT_WORKS.length - 1 && null}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-8 text-center">
        <h3 className="text-xl font-semibold text-fg">Ready when you are</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
          Pick a room, lock a slot, add treats if you want — payment is secure
          and confirmation is instant.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/book">
            Book a Room
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
