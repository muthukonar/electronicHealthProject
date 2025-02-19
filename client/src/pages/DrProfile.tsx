import { DoctorData } from "../interfaces/DoctorData";
<<<<<<< Updated upstream
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
=======
import React from "react";
>>>>>>> Stashed changes

const DoctorProfile: React.FC = () => {
  const [thisDoctor, setThisDoctor] = useState<DoctorData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchDoctorProfile = async () => {
          try {
              const token = localStorage.getItem("token");
              if (!token) {
                  throw new Error("Not authenticated");
              }
              const response = await fetch("/api/doctors/me", {
                  method: "GET",
                  headers: {
                      "Authorization": `Bearer ${token}`,  // Assuming token-based auth
                      "Content-Type": "application/json"
                    }
                });

                if (response.status === 401) {
                    throw new Error("Failed to fetch doctor data");
                }

                const data: DoctorData = await response.json();
                setThisDoctor(data);
            } catch (error) {
                setError((error as Error).message);
                if ((error as Error).message.includes("Not authenticated")) {
                    navigate("/DrLogin");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchDoctorProfile();
    }, [navigate]);
    if (loading) return <p>Loading doctor profile...</p>;
    if (error) return <p>Error: {error}</p>;


return (
      <div>
        <h2>Doctor Profile</h2>
        <div>
          <p><strong>ID:</strong> {thisDoctor?.doctor.dr_id ?? "N/A"}</p>
          <p><strong>Name:</strong> {thisDoctor?.doctor.dr_name ?? "N/A"}</p>
          <p><strong>Email:</strong> {thisDoctor?.doctor.email ?? "N/A"}</p>
          <p><strong>Specialization:</strong> {thisDoctor?.doctor.specialization ?? "N/A"}</p>
        </div>
  
        <div>
          <h3>Patients Assigned</h3>
          {thisDoctor?.doctor?.patient_id?.length ?? 0 > 0 ? (
            <ul>
              {thisDoctor?.doctor?.patient_id?.map((id, index) => (
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