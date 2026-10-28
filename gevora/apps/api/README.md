# Gevora API

Fastify API foundation for the Gevora real-estate portal.

## Local development

1. Copy `.env.example` to `.env` and set `JWT_SECRET` to a value of at least 32 characters.
2. Start the development services from the repository root:

   ```bash
   docker compose up -d
   ```

3. Generate the Prisma client and apply the initial migration:

   ```bash
   pnpm --filter @gevora/api db:generate
   pnpm --filter @gevora/api db:migrate
   pnpm --filter @gevora/api db:seed
   ```

4. Start the API:

   ```bash
   pnpm --filter @gevora/api dev
   ```

The health endpoint is available at `GET http://localhost:4000/health`.

The seed imports the frontend mock catalog and keeps physical `Property` records
separate from time-bound `Listing` records. PostgreSQL remains the source of
truth; the Redis and Elasticsearch services are provisioned for later phases.
