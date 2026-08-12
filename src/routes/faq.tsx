import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/data/venue";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/section";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="FAQ"
        title="Questions, answered"
        description="Everything you need to know before you book — age policy, peak rates, cancellations, and more."
      />
      <div className="mx-auto max-w-2xl divide-y divide-border rounded-2xl border border-border">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface/60"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium text-fg sm:text-base">
                  {item.q}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-fg-subtle transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-200",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-fg-muted">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
