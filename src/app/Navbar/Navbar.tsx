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

  const handleMood = () => {
    setMood(mood === "dark" ? "light" : "dark");
    document.body.classList.toggle("bg-light", mood === "dark");
    document.body.classList.toggle("bg-dark", mood === "light");
  };

  function logOut() {
    localStorage.removeItem("userToken");
    setLogin(null);
    router.push("/Login");
  }

  const links = [
    { href: "/", label: "🏠 Home" },
    { href: "/Login", label: "🔑 Login" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full px-4 sm:px-6 flex items-center justify-between z-50 backdrop-blur-md border-b shadow-lg transition-colors duration-500 ${
        mood === "light"
          ? "bg-gradient-to-br from-indigo-700 via-purple-600 to-indigo-700 border-purple-500"
          : "bg-[#121212]/80 border-[#2A2A2A]"
      }`}
      style={{ height: "3.5rem" }} // أصغر على الموبايل
    >
{/* Logo */}
<motion.div
  className={`text-lg sm:text-xl font-extrabold bg-clip-text text-transparent select-none transition-colors duration-500 ${
    mood === "light"
      ? "bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500"
      : "bg-gradient-to-r from-gray-300 via-gray-100 to-white"
  }`}
  whileHover={{ scale: 1.1 }}
>
  Go Beyond!
</motion.div>+

      {/* Links + Buttons */}
      <ul className="flex gap-3 sm:gap-4 items-center text-xs sm:text-sm font-medium">
        {isLogin && (
          <>
            {/* Mood Button */}
            <motion.button
              onClick={handleMood}
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow-lg relative overflow-hidden transition-colors duration-500 ${
                mood === "light"
                  ? "bg-gradient-to-br from-yellow-400 to-pink-500 hover:shadow-pink-400/50"
                  : "bg-gradient-to-br from-yellow-400 to-pink-500 hover:shadow-pink-400/50"
              }`}
            >
              <AnimatePresence exitBeforeEnter>
                {mood === "light" ? (
                  <motion.svg
                    key="sun"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 absolute"
                    initial={{ y: -10, opacity: 0, scale: 0.7 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                  >
                    <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 7.464M12 6a6 6 0 100 12 6 6 0 000-12z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg absolute"
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

            {/* Logout */}
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={logOut}
                className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 bg-gradient-to-r from-red-500 to-red-700 text-white shadow-md hover:shadow-red-500/30 text-xs sm:text-sm"
              >
                🚪 Logout
              </button>
            </motion.li>
          </>
        )}

        {!isLogin &&
          links.map((link) => (
            <motion.li key={link.href} whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={link.href}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm ${
                  pathname === link.href
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : mood === "light"
                    ? "text-white hover:bg-white/10"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
      </ul>
    </motion.nav>
  );
}