"use client";

import axios from "axios";
import { useFormik } from "formik";
import UserContext from "../../context/userContext/UserContextProvider";
import * as Yup from "yup";
import { environment } from "../environment";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Register() {
  let { setLogin, mood } = useContext(UserContext);
  const [apiError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  function handleRegister(formsData) {
    setLoading(true);
    axios
      .post(`${environment.baseUrl}/auth/signup`, formsData)
      .then((response) => {
        if (response.data.message == "success") {
          localStorage.setItem("userToken", response.data.token);
          setLogin(response.data.token);
          setLoading(false);
          router.push("/Login");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "min length is 3")
      .max(10, "max length is 10"),
    email: Yup.string()
      .required("email is required")
      .email("enter a valid email"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[1250][0-9]{8}$/),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,15}$/,
        "min length is 6 and max is 16 and start with capital"
      ),
    rePassword: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("password")], "passwords must match"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  return (
<div
  className={`min-h-screen flex items-center justify-center px-4 py-24 transition-colors duration-500 ${
    mood === "light"
      ? "bg-gradient-to-br from-[rgb(235,190,228)] via-[rgb(245,210,235)] to-[rgb(225,170,215)]"
      : "bg-gradient-to-b from-[#121212] to-[#1E1E1E]"
  }`}
>
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 40 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="w-full max-w-sm"
  >
    <div
      className={`backdrop-blur-lg shadow-xl rounded-xl p-6 border transition-colors duration-500 ${
        mood === "light"
          ? "bg-[rgb(245,210,235)]/80 border-[rgb(235,190,228)] text-[#3b0a2e]"
          : "bg-[#1E1E1E] border border-gray-700 text-gray-200"
      }`}
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`text-center text-2xl font-bold tracking-tight mb-5 ${
          mood === "light" ? "text-[rgb(120,40,100)]" : "text-green-400"
        }`}
      >
        Register Now
      </motion.h2>

      {apiError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-2 mb-4 text-sm rounded-md border ${
            mood === "light"
              ? "bg-[rgb(235,190,228)] border-[rgb(200,80,120)] text-[rgb(150,20,70)]"
              : "bg-[#121212] border-red-500 text-red-400"
          }`}
        >
          <span className="font-medium">{apiError}</span>
        </motion.div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label
            htmlFor="usName"
            className={`block text-sm font-medium ${
              mood === "light" ? "text-[rgb(120,40,100)]" : "text-cyan-200"
            }`}
          >
            Username
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
            id="usName"
            type="text"
            required
            className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500 ${
              mood === "light"
                ? "bg-[rgb(235,190,228)] border border-[rgb(200,130,180)] text-[#3b0a2e] focus:border-[rgb(150,50,110)]"
                : "bg-[#121212] border border-gray-600 text-white focus:border-cyan-400"
            }`}
          />
          {formik.errors.name && formik.touched.name && (
            <div
              className={`mt-1 text-xs ${
                mood === "light" ? "text-[rgb(200,80,120)]" : "text-red-400"
              }`}
            >
              {formik.errors.name}
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="ur-email"
            className={`block text-sm font-medium ${
              mood === "light" ? "text-[rgb(120,40,100)]" : "text-cyan-200"
            }`}
          >
            Email
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            id="ur-email"
            type="email"
            required
            className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500 ${
              mood === "light"
                ? "bg-[rgb(235,190,228)] border border-[rgb(200,130,180)] text-[#3b0a2e] focus:border-[rgb(150,50,110)]"
                : "bg-[#121212] border border-gray-600 text-white focus:border-cyan-400"
            }`}
          />
          {formik.errors.email && formik.touched.email && (
            <div
              className={`mt-1 text-xs ${
                mood === "light" ? "text-[rgb(200,80,120)]" : "text-red-400"
              }`}
            >
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className={`block text-sm font-medium ${
              mood === "light" ? "text-[rgb(120,40,100)]" : "text-cyan-200"
            }`}
          >
            Password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            id="password"
            type="password"
            required
            className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500 ${
              mood === "light"
                ? "bg-[rgb(235,190,228)] border border-[rgb(200,130,180)] text-[#3b0a2e] focus:border-[rgb(150,50,110)]"
                : "bg-[#121212] border border-gray-600 text-white focus:border-cyan-400"
            }`}
          />
          {formik.errors.password && formik.touched.password && (
            <div
              className={`mt-1 text-xs ${
                mood === "light" ? "text-[rgb(200,80,120)]" : "text-red-400"
              }`}
            >
              {formik.errors.password}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm_password"
            className={`block text-sm font-medium ${
              mood === "light" ? "text-[rgb(120,40,100)]" : "text-cyan-200"
            }`}
          >
            Confirm Password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            name="rePassword"
            id="confirm_password"
            type="password"
            required
            className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500 ${
              mood === "light"
                ? "bg-[rgb(235,190,228)] border border-[rgb(200,130,180)] text-[#3b0a2e] focus:border-[rgb(150,50,110)]"
                : "bg-[#121212] border border-gray-600 text-white focus:border-cyan-400"
            }`}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div
              className={`mt-1 text-xs ${
                mood === "light" ? "text-[rgb(200,80,120)]" : "text-red-400"
              }`}
            >
              {formik.errors.rePassword}
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="Phone"
            className={`block text-sm font-medium ${
              mood === "light" ? "text-[rgb(120,40,100)]" : "text-cyan-200"
            }`}
          >
            Phone
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            name="phone"
            id="Phone"
            type="tel"
            required
            className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm text-sm outline-none transition-colors duration-500 ${
              mood === "light"
                ? "bg-[rgb(235,190,228)] border border-[rgb(200,130,180)] text-[#3b0a2e] focus:border-[rgb(150,50,110)]"
                : "bg-[#121212] border border-gray-600 text-white focus:border-cyan-400"
            }`}
          />
          {formik.errors.phone && formik.touched.phone && (
            <div
              className={`mt-1 text-xs ${
                mood === "light" ? "text-[rgb(200,80,120)]" : "text-red-400"
              }`}
            >
              {formik.errors.phone}
            </div>
          )}
        </div>

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <button
            type="submit"
            className={`w-full inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg shadow-md transition-all duration-500 focus:outline-none focus:ring-2 text-sm ${
              mood === "light"
                ? "bg-[rgb(200,130,180)] hover:bg-[rgb(180,100,150)] text-white focus:ring-[rgb(200,130,180)]"
                : "bg-gradient-to-r from-cyan-500 to-blue-400 hover:from-cyan-600 hover:to-blue-500 text-white focus:ring-cyan-300"
            }`}
          >
            <span>Register</span>
            {isLoading && <i className="fa fa-spinner fa-spin ml-2"></i>}
          </button>
        </motion.div>

        <p
          className={`mt-3 text-xs text-center ${
            mood === "light" ? "text-[rgb(120,40,100)]" : "text-cyan-200"
          }`}
        >
              <Link href="/ForgetPassword" className="hover:underline">
                Forgot Password?
              </Link>
        </p>
      </form>
    </div>
  </motion.div>
</div>

  );
}
