"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFeaturedProperties } from "@/hooks/useListings";
import { PropertyCard } from "@/components/search/PropertyCard";

export function FeaturedCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { data: properties, isLoading } = useFeaturedProperties(10);

  function scroll(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Featured properties</h2>
          <p className="mt-1 text-sm text-ink/60">Hand-picked listings from verified agents this week</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-mist text-ink/60 hover:border-mist-dark"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-mist text-ink/60 hover:border-mist-dark"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none]">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 w-72 shrink-0 animate-pulse rounded-xl bg-mist/40 sm:w-80" />
            ))
          : properties?.map((property) => (
              <div key={property.id} className="w-72 shrink-0 snap-start sm:w-80">
                <PropertyCard property={property} />
              </div>
            ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/buy" className="text-sm font-semibold text-teal hover:underline">
          View all properties for sale →
        </Link>
      </div>
    </section>
  );
}
