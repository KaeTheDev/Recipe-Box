import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Favorites from "./pages/FavoritePage";
import Shopping from "./pages/ShoppingPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/shopping-list" element={<Shopping />} />
      </Routes>
    </>
  );
}

export default App;