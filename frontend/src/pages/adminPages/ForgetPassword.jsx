// src/pages/adminPages/ForgetPassword.jsx
import React, { useState } from "react";
import { message } from "antd";
import apiService from "../../services/apiService";

const ForgetPassword = () => {
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
      message.error("Please fill in all the fields");
      return;
    }
    try {
      const response = await apiService.post("/admin/changePassword", {
        email,
        currentPassword,
        newPassword,
      });
      message.success(response.data.message);
    } catch (error) {
      message.error(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="flex  justify-center bg-gray-100 p-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
          Change Admin Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter your current password"
              value={formValues.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={formValues.newPassword}
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
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
