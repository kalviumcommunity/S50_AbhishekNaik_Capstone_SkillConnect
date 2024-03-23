import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../utils/Navbar";
import Sidebar from "../../utils/Sidebar";
import axios from "axios";

const Homepage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    // console.log("Logout clicked");
    axios
      .post(
        "http://localhost:3000/user/logout",
        { h: "h" },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
    >
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onLogout={handleLogout} />
      </div>
      <motion.img
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
        style={{
          filter:
            "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(175deg)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export default Homepage;
