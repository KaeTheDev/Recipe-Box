import CuisineCard from "../CuisineCard/CuisineCard";

export default function ExploreCuisineSection() {
  return (
    <section className="flex justify-center bg-orange-50 py-10 px-4">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="w-full max-w-5xl">
            <div className="flex flex-col gap-2 mb-1">
              <h3 className="text-2xl text-left">Explore by Cuisine</h3>
              <p className="text-left text-sm text-gray-600">
                Discover recipes from around the world
              </p>
            </div>
          </div>
        </div>

        {/* Cuisine Cards */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <CuisineCard />
            <CuisineCard />
            <CuisineCard />
            <CuisineCard />
          </div>
        </div>
      </div>
    </section>
  );
}