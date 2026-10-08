import Link from "next/link";
import { Home, Building2, Palmtree, Gem, Trees, Store, Warehouse, Briefcase, Wheat, Umbrella } from "lucide-react";

const categories = [
  { label: "Houses", href: "/buy?type=house", icon: Home },
  { label: "Apartments", href: "/buy?type=apartment", icon: Building2 },
  { label: "Villas", href: "/buy?type=villa", icon: Palmtree },
  { label: "Luxury homes", href: "/buy?type=luxury", icon: Gem },
  { label: "Land", href: "/land", icon: Trees },
  { label: "Commercial", href: "/commercial?type=commercial", icon: Store },
  { label: "Warehouses", href: "/commercial?type=warehouse", icon: Warehouse },
  { label: "Office space", href: "/commercial?type=office", icon: Briefcase },
  { label: "Agricultural land", href: "/land?type=agricultural", icon: Wheat },
  { label: "Holiday homes", href: "/buy?type=holiday", icon: Umbrella },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink">Browse by category</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {categories.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col items-center gap-3 rounded-xl border border-mist bg-paper px-4 py-6 text-center transition-colors hover:border-teal"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-paper">
              <Icon size={20} />
            </span>
            <span className="text-sm font-medium text-ink">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
