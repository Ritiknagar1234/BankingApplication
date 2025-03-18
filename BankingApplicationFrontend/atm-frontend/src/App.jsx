import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Withdraw from "./pages/Withdraw";
import Deposit from "./pages/Deposit";
import Transactions from "./pages/Transaction";
import FastCash from "./pages/FastCash";
import Register from "./pages/Register";
import ChangePin from "./pages/ChangePin";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import VerifyOtp from "./pages/VerifyOtp";
// import other pages...

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/fast-cash" element={<FastCash />} />
          <Route path="/change-pin" element={<ChangePin />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* other routes */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
