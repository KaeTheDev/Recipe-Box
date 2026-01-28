import { Play, Trash, ShoppingBag } from "lucide-react";

export default function RecipeActions() {
  return (
    <section className="w-full max-w-4xl mx-auto p-4 flex flex-col sm:flex-row gap-4 shadow-md bg-white rounded-lg">
      {/* Start Cooking */}
      <button className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-4 px-3 rounded-lg shadow hover:bg-orange-600 transition">
        <Play size={20} />
        <span className="font-semibold">Start Cooking</span>
      </button>

      {/* Add to List */}
      <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-4 px-3 rounded-lg shadow hover:bg-green-700 transition">
        <ShoppingBag size={20} />
        <span className="font-semibold">Add to List</span>
      </button>

      {/* Delete Recipe */}
      <button className="flex-1 flex items-center justify-center gap-2 bg-red-200 text-red-700 py-4 px-3 rounded-lg shadow hover:bg-red-300 transition">
        <Trash size={20} />
        <span className="font-semibold">Delete Recipe</span>
      </button>
    </section>
  );
}