import { LucideArrowUpRight } from "lucide-react";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function FeaturedRecipesSection() {
  return (
    <section className="flex justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="w-full max-w-xl mx-auto">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center justify-center rounded-full bg-gray-200 p-1">
                <LucideArrowUpRight size={16} />
              </span>
              <h3 className="text-2xl text-left">
                Featured Recipes
              </h3>
            </div>
            <p className="text-left text-sm text-gray-600">
              Handpicked favorites to inspire your next meal
            </p>
          </div>
        </div>

        {/* Recipe Cards */}
        <div className="w-full flex justify-center">
          <div
            className="
              grid
              gap-4
              grid-cols-1          
              xs:grid-cols-2       
              sm:grid-cols-2        
              lg:grid-cols-3        
              xl:grid-cols-4       
              justify-items-center
            "
          >
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