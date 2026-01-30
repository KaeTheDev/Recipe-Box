import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Recipe } from "../types/Recipe";
import { getRecipeById } from "../utils/recipes";

import CookingModeHeader from "../components/CookingModeHeader/CookingModeHeader";
import CookingIngredientsList from "../components/CookingIngredientsList/CookingIngredientsList";

export default function CookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Pull recipe from localStorage
  const recipe = getRecipeById(id ?? "") as Recipe | undefined;

  const [showIngredients, setShowIngredients] = useState(true);
  const [completedSteps, setCompletedSteps] = useState(0);

  if (!recipe) {
    return (
      <div className="p-6 text-center text-gray-600">
        Recipe not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4">
      {/* Header */}
      <CookingModeHeader
        recipeName={recipe.name}
        totalSteps={recipe.instructions.length}
        completedSteps={completedSteps}
        showIngredients={showIngredients}
        onBack={() => navigate(-1)}
        onToggleIngredients={() =>
          setShowIngredients(prev => !prev)
        }
      />

      {/* Ingredients List (toggleable) */}
      {showIngredients && (
        <CookingIngredientsList ingredients={recipe.ingredients} />
      )}

    </div>
  );
}