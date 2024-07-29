import React, { useContext, useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { GiMeditation } from "react-icons/gi";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { MdBloodtype, MdEmail } from "react-icons/md";
import { BsFillTelephoneFill, BsHouseFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import { Button, message, Modal } from "antd";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import "./Doctor.css";
import { Context } from "../main";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

// *********************************************************
const Doctor_Profile = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  console.log("profile", isAuthenticated)
  console.log("profile", user)

  useEffect(() => {
    const fetchUserDoctor = async () => {
      try {
        const response = await axios.get(
          "https://hospital-management-system-j4vh.onrender.com/user/doctor/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data?.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUserDoctor();
  }, [setIsAuthenticated, setUser]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    gender: user?.gender,
    phone: user?.phone,
    email: user?.email,
    dob: user?.dob,
    address: user?.address,
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`https://hospital-management-system-j4vh.onrender.com/user/doctor/${user._id}`, 
        formData, 
        { withCredentials: true });
      toast.success("User updated successfully");
      handleOk();
    } catch (error) {
      messageApi.error("Failed to update user");
    }
  };

  if (user?.role !== "Doctor") {
    return <Navigate to={"/doctor-dashboard"} />;
  }

  console.log("profile after", isAuthenticated)

  return (
    <>
      <Sidebar />
      <div className="container1">
        <div className="AfterSideBar">
          <div className="maindoctorProfile">
            <div className="firstBox">
              <div>
                <img src={user?.docAvatar.url} alt="docimg" />
              </div>
              <hr />
              <div className="singleitemdiv">
                <GiMeditation className="singledivicons" />
                <p>{user?.firstName} {user?.lastName}</p>
              </div>
              <div className="singleitemdiv">
                <MdEmail className="singledivicons" />
                <p>{user?.email}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />
                <p>{user?.dob.substring(0, 10)}</p>
              </div>
              <div className="singleitemdiv">
                <BsFillTelephoneFill className="singledivicons" />
                <p>{user?.phone}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                  Edit profile
                </button>
              </div>

              <Modal
                title="Edit details"
                open={open}
                onOk={handleFormSubmit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" onClick={handleFormSubmit}>
                    Edit
                  </Button>,
                ]}
              >
                <form className="inputForm">
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="First Name"
                  />
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Last Name"
                  />
                  <select name="gender" value={formData.gender} onChange={handleFormChange}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </select>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="Phone"
                  />
                  <input
                    name="dob"
                    value={formData.dob}
                    onChange={handleFormChange}
                    type="date"
                    placeholder="Date of birth"
                  />
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange} 
                    type="text"
                    placeholder="Address" 
                    />
                </form>
              </Modal>
            </div>
            {/* ***********  Second Div ******************** */}
            <div className="SecondBox">
              <div className="subfirstbox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Other Info
                </h2>
                <div className="singleitemdiv">
                  <BsGenderAmbiguous className="singledivicons" />
                  <p>{user?.gender}</p>
                </div>
                <div className="singleitemdiv">
                  <AiFillCalendar className="singledivicons" />
                  <p>{user?.doctorDepartment}</p>
                </div>

                <div className="singleitemdiv">
                  <MdOutlineCastForEducation className="singledivicons" />
                  <p>{user?.nic}</p>
                </div>
                <div className="singleitemdiv">
                  <BsHouseFill className="singledivicons" />
                  <p>{user?.address}</p>
                </div>
              </div>
              {/* ***********  Third Div ******************** */}
              <div className="subSecondBox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Hospital Details
                </h2>
                <div className="singleitemdiv">
                  <BiTime className="singledivicons" />
                  <p>09:00 AM - 20:00 PM (TIMING)</p>
                </div>
                <div className="singleitemdiv">
                  <FaRegHospital className="singledivicons" />
                  <p>MediCare Hospital</p>
                </div>
                <div className="singleitemdiv">
                  <FaMapMarkedAlt className="singledivicons" />
                  <p>
                    Newtown, Kolkata - 700136, West Bengal, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor_Profile;
