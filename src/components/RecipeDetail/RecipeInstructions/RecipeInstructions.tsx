import { Flame } from "lucide-react";
import type { RecipeComponentProps } from "../../../types/RecipeProps";

export default function RecipeInstructions({ recipe }: RecipeComponentProps) {
  if (!recipe){
    return null;
  } 

  return (
    <section className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-0.5">
        <Flame size={20} className="text-orange-500" />
        <h2 className="text-2xl font-semibold">Instructions</h2>
      </div>

      {/* Instructions List */}
      <div className="flex flex-col gap-2">
        {recipe.instructions.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3">
            {/* Step number with orange background */}
            <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
              {idx + 1}
            </span>
            <p className="text-sm sm:text-base text-gray-700">
            {step}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
