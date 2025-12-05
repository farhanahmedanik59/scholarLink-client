import React, { useState } from "react";
import { FaQuoteLeft, FaStar, FaGraduationCap, FaUniversity, FaGlobe, FaPlay, FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from "react-icons/fa";

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const successStories = [
    {
      id: 1,
      name: "Maria Chen",
      degree: "MBA",
      university: "Harvard University",
      country: "USA",
      scholarship: "Full Scholarship",
      year: 2024,
      rating: 5,
      testimonial:
        "The scholarship guidance platform completely changed my life. As an international student from a middle-class family, I never thought I could afford Harvard. The personalized recommendations and application support made all the difference.",
      achievement: "Received full funding covering tuition, accommodation, and living expenses",
      imageColor: "from-blue-600 to-cyan-500",
      videoId: "demo1",
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      degree: "PhD in Computer Science",
      university: "ETH Zurich",
      country: "Switzerland",
      scholarship: "Research Fellowship",
      year: 2023,
      rating: 5,
      testimonial:
        "Securing a research fellowship at ETH Zurich seemed impossible. The platform's detailed guides and deadline reminders helped me submit a perfect application. Now I'm working with leading researchers in AI.",
      achievement: "Awarded €50,000 annual research grant",
      imageColor: "from-blue-600 to-cyan-500",
      videoId: "demo2",
    },
    {
      id: 3,
      name: "Sophie Williams",
      degree: "MSc in Environmental Science",
      university: "University of Oxford",
      country: "UK",
      scholarship: "Chevening Scholarship",
      year: 2023,
      rating: 5,
      testimonial:
        "The Chevening application process is highly competitive. The platform's essay review services and interview preparation materials gave me the confidence to succeed. Oxford was a dream come true!",
      achievement: "Fully funded master's with monthly stipend",
      imageColor: "from-blue-600 to-cyan-500",
      videoId: "demo3",
    },
    {
      id: 4,
      name: "Kenji Tanaka",
      degree: "Medical Research",
      university: "University of Tokyo",
      country: "Japan",
      scholarship: "MEXT Scholarship",
      year: 2024,
      rating: 5,
      testimonial:
        "The MEXT scholarship application requires extensive documentation. The platform's checklist and document verification saved me countless hours. Now I'm conducting groundbreaking research in Tokyo.",
      achievement: "Full tuition + ¥144,000 monthly allowance",
      imageColor: "from-blue-600 to-cyan-500",
      videoId: "demo4",
    },
  ];

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const currentStory = successStories[activeStory];

  return (
    <>
      <section className="bg-[#0F1A2C] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Student <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto">Hear from students who secured their dream scholarships through our platform</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentStory.imageColor} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
                  {currentStory.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{currentStory.name}</h3>
                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <FaUniversity className="text-blue-400" />
                    <span>{currentStory.university}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`${i < currentStory.rating ? "text-yellow-400" : "text-gray-600"}`} />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">{currentStory.year} Graduate</span>
                  </div>
                </div>
              </div>

              <div className="text-blue-400 text-4xl opacity-20 mb-4">
                <FaQuoteLeft />
              </div>

              <blockquote className="text-lg text-gray-300 mb-8 leading-relaxed">"{currentStory.testimonial}"</blockquote>

              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaGlobe className="text-blue-400" />
                  <span className="text-white font-medium">Key Achievement</span>
                </div>
                <p className="text-gray-300 text-sm">{currentStory.achievement}</p>
              </div>
            </div>

            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl shadow-lg">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaGraduationCap className="text-blue-400" />
                Scholarship Details
              </h4>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Degree Program</p>
                    <p className="text-white font-semibold">{currentStory.degree}</p>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Scholarship Type</p>
                    <p className="text-blue-300 font-semibold">{currentStory.scholarship}</p>
                  </div>
                </div>

                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <p className="text-gray-400">Study Destination</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{currentStory.country}</p>
                      <p className="text-gray-400 text-sm">{currentStory.university}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Graduated</p>
                      <p className="text-white font-semibold">{currentStory.year}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group w-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 rounded-xl p-4 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaPlay className="text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium">Watch Interview</p>
                        <p className="text-gray-400 text-sm">Hear {currentStory.name}'s journey</p>
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
                      <FaPlay className="rotate-90" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col items-center">
              <div className="flex gap-4 mb-8">
                <button
                  onClick={prevStory}
                  className="w-12 h-12 rounded-xl bg-gray-900/60 border border-gray-700 hover:border-blue-500 flex items-center justify-center text-white transition-all duration-300"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex gap-2 items-center">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStory(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeStory ? "bg-blue-500 w-8" : "bg-gray-700 hover:bg-gray-600"}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextStory}
                  className="w-12 h-12 rounded-xl bg-gray-900/60 border border-gray-700 hover:border-blue-500 flex items-center justify-center text-white transition-all duration-300"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                <p className="text-gray-300 text-sm">Students Supported</p>
              </div>
              <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">$15M+</div>
                <p className="text-gray-300 text-sm">Scholarship Value</p>
              </div>
              <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
                <p className="text-gray-300 text-sm">Success Rate</p>
              </div>
              <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">40+</div>
                <p className="text-gray-300 text-sm">Countries</p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-6 text-center">More Success Stories</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {successStories.map((story, index) => (
                  <button
                    key={story.id}
                    onClick={() => setActiveStory(index)}
                    className={`bg-gray-900/60 border rounded-xl p-4 text-left transition-all duration-300 ${
                      index === activeStory ? "border-blue-500 bg-blue-900/20" : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">{story.name.charAt(0)}</div>
                      <div>
                        <p className="text-white font-medium text-sm">{story.name}</p>
                        <p className="text-gray-400 text-xs">{story.university}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs line-clamp-2">"{story.testimonial.substring(0, 80)}..."</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setIsVideoModalOpen(false)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsVideoModalOpen(false)} className="absolute -top-12 right-0 text-white hover:text-blue-400 text-2xl transition-colors">
              ✕
            </button>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaPlay className="text-white text-2xl ml-1" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">{currentStory.name}'s Journey</h3>
                  <p className="text-gray-300 mb-4">
                    {currentStory.degree} Scholar at {currentStory.university}
                  </p>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">Video interview feature coming soon. Hear directly from our successful scholars about their application journey.</p>
                </div>
              </div>

              <div className="p-6 bg-gray-900/80 border-t border-gray-700">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentStory.imageColor} flex items-center justify-center text-white font-bold`}>{currentStory.name.charAt(0)}</div>
                  <div>
                    <h4 className="text-white font-bold">{currentStory.name}</h4>
                    <p className="text-gray-300 text-sm">
                      {currentStory.degree} • {currentStory.scholarship}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessStories;
