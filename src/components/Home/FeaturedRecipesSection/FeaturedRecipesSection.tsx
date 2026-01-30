import { LucideArrowUpRight } from "lucide-react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { getRecipes } from "../../../utils/recipes";
import type { Recipe } from "../../../types/Recipe";

export default function FeaturedRecipesSection() {
  const recipes: Recipe[] = getRecipes();

  // Filter recipes marked as featured
  const featuredRecipes = recipes.filter((recipe) => recipe.isFeatured);

  if (featuredRecipes.length === 0) {
    return (
      <section className="flex justify-center bg-orange-50 py-10 px-4">
        <div className="w-full max-w-5xl flex flex-col items-center">
          <div className="text-gray-500">No featured recipes yet.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-center bg-orange-50 py-10 px-4">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center rounded-full bg-gray-200 p-1">
              <LucideArrowUpRight size={16} />
            </span>
            <h3 className="text-2xl text-left">Featured Recipes</h3>
          </div>
          <p className="text-left text-sm text-gray-600">
            Handpicked favorites to inspire your next meal
          </p>
        </div>

        {/* Recipe Cards */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
