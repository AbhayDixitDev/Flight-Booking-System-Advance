// src/pages/adminPages/AddAirlines.jsx
import React, { useState } from "react";
import { message } from "antd";
import { FaPlane, FaCode } from "react-icons/fa";
import apiService from "../../services/apiService";

const AddAirlines = () => {
  const [airlineData, setAirlineData] = useState({
    name: "",
    code: "",
  });

  const handleChange = (e) => {
    setAirlineData({
      ...airlineData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, code } = airlineData;
    if (!name || !code) {
      message.error("Please fill in all fields");
      return;
    }
    try {
      const response = await apiService.post("/admin/registerAirline", airlineData);
      message.success(response.data.message);
      setAirlineData({ name: "", code: "" }); // Reset form on success
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to add airline");
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Add Airline</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Airline Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaPlane className="mr-2 text-indigo-600" /> Airline Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter airline name (e.g., Delta)"
              value={airlineData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
          </div>

          {/* Airline Code */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaCode className="mr-2 text-indigo-600" /> Airline Code
            </label>
            <input
              type="text"
              name="code"
              placeholder="Enter airline code (e.g., DL)"
              value={airlineData.code}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 font-semibold"
          >
            Add Airline
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAirlines;