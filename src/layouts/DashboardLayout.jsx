import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router";
import { FaBars, FaTimes, FaUser, FaGraduationCap, FaTachometerAlt, FaUserCog, FaShieldAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  console.log(role);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Drawer toggle for mobile
  const [activeRole, setActiveRole] = useState("admin"); // student, moderator, admin
  useEffect(() => {
    setActiveRole(role);
  }, [role]);
  const roleTitles = {
    student: "Student Dashboard",
    moderator: "Moderator Dashboard",
    admin: "Admin Dashboard",
  };

  const handleLogout = () => navigate("/login");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex-shrink-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700/50">
          <Link to={"/"}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <h1 className="text-white font-bold text-xl">ScholarLink</h1>
            </div>
          </Link>
          <button className="text-gray-400 hover:text-white lg:hidden" onClick={() => setSidebarOpen(false)}>
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavLink
            to="/dashboard/myProfile"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
            onClick={() => setSidebarOpen(false)}
          >
            <FaUserCog /> My Profile
          </NavLink>

          {/* Add more links based on roles */}
          {activeRole === "student" && (
            <>
              <NavLink
                to="/dashboard/myApplication"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaUserCog /> My Applications
              </NavLink>
              <NavLink
                to="/dashboard/myReviews"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaUserCog /> My Reviews
              </NavLink>
            </>
          )}

          {activeRole === "admin" && (
            <>
              <NavLink
                to="/dashboard/users-management"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaUserCog /> User Management
              </NavLink>
              <NavLink
                to="/dashboard/addScholarships"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaUserCog /> Add ScholarShips
              </NavLink>
              <NavLink
                to="/dashboard/manageScholarships"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaUserCog /> Manage ScholarShips
              </NavLink>

              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaUserCog /> Analytics
              </NavLink>
            </>
          )}

          {/* Logout */}
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 mt-6 text-gray-300 hover:text-white hover:bg-red-600/20 rounded-lg">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#0F1A2C]  shadow-sm">
          <button className="text-gray-600 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="text-xl text-white font-bold">{roleTitles[activeRole]}</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
