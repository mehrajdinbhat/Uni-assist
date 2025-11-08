import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
            About <span className="text-yellow-300">Uni-Assist</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-blue-100">
            A unified digital ecosystem that connects students, faculty, and
            visitors — making campus life smarter, more sustainable, and
            collaborative.
          </p>
        </motion.div>
      </section>

      {/* What We Offer */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-center text-blue-700"
        >
          What Uni-Assist Offers
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg leading-relaxed">
            <li>🏨 Guest House Booking — Real-time availability & approval</li>
            <li>🚗 Vehicle Pass Management — Smart, digital passes</li>
            <li>
              🚴 Smart Transportation & Bike Sharing — Rent or share easily
            </li>
            <li>♻️ Eco-Swap Marketplace — Exchange, sell, or donate items</li>
            <li>📘 Material Sharing — Share notes, e-books, and papers</li>
          </ul>
          <motion.img
            whileHover={{ scale: 1.03 }}
            src="https://images.unsplash.com/photo-1581092580496-d7a7c4e4d927?auto=format&fit=crop&w=800&q=80"
            alt="Uni-Assist platform"
            className="rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 md:px-20 bg-gray-100">
        <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">
          Problem Statement
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3 max-w-3xl mx-auto leading-relaxed text-lg">
          <li>Fragmented manual processes for bookings and services</li>
          <li>
            Operational delays and inefficiency due to disconnected systems
          </li>
          <li>Lack of centralized academic sharing for resources</li>
          <li>Limited eco-friendly initiatives and digital integration</li>
          <li>No unified system for transport, booking, and collaboration</li>
        </ul>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-4xl font-bold mb-10 text-blue-700 text-center">
          Our Solution
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center mb-12 text-lg">
          Uni-Assist streamlines all campus operations into one integrated
          digital platform — empowering universities with efficiency,
          collaboration, and sustainability.
        </p>

        <div className="grid md:grid-cols-2 gap-14 max-w-6xl mx-auto items-center">
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-xl text-blue-600">
                💡 Integrated Digital Services
              </h3>
              <p>One workflow for all bookings and facility requests.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-blue-600">
                📚 Academic Hub
              </h3>
              <p>Centralized repository for notes, e-books, and past papers.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-blue-600">
                🌱 Smart & Eco-Friendly
              </h3>
              <p>Manage transport digitally & promote sustainability.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-blue-600">
                ⚙️ Unified Experience
              </h3>
              <p>Seamless collaboration through connected modules.</p>
            </div>
          </div>

          <motion.img
            whileHover={{ scale: 1.03 }}
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Uni-Assist solution"
            className="rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h2 className="text-4xl font-bold mb-10 text-blue-700 text-center">
          Core Modules
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto text-gray-700">
          {[
            {
              title: "User Management",
              points: [
                "Registration & login for all roles",
                "Role-based access with Unified Digital ID",
              ],
            },
            {
              title: "Event & Facility Booking",
              points: [
                "Book auditoriums, halls, and guest houses",
                "Real-time availability & approvals",
              ],
            },
            {
              title: "Vehicle & Transport",
              points: ["Manage vehicle passes and bike rentals"],
            },
            {
              title: "Academic Collaboration",
              points: [
                "Central notes repository",
                "Upload, download & rate study resources",
              ],
            },
            {
              title: "Eco-Swap Marketplace",
              points: [
                "Exchange or donate items sustainably",
                "Eco-points for green contributions",
              ],
            },
          ].map((mod, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all"
            >
              <h3 className="font-semibold text-xl text-blue-600 mb-3">
                {mod.title}
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {mod.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-4xl font-bold mb-10 text-blue-700 text-center">
          Technology Stack
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            { title: "Frontend", tech: "ReactJS, HTML, CSS, JavaScript" },
            { title: "Backend", tech: "Node.js, Express.js" },
            { title: "Database", tech: "MongoDB" },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 p-8 rounded-2xl shadow text-center hover:shadow-xl transition-all"
            >
              <h3 className="font-semibold text-xl text-blue-600 mb-3">
                {t.title}
              </h3>
              <p className="text-gray-700">{t.tech}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Experience Uni-Assist Today</h2>
        <p className="mb-8 max-w-2xl mx-auto text-blue-100 text-lg">
          Discover how Uni-Assist transforms your campus experience with
          smarter, eco-friendly digital solutions.
        </p>
        <a
          href="/products"
          className="inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-all"
        >
          Explore Marketplace
        </a>
      </section>
    </div>
  );
}
