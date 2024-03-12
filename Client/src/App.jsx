import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './components/Landing Page/LandingPage'
import SignUpPage from './components/Sign Up/SignupPage'


const App = () => {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App