// src/pages/Registration.jsx
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"; // Added FaUser for avatar
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

const Registration = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    passportNumber: "",
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formValues.username);
    data.append("email", formValues.email);
    data.append("password", formValues.password);
    data.append("fullName", formValues.fullName);
    data.append("passportNumber", formValues.passportNumber);
    if (avatar) {
      data.append("avatar", avatar);
    }

    try {
      const response = await apiService.post("/user/register", data);
      message.success(response.data.message);
      navigate("/");
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-700 px-6">
      <div className="w-full h-[80vh] overflow-y-auto max-w-md bg-white shadow-2xl rounded-xl p-8 transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="mr-2 text-indigo-600" /> Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="Enter your username"
              value={formValues.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="mr-2 text-indigo-600" /> Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaLock className="mr-2 text-indigo-600" /> Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Full Name Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="mr-2 text-indigo-600" /> Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="Enter your full name"
              value={formValues.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Passport Number Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="mr-2 text-indigo-600" /> Passport Number
            </label>
            <input
              type="text"
              id="passportNumber"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="Enter your passport number"
              value={formValues.passportNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Avatar Upload Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaUser className="mr-2 text-indigo-600" /> Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-200"
              onChange={handleFileChange}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 font-semibold"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-800 font-medium transition duration-200"
          >
            Already have an account? <span className="text-indigo-600 hover:underline">Login here</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;