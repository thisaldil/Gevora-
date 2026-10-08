"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { List, Map as MapIcon, Columns2 } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import { useListingSearch } from "@/hooks/useListings";
import { PropertyCard } from "@/components/search/PropertyCard";
import { FilterPanel } from "@/components/search/FilterPanel";
import { MapView } from "@/components/search/MapView";
import { cn } from "@/lib/utils";
import type { ListingPurpose } from "@/lib/types";

const sortOptions = [
  { id: "relevance", label: "Relevance" },
  { id: "newest", label: "Newest" },
  { id: "price_asc", label: "Price: Low to high" },
  { id: "price_desc", label: "Price: High to low" },
] as const;

export function SearchResults({ purpose, heading }: { purpose: ListingPurpose; heading: string }) {
  const searchParams = useSearchParams();
  const {
    location,
    propertyTypes,
    priceMin,
    priceMax,
    bedsMin,
    slFeatures,
    furnished,
    sort,
    viewMode,
    setPurpose,
    setLocation,
    setSort,
    setViewMode,
  } = useSearchStore();

  useEffect(() => {
    setPurpose(purpose);
    const locationParam = searchParams.get("location");
    if (locationParam) setLocation(locationParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purpose]);

  const { data, isLoading } = useListingSearch({
    purpose,
    location,
    propertyTypes,
    priceMin,
    priceMax,
    bedsMin,
    slFeatures,
    furnished,
    sort,
    pageSize: 24,
  });

  const results = data?.results ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{heading}</h1>
        <p className="text-sm text-ink/60">
          {isLoading ? "Searching…" : `${data?.total ?? 0} propert${data?.total === 1 ? "y" : "ies"} found`}
          {location ? ` in "${location}"` : ""}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1 rounded-lg border border-mist bg-paper p-1">
              {(
                [
                  { id: "list", icon: List },
                  { id: "split", icon: Columns2 },
                  { id: "map", icon: MapIcon },
                ] as const
              ).map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  aria-label={`${id} view`}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md",
                    viewMode === id ? "bg-teal text-paper" : "text-ink/50 hover:bg-ink/5"
                  )}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-lg border border-mist bg-paper px-3 py-2 text-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:hidden mb-4">
            <details className="rounded-xl border border-mist bg-paper">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-ink">Filters</summary>
              <div className="px-4 pb-4">
                <FilterPanel />
              </div>
            </details>
          </div>

          <div
            className={cn(
              "grid gap-6",
              viewMode === "split" && "sm:grid-cols-2 xl:grid-cols-2",
              viewMode === "list" && "sm:grid-cols-2 xl:grid-cols-3"
            )}
          >
            {viewMode !== "list" && (
              <div className="order-first h-[420px] sm:sticky sm:top-24 sm:order-none sm:col-span-full lg:h-[560px]">
                <MapView properties={results} />
              </div>
            )}

            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-xl bg-mist/40" />
                ))
              : results.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>

          {!isLoading && results.length === 0 && (
            <div className="rounded-xl border border-dashed border-mist-dark bg-paper p-12 text-center">
              <p className="font-display text-lg text-ink">No properties match those filters</p>
              <p className="mt-1 text-sm text-ink/60">Try widening your price range or clearing a filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
