import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaGraduationCap, FaMapMarkerAlt, FaUniversity, FaTag, FaDollarSign, FaArrowRight, FaAward, FaCalendarAlt } from "react-icons/fa";

const TopScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: scholarships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships/top");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading top scholarships...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-400">Failed to load scholarships</p>
          <p className="text-gray-400 text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateDaysRemaining = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <section className="bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-4">
            <FaGraduationCap className="text-white text-2xl" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Top <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Scholarships</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">Discover fully funded opportunities from leading universities worldwide</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((sch) => {
            const daysRemaining = calculateDaysRemaining(sch.applicationDeadline);
            const isDeadlineSoon = daysRemaining <= 30;
            const isFullFund = sch.scholarshipCategory?.toLowerCase() === "full fund";

            return (
              <div
                key={sch._id}
                className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 
                border border-gray-700/50 rounded-2xl overflow-hidden
                hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20
                transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {sch.universityImage ? (
                    <>
                      <img
                        src={sch.universityImage}
                        alt={sch.universityName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center">
                              <FaUniversity class="text-5xl text-blue-400" />
                            </div>
                          `;
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent"></div>

                      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-900/90 to-cyan-900/90 backdrop-blur-sm border border-blue-700/50 rounded-full px-3 py-1 flex items-center gap-1">
                        <FaAward className="text-yellow-400 text-xs" />
                        <span className="text-white text-xs font-medium">#{sch.universityWorldRank}</span>
                      </div>

                      <div
                        className={`absolute top-4 right-4 backdrop-blur-sm border rounded-full px-3 py-1 ${
                          isFullFund ? "bg-gradient-to-r from-green-900/90 to-emerald-900/90 border-green-700/50" : "bg-gradient-to-r from-amber-900/90 to-orange-900/90 border-amber-700/50"
                        }`}
                      >
                        <span className={`text-xs font-medium ${isFullFund ? "text-green-300" : "text-amber-300"}`}>{sch.scholarshipCategory}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white truncate">{sch.scholarshipName}</h3>
                        <div className="flex items-center gap-1 text-gray-300 text-sm mt-1">
                          <FaUniversity className="text-xs" />
                          <span className="truncate">{sch.universityName}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center">
                      <FaUniversity className="text-5xl text-blue-400" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaMapMarkerAlt className="text-blue-400" />
                      <span>
                        {sch.universityCity}, {sch.universityCountry}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${isDeadlineSoon ? "text-amber-400" : "text-gray-400"}`}>
                      <FaCalendarAlt className={isDeadlineSoon ? "text-amber-400" : ""} />
                      <span>{formatDate(sch.applicationDeadline)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-800/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <FaGraduationCap />
                        <span>Degree</span>
                      </div>
                      <p className="text-white font-medium">{sch.degree}</p>
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <FaTag />
                        <span>Subject</span>
                      </div>
                      <p className="text-white font-medium">{sch.subjectCategory}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800/20 rounded-xl p-4 border border-gray-700/50 mb-4">
                    <h4 className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                      <FaDollarSign className="text-green-400" />
                      Financial Details
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-gray-400 text-xs">Annual Tuition</p>
                        <p className="text-white font-semibold">${sch.tuitionFees.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Application Fee</p>
                        <p className="text-white font-semibold">${sch.applicationFees}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/scholarships/${sch._id}`}
                    className="group/btn w-full bg-gradient-to-r from-blue-600 to-cyan-500 
                    hover:from-blue-700 hover:to-cyan-600 text-white font-medium 
                    py-3 px-4 rounded-xl flex items-center justify-center gap-2 
                    transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    View Full Details
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/Allscholarships"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800/50 
            hover:bg-gray-700/50 text-white font-medium rounded-xl 
            border border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            Browse All Scholarships ({scholarships.length})
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopScholarships;
