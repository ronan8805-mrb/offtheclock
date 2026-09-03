import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/section";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
});

function LegalPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader eyebrow="Legal" title="Privacy & terms" />
      <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-fg-muted">
        <p>This site is a personal studio presence for Ronan Buckley. Contact forms are simulated in this build.</p>
        <p>Work listed represents professional experience described by Ronan. Client names indicate the nature of past work, not official endorsements.</p>
        <p>© {new Date().getFullYear()} Ronan Buckley.</p>
      </div>
    </Section>
  );
}
