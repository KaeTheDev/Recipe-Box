import { ShoppingBag } from "lucide-react";

interface EmptyStateProps {
  navigate: (path: string) => void;
}

export default function EmptyState({ navigate }: EmptyStateProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center text-center gap-4 px-6 py-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <ShoppingBag size={36} className="text-orange-500" />
        <h3 className="text-2xl font-semibold">Your Shopping List Is Empty</h3>
        <p className="text-sm text-gray-600">
          Add recipes to your shopping list to see ingredients here. Items from
          multiple recipes are automatically organized by category!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 py-3 px-6 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Browse Recipes
        </button>
      </div>
    </div>
  );
}