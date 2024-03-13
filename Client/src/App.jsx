import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "ldrs/trio";

const LandingPage = lazy(() => import("./components/Landing Page/LandingPage"));
const SignUpPage = lazy(() => import("./components/Sign Up/SignupPage"));
const About = lazy(() => import("./components/About Page/About"));

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <l-trio size="40" speed="1.3" color="black"></l-trio>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
