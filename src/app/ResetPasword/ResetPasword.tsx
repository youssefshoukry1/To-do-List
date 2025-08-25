"use client";

import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { environment } from "../environment";
import UserContext from "@/context/userContext/UserContextProvider";

type ResetPasswordValues = {
  email: string;
  newPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const { mood } = useContext(UserContext);

  // ✅ نفس الـ Validation اللي في النسخة اللي انت عايزها
  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("enter availed email"),
    newPassword: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,7}$/, "enter availed password"),
  });

  // ✅ نفس لوجيك resetPassword
  function resetPassword(values: ResetPasswordValues) {
    axios
      .put(`${environment.baseUrl}/auth/resetPassword`, values)
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          router.push("/Login"); // ✅ زي navigate('/login')
        }
      })
      .catch((err) => console.error("Reset failed:", err));
  }

  // ✅ Formik زي ما هو
  const formik = useFormik<ResetPasswordValues>({
    initialValues: { email: "", newPassword: "" },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <section
      className={`h-screen flex items-center justify-center transition-all duration-500 ${
        mood === "light"
          ? "bg-gradient-to-br from-[rgb(235,190,228)] via-[rgb(245,210,235)] to-[rgb(225,170,215)] text-[#3b0a2e]"
          : "bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-gray-200"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-2xl shadow-2xl transition-colors duration-500 ${
          mood === "light"
            ? "bg-[rgb(245,210,235)]/80 backdrop-blur-lg border border-[rgb(235,190,228)]"
            : "bg-[#1E1E1E] border border-gray-700"
        }`}
      >
        <h2
          className={`mb-4 text-2xl font-bold text-center ${
            mood === "light" ? "text-[rgb(120,40,100)]" : "text-gray-200"
          }`}
        >
          Change Password
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className={`block mb-2 text-sm font-medium ${
                mood === "light" ? "text-[rgb(120,40,100)]" : "text-gray-400"
              }`}
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`border text-sm rounded-lg block w-full p-2.5 transition-colors duration-500 ${
                mood === "light"
                  ? "bg-[rgb(235,190,228)] text-[#3b0a2e] border-[rgb(225,170,215)] focus:ring-[rgb(200,130,180)] focus:border-[rgb(200,130,180)]"
                  : "bg-[#2A2A2A] border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500"
              }`}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="newPassword"
              className={`block mb-2 text-sm font-medium ${
                mood === "light" ? "text-[rgb(120,40,100)]" : "text-gray-400"
              }`}
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="••••••••"
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`border text-sm rounded-lg block w-full p-2.5 transition-colors duration-500 ${
                mood === "light"
                  ? "bg-[rgb(235,190,228)] text-[#3b0a2e] border-[rgb(225,170,215)] focus:ring-[rgb(200,130,180)] focus:border-[rgb(200,130,180)]"
                  : "bg-[#2A2A2A] border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500"
              }`}
              required
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className={`w-4 h-4 rounded focus:ring-2 ${
                  mood === "light"
                    ? "bg-[rgb(235,190,228)] border-[rgb(200,130,180)] focus:ring-[rgb(200,130,180)]"
                    : "bg-[#2A2A2A] border-gray-600 focus:ring-purple-500"
                }`}
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className={mood === "light" ? "text-[rgb(120,40,100)]" : "text-gray-400"}
              >
                I accept the{" "}
                <a
                  href="#"
                  className={
                    mood === "light"
                      ? "text-[rgb(200,130,180)] hover:underline"
                      : "text-purple-400 hover:underline"
                  }
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 shadow-md transition-colors duration-500 ${
              mood === "light"
                ? "bg-[rgb(200,130,180)] hover:bg-[rgb(180,100,150)] text-white"
                : "bg-purple-600 hover:bg-purple-500 text-white"
            }`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}
