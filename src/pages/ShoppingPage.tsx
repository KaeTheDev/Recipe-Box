import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShoppingPage() {
  const navigate = useNavigate(); 
  return (
    <>
      {/* Header Section */}
      <section className="bg-orange-50 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ShoppingBag size={24} className="text-orange-500" />
            <h2 className="text-3xl font-semibold">Shopping List</h2>
          </div>
          <p className="text-sm text-gray-600">2 Items</p>
        </div>
      </section>

      {/* Empty State */}
      <section className="flex justify-center px-4">
        <div className="flex flex-col items-center text-center mt-10 gap-4 px-6 py-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <ShoppingBag size={36} className="text-orange-500" />
          <h3 className="text-2xl font-semibold">
            Your Shopping List Is Empty
          </h3>
          <p className="text-sm text-gray-600">
            Add recipes to your shopping list to see ingredients here. Items
            from multiple recipes are automatically combined!
          </p>
          <button
            onClick={() => navigate("/")} 
            className="bg-orange-500 py-3 px-6 text-white rounded-md hover:bg-orange-600 transition"
          >
            Browse Recipes
          </button>
        </div>
      </section>
    </>
  );
}
