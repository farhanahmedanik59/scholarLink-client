import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaTag,
  FaDollarSign,
  FaCalendarAlt,
  FaGlobe,
  FaStar,
  FaUserGraduate,
  FaClock,
  FaBook,
  FaMoneyBillWave,
  FaShieldAlt,
  FaPaperPlane,
  FaChevronRight,
  FaHeart,
  FaShare,
  FaPrint,
  FaCheckCircle,
  FaUsers,
  FaAward,
  FaComment,
  FaPercentage,
  FaExclamationTriangle,
  FaInfoCircle,
  FaUser,
  FaCalendar,
  FaStarHalfAlt,
  FaEnvelope,
  FaRegStar,
  FaStarHalf,
  FaThumbsUp,
} from "react-icons/fa";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [selectedTab, setSelectedTab] = useState("overview");

  // Fetch scholarship details with the new structure
  const {
    data: responseData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data; // This will return { scholarship: {...}, reviewData: {...} }
    },
  });

  // Extract scholarship and review data from response
  const scholarship = responseData.scholarship || {};
  const reviewData = responseData.reviewData || {};

  // Create reviews array from reviewData
  const reviews = reviewData._id ? [reviewData] : [];

  // Calculate days remaining until deadline
  const calculateDaysRemaining = (deadline) => {
    if (!deadline) return 0;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format date for review (relative or absolute)
  const formatReviewDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400 text-lg" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="text-yellow-400 text-lg" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-600 text-lg" />);
    }

    return stars;
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400 text-lg">Loading scholarship details...</p>
        </div>
      </div>
    );

  if (isError || !scholarship._id)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-5xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-3">Scholarship Not Found</h2>
          <p className="text-gray-400 mb-6">The scholarship you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate("/scholarships")} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
            Browse Scholarships
          </button>
        </div>
      </div>
    );

  const daysRemaining = calculateDaysRemaining(scholarship.applicationDeadline);
  const totalCost = scholarship.tuitionFees + scholarship.applicationFees + scholarship.serviceCharge;
  const isDeadlinePassed = daysRemaining === 0;
  const isPartialScholarship = scholarship.scholarshipCategory?.toLowerCase().includes("partial");
  const isDeadlineSoon = daysRemaining > 0 && daysRemaining <= 30;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center text-sm text-gray-400">
            <li>
              <button onClick={() => navigate("/")} className="hover:text-white transition-colors">
                Home
              </button>
            </li>
            <li className="mx-2">
              <FaChevronRight className="text-xs" />
            </li>
            <li>
              <button onClick={() => navigate("/scholarships")} className="hover:text-white transition-colors">
                Scholarships
              </button>
            </li>
            <li className="mx-2">
              <FaChevronRight className="text-xs" />
            </li>
            <li className="text-white truncate max-w-xs">{scholarship.scholarshipName}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Scholarship Type Alert */}
            {isPartialScholarship && (
              <div className="mb-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <FaPercentage className="text-amber-400 text-xl" />
                  <div>
                    <h4 className="text-amber-300 font-bold">Partial Scholarship</h4>
                    <p className="text-amber-200/80 text-sm">This scholarship covers part of the tuition fees. Additional funding may be required.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Deadline Alert */}
            {isDeadlineSoon && (
              <div className="mb-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-amber-400 text-xl" />
                    <div>
                      <h4 className="text-amber-300 font-bold">Deadline Approaching!</h4>
                      <p className="text-amber-200/80 text-sm">Apply within {daysRemaining} days before the application closes.</p>
                    </div>
                  </div>
                  <span className="text-amber-300 font-bold animate-pulse">{daysRemaining} days left</span>
                </div>
              </div>
            )}

            {/* Scholarship Header Card */}
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* University Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-gray-700 flex items-center justify-center">
                    {scholarship.universityImage ? (
                      <img
                        src={scholarship.universityImage}
                        alt={scholarship.universityName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = '<FaUniversity class="text-5xl text-blue-400" />';
                        }}
                      />
                    ) : (
                      <FaUniversity className="text-5xl text-blue-400" />
                    )}
                  </div>
                  {/* World Rank Badge */}
                  <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-700/30 rounded-full px-4 py-2">
                    <FaAward className="text-yellow-400" />
                    <span className="text-white font-medium">World Rank: #{scholarship.universityWorldRank}</span>
                  </div>
                </div>

                {/* Scholarship Info */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{scholarship.scholarshipName}</h1>
                      <div className="flex items-center gap-4 text-gray-300">
                        <div className="flex items-center gap-2">
                          <FaUniversity className="text-blue-400" />
                          <span className="text-lg">{scholarship.universityName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-400" />
                          <span>
                            {scholarship.universityCity}, {scholarship.universityCountry}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                        <FaHeart />
                      </button>
                      <button className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                        <FaShare />
                      </button>
                      <button className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                        <FaPrint />
                      </button>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <FaGraduationCap />
                        <span>Degree</span>
                      </div>
                      <p className="text-white font-semibold">{scholarship.degree}</p>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <FaTag />
                        <span>Category</span>
                      </div>
                      <p className={`font-semibold ${scholarship.scholarshipCategory?.toLowerCase() === "full fund" ? "text-green-400" : "text-amber-400"}`}>{scholarship.scholarshipCategory}</p>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <FaBook />
                        <span>Subject</span>
                      </div>
                      <p className="text-white font-semibold">{scholarship.subjectCategory}</p>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <FaCalendarAlt />
                        <span>Deadline</span>
                      </div>
                      <p className={`font-semibold ${isDeadlinePassed ? "text-red-400" : "text-white"}`}>{formatDate(scholarship.applicationDeadline)}</p>
                    </div>
                  </div>

                  {/* Status Alert */}
                  <div className={`mb-6 p-4 rounded-xl ${isDeadlinePassed ? "bg-red-900/20 border-red-700/30" : "bg-blue-900/20 border-blue-700/30"} border`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FaClock className={isDeadlinePassed ? "text-red-400" : "text-blue-400"} />
                        <div>
                          <p className={`font-medium ${isDeadlinePassed ? "text-red-300" : "text-white"}`}>{isDeadlinePassed ? "Application Closed" : `${daysRemaining} Days Remaining`}</p>
                          <p className="text-gray-400 text-sm">Application deadline: {formatDate(scholarship.applicationDeadline)}</p>
                        </div>
                      </div>
                      {!isDeadlinePassed && <span className="text-green-400 font-semibold">OPEN</span>}
                    </div>
                  </div>

                  {/* Quick Apply Button */}
                  <button
                    onClick={() => navigate(`/checkout/${scholarship._id}`)}
                    disabled={isDeadlinePassed}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                      isDeadlinePassed
                        ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                    }`}
                  >
                    <FaPaperPlane />
                    {isDeadlinePassed ? "Applications Closed" : "Apply for Scholarship"}
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl backdrop-blur-xl mb-8">
              <div className="flex border-b border-gray-700 overflow-x-auto">
                {["overview", "coverage", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`flex-1 min-w-[120px] py-4 text-center font-medium transition-colors whitespace-nowrap ${
                      selectedTab === tab ? "text-white border-b-2 border-blue-500" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {selectedTab === "overview" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Scholarship Overview</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The {scholarship.scholarshipName} at {scholarship.universityName} is a prestigious {scholarship.scholarshipCategory.toLowerCase()} scholarship designed for outstanding students
                      pursuing {scholarship.degree.toLowerCase()} degrees in {scholarship.subjectCategory}. Located in {scholarship.universityCity}, {scholarship.universityCountry}, this opportunity
                      provides access to world-class education at one of the top-ranked universities globally.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-white">University Highlights</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-300">
                            <FaCheckCircle className="text-green-400" />
                            World Rank: #{scholarship.universityWorldRank}
                          </li>
                          <li className="flex items-center gap-2 text-gray-300">
                            <FaCheckCircle className="text-green-400" />
                            Located in {scholarship.universityCity}, {scholarship.universityCountry}
                          </li>
                          <li className="flex items-center gap-2 text-gray-300">
                            <FaCheckCircle className="text-green-400" />
                            Prestigious institution with global recognition
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-white">Quick Facts</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-300">
                            <FaCheckCircle className="text-green-400" />
                            Posted: {formatDate(scholarship.scholarshipPostDate)}
                          </li>
                          <li className="flex items-center gap-2 text-gray-300">
                            <FaCheckCircle className="text-green-400" />
                            Verified by: {scholarship.postedUserEmail}
                          </li>
                          <li className="flex items-center gap-2 text-gray-300">
                            <FaCheckCircle className="text-green-400" />
                            Service charge: ${scholarship.serviceCharge}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "coverage" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Financial Coverage Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Financial Coverage */}
                      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-700/30 rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <FaMoneyBillWave className="text-green-400" />
                          Scholarship Benefits
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center py-2 border-b border-gray-700/50">
                            <span className="text-gray-300">Tuition Coverage</span>
                            <span className={`font-bold ${scholarship.scholarshipCategory?.toLowerCase() === "full fund" ? "text-green-400" : "text-amber-400"}`}>
                              {scholarship.scholarshipCategory === "Full fund" ? "100%" : "Partial (30-70%)"}
                            </span>
                          </li>
                          <li className="flex justify-between items-center py-2 border-b border-gray-700/50">
                            <span className="text-gray-300">Annual Tuition</span>
                            <span className="text-white font-bold">${scholarship.tuitionFees.toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between items-center py-2 border-b border-gray-700/50">
                            <span className="text-gray-300">Monthly Stipend</span>
                            <span className="text-white font-bold">{scholarship.scholarshipCategory === "Full fund" ? "$1,200-$1,800" : "Not Included"}</span>
                          </li>
                          <li className="flex justify-between items-center py-2 border-b border-gray-700/50">
                            <span className="text-gray-300">Accommodation</span>
                            <span className="text-white font-bold">{scholarship.scholarshipCategory === "Full fund" ? "Fully Covered" : "Self-arranged"}</span>
                          </li>
                          <li className="flex justify-between items-center py-2">
                            <span className="text-gray-300">Health Insurance</span>
                            <span className="text-white font-bold">{scholarship.scholarshipCategory === "Full fund" ? "Included" : "Not Included"}</span>
                          </li>
                        </ul>
                      </div>

                      {/* Additional Information */}
                      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-700/30 rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <FaShieldAlt className="text-blue-400" />
                          Additional Information
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 py-2">
                            <FaCheckCircle className="text-green-400" />
                            <span className="text-gray-300">Application fee: ${scholarship.applicationFees}</span>
                          </li>
                          <li className="flex items-center gap-3 py-2">
                            <FaCheckCircle className="text-green-400" />
                            <span className="text-gray-300">Service charge: ${scholarship.serviceCharge}</span>
                          </li>
                          <li className="flex items-center gap-3 py-2">
                            <FaCheckCircle className="text-green-400" />
                            <span className="text-gray-300">Travel allowance: Case by case basis</span>
                          </li>
                          <li className="flex items-center gap-3 py-2">
                            <FaCheckCircle className="text-green-400" />
                            <span className="text-gray-300">Visa support: Provided</span>
                          </li>
                          <li className="flex items-center gap-3 py-2">
                            <FaCheckCircle className="text-green-400" />
                            <span className="text-gray-300">Research support: Available for eligible candidates</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white">Student Reviews</h3>
                        <p className="text-gray-400 text-sm mt-1">Real feedback from students who have applied for this scholarship</p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                        <FaComment />
                        Write a Review
                      </button>
                    </div>

                    {/* Reviews from Database */}
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review._id} className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-700/30 rounded-2xl p-6">
                            {/* Review Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  {review.userImage ? (
                                    <img
                                      src={review.userImage}
                                      alt={review.userName}
                                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/30"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.parentElement.innerHTML = `
                                          <div class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl border-2 border-blue-500/30">
                                            ${review.userName ? review.userName.charAt(0) : "U"}
                                          </div>
                                        `;
                                      }}
                                    />
                                  ) : (
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl border-2 border-blue-500/30">
                                      {review.userName ? review.userName.charAt(0) : "U"}
                                    </div>
                                  )}
                                  {/* Verified Badge */}
                                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-gray-900">
                                    <FaCheckCircle className="text-white text-xs" />
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-white font-bold text-lg">{review.userName || "Anonymous User"}</h4>
                                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                    <FaEnvelope className="text-xs" />
                                    <span className="truncate max-w-[200px]">{review.userEmail || "No email provided"}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                    <FaCalendar className="text-xs" />
                                    <span>{formatReviewDate(review.reviewDate)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Rating */}
                              <div className="flex flex-col items-end">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">{renderStars(review.ratingPoint || 0)}</div>
                                  <span className="text-yellow-400 font-bold text-lg">{review.ratingPoint?.toFixed(1) || "0.0"}</span>
                                </div>
                                <div className="mt-2 inline-flex items-center gap-1 bg-blue-900/30 border border-blue-700/30 rounded-full px-3 py-1">
                                  <FaUniversity className="text-blue-400 text-xs" />
                                  <span className="text-blue-300 text-xs font-medium">{review.universityName}</span>
                                </div>
                              </div>
                            </div>

                            {/* Review Comment */}
                            <div className="mb-4">
                              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{review.reviewComment || "No comment provided."}</p>
                            </div>

                            {/* Review Actions & Info */}
                            <div className="flex items-center justify-between pt-4 border-t border-blue-700/30">
                              <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                                  <FaThumbsUp />
                                  <span className="text-sm">Helpful</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                                  <FaComment />
                                  <span className="text-sm">Reply</span>
                                </button>
                              </div>
                              <div className="text-gray-400 text-sm">
                                Scholarship ID: <span className="text-blue-300 font-mono">{review.scholarshipId?.substring(0, 8)}...</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Review Summary */}
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                          <h4 className="text-xl font-bold text-white mb-4">Review Summary</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                              <div className="text-3xl font-bold text-blue-400 mb-1">{reviews.length}</div>
                              <p className="text-gray-300 text-sm">Total Reviews</p>
                            </div>
                            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                              <div className="text-3xl font-bold text-yellow-400 mb-1">{reviews.reduce((acc, review) => acc + (review.ratingPoint || 0), 0) / reviews.length || 0}</div>
                              <p className="text-gray-300 text-sm">Average Rating</p>
                            </div>
                            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                              <div className="text-3xl font-bold text-green-400 mb-1">{reviews.filter((r) => r.ratingPoint === 5).length}</div>
                              <p className="text-gray-300 text-sm">5-Star Reviews</p>
                            </div>
                            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                              <div className="text-3xl font-bold text-cyan-400 mb-1">{formatDate(reviews[0]?.reviewDate)}</div>
                              <p className="text-gray-300 text-sm">Latest Review</p>
                            </div>
                          </div>

                          {/* Rating Distribution */}
                          <div className="mt-6">
                            <h5 className="text-white font-bold mb-3">Rating Distribution</h5>
                            <div className="space-y-2">
                              {[5, 4, 3, 2, 1].map((star) => {
                                const count = reviews.filter((r) => Math.round(r.ratingPoint) === star).length;
                                const percentage = (count / reviews.length) * 100;
                                return (
                                  <div key={star} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-20">
                                      <span className="text-gray-400 text-sm">{star}</span>
                                      <FaStar className="text-yellow-400" />
                                    </div>
                                    <div className="flex-grow bg-gray-700 rounded-full h-2">
                                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                    </div>
                                    <span className="text-gray-400 text-sm w-10 text-right">{count}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-5xl mb-4">💬</div>
                        <h4 className="text-white text-xl font-bold mb-2">No Reviews Yet</h4>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                          Be the first to share your experience with this scholarship. Your review could help other students make informed decisions.
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                          <FaComment />
                          Submit Your Review
                        </button>
                      </div>
                    )}

                    {/* Review Guidelines */}
                    <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-700/30 rounded-2xl p-6">
                      <h4 className="text-xl font-bold text-white mb-4">Review Guidelines</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span>Share your personal experience with the scholarship application process</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span>Be honest and objective about the scholarship benefits and requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span>Include helpful tips for future applicants</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span>Respect the privacy of others and avoid sharing personal information</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Application Fees Card */}
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl mb-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaDollarSign className="text-green-400" />
                Application Costs
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <FaUniversity className="text-gray-400" />
                    <span className="text-gray-300">Annual Tuition</span>
                  </div>
                  <span className="text-white font-bold">${scholarship.tuitionFees.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <FaPaperPlane className="text-gray-400" />
                    <span className="text-gray-300">Application Fee</span>
                  </div>
                  <span className="text-white font-bold">${scholarship.applicationFees}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-gray-400" />
                    <span className="text-gray-300">Service Charge</span>
                  </div>
                  <span className="text-white font-bold">${scholarship.serviceCharge}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-blue-500/50 border-dashed">
                  <span className="text-gray-300 font-medium">Total to Pay Now</span>
                  <span className="text-white font-bold">${(scholarship.applicationFees + scholarship.serviceCharge).toLocaleString()}</span>
                </div>

                <div className="pt-4">
                  <p className="text-gray-400 text-sm mb-4">
                    *Service charge covers application review, document verification, and processing support. Tuition fees are paid directly to the university upon acceptance.
                  </p>
                  <button
                    onClick={() => navigate(`/checkout/${scholarship._id}`)}
                    disabled={isDeadlinePassed}
                    className={`w-full py-4 rounded-xl font-bold text-lg ${
                      isDeadlinePassed
                        ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25"
                    } transition-all duration-300`}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>

            {/* Review Summary Card */}
            {reviews.length > 0 && (
              <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-700/30 rounded-2xl p-6 mb-6">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  Student Rating
                </h4>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-yellow-400 mb-2">{reviews.reduce((acc, review) => acc + (review.ratingPoint || 0), 0) / reviews.length || 0}</div>
                  <div className="flex justify-center mb-2">{renderStars(reviews.reduce((acc, review) => acc + (review.ratingPoint || 0), 0) / reviews.length || 0)}</div>
                  <p className="text-gray-400 text-sm">
                    Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="space-y-2">
                  {reviews.slice(0, 1).map((review) => (
                    <div key={review._id} className="text-center">
                      <p className="text-gray-300 text-sm italic">"{review.reviewComment?.substring(0, 100)}..."</p>
                      <p className="text-gray-400 text-sm mt-2">- {review.userName}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact & Stats Card */}
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl mb-6">
              <h3 className="text-xl font-bold text-white mb-6">Scholarship Statistics</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-blue-400" />
                    <span className="text-gray-300">Applicants This Year</span>
                  </div>
                  <span className="text-white font-bold">{scholarship.scholarshipCategory === "Full fund" ? "1,200+" : "800+"}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaAward className="text-yellow-400" />
                    <span className="text-gray-300">Available Awards</span>
                  </div>
                  <span className="text-white font-bold">{scholarship.scholarshipCategory === "Full fund" ? "10-20" : "25-40"}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaUserGraduate className="text-green-400" />
                    <span className="text-gray-300">Success Rate</span>
                  </div>
                  <span className="text-green-400 font-bold">{scholarship.scholarshipCategory === "Full fund" ? "2-5%" : "5-10%"}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-white font-bold mb-4">Need Help?</h4>
                <p className="text-gray-400 text-sm mb-4">Our scholarship advisors are available to assist with your application.</p>
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">Contact Advisor</button>
              </div>
            </div>

            {/* Important Dates Card */}
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-700/30 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-4">Important Dates</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-blue-700/30">
                  <span className="text-gray-300">Application Opens</span>
                  <span className="text-white font-medium">Today</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-blue-700/30">
                  <span className="text-gray-300">Deadline</span>
                  <span className="text-white font-medium">{formatDate(scholarship.applicationDeadline)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-blue-700/30">
                  <span className="text-gray-300">Results Announcement</span>
                  <span className="text-white font-medium">{formatDate(new Date(new Date(scholarship.applicationDeadline).getTime() + 60 * 24 * 60 * 60 * 1000))}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-300">Program Start</span>
                  <span className="text-white font-medium">{formatDate(new Date(new Date(scholarship.applicationDeadline).getTime() + 120 * 24 * 60 * 60 * 1000))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
