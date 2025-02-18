import { useState, FormEvent, ChangeEvent } from "react";
import DoctorAuthService from '../utils/doctorAuth';
import PatientAuthService from "../utils/patientAuth";
import { DoctorLogin } from "../interfaces/DoctorLogin";  // Import the interface for UserLogin

const DrLogin = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<DoctorLogin>({
    email: '',
    password: ''
  });

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
      Auth.login(data.token);
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
          <button className="btn btn-primary" type='submit'>Login</button>
        </div>
      </form>

      {/*doctor login*/}
      <div className="hp-loginlinks">
        <h4>Not yet enrolled? Signup here:</h4>
      <button className="btn btn-secondary" onClick={() => navigate('/DoctorSignup')}>
          Doctor Signup Pg
        </button>
        </div>

    </div>
  )
};

export default DrLogin;
