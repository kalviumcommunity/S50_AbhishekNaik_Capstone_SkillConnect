import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./utils/Loader";

const LandingPage = lazy(() => import("./components/Landing Page/LandingPage"));
const SignUpPage = lazy(() => import("./components/Sign Up/SignupPage"));
const LoginPage = lazy(() => import("./components/Log In/LogInPage"));
const About = lazy(() => import("./components/About Page/About"));
const HomePage = lazy(() => import("./components/Home Page/Homepage"));
const ProfilePage = lazy(() => import("./components/Profile Page/ProfilePage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
