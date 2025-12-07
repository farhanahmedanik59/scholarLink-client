import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const UsersManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  // Fetch users data
  const {
    data: users = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  // DEBUG: Log users to see what roles they have
  useEffect(() => {
    if (users.length > 0) {
      console.log(
        "Users from API:",
        users.map((u) => ({ name: u.name, role: u.role }))
      );
    }
  }, [users]);

  // Get unique roles from users
  const availableRoles = ["All", "student", "moderator", "admin"];

  // Filter users - SIMPLE VERSION
  const filteredUsers = users.filter((user) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = user.name?.toLowerCase().includes(searchLower);
      const emailMatch = user.email?.toLowerCase().includes(searchLower);
      if (!nameMatch && !emailMatch) return false;
    }

    // Role filter
    if (selectedRole !== "All") {
      // Normalize both values to lowercase for comparison
      const userRole = user.role?.toLowerCase() || "student";
      const filterRole = selectedRole.toLowerCase();
      if (userRole !== filterRole) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSelectedRole("All");
    setSearchQuery("");
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Delete this user?")) {
      try {
        await axiosSecure.delete(`/users/${userId}`);
        alert("User deleted");
        window.location.reload();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleUpdateRole = async (userEmail, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/${userEmail}/role`, { role: newRole, email: userEmail }).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "Your User has been Updated.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-400">Failed to load users</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-10 px-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaUsers className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Users <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Management</span>
          </h1>
          <p className="text-gray-300">Total users: {users.length}</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700/50 text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700/50 text-white focus:outline-none focus:border-blue-500/50"
            >
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role === "All" ? "All Roles" : role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>

            <button onClick={resetFilters} className="px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 transition-all">
              Reset
            </button>
          </div>
        </div>

        {/* Debug info */}
        {users.length > 0 && (
          <div className="mb-4 p-4 bg-gray-900/40 rounded-xl border border-gray-700/50">
            <p className="text-gray-400 text-sm">Roles in database: {[...new Set(users.map((u) => u.role || "student"))].join(", ")}</p>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700/50">
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Name</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Email</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Current Role</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Change Role</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <p className="text-gray-400">No users found</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Search: "{searchQuery}" | Role: {selectedRole}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-gray-700/30 hover:bg-gray-800/20">
                      <td className="py-4 px-6">
                        <p className="text-white font-medium">{user.name}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-300">{user.email}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-lg ${
                            (user.role || "student") === "admin"
                              ? "bg-red-900/30 text-red-300 border border-red-700/30"
                              : (user.role || "student") === "moderator"
                              ? "bg-blue-900/30 text-blue-300 border border-blue-700/30"
                              : "bg-green-900/30 text-green-300 border border-green-700/30"
                          }`}
                        >
                          {user.role || "student"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={user.role || "student"}
                          onChange={(e) => handleUpdateRole(user.email, e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                        >
                          <option value="student">Student</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-300 border border-red-700/30 hover:bg-red-900/40 transition-colors flex items-center gap-2"
                        >
                          <FaTrash className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="px-6 py-4 border-t border-gray-700/50">
            <p className="text-gray-400">
              Showing {filteredUsers.length} of {users.length} users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
