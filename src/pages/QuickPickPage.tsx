import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../customHooks/useRecipes";
import RecipeCard from "../components/Home/RecipeCard/RecipeCard";
import { Check } from "lucide-react";
import type { Recipe } from "../types/Recipe";

export default function QuickPicksPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  const { recipes } = useRecipes();

  let filtered: Recipe[] = recipes;
  let title = "";

  if (type === "under-30") {
    filtered = recipes.filter(
      recipe => recipe.prepTime + recipe.cookTime <= 30
    );
    title = "Under 30 Minutes";
  } else if (type === "beginner") {
    filtered = recipes.filter(recipe => recipe.difficulty === "Easy");
    title = "Beginner Friendly";
  } else if (type === "favorites") {
    filtered = recipes.filter(recipe => recipe.isFavorite);
    title = "Favorites";
  } else if (type === "vegetarian") {
    filtered = recipes.filter(recipe =>
      recipe.tags?.some(tag => tag.toLowerCase() === "vegetarian")
    );
    title = "Vegetarian";
  } else if (type === "healthy") {
    filtered = recipes.filter(recipe =>
      recipe.tags?.some(tag => tag.toLowerCase() === "healthy")
    );
    title = "Healthy";
  }

  return (
    <>
      {/* Header */}
      <section className="bg-orange-50 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Check size={24} className="text-green-500" />
            <h2 className="text-3xl font-semibold">{title}</h2>
          </div>
          <p className="text-sm text-gray-600">
            {filtered.length} recipe{filtered.length !== 1 && "s"}
          </p>
        </div>
      </section>
  
      {/* Recipes List or Empty State */}
      <section className="flex justify-center px-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-10 gap-4 px-6 py-8 bg-white rounded-lg shadow-md max-w-md w-full">
            <Check size={36} className="text-green-500" />
            <h3 className="text-2xl font-semibold">No recipes found</h3>
            <p className="text-sm text-gray-600">
              Sorry, we couldn't find any recipes matching this category.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-500 py-3 px-6 text-white rounded-md hover:bg-green-600 transition"
            >
              Browse Recipes
            </button>
          </div>
        ) : (
          <>
            {/* matches Favorites layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-6">
              {filtered.map((recipe: Recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}  