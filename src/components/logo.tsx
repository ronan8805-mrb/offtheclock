import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "white",
}: {
  className?: string;
  variant?: "white" | "dark";
}) {
  return (
    <img
      src={variant === "white" ? "/logo-white.png" : "/logo-dark.png"}
      alt="Off The Clock"
      className={cn(
        "h-8 w-auto max-h-14 max-w-[200px] object-contain object-left",
        className,
      )}
      width={200}
      height={56}
      decoding="async"
    />
  );
}
