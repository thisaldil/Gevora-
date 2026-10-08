import { Suspense } from "react";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata = { title: "Commercial property | Gevora" };

export default function CommercialPage() {
  return (
    <Suspense>
      <SearchResults purpose="commercial" heading="Commercial property in Sri Lanka" />
    </Suspense>
  );
}
