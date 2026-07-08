import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  savedIds: string[];
  compareIds: string[];
  recentlyViewedIds: string[];
  savedSearches: { id: string; label: string; href: string; createdAt: string }[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  isComparing: (id: string) => boolean;
  clearCompare: () => void;
  addRecentlyViewed: (id: string) => void;
  addSavedSearch: (label: string, href: string) => void;
  removeSavedSearch: (id: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      compareIds: [],
      recentlyViewedIds: [],
      savedSearches: [],
      toggleSaved: (id) =>
        set((state) => ({
          savedIds: state.savedIds.includes(id)
            ? state.savedIds.filter((x) => x !== id)
            : [...state.savedIds, id],
        })),
      isSaved: (id) => get().savedIds.includes(id),
      toggleCompare: (id) =>
        set((state) => {
          if (state.compareIds.includes(id)) {
            return { compareIds: state.compareIds.filter((x) => x !== id) };
          }
          if (state.compareIds.length >= 3) return state;
          return { compareIds: [...state.compareIds, id] };
        }),
      isComparing: (id) => get().compareIds.includes(id),
      clearCompare: () => set({ compareIds: [] }),
      addRecentlyViewed: (id) =>
        set((state) => ({
          recentlyViewedIds: [id, ...state.recentlyViewedIds.filter((x) => x !== id)].slice(0, 12),
        })),
      addSavedSearch: (label, href) =>
        set((state) => ({
          savedSearches: [
            { id: crypto.randomUUID(), label, href, createdAt: new Date().toISOString() },
            ...state.savedSearches,
          ],
        })),
      removeSavedSearch: (id) =>
        set((state) => ({ savedSearches: state.savedSearches.filter((s) => s.id !== id) })),
    }),
    { name: "gevora-user-store" }
  )
);
