import { Check } from "lucide-react";

export default function QuickPickCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 bg-green-600 text-white p-2 rounded-md shadow-sm w-28">
      <Check size={20} />
      <span className="font-semibold text-sm text-center">Quick Pick</span>
      <span className="text-xs text-center">3 Recipes</span>
    </div>
  );
}