// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import CookingModeHeader from "../components/CookingModeHeader/CookingModeHeader";
// import { getRecipes } from "../utils/recipes";
// import type { Recipe } from "../types/Recipe";
// import CookingIngredientsList from "../components/CookingIngredientsList/CookingIngredientsList";

// export default function CookingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [showIngredients, setShowIngredients] = useState(false);

//   useEffect(() => {
//     const recipes = getRecipes();
//     const found = recipes.find((r) => r.id === id);
//     setRecipe(found ?? null);
//   }, [id]);

//   if (!recipe) {
//     return (
//       <div className="p-6 text-center text-gray-600">
//         Recipe not found.
//       </div>
//     );
//   }

//   return (
//     <>
//       <CookingModeHeader
//         recipeName={recipe.name}
//         totalSteps={recipe.instructions.length}
//         completedSteps={currentStep}
//         showIngredients={showIngredients}
//         onBack={() => navigate(-1)}
//         onToggleIngredients={() =>
//           setShowIngredients((prev) => !prev)
//         }
//       />

// <CookingIngredientsList ingredients={recipe.ingredients} />

//     </>
//   );
// }
// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import CookingModeHeader from "../components/CookingModeHeader/CookingModeHeader";
// import CookingIngredientsList from "../components/CookingIngredientsList/CookingIngredientsList";
// import type { Recipe } from "../types/Recipe";
// import { getRecipeById } from "../utils/recipes";

// export default function CookingPage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   // Pull recipe from localStorage dynamically
//   const recipe = id ? getRecipeById(id) : undefined;

//   const [showIngredients, setShowIngredients] = useState(true);
//   const [completedSteps, setCompletedSteps] = useState(0);

//   // If recipe ID is invalid
//   if (!recipe) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600 text-lg">Recipe not found</p>
//       </div>
//     );
//   }

//   // Total steps in the recipe
//   const totalSteps = recipe.instructions.length;

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col gap-4">
//       {/* Header with back button, recipe name, and ingredients toggle */}
//       <CookingModeHeader
//         recipeName={recipe.name}
//         totalSteps={totalSteps}
//         completedSteps={completedSteps}
//         showIngredients={showIngredients}
//         onBack={() => navigate(-1)}
//         onToggleIngredients={() =>
//           setShowIngredients((prev) => !prev)
//         }
//       />

//       {/* Ingredients list (toggleable) */}
//       {showIngredients && (
//         <CookingIngredientsList
//           ingredients={recipe.ingredients}
//         />
//       )}

//       {/* Placeholder for future step content */}
//       <section className="p-4 bg-white rounded-md shadow-md mx-4">
//         <h2 className="font-semibold text-lg mb-2">Instructions</h2>
//         {recipe.instructions.map((step, idx) => (
//           <p
//             key={idx}
//             className={`mb-2 ${
//               idx < completedSteps ? "text-gray-400 line-through" : ""
//             }`}
//           >
//             Step {idx + 1}: {step}
//           </p>
//         ))}

//         {/* Next step button */}
//         {completedSteps < totalSteps && (
//           <button
//             onClick={() =>
//               setCompletedSteps((prev) => Math.min(prev + 1, totalSteps))
//             }
//             className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//           >
//             Next Step
//           </button>
//         )}
//       </section>
//     </div>
//   );
// }

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