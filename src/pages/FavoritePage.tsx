import { Heart } from "lucide-react";

export default function FavoritePage() {
  return (
    <>
      {/* Header Section */}
      <section className="bg-orange-50 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Heart size={24} className="text-red-500" />
            <h2 className="text-3xl font-semibold">Favorites</h2>
          </div>
          <p className="text-sm text-gray-600">2 Favorite recipes</p>
        </div>
      </section>

      {/* Empty State */}
      <section className="flex justify-center px-4">
        <div className="flex flex-col items-center text-center mt-10 gap-4 px-6 py-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <Heart size={36} className="text-red-500" />
          <h3 className="text-2xl font-semibold">No favorites yet</h3>
          <p className="text-sm text-gray-600">
            Mark recipes as favorites by tapping the heart icon. Your favorite recipes will appear here for quick access!
          </p>
          <button className="bg-orange-500 py-3 px-6 text-white rounded-md hover:bg-orange-600 transition">
            Browse Recipes
          </button>
        </div>
      </section>
    </>
  );
}