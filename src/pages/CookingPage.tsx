import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CookingModeHeader from "../components/CookingModeHeader/CookingModeHeader";
import { getRecipes } from "../utils/recipes";
import type { Recipe } from "../types/Recipe";

export default function CookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);

  useEffect(() => {
    const recipes = getRecipes();
    const found = recipes.find((r) => r.id === id);
    setRecipe(found ?? null);
  }, [id]);

  if (!recipe) {
    return (
      <div className="p-6 text-center text-gray-600">
        Recipe not found.
      </div>
    );
  }

  return (
    <>
      <CookingModeHeader
        recipeName={recipe.name}
        totalSteps={recipe.instructions.length}
        completedSteps={currentStep}
        showIngredients={showIngredients}
        onBack={() => navigate(-1)}
        onToggleIngredients={() =>
          setShowIngredients((prev) => !prev)
        }
      />

      {/* Cooking content coming next */}
    </>
  );
}