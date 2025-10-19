import React from "react";

const reasons = [
  {
    icon: "✅",
    title: "Save Time",
    description:
      "Manage all campus services in one unified system, reducing manual processes and delays.",
    image:
      "https://images.unsplash.com/photo-1581093588401-9e7e0fcd3d0f?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "🌱",
    title: "Promote Sustainability",
    description:
      "Eco-Swap marketplace and smart resource management encourage eco-friendly practices.",
    image:
      "https://images.unsplash.com/photo-1603052875941-97ff03df9f43?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: "🤝",
    title: "Encourage Collaboration",
    description:
      "Share study materials, collaborate on projects, and connect with students and faculty easily.",
    image:
      "https://images.unsplash.com/photo-1562887009-44b0f1711c48?auto=format&fit=crop&w=800&q=80",
  },
];

const WhyUniAssist = () => {
  return (
    <section className=" text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-cyan-400 text-center mb-12">
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
              <div className="flex items-center mb-2 text-3xl">
                {reason.icon}
              </div>
              <h3 className="text-3xl font-bold text-cyan-400 mb-4">
                {reason.title}
              </h3>
              <p className="text-blue-200 text-lg">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUniAssist;
