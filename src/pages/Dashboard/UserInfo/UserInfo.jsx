import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaUserTag, FaCamera, FaEdit, FaCalendarAlt } from "react-icons/fa";
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

  const formatEmail = (email) => {
    if (!email) return "Not provided";

    if (typeof window !== "undefined" && window.innerWidth < 640) {
      const [username, domain] = email.split("@");
      if (username.length > 12) {
        return `${username.substring(0, 10)}...@${domain}`;
      }
    }
    return email;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-6 sm:py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative mx-auto mb-4 sm:mb-6">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
              {userData?.photoURL ? (
                <>
                  <img
                    src={userData.photoURL}
                    alt={userData.name || "User"}
                    className="w-full h-full rounded-2xl object-cover border-4 border-blue-500/30 shadow-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center border-4 border-blue-500/30 hidden">
                    <FaUser className="text-white text-4xl sm:text-5xl" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center border-4 border-blue-500/30 shadow-lg">
                  <FaUser className="text-white text-4xl sm:text-5xl" />
                </div>
              )}

              <button className="absolute -bottom-2 -right-2 bg-gray-800 hover:bg-gray-700 border-2 border-blue-500/50 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110">
                <FaCamera className="text-blue-400 text-sm sm:text-base" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
            User <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage your personal information</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-colors duration-300">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-lg flex-shrink-0">
                <FaUser className="text-blue-400 text-xl sm:text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm mb-1">Full Name</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">{userData.name || "Not provided"}</p>
              </div>
              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors flex-shrink-0">
                <FaEdit className="text-gray-400 hover:text-blue-400 text-sm sm:text-base" />
              </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-colors duration-300">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-900/30 to-cyan-800/30 rounded-lg flex-shrink-0">
                <FaEnvelope className="text-cyan-400 text-xl sm:text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm mb-1">Email Address</p>
                <div className="flex items-center gap-2">
                  <p className="text-base sm:text-lg md:text-xl text-white font-medium truncate sm:break-all">{formatEmail(userData.email)}</p>

                  <span className="hidden sm:inline text-xs text-gray-500">(hover to see full)</span>
                </div>

                {userData.email && userData.email.length > 25 && (
                  <div className="sm:hidden mt-1">
                    <p className="text-xs text-gray-500 break-all">{userData.email}</p>
                  </div>
                )}
              </div>
              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors flex-shrink-0">
                <FaEdit className="text-gray-400 hover:text-cyan-400 text-sm sm:text-base" />
              </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-colors duration-300">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg flex-shrink-0">
                <FaUserTag className="text-purple-400 text-xl sm:text-2xl" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-xs sm:text-sm mb-1">User Role</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      userData.role === "admin"
                        ? "bg-red-900/30 text-red-400 border border-red-700/50"
                        : userData.role === "university"
                        ? "bg-blue-900/30 text-blue-400 border border-blue-700/50"
                        : "bg-green-900/30 text-green-400 border border-green-700/50"
                    }`}
                  >
                    {userData.role || "Student"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-3 sm:p-4 bg-gray-800/20 rounded-lg sm:rounded-xl border border-gray-700/30">
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt className="text-gray-400 text-sm" />
                  <p className="text-gray-400 text-xs sm:text-sm">Account Created</p>
                </div>
                <p className="text-white text-sm sm:text-base">
                  {new Date(userData.createdAt || Date.now()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="p-3 sm:p-4 bg-gray-800/20 rounded-lg sm:rounded-xl border border-gray-700/30">
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt className="text-gray-400 text-sm" />
                  <p className="text-gray-400 text-xs sm:text-sm">Last Updated</p>
                </div>
                <p className="text-white text-sm sm:text-base">
                  {new Date(userData.updatedAt || Date.now()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <p className="text-gray-300 text-center text-xs sm:text-sm">
              Profile ID: <span className="font-mono text-blue-300">{userData._id?.substring(0, 8)}...</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
