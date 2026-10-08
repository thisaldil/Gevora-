"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Scale, BedDouble, Bath, Car, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useUserStore } from "@/store/useUserStore";
import { formatPrice, formatRelativeDate } from "@/lib/utils";
import type { Property } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PropertyCard({ property, className }: { property: Property; className?: string }) {
  const isSaved = useUserStore((s) => s.isSaved(property.id));
  const isComparing = useUserStore((s) => s.isComparing(property.id));
  const toggleSaved = useUserStore((s) => s.toggleSaved);
  const toggleCompare = useUserStore((s) => s.toggleCompare);

  const priceLabel =
    property.purpose === "rent"
      ? `${formatPrice(property.price)} / ${property.rentPeriod}`
      : formatPrice(property.price);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-mist bg-paper shadow-sm transition-shadow hover:shadow-lg",
        className
      )}
    >
      <Link href={`/property/${property.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
          {property.featured && <Badge tone="spice">Featured</Badge>}
          {property.verified && <Badge tone="teal">Verified</Badge>}
        </div>
      </Link>

      <div className="absolute right-2.5 top-2.5 flex gap-1.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaved(property.id);
          }}
          aria-label={isSaved ? "Remove from saved" : "Save property"}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 backdrop-blur transition-colors",
            isSaved ? "text-lotus" : "text-ink/60 hover:text-lotus"
          )}
        >
          <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleCompare(property.id);
          }}
          aria-label={isComparing ? "Remove from compare" : "Add to compare"}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 backdrop-blur transition-colors",
            isComparing ? "text-teal" : "text-ink/60 hover:text-teal"
          )}
        >
          <Scale size={16} />
        </button>
      </div>

      <Link href={`/property/${property.id}`} className="flex flex-1 flex-col p-4">
        <p className="font-mono text-lg font-semibold text-teal">{priceLabel}</p>
        <h3 className="mt-1 line-clamp-1 font-display text-base font-medium text-ink">{property.title}</h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-ink/60">
          {property.address.suburb}, {property.address.district}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink/70">
          {property.beds > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={15} /> {property.beds}
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1">
              <Bath size={15} /> {property.baths}
            </span>
          )}
          {property.parking > 0 && (
            <span className="flex items-center gap-1">
              <Car size={15} /> {property.parking}
            </span>
          )}
          {property.landSizePerches && (
            <span className="flex items-center gap-1">
              <Ruler size={15} /> {property.landSizePerches}p
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-mist pt-3 text-xs text-ink/50">
          <span>{formatRelativeDate(property.listedDate)}</span>
          <span>{property.agent.agency}</span>
        </div>
      </Link>
    </motion.div>
  );
}
