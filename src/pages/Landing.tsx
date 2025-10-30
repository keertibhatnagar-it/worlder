
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Landing() {
      const nav = useNavigate();
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-linear-to-b from-gray-900 via-black to-gray-950">
      {/* Background Image / Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/90"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
        >
          Discover, Watch & Collect
          <br />
          <span className="text-red-500">Your Favourite Movies</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 max-w-2xl text-lg text-gray-300"
        >
          Explore trending, top-rated, and upcoming movies from around the world.
          Create your personal watchlist and never miss a cinematic moment again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 flex gap-4"
        >
          <button onClick={()=>nav("/auth")} className="px-16 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold shadow-lg transition">
            Get Started
          </button>
        </motion.div>
      </div>

      {/* Decorative Overlay Cards */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6 z-10">
        {[
          "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
          "https://media.themoviedb.org/t/p/w440_and_h660_face/dj3QTYe7OVPjFTpUoEp2GEyLNrR.jpg",
          "https://image.tmdb.org/t/p/w500/wRxLAw4l17LqiFcPLkobriPTZAw.jpg",
        ].map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt="Featured Movie"
            className="w-36 h-52 object-cover rounded-2xl shadow-2xl border border-gray-700"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}
