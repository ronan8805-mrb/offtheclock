import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DurationOption } from "@/data/venue";

export type GuestDetails = {
  name: string;
  email: string;
  phone: string;
  guests: number;
  notes: string;
};

export type ConfirmedBooking = {
  reference: string;
  roomId: string;
  date: string;
  time: string;
  duration: DurationOption;
  packageIds: string[];
  treatIds: string[];
  guest: GuestDetails;
  roomTotal: number;
  extrasTotal: number;
  total: number;
  band: "standard" | "peak";
  createdAt: string;
};

type BookingState = {
  ageVerified: boolean;
  hydrated: boolean;
  roomId: string | null;
  date: string;
  time: string;
  duration: DurationOption;
  packageIds: string[];
  treatIds: string[];
  guest: GuestDetails;
  step: number;
  confirmed: ConfirmedBooking | null;
  setHydrated: (v: boolean) => void;
  setAgeVerified: (v: boolean) => void;
  setRoomId: (id: string | null) => void;
  setDate: (d: string) => void;
  setTime: (t: string) => void;
  setDuration: (d: DurationOption) => void;
  togglePackage: (id: string) => void;
  toggleTreat: (id: string) => void;
  setGuest: (g: Partial<GuestDetails>) => void;
  setStep: (s: number) => void;
  setConfirmed: (c: ConfirmedBooking | null) => void;
  resetBooking: () => void;
};

const emptyGuest: GuestDetails = {
  name: "",
  email: "",
  phone: "",
  guests: 4,
  notes: "",
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ageVerified: false,
      hydrated: false,
      roomId: null,
      date: "",
      time: "",
      duration: 2,
      packageIds: [],
      treatIds: [],
      guest: emptyGuest,
      step: 0,
      confirmed: null,
      setHydrated: (v) => set({ hydrated: v }),
      setAgeVerified: (v) => set({ ageVerified: v }),
      setRoomId: (id) => set({ roomId: id }),
      setDate: (d) => set({ date: d }),
      setTime: (t) => set({ time: t }),
      setDuration: (d) => set({ duration: d }),
      togglePackage: (id) => {
        const cur = get().packageIds;
        set({
          packageIds: cur.includes(id)
            ? cur.filter((x) => x !== id)
            : [...cur, id],
        });
      },
      toggleTreat: (id) => {
        const cur = get().treatIds;
        set({
          treatIds: cur.includes(id)
            ? cur.filter((x) => x !== id)
            : [...cur, id],
        });
      },
      setGuest: (g) => set({ guest: { ...get().guest, ...g } }),
      setStep: (s) => set({ step: s }),
      setConfirmed: (c) => set({ confirmed: c }),
      resetBooking: () =>
        set({
          roomId: null,
          date: "",
          time: "",
          duration: 2,
          packageIds: [],
          treatIds: [],
          guest: emptyGuest,
          step: 0,
          confirmed: null,
        }),
    }),
    {
      name: "otc-booking-v1",
      partialize: (s) => ({
        ageVerified: s.ageVerified,
        roomId: s.roomId,
        date: s.date,
        time: s.time,
        duration: s.duration,
        packageIds: s.packageIds,
        treatIds: s.treatIds,
        guest: s.guest,
        step: s.step,
        confirmed: s.confirmed,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
