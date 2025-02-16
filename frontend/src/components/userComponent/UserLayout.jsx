// src/components/userComponent/UserLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import UserFooter from './UserFooter';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      <div className="flex flex-1">
        <UserSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
