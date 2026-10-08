"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { getPropertyById } from "@/lib/mock-data";
import { PropertyCard } from "@/components/search/PropertyCard";

export default function DashboardOverviewPage() {
  const savedIds = useUserStore((s) => s.savedIds);
  const compareIds = useUserStore((s) => s.compareIds);
  const savedSearches = useUserStore((s) => s.savedSearches);
  const recentlyViewedIds = useUserStore((s) => s.recentlyViewedIds);

  const recentlyViewed = useMemo(
    () => recentlyViewedIds.map((id) => getPropertyById(id)).filter((p): p is NonNullable<typeof p> => !!p),
    [recentlyViewedIds]
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Welcome back</h1>
      <p className="mt-1 text-ink/60">Here&rsquo;s what&rsquo;s happening with your property search.</p>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-mist bg-paper p-4 text-center">
          <p className="font-mono text-2xl font-semibold text-teal">{savedIds.length}</p>
          <p className="text-xs text-ink/50">Saved properties</p>
        </div>
        <div className="rounded-xl border border-mist bg-paper p-4 text-center">
          <p className="font-mono text-2xl font-semibold text-teal">{savedSearches.length}</p>
          <p className="text-xs text-ink/50">Saved searches</p>
        </div>
        <div className="rounded-xl border border-mist bg-paper p-4 text-center">
          <p className="font-mono text-2xl font-semibold text-teal">{compareIds.length}</p>
          <p className="text-xs text-ink/50">Comparing</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">Recently viewed</h2>
        {recentlyViewed.length === 0 ? (
          <p className="text-sm text-ink/60">
            Nothing yet —{" "}
            <Link href="/buy" className="text-teal hover:underline">
              start browsing properties
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyViewed.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
