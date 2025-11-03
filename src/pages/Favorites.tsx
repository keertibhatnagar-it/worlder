import { useEffect, useState } from "react";
import { tmdb } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function Favorites() {
  const { t } = useTranslation();
  const [ids, setIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("worlder_favs") || "[]");
    } catch {
      return [];
    }
  });
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const items = await Promise.all(
        ids.map((id) =>
          tmdb
            .getMovieDetails(id)
            .then((r) => r)
            .catch(() => null)
        )
      );
      setMovies(items.filter(Boolean));
    }
    load();
  }, [ids]);

  function remove(id: number) {
    const next = ids.filter((i) => i !== id);
    setIds(next);
    localStorage.setItem("worlder_favs", JSON.stringify(next));
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-black text-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-white flex items-center gap-3">
            <FaHeart className="text-red-500 drop-shadow-md animate-pulse" />
            <span className="text-gray-200 tracking-wide italic">
              {t("favorites.myFavorites")}
            </span>
          </h2>
          {movies.length > 0 && (
            <p className="text-gray-400 text-sm">
              {movies.length}{" "}
              {movies.length === 1
                ? t("favorites.movie")
                : t("favorites.movies")}
            </p>
          )}
        </div>

        {/* Empty State */}
        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <FaHeart className="text-7xl text-gray-600 mb-6 animate-pulse" />
            <p className="text-lg md:text-xl font-light">
              {t("favorites.noFavoritesYet")}
            </p>
          </div>
        ) : (
          /* Movies Grid */
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            <AnimatePresence>
              {movies.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="relative group"
                >
                  <div className="rounded-xl overflow-hidden shadow-lg shadow-black/40 hover:shadow-red-600/20 hover:-translate-y-1 transition duration-300">
                    <MovieCard movie={m.data} />
                  </div>
                  <button
                    onClick={() => remove(m.data.id)}
                    className="absolute top-2 right-2 cursor-pointer bg-black/70 backdrop-blur-sm hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-200"
                    title={t("favorites.removeFromFavorites")}
                  >
                    <IoMdCloseCircle className="text-2xl" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
