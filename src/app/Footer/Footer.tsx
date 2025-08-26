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
      transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
      className={`w-full py-4 px-6 flex justify-center items-center backdrop-blur-lg  shadow-inner transition-colors duration-500 ${
        mood === "light"
          ? "bg-purple-50/60 text-gray-800 border-t border-purple-200/30"
          : "bg-gray-900/70 text-gray-200 border-t border-gray-700/50"
      }`}
    >
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-wrap justify-center items-center gap-1 text-sm font-medium transition-transform duration-300 transform hover:scale-105 hover:drop-shadow-lg"
      >
        Developed by{" "}
        <span
          className={`font-bold bg-clip-text text-transparent animate-gradient bg-gradient-to-r ${
            mood === "light"
              ? "from-purple-600 via-pink-500 to-red-400"
              : "from-indigo-400 via-purple-400 to-pink-400"
          }`}
          style={{
            backgroundSize: "200% auto",
            animation: "gradientShift 3s linear infinite",
          }}
        >
          Youssef Shoukry
        </span>{" "}
        | 💬 01204470794
      </a>

      {/* Gradient Animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.footer>
  );
}
