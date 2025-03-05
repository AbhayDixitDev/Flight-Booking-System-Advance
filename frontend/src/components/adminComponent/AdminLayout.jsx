// src/components/adminComponent/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminRightSidebar from "./AdminRightSidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header - Fixed */}
      <AdminHeader />

      {/* Main content area with Sidebar */}
      <div className="flex flex-1 pt-16"> {/* pt-16 offsets header height */}
        {/* Sidebar - Fixed */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto ml-0 md:ml-64"> {/* md:ml-64 offsets sidebar */}
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Right Sidebar (Uncomment if needed) */}
        {/* <AdminRightSidebar /> */}
      </div>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;