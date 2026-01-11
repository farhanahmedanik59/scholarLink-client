import React, { useState } from "react";
import {
  FaSearch,
  FaRobot,
  FaBell,
  FaFileAlt,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaMobileAlt,
  FaGlobeAmericas,
  FaCalendarCheck,
  FaGraduationCap,
  FaUniversity,
  FaMoneyCheckAlt,
  FaLightbulb,
  FaLock,
  FaSync,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaRocket,
} from "react-icons/fa";
import { MdDashboard, MdTrendingUp, MdSchool } from "react-icons/md";

const FeaturesSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const categories = [
    { id: "all", label: "All Features", count: 12, icon: <FaRocket /> },
    { id: "search", label: "Search & Match", count: 3, icon: <FaSearch /> },
    { id: "tools", label: "Application Tools", count: 4, icon: <FaFileAlt /> },
    { id: "support", label: "Support", count: 3, icon: <FaUsers /> },
    { id: "security", label: "Security", count: 2, icon: <FaShieldAlt /> },
  ];

  const features = [
    {
      id: 1,
      title: "AI-Powered Scholarship Matching",
      description: "Our advanced AI algorithm analyzes your profile and matches you with the most relevant scholarship opportunities from our database of 8,500+ scholarships.",
      icon: <FaRobot />,
      category: "search",
      benefits: ["95% accuracy rate", "Personalized recommendations", "Real-time updates"],
      gradient: "from-blue-600 to-cyan-500",
      stats: { value: "95%", label: "Match Accuracy" },
      color: "blue",
      highlight: true,
    },
    {
      id: 2,
      title: "Smart Application Tracker",
      description: "Track all your scholarship applications in one dashboard with deadline alerts, status updates, and progress tracking.",
      icon: <FaChartLine />,
      category: "tools",
      benefits: ["Deadline reminders", "Application status", "Document checklist"],
      gradient: "from-blue-500 to-cyan-400",
      stats: { value: "2.5x", label: "Faster Applications" },
      color: "cyan",
      highlight: true,
    },
    {
      id: 3,
      title: "Essay Review & Editing",
      description: "Get professional feedback on your scholarship essays from our team of experienced editors and former scholarship recipients.",
      icon: <FaFileAlt />,
      category: "tools",
      benefits: ["24-hour turnaround", "Expert feedback", "Grammar check"],
      gradient: "from-blue-600 to-cyan-500",
      stats: { value: "40%", label: "Higher Success Rate" },
      color: "blue",
      highlight: false,
    },
    {
      id: 4,
      title: "Personalized Deadline Alerts",
      description: "Never miss an important deadline with our smart notification system that sends reminders via email, SMS, and push notifications.",
      icon: <FaBell />,
      category: "tools",
      benefits: ["Multiple reminders", "Custom schedules", "Priority alerts"],
      gradient: "from-blue-500 to-cyan-400",
      stats: { value: "100%", label: "On-time Submission" },
      color: "cyan",
      highlight: false,
    },
    {
      id: 5,
      title: "One-on-One Mentorship",
      description: "Connect with successful scholarship recipients and experts for personalized guidance throughout your application journey.",
      icon: <FaUsers />,
      category: "support",
      benefits: ["Personal mentors", "Video consultations", "Application strategy"],
      gradient: "from-blue-600 to-cyan-500",
      stats: { value: "200+", label: "Expert Mentors" },
      color: "blue",
      highlight: false,
    },
    {
      id: 6,
      title: "Advanced Search Filters",
      description: "Find the perfect scholarships with our powerful search filters including country, field of study, eligibility, and funding amount.",
      icon: <FaSearch />,
      category: "search",
      benefits: ["50+ filters", "Saved searches", "Custom alerts"],
      gradient: "from-blue-500 to-cyan-400",
      stats: { value: "50+", label: "Filter Options" },
      color: "cyan",
      highlight: false,
    },
    {
      id: 7,
      title: "Document Vault",
      description: "Securely store and organize all your application documents including transcripts, recommendation letters, and essays in one place.",
      icon: <FaLock />,
      category: "security",
      benefits: ["256-bit encryption", "Auto-backup", "Easy sharing"],
      gradient: "from-blue-600 to-cyan-500",
      stats: { value: "100%", label: "Secure Storage" },
      color: "blue",
      highlight: false,
    },
    {
      id: 8,
      title: "Mobile Application",
      description: "Access all features on the go with our mobile app available for iOS and Android devices with full synchronization.",
      icon: <FaMobileAlt />,
      category: "tools",
      benefits: ["Real-time sync", "Offline access", "Push notifications"],
      gradient: "from-blue-500 to-cyan-400",
      stats: { value: "4.9", label: "App Rating" },
      color: "cyan",
      highlight: false,
    },
    {
      id: 9,
      title: "Global Scholarship Database",
      description: "Access scholarships from 85+ countries with detailed information on eligibility, requirements, and application procedures.",
      icon: <FaGlobeAmericas />,
      category: "search",
      benefits: ["85+ countries", "Localized information", "Currency conversion"],
      gradient: "from-blue-600 to-cyan-500",
      stats: { value: "8,500+", label: "Scholarships" },
      color: "blue",
      highlight: false,
    },
    {
      id: 10,
      title: "Interview Preparation",
      description: "Prepare for scholarship interviews with mock sessions, common questions database, and feedback from interview experts.",
      icon: <FaCalendarCheck />,
      category: "support",
      benefits: ["Mock interviews", "Video recording", "Expert feedback"],
      gradient: "from-blue-500 to-cyan-400",
      stats: { value: "85%", label: "Success Rate" },
      color: "cyan",
      highlight: false,
    },
    {
      id: 11,
      title: "Progress Analytics",
      description: "Track your scholarship journey with detailed analytics, success probability estimates, and improvement recommendations.",
      icon: <MdTrendingUp />,
      category: "tools",
      benefits: ["Success probability", "Progress tracking", "Improvement tips"],
      gradient: "from-blue-600 to-cyan-500",
      stats: { value: "95%", label: "Accuracy" },
      color: "blue",
      highlight: false,
    },
    {
      id: 12,
      title: "Priority Support",
      description: "Get fast responses from our support team with average response time under 2 hours for all premium members.",
      icon: <FaShieldAlt />,
      category: "support",
      benefits: ["24/7 support", "<2 hour response", "Dedicated agent"],
      gradient: "from-blue-500 to-cyan-400",
      stats: { value: "24/7", label: "Support" },
      color: "cyan",
      highlight: false,
    },
  ];

  const filteredFeatures = activeCategory === "all" ? features : features.filter((feature) => feature.category === activeCategory);

  const highlightFeatures = features.filter((feature) => feature.highlight);

  const stats = [
    { value: "8,500+", label: "Scholarships", icon: <FaUniversity />, color: "blue" },
    { value: "25,000+", label: "Students", icon: <FaGraduationCap />, color: "cyan" },
    { value: "$15M+", label: "Funding Secured", icon: <FaMoneyCheckAlt />, color: "blue" },
    { value: "95%", label: "Success Rate", icon: <FaLightbulb />, color: "cyan" },
  ];

  const platformComparison = [
    {
      feature: "Scholarship Database Size",
      ourPlatform: "8,500+",
      competitors: "2,000-4,000",
      advantage: "2x Larger",
    },
    {
      feature: "AI Matching Accuracy",
      ourPlatform: "95%",
      competitors: "70-80%",
      advantage: "Higher Accuracy",
    },
    {
      feature: "Support Response Time",
      ourPlatform: "<2 hours",
      competitors: "24-48 hours",
      advantage: "12x Faster",
    },
    {
      feature: "Mobile App Rating",
      ourPlatform: "4.9/5",
      competitors: "4.0-4.5",
      advantage: "Top Rated",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#0F1A2C]  py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaLightbulb className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Features</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Everything you need to find, apply for, and secure scholarships. Our platform combines cutting-edge technology with expert guidance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${
                  stat.color === "blue" ? "from-blue-600 to-cyan-500" : "from-blue-500 to-cyan-400"
                } inline-flex group-hover:scale-110 transition-transform duration-300 mb-4`}
              >
                <div className="text-white text-xl">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <MdDashboard className="text-blue-400" />
            Browse by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 border border-blue-500/30"
                    : "bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700"
                }`}
              >
                <div className={`${activeCategory === category.id ? "text-white" : "text-blue-400"}`}>{category.icon}</div>
                <span>{category.label}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${activeCategory === category.id ? "bg-white/20" : "bg-gray-700 text-gray-400"}`}>{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
              <FaStar className="text-white" />
            </div>
            Featured Tools
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {highlightFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden"
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white text-2xl">{feature.icon}</div>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        feature.color === "blue" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      }`}
                    >
                      {feature.stats.value} {feature.stats.label}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>

                  <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>

                  <div className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-400" />
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <button className="text-blue-400 hover:text-cyan-400 transition-colors font-medium flex items-center gap-2 group/btn">
                    Learn More
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Features Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
                <FaRocket className="text-white" />
              </div>
              All Features ({filteredFeatures.length})
            </h3>
            <div className="text-sm text-gray-400">
              Showing {filteredFeatures.length} of {features.length} features
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature) => (
              <div key={feature.id} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} inline-flex group-hover:scale-110 transition-transform duration-300 mb-4`}>
                  <div className="text-white text-lg">{feature.icon}</div>
                </div>

                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{feature.title}</h4>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{feature.description}</p>

                <div className="space-y-2 mb-6">
                  {feature.benefits.slice(0, 2).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      feature.category === "search"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : feature.category === "tools"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : feature.category === "support"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    }`}
                  >
                    {categories.find((c) => c.id === feature.category)?.label}
                  </span>
                  <div className={`text-sm font-bold ${feature.color === "blue" ? "text-blue-400" : "text-cyan-400"}`}>{feature.stats.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Comparison */}
        <div className="mb-16">
          <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Why Choose Our Platform</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                    <th className="text-left py-4 px-6 text-blue-400 font-bold">Our Platform</th>
                    <th className="text-left py-4 px-6 text-gray-400 font-medium">Competitors (Avg.)</th>
                    <th className="text-left py-4 px-6 text-cyan-400 font-bold">Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {platformComparison.map((row, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 text-gray-300">{row.feature}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                          <span className="text-white font-bold">{row.ourPlatform}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-400">{row.competitors}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">{row.advantage}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-800/30 rounded-2xl p-8 backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Seamless Integrations</h3>
                <p className="text-gray-300 mb-6">Connect with your favorite tools and services to streamline your scholarship journey. Sync documents, calendars, and communication platforms.</p>
                <div className="flex flex-wrap gap-3">
                  {["Google Drive", "Dropbox", "Google Calendar", "Outlook", "Zoom", "Microsoft Office"].map((tool) => (
                    <span key={tool} className="px-4 py-2 bg-gray-900/60 text-gray-300 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <FaSync />, label: "Real-time Sync", color: "text-blue-400" },
                  { icon: <FaLock />, label: "Secure Connection", color: "text-cyan-400" },
                  { icon: <FaMobileAlt />, label: "Cross-Platform", color: "text-blue-400" },
                  { icon: <FaCheckCircle />, label: "Verified APIs", color: "text-cyan-400" },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 text-center hover:border-blue-500/30 transition-colors">
                    <div className={`text-2xl mb-3 ${item.color}`}>{item.icon}</div>
                    <div className="text-white font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-12 text-center backdrop-blur-xl">
          <div className="max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaRocket className="text-white text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Supercharge Your Scholarship Journey?</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Join thousands of successful students who have used our platform to secure their dream scholarships</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-bold rounded-xl hover:border-blue-500 transition-colors">Schedule Demo</button>
            </div>
            <p className="text-gray-400 text-sm mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>

        {/* Mobile App Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaMobileAlt className="text-blue-400" />
              Available on Mobile
            </h4>
            <p className="text-gray-300 mb-6">Download our mobile app to access all features on the go. Get notifications, submit applications, and track progress from anywhere.</p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">📱</div>
                  <div className="text-left">
                    <div className="text-white text-sm">Download on the</div>
                    <div className="text-white font-bold">App Store</div>
                  </div>
                </div>
              </button>
              <button className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🤖</div>
                  <div className="text-left">
                    <div className="text-white text-sm">Get it on</div>
                    <div className="text-white font-bold">Google Play</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <FaStar className="text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-gray-400 text-sm">App Store Rating</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">"The mobile app is a game-changer. I can work on applications during my commute!" - Sarah, Stanford</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
