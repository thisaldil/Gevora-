import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tones = {
  teal: "bg-teal text-paper",
  spice: "bg-spice text-paper",
  lotus: "bg-lotus text-paper",
  mist: "bg-mist text-ink",
  paper: "bg-paper text-ink border border-mist",
} as const;

export function Badge({
  children,
  tone = "mist",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
