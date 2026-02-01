import { useParams } from "react-router-dom";
import { getRecipes } from "../utils/recipes";
import RecipeCard from "../components/Home/RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../components/Shared/RecipeCardSkeleton/RecipeCardSkeleton";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import type { Recipe } from "../types/Recipe";

export default function QuickPicksPage() {
  const { type } = useParams<{ type: string }>();


  // Store filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const allRecipes = await Promise.resolve(getRecipes()); // simulate async

      let filtered = allRecipes;
      let titleText = "";

      if (type === "under-30") {
        filtered = allRecipes.filter(r => r.prepTime + r.cookTime <= 30);
        titleText = "Under 30 Minutes";
      } else if (type === "beginner") {
        filtered = allRecipes.filter(r => r.difficulty === "Easy");
        titleText = "Beginner Friendly";
      } else if (type === "favorites") {
        filtered = allRecipes.filter(r => r.isFavorite);
        titleText = "Favorites";
      } else if (type === "vegetarian") {
        filtered = allRecipes.filter(r =>
          r.tags?.some(tag => tag.toLowerCase() === "vegetarian")
        );
        titleText = "Vegetarian";
      } else if (type === "healthy") {
        filtered = allRecipes.filter(r =>
          r.tags?.some(tag => tag.toLowerCase() === "healthy")
        );
        titleText = "Healthy";
      }

      setFilteredRecipes(filtered);
      setTitle(titleText);
      setIsLoading(false);
    };

    fetchRecipes();
  }, [type]);

  return (
    <>
      {/* Header */}
      <section className="bg-orange-50 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Check size={24} className="text-green-500" />
            <h2 className="text-3xl font-semibold">{title}</h2>
          </div>
          {!isLoading && (
            <p className="text-sm text-gray-600">
              {filteredRecipes.length} recipe{filteredRecipes.length !== 1 && "s"}
            </p>
          )}
        </div>
      </section>

      {/* Recipe Cards */}
      <section className="py-10 px-4 flex justify-center">
        <div className="w-full max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, i) => <RecipeCardSkeleton key={i} />)}
            </div>
          ) : filteredRecipes.length === 0 ? (
            <p className="text-gray-500">No recipes found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
