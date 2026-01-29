import { useSearchParams } from "react-router-dom";
import { getRecipes } from "../utils/recipes";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { ForkKnife } from "lucide-react";

export default function CuisineRecipesPage() {
  const [searchParams] = useSearchParams();
  const cuisine = searchParams.get("cuisine");

  const recipes = getRecipes();

  const filteredRecipes = cuisine
    ? recipes.filter((recipe) => recipe.cuisine === cuisine)
    : recipes;

  return (
    <>
      {/* Header Section */}
      <section className="bg-orange-50 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ForkKnife size={24} className="text-orange-500" />
            <h2 className="text-3xl font-semibold">
              {cuisine ?? "All Recipes"}
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            {filteredRecipes.length} recipe
            {filteredRecipes.length !== 1 && "s"} found
          </p>
        </div>
      </section>

      {/* Recipe Cards */}
      <main className="py-10 px-4 flex justify-center">
        <div className="w-full max-w-6xl">
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
    </>
  );
}