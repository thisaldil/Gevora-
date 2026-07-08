import { Suspense } from "react";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata = { title: "Properties for rent | Gevora" };

export default function RentPage() {
  return (
    <Suspense>
      <SearchResults purpose="rent" heading="Properties for rent in Sri Lanka" />
    </Suspense>
  );
}
