import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api";
import type { ListingSearchParams } from "@/lib/api";

export function useListingSearch(params: ListingSearchParams) {
  return useQuery({
    queryKey: ["listings", params],
    queryFn: () => api.searchListings(params),
  });
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => api.getProperty(id),
    enabled: !!id,
  });
}

export function useFeaturedProperties(limit = 8) {
  return useQuery({
    queryKey: ["featured", limit],
    queryFn: () => api.getFeaturedProperties(limit),
  });
}

export function useSimilarProperties(property: Parameters<typeof api.getSimilarProperties>[0] | undefined) {
  return useQuery({
    queryKey: ["similar", property?.id],
    queryFn: () => api.getSimilarProperties(property!),
    enabled: !!property,
  });
}

export function useAgents() {
  return useQuery({ queryKey: ["agents"], queryFn: api.getAgents });
}

export function useAgent(id: string) {
  return useQuery({ queryKey: ["agent", id], queryFn: () => api.getAgent(id), enabled: !!id });
}

export function useProjects() {
  return useQuery({ queryKey: ["projects"], queryFn: api.getProjects });
}

export function useProject(id: string) {
  return useQuery({ queryKey: ["project", id], queryFn: () => api.getProject(id), enabled: !!id });
}

export function useSuburbStats() {
  return useQuery({ queryKey: ["suburb-stats"], queryFn: api.getAllSuburbStats });
}

export function useSuburbStatsByName(name: string) {
  return useQuery({
    queryKey: ["suburb-stats", name],
    queryFn: () => api.getSuburbStatsByName(name),
    enabled: !!name,
  });
}
