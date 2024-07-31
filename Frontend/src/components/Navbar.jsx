import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../main";
import axios from 'axios';
import { toast } from 'react-toastify';
import {GiHamburgerMenu} from "react-icons/gi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import axiosInstance from '../axiosInstance';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
    console.log("Before:- ",isAuthenticated)
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);

    const toggleLoginDropdown = () => setShowLoginDropdown(!showLoginDropdown);

    useEffect(() => {
      const fetchUserPatient = async () => {
        try {
          const response = await axiosInstance.get(
            "/api/v1/user/patient/me",
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
      if(!isAuthenticated){
        fetchUserPatient();
      }
    }, [isAuthenticated]);

    const handleLogout = async() => {

        await axiosInstance.get("/api/v1/user/patient/logout",
        {
            withCredentials: true
        }).then(res => {
            toast.success(res.data.message);
            setIsAuthenticated(false);
            console.log("isAuthenticated after logout:", isAuthenticated);
        }).catch(err => {
            //console.log(err);
            toast.error(err.response.data.message);
        })
    }

    console.log(isAuthenticated);

  return (
    <nav className='container'>
      <div className='logo'>
        <img src="/logo.png" alt="logo"  className='logo-img'/>
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
            <Link to={"/"}>HOME</Link>
            <Link to={"/appointment"}>APPOINTMENT</Link>
            <Link to={"/about"}>ABOUT US</Link>
        </div>
        { isAuthenticated ? (
            <button className='logoutBtn btn' onClick={handleLogout}>
                LOGOUT
            </button>
         ) : (
          <div>
          <button className='loginBtn btn' onClick={toggleLoginDropdown}>
            LOGIN
            <IoIosArrowDropdownCircle style={{ verticalAlign: 'middle', marginLeft: '5px' }} />
          </button>
          {showLoginDropdown && (
            <div className="loginDropdown">
              <Link to="/login" className="dropdownItem">Patient Login</Link>
              <Link to="/doctor-login" className="dropdownItem">Doctor Login</Link>
            </div>
          )}
        </div>
        )
        }
      </div>
      <div className='hamburger' onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  )
}

export default Navbar
