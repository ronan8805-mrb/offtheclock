import { cn } from "@/lib/utils";

export function Logo({
  className,
}: {
  className?: string;
  variant?: "white" | "dark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-fg text-[11px] font-bold tracking-tight text-primary-fg">
        RB
      </span>
      <span className="hidden text-[13px] font-semibold tracking-tight text-fg sm:inline">
        Ronan Buckley
      </span>
    </span>
  );
}
