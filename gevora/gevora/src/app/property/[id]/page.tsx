"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { BedDouble, Bath, Car, Ruler, Calendar, Eye, Heart, Scale } from "lucide-react";
import { useProperty, useSimilarProperties, useSuburbStatsByName } from "@/hooks/useListings";
import { useUserStore } from "@/store/useUserStore";
import { formatPrice, formatRelativeDate, formatCompactNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Gallery } from "@/components/property/Gallery";
import { AgentCard } from "@/components/property/AgentCard";
import { EnquiryForm } from "@/components/property/EnquiryForm";
import { PriceHistoryTimeline } from "@/components/property/PriceHistoryTimeline";
import { InvestmentAnalysis } from "@/components/property/InvestmentAnalysis";
import { NeighborhoodDashboard } from "@/components/property/NeighborhoodDashboard";
import { PropertyCard } from "@/components/search/PropertyCard";

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: property, isLoading } = useProperty(params.id);
  const { data: similar } = useSimilarProperties(property);
  const { data: suburb } = useSuburbStatsByName(property?.address.suburb ?? "");
  const addRecentlyViewed = useUserStore((s) => s.addRecentlyViewed);
  const isSaved = useUserStore((s) => s.isSaved(params.id));
  const isComparing = useUserStore((s) => s.isComparing(params.id));
  const toggleSaved = useUserStore((s) => s.toggleSaved);
  const toggleCompare = useUserStore((s) => s.toggleCompare);

  useEffect(() => {
    if (property) addRecentlyViewed(property.id);
  }, [property, addRecentlyViewed]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-96 animate-pulse rounded-xl bg-mist/40" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-2xl text-ink">Property not found</p>
        <p className="mt-2 text-sm text-ink/60">It may have been sold, leased, or removed by the agent.</p>
      </div>
    );
  }

  const priceLabel =
    property.purpose === "rent" ? `${formatPrice(property.price)} / ${property.rentPeriod}` : formatPrice(property.price);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <Gallery images={property.images} title={property.title} />

          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-1.5">
                {property.featured && <Badge tone="spice">Featured</Badge>}
                {property.verified && <Badge tone="teal">Verified</Badge>}
                <Badge tone="mist">{formatRelativeDate(property.listedDate)}</Badge>
              </div>
              <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">{property.title}</h1>
              <p className="mt-1 text-ink/60">
                {property.address.line1}, {property.address.suburb}, {property.address.district}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-2xl font-semibold text-teal sm:text-3xl">{priceLabel}</p>
              {property.priceLabel && <p className="text-xs text-ink/50">{property.priceLabel}</p>}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => toggleSaved(property.id)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium ${
                isSaved ? "border-lotus text-lotus" : "border-mist text-ink/70 hover:border-mist-dark"
              }`}
            >
              <Heart size={15} fill={isSaved ? "currentColor" : "none"} /> {isSaved ? "Saved" : "Save"}
            </button>
            <button
              onClick={() => toggleCompare(property.id)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium ${
                isComparing ? "border-teal text-teal" : "border-mist text-ink/70 hover:border-mist-dark"
              }`}
            >
              <Scale size={15} /> {isComparing ? "Added to compare" : "Compare"}
            </button>
            <span className="ml-auto flex items-center gap-1.5 text-xs text-ink/45">
              <Eye size={14} /> {formatCompactNumber(property.views)} views · {property.savedCount} saves
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-mist bg-paper p-4 sm:grid-cols-4">
            {property.beds > 0 && (
              <Fact icon={BedDouble} label="Bedrooms" value={String(property.beds)} />
            )}
            {property.baths > 0 && <Fact icon={Bath} label="Bathrooms" value={String(property.baths)} />}
            {property.parking > 0 && <Fact icon={Car} label="Parking" value={String(property.parking)} />}
            {property.landSizePerches && <Fact icon={Ruler} label="Land size" value={`${property.landSizePerches} perches`} />}
            {property.floorAreaSqft && <Fact icon={Ruler} label="Floor area" value={`${property.floorAreaSqft} sq ft`} />}
            {property.yearBuilt && <Fact icon={Calendar} label="Year built" value={String(property.yearBuilt)} />}
          </div>

          <div className="mt-6 rounded-xl border border-mist bg-paper p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Description</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{property.description}</p>
          </div>

          <div className="mt-6 rounded-xl border border-mist bg-paper p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Features & amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {[...property.features, ...property.slFeatures].map((f) => (
                <Badge key={f} tone="mist">
                  {f}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <NeighborhoodDashboard amenities={property.amenities} suburb={property.address.suburb} />
          </div>

          <div className="mt-6">
            <InvestmentAnalysis property={property} suburb={suburb} />
          </div>

          <div className="mt-6">
            <PriceHistoryTimeline history={property.priceHistory} />
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <AgentCard agent={property.agent} />
          <EnquiryForm propertyId={property.id} propertyTitle={property.title} />
        </aside>
      </div>

      {similar && similar.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-5 font-display text-2xl font-semibold text-ink">Similar properties nearby</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof BedDouble; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{value}</p>
        <p className="text-[11px] text-ink/50">{label}</p>
      </div>
    </div>
  );
}
