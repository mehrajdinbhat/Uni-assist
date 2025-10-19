import React, { useState, useEffect } from "react";

const Hero= () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80",
      title: "Welcome to Uni-Assist",
      subtitle: "A Smart Digital Platform for Students, Faculty & Visitors",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
      title: "Simplify Campus Life",
      subtitle: "Book, Share, and Collaborate with Ease",
    },
    {
      image:
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=80",
      title: "Sustainable & Smart",
      subtitle: "Eco-Swap, Bike-Share, and Smart Resource Management",
    },
    {
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80",
      title: "Empowering Education",
      subtitle: "All Campus Services in One Seamless Platform",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 drop-shadow-lg mb-4 animate-fadeInUp">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl text-blue-200 mb-8 max-w-2xl animate-fadeInUp delay-200">
              {slide.subtitle}
            </p>
            <div className="flex gap-4 animate-fadeInUp delay-300">
              <button className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-full hover:bg-cyan-400 transition duration-300 shadow-lg">
                Get Started
              </button>
              <button className="px-6 py-3 border border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-black transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-cyan-400 scale-125" : "bg-blue-900"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
