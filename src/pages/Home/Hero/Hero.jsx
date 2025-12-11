import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaGraduationCap, FaAward, FaUniversity, FaRocket, FaGlobe, FaLightbulb, FaChartLine } from "react-icons/fa";
import { FiChevronRight, FiArrowRight } from "react-icons/fi";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // Particle system
  const Particle = ({ index }) => {
    const size = Math.random() * 20 + 5;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    return (
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          left: `${x}%`,
          top: `${y}%`,
          background: `radial-gradient(circle, rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.2) 0%, transparent 70%)`,
        }}
        animate={{
          y: [0, -100, -200, -300],
          x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
          scale: [0, 1, 0.8, 0],
          opacity: [0, 1, 0.8, 0],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const scholarships = [
    { title: "Tech Innovators", amount: "$25,000", uni: "Stanford", icon: "🚀" },
    { title: "Global Leaders", amount: "$18,000", uni: "Harvard", icon: "🌍" },
    { title: "STEM Excellence", amount: "$30,000", uni: "MIT", icon: "🔬" },
    { title: "Arts & Culture", amount: "$15,000", uni: "Oxford", icon: "🎨" },
  ];

  return (
    <div className="relative w-full h-screen min-h-[800px] overflow-hidden bg-gradient-to-br from-[#0a0f1c] via-[#0f1a2c] to-[#1a2b4d]">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-cyan-500/20 rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-blue-500/20 rotate-12"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-purple-500/20 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-blue-900/30 via-cyan-900/30 to-purple-900/30 border border-blue-700/30 backdrop-blur-xl rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-cyan-300">✨ LIVE SCHOLARSHIPS UPDATED DAILY</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">Ignite</span>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </span>{" "}
            Your
            <br />
            <span className="relative">
              <motion.span
                className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                  backgroundImage: "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6, #22d3ee)",
                }}
              >
                Academic Journey
              </motion.span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Where <span className="text-cyan-300 font-semibold">dreams</span> meet <span className="text-blue-300 font-semibold">opportunity</span>. Discover{" "}
            <span className="text-purple-300 font-semibold">fully-funded</span> scholarships from <span className="text-green-300 font-semibold">top universities</span> worldwide.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="w-full max-w-5xl mt-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-2">
              <form onSubmit={handleSearch}>
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="relative">
                        <FaSearch className="text-cyan-400 text-xl" />
                        <motion.div className="absolute -inset-1 bg-cyan-500 rounded-full blur" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="I'm looking for scholarships in..."
                      className="w-full pl-14 pr-6 py-5 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <select className="px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-cyan-500">
                      <option>Any Country</option>
                      <option>USA</option>
                      <option>UK</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>

                    <select className="px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500">
                      <option>Any Degree</option>
                      <option>Bachelor's</option>
                      <option>Master's</option>
                      <option>PhD</option>
                      <option>MBA</option>
                    </select>

                    <button
                      type="submit"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-3 group/btn"
                    >
                      <motion.span animate={{ rotate: isHovered ? 90 : 0 }} transition={{ type: "spring", stiffness: 200 }}>
                        <FiArrowRight className="text-xl" />
                      </motion.span>
                      <span>Explore Opportunities</span>
                      <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["🚀 Tech Scholarships", "🎓 Ivy League", "💰 Fully Funded", "🌍 Study Abroad", "🏆 Competitive"].map((tag, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-sm text-gray-300 hover:bg-gray-800/70 hover:border-cyan-500/30 transition-all duration-300"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="absolute hidden xl:block">
          {scholarships.map((scholarship, i) => (
            <motion.div
              key={i}
              className="absolute bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 w-48 shadow-2xl"
              style={{
                top: `${20 + i * 20}%`,
                left: i % 2 === 0 ? "5%" : "85%",
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{scholarship.icon}</div>
                <div>
                  <h4 className="font-bold text-white text-sm">{scholarship.title}</h4>
                  <p className="text-cyan-300 text-xs">{scholarship.uni}</p>
                </div>
              </div>
              <div className="text-lg font-bold text-white">{scholarship.amount}</div>
              <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-2"></div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="mt-16 w-full max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <FaUniversity />, value: "200+", label: "Top Universities", color: "from-blue-500 to-cyan-400" },
              { icon: <FaAward />, value: "$50M+", label: "Funding Awarded", color: "from-purple-500 to-pink-400" },
              { icon: <FaGraduationCap />, value: "10,000+", label: "Students Placed", color: "from-green-500 to-emerald-400" },
              { icon: <FaChartLine />, value: "98%", label: "Success Rate", color: "from-orange-500 to-yellow-400" },
            ].map((stat, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="relative group">
                <div className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-2xl`}>
                  <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                    <div className="mt-3 text-2xl opacity-20 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 text-sm font-light">Explore More</span>
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 border border-cyan-500/10 rounded-full"
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-blue-500/10 rounded-full"
          animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <motion.div className="absolute top-20 right-20 text-4xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          🎓
        </motion.div>
        <motion.div className="absolute bottom-40 left-20 text-4xl" animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}>
          🌟
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
