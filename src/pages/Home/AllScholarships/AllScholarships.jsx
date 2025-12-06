import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaGraduationCap, FaMapMarkerAlt, FaUniversity, FaTag, FaDollarSign, FaArrowRight, FaAward, FaCalendarAlt, FaSearch, FaFilter, FaTimes, FaCheck, FaGlobeAmericas } from "react-icons/fa";

const ScholarshipsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const response = await axiosSecure.get("/scholarships");
      return response.data;
    },
  });

  const scholarships = useMemo(() => {
    if (!responseData) return [];

    if (Array.isArray(responseData)) {
      return responseData;
    } else if (responseData.data && Array.isArray(responseData.data)) {
      return responseData.data;
    } else if (responseData.success && Array.isArray(responseData.data)) {
      return responseData.data;
    }

    return [];
  }, [responseData]);

  const categories = useMemo(() => {
    const allCategories = scholarships.map((s) => s.scholarshipCategory);
    return ["All", ...new Set(allCategories.filter(Boolean))];
  }, [scholarships]);

  const subjects = useMemo(() => {
    const allSubjects = scholarships.map((s) => s.subjectCategory);
    return ["All", ...new Set(allSubjects.filter(Boolean))];
  }, [scholarships]);

  const locations = useMemo(() => {
    const allLocations = scholarships.map((s) => s.universityCountry);
    return ["All", ...new Set(allLocations.filter(Boolean))];
  }, [scholarships]);

  const filteredScholarships = useMemo(() => {
    if (!Array.isArray(scholarships)) return [];

    return scholarships.filter((scholarship) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        scholarship.scholarshipName?.toLowerCase().includes(searchLower) ||
        scholarship.universityName?.toLowerCase().includes(searchLower) ||
        scholarship.degree?.toLowerCase().includes(searchLower) ||
        scholarship.subjectCategory?.toLowerCase().includes(searchLower);

      const matchesCategory = selectedCategory === "All" || scholarship.scholarshipCategory === selectedCategory;
      const matchesSubject = selectedSubject === "All" || scholarship.subjectCategory === selectedSubject;
      const matchesLocation = selectedLocation === "All" || scholarship.universityCountry === selectedLocation;

      return matchesSearch && matchesCategory && matchesSubject && matchesLocation;
    });
  }, [scholarships, searchQuery, selectedCategory, selectedSubject, selectedLocation]);

  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScholarships = filteredScholarships.slice(startIndex, endIndex);

  const handleViewDetails = (scholarshipId) => {
    navigate(`/scholarships/${scholarshipId}`);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSubject("All");
    setSelectedLocation("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const calculateDaysRemaining = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading scholarships...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-400">Failed to load scholarships</p>
        </div>
      </div>
    );
  }

  if (!scholarships || scholarships.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl border border-gray-700/50">
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="text-2xl font-bold text-white mb-3">No Scholarships Available</h3>
          <p className="text-gray-400">There are currently no scholarships in the database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-10 px-4">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaGraduationCap className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Available <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Scholarships</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Discover <span className="font-bold text-white">{filteredScholarships.length}</span> opportunities from top universities worldwide
          </p>
        </div>

        <div className="mb-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <FaSearch className="w-6 h-6 text-gray-400 group-focus-within:text-cyan-400" />
              </div>
              <input
                type="text"
                placeholder="Search scholarships by name, university, degree, or subject..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-8 py-5 pl-16 rounded-2xl bg-gray-900/60 border-2 border-gray-700/50 focus:border-cyan-500/50 focus:outline-none transition-all duration-300 shadow-xl text-white placeholder-gray-400 text-lg backdrop-blur-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <FaTimes className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl shadow-xl p-6 sticky top-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <FaFilter className="mr-3 text-cyan-400" />
                  Filters
                </h3>
                <button onClick={resetFilters} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 px-4 py-2 rounded-lg hover:bg-cyan-900/30 transition-colors">
                  Reset All
                </button>
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-white mb-4 text-lg flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  Scholarship Category
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/50 text-white shadow-lg"
                          : "bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50"
                      }`}
                    >
                      <span className="font-medium">{category}</span>
                      {selectedCategory === category && <FaCheck className="w-4 h-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-white mb-4 text-lg flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Subject Category
                </h4>
                <div className="space-y-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                        selectedSubject === subject
                          ? "bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/50 text-white shadow-lg"
                          : "bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50"
                      }`}
                    >
                      <span className="font-medium">{subject}</span>
                      {selectedSubject === subject && <FaCheck className="w-4 h-4 text-blue-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-white mb-4 text-lg flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Location
                </h4>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                        selectedLocation === location
                          ? "bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/50 text-white shadow-lg"
                          : "bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50"
                      }`}
                    >
                      <span className="font-medium">{location}</span>
                      {selectedLocation === location && <FaCheck className="w-4 h-4 text-purple-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {(selectedCategory !== "All" || selectedSubject !== "All" || selectedLocation !== "All" || searchQuery) && (
                <div className="pt-6 border-t border-gray-700/50">
                  <h4 className="font-bold text-white mb-4 text-lg">Active Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 text-cyan-300 text-sm font-medium px-3 py-1.5 rounded-lg border border-cyan-700/50 flex items-center">
                        Search: {searchQuery}
                        <button onClick={() => setSearchQuery("")} className="ml-2">
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedCategory !== "All" && (
                      <span className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 text-cyan-300 text-sm font-medium px-3 py-1.5 rounded-lg border border-cyan-700/50 flex items-center">
                        Category: {selectedCategory}
                        <button onClick={() => setSelectedCategory("All")} className="ml-2">
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedSubject !== "All" && (
                      <span className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 text-blue-300 text-sm font-medium px-3 py-1.5 rounded-lg border border-blue-700/50 flex items-center">
                        Subject: {selectedSubject}
                        <button onClick={() => setSelectedSubject("All")} className="ml-2">
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedLocation !== "All" && (
                      <span className="bg-gradient-to-r from-purple-900/40 to-violet-900/40 text-purple-300 text-sm font-medium px-3 py-1.5 rounded-lg border border-purple-700/50 flex items-center">
                        Location: {selectedLocation}
                        <button onClick={() => setSelectedLocation("All")} className="ml-2">
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-8 p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Available Scholarships</h2>
                  <p className="text-gray-300 mt-1">
                    Showing{" "}
                    <span className="font-semibold text-cyan-400">
                      {startIndex + 1}-{Math.min(endIndex, filteredScholarships.length)}
                    </span>{" "}
                    of <span className="font-semibold text-white">{filteredScholarships.length}</span> scholarships
                  </p>
                </div>
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 px-5 py-3 rounded-xl border border-gray-700/50">
                  <p className="text-gray-300 font-medium">
                    <span className="text-white">{scholarships.length}</span> total scholarships available
                  </p>
                </div>
              </div>
            </div>

            {filteredScholarships.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <FaGraduationCap className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">No scholarships found</h3>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">Try adjusting your search terms or filters</p>
                <button
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
                >
                  <FaTimes className="w-5 h-5 mr-3" />
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentScholarships.map((scholarship) => {
                    const daysRemaining = calculateDaysRemaining(scholarship.applicationDeadline);
                    const isDeadlineSoon = daysRemaining <= 30;
                    const isFullFund = scholarship.scholarshipCategory?.toLowerCase() === "full fund";

                    return (
                      <div
                        key={scholarship._id}
                        className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={scholarship.universityImage}
                            alt={scholarship.universityName}
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
                            <span className="text-white text-xs font-medium">#{scholarship.universityWorldRank}</span>
                          </div>

                          <div
                            className={`absolute top-4 right-4 backdrop-blur-sm border rounded-full px-3 py-1 ${
                              isFullFund ? "bg-gradient-to-r from-green-900/90 to-emerald-900/90 border-green-700/50" : "bg-gradient-to-r from-amber-900/90 to-orange-900/90 border-amber-700/50"
                            }`}
                          >
                            <span className={`text-xs font-medium ${isFullFund ? "text-green-300" : "text-amber-300"}`}>{scholarship.scholarshipCategory}</span>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-lg font-bold text-white truncate">{scholarship.universityName}</h3>
                            <p className="text-gray-300 text-sm truncate">{scholarship.scholarshipName}</p>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <FaMapMarkerAlt className="text-blue-400" />
                              <span>
                                {scholarship.universityCity}, {scholarship.universityCountry}
                              </span>
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${isDeadlineSoon ? "text-amber-400" : "text-gray-400"}`}>
                              <FaCalendarAlt className={isDeadlineSoon ? "text-amber-400" : ""} />
                              <span>{formatDate(scholarship.applicationDeadline)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="bg-gray-800/30 rounded-lg p-2">
                              <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                                <FaGraduationCap />
                                <span>Degree</span>
                              </div>
                              <p className="text-white font-medium text-sm">{scholarship.degree}</p>
                            </div>

                            <div className="bg-gray-800/30 rounded-lg p-2">
                              <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                                <FaTag />
                                <span>Subject</span>
                              </div>
                              <p className="text-white font-medium text-sm">{scholarship.subjectCategory}</p>
                            </div>
                          </div>

                          <div className="bg-gray-800/20 rounded-xl p-3 border border-gray-700/50 mb-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-gray-400 text-xs">Annual Tuition</p>
                                <p className="text-white font-semibold text-sm">${scholarship.tuitionFees?.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-gray-400 text-xs">Application Fee</p>
                                <p className="text-white font-semibold text-sm">${scholarship.applicationFees}</p>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleViewDetails(scholarship._id)}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                          >
                            View Details
                            <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12 p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                      <div className="text-gray-300">
                        <p className="font-semibold text-lg">
                          Page <span className="text-cyan-400">{currentPage}</span> of <span className="text-white">{totalPages}</span>
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {startIndex + 1}-{Math.min(endIndex, filteredScholarships.length)} of {filteredScholarships.length} scholarships
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center ${
                            currentPage === 1
                              ? "bg-gray-800/30 text-gray-500 cursor-not-allowed border border-gray-700/50"
                              : "bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50"
                          }`}
                        >
                          <FaArrowRight className="w-4 h-4 mr-2 rotate-180" />
                          Previous
                        </button>

                        <div className="flex space-x-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                                  currentPage === pageNum
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                                    : "bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center ${
                            currentPage === totalPages
                              ? "bg-gray-800/30 text-gray-500 cursor-not-allowed border border-gray-700/50"
                              : "bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50"
                          }`}
                        >
                          Next
                          <FaArrowRight className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsPage;
