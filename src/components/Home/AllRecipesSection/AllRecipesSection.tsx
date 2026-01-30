import RecipeCard from "../RecipeCard/RecipeCard";
import { getRecipes } from "../../../utils/recipes";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Heart, Clock, Star } from "lucide-react";
import type { Recipe } from "../../../types/Recipe";

export default function AllRecipesSection() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filtered, setFiltered] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [maxTime, setMaxTime] = useState("Any");
  const [tab, setTab] = useState("Filters");

  useEffect(() => {
    const allRecipes = getRecipes();
    setRecipes(allRecipes);
    setFiltered(allRecipes);
  }, []);

  // Filter whenever search, cuisine, difficulty, maxTime, or tab changes
  useEffect(() => {
    let result = [...recipes];

    // Search by name
    if (search.trim()) {
      result = result.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Cuisine filter
    if (cuisine !== "All") {
      result = result.filter(r => r.cuisine === cuisine);
    }

    // Difficulty filter
    if (difficulty !== "All") {
      result = result.filter(r => r.difficulty === difficulty);
    }

    // Max Time filter
    if (maxTime === "< 30 min") {
      result = result.filter(r => r.prepTime + r.cookTime <= 30);
    } else if (maxTime === "< 60 min") {
      result = result.filter(r => r.prepTime + r.cookTime <= 60);
    }

    // Tab filters
    if (tab === "Favorites") {
      result = result.filter(r => r.isFavorite);
    } else if (tab === "Recent") {
      // Assuming recipes are sorted by newest first in getRecipes
      result = result.slice(0, 8); // show latest 8
    } else if (tab === "Time") {
      result = result.sort((a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime));
    }

    setFiltered(result);
  }, [search, cuisine, difficulty, maxTime, tab, recipes]);

  return (
    <section className="bg-orange-50 py-10 px-4">
      <div className="mx-auto w-full max-w-5xl flex flex-col gap-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-semibold">All Recipes</h3>
          <p className="text-sm text-gray-600">{filtered.length} recipes</p>
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
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          <FilterTab
            icon={<SlidersHorizontal size={16} />}
            label="Filters"
            active={tab === "Filters"}
            onClick={() => setTab("Filters")}
          />
          <FilterTab
            icon={<Star size={16} />}
            label="Recent"
            active={tab === "Recent"}
            onClick={() => setTab("Recent")}
          />
          <FilterTab
            icon={<Clock size={16} />}
            label="Time"
            active={tab === "Time"}
            onClick={() => setTab("Time")}
          />
          <FilterTab
            icon={<Heart size={16} />}
            label="Favorites"
            active={tab === "Favorites"}
            onClick={() => setTab("Favorites")}
          />
        </div>

        {/* Filters Dropdown */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Cuisine */}
            <div>
              <label className="mb-1 block text-sm font-medium">Cuisine</label>
              <select
                className="w-full rounded-md border border-gray-200 p-2 text-sm"
                value={cuisine}
                onChange={e => setCuisine(e.target.value)}
              >
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
              <select
                className="w-full rounded-md border border-gray-200 p-2 text-sm"
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
              >
                <option>All</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            {/* Max Time */}
            <div>
              <label className="mb-1 block text-sm font-medium">Max Time</label>
              <select
                className="w-full rounded-md border border-gray-200 p-2 text-sm"
                value={maxTime}
                onChange={e => setMaxTime(e.target.value)}
              >
                <option>Any</option>
                <option>&lt; 30 min</option>
                <option>&lt; 60 min</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center mt-6">
          {filtered.length === 0 ? (
            <p className="col-span-full text-gray-500 text-center">
              No recipes match your filters.
            </p>
          ) : (
            filtered.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
          )}
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
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
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