import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Favorites from "./pages/FavoritePage";
import Shopping from "./pages/ShoppingPage";
import RecipeDetail from "./pages/RecipeDetailPage";
import Navbar from "./components/Navbar/Navbar";
import AddRecipe from "./pages/AddRecipePage";
import CuisineRecipesPage from "./pages/CuisineRecipesPage";
import QuickPicksPage from "./pages/QuickPickPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/shopping-list" element={<Shopping />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipes" element={<CuisineRecipesPage />} />
        <Route path="/quick-picks/:type" element={<QuickPicksPage />} />
      </Routes> 
    </>
  );
}

export default App;