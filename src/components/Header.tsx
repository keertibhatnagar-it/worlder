import { Link, useNavigate } from "react-router-dom";
import { readSession, clearSession} from "../lib/auth";
import { FaFilm, FaStar, FaCompass } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Header() {
  const user:any = readSession();
  const nav = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' },
  ];

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
            <FaCompass className="w-4 h-4" /> {t("header.explore")}
          </Link>
          <Link
            to="/favorites"
            className="cursor-pointer text-gray-300 hover:text-white flex items-center gap-1 transition"
          >
            <FaStar className="w-4 h-4" /> {t("header.favorites")}
          </Link>
        </nav>

        {/* Auth Buttons & Language Selector */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative group">
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md border border-gray-700 cursor-pointer outline-none focus:border-red-500 transition"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300 hidden sm:inline">
                {t("header.hi")}, {user[0].name || "User"}
              </span>
              <button
                onClick={() => {
                  clearSession();
                  nav("/");
                }}
                className="cursor-pointer px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full shadow-md transition"
              >
                {t("header.signOut")}
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="cursor-pointer px-5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full shadow-md transition"
            >
              {t("header.signIn")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
