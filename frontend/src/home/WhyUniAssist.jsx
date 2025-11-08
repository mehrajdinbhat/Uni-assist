import React from "react";

const reasons = [
  {
    icon: "✅",
    title: "Save Time",
    description:
      "Manage all campus services in one unified system, reducing manual processes and delays.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80", // Modern workspace image
  },
  {
    icon: "🌱",
    title: "Promote Sustainability",
    description:
      "Eco-Swap marketplace and smart resource management encourage eco-friendly practices.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", // Eco-friendly nature + green theme
  },
  {
    icon: "🤝",
    title: "Encourage Collaboration",
    description:
      "Share study materials, collaborate on projects, and connect with students and faculty easily.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80", // Team collaboration / meeting
  },
];

const WhyUniAssist = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-cyan-600 text-center mb-12">
          Why Choose Uni-Assist?
        </h2>

        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center mb-16 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="md:w-1/2 w-full">
              <img
                src={reason.image}
                alt={reason.title}
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Text */}
            <div className="md:w-1/2 w-full md:px-12 mt-6 md:mt-0 flex flex-col justify-center">
              <div className="flex items-center mb-2 text-3xl text-black">
                {reason.icon}
              </div>
              <h3 className="text-3xl font-bold text-cyan-600 mb-4">
                {reason.title}
              </h3>
              <p className="text-gray-800 text-lg">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUniAssist;
