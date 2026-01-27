import { NavLink } from "react-router-dom";
import { Book, House, Heart, List, PlusCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Book size={40} className="text-red-500" />
        <div>
          <h1 className="text-xl font-bold">Recipe Box</h1>
          <p className="text-sm text-gray-600">
            Your Personal Recipe Collection
          </p>
        </div>
      </div>

      {/* Navigation */}
      <ul className="flex gap-2">
        {[
          { to: "/", label: "Home", icon: House },
          { to: "/favorites", label: "Favorites", icon: Heart },
          { to: "/shopping-list", label: "Shopping List", icon: List },
        ].map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-full transition
                 ${
                   isActive
                     ? "bg-red-100 text-red-700"
                     : "text-red-700 hover:bg-red-50"
                 }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Call-to-Action */}
      <button className="flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 text-white hover:bg-green-600">
        <PlusCircle size={18} />
        Add Recipe
      </button>
    </nav>
  );
}