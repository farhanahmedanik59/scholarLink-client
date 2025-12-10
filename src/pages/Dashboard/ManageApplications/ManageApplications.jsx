import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaUniversity,
  FaComment,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaDollarSign,
  FaCalendarAlt,
  FaDownload,
  FaGlobe,
  FaGraduationCap,
  FaTag,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [feedbackText, setFeedbackText] = useState("");

  // Fetch all applications
  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const response = await axiosSecure.get("/applications");
      return response.data;
    },
  });

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.scholarshipName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.applicationStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleOpenFeedback = (application) => {
    setSelectedApplication(application);
    setFeedbackText(application.feedback || "");
    setShowFeedbackModal(true);
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await axiosSecure.patch(`/applications/${applicationId}`, {
        applicationStatus: newStatus,
      });
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleRejectApplication = async (applicationId) => {
    if (window.confirm("Are you sure you want to reject this application?")) {
      try {
        await axiosSecure.patch(`/applications/${applicationId}`, {
          applicationStatus: "rejected",
        });
        refetch();
      } catch (error) {
        console.error("Error rejecting application:", error);
      }
    }
  };

  const handleSubmitFeedback = async () => {
    if (!selectedApplication) return;

    try {
      await axiosSecure.patch(`/applications/${selectedApplication._id}`, {
        feedback: feedbackText,
      });
      setShowFeedbackModal(false);
      setFeedbackText("");
      refetch();
    } catch (error) {
      console.error("Error submitting feedback:", error);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700/50";
      case "processing":
        return "bg-blue-900/30 text-blue-400 border-blue-700/50";
      case "completed":
        return "bg-green-900/30 text-green-400 border-green-700/50";
      case "rejected":
        return "bg-red-900/30 text-red-400 border-red-700/50";
      default:
        return "bg-gray-700 text-gray-400 border-gray-600";
    }
  };

  const getPaymentBadge = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-900/30 text-green-400 border-green-700/50";
      case "pending":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700/50";
      case "failed":
        return "bg-red-900/30 text-red-400 border-red-700/50";
      default:
        return "bg-gray-700 text-gray-400 border-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-yellow-400" />;
      case "processing":
        return <FaClock className="text-blue-400" />;
      case "completed":
        return <FaCheckCircle className="text-green-400" />;
      case "rejected":
        return <FaTimesCircle className="text-red-400" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <FaTimesCircle className="text-4xl text-red-400 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Failed to load applications</p>
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
          <h1 className="text-3xl font-bold mb-2">Manage Applied Applications</h1>
          <p className="text-gray-400">Total: {applications.length} applications</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, university, or scholarship..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
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
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Applicant Name</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Applicant Email</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">University Name</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Application Feedback</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Application Status</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Payment Status</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app._id} className="border-t border-gray-700 hover:bg-gray-900/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-900/30 border border-blue-700/50 flex items-center justify-center">
                          <FaUser className="text-blue-400" />
                        </div>
                        <span className="text-gray-200">{app.userName}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-400" />
                        <span className="text-gray-300 text-sm">{app.userEmail}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaUniversity className="text-blue-400" />
                        <div>
                          <span className="text-gray-200 block">{app.universityName}</span>
                          <span className="text-gray-400 text-xs">{app.scholarshipName}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FaComment className="text-blue-400" />
                        <span className="text-gray-300 text-sm max-w-xs truncate">{app.feedback || "No feedback yet"}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusBadge(app.applicationStatus)}`}>
                        {getStatusIcon(app.applicationStatus)}
                        <span className="capitalize">{app.applicationStatus}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getPaymentBadge(app.paymentStatus)}`}>
                        <FaDollarSign />
                        <span className="capitalize">{app.paymentStatus}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleViewDetails(app)} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors" title="View Details">
                          <FaEye />
                        </button>

                        <button onClick={() => handleOpenFeedback(app)} className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors" title="Add Feedback">
                          <FaEdit />
                        </button>

                        <select
                          className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
                          value={app.applicationStatus}
                          onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>

                        <button onClick={() => handleRejectApplication(app._id)} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors" title="Reject Application">
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

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-white mb-2">No Applications Found</h3>
            <p className="text-gray-400">No applications match your search criteria</p>
          </div>
        )}

        <div className="mt-6 text-center text-gray-500 text-sm">
          Showing {filteredApplications.length} of {applications.length} applications
        </div>

        {showDetailsModal && selectedApplication && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Application Details</h3>
                <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-lg mb-4 text-blue-400">Applicant Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Name</p>
                      <p className="text-white">{selectedApplication.userName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{selectedApplication.userEmail}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">User ID</p>
                      <p className="text-white font-mono text-sm">{selectedApplication.userId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Application Date</p>
                      <p className="text-white">{formatDate(selectedApplication.applicationDate)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-lg mb-4 text-green-400">Scholarship Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Scholarship Name</p>
                      <p className="text-white">{selectedApplication.scholarshipName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">University</p>
                      <p className="text-white">{selectedApplication.universityName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Country</p>
                      <p className="text-white flex items-center gap-1">
                        <FaGlobe className="text-blue-400" />
                        {selectedApplication.universityCountry}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Scholarship Category</p>
                      <p className={`flex items-center gap-1 ${selectedApplication.scholarshipCategory === "Full fund" ? "text-green-400" : "text-amber-400"}`}>
                        <FaTag />
                        {selectedApplication.scholarshipCategory}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Degree</p>
                      <p className="text-white flex items-center gap-1">
                        <FaGraduationCap className="text-blue-400" />
                        {selectedApplication.degree}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Scholarship ID</p>
                      <p className="text-white font-mono text-sm">{selectedApplication.scholarshipId}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-lg mb-4 text-yellow-400">Application Status & Payment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Application Status</p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusBadge(selectedApplication.applicationStatus)}`}>
                        {getStatusIcon(selectedApplication.applicationStatus)}
                        <span className="capitalize">{selectedApplication.applicationStatus}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Payment Status</p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getPaymentBadge(selectedApplication.paymentStatus)}`}>
                        <FaDollarSign />
                        <span className="capitalize">{selectedApplication.paymentStatus}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Application Fee</p>
                      <p className="text-white">${selectedApplication.applicationFees}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Service Charge</p>
                      <p className="text-white">${selectedApplication.serviceCharge}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Transaction ID</p>
                      <p className="text-white font-mono text-sm break-all">{selectedApplication.tnxId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Paid</p>
                      <p className="text-white font-bold">${(selectedApplication.applicationFees + selectedApplication.serviceCharge).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-lg mb-4 text-purple-400">Feedback</h4>
                  <div className="bg-gray-800 rounded-lg p-4 min-h-[100px]">
                    {selectedApplication.feedback ? <p className="text-gray-300">{selectedApplication.feedback}</p> : <p className="text-gray-500 italic">No feedback provided yet</p>}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end">
                <button onClick={() => setShowDetailsModal(false)} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showFeedbackModal && selectedApplication && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Add Feedback</h3>
                <button onClick={() => setShowFeedbackModal(false)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-300 mb-2">
                  Feedback for <span className="text-blue-400">{selectedApplication.userName}</span>
                </p>
                <p className="text-gray-400 text-sm mb-4">Scholarship: {selectedApplication.scholarshipName}</p>
              </div>

              <textarea
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white mb-6 h-40 focus:outline-none focus:border-blue-500"
                placeholder="Enter your feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />

              <div className="flex gap-3">
                <button onClick={handleSubmitFeedback} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Submit Feedback
                </button>
                <button onClick={() => setShowFeedbackModal(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
