import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md dark:bg-gray-800 z-30">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        {/* Toggle Button for Mobile */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block rounded-sm border border-gray-300 bg-white p-1.5 shadow-sm dark:border-gray-600 dark:bg-gray-800"
          >
            <HiMenu className="text-gray-800 dark:text-white" size={24} />
          </button>
        </div>

        {/* Logo or Title */}
        <div className="hidden lg:flex items-center space-x-4">
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
            My App
          </span>
        </div>

        <div className="relative flex items-center ml-auto space-x-4">
          <button
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
            className="flex items-center space-x-2 p-2 text-black rounded-full hover:shadow-2xl focus:outline-none transition-all duration-300 ease-in-out"
          >
            <span className="h-12 w-12 overflow-hidden rounded-full relative">
              <Image
                src="/logo.webp"
                alt="User"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </span>

            <div className="hidden lg:flex lg:flex-col lg:ml-2">
              <span className="block text-sm font-medium text-black dark:text-white">
                Nitish Kumar Jha
              </span>
              <span className="block text-xs text-gray-600 dark:text-gray-400">
                Admin
              </span>
            </div>
            <div className="lg:hidden flex flex-col text-right">
              <span className="block text-sm font-medium text-black dark:text-white">
                Nitish Kumar Jha
              </span>
              <span className="block text-xs text-gray-600 dark:text-gray-400">
                Admin
              </span>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-10 z-40"
              style={{ top: "100%" }} // Position dropdown below the profile button
            >
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
    </header>
  );
};

export default Header;
