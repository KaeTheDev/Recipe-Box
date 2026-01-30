import { Check } from "lucide-react";

interface CookingStepCardProps {
  stepNumber: number;
  totalSteps: number;
  stepText: string;
  isCompleted: boolean;
  onCompleteStep: () => void;
}

export default function CookingStepCard({
  stepNumber,
  totalSteps,
  stepText,
  isCompleted,
  onCompleteStep,
}: CookingStepCardProps) {
  return (
    <div
      className={`bg-white shadow-md rounded-xl p-6 flex flex-col gap-4 transition ${
        isCompleted ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white ${
            isCompleted ? "bg-green-500" : "bg-orange-500"
          }`}
        >
          {stepNumber}
        </span>
        <span className="text-gray-500 text-sm">
          {stepNumber} of {totalSteps}
        </span>
      </div>

      <p className="text-lg text-gray-800">{stepText}</p>

      <button
        onClick={onCompleteStep}
        className={`self-start flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white transition
          ${isCompleted ? "bg-green-500" : "bg-orange-500 hover:bg-orange-600"}`}
      >
        <Check size={18} />
        {isCompleted ? "Completed" : "Mark as Done"}
      </button>
    </div>
  );
}