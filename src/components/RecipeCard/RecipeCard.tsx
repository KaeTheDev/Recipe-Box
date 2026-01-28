import { Clock, ChefHat, Flame, Heart } from "lucide-react";
import MacandCheese from "../../assets/MacandCheese.png";

export default function RecipeCard() {
  return (
    <div className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden w-64">
      {/* Top badges */}
      <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">
        Medium
      </div>
      <button className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-600">
        <Heart />
      </button>

      {/* Recipe Image */}
      <img
        src={MacandCheese}
        alt="Mac and Cheese"
        className="w-full h-40 object-cover"
      />

      {/* Card Content */}
      <div className="flex flex-col p-4 gap-2">
        <h3 className="text-lg font-semibold text-gray-800">
          Classic Mac and Cheese
        </h3>
        <p className="text-sm text-gray-600">
        The ultimate American comfort food - creamy, cheesy, perfect!
        </p>
        <p className="text-xs text-gray-500">#quick #family favorite</p>

        {/* Stats Row */}
        <div className="flex flex-row justify-between mt-2 text-gray-700 text-sm">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>35 min</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat size={16} />
            <span>4 Servings</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={16} />
            <span>American</span>
          </div>
        </div>
      </div>
    </div>
  );
}