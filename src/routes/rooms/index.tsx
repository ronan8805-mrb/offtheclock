import { createFileRoute, Link } from "@tanstack/react-router";
import { ROOMS } from "@/data/venue";
import { RoomCard } from "@/components/room-card";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rooms/")({
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <SectionHeader
          eyebrow="Rooms"
          title="Pick your atmosphere"
          description="Five private spaces, each designed for a different energy — from competitive pool nights to VIP champagne lounges."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="text-lg font-semibold text-fg">
              Not sure which room?
            </h3>
            <p className="mt-1 text-sm text-fg-muted">
              Start a booking and switch rooms anytime before payment.
            </p>
          </div>
          <Button asChild>
            <Link to="/book">Start booking</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
