import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../utils/Navbar";
import Sidebar from "../../utils/Sidebar";

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
        style={{
          filter:
            "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(175deg)",
        }}
      />
    </div>
  );
};

export default Homepage;
