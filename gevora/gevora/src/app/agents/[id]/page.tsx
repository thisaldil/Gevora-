"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";
import { Star, BadgeCheck, Phone, MessageCircle } from "lucide-react";
import { useAgent } from "@/hooks/useListings";
import { properties } from "@/lib/mock-data";
import { PropertyCard } from "@/components/search/PropertyCard";

export default function AgentProfilePage() {
  const params = useParams<{ id: string }>();
  const { data: agent, isLoading } = useAgent(params.id);
  const listings = useMemo(() => properties.filter((p) => p.agent.id === params.id), [params.id]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="h-48 animate-pulse rounded-xl bg-mist/40" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="font-display text-2xl text-ink">Agent not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-6 rounded-xl border border-mist bg-paper p-6 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
          <Image src={agent.avatarUrl} alt={agent.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
            {agent.name}
            {agent.verified && <BadgeCheck size={20} className="text-teal" />}
          </h1>
          <p className="text-ink/60">{agent.agency}</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-ink/70">
            <span className="flex items-center gap-1">
              <Star size={14} className="fill-spice text-spice" /> {agent.rating} ({agent.reviewCount} reviews)
            </span>
            <span>{agent.responseRate}% response rate</span>
            <span>{agent.yearsExperience} years experience</span>
            <span>{agent.soldCount} properties sold</span>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href={`tel:${agent.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 rounded-lg border border-mist px-4 py-2.5 text-sm font-medium text-ink hover:border-teal"
          >
            <Phone size={15} /> Call
          </a>
          {agent.whatsapp && (
            <a
              href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-medium text-paper hover:bg-teal-light"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          )}
        </div>
      </div>

      <h2 className="mb-5 mt-10 font-display text-xl font-semibold text-ink">
        Active listings ({listings.length})
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {listings.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
        {listings.length === 0 && <p className="text-sm text-ink/60">No active listings right now.</p>}
      </div>
    </div>
  );
}
