import React, { useState } from "react";
import {
  FaRocket,
  FaGraduationCap,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaAward,
  FaClock,
  FaShieldAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";
import { MdTrendingUp, MdSchool } from "react-icons/md";

const CallToActionSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeCta, setActiveCta] = useState("free-trial");

  const ctaOptions = [
    {
      id: "free-trial",
      title: "Start Free Trial",
      description: "14-day free access to all premium features",
      icon: <FaRocket />,
      gradient: "from-blue-600 to-cyan-500",
      buttonText: "Get Started Free",
      color: "blue",
    },
    {
      id: "consultation",
      title: "Free Consultation",
      description: "30-minute strategy session with our experts",
      icon: <FaGraduationCap />,
      gradient: "from-blue-500 to-cyan-400",
      buttonText: "Book Now",
      color: "cyan",
    },
    {
      id: "demo",
      title: "Platform Demo",
      description: "Personalized walkthrough of all features",
      icon: <MdSchool />,
      gradient: "from-blue-600 to-cyan-500",
      buttonText: "Schedule Demo",
      color: "blue",
    },
  ];

  const benefits = [
    {
      icon: <FaCheckCircle />,
      text: "No credit card required",
      color: "text-green-400",
    },
    {
      icon: <FaClock />,
      text: "Cancel anytime",
      color: "text-blue-400",
    },
    {
      icon: <FaShieldAlt />,
      text: "Secure & private",
      color: "text-cyan-400",
    },
    {
      icon: <FaStar />,
      text: "Money-back guarantee",
      color: "text-yellow-400",
    },
  ];

  const successStats = [
    { value: "25,000+", label: "Students Helped", icon: <FaUsers /> },
    { value: "95%", label: "Success Rate", icon: <MdTrendingUp /> },
    { value: "$15M+", label: "Funding Secured", icon: <FaAward /> },
    { value: "4.9/5", label: "Rating", icon: <FaStar /> },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      university: "Stanford University",
      quote: "The free consultation changed everything. I secured a full scholarship thanks to their guidance!",
      time: "2 days ago",
    },
    {
      name: "Michael Rodriguez",
      university: "University of Cambridge",
      quote: "Started with the free trial and ended up with 3 scholarship offers. Best decision ever!",
      time: "1 week ago",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    setIsSubmitted(true);
    // In real app, send to your backend
    console.log("CTA submitted:", { email, action: activeCta });
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-b from-[#0F1A2C]  py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Banner */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-cyan-900/40 border border-blue-800/30 rounded-3xl p-12 backdrop-blur-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
                  <FaRocket className="text-white text-3xl" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Start Your Scholarship
                  <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Success Journey Today</span>
                </h1>
                <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-8">
                  Join thousands of students who secured their dream scholarships with our platform. No commitment, no risk - just results.
                </p>
              </div>

              {/* CTA Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {ctaOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveCta(option.id)}
                    className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                      activeCta === option.id
                        ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border-blue-500/50 shadow-xl shadow-blue-500/10"
                        : "bg-gray-900/40 border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${option.gradient}`}>
                        <div className="text-white text-xl">{option.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{option.title}</h3>
                        <p className="text-gray-400 text-sm">{option.description}</p>
                      </div>
                    </div>
                    <div className={`flex items-center justify-between ${activeCta === option.id ? "text-blue-400" : "text-gray-400"}`}>
                      <span className="text-sm font-medium">Click to select</span>
                      <FaChevronRight className="text-lg" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Email Form */}
              <div className="max-w-2xl mx-auto">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <FaEnvelope className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address to get started..."
                        className="w-full bg-gray-900/60 border-2 border-gray-700 rounded-2xl py-5 pl-16 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg"
                        required
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 shadow-lg"
                      >
                        Get Started Free
                        <FaArrowRight className="inline-block ml-2" />
                      </button>
                    </div>

                    {/* Benefits */}
                    <div className="flex flex-wrap justify-center gap-6">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={benefit.color}>{benefit.icon}</div>
                          <span className="text-gray-300 text-sm">{benefit.text}</span>
                        </div>
                      ))}
                    </div>
                  </form>
                ) : (
                  <div className="text-center p-8 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800/30 rounded-2xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheckCircle className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">You're on your way!</h3>
                    <p className="text-gray-300 mb-4">We've sent a confirmation email with next steps for your {ctaOptions.find((o) => o.id === activeCta)?.title.toLowerCase()}.</p>
                    <button onClick={() => setIsSubmitted(false)} className="text-blue-400 hover:text-cyan-400 transition-colors font-medium">
                      Start another action
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {successStats.map((stat, index) => (
            <div key={index} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group">
              <div className="text-blue-400 text-2xl mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Split CTA Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Urgency CTA */}
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/30 border border-blue-800/30 rounded-2xl p-10 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-bold rounded-full animate-pulse">⏰ Limited Time</div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                    <FaClock className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Spring 2024 Deadlines Approaching</h3>
                    <p className="text-blue-300">Early bird discount ends soon</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-gray-900/40 rounded-xl border border-gray-700/50">
                    <div>
                      <div className="text-white font-bold">Premium Package</div>
                      <div className="text-gray-400 text-sm">Complete scholarship support</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">$299</div>
                      <div className="text-gray-400 text-sm line-through">$499</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-900/40 rounded-xl border border-gray-700/50">
                    <div>
                      <div className="text-white font-bold">Essay Review Bundle</div>
                      <div className="text-gray-400 text-sm">3 essays + unlimited edits</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">$129</div>
                      <div className="text-gray-400 text-sm line-through">$199</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-white font-bold">Offer ends in:</div>
                  <div className="flex gap-2">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white bg-gray-900/60 px-3 py-2 rounded-lg">07</div>
                      <div className="text-gray-400 text-xs mt-1">Days</div>
                    </div>
                    <div className="text-2xl font-bold text-white">:</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white bg-gray-900/60 px-3 py-2 rounded-lg">14</div>
                      <div className="text-gray-400 text-xs mt-1">Hours</div>
                    </div>
                    <div className="text-2xl font-bold text-white">:</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white bg-gray-900/60 px-3 py-2 rounded-lg">32</div>
                      <div className="text-gray-400 text-xs mt-1">Minutes</div>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 shadow-lg text-lg">
                  Claim Your Discount Now
                </button>
              </div>
            </div>

            {/* Right - Testimonials */}
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-10 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-8">Recent Success Stories</h3>

              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-900/10 to-cyan-900/10 border border-blue-800/20 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-blue-400 text-2xl mb-3">
                      <FaQuoteLeft />
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">{testimonial.university}</div>
                      </div>
                      <div className="text-gray-500 text-sm">{testimonial.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="text-center">
                  <p className="text-gray-300 mb-4">Need immediate help?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl hover:border-blue-500 transition-colors flex items-center justify-center gap-2">
                      <FaPhone />
                      Call Now
                    </button>
                    <button className="px-6 py-3 bg-green-600/20 border border-green-600/30 text-green-300 rounded-xl hover:border-green-500 transition-colors flex items-center justify-center gap-2">
                      <FaWhatsapp />
                      WhatsApp Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple CTA Options */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Choose Your Starting Point</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "For Beginners",
                description: "New to scholarship applications",
                icon: "🎯",
                features: ["Free consultation", "Basic matching", "Email support"],
                buttonText: "Start Here",
                gradient: "from-blue-600 to-cyan-500",
              },
              {
                title: "For Serious Applicants",
                description: "Applying to competitive programs",
                icon: "⚡",
                features: ["Premium matching", "Essay review", "Priority support"],
                buttonText: "Upgrade Now",
                gradient: "from-blue-500 to-cyan-400",
              },
              {
                title: "For Last-Minute",
                description: "Deadlines approaching soon",
                icon: "🚀",
                features: ["Express review", "24/7 support", "Guaranteed feedback"],
                buttonText: "Get Immediate Help",
                gradient: "from-blue-600 to-cyan-500",
              },
            ].map((option, index) => (
              <div key={index} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{option.title}</h4>
                <p className="text-gray-400 mb-6">{option.description}</p>

                <div className="space-y-3 mb-8">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3 bg-gradient-to-r ${option.gradient} text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30`}>
                  {option.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Final Urgent CTA */}
        <div className="bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-cyan-900/40 border border-blue-800/30 rounded-3xl p-12 text-center backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Don't Miss Your Chance for Free Education</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Every day you wait is another scholarship deadline missed. Start today and get one step closer to your dream education.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 shadow-lg text-lg flex items-center justify-center gap-3">
                <FaRocket />
                Start Free Trial - No Credit Card
              </button>
              <button className="px-10 py-4 bg-gray-900/60 border border-gray-700 text-white font-bold rounded-xl hover:border-blue-500 transition-colors text-lg">Watch 2-Min Demo Video</button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>24/7 support</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-gray-700/50">
              <p className="text-gray-400 mb-6">Trusted by students from</p>
              <div className="flex flex-wrap justify-center gap-8">
                {["Harvard", "Stanford", "MIT", "Cambridge", "Oxford", "ETH Zurich"].map((uni) => (
                  <div key={uni} className="px-4 py-2 bg-gray-900/40 rounded-lg border border-gray-700/30">
                    <span className="text-gray-300 font-medium">{uni}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-900/40 border border-gray-700 rounded-2xl">
            <div className="text-2xl mb-3">💬</div>
            <h4 className="text-white font-bold mb-2">Need Help Deciding?</h4>
            <p className="text-gray-400 text-sm mb-4">Our advisors are here to help you choose the right path</p>
            <button className="text-blue-400 hover:text-cyan-400 transition-colors text-sm font-medium">Chat with Advisor →</button>
          </div>
          <div className="text-center p-6 bg-gray-900/40 border border-gray-700 rounded-2xl">
            <div className="text-2xl mb-3">📞</div>
            <h4 className="text-white font-bold mb-2">Prefer to Talk?</h4>
            <p className="text-gray-400 text-sm mb-4">Schedule a call at your convenience</p>
            <button className="text-blue-400 hover:text-cyan-400 transition-colors text-sm font-medium">Schedule Call →</button>
          </div>
          <div className="text-center p-6 bg-gray-900/40 border border-gray-700 rounded-2xl">
            <div className="text-2xl mb-3">📚</div>
            <h4 className="text-white font-bold mb-2">Explore Resources</h4>
            <p className="text-gray-400 text-sm mb-4">Free guides and success stories</p>
            <button className="text-blue-400 hover:text-cyan-400 transition-colors text-sm font-medium">View Resources →</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
