import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Favorites from "./pages/FavoritePage";
import Shopping from "./pages/ShoppingPage";
import RecipeDetail from "./pages/RecipeDetailPage";
import Navbar from "./components/Navbar/Navbar";
import AddRecipe from "./pages/AddRecipe";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/shopping-list" element={<Shopping />} />
        <Route path="/recipe-detail" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes> 
    </>
  );
}

export default App;