import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ROOMS,
  ROOM_PRICING,
  type DurationOption,
  type RateBand,
} from "@/data/venue";
import { cn, formatEuro } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const [band, setBand] = useState<RateBand>("standard");
  const [duration, setDuration] = useState<DurationOption>(2);

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <SectionHeader
          eyebrow="Pricing"
          title="Clear rates. No surprises."
          description="Compare Standard and Peak pricing across every room. Toggle duration to see exactly what you'll pay."
        />

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-full border border-border bg-surface p-1">
            {(["standard", "peak"] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBand(b)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors",
                  band === b
                    ? "bg-fg text-primary-fg"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-full border border-border bg-surface p-1">
            {([1, 2, 3] as const).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setDuration(h)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium tabular-nums transition-colors",
                  duration === h
                    ? "bg-fg text-primary-fg"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, i) => {
            const price = ROOM_PRICING[room.id][band][duration];
            const hourly = Math.round(price / duration);
            return (
              <div
                key={room.id}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-border-strong",
                  `fade-up stagger-${Math.min(i + 1, 5)}`,
                )}
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={room.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-fg">{room.name}</h3>
                  <p className="mt-1 text-xs text-fg-muted">{room.capacity}</p>
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-3xl font-semibold tabular-nums tracking-tight text-fg">
                        {formatEuro(price)}
                      </p>
                      <p className="mt-0.5 text-xs text-fg-subtle">
                        {formatEuro(hourly)}/hr · {duration}h · {band}
                      </p>
                    </div>
                    <Button asChild size="sm">
                      <Link
                        to="/book"
                        search={{ room: room.id, fresh: "1" as const }}
                      >
                        Book
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <h2 className="mb-6 text-xl font-semibold text-fg">Full rate card</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-elevated">
                <th className="px-4 py-3.5 font-medium text-fg-muted">Room</th>
                <th className="px-4 py-3.5 font-medium text-fg-muted" colSpan={3}>
                  Standard (1h / 2h / 3h)
                </th>
                <th className="px-4 py-3.5 font-medium text-fg-muted" colSpan={3}>
                  Peak (1h / 2h / 3h)
                </th>
              </tr>
            </thead>
            <tbody>
              {ROOMS.map((room) => {
                const p = ROOM_PRICING[room.id];
                return (
                  <tr
                    key={room.id}
                    className="border-b border-border last:border-0 hover:bg-surface/50"
                  >
                    <td className="px-4 py-3.5 font-medium text-fg">
                      {room.name}
                    </td>
                    <td className="px-2 py-3.5 tabular-nums text-fg-muted">
                      {formatEuro(p.standard[1])}
                    </td>
                    <td className="px-2 py-3.5 tabular-nums text-fg-muted">
                      {formatEuro(p.standard[2])}
                    </td>
                    <td className="px-2 py-3.5 tabular-nums text-fg-muted">
                      {formatEuro(p.standard[3])}
                    </td>
                    <td className="px-2 py-3.5 tabular-nums text-fg">
                      {formatEuro(p.peak[1])}
                    </td>
                    <td className="px-2 py-3.5 tabular-nums text-fg">
                      {formatEuro(p.peak[2])}
                    </td>
                    <td className="px-2 py-3.5 tabular-nums text-fg">
                      {formatEuro(p.peak[3])}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-fg-subtle">
          Peak rates apply Friday–Sunday from 18:00 and bank holidays. Prices in
          EUR, inclusive of venue access. Treats and packages are additional.
        </p>
      </Section>
    </>
  );
}
