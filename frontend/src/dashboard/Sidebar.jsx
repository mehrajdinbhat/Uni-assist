import React, { useState } from "react";
import { useProducts } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";

function Sidebar({ setComponent }) {
  const { profile, setProfile, setIsAuthenticated } = useProducts();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    console.log("🔄 Sidebar clicked:", value);
    setComponent(value);
  };

  const gotoHome = () => navigateTo("/");

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setProfile(null);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Menu */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl" />
      </div>

      {/* Sidebar Container */}
      <div
        className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>

        {/* Profile Section */}
        <div className="text-center mt-6">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
            src={profile?.photo?.url || "https://via.placeholder.com/150"}
            alt={profile?.name || "User"}
          />
          <p className="text-lg font-semibold">{profile?.name || "User"}</p>
        </div>

        {/* Menu Buttons */}
        <ul className="space-y-6 mx-4 mt-8">
          <button
            onClick={() => handleComponents("My Products")}
            className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300"
          >
            MY PRODUCTS
          </button>

          <button
            onClick={() => handleComponents("create product")}
            className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            CREATE PRODUCTS
          </button>

          {/* 🟣 Upload Material */}
          <button
            onClick={() => handleComponents("Upload Material")}
            className="w-full px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            UPLOAD MATERIAL
          </button>

          {/* 🟢 My Materials */}
          <button
            onClick={() => handleComponents("My Materials")}
            className="w-full px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            MY MATERIALS
          </button>

          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300"
          >
            MY PROFILE
          </button>

          <button
            onClick={gotoHome}
            className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300"
          >
            HOME
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
