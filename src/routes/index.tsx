import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Sparkles, Users } from "lucide-react";
import { ROOMS, HOW_IT_WORKS } from "@/data/venue";
import { RoomCard } from "@/components/room-card";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section className="relative min-h-[88dvh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/80 to-bg" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

        <div className="relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <p className="fade-up mb-5 text-xs font-medium uppercase tracking-[0.22em] text-fg-subtle">
              Private social rooms · Dublin
            </p>
            <Logo className="fade-up stagger-1 mb-8 h-12 sm:h-14 max-h-14" />
            <h1 className="fade-up stagger-2 text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl">
              Your space.
              <br />
              Your friends.
              <br />
              Your time.
            </h1>
            <p className="fade-up stagger-3 mt-6 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
              Exclusive private rooms for the nights that matter — pool, DJ,
              karaoke, gaming, and VIP chill. Book in minutes. Arrive and
              switch off.
            </p>
            <div className="fade-up stagger-4 mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/book" search={{ fresh: "1" as const }}>
                  Book a Room
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/rooms">Explore rooms</Link>
              </Button>
            </div>
          </div>

          <div className="fade-up stagger-5 mt-16 grid max-w-xl grid-cols-3 gap-4 border-t border-border/60 pt-8">
            {[
              { icon: Clock, label: "Book in minutes" },
              { icon: Users, label: "Private groups" },
              { icon: Sparkles, label: "5 unique rooms" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <Icon className="size-4 text-fg-subtle" />
                <p className="text-xs text-fg-muted sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="The concept"
              title="A private venue built for your circle"
              description="No crowded bars. No shared tables. Just a beautifully designed room, reserved entirely for you and your people — with the soundtrack, games, and energy you choose."
            />
            <Button asChild variant="secondary">
              <Link to="/how-it-works">
                How it works
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <img
              src="/rooms/vip.jpg"
              alt="VIP lounge atmosphere"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent" />
          </div>
        </div>
      </Section>

      <Section className="bg-bg-elevated/50">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="The rooms"
            title="Five atmospheres. One standard."
            description="Scroll through the spaces — each lit, styled, and equipped for a different kind of night."
          />
          <Button
            asChild
            variant="outline"
            className="shrink-0 self-start sm:self-auto"
          >
            <Link to="/rooms">View all</Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Simple"
          title="From booking to kick-off"
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item, i) => (
            <div
              key={item.step}
              className={`rounded-2xl border border-border bg-surface p-6 fade-up stagger-${i + 1}`}
            >
              <p className="mb-4 font-mono text-sm text-fg-subtle">{item.step}</p>
              <h3 className="mb-2 text-base font-semibold text-fg">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-fg-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url(/rooms/dj.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-bg/85" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Ready to go off the clock?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-fg-muted sm:text-base">
              Reserve your room now. Peak nights fill fast — lock in your slot
              before someone else does.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/book" search={{ fresh: "1" as const }}>
                  Book a Room
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
