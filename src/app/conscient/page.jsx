  "use client";
  import React, { useRef, useState } from "react";
  import { Formik, Form, Field, ErrorMessage } from "formik";
  import * as Yup from "yup";
  import Link from "next/link";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { FaClock, FaCalendarAlt } from "react-icons/fa";
  import Image from "next/image";
  import axios from "axios";
  import toast from "react-hot-toast";
  import { Toaster } from "react-hot-toast";
  import { PropagateLoader } from "react-spinners";

  const toastStyles = {
    success: {
      background: "#4caf50", 
      color: "#ffffff",
      borderRadius: "8px",
      padding: "10px 16px", 
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "1.4",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      transform: "scale(1.02)",
    },
    error: {
      background: "#f44336", 
      color: "#ffffff",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "1.4", 
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      transform: "scale(1.02)",
    },
  };



  const validationSchema = Yup.object({
    childName: Yup.string().required("Child Name is required"),
    guardianName: Yup.string().required("Guardian Name is required"),
    dob: Yup.date()
      .nullable()
      .required("Date of Birth is required")
      .typeError("Invalid date format"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits"),
    address: Yup.string().required("Address is required"),
    timeIn: Yup.date()
      .nullable()
      .required("Time In is required")
      .typeError("Invalid time format"),
    timeOut: Yup.date()
      .nullable()
      .required("Time Out is required")
      .typeError("Invalid time format"),
    agreeToTerms: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
  });

  const Page = () => {
    const dobPickerRef = useRef(null);
    const timeInPickerRef = useRef(null);
    const timeOutPickerRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleDobIconClick = () => {
      if (dobPickerRef.current) {
        dobPickerRef.current.setOpen(true);
      }
    };

    const handleTimeInIconClick = () => {
      if (timeInPickerRef.current) {
        timeInPickerRef.current.setOpen(true);
      }
    };

    const handleTimeOutIconClick = () => {
      if (timeOutPickerRef.current) {
        timeOutPickerRef.current.setOpen(true);
      }
    };

    const handleSubmit = async (values, { resetForm }) => {
      setLoading(true);
      try {
        console.log("Form submitted:", values);
        const response = await axios.post(
          "/api/conscient/createConscient",
          values
        );
        if (response.data.success == true) {
          toast.success(response.data.message, {
            style: toastStyles.success,
          });
          resetForm();
        } else {
          toast.error(response.data.message, {
            style: toastStyles.error,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.", {
          style: toastStyles.error,
        });
      } finally {
        setLoading(false); 
      }
    };

    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="relative  min-h-screen flex items-center justify-center bg-gray-50 p-6">
          {loading && (
            <div
              className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10"
              aria-live="assertive"
            >
              <PropagateLoader color="#ffffff" size={20} />
            </div>
          )}
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 space-y-8">
            <header className="flex items-center justify-center mb-6">
              <Image src="/logo.webp" alt="Logo" height={120} width={150} />
              <h1 className="text-3xl font-bold text-gray-800 ml-4">
                Conscient Form
              </h1>
            </header>
            <Formik
              initialValues={{
                childName: "",
                guardianName: "",
                dob: null,
                phoneNumber: "",
                address: "",
                timeIn: null,
                timeOut: null,
                agreeToTerms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values }) => (
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
                        placeholder="Enter Child Name"
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
                        placeholder="Enter Guardian Name"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="guardianName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth
                      </label>
                      <DatePicker
                        ref={dobPickerRef}
                        selected={values.dob}
                        onChange={(date) => setFieldValue("dob", date)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm pr-10" // Ensure padding-right is sufficient for the icon
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select date"
                      />
                      <FaCalendarAlt
                        onClick={handleDobIconClick}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer mt-2"
                        size={20}
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
                        placeholder="Enter Phone Number"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="timeIn"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Time In
                      </label>
                      <DatePicker
                        ref={timeInPickerRef}
                        selected={values.timeIn}
                        onChange={(date) => setFieldValue("timeIn", date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm pr-10" // Add padding to the right for the icon
                        placeholderText="Select time"
                      />
                      <FaClock
                        onClick={handleTimeInIconClick}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer mt-1"
                        size={20}
                      />
                      <ErrorMessage
                        name="timeIn"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="timeOut"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Time Out
                      </label>
                      <DatePicker
                        ref={timeOutPickerRef}
                        selected={values.timeOut}
                        onChange={(date) => setFieldValue("timeOut", date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                        placeholderText="Select time"
                      />
                      <FaClock
                        onClick={handleTimeOutIconClick}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer mt-2"
                        size={20}
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
                        placeholder="Enter Address"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col space-y-2">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <Field
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <label
                          htmlFor="agreeToTerms"
                          className="text-sm font-medium text-gray-700 flex-1"
                        >
                          I confirm that I have read and agree to the{" "}
                          <Link
                            href="/term"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-500 underline"
                          >
                            T&C
                          </Link>
                        </label>
                      </div>
                      <ErrorMessage
                        name="agreeToTerms"
                        component="div"
                        className="text-red-500 text-sm mt-1"
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
      </>
    );
  };

  export default Page;
