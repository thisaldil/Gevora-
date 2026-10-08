import {
  agents,
  developers,
  projects,
  properties,
  suburbStats,
  getPropertyById as _getPropertyById,
} from "./mock-data";
import type { Property, SearchFilters } from "./types";

// Every function here is async and shaped like a future REST call
// (e.g. GET /api/listings?purpose=buy&...) on purpose. When the Fastify
// API is ready, swap the body of each function for a fetch() call and
// every hook in /hooks stays the same.

const LATENCY = 220;

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface ListingSearchParams extends Partial<SearchFilters> {
  page?: number;
  pageSize?: number;
}

export interface ListingSearchResult {
  results: Property[];
  total: number;
  page: number;
  pageSize: number;
}

export async function searchListings(params: ListingSearchParams): Promise<ListingSearchResult> {
  const { purpose, location, propertyTypes, priceMin, priceMax, bedsMin, slFeatures, furnished, sort, page = 1, pageSize = 12 } = params;

  let result = properties.filter((p) => (purpose ? p.purpose === purpose : true));

  if (location) {
    const q = location.toLowerCase();
    result = result.filter(
      (p) =>
        p.address.suburb.toLowerCase().includes(q) ||
        p.address.district.toLowerCase().includes(q) ||
        p.address.province.toLowerCase().includes(q)
    );
  }
  if (propertyTypes && propertyTypes.length > 0) {
    result = result.filter((p) => propertyTypes.includes(p.type));
  }
  if (priceMin) result = result.filter((p) => p.price >= priceMin);
  if (priceMax) result = result.filter((p) => p.price <= priceMax);
  if (bedsMin) result = result.filter((p) => p.beds >= bedsMin);
  if (slFeatures && slFeatures.length > 0) {
    result = result.filter((p) => slFeatures.every((f) => p.slFeatures.includes(f)));
  }
  if (furnished) result = result.filter((p) => p.furnished);

  switch (sort) {
    case "price_asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result = [...result].sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
      break;
    default:
      result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  const total = result.length;
  const start = (page - 1) * pageSize;
  const paged = result.slice(start, start + pageSize);

  return delay({ results: paged, total, page, pageSize });
}

export async function getProperty(id: string): Promise<Property | undefined> {
  return delay(_getPropertyById(id));
}

export async function getFeaturedProperties(limit = 8): Promise<Property[]> {
  return delay(properties.filter((p) => p.featured).slice(0, limit));
}

export async function getSimilarProperties(property: Property, limit = 4): Promise<Property[]> {
  return delay(
    properties
      .filter((p) => p.id !== property.id && p.purpose === property.purpose && p.address.district === property.address.district)
      .slice(0, limit)
  );
}

export async function getAgents() {
  return delay(agents);
}

export async function getAgent(id: string) {
  return delay(agents.find((a) => a.id === id));
}

export async function getDevelopers() {
  return delay(developers);
}

export async function getProjects() {
  return delay(projects);
}

export async function getProject(id: string) {
  return delay(projects.find((p) => p.id === id));
}

export async function getAllSuburbStats() {
  return delay(suburbStats);
}

export async function getSuburbStatsByName(name: string) {
  return delay(suburbStats.find((s) => s.suburb === name));
}

export interface EnquiryPayload {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ success: true }> {
  // Will POST to /api/listings/:id/enquiries
  console.info("[mock] enquiry submitted", payload);
  return delay({ success: true }, 400);
}

export interface AiSearchResult {
  summary: string;
  propertyIds: string[];
}

/** Mock AI search — will call the real NL search endpoint once available. */
export async function aiSearch(query: string): Promise<AiSearchResult> {
  const q = query.toLowerCase();
  let pool = properties;
  if (q.includes("rent")) pool = pool.filter((p) => p.purpose === "rent");
  if (q.includes("colombo")) pool = pool.filter((p) => p.address.district === "Colombo");
  if (q.includes("pool") || q.includes("swimming")) pool = pool.filter((p) => p.features.includes("Swimming pool"));
  if (q.includes("beach")) pool = pool.filter((p) => p.slFeatures.includes("Beach front"));
  const priceMatch = q.match(/under\s+(\d+)\s*(m|million|mn)/);
  if (priceMatch) {
    const max = Number(priceMatch[1]) * 1_000_000;
    pool = pool.filter((p) => p.price <= max);
  }
  const top = pool.slice(0, 6);
  return delay({
    summary: `Found ${top.length} propert${top.length === 1 ? "y" : "ies"} matching "${query}".`,
    propertyIds: top.map((p) => p.id),
  }, 500);
}
