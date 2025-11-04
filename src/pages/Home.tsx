import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

  const swiperConfig = {
    modules: [Navigation],
    spaceBetween: 8,
    slidesPerView: 1.3,
    slidesPerGroup: 1,
    navigation: false,
    speed: 600,
    freeMode: false,
    grabCursor: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 14,
      },
      1536: {
        slidesPerView: 5,
        spaceBetween: 16,
      },
    },
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
              settings={swiperConfig}
            />
            <MovieSlider
              title={t("home.nowPlaying")}
              movies={now}
              settings={swiperConfig}
            />
            <MovieSlider
              title={t("home.upcoming")}
              movies={upcoming}
              settings={swiperConfig}
            />
            <MovieSlider
              title={t("home.topRated")}
              movies={top}
              settings={swiperConfig}
            />
          </div>
        )}
      </div>
    </div>
  );
}
/* --- Slider Wrapper Component --- */
function MovieSlider({ title, movies, settings }: any) {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4 px-2">{title}</h3>
      <div className="relative group">
        <Swiper ref={swiperRef} {...settings} className="!pb-4">
          {movies.map((m: any) => (
            <SwiperSlide key={m.id}>
              <MovieCard movie={m} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Arrows */}
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600 text-white rounded-full p-2.5 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 backdrop-blur-sm shadow-lg active:scale-95"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600 text-white rounded-full p-2.5 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 backdrop-blur-sm shadow-lg active:scale-95"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>
    </section>
  );
}
