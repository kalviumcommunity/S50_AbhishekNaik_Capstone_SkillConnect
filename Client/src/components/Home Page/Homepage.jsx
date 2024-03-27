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
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("Response from server:", response);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("There was an error fetching posts. Please try again.");
      });
  }, []);

  const handleRetry = () => {
    setError(null); // Clear the error state
    // Retry fetching posts
    axios
      .get("http://localhost:3000/post", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("Response from server:", response);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("There was an error fetching posts. Please try again.");
      });
  };
  // console.log(posts);
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
        <div className="flex justify-center w-full">
          <div className="max-w-4xl w-full">
            {error ? (
              <div className="text-red-500">
                {error}
                <button onClick={handleRetry} className="ml-2 underline">
                  Retry
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <Post
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  imageUrl={post.imageUrl}
                  videoUrl={post.videoUrl}
                  createdBy={post.createdBy}
                  picture={post.picture}
                  bio={post.bio}
                />
              ))
            )}
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
