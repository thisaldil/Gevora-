# Gevora

## Sri Lanka's modern property platform

Gevora is a full-stack real-estate platform designed for the Sri Lankan market. It brings property discovery, market insights, agent profiles, new developments, saved searches, and enquiry workflows into one focused experience.

![Gevora property portal](ss/image.png)

## Product overview

The application helps buyers, renters, owners, agents, and developers move from discovery to decision with:

- Property search across homes, apartments, land, and commercial spaces
- Filterable listing results with list, map, and split-view experiences
- Detailed property pages with galleries, price history, investment analysis, and neighbourhood information
- Agent and developer directories with profile pages
- New-development discovery and project pages
- Saved properties, saved searches, alerts, comparison, and account dashboards
- Mortgage calculation and public suburb price insights
- Property enquiry and list-your-property workflows
- Introductory video splash experience powered by `public/intro.mp4`

## Highlights

- Sri Lanka-focused property catalogue and location model
- Responsive, editorial interface built for desktop and mobile
- Class-based light and dark theme support
- Google Maps integration with a static fallback when an API key is unavailable
- Mock API layer that keeps the frontend immediately runnable
- Backend foundation ready for PostgreSQL, PostGIS, Redis, and Elasticsearch
- Self-hosted fonts with no external font-network dependency

## Technology

| Area | Technology |
| --- | --- |
| Frontend | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion |
| Client state | Zustand |
| Data fetching | TanStack Query |
| Forms and validation | React Hook Form, Zod |
| Maps and charts | Google Maps JavaScript API, Recharts |
| Backend | Fastify 5, Prisma |
| Data services | PostgreSQL 16, PostGIS, Redis, Elasticsearch |
| Fonts | Fraunces, Manrope, IBM Plex Mono |
| Package manager | pnpm |

## Project structure

```text
.
├── gevora/
│   ├── src/                 # Next.js application source
│   ├── public/              # Static assets, including intro.mp4
│   ├── apps/api/            # Fastify API and Prisma schema
│   ├── docker-compose.yml   # PostgreSQL, Redis, and Elasticsearch
│   └── package.json
└── ss/                      # Project screenshots
```

## Getting started

### Prerequisites

- Node.js 20 or newer
- pnpm
- Docker Desktop (required for the backend services)

### Run the frontend

```bash
cd gevora
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run the backend services

From the `gevora` directory:

```bash
docker compose up -d
pnpm --filter @gevora/api db:generate
pnpm --filter @gevora/api db:migrate
pnpm --filter @gevora/api db:seed
pnpm --filter @gevora/api dev
```

The API health endpoint is available at [http://localhost:4000/health](http://localhost:4000/health).

For API-specific configuration and development details, see [`gevora/apps/api/README.md`](gevora/apps/api/README.md).

## Configuration

Frontend environment variables are optional. Create `gevora/.env.local` when you need integrations:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
NEXT_PUBLIC_API_BASE_URL=
```

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` enables interactive Google Maps.
- Cloudinary variables enable production image hosting instead of mock image URLs.
- `NEXT_PUBLIC_API_BASE_URL` is reserved for connecting the frontend to the Fastify API.

The backend environment template is available at [`gevora/apps/api/.env.example`](gevora/apps/api/.env.example).

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage, hero search, featured listings, and market highlights |
| `/buy`, `/rent`, `/land`, `/commercial` | Search and browse property listings |
| `/property/[id]` | Property details and enquiry flow |
| `/agents` and `/agents/[id]` | Agent directory and profiles |
| `/projects` and `/projects/[id]` | New developments |
| `/compare` | Compare up to three properties |
| `/tools/mortgage-calculator` | Mortgage and amortisation calculator |
| `/insights` and `/insights/[suburb]` | Suburb market insights |
| `/dashboard/*` | Saved properties, searches, alerts, and profile |
| `/sell` | List-your-property workflow |

## Architecture notes

Frontend data access is centralised in [`gevora/src/lib/api.ts`](gevora/src/lib/api.ts), allowing the mock implementation to be replaced with REST requests without changing the TanStack Query hooks or page components.

The domain model separates permanent `Property` records from time-bound `Listing` records. This mirrors the Prisma schema and provides a clear path for supporting listing history, market analytics, and multiple listing events for the same physical asset.

## Development commands

Run these commands from `gevora/`:

```bash
pnpm dev          # Start the Next.js development server
pnpm build        # Create a production build
pnpm start        # Start the production server
pnpm lint         # Run ESLint
pnpm typecheck    # Type-check the frontend and API
```

## Status

Gevora is an actively developed product foundation. The frontend is fully runnable with mock data, while the Fastify and Prisma backend provides the foundation for production persistence, authentication, search, enquiries, and background processing.
