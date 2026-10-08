"use client";

import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const { theme, toggle } = useTheme();
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Profile</h1>
      <p className="mt-1 text-ink/60">Manage your account details and preferences.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
        className="mt-6 max-w-lg space-y-4 rounded-xl border border-mist bg-paper p-5"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Full name</label>
          <input
            defaultValue="Kasun Jayasuriya"
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Email</label>
          <input
            type="email"
            defaultValue="kasun@example.com"
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Phone</label>
          <input
            defaultValue="+94 77 000 0000"
            className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
          />
        </div>
        <Button type="submit">{saved ? "Saved ✓" : "Save changes"}</Button>
      </form>

      <div className="mt-6 max-w-lg rounded-xl border border-mist bg-paper p-5">
        <h2 className="font-display text-base font-semibold text-ink">Appearance</h2>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-ink/70">Dark mode</p>
          <button
            onClick={toggle}
            className="relative h-6 w-11 rounded-full bg-mist-dark transition-colors data-[on=true]:bg-teal"
            data-on={theme === "dark"}
          >
            <span
              className="absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-transform"
              style={{ transform: theme === "dark" ? "translateX(22px)" : "translateX(2px)" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
