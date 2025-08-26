"use client";

import UserContext from "@/context/userContext/UserContextProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isLogin, setLogin, mood, setMood } = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter();

  function logOut() {
    localStorage.removeItem("userToken");
    setLogin(null);
    router.push("/Login");
  }

  const links = [
    { href: "/", label: "🏠 Home" },
    { href: "/Login", label: "Login" },
    { href: "/Register", label: "Register" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-4 sm:px-6 flex items-center justify-between z-50 backdrop-blur-lg border-b border-gray-200/20 shadow-lg transition-colors duration-500 ${
        mood === "light"
          ? "bg-white/20 text-purple-700"
          : "bg-gray-900/30 text-gray-200"
      }`}
      style={{ height: "3.5rem" }}
    >
      {/* Links Buttons */}
      <ul className="flex gap-3 sm:gap-5 items-center font-medium">
        {!isLogin &&
          links.map((link, index) => (
            <motion.li
              key={link.href}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 150,
                damping: 18,
                delay: 0.2 + index * 0.1,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: mood === "light" ? "0 8px 25px rgba(255,100,255,0.35)" : "0 8px 25px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-2xl transition-all duration-300 font-semibold ${
                  pathname === link.href
                    ? mood === "light"
                      ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-xl"
                      : "bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-md"
                    : mood === "light"
                    ? "bg-white/20 backdrop-blur-md text-purple-700 hover:bg-gradient-to-r from-purple-400 to-pink-400 hover:text-white shadow-lg"
                    : "bg-gray-800/50 text-gray-200 hover:bg-gray-700/60 hover:text-white shadow-inner"
                }`}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}

        {isLogin && (
          <motion.li
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150, damping: 18, delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: mood === "light" ? "0 8px 25px rgba(255,100,255,0.35)" : "0 8px 25px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={logOut}
              className={`px-4 py-2 rounded-2xl transition-all duration-300 font-semibold ${
                mood === "light"
                  ? "bg-white/20 backdrop-blur-md text-purple-700 hover:bg-gradient-to-r from-purple-400 to-pink-400 hover:text-white shadow-lg"
                  : "bg-gray-800/50 text-gray-200 hover:bg-gray-700/60 hover:text-white shadow-inner"
              }`}
            >
              Logout
            </button>
          </motion.li>
        )}
      </ul>

      {/* Mood Toggle - شكلها زي قبل */}
      <motion.button
        onClick={() => {
          const newMood = mood === "light" ? "dark" : "light";
          setMood(newMood);
          localStorage.setItem("mood", newMood);
        }}
        className={`w-9 h-9 outline-none sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg relative overflow-hidden transition-colors duration-500 ${
          mood === "light"
            ? "bg-[#d8b4fe] hover:shadow-purple-300/60"
            : "bg-gradient-to-br from-gray-700 to-gray-900 hover:shadow-indigo-500/50"
        }`}
      >
        <AnimatePresence mode="wait">
          {mood === "light" ? (
            <motion.svg
              key="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 absolute"
              initial={{ y: -10, opacity: 0, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <circle cx="12" cy="12" r="5" fill="#f5e1ff" />
              <g stroke="#6b21a8" strokeWidth="1.6">
                <line x1="12" y1="1.5" x2="12" y2="4.5" />
                <line x1="12" y1="19.5" x2="12" y2="22.5" />
                <line x1="1.5" y1="12" x2="4.5" y2="12" />
                <line x1="19.5" y1="12" x2="22.5" y2="12" />
                <line x1="4.5" y1="4.5" x2="6.7" y2="6.7" />
                <line x1="17.3" y1="17.3" x2="19.5" y2="19.5" />
                <line x1="4.5" y1="19.5" x2="6.7" y2="17.3" />
                <line x1="17.3" y1="6.7" x2="19.5" y2="4.5" />
              </g>
            </motion.svg>
          ) : (
            <motion.svg
              key="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-lg absolute"
              initial={{ y: 10, opacity: 0, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </nav>
  );
}
