import { LucideArrowUpRight } from "lucide-react";
import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../../Shared/RecipeCardSkeleton/RecipeCardSkeleton";
import { getRecipes } from "../../../utils/recipes";
import type { Recipe } from "../../../types/Recipe";
import { useState, useEffect } from "react";

export default function FeaturedRecipesSection() {
  // simulate loading
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchedRecipes = getRecipes();
    setRecipes(fetchedRecipes);
    // simulate async delay
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const featuredRecipes = recipes.filter(r => r.isFeatured);

  return (
    <section className="bg-orange-50 dark:bg-orange-900 py-10 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 p-1">
              <LucideArrowUpRight size={16} />
            </span>
            <h3 className="text-2xl text-gray-900 dark:text-gray-100">
              Featured Recipes
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Handpicked favorites to inspire your next meal
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading
          // Visual only so hardcoded
            ? Array(4)
                .fill(0)
                .map((_, i) => <RecipeCardSkeleton key={i} />)
            : featuredRecipes.length > 0
            ? featuredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-300">
                No featured recipes yet.
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
