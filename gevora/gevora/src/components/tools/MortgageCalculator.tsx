"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mortgageSchema, type MortgageFormValues } from "@/lib/validations";
import { formatPrice } from "@/lib/utils";

function calculate({ propertyPrice, downPayment, interestRate, years }: MortgageFormValues) {
  const principal = Math.max(propertyPrice - downPayment, 0);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = years * 12;
  const monthlyPayment =
    monthlyRate === 0
      ? principal / numPayments
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - principal;

  return { principal, monthlyPayment, totalPaid, totalInterest };
}

export function MortgageCalculator() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<MortgageFormValues>({
    resolver: zodResolver(mortgageSchema),
    defaultValues: { propertyPrice: 25_000_000, downPayment: 5_000_000, interestRate: 11, years: 20 },
    mode: "onChange",
  });

  const values = watch();
  const result = useMemo(() => {
    const parsed = mortgageSchema.safeParse({
      propertyPrice: Number(values.propertyPrice) || 0,
      downPayment: Number(values.downPayment) || 0,
      interestRate: Number(values.interestRate) || 0,
      years: Number(values.years) || 1,
    });
    return parsed.success ? calculate(parsed.data) : null;
  }, [values]);

  const chartData = result
    ? [
        { name: "Principal", value: result.principal },
        { name: "Interest", value: result.totalInterest },
      ]
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form className="space-y-4 rounded-xl border border-mist bg-paper p-6">
        <Field label="Property price (LKR)" error={errors.propertyPrice?.message}>
          <input
            type="number"
            step="100000"
            {...register("propertyPrice", { valueAsNumber: true })}
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-teal"
          />
        </Field>
        <Field label="Down payment (LKR)" error={errors.downPayment?.message}>
          <input
            type="number"
            step="100000"
            {...register("downPayment", { valueAsNumber: true })}
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-teal"
          />
        </Field>
        <Field label="Interest rate (% p.a.)" error={errors.interestRate?.message}>
          <input
            type="number"
            step="0.1"
            {...register("interestRate", { valueAsNumber: true })}
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-teal"
          />
        </Field>
        <Field label="Loan term (years)" error={errors.years?.message}>
          <input
            type="number"
            {...register("years", { valueAsNumber: true })}
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-teal"
          />
        </Field>
      </form>

      <div className="rounded-xl border border-mist bg-paper p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Loan summary</h2>
        {result && (
          <>
            <p className="mt-4 font-mono text-3xl font-semibold text-teal">{formatPrice(Math.round(result.monthlyPayment))}</p>
            <p className="text-sm text-ink/50">estimated monthly payment</p>

            <div className="mt-6 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                    <Cell fill="var(--teal)" />
                    <Cell fill="var(--spice)" />
                  </Pie>
                  <Tooltip formatter={(v) => formatPrice(Math.round(Number(v)))} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-sand p-3">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-teal" />
                <span className="text-xs text-ink/60">Principal</span>
                <p className="font-mono text-sm font-semibold text-ink">{formatPrice(Math.round(result.principal))}</p>
              </div>
              <div className="rounded-lg bg-sand p-3">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-spice" />
                <span className="text-xs text-ink/60">Total interest</span>
                <p className="font-mono text-sm font-semibold text-ink">{formatPrice(Math.round(result.totalInterest))}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink/45">
              Estimate only — actual bank rates and eligibility vary. Not financial advice.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink/70">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-lotus">{error}</p>}
    </div>
  );
}
