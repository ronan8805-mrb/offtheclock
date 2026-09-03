import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { WORK } from "@/data/studio";

export const Route = createFileRoute("/rooms/$roomId")({
  component: CasePage,
});

function CasePage() {
  const { roomId } = Route.useParams();
  const work = WORK.find((item) => item.id === roomId);
  if (!work) throw notFound();

  return (
    <Section className="pt-12 sm:pt-16">
      <p className="text-xs uppercase tracking-[0.18em] text-lime">
        {work.meta} · {work.year}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-6xl">{work.title}</h1>
      <p className="mt-2 text-sm text-fg-subtle">{work.client}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{work.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/book">Start something similar</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/rooms">All work</Link>
        </Button>
      </div>
    </Section>
  );
}
