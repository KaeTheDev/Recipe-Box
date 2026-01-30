import { LucideArrowUpRight } from "lucide-react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { getRecipes } from "../../../utils/recipes";
import type { Recipe } from "../../../types/Recipe";

export default function FeaturedRecipesSection() {
  const recipes: Recipe[] = getRecipes();
  const featuredRecipes = recipes.filter(r => r.isFeatured);

  if (featuredRecipes.length === 0) {
    return (
      <section className="bg-orange-50 py-10 px-4">
        <div className="mx-auto max-w-5xl text-center text-gray-500">
          No featured recipes yet.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-orange-50 py-10 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center rounded-full bg-gray-200 p-1">
              <LucideArrowUpRight size={16} />
            </span>
            <h3 className="text-2xl">Featured Recipes</h3>
          </div>
          <p className="text-sm text-gray-600">
            Handpicked favorites to inspire your next meal
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}