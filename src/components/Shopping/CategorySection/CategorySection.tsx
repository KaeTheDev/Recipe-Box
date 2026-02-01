import { X } from "lucide-react";
import type { ShoppingListItem } from "../../../types/ShoppingList";

interface CategorySectionProps {
  category: string;
  items: ShoppingListItem[];
  onToggle: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

export default function CategorySection({
  category,
  items,
  onToggle,
  onRemove,
}: CategorySectionProps) {
  const checkedCount = items.filter((i) => i.checked).length;
  const totalCount = items.length;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
          <span className="text-sm text-gray-500">
            {checkedCount}/{totalCount}
          </span>
        </div>
      </div>

      {/* Items */}
      <ul className="divide-y divide-gray-100">
        {items.map((item) => (
          <li
            key={item.id}
            className={`px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
              item.checked ? "opacity-50" : ""
            }`}
          >
            {/* Checkbox */}
            <button
              onClick={() => onToggle(item.id)}
              className="shrink-0"
              aria-pressed={item.checked}
              aria-label={`${item.checked ? "Uncheck" : "Check"} ingredient: ${
                item.item
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                  item.checked
                    ? "bg-green-600 border-green-600"
                    : "border-gray-300 hover:border-green-600"
                }`}
              >
                {item.checked && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium ${
                  item.checked ? "line-through text-gray-500" : "text-gray-900"
                }`}
              >
                {item.item}
              </p>

              <p className="text-sm text-gray-500 mt-0.5">
                From:{" "}
                {(
                  item as ShoppingListItem & { recipes?: string[] }
                ).recipes?.join(", ") || item.recipeName}
              </p>
            </div>

            {/* Amount */}
            <div className="text-right shrink-0">
              <p
                className={`font-medium ${
                  item.checked ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {item.quantity} {item.unit}
              </p>
            </div>

            {/* Remove */}
            <button
              onClick={() => onRemove(item.id)}
              className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
              aria-label={`Remove ${item.item}`}
            >
              <X size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}