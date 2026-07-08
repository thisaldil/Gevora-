"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { GoogleMap, MarkerF, InfoWindowF, useJsApiLoader } from "@react-google-maps/api";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function MapView({ properties, activeId }: { properties: Property[]; activeId?: string }) {
  if (!GOOGLE_MAPS_API_KEY) {
    return <FallbackMap properties={properties} activeId={activeId} />;
  }
  return <GoogleMapView properties={properties} activeId={activeId} />;
}

type MapType = "roadmap" | "satellite" | "hybrid" | "terrain";

const mapTypeOptions: { id: MapType; label: string }[] = [
  { id: "roadmap", label: "Map" },
  { id: "satellite", label: "Satellite" },
  { id: "hybrid", label: "Hybrid" },
  { id: "terrain", label: "Terrain" },
];

/**
 * Real Google Maps integration. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in
 * .env.local to activate — the fallback view keeps the search page fully
 * usable without a key during local development.
 */
function GoogleMapView({ properties, activeId }: { properties: Property[]; activeId?: string }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY!,
    id: "gevora-google-maps",
  });
  const [mapType, setMapType] = useState<MapType>("roadmap");
  const [openId, setOpenId] = useState<string | null>(activeId ?? null);

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      if (properties.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        properties.forEach((p) => bounds.extend({ lat: p.address.geo.lat, lng: p.address.geo.lng }));
        mapInstance.fitBounds(bounds, 60);
      }
    },
    [properties]
  );

  if (!isLoaded) {
    return <div className="h-full w-full animate-pulse rounded-xl bg-mist/40" />;
  }

  const activeProperty = properties.find((p) => p.id === openId);

  return (
    <div className="relative h-full w-full">
      <GoogleMap
        mapContainerClassName="h-full w-full rounded-xl"
        center={{ lat: 6.9271, lng: 79.8612 }}
        zoom={11}
        onLoad={onLoad}
        options={{
          mapTypeId: mapType,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
        }}
      >
        {properties.map((p) => (
          <MarkerF
            key={p.id}
            position={{ lat: p.address.geo.lat, lng: p.address.geo.lng }}
            title={p.title}
            onClick={() => setOpenId(p.id)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: p.id === activeId || p.id === openId ? 9 : 7,
              fillColor: p.id === activeId || p.id === openId ? "#bd6e2a" : "#0e4d46",
              fillOpacity: 1,
              strokeColor: "#fbf8f1",
              strokeWeight: 2,
            }}
          />
        ))}

        {activeProperty && (
          <InfoWindowF
            position={{ lat: activeProperty.address.geo.lat, lng: activeProperty.address.geo.lng }}
            onCloseClick={() => setOpenId(null)}
          >
            <Link href={`/property/${activeProperty.id}`} className="block max-w-[180px] text-ink no-underline">
              <p className="text-xs font-semibold leading-snug">{activeProperty.title}</p>
              <p className="mt-1 font-mono text-sm font-semibold text-teal">{formatPrice(activeProperty.price)}</p>
            </Link>
          </InfoWindowF>
        )}
      </GoogleMap>

      <div className="absolute right-3 top-3 flex gap-1 rounded-lg border border-mist bg-paper/95 p-1 shadow-sm backdrop-blur">
        {mapTypeOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setMapType(opt.id)}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              mapType === opt.id ? "bg-teal text-paper" : "text-ink/60 hover:bg-ink/5"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Lightweight placeholder: positions pins proportionally within the
 * viewport's lat/lng bounding box so the map is still spatially honest. */
function FallbackMap({ properties, activeId }: { properties: Property[]; activeId?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  if (properties.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-mist-dark bg-sand-deep text-sm text-ink/50">
        No properties to plot on the map
      </div>
    );
  }

  const lats = properties.map((p) => p.address.geo.lat);
  const lngs = properties.map((p) => p.address.geo.lng);
  const minLat = Math.min(...lats) - 0.01;
  const maxLat = Math.max(...lats) + 0.01;
  const minLng = Math.min(...lngs) - 0.01;
  const maxLng = Math.max(...lngs) + 0.01;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-mist bg-[#dbe6df]">
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
        <defs>
          <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0e4d46" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {properties.map((p) => {
        const x = ((p.address.geo.lng - minLng) / (maxLng - minLng || 1)) * 100;
        const y = 100 - ((p.address.geo.lat - minLat) / (maxLat - minLat || 1)) * 100;
        const isActive = p.id === activeId || p.id === hovered;
        return (
          <Link
            key={p.id}
            href={`/property/${p.id}`}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ left: `${x}%`, top: `${y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-full rounded-full border px-2 py-1 font-mono text-[11px] font-semibold shadow-sm transition-all ${
              isActive
                ? "z-10 scale-110 border-spice bg-spice text-paper"
                : "border-teal bg-paper text-teal hover:border-spice hover:text-spice"
            }`}
          >
            {formatPrice(p.price)}
          </Link>
        );
      })}

      <div className="absolute bottom-3 left-3 rounded-md bg-paper/90 px-2.5 py-1 text-[11px] text-ink/60 backdrop-blur">
        Map preview · connect a Google Maps API key for live tiles
      </div>
    </div>
  );
}
