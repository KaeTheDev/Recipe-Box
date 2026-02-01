import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Recipe } from "../types/Recipe";
import { getRecipeById } from "../utils/recipes";

import CookingModeHeader from "../components/CookingMode/CookingModeHeader/CookingModeHeader";
import CookingIngredientsList from "../components/CookingMode/CookingIngredientsList/CookingIngredientsList";
import CookingStepCard from "../components/CookingMode/CookingStepCard/CookingStepCard";
import AllStepsList from "../components/CookingMode/AllStepsList/AllStepsList";
import RecipeCompleteModal from "../components/CookingMode/RecipeCompleteModal/RecipeCompleteModal";

export default function CookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Pull recipe from localStorage
  const recipe = getRecipeById(id ?? "") as Recipe | undefined;

  const [showIngredients, setShowIngredients] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedStepsArr, setCompletedStepsArr] = useState<boolean[]>(
    recipe ? Array(recipe.instructions.length).fill(false) : []
  );
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  if (!recipe) {
    return (
      <div className="p-6 text-center text-gray-600">Recipe not found</div>
    );
  }

  const handleCompleteStep = () => {
    // Mark current step as completed
    const newCompleted = [...completedStepsArr];
    newCompleted[currentStep] = true;
    setCompletedStepsArr(newCompleted);

    // If last step completed, show modal
    if (currentStep === recipe.instructions.length - 1) {
      setShowCompleteModal(true);
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  const numCompleted = completedStepsArr.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-4">
      {/* Header */}
      <CookingModeHeader
        recipeName={recipe.name}
        totalSteps={recipe.instructions.length}
        completedSteps={numCompleted}
        currentStep={currentStep} // 1-based for display
        showIngredients={showIngredients}
        onBack={() => navigate(-1)}
        onToggleIngredients={() => setShowIngredients((prev) => !prev)}
      />

      {/* Ingredients List (toggleable) */}
      {showIngredients && (
        <CookingIngredientsList ingredients={recipe.ingredients} />
      )}

      {/* Current Step */}
      <CookingStepCard
        stepNumber={currentStep + 1}
        totalSteps={recipe.instructions.length}
        stepText={recipe.instructions[currentStep]}
        isCompleted={completedStepsArr[currentStep]}
        onCompleteStep={handleCompleteStep}
      />

      {/* All Steps List */}
      <AllStepsList
        steps={recipe.instructions}
        currentStep={currentStep}
        completedStepsArr={completedStepsArr}
      />

      {/* Completion Modal */}
      {showCompleteModal && (
        <RecipeCompleteModal
          recipe={recipe}
          onClose={() => setShowCompleteModal(false)}
        />
      )}
    </div>
  );
}