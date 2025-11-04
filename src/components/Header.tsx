import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readSession, clearSession } from "../lib/auth";
import {
  FaFilm,
  FaHeart,
  FaCompass,
  FaGlobe,
  FaUserCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Header() {
  const user: any = readSession();
  const nav = useNavigate();
  const { t, i18n } = useTranslation();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const WorldFav = JSON.parse(localStorage.getItem("worlder_favs") || "[]");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  // 🔒 Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
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
            <FaHeart className="w-4 h-4" /> {t("header.favorites")}
          </Link>
        </nav>

        {/* Desktop Right Section */}
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

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-5 text-white text-xl relative">
          {/* Explore */}
          <Link to="/explore" className="hover:text-red-500">
            <FaCompass />
          </Link>

          {/* Favorites (Heart Icon) */}
          <Link to="/favorites" className="relative hover:text-red-500">
            <FaHeart className="text-xl" />
            {WorldFav.length && user ? (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {WorldFav.length}
              </span>
            ) : null}
          </Link>

          {/* Language (Globe Icon) */}
          <div className="relative" ref={langMenuRef}>
            <FaGlobe
              className="cursor-pointer hover:text-red-500"
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setUserMenuOpen(false);
              }}
            />
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 bg-black border border-gray-700 rounded-md overflow-hidden shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Icon */}
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <>
                <FaUserCircle
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setLangMenuOpen(false);
                  }}
                />
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-black border border-gray-700 rounded-md shadow-lg overflow-hidden">
                    <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                      {user[0].name || "User"}
                    </div>
                    <button
                      onClick={() => {
                        clearSession();
                        nav("/");
                        setUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800"
                    >
                      {t("header.signOut")}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/auth" className="hover:text-red-500">
                <FaUserCircle />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
