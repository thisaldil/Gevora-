"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useProject } from "@/hooks/useListings";
import { developers } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const statusLabel: Record<string, string> = {
  upcoming: "Coming soon",
  under_construction: "Under construction",
  completed: "Ready to move in",
};

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: project, isLoading } = useProject(params.id);
  const developer = developers.find((d) => d.id === project?.developerId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="h-96 animate-pulse rounded-xl bg-mist/40" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="font-display text-2xl text-ink">Project not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
        <Image src={project.coverImage} alt={project.name} fill className="object-cover" />
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <Badge tone="spice">{statusLabel[project.status]}</Badge>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{project.name}</h1>
          <p className="mt-1 text-ink/60">{project.location}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-mist bg-paper p-4">
            <div>
              <p className="font-mono text-lg font-semibold text-teal">{formatPrice(project.priceFrom)}</p>
              <p className="text-xs text-ink/50">Starting price</p>
            </div>
            <div>
              <p className="font-mono text-lg font-semibold text-ink">{project.units}</p>
              <p className="text-xs text-ink/50">Total units</p>
            </div>
            <div>
              <p className="font-mono text-lg font-semibold text-ink">
                {new Date(project.completionDate).getFullYear()}
              </p>
              <p className="text-xs text-ink/50">Est. completion</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.images.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={src} alt={`${project.name} render ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          {developer && (
            <div className="rounded-xl border border-mist bg-paper p-5">
              <p className="text-xs text-ink/50">Developed by</p>
              <p className="font-display text-lg font-semibold text-ink">{developer.name}</p>
              <p className="mt-1 text-sm text-ink/60">
                Est. {developer.founded} · {developer.completedProjects} completed projects
              </p>
            </div>
          )}
          <div className="rounded-xl border border-mist bg-paper p-5">
            <h2 className="font-display text-base font-semibold text-ink">Request the brochure</h2>
            <p className="mt-1 text-sm text-ink/60">Get floor plans, pricing tiers, and payment schedules by email.</p>
            <Button className="mt-4 w-full">Request brochure</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
