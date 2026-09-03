import { Link, createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { TIMELINE } from "@/data/studio";

export const Route = createFileRoute("/how-it-works")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <SectionHeader
        eyebrow="About"
        title="Irish as hell. Technical as it gets."
        description="I'm Ronan Buckley. Dublin-born. Lived in Canada, the US, Mexico. Based in Spain. Level 8 BSc Computing from NCI."
      />
      <p className="mb-10 max-w-2xl text-lg text-fg-muted">
        Best of both worlds: I love the machine and I love the campaign. I can train a model on an RTX 5090 in the morning and art-direct a drop in the afternoon.
      </p>
      <ol className="space-y-6">
        {TIMELINE.map((t) => (
          <li key={t.title} className="grid gap-2 border-l-2 border-lime/30 pl-5 sm:grid-cols-[8rem_1fr]">
            <p className="text-xs uppercase tracking-widest text-lime">{t.when}</p>
            <div>
              <h3 className="font-display text-xl">{t.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{t.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <Button asChild className="mt-10"><Link to="/book">Work with me</Link></Button>
    </Section>
  );
}
