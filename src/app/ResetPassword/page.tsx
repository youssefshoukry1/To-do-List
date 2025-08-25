"use client";

import React, { useContext, useState } from "react";
import UserContext from "@/context/userContext/UserContextProvider";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type ResetPasswordValues = {
  email: string;
  newPassword: string;
};

export default function ResetPassword() {
  const { mood } = useContext(UserContext);
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [isLoading, setLoading] = useState(false);

  function resetPassword(values: ResetPasswordValues) {
    setLoading(true);
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          setLoading(false);
          router.push("/");
        }
      })
      .catch((err) => {
        setApiError("Reset failed, please try again");
        setLoading(false);
        console.error(err);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,7}$/, "Password must start with capital and be 6-8 chars"),
  });

  const formik = useFormik<ResetPasswordValues>({
    initialValues: { email: "", newPassword: "" },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-all duration-500 ${
        mood === "light"
          ? "bg-gradient-to-br from-[rgb(235,190,228)] via-[rgb(245,210,235)] to-[rgb(225,170,215)]"
          : "bg-gradient-to-b from-[#121212] to-[#1E1E1E]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div
          className={`shadow-xl rounded-2xl p-8 backdrop-blur-lg transition-all duration-500 ${
            mood === "light"
              ? "bg-[rgb(245,210,235)]/80 border border-[rgb(235,190,228)] text-[#3b0a2e]"
              : "bg-[#1E1E1E] border border-gray-700 text-gray-200"
          }`}
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-center text-3xl font-bold tracking-tight mb-6 ${
              mood === "light" ? "text-[rgb(120,40,100)]" : "text-green-400"
            }`}
          >
            Reset Password
          </motion.h2>

          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 mb-4 text-sm text-red-500 rounded-md bg-red-100 border border-red-300"
            >
              <span className="font-medium">{apiError}</span>
            </motion.div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  mood === "light" ? "text-[rgb(120,40,100)]" : "text-cyan-200"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-2 block w-full rounded-lg px-4 py-2 shadow-sm focus:ring-1 sm:text-sm transition-all duration-500 ${
                  mood === "light"
                    ? "bg-[rgb(235,190,228)] border border-[rgb(200,130,180)] text-[#3b0a2e] focus:border-[rgb(200,130,180)] focus:ring-[rgb(200,130,180)]"
                    : "bg-[#121212] border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400"
                }`}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="mt-2 text-sm text-red-500">{formik.errors.email}</div>
              )}
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className={`block text-sm font-medium ${
                  mood === "light" ? "text-[rgb(120,40,100)]" : "text-cyan-200"
                }`}
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-2 block w-full rounded-lg px-4 py-2 shadow-sm focus:ring-1 sm:text-sm transition-all duration-500 ${
                  mood === "light"
                    ? "bg-[rgb(235,190,228)] border border-[rgb(200,130,180)] text-[#3b0a2e] focus:border-[rgb(200,130,180)] focus:ring-[rgb(200,130,180)]"
                    : "bg-[#121212] border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400"
                }`}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <div className="mt-2 text-sm text-red-500">{formik.errors.newPassword}</div>
              )}
            </div>

            {/* Submit */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <button
                type="submit"
                className={`w-full inline-flex items-center justify-center px-5 py-3 font-semibold rounded-xl shadow-md transition-all duration-500 focus:outline-none focus:ring-2 text-lg ${
                  mood === "light"
                    ? "bg-[rgb(200,130,180)] hover:bg-[rgb(180,100,150)] text-white focus:ring-[rgb(200,130,180)]"
                    : "bg-gradient-to-r from-cyan-500 to-blue-400 hover:from-cyan-600 hover:to-blue-500 text-white focus:ring-cyan-300"
                }`}
              >
                Reset Password
                {isLoading && <i className="fa fa-spinner fa-spin ml-3"></i>}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
