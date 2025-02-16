// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminLayout from './components/adminComponent/AdminLayout';
import BookingHistory from './pages/adminPages/BookingHistory';
import AddFlights from './pages/adminPages/AddFlights';
import AddAirlines from './pages/adminPages/AddAirlines';
import AddCity from './pages/adminPages/AddCity';
import ForgetPassword from './pages/adminPages/ForgetPassword';
import UserLayout from './components/userComponent/UserLayout';
import SearchFlight from './pages/userPages/SearchFlight';
import BookFlight from './pages/userPages/BookFlight';
import MyBookings from './pages/userPages/MyBookings';
import ChangePassword from './pages/userPages/ChangePassword';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          {/* Admin nested routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<BookingHistory />} />
            <Route path="addFlight" element={<AddFlights />} />
            <Route path="addAirline" element={<AddAirlines />} />
            <Route path="addAirport" element={<AddCity />} />
            <Route path="changePassword" element={<ForgetPassword />} />
          </Route>

          {/* User nested routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<SearchFlight />} />
            <Route path="searchFlight" element={<SearchFlight />} />
            <Route path="bookFlight" element={<BookFlight />} />
            <Route path="myBookings" element={<MyBookings />} />
            <Route path="changePassword" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
