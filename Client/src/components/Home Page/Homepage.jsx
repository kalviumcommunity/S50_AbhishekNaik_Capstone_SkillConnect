import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../utils/Navbar";
import Sidebar from "../../utils/Sidebar";
import axios from "axios";
import Post from "../Posts/Posts";

const Homepage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post")
      .then((response) => {
        console.log("Response from server:", response);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleLogout = () => {
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
        <div className="flex justify-center mt-8 w-full">
          <div className="max-w-4xl w-full">
            {posts.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                videoUrl={post.videoUrl}
              />
            ))}
          </div>
        </div>
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
