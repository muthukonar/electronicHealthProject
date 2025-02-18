
import { Link } from "react-router-dom";


const Homepage = () => {

    const navigate = useNavigate();

    return (
      <div className="hp-loginlinks">
        <h1>Welcome to DocConnection</h1>
        <p>Please choose your login type:</p>
  
  {/* doctor login */}
        <button className="btn btn-primary" onClick={() => navigate('/DoctorLogin')}>
          Doctor Login
        </button>
  
     {/*patient login*/}
        <button className="btn btn-secondary" onClick={() => navigate('/PatientLogin')}>
          Patient Login
        </button>
      </div>
    );
  };
  
  export default Homepage;