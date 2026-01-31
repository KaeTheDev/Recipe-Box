import { useEffect } from "react";
import { X, Heart, Share2, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toggleFavorite, getRecipes } from "../../../utils/recipes";
import type { Recipe } from "../../../types/Recipe";
import toast from "react-hot-toast";

interface RecipeCompleteModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeCompleteModal({ recipe, onClose }: RecipeCompleteModalProps) {
  const navigate = useNavigate();

  // Check if this recipe is already favorited
  const isFavorited = getRecipes().some(r => r.id === recipe.id && r.isFavorite);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Add to Favorites and go to Favorites page
  const handleFavorite = () => {
    if (!isFavorited) {
      toggleFavorite(recipe.id);
      onClose(); // close modal first
      navigate("/favorites"); // navigate to favorites page
    }
  };

  // Share button
  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/recipe/${recipe.id}`;
      await navigator.clipboard.writeText(url);
      toast.success("Recipe link copied to clipboard!", { duration: 3000, position: "top-center" });
    } catch (err) {
      toast.error("Failed to copy recipe link.", { duration: 3000, position: "top-center" });
    }
  };
  

  // Back to Home
  const handleHome = () => {
    navigate("/");
    onClose();
  };

  // Click on backdrop closes modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-xl max-w-md w-full p-6 flex flex-col items-center gap-4 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        {/* Success Checkmark */}
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500 animate-bounce">
          <Heart size={36} className="text-white" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          You completed "{recipe.name}"!
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Great job! What would you like to do next?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={handleFavorite}
            disabled={isFavorited} // ✅ disable if already favorited
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition font-semibold
              ${isFavorited
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"}
            `}
          >
            <Heart size={18} />
            {isFavorited ? "Already Favorited" : "Add to Favorites"}
          </button>

          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            <Share2 size={18} />
            Share Recipe
          </button>

          <button
            onClick={handleHome}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}