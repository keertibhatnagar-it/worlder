import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const nav = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 dark:from-gray-900 dark:via-black dark:to-gray-950">
      {/* Background Image / Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/90"></div>

      {/* Hero Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-screen px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
        >
          {t("landing.title")}
          <br />
          <span className="text-red-500">{t("landing.titleHighlight")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 max-w-2xl text-lg text-gray-300"
        >
          {t("landing.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10"
        >
          <button
            onClick={() => nav("/auth")}
            className="cursor-pointer px-16 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold shadow-lg transition"
          >
            {t("landing.getStarted")}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
