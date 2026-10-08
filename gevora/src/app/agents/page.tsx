"use client";

import { useAgents } from "@/hooks/useListings";
import { AgentDirectoryCard } from "@/components/agents/AgentDirectoryCard";

export default function AgentsPage() {
  const { data: agents, isLoading } = useAgents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink">Find a licensed agent</h1>
      <p className="mt-1 text-ink/60">Verified agencies across Sri Lanka, ranked by response rate and reviews.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-64 animate-pulse rounded-xl bg-mist/40" />)
          : agents?.map((agent) => <AgentDirectoryCard key={agent.id} agent={agent} />)}
      </div>
    </div>
  );
}
