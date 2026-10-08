"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { getPropertyById } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

const rows: { label: string; get: (p: NonNullable<ReturnType<typeof getPropertyById>>) => string }[] = [
  { label: "Price", get: (p) => (p.purpose === "rent" ? `${formatPrice(p.price)} / ${p.rentPeriod}` : formatPrice(p.price)) },
  { label: "Type", get: (p) => p.type },
  { label: "Bedrooms", get: (p) => (p.beds > 0 ? String(p.beds) : "—") },
  { label: "Bathrooms", get: (p) => (p.baths > 0 ? String(p.baths) : "—") },
  { label: "Parking", get: (p) => (p.parking > 0 ? String(p.parking) : "—") },
  { label: "Land size", get: (p) => (p.landSizePerches ? `${p.landSizePerches} perches` : "—") },
  { label: "Floor area", get: (p) => (p.floorAreaSqft ? `${p.floorAreaSqft} sq ft` : "—") },
  { label: "Year built", get: (p) => (p.yearBuilt ? String(p.yearBuilt) : "—") },
  { label: "Suburb", get: (p) => p.address.suburb },
  { label: "District", get: (p) => p.address.district },
  { label: "Agent", get: (p) => `${p.agent.name} · ${p.agent.agency}` },
];

export default function ComparePage() {
  const compareIds = useUserStore((s) => s.compareIds);
  const toggleCompare = useUserStore((s) => s.toggleCompare);
  const properties = compareIds.map((id) => getPropertyById(id)).filter((p): p is NonNullable<typeof p> => !!p);

  if (properties.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-2xl text-ink">Nothing to compare yet</p>
        <p className="mt-2 text-sm text-ink/60">
          Tap the scale icon on any property card to add it here — compare up to 3 at once.
        </p>
        <LinkButton href="/buy" className="mt-6">
          Browse properties
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink">Compare properties</h1>
      <p className="mt-1 text-ink/60">Side-by-side details for up to 3 listings.</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[600px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-40" />
              {properties.map((p) => (
                <th key={p.id} className="p-3 text-left align-top">
                  <div className="relative mb-2 aspect-[4/3] w-48 overflow-hidden rounded-lg">
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                    <button
                      onClick={() => toggleCompare(p.id)}
                      aria-label="Remove from comparison"
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-paper/90 text-ink"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <Link href={`/property/${p.id}`} className="font-display text-sm font-semibold text-ink hover:underline">
                    {p.title}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-paper" : ""}>
                <td className="p-3 text-sm font-medium text-ink/60">{row.label}</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 text-sm capitalize text-ink">
                    {row.get(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
