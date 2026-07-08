import { create } from "zustand";
import type { ListingPurpose, PropertyType, SearchFilters } from "@/lib/types";

interface SearchState extends SearchFilters {
  viewMode: "list" | "map" | "split";
  setPurpose: (purpose: ListingPurpose) => void;
  setLocation: (location: string) => void;
  setPropertyTypes: (types: PropertyType[]) => void;
  setPriceRange: (min?: number, max?: number) => void;
  setBedsMin: (n?: number) => void;
  setBathsMin: (n?: number) => void;
  toggleSlFeature: (feature: string) => void;
  setFurnished: (v?: boolean) => void;
  setSort: (sort: SearchFilters["sort"]) => void;
  setViewMode: (mode: "list" | "map" | "split") => void;
  reset: () => void;
}

const initial: SearchFilters = {
  purpose: "buy",
  location: "",
  propertyTypes: [],
  slFeatures: [],
  sort: "relevance",
};

export const useSearchStore = create<SearchState>((set) => ({
  ...initial,
  viewMode: "split",
  setPurpose: (purpose) => set({ purpose }),
  setLocation: (location) => set({ location }),
  setPropertyTypes: (propertyTypes) => set({ propertyTypes }),
  setPriceRange: (priceMin, priceMax) => set({ priceMin, priceMax }),
  setBedsMin: (bedsMin) => set({ bedsMin }),
  setBathsMin: (bathsMin) => set({ bathsMin }),
  toggleSlFeature: (feature) =>
    set((state) => ({
      slFeatures: state.slFeatures.includes(feature)
        ? state.slFeatures.filter((f) => f !== feature)
        : [...state.slFeatures, feature],
    })),
  setFurnished: (furnished) => set({ furnished }),
  setSort: (sort) => set({ sort }),
  setViewMode: (viewMode) => set({ viewMode }),
  reset: () => set({ ...initial }),
}));
