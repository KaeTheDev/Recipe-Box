import QuickPickCard from "../QuickPickCard/QuickPickCard";
import { getRecipes } from "../../../utils/recipes";

export default function QuickPickSection() {
  const recipes = getRecipes();

  const quickPicks = [
    {
      title: "Under 30 Minutes",
      description: "Quick and easy recipes",
      count: recipes.filter(r => r.prepTime + r.cookTime <= 30).length,
      to: "/quick-picks/under-30",
    },
    {
      title: "Beginner Friendly",
      description: "Easy recipes for starters",
      count: recipes.filter(r => r.difficulty === "Easy").length,
      to: "/quick-picks/beginner",
    },
    {
      title: "Favorites",
      description: "Loved by everyone",
      count: recipes.filter(r => r.isFavorite).length,
      to: "/quick-picks/favorites",
    },
    {
      title: "Vegetarian",
      description: "Plant-based delights",
      count: recipes.filter(
        r => r.tags?.some(tag => tag.toLowerCase() === "vegetarian")
      ).length,
      to: "/quick-picks/vegetarian",
    },
  ];

  return (
    <section className="bg-orange-50 py-10 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <h3 className="text-2xl">Quick Picks</h3>
        <p className="text-sm text-gray-600 mb-8">
          Curated recipes to get you cooking fast
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickPicks.map(pick => (
            <QuickPickCard key={pick.title} {...pick} />
          ))}
        </div>
      </div>
    </section>
  );
}