import React from 'react'
import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";

const Appointment = () => {
  return (
    <>
      <Hero title={"Schedule Your Appointment | MediCare Medical Services"} imageUrl={"/signin.png"}/>
      <AppointmentForm />
    </>
  )
}

export default Appointment
