import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookingFlow } from "@/components/booking/booking-flow";
import { useBookingStore } from "@/store/booking";

type BookSearch = {
  room?: string;
  fresh?: string | number | boolean;
};

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    room: typeof search.room === "string" ? search.room : undefined,
    fresh:
      search.fresh === undefined || search.fresh === null
        ? undefined
        : (search.fresh as string | number | boolean),
  }),
  component: BookPage,
});

function BookPage() {
  const { room, fresh } = Route.useSearch();
  const resetBooking = useBookingStore((s) => s.resetBooking);
  const setRoomId = useBookingStore((s) => s.setRoomId);
  const setStep = useBookingStore((s) => s.setStep);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const state = useBookingStore.getState();
    const freshFlag = fresh !== undefined && String(fresh) !== "0" && String(fresh) !== "false";
    const wantsFresh = Boolean(room) || freshFlag;
    if (wantsFresh || (state.step === 7 && state.confirmed)) {
      resetBooking();
      if (room) {
        setRoomId(room);
        setStep(0);
      }
    } else if (room && state.roomId !== room) {
      setRoomId(room);
    }
  }, [room, fresh, resetBooking, setRoomId, setStep]);

  return <BookingFlow initialRoomId={room} />;
}
