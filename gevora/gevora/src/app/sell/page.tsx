"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ViewsChart, type ViewsDatum } from "@/components/charts/ViewsChart";

const sampleViews: ViewsDatum[] = [
  { label: "Mon", views: 34, enquiries: 2 },
  { label: "Tue", views: 51, enquiries: 4 },
  { label: "Wed", views: 42, enquiries: 3 },
  { label: "Thu", views: 68, enquiries: 6 },
  { label: "Fri", views: 59, enquiries: 5 },
  { label: "Sat", views: 77, enquiries: 8 },
  { label: "Sun", views: 63, enquiries: 5 },
];

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink">List your property</h1>
      <p className="mt-1 text-ink/60">Reach thousands of verified buyers and tenants across Sri Lanka.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {submitted ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-mist bg-paper p-10 text-center">
            <CheckCircle2 className="text-teal" size={32} />
            <p className="font-display text-lg font-semibold text-ink">Listing submitted for review</p>
            <p className="text-sm text-ink/60">Our team verifies new listings within 24 hours before they go live.</p>
            <Button variant="outline" className="mt-3" onClick={() => setSubmitted(false)}>
              List another property
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5 rounded-xl border border-mist bg-paper p-6"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/70">Listing title</label>
              <input
                required
                placeholder="e.g. Modern 3-bedroom house in Nugegoda"
                className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink/70">Purpose</label>
                <select className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm">
                  <option>For sale</option>
                  <option>For rent</option>
                  <option>Land</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink/70">Property type</label>
                <select className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm">
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Land</option>
                  <option>Commercial building</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink/70">Price (LKR)</label>
                <input
                  required
                  type="number"
                  className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink/70">Bedrooms</label>
                <input type="number" className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink/70">Bathrooms</label>
                <input type="number" className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/70">Location</label>
              <input
                required
                placeholder="Suburb, district"
                className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/70">Description</label>
              <textarea rows={4} className="w-full rounded-lg border border-mist bg-sand px-3 py-2.5 text-sm" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/70">Photos</label>
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-mist-dark bg-sand px-4 py-8 text-center">
                <UploadCloud className="text-ink/40" size={26} />
                <p className="text-sm text-ink/60">Drag photos here, or click to upload</p>
                <p className="text-xs text-ink/40">Media is stored on Cloudinary once connected — up to 25 photos</p>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Submit listing for review
            </Button>
          </form>
        )}

        <aside className="space-y-5">
          <div className="rounded-xl border border-mist bg-paper p-5">
            <h2 className="font-display text-base font-semibold text-ink">Why list on Gevora</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink/70">
              <li>· Free for your first 3 listings</li>
              <li>· WhatsApp lead notifications</li>
              <li>· Verified badge builds buyer trust</li>
              <li>· Suburb-level analytics on every listing</li>
            </ul>
          </div>
          <div className="rounded-xl border border-mist bg-paper p-5">
            <h2 className="font-display text-base font-semibold text-ink">Typical performance</h2>
            <p className="mt-1 text-xs text-ink/50">Views &amp; enquiries — first week, similar listings</p>
            <div className="mt-3">
              <ViewsChart data={sampleViews} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
