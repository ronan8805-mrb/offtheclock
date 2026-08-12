import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  Sparkles,
} from "lucide-react";
import {
  ACCENT_CLASSES,
  getRoom,
  getRoomPrice,
  normalizeDuration,
  PACKAGES,
  ROOMS,
  TIME_SLOTS,
  TREATS,
  type DurationOption,
} from "@/data/venue";
import { useBookingStore } from "@/store/booking";
import { cn, formatDateLabel, formatEuro } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

const STEPS = [
  "Room",
  "Date & time",
  "Duration",
  "Treats",
  "Details",
  "Review",
  "Payment",
  "Confirmed",
] as const;

function tomorrowIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function maxDateIso() {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().slice(0, 10);
}

function genRef() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `OTC-${n}`;
}

function computeTotals(
  roomId: string | null,
  duration: DurationOption,
  date: string,
  time: string,
  packageIds: string[],
  treatIds: string[],
) {
  if (!roomId) {
    return { roomAmount: 0, extrasTotal: 0, total: 0, band: "standard" as const };
  }
  const dateKey = date || "2099-01-05";
  const timeKey = time || "14:00";
  const price = getRoomPrice(roomId, duration, dateKey, timeKey);
  // If date/time not chosen yet, force standard for preview when empty
  const band =
    date && time
      ? price.band
      : ("standard" as const);
  const roomAmount =
    date && time
      ? price.amount
      : getRoomPrice(roomId, duration, "2099-01-05", "14:00").amount;
  const pkgs = PACKAGES.filter((p) => packageIds.includes(p.id)).reduce(
    (s, p) => s + p.price,
    0,
  );
  const treats = TREATS.filter((t) => treatIds.includes(t.id)).reduce(
    (s, t) => s + t.price,
    0,
  );
  const extrasTotal = pkgs + treats;
  return { roomAmount, extrasTotal, total: roomAmount + extrasTotal, band };
}

