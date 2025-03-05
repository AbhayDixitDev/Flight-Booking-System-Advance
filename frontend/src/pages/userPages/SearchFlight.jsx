// src/pages/userPages/SearchFlight.jsx
import React, { useState } from "react";
import { message } from "antd";
import { FaCity, FaCalendar, FaSearch } from "react-icons/fa";
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
    const { departureCity, arrivalCity, departureDate } = searchParams;
    if (!departureCity || !arrivalCity || !departureDate) {
      message.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await apiService.get("/user/searchFlight", {
        params: searchParams,
      });
      setFlights(response.data.data || []);
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
    <div className="py-6">
      {/* Search Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Search Flights</h2>
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Departure City */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaCity className="mr-2 text-blue-600" /> Departure City
            </label>
            <input
              type="text"
              name="departureCity"
              placeholder="Enter departure city (e.g., New York)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              value={searchParams.departureCity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Arrival City */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaCity className="mr-2 text-blue-600" /> Arrival City
            </label>
            <input
              type="text"
              name="arrivalCity"
              placeholder="Enter arrival city (e.g., Los Angeles)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              value={searchParams.arrivalCity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Departure Date */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaCalendar className="mr-2 text-blue-600" /> Departure Date
            </label>
            <input
              type="date"
              name="departureDate"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={searchParams.departureDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold flex items-center justify-center gap-2"
            disabled={loading}
          >
            <FaSearch /> {loading ? "Searching..." : "Search Flights"}
          </button>
        </form>
      </div>

      {/* Flight Results Table */}
      {flights.length > 0 && (
        <div className="max-w-4xl mx-auto mt-6 bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Flights</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Flight Number</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Airline</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Departure City</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Arrival City</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Departure Time</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Arrival Time</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Price (Economy)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {flights.map((flight) => (
                  <tr key={flight._id} className="border-b hover:bg-gray-100 transition duration-150">
                    <td className="py-3 px-4">{flight.flightNumber || "N/A"}</td>
                    <td className="py-3 px-4">{flight.airline?.name || "N/A"}</td>
                    <td className="py-3 px-4">{flight.departureCity?.name || flight.departureCity || "N/A"}</td>
                    <td className="py-3 px-4">{flight.arrivalCity?.name || flight.arrivalCity || "N/A"}</td>
                    <td className="py-3 px-4">
                      {flight.departureTime
                        ? new Date(flight.departureTime).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {flight.economyPrice ? `$${flight.economyPrice.toFixed(2)}` : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFlight;