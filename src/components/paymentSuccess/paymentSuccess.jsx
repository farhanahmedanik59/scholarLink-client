import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FaCheckCircle, FaHome, FaFileAlt, FaCheck, FaArrowRight, FaUniversity, FaGraduationCap, FaDollarSign, FaCalendarAlt, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const id = searchParams.get("id");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
    }
  }, [sessionId, axiosSecure]);

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["paymentSuccess", sessionId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/scholarship/${id}/payment`);

      const data = response.data;
      return data;
    },
    enabled: !!sessionId && !!id,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full mb-4">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-300">Your application has been submitted successfully</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <FaGraduationCap className="text-blue-400 text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{scholarship.scholarshipName || "Scholarship"}</h2>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaUniversity className="text-blue-400" />
                    <span>{scholarship.universityName || "University"}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      <FaMapMarkerAlt className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="font-medium">
                        {scholarship.universityCity}, {scholarship.universityCountry}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      <FaGlobe className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">University Rank</p>
                      <p className="font-medium">#{scholarship.universityWorldRank || "N/A"} Worldwide</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      <FaGraduationCap className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Degree</p>
                      <p className="font-medium">{scholarship.degree}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      <FaCalendarAlt className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Application Deadline</p>
                      <p className="font-medium">{formatDate(scholarship.applicationDeadline)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      <FaDollarSign className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Scholarship Type</p>
                      <p className="font-medium">{scholarship.scholarshipCategory}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      <FaGraduationCap className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Subject Category</p>
                      <p className="font-medium">{scholarship.subjectCategory}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold mb-6">Payment Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Application Fee</span>
                  <span className="font-bold">${scholarship.applicationFees || 0}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Service Charge</span>
                  <span className="font-bold">${scholarship.serviceCharge || 0}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Transaction ID</span>
                  <span className="font-medium text-blue-400">{scholarship.tnxId?.slice(0, 20)}...</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Payment Status</span>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm font-medium">{scholarship.paymentStatus || "Paid"}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Application Status</span>
                  <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm font-medium">{scholarship.applicationStatus || "Pending Review"}</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-lg font-bold">Total Paid</span>
                  <span className="text-2xl font-bold text-green-400">${(scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold mb-6">Application Status</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-sm" />
                    </div>
                    <div className="absolute left-4 top-8 h-8 w-0.5 bg-green-500"></div>
                  </div>
                  <div>
                    <h4 className="font-bold">Application Submitted</h4>
                    <p className="text-gray-400 text-sm">Your application has been received</p>
                    <p className="text-gray-500 text-xs mt-1">{formatDate(scholarship.applicationDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-sm" />
                    </div>
                    <div className="absolute left-4 top-8 h-8 w-0.5 bg-gray-700"></div>
                  </div>
                  <div>
                    <h4 className="font-bold">Payment Processed</h4>
                    <p className="text-gray-400 text-sm">Payment has been confirmed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute left-4 top-8 h-8 w-0.5 bg-gray-700"></div>
                  </div>
                  <div>
                    <h4 className="font-bold">Under Review</h4>
                    <p className="text-gray-400 text-sm">University is reviewing your application</p>
                    <p className="text-blue-400 text-xs mt-1">Expected: 5-7 business days</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-gray-400">Final Decision</h4>
                    <p className="text-gray-500 text-sm">Awaiting university decision</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/dashboard/myApplication")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 font-medium"
              >
                <FaFileAlt />
                View My Applications
                <FaArrowRight className="ml-auto" />
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-medium"
              >
                <FaHome />
                Go to Dashboard
              </button>
            </div>

            <div className="bg-blue-900/20 rounded-xl border border-blue-800/30 p-4">
              <h4 className="font-bold mb-2 text-blue-300">Need Help?</h4>
              <p className="text-sm text-blue-200/80 mb-3">If you have any questions about your application, contact our support team.</p>
              <button onClick={() => navigate("/contact")} className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
                Contact Support →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-300">A payment receipt and application confirmation has been sent to your email. Keep an eye on your inbox for updates about your application status.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
