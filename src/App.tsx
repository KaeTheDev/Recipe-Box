import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Favorites from "./pages/FavoritePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;