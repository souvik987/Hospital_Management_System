import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./DoctorPage/DoctorDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Context } from "./main";
import axios from "axios";
import Doctor_Profile from "./DoctorPage/Doctor_Profile";
import CreateReport from "./DoctorPage/CreateReport";
import AllReport from "./DoctorPage/AllReport";
import AllAppointments from "./DoctorPage/AllAppointments";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);


  return (
    <>
    <Router>
      <Routes>
        {/* Define all routes outside of the conditional rendering */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-profile" element={<Doctor_Profile />} />
        <Route path="/create-report" element={<CreateReport/>} />
        <Route path="/reports" element={<AllReport />} />
        <Route path="/appointments" element={<AllAppointments />} />
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/appointment" element={<><Navbar /><Appointment /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/doctor-login" element={<><Navbar /><DoctorLogin /><Footer /></>} />
      </Routes>
        <ToastContainer position="top-center" />
    </Router>
    </>
  );
};

export default App;
