import { Clock, ChefHat, Flame, Heart } from "lucide-react";
import MacandCheese from "../../assets/MacandCheese.png";
import type { Recipe } from "../../types/Recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div
      className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden 
    w-full max-w-70 sm:max-w-75 lg:max-w-[320px]"
    >
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

      {/* Favorite Button */}
      <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white">
        <Heart
          size={16}
          className={`${recipe.isFavorite ? "text-red-500" : "text-gray-400"}`}
        />
      </button>

      {/* Image */}
      <img
        src={recipe.image || MacandCheese} // fallback if no image
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
  );
}