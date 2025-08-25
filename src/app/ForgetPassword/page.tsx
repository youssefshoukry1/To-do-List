"use client";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { environment } from "../environment";
import UserContext from "@/context/userContext/UserContextProvider";


type EmailValues = { email: string };
type CodeValues = { resetCode: string };

export default function ForgotPassword() {
  const { mood } = useContext(UserContext);
  const router = useRouter();
  const [step, setStep] = useState<"email" | "verify">("email");

  // ✅ validation
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter valid email"),
  });

  const validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  // ✅ APIs
  function sendCode(values: EmailValues) {
    axios
      .post(`${environment.baseUrl}/auth/forgotPasswords`, values)
      .then(({ data }) => {
        console.log(data);
        setStep("verify"); // بدل ما نعمل d-none
      })
      .catch((err) => console.error(err));
  }

  function getcode(values: CodeValues) {
    axios
      .post(`${environment.baseUrl}/auth/verifyResetCode`, values)
      .then(({ data }) => {
        console.log(data);
        if (data.status === "Success") {
          router.push("/ResetPassword"); // ✅ اسم صح
        }
      })
      .catch((err) => console.error(err));
  }

  // ✅ formik
  const formik = useFormik<EmailValues>({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: sendCode,
  });

  const formik2 = useFormik<CodeValues>({
    initialValues: { resetCode: "" },
    validationSchema: validationSchema2,
    onSubmit: getcode,
  });

  // 🎨 ثيم
  const isDark = mood === "dark";

  return (
    <section
      className={`h-screen flex items-center justify-center transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-gray-200"
          : "bg-gradient-to-br from-[rgb(235,190,228)] via-[rgb(245,210,235)] to-[rgb(225,170,215)] text-[#3b0a2e]"
      }`}
    >
      {/* STEP 1: Enter email */}
      {step === "email" && (
        <div
          className={`w-full max-w-md p-6 rounded-2xl shadow-2xl transition-colors duration-500 ${
            isDark
              ? "bg-[#1E1E1E] border border-gray-700"
              : "bg-[rgb(245,210,235)]/80 backdrop-blur-lg border border-[rgb(235,190,228)]"
          }`}
        >
          <h2 className="mb-4 text-xl font-bold">Change Password</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-[rgb(120,40,100)]"
                }`}
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
                className={`border text-sm rounded-lg block w-full p-2.5 ${
                  isDark
                    ? "bg-[#2A2A2A] border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                    : "bg-[rgb(235,190,228)] text-[#3b0a2e] border-[rgb(225,170,215)] focus:ring-[rgb(200,130,180)] focus:border-[rgb(200,130,180)]"
                }`}
                placeholder="name@company.com"
                required
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 shadow-md ${
                isDark
                  ? "bg-purple-600 hover:bg-purple-500 text-white"
                  : "bg-[rgb(200,130,180)] hover:bg-[rgb(180,100,150)] text-white"
              }`}
            >
              Send Reset Code
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: Enter reset code */}
      {step === "verify" && (
        <div
          className={`w-full max-w-md p-6 rounded-2xl shadow-2xl transition-colors duration-500 ${
            isDark
              ? "bg-[#1E1E1E] border border-gray-700"
              : "bg-[rgb(245,210,235)]/80 backdrop-blur-lg border border-[rgb(235,190,228)]"
          }`}
        >
          <h2 className="mb-4 text-xl font-bold">Verification Code</h2>

          <form onSubmit={formik2.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="resetCode"
                className={`block mb-2 text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-[rgb(120,40,100)]"
                }`}
              >
                Reset Code
              </label>
              <input
                type="text"
                name="resetCode"
                value={formik2.values.resetCode}
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                id="resetCode"
                className={`border text-sm rounded-lg block w-full p-2.5 ${
                  isDark
                    ? "bg-[#2A2A2A] border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                    : "bg-[rgb(235,190,228)] text-[#3b0a2e] border-[rgb(225,170,215)] focus:ring-[rgb(200,130,180)] focus:border-[rgb(200,130,180)]"
                }`}
                placeholder="Enter verification code"
                required
              />
              {formik2.touched.resetCode && formik2.errors.resetCode && (
                <p className="text-red-500 text-sm">{formik2.errors.resetCode}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 shadow-md ${
                isDark
                  ? "bg-purple-600 hover:bg-purple-500 text-white"
                  : "bg-[rgb(200,130,180)] hover:bg-[rgb(180,100,150)] text-white"
              }`}
            >
              Verify Code
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
