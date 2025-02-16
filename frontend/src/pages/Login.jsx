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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate(isAdmin ? "/admin" : "/user");
    }
  }, []);

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <FaEnvelope className="inline-block mr-2" /> Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              <FaLock className="inline-block mr-2" /> Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isAdmin ? "Login as Admin" : "Login as User"}
          </button>
        </form>

        {/* Switch to Admin/User Login */}
        <div className="text-center mt-3">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-blue-600 hover:underline"
          >
            {isAdmin ? "Switch to User Login" : "Switch to Admin Login"}{" "}
            <FaUserShield className="inline-block ml-1" />
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/register")}
            className="text-gray-700 hover:underline"
          >
            Don't have an account? Register here.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
