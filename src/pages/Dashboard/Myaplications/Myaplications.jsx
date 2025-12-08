import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaFileAlt, FaEye, FaEdit, FaTrash, FaDollarSign, FaStar, FaTimes, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const MyApplications = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const [showReview, setShowReview] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myApplications"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/applications?email=${user.email}`);
      return response.data;
    },
  });

  const handleViewDetails = (application) => {
    setSelectedApp(application);
  };

  const handleEdit = async (id) => {
    alert(`Edit application ${id} - This would open edit form`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await axiosSecure.delete(`/applications/${id}`);
      alert("Deleted successfully");
      refetch();
    } catch (error) {
      alert("Delete failed");
    }
  };

  // Handle payment
  const handlePay = (application) => {
    console.log(application);
    axiosSecure.post(`/create-checkout-session`, application);
  };

  // Handle review submission
  const onSubmitReview = async (data) => {
    try {
      await axiosSecure.post("/reviews", {
        applicationId: selectedApp._id,
        rating: data.rating,
        comment: data.comment,
      });
      alert("Review submitted");
      setSelectedApp(null);
      setShowReview(false);
      reset();
      refetch();
    } catch (error) {
      alert("Failed to submit review");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-900/30 text-yellow-300",
      approved: "bg-green-900/30 text-green-300",
      rejected: "bg-red-900/30 text-red-300",
      completed: "bg-blue-900/30 text-blue-300",
      "in review": "bg-purple-900/30 text-purple-300",
    };
    return colors[status] || "bg-gray-700/30 text-gray-300";
  };

  // Truncate text for table display
  const truncateText = (text, maxLength = 30) => {
    if (!text) return "N/A";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading applications...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-2">Failed to load applications</p>
          <button onClick={() => refetch()} className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-blue-600 rounded-xl">
              <FaFileAlt className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">My Applications</h1>
              <p className="text-gray-400">Total applications: {applications.length}</p>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-4 text-left font-semibold">University Name</th>
                  <th className="p-4 text-left font-semibold">University Address</th>
                  <th className="p-4 text-left font-semibold">Feedback</th>
                  <th className="p-4 text-left font-semibold">Subject Category</th>
                  <th className="p-4 text-left font-semibold">Application Fees</th>
                  <th className="p-4 text-left font-semibold">Application Status</th>
                  <th className="p-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center">
                      <p className="text-gray-400">No applications found. Start applying for scholarships!</p>
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app._id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                      {/* University Name */}
                      <td className="p-4">
                        <p className="font-medium">{app.universityName || "N/A"}</p>
                      </td>

                      {/* University Address */}
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">{truncateText(app.universityAddress || "Address not provided", 40)}</p>
                        </div>
                      </td>

                      {/* Feedback */}
                      <td className="p-4">
                        <p className="text-sm text-gray-300">{truncateText(app.feedback || "No feedback yet", 30)}</p>
                      </td>

                      {/* Subject Category */}
                      <td className="p-4">
                        <span className="px-2 py-1 bg-gray-700/50 rounded text-sm">{app.subjectCategory || "Science"}</span>
                      </td>

                      {/* Application Fees */}
                      <td className="p-4">
                        <p className="font-medium">${app.applicationFees || 0}</p>
                      </td>

                      {/* Application Status */}
                      <td className="p-4">
                        <div className="mt-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.applicationStatus)}`}>{app.applicationStatus || "pending"}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {/* Details Button - Always visible */}
                          <button onClick={() => handleViewDetails(app)} className="p-2 bg-blue-900/30 rounded-lg hover:bg-blue-900/50 transition-colors" title="View Details">
                            <FaEye className="text-blue-300" />
                          </button>

                          {/* Edit Button - Only for pending */}
                          {app.applicationStatus === "pending" && (
                            <button onClick={() => handleEdit(app._id)} className="p-2 bg-yellow-900/30 rounded-lg hover:bg-yellow-900/50 transition-colors" title="Edit Application">
                              <FaEdit className="text-yellow-300" />
                            </button>
                          )}

                          {/* Pay Button - Only for pending & unpaid */}
                          {app.applicationStatus === "pending" && app.paymentStatus === "unpaid" && (
                            <button onClick={() => handlePay(app)} className="p-2 bg-green-900/30 rounded-lg hover:bg-green-900/50 transition-colors" title="Pay Now">
                              <FaDollarSign className="text-green-300" />
                            </button>
                          )}

                          {/* Delete Button - Only for pending */}
                          {app.applicationStatus === "pending" && (
                            <button onClick={() => handleDelete(app._id)} className="p-2 bg-red-900/30 rounded-lg hover:bg-red-900/50 transition-colors" title="Delete Application">
                              <FaTrash className="text-red-300" />
                            </button>
                          )}

                          {/* Add Review Button - Only for completed */}
                          {app.applicationStatus === "completed" && (
                            <button
                              onClick={() => {
                                setSelectedApp(app);
                                setShowReview(true);
                              }}
                              className="p-2 bg-purple-900/30 rounded-lg hover:bg-purple-900/50 transition-colors"
                              title="Add Review"
                            >
                              <FaStar className="text-purple-300" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl w-full max-w-4xl border border-gray-700 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gray-800 flex justify-between items-center p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold">Application Details</h2>
                <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <FaTimes />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailItem label="University Name" value={selectedApp.universityName} />
                  <DetailItem label="Degree Program" value={selectedApp.degree} />
                  <DetailItem label="Application Fee" value={`$${selectedApp.applicationFees}`} />
                  <DetailItem label="Service Charge" value={`$${selectedApp.serviceCharge}`} />
                  <DetailItem label="Total Amount" value={`$${selectedApp.applicationFees + selectedApp.serviceCharge}`} />
                  <DetailItem label="Application Status" value={selectedApp.applicationStatus} />
                  <DetailItem label="Payment Status" value={selectedApp.paymentStatus} />
                  <DetailItem label="Applied Date" value={formatDate(selectedApp.applicationDate)} />
                </div>

                <DetailItem label="Feedback from Moderator" value={selectedApp.feedback || "No feedback provided yet."} isMultiline />

                <div className="pt-6 border-t border-gray-700">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Application ID</p>
                      <p className="text-gray-300 font-mono text-sm">{selectedApp._id}</p>
                    </div>

                    <div className="flex gap-3">
                      {selectedApp.applicationStatus === "pending" && selectedApp.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => {
                            handlePay(selectedApp);
                            setSelectedApp(null);
                          }}
                          className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                        >
                          <FaDollarSign />
                          Pay Now
                        </button>
                      )}

                      {selectedApp.applicationStatus === "pending" && (
                        <>
                          <button onClick={() => handleEdit(selectedApp._id)} className="px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 flex items-center gap-2 transition-colors">
                            <FaEdit />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(selectedApp._id);
                              setSelectedApp(null);
                            }}
                            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </>
                      )}

                      {selectedApp.applicationStatus === "completed" && (
                        <button
                          onClick={() => {
                            setShowReview(true);
                          }}
                          className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors"
                        >
                          <FaStar />
                          Add Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {showReview && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl w-full max-w-md border border-gray-700">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold">Add Your Review</h2>
                <button
                  onClick={() => {
                    setShowReview(false);
                    reset();
                  }}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmitReview)} className="p-6 space-y-6">
                <div>
                  <label className="block mb-3 text-gray-300 font-medium">Rating</label>
                  <select {...register("rating", { required: "Please select a rating" })} className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none">
                    <option value="">Select a rating (1-5 stars)</option>
                    <option value="1">⭐ - Poor</option>
                    <option value="2">⭐⭐ - Fair</option>
                    <option value="3">⭐⭐⭐ - Good</option>
                    <option value="4">⭐⭐⭐⭐ - Very Good</option>
                    <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-3 text-gray-300 font-medium">Your Comment</label>
                  <textarea
                    {...register("comment", {
                      required: "Please write a comment",
                      minLength: {
                        value: 10,
                        message: "Comment should be at least 10 characters",
                      },
                    })}
                    rows="4"
                    className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Share your experience with this scholarship application process..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReview(false);
                      reset();
                    }}
                    className="flex-1 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 p-3 bg-purple-600 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 transition-colors">
                    <FaPaperPlane />
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ label, value, isMultiline = false }) => (
  <div>
    <p className="text-gray-400 text-sm mb-2 font-medium">{label}</p>
    {isMultiline ? (
      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
        <p className="text-gray-300 whitespace-pre-wrap">{value}</p>
      </div>
    ) : (
      <p className="text-white font-medium">{value}</p>
    )}
  </div>
);

export default MyApplications;
