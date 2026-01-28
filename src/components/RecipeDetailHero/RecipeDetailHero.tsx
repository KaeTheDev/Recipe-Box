import MacandCheese from "../../assets/MacandCheese.png";

export default function RecipeDetailHero() {
  return (
    <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
      {/* Hero Image */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={MacandCheese}
        alt="Mac and Cheese"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text in bottom-left */}
      <div className="absolute bottom-4 left-4 z-10 text-white">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-white/20 px-2 py-1 text-xs rounded-full">#quick</span>
          <span className="bg-white/20 px-2 py-1 text-xs rounded-full">#family</span>
          <span className="bg-white/20 px-2 py-1 text-xs rounded-full">#comfort</span>
        </div>

        {/* Recipe Name */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Classic Mac and Cheese
        </h1>
      </div>
    </section>
  );
}