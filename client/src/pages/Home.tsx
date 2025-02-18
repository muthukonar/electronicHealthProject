import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userPatientAPI";
import type { PatientData } from "../interfaces/PatientData";
import type { DoctorData } from "../interfaces/DoctorData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import DoctorAuthService from '../utils/doctorAuth';
import PatientAuthService from "../utils/patientAuth";
import { Navigate, useNavigate } from "react-router-dom";


const Homepage = () => {

    const navigate = useNavigate();

    return (
      <div className="hp-loginlinks">
        <h1>Welcome to DocConnection</h1>
        <p>Please choose your login type:</p>
  
  {/* doctor login */}
        <button className="btn btn-primary" onClick={() => navigate('/DoctorLogin')}>
          Doctor Login
        </button>
  
     {/*patient login*/}
        <button className="btn btn-secondary" onClick={() => navigate('/PatientLogin')}>
          Patient Login
        </button>
      </div>
    );
  };
  
  export default Homepage;