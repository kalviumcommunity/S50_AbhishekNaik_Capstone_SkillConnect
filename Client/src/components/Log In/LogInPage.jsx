import React, { useState } from "react";
import TypewriterText from "../../utils/TypewriterText";
import { STRINGS } from "../../utils/Strings";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { slides } from "../../utils/Slides";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

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
    console.log("WIP,Login data:", formData);
    axios
      .post("http://localhost:3000/user/login", formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        // set the cookie
        // document.cookie = `token=${response.data.token}`;
      });
  };

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            <TypewriterText
              strings={[STRINGS.connect, STRINGS.learn, STRINGS.grow]}
            />
          </h1>
          <p className="text-2xl mt-4 font-poppins">{STRINGS.tagline}</p>
        </div>
        <Card className="mt-8 w-[300px]">
          <CardHeader>
            <CardTitle className="flex justify-center items-center underline">
              LOGIN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="max-w-md w-full">
              <div className="mb-4">
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
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STRINGS.logIn}
              </Button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Button
                className="underline"
                variant="link"
                onClick={handleSignUpClick}
              >
                Sign Up
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right side */}
      <div className="hidden md:block w-1/2 overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
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
      <img
        src="site-logo.png"
        alt="Skill Connect"
        className="absolute top-0 left-0 p-4"
      />
    </div>
  );
};

export default LoginPage;
