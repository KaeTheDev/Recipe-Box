import { useSearchParams } from "react-router-dom";
import { getRecipes } from "../utils/recipes";
import RecipeCard from "../components/RecipeCard/RecipeCard";

export default function CuisineRecipesPage() {
  const [searchParams] = useSearchParams();
  const cuisine = searchParams.get("cuisine");

  const recipes = getRecipes();

  const filteredRecipes = cuisine
    ? recipes.filter((recipe) => recipe.cuisine === cuisine)
    : recipes;

  return (
    <main className="py-10 px-4 flex justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-semibold mb-2">
          {cuisine ?? "All Recipes"}
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          {filteredRecipes.length} recipe
          {filteredRecipes.length !== 1 && "s"} found
        </p>

        {filteredRecipes.length === 0 ? (
          <p className="text-gray-500">No recipes found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}