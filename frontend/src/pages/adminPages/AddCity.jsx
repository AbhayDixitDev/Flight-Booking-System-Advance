// src/pages/adminPages/AddCity.jsx
import React, { useState } from "react";
import { message } from "antd";
import { FaCity, FaGlobe, FaCode } from "react-icons/fa";
import apiService from "../../services/apiService";

const AddCity = () => {
  const [cityData, setCityData] = useState({
    name: "",
    country: "",
    code: "",
  });

  const handleChange = (e) => {
    setCityData({
      ...cityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, country, code } = cityData;
    if (!name || !country || !code) {
      message.error("Please fill in all fields");
      return;
    }
    try {
      const response = await apiService.post("/admin/registerCity", cityData);
      message.success(response.data.message);
      setCityData({ name: "", country: "", code: "" }); // Reset form on success
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to add city");
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Add City</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* City Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaCity className="mr-2 text-indigo-600" /> City Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter city name"
              value={cityData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaGlobe className="mr-2 text-indigo-600" /> Country
            </label>
            <input
              type="text"
              name="country"
              placeholder="Enter country name"
              value={cityData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
          </div>

          {/* City Code */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaCode className="mr-2 text-indigo-600" /> City Code
            </label>
            <input
              type="text"
              name="code"
              placeholder="Enter city code (e.g., NYC)"
              value={cityData.code}
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
            Add City
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCity;