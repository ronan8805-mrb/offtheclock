import { Link, createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/section";
import { WORK } from "@/data/studio";

export const Route = createFileRoute("/rooms/")({
  component: WorkPage,
});

function WorkPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="Work"
        title="Selected work"
        description="Apps, campaigns, sites, and a game world currently in production."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {WORK.map((item) => (
          <Link
            key={item.id}
            to="/rooms/$roomId"
            params={{ roomId: item.id }}
            className="rounded-2xl border border-border bg-surface p-6 transition-transform hover:-translate-y-0.5 hover:border-lime/25"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-fg-subtle">
              <span>{item.client}</span>
              <span>{item.year}</span>
            </div>
            <p className="mt-2 text-xs text-lime">{item.meta}</p>
            <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
