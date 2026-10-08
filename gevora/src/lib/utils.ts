import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price in LKR/USD the way Sri Lankan portals do: Rs 45.5 Mn, Rs 120,000 */
export function formatPrice(amount: number, currency: "LKR" | "USD" = "LKR"): string {
  const symbol = currency === "LKR" ? "Rs" : "$";
  if (currency === "LKR") {
    if (amount >= 10_000_000) {
      return `${symbol} ${(amount / 10_000_000).toFixed(2).replace(/\.00$/, "")} Cr`;
    }
    if (amount >= 100_000) {
      return `${symbol} ${(amount / 1_000_000).toFixed(2).replace(/\.00$/, "")} Mn`;
    }
  }
  return `${symbol} ${amount.toLocaleString("en-LK")}`;
}

export function formatCompactNumber(n: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(n);
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Listed today";
  if (days === 1) return "Listed yesterday";
  if (days < 7) return `Listed ${days} days ago`;
  if (days < 30) return `Listed ${Math.floor(days / 7)} week${days >= 14 ? "s" : ""} ago`;
  return `Listed ${Math.floor(days / 30)} month${days >= 60 ? "s" : ""} ago`;
}

export function perchesToSqft(perches: number): number {
  return Math.round(perches * 272.25);
}

export const districts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
  "Trincomalee",
  "Batticaloa",
  "Ampara",
] as const;
