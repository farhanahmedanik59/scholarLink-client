import { div } from "framer-motion/client";
import React, { useState } from "react";
import {
  FaQuoteLeft,
  FaQuoteRight,
  FaStar,
  FaUniversity,
  FaGraduationCap,
  FaGlobeAmericas,
  FaFilter,
  FaPlay,
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaVideo,
  FaUserGraduate,
  FaAward,
  FaShareAlt,
} from "react-icons/fa";
import { MdSchool, MdTrendingUp } from "react-icons/md";

const TestimonialsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 6;

  const filters = [
    { id: "all", label: "All Testimonials", count: 48, icon: <FaQuoteLeft /> },
    { id: "full", label: "Full Scholarships", count: 18, icon: <FaAward /> },
    { id: "international", label: "International", count: 22, icon: <FaGlobeAmericas /> },
    { id: "graduate", label: "Graduate", count: 15, icon: <FaGraduationCap /> },
    { id: "undergraduate", label: "Undergraduate", count: 10, icon: <MdSchool /> },
    { id: "research", label: "Research", count: 8, icon: <FaUniversity /> },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      university: "Stanford University",
      program: "Computer Science PhD",
      scholarship: "Full Scholarship",
      country: "USA",
      year: 2024,
      rating: 5,
      testimonial:
        "The scholarship guidance platform completely transformed my academic journey. As an international student from Nigeria, I never thought I could afford Stanford. The personalized recommendations and essay review service made my application stand out.",
      imageColor: "from-blue-600 to-cyan-500",
      type: ["full", "international", "graduate"],
      video: true,
      funding: "$320,000",
      duration: "4 years",
      tags: ["Full Funding", "International", "PhD", "STEM"],
      achievements: ["Full tuition coverage", "Living stipend", "Research grant", "Travel allowance"],
    },
    {
      id: 2,
      name: "Michael Chen",
      university: "University of Cambridge",
      program: "MBA",
      scholarship: "Chevening Scholarship",
      country: "UK",
      year: 2023,
      rating: 5,
      testimonial:
        "Securing the Chevening Scholarship was a dream come true. The platform's interview preparation and networking support were invaluable. I'm now part of a global network of leaders making a difference.",
      imageColor: "from-blue-500 to-cyan-400",
      type: ["full", "international", "graduate"],
      video: true,
      funding: "£50,000",
      duration: "1 year",
      tags: ["Leadership", "Business", "UK", "Global Network"],
      achievements: ["Full tuition", "Monthly stipend", "Travel costs", "Alumni network"],
    },
    {
      id: 3,
      name: "Priya Sharma",
      university: "University of Toronto",
      program: "Medical Research",
      scholarship: "Research Fellowship",
      country: "Canada",
      year: 2024,
      rating: 5,
      testimonial:
        "The research fellowship application process was complex, but the platform's document verification and deadline management made it seamless. I'm now conducting groundbreaking cancer research.",
      imageColor: "from-blue-600 to-cyan-500",
      type: ["research", "international", "graduate"],
      video: false,
      funding: "$85,000",
      duration: "2 years",
      tags: ["Research", "Medicine", "Canada", "Fellowship"],
      achievements: ["Research funding", "Lab access", "Conference travel", "Publication support"],
    },
    {
      id: 4,
      name: "David Miller",
      university: "Harvard University",
      program: "Law School",
      scholarship: "Need-Based Scholarship",
      country: "USA",
      year: 2023,
      rating: 5,
      testimonial:
        "Coming from a low-income background, Harvard seemed impossible. The platform's need-based scholarship matching and financial aid guidance changed everything. I'm now pursuing my dream of becoming a public interest lawyer.",
      imageColor: "from-blue-500 to-cyan-400",
      type: ["full", "graduate"],
      video: true,
      funding: "$280,000",
      duration: "3 years",
      tags: ["Law", "Need-Based", "USA", "Public Service"],
      achievements: ["Full tuition", "Living expenses", "Book allowance", "Summer internship funding"],
    },
    {
      id: 5,
      name: "Amina Hassan",
      university: "University of Tokyo",
      program: "Robotics Engineering",
      scholarship: "MEXT Scholarship",
      country: "Japan",
      year: 2024,
      rating: 5,
      testimonial:
        "The MEXT scholarship application required extensive Japanese documentation. The platform's translation support and cultural guidance were crucial. Now I'm working with cutting-edge robotics technology in Tokyo.",
      imageColor: "from-blue-600 to-cyan-500",
      type: ["full", "international", "undergraduate"],
      video: false,
      funding: "¥6,000,000",
      duration: "4 years",
      tags: ["Engineering", "Japan", "MEXT", "STEM"],
      achievements: ["Full tuition", "Monthly allowance", "Flight ticket", "Japanese language course"],
    },
    {
      id: 6,
      name: "Carlos Rodriguez",
      university: "ETH Zurich",
      program: "Environmental Science",
      scholarship: "Swiss Government Excellence",
      country: "Switzerland",
      year: 2023,
      rating: 5,
      testimonial:
        "The Swiss scholarship is highly competitive. The platform's mock interviews and cultural preparation gave me the confidence to succeed. I'm now researching sustainable solutions for climate change.",
      imageColor: "from-blue-500 to-cyan-400",
      type: ["research", "international", "graduate"],
      video: true,
      funding: "CHF 60,000",
      duration: "3 years",
      tags: ["Environment", "Switzerland", "Research", "Sustainability"],
      achievements: ["Research funding", "Living costs", "Health insurance", "Conference participation"],
    },
    {
      id: 7,
      name: "Emily Wilson",
      university: "University of Oxford",
      program: "History",
      scholarship: "Rhodes Scholarship",
      country: "UK",
      year: 2024,
      rating: 5,
      testimonial:
        "The Rhodes Scholarship selection is incredibly rigorous. The platform's leadership development programs and essay coaching were instrumental. Oxford has been an incredible journey of growth.",
      imageColor: "from-blue-600 to-cyan-500",
      type: ["full", "graduate"],
      video: true,
      funding: "Full coverage",
      duration: "2 years",
      tags: ["Rhodes", "Humanities", "UK", "Leadership"],
      achievements: ["All expenses covered", "Leadership training", "Global network", "Research travel"],
    },
    {
      id: 8,
      name: "Kenji Tanaka",
      university: "MIT",
      program: "Artificial Intelligence",
      scholarship: "Merit Scholarship",
      country: "USA",
      year: 2023,
      rating: 5,
      testimonial:
        "The merit scholarship competition was intense. The platform's portfolio review and recommendation letter guidance made my application shine. I'm now at the forefront of AI research.",
      imageColor: "from-blue-500 to-cyan-400",
      type: ["full", "graduate", "research"],
      video: false,
      funding: "$200,000",
      duration: "5 years",
      tags: ["AI", "Merit-Based", "USA", "Technology"],
      achievements: ["Full funding", "Research assistantship", "Conference funding", "Industry connections"],
    },
    {
      id: 9,
      name: "Maria Garcia",
      university: "University of Melbourne",
      program: "Public Health",
      scholarship: "Australia Awards",
      country: "Australia",
      year: 2024,
      rating: 5,
      testimonial:
        "The Australia Awards application was comprehensive. The platform's step-by-step guidance and document checklist ensured nothing was missed. I'm now contributing to public health policy in Australia.",
      imageColor: "from-blue-600 to-cyan-500",
      type: ["full", "international", "graduate"],
      video: true,
      funding: "$120,000",
      duration: "2 years",
      tags: ["Public Health", "Australia", "Development", "Policy"],
      achievements: ["Full tuition", "Stipend", "Travel allowance", "Settling-in allowance"],
    },
  ];

  const featuredTestimonials = testimonials.filter((t) => t.video).slice(0, 3);

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesFilter = activeFilter === "all" || testimonial.type.includes(activeFilter);
    const matchesSearch =
      searchQuery === "" ||
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTestimonials.length / testimonialsPerPage);
  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = filteredTestimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

  const stats = [
    { value: "48", label: "Success Stories", icon: <FaUserGraduate /> },
    { value: "$15M+", label: "Funding Secured", icon: <FaAward /> },
    { value: "95%", label: "Success Rate", icon: <MdTrendingUp /> },
    { value: "40+", label: "Countries", icon: <FaGlobeAmericas /> },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => <FaStar key={i} className={`${i < rating ? "text-yellow-400" : "text-gray-600"}`} />);
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-[#0F1A2C]  py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
              <FaQuoteLeft className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Student <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Success Stories</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">Real stories from students who turned their academic dreams into reality with our scholarship guidance platform</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search testimonials by name, university, or program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-full py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300">
                <div className="text-blue-400 text-3xl mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaFilter className="text-blue-400" />
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setCurrentPage(1);
                  }}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 border border-blue-500/30"
                      : "bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700"
                  }`}
                >
                  <div className={`${activeFilter === filter.id ? "text-white" : "text-blue-400"}`}>{filter.icon}</div>
                  <span>{filter.label}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${activeFilter === filter.id ? "bg-white/20" : "bg-gray-700 text-gray-400"}`}>{filter.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Video Testimonials */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
                <FaVideo className="text-white" />
              </div>
              Featured Video Testimonials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-900/60 border border-gray-700 rounded-2xl overflow-hidden backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-cyan-900/40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setActiveVideo(testimonial.id)}
                        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                      >
                        <FaPlay className="text-white text-xl ml-1" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 text-white">
                        <FaVideo className="text-blue-400" />
                        <span className="text-sm">Video Interview</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.imageColor} flex items-center justify-center text-white font-bold`}>{testimonial.name.charAt(0)}</div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.university}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">"{testimonial.testimonial.substring(0, 120)}..."</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
                      <button onClick={() => setActiveVideo(testimonial.id)} className="text-blue-400 text-sm font-medium hover:text-cyan-400 transition-colors">
                        Watch Story →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
                  <FaQuoteRight className="text-white" />
                </div>
                {searchQuery ? `Search Results (${filteredTestimonials.length})` : "All Testimonials"}
              </h3>
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages} • {filteredTestimonials.length} stories
              </div>
            </div>

            {currentTestimonials.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {currentTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.imageColor} flex items-center justify-center text-white text-2xl font-bold`}>
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">{testimonial.name}</h4>
                          <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                            <FaUniversity className="text-blue-400" />
                            <span>{testimonial.university}</span>
                          </div>
                          <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
                        </div>
                      </div>
                      {testimonial.video && (
                        <button onClick={() => setActiveVideo(testimonial.id)} className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group/video">
                          <FaPlay className="text-blue-400 group-hover/video:text-cyan-400" />
                        </button>
                      )}
                    </div>

                    <div className="text-blue-400 text-4xl opacity-20 mb-4">
                      <FaQuoteLeft />
                    </div>

                    <blockquote className="text-gray-300 mb-8 leading-relaxed">"{testimonial.testimonial}"</blockquote>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                          <p className="text-gray-400 text-sm mb-1">Scholarship</p>
                          <p className="text-blue-300 font-semibold">{testimonial.scholarship}</p>
                        </div>
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                          <p className="text-gray-400 text-sm mb-1">Funding</p>
                          <p className="text-cyan-300 font-semibold">{testimonial.funding}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt />
                          <span>{testimonial.country}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt />
                          <span>Class of {testimonial.year}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
                        {testimonial.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-500/10 text-blue-300 text-xs font-medium rounded-full border border-blue-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-900/60 border border-gray-700 rounded-2xl backdrop-blur-xl">
                <div className="text-4xl mb-4 text-gray-500">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No testimonials found</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">No stories match your search for "{searchQuery}". Try different keywords or browse all categories.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                    setCurrentPage(1);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30"
                >
                  View All Testimonials
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-xl border flex items-center gap-2 ${
                    currentPage === 1 ? "border-gray-700 text-gray-600 cursor-not-allowed" : "border-gray-600 text-white hover:border-blue-500 hover:text-blue-400"
                  }`}
                >
                  <FaChevronLeft />
                  Previous
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                        currentPage === index + 1 ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-500/30" : "border-gray-700 text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-xl border flex items-center gap-2 ${
                    currentPage === totalPages ? "border-gray-700 text-gray-600 cursor-not-allowed" : "border-gray-600 text-white hover:border-blue-500 hover:text-blue-400"
                  }`}
                >
                  Next
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-800/30 rounded-2xl p-12 text-center backdrop-blur-xl">
              <div className="max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaUserGraduate className="text-white text-2xl" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Join Our Success Stories?</h3>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Thousands of students have achieved their dreams with our guidance. You could be next.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 shadow-lg">
                    Start Your Journey
                  </button>
                  <button className="px-8 py-4 bg-gray-900/60 border border-gray-700 text-white font-bold rounded-xl hover:border-blue-500 transition-colors">Book Free Consultation</button>
                </div>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Share Your Success Story</h4>
                <p className="text-gray-400">Become an inspiration for future scholars</p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
                  <FaShareAlt />
                  Share Your Story
                </button>
                <button className="px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl hover:border-blue-500 transition-colors">Contact Alumni</button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setActiveVideo(null)} className="absolute -top-12 right-0 text-white hover:text-blue-400 text-2xl transition-colors z-10">
                ✕
              </button>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaPlay className="text-white text-3xl ml-2" />
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">{testimonials.find((t) => t.id === activeVideo)?.name}'s Journey</h3>
                    <p className="text-gray-300 mb-4">
                      {testimonials.find((t) => t.id === activeVideo)?.program} Scholar at {testimonials.find((t) => t.id === activeVideo)?.university}
                    </p>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                      Video interview feature coming soon. Hear directly from our successful scholars about their application journey and experiences.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gray-900/80 border-t border-gray-700">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonials.find((t) => t.id === activeVideo)?.imageColor} flex items-center justify-center text-white font-bold text-xl`}
                    >
                      {testimonials.find((t) => t.id === activeVideo)?.name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonials.find((t) => t.id === activeVideo)?.name}</h4>
                      <p className="text-gray-300 text-sm">
                        {testimonials.find((t) => t.id === activeVideo)?.program} • {testimonials.find((t) => t.id === activeVideo)?.scholarship}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {testimonials
                          .find((t) => t.id === activeVideo)
                          ?.achievements?.slice(0, 2)
                          .map((achievement, idx) => (
                            <span key={idx} className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded">
                              {achievement}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TestimonialsPage;
