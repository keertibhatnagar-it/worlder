import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: API_KEY },
});

//  Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Example: attach common params or headers
    config.params = { ...config.params, language: "en-US" };
    return config;
  },
  (error) => Promise.reject(error)
);

//  Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("TMDB Error:", error.response.status, error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);
