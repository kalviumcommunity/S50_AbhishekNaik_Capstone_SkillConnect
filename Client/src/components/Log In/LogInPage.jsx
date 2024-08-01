import React, { useState } from "react";
import { motion } from "framer-motion";
import TypewriterText from "../../utils/TypewriterText";
import { STRINGS } from "../../utils/Strings";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { slides } from "../../utils/Slides";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.password) {
      toast({
        variant: "destructive",
        title: "Please fill in all the fields",
      });
      return;
    }
    // Handle form submission here
    // console.log("WIP,Login data:", formData);
    axios
      .post("http://localhost:3000/user/login", formData, {
        withCredentials: true,
      })
      .then(() => {
        // console.log(response.data.user);
        navigate("/homepage");
        // set the cookie
        // document.cookie = `token=${response.data.token}`;
      });
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center items-center"
      >
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold">
            <TypewriterText
              strings={[STRINGS.connect, STRINGS.learn, STRINGS.grow]}
            />
          </h1>
          <p className="text-2xl mt-4 font-poppins">{STRINGS.tagline}</p>
        </motion.div>
        <Card className="mt-8 w-[300px]">
          <CardHeader>
            <CardTitle className="flex justify-center items-center underline">
              LOGIN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="max-w-md w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mb-4"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Username"
                  className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="username"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mb-6"
              >
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
              </motion.div>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STRINGS.logIn}
              </Button>
            </form>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mb-6"
            >
              <p className="flex flex-col items-center justify-center text-black">
                or
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1 }}
              className="mb-6"
            >
              <Link to="http://localhost:3000/auth/google">
                <Button
                  variant="ghost"
                  type="button"
                  className="flex items-center justify-center mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <FaGoogle className="mr-2" /> Sign in with Google
                </Button>
              </Link>
            </motion.div>
            {errors.server && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 1 }}
                className="mb-6"
              >
                <p className="text-red-500 mt-2">{errors.server}</p>
              </motion.div>
            )}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-4 text-center"
            >
              Don't have an account?{" "}
              <Button
                className="underline"
                variant="link"
                onClick={handleSignUpClick}
              >
                Sign Up
              </Button>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right side */}
      <div className="hidden md:block w-1/2 overflow-hidden bg-black">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            watchDrag: false,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center ">
                      <img src={slide} alt={`Slide ${index + 1}`} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Logo */}
      <motion.img
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ filter: "invert(100%)" }}

      />
    </div>
  );
};

export default LoginPage;
