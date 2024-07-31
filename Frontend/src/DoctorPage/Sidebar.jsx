import React, { useContext, useState } from 'react'
import { Context } from '../main';
import {MdDashboardCustomize} from 'react-icons/md';
import {RiLogoutBoxFill} from 'react-icons/ri';
import {SlUserFollow} from 'react-icons/sl';
import {BsFillBookmarkCheckFill} from 'react-icons/bs';
import {TbReportMedical} from 'react-icons/tb';
import {BiDetail} from 'react-icons/bi';
import {GiHamburgerMenu} from 'react-icons/gi'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Sidebar.css";
import axiosInstance from '../axiosInstance';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const gotoDoctorDashboard = () => {
    navigate("/doctor-dashboard");
    setShow(!show);
  }

  const gotoDoctorProfile = () => {
    navigate("/doctor-profile");
    setShow(!show);
  }

  const gotoAppointments = () => {
    navigate("/appointments");
    setShow(!show);
  }

  const gotoAllReports = () => {
    navigate("/reports");
      setShow(!show);
    }

  const gotoCreateReports = () => {
      navigate("/create-report");
        setShow(!show);
  }

  const handleLogout = async() => {

    await axiosInstance.get("/api/v1/user/doctor/logout",
    {
        withCredentials: true
    }).then(res => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        navigate("/");
        console.log("isAuthenticated after logout:", isAuthenticated);
    }).catch(err => {
        //console.log(err);
        toast.error(err.response.data.message);
    })
}

  return (
    <>
    <nav style={!isAuthenticated ? {display: "none"} : {display: "flex"}} className={show ? "show sidebar" : "sidebar"}>

      <div className="links">
        <MdDashboardCustomize onClick={gotoDoctorDashboard} />
        <SlUserFollow  onClick={gotoDoctorProfile}/>
        <BsFillBookmarkCheckFill onClick={gotoAppointments} />
        <TbReportMedical onClick={gotoAllReports}/>
        <BiDetail onClick={gotoCreateReports}/>
        <RiLogoutBoxFill onClick={handleLogout}/>
      </div>
      
    </nav>

    <div style={!isAuthenticated ? {display: "none"} : { display: "flex"}} className="wrapper">
      <GiHamburgerMenu className='hamburger' onClick={() => setShow(!show)} />
    </div>
    </>
  )
}

export default Sidebar
