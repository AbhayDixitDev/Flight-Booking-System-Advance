// src/components/userComponent/MyBookings.jsx
import React, { useState, useEffect } from "react";
import { message } from "antd";
import apiService from "../../services/apiService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiService.get("/user/myBookings");
        setBookings(response.data.data || []);
      } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch bookings");
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">My Bookings</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">Flight</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={booking._id || index} // Use _id if available from API
                    className="border-b hover:bg-gray-100 transition duration-150"
                  >
                    <td className="py-3 px-4">
                      {booking.flightDetails?.flightNumber || "N/A"} -{" "}
                      {booking.flightDetails?.departureCity || "N/A"} to{" "}
                      {booking.flightDetails?.arrivalCity || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {booking.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        booking.status === "Confirmed"
                          ? "text-green-600"
                          : booking.status === "Pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {booking.status || "Unknown"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;