import { useEffect, useState } from "react";
import { useBookingStore } from "@/store/booking";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function AgeGate() {
  const ageVerified = useBookingStore((s) => s.ageVerified);
  const hydrated = useBookingStore((s) => s.hydrated);
  const setAgeVerified = useBookingStore((s) => s.setAgeVerified);
  const setHydrated = useBookingStore((s) => s.setHydrated);
  const [leaving, setLeaving] = useState(false);
  const [denied, setDenied] = useState(false);

  // Fallback if persist rehydration is instant / skipped
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!useBookingStore.getState().hydrated) setHydrated(true);
    }, 80);
    return () => window.clearTimeout(t);
  }, [setHydrated]);

  if (!hydrated || ageVerified) return null;

  const confirm = () => {
    setLeaving(true);
    window.setTimeout(() => setAgeVerified(true), 320);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg px-6 transition-opacity duration-300 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/90 to-bg" />

      <div className="relative z-10 w-full max-w-md fade-up text-center">
        <Logo className="mx-auto mb-10 h-11 sm:h-12" />

        {!denied ? (
          <>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-fg-subtle">
              Private social rooms · Dublin
            </p>
            <h1
              id="age-gate-title"
              className="mb-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
            >
              Are you 18 or older?
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-fg-muted">
              Off The Clock is an exclusive 18+ venue. Confirm your age to
              continue.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" onClick={confirm} className="sm:min-w-40">
                Yes, I'm 18+
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setDenied(true)}
                className="sm:min-w-40"
              >
                No
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-3 text-2xl font-semibold tracking-tight text-fg">
              Sorry — 18+ only
            </h1>
            <p className="mb-8 text-sm text-fg-muted">
              You must be 18 or older to enter Off The Clock. Come back when
              the time is right.
            </p>
            <Button variant="secondary" onClick={() => setDenied(false)}>
              Go back
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
