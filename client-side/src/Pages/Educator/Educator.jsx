import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Educator/Footer";
import NavBar from "../../Components/Educator/NavBar";
import SideBar from "../../Components/Educator/SideBar";

const Educator = () => {
  return (
    <div className="text-default min-h-screen bg-white flex flex-col">
      <NavBar />
      <div className="flex flex-1 pt-16">
        <SideBar />
        <div className="flex-1 p-5 transition-all duration-300 md:ml-60">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Educator;
