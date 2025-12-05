import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-800 font-inter">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default HomeLayout;
