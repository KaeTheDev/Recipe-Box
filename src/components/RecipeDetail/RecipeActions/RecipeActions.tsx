import { Play, Trash, ShoppingBag, Pencil, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { RecipeComponentProps } from "../../../types/RecipeProps";
import { deleteRecipe } from "../../../utils/recipes";
import { addRecipeToShoppingList, isRecipeInShoppingList, removeRecipeFromShoppingList } from "../../../utils/shoppingList";

export default function RecipeActions({ recipe }: RecipeComponentProps) {
  const navigate = useNavigate();
  // Lazy Initialization: tells React to execute that function only 
  // once during the component's initial render, preventing unnecessary 
  // computations on every re-render
  const [inList, setInList] = useState(() => isRecipeInShoppingList(recipe.id));
  const [showFeedback, setShowFeedback] = useState(false);

  const handleEdit = () => {
    navigate("/add-recipe", { state: { initialData: recipe } });
  };

  const handleDelete = () => {
    if (!recipe) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.name}"?`
    );
    if (confirmed) {
      deleteRecipe(recipe.id);
      navigate("/");
    }
  };

  const handleAddToList = () => {
    if (inList) {
      removeRecipeFromShoppingList(recipe.id);
      setInList(false);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    } else {
      addRecipeToShoppingList(recipe);
      setInList(true);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  const handleStartCooking = () => {
    navigate(`/cook/${recipe.id}`);
  };
  
  return (
    <section className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3">
      {/* Start Cooking */}
      <button
        onClick={handleStartCooking}
        aria-label="Start Cooking"
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors"
      >
        <Play size={18} />
        Start Cooking
      </button>

      {/* Add to Shopping List */}
      <button
        onClick={handleAddToList}
        aria-label={inList ? "Remove from shopping list" : "Add to shopping list"}
        className={`w-full flex items-center justify-center gap-2 font-semibold py-4 rounded-lg transition-colors ${
          inList
            ? "bg-green-700 hover:bg-green-800 text-white"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {inList ? <Check size={18} /> : <ShoppingBag size={18} />}
        {inList ? "In Shopping List" : "Add to List"}
      </button>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`text-sm text-center py-2 px-3 rounded-lg ${
            inList
              ? "bg-green-50 text-green-700"
              : "bg-gray-50 text-gray-600"
          }`}
        >
          {inList ? "✓ Added to shopping list" : "Removed from shopping list"}
        </div>
      )}

      {/* Edit Recipe */}
      <button
        aria-label="Edit Recipe"
        onClick={handleEdit}
        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold py-4 rounded-lg transition-colors"
      >
        <Pencil size={18} />
        Edit Recipe
      </button>

      {/* Delete Recipe */}
      <button
        aria-label="Delete Recipe"
        onClick={handleDelete}
        className="w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-4 rounded-lg transition-colors"
      >
        <Trash size={18} />
        Delete Recipe
      </button>
    </section>
  );
}