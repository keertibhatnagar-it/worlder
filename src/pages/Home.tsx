import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { tmdb } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import toast from "react-hot-toast"; 
export default function Home() {
 const [popular, setPopular] = useState<any[]>([]);
  const [now, setNow] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [top, setTop] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

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
        toast.error("Failed to fetch movie data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  async function doSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) {
      setSearch(null);
      return;
    }

    try {
      const res = await tmdb.searchMovies(query);
      setSearch(res.data.results);
    } catch (err) {
      console.error(err);
      toast.error("Search failed. Please check your connection.");
    }
  }

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  const featured = popular[0];

  return (
    <div className="min-h-screen pt-16 bg-gray-950 text-white pb-20">
      {/* 🎬 Hero Banner */}
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
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition">
              Watch Trailer
            </button>
          </div>
        </div>
      )}

      {/* 🔍 Search Bar */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <form
          onSubmit={doSearch}
          className="flex gap-2 bg-gray-800 p-2 rounded-full overflow-hidden"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="grow bg-transparent outline-none text-white px-4 py-2 placeholder-gray-400"
          />
          <button className="px-6 bg-red-600 hover:bg-red-700 text-sm rounded-full transition">
            Search
          </button>
        </form>
      </div>

      {/* 🎞️ Movie Sections */}
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {search ? (
          <section>
            <h3 className="text-xl font-semibold mb-4">Search Results</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {search.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        ) : (
          <>
            <MovieSlider title="Popular" movies={popular} settings={sliderSettings} />
            <MovieSlider title="Now Playing" movies={now} settings={sliderSettings} />
            <MovieSlider title="Upcoming" movies={upcoming} settings={sliderSettings} />
            <MovieSlider title="Top Rated" movies={top} settings={sliderSettings} />
          </>
        )}
      </div>
    </div>
  );
}

/* --- Slider Wrapper Component --- */
function MovieSlider({ title, movies, settings }: any) {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-3 px-2">{title}</h3>
      <Slider {...settings}>
        {movies.map((m: any) => (
          <div key={m.id} className="px-2">
            <MovieCard movie={m} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
