import { useEffect, useState } from 'react'
import { tmdb } from '../services/tmdb'
import MovieCard from '../components/MovieCard'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { IoMdCloseCircle } from 'react-icons/io'

export default function Favorites() {
  const [ids, setIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('worlder_favs') || '[]')
    } catch {
      return []
    }
  })
  const [movies, setMovies] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const items = await Promise.all(
        ids.map((id) =>
          tmdb.getMovieDetails(id).then((r) => r).catch(() => null)
        )
      )
      setMovies(items.filter(Boolean))
    }
    load()
  }, [ids])

  function remove(id: number) {
    const next = ids.filter((i) => i !== id)
    setIds(next)
    localStorage.setItem('worlder_favs', JSON.stringify(next))
  }

  return (
    <div className="min-h-screen pt-18 bg-linear-to-b from-gray-950 via-gray-900 to-black text-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-2xl italic mb-8 text-gray-50 flex items-center gap-3  text-white">
          <FaHeart className="text-red-500 drop-shadow-md" />
          <span className='text-gray-300'>My Favourites</span>
        </h2>

        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FaHeart className="text-6xl text-gray-600 mb-6 animate-pulse" />
            <p className="text-lg md:text-xl">No favourites yet — add your top picks!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <AnimatePresence>
              {movies.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="relative group"
                >
                  <div className="rounded-xl overflow-hidden shadow-lg shadow-black/40">
                    <MovieCard movie={m} />
                  </div>

                  {/* remove button */}
                  <button
                    onClick={() => remove(m.id)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-200"
                  >
                    <IoMdCloseCircle className="text-xl" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
