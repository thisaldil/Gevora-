import { MortgageCalculator } from "@/components/tools/MortgageCalculator";

export const metadata = { title: "Mortgage calculator | Gevora" };

export default function MortgageCalculatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink">Mortgage calculator</h1>
      <p className="mt-1 text-ink/60">Estimate your monthly home loan payment before you talk to a bank.</p>
      <div className="mt-8">
        <MortgageCalculator />
      </div>
    </div>
  );
}
