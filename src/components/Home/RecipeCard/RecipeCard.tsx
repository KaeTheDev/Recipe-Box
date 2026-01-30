import { Clock, ChefHat, Flame, Heart } from "lucide-react";
import MacandCheese from "../../../assets/MacandCheese.png";
import { Link } from "react-router-dom";
import type { RecipeComponentProps } from "../../../types/RecipeProps";
import { toggleFavorite } from "../../../utils/recipes";
import { useState } from "react";

export default function RecipeCard({ recipe }: RecipeComponentProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating when clicking the heart
    toggleFavorite(recipe.id);
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/recipes/${recipe.id}`} className="w-full">
      <div className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden w-full max-w-70 sm:max-w-75 lg:max-w-[320px]">
        {/* Difficulty Badge */}
        <div
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
            recipe.difficulty === "Easy"
              ? "bg-green-400 text-black"
              : recipe.difficulty === "Medium"
              ? "bg-yellow-400 text-black"
              : "bg-red-500 text-white"
          }`}
        >
          {recipe.difficulty}
        </div>

        <button
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white"
          onClick={handleFavorite}
        >
          <Heart
            size={16}
            fill={isFavorite ? "currentColor" : "none"} // fill entire heart if favorite
            className={`${isFavorite ? "text-red-500" : "text-gray-400"}`}
          />
        </button>

        {/* Image */}
        <img
          src={recipe.image || MacandCheese}
          alt={recipe.name}
          className="w-full h-36 sm:h-40 lg:h-44 object-cover"
        />

        {/* Content */}
        <div className="flex flex-col p-3 sm:p-4 gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800">
            {recipe.name}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 leading-snug">
            {recipe.description}
          </p>

          <p className="text-[11px] text-gray-500">
            {recipe.tags.map((tag) => `#${tag}`).join(" ")}
          </p>

          {/* Stats */}
          <div className="flex justify-between text-xs sm:text-sm text-gray-700 pt-2">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat size={14} />
              <span>{recipe.servings} Servings</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame size={14} />
              <span>{recipe.cuisine}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}