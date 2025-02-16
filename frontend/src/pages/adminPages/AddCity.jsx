// src/pages/adminPages/AddCity.jsx
import React, { useState } from "react";
import { message } from "antd";
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
    try {
      const response = await apiService.post("/admin/registerCity", cityData);
      message.success(response.data.message);
      setCityData({ name: "", country: "", code: "" });
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to add city");
    }
  };

  return (
    <div className=" flex  justify-center bg-gray-100 p-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Add City</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* City Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">City Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter city name"
              value={cityData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter country name"
              value={cityData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* City Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">City Code</label>
            <input
              type="text"
              name="code"
              placeholder="Enter city code"
              value={cityData.code}
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
            Add City
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCity;
