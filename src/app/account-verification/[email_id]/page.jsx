"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { emailOtpVerification } from "../../../api/userController"; // Replace this with your OTP verification API

const OTPVerificationPage = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validation schema for 4-digit OTP
  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(4, "OTP must be exactly 4 digits")
      .required("OTP is required")
      .matches(/^\d{4}$/, "OTP must be a 4-digit number"),
  });

  // Initial form values
  const initialValues = {
    otp: "",
  };

  // Handle OTP form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError("");
    
    const decodedEmail = decodeURIComponent(params.email_id);

    values = {
      otp: values.otp,
      email: decodedEmail,
    };

    try {
      const data = await emailOtpVerification(values);
      if (data.success) {
        router.push("/");
      } else {
        setError(data.message || "OTP verification failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Verify Your OTP
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Please enter the 4-digit OTP sent to your email.
              </p>
              
              {/* Formik Form for OTP Verification */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-8">
                      <label
                        htmlFor="otp"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Enter OTP
                      </label>
                      <Field
                        type="text"
                        name="otp"
                        maxLength="4"
                        placeholder="4-digit OTP"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-error text-sm mt-2"
                      />
                    </div>

                    <div className="mb-6">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                        disabled={isSubmitting || loading}
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>

                      {error && (
                        <div className="text-error text-sm mt-4 text-center">
                          ⚠️ {error}
                        </div>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>

              <p className="text-center text-base font-medium text-body-color">
                Didn't receive the OTP?{" "}
                <button
                  className="text-primary hover:underline"
                  onClick={() => {
                    // TODO: Implement resend OTP logic here
                  }}
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 z-[-1]">
        {/* Add any decorative SVG or background content here */}
      </div>
    </section>
  );
};

export default OTPVerificationPage;
