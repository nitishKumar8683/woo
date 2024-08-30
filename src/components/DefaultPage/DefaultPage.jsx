"use client";
import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const DefaultPage = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative`}
      >
        <div className="p-6 text-2xl font-bold">My App</div>
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
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 flex w-full bg-white shadow-md dark:bg-gray-800 dark:shadow-none">
          <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                aria-controls="sidebar"
                onClick={toggleSidebar}
                className="block rounded-sm border border-gray-300 bg-white p-1.5 shadow-sm dark:border-gray-600 dark:bg-gray-800"
              >
                <HiMenu className="text-gray-800 dark:text-white" size={24} />
              </button>

              <Link href="/">
                <Image
                  width={32}
                  height={32}
                  src="/images/logo/logo-icon.svg"
                  alt="Logo"
                />
              </Link>
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
                  <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black dark:text-white">
                      Nitish Kumar Jha
                    </span>
                    <span className="block text-xs">Admin</span>
                  </span>
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
        <main className="flex-1 p-6 bg-gray-100">
          <div className="text-2xl font-semibold">Welcome to the Dashboard</div>
        </main>
      </div>
    </div>
  );
};

export default DefaultPage;
