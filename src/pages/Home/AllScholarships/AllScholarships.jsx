import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ScholarshipsPage = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch scholarships using TanStack Query
  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const response = await axiosSecure.get("/scholarships");
      return response.data;
    },
  });

  // Extract scholarships array from response
  const scholarships = useMemo(() => {
    if (!responseData) return [];

    // Handle different response structures
    if (Array.isArray(responseData)) {
      return responseData; // Backend returns direct array
    } else if (responseData.data && Array.isArray(responseData.data)) {
      return responseData.data; // Backend returns { data: [] }
    } else if (responseData.success && Array.isArray(responseData.data)) {
      return responseData.data; // Backend returns { success: true, data: [] }
    }

    console.warn("Unexpected response structure:", responseData);
    return [];
  }, [responseData]);

  // Extract filters from response or generate from scholarships
  const { categories, subjects, locations } = useMemo(() => {
    // Try to get filters from response first
    if (responseData?.filters) {
      return {
        categories: responseData.filters.categories || ["All"],
        subjects: responseData.filters.subjects || ["All"],
        locations: responseData.filters.countries || ["All"],
      };
    }

    // Generate filters from scholarships data
    const allCategories = scholarships.map((s) => s.scholarshipCategory);
    const allSubjects = scholarships.map((s) => s.subjectCategory);
    const allLocations = scholarships.map((s) => s.universityCountry);

    return {
      categories: ["All", ...new Set(allCategories.filter(Boolean))],
      subjects: ["All", ...new Set(allSubjects.filter(Boolean))],
      locations: ["All", ...new Set(allLocations.filter(Boolean))],
    };
  }, [responseData, scholarships]);

  // Filter and search logic
  const filteredScholarships = useMemo(() => {
    if (!Array.isArray(scholarships)) return [];

    return scholarships.filter((scholarship) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        scholarship.scholarshipName?.toLowerCase().includes(searchLower) ||
        scholarship.universityName?.toLowerCase().includes(searchLower) ||
        scholarship.degree?.toLowerCase().includes(searchLower) ||
        scholarship.subjectCategory?.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory = selectedCategory === "All" || scholarship.scholarshipCategory === selectedCategory;

      // Subject filter
      const matchesSubject = selectedSubject === "All" || scholarship.subjectCategory === selectedSubject;

      // Location filter
      const matchesLocation = selectedLocation === "All" || scholarship.universityCountry === selectedLocation;

      return matchesSearch && matchesCategory && matchesSubject && matchesLocation;
    });
  }, [scholarships, searchQuery, selectedCategory, selectedSubject, selectedLocation]);

  // Pagination logic
  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScholarships = filteredScholarships.slice(startIndex, endIndex);

  const handleViewDetails = (scholarshipId) => {
    navigate(`/scholarship/${scholarshipId}`);
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSubject("All");
    setSelectedLocation("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white/80 font-medium">Loading scholarships...</p>
          <p className="text-white/50 text-sm mt-2">Fetching the best opportunities for you</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 max-w-md w-full">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Error Loading Scholarships</h3>
          <p className="text-white/60 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!scholarships || scholarships.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="text-2xl font-bold text-white mb-3">No Scholarships Available</h3>
          <p className="text-white/60">There are currently no scholarships in the database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black/40 backdrop-blur-xl rounded-2xl mb-6 shadow-2xl border border-white/10">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Scholarship Opportunities</h1>
          <p className="text-white/60 text-xl max-w-3xl mx-auto">
            Discover <span className="font-bold text-white">{filteredScholarships.length}</span> handpicked scholarships from top universities worldwide
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <input
                type="text"
                placeholder="🔍 Search scholarships by name, university, degree, or subject..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-8 py-5 pl-16 rounded-2xl bg-black/40 backdrop-blur-xl border-2 border-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/10 focus:outline-none transition-all duration-300 shadow-2xl hover:shadow-3xl text-white placeholder-white/50 text-lg"
              />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-white/50 group-focus-within:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search tips */}
            {searchQuery && <p className="text-sm text-white/50 mt-3 text-center">Searching across: Scholarship Name, University, Degree, and Subject Category</p>}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-7 sticky top-6 border border-white/10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </h3>
                <button onClick={resetFilters} className="text-sm font-semibold text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  Reset All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-white mb-4 text-lg flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Scholarship Category
                </h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-5 py-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                        selectedCategory === category ? "bg-white/20 backdrop-blur-sm border-white/30 text-white shadow-lg" : "border-white/10 hover:border-white/30 hover:bg-white/10 text-white/80"
                      }`}
                    >
                      <span className="font-medium">{category}</span>
                      {selectedCategory === category && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-white mb-4 text-lg flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Subject Category
                </h4>
                <div className="space-y-3">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-5 py-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                        selectedSubject === subject ? "bg-white/20 backdrop-blur-sm border-white/30 text-white shadow-lg" : "border-white/10 hover:border-white/30 hover:bg-white/10 text-white/80"
                      }`}
                    >
                      <span className="font-medium">{subject}</span>
                      {selectedSubject === subject && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h4 className="font-bold text-white mb-4 text-lg flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Location
                </h4>
                <div className="space-y-3">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-5 py-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                        selectedLocation === location ? "bg-white/20 backdrop-blur-sm border-white/30 text-white shadow-lg" : "border-white/10 hover:border-white/30 hover:bg-white/10 text-white/80"
                      }`}
                    >
                      <span className="font-medium">{location}</span>
                      {selectedLocation === location && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedCategory !== "All" || selectedSubject !== "All" || selectedLocation !== "All") && (
                <div className="pt-6 border-t border-white/10">
                  <h4 className="font-bold text-white mb-4 text-lg">Active Filters</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedCategory !== "All" && (
                      <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/20 flex items-center">
                        Category: {selectedCategory}
                        <button onClick={() => setSelectedCategory("All")} className="ml-2 text-white/60 hover:text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )}
                    {selectedSubject !== "All" && (
                      <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/20 flex items-center">
                        Subject: {selectedSubject}
                        <button onClick={() => setSelectedSubject("All")} className="ml-2 text-white/60 hover:text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )}
                    {selectedLocation !== "All" && (
                      <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/20 flex items-center">
                        Location: {selectedLocation}
                        <button onClick={() => setSelectedLocation("All")} className="ml-2 text-white/60 hover:text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scholarships Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-8 p-6 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Available Scholarships</h2>
                  <p className="text-white/60 mt-1">
                    Showing{" "}
                    <span className="font-semibold text-white">
                      {startIndex + 1}-{Math.min(endIndex, filteredScholarships.length)}
                    </span>{" "}
                    of <span className="font-semibold text-white">{filteredScholarships.length}</span> scholarships
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10">
                  <p className="text-white font-medium">
                    <span className="text-white">{scholarships.length}</span> total scholarships in database
                  </p>
                </div>
              </div>
            </div>

            {filteredScholarships.length === 0 ? (
              <div className="text-center py-20 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
                <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                  <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">No scholarships found</h3>
                <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">Try adjusting your search terms or filters to find what you're looking for</p>
                <button
                  onClick={resetFilters}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center backdrop-blur-sm border border-white/20"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Scholarships Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {currentScholarships.map((scholarship) => (
                    <div
                      key={scholarship._id}
                      className="group bg-black/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/10 hover:border-white/30 hover:-translate-y-2"
                    >
                      {/* University Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={scholarship.universityImage}
                          alt={scholarship.universityName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        {/* Application Fee Badge */}
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-4 py-2 rounded-full font-bold text-sm shadow-xl backdrop-blur-sm ${
                              scholarship.applicationFees === 0 ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {scholarship.applicationFees === 0 ? "FREE APPLICATION" : `$${scholarship.applicationFees} FEE`}
                          </span>
                        </div>

                        {/* World Rank Badge */}
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-white/20">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-bold">World Rank #{scholarship.universityWorldRank}</span>
                          </div>
                        </div>
                      </div>

                      {/* Scholarship Info */}
                      <div className="p-7">
                        {/* Category Badge */}
                        <div className="mb-4">
                          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider border border-white/20">
                            {scholarship.scholarshipCategory}
                          </span>
                        </div>

                        {/* University Name */}
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-white transition-colors">{scholarship.universityName}</h3>

                        {/* Scholarship Name */}
                        <h4 className="text-lg font-semibold text-white/90 mb-4 line-clamp-2 h-14">{scholarship.scholarshipName}</h4>

                        {/* Details Grid - Two Column Layout */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="space-y-3">
                            <div className="flex items-center text-white/70">
                              <svg className="w-5 h-5 mr-3 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div>
                                <p className="text-xs text-white/50">Location</p>
                                <p className="font-medium text-sm text-white">{scholarship.universityCity}</p>
                              </div>
                            </div>

                            <div className="flex items-center text-white/70">
                              <svg className="w-5 h-5 mr-3 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                              </svg>
                              <div>
                                <p className="text-xs text-white/50">Degree</p>
                                <p className="font-medium text-sm text-white">{scholarship.degree}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center text-white/70">
                              <svg className="w-5 h-5 mr-3 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                              </svg>
                              <div>
                                <p className="text-xs text-white/50">Subject</p>
                                <p className="font-medium text-sm text-white">{scholarship.subjectCategory}</p>
                              </div>
                            </div>

                            <div className="flex items-center text-white/70">
                              <svg className="w-5 h-5 mr-3 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <div>
                                <p className="text-xs text-white/50">Tuition</p>
                                <p className="font-medium text-sm text-white">${scholarship.tuitionFees?.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Deadline Info */}
                        <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-white/50 font-medium">Application Deadline</p>
                              <p className="font-bold text-white">
                                {new Date(scholarship.applicationDeadline).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* View Details Button */}
                        <button
                          onClick={() => handleViewDetails(scholarship._id)}
                          className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group/btn backdrop-blur-sm border border-white/20"
                        >
                          <span>View Details</span>
                          <svg className="w-5 h-5 ml-3 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                      <div className="text-white">
                        <p className="font-semibold text-lg">
                          Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
                        </p>
                        <p className="text-white/50 text-sm mt-1">
                          {startIndex + 1}-{Math.min(endIndex, filteredScholarships.length)} of {filteredScholarships.length} scholarships
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center backdrop-blur-sm ${
                            currentPage === 1
                              ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"
                              : "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30"
                          }`}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Previous
                        </button>

                        <div className="flex space-x-2">
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
                                className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm ${
                                  currentPage === pageNum
                                    ? "bg-white text-black shadow-lg scale-105 border border-white"
                                    : "bg-white/10 border border-white/20 text-white hover:border-white/30 hover:bg-white/20"
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
                          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center backdrop-blur-sm ${
                            currentPage === totalPages
                              ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"
                              : "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30"
                          }`}
                        >
                          Next
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
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
