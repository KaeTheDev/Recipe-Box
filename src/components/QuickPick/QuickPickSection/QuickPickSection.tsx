import QuickPickCard from "../QuickPickCard/QuickPickCard";
import { getRecipes } from "../../../utils/recipes";

export default function QuickPickSection() {
  const recipes = getRecipes();

  // Compute dynamic counts
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
    <section className="flex justify-center bg-orange-50 py-10">
      <div className="w-full max-w-4xl px-4">
        <h3 className="text-2xl text-left">Quick Picks</h3>
        <p className="text-left text-sm text-gray-600 mb-8">
          Curated recipes to get you cooking fast
        </p>

        <div
          className="
            max-w-sm mx-auto
            grid grid-cols-2 gap-3 place-items-center
            md:max-w-none md:mx-0
            md:flex md:flex-wrap md:gap-6
          "
        >
          {quickPicks.map(pick => (
            <QuickPickCard
              key={pick.title}
              title={pick.title}
              description={pick.description}
              count={pick.count}
              to={pick.to}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
