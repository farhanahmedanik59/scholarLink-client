import React from "react";
import { Link } from "react-router";
import { FaHome, FaSearch, FaGraduationCap, FaExclamationTriangle } from "react-icons/fa";

const Page404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>

          <div className="relative">
            <div className="text-[200px] md:text-[280px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400/30 via-white/20 to-cyan-400/30 leading-none">404</div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-600/30 to-cyan-500/30 rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#0F1A2C] to-[#1A2B4D] rounded-full flex items-center justify-center">
                  <FaExclamationTriangle className="text-4xl md:text-5xl text-amber-400 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Not Found</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl mx-auto">Oops! The scholarship or page you're looking for seems to have disappeared from our database.</p>
          <div className="inline-flex items-center gap-2 text-amber-300 bg-amber-900/20 border border-amber-700/30 px-4 py-2 rounded-full">
            <FaExclamationTriangle />
            <span className="text-sm font-medium">Error 404: Resource Not Found</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/"
            className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaHome className="text-white text-2xl" />
            </div>
            <h3 className="text-white font-semibold mb-2">Return Home</h3>
            <p className="text-gray-400 text-sm">Go back to the main dashboard</p>
          </Link>

          <Link
            to="/Allscholarships"
            className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
            <h3 className="text-white font-semibold mb-2">Browse Scholarships</h3>
            <p className="text-gray-400 text-sm">Explore all available opportunities</p>
          </Link>

          <Link
            to="/scholarships"
            className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaSearch className="text-white text-2xl" />
            </div>
            <h3 className="text-white font-semibold mb-2">Search Again</h3>
            <p className="text-gray-400 text-sm">Find specific scholarships</p>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="text-white text-xl font-semibold mb-4 flex items-center justify-center gap-2">
            <FaExclamationTriangle className="text-amber-400" />
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
              <h4 className="text-white font-medium mb-2">Common Issues</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Scholarship may have been removed</li>
                <li>• Page might have moved</li>
              </ul>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
              <h4 className="text-white font-medium mb-2">What to Do</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Use the search function</li>
                <li>• Browse by categories</li>
                <li>• Contact support if needed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700/30">
          <p className="text-gray-400 text-sm">
            Still having trouble?{" "}
            <a href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page404;
