import type { Agent, Developer, Project, Property, SuburbStats } from "./types";

const apartmentImages = [
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
  "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
  "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
];

const img = (seed: string) => {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return apartmentImages[Math.abs(hash) % apartmentImages.length];
};

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Nadeesha Perera",
    agency: "Lanka Prime Realty",
    avatarUrl: img("nadeesha", 200, 200),
    phone: "+94 77 123 4567",
    whatsapp: "+94771234567",
    responseRate: 96,
    yearsExperience: 9,
    rating: 4.8,
    reviewCount: 142,
    activeListings: 24,
    soldCount: 210,
    verified: true,
  },
  {
    id: "a2",
    name: "Ruwan Fernando",
    agency: "Colombo Estates Group",
    avatarUrl: img("ruwan", 200, 200),
    phone: "+94 71 987 6543",
    whatsapp: "+94719876543",
    responseRate: 89,
    yearsExperience: 5,
    rating: 4.5,
    reviewCount: 71,
    activeListings: 15,
    soldCount: 88,
    verified: true,
  },
  {
    id: "a3",
    name: "Ishara Wickramasinghe",
    agency: "Southern Coast Properties",
    avatarUrl: img("ishara", 200, 200),
    phone: "+94 76 555 2211",
    whatsapp: "+94765552211",
    responseRate: 92,
    yearsExperience: 12,
    rating: 4.9,
    reviewCount: 203,
    activeListings: 31,
    soldCount: 340,
    verified: true,
  },
  {
    id: "a4",
    name: "Dilshan Gunasekara",
    agency: "Hill Country Homes",
    avatarUrl: img("dilshan", 200, 200),
    phone: "+94 70 444 8899",
    responseRate: 78,
    yearsExperience: 3,
    rating: 4.2,
    reviewCount: 19,
    activeListings: 8,
    soldCount: 22,
    verified: false,
  },
];

export const developers: Developer[] = [
  {
    id: "d1",
    name: "Monsoon Heights Developments",
    logoUrl: img("monsoon-logo", 200, 200),
    founded: 2009,
    completedProjects: 11,
    activeProjects: 3,
  },
  {
    id: "d2",
    name: "Cinnamon Grove Living",
    logoUrl: img("cinnamon-logo", 200, 200),
    founded: 2015,
    completedProjects: 4,
    activeProjects: 2,
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    developerId: "d1",
    name: "Monsoon Heights Residences",
    location: "Rajagiriya, Colombo",
    suburb: "Rajagiriya",
    status: "under_construction",
    priceFrom: 32_000_000,
    completionDate: "2027-06-01",
    units: 128,
    coverImage: img("monsoon-heights", 1400, 900),
    images: [img("mh-1"), img("mh-2"), img("mh-3")],
  },
  {
    id: "p2",
    developerId: "d2",
    name: "Cinnamon Grove Residencies",
    location: "Havelock Town, Colombo",
    suburb: "Havelock Town",
    status: "upcoming",
    priceFrom: 28_500_000,
    completionDate: "2028-01-01",
    units: 96,
    coverImage: img("cinnamon-grove", 1400, 900),
    images: [img("cg-1"), img("cg-2"), img("cg-3")],
  },
];

const baseFeatures = [
  "Swimming pool",
  "Solar power",
  "Furnished",
  "Air conditioning",
  "Pet friendly",
  "24hr water supply",
  "Servant quarters",
  "Backup generator",
  "CCTV security",
  "Fibre internet ready",
];

const slFeaturePool = [
  "Beach front",
  "Lake view",
  "Mountain view",
  "Tea estate",
  "Coconut estate",
  "River front",
  "Corner property",
  "Paddy field view",
];

function pick<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
}

const suburbSeed: { suburb: string; district: string; province: string; geo: { lat: number; lng: number } }[] = [
  { suburb: "Colombo 07 - Cinnamon Gardens", district: "Colombo", province: "Western", geo: { lat: 6.9061, lng: 79.8636 } },
  { suburb: "Rajagiriya", district: "Colombo", province: "Western", geo: { lat: 6.9083, lng: 79.8944 } },
  { suburb: "Nugegoda", district: "Colombo", province: "Western", geo: { lat: 6.8649, lng: 79.8997 } },
  { suburb: "Battaramulla", district: "Colombo", province: "Western", geo: { lat: 6.8996, lng: 79.9187 } },
  { suburb: "Negombo", district: "Gampaha", province: "Western", geo: { lat: 7.2083, lng: 79.8358 } },
  { suburb: "Mount Lavinia", district: "Colombo", province: "Western", geo: { lat: 6.8389, lng: 79.8653 } },
  { suburb: "Kandy City", district: "Kandy", province: "Central", geo: { lat: 7.2906, lng: 80.6337 } },
  { suburb: "Galle Fort", district: "Galle", province: "Southern", geo: { lat: 6.0269, lng: 80.217 } },
  { suburb: "Unawatuna", district: "Galle", province: "Southern", geo: { lat: 6.0104, lng: 80.2489 } },
  { suburb: "Nuwara Eliya", district: "Nuwara Eliya", province: "Central", geo: { lat: 6.9497, lng: 80.7891 } },
  { suburb: "Jaffna Town", district: "Jaffna", province: "Northern", geo: { lat: 9.6615, lng: 80.0255 } },
  { suburb: "Bentota", district: "Kalutara", province: "Western", geo: { lat: 6.4258, lng: 79.9958 } },
];

