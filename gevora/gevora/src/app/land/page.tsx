import { Suspense } from "react";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata = { title: "Land for sale | Gevora" };

export default function LandPage() {
  return (
    <Suspense>
      <SearchResults purpose="land" heading="Land for sale in Sri Lanka" />
    </Suspense>
  );
}
