import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FaExclamationTriangle, FaHome, FaRedo, FaFileAlt, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentError = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("error_code");
  const apl_id = searchParams.get("apl_id");
  console.log(apl_id);
  const { user } = useAuth();
  console.log(user);
  useEffect(() => {
    window.scrollTo(0, 0);
    const userInfo = {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
    };
    axiosSecure.post(`/payment-error?apl_id=${apl_id}`, userInfo);
  }, [apl_id, searchParams]);

  // Error messages based on error code
  const getErrorMessage = () => {
    switch (errorCode) {
      case "card_declined":
        return "Your card was declined. Please try a different payment method.";
      case "insufficient_funds":
        return "Insufficient funds. Please use a different card or payment method.";
      case "expired_card":
        return "Your card has expired. Please use a different payment method.";
      case "processing_error":
        return "A processing error occurred. Please try again.";
      default:
        return "An error occurred while processing your payment. Please try again.";
    }
  };

  const getErrorTitle = () => {
    switch (errorCode) {
      case "card_declined":
        return "Payment Declined";
      case "insufficient_funds":
        return "Insufficient Funds";
      case "expired_card":
        return "Expired Card";
      default:
        return "Payment Failed";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto mt-12">
        {/* Error Card */}
        <div className="bg-gray-800 rounded-xl border border-red-900/30 p-8 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center border border-red-700/50">
              <FaExclamationTriangle className="text-4xl text-red-400" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold mb-3 text-red-400">{getErrorTitle()}</h1>
          <p className="text-gray-300 mb-6">{getErrorMessage()}</p>

          {/* Error Code Display */}
          {errorCode && (
            <div className="bg-gray-900/50 rounded-lg p-3 mb-6 border border-gray-700">
              <p className="text-sm text-gray-400">
                Error Code: <span className="text-red-300 font-mono">{errorCode}</span>
              </p>
            </div>
          )}

          {/* Troubleshooting Tips */}
          <div className="bg-gray-900/50 rounded-lg p-6 mb-8 text-left border border-gray-700">
            <h3 className="font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <FaQuestionCircle className="text-blue-400" />
              Troubleshooting Tips:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <span className="text-gray-300 text-sm">Check your card details and try again</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <span className="text-gray-300 text-sm">Ensure you have sufficient funds</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <span className="text-gray-300 text-sm">Try a different payment method</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <span className="text-gray-300 text-sm">Contact your bank if issues persist</span>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)} // Go back to payment page
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FaRedo />
              Try Payment Again
              <FaArrowRight className="ml-2" />
            </button>

            <button onClick={() => navigate("/dashboard")} className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <FaHome />
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/dashboard/myApplication")}
              className="w-full bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-blue-800/30"
            >
              <FaFileAlt />
              View My Applications
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Your application has been saved, but payment is pending.</p>
            <p className="text-sm text-gray-400">
              Still having trouble?{" "}
              <button onClick={() => navigate("/contact")} className="text-blue-400 hover:text-blue-300 hover:underline">
                Contact Support
              </button>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
          <p className="text-sm text-yellow-300 text-center">For security reasons, no payment information was stored. You can safely try again.</p>
        </div>

        {/* Retry Info */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">You can retry payment from your dashboard within 24 hours.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
