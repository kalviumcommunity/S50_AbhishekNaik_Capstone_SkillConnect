import React, { useState } from "react";
import TypewriterText from "../../utils/TypewriterText";
import { STRINGS } from "../../utils/Strings";
// import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form validation logic
    if (!formData.usernameOrEmail || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    // Handle form submission here
    console.log("WIP,Login data:", formData);

  };

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="mt-8">
          <form onSubmit={handleSubmit} className="max-w-md w-full">
            <div className="mb-4">
              <input
                type="text"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                placeholder="Username or Email"
                className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STRINGS.logIn}
            </button>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden md:block w-1/2 bg-black"></div>

      {/* Logo */}
      <img
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
      />
    </div>
  );
};

export default LoginPage;
