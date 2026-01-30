import { Stars, Heart, Clock, ChefHat } from "lucide-react";
import { getRecipes } from "../../../utils/recipes";
import Hero from "../../../assets/hero.png"

interface Stats {
  favorites: number;
  quickMeals: number;
  avgTime: number; // in minutes
  totalRecipes: number;
}

export default function HeroSection() {
  const recipes = getRecipes();

  // Compute stats dynamically
  const stats: Stats = {
    totalRecipes: recipes.length,
    favorites: recipes.filter(r => r.isFavorite).length,
    quickMeals: recipes.filter(r => r.prepTime + r.cookTime <= 30).length,
    avgTime:
      recipes.length > 0
        ? Math.round(
            recipes.reduce((sum, r) => sum + (r.prepTime + r.cookTime), 0) /
              recipes.length
          )
        : 0,
  };

  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Hero Image */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={Hero}
        alt="Hero"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Centered Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pt-8 pb-8 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16 space-y-4 sm:space-y-6 md:space-y-8">
        {/* Dynamic Recipe Count */}
        <div className="text-sm sm:text-base md:text-lg text-white/80 flex items-center justify-center gap-2 border border-white/50 rounded-full px-4 py-2">
          <Stars />
          {stats.totalRecipes} Delicious recipes ready to cook
        </div>

        {/* Main title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug">
          Discover Your Next <br />
          <span className="text-green-400">Culinary Adventure</span>
        </h2>

        {/* Stats Row */}
        <div className="flex flex-row gap-4 sm:gap-8 text-white/90 text-sm sm:text-base justify-center">
          {/* Favorites */}
          <div className="flex flex-row items-center gap-2 justify-center">
            <Heart />
            <div className="flex flex-col items-center">
              <span className="font-bold">{stats.favorites}</span>
              <span>Favorites</span>
            </div>
          </div>

          {/* Quick Meals */}
          <div className="flex flex-row items-center gap-2 justify-center">
            <Clock />
            <div className="flex flex-col items-center">
              <span className="font-bold">{stats.quickMeals}</span>
              <span>Quick Meals</span>
            </div>
          </div>

          {/* Average Time */}
          <div className="flex flex-row items-center gap-2 justify-center">
            <ChefHat />
            <div className="flex flex-col items-center">
              <span className="font-bold">{stats.avgTime} min</span>
              <span>Avg Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}