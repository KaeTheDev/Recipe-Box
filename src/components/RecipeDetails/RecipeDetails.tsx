import { Clock, ChefHat, Flame } from "lucide-react";
import type { RecipeComponentProps } from "../../types/RecipeProps";

export default function RecipeDetails({ recipe }: RecipeComponentProps) {
  if (!recipe) return null;
  return (
    <section className="bg-white rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8">
      {/* Stats Row */}
      <div className="flex justify-center">
        <div className="flex gap-10 text-gray-700">
          {/* Prep Time */}
          <div className="flex flex-col items-center">
            <Clock size={20} className="text-orange-500 mb-1" />
            <p className="font-semibold text-sm sm:text-base">
              {recipe.cookTime}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">minutes</p>
          </div>

          {/* Servings */}
          <div className="flex flex-col items-center">
            <ChefHat size={20} className="text-orange-500 mb-1" />
            <div className="flex items-center gap-3 mt-1">
              <button
                type="button"
                className="w-6 h-6 rounded-full text-sm font-semibold hover:bg-gray-200"
              >
                –
              </button>
              <span className="font-semibold text-sm sm:text-base">
                {recipe.servings}
              </span>
              <button
                type="button"
                className="w-6 h-6 rounded-full text-sm font-semibold hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">servings</p>
          </div>

          {/* Difficulty */}
          <div className="flex flex-col items-center">
            <Flame size={20} className="text-orange-500 mb-1" />
            <p className="font-semibold text-sm sm:text-base">
              {recipe.difficulty}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">level</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-center text-sm sm:text-base text-gray-700 max-w-xl mx-auto">
        {recipe.description}
      </p>

      {/* Tags */}
      <div className="mt-3 flex justify-center flex-wrap gap-2">
        {recipe.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200/40 px-2 py-1 text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}