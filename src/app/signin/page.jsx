"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserLoginMutation } from "../../lib/services/auth";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = { email: "", password: "" };

  const [userLogin] = useUserLoginMutation();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data) => {
      setLoading(true);
      setError("");
      try {
        const result = await userLogin(data);
        if (result.data.success) {
          router.push("/");
        } else {
          setError(result.data.message || "Login failed");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Sign in failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Sign in to your account
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Login to your account for a faster checkout.
              </p>

              <button className="mb-6 flex w-full items-center justify-center rounded-md bg-white p-3 text-base font-medium text-body-color shadow-one hover:text-primary dark:bg-[#242B51] dark:text-body-color dark:shadow-signUp dark:hover:text-white">
                <span className="mr-3">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                      fill="#4285F4"
                    />
                    <path
                      d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                      fill="#34A853"
                    />
                    <path
                      d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                      fill="#EB4335"
                    />
                  </svg>
                </span>
                Sign in with Google
              </button>

              <div className="mb-8 flex items-center justify-center">
                <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                <p className="w-full px-5 text-center text-base font-medium text-body-color">
                  Or, sign in with your email
                </p>
                <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your Email"
                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary dark:bg-[#242B51] dark:shadow-signUp"
                  />
                  {touched.email && errors.email ? (
                    <div className="text-error text-sm mt-2">{errors.email}</div>
                  ) : null}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your Password"
                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary dark:bg-[#242B51] dark:shadow-signUp"
                  />
                  {touched.password && errors.password ? (
                    <div className="text-error text-sm mt-2">{errors.password}</div>
                  ) : null}
                </div>

                <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                  <label
                    htmlFor="remember-me"
                    className="flex items-center text-base font-medium text-body-color"
                  >
                    <input
                      type="checkbox"
                      id="remember-me"
                      name="rememberMe"
                      className="mr-2 cursor-pointer"
                    />
                    Remember me
                  </label>
                  <Link
                    href="/"
                    className="text-base font-medium text-primary hover:underline dark:text-primary"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full rounded-md bg-primary py-3 px-6 text-center text-base font-semibold text-white shadow-one hover:bg-opacity-90 focus:outline-none dark:bg-[#242B51] dark:hover:bg-opacity-80"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
                {error && <div className="text-error text-sm mt-2 text-center">{error}</div>}
              </form>

              <p className="text-center text-base font-medium text-body-color">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-primary hover:underline dark:text-primary"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
