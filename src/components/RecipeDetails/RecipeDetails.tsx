import { Clock, ChefHat, Flame } from "lucide-react";

export default function RecipeDetails() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-orange-50 rounded-lg shadow-md flex flex-col gap-4">
      {/* Stats Row */}
      <div className="flex flex-row justify-start gap-8 text-gray-700">
        {/* Prep Time */}
        <div className="flex flex-col items-center sm:items-start">
          <Clock size={20} className="text-orange-500 mb-1" />
          <p className="font-semibold text-sm sm:text-base">35</p>
          <p className="text-xs sm:text-sm text-gray-500">minutes</p>
        </div>

        {/* Servings with Stepper */}
        <div className="flex flex-col items-center sm:items-start">
          <ChefHat size={20} className="text-orange-500 mb-1" />
          <div className="flex items-center gap-2 mt-1">
            <button
              className=" text-sm font-semibold hover:bg-gray-200"
              type="button"
            >
              –
            </button>
            <span className="font-semibold text-sm sm:text-base">4</span>
            <button
              className=" text-sm font-semibold hover:bg-gray-200"
              type="button"
            >
              +
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">servings</p>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col items-center sm:items-start">
          <Flame size={20} className="text-orange-500 mb-1" />
          <p className="font-semibold text-sm sm:text-base">Easy</p>
          <p className="text-xs sm:text-sm text-gray-500">level</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-700">
        Creamy, cheesy comfort food done right.
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-gray-200/40 px-2 py-1 text-xs rounded-full">#quick</span>
        <span className="bg-gray-200/40 px-2 py-1 text-xs rounded-full">#family</span>
        <span className="bg-gray-200/40 px-2 py-1 text-xs rounded-full">#comfort</span>
      </div>
    </section>
  );
}
