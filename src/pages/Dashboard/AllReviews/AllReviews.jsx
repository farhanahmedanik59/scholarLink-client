import React, { useState } from "react";
import { FaStar, FaTrash, FaUser, FaEnvelope, FaUniversity, FaCalendarAlt, FaSearch, FaFilter, FaTimesCircle, FaComment } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const response = await axiosSecure.get("/all/reviews");
      return response.data;
    },
  });

  const uniqueUniversities = [...new Set(reviews.map((review) => review.universityName))];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewComment?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUniversity = universityFilter === "all" || review.universityName === universityFilter;

    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "5" && review.ratingPoint === 5) ||
      (ratingFilter === "4" && review.ratingPoint >= 4 && review.ratingPoint < 5) ||
      (ratingFilter === "3" && review.ratingPoint >= 3 && review.ratingPoint < 4) ||
      (ratingFilter === "2" && review.ratingPoint >= 2 && review.ratingPoint < 3) ||
      (ratingFilter === "1" && review.ratingPoint === 1);

    return matchesSearch && matchesUniversity && matchesRating;
  });

  const handleDeleteConfirm = async (review) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`all/reviews/${review._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
    try {
      setShowDeleteModal(false);
      setReviewToDelete(null);
      refetch();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className={`text-sm ${index < rating ? "text-yellow-400" : "text-gray-600"}`} />
        ))}
      </div>
    );
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading all reviews...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <FaTimesCircle className="text-4xl text-red-400 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Failed to load reviews</p>
          <button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Reviews</h1>
          <p className="text-gray-400">Total: {reviews.length} reviews from students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Reviews</p>
                <p className="text-2xl font-bold">{reviews.length}</p>
              </div>
              <div className="p-2 bg-blue-900/30 rounded-lg border border-blue-700/50">
                <FaComment className="text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Rating</p>
                <p className="text-2xl font-bold">{reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.ratingPoint, 0) / reviews.length).toFixed(1) : "0.0"}</p>
              </div>
              <div className="p-2 bg-yellow-900/30 rounded-lg border border-yellow-700/50">
                <FaStar className="text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">5-Star Reviews</p>
                <p className="text-2xl font-bold">{reviews.filter((r) => r.ratingPoint === 5).length}</p>
              </div>
              <div className="p-2 bg-green-900/30 rounded-lg border border-green-700/50">
                <FaStar className="text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Unique Universities</p>
                <p className="text-2xl font-bold">{uniqueUniversities.length}</p>
              </div>
              <div className="p-2 bg-purple-900/30 rounded-lg border border-purple-700/50">
                <FaUniversity className="text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name, email, university, or review..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <FaUniversity className="text-gray-400" />
                <select
                  className="bg-gray-900 border border-gray-700 rounded-lg md:px-3  py-2 text-white focus:outline-none focus:border-blue-500"
                  value={universityFilter}
                  onChange={(e) => setUniversityFilter(e.target.value)}
                >
                  <option value="all">All Universities</option>
                  {uniqueUniversities.map((university) => (
                    <option key={university} value={university}>
                      {university}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <select
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setUniversityFilter("all");
                  setRatingFilter("all");
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Student Name</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Student Email</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">University Name</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Review Comment</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Review Date</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Rating</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review._id} className="border-t border-gray-700 hover:bg-gray-900/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-900/30 border border-blue-700/50 flex items-center justify-center">
                          <FaUser className="text-blue-400" />
                        </div>
                        <span className="text-gray-200">{review.userName}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-400" />
                        <span className="text-gray-300 text-sm">{review.userEmail}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaUniversity className="text-blue-400" />
                        <span className="text-gray-200">{review.universityName}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaComment className="text-blue-400" />
                        <span className="text-gray-300 text-sm max-w-xs truncate">{review.reviewComment}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-400" />
                        <span className="text-gray-300 text-sm">{formatDate(review.reviewDate)}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {renderStars(review.ratingPoint)}
                        <span className={`ml-2 font-bold ${getRatingColor(review.ratingPoint)}`}>{review.ratingPoint}/5</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <button onClick={() => handleDeleteConfirm(review)} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors" title="Delete Review">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white mb-2">No Reviews Found</h3>
            <p className="text-gray-400">No reviews match your search criteria</p>
          </div>
        )}

        <div className="mt-6 text-center text-gray-500 text-sm">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </div>

        {showDeleteModal && reviewToDelete && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/50">
                  <FaTrash className="text-2xl text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Delete Review?</h3>
                <p className="text-gray-400 mb-2">
                  Are you sure you want to delete the review by <span className="text-blue-400">{reviewToDelete.userName}</span>?
                </p>
                <p className="text-gray-400 text-sm">
                  University: {reviewToDelete.universityName}
                  <br />
                  Rating: {reviewToDelete.ratingPoint}/5
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 mb-6 border border-gray-700">
                <p className="text-gray-300 text-sm italic">"{reviewToDelete.reviewComment}"</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
