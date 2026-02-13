import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";
import type { Ingredient } from "../../../types/Recipe";

interface CookingIngredientsListProps {
  ingredients: Ingredient[];
}

export default function CookingIngredientsList({
  ingredients,
}: CookingIngredientsListProps) {

  // object with a string key, boolean value
  // "rice": true
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleIngredient = (name: string) => {
    // Update the "checked" state using the previous state
    setChecked((prev) => ({
        // Copy all previous key-value pairs so nothing else is lost
      ...prev,
       // Toggle the value for the ingredient that was clicked:
    // - If it was true, becomes false
    // - If it was false or undefined, becomes true
      [name]: !prev[name],
    }));
  };
// Keep values that are truthy
// Get count, store in completedCount
  const completedCount = Object.values(checked).filter(Boolean).length;
  const totalCount = ingredients.length;

  return (
    <section className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 max-h-[60vh]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ingredients</h2>
        <span className="text-sm text-gray-500">
          {completedCount} / {totalCount}
        </span>
      </div>

      {/* Ingredients List */}
      <ul className="overflow-y-auto flex flex-col gap-2 pr-1" aria-label="Cooking Ingredients">
        {ingredients.map((ingredient, index) => {
          // check if item is true or false
          // store in isChecked
          const isChecked = checked[ingredient.item] ?? false;

          return (
            <li key={index}>
              <button
                onClick={() => toggleIngredient(ingredient.item)}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50 transition"
                aria-pressed={isChecked}
                aria-label={`${isChecked ? "Uncheck" : "Check"} ingredient: ${ingredient.item}`}
              >
                {/* Left: Checkbox + Name */}
                <div className="flex items-center gap-3">
                  {isChecked ? (
                    <CheckSquare size={18} className="text-green-500" aria-hidden="true" />
                  ) : (
                    <Square size={18} className="text-gray-400" aria-hidden="true" />
                  )}

                  <span
                    className={`text-sm ${
                      isChecked ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {ingredient.item}
                  </span>
                </div>

                {/* Right: Quantity */}
                {(ingredient.quantity || ingredient.unit) && (
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}