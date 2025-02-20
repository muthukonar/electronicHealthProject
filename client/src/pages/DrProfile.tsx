import { DoctorData } from "../interfaces/DoctorData";
import React, { useEffect, useState} from "react";
import DoctorAuthService from '../utils/doctorAuth';


// interface DoctorProfileProps {
//     doctor: DoctorData;
//   }
  
const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorData>()

  const fetchProfile = async () =>{
    const token = DoctorAuthService.getProfile()
    console.log(token)
    const response = await fetch(`/api/doctors/${token.dr_id}`,{
      headers:{
        Authorization: `bearer ${DoctorAuthService.getToken()}`
      }
    })
    const data = await response.json()
    console.log(data)
    setDoctor(data)

  }

  useEffect(() => {
    fetchProfile()

  },[])
  console.log(doctor)

return (
      <div>
        {!doctor ? <div>loading</div> : (
          <div> <h2>Doctor Profile</h2>
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
            <p><strong>Patients Assigned:</strong> {doctor.patients ? doctor.patients.length : 0}</p>
        </div>
      </div>
    )};
    </div>
  );
};
  
  export default DoctorProfile;