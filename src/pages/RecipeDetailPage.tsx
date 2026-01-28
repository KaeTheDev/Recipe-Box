import RecipeDetailHero from "../components/RecipeDetailHero/RecipeDetailHero"
import RecipeDetails from "../components/RecipeDetails/RecipeDetails"
import RecipeInstructions from "../components/RecipeInstructions/RecipeInstructions"
import RecipeIngredients from "../components/RecipeIngredients/RecipeIngredients"

export default function RecipeDetailPage() {
    return(
        <>
        <RecipeDetailHero />
        <RecipeDetails />
        <RecipeIngredients />
        <RecipeInstructions />
        </>
    )
}