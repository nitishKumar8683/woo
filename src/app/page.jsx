"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const LoginPage = () => {
  const router = useRouter();

  // Handle form submission
const handleSubmit = async (values) => {
  const toastId = toast.loading("Processing.....");

  try {
    const response = await axios.post("/api/user", values);
    console.log(response);

    if (response.data.success === true) {
      toast.update(toastId, {
        render: `Success: ${response.data.message}`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      const loadingToastId = toast.loading("Please wait..., Redirecting You", {
        autoClose: false, 
      });
      setTimeout(() => {
        toast.dismiss(loadingToastId); 
        router.push("/dashboard");
      }, 2000);
    } else {
      toast.update(toastId, {
        render: `Error: ${response.data.message || "An error occurred"}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  } catch (error) {
    toast.update(toastId, {
      render: "An error occurred. Please try again.",
      type: "error",
      isLoading: false,
      autoClose: 5000,
    });
    console.error("An error occurred:", error);
  }
};

  return (
    <>
      <ToastContainer />
      <div className="relative flex items-center justify-center min-h-screen  p-4">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="relative h-full w-full overflow-hidden">
            <div className="relative h-full w-full animate-fade-in-out">
              <Image
                src="/logo.webp"
                alt="Kids Playing"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0"
                style={{ zIndex: -1, filter: "blur(1.5px)", opacity: 0.5 }}
              />
              <div
                className="absolute inset-0 bg-black opacity-20"
                style={{ zIndex: -1 }}
              />
            </div>
          </div>
        </div>

        <div className="relative max-w-md w-full bg-white p-8 rounded-lg shadow-lg z-10">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
