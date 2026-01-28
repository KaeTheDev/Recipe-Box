import CuisineCard from "../components/CuisineCard/CuisineCard";
import FeaturedRecipesSection from "../components/FeaturedRecipesSection/FeaturedRecipesSection";
import HeroSection from "../components/HeroSection/HeroSection";
import QuickPickSection from "../components/QuickPickSection/QuickPickSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 mb-5">
        <QuickPickSection />
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-gray-50">
        <FeaturedRecipesSection />
      </section>

      <CuisineCard />
    </main>
  );
}