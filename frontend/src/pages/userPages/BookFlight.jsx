// src/pages/userPages/BookFlight.jsx
import React, { useState, useEffect } from "react";
import { message } from "antd";
import { FaPlane, FaCalendar, FaUserPlus, FaPaperPlane } from "react-icons/fa";
import apiService from "../../services/apiService";

const BookFlight = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [passengers, setPassengers] = useState([
    { firstName: "", lastName: "", age: "", gender: "", passportNumber: "" },
  ]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await apiService.get("/user/searchFlight");
        setFlights(response.data.data);
      } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch flights");
      }
    };
    fetchFlights();
  }, []);

  const handlePassengerChange = (index, e) => {
    const updatedPassengers = passengers.map((passenger, idx) =>
      idx === index ? { ...passenger, [e.target.name]: e.target.value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { firstName: "", lastName: "", age: "", gender: "", passportNumber: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFlight || !bookingDate || passengers.some(p => !p.firstName || !p.lastName)) {
      message.error("Please fill out all required fields.");
      return;
    }
    try {
      const payload = {
        flightDetails: selectedFlight,
        bookingDate,
        passengers,
        userId: JSON.parse(localStorage.getItem("user"))?._id || "dummyUserId", // Use actual user ID
      };
      const response = await apiService.post("/user/booking", payload);
      message.success(response.data.message);
      setSelectedFlight("");
      setBookingDate("");
      setPassengers([{ firstName: "", lastName: "", age: "", gender: "", passportNumber: "" }]);
    } catch (error) {
      message.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Book a Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Flight Selection */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaPlane className="mr-2 text-blue-600" /> Select Flight
            </label>
            <select
              id="flight"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              value={selectedFlight}
              onChange={(e) => setSelectedFlight(e.target.value)}
              required
            >
              <option value="">-- Select a Flight --</option>
              {flights.map((flight) => (
                <option key={flight._id} value={flight._id}>
                  {flight.flightNumber} - {flight.departureCity} to {flight.arrivalCity}
                </option>
              ))}
            </select>
          </div>

          {/* Booking Date */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaCalendar className="mr-2 text-blue-600" /> Booking Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>

          {/* Passengers */}
          <h3 className="text-lg font-semibold text-gray-900 mt-4">Passenger Details</h3>
          {passengers.map((passenger, index) => (
            <div key={index} className="p-4 bg-gray-50 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                    value={passenger.firstName}
                    onChange={(e) => handlePassengerChange(index, e)}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                    value={passenger.lastName}
                    onChange={(e) => handlePassengerChange(index, e)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, e)}
                    placeholder="Enter age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                    value={passenger.gender}
                    onChange={(e) => handlePassengerChange(index, e)}
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                  <input
                    type="text"
                    name="passportNumber"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                    value={passenger.passportNumber}
                    onChange={(e) => handlePassengerChange(index, e)}
                    placeholder="Enter passport number"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Passenger Button */}
          <button
            type="button"
            onClick={addPassenger}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold flex items-center justify-center gap-2"
          >
            <FaUserPlus /> Add Another Passenger
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold flex items-center justify-center gap-2"
          >
            <FaPaperPlane /> Book Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookFlight;