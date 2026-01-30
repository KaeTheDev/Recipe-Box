import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickPickCardProps {
  title: string;
  description: string;
  count: number;
  to: string;
}

export default function QuickPickCard({ title, description, count, to }: QuickPickCardProps) {
  return (
    <Link to={to}>
      <div
        className="
          flex flex-col items-center justify-center gap-2
          bg-green-600 text-white p-4 rounded-lg shadow-sm
          flex-1 min-w-30 max-w-40 sm:min-w-35 sm:max-w-45
          transition-all duration-300 ease-in-out hover:scale-105
        "
      >
        <Check size={22} />
        <span className="font-semibold text-sm text-center">{title}</span>
        <span className="text-xs text-white/90 text-center">{count} Recipes</span>
        <span className="text-[10px] text-white/80 text-center">{description}</span>
      </div>
    </Link>
  );
}
