"use client";
import UserContext from "@/context/userContext/UserContextProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { isLogin, setLogin } = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter();

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
      className="fixed top-0 left-0 w-full h-16 px-6 
                 backdrop-blur-md bg-black/30 border-b border-white/10
                 shadow-lg flex items-center justify-between z-50"
    >
      {/* Logo */}
      <motion.div
        className="text-xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent select-none"
        whileHover={{ scale: 1.1 }}
      >
        Do It
      </motion.div>

      {/* Links */}
      <ul className="flex gap-6 text-sm sm:text-base font-medium">
        {isLogin ? (
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={logOut}
              className="px-5 py-2 rounded-full transition-all duration-300 
                         bg-gradient-to-r from-red-500 to-red-700 
                         text-white shadow-md hover:shadow-red-500/30"
            >
              🚪 Logout
            </button>
          </motion.li>
        ) : (
          links.map((link) => (
            <motion.li
              key={link.href}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-full transition-all duration-300 
                  ${
                    pathname === link.href
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
              >
                {link.label}
              </Link>
            </motion.li>
          ))
        )}
      </ul>
    </motion.nav>
  );
}
