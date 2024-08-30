"use client";
import React, { useEffect, useRef } from "react";
import {
  HiX,
  HiDocumentText,
  HiChat,
  HiStar,
  HiCalendar,
} from "react-icons/hi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const sidebarRef = useRef(null);

  // Close the sidebar when clicking outside
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
  }, [setSidebarOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col transition-transform transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:relative z-40`}
    >
      <div className="flex items-center justify-between p-6">
        <div className="text-2xl font-bold">My App</div>
        {/* Close Button for Mobile */}
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2">
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
              <HiDocumentText className="mr-3 text-lg" />
              <span className="text-lg">Conscient Form Data</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-4 hover:bg-gray-700 rounded-md"
            >
              <HiChat className="mr-3 text-lg" />
              <span className="text-lg">Feedback Form Data</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-4 hover:bg-gray-700 rounded-md"
            >
              <HiStar className="mr-3 text-lg" />
              <span className="text-lg">Review Form Data</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-4 hover:bg-gray-700 rounded-md"
            >
              <HiCalendar className="mr-3 text-lg" />
              <span className="text-lg">Monthly Form Data</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
