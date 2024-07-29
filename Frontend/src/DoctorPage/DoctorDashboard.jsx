import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {GoCheckCircleFill} from 'react-icons/go';
import {AiFillCloseCircle} from 'react-icons/ai';
import Sidebar from './Sidebar';
import './DoctorDashboard.css';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { MdPayment, MdPersonAdd } from 'react-icons/md';
import { FaBed } from 'react-icons/fa';

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);
  // console.log("User:- ", user)
  
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  console.log(isAuthenticated);

  useEffect(() => {
    const fetchUserDoctor = async () => {
      try {
        const response = await axios.get(
          "https://hospital-management-system-j4vh.onrender.com/user/doctor/me",
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
    fetchUserDoctor();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchAppointments = async() => {
      try {
        const { data } = await axios.get("https://hospital-management-system-j4vh.onrender.com/appointment/getall",
          {withCredentials: true}
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
        console.log("Some Errror Occured while fetching appointments", error);
      }
    }
    fetchAppointments();
  }, [])
  console.log("After",isAuthenticated);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const {data} = await axios.get("https://hospital-management-system-j4vh.onrender.com/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchDoctors();
  }, []);

  const handleUpdateStatus = async(appointmentId, status) => {
    try {
      const { data } = await axios.put(`https://hospital-management-system-j4vh.onrender.com/appointment/update/${appointmentId}`, {status}, 
        {withCredentials: true}
      );
      setAppointments((preAppointments) =>
        preAppointments.map((appointment) =>
          appointment._id === appointmentId 
          ? { ...appointment, status } 
          : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // if(!isAuthenticated){
  //   return <Navigate to={"/login"} />
  // }

  return (
    <>
      <Sidebar />
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="doc img" />
            <div className="content">
              <div style={{display: 'flex', flexDirection:'column'}}>
                <p>Hello, </p>
                <h5>
                  {user && `${user.firstName} ${user.lastName}`}
                </h5>
              </div>
              {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum earum vel dicta iure mollitia placeat cum? Aperiam ipsam eaque unde.</p> */}
            </div>
          </div>
          <div className="secondBox commonBox">
            <BsFillBookmarkCheckFill size={20} />
          <p>Appoinments</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox commonBox">
          <MdPersonAdd size={20}/>
          <p>Doctors</p>
          <h3>{doctors.length}</h3>
        </div>
        <div className="fourthBox commonBox">
          <MdPayment  size={20}/>
          <p>Reports</p>
          <h3>10</h3>
        </div>
        <div className="fifthBox commonBox">
          <FaBed  size={20}/>
          <p>Beds</p>
          <h3>15</h3>
        </div>
        </div>
        <div className="banner">
         <h5>Appointments</h5> 
         <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {
              appointments && appointments.length > 0 ? (appointments.map(appointment => {
                return(
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                     {appointment.phone}
                    </td>
                    <td>{appointment.address}</td>
                    <td>{appointment.hasVisited === true ? <GoCheckCircleFill className='green' /> : (<AiFillCloseCircle className='red' />)}</td>
                  </tr>
                )
              })) : (<h1>No Appointments</h1>)
            }
          </tbody>
         </table>
        </div>
      </section>

    </>
  )
}

export default Dashboard
