"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { getPropertyById } from "@/lib/mock-data";
import { PropertyCard } from "@/components/search/PropertyCard";

export default function SavedPropertiesPage() {
  const savedIds = useUserStore((s) => s.savedIds);
  const saved = useMemo(
    () => savedIds.map((id) => getPropertyById(id)).filter((p): p is NonNullable<typeof p> => !!p),
    [savedIds]
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Saved properties</h1>
      <p className="mt-1 text-ink/60">Properties you&rsquo;ve saved for later, all in one place.</p>

      {saved.length === 0 ? (
        <p className="mt-8 text-sm text-ink/60">
          You haven&rsquo;t saved anything yet —{" "}
          <Link href="/buy" className="text-teal hover:underline">
            browse listings
          </Link>{" "}
          and tap the heart icon to save one.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
