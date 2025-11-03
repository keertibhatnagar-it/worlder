import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readSession, clearSession } from "../lib/auth";
import { FaFilm, FaStar, FaCompass, FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Header() {
  const user: any = readSession();
  const nav = useNavigate();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white text-2xl font-extrabold tracking-tight"
        >
          <FaFilm className="text-red-500 w-6 h-6" />
          <span>Worlder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/explore"
            className="text-gray-300 hover:text-white flex items-center gap-1 transition"
          >
            <FaCompass className="w-4 h-4" /> {t("header.explore")}
          </Link>
          <Link
            to="/favorites"
            className="text-gray-300 hover:text-white flex items-center gap-1 transition"
          >
            <FaStar className="w-4 h-4" /> {t("header.favorites")}
          </Link>
        </nav>

        {/* Desktop Auth + Language */}
        <div className="hidden md:flex items-center gap-4">
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md border border-gray-700 cursor-pointer focus:border-red-500 transition"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300">
                {t("header.hi")}, {user[0].name || "User"}
              </span>
              <button
                onClick={() => {
                  clearSession();
                  nav("/");
                }}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full shadow-md transition"
              >
                {t("header.signOut")}
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full shadow-md transition"
            >
              {t("header.signIn")}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown (smooth animation without Framer Motion) */}
      <div
        className={`md:hidden bg-black/90 border-t border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-[400px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <Link
            to="/explore"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300 hover:text-white flex items-center gap-1"
          >
            <FaCompass /> {t("header.explore")}
          </Link>
          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className="text-gray-300 hover:text-white flex items-center gap-1"
          >
            <FaStar /> {t("header.favorites")}
          </Link>

          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md border border-gray-700 cursor-pointer focus:border-red-500 transition"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          {user ? (
            <button
              onClick={() => {
                clearSession();
                nav("/");
                setMenuOpen(false);
              }}
              className="px-5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full"
            >
              {t("header.signOut")}
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full"
            >
              {t("header.signIn")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
