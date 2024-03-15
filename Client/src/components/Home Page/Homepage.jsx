import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Home Page/Navbar";
import Sidebar from "../Home Page/Sidebar";

const Homepage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar onLogout={handleLogout} />
      </div>
      <img
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
      />
    </div>
  );
};

export default Homepage;
