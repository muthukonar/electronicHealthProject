// import { useState, useEffect, useLayoutEffect } from "react";
// import { retrieveUsers } from "../api/userPatientAPI";
// import type { PatientData } from "../interfaces/PatientData";
// import type { DoctorData } from "../interfaces/DoctorData";
// import ErrorPage from "./ErrorPage";
// import UserList from '../components/Users';
// import DoctorAuthService from '../utils/doctorAuth';
// import PatientAuthService from "../utils/patientAuth";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="hp-loginlinks">
      <h1>Welcome to DocConnection</h1>
      <p>Please choose your login type:</p>

      {/* Doctor login */}
      <Link to="/DoctorLogin" className="btn btn-primary">
        Doctor Login
      </Link>

      {/* Patient login */}
      <Link to="/PatientLogin" className="btn btn-secondary">
        Patient Login
      </Link>
    </div>
  );
};

export default Homepage;