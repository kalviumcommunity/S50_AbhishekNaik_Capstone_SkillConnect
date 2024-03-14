import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "ldrs/trio";

const LandingPage = lazy(() => import("./components/Landing Page/LandingPage"));
const SignUpPage = lazy(() => import("./components/Sign Up/SignupPage"));
const LoginPage = lazy(() => import("./components/Log In/LogInPage"));
const About = lazy(() => import("./components/About Page/About"));

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <l-trio size="50" speed="1.5" color="black"></l-trio>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
