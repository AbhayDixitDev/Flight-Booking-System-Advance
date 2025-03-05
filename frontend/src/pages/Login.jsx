// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import apiService from "../services/apiService";

const Login = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   // if (user) {
  //   //   navigate(isAdmin ? "/admin" : "/user");
  //   // }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isAdmin) {
        response = await apiService.post("/user/adminLogin", { email, password });
      } else {
        response = await apiService.post("/user/login", { email, password });
      }
      message.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("userType", isAdmin ? "admin" : "user");
      navigate(isAdmin ? "/admin" : "/user");
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-700 px-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FaEnvelope className="mr-2 text-indigo-600" /> Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 font-semibold"
          >
            {isAdmin ? "Login as Admin" : "Login as User"}
          </button>
        </form>

        {/* Switch to Admin/User Login */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200 flex items-center justify-center mx-auto"
          >
            {isAdmin ? "Switch to User Login" : "Switch to Admin Login"}
            <FaUserShield className="ml-2" />
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/register")}
            className="text-gray-600 hover:text-gray-800 font-medium transition duration-200"
          >
            Don't have an account? <span className="text-indigo-600 hover:underline">Register here</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;