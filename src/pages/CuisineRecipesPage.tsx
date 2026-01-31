import { useSearchParams } from "react-router-dom";
import { getRecipes } from "../utils/recipes";
import RecipeCard from "../components/Home/RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../components/Shared/RecipeCardSkeleton/RecipeCardSkeleton";
import { ForkKnife } from "lucide-react";
import { useState, useEffect } from "react";
import type { Recipe } from "../types/Recipe";

export default function CuisineRecipesPage() {
  const [searchParams] = useSearchParams();
  const cuisine = searchParams.get("cuisine");

  // Store all recipes and filtered recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const allRecipes = await Promise.resolve(getRecipes()); // simulate async
      setRecipes(allRecipes);
      setFilteredRecipes(
        cuisine ? allRecipes.filter(r => r.cuisine === cuisine) : allRecipes
      );
      setIsLoading(false);
    };
  
    fetchRecipes();
  }, [cuisine]);
  

  // Filter recipes whenever cuisine or recipes change
  useEffect(() => {
    setFilteredRecipes(
      cuisine
        ? recipes.filter(r => r.cuisine === cuisine)
        : recipes
    );
  }, [cuisine, recipes]);

  return (
    <>
      {/* Header Section */}
      <section className="bg-orange-50 dark:bg-orange-900 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ForkKnife size={24} className="text-orange-500" />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {cuisine ?? "All Recipes"}
            </h2>
          </div>
          {!isLoading && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {filteredRecipes.length} recipe
              {filteredRecipes.length !== 1 && "s"} found
            </p>
          )}
        </div>
      </section>

      {/* Recipe Cards */}
      <main className="py-10 px-4 flex justify-center">
        <div className="w-full max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, i) => <RecipeCardSkeleton key={i} />)}
            </div>
          ) : filteredRecipes.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No recipes found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}