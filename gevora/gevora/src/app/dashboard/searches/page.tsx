"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Bell } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/Button";

export default function SavedSearchesPage() {
  const savedSearches = useUserStore((s) => s.savedSearches);
  const addSavedSearch = useUserStore((s) => s.addSavedSearch);
  const removeSavedSearch = useUserStore((s) => s.removeSavedSearch);
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("/buy");

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Saved searches</h1>
      <p className="mt-1 text-ink/60">Get a WhatsApp alert whenever a new listing matches your criteria.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!label.trim()) return;
          addSavedSearch(label.trim(), href);
          setLabel("");
        }}
        className="mt-6 flex flex-col gap-3 rounded-xl border border-mist bg-paper p-4 sm:flex-row"
      >
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. 3-bed apartments in Colombo 05 under 60Mn"
          className="flex-1 rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
        />
        <select
          value={href}
          onChange={(e) => setHref(e.target.value)}
          className="rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm"
        >
          <option value="/buy">Buy</option>
          <option value="/rent">Rent</option>
          <option value="/land">Land</option>
          <option value="/commercial">Commercial</option>
        </select>
        <Button type="submit">Save alert</Button>
      </form>

      <div className="mt-6 space-y-3">
        {savedSearches.length === 0 && <p className="text-sm text-ink/60">No saved searches yet.</p>}
        {savedSearches.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-xl border border-mist bg-paper p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal">
                <Bell size={16} />
              </span>
              <div>
                <Link href={s.href} className="text-sm font-medium text-ink hover:underline">
                  {s.label}
                </Link>
                <p className="text-xs text-ink/45">Added {new Date(s.createdAt).toLocaleDateString("en-LK")}</p>
              </div>
            </div>
            <button
              onClick={() => removeSavedSearch(s.id)}
              aria-label="Remove saved search"
              className="text-ink/40 hover:text-lotus"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
