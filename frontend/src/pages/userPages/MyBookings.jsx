// src/components/userComponent/MyBookings.jsx
import React, { useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([
    { id: 1, flight: "Flight A", date: "2025-03-15", status: "Confirmed" },
    { id: 2, flight: "Flight B", date: "2025-04-02", status: "Pending" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900">My Bookings</h2>

        <div className="overflow-x-auto mt-4">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-gray-700 font-medium">Flight</th>
                <th className="p-3 text-left text-gray-700 font-medium">Date</th>
                <th className="p-3 text-left text-gray-700 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id} className="border-b last:border-none hover:bg-gray-50">
                  <td className="p-3 text-gray-800">{booking.flight}</td>
                  <td className="p-3 text-gray-800">{booking.date}</td>
                  <td
                    className={`p-3 font-semibold ${
                      booking.status === "Confirmed" ? "text-green-600" : "text-yellow-500"
                    }`}
                  >
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
