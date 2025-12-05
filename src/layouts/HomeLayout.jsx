import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-[#0F1A2C] font-inter">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default HomeLayout;
