import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const variants = {
  primary: "bg-teal text-paper hover:bg-teal-light",
  spice: "bg-spice text-paper hover:bg-spice-light",
  outline: "border border-ink/20 text-ink hover:border-ink/50 bg-transparent",
  ghost: "text-ink hover:bg-ink/5",
  quiet: "bg-paper text-ink border border-mist hover:border-mist-dark",
} as const;

const sizes = {
  sm: "text-sm px-3.5 py-1.5 rounded-lg gap-1.5",
  md: "text-sm px-5 py-2.5 rounded-lg gap-2",
  lg: "text-base px-6 py-3.5 rounded-xl gap-2.5",
} as const;

interface BaseProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

type ButtonProps = BaseProps & ComponentPropsWithoutRef<"button">;
type LinkButtonProps = BaseProps & ComponentPropsWithoutRef<typeof Link>;

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spice",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export function LinkButton({ variant = "primary", size = "md", className, ...props }: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spice",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
