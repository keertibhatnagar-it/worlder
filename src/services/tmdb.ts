import { api } from "./api";

export const tmdb = {
  getPopular: (page = 1) => api.get("/movie/popular", { params: { page } }),
  getNowPlaying: (page = 1) => api.get("/movie/now_playing", { params: { page } }),
  getUpcoming: (page = 1) => api.get("/movie/upcoming", { params: { page } }),
  getTopRated: (page = 1) => api.get("/movie/top_rated", { params: { page } }),
  searchMovies: (query: string, page = 1) =>
    api.get("/search/movie", { params: { query, page } }),
  getMovieDetails: (id: number) =>
    api.get(`/movie/${id}`, { params: { append_to_response: "credits,videos" } }),
  image: (path: string | null, size = "w342") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.png",
};
