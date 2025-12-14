import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FaExclamationTriangle, FaHome, FaRedo, FaFileAlt, FaArrowRight, FaQuestionCircle, FaGraduationCap, FaUniversity } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const PaymentError = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const apl_id = searchParams.get("apl_id");
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!apl_id) return;
    const logPaymentError = async () => {
      try {
        await axiosSecure.post(`/payment-error?apl_id=${apl_id}`, user);
      } catch (err) {
        console.error("Failed to log payment error", err);
      }
    };

    logPaymentError();
  }, [apl_id, axiosSecure, user]);

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["paymentError", apl_id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/scholarship/${apl_id}/payment`);

      const data = response.data;
      return data;
    },
    enabled: !!apl_id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Processing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-red-900/30 p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600/20 to-orange-500/20 rounded-full flex items-center justify-center border border-red-700/50">
                  <FaExclamationTriangle className="text-4xl text-red-400" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-bold mb-2 text-red-400">Payment Failed</h1>
                  <p className="text-gray-300 text-lg">Payment Canceled </p>
                </div>
              </div>

              <div className="bg-gray-900/40 rounded-xl p-6 mb-8 border border-gray-700/50">
                <h3 className="font-semibold text-gray-300 mb-4 flex items-center gap-2 text-lg">
                  <FaQuestionCircle className="text-blue-400" />
                  What to do next:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">Check your card details and try again</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">Ensure you have sufficient funds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">Try a different payment method</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">Contact your bank if issues persist</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 font-bold text-lg"
                >
                  <FaRedo />
                  Try Payment Again
                  <FaArrowRight />
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-medium"
                >
                  <FaHome />
                  Go to Dashboard
                </button>

                <button
                  onClick={() => navigate("/dashboard/myApplication")}
                  className="w-full bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 border border-blue-800/30"
                >
                  <FaFileAlt />
                  View My Applications
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <p className="text-sm text-gray-400 mb-2">Your application has been saved with "Unpaid" status. You can complete payment from your dashboard.</p>
                <p className="text-sm text-gray-400">
                  Need assistance?{" "}
                  <button onClick={() => navigate("/contact")} className="text-blue-400 hover:text-blue-300 hover:underline font-medium">
                    Contact Support Team
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <FaGraduationCap className="text-blue-400" />
                Scholarship Details
              </h3>

              {scholarship ? (
                <div className="space-y-6">
                  <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-600/20 rounded-lg">
                        <FaGraduationCap className="text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white">{scholarship.scholarshipName}</h4>
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <FaUniversity className="text-blue-400" />
                          <span>{scholarship.universityName}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="font-medium">{scholarship.scholarshipCategory}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Degree</p>
                        <p className="font-medium">{scholarship.degree}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-400 text-sm">Subject</p>
                        <p className="font-medium">{scholarship.subjectCategory}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Application Fee</span>
                        <span className="font-bold">${scholarship.applicationFees}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Service Charge</span>
                        <span className="font-bold">${scholarship.serviceCharge}</span>
                      </div>
                      <div className="border-t border-gray-700/50 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-bold">Total</span>
                          <span className="text-xl font-bold text-red-400">${(scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGraduationCap className="text-3xl text-gray-500" />
                  </div>
                  <p className="text-gray-400">Scholarship details not available</p>
                </div>
              )}
            </div>

            <div className="bg-yellow-900/20 rounded-xl border border-yellow-800/30 p-4">
              <h4 className="font-bold mb-2 text-yellow-300">Important Note</h4>
              <p className="text-sm text-yellow-200/80">Your scholarship application has been saved. Complete payment within 24 hours to avoid cancellation.</p>
            </div>

            <div className="bg-blue-900/20 rounded-xl border border-blue-800/30 p-4">
              <h4 className="font-bold mb-2 text-blue-300">Security Notice</h4>
              <p className="text-sm text-blue-200/80">No payment information is stored. All transactions are processed securely through Stripe.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">You can retry this payment from your dashboard within 24 hours.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
