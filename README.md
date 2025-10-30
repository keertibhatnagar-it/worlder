# Worlder

A small React + TypeScript + Tailwind app that shows TMDB movies and supports authentication.

## Features implemented

- Email/password registration (password stored as a simple base64 hash for demo only).
- Fake social logins (Google, Facebook, Apple) — no real provider integration; users are saved to localStorage.
- Session saved to localStorage.
- TMDB integration (you must provide your own API key).
- Browse: popular, now playing, upcoming, top-rated movies.
- Search movies by keyword.
- Movie details with cast, release year, synopsis, rating and optional trailer (YouTube via TMDB video data).
- Favourites saved in localStorage (add / remove).

## Setup

1. Create a project folder and copy files accordingly, or run `npm init vite@latest worlder -- --template react-ts` and replace src files with these.
2. Install deps: `npm install`.
3. Create `.env` at project root with: `VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY`
4. Run: `npm run dev`

## LocalStorage keys

- `worlder_users` — array of saved users
- `worlder_session` — currently signed-in user
- `worlder_favs` — array of favourite movie IDs
