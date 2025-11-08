import React, { useState, useEffect } from "react";

const Hero = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=80",
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
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive
                ? "opacity-100 z-20 pointer-events-auto"
                : "opacity-0 z-10 pointer-events-none"
            }`}
          >
            {/* Use <img> for reliable background rendering */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover brightness-75"
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

            {/* Text Content */}
            <div className="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-blue-200 mb-10 max-w-2xl leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-7 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-full hover:opacity-90 shadow-xl transition-all duration-300 transform hover:scale-105">
                  Get Started
                </button>
                <button className="px-7 py-3 border border-cyan-400 text-cyan-300 font-semibold rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105 backdrop-blur-md bg-white/10">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === current
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 scale-125 shadow-lg"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
