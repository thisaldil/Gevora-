"use client";

import Image from "next/image";
import Link from "next/link";
import { useProjects } from "@/hooks/useListings";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const statusLabel: Record<string, string> = {
  upcoming: "Coming soon",
  under_construction: "Under construction",
  completed: "Ready to move in",
};

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink">New developments</h1>
      <p className="mt-1 text-ink/60">Apartment complexes and housing schemes from developers across Sri Lanka.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => <div key={i} className="h-72 animate-pulse rounded-xl bg-mist/40" />)
          : projects?.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group overflow-hidden rounded-xl border border-mist bg-paper transition-colors hover:border-teal"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge tone="spice" className="absolute left-3 top-3">
                    {statusLabel[project.status]}
                  </Badge>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg font-semibold text-ink">{project.name}</h2>
                  <p className="text-sm text-ink/60">{project.location}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-mono font-semibold text-teal">From {formatPrice(project.priceFrom)}</span>
                    <span className="text-ink/50">{project.units} units</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
