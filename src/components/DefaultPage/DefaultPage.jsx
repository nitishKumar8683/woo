"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

const DefaultPage = ({ children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference for the sidebar

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative z-40`} // Ensure sidebar is above the content
      >
        <div className="flex items-center justify-between p-6">
          <div className="text-2xl font-bold">My App</div>
          {/* Close Button for Mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2"
          >
            <HiX className="text-white" size={24} />
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-4 hover:bg-gray-700 rounded-md"
              >
                <span className="text-lg">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-4 hover:bg-gray-700 rounded-md"
              >
                <span className="text-lg">Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-transform ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } lg:ml-0`} // Adjust margin-left for sidebar
      >
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-30 bg-white shadow-md dark:bg-gray-800 dark:shadow-none">
          <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
            <div className="flex items-center lg:hidden">
              <button
                aria-controls="sidebar"
                onClick={toggleSidebar}
                className="block rounded-sm border border-gray-300 bg-white p-1.5 shadow-sm dark:border-gray-600 dark:bg-gray-800"
              >
                <HiMenu className="text-gray-800 dark:text-white" size={24} />
              </button>
            </div>

            <div className="flex items-center ml-auto space-x-4">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-2 text-black rounded-full hover:shadow-2xl focus:outline-none transition-all duration-300 ease-in-out"
                >
                  <span className="h-12 w-12 overflow-hidden rounded-full">
                    <div className="bg-gray-200 relative h-full w-full rounded-full">
                      <Image
                        src="/logo.webp"
                        alt="User"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                  </span>
                  <div className="hidden lg:flex lg:flex-col lg:ml-2">
                    <span className="block text-sm font-medium text-black dark:text-white">
                      Nitish Kumar Jha
                    </span>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">
                      Admin
                    </span>
                  </div>
                  <div className="text-right lg:hidden">
                    <span className="block text-sm font-medium text-black dark:text-white">
                      Nitish Kumar Jha
                    </span>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">
                      Admin
                    </span>
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-10">
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200 ease-in-out rounded-lg"
                    >
                      <FaUserCircle className="mr-2 text-xl text-gray-700" />
                      <span>Profile</span>
                    </a>
                    <a
                      href="/logout"
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200 ease-in-out rounded-lg"
                    >
                      <FaSignOutAlt className="mr-2 text-xl text-gray-700" />
                      <span>Logout</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className={`flex-1 p-6 bg-gray-100 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          } lg:ml-0`}
          style={{ paddingTop: "8rem" }} // Adjust padding-top to match the height of the header
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultPage;
