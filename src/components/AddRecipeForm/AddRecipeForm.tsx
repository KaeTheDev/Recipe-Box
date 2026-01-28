import { Plus } from "lucide-react";

export default function AddRecipeForm() {
  return (
    <section className="flex justify-center bg-orange-50 py-10 px-4">
      <div className="w-full max-w-3xl flex flex-col gap-6 bg-white rounded-lg shadow-md p-6">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Add a Recipe</h2>
          <p className="text-sm text-gray-600">
            Fill out the details below to add your recipe.
          </p>
        </div>

        {/* Recipe Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Recipe Name</label>
          <input
            type="text"
            placeholder="Classic Mac and Cheese"
            className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Short description of the recipe..."
            className="border border-gray-200 rounded p-2 text-sm w-full h-16 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          ></textarea>
        </div>

        {/* Cuisine & Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Cuisine</label>
            <select className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option>All</option>
              <option>Italian</option>
              <option>Mexican</option>
              <option>Asian</option>
              <option>Thai</option>
              <option>Japanese</option>
              <option>French</option>
              <option>Indian</option>
              <option>Mediterranean</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Difficulty</label>
            <select className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        {/* Prep Time / Cook Time / Servings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Prep Time (min)</label>
            <input type="number" placeholder="15" className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Cook Time (min)</label>
            <input type="number" placeholder="35" className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Servings</label>
            <input type="number" placeholder="4" className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <input type="text" placeholder="quick, family, vegetarian..." className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>

        {/* Ingredients */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Ingredients</label>
          {/* Example static line */}
          <div className="grid grid-cols-3 gap-2">
            <input type="text" placeholder="Name" className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input type="text" placeholder="Qty" className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <input type="text" placeholder="Unit" className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          {/* +Add button (static for now) */}
          <button className="flex items-center gap-2 text-orange-500 text-sm font-medium mt-1">
            <Plus size={16} /> Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Instructions</label>
          {/* Example static line */}
          <input type="text" placeholder="Step 1" className="border border-gray-200 rounded p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400" />
          {/* +Add button (static for now) */}
          <button className="flex items-center gap-2 text-orange-500 text-sm font-medium mt-1">
            <Plus size={16} /> Add Step
          </button>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
          <textarea placeholder="Any extra tips or notes..." className="border border-gray-200 rounded p-2 text-sm w-full h-16 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Recipe Image</label>
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded p-2 text-sm text-gray-700 hover:bg-gray-50">
            <Plus size={16} /> Upload Image
          </button>
        </div>

        {/* Submit */}
        <button className="bg-orange-500 text-white font-semibold rounded py-2 px-4 hover:bg-orange-600 transition">
          Add Recipe
        </button>
      </div>
    </section>
  );
}