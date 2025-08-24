"use client";

import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Head from "next/head";
import { environment } from "../environment.js";
import { useRouter } from "next/navigation";

// ✅ Type للـ values
type ResetPasswordValues = {
  email: string;
  newPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,7}$/, "Enter a valid password"),
  });

  // ✅ Submit function
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
      .catch((err) => {
        console.error("Reset failed:", err);
      });
  }

  // ✅ Formik
  const formik = useFormik<ResetPasswordValues>({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>

      <section className="bg-gray-50 dark:bg-gray-900 h-screen py-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>

            <form
              onSubmit={formik.handleSubmit}
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 
                               focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 
                               dark:border-gray-600 dark:focus:ring-primary-600 
                               dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 
                           focus:ring-4 focus:outline-none focus:ring-primary-300 
                           font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                           dark:bg-primary-600 dark:hover:bg-primary-700 
                           dark:focus:ring-primary-800"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
