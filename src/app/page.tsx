"use client";

import UserContext from "@/context/userContext/UserContextProvider";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { isLogin, mood } = useContext(UserContext);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);


  // تحميل المهام من localStorage
  useEffect(() => {
    if (isLogin) {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    }
  }, [isLogin]);

  // حفظ المهام
  useEffect(() => {
    if (isLogin) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLogin]);

  // إضافة مهمة جديدة
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  // عمل check
  const handleCheck = (index: number) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // حذف
  const handleDelete = (index: number, e: React.FormEvent) => {
    e.preventDefault();
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleDeleteAll = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([]);
  };

  return (
<section
  className={`p-4 sm:p-6 pt-24 flex flex-col justify-center items-center min-h-screen transition-all duration-500 ${
    mood === "light"
      ? "bg-gradient-to-br from-[rgb(235,190,228)] via-[rgb(245,210,235)] to-[rgb(225,170,215)] text-[#3b0a2e]"
      : "bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-gray-200"
  }`} >{
  !isLogin && (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute top-28 sm:top-20 md:top-20 left-1/2 -translate-x-1/2 text-center text-sm sm:text-base md:text-lg px-4"
    >
      Register now to save your notes !
    </motion.p>
  )
}


    
  {/* العنوان */}
  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={`text-2xl sm:text-3xl font-bold mb-6 text-center ${
      mood === "light" ? "text-[rgb(120,40,100)]" : "text-green-400"
    } lg:pt-15`}
  >
    Can You ?
  </motion.h1>

  {/* الفورم */}
  <motion.form
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={`w-full max-w-full md:max-w-2xl rounded-2xl p-4 sm:p-6 flex flex-col gap-5 lg:h-[65vh] h-[58vh] lg:mb-0 mb-12 shadow-2xl transition-colors duration-500 ${
      mood === "light"
        ? "bg-[rgb(245,210,235)]/80 backdrop-blur-lg border border-[rgb(235,190,228)]"
        : "bg-[#1E1E1E]"
    }`}
  >
    {/* Input + Buttons */}
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        className={`flex-1 outline-none px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-sm sm:text-base placeholder-gray-500 transition-colors duration-500 ${
          mood === "light"
            ? "bg-[rgb(235,190,228)] text-[#3b0a2e]"
            : "bg-[#2A2A2A] text-gray-200"
        }`}
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium sm:font-semibold shadow-md text-sm sm:text-base w-full sm:w-auto transition-colors duration-500 ${
          mood === "light"
            ? "bg-[rgb(200,130,180)] hover:bg-[rgb(180,100,150)] text-white"
            : "bg-[#00C853] hover:bg-green-500 text-[#F5F5F5]"
        }`}
      >
        Add
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleDeleteAll}
        className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium sm:font-semibold shadow-md text-sm sm:text-base w-full sm:w-auto transition-colors duration-500 ${
          mood === "light"
            ? "bg-[rgb(220,100,140)] hover:bg-[rgb(200,70,120)] text-white"
            : "bg-[#FF5252] hover:bg-red-500 text-[#F5F5F5]"
        }`}
      >
        Delete All
      </motion.button>
    </div>

    {/* Tasks List */}
    <div
  className={`tasks-scroll rounded-xl p-3 sm:p-4 space-y-3 flex-1 overflow-y-auto shadow-inner transition-colors duration-500 ${
    mood === "light" ? "bg-[rgb(235,190,228)]/50 scrollbar-light" : "bg-[#2A2A2A] scrollbar-dark"
  }`}
>

      {tasks.length === 0 && (
        <p
          className={`text-center text-sm sm:text-base ${
            mood === "light" ? "text-[rgb(120,40,100)]" : "text-gray-500"
          }`}
        >
          No tasks yet ✨
        </p>
      )}

      {tasks.map((t, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`p-3 sm:p-4 flex items-center justify-between rounded-xl gap-2 sm:gap-3 shadow-md transition-colors duration-500 ${
            t.completed
              ? mood === "light"
                ? "bg-[rgb(220,170,200)] line-through text-[rgb(100,30,80)]"
                : "bg-[#2F2F2F] line-through text-gray-400"
              : mood === "light"
              ? "bg-[rgb(245,210,235)] text-[#3b0a2e]"
              : "bg-[#1E1E1E] text-gray-200"
          }`}
        >
          <span className="text-sm sm:text-base break-words">{t.text}</span>

          <div className="flex gap-2 sm:gap-3 items-center">
            {/* Check button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                handleCheck(index);
              }}
              className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                mood === "light"
                  ? "border-[rgb(200,130,180)] bg-[rgb(235,190,228)] hover:shadow-[0_0_8px_rgb(200,130,180)]"
                  : "border-[#00C853] bg-[#121212] hover:shadow-[0_0_8px_#00C853]"
              }`}
            >
              <i
                className={`fa-solid fa-check text-xs sm:text-sm ${
                  t.completed
                    ? mood === "light"
                      ? "text-[rgb(200,130,180)]"
                      : "text-[#00C853]"
                    : mood === "light"
                    ? "text-[rgb(120,40,100)]"
                    : "text-gray-500"
                }`}
              ></i>
            </motion.button>

            {/* Delete button */}
            {!t.completed && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleDelete(index, e)}
                className={`transition-colors duration-500 text-sm sm:text-base ${
                  mood === "light"
                    ? "text-[rgb(200,80,120)] hover:text-[rgb(170,50,100)]"
                    : "text-red-400 hover:text-red-500"
                }`}
              >
                <i className="fa-solid fa-trash"></i>
              </motion.button>
            )}
          </div>
        </motion.li>
      ))}
    </div>
  </motion.form>
</section>
  );
}