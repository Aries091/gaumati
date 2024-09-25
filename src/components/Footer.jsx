import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Contact Information */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p>
              Email: <a href="mailto:gaumati2024@gmail.com" className="text-blue-400 underline">gaumati2024@gmail.com</a>
            </p>
            <p>Phone: 047-520136, 590478, 9844153551</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
            <Link to="/" className="hover:text-blue-400" aria-label="Home">Home</Link>
            <Link to="/about" className="hover:text-blue-400" aria-label="About">About</Link>
            <Link to="/academic" className="hover:text-blue-400" aria-label="Academic Programs">Academic Programs</Link>
            <Link to="/news" className="hover:text-blue-400" aria-label="News">News</Link>
            <Link to="/gallery" className="hover:text-blue-400" aria-label="Gallery">Gallery</Link>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.facebook.com/gaumatimhss.sindhuli?mibextid=ZbWKwL" className="text-xl hover:text-blue-400" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
