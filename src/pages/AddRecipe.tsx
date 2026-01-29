import { Link } from "react-router-dom";
import AddRecipeForm from "../components/AddRecipeForm/AddRecipeForm";
import type { Recipe } from "../types/Recipe";
import { ArrowLeft } from "lucide-react";

export default function AddRecipe() {
  const handleAddRecipe = (recipe: Recipe) => {
    console.log("New recipe submitted:", recipe);
  };

  return (
    <div className="py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Header with Back Arrow */}
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm hover:text-orange-500"
          >
            <ArrowLeft size={16} />
          </Link>
          <h2 className="text-3xl font-semibold">New Recipe</h2>
        </div>

        {/* AddRecipe Form */}
        <AddRecipeForm onSubmit={handleAddRecipe} />
      </div>
    </div>
  );
}