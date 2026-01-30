import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";
import type { Ingredient } from "../../types/Recipe";

interface CookingIngredientsListProps {
  ingredients: Ingredient[];
}

export default function CookingIngredientsList({
  ingredients,
}: CookingIngredientsListProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleIngredient = (name: string) => {
    setChecked((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

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
      <div className="overflow-y-auto flex flex-col gap-2 pr-1">
        {ingredients.map((ingredient, index) => {
          const isChecked = checked[ingredient.item] ?? false;

          return (
            <button
              key={index}
              onClick={() => toggleIngredient(ingredient.item)}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50 transition"
            >
              {/* Left: Checkbox + Name */}
              <div className="flex items-center gap-3">
                {isChecked ? (
                  <CheckSquare size={18} className="text-green-500" />
                ) : (
                  <Square size={18} className="text-gray-400" />
                )}

                <span
                  className={`text-sm ${
                    isChecked
                      ? "line-through text-gray-400"
                      : "text-gray-800"
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
          );
        })}
      </div>
    </section>
  );
}