export function BookingFlow({ initialRoomId }: { initialRoomId?: string }) {
  const store = useBookingStore();
  const [paying, setPaying] = useState(false);
  const [card, setCard] = useState({
    number: "",
    name: "",
    exp: "",
    cvc: "",
  });
  const [payError, setPayError] = useState("");

  useEffect(() => {
    if (initialRoomId) {
      const exists = ROOMS.some((r) => r.id === initialRoomId);
      if (exists) {
        store.setRoomId(initialRoomId);
        if (store.step === 7) {
          store.resetBooking();
          store.setRoomId(initialRoomId);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRoomId]);

  const room = store.roomId ? getRoom(store.roomId) : undefined;
  const duration = normalizeDuration(store.duration);

  const { roomAmount, extrasTotal, total, band } = useMemo(
    () =>
      computeTotals(
        store.roomId,
        duration,
        store.date,
        store.time,
        store.packageIds,
        store.treatIds,
      ),
    [
      store.roomId,
      duration,
      store.date,
      store.time,
      store.packageIds,
      store.treatIds,
    ],
  );

  const step = store.step;

  const canNext = () => {
    switch (step) {
      case 0:
        return !!store.roomId;
      case 1:
        return !!store.date && !!store.time;
      case 2:
        return [1, 2, 3].includes(duration);
      case 3:
        return true;
      case 4:
        return (
          store.guest.name.trim().length > 1 &&
          store.guest.email.includes("@") &&
          store.guest.phone.trim().length >= 7
        );
      case 5:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (step < 7 && canNext()) store.setStep(step + 1);
  };
  const goBack = () => {
    if (step > 0 && step < 7) store.setStep(step - 1);
  };

  const finalize = () => {
    if (!store.roomId || !store.date || !store.time) return;
    const price = getRoomPrice(
      store.roomId,
      duration,
      store.date,
      store.time,
    );
    const pkgs = PACKAGES.filter((p) => store.packageIds.includes(p.id)).reduce(
      (s, p) => s + p.price,
      0,
    );
    const treats = TREATS.filter((t) => store.treatIds.includes(t.id)).reduce(
      (s, t) => s + t.price,
      0,
    );
    store.setConfirmed({
      reference: genRef(),
      roomId: store.roomId,
      date: store.date,
      time: store.time,
      duration,
      packageIds: store.packageIds,
      treatIds: store.treatIds,
      guest: store.guest,
      roomTotal: price.amount,
      extrasTotal: pkgs + treats,
      total: price.amount + pkgs + treats,
      band: price.band,
      createdAt: new Date().toISOString(),
    });
    store.setStep(7);
    setPaying(false);
  };

  const completePayment = () => {
    setPayError("");
    const digits = card.number.replace(/\s/g, "");
    if (
      digits.length < 15 ||
      !card.name ||
      card.exp.length < 4 ||
      card.cvc.length < 3
    ) {
      setPayError("Please complete all card fields to continue.");
      return;
    }
    if (!store.roomId) return;
    setPaying(true);
    window.setTimeout(finalize, 1200);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 fade-up">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
          Booking
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Reserve your room
        </h1>
        <p className="mt-2 text-sm text-fg-muted">
          A seamless, private experience — from pick to confirmation.
        </p>
      </div>

      {step < 7 && (
        <div className="mb-10 overflow-x-auto fade-up stagger-1">
          <ol className="flex min-w-max items-center gap-1 sm:gap-2">
            {STEPS.slice(0, 7).map((label, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={label} className="flex items-center gap-1 sm:gap-2">
                  <div
                    className={cn(
                      "flex h-8 items-center gap-2 rounded-full px-3 text-xs font-medium transition-colors",
                      done && "bg-fg text-primary-fg",
                      current &&
                        "bg-surface border border-border-strong text-fg",
                      !done && !current && "text-fg-subtle",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                        done && "bg-primary-fg/15",
                        current && "bg-fg/10",
                        !done && !current && "bg-surface",
                      )}
                    >
                      {done ? <Check className="size-3" /> : i + 1}
                    </span>
                    <span className="hidden sm:inline">{label}</span>
                  </div>
                  {i < 6 && (
                    <div
                      className={cn(
                        "h-px w-4 sm:w-6",
                        i < step ? "bg-fg/40" : "bg-border",
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 rounded-2xl border border-border bg-surface/50 p-5 sm:p-7">
          {step === 0 && (
            <StepRoom
              selected={store.roomId}
              onSelect={(id) => store.setRoomId(id)}
            />
          )}
          {step === 1 && (
            <StepDateTime
              date={store.date}
              time={store.time}
              onDate={store.setDate}
              onTime={store.setTime}
            />
          )}
          {step === 2 && (
            <StepDuration
              roomId={store.roomId}
              date={store.date}
              time={store.time}
              duration={duration}
              onDuration={store.setDuration}
            />
          )}
          {step === 3 && (
            <StepTreats
              packageIds={store.packageIds}
              treatIds={store.treatIds}
              onTogglePkg={store.togglePackage}
              onToggleTreat={store.toggleTreat}
            />
          )}
          {step === 4 && (
            <StepGuest guest={store.guest} onChange={store.setGuest} />
          )}
          {step === 5 && (
            <StepReview
              room={room}
              date={store.date}
              time={store.time}
              duration={duration}
              band={band}
              roomAmount={roomAmount}
              packageIds={store.packageIds}
              treatIds={store.treatIds}
              guest={store.guest}
              extrasTotal={extrasTotal}
              total={total}
            />
          )}
          {step === 6 && (
            <StepPayment
              card={card}
              setCard={setCard}
              payError={payError}
              paying={paying}
              total={total}
              onPay={completePayment}
              onWallet={() => {
                setCard({
                  number: "4242 4242 4242 4242",
                  name: store.guest.name || "Guest",
                  exp: "12/28",
                  cvc: "123",
                });
                setPaying(true);
                window.setTimeout(finalize, 900);
              }}
            />
          )}
          {step === 7 && store.confirmed && (
            <StepConfirmed
              confirmed={store.confirmed}
              onNew={() => {
                store.resetBooking();
                store.setStep(0);
              }}
            />
          )}

          {step < 7 && (
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={step === 0}
                className={step === 0 ? "invisible" : ""}
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
              {step < 6 ? (
                <Button onClick={goNext} disabled={!canNext()}>
                  Continue
                  <ArrowRight className="size-4" />
                </Button>
              ) : null}
            </div>
          )}
        </div>

        {step < 7 && (
          <aside className="h-fit rounded-2xl border border-border bg-bg-elevated p-5 lg:sticky lg:top-24">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-fg-subtle">
              Summary
            </h3>
            {room ? (
              <div className="mb-4 overflow-hidden rounded-xl border border-border">
                <img
                  src={room.image}
                  alt=""
                  className="h-28 w-full object-cover"
                />
                <div className="p-3">
                  <p className="font-medium text-fg">{room.name}</p>
                  <p className="text-xs text-fg-muted">{room.capacity}</p>
                </div>
              </div>
            ) : (
              <p className="mb-4 text-sm text-fg-muted">No room selected yet.</p>
            )}
            <dl className="space-y-2 text-sm">
              <Row
                label="Date"
                value={store.date ? formatDateLabel(store.date) : "—"}
              />
              <Row label="Time" value={store.time || "—"} />
              <Row label="Duration" value={`${duration}h`} />
              <Row
                label="Rate"
                value={
                  store.date && store.time
                    ? band === "peak"
                      ? "Peak"
                      : "Standard"
                    : "—"
                }
              />
              <Row
                label="Room"
                value={roomAmount ? formatEuro(roomAmount) : "—"}
              />
              <Row
                label="Treats"
                value={extrasTotal ? formatEuro(extrasTotal) : "—"}
              />
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-fg-muted">Total</span>
              <span className="text-xl font-semibold tabular-nums text-fg">
                {formatEuro(total)}
              </span>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-fg-subtle">{label}</dt>
      <dd className="text-right text-fg tabular-nums">{value}</dd>
    </div>
  );
}

function StepRoom({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-fg">Select a room</h2>
      <p className="mb-6 text-sm text-fg-muted">
        Each space has its own atmosphere and capacity.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {ROOMS.map((room) => {
          const accent = ACCENT_CLASSES[room.accent];
          const active = selected === room.id;
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => onSelect(room.id)}
              className={cn(
                "overflow-hidden rounded-xl border text-left transition-[border-color,box-shadow,transform] duration-200",
                active
                  ? cn("border-fg/40 ring-1 ring-fg/20", accent.glow)
                  : "border-border hover:border-border-strong",
              )}
            >
              <div className="relative h-28">
                <img
                  src={room.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent" />
                {active && (
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-fg text-primary-fg">
                    <Check className="size-3.5" />
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-fg">{room.name}</p>
                <p className="text-xs text-fg-muted">{room.capacity}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDateTime({
  date,
  time,
  onDate,
  onTime,
}: {
  date: string;
  time: string;
  onDate: (d: string) => void;
  onTime: (t: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-fg">Date & time</h2>
      <p className="mb-6 text-sm text-fg-muted">
        Peak rates apply Fri–Sun from 18:00.
      </p>
      <div className="mb-6 max-w-xs">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          min={tomorrowIso()}
          max={maxDateIso()}
          value={date}
          onChange={(e) => onDate(e.target.value)}
        />
      </div>
      <Label>Start time</Label>
      <div className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => onTime(slot)}
            className={cn(
              "h-11 rounded-xl border text-sm tabular-nums transition-colors",
              time === slot
                ? "border-fg/40 bg-fg text-primary-fg"
                : "border-border bg-surface text-fg hover:border-border-strong",
            )}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDuration({
  roomId,
  date,
  time,
  duration,
  onDuration,
}: {
  roomId: string | null;
  date: string;
  time: string;
  duration: DurationOption;
  onDuration: (d: DurationOption) => void;
}) {
  const options: DurationOption[] = [1, 2, 3];
  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-fg">Duration</h2>
      <p className="mb-6 text-sm text-fg-muted">
        Longer sessions unlock better hourly value.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((h) => {
          const price = roomId
            ? getRoomPrice(roomId, h, date || "2099-01-05", time || "14:00")
            : { band: "standard" as const, amount: 0 };
          const active = duration === h;
          return (
            <button
              key={h}
              type="button"
              onClick={() => onDuration(h)}
              className={cn(
                "rounded-2xl border p-5 text-left transition-colors",
                active
                  ? "border-fg/40 bg-fg text-primary-fg"
                  : "border-border bg-surface hover:border-border-strong",
              )}
            >
              <p className="text-2xl font-semibold tabular-nums">{h}h</p>
              <p
                className={cn(
                  "mt-1 text-sm tabular-nums",
                  active ? "text-primary-fg/70" : "text-fg-muted",
                )}
              >
                {formatEuro(price.amount)}
              </p>
              <p
                className={cn(
                  "mt-2 text-xs capitalize",
                  active ? "text-primary-fg/60" : "text-fg-subtle",
                )}
              >
                {price.band} rate
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepTreats({
  packageIds,
  treatIds,
  onTogglePkg,
  onToggleTreat,
}: {
  packageIds: string[];
  treatIds: string[];
  onTogglePkg: (id: string) => void;
  onToggleTreat: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-fg">Treats & packages</h2>
      <p className="mb-6 text-sm text-fg-muted">
        Optional — skip if you prefer to order later.
      </p>

      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-fg-subtle">
        Signature packages
      </h3>
      <div className="mb-8 grid gap-3">
        {PACKAGES.map((pkg) => {
          const active = packageIds.includes(pkg.id);
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onTogglePkg(pkg.id)}
              className={cn(
                "flex items-start justify-between gap-4 rounded-xl border p-4 text-left transition-colors",
                active
                  ? "border-fg/40 bg-surface-hover"
                  : "border-border hover:border-border-strong",
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-fg">{pkg.name}</p>
                  {pkg.highlight && (
                    <Sparkles className="size-3.5 text-fg-subtle" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-fg-muted">{pkg.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm font-medium tabular-nums text-fg">
                  {formatEuro(pkg.price)}
                </span>
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border",
                    active
                      ? "border-fg bg-fg text-primary-fg"
                      : "border-border text-transparent",
                  )}
                >
                  <Check className="size-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-fg-subtle">
        Individual treats
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {TREATS.map((t) => {
          const active = treatIds.includes(t.id);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onToggleTreat(t.id)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                active
                  ? "border-fg/40 bg-surface-hover"
                  : "border-border hover:border-border-strong",
              )}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{t.name}</p>
                <p className="text-xs tabular-nums text-fg-muted">
                  {formatEuro(t.price)}
                </p>
              </div>
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                  active
                    ? "border-fg bg-fg text-primary-fg"
                    : "border-border",
                )}
              >
                {active && <Check className="size-3.5" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepGuest({
  guest,
  onChange,
}: {
  guest: {
    name: string;
    email: string;
    phone: string;
    guests: number;
    notes: string;
  };
  onChange: (g: Partial<typeof guest>) => void;
}) {
  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-fg">Guest details</h2>
      <p className="mb-6 text-sm text-fg-muted">
        We'll send your confirmation here.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={guest.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Alex Murphy"
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={guest.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={guest.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+353…"
            autoComplete="tel"
          />
        </div>
        <div>
          <Label htmlFor="guests">Party size</Label>
          <Input
            id="guests"
            type="number"
            min={1}
            max={20}
            value={guest.guests}
            onChange={(e) =>
              onChange({ guests: Number(e.target.value) || 1 })
            }
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            value={guest.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Birthday, accessibility, music requests…"
          />
        </div>
      </div>
    </div>
  );
}

function StepReview({
  room,
  date,
  time,
  duration,
  band,
  roomAmount,
  packageIds,
  treatIds,
  guest,
  extrasTotal,
  total,
}: {
  room: ReturnType<typeof getRoom>;
  date: string;
  time: string;
  duration: DurationOption;
  band: string;
  roomAmount: number;
  packageIds: string[];
  treatIds: string[];
  guest: { name: string; email: string; phone: string; guests: number };
  extrasTotal: number;
  total: number;
}) {
  const pkgs = PACKAGES.filter((p) => packageIds.includes(p.id));
  const treats = TREATS.filter((t) => treatIds.includes(t.id));
  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-fg">Review booking</h2>
      <p className="mb-6 text-sm text-fg-muted">
        Double-check everything before payment.
      </p>
      <div className="space-y-4 text-sm">
        <div className="rounded-xl border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-fg-subtle">
            Room
          </p>
          <p className="mt-1 font-medium text-fg">{room?.name}</p>
          <p className="text-fg-muted">
            {formatDateLabel(date)} · {time} · {duration}h ·{" "}
            <span className="capitalize">{band}</span>
          </p>
          <p className="mt-2 tabular-nums text-fg">{formatEuro(roomAmount)}</p>
        </div>
        {(pkgs.length > 0 || treats.length > 0) && (
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs uppercase tracking-widest text-fg-subtle">
              Extras
            </p>
            <ul className="mt-2 space-y-1 text-fg-muted">
              {pkgs.map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.name}</span>
                  <span className="tabular-nums">{formatEuro(p.price)}</span>
                </li>
              ))}
              {treats.map((t) => (
                <li key={t.id} className="flex justify-between">
                  <span>{t.name}</span>
                  <span className="tabular-nums">{formatEuro(t.price)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 flex justify-between border-t border-border pt-2 text-fg">
              <span>Extras total</span>
              <span className="tabular-nums">{formatEuro(extrasTotal)}</span>
            </p>
          </div>
        )}
        <div className="rounded-xl border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-fg-subtle">
            Guest
          </p>
          <p className="mt-1 font-medium text-fg">{guest.name}</p>
          <p className="text-fg-muted">
            {guest.email} · {guest.phone}
          </p>
          <p className="text-fg-muted">{guest.guests} guests</p>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border-strong bg-bg-elevated p-4">
          <span className="font-medium text-fg">Total due</span>
          <span className="text-2xl font-semibold tabular-nums text-fg">
            {formatEuro(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

function StepPayment({
  card,
  setCard,
  payError,
  paying,
  total,
  onPay,
  onWallet,
}: {
  card: { number: string; name: string; exp: string; cvc: string };
  setCard: (c: typeof card) => void;
  payError: string;
  paying: boolean;
  total: number;
  onPay: () => void;
  onWallet: () => void;
}) {
  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-fg">Payment</h2>
      <p className="mb-2 flex items-center gap-1.5 text-sm text-fg-muted">
        <Lock className="size-3.5" />
        Simulated secure checkout — no real charge.
      </p>
      <p className="mb-6 text-lg font-semibold tabular-nums text-fg">
        {formatEuro(total)}
      </p>

      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onWallet}
          disabled={paying}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-fg text-sm font-semibold tracking-wide text-primary-fg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Pay
        </button>
        <button
          type="button"
          onClick={onWallet}
          disabled={paying}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface text-sm font-semibold text-fg transition-colors hover:bg-surface-hover disabled:opacity-50"
        >
          G Pay
        </button>
      </div>

      <div className="relative mb-6">
        <div className="glow-line absolute inset-x-0 top-1/2 h-px" />
        <p className="relative mx-auto w-fit bg-surface/50 px-3 text-xs text-fg-subtle">
          or pay with card
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="card-number">Card number</Label>
          <div className="relative">
            <Input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              value={card.number}
              onChange={(e) =>
                setCard({ ...card, number: formatCard(e.target.value) })
              }
              className="pr-10"
            />
            <CreditCard className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
          </div>
        </div>
        <div>
          <Label htmlFor="card-name">Name on card</Label>
          <Input
            id="card-name"
            autoComplete="cc-name"
            placeholder="Name as on card"
            value={card.name}
            onChange={(e) => setCard({ ...card, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="card-exp">Expiry</Label>
            <Input
              id="card-exp"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={card.exp}
              onChange={(e) =>
                setCard({
                  ...card,
                  exp: e.target.value.replace(/[^\d/]/g, "").slice(0, 5),
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="card-cvc">CVC</Label>
            <Input
              id="card-cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              value={card.cvc}
              onChange={(e) =>
                setCard({
                  ...card,
                  cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                })
              }
            />
          </div>
        </div>
        {payError && (
          <p className="text-sm text-danger" role="alert">
            {payError}
          </p>
        )}
        <Button size="lg" className="w-full" onClick={onPay} disabled={paying}>
          {paying ? "Processing…" : `Pay ${formatEuro(total)}`}
        </Button>
      </div>
    </div>
  );
}

function StepConfirmed({
  confirmed,
  onNew,
}: {
  confirmed: NonNullable<
    ReturnType<typeof useBookingStore.getState>["confirmed"]
  >;
  onNew: () => void;
}) {
  const room = getRoom(confirmed.roomId);
  return (
    <div className="text-center fade-up">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
        <Check className="size-8" strokeWidth={2.5} />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-fg">
        You're booked
      </h2>
      <p className="mt-2 text-sm text-fg-muted">
        Confirmation sent to {confirmed.guest.email}
      </p>
      <p className="mt-4 font-mono text-sm tracking-wide text-fg">
        {confirmed.reference}
      </p>

      <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-border bg-bg-elevated p-5 text-left text-sm">
        <p className="font-medium text-fg">{room?.name}</p>
        <p className="mt-1 text-fg-muted">
          {formatDateLabel(confirmed.date)} · {confirmed.time} ·{" "}
          {confirmed.duration}h
        </p>
        <p className="mt-1 capitalize text-fg-muted">{confirmed.band} rate</p>
        <p className="mt-3 text-fg-muted">{confirmed.guest.name}</p>
        <p className="mt-4 flex justify-between border-t border-border pt-3 font-medium text-fg">
          <span>Total paid</span>
          <span className="tabular-nums">{formatEuro(confirmed.total)}</span>
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
        <Button variant="outline" onClick={onNew}>
          Book another
        </Button>
      </div>
    </div>
  );
}
