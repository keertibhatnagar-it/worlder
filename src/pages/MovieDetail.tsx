import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../services/tmdb";
import { motion } from "framer-motion";
import { FaStar, FaClock, FaHeart, FaRegHeart } from "react-icons/fa";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any | null>(null);
  const [favIds, setFavIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("worlder_favs") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!id) return;
    tmdb.getMovieDetails(Number(id)).then((r) => setMovie(r.data || r));
  }, [id]);

  function toggleFav() {
    if (!movie) return;
    const ids = new Set(favIds);
    if (ids.has(movie.id)) ids.delete(movie.id);
    else ids.add(movie.id);
    const arr = Array.from(ids);
    setFavIds(arr);
    localStorage.setItem("worlder_favs", JSON.stringify(arr));
  }

  if (!movie)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading movie details...
      </div>
    );

  const year = (movie.release_date || "").slice(0, 4);
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-b from-gray-950 via-black to-gray-900">
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
        style={{
          backgroundImage: `url(${tmdb.image(movie.backdrop_path || movie.poster_path, "w1280")})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {/* Left: Poster + Fav */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <img
            src={tmdb.image(movie.poster_path, "w500")}
            alt={movie.title}
            className="rounded-2xl shadow-2xl border border-gray-800"
          />

          <button
            onClick={toggleFav}
            className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
              favIds.includes(movie.id)
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {favIds.includes(movie.id) ? (
              <>
                <FaHeart className="text-white" /> Remove from Favourites
              </>
            ) : (
              <>
                <FaRegHeart className="text-red-400" /> Add to Favourites
              </>
            )}
          </button>
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="md:col-span-2"
        >
          <h1 className="text-4xl font-extrabold mb-3">
            {movie.title}{" "}
            <span className="text-gray-400 text-xl font-medium">({year})</span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-gray-300 mb-4">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" /> {movie.vote_average?.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <FaClock /> {movie.runtime} min
            </span>
            <span>{movie.genres?.map((g: any) => g.name).join(", ")}</span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">{movie.overview}</p>

          {/* Cast Section */}
          <h3 className="text-2xl font-semibold mb-3">Cast</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {cast.map((c: any) => (
              <div
                key={c.cast_id}
                className="text-center min-w-[120px] bg-gray-800/40 rounded-xl p-2 hover:bg-gray-700/40 transition"
              >
                <img
                  src={tmdb.image(c.profile_path, "w185")}
                  alt={c.name}
                  className="h-36 w-full object-cover rounded-lg mb-2"
                />
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-xs text-gray-400">as {c.character}</div>
              </div>
            ))}
          </div>

          {/* Trailer Section */}
          {trailer && (
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-3">Watch Trailer</h3>
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                <iframe
                  title="trailer"
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
