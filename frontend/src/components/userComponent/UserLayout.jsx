// src/components/userComponent/UserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";
import UserFooter from "./UserFooter";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header - Fixed */}
      <UserHeader />

      {/* Main content area with Sidebar */}
      <div className="flex flex-1 pt-16"> {/* pt-16 offsets header height */}
        {/* Sidebar - Assumed Fixed */}
        <UserSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto ml-0 md:ml-64"> {/* md:ml-64 offsets sidebar */}
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <UserFooter />
    </div>
  );
};

export default UserLayout;