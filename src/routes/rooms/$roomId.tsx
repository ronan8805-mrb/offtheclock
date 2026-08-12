import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Users } from "lucide-react";
import {
  ACCENT_CLASSES,
  getRoom,
  ROOM_PRICING,
  ROOMS,
} from "@/data/venue";
import { cn, formatEuro } from "@/lib/utils";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/components/room-card";

export const Route = createFileRoute("/rooms/$roomId")({
  component: RoomDetailPage,
});

function RoomDetailPage() {
  const { roomId } = Route.useParams();
  const room = getRoom(roomId);
  if (!room) throw notFound();

  const accent = ACCENT_CLASSES[room.accent];
  const pricing = ROOM_PRICING[room.id];
  const others = ROOMS.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <>
      <section className="relative">
        <div className="relative h-[48vh] min-h-[280px] max-h-[520px] overflow-hidden sm:h-[56vh]">
          <img
            src={room.image}
            alt={room.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/20" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-10">
            <Link
              to="/rooms"
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4" />
              All rooms
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span
                  className={cn(
                    "mb-3 inline-block h-1 w-10 rounded-full",
                    accent.solid,
                  )}
                />
                <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
                  {room.name}
                </h1>
                <p className="mt-2 text-base text-fg-muted sm:text-lg">
                  {room.tagline}
                </p>
              </div>
              <Button asChild size="lg">
                <Link to="/book" search={{ room: room.id, fresh: "1" as const }}>
                  Book this room
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
              {room.description}
            </p>
            <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-widest text-fg-subtle">
              Features
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {room.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-fg"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                      accent.bg,
                      accent.text,
                    )}
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-center gap-2 text-sm text-fg-muted">
              <Users className="size-4" />
              {room.capacity}
            </p>
          </div>

          <div className="h-fit rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-1 text-lg font-semibold text-fg">From</h2>
            <p className="mb-6 text-3xl font-semibold tabular-nums text-fg">
              {formatEuro(pricing.standard[1])}
              <span className="text-base font-normal text-fg-muted">
                {" "}
                / hour · standard
              </span>
            </p>
            <div className="mb-6 space-y-2 text-sm">
              {([1, 2, 3] as const).map((h) => (
                <div
                  key={h}
                  className="flex justify-between rounded-xl border border-border px-3 py-2.5"
                >
                  <span className="text-fg-muted">
                    {h} hour{h > 1 ? "s" : ""}
                  </span>
                  <span className="tabular-nums text-fg">
                    Std {formatEuro(pricing.standard[h])} · Peak{" "}
                    {formatEuro(pricing.peak[h])}
                  </span>
                </div>
              ))}
            </div>
            <Button asChild className="w-full" size="lg">
              <Link to="/book" search={{ room: room.id, fresh: "1" as const }}>
                Book {room.name}
              </Link>
            </Button>
            <p className="mt-3 text-center text-xs text-fg-subtle">
              Peak applies Fri–Sun from 18:00
            </p>
          </div>
        </div>
      </Section>

      {others.length > 0 && (
        <Section className="bg-bg-elevated/40 pt-4">
          <h2 className="mb-6 text-xl font-semibold text-fg">Other rooms</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((r, i) => (
              <RoomCard key={r.id} room={r} index={i} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
