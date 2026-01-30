import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecipes } from "../customHooks/useRecipes";
import RecipeDetailHero from "../components/RecipeDetail/RecipeDetailHero/RecipeDetailHero";
import RecipeDetails from "../components/RecipeDetail/RecipeDetails/RecipeDetails";
import RecipeInstructions from "../components/RecipeDetail/RecipeInstructions/RecipeInstructions";
import RecipeIngredients from "../components/RecipeDetail/RecipeIngredients/RecipeIngredients";
import RecipeActions from "../components/RecipeDetail/RecipeActions/RecipeActions";
import type { Recipe } from "../types/Recipe";

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { recipes } = useRecipes();

  const recipe = recipes.find((r: Recipe) => r.id === id);

  const [currentServings, setCurrentServings] = useState(
    recipe?.servings ?? 1
  );

  if (!recipe) {
    return <p className="p-6 text-gray-600">Recipe Not Found</p>;
  }

  return (
    <div className="min-h-screen bg-[#fff7f0]">
      {/* Hero */}
      <RecipeDetailHero recipe={recipe} />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 pb-16">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col gap-6">
            <RecipeDetails
              recipe={recipe}
              currentServings={currentServings}
              onServingsChange={setCurrentServings}
            />

            <RecipeInstructions recipe={recipe} />

            {/* NOTES SECTION */}
            {recipe.notes && recipe.notes.trim() !== "" && (
              <section className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Notes</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {recipe.notes}
                </p>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <aside className="w-full lg:w-[320px] flex flex-col gap-6 lg:mt-6">
            <RecipeActions recipe={recipe} />
            <RecipeIngredients
              recipe={recipe}
              currentServings={currentServings}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
