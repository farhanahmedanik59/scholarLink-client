import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FaCheckCircle, FaHome, FaFileAlt, FaCheck, FaArrowRight } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  useEffect(() => {
    window.scrollTo(0, 0);
    axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto mt-12">
        {/* Success Card */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center border border-green-700/50">
              <FaCheckCircle className="text-4xl text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
          <p className="text-gray-400 mb-8">Your payment has been processed successfully. Your application is now being reviewed.</p>

          {/* Check List */}
          <div className="bg-gray-900/50 rounded-lg p-6 mb-8 text-left border border-gray-700">
            <h3 className="font-semibold text-gray-300 mb-4">What's next:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaCheck className="text-green-400" />
                <span className="text-gray-300">Application submitted</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-green-400" />
                <span className="text-gray-300">Payment confirmed</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-green-400" />
                <span className="text-gray-300">Under review by university</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <button
              onClick={() => navigate("/my-applications")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FaFileAlt />
              View My Applications
              <FaArrowRight className="ml-2" />
            </button>

            <button onClick={() => navigate("/dashboard")} className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <FaHome />
              Go to Dashboard
            </button>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-gray-400">
            Need help?{" "}
            <button onClick={() => navigate("/contact")} className="text-blue-400 hover:text-blue-300 hover:underline">
              Contact Support
            </button>
          </p>
        </div>

        {/* Receipt Note */}
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
          <p className="text-sm text-blue-300 text-center">A payment receipt has been emailed to you.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
