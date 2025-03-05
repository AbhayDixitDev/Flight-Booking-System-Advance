// src/components/adminComponent/AdminSidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlane, FaBuilding, FaCity, FaLock, FaBars, FaTimes } from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button - Visible on Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition duration-200"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
      style={{zIndex: "1000"}}
        className={`fixed bg-gray-200 top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-800 to-gray-900 text-white shadow-2xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out p-6 z-40`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl text-gray-200 font-bold tracking-tight">Dashboard</h2>
          {/* Close Button (Small Screens) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white hover:text-indigo-300 transition duration-200"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="space-y-3">
          <Link
            to="/admin/addFlight"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-700 hover:text-indigo-100 transition duration-200"
          >
            <FaPlane className="text-indigo-400" /> Add Flight
          </Link>
          <Link
            to="/admin/addAirline"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-700 hover:text-indigo-100 transition duration-200"
          >
            <FaBuilding className="text-indigo-400" /> Add Airline
          </Link>
          <Link
            to="/admin/addAirport"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-700 hover:text-indigo-100 transition duration-200"
          >
            <FaCity className="text-indigo-400" /> Add City
          </Link>
          <Link
            to="/admin/changePassword"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-700 hover:text-indigo-100 transition duration-200"
          >
            <FaLock className="text-indigo-400" /> Change Password
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

export default AdminSidebar;