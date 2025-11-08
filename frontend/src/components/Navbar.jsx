import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { RiAccountBoxLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useProducts } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const { isAuthenticated, setProfile, setProducts } = useProducts();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4001/api/users/logout", {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      setProfile(null);
      setProducts([]);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.error(error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-md transition-all duration-300">
        <div className="flex justify-between items-center container mx-auto px-6 py-4">
          {/* Logo */}
          <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-wide">
            Uni<span className="text-indigo-600">-Assist</span>
          </div>

          {/* Desktop Navbar */}
          <div className="">
            <ul className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
              <Link
                to="/"
                className="relative hover:text-indigo-600 transition-all duration-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-indigo-600 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="relative hover:text-indigo-600 transition-all duration-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-indigo-600 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                See Products
              </Link>

              <Link
                to="/materials"
                className="relative hover:text-indigo-600 transition-all duration-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-indigo-600 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                See Material
              </Link>

              {/* ✅ Apply Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setApplyOpen(!applyOpen)}
                  className="flex items-center gap-1 hover:text-indigo-600 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Apply <MdKeyboardArrowDown size={20} />
                </button>

                {applyOpen && (
                  <div className="absolute top-8 left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fadeIn">
                    <Link
                      to="/guesthouse/apply"
                      onClick={() => setApplyOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      Guest House Booking
                    </Link>
                    <Link
                      to="/apply-vehiclepass"
                      onClick={() => setApplyOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      Vehicle Pass
                    </Link>
                  </div>
                )}
              </li>

              <Link
                to="/about"
                className="relative hover:text-indigo-600 transition-all duration-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-indigo-600 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="relative hover:text-indigo-600 transition-all duration-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-indigo-600 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                Contact
              </Link>
            </ul>

            {/* Hamburger Icon */}
            <div
              className="md:hidden text-gray-700 cursor-pointer transition-transform hover:scale-110"
              onClick={() => setShow(!show)}
            >
              {show ? <IoClose size={26} /> : <AiOutlineMenu size={26} />}
            </div>
          </div>

          {/* Desktop MyAccount & Login/Logout */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && (
              <Link
                to="/myaccount"
                title="My Account"
                className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:opacity-90 transition-all duration-300 rounded-full w-10 h-10 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <RiAccountBoxLine size={26} />
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        {show && (
          <div className="bg-white/95 backdrop-blur-sm md:hidden shadow-lg animate-slideDown">
            <ul className="flex flex-col h-screen items-center justify-center space-y-6 text-lg text-gray-700 font-medium">
              <Link to="/" onClick={() => setShow(false)}>
                Home
              </Link>
              <Link to="/products" onClick={() => setShow(false)}>
                See Products
              </Link>
              <Link to="/materials" onClick={() => setShow(false)}>
                See Material
              </Link>

              {/* ✅ Mobile Apply Dropdown */}
              <div className="flex flex-col items-center">
                <p className="font-semibold text-indigo-600">Apply</p>
                <Link
                  to="/guesthouse/apply"
                  onClick={() => setShow(false)}
                  className="hover:text-indigo-500 transition-all"
                >
                  Guest House
                </Link>
                <Link
                  to="/apply-vehiclepass"
                  onClick={() => setShow(false)}
                  className="hover:text-indigo-500 transition-all"
                >
                  Vehicle Pass
                </Link>
              </div>

              <Link to="/about" onClick={() => setShow(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setShow(false)}>
                Contact
              </Link>

              {isAuthenticated && (
                <Link
                  to="/myaccount"
                  onClick={() => setShow(false)}
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold hover:opacity-90 px-5 py-2 rounded-md shadow-md hover:shadow-lg transition-all"
                >
                  My Account
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setShow(false);
                  }}
                  className="bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setShow(false)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                >
                  Login
                </Link>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
