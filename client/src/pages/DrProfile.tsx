import { DoctorData } from "../interfaces/DoctorData";
import React from "react";


interface DoctorProfileProps {
    doctor: DoctorData;
  }
  
  const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor }) => {
    return (
      <div>
        <h2>Doctor Profile</h2>
        <div>
          <p><strong>ID:</strong> {doctor.dr_id ?? "N/A"}</p>
          <p><strong>Name:</strong> {doctor.dr_name ?? "N/A"}</p>
          <p><strong>Email:</strong> {doctor.email ?? "N/A"}</p>
          <p><strong>Specialization:</strong> {doctor.specialization ?? "N/A"}</p>
        </div>
  
        <div>
          <h3>Patients Assigned</h3>
          {doctor.patient_id && doctor.patient_id.length > 0 ? (
            <ul>
              {doctor.patient_id.map((id, index) => (
                <li key={index}>{id}</li>
              ))}
            </ul>
          ) : (
            <p>No patients assigned.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default DoctorProfile;