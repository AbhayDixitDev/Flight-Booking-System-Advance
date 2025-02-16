// src/components/adminComponent/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminRightSidebar from './AdminRightSidebar';
import AdminFooter from './AdminFooter';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <AdminHeader />

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        {/* <AdminRightSidebar /> */}
      </div>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
