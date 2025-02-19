// Interface definition for PatientLogin
export interface PatientLogin {
    email?: string | null; 
  password: string | null;  // Property for storing password, nullable
  //! added image url to the PatientLogin interface
  image_url?: string | null;
  //!-----
}
