// src/components/userComponent/UserSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
    <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg focus:ring focus:ring-gray-500"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 transition-transform duration-300 ease-in-out p-6 z-40`}
      >
      <div className="mb-8 ml-14 lg:ml-6 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Menu</h2>
      </div>
      <nav className="space-y-4">
        <Link 
          to="/user/searchFlight" 
          className="block px-4 py-2 text-white rounded hover:bg-gray-700 transition-colors"
          style={{textDecoration:"none"}}
        >
          Search Flight
        </Link>
        <Link 
          to="/user/bookFlight" 
          className="block px-4 py-2 text-white rounded hover:bg-gray-700 transition-colors"
          style={{textDecoration:"none"}}
        >
          Book Flight
        </Link>
        <Link 
          to="/user/myBookings" 
          className="block px-4 py-2 text-white rounded hover:bg-gray-700 transition-colors"
          style={{textDecoration:"none"}}
        >
          My Bookings
        </Link>
        <Link 
          to="/user/changePassword" 
          className="block px-4 py-2 text-white rounded hover:bg-gray-700 transition-colors"
          style={{textDecoration:"none"}}
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

export default UserSidebar;
