import { Link } from "react-router-dom";
import { tmdb } from "../services/tmdb";

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden transition-transform group  w-full ">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={tmdb.image(movie.poster_path, "w342")}
          alt={movie.title}
          className="w-full h-[260px] object-cover group-hover:scale-105 overflow-hidden duration-300"
        />
      </Link>
      <div className="p-2 text-center">
        <h3 className="text-sm font-semibold truncate text-gray-700 group-hover:text-red-600">
          {movie.title}
        </h3>
        <div className="text-xs text-gray-500">
          {new Date(movie.release_date || "").getFullYear() || "—"} •{" "}
          {movie.vote_average?.toFixed(1) || "—"}
        </div>
      </div>
    </div>
  );
}
