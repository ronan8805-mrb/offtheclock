import { Link, createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/studio";

export const Route = createFileRoute("/pricing")({
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="Services"
        title="What I build"
        description="Web. Apps. Marketing. Games. Pick a lane — or don't."
      />
      <div className="grid gap-4">
        {SERVICES.map((s) => (
          <article key={s.id} className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-fg-subtle">{s.punch}</p>
            <h3 className="mt-2 font-display text-3xl">{s.title}</h3>
            <p className="mt-3 max-w-2xl text-fg-muted">{s.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-fg-subtle">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild size="lg"><Link to="/book">Start a brief</Link></Button>
      </div>
    </Section>
  );
}
