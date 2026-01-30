import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickPickCardProps {
  title: string;
  description: string;
  count: number;
  to: string;
}

export default function QuickPickCard({
  title,
  description,
  count,
  to,
}: QuickPickCardProps) {
  return (
    <Link to={to} className="w-full">
      <div
        className="
          flex flex-col items-center justify-center gap-2
          bg-green-600 text-white
          p-4 rounded-lg shadow-sm
          h-37.5             
          w-full
          transition
          hover:scale-[1.03]
        "
      >
        <Check size={22} />
        <span className="font-semibold text-sm text-center line-clamp-1">
          {title}
        </span>
        <span className="text-xs text-white/90">
          {count} Recipes
        </span>
        <span className="text-[10px] text-white/80 text-center line-clamp-2">
          {description}
        </span>
      </div>
    </Link>
  );
}