import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { FaUser, FaEnvelope, FaUserTag } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const UserInfo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user data
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/info?email=${user.email}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-400">Failed to load user profile</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-4xl mb-4">👤</div>
          <p className="text-gray-400">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaUser className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            User <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Profile</span>
          </h1>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl shadow-xl p-8 border border-gray-700/50 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <div className="p-3 bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-lg">
                <FaUser className="text-blue-400 text-2xl" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Full Name</p>
                <p className="text-2xl font-bold text-white">{userData.name || "Not provided"}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <div className="p-3 bg-gradient-to-r from-cyan-900/30 to-cyan-800/30 rounded-lg">
                <FaEnvelope className="text-cyan-400 text-2xl" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Email Address</p>
                <p className="text-xl text-white font-medium">{userData.email || "Not provided"}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <div className="p-3 bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg">
                <FaUserTag className="text-purple-400 text-2xl" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">User Role</p>
                <p className="text-xl text-white font-medium">{userData.role || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <p className="text-gray-300 text-center">Profile last updated: {new Date(userData.updatedAt || Date.now()).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
