"use client";

import axios from "axios";
import { useFormik } from "formik";
import UserContext from "../../context/userContext/UserContextProvider";
import * as Yup from "yup";
import { environment } from "../environment";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

export default function Register() {
  let { setLogin } = useContext(UserContext);
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
        /^[A-Z][a-z0-9]{5,7}$/,
        "min length is 6 and max is 8 and start with capital"
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
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="w-full max-w-sm"
      >
        <div className="bg-indigo-900/60 backdrop-blur-lg shadow-xl rounded-xl p-6 border border-indigo-700">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center text-2xl font-bold tracking-tight text-cyan-300 mb-5"
          >
            Register Now
          </motion.h2>

          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2 mb-4 text-sm text-red-300 rounded-md bg-indigo-950 border border-red-500"
            >
              <span className="font-medium">{apiError}</span>
            </motion.div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="usName"
                className="block text-sm font-medium text-cyan-200"
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
                className="mt-1 block w-full rounded-md bg-indigo-950 border border-indigo-600 text-white px-3 py-2 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm"
              />
              {formik.errors.name && formik.touched.name && (
                <div className="mt-1 text-xs text-red-300">
                  {formik.errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="ur-email"
                className="block text-sm font-medium text-cyan-200"
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
                className="mt-1 block w-full rounded-md bg-indigo-950 border border-indigo-600 text-white px-3 py-2 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm"
              />
              {formik.errors.email && formik.touched.email && (
                <div className="mt-1 text-xs text-red-300">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-cyan-200"
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
                className="mt-1 block w-full rounded-md bg-indigo-950 border border-indigo-600 text-white px-3 py-2 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm"
              />
              {formik.errors.password && formik.touched.password && (
                <div className="mt-1 text-xs text-red-300">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-cyan-200"
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
                className="mt-1 block w-full rounded-md bg-indigo-950 border border-indigo-600 text-white px-3 py-2 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <div className="mt-1 text-xs text-red-300">
                  {formik.errors.rePassword}
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="Phone"
                className="block text-sm font-medium text-cyan-200"
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
                className="mt-1 block w-full rounded-md bg-indigo-950 border border-indigo-600 text-white px-3 py-2 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm"
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="mt-1 text-xs text-red-300">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            {/* Submit */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 
                        bg-gradient-to-r from-cyan-500 to-blue-400 
                        hover:from-cyan-600 hover:to-blue-500 
                        text-white font-medium rounded-lg shadow-md 
                        transition-all duration-500 focus:outline-none 
                        focus:ring-2 focus:ring-cyan-300 text-sm"
              >
                <span>Register</span>
                {isLoading && <i className="fa fa-spinner fa-spin ml-2"></i>}
              </button>
            </motion.div>

            <p className="mt-3 text-xs text-cyan-200 text-center">
              <Link
                href="/ForgotPassword"
                className="hover:underline text-cyan-400"
              >
                Forgot Password?
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}