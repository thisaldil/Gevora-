"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export interface ViewsDatum {
  label: string;
  views: number;
  enquiries: number;
}

export function ViewsChart({ data }: { data: ViewsDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--mist)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--ink)", opacity: 0.6 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "var(--ink)", opacity: 0.6 }} axisLine={false} tickLine={false} width={30} />
        <Tooltip
          contentStyle={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 8, fontSize: 12 }}
        />
        <Bar dataKey="views" fill="var(--teal)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="enquiries" fill="var(--spice)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
