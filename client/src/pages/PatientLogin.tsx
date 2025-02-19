import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/patientAuth';  // Import the Auth utility for managing authentication state
import { login } from "../api/authPatientAPI";  // Import the login function from the API
import { PatientLogin } from "../interfaces/PatientLogin";  // Import the interface for UserLogin
import { Link } from "react-router-dom";

const NewPatientLogin = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<PatientLogin>({
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      if (data.token && data.patientId) {
              Auth.login(data.token); // Store token
              localStorage.setItem("patientId", data.patientId); // Store patientId
              setIsLoggedIn(true);
            } else {
              alert("Login failed. Invalid credentials.");
            }
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            value={loginData.email || ''}
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
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the login form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Login button</button>
        </div>
      </form>
      {isLoggedIn && ( 
        <div>
          <p>Login successful! Click below to continue:</p>
          <Link to="/PatientProfile" className="btn btn-success">Go to Profile</Link>
        </div>
      )}
     <div> <h1>Not yet a member? Signup Here</h1>
  
  <Link to="/PatientSignup" className="btn btn-primary">
  Patient Signup
</Link>
        </div>
    </div>
  )
};
// this export might need to be looked at
export default NewPatientLogin;

