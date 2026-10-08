# Gevora — Sri Lanka Property Portal (Frontend)

A frontend-only clone of realestate.com.au's feature set, rebuilt for the Sri
Lankan market. Backed entirely by an in-memory mock API so it runs standalone
today and swaps to the real Fastify/PostgreSQL backend later with no
component changes.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Language | TypeScript |
| Animation | Framer Motion |
| State | Zustand (search filters, saved/compare, persisted to localStorage) |
| Data fetching | TanStack Query, wrapping a mock async API |
| Forms | React Hook Form + Zod |
| Maps | Google Maps JavaScript API (falls back to a static positional map with no key) |
| Charts | Recharts |
| Images | next/image, ready for Cloudinary via `src/lib/cloudinary.ts` |
| Fonts | Self-hosted via `@fontsource` (Fraunces, Manrope, IBM Plex Mono) — no external font network calls |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables (all optional)

Copy `.env.example` to `.env.local` to enable:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — real interactive Google Maps (satellite/roadmap/hybrid/terrain) instead of the fallback preview
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` / `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` — real image hosting instead of mock picsum.photos URLs
- `NEXT_PUBLIC_API_BASE_URL` — reserved for when the real API replaces `src/lib/api.ts`

## Swapping in the real backend

Every data access goes through `src/lib/api.ts`. Each function (`searchListings`,
`getProperty`, `submitEnquiry`, etc.) already matches the shape of a future
REST call. To connect the real API:

1. Replace the body of each function in `src/lib/api.ts` with a `fetch()` call to `NEXT_PUBLIC_API_BASE_URL`.
2. Leave `src/hooks/useListings.ts` untouched — the TanStack Query hooks don't change.
3. Delete `src/lib/mock-data.ts` once nothing imports it directly (a couple of pages read it for convenience — grep for `mock-data` first).

Domain types in `src/lib/types.ts` mirror the properties/listings separation
used in the Prisma schema (a property is a physical asset; a listing is a
market event), so the mapping from API response to UI type should be close to
1:1.

## Pages

- `/` — homepage (hero search, categories, featured carousel, suburb price index teaser, new developments)
- `/buy`, `/rent`, `/land`, `/commercial` — search results with filters, sort, list/map/split view
- `/property/[id]` — full listing detail: gallery, price history, investment analysis, neighborhood dashboard, enquiry form
- `/agents`, `/agents/[id]` — agent directory and profile
- `/projects`, `/projects/[id]` — new developments from developers
- `/compare` — side-by-side comparison (up to 3 properties)
- `/tools/mortgage-calculator` — loan calculator with amortization chart
- `/insights`, `/insights/[suburb]` — public suburb price index
- `/dashboard/*` — saved properties, saved searches/alerts, notifications, profile
- `/login`, `/register` — auth forms (mocked)
- `/sell` — list-your-property flow for agents/owners

## Design system

Palette, type, and the "louvre-lines" signature motif (a nod to the
timber-louvre cross-ventilation screens of Sri Lankan tropical-modernist
architecture) are defined as CSS custom properties in
`src/app/globals.css`, exposed to Tailwind via `@theme inline`. Dark mode is
class-based (`useTheme()` from `src/providers/ThemeProvider.tsx`).
