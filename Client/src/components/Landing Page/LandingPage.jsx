import React from "react";
import TypewriterText from "../../utils/TypewriterText";
import { Link } from "react-router-dom";
import { STRINGS } from "../../utils/Strings";
import "ldrs/trio";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { slides } from "../../utils/Slides";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <motion.div
      className="relative flex h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side */}
      <motion.div
        className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center items-center"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.h1
          className="text-7xl font-bold"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <TypewriterText
            strings={[STRINGS.connect, STRINGS.learn, STRINGS.grow]}
          />
        </motion.h1>
        <p className="text-md mt-4 font-poppins">{STRINGS.tagline}</p>
        <div className="mt-8">
          <Link to="/signup">
            <Button className="bg-blue-500 mr-6 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              {STRINGS.signUp}
            </Button>
          </Link>
          <Link to="/login">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4">
              {STRINGS.logIn}
            </Button>
          </Link>
        </div>
        {/* About Button */}
        <Link to="/about" className="mt-4">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            About
          </Button>
        </Link>
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
    </motion.div>
  );
};

export default LandingPage;
