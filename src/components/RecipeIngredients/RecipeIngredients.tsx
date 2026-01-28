import { ChefHat } from "lucide-react"

export default function RecipeIngredients() {
    const ingredients = [
        "Elbow macaroni: 450g",
        "Butter: 60g",
        "All-purpose flour: 60g",
        "Whole milk: 700ml",
        "Sharp Cheddar cheese: 300g (grated)",
        "Mozzarella: 150g (grated)",
        "Dijon mustard: 1 tsp",
        "Paprika: 0.5 tsp",
        "Salt and pepper: to taste",
        "Breadcrumbs: 50g (optional for topping)"
    ];

    return (
      <section className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-0.5">
        <ChefHat size={20} className="text-orange-500" />
        <h2 className="text-2xl font-semibold">Ingredients</h2>
      </div>

      {/* Ingredients List */}
      <div className="flex flex-col gap-2">
        {ingredients.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3">
            {/* Step number with orange background */}
            <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
              {idx + 1}
            </span>
            <p className="text-sm sm:text-base text-gray-700">{step}</p>
          </div>
        ))}
      </div>
    </section>
    )
}

