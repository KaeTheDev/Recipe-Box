import RecipeCard from "../RecipeCard/RecipeCard";
import { Search, SlidersHorizontal } from "lucide-react";

export default function AllRecipesSection() {
  return (
    <section className="bg-orange-50 py-10 px-4">
      <div className="mx-auto w-full max-w-5xl flex flex-col gap-6">

        {/* Header */}
        <div>
          <h3 className="text-2xl font-semibold">All Recipes</h3>
          <p className="text-sm text-gray-600">3 recipes</p>
        </div>

        {/* Search */}
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          <FilterTab icon={<SlidersHorizontal size={16} />} label="Filters" active />
          <FilterTab label="Recent" />
          <FilterTab label="Time" />
          <FilterTab label="Difficulty" />
          <FilterTab label="Favorites" />
        </div>

        {/* Filters Dropdown (static for now) */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-3">

            {/* Cuisine */}
            <div>
              <label className="mb-1 block text-sm font-medium">Cuisine</label>
              <select className="w-full rounded-md border border-gray-200 p-2 text-sm">
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

            {/* Difficulty */}
            <div>
              <label className="mb-1 block text-sm font-medium">Difficulty</label>
              <select className="w-full rounded-md border border-gray-200 p-2 text-sm">
                <option>All</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            {/* Max Time */}
            <div>
              <label className="mb-1 block text-sm font-medium">Max Time</label>
              <select className="w-full rounded-md border border-gray-200 p-2 text-sm">
                <option>Any</option>
                <option>&lt; 30 min</option>
                <option>&lt; 60 min</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
  <RecipeCard />
  <RecipeCard />
  <RecipeCard />
  <RecipeCard />
</div>

        </div>

      </div>
    </section>
  );
}

/* Filter Tab */
function FilterTab({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition
        ${
          active
            ? "bg-orange-500 text-white"
            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}