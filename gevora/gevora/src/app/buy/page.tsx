import { Suspense } from "react";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata = { title: "Properties for sale | Gevora" };

export default function BuyPage() {
  return (
    <Suspense>
      <SearchResults purpose="buy" heading="Properties for sale in Sri Lanka" />
    </Suspense>
  );
}
