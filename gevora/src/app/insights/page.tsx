"use client";

import Link from "next/link";
import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useSuburbStats } from "@/hooks/useListings";
import { formatPrice, cn } from "@/lib/utils";

const demandTone: Record<string, string> = {
  low: "bg-mist text-ink",
  medium: "bg-teal/10 text-teal",
  high: "bg-spice/15 text-spice",
  "very high": "bg-lotus/15 text-lotus",
};

export default function InsightsPage() {
  const { data: stats, isLoading } = useSuburbStats();
  const [query, setQuery] = useState("");

  const filtered = stats?.filter((s) => s.suburb.toLowerCase().includes(query.toLowerCase())) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink">Market insights</h1>
      <p className="mt-1 text-ink/60">Gevora&rsquo;s public suburb price index — updated nightly from listing activity.</p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a suburb…"
        className="mt-6 w-full max-w-sm rounded-lg border border-mist bg-paper px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
      />

      <div className="mt-6 overflow-x-auto rounded-xl border border-mist bg-paper">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-ink/50">
              <th className="p-4 font-medium">Suburb</th>
              <th className="p-4 font-medium">Median sale price</th>
              <th className="p-4 font-medium">Median rent</th>
              <th className="p-4 font-medium">12mo change</th>
              <th className="p-4 font-medium">Rental yield</th>
              <th className="p-4 font-medium">Demand</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="p-4">
                      <div className="h-5 animate-pulse rounded bg-mist/40" />
                    </td>
                  </tr>
                ))
              : filtered.map((s) => (
                  <tr key={s.suburb} className="border-t border-mist hover:bg-sand">
                    <td className="p-4">
                      <Link href={`/insights/${encodeURIComponent(s.suburb)}`} className="font-medium text-ink hover:text-teal">
                        {s.suburb}
                      </Link>
                      <p className="text-xs text-ink/45">{s.district} District</p>
                    </td>
                    <td className="p-4 font-mono">{formatPrice(s.medianSalePrice)}</td>
                    <td className="p-4 font-mono">{formatPrice(s.medianRentPrice)}/mo</td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 font-semibold",
                          s.priceChange12mo >= 0 ? "text-teal" : "text-lotus"
                        )}
                      >
                        {s.priceChange12mo >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                        {Math.abs(s.priceChange12mo)}%
                      </span>
                    </td>
                    <td className="p-4 font-mono">{s.rentalYield}%</td>
                    <td className="p-4">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold capitalize", demandTone[s.demandLevel])}>
                        {s.demandLevel}
                      </span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
