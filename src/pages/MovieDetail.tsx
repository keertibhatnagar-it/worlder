import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../services/tmdb";
import { motion } from "framer-motion";
import { FaStar, FaClock, FaHeart, FaRegHeart } from "react-icons/fa";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

export default function MovieDetail() {
  const { t } = useTranslation();
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
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

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
        {t("movieDetail.loading")}
      </div>
    );

  const year = (movie.release_date || "").slice(0, 4);
  const cast = movie.credits?.cast?.slice(0, 12) || [];
  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="relative min-h-screen text-white bg-linear-to-b from-gray-950 via-black to-gray-900">
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
        style={{
          backgroundImage: `url(${tmdb.image(
            movie.backdrop_path || movie.poster_path,
            "w1280"
          )})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Poster & Fav Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:sticky md:top-24"
        >
          <img
            src={tmdb.image(movie.poster_path, "w500")}
            alt={movie.title}
            className="rounded-2xl shadow-2xl border border-gray-800 w-full max-w-[320px] mx-auto md:mx-0"
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
                <FaHeart className="text-white" />{" "}
                {t("movieDetail.removeFromFavorites")}
              </>
            ) : (
              <>
                <FaRegHeart className="text-red-400" />{" "}
                {t("movieDetail.addToFavorites")}
              </>
            )}
          </button>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="md:col-span-2 space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight">
            {movie.title}{" "}
            <span className="text-gray-400 text-lg font-medium">({year})</span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-gray-300 text-sm sm:text-base">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />{" "}
              {movie.vote_average?.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <FaClock /> {movie.runtime} {t("movieDetail.min")}
            </span>
            <span>{movie.genres?.map((g: any) => g.name).join(", ")}</span>
          </div>

          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            {movie.overview}
          </p>

          {/* Cast Slider */}
          {cast.length > 0 && (
            <CastSlider cast={cast} title={t("movieDetail.cast")} />
          )}

          {/* Trailer */}
          {trailer && (
            <div className="mt-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                {t("movieDetail.watchTrailer")}
              </h3>
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

export function CastSlider({ cast, title }: any) {
  const { t } = useTranslation();
  const sliderRef = useRef<Slider | null>(null);

  const fallbackCastImg = "https://via.placeholder.com/185x278?text=No+Image";

  // Reset slider position when resizing (prevents cutoff issues)
  useEffect(() => {
    const handleResize = () => sliderRef.current?.slickGoTo(0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Default slick slider with responsive setup
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 5, //  default for large desktop
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 4 } }, // below 1536px
      { breakpoint: 1280, settings: { slidesToShow: 3 } }, // below 1280px
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // below 1024px
      { breakpoint: 640, settings: { slidesToShow: 1.3 } }, // below 640px (mobile)
    ],
  };

  return (
    <section className="px-4 sm:px-0">
      <h3 className="text-xl sm:text-2xl font-semibold mb-3">{title}</h3>
      <div className="overflow-hidden -mx-2">
        <Slider ref={sliderRef} {...settings}>
          {" "}
          {cast.map((c: any) => {
            const imgSrc = c.profile_path
              ? tmdb.image(c.profile_path, "w185")
              : fallbackCastImg;
            return (
              <div key={c.cast_id || c.credit_id || c.id} className="px-2">
                {" "}
                <div className="text-center bg-gray-800/40 rounded-xl p-3 hover:bg-gray-700/40 transition">
                  {" "}
                  <img
                    src={imgSrc}
                    alt={c.name}
                    onError={(e: any) =>
                      (e.currentTarget.src = fallbackCastImg)
                    }
                    className="h-36 sm:h-40 w-full object-cover rounded-lg mb-2"
                  />{" "}
                  <div className="text-xs sm:text-sm font-medium truncate">
                    {" "}
                    {c.name}{" "}
                  </div>{" "}
                  <div className="text-[10px] sm:text-xs text-gray-400 truncate">
                    {" "}
                    {t("movieDetail.as")} {c.character}{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            );
          })}{" "}
        </Slider>
      </div>
    </section>
  );
}
