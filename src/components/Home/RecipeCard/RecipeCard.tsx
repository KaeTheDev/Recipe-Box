import { Clock, ChefHat, Flame, Heart } from "lucide-react";
import DefaultRecipeImage from "../../../assets/DefaultRecipeImage.png";
import { Link } from "react-router-dom";
import type { RecipeComponentProps } from "../../../types/RecipeProps";
import { toggleFavorite } from "../../../utils/recipes";
import { useState } from "react";

export default function RecipeCard({ recipe }: RecipeComponentProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(recipe.id);
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/recipes/${recipe.id}`} className="w-full">
      <div
        className="
          relative
          flex flex-col
          bg-white
          rounded-lg
          shadow-md
          overflow-hidden
          w-full
          max-w-[320px]
          h-90               
          transition-all
          duration-300
          ease-in-out
          hover:shadow-xl          
          hover:scale-[1.02]       
        "
      >
        {/* Difficulty Badge */}
        <div
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded z-10 ${
            recipe.difficulty === "Easy"
              ? "bg-green-400 text-black"
              : recipe.difficulty === "Medium"
              ? "bg-yellow-400 text-black"
              : "bg-red-500 text-white"
          }`}
        >
          {recipe.difficulty}
        </div>

        {/* Favorite Button */}
        <button
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white"
          onClick={handleFavorite}
        >
          <Heart
            size={16}
            fill={isFavorite ? "currentColor" : "none"}
            className={isFavorite ? "text-red-500" : "text-gray-400"}
          />
        </button>

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={recipe.image || DefaultRecipeImage}
            alt={recipe.name}
            className="
              w-full h-40 object-cover
              transition-transform duration-300 ease-in-out
              hover:scale-105         /* subtle zoom on hover */
            "
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 sm:p-4 gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
            {recipe.name}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 leading-snug line-clamp-3">
            {recipe.description}
          </p>

          <p className="text-[11px] text-gray-500 line-clamp-1">
            {recipe.tags.map(tag => `#${tag}`).join(" ")}
          </p>

          <div className="mt-auto pt-2 flex justify-between text-xs sm:text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat size={14} />
              <span>{recipe.servings}</span>
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
