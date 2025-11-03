import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  // OAuthProvider,
} from "firebase/auth";
import { writeUsers } from "../lib/auth";
import { useTranslation } from "react-i18next";

export default function RegisterLogin() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  // -------- Social Login --------
  async function socialLogin(providerType: "google" | "facebook" | "apple") {
    try {
      let provider;
      if (providerType === "google") provider = new GoogleAuthProvider();
      if (providerType === "facebook") provider = new FacebookAuthProvider();
      // if (providerType === 'apple') provider = new OAuthProvider('apple.com')
      if (providerType === "apple") {
        alert(t("auth.appleLoginNotAvailable"));
        return;
      }

      const result = await signInWithPopup(auth, provider!);
      const user = result.user;

      // Store user info in localStorage
      const userData = [
        {
          id: user.uid || "",
          name: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          provider: providerType,
        },
      ];

      writeUsers(userData);

      nav("/");
    } catch (error: any) {
      console.error(error);
      setErr(error.message || t("auth.socialLoginFailed"));
    }
  }

  // -------- Register --------
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email || !password || !name) {
      setErr(t("auth.fillAllFields"));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      nav("/");
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/email-already-in-use")
        setErr(t("auth.emailAlreadyRegistered"));
      else if (error.code === "auth/weak-password")
        setErr(t("auth.weakPassword"));
      else setErr(error.message);
    }
  }

  // -------- Login --------
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email || !password) {
      setErr(t("auth.fillAllFields"));
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/");
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/user-not-found") setErr(t("auth.userNotFound"));
      else if (error.code === "auth/wrong-password")
        setErr(t("auth.wrongPassword"));
      else setErr(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left: Social login panel */}
        <div className="p-8 md:p-10 bg-linear-to-br from-blue-700/20 to-purple-800/10 flex flex-col justify-center border-r border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-white">
            {mode === "register" ? t("auth.createAccount") : t("auth.welcomeBack")}
          </h2>
          <p className="text-gray-400 mb-8 text-sm">
            {t("auth.continueWith")}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => socialLogin("google")}
              className="flex items-center justify-center gap-3 bg-white/90 hover:bg-white text-gray-900 font-medium py-2 rounded-lg transition"
            >
              <FcGoogle size={22} /> {t("auth.continueWithGoogle")}
            </button>

            <button
              onClick={() => socialLogin("facebook")}
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
            >
              <FaFacebook size={20} /> {t("auth.continueWithFacebook")}
            </button>

            <button
              onClick={() => socialLogin("apple")}
              className="flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white font-medium py-2 rounded-lg transition border border-gray-700"
            >
              <FaApple size={20} /> {t("auth.continueWithApple")}
            </button>
          </div>
        </div>

        {/* Right: Email/password form */}
        <div className="p-8 md:p-10 flex flex-col justify-center text-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-400">{t("auth.useEmailInstead")}</div>
            <div>
              <button
                className={`px-3 py-1 rounded-md transition ${
                  mode === "register"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setMode("register")}
              >
                {t("auth.register")}
              </button>
              <button
                className={`px-3 py-1 rounded-md transition ${
                  mode === "login"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setMode("login")}
              >
                {t("auth.login")}
              </button>
            </div>
          </div>

          <form
            onSubmit={mode === "register" ? handleRegister : handleLogin}
            className="flex flex-col gap-4"
          >
            {mode === "register" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("auth.fullName")}
                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.email")}
              type="email"
              className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.password")}
              className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {err && <div className="text-sm text-red-500">{err}</div>}

            <button
              type="submit"
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition text-white font-semibold py-2 rounded-md shadow-lg mt-2"
            >
              {mode === "register" ? t("auth.createAccountBtn") : t("auth.signInBtn")}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
