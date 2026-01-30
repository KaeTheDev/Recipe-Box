import { Minus, Plus, ChefHat } from "lucide-react";

interface ServingAdjusterProps {
  currentServings: number;
  originalServings: number;
  onServingsChange: (newServings: number) => void;
  minServings?: number;
  maxServings?: number;
}

export default function ServingAdjuster({
  currentServings,
  originalServings,
  onServingsChange,
  minServings = 1,
  maxServings = 20,
}: ServingAdjusterProps) {
  const handleDecrease = () => {
    if (currentServings > minServings) {
      onServingsChange(currentServings - 1);
    }
  };

  const handleIncrease = () => {
    if (currentServings < maxServings) {
      onServingsChange(currentServings + 1);
    }
  };

  const isModified = currentServings !== originalServings;

  return (
    <div className="flex flex-col items-center">
      <ChefHat size={20} className="text-orange-500 mb-1" />

      <div className="flex items-center gap-3 mt-1">
        {/* Minus Button */}
        <button
          type="button"
          onClick={handleDecrease}
          disabled={currentServings <= minServings}
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease servings"
        >
          <Minus size={14} />
        </button>

        {/* Servings Display */}
        <span
          className={`font-semibold text-sm sm:text-base min-w-[2ch] text-center ${
            isModified ? "text-orange-600" : ""
          }`}
        >
          {currentServings}
        </span>

        {/* Plus Button */}
        <button
          type="button"
          onClick={handleIncrease}
          disabled={currentServings >= maxServings}
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Increase servings"
        >
          <Plus size={14} />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-gray-500 mt-1">servings</p>

      {isModified && (
        <p className="text-xs text-orange-600 mt-1">
          (adjusted from {originalServings})
        </p>
      )}
    </div>
  );
}
