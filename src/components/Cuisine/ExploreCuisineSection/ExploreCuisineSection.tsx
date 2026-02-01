import CuisineCard from "../CuisineCard/CuisineCard";
import CuisineCardSkeleton from "../../Shared/CuisineCardSkeleton/CuisineCardSkeleton";
import { getRecipes } from "../../../utils/recipes";
import { cuisineImages } from "../../../config/cuisineImages";
import { useEffect, useState } from "react";
import type { Recipe } from "../../../types/Recipe";

export default function ExploreCuisineSection() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate async fetch
    const fetchRecipes = async () => {
      setIsLoading(true);
      const data = await Promise.resolve(getRecipes());
      setRecipes(data);
      setIsLoading(false);
    };

    fetchRecipes();
  }, []);

  const cuisineMap = recipes.reduce<Record<string, number>>((acc, recipe) => {
    acc[recipe.cuisine] = (acc[recipe.cuisine] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="flex justify-center bg-orange-50 dark:bg-orange-900 py-10 px-4">
      <div className="w-full max-w-5xl">
        <h3 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">
          Explore by Cuisine
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Discover recipes from around the world
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, i) => <CuisineCardSkeleton key={i} />)
            : Object.entries(cuisineMap).map(([cuisine, count]) => (
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