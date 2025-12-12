import React, { Children } from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { useNavigate } from "react-router";

import Unauthorized from "../components/Unauthorized/Unauthorized";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <h1>Loading</h1>;
  }

  if (role !== "admin") {
    return <Unauthorized></Unauthorized>;
  }

  return children;
};

export default AdminRoute;
