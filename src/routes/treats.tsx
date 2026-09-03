import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/section";
import { LabTerminal } from "@/components/lab-terminal";
import { SKILLS } from "@/data/studio";

export const Route = createFileRoute("/treats")({
  component: LabPage,
});

function LabPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="The lab"
        title="Capabilities, live"
        description="If a studio site can't show range in the first ten seconds, it's just a CV with extra steps."
      />
      <LabTerminal />
      <div className="mt-12">
        <h3 className="font-display text-2xl">Toolbox</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span key={s} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
