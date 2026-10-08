"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useSuburbStatsByName } from "@/hooks/useListings";
import { properties } from "@/lib/mock-data";
import { formatPrice, cn } from "@/lib/utils";
import { SuburbPriceChart } from "@/components/charts/SuburbPriceChart";
import { PropertyCard } from "@/components/search/PropertyCard";

export default function SuburbInsightsPage() {
  const params = useParams<{ suburb: string }>();
  const suburbName = decodeURIComponent(params.suburb);
  const { data: stats, isLoading } = useSuburbStatsByName(suburbName);
  const listings = useMemo(
    () => properties.filter((p) => p.address.suburb === suburbName).slice(0, 8),
    [suburbName]
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="h-64 animate-pulse rounded-xl bg-mist/40" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="font-display text-2xl text-ink">No data for this suburb yet</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink">{stats.suburb}</h1>
      <p className="mt-1 text-ink/60">{stats.district} District, Sri Lanka</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Median sale price" value={formatPrice(stats.medianSalePrice)} />
        <StatCard label="Median rent" value={`${formatPrice(stats.medianRentPrice)}/mo`} />
        <StatCard label="Rental yield" value={`${stats.rentalYield}%`} />
        <StatCard label="Days on market" value={`${stats.daysOnMarket} days`} />
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-mist bg-paper p-4">
        {stats.priceChange12mo >= 0 ? (
          <TrendingUp size={18} className="text-teal" />
        ) : (
          <TrendingDown size={18} className="text-lotus" />
        )}
        <p className={cn("font-medium", stats.priceChange12mo >= 0 ? "text-teal" : "text-lotus")}>
          {stats.priceChange12mo >= 0 ? "+" : ""}
          {stats.priceChange12mo}% over the past 12 months
        </p>
        <span className="ml-auto rounded-full bg-mist px-2.5 py-1 text-xs font-semibold capitalize text-ink">
          {stats.demandLevel} demand
        </span>
      </div>

      <div className="mt-6 rounded-xl border border-mist bg-paper p-5">
        <h2 className="font-display text-lg font-semibold text-ink">5-year median price trend</h2>
        <div className="mt-4">
          <SuburbPriceChart history={stats.history} />
        </div>
      </div>

      {listings.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-5 font-display text-xl font-semibold text-ink">Listings in {stats.suburb}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-mist bg-paper p-4">
      <p className="font-mono text-lg font-semibold text-ink">{value}</p>
      <p className="mt-0.5 text-xs text-ink/50">{label}</p>
    </div>
  );
}
