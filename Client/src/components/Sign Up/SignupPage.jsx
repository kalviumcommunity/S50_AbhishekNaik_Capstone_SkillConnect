import React, { useState } from "react";
import TypewriterText from "../TypewriterText";

const STRINGS = {
  connect: "Connect.",
  learn: "Learn.",
  grow: "Grow.",
  tagline: "SkillConnect: Where Knowledge Meets Community.",
  signUp: "Sign Up",
  logIn: "Log In",
};

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
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
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle form submission here
  };

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            <TypewriterText
              strings={[STRINGS.connect, STRINGS.learn, STRINGS.grow]}
            />
          </h1>
          <p className="text-2xl mt-4 font-poppins">{STRINGS.tagline}</p>
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit} className="max-w-md w-full">
            <div className="mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="Repeat Password"
                className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STRINGS.signUp}
            </button>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-black"></div>

      {/* Logo */}
      <img
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
      />
    </div>
  );
};

export default SignUpPage;
