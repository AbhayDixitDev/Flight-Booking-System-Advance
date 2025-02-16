// src/pages/userPages/BookFlight.jsx
import React, { useState, useEffect } from "react";
import { message } from "antd";
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
    if (!selectedFlight || !bookingDate || passengers.length === 0) {
      message.error("Please fill out all required fields.");
      return;
    }
    try {
      const payload = {
        flightDetails: selectedFlight,
        bookingDate,
        passengers,
        userId: "dummyUserId",
      };
      const response = await apiService.post("/user/booking", payload);
      message.success(response.data.message);
    } catch (error) {
      message.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900">Book a Flight</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Flight Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Flight</label>
            <select
              id="flight"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={selectedFlight}
              onChange={(e) => setSelectedFlight(e.target.value)}
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
            <label className="block text-sm font-medium text-gray-700">Booking Date</label>
            <input
              type="date"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>

          {/* Passengers */}
          <h3 className="text-lg font-semibold text-gray-900">Passenger Details</h3>
          {passengers.map((passenger, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    value={passenger.firstName}
                    onChange={(e) => handlePassengerChange(index, e)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    value={passenger.lastName}
                    onChange={(e) => handlePassengerChange(index, e)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, e)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
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
                  <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                  <input
                    type="text"
                    name="passportNumber"
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    value={passenger.passportNumber}
                    onChange={(e) => handlePassengerChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Passenger Button */}
          <button
            type="button"
            onClick={addPassenger}
            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Add Another Passenger
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookFlight;
