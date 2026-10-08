"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatPrice } from "@/lib/utils";

export function SuburbPriceChart({ history }: { history: { year: number; median: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--mist)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="year" tick={{ fontSize: 12, fill: "var(--ink)", opacity: 0.6 }} axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={(v) => formatPrice(v)}
          tick={{ fontSize: 11, fill: "var(--ink)", opacity: 0.6 }}
          width={70}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => formatPrice(Number(value))}
          contentStyle={{
            background: "var(--paper)",
            border: "1px solid var(--mist)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Line type="monotone" dataKey="median" stroke="var(--teal)" strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
