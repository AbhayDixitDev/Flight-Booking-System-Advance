// src/pages/adminPages/AddFlights.jsx
import React, { useState } from "react";
import { message } from "antd";
import apiService from "../../services/apiService";

const AddFlights = () => {
  const [flightData, setFlightData] = useState({
    airline: "",
    flightNumber: "",
    departureCity: "",
    arrivalCity: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    economyPrice: "",
    businessPrice: "",
    economySeats: "",
    businessSeats: "",
  });

  const handleChange = (e) => {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert numeric fields to numbers if necessary
      const payload = {
        ...flightData,
        duration: Number(flightData.duration),
        economyPrice: Number(flightData.economyPrice),
        businessPrice: Number(flightData.businessPrice),
        economySeats: Number(flightData.economySeats),
        businessSeats: Number(flightData.businessSeats),
      };
      const response = await apiService.post("/admin/registerFlight", payload);
      message.success(response.data.message);
      setFlightData({
        airline: "",
        flightNumber: "",
        departureCity: "",
        arrivalCity: "",
        departureTime: "",
        arrivalTime: "",
        duration: "",
        economyPrice: "",
        businessPrice: "",
        economySeats: "",
        businessSeats: "",
      });
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to add flight");
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Add Flight</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Airline ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Airline ID</label>
            <input
              type="text"
              name="airline"
              placeholder="Enter airline ID"
              value={flightData.airline}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Flight Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              placeholder="Enter flight number"
              value={flightData.flightNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Departure City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Departure City ID</label>
            <input
              type="text"
              name="departureCity"
              placeholder="Enter departure city ID"
              value={flightData.departureCity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Arrival City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Arrival City ID</label>
            <input
              type="text"
              name="arrivalCity"
              placeholder="Enter arrival city ID"
              value={flightData.arrivalCity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Departure Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Departure Time</label>
            <input
              type="text"
              name="departureTime"
              placeholder="Enter departure time (e.g., 10:00 AM)"
              value={flightData.departureTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Arrival Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
            <input
              type="text"
              name="arrivalTime"
              placeholder="Enter arrival time (e.g., 1:00 PM)"
              value={flightData.arrivalTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              placeholder="Enter duration in minutes"
              value={flightData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Economy Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Economy Price</label>
            <input
              type="number"
              name="economyPrice"
              placeholder="Enter economy price"
              value={flightData.economyPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Business Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Price</label>
            <input
              type="number"
              name="businessPrice"
              placeholder="Enter business price"
              value={flightData.businessPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Economy Seats */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Economy Seats</label>
            <input
              type="number"
              name="economySeats"
              placeholder="Enter number of economy seats"
              value={flightData.economySeats}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Business Seats */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Seats</label>
            <input
              type="number"
              name="businessSeats"
              placeholder="Enter number of business seats"
              value={flightData.businessSeats}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFlights;
