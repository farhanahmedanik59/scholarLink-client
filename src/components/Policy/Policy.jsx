import React, { useEffect, useState } from "react";
import {
  FaShieldAlt,
  FaLock,
  FaUserCheck,
  FaDatabase,
  FaCookie,
  FaEnvelope,
  FaTrash,
  FaEye,
  FaDownload,
  FaChevronRight,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaExternalLinkAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { MdPrivacyTip, MdSecurity } from "react-icons/md";

const PrivacyPolicySection = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  const [activeSection, setActiveSection] = useState("overview");
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
  });

  const sections = [
    { id: "overview", label: "Overview", icon: <FaShieldAlt /> },
    { id: "data-collection", label: "Data Collection", icon: <FaDatabase /> },
    { id: "data-use", label: "Data Use", icon: <FaUserCheck /> },
    { id: "data-sharing", label: "Data Sharing", icon: <FaEnvelope /> },
    { id: "user-rights", label: "Your Rights", icon: <MdPrivacyTip /> },
    { id: "cookies", label: "Cookies", icon: <FaCookie /> },
    { id: "security", label: "Security", icon: <MdSecurity /> },
    { id: "contact", label: "Contact", icon: <FaQuestionCircle /> },
  ];

  const handleCookieToggle = (cookieType) => {
    if (cookieType === "essential") return; // Essential cookies cannot be disabled
    setCookiePreferences((prev) => ({
      ...prev,
      [cookieType]: !prev[cookieType],
    }));
  };

  const handleAcceptAll = () => {
    setCookiePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
    });
    setShowCookieSettings(false);
  };

  const handleSavePreferences = () => {
    // In real app, save to localStorage or send to backend
    localStorage.setItem("cookiePreferences", JSON.stringify(cookiePreferences));
    setShowCookieSettings(false);
  };

  return (
    <section className="bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaShieldAlt className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">Last updated: February 15, 2024. This policy describes how we collect, use, and protect your information.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl sticky top-6">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <FaShieldAlt className="text-blue-400" />
                Policy Sections
              </h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      activeSection === section.id ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30" : "bg-gray-800/30 border border-transparent hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${activeSection === section.id ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "bg-gray-700 text-gray-400"}`}>{section.icon}</div>
                      <span className={`font-medium ${activeSection === section.id ? "text-white" : "text-gray-300"}`}>{section.label}</span>
                    </div>
                    <FaChevronRight className={`text-sm ${activeSection === section.id ? "text-blue-400" : "text-gray-500"}`} />
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-white font-bold text-sm mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowCookieSettings(true)}
                    className="w-full flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-blue-500 transition-colors"
                  >
                    <FaCookie className="text-cyan-400" />
                    <span className="text-gray-300 text-sm">Cookie Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-blue-500 transition-colors">
                    <FaDownload className="text-blue-400" />
                    <span className="text-gray-300 text-sm">Download PDF</span>
                  </button>
                  <a href="#contact" className="w-full flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-blue-500 transition-colors">
                    <FaQuestionCircle className="text-green-400" />
                    <span className="text-gray-300 text-sm">Contact DPO</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
              {/* Overview Section */}
              {activeSection === "overview" && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                      <FaShieldAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Privacy Policy Overview</h2>
                      <p className="text-gray-400">Your privacy is important to us</p>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-6">
                      At Scholarship Hub, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use,
                      disclose, and safeguard your information when you use our scholarship management platform.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <FaCheckCircle className="text-green-400" />
                          <h3 className="text-white font-bold">Our Commitment</h3>
                        </div>
                        <ul className="space-y-2 text-gray-300">
                          <li>• We never sell your personal data</li>
                          <li>• We use encryption to protect your information</li>
                          <li>• You control your data and preferences</li>
                          <li>• We are transparent about our practices</li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <FaTimesCircle className="text-red-400" />
                          <h3 className="text-white font-bold">What We Don't Do</h3>
                        </div>
                        <ul className="space-y-2 text-gray-300">
                          <li>• We don't share data with unauthorized parties</li>
                          <li>• We don't collect unnecessary information</li>
                          <li>• We don't retain data longer than needed</li>
                          <li>• We don't use data for unrelated purposes</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 mb-8">
                      <h3 className="text-white font-bold mb-4">Policy Updates</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                          <div>
                            <div className="text-white font-medium">Current Version</div>
                            <div className="text-gray-400 text-sm">February 15, 2024</div>
                          </div>
                          <div className="text-green-400 font-bold">Active</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                          <div>
                            <div className="text-white font-medium">Previous Version</div>
                            <div className="text-gray-400 text-sm">October 1, 2023</div>
                          </div>
                          <a href="#" className="text-blue-400 hover:text-cyan-400 text-sm">
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Collection Section */}
              {activeSection === "data-collection" && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                      <FaDatabase className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Data We Collect</h2>
                      <p className="text-gray-400">Information you provide and we collect</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <FaUserCheck className="text-blue-400" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-gray-300">Full name</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-gray-300">Email address</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-gray-300">Phone number</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                            <span className="text-gray-300">Date of birth</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                            <span className="text-gray-300">Nationality</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                            <span className="text-gray-300">Contact preferences</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <FaGraduationCap className="text-cyan-400" />
                        Academic Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-300">Academic transcripts</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-300">Test scores (SAT, GRE, etc.)</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-300">Field of study</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="text-gray-300">University preferences</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="text-gray-300">Scholarship interests</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="text-gray-300">Application documents</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <FaEye className="text-yellow-400" />
                        Automated Collection
                      </h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">We automatically collect certain information when you visit our platform:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-gray-400 text-sm mb-2">Technical Information</div>
                            <div className="space-y-2">
                              <div className="text-gray-300 text-sm">• IP address</div>
                              <div className="text-gray-300 text-sm">• Browser type</div>
                              <div className="text-gray-300 text-sm">• Device information</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm mb-2">Usage Data</div>
                            <div className="space-y-2">
                              <div className="text-gray-300 text-sm">• Pages visited</div>
                              <div className="text-gray-300 text-sm">• Time spent</div>
                              <div className="text-gray-300 text-sm">• Click patterns</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Use Section */}
              {activeSection === "data-use" && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                      <FaUserCheck className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">How We Use Your Data</h2>
                      <p className="text-gray-400">Purposes of data processing</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                      {
                        title: "Scholarship Matching",
                        description: "To match you with relevant scholarship opportunities",
                        icon: "🎯",
                        color: "from-blue-600 to-cyan-500",
                      },
                      {
                        title: "Platform Improvement",
                        description: "To enhance user experience and features",
                        icon: "⚡",
                        color: "from-blue-500 to-cyan-400",
                      },
                      {
                        title: "Communication",
                        description: "To send updates and important information",
                        icon: "📧",
                        color: "from-blue-600 to-cyan-500",
                      },
                      {
                        title: "Analytics",
                        description: "To analyze platform usage and performance",
                        icon: "📊",
                        color: "from-blue-500 to-cyan-400",
                      },
                    ].map((use, index) => (
                      <div key={index} className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 hover:border-blue-500/30 transition-colors">
                        <div className="text-3xl mb-4">{use.icon}</div>
                        <h3 className="text-white font-bold mb-2">{use.title}</h3>
                        <p className="text-gray-400 text-sm">{use.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-6">
                    <h3 className="text-white font-bold mb-4">Legal Basis for Processing</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                          <FaCheckCircle className="text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Contractual Necessity</div>
                          <div className="text-gray-400 text-sm">Processing necessary for service delivery</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-cyan-500/20">
                          <FaCheckCircle className="text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Legitimate Interests</div>
                          <div className="text-gray-400 text-sm">Improving services and user experience</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-green-500/20">
                          <FaCheckCircle className="text-green-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Consent</div>
                          <div className="text-gray-400 text-sm">Where you have given explicit permission</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* User Rights Section */}
              {activeSection === "user-rights" && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                      <MdPrivacyTip className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Your Privacy Rights</h2>
                      <p className="text-gray-400">Control over your personal data</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        right: "Right to Access",
                        description: "Request a copy of your personal data",
                        icon: <FaEye />,
                        color: "blue",
                      },
                      {
                        right: "Right to Rectification",
                        description: "Correct inaccurate or incomplete data",
                        icon: <FaUserCheck />,
                        color: "cyan",
                      },
                      {
                        right: "Right to Erasure",
                        description: "Request deletion of your personal data",
                        icon: <FaTrash />,
                        color: "red",
                      },
                      {
                        right: "Right to Restrict Processing",
                        description: "Limit how we use your data",
                        icon: <FaLock />,
                        color: "yellow",
                      },
                      {
                        right: "Right to Data Portability",
                        description: "Receive your data in a portable format",
                        icon: <FaDownload />,
                        color: "green",
                      },
                      {
                        right: "Right to Object",
                        description: "Object to certain processing activities",
                        icon: <FaTimesCircle />,
                        color: "purple",
                      },
                    ].map((right, index) => (
                      <div key={index} className="flex items-start gap-4 p-6 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-blue-500/30 transition-colors">
                        <div
                          className={`p-3 rounded-lg ${
                            right.color === "blue"
                              ? "bg-blue-500/20"
                              : right.color === "cyan"
                              ? "bg-cyan-500/20"
                              : right.color === "red"
                              ? "bg-red-500/20"
                              : right.color === "yellow"
                              ? "bg-yellow-500/20"
                              : right.color === "green"
                              ? "bg-green-500/20"
                              : "bg-purple-500/20"
                          }`}
                        >
                          <div
                            className={`${
                              right.color === "blue"
                                ? "text-blue-400"
                                : right.color === "cyan"
                                ? "text-cyan-400"
                                : right.color === "red"
                                ? "text-red-400"
                                : right.color === "yellow"
                                ? "text-yellow-400"
                                : right.color === "green"
                                ? "text-green-400"
                                : "text-purple-400"
                            }`}
                          >
                            {right.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold mb-1">{right.right}</h3>
                          <p className="text-gray-400 text-sm mb-3">{right.description}</p>
                          <button className="text-blue-400 hover:text-cyan-400 text-sm font-medium">Exercise this right →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cookies Section */}
              {activeSection === "cookies" && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                      <FaCookie className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Cookie Policy</h2>
                      <p className="text-gray-400">How we use cookies and similar technologies</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4">What Are Cookies?</h3>
                      <p className="text-gray-300 mb-4">
                        Cookies are small text files placed on your device to help us provide a better user experience. They allow the platform to remember your actions and preferences over time.
                      </p>
                    </div>

                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-6">Cookie Types We Use</h3>
                      <div className="space-y-4">
                        {[
                          {
                            type: "Essential Cookies",
                            description: "Required for basic platform functionality",
                            duration: "Session",
                            canDisable: false,
                          },
                          {
                            type: "Analytics Cookies",
                            description: "Help us understand how users interact with our platform",
                            duration: "2 years",
                            canDisable: true,
                          },
                          {
                            type: "Marketing Cookies",
                            description: "Used to deliver relevant advertisements",
                            duration: "1 year",
                            canDisable: true,
                          },
                          {
                            type: "Personalization Cookies",
                            description: "Remember your preferences and settings",
                            duration: "1 year",
                            canDisable: true,
                          },
                        ].map((cookie, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
                            <div>
                              <div className="text-white font-medium mb-1">{cookie.type}</div>
                              <div className="text-gray-400 text-sm">{cookie.description}</div>
                              <div className="text-gray-500 text-xs mt-1">Duration: {cookie.duration}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              {cookie.canDisable ? (
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cookiePreferences[cookie.type.toLowerCase().split(" ")[0]]}
                                    onChange={() => handleCookieToggle(cookie.type.toLowerCase().split(" ")[0])}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-cyan-500"></div>
                                </label>
                              ) : (
                                <span className="text-gray-400 text-sm">Required</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => setShowCookieSettings(true)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30"
                      >
                        Manage Cookie Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeSection === "contact" && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                      <FaQuestionCircle className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Contact & Questions</h2>
                      <p className="text-gray-400">Get in touch with our privacy team</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-6">
                        <h3 className="text-white font-bold mb-4">Data Protection Officer</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="text-gray-400 text-sm">Email</div>
                            <div className="text-white">privacy@scholarshiphub.com</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Phone</div>
                            <div className="text-white">+1 (555) 123-4567</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Response Time</div>
                            <div className="text-white">Within 48 hours</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                        <h3 className="text-white font-bold mb-4">Privacy Resources</h3>
                        <div className="space-y-3">
                          <a href="#" className="flex items-center gap-2 text-blue-400 hover:text-cyan-400">
                            <FaExternalLinkAlt />
                            <span>GDPR Compliance Statement</span>
                          </a>
                          <a href="#" className="flex items-center gap-2 text-blue-400 hover:text-cyan-400">
                            <FaExternalLinkAlt />
                            <span>Data Processing Agreement</span>
                          </a>
                          <a href="#" className="flex items-center gap-2 text-blue-400 hover:text-cyan-400">
                            <FaExternalLinkAlt />
                            <span>Security White Paper</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4">Submit a Request</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2">Request Type</label>
                          <select className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-3 text-white">
                            <option>Data Access Request</option>
                            <option>Data Deletion Request</option>
                            <option>Correction Request</option>
                            <option>Other Inquiry</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2">Description</label>
                          <textarea className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-3 text-white h-32" placeholder="Please describe your request in detail..." />
                        </div>
                        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity">Submit Request</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cookie Settings Modal */}
        {showCookieSettings && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Cookie Preferences</h3>
                  <button onClick={() => setShowCookieSettings(false)} className="text-gray-400 hover:text-white text-2xl">
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {Object.entries(cookiePreferences).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                      <div>
                        <div className="text-white font-medium capitalize">{key} Cookies</div>
                        <div className="text-gray-400 text-sm">
                          {key === "essential"
                            ? "Required for platform functionality"
                            : key === "analytics"
                            ? "Helps us improve our services"
                            : key === "marketing"
                            ? "Shows relevant advertisements"
                            : "Remembers your preferences"}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={value} onChange={() => handleCookieToggle(key)} disabled={key === "essential"} className="sr-only peer" />
                        <div
                          className={`w-11 h-6 rounded-full peer ${
                            key === "essential" ? "bg-gray-700 cursor-not-allowed" : "bg-gray-700 peer-focus:outline-none"
                          } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                            key !== "essential" ? "peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-cyan-500" : ""
                          }`}
                        ></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button onClick={handleAcceptAll} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity">
                    Accept All Cookies
                  </button>
                  <button onClick={handleSavePreferences} className="flex-1 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl hover:border-blue-500 transition-colors">
                    Save Preferences
                  </button>
                  <button onClick={() => setShowCookieSettings(false)} className="flex-1 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl hover:border-gray-600 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PrivacyPolicySection;
