import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaGraduationCap, FaMapMarkerAlt, FaUniversity, FaTag, FaDollarSign, FaArrowRight } from "react-icons/fa";

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

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((sch) => (
            <div
              key={sch._id}
              className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 
              border border-gray-700/50 rounded-2xl p-6 
              hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20
              transition-all duration-300 hover:-translate-y-1"
            >
              {/* University Header with Icon */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 p-3 rounded-xl">
                    <FaUniversity className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{sch.scholarshipName}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                      <FaMapMarkerAlt className="text-xs" />
                      <span>
                        {sch.universityCity}, {sch.universityCountry}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scholarship Details */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {/* Degree */}
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <FaGraduationCap />
                      <span>Degree</span>
                    </div>
                    <p className="text-white font-medium">{sch.degree}</p>
                  </div>

                  {/* Category */}
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <FaTag />
                      <span>Category</span>
                    </div>
                    <p className="text-white font-medium">{sch.scholarshipCategory}</p>
                  </div>
                </div>

                {/* Fees Information */}
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                  <h4 className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <FaDollarSign className="text-green-400" />
                    Financial Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-400 text-xs">Tuition Fees</p>
                      <p className="text-white font-semibold">${sch.tuitionFees.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Application Fee</p>
                      <p className="text-white font-semibold">${sch.applicationFees.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* University Info */}
                <div className="pt-4 border-t border-gray-700/50">
                  <p className="text-gray-300 text-sm">
                    <span className="text-white font-medium">University:</span> {sch.universityName}
                  </p>
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
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/scholarships"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800/50 
            hover:bg-gray-700/50 text-white font-medium rounded-xl 
            border border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            Browse All Scholarships
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopScholarships;
