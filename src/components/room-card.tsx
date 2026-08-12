import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Users } from "lucide-react";
import type { Room } from "@/data/venue";
import { ACCENT_CLASSES } from "@/data/venue";
import { cn } from "@/lib/utils";

export function RoomCard({
  room,
  index = 0,
}: {
  room: Room;
  index?: number;
}) {
  const accent = ACCENT_CLASSES[room.accent];

  return (
    <Link
      to="/rooms/$roomId"
      params={{ roomId: room.id }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-border-strong",
        `fade-up stagger-${Math.min(index + 1, 5)}`,
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
        {room.popular && (
          <span className="absolute left-3 top-3 rounded-full border border-border-strong bg-bg/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-fg backdrop-blur-sm">
            Popular
          </span>
        )}
        <span
          className={cn(
            "absolute bottom-3 left-3 h-1.5 w-8 rounded-full",
            accent.solid,
          )}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-fg">
              {room.name}
            </h3>
            <p className="mt-0.5 text-sm text-fg-muted">{room.tagline}</p>
          </div>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-fg-muted transition-colors group-hover:border-border-strong group-hover:text-fg">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-fg-subtle">
          <Users className="size-3.5" />
          {room.capacity}
        </p>
      </div>
    </Link>
  );
}
