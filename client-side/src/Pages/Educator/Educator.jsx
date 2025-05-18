import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../Components/Educator/Footer";
import NavBar from "../../Components/Educator/NavBar";
import SideBar from "../../Components/Educator/SideBar";

const Educator = () => {
  const location = useLocation();

  const isDashboardHome = location.pathname === "/educator";

  return (
    <div className="text-default min-h-screen bg-white flex flex-col">
      <NavBar />
      <div className="flex flex-1 pt-16">
        <SideBar />
        <div className="flex-1 p-5 transition-all duration-300 md:ml-60">
          {isDashboardHome ? (
            <div className="flex flex-col items-center justify-center text-center space-y-6 min-h-[70vh]">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Welcome to Your Educator Dashboard!
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                Manage your courses, view student enrollments, and track your earnings here. Use the sidebar to explore all the features available to you.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Educator;
