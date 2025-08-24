"use client";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { environment } from "../environment"; // عدل المسار حسب مكان الملف

type EmailValues = { email: string };
type CodeValues = { resetCode: string };

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "verify">("email");

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter valid email"),
  });

  const validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

  function sendCode(values: EmailValues) {
    axios
      .post(`${environment.baseUrl}/auth/forgotPasswords`, values)
      .then(({ data }) => {
        console.log(data);
        setStep("verify");
      })
      .catch((err) => console.error(err));
  }

  function getcode(values: CodeValues) {
    axios
      .post(`${environment.baseUrl}/auth/verifyResetCode`, values)
      .then(({ data }) => {
        console.log(data);
        if (data.status === "Success") router.push("/resetPassword");
      })
      .catch((err) => console.error(err));
  }

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

  return (
    <section className="bg-gradient-to-b from-[#121212] to-[#1E1E1E] h-screen flex items-center justify-center">
      {step === "email" && (
        <div className="w-full max-w-md p-6 bg-[#1E1E1E] rounded-lg shadow-2xl border border-[#2A2A2A]">
          <h2 className="mb-4 text-xl font-bold text-[#E0E0E0]">Change Password</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#E0E0E0]"
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
                className="bg-[#2A2A2A] border border-[#3A3A3A] text-[#E0E0E0] text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 transition shadow-md"
            >
              Send Reset Code
            </button>
          </form>
        </div>
      )}

      {step === "verify" && (
        <div className="w-full max-w-md p-6 bg-[#1E1E1E] rounded-lg shadow-2xl border border-[#2A2A2A]">
          <h2 className="mb-4 text-xl font-bold text-[#E0E0E0]">Verification Code</h2>
          <form onSubmit={formik2.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="resetCode"
                className="block mb-2 text-sm font-medium text-[#E0E0E0]"
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
                className="bg-[#2A2A2A] border border-[#3A3A3A] text-[#E0E0E0] text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter verification code"
                required
              />
              {formik2.touched.resetCode && formik2.errors.resetCode && (
                <p className="text-red-500 text-sm">{formik2.errors.resetCode}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 transition shadow-md"
            >
              Verify Code
            </button>
          </form>
        </div>
      )}
    </section>
  );
}