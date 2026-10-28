CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TYPE "ListingPurpose" AS ENUM ('BUY', 'RENT', 'LAND', 'COMMERCIAL', 'SHARE');
CREATE TYPE "PropertyType" AS ENUM ('HOUSE', 'APARTMENT', 'VILLA', 'LUXURY', 'LAND', 'COMMERCIAL', 'WAREHOUSE', 'OFFICE', 'AGRICULTURAL', 'HOLIDAY');
CREATE TYPE "ListingStatus" AS ENUM ('ACTIVE', 'UNDER_OFFER', 'SOLD', 'LEASED', 'WITHDRAWN');
CREATE TYPE "PriceHistoryEvent" AS ENUM ('LISTED', 'PRICE_CHANGE', 'SOLD', 'LEASED', 'WITHDRAWN', 'RELISTED');
CREATE TYPE "Currency" AS ENUM ('LKR', 'USD');

CREATE TABLE "Property" (
  "id" TEXT NOT NULL,
  "line1" TEXT NOT NULL,
  "suburb" TEXT NOT NULL,
  "district" TEXT NOT NULL,
  "province" TEXT NOT NULL,
  "postalCode" TEXT,
  "latitude" DECIMAL(9,6) NOT NULL,
  "longitude" DECIMAL(9,6) NOT NULL,
  "location" geography(Point,4326),
  "landSizePerches" DECIMAL(12,2),
  "floorAreaSqft" DECIMAL(12,2),
  "yearBuilt" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Listing" (
  "id" TEXT NOT NULL,
  "propertyId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "purpose" "ListingPurpose" NOT NULL,
  "type" "PropertyType" NOT NULL,
  "status" "ListingStatus" NOT NULL DEFAULT 'ACTIVE',
  "price" DECIMAL(18,2) NOT NULL,
  "priceLabel" TEXT,
  "rentPeriod" TEXT,
  "currency" "Currency" NOT NULL DEFAULT 'LKR',
  "beds" INTEGER NOT NULL DEFAULT 0,
  "baths" INTEGER NOT NULL DEFAULT 0,
  "parking" INTEGER NOT NULL DEFAULT 0,
  "description" TEXT NOT NULL,
  "images" TEXT[] NOT NULL,
  "videoUrl" TEXT,
  "tourUrl" TEXT,
  "features" TEXT[] NOT NULL,
  "amenities" TEXT[] NOT NULL,
  "slFeatures" TEXT[] NOT NULL,
  "furnished" BOOLEAN,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "views" INTEGER NOT NULL DEFAULT 0,
  "savedCount" INTEGER NOT NULL DEFAULT 0,
  "listedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PriceHistory" (
  "id" TEXT NOT NULL,
  "propertyId" TEXT NOT NULL,
  "listingId" TEXT,
  "event" "PriceHistoryEvent" NOT NULL,
  "price" DECIMAL(18,2),
  "note" TEXT,
  "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Property_suburb_idx" ON "Property"("suburb");
CREATE INDEX "Property_district_idx" ON "Property"("district");
CREATE INDEX "Listing_purpose_status_idx" ON "Listing"("purpose", "status");
CREATE INDEX "Listing_price_idx" ON "Listing"("price");
CREATE INDEX "Listing_beds_idx" ON "Listing"("beds");
CREATE INDEX "PriceHistory_propertyId_occurredAt_idx" ON "PriceHistory"("propertyId", "occurredAt");
CREATE INDEX "Property_suburb_trgm_idx" ON "Property" USING GIN ("suburb" gin_trgm_ops);
CREATE INDEX "Property_district_trgm_idx" ON "Property" USING GIN ("district" gin_trgm_ops);
CREATE INDEX "Property_location_gist_idx" ON "Property" USING GIST ("location");

ALTER TABLE "Listing" ADD CONSTRAINT "Listing_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Property" ADD CONSTRAINT "Property_sri_lanka_latitude_check" CHECK ("latitude" BETWEEN 5.8 AND 9.9);
ALTER TABLE "Property" ADD CONSTRAINT "Property_sri_lanka_longitude_check" CHECK ("longitude" BETWEEN 79.4 AND 81.9);
