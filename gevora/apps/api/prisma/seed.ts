import { PrismaClient, Prisma } from "@prisma/client";
import { properties } from "../../../src/lib/mock-data.js";

const prisma = new PrismaClient();

const purposeMap = {
  buy: "BUY",
  rent: "RENT",
  land: "LAND",
  commercial: "COMMERCIAL",
  share: "SHARE",
} as const;

const typeMap = {
  house: "HOUSE",
  apartment: "APARTMENT",
  villa: "VILLA",
  luxury: "LUXURY",
  land: "LAND",
  commercial: "COMMERCIAL",
  warehouse: "WAREHOUSE",
  office: "OFFICE",
  agricultural: "AGRICULTURAL",
  holiday: "HOLIDAY",
} as const;

const statusMap = {
  active: "ACTIVE",
  under_offer: "UNDER_OFFER",
  sold: "SOLD",
  leased: "LEASED",
  withdrawn: "WITHDRAWN",
} as const;

const eventMap = {
  listed: "LISTED",
  price_change: "PRICE_CHANGE",
  sold: "SOLD",
  leased: "LEASED",
  withdrawn: "WITHDRAWN",
  relisted: "RELISTED",
} as const;

async function main() {
  for (const property of properties) {
    const listing = await prisma.listing.upsert({
      where: { id: property.id },
      update: {
        title: property.title,
        price: property.price,
        status: statusMap[property.status],
        updatedAt: new Date(),
      },
      create: {
        id: property.id,
        property: {
          create: {
            id: `property-${property.id}`,
            line1: property.address.line1,
            suburb: property.address.suburb,
            district: property.address.district,
            province: property.address.province,
            postalCode: property.address.postalCode,
            latitude: property.address.geo.lat,
            longitude: property.address.geo.lng,
            landSizePerches: property.landSizePerches,
            floorAreaSqft: property.floorAreaSqft,
            yearBuilt: property.yearBuilt,
          },
        },
        title: property.title,
        purpose: purposeMap[property.purpose],
        type: typeMap[property.type],
        status: statusMap[property.status],
        price: property.price,
        priceLabel: property.priceLabel,
        rentPeriod: property.rentPeriod,
        currency: property.currency,
        beds: property.beds,
        baths: property.baths,
        parking: property.parking,
        description: property.description,
        images: property.images,
        videoUrl: property.videoUrl,
        tourUrl: property.tourUrl,
        features: property.features,
        amenities: property.amenities,
        slFeatures: property.slFeatures,
        furnished: property.furnished,
        featured: property.featured,
        verified: property.verified,
        views: property.views,
        savedCount: property.savedCount,
        listedDate: new Date(property.listedDate),
      },
    });

    await prisma.priceHistory.deleteMany({ where: { listingId: listing.id } });
    await prisma.priceHistory.createMany({
      data: property.priceHistory.map((entry) => ({
        propertyId: listing.propertyId,
        listingId: listing.id,
        event: eventMap[entry.event],
        price: entry.price,
        note: entry.note,
        occurredAt: new Date(entry.date),
      })),
    });
    await prisma.$executeRaw(
      Prisma.sql`UPDATE "Property" SET "location" = ST_SetSRID(ST_MakePoint(${property.address.geo.lng}, ${property.address.geo.lat}), 4326)::geography WHERE "id" = ${listing.propertyId}`,
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
