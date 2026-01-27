import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Book, House, Heart, List, PlusCircle, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: House },
    { to: "/favorites", label: "Favorites", icon: Heart },
    { to: "/shopping-list", label: "Shopping List", icon: List },
  ];

  return (
    <nav className="relative bg-white shadow-md px-6 py-4">
      {/* Logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Book size={40} className="text-red-500" />
          <div>
            <h1 className="text-xl font-bold">Recipe Box</h1>
            <p className="text-sm text-gray-600">
              Your Personal Recipe Collection
            </p>
          </div>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
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

          <button className="flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 text-white hover:bg-green-600">
            <PlusCircle size={18} />
            Add Recipe
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white shadow-md rounded-lg">
          <ul className="flex flex-col gap-2 px-4 py-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-center gap-2 px-4 py-2 rounded-full transition
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

            {/* CTA inside mobile dropdown */}
            <li>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 w-full justify-center rounded-full bg-green-700 px-4 py-2 text-white hover:bg-green-600"
              >
                <PlusCircle size={18} />
                Add Recipe
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}