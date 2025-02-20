import { PatientData } from "./PatientData";

export interface DoctorData {
  dr_id: number | null;
  dr_name: string | null;
  email: string | null;
  specialization: string | null;
  patients: Array<PatientData>;
  image_url?: string | null;
  assignedPatients: number[] | null;
}
