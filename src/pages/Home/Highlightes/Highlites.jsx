import React from "react";
import { FaTrophy, FaRocket, FaUsers, FaChartLine, FaAward, FaLightbulb, FaClock, FaGlobeAmericas } from "react-icons/fa";

const HighlightsSection = () => {
  const highlights = [
    {
      icon: <FaTrophy />,
      title: "Premium Success Rate",
      value: "95%",
      description: "Students secure scholarships with our guidance",
      gradient: "from-blue-600 to-cyan-500",
      stat: "500+ Success Stories",
    },
    {
      icon: <FaRocket />,
      title: "Fast Applications",
      value: "2.5x",
      description: "Faster application processing time",
      gradient: "from-blue-500 to-cyan-400",
      stat: "Avg. 15 Days to Completion",
    },
    {
      icon: <FaUsers />,
      title: "Expert Network",
      value: "200+",
      description: "Scholarship advisors worldwide",
      gradient: "from-blue-600 to-cyan-500",
      stat: "40+ Countries Covered",
    },
    {
      icon: <FaChartLine />,
      title: "Funding Secured",
      value: "$15M+",
      description: "Total scholarship value obtained",
      gradient: "from-blue-500 to-cyan-400",
      stat: "Average $25,000 per Student",
    },
  ];

  const features = [
    {
      icon: <FaAward />,
      title: "Award-Winning Platform",
      description: "Recognized as top scholarship portal by Education Awards 2024",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: <FaLightbulb />,
      title: "AI-Powered Matching",
      description: "Smart algorithm finds your perfect scholarship matches",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
    {
      icon: <FaClock />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for urgent deadlines",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: <FaGlobeAmericas />,
      title: "Global Reach",
      description: "Scholarships from 100+ countries worldwide",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
  ];

  const testimonials = [
    {
      quote: "The platform helped me secure a full scholarship to Stanford. Life-changing!",
      author: "Sarah M., Stanford University",
      role: "Full Scholarship Recipient",
    },
    {
      quote: "I applied to 8 scholarships and got 5 offers. Unbelievable results!",
      author: "David K., University of Cambridge",
      role: "Multiple Scholarship Winner",
    },
    {
      quote: "Their essay review service made my application stand out from thousands.",
      author: "Priya S., MIT Graduate",
      role: "Research Fellowship Awardee",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#0F1A2C] to-[#0F1A2C] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaTrophy className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Why Students <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto">Discover what makes our scholarship platform the most trusted choice for students worldwide</p>
        </div>

        {/* Main Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Stats */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <div key={index} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white text-xl">{item.icon}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{item.value}</div>
                    <div className="text-sm text-gray-400">{item.stat}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Features */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
                <FaLightbulb className="text-white" />
              </div>
              Key Features
            </h3>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className={`flex items-start gap-4 p-4 rounded-xl border ${feature.borderColor} ${feature.bgColor} hover:scale-[1.02] transition-all duration-300`}>
                  <div className={`p-3 rounded-lg ${feature.bgColor} border ${feature.borderColor}`}>
                    <div className={`text-xl ${feature.color}`}>{feature.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials Carousel */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h4 className="text-xl font-bold text-white mb-6">What Students Say</h4>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-900/10 to-cyan-900/10 border border-blue-800/20 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-blue-400 text-2xl mb-3">"</div>
                    <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                    <div>
                      <p className="text-white font-medium">{testimonial.author}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Journey to Success</h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-cyan-500"></div>

              {/* Timeline Items */}
              <div className="space-y-12 relative">
                {[
                  { step: "01", title: "Profile Assessment", desc: "Comprehensive evaluation of your academic and personal profile", icon: "📋" },
                  { step: "02", title: "Scholarship Matching", desc: "AI-powered matching with 1000+ scholarship opportunities", icon: "🎯" },
                  { step: "03", title: "Application Strategy", desc: "Personalized roadmap for maximizing acceptance chances", icon: "🗺️" },
                  { step: "04", title: "Document Preparation", desc: "Professional editing of essays, CV, and recommendation letters", icon: "✍️" },
                  { step: "05", title: "Interview Preparation", desc: "Mock interviews and communication coaching", icon: "🎤" },
                  { step: "06", title: "Scholarship Award", desc: "Celebration and transition support for your new journey", icon: "🏆" },
                ].map((item, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-8`}>
                    {/* Content */}
                    <div className={`w-1/2 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-sm font-bold text-blue-400">STEP {item.step}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 border-4 border-[#0F1A2C]"></div>
                    </div>

                    {/* Empty Space */}
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Awards & Recognition</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { year: "2024", award: "Best EdTech Platform", organization: "Global Education Awards" },
              { year: "2023", award: "Innovation Excellence", organization: "Tech for Good Summit" },
              { year: "2023", award: "Student Choice Award", organization: "University Rankings" },
              { year: "2022", award: "Top Scholarship Portal", organization: "Digital Education Review" },
            ].map((award, index) => (
              <div key={index} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300">
                <div className="text-4xl font-bold text-blue-400 mb-2">{award.year}</div>
                <h4 className="text-white font-bold mb-2">{award.award}</h4>
                <p className="text-gray-400 text-sm">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-800/30 rounded-2xl p-8 md:p-12 text-center backdrop-blur-xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Scholarship Journey?</h3>
            <p className="text-gray-300 mb-8 text-lg">Join thousands of successful students who transformed their dreams into reality</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 shadow-lg">
                Get Started for Free
              </button>
              <button className="px-8 py-3 bg-gray-900/60 border border-gray-700 text-white font-bold rounded-xl hover:border-blue-500 transition-colors">Book Consultation</button>
            </div>
            <p className="text-gray-400 text-sm mt-6">No credit card required • 7-day free trial • Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
