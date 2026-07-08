import Image from "next/image";
import Link from "next/link";
import { Star, BadgeCheck } from "lucide-react";
import type { Agent } from "@/lib/types";

export function AgentDirectoryCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.id}`}
      className="flex flex-col items-center rounded-xl border border-mist bg-paper p-6 text-center transition-colors hover:border-teal"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-full">
        <Image src={agent.avatarUrl} alt={agent.name} fill className="object-cover" />
      </div>
      <p className="mt-3 flex items-center gap-1 font-display text-base font-semibold text-ink">
        {agent.name}
        {agent.verified && <BadgeCheck size={16} className="text-teal" />}
      </p>
      <p className="text-sm text-ink/60">{agent.agency}</p>
      <div className="mt-2 flex items-center gap-1 text-sm text-ink/70">
        <Star size={14} className="fill-spice text-spice" /> {agent.rating} · {agent.reviewCount} reviews
      </div>
      <div className="mt-3 flex w-full justify-between border-t border-mist pt-3 text-xs text-ink/50">
        <span>{agent.activeListings} active</span>
        <span>{agent.soldCount} sold</span>
        <span>{agent.yearsExperience}y experience</span>
      </div>
    </Link>
  );
}
