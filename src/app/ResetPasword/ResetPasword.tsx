"use client";

import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { environment } from "../environment";

type ResetPasswordValues = {
  email: string;
  newPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,7}$/, "Enter a valid password"),
  });

  function resetPassword(values: ResetPasswordValues) {
    axios
      .put(`${environment.baseUrl}/auth/resetPassword`, values)
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          router.push("/Login");
        }
      })
      .catch((err) => console.error("Reset failed:", err));
  }

  const formik = useFormik<ResetPasswordValues>({
    initialValues: { email: "", newPassword: "" },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <section className="bg-gradient-to-b from-[#121212] to-[#1E1E1E] h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 bg-[#1E1E1E] rounded-xl shadow-2xl border border-[#2A2A2A]">
        <h2 className="mb-4 text-2xl font-bold text-[#E0E0E0] text-center">
          Change Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#E0E0E0]">
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
              className="bg-[#2A2A2A] border border-[#3A3A3A] text-[#E0E0E0] rounded-lg text-sm block w-full p-2.5 focus:ring-green-500 focus:border-green-500"
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
              className="block mb-2 text-sm font-medium text-[#E0E0E0]"
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
              className="bg-[#2A2A2A] border border-[#3A3A3A] text-[#E0E0E0] rounded-lg text-sm block w-full p-2.5 focus:ring-green-500 focus:border-green-500"
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
                className="w-4 h-4 border border-[#3A3A3A] rounded bg-[#2A2A2A] focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-400">
                I accept the{" "}
                <a href="#" className="text-green-500 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 transition shadow-md"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}