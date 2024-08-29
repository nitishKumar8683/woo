"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const validationSchema = Yup.object({
  childName: Yup.string().required("Child Name is required"),
  guardianName: Yup.string().required("Guardian Name is required"),
  dob: Yup.date().required("Date of Birth is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits"),
  address: Yup.string().required("Address is required"),
  timeIn: Yup.string().required("Time In is required"),
  timeOut: Yup.string().required("Time Out is required"),
  agreeToTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

const Page = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 space-y-8">
        <header className="flex items-center justify-center mb-6">
          <img src="/logo.webp" alt="Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold text-gray-800 ml-4">
            Conscient Form
          </h1>
        </header>

        <Formik
          initialValues={{
            childName: "",
            guardianName: "",
            dob: "",
            phoneNumber: "",
            address: "",
            timeIn: "",
            timeOut: "",
            agreeToTerms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="childName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Child Name
                  </label>
                  <Field
                    type="text"
                    id="childName"
                    name="childName"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="childName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="guardianName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Guardian Name
                  </label>
                  <Field
                    type="text"
                    id="guardianName"
                    name="guardianName"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="guardianName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <Field
                    type="date"
                    id="dob"
                    name="dob"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Field
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="timeIn"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time In
                  </label>
                  <Field
                    type="time"
                    id="timeIn"
                    name="timeIn"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="timeIn"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="timeOut"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time Out
                  </label>
                  <Field
                    type="time"
                    id="timeOut"
                    name="timeOut"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="timeOut"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <Field
                    as="textarea"
                    id="address"
                    name="address"
                    rows="2"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex items-center md:col-span-2">
                  <Field
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="ml-2 block text-sm font-medium text-gray-700"
                  >
                    I confirm that I have read and agree to the{" "}
                    <Link
                      href="/term"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 font-semibold text-blue-500 underline"
                    >
                      T&C
                    </Link>
                  </label>
                  <ErrorMessage
                    name="agreeToTerms"
                    component="div"
                    className="text-red-500 text-sm mt-1 ml-2"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
