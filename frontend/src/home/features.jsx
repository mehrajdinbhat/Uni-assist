import React from "react";

const features = [
  {
    icon: "🏨",
    title: "Guest House Booking",
    description: "Book rooms with real-time availability and approvals.",
  },
  {
    icon: "🚗",
    title: "Vehicle Pass & Bikes",
    description:
      "Generate and manage vehicle passes and share/rent bikes on campus.",
  },
  {
    icon: "📚",
    title: "Study Material Hub",
    description: "Central repository for notes, e-books, and past papers.",
  },
  {
    icon: "♻️",
    title: "Eco-Swap Marketplace",
    description: "Exchange, sell, or donate items and promote sustainability.",
  },
  {
    icon: "👤",
    title: "User Management",
    description:
      "Registration, login, and role-based access with Unified Digital ID.",
  },
  {
    icon: "📅",
    title: "Event & Facility Booking",
    description:
      "Book auditoriums, halls, and guest houses with approval workflows.",
  },
  {
    icon: "📝",
    title: "Academic Collaboration",
    description:
      "Upload, download, rate, and share educational resources efficiently.",
  },
  {
    icon: "🌱",
    title: "Eco-Friendly Management",
    description:
      "Digital management for transportation and Eco-points tracking.",
  },
];

const Features = () => {
  return (
    <section className="py-20  text-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-cyan-400 mb-6">
          Features & Modules
        </h2>
        <p className="text-lg text-blue-200 mb-12 max-w-3xl mx-auto">
          Uni-Assist transforms fragmented campus operations into a single,
          integrated digital ecosystem. It provides students, faculty, and
          visitors with efficient, user-friendly tools that promote
          sustainability and collaboration.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative rounded-xl bg-gray-800 p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300 h-64"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
