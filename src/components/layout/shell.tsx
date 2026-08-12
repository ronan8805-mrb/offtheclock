import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { AgeGate } from "@/components/age-gate";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <AgeGate />
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
