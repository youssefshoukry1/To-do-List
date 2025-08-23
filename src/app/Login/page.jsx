"use client";
import React, { useContext, useState } from "react";
import UserContext from "../../context/userContext/UserContextProvider";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, easeOut } from "framer-motion";

export default function Page() {
  const { setLogin } = useContext(UserContext);
  const [apiError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  function handleLogin(formsData) {
    setLoading(true);

    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formsData)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res?.data?.token);
          setLogin(res?.data?.token);
          setLoading(false);
          router.push("/");
        }
      })
      .catch(() => {
        setError("Login failed, please try again");
        setLoading(false);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("enter a valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,7}$/, "min length is 5 and max length is 8 and start with capital"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
   <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950">
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 40 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.7,ease: easeOut }}
    className="w-full max-w-md"
  >
    <div className="bg-indigo-900/60 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-indigo-700">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-3xl font-bold tracking-tight text-cyan-300 mb-6"
      >
        Welcome Back
      </motion.h2>

      {apiError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 mb-4 text-sm text-red-300 rounded-md bg-indigo-950 border border-red-500"
        >
          <span className="font-medium">{apiError}</span>
        </motion.div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="ur-email" className="block text-sm font-medium text-cyan-200">
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
            className="mt-2 block w-full rounded-lg bg-indigo-950 border border-indigo-600 text-white px-4 py-2 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 sm:text-sm"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="mt-2 text-sm text-red-300">{formik.errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-cyan-200">
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
            className="mt-2 block w-full rounded-lg bg-indigo-950 border border-indigo-600 text-white px-4 py-2 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 sm:text-sm"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="mt-2 text-sm text-red-300">{formik.errors.password}</div>
          )}
        </div>

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-5 py-3 
                       bg-gradient-to-r from-cyan-500 to-blue-400 
                       hover:from-cyan-600 hover:to-blue-500 
                       text-white font-semibold rounded-xl shadow-md 
                       transition-all duration-500 focus:outline-none 
                       focus:ring-2 focus:ring-cyan-300"
          >
            <span className="text-lg">Login</span>
            {isLoading && <i className="fa fa-spinner fa-spin ml-3"></i>}
          </button>
        </motion.div>

        <p className="mt-4 text-sm text-cyan-200 text-center">
          <Link href="/forgotpassord" className="hover:underline text-cyan-400">
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  </motion.div>
</div>

  );
}
