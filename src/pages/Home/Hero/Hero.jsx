import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const images = [
    "https://img.freepik.com/free-photo/graduation-cap-sits-top-stack-books_188544-38727.jpg?t=st=1764945983~exp=1764949583~hmac=a3daaf2a3f791f6d7b087da7422a8b6ed52b993753ce01a1c6fb85cb141c2a26&w=1060",
    "https://img.freepik.com/free-photo/mortarboard-diploma-grammar-books_23-2149436683.jpg?t=st=1764946096~exp=1764949696~hmac=5b08c1987f2f155569746aeecf546bf253a175bfd0fc88d26b88daab0ff17459&w=1060",
    "https://plus.unsplash.com/premium_photo-1714265041857-937bd6127ce6?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <motion.div className="flex h-[650px]" animate={{ x: `-${current * 100}%` }} transition={{ type: "tween", duration: 1 }}>
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`Slide ${idx + 1}`} className="flex-shrink-0 w-full h-full object-cover" />
        ))}
      </motion.div>

      <div className="absolute inset-1  flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">Unlock Your Future. Find Your Scholarship.</h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-300 drop-shadow-md font-bold">
          A scholarship is a financial award that helps students pursue their education.<br></br> It may be based on academic achievement, talent, or financial need, supporting students in reaching
          their full potential.
        </p>

        {/* Search */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-lg">
          <input
            type="text"
            placeholder="Search by major, school, or keyword..."
            // Glass effect input styling
            className="flex-1 p-3 sm:p-4 rounded-lg bg-white/30 backdrop-blur-md border border-white/50 text-white placeholder-gray-200 focus:ring-2 focus:ring-white transition"
          />
          <button
            // Monochrome button styling (changed from gradient)
            className="px-6 py-3 sm:py-4 rounded-lg bg-gray-900 text-white shadow-xl hover:bg-gray-700 transition transform hover:scale-105"
          >
            Search
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setCurrent(idx)} className={`h-2 w-2 rounded-full transition-all duration-300 ${current === idx ? "bg-white w-6" : "bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
