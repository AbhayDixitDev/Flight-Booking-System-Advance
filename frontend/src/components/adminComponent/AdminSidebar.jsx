// src/components/adminComponent/AdminSidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button - Visible on Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 transition-transform duration-300 ease-in-out p-6 z-40`}
      >
        <div className="mb-8 ml-14 lg:ml-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          {/* Close Button (Small Screens) */}
          {/* <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white text-xl"
          >
            ✖
          </button> */}
        </div>

        <nav className="space-y-4">
          <Link
            to="/admin/addFlight"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            style={{ textDecoration: "none" }}
          >
            Add Flight
          </Link>
          <Link
            to="/admin/addAirline"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            style={{ textDecoration: "none" }}
          >
            Add Airline
          </Link>
          <Link
            to="/admin/addAirport"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            style={{ textDecoration: "none" }}
          >
            Add City
          </Link>
          <Link
            to="/admin/changePassword"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            style={{ textDecoration: "none" }}
          >
            Change Password
          </Link>
        </nav>
      </aside>

      {/* Overlay Background (Closes Sidebar When Clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
