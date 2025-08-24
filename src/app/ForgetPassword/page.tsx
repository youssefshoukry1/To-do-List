"use client";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { environment } from "../environment"; // عدل المسار حسب مكان الملف

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "verify">("email");

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("enter valid email"),
  });

  const validationSchema2 = Yup.object({
    resetCode: Yup.string().required("reset code is required"),
  });

  function sendCode(values) {
    axios
      .post(`${environment.baseUrl}/auth/forgotPasswords`, values)
      .then(({ data }) => {
        console.log(data);
        setStep("verify"); // بدل ما تعمل querySelector
      });
  }

  function getcode(values) {
    axios
      .post(`${environment.baseUrl}/auth/verifyResetCode`, values)
      .then(({ data }) => {
        console.log(data);
        if (data.status == "Success") {
          router.push("/resetPassword"); // Next.js navigation
        }
      });
  }

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: sendCode,
  });

  const formik2 = useFormik({
    initialValues: { resetCode: "" },
    validationSchema: validationSchema2,
    onSubmit: getcode,
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center">
      {step === "email" && (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Change Password
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="name@company.com"
                required
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Send Reset Code
            </button>
          </form>
        </div>
      )}

      {step === "verify" && (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Verification Code
          </h2>
          <form onSubmit={formik2.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="resetCode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Verification Code
              </label>
              <input
                type="text"
                name="resetCode"
                value={formik2.values.resetCode}
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                id="resetCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter verification code"
                required
              />
              {formik2.touched.resetCode && formik2.errors.resetCode && (
                <p className="text-red-500 text-sm">{formik2.errors.resetCode}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Verify Code
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
