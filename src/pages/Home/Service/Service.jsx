import React, { useState } from "react";
import {
  FaSearch,
  FaFileAlt,
  FaUsers,
  FaCalendarCheck,
  FaGraduationCap,
  FaUniversity,
  FaMoneyBillWave,
  FaShieldAlt,
  FaCheckCircle,
  FaStar,
  FaRocket,
  FaLightbulb,
  FaGlobeAmericas,
  FaChartLine,
  FaVideo,
  FaPhone,
  FaBookOpen,
  FaArrowRight,
  FaSync,
  FaLock,
  FaCrown,
} from "react-icons/fa";
import { MdSchool, MdTrendingUp, MdDashboard } from "react-icons/md";

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [isAnnual, setIsAnnual] = useState(true);

  const serviceTabs = [
    { id: "all", label: "All Services", count: 8, icon: <FaRocket /> },
    { id: "consultation", label: "Consultation", count: 3, icon: <FaUsers /> },
    { id: "application", label: "Application", count: 3, icon: <FaFileAlt /> },
    { id: "premium", label: "Premium", count: 2, icon: <FaCrown /> },
  ];

  const services = [
    {
      id: 1,
      title: "Personalized Scholarship Matching",
      description: "Our AI-powered system analyzes your profile and matches you with the most suitable scholarships from our database of 8,500+ opportunities.",
      icon: <FaSearch />,
      category: "application",
      features: ["Personalized recommendations", "Priority matching algorithm", "Real-time updates", "Success probability scoring"],
      delivery: "Instant access",
      support: "Email & Chat",
      gradient: "from-blue-600 to-cyan-500",
      color: "blue",
      popular: false,
      startingAt: "Free",
    },
    {
      id: 2,
      title: "One-on-One Consultation",
      description: "60-minute sessions with experienced scholarship advisors to create your personalized application strategy.",
      icon: <FaUsers />,
      category: "consultation",
      features: ["Personal strategy session", "Goal setting & planning", "Scholarship selection", "Timeline creation"],
      delivery: "1-2 days booking",
      support: "Video Call",
      gradient: "from-blue-500 to-cyan-400",
      color: "cyan",
      popular: true,
      startingAt: "$99/session",
    },
    {
      id: 3,
      title: "Essay Review & Editing",
      description: "Professional editing of your scholarship essays with detailed feedback and improvement suggestions.",
      icon: <FaFileAlt />,
      category: "application",
      features: ["Grammar & style check", "Content improvement", "Structure optimization", "Two rounds of edits"],
      delivery: "48-hour turnaround",
      support: "Document Review",
      gradient: "from-blue-600 to-cyan-500",
      color: "blue",
      popular: false,
      startingAt: "$49/essay",
    },
    {
      id: 4,
      title: "Interview Preparation",
      description: "Mock interviews with feedback and coaching to help you ace your scholarship interviews.",
      icon: <FaCalendarCheck />,
      category: "consultation",
      features: ["Mock interview session", "Common questions practice", "Body language feedback", "Follow-up strategies"],
      delivery: "Scheduled session",
      support: "Video Call",
      gradient: "from-blue-500 to-cyan-400",
      color: "cyan",
      popular: false,
      startingAt: "$79/session",
    },
    {
      id: 5,
      title: "Complete Application Package",
      description: "End-to-end support for your scholarship applications including document preparation and submission.",
      icon: <FaGraduationCap />,
      category: "premium",
      features: ["Application strategy", "Document preparation", "Essay writing support", "Submission management"],
      delivery: "4-6 weeks",
      support: "Dedicated Advisor",
      gradient: "from-blue-600 to-cyan-500",
      color: "blue",
      popular: true,
      startingAt: "$499/package",
    },
    {
      id: 6,
      title: "University Selection Strategy",
      description: "Guidance on selecting the right universities and programs that match your profile and goals.",
      icon: <FaUniversity />,
      category: "consultation",
      features: ["University matching", "Program selection", "Admission requirements", "Success probability"],
      delivery: "1 week",
      support: "Video Call + Report",
      gradient: "from-blue-500 to-cyan-400",
      color: "cyan",
      popular: false,
      startingAt: "$149/service",
    },
    {
      id: 7,
      title: "Financial Aid Guidance",
      description: "Expert advice on navigating financial aid options, loans, and scholarship combinations.",
      icon: <FaMoneyBillWave />,
      category: "application",
      features: ["Financial aid analysis", "Scholarship stacking", "Loan guidance", "Budget planning"],
      delivery: "3-5 days",
      support: "Video Call",
      gradient: "from-blue-600 to-cyan-500",
      color: "blue",
      popular: false,
      startingAt: "$129/service",
    },
    {
      id: 8,
      title: "VIP Success Package",
      description: "Premium comprehensive support with guaranteed results and priority access to all services.",
      icon: <FaCrown />,
      category: "premium",
      features: ["Priority access", "Unlimited consultations", "Guaranteed acceptance*", "24/7 support"],
      delivery: "Custom timeline",
      support: "VIP Concierge",
      gradient: "from-blue-500 to-cyan-400",
      color: "cyan",
      popular: true,
      startingAt: "$999/term",
    },
  ];

  const filteredServices = activeTab === "all" ? services : services.filter((service) => service.category === activeTab);

  const pricingPlans = [
    {
      name: "Basic",
      price: isAnnual ? "$9" : "$12",
      period: isAnnual ? "/month billed annually" : "/month",
      icon: <FaBookOpen />,
      gradient: "from-gray-600 to-gray-700",
      features: ["Access to scholarship database", "Basic search filters", "Email alerts", "Community forum access", "Limited AI matching"],
      buttonText: "Get Started Free",
      popular: false,
    },
    {
      name: "Premium",
      price: isAnnual ? "$29" : "$39",
      period: isAnnual ? "/month billed annually" : "/month",
      icon: <FaRocket />,
      gradient: "from-blue-600 to-cyan-500",
      features: ["Advanced AI matching", "Priority support", "Essay review (2/month)", "Interview preparation", "Application tracking", "Document vault", "Mobile app access"],
      buttonText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored to your needs",
      icon: <FaCrown />,
      gradient: "from-purple-600 to-pink-500",
      features: ["Everything in Premium", "Unlimited consultations", "Dedicated advisor", "Custom reporting", "Team management", "API access", "White-label options"],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  const successMetrics = [
    { value: "95%", label: "Success Rate", description: "Scholarship acceptance rate", icon: <MdTrendingUp /> },
    { value: "25,000+", label: "Students Helped", description: "Worldwide success stories", icon: <FaUsers /> },
    { value: "$15M+", label: "Funding Secured", description: "Total scholarship value", icon: <FaMoneyBillWave /> },
    { value: "4.9/5", label: "Rating", description: "Student satisfaction", icon: <FaStar /> },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Initial Assessment",
      description: "We analyze your profile and academic goals",
      icon: <FaSearch />,
      duration: "1-2 days",
    },
    {
      step: 2,
      title: "Strategy Development",
      description: "Create personalized scholarship application plan",
      icon: <FaLightbulb />,
      duration: "3-5 days",
    },
    {
      step: 3,
      title: "Application Support",
      description: "Complete support with documents and essays",
      icon: <FaFileAlt />,
      duration: "2-4 weeks",
    },
    {
      step: 4,
      title: "Interview Preparation",
      description: "Mock interviews and feedback sessions",
      icon: <FaVideo />,
      duration: "1-2 weeks",
    },
    {
      step: 5,
      title: "Acceptance & Follow-up",
      description: "Support with acceptance and enrollment",
      icon: <FaCheckCircle />,
      duration: "Ongoing",
    },
  ];

  return (
    <section className="bg-gradient-to-b   py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaGraduationCap className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">Comprehensive support services designed to maximize your scholarship success. From initial strategy to final acceptance.</p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {successMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 text-center backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group">
              <div className="text-blue-400 text-2xl mb-3 flex justify-center">{metric.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-gray-300 font-medium mb-1">{metric.label}</div>
              <div className="text-gray-400 text-sm">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Service Categories */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <MdDashboard className="text-blue-400" />
            Browse Services
          </h3>
          <div className="flex flex-wrap gap-3">
            {serviceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 border border-blue-500/30"
                    : "bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700"
                }`}
              >
                <div className={`${activeTab === tab.id ? "text-white" : "text-blue-400"}`}>{tab.icon}</div>
                <span>{tab.label}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${activeTab === tab.id ? "bg-white/20" : "bg-gray-700 text-gray-400"}`}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden"
              >
                {service.popular && <div className="absolute top-4 right-4 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-full">Most Popular</div>}

                <div className="flex items-start gap-6 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white text-2xl">{service.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaSync />
                        <span>{service.delivery}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaPhone />
                        <span>{service.support}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                  <div>
                    <div className="text-2xl font-bold text-white">{service.startingAt}</div>
                    <div className="text-gray-400 text-sm">Starting price</div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 flex items-center gap-2 group/btn">
                    Learn More
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-6">Flexible pricing options designed for every stage of your scholarship journey</p>

              {/* Billing Toggle */}
              <div className="inline-flex bg-gray-800/50 border border-gray-700 rounded-xl p-1 mb-8">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${!isAnnual ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${isAnnual ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  Annual Billing
                  <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Save 25%</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-gray-900/40 border rounded-2xl p-8 relative transition-all duration-300 ${
                    plan.popular ? "border-blue-500/50 shadow-xl shadow-blue-500/10" : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-6 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full">Most Popular</div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${plan.gradient} inline-flex mb-4`}>
                      <div className="text-white text-2xl">{plan.icon}</div>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.name !== "Enterprise" && <span className="text-gray-400">/month</span>}
                    </div>
                    <p className="text-gray-400 text-sm">{plan.period}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                      plan.popular ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90" : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-12 text-center">Our 5-Step Success Process</h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-cyan-500"></div>

              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <div key={step.step} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row"}`}>
                    {/* Content - Left side for even, Right side for odd */}
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12 lg:order-2"}`}>
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-blue-400">STEP {step.step}</span>
                        <span className="text-gray-400 text-sm">• {step.duration}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-400">{step.description}</p>
                    </div>

                    {/* Timeline Circle */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 border-4 border-[#0F1A2C] flex items-center justify-center">
                        <div className="text-white text-xl">{step.icon}</div>
                      </div>
                    </div>

                    {/* Empty Space */}
                    <div className="lg:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Service Guarantee */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-800/30 rounded-2xl p-12 backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaShieldAlt className="text-blue-400 text-3xl" />
                  <h3 className="text-2xl font-bold text-white">Our Success Guarantee</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  We're so confident in our services that we offer a success guarantee on our premium packages. If you don't secure a scholarship with our guidance, you'll receive a partial refund.*
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400" />
                    <span className="text-white">Money-back guarantee on premium packages</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400" />
                    <span className="text-white">Free consultation for all new clients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400" />
                    <span className="text-white">24/7 support for premium members</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "100%", label: "Secure Payment", icon: <FaLock />, color: "text-blue-400" },
                  { value: "30-Day", label: "Money Back", icon: <FaMoneyBillWave />, color: "text-cyan-400" },
                  { value: "24/7", label: "Support", icon: <FaPhone />, color: "text-blue-400" },
                  { value: "95%", label: "Satisfaction", icon: <FaStar />, color: "text-cyan-400" },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 text-center hover:border-blue-500/30 transition-colors">
                    <div className={`text-2xl mb-3 ${item.color}`}>{item.icon}</div>
                    <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-gray-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-8 text-center">*Terms and conditions apply. Guarantee valid for premium package subscribers who complete all recommended steps.</p>
          </div>
        </div>

        {/* Advisor Team */}
        <div className="mb-16">
          <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Meet Our Expert Advisors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Senior Scholarship Advisor",
                  experience: "12+ years",
                  expertise: ["Ivy League", "Research Grants", "International"],
                  icon: "👩‍🎓",
                },
                {
                  name: "Michael Chen",
                  role: "Application Strategist",
                  experience: "8+ years",
                  expertise: ["STEM", "MBA", "Entrepreneurship"],
                  icon: "👨‍💼",
                },
                {
                  name: "Priya Sharma",
                  role: "Essay & Interview Coach",
                  experience: "10+ years",
                  expertise: ["Humanities", "Law", "Public Policy"],
                  icon: "👩‍🏫",
                },
              ].map((advisor, index) => (
                <div key={index} className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 text-center hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="text-4xl mb-4">{advisor.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{advisor.name}</h4>
                  <div className="text-blue-400 mb-2">{advisor.role}</div>
                  <div className="text-gray-400 text-sm mb-4">{advisor.experience} experience</div>
                  <div className="space-y-2">
                    {advisor.expertise.map((exp, idx) => (
                      <span key={idx} className="inline-block px-3 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full mr-2 mb-2 border border-blue-500/20">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-12 text-center backdrop-blur-xl">
          <div className="max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaGraduationCap className="text-white text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Scholarship Journey?</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Join thousands of successful students who secured their dream scholarships with our expert guidance</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 shadow-lg">
                Book Free Consultation
              </button>
              <button className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-bold rounded-xl hover:border-blue-500 transition-colors">View All Services</button>
            </div>
            <p className="text-gray-400 text-sm mt-6">No commitment required • 30-minute free consultation • Money-back guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
