import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">Uni-Assist</h2>
          <p className="text-blue-200">
            Smart campus platform for students, faculty & visitors. Streamline
            bookings, share resources, and promote sustainability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-blue-200">
            <li>
              <a href="#hero" className="hover:text-cyan-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-cyan-400 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#why" className="hover:text-cyan-400 transition">
                Why Uni-Assist
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cyan-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">
            Contact Us
          </h3>
          <p className="text-blue-200">123 Campus Road, City, Country</p>
          <p className="text-blue-200">Email: support@uni-assist.com</p>
          <p className="text-blue-200">Phone: +123 456 7890</p>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 mb-6">
            <a href="#" className="hover:text-cyan-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <FaLinkedinIn />
            </a>
          </div>

          <h3 className="text-xl font-semibold text-cyan-400 mb-2">
            Subscribe
          </h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-l-lg text-black"
            />
            <button className="bg-cyan-500 px-4 rounded-r-lg font-semibold hover:bg-cyan-400 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-blue-200 text-sm">
        © {new Date().getFullYear()} Uni-Assist. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
