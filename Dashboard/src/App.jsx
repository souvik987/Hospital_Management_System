import React, { useContext } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard.jsx';
import Sidebar from './Components/Sidebar.jsx';
import Login from './Components/Login.jsx';
import AddNewDoctor from './Components/AddNewDoctor.jsx';
import AddNewAdmin from './Components/AddNewAdmin.jsx';
import Doctors from './Components/Doctors.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from './main.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import "./App.css";
import Messages from './Components/Messages.jsx';
import axiosInstance from './axiosInstance.js';

const App = () => {
  console.log = function () {};
  const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/user/admin/me",
          { withCredentials: true }
        );
        //console.log(response);
        setIsAuthenticated(true);
        setUser(response.data?.user);
      } catch (error) {
       // console.log("error in app js ", error);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/doctor/addNew' element={<AddNewDoctor />}/>
          <Route path='/admin/addNew' element={<AddNewAdmin />}/>
          <Route path='/doctors' element={<Doctors />}/>
          <Route path='/messages' element={<Messages />}/>
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  )
}

export default App
