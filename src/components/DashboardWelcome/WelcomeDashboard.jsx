import React from "react";
import { useNavigate } from "react-router";
import { FaHome, FaChevronRight } from "react-icons/fa";

const WelcomeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center mb-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-700/50">
              <FaHome className="text-4xl text-blue-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-400 text-lg mb-8">Your central hub for managing applications, tracking progress, and accessing important information.</p>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-8 text-left border border-gray-700">
            <h3 className="font-semibold text-gray-300 mb-4">Welcome Message:</h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                <strong>For Students:</strong> Track your applications, submit documents, and check your admission status.
              </p>
              <p className="text-gray-300">
                <strong>For University Staff:</strong> Review applications, manage students, and process admissions.
              </p>
              <p className="text-gray-300">
                <strong>For Administrators:</strong> Monitor system activity, manage users, and configure settings.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/dashboard/myApplication")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              View Applications
              <FaChevronRight className="ml-2" />
            </button>

            <button
              onClick={() => navigate("/dashboard/myProfile")}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Go to Profile
              <FaChevronRight className="ml-2" />
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-6 text-center">Dashboard Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-gray-300 mb-2">For All Users</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• View your profile information</li>
                <li>• Access help and support</li>
                <li>• Check notifications</li>
                <li>• Update account settings</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-gray-300 mb-2">Based on Your Role</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Students: Manage applications</li>
                <li>• Staff: Review submissions</li>
                <li>• Admins: System management</li>
                <li>• Others: Role-specific tools</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">Your dashboard is personalized based on your role in the system. If you need access to additional features, please contact your administrator.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;
