import CuisineCard from "../CuisineCard/CuisineCard";
import type { Recipe } from "../../../types/Recipe";
import { useRecipes } from "../../../customHooks/useRecipes";
import { cuisineImages } from "../../../config/cuisineImages";

export default function ExploreCuisineSection() {
  const { recipes } = useRecipes(); 

  const cuisineMap: Record<string, number> = recipes.reduce(
    (acc: Record<string, number>, recipe: Recipe) => {
      acc[recipe.cuisine] = (acc[recipe.cuisine] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <section className="flex justify-center bg-orange-50 py-10 px-4">
      <div className="w-full max-w-5xl">
        <h3 className="text-2xl mb-2">Explore by Cuisine</h3>
        <p className="text-sm text-gray-600 mb-6">
          Discover recipes from around the world
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(cuisineMap).map(([cuisine, count]) => (
            <CuisineCard
              key={cuisine}
              cuisine={cuisine}
              count={count}
              image={cuisineImages[cuisine] ?? cuisineImages.American}
            />
          ))}
        </div>
      </div>
    </section>
  );
}