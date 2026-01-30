import { useParams } from "react-router-dom";
import { getRecipes } from "../utils/recipes";
import RecipeDetailHero from "../components/RecipeDetail/RecipeDetailHero/RecipeDetailHero";
import RecipeDetails from "../components/RecipeDetail/RecipeDetails/RecipeDetails";
import RecipeInstructions from "../components/RecipeDetail/RecipeInstructions/RecipeInstructions";
import RecipeIngredients from "../components/RecipeDetail/RecipeIngredients/RecipeIngredients";
import RecipeActions from "../components/RecipeDetail/RecipeActions/RecipeActions";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const recipe = getRecipes().find((r) => r.id === id);

  if(!recipe){
    return <p>Recipe Not Found</p>
  }
    return (
      <div className="min-h-screen bg-[#fff7f0]">
        {/* Hero */}
        <RecipeDetailHero recipe={recipe} />
  
        {/* Content */}
        <div
          className="
            max-w-6xl mx-auto
            px-4 sm:px-6 lg:px-8
            mt-8 md:mt-12
            pb-16
          "
        >
          <div
            className="
              flex flex-col
              lg:flex-row
              gap-6
            "
          >
            {/* LEFT COLUMN */}
            <div className="flex-1 flex flex-col gap-6">
              <RecipeDetails recipe={recipe} />
              <RecipeInstructions recipe={recipe} />
            </div>
  
            {/* RIGHT COLUMN */}
            <aside
              className="
                w-full
                lg:w-[320px]
                flex flex-col
                gap-6
                lg:mt-6
              "
            >
              <RecipeActions recipe={recipe} />
              <RecipeIngredients recipe={recipe} />
            </aside>
          </div>
        </div>
      </div>
    );
  }
  