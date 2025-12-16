import React, { Children } from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { useNavigate } from "react-router";

import Unauthorized from "../components/Unauthorized/Unauthorized";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading Analytics Dashboard...</p>
        </div>
      </div>
    );
  }

  if (role !== "admin") {
    return <Unauthorized></Unauthorized>;
  }

  return children;
};

export default AdminRoute;
