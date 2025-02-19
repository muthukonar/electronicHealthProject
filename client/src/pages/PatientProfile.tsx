
import React from "react";
import { PatientData } from "../interfaces/PatientData";


interface PatientProfileProps {
  patient: PatientData;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  return (
    <div>
      <h2>Patient Profile</h2>
      <div>
        <p><strong>ID:</strong> {patient.patient_id ?? "N/A"}</p>
        <p><strong>Name:</strong> {patient.patient_name ?? "N/A"}</p>
        <p><strong>Email:</strong> {patient.email ?? "N/A"}</p>
        <p><strong>Height:</strong> {patient.height ? `${patient.height} cm` : "N/A"}</p>
        <p><strong>Weight:</strong> {patient.weight ? `${patient.weight} kg` : "N/A"}</p>
        <p><strong>Age:</strong> {patient.age ?? "N/A"}</p>
        <p><strong>Assigned Doctor ID:</strong> {patient.dr_id ?? "N/A"}</p>
      </div>
    </div>
  );
};

export default PatientProfile;