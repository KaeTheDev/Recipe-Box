import { Clock, Flame } from "lucide-react";
import type { Recipe } from "../../../types/Recipe";
import ServingAdjuster from "../../ServingAdjuster/ServingAdjuster";

interface RecipeDetailsProps {
  recipe: Recipe;
  currentServings: number;
  onServingsChange: (newServings: number) => void;
}

export default function RecipeDetails({
  recipe,
  currentServings,
  onServingsChange,
}: RecipeDetailsProps) {
  if (!recipe) return null;

  return (
    <section className="bg-white rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8">
      {/* Stats Row */}
      <div className="flex justify-center">
        <dl className="flex gap-10 text-gray-700">
          {/* Prep Time */}
          <div className="flex flex-col items-center">
            <dt className="sr-only">Prep Time</dt>
            <Clock size={20} className="text-orange-500 mb-1" aria-hidden="true" />
            <dd className="font-semibold text-sm sm:text-base">{recipe.cookTime}</dd>
            <dd className="text-xs sm:text-sm text-gray-500">minutes</dd>
          </div>

          {/* Servings */}
          <div className="flex flex-col items-center">
            <dt className="sr-only">Servings</dt>
            <ServingAdjuster
              currentServings={currentServings}
              originalServings={recipe.servings}
              onServingsChange={onServingsChange}
            />
          </div>

          {/* Difficulty */}
          <div className="flex flex-col items-center">
            <dt className="sr-only">Difficulty Level</dt>
            <Flame size={20} className="text-orange-500 mb-1" aria-hidden="true" />
            <dd className="font-semibold text-sm sm:text-base">{recipe.difficulty}</dd>
            <dd className="text-xs sm:text-sm text-gray-500">level</dd>
          </div>
        </dl>
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