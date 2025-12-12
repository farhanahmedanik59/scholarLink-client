import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaChevronDown, FaGraduationCap, FaSearch, FaBell, FaHome, FaBook, FaQuestionCircle, FaFileAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "All Scholarships", href: "/Allscholarships", icon: <FaBook /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-900/90 backdrop-blur-lg border-b border-gray-700/50 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">Scholar</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Stream</span>
            </div>
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 font-medium group"
              >
                <span className="text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            {user && (
              <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors">
                <FaTachometerAlt className="text-blue-400" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-800/50 transition-all duration-300 group">
                  <div className="relative">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-blue-500 transition-colors object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold border-2 border-transparent group-hover:border-blue-500 transition-colors">
                              <FaUser />
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold border-2 border-transparent group-hover:border-blue-500 transition-colors">
                        {user.displayName ? user.displayName.charAt(0) : <FaUser />}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white truncate max-w-[120px]">{user.displayName || "Welcome Back"}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[120px]">{user.email || "Scholar"}</p>
                  </div>
                  <FaChevronDown className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center gap-3">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.displayName || "User"} className="w-12 h-12 rounded-full border-2 border-blue-500/50 object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                            {user.displayName ? user.displayName.charAt(0) : <FaUser />}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-white">{user.displayName || "Scholar User"}</h4>
                          <p className="text-sm text-gray-400">{user.email || "student@example.com"}</p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full">{user.role || "Student"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                      >
                        <FaTachometerAlt className="text-blue-400" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to="dashboard/myApplication"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                      >
                        <FaFileAlt className="text-yellow-400" />
                        <span>My Applications</span>
                      </Link>
                    </div>

                    <div className="p-4 border-t border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-700/30 text-red-300 hover:text-white hover:bg-red-900/30 rounded-lg transition-all duration-300"
                      >
                        <FaSignOutAlt />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <button className="px-5 py-2 text-sm font-medium border border-gray-600 text-gray-300 hover:text-white hover:border-blue-500 rounded-xl hover:bg-blue-500/10 transition-all duration-300">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all duration-300">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex justify-center py-4 border-t border-gray-700/50 mt-2">
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href} className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            ))}
            <Link to={"/dashboard"} className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
              <span className="text-lg">
                <FaTachometerAlt></FaTachometerAlt>
              </span>
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
