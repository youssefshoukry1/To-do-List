"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease:"easeOut" as const} },
  };

  const whatsappNumber = "201204470794";

  return (
    <motion.footer
      className="w-full py-3 bg-gray-800 border-t border-gray-700
      text-gray-300 flex justify-center items-center px-2 shadow-inner"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-wrap justify-center items-center gap-1 text-xs sm:text-sm font-medium 
                   hover:text-green-400 hover:scale-105 transition-all duration-300"
      >
        Developed by <span className="text-green-400 ml-1">Youssef Shoukry</span> | 💬 01204470794
      </a>
    </motion.footer>
  );
}
