import React from "react";
import { Link, useNavigate } from "react-router";
import { FaLock, FaSignInAlt, FaUserPlus, FaHome, FaShieldAlt, FaExclamationCircle, FaArrowLeft } from "react-icons/fa";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-amber-500/10 blur-3xl rounded-full animate-pulse"></div>

          <div className="relative">
            <div className="text-[180px] md:text-[240px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-500/20 via-white/10 to-amber-500/20 leading-none">403</div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-red-600/20 to-amber-600/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#0F1A2C] to-[#1A2B4D] rounded-full flex items-center justify-center border-4 border-red-500/30">
                    <div className="relative">
                      <FaShieldAlt className="text-6xl md:text-7xl text-red-400" />
                      <FaLock className="text-2xl md:text-3xl text-amber-400 absolute -bottom-2 -right-2 animate-bounce" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-red-500/20 rounded-full animate-ping"></div>
                <div className="absolute inset-6 border-2 border-amber-500/20 rounded-full animate-ping animation-delay-1000"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Access <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Restricted</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl mx-auto">This scholarship content requires authentication. Please sign in to access detailed information and apply.</p>
          <div className="inline-flex items-center gap-2 text-amber-300 bg-red-900/20 border border-red-700/30 px-4 py-2 rounded-full">
            <FaExclamationCircle />
            <span className="text-sm font-medium">Error 403: Unauthorized Access</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaSignInAlt className="text-white text-3xl" />
            </div>
            <h3 className="text-white text-2xl font-semibold mb-3">Sign In</h3>
            <p className="text-gray-400 mb-6">Access your existing account to view scholarship details</p>
            <Link
              to="/login"
              className="inline-block w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Go to Login
            </Link>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-900/20 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaUserPlus className="text-white text-3xl" />
            </div>
            <h3 className="text-white text-2xl font-semibold mb-3">Create Account</h3>
            <p className="text-gray-400 mb-6">Register for free to access all scholarship opportunities</p>
            <Link
              to="/register"
              className="inline-block w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <button
            onClick={() => navigate(-1)}
            className="group bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-xl p-4 hover:border-amber-500/50 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaArrowLeft className="text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-medium">Go Back</span>
          </button>

          <Link
            to="/"
            className="group bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaHome className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-medium">Home Page</span>
          </Link>

          <Link
            to="/scholarships"
            className="group bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-xl p-4 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaShieldAlt className="text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-medium">Public Scholarships</span>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="text-white text-xl font-semibold mb-6 flex items-center justify-center gap-3">
            <FaLock className="text-amber-400" />
            Why Authentication is Required
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-900/50 to-blue-800/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-blue-400" />
              </div>
              <h4 className="text-white font-medium mb-2">Secure Application</h4>
              <p className="text-gray-400 text-sm">Protect your personal information during the application process</p>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-green-900/50 to-green-800/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaUserPlus className="text-green-400" />
              </div>
              <h4 className="text-white font-medium mb-2">Track Applications</h4>
              <p className="text-gray-400 text-sm">Monitor your scholarship applications and receive updates</p>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-900/50 to-purple-800/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaExclamationCircle className="text-purple-400" />
              </div>
              <h4 className="text-white font-medium mb-2">Personalized Access</h4>
              <p className="text-gray-400 text-sm">Get recommendations based on your profile and preferences</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700/30">
          <p className="text-gray-400 mb-4">Having trouble accessing your account?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/forgot-password" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
              Forgot Password?
            </a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a href="/contact-support" className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium">
              Contact Support
            </a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-red-500/30" : "bg-amber-500/30"} animate-pulse`} style={{ animationDelay: `${i * 200}ms` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
