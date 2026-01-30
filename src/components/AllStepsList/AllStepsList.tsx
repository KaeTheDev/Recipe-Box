import { Check } from "lucide-react";

interface AllStepsListProps {
  steps: string[];
  currentStep: number;
  completedStepsArr: boolean[];
}

export default function AllStepsList({
  steps,
  currentStep,
  completedStepsArr,
}: AllStepsListProps) {
  return (
    <section className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold">All Steps</h2>

      <div className="flex flex-col gap-2">
        {steps.map((stepText, idx) => {
          const isCompleted = completedStepsArr[idx];
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2 rounded-md transition
                ${
                  isCompleted
                    ? "bg-green-50 text-gray-500 line-through"
                    : isCurrent
                    ? "bg-orange-50 border border-orange-400"
                    : "bg-gray-50 text-gray-600"
                }`}
            >
              {/* Step number badge / checkmark */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full font-bold text-white text-sm
                  ${
                    isCompleted
                      ? "bg-green-500"
                      : isCurrent
                      ? "bg-orange-500"
                      : "bg-gray-400"
                  }`}
              >
                {isCompleted ? <Check size={14} /> : idx + 1}
              </div>

              {/* Step text */}
              <p className="text-sm">{stepText}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}