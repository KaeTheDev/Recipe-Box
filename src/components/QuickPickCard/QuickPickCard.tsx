import { Check } from "lucide-react";

export default function QuickPickCard() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2
                    bg-green-600 text-white p-4 rounded-lg shadow-sm
                    w-36 sm:w-40"
    >
      <Check size={22} />
      <span className="font-semibold text-sm text-center">Quick Pick</span>
      <span className="text-xs text-white/90 text-center">3 Recipes</span>
    </div>
  );
}
