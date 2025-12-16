import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router";
import { FaBars, FaTimes, FaUser, FaGraduationCap, FaUsers, FaPlusCircle, FaEdit, FaChartBar, FaTasks, FaComments, FaStar, FaSignOutAlt } from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRole, setActiveRole] = useState("admin");

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
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex-shrink-0`}
      >
        <div className="flex items-center gap-2 h-16 px-2 border-b border-gray-700/50">
          <Link to={"/"}>
            <div className="flex items-center md:gap-3 gap-1">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <h1 className="text-white font-bold text-xl">ScholarStream</h1>
            </div>
          </Link>
          <button className="text-gray-400 hover:text-white lg:hidden " onClick={() => setSidebarOpen(false)}>
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavLink
            to="/dashboard/myProfile"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
            onClick={() => setSidebarOpen(false)}
          >
            <FaUser /> My Profile
          </NavLink>

          {activeRole === "student" && (
            <>
              <NavLink
                to="/dashboard/myApplication"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaGraduationCap /> My Applications
              </NavLink>
              <NavLink
                to="/dashboard/myReviews"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaStar /> My Reviews
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
                <FaUsers /> User Management
              </NavLink>
              <NavLink
                to="/dashboard/addScholarships"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaPlusCircle /> Add ScholarShips
              </NavLink>
              <NavLink
                to="/dashboard/manageScholarships"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaEdit /> Manage ScholarShips
              </NavLink>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaChartBar /> Analytics
              </NavLink>
            </>
          )}

          {activeRole === "moderator" && (
            <>
              <NavLink
                to="/dashboard/ManageApplications"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaTasks /> Manage Applications
              </NavLink>
              <NavLink
                to="/dashboard/AllReviews"
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-purple-600/20 text-white" : "text-gray-300 hover:bg-gray-700/30"}`}
                onClick={() => setSidebarOpen(false)}
              >
                <FaComments /> All Reviews
              </NavLink>
            </>
          )}

          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 mt-6 text-gray-300 hover:text-white hover:bg-red-600/20 rounded-lg">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-[#0F1A2C] shadow-sm">
          <button className="text-gray-600 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="text-xl text-white font-bold">{roleTitles[activeRole]}</h1>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
