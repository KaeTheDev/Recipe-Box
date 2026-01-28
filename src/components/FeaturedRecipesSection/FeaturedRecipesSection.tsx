import { LucideArrowUpRight } from "lucide-react";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function FeaturedRecipesSection() {
  return (
    <section className="flex justify-center bg-orange-50 py-10 px-4">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="w-full max-w-5xl">

            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center justify-center rounded-full bg-gray-200 p-1">
                <LucideArrowUpRight size={16} />
              </span>
              <h3 className="text-2xl text-left">Featured Recipes</h3>
            </div>
            <p className="text-left text-sm text-gray-600">
              Handpicked favorites to inspire your next meal
            </p>
          </div>
        </div>

        {/* Recipe Cards */}
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