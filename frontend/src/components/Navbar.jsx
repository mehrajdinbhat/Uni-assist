import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

function navbar() {
  const [show, setShow] = useState(false);
  return (
    <>
      <nav className="shadow-lg px-4 py-3">
        <div className="flex justify-between container mx-auto">
          <div className="font-semibold ">
            Uni-<span className="text-blue-500">Assist</span>
          </div>
          {/* // desktop navbar */}
          <div className="">
            <ul className=" hidden md:flex  space-x-6">
              <Link to="" className="hover:text-blue-500">Home</Link>
              <Link to="products" className="hover:text-blue-500">See Products</Link>
              <Link to="/about" className="hover:text-blue-500">About</Link>
              <Link to="/contact" className="hover:text-blue-500">Contact</Link>
            </ul>
            {/* // hamburger icon */}
            <div className="md:hidden" onClick={() => setShow(!show)}>
              {show ? <IoClose size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>
          <div className="space-x-2 hidden md:flex">
            <Link
              to="/dashboard"
              className="bg-cyan-300 text-black font-semibold hover:bg-blue-400 duration-300 px-4 py-2 rounded-md"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="bg-rose-600 text-black font-semibold hover:bg-blue-400 duration-300 px-4 py-2 rounded-md"
            >
              Login
            </Link>
          </div>
        </div>
        {/* // mobile navbar */}
        {show && (
          <div className="bg-white">
            <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl">
              <Link
                to="/"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeclass="active"
                className="hover:text-blue-500"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeclass="active"
                className="hover:text-blue-500"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                offset={-70}
                activeclass="active"
                className="hover:text-blue-500"
              >
                Contact
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default navbar;
