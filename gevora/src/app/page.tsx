import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedCarousel />
      <InsightsTeaser />
      <ProjectsTeaser />
    </>
  );
}
