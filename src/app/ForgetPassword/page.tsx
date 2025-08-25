"use client";

import React, { useContext, useState } from "react";
import UserContext from "@/context/userContext/UserContextProvider";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type EmailValues = { email: string };
type CodeValues = { resetCode: string };

export default function ForgotPassword() {
  const { mood } = useContext(UserContext);
  const router = useRouter();
  const [step, setStep] = useState<"email" | "verify">("email");
  const [apiError, setApiError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter valid email"),
  });

  const validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  const formik = useFormik<EmailValues>({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: (values) => {
      setApiError("");
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
        .then(() => setStep("verify"))
        .catch(() => setApiError("Failed to send reset code"));
    },
  });

  const formik2 = useFormik<CodeValues>({
    initialValues: { resetCode: "" },
    validationSchema: validationSchema2,
    onSubmit: (values) => {
      setApiError("");
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
        .then(({ data }) => {
          if (data.status === "Success") router.push("/ResetPassword");
        })
        .catch(() => setApiError("Invalid code"));
    },
  });

  const inputClasses = `mt-2 block w-full rounded-lg px-4 py-2 shadow-sm focus:ring-1 sm:text-sm transition-all duration-500 ${
    mood === "light"
      ? "bg-[rgb(235,190,228)] border border-[rgb(200,130,180)] text-[#3b0a2e] focus:border-[rgb(200,130,180)] focus:ring-[rgb(200,130,180)]"
      : "bg-[#121212] border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400"
  }`;

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
            {step === "email" ? "Forgot Password" : "Enter Verification Code"}
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

          <form
            onSubmit={step === "email" ? formik.handleSubmit : formik2.handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor={step === "email" ? "email" : "resetCode"}
                className={`block text-sm font-medium ${
                  mood === "light" ? "text-[rgb(120,40,100)]" : "text-cyan-200"
                }`}
              >
                {step === "email" ? "Email" : "Reset Code"}
              </label>
              <input
                type={step === "email" ? "email" : "text"}
                id={step === "email" ? "email" : "resetCode"}
                name={step === "email" ? "email" : "resetCode"}
                placeholder={step === "email" ? "name@company.com" : "Enter verification code"}
                value={step === "email" ? formik.values.email : formik2.values.resetCode}
                onChange={step === "email" ? formik.handleChange : formik2.handleChange}
                onBlur={step === "email" ? formik.handleBlur : formik2.handleBlur}
                required
                className={inputClasses}
              />
              {step === "email" &&
                formik.errors.email &&
                formik.touched.email && (
                  <div className="mt-2 text-sm text-red-500">{formik.errors.email}</div>
                )}
              {step === "verify" &&
                formik2.errors.resetCode &&
                formik2.touched.resetCode && (
                  <div className="mt-2 text-sm text-red-500">{formik2.errors.resetCode}</div>
                )}
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <button
                type="submit"
                className={`w-full inline-flex items-center justify-center px-5 py-3 font-semibold rounded-xl shadow-md transition-all duration-500 focus:outline-none focus:ring-2 text-lg ${
                  mood === "light"
                    ? "bg-[rgb(200,130,180)] hover:bg-[rgb(180,100,150)] text-white focus:ring-[rgb(200,130,180)]"
                    : "bg-gradient-to-r from-cyan-500 to-blue-400 hover:from-cyan-600 hover:to-blue-500 text-white focus:ring-cyan-300"
                }`}
              >
                {step === "email" ? "Send Reset Code" : "Verify Code"}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
