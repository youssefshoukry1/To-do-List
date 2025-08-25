"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import UserContext from "@/context/userContext/UserContextProvider";

export default function Footer() {
  const { mood } = useContext(UserContext);
  const whatsappNumber = "201204470794";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full py-3 px-6 flex justify-center items-center shadow-inner transition-colors duration-500 ${
        mood === "light"
          ? "bg-gradient-to-br from-[rgb(235,190,228)] via-[rgb(245,210,235)] to-[rgb(225,170,215)] text-[#3b0a2e]"
          : "bg-gradient-to-b from-[#121212] to-[#1E1E1E] border-t border-[#2A2A2A] text-gray-300"
      }`}
    >
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-wrap justify-center items-center gap-1 text-xs sm:text-sm font-medium transition-all duration-300 ${
          mood === "light"
            ? "hover:text-purple-600 hover:scale-105"
            : "hover:text-green-400 hover:scale-105"
        }`}
      >
        Developed by{" "}
        <span
          className={
            mood === "light" ? "text-purple-700 ml-1" : "text-green-400 ml-1"
          }
        >
          Youssef Shoukry
        </span>{" "}
        | 💬 01204470794
      </a>
    </motion.footer>
  );
}