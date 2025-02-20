import { useState, FormEvent, ChangeEvent } from "react";
import DoctorAuthServuice from '../utils/doctorAuth';  // Import the Auth utility for managing authentication state
import { drSignUp } from "../api/authDoctorAPI";  // Import the login function from the API
import { DoctorLogin } from "../interfaces/DoctorLogin";  // Import the interface for UserLogin
import UploadWidget from "../components/CloudinaryWidget";

const HandleDrSignup = () => {
  // State to manage the login form data
  const [signUpData, setSignUpData] = useState<DoctorLogin>({
    name: '',
    email: '',
    password: '',
     //! adding the image_url data here
    image_url: '',
  });

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };
  //! sets image url
  const handleImageUpload = (url: string) => {
    setSignUpData({...signUpData, image_url: url});
    }
//!---------------
  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the sign up API endpoint with signUpData
      const data = await drSignUp(signUpData);
      // If sign up is successful, call Auth.login to store the token in localStorage
      DoctorAuthServuice.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during sign up
    }
  };

  return (
    <div className='form-container'>
      <form className='form sign-up-form' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Email</label>
          <input 
            className="form-input"
            type='text'
            name='email'
            value={signUpData.email || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            value={signUpData.password || ''}
            onChange={handleChange}
          />
        </div>

      {/* Inserted the widget here */}
      <div className="form-group">
          <label>Upload Profile Picture</label>
          <UploadWidget setImageUrl={handleImageUpload} />
          {signUpData.image_url && (
            <img src={signUpData.image_url} alt="Profile Preview" width="100" />
          )}
        </div>

        {/* Submit button for the sign up form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  )
};

export default HandleDrSignup;
