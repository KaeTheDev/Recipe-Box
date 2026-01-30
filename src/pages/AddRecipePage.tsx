import { Link, useLocation } from "react-router-dom";
import AddRecipeForm from "../components/AddRecipeForm/AddRecipeForm";
import { addRecipe, editRecipe } from "../utils/recipes";
import type { Recipe } from "../types/Recipe";
import { ArrowLeft } from "lucide-react";

export default function AddRecipe() {
  const location = useLocation();
  const state = location.state as { initialData?: Recipe } | undefined;
  const initialData = state?.initialData;

  const handleSubmit = (recipe: Recipe) => {
    if (initialData) {
      // Editing existing recipe
      editRecipe(recipe);
      console.log("Recipe updated:", recipe);
    } else {
      // Adding new recipe
      addRecipe(recipe);
      console.log("New recipe submitted:", recipe);
    }
  };

  return (
    <div className="py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm hover:text-orange-500"
          >
            <ArrowLeft size={16} />
          </Link>
          <h2 className="text-3xl font-semibold">
            {initialData ? "Edit Recipe" : "New Recipe"}
          </h2>
        </div>

        {/* Form */}
        <AddRecipeForm onSubmit={handleSubmit} initialData={initialData} />
      </div>
    </div>
  );
}