import React, { useContext, useState } from 'react'
import { Context } from '../main';
import {TiHome} from 'react-icons/ti';
import {RiLogoutBoxFill} from 'react-icons/ri';
import {AiFillMessage} from 'react-icons/ai';
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaUserDoctor} from 'react-icons/fa6'
import {MdAddModerator} from 'react-icons/md'
import {IoPersonAddSharp} from 'react-icons/io5'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/");
    setShow(!show);
  }

  const gotoDoctors = () => {
    navigate("/doctors");
    setShow(!show);
  }

  const gotoMessage = () => {
    navigate("/messages");
    setShow(!show);
  }

  const gotoAddNewDoctor = () => {
    navigate("/doctor/addNew");
      setShow(!show);
    }

  const gotoAddNewAdmin = () => {
      navigate("/admin/addNew");
        setShow(!show);
  }

  const handleLogout = async() => {

    await axiosInstance.get("/api/v1/user/admin/logout",
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

  return (
    <>
    <nav style={!isAuthenticated ? {display: "none"} : {display: "flex"}} className={show ? "show sidebar" : "sidebar"}>

      <div className="links">
        <TiHome onClick={gotoHome} />
        <FaUserDoctor onClick={gotoDoctors}/>
        <MdAddModerator onClick={gotoAddNewAdmin} />
        <IoPersonAddSharp onClick={gotoAddNewDoctor}/>
        <AiFillMessage onClick={gotoMessage}/>
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
