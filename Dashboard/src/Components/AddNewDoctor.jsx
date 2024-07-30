import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");


  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const navigate = useNavigate();

  const handleAvatar = async(e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=> {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    }
  }

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("firstName", firstName);
      formdata.append("lastName", lastName);
      formdata.append("email", email);
      formdata.append("phone", phone);
      formdata.append("nic", nic);
      formdata.append("dob", dob);
      formdata.append("gender", gender);
      formdata.append("password", password);
      formdata.append("doctorDepartment", doctorDepartment);
      formdata.append("docAvatar", docAvatar);

      const response = await axios.post(
        "http://localhost:4000/api/v1/user/doctor/addnew",          formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response)
      toast.success(response.data.message);
      navigate("/doctors");
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }

  if(!isAuthenticated){
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <section className="page">
      <div className='container form-component add-doctor-form'>
        <img src="/logo.png" alt="logo" className='logo' />
      <h1 className='form-title'>Register A New Doctor</h1>
      <form onSubmit={handleAddNewDoctor}>
        <div className="first-wrapper">
          <div>
            <img src={docAvatarPreview ?  `${docAvatarPreview}` : "/docHolder.jpg"} alt="Doctor Avatar" />
            <input type="file" onChange={handleAvatar}/>
          </div>
          <div>
          <input 
            type="text" 
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input 
            type="text" 
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="number" 
            placeholder='Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input 
            type="number" 
            placeholder='NIC'
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <input 
            type="date" 
            placeholder='Date of Birth'
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
           <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input 
            type="password" 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select 
            value={doctorDepartment} 
            onChange={(e) => setDoctorDepartment(e.target.value)}>
              <option value="">Select Department</option>
              {departmentsArray.map((department, index) => (
                <option key={index} value={department}>{department}</option>
              ))}
            </select>

            <button type="submit" style={{justifyContent:'center', margin:'0 auto'}}>Register New Doctor</button>
          </div>
        </div>

      </form>
    </div>
      </section>
    </>
  )
}

export default AddNewAdmin
