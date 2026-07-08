import type { Property, SuburbStats } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { SuburbPriceChart } from "@/components/charts/SuburbPriceChart";

export function InvestmentAnalysis({ property, suburb }: { property: Property; suburb?: SuburbStats }) {
  if (!suburb) return null;

  const estMonthlyRent = property.purpose === "rent" ? property.price : Math.round((property.price * suburb.rentalYield) / 100 / 12);
  const annualIncome = estMonthlyRent * 12;
  const roi = suburb.rentalYield + suburb.priceChange12mo / 3;
  const score = Math.max(1, Math.min(10, Math.round((suburb.rentalYield + suburb.priceChange12mo / 4) / 1.3)));

  return (
    <div className="rounded-xl border border-mist bg-paper p-5">
      <h2 className="font-display text-lg font-semibold text-ink">Investment analysis</h2>
      <p className="mt-1 text-xs text-ink/50">Based on {suburb.suburb} suburb data · not financial advice</p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Rental yield" value={`${suburb.rentalYield}%`} />
        <Stat label="12mo appreciation" value={`${suburb.priceChange12mo}%`} />
        <Stat label="Est. ROI" value={`${roi.toFixed(1)}%`} />
        <Stat label="Investment score" value={`${score}/10`} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-sand p-3">
          <p className="text-xs text-ink/50">Est. monthly income</p>
          <p className="font-mono text-base font-semibold text-teal">{formatPrice(estMonthlyRent)}</p>
        </div>
        <div className="rounded-lg bg-sand p-3">
          <p className="text-xs text-ink/50">Est. annual income</p>
          <p className="font-mono text-base font-semibold text-teal">{formatPrice(annualIncome)}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-ink/60">{suburb.suburb} median price, 5-year trend</p>
        <SuburbPriceChart history={suburb.history} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-mist p-3 text-center">
      <p className="font-mono text-lg font-semibold text-ink">{value}</p>
      <p className="mt-0.5 text-[11px] text-ink/50">{label}</p>
    </div>
  );
}
