// src/pages/adminPages/AddAirlines.jsx
import React, { useState } from "react";
import { message } from "antd";
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
    try {
      const response = await apiService.post("/admin/registerAirline", airlineData);
      message.success(response.data.message);
      setAirlineData({ name: "", code: "" });
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to add airline");
    }
  };

  return (
    <div className=" flex  justify-center bg-gray-100 p-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Add Airline</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Airline Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Airline Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter airline name"
              value={airlineData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Airline Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Airline Code</label>
            <input
              type="text"
              name="code"
              placeholder="Enter airline code"
              value={airlineData.code}
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
            Add Airline
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAirlines;
