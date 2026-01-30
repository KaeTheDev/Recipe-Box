import { ArrowLeft } from "lucide-react";

interface CookingModeHeaderProps {
  recipeName: string;
  totalSteps: number;
  completedSteps: number;
  showIngredients: boolean;
  onBack: () => void;
  onToggleIngredients: () => void;
}

export default function CookingModeHeader({
  recipeName,
  totalSteps,
  completedSteps,
  showIngredients,
  onBack,
  onToggleIngredients,
}: CookingModeHeaderProps) {
  // Calculate progress percentage
  const progressPercent =
    totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <header className="bg-white shadow-md p-4 flex flex-col gap-3">
      {/* Top Row: Back + Recipe Name + Ingredients Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate text-center flex-1 mx-2">
          {recipeName}
        </h1>

        <button
          onClick={onToggleIngredients}
          className={`px-3 py-1 rounded-full font-semibold text-sm transition ${
            showIngredients
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Ingredients
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-1">
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
            className="h-2 bg-green-500 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-600">
            Step {completedSteps + 1} of {totalSteps} • {completedSteps} completed
        </p>
      </div>
    </header>
  );
}