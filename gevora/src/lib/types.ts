// Domain types. Deliberately shaped to mirror the backend's
// properties/listings separation (a property is a physical asset;
// a listing is a market event on top of it) so the API layer can be
// swapped from mock data to the real Fastify API with minimal changes.

export type ListingPurpose = "buy" | "rent" | "land" | "commercial" | "share";

export type PropertyType =
  | "house"
  | "apartment"
  | "villa"
  | "luxury"
  | "land"
  | "commercial"
  | "warehouse"
  | "office"
  | "agricultural"
  | "holiday";

export type ListingStatus = "active" | "under_offer" | "sold" | "leased" | "withdrawn";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Address {
  line1: string;
  suburb: string;
  district: string;
  province: string;
  postalCode?: string;
  geo: GeoPoint;
}

export interface PriceHistoryEntry {
  date: string; // ISO date
  event: "listed" | "price_change" | "sold" | "leased" | "withdrawn" | "relisted";
  price?: number;
  note?: string;
}

export interface Agent {
  id: string;
  name: string;
  agency: string;
  avatarUrl: string;
  phone: string;
  whatsapp?: string;
  responseRate: number; // 0-100
  yearsExperience: number;
  rating: number; // 0-5
  reviewCount: number;
  activeListings: number;
  soldCount: number;
  verified: boolean;
}

export interface Developer {
  id: string;
  name: string;
  logoUrl: string;
  founded: number;
  completedProjects: number;
  activeProjects: number;
}

export interface Project {
  id: string;
  developerId: string;
  name: string;
  location: string;
  suburb: string;
  status: "upcoming" | "under_construction" | "completed";
  priceFrom: number;
  completionDate: string;
  units: number;
  coverImage: string;
  images: string[];
}

export interface Feature {
  key: string;
  label: string;
}

export interface Property {
  id: string;
  title: string;
  purpose: ListingPurpose;
  type: PropertyType;
  status: ListingStatus;
  price: number;
  priceLabel?: string; // e.g. "Negotiable", "On request"
  rentPeriod?: "month" | "week";
  currency: "LKR" | "USD";
  beds: number;
  baths: number;
  parking: number;
  landSizePerches?: number;
  floorAreaSqft?: number;
  yearBuilt?: number;
  address: Address;
  images: string[];
  videoUrl?: string;
  tourUrl?: string;
  description: string;
  features: string[];
  amenities: string[];
  slFeatures: string[]; // beach-front, tea estate, etc.
  agent: Agent;
  verified: boolean;
  featured: boolean;
  views: number;
  savedCount: number;
  listedDate: string;
  priceHistory: PriceHistoryEntry[];
  furnished?: boolean;
}

export interface SuburbStats {
  suburb: string;
  district: string;
  medianSalePrice: number;
  medianRentPrice: number;
  priceChange12mo: number; // percentage
  rentalYield: number;
  daysOnMarket: number;
  demandLevel: "low" | "medium" | "high" | "very high";
  history: { year: number; median: number }[];
}

export interface SearchFilters {
  purpose: ListingPurpose;
  location: string;
  propertyTypes: PropertyType[];
  priceMin?: number;
  priceMax?: number;
  bedsMin?: number;
  bathsMin?: number;
  parkingMin?: number;
  landSizeMin?: number;
  slFeatures: string[];
  furnished?: boolean;
  sort: "relevance" | "price_asc" | "price_desc" | "newest";
}
