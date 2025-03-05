// src/pages/adminPages/ForgetPassword.jsx
import React, { useState } from "react";
import { message } from "antd";
import { FaEnvelope, FaLock } from "react-icons/fa";
import apiService from "../../services/apiService";

const ChangePassword = () => { // Renamed to reflect functionality
  const [formValues, setFormValues] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, currentPassword, newPassword } = formValues;
    if (!email || !currentPassword || !newPassword) {
      message.error("Please fill in all fields");
      return;
    }
    try {
      const response = await apiService.post("/admin/changePassword", {
        email,
        currentPassword,
        newPassword,
      });
      message.success(response.data.message);
      setFormValues({ email: "", currentPassword: "", newPassword: "" }); // Reset form on success
    } catch (error) {
      message.error(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Change Admin Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="mr-2 text-indigo-600" /> Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
          </div>

          {/* Current Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaLock className="mr-2 text-indigo-600" /> Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter your current password"
              value={formValues.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaLock className="mr-2 text-indigo-600" /> New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={formValues.newPassword}
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
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword; // Updated export to match renamed component