"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useSuburbStats } from "@/hooks/useListings";
import { formatPrice, cn } from "@/lib/utils";

export function InsightsTeaser() {
  const { data: stats, isLoading } = useSuburbStats();
  const top = stats?.slice(0, 6) ?? [];

  return (
    <section className="border-y border-mist bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Suburb price index</h2>
            <p className="mt-1 text-sm text-ink/60">
              Median prices, rental yield, and 12-month change — Gevora&rsquo;s public data product
            </p>
          </div>
          <Link href="/insights" className="text-sm font-semibold text-teal hover:underline">
            View full market insights →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 animate-pulse rounded-xl bg-mist/40" />
              ))
            : top.map((s) => (
                <Link
                  key={s.suburb}
                  href={`/insights/${encodeURIComponent(s.suburb)}`}
                  className="rounded-xl border border-mist bg-sand p-5 transition-colors hover:border-teal"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-display text-base font-medium text-ink">{s.suburb}</p>
                      <p className="text-xs text-ink/50">{s.district} District</p>
                    </div>
                    <span
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                        s.priceChange12mo >= 0 ? "bg-teal/10 text-teal" : "bg-lotus/10 text-lotus"
                      )}
                    >
                      {s.priceChange12mo >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {Math.abs(s.priceChange12mo)}%
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-lg font-semibold text-ink">{formatPrice(s.medianSalePrice)}</p>
                  <p className="text-xs text-ink/50">median sale price · {s.rentalYield}% rental yield</p>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