const titleBySL = (type: string, suburb: string) => `${type} in ${suburb}`;

const propertyTypesForPurpose: Record<string, string[]> = {
  buy: ["house", "apartment", "villa", "luxury"],
  rent: ["house", "apartment", "villa"],
  land: ["land", "agricultural"],
  commercial: ["commercial", "office", "warehouse"],
};

function generateProperties(): Property[] {
  const list: Property[] = [];
  let counter = 1;

  const purposes: Array<"buy" | "rent" | "land" | "commercial"> = ["buy", "rent", "land", "commercial"];

  purposes.forEach((purpose) => {
    const types = propertyTypesForPurpose[purpose];
    for (let i = 0; i < 18; i++) {
      const loc = suburbSeed[i % suburbSeed.length];
      const type = types[i % types.length] as Property["type"];
      const beds = type === "land" || type === "commercial" || type === "warehouse" ? 0 : 2 + (i % 4);
      const baths = beds > 0 ? Math.max(1, beds - 1) : 0;
      const basePrice =
        purpose === "rent"
          ? 45_000 + i * 8_500
          : purpose === "land"
          ? 4_500_000 + i * 900_000
          : purpose === "commercial"
          ? 25_000_000 + i * 3_200_000
          : 12_000_000 + i * 4_100_000;

      const id = `${purpose}-${counter++}`;
      const listedDaysAgo = i * 3 + 1;
      const listedDate = new Date(Date.now() - listedDaysAgo * 86400000).toISOString();

      list.push({
        id,
        title: titleBySL(
          type === "land" ? "Land" : type[0].toUpperCase() + type.slice(1),
          loc.suburb
        ),
        purpose,
        type,
        status: "active",
        price: basePrice,
        rentPeriod: purpose === "rent" ? "month" : undefined,
        currency: "LKR",
        beds,
        baths,
        parking: beds > 0 ? Math.min(3, Math.floor(beds / 2) + 1) : 0,
        landSizePerches: type === "land" ? 8 + i : 6 + (i % 10),
        floorAreaSqft: beds > 0 ? 900 + beds * 350 : undefined,
        yearBuilt: beds > 0 ? 2005 + (i % 18) : undefined,
        address: {
          line1: `No. ${12 + i}, ${loc.suburb} Road`,
          suburb: loc.suburb,
          district: loc.district,
          province: loc.province,
          geo: {
            lat: loc.geo.lat + (Math.random() - 0.5) * 0.01,
            lng: loc.geo.lng + (Math.random() - 0.5) * 0.01,
          },
        },
        images: [
          img(`${id}-1`, 1400, 900),
          img(`${id}-2`, 1400, 900),
          img(`${id}-3`, 1400, 900),
          img(`${id}-4`, 1400, 900),
        ],
        description: `A well-presented ${type} located in the heart of ${loc.suburb}, offering easy access to schools, hospitals and the main expressway. Ideal for ${
          purpose === "rent" ? "tenants" : "buyers"
        } looking for a move-in-ready property with strong ${purpose === "land" ? "development potential" : "rental appeal"}.`,
        features: pick(baseFeatures, 4 + (i % 3)),
        amenities: pick(
          ["Schools nearby", "Hospitals nearby", "Banks nearby", "Restaurants nearby", "Public transport", "Shopping mall nearby"],
          3
        ),
        slFeatures: pick(slFeaturePool, i % 3),
        agent: agents[i % agents.length],
        verified: i % 3 !== 0,
        featured: i % 5 === 0,
        views: 120 + i * 37,
        savedCount: 4 + (i % 22),
        listedDate,
        priceHistory: [
          { date: listedDate, event: "listed", price: basePrice },
          ...(i % 4 === 0
            ? [
                {
                  date: new Date(Date.now() - Math.max(1, listedDaysAgo - 10) * 86400000).toISOString(),
                  event: "price_change" as const,
                  price: Math.round(basePrice * 1.05),
                },
              ]
            : []),
        ],
        furnished: purpose === "rent" ? i % 2 === 0 : undefined,
      });
    }
  });

  return list;
}

export const properties: Property[] = generateProperties();

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export const suburbStats: SuburbStats[] = suburbSeed.map((loc, i) => ({
  suburb: loc.suburb,
  district: loc.district,
  medianSalePrice: 18_000_000 + i * 3_400_000,
  medianRentPrice: 65_000 + i * 9_000,
  priceChange12mo: Math.round((Math.random() * 18 - 4) * 10) / 10,
  rentalYield: Math.round((3 + Math.random() * 3) * 10) / 10,
  daysOnMarket: 20 + i * 4,
  demandLevel: (["medium", "high", "very high", "low"] as const)[i % 4],
  history: [2021, 2022, 2023, 2024, 2025, 2026].map((year, idx) => ({
    year,
    median: Math.round((14_000_000 + i * 2_800_000) * (1 + idx * 0.055)),
  })),
}));

export function getSuburbStats(suburb: string): SuburbStats | undefined {
  return suburbStats.find((s) => s.suburb === suburb);
}
