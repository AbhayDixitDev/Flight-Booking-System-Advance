// src/components/userComponent/ChangePassword.jsx
import React, { useState } from "react";
import { message } from "antd";
import { FaLock } from "react-icons/fa";
import apiService from "../../services/apiService";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      message.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error("New passwords do not match");
      return;
    }

    try {
      const response = await apiService.post("/user/changePassword", {
        currentPassword,
        newPassword,
      });
      message.success(response.data.message);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" }); // Reset form on success
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaLock className="mr-2 text-blue-600" /> Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaLock className="mr-2 text-blue-600" /> New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaLock className="mr-2 text-blue-600" /> Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;