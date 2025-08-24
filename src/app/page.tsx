"use client";

import UserContext from "@/context/userContext/UserContextProvider";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { isLogin } = useContext(UserContext);
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
    <section className="p-4 sm:p-6 flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-gray-200">
      
      {/* العنوان */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-400 lg:pt-15"
      >
        Make Your Adventure
      </motion.h1>

      {/* الفورم */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-full md:max-w-2xl bg-[#1E1E1E] shadow-2xl rounded-2xl p-4 sm:p-6 flex flex-col gap-5 lg:h-[65vh] h-[58vh] lg:mb-0 mb-12"
      >
        {/* Input + Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            className="flex-1 bg-[#2A2A2A] text-gray-200 outline-none px-3 py-2 sm:px-4 sm:py-3 rounded-xl placeholder-gray-500 text-sm sm:text-base"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-[#00C853] hover:bg-green-500 rounded-xl text-[#F5F5F5] font-medium sm:font-semibold shadow-md text-sm sm:text-base w-full sm:w-auto"
          >
            Add
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteAll}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-[#FF5252] hover:bg-red-500 rounded-xl text-[#F5F5F5] font-medium sm:font-semibold shadow-md text-sm sm:text-base w-full sm:w-auto"
          >
            Delete All
          </motion.button>
        </div>

        {/* Tasks List */}
        <div className="tasks-scroll bg-[#2A2A2A] rounded-xl p-3 sm:p-4 space-y-3 flex-1 overflow-y-auto shadow-inner">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center text-sm sm:text-base">
              No tasks yet ✨
            </p>
          )}

          {tasks.map((t, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-3 sm:p-4 flex items-center justify-between rounded-xl gap-2 sm:gap-3 ${
                t.completed
                  ? "bg-[#2F2F2F] line-through text-gray-400"
                  : "bg-[#1E1E1E]"
              } shadow-md`}
            >
              {/* النص */}
              <span className="text-sm sm:text-base break-words">{t.text}</span>

              {/* الأزرار */}
              <div className="flex gap-2 sm:gap-3 items-center">
                {/* Check button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCheck(index);
                  }}
                  className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border-2 border-[#00C853] bg-[#121212] hover:shadow-[0_0_8px_#00C853] transition"
                >
                  <i
                    className={`fa-solid fa-check text-xs sm:text-sm ${
                      t.completed ? "text-[#00C853]" : "text-gray-500"
                    }`}
                  ></i>
                </motion.button>

                {/* Delete button */}
                {!t.completed && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleDelete(index, e)}
                    className="text-red-400 hover:text-red-500 transition text-sm sm:text-base"
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