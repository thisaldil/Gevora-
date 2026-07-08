import { School, Hospital, Landmark, UtensilsCrossed, Bus, ShoppingBag } from "lucide-react";

const iconFor: Record<string, typeof School> = {
  "Schools nearby": School,
  "Hospitals nearby": Hospital,
  "Banks nearby": Landmark,
  "Restaurants nearby": UtensilsCrossed,
  "Public transport": Bus,
  "Shopping mall nearby": ShoppingBag,
};

export function NeighborhoodDashboard({ amenities, suburb }: { amenities: string[]; suburb: string }) {
  return (
    <div className="rounded-xl border border-mist bg-paper p-5">
      <h2 className="font-display text-lg font-semibold text-ink">The {suburb} neighborhood</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {amenities.map((a) => {
          const Icon = iconFor[a] ?? Landmark;
          return (
            <div key={a} className="flex items-center gap-2.5 rounded-lg bg-sand px-3 py-2.5">
              <Icon size={16} className="shrink-0 text-teal" />
              <span className="text-sm text-ink/80">{a}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
