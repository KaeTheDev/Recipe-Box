import HeroSection from "../components/Home/HeroSection/HeroSection";
import QuickPickSection from "../components/QuickPick/QuickPickSection/QuickPickSection";
import FeaturedRecipesSection from "../components/Home/FeaturedRecipesSection/FeaturedRecipesSection";
import ExploreCuisineSection from "../components/Cuisine/ExploreCuisineSection/ExploreCuisineSection";
import AllRecipesSection from "../components/Home/AllRecipesSection/AllRecipesSection";

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