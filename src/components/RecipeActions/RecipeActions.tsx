import { Play, Trash, ShoppingBag, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { RecipeComponentProps } from "../../types/RecipeProps";
import { deleteRecipe } from "../../utils/recipes";

export default function RecipeActions({ recipe }: RecipeComponentProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/add-recipe", { state: { initialData: recipe } });
  };

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    navigate("/"); // go back home after deletion
  };

  return (
    <section className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3">
      <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg">
        <Play size={18} />
        Start Cooking
      </button>

      <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg">
        <ShoppingBag size={18} />
        Add to List
      </button>

      <button
        onClick={handleEdit}
        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold py-4 rounded-lg"
      >
        <Pencil size={18} />
        Edit Recipe
      </button>

      <button
        onClick={handleDelete}
        className="w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-4 rounded-lg"
      >
        <Trash size={18} />
        Delete Recipe
      </button>
    </section>
  );
}
