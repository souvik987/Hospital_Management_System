import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hospital-management-system-j4vh.onrender.com/user/login",
        { email, password, confirmPassword, role: "Admin" },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log("login", response);
      toast.success(response?.data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log("Login error", error);
      toast.error(error.response?.data.message);
    }
  };

  if(isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component">
      <img src="/logo.png" alt="logo" className='logo' />
      <h1 className='form-title'>WELCOME TO MEDICARE</h1>
      <p>Only Admins are Allowed to Access These Resources</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit" style={{marginLeft:'180px'}}>Login</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Login
