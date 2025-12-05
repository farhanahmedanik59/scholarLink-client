import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  const visibleNavItems = [
    { name: "Home", href: "#" },
    { name: "All Scholarships", href: "#" },
    { name: "How It Works", href: "#" },
    { name: "Resources", href: "#" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="ml-2 text-xl font-bold text-white">SCHOLARLINK</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {visibleNavItems.map((item) => (
              <a key={item.name} href={item.href} className="text-white hover:text-orange-500 transition duration-150 font-medium">
                {item.name}
              </a>
            ))}
          </div>

          {/* Login/Register */}
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <button className="px-4 py-1 text-sm font-medium border border-white text-white rounded-lg hover:bg-white/10 transition">Login</button>
            </Link>
            <button className="px-4 py-1 text-sm font-medium rounded-lg bg-gray-600 text-white shadow-md hover:opacity-90 transition">Register</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
