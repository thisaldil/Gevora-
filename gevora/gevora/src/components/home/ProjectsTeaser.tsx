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

export function ProjectsTeaser() {
  const { data: projects, isLoading } = useProjects();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">New developments</h2>
          <p className="mt-1 text-sm text-ink/60">Off-the-plan apartments and housing schemes from trusted developers</p>
        </div>
        <Link href="/projects" className="text-sm font-semibold text-teal hover:underline">
          View all projects →
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => <div key={i} className="h-64 animate-pulse rounded-xl bg-mist/40" />)
          : projects?.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group relative flex h-64 overflow-hidden rounded-xl border border-mist"
              >
                <Image
                  src={project.coverImage}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="relative mt-auto p-5 text-paper">
                  <Badge tone="spice">{statusLabel[project.status]}</Badge>
                  <h3 className="mt-2 font-display text-xl font-semibold">{project.name}</h3>
                  <p className="text-sm text-paper/80">{project.location}</p>
                  <p className="mt-1 font-mono text-sm">From {formatPrice(project.priceFrom)}</p>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
