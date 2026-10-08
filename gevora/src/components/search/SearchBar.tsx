"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ListingPurpose } from "@/lib/types";
import { Button } from "@/components/ui/Button";

const tabs: { id: ListingPurpose; label: string }[] = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "land", label: "Land" },
  { id: "commercial", label: "Commercial" },
];

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [purpose, setPurpose] = useState<ListingPurpose>("buy");
  const [location, setLocation] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    router.push(`/${purpose}${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className={cn("w-full rounded-2xl bg-paper shadow-xl", compact ? "p-2" : "p-3 sm:p-4")}>
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPurpose(tab.id)}
            className={cn(
              "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
              purpose === tab.id ? "bg-teal text-paper" : "text-ink/60 hover:bg-ink/5"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="mt-2 flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-mist bg-sand px-4 py-3">
          <MapPin size={18} className="shrink-0 text-ink/40" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, district, or landmark — e.g. Colombo 05, Galle Fort"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
          />
        </div>
        <Button type="submit" size="lg" className="gap-2">
          <Search size={18} />
          Search
        </Button>
      </form>
    </div>
  );
}
