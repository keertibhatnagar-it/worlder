import { Link, useNavigate } from "react-router-dom";
import { readSession, clearSession } from "../lib/auth";
import { FaFilm, FaStar, FaCompass } from "react-icons/fa";

export default function Header() {
  const user = readSession();
  const nav = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="cursor-pointer flex items-center gap-2 text-white text-2xl font-extrabold tracking-tight"
        >
          <FaFilm className="text-red-500 w-6 h-6" />
          <span>Worlder</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/explore"
            className="cursor-pointer text-gray-300 hover:text-white flex items-center gap-1 transition"
          >
            <FaCompass className="w-4 h-4" /> Explore
          </Link>
          <Link
            to="/favorites"
            className="cursor-pointer text-gray-300 hover:text-white flex items-center gap-1 transition"
          >
            <FaStar className="w-4 h-4" /> Favourites
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300 hidden sm:inline">
                Hi, {user.name || "User"}
              </span>
              <button
                onClick={() => {
                  clearSession();
                  nav("/");
                }}
                className="cursor-pointer px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full shadow-md transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="cursor-pointer px-5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full shadow-md transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
