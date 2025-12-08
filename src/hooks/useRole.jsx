import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  const { isLoading: roleLoading, data: role = "student" } = useQuery({
    queryKey: ["user-role", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });
  return { role, roleLoading };
};

export default useRole;
