// src/components/adminComponent/AdminHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-gray-500 shadow-lg py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-white text-3xl font-bold ml-8 lg:ml-40">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white hover:text-red-400 focus:outline-none transition-colors"
        >
          <span>Logout</span>
          <FaPowerOff className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
