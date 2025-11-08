import React from "react";

const features = [
  {
    icon: "🏨",
    title: "Guest House Booking",
    description: "Book rooms with real-time availability and approvals.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "🚗",
    title: "Vehicle Pass & Bikes",
    description:
      "Generate and manage vehicle passes and share/rent bikes on campus.",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "📚",
    title: "Study Material Hub",
    description: "Central repository for notes, e-books, and past papers.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "♻️",
    title: "Eco-Swap Marketplace",
    description: "Exchange, sell, or donate items and promote sustainability.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "👤",
    title: "User Management",
    description:
      "Registration, login, and role-based access with Unified Digital ID.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "📅",
    title: "Event & Facility Booking",
    description:
      "Book auditoriums, halls, and guest houses with approval workflows.",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "📝",
    title: "Academic Collaboration",
    description:
      "Upload, download, rate, and share educational resources efficiently.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "🌱",
    title: "Eco-Friendly Management",
    description:
      "Digital management for transportation and Eco-points tracking.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-cyan-400 mb-6">
          Features & Modules
        </h2>
        <p className="text-lg text-blue-200 mb-12 max-w-3xl mx-auto">
          Uni-Assist integrates all campus operations into a unified digital
          ecosystem, offering tools for students, faculty, and administrators to
          collaborate effectively.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg 
              hover:shadow-cyan-400/30 transform hover:-translate-y-2 transition-all duration-500"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
                style={{ backgroundImage: `url(${feature.image})` }}
              ></div>

              {/* Softer Overlay */}
              <div className="absolute inset-0 bg-black/35"></div>

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
