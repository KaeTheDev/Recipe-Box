import { Flame } from "lucide-react";

export default function RecipeInstructions() {
  const instructions = [
    "Cook macaroni according to package (1-2 min less for al dente). Drain and set aside",
    "In same pot, melt butter over medium heat",
    "Add flour and whisk for 1-2 minutes (roux) until slightly golden",
    "Gradually pour in milk while whisking constantly to prevent lumps",
    "Cook while stirring until thickened (5-7 min)",
    "Reduce heat, add cheeses, mustard, paprika, salt and pepper. Stir until fully melted",
    "Add macaroni to sauce and mix well",
    "OPTIONAL: transfer to baking dish, top with breadcrumbs and broil at 180°C for 15 min",
    "Serve hot with a sprinkle of paprika",
  ];

  return (
    <section className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-0.5">
        <Flame size={20} className="text-orange-500" />
        <h2 className="text-2xl font-semibold">Instructions</h2>
      </div>

      {/* Instructions List */}
      <div className="flex flex-col gap-2">
        {instructions.map((step, idx) => (
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
  );
}