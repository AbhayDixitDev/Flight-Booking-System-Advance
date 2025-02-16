// src/pages/userPages/SearchFlight.jsx
import React, { useState } from "react";
import { message } from "antd";
import apiService from "../../services/apiService";

const SearchFlight = () => {
  const [searchParams, setSearchParams] = useState({
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiService.get("/user/searchFlight", {
        params: searchParams,
      });
      setFlights(response.data.data);
      if (response.data.data.length === 0) {
        message.info("No flights found for the selected criteria.");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to search flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Search Flight</h2>
        <form onSubmit={handleSearch} className="mt-4 space-y-4">
          {/* Departure City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Departure City</label>
            <input
              type="text"
              name="departureCity"
              placeholder="Enter departure city"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={searchParams.departureCity}
              onChange={handleChange}
            />
          </div>

          {/* Arrival City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Arrival City</label>
            <input
              type="text"
              name="arrivalCity"
              placeholder="Enter arrival city"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={searchParams.arrivalCity}
              onChange={handleChange}
            />
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Departure Date</label>
            <input
              type="date"
              name="departureDate"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={searchParams.departureDate}
              onChange={handleChange}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Flights"}
          </button>
        </form>
      </div>

      {/* Flight Results Table */}
      {flights.length > 0 && (
        <div className="w-full max-w-4xl mt-6 bg-white p-4 rounded-xl shadow-lg overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Flights</h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Flight Number</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Airline</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Departure City</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Arrival City</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Departure Time</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Arrival Time</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Price (Economy)</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-3 py-2">{flight.flightNumber}</td>
                  <td className="border border-gray-300 px-3 py-2">{flight.airline?.name || "N/A"}</td>
                  <td className="border border-gray-300 px-3 py-2">{flight.departureCity?.name || "N/A"}</td>
                  <td className="border border-gray-300 px-3 py-2">{flight.arrivalCity?.name || "N/A"}</td>
                  <td className="border border-gray-300 px-3 py-2">{flight.departureTime}</td>
                  <td className="border border-gray-300 px-3 py-2">{flight.arrivalTime}</td>
                  <td className="border border-gray-300 px-3 py-2">{flight.economyPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchFlight;
