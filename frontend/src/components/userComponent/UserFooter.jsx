// src/components/userComponent/UserFooter.jsx
import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const UserFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm font-light text-center md:text-left mb-2 md:mb-0">
          © {new Date().getFullYear()} Flight Booking System. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/abhaydixitdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition duration-200"
          >
            <FaGithub size={26} />
          </a>
          <a
            href="https://twitter.com/abhaydixitji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition duration-200"
          >
            <FaTwitter size={26} />
          </a>
          <a
            href="https://www.instagram.com/abhaydixitji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition duration-200"
          >
            <FaInstagram size={26} />
          </a>
          <a
            href="https://www.linkedin.com/in/abhaydixitdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition duration-200"
          >
            <FaLinkedin size={26} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;