// src/components/adminComponent/AdminFooter.jsx
import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const AdminFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Copyright Section */}
        <div className="text-center md:text-left text-sm font-light mb-2 md:mb-0">
          © {new Date().getFullYear()} Flight Booking System. All rights reserved.
        </div>

        {/* Developer Credit */}
        <div className="text-center text-sm font-light mb-2 md:mb-0">
          Developed by{" "}
          <a
            href="https://github.com/abhaydixitdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition duration-200"
          >
            Abhay Dixit
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/abhaydixitdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition duration-200"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://twitter.com/abhaydixitji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition duration-200"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="https://www.instagram.com/abhaydixitji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition duration-200"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/abhaydixitdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition duration-200"
          >
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;