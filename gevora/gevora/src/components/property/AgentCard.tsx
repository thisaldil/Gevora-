import Image from "next/image";
import Link from "next/link";
import { Star, Phone, MessageCircle } from "lucide-react";
import type { Agent } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="rounded-xl border border-mist bg-paper p-5">
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-full">
          <Image src={agent.avatarUrl} alt={agent.name} fill className="object-cover" />
        </div>
        <div>
          <Link href={`/agents/${agent.id}`} className="font-display text-base font-semibold text-ink hover:underline">
            {agent.name}
          </Link>
          <p className="text-sm text-ink/60">{agent.agency}</p>
        </div>
        {agent.verified && (
          <Badge tone="teal" className="ml-auto">
            Verified
          </Badge>
        )}
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-ink/70">
        <span className="flex items-center gap-1">
          <Star size={14} className="fill-spice text-spice" /> {agent.rating} ({agent.reviewCount})
        </span>
        <span>{agent.responseRate}% response rate</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <a
          href={`tel:${agent.phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-mist py-2.5 text-sm font-medium text-ink hover:border-teal"
        >
          <Phone size={15} /> Call
        </a>
        {agent.whatsapp ? (
          <a
            href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-teal py-2.5 text-sm font-medium text-paper hover:bg-teal-light"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
        ) : (
          <LinkButton href={`/agents/${agent.id}`} variant="outline" size="sm">
            View profile
          </LinkButton>
        )}
      </div>
    </div>
  );
}
