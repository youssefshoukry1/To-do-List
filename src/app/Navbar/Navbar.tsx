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
  const newMood = mood === "dark" ? "light" : "dark";
  setMood(newMood);

  document.body.classList.remove("bg-light", "bg-dark"); // شيل القديم
  document.body.classList.add(newMood === "light" ? "bg-light" : "bg-dark"); // ضيف الجديد
};

  function logOut() {
    localStorage.removeItem("userToken");
    setLogin(null);
    router.push("/Login");
  }

  const links = [
    { href: "/", label: "🏠 Home" },
    { href: "/Login", label: "🔑 Login" },
    { href: "/Register", label: "🔑 Register" },
  ];

  return (
<motion.nav
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className={`fixed top-0 left-0 w-full px-4 sm:px-6 flex items-center justify-between z-50 backdrop-blur-md border-b shadow-lg transition-colors duration-500 ${
    mood === "light"
      ? "bg-gradient-to-br from-[rgb(235,190,228)] via-[rgb(245,210,235)] to-[rgb(225,170,215)] border-[rgb(200,130,180)] text-[#3b0a2e]"
      : "bg-[#121212]/80 border-[#2A2A2A] text-gray-200"
  }`}
  style={{ height: "3.5rem" }}
>
  {/* Links + Buttons */}
  <ul className="flex gap-2 sm:gap-4 items-center font-medium">
    {isLogin && (
      <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <button
          onClick={logOut}
          className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 bg-gradient-to-r from-red-500 to-red-700 text-white shadow-md hover:shadow-red-500/30 text-xs sm:text-sm md:text-base"
        >
          🚪 Logout
        </button>
      </motion.li>
    )}

    {!isLogin &&
      links.map((link) => (
        <motion.li
          key={link.href}
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
<Link
  href={link.href}
  className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base ${
    pathname === link.href
      ? mood === "light"
        ? "bg-[#f3e8ff] border border-purple-400 text-purple-700 shadow-sm hover:bg-purple-500 hover:text-white"
        : "bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-md hover:shadow-indigo-500/40"
      : mood === "light"
      ? "text-purple-700 border border-purple-300 hover:bg-purple-500 hover:text-white hover:border-purple-500"
      : "text-gray-300 hover:text-white hover:bg-gray-700/40"
  }`}
>
  {link.label}
</Link>
        </motion.li>
      ))}
  </ul>

  {/* Mode Toggle */}
 <motion.button
  onClick={() => {
    const newMood = mood === "light" ? "dark" : "light";
    setMood(newMood);
    localStorage.setItem("mood", newMood); // ✅ يخزن الجديد ويشيل القديم
  }}
  className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg relative overflow-hidden transition-colors duration-500 ${
    mood === "light"
      ? "bg-[#d8b4fe] hover:shadow-purple-300/60" // 🎨 موف فاتح ثابت
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
        {/* الشمس (موف فاتح ثابت) */}
        <circle cx="12" cy="12" r="5" fill="#f5e1ff" /> 
        {/* tailwind: purple-100 تقريبًا */}

        {/* الأشعة */}
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
</motion.nav>
  );
}