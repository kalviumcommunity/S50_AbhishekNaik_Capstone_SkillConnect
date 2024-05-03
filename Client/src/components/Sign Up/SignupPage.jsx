import React, { useState } from "react";
import { motion } from "framer-motion";
import TypewriterText from "../../utils/TypewriterText";
import { STRINGS } from "../../utils/Strings";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { slides } from "../../utils/Slides";
import { useToast } from "@/components/ui/use-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      if (formData.password !== formData.repeatPassword) {
        toast({
          variant: "destructive",
          title: "Passwords do not match",
        });
      } else {
        try {
          const response = await axios.post("http://localhost:3000/user", {
            name: formData.username,
            email: formData.email,
            password: formData.password,
          });

          if (response.status === 200) {
            setFormData({
              username: "",
              email: "",
              password: "",
              repeatPassword: "",
            });
            if (Object.keys(errors).length === 0) {
              navigate("/login");
            }
          } else {
            console.error("Failed to sign up user");
            setErrors({
              server: "Failed to sign up user. Please try again later.",
            });
          }
        } catch (error) {
          console.error("Error occurred while signing up:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setErrors({ server: error.response.data.message });
          } else {
            setErrors({ server: "An error occurred. Please try again later." });
          }
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.username.trim()) {
      errors.username = "Username is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    if (!data.repeatPassword) {
      errors.repeatPassword = "Repeat password is required";
    }
    return errors;
  };

  return (
    <div className="flex h-screen">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mt-16">
            <TypewriterText
              strings={[STRINGS.connect, STRINGS.learn, STRINGS.grow]}
            />
          </h1>
          <p className="text-2xl mt-4 font-poppins">{STRINGS.tagline}</p>
        </div>
        <Card className="mt-8 w-[300px]">
          <CardHeader>
            <CardTitle className="flex justify-center items-center underline">
              SIGNUP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="max-w-md w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-4"
              >
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="mb-4"
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="mb-4"
              >
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 1 }}
                className="mb-6"
              >
                <input
                  type="password"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  placeholder="Repeat Password"
                  className="bg-gray-200 py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.repeatPassword && (
                  <p className="text-red-500">{errors.repeatPassword}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 1 }}
                className="mb-6"
              >
                <Button
                  variant="ghost"
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {STRINGS.SignUp}
                </Button>
              </motion.div>
            </form>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 1 }}
              className="mt-4 text-center"
            >
              Have a Account?{" "}
              <Button
                className="underline"
                variant="link"
                onClick={handleLoginClick}
              >
                Log In
              </Button>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right side */}
      <div className="hidden md:block w-1/2 overflow-hidden">
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
      />
    </div>
  );
};

export default SignUpPage;
