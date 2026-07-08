import { formatPrice } from "@/lib/utils";
import type { PriceHistoryEntry } from "@/lib/types";

const eventLabel: Record<PriceHistoryEntry["event"], string> = {
  listed: "Listed",
  price_change: "Price updated",
  sold: "Sold",
  leased: "Leased",
  withdrawn: "Withdrawn",
  relisted: "Relisted",
};

export function PriceHistoryTimeline({ history }: { history: PriceHistoryEntry[] }) {
  if (history.length === 0) return null;
  const sorted = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="rounded-xl border border-mist bg-paper p-5">
      <h2 className="font-display text-lg font-semibold text-ink">Property history</h2>
      <ol className="mt-4 space-y-4">
        {sorted.map((entry, i) => (
          <li key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-teal" />
              {i < sorted.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-mist" />}
            </div>
            <div className="pb-1">
              <p className="text-sm font-semibold text-ink">
                {eventLabel[entry.event]}
                {entry.price ? <span className="ml-2 font-mono text-teal">{formatPrice(entry.price)}</span> : null}
              </p>
              <p className="text-xs text-ink/50">
                {new Date(entry.date).toLocaleDateString("en-LK", { year: "numeric", month: "short", day: "numeric" })}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
