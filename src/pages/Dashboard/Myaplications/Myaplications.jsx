import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaFileAlt, FaEye, FaEdit, FaTrash, FaDollarSign, FaStar, FaTimes, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { number } from "framer-motion";
import Swal from "sweetalert2";

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
    //
  };

  const handleDelete = async (id) => {
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
        axiosSecure.delete(`/applications?id=${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handlePay = (application) => {
    axiosSecure.post(`/create-checkout-session`, application).then((res) => {
      window.location.href = res.data.url;
    });
  };

  const onSubmitReview = (data) => {
    axiosSecure
      .post("/reviews", {
        scholarshipId: selectedApp.scholarshipId,
        universityName: selectedApp.universityName,
        ratingPoint: parseInt(data.rating),
        userName: user.displayName,
        scholarshipName: selectedApp.scholarshipName,
        reviewComment: data.comment,
        userImage: user.photoURL,
        userEmail: user.email,
      })
      .then((res) => {
        if (res.data.insertedId) {
          console.log(res.data);
          Swal.fire({
            title: "Review Added",
            icon: "success",
          });
          setShowReview(false);
          reset();
        }
      });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  const truncateText = (text, maxLength = 30) => {
    if (!text) return "N/A";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

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

        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-900">
                <tr>
                  <th>#</th>
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
                  applications.map((app, index) => (
                    <tr key={app._id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                      <td>
                        <span className="pl-2"> {index + 1}.</span>
                      </td>

                      <td className="p-4">
                        <p className="font-medium">{app.universityName || "N/A"}</p>
                      </td>

                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">{truncateText(app.universityCountry || "Address not provided", 40)}</p>
                        </div>
                      </td>

                      <td className="p-4">
                        <p className="text-sm text-gray-300">{truncateText(app.feedback || "No feedback yet", 30)}</p>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-1 bg-gray-700/50 rounded text-sm">{app.subjectCategory || "Science"}</span>
                      </td>

                      <td className="p-4">
                        <p className="font-medium">${app.applicationFees || 0}</p>
                      </td>

                      <td className="p-4">
                        <div className="mt-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.applicationStatus)}`}>{app.applicationStatus || "pending"}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => handleViewDetails(app)} className="p-2 bg-blue-900/30 rounded-lg hover:bg-blue-900/50 transition-colors" title="View Details">
                            <FaEye className="text-blue-300" />
                          </button>

                          {app.applicationStatus === "pending" && (
                            <button onClick={() => handleEdit(app._id)} className="p-2 bg-yellow-900/30 rounded-lg hover:bg-yellow-900/50 transition-colors" title="Edit Application">
                              <FaEdit className="text-yellow-300" />
                            </button>
                          )}

                          {app.applicationStatus === "pending" && app.paymentStatus === "unpaid" && (
                            <button onClick={() => handlePay(app)} className="p-2 bg-green-900/30 rounded-lg hover:bg-green-900/50 transition-colors" title="Pay Now">
                              <FaDollarSign className="text-green-300" />
                            </button>
                          )}

                          {app.applicationStatus === "pending" && (
                            <button onClick={() => handleDelete(app._id)} className="p-2 bg-red-900/30 rounded-lg hover:bg-red-900/50 transition-colors" title="Delete Application">
                              <FaTrash className="text-red-300" />
                            </button>
                          )}

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

        {selectedApp && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl w-full max-w-4xl border border-gray-700 max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-800 flex justify-between items-center p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold">Application Details</h2>
                <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <FaTimes />
                </button>
              </div>

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
