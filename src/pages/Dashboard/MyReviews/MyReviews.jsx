import React, { useState, useEffect } from "react";
import { FaStar, FaEdit, FaTrash, FaCalendarAlt, FaUniversity, FaAward } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingReview, setEditingReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myReviews"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/reviews?email=${user.email}`);
      return response.data;
    },
  });

  const handleEditClick = (review) => {
    setEditingReview(review);
    setEditRating(review.ratingPoint || 0);
    setEditComment(review.reviewComment || "");
    setShowEditModal(true);
  };

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editRating || editRating < 1) {
      Swal.fire({
        title: "Rating Required!",
        text: "Please select a rating (1-5 stars)",
        icon: "warning",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    if (!editComment.trim()) {
      Swal.fire({
        title: "Comment Required!",
        text: "Please write a review comment",
        icon: "warning",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    try {
      const updatedReview = {
        ratingPoint: editRating,
        reviewComment: editComment.trim(),
      };

      const response = await axiosSecure.patch(`/reviews/${editingReview._id}`, updatedReview);

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Review updated successfully",
          icon: "success",
          confirmButtonColor: "#3B82F6",
        });
        setShowEditModal(false);
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update review",
        icon: "error",
        confirmButtonColor: "#3B82F6",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosSecure.delete(`/all/reviews/${reviewToDelete._id}`);

      if (response.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Review deleted successfully",
          icon: "success",
          confirmButtonColor: "#3B82F6",
        });
        setShowDeleteModal(false);
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete review",
        icon: "error",
        confirmButtonColor: "#3B82F6",
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  const renderEditStars = () => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type="button"
              key={index}
              className="text-2xl transition-transform hover:scale-110"
              onClick={() => setEditRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <FaStar className={`${starValue <= (hoverRating || editRating) ? "text-yellow-400" : "text-gray-600"}`} />
            </button>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-gray-400 mb-4">Failed to load reviews</p>
          <button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                <FaAward className="text-4xl text-gray-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-3">No Reviews Yet</h1>
            <p className="text-gray-400 mb-6">You haven't written any reviews for scholarships yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto mt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
          <p className="text-gray-400">
            You have written {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Scholarship Name</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">University Name</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Review Comment</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Review Date</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Rating</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id} className="border-t border-gray-700 hover:bg-gray-900/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaAward className="text-blue-400" />
                        <span className="text-gray-200">{review.scholarshipName || "N/A"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaUniversity className="text-blue-400" />
                        <span className="text-gray-200">{review.universityName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-gray-300 text-sm max-w-xs truncate">{review.reviewComment}</p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-400" />
                        <span className="text-gray-300">{formatDate(review.reviewDate)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {renderStars(review.ratingPoint)}
                        <span className="text-gray-300 ml-2">{review.ratingPoint}/5</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClick(review)} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors" title="Edit Review">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteClick(review)} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors" title="Delete Review">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showEditModal && editingReview && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Edit Review</h3>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Rating</label>
                  {renderEditStars()}
                  <div className="text-gray-400 text-sm mt-2">Selected: {editRating} / 5 stars</div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Review Comment</label>
                  <textarea className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white" rows="4" onChange={(e) => setEditComment(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                    Update Review
                  </button>
                  <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && reviewToDelete && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/50">
                  <FaTrash className="text-2xl text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Delete Review?</h3>
                <p className="text-gray-400">Are you sure you want to delete your review for {reviewToDelete.universityName}?</p>
              </div>
              <div className="flex gap-3">
                <button onClick={handleDeleteConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Delete
                </button>
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Showing {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
