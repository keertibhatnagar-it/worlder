import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { readSession } from "../lib/auth";

export default function Landing() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const user: any = readSession();

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-screen px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-snug sm:leading-tight"
        >
          {t("landing.title")}
          <br />
          <span className="text-red-500">{t("landing.titleHighlight")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 sm:mt-6 max-w-md sm:max-w-2xl text-base sm:text-lg text-gray-300"
        >
          {t("landing.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 sm:mt-10"
        >
          <button
            onClick={() => {
              user ? nav("explore") : nav("/auth");
            }}
            className="px-10 sm:px-16 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold text-sm sm:text-base shadow-lg transition-transform transform hover:scale-105 active:scale-95"
          >
            {t("landing.getStarted")}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
