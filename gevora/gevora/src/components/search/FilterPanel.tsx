"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { PropertyType } from "@/lib/types";

const typeOptions: { id: PropertyType; label: string }[] = [
  { id: "house", label: "House" },
  { id: "apartment", label: "Apartment" },
  { id: "villa", label: "Villa" },
  { id: "luxury", label: "Luxury home" },
  { id: "land", label: "Land" },
  { id: "commercial", label: "Commercial building" },
  { id: "warehouse", label: "Warehouse" },
  { id: "office", label: "Office space" },
  { id: "agricultural", label: "Agricultural land" },
  { id: "holiday", label: "Holiday home" },
];

const slFeatureOptions = [
  "Beach front",
  "Lake view",
  "Mountain view",
  "Tea estate",
  "Coconut estate",
  "Paddy field view",
  "River front",
  "Corner property",
];

const priceSteps = [2_500_000, 5_000_000, 10_000_000, 20_000_000, 35_000_000, 50_000_000, 100_000_000];

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-mist py-4 first:pt-0 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-display text-sm font-semibold text-ink">{title}</span>
        <ChevronDown size={16} className={cn("text-ink/40 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function FilterPanel() {
  const {
    propertyTypes,
    priceMin,
    priceMax,
    bedsMin,
    bathsMin,
    slFeatures,
    furnished,
    setPropertyTypes,
    setPriceRange,
    setBedsMin,
    setBathsMin,
    toggleSlFeature,
    setFurnished,
    reset,
  } = useSearchStore();

  function toggleType(id: PropertyType) {
    setPropertyTypes(propertyTypes.includes(id) ? propertyTypes.filter((t) => t !== id) : [...propertyTypes, id]);
  }

  return (
    <div className="rounded-xl border border-mist bg-paper p-4">
      <div className="flex items-center justify-between pb-1">
        <h2 className="font-display text-base font-semibold text-ink">Refine your search</h2>
        <button onClick={reset} className="text-xs font-medium text-teal hover:underline">
          Clear all
        </button>
      </div>

      <FilterSection title="Property type">
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => toggleType(opt.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                propertyTypes.includes(opt.id)
                  ? "border-teal bg-teal text-paper"
                  : "border-mist text-ink/70 hover:border-mist-dark"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price range">
        <div className="flex items-center gap-2">
          <select
            value={priceMin ?? ""}
            onChange={(e) => setPriceRange(e.target.value ? Number(e.target.value) : undefined, priceMax)}
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2 text-sm"
          >
            <option value="">Min</option>
            {priceSteps.map((p) => (
              <option key={p} value={p}>
                {formatPrice(p)}
              </option>
            ))}
          </select>
          <span className="text-ink/40">–</span>
          <select
            value={priceMax ?? ""}
            onChange={(e) => setPriceRange(priceMin, e.target.value ? Number(e.target.value) : undefined)}
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2 text-sm"
          >
            <option value="">Max</option>
            {priceSteps.map((p) => (
              <option key={p} value={p}>
                {formatPrice(p)}
              </option>
            ))}
          </select>
        </div>
      </FilterSection>

      <FilterSection title="Beds & baths">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="mb-1.5 text-xs text-ink/50">Bedrooms</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setBedsMin(bedsMin === n ? undefined : n)}
                  className={cn(
                    "h-8 w-8 rounded-lg border text-xs font-semibold",
                    bedsMin === n ? "border-teal bg-teal text-paper" : "border-mist text-ink/70"
                  )}
                >
                  {n}+
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="mb-1.5 text-xs text-ink/50">Bathrooms</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setBathsMin(bathsMin === n ? undefined : n)}
                  className={cn(
                    "h-8 w-8 rounded-lg border text-xs font-semibold",
                    bathsMin === n ? "border-teal bg-teal text-paper" : "border-mist text-ink/70"
                  )}
                >
                  {n}+
                </button>
              ))}
            </div>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Sri Lanka features" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {slFeatureOptions.map((f) => (
            <button
              key={f}
              onClick={() => toggleSlFeature(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                slFeatures.includes(f)
                  ? "border-spice bg-spice text-paper"
                  : "border-mist text-ink/70 hover:border-mist-dark"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="More" defaultOpen={false}>
        <label className="flex items-center gap-2 text-sm text-ink/75">
          <input
            type="checkbox"
            checked={!!furnished}
            onChange={(e) => setFurnished(e.target.checked || undefined)}
            className="h-4 w-4 rounded border-mist-dark accent-teal"
          />
          Furnished only
        </label>
      </FilterSection>

      <Button variant="primary" className="mt-2 w-full">
        Show results
      </Button>
    </div>
  );
}
