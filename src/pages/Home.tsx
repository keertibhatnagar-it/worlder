import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { tmdb } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const [popular, setPopular] = useState<any[]>([]);
  const [now, setNow] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [top, setTop] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("loading state", loading);

  async function doSearch(e?: React.FormEvent) {
    e?.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      // Reset to default view
      setSearch(null);
      return;
    }

    try {
      setLoading(true);
      const res = await tmdb.searchMovies(trimmed);
      setSearch(res.data.results);
    } catch (err) {
      console.error(err);
      toast.error(t("home.searchFailed"));
    } finally {
      setLoading(false);
    }
  }

  async function watchTrailer(movieId: number) {
    try {
      const res = await tmdb.getMovieVideos(movieId);
      const trailer = res.data.results.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        toast.error(t("home.trailerNotFound"));
      }
    } catch (err) {
      console.error(err);
      toast.error(t("home.trailerError"));
    }
  }

  const sliderSettings = {
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

  useEffect(() => {
    async function loadMovies() {
      try {
        const [p, n, u, t] = await Promise.all([
          tmdb.getPopular(),
          tmdb.getNowPlaying(),
          tmdb.getUpcoming(),
          tmdb.getTopRated(),
        ]);

        setPopular(p.data.results.slice(0, 10));
        setNow(n.data.results.slice(0, 10));
        setUpcoming(u.data.results.slice(0, 10));
        setTop(t.data.results.slice(0, 10));
      } catch (err) {
        console.error(err);
        toast.error(t("home.failedToFetch"));
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);
  useEffect(() => {
    if (!query.trim()) {
      setSearch(null);
    }
  }, [query]);
  const featured = popular[0];

  return (
    <div className="min-h-screen pt-16 bg-gray-950 text-white pb-20">
      {/* Hero Banner */}
      {featured && (
        <div
          className="relative h-[70vh] flex flex-col justify-end bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
          <div className="relative z-10 px-8 md:px-16 pb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 max-w-2xl">
              {featured.title}
            </h1>
            <p className="max-w-2xl text-gray-300 text-sm md:text-base mb-6 line-clamp-3">
              {featured.overview}
            </p>
            <button
              onClick={() => watchTrailer(featured.id)}
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition"
            >
              {t("home.watchTrailer")}
            </button>
          </div>
        </div>
      )}

      {/*  Search Bar */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <form
          onSubmit={doSearch}
          className="flex gap-2 bg-gray-800 p-2 rounded-full overflow-hidden"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("home.searchMovies")}
            className="grow bg-transparent outline-none text-white px-4 py-2 placeholder-gray-400"
          />
          <button className="cursor-pointer px-6 bg-red-600 hover:bg-red-700 text-sm rounded-full transition">
            {t("home.search")}
          </button>
        </form>
      </div>

      {/*  Movie Sections */}
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {search ? (
          <section>
            <h3 className="text-xl font-semibold mb-4">
              {t("home.searchResults")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {search.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        ) : (
          <div className="sm:px-0 px-4">
            <MovieSlider
              title={t("home.popular")}
              movies={popular}
              settings={sliderSettings}
            />
            <MovieSlider
              title={t("home.nowPlaying")}
              movies={now}
              settings={sliderSettings}
            />
            <MovieSlider
              title={t("home.upcoming")}
              movies={upcoming}
              settings={sliderSettings}
            />
            <MovieSlider
              title={t("home.topRated")}
              movies={top}
              settings={sliderSettings}
            />
          </div>
        )}
      </div>
    </div>
  );
}
/* --- Slider Wrapper Component --- */
function MovieSlider({ title, movies, settings }: any) {
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const handleResize = () => sliderRef.current?.slickGoTo(0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section>
      <h3 className="text-xl font-semibold mb-3 px-2">{title}</h3>
      <Slider ref={sliderRef} {...settings}>
        {movies.map((m: any) => (
          <div key={m.id} className="px-2">
            <MovieCard movie={m} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
