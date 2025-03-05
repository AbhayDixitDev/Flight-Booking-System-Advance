// src/pages/adminPages/BookingHistory.jsx
import React, { useState, useEffect } from "react";
import { message } from "antd";
import apiService from "../../services/apiService";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiService.get("/admin/bookingHistory");
        setBookings(response.data.data);
      } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch booking history");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">#</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Flight</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">User</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Booking Date</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Total Cost</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bookings && bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{booking.flightDetails}</td>
                  <td className="py-3 px-4">{booking.userId}</td>
                  <td className="py-3 px-4">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">${booking.totalCost.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingHistory;