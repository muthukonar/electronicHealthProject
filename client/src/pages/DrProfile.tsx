import { DoctorData } from "../interfaces/DoctorData";
import React, { useEffect, useState } from "react";
import DoctorAuthService from '../utils/doctorAuth';
import { useNavigate } from 'react-router-dom';
import  DoctorDropdown  from "../api/doctorMessageAPI";


// interface DoctorProfileProps {
//     doctor: DoctorData;
//   }

const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorData>();
  const navigate = useNavigate();

  const fetchDrProfile = async () =>{
    const token = DoctorAuthService.getProfile()
    console.log(token)
    const response = await fetch(`/api/doctors/${token.dr_id}`,{
      headers:{
        Authorization: `bearer ${DoctorAuthService.getToken()}`
      }
    })
    const data = await response.json()
    // console.log(data)
    setDoctor(data)
  };

  const handleLogout = () => {
    DoctorAuthService.logout(); // Clear authentication token
    navigate('/Home'); // Redirect to Home page
  };
  
  useEffect(() => {
    fetchDrProfile()

  },[]);
  // console.log(doctor)

return (
      <div>
        {!doctor ? (<div>loading</div>
        ) : (
          <div> 
          <h2>Doctor Profile</h2>
          <div className="profile-image">
              {doctor.image_url ? (
                <img
                  src={doctor.image_url}
                  alt="Doctor Profile"
                  width="150"
                  height="150"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <img
                  src="/default-profile.jpg" // Path to a default profile image
                  alt="Default Profile"
                  width="150"
                  height="150"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              )}
              </div>
              <div>
            <p><strong>ID:</strong> {doctor.dr_id ?? "N/A"}</p>
            <p><strong>Name:</strong> {doctor.dr_name ?? "N/A"}</p>
            <p><strong>Email:</strong> {doctor.email ?? "N/A"}</p>
            <p><strong>Specialization:</strong> {doctor.specialization ?? "N/A"}</p>
            <p><strong>Patients Assigned:</strong> {doctor.assignedPatients ? doctor.assignedPatients.length : 0}</p>
        </div>

        <DoctorDropdown
          />

        <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 15px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
        </button>
      </div>
    )};
    </div>
  );
};
  
  export default DoctorProfile;