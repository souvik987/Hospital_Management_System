import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Context } from "../main";
import "./AllReport.css";

const AllReport = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(Context);
  const [Report, setReport] = useState();

  useEffect(() => {
    const fetchUserDoctor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/doctor/me",
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
    const fetchReport = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/reports/getall",
          { withCredentials: true }
        );
        console.log(response.data)
        setReport(response.data);
      } catch (error) {
        console.log("Some Errror Occured while fetching reports", error);
      }
    };
    fetchReport();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="container1">
      
        <div className="AfterSideBar">
          <div className="Payment_Page">
            <h1 style={{ marginBottom: "2rem" }}>All Reports</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Department</th>
                    <th>Doctor Name</th>
                    <th>Disease</th>
                    <th>Patient Mobile</th>
                    <th>Patient Age</th>
                    <th>Patient Weight</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Report?.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.patientName}</td>
                        <td>{ele.docDepartment}</td>
                        <td>{ele.docName}</td>
                        <td>{ele.patientDisease}</td>
                        <td>{ele.patientMobile}</td>
                        <td>{ele.patientAge}</td>
                        <td>{ele.patientWeight}</td>
                        <td>{ele.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReport;
