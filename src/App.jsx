import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ConsumerDashboard from "./components/ConsumerDashboard";
import FarmerDashboard from "./components/FarmerDashboard";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import RoleSelection from "./components/RoleSelection"; // Include this component
import Profile from "./components/profile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Check if a user is logged in upon component mounting
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <Router>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route
          path="/signup"
          element={<SignUp setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/profile"
          element={<Profile setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/consumer-dashboard"
          element={
            currentUser?.role === "consumer" ? (
              <ConsumerDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/farmer-dashboard"
          element={
            currentUser?.role === "farmer" ? (
              <FarmerDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
