import { Link, useLocation, useNavigate } from "react-router-dom";
import AddRecipeForm from "../components/AddRecipeForm/AddRecipeForm";
import { addRecipe, editRecipe } from "../utils/recipes";
import type { Recipe } from "../types/Recipe";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AddRecipe() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { initialData?: Recipe } | undefined;
  const initialData = state?.initialData;

  const handleSubmit = (recipe: Recipe) => {
    if (initialData) {
      editRecipe(recipe);
      console.log("Recipe updated:", recipe);
      
      // Show success toast
      toast.success("Recipe updated successfully!", {
        duration: 4000,
        position: "top-center",
      });
      
      // Navigate back to recipe detail page
      navigate(`/recipes/${recipe.id}`);
    } else {
      addRecipe(recipe);
      console.log("New recipe submitted:", recipe);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      // Show success toast
      toast.success("Recipe added successfully!", {
        duration: 4000,
        position: "top-center",
      });
      
      // Navigate back to recipe detail page
      navigate(`/recipes/${recipe.id}`);
    }
  };

  return (
    <div className="py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <Link
            to={initialData ? `/recipes/${initialData.id}` : "/"}
            className="hover:text-orange-500 transition"
          >
            <ArrowLeft size={18} />
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