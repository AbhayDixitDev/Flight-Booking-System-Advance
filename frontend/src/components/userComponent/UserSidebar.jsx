// src/components/userComponent/UserSidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlane, FaBook, FaHistory, FaLock, FaBars, FaTimes } from "react-icons/fa";

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button - Visible on Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition duration-200"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
      style={{zIndex: "1000"}}
        className={`fixed bg-gray-200 top-0 left-0 h-full w-64  text-white shadow-2xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out p-6 z-40`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl text-gray-200 font-bold tracking-tight">Menu</h2>
          {/* Close Button (Small Screens) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white hover:text-blue-300 transition duration-200"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="space-y-3">
          <Link
            to="/user/searchFlight"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 hover:text-blue-100 transition duration-200"
          >
            <FaPlane className="text-blue-400" /> Search Flight
          </Link>
          <Link
            to="/user/bookFlight"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 hover:text-blue-100 transition duration-200"
          >
            <FaBook className="text-blue-400" /> Book Flight
          </Link>
          <Link
            to="/user/myBookings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 hover:text-blue-100 transition duration-200"
          >
            <FaHistory className="text-blue-400" /> My Bookings
          </Link>
          <Link
            to="/user/changePassword"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 hover:text-blue-100 transition duration-200"
          >
            <FaLock className="text-blue-400" /> Change Password
          </Link>
        </nav>
      </aside>

      {/* Overlay Background (Closes Sidebar on Click) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default UserSidebar;