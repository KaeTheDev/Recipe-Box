import HeroSection from "../components/HeroSection/HeroSection";
import QuickPickSection from "../components/QuickPickSection/QuickPickSection";
import FeaturedRecipesSection from "../components/FeaturedRecipesSection/FeaturedRecipesSection";
import ExploreCuisineSection from "../components/ExploreCuisineSection/ExploreCuisineSection";
import AllRecipesSection from "../components/AllRecipesSection/AllRecipesSection";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <HeroSection />

      {/* Quick Picks */}
      <QuickPickSection />

      {/* Featured Recipes */}
      <FeaturedRecipesSection />

      {/* Explore by Cuisine */}
      <ExploreCuisineSection />

      {/* All Recipes */}
      <AllRecipesSection />
    </main>
  );
}