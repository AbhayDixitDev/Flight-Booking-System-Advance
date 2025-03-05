// src/components/userComponent/UserHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";

const UserHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl py-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-6">
        <h1 className="text-3xl font-bold tracking-tight lg:ml-40">
          User Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-blue-700 hover:bg-red-600 px-4 py-2 rounded-lg focus:ring-4 focus:ring-blue-300 transition-all duration-200 font-medium"
        >
          <span>Logout</span>
          <FaPowerOff className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default UserHeader;