import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import {
  getGroupedShoppingList,
  getShoppingListStats,
  toggleShoppingListItem,
  removeShoppingListItem,
  clearCheckedItems,
  clearAllItems,
} from "../utils/shoppingList";
import type { GroupedItems, ShoppingListStats } from "../types/ShoppingList";
import CategorySection from "../components/Shopping/CategorySection/CategorySection";
import EmptyState from "../components/Shopping/EmptySection/EmptySection";

export default function ShoppingPage() {
  const navigate = useNavigate();
  const [groupedItems, setGroupedItems] = useState<GroupedItems>({});
  const [stats, setStats] = useState<ShoppingListStats>({
    total: 0,
    checked: 0,
    unchecked: 0,
    percentComplete: 0,
  });

  const loadShoppingList = () => {
    setGroupedItems(getGroupedShoppingList());
    setStats(getShoppingListStats());
  };

  useEffect(() => {
    loadShoppingList();
  }, []);

  const handleToggleItem = (itemId: string) => {
    toggleShoppingListItem(itemId);
    loadShoppingList();
  };

  const handleRemoveItem = (itemId: string) => {
    removeShoppingListItem(itemId);
    loadShoppingList();
  };

  const handleClearChecked = () => {
    clearCheckedItems();
    loadShoppingList();
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all items?")) {
      clearAllItems();
      loadShoppingList();
    }
  };

  const hasItems = stats.total > 0;

  return (
    <>
      {/* Header */}
      <section className="bg-orange-50 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={24} className="text-orange-500" />
              <h2 className="text-3xl font-semibold">Shopping List</h2>
            </div>
            {hasItems && stats.checked > 0 && (
              <button
                onClick={handleClearChecked}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Clear Checked
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {stats.total} {stats.total === 1 ? "Item" : "Items"}
          </p>

          {/* Progress Bar */}
          {hasItems && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>{stats.percentComplete}% complete</span>
                <span>
                  {stats.checked} of {stats.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.percentComplete}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        {!hasItems ? (
          <EmptyState navigate={navigate} />
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              <CategorySection
                key={category}
                category={category}
                items={items}
                onToggle={handleToggleItem}
                onRemove={handleRemoveItem}
              />
            ))}

            {/* Clear All */}
            <button
              onClick={handleClearAll}
              className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <X size={18} />
              Clear All Items
            </button>
          </div>
        )}
      </section>
    </>
  );
}