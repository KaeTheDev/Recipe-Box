import RecipeCard from "../RecipeCard/RecipeCard";
import { getRecipes } from "../../../utils/recipes";
import { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, Heart, Clock, Star } from "lucide-react";
import type { Recipe } from "../../../types/Recipe";

export default function AllRecipesSection() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filtered, setFiltered] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [cuisine, setCuisine] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [maxTime, setMaxTime] = useState("Any");
  const [tab, setTab] = useState("Filters");

  useEffect(() => {
    const allRecipes = getRecipes();
    setRecipes(allRecipes);
    setFiltered(allRecipes);
  }, []);

  /* ----------------------------------------
     REAL-TIME SEARCH + TAG MATCHING
  -----------------------------------------*/
  useEffect(() => {
    let result = [...recipes];

    if (search.trim()) {
      const q = search.toLowerCase();

      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    if (cuisine !== "All") {
      result = result.filter(r => r.cuisine === cuisine);
    }

    if (difficulty !== "All") {
      result = result.filter(r => r.difficulty === difficulty);
    }

    if (maxTime === "< 30 min") {
      result = result.filter(r => r.prepTime + r.cookTime <= 30);
    } else if (maxTime === "< 60 min") {
      result = result.filter(r => r.prepTime + r.cookTime <= 60);
    }

    if (tab === "Favorites") {
      result = result.filter(r => r.isFavorite);
    } else if (tab === "Recent") {
      result = result.slice(0, 8);
    } else if (tab === "Time") {
      result = [...result].sort(
        (a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime)
      );
    }

    setFiltered(result);
  }, [search, cuisine, difficulty, maxTime, tab, recipes]);

  /* ----------------------------------------
     SEARCH SUGGESTIONS (NAME + TAGS)
  -----------------------------------------*/
  const suggestions = useMemo(() => {
    if (!search.trim()) return [];

    const q = search.toLowerCase();
    const set = new Set<string>();

    recipes.forEach(r => {
      if (r.name.toLowerCase().includes(q)) set.add(r.name);
      r.tags?.forEach(tag => {
        if (tag.toLowerCase().includes(q)) set.add(`#${tag}`);
      });
    });

    return Array.from(set).slice(0, 6);
  }, [search, recipes]);

  const handleSuggestionClick = (value: string) => {
    setSearch(value.replace("#", ""));
    setShowSuggestions(false);
  };

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
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search recipes or tags..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-md">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(s)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-orange-50"
                >
                  {s.startsWith("#") ? (
                    <span className="text-orange-600">{s}</span>
                  ) : (
                    s
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto">
          <FilterTab icon={<SlidersHorizontal size={16} />} label="Filters" active={tab === "Filters"} onClick={() => setTab("Filters")} />
          <FilterTab icon={<Star size={16} />} label="Recent" active={tab === "Recent"} onClick={() => setTab("Recent")} />
          <FilterTab icon={<Clock size={16} />} label="Time" active={tab === "Time"} onClick={() => setTab("Time")} />
          <FilterTab icon={<Heart size={16} />} label="Favorites" active={tab === "Favorites"} onClick={() => setTab("Favorites")} />
        </div>

        {/* Filters */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-3">
            <FilterSelect label="Cuisine" value={cuisine} onChange={setCuisine} options={["All","Italian","Mexican","Asian","Thai","Japanese","French","Indian","Mediterranean"]} />
            <FilterSelect label="Difficulty" value={difficulty} onChange={setDifficulty} options={["All","Easy","Medium","Hard"]} />
            <FilterSelect label="Max Time" value={maxTime} onChange={setMaxTime} options={["Any","< 30 min","< 60 min"]} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No recipes match your search.
            </p>
          ) : (
            filtered.map(r => <RecipeCard key={r.id} recipe={r} />)
          )}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------
   Small Helpers
-----------------------------------------*/

function FilterTab({ label, icon, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
        active
          ? "bg-orange-500 text-white"
          : "bg-white border hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function FilterSelect({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-md border p-2 text-sm"
      >
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}