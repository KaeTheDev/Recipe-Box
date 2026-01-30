import { ChefHat } from "lucide-react";
import type { Recipe } from "../../../types/Recipe";

interface RecipeIngredientsProps {
  recipe: Recipe;
  currentServings: number;
}

export default function RecipeIngredients({
  recipe,
  currentServings,
}: RecipeIngredientsProps) {
  if (!recipe) return null;

  const factor = currentServings / recipe.servings;

  const formatQuantity = (quantity: number) => {
    const rounded = Math.round(quantity * 10) / 10;
    return rounded;
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-0.5">
        <ChefHat size={20} className="text-orange-500" />
        <h2 className="text-2xl font-semibold">Ingredients</h2>
      </div>

      <p className="text-xs sm:text-sm text-gray-500">
        Adjusted for {currentServings} servings (original {recipe.servings})
      </p>

      {/* Ingredients List */}
      <div className="flex flex-col gap-2">
        {recipe.ingredients.map((ingredient, idx) => {
          let displayQuantity: string | number | null = null;

          if (typeof ingredient.quantity === "number") {
            const scaled = ingredient.quantity * factor;
            displayQuantity = formatQuantity(scaled);
          } else if (typeof ingredient.quantity === "string") {
            // leave string quantities as-is (e.g., "1 pinch")
            displayQuantity = ingredient.quantity;
          }

          return (
            <div key={idx} className="flex items-start gap-3">
              {/* Step number with orange background */}
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
                {idx + 1}
              </span>
              <p className="text-sm sm:text-base text-gray-700">
                {ingredient.item}
                {displayQuantity !== null &&
                  `: ${displayQuantity} ${ingredient.unit}`}
                {ingredient.note && (
                  <span className="text-gray-500 text-xs"> ({ingredient.note})</span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}