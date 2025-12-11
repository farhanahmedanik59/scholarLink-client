import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaGraduationCap, FaAward, FaUniversity, FaRocket, FaGlobe, FaLightbulb, FaChartLine, FaChevronDown } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const Particle = ({ index, isMobile }) => {
    const size = isMobile ? Math.random() * 10 + 3 : Math.random() * 20 + 5;
    const duration = isMobile ? Math.random() * 6 + 3 : Math.random() * 10 + 5;
    const delay = Math.random() * 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    return (
      <motion.div
        className="absolute rounded-full hidden sm:block"
        style={{
          width: size,
          height: size,
          left: `${x}%`,
          top: `${y}%`,
          background: `radial-gradient(circle, rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.2) 0%, transparent 70%)`,
        }}
        animate={{
          y: isMobile ? [0, -60, -120] : [0, -100, -200, -300],
          x: isMobile ? [0, Math.random() * 20 - 10, Math.random() * 20 - 10] : [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
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
    { title: "Tech Innovators", amount: "$25k", uni: "Stanford", icon: "🚀" },
    { title: "Global Leaders", amount: "$18k", uni: "Harvard", icon: "🌍" },
    { title: "STEM Excellence", amount: "$30k", uni: "MIT", icon: "🔬" },
    { title: "Arts & Culture", amount: "$15k", uni: "Oxford", icon: "🎨" },
  ];

  return (
    <div className="relative w-full min-h-screen h-auto overflow-hidden bg-gradient-to-br from-[#0a0f1c] via-[#0f1a2c] to-[#1a2b4d]">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <Particle key={i} index={i} isMobile={typeof window !== "undefined" && window.innerWidth < 768} />
        ))}
      </div>

      <div className="absolute inset-0 opacity-5 hidden lg:block">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-cyan-500/20 rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-blue-500/20 rotate-12"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-purple-500/20 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-center mb-6 lg:mb-8 w-full max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 lg:mb-6 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-900/30 via-cyan-900/30 to-purple-900/30 border border-blue-700/30 backdrop-blur-xl rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-cyan-300">✨ LIVE SCHOLARSHIPS UPDATED DAILY</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 lg:mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">Ignite</span>
              <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </span>{" "}
            Your
            <br className="hidden sm:block" />
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

          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-4">
            Where <span className="text-cyan-300 font-semibold">dreams</span> meet <span className="text-blue-300 font-semibold">opportunity</span>. Discover{" "}
            <span className="text-purple-300 font-semibold">fully-funded</span> scholarships from <span className="text-green-300 font-semibold">top universities</span> worldwide.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="w-full max-w-2xl lg:max-w-5xl mt-8 lg:mt-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-xl lg:rounded-2xl blur opacity-20 lg:opacity-30 group-hover:opacity-40 lg:group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl lg:rounded-2xl border border-gray-700/50 p-2 lg:p-3">
              <form onSubmit={handleSearch}>
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2">
                      <div className="relative">
                        <FaSearch className="text-cyan-400 text-lg lg:text-xl" />
                        <motion.div className="absolute -inset-1 bg-cyan-500 rounded-full blur opacity-30" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="I'm looking for scholarships in..."
                      className="w-full pl-10 lg:pl-14 pr-4 py-3 lg:py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base lg:text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                    <select className="px-3 lg:px-4 py-2 lg:py-4 bg-gray-800/50 border border-gray-700/50 rounded-lg lg:rounded-xl text-white text-sm lg:text-base focus:outline-none focus:border-cyan-500">
                      <option>Any Country</option>
                      <option>USA</option>
                      <option>UK</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>

                    <select className="px-3 lg:px-4 py-2 lg:py-4 bg-gray-800/50 border border-gray-700/50 rounded-lg lg:rounded-xl text-white text-sm lg:text-base focus:outline-none focus:border-blue-500">
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
                      className="px-4 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg lg:rounded-xl hover:shadow-lg lg:hover:shadow-2xl hover:shadow-cyan-500/20 lg:hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 group/btn"
                    >
                      <motion.span animate={{ rotate: isHovered ? 90 : 0 }} transition={{ type: "spring", stiffness: 200 }}>
                        <FiArrowRight className="text-base lg:text-xl" />
                      </motion.span>
                      <span className="text-sm lg:text-base">Explore Opportunities</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mt-4 lg:mt-6">
            {["🚀 Tech Scholarships", "🎓 Ivy League", "💰 Fully Funded", "🌍 Study Abroad", "🏆 Competitive"].map((tag, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 lg:px-4 lg:py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-xs lg:text-sm text-gray-300 hover:bg-gray-800/70 hover:border-cyan-500/30 transition-all duration-300 whitespace-nowrap"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="hidden lg:block absolute w-full h-full pointer-events-none">
          {scholarships.map((scholarship, i) => (
            <motion.div
              key={i}
              className="absolute bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 w-40 xl:w-48 shadow-2xl"
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
              <div className="flex items-center gap-2 xl:gap-3 mb-2 xl:mb-3">
                <div className="text-xl xl:text-2xl">{scholarship.icon}</div>
                <div>
                  <h4 className="font-bold text-white text-xs xl:text-sm">{scholarship.title}</h4>
                  <p className="text-cyan-300 text-xs">{scholarship.uni}</p>
                </div>
              </div>
              <div className="text-base xl:text-lg font-bold text-white">{scholarship.amount}</div>
              <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-1 xl:mt-2"></div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="mt-8 lg:mt-16 w-full max-w-4xl xl:max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
            {[
              { icon: <FaUniversity />, value: "200+", label: "Top Universities", color: "from-blue-500 to-cyan-400" },
              { icon: <FaAward />, value: "$50M+", label: "Funding Awarded", color: "from-purple-500 to-pink-400" },
              { icon: <FaGraduationCap />, value: "10,000+", label: "Students Placed", color: "from-green-500 to-emerald-400" },
              { icon: <FaChartLine />, value: "98%", label: "Success Rate", color: "from-orange-500 to-yellow-400" },
            ].map((stat, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="relative group">
                <div className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-xl lg:rounded-2xl`}>
                  <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-6 text-center">
                    <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1 lg:mb-2">{stat.value}</div>
                    <div className="text-gray-300 text-xs lg:text-sm">{stat.label}</div>
                    <div className="mt-2 lg:mt-3 text-lg lg:text-xl xl:text-2xl opacity-20 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="mt-6 pb-6 lg:mt-12 flex flex-col sm:flex-row gap-3 lg:gap-4">
          <button className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg lg:hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
            <FaGraduationCap />
            <span className="text-sm lg:text-base">Start Your Application</span>
          </button>

          <button className="px-6 lg:px-8 py-3 lg:py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white font-medium rounded-xl hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2">
            <span className="text-sm lg:text-base">View Success Stories</span>
            <FaChevronDown className="animate-bounce" />
          </button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-gray-400 text-sm font-light">Explore More</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-cyan-500/10 rounded-full hidden lg:block"
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-blue-500/10 rounded-full hidden lg:block"
          animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <motion.div className="absolute top-20 right-10 lg:right-20 text-2xl lg:text-4xl hidden sm:block" animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          🎓
        </motion.div>
        <motion.div className="absolute bottom-40 left-10 lg:left-20 text-2xl lg:text-4xl hidden sm:block" animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}>
          🌟
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hidden lg:block"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div className="h-full bg-white/30" style={{ width: "100%" }}>
          <motion.div className="h-full bg-white" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(20px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-10px, 10px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @media (min-width: 768px) {
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
