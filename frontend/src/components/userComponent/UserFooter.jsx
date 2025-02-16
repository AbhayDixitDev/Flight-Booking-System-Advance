// src/components/userComponent/UserFooter.jsx
import React from 'react';
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const UserFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 " style={{zIndex:"200"}}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Flight Booking System. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="https://github.com/abhaydixitdev" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaGithub size={24} />
          </a>
          <a href="https://twitter.com/abhaydixitji" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com/abhaydixitji" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/abhaydixitdev" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
