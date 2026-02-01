import { useEffect, useRef } from "react";
import { X, Heart, Share2, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toggleFavorite, getRecipes } from "../../../utils/recipes";
import type { Recipe } from "../../../types/Recipe";
import toast from "react-hot-toast";

interface RecipeCompleteModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeCompleteModal({
  recipe,
  onClose,
}: RecipeCompleteModalProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const isFavorited = getRecipes().some(
    (r) => r.id === recipe.id && r.isFavorite
  );

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll<
      HTMLButtonElement
    >("button");
    if (!focusableElements || focusableElements.length === 0) return;

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    // focus first button initially
    firstEl.focus();

    return () => window.removeEventListener("keydown", handleTab);
  }, []);

  const handleFavorite = () => {
    if (!isFavorited) {
      toggleFavorite(recipe.id);
      onClose();
      navigate("/favorites");
    }
  };

  const handleShare = () => {
    toast("Share feature coming soon!", {
      duration: 3000,
      position: "top-center",
    });
  };

  const handleHome = () => {
    navigate("/");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="relative bg-white rounded-xl max-w-md w-full p-6 flex flex-col items-center gap-4 animate-scale-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Success Checkmark */}
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500 animate-bounce">
          <Heart size={36} className="text-white" aria-hidden="true" />
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
            disabled={isFavorited}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition font-semibold
              ${
                isFavorited
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }
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