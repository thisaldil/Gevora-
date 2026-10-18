"use client";

import { useEffect, useState } from "react";
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
  const [filtersOpen, setFiltersOpen] = useState(false);
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
                    "flex h-11 w-11 items-center justify-center rounded-md",
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
              className="min-h-11 rounded-lg border border-mist bg-paper px-3 py-2 text-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="min-h-11 w-full rounded-xl border border-mist bg-paper px-4 text-left text-sm font-semibold text-ink"
            >
              Filters <span className="float-right text-ink/50">Adjust search</span>
            </button>
          </div>

          <div
            className={cn(
              "grid gap-6",
              viewMode === "split" && "sm:grid-cols-2 xl:grid-cols-2",
              viewMode === "list" && "sm:grid-cols-2 xl:grid-cols-3",
              viewMode === "map" && "lg:grid-cols-2"
            )}
          >
            {viewMode !== "list" && (
              <div className={cn(
                "order-first h-[60dvh] min-h-[360px] sm:sticky sm:top-24 sm:order-none sm:col-span-full lg:h-[560px]",
                viewMode === "split" && "lg:col-span-full",
                viewMode === "split" && "hidden lg:block",
              )}>
                <MapView properties={results} />
              </div>
            )}

            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-xl bg-mist/40" />
                ))
              : results.map((property) => (
                <div key={property.id} className={cn(viewMode === "map" && "hidden lg:block")}>
                  <PropertyCard property={property} />
                </div>
              ))}
          </div>

          {!isLoading && results.length === 0 && (
            <div className="rounded-xl border border-dashed border-mist-dark bg-paper p-12 text-center">
              <p className="font-display text-lg text-ink">No properties match those filters</p>
              <p className="mt-1 text-sm text-ink/60">Try widening your price range or clearing a filter.</p>
            </div>
          )}
        </div>
      </div>
      {filtersOpen && (
        <div className="fixed inset-0 z-[55] bg-ink/40 lg:hidden" onClick={() => setFiltersOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Search filters"
            className="absolute inset-x-0 bottom-0 max-h-[90dvh] overflow-y-auto rounded-t-2xl bg-sand p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">Filters</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} className="min-h-11 px-2 text-sm text-teal">
                Close
              </button>
            </div>
            <FilterPanel />
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="sticky bottom-0 mt-3 min-h-12 w-full rounded-xl bg-teal px-4 font-semibold text-paper shadow-lg"
            >
              Apply filters
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
