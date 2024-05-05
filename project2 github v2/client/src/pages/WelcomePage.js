import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import '../css/mycss.css';

function WelcomePage() {
  const getUserType = localStorage.getItem("userType");
  const navigate = useNavigate();

  useEffect(()=>{
    if(getUserType){
      navigate('/MainPage');
    }
  },[])

  return (
    <div className="WelcomePage">
      <h1>SP24_CS-GY_6083_1_B</h1>
      <h1>Team Project 2</h1>
      <br />
      <Link to='/Login'>login</Link>
      <br />
      <Link to='/Register'>register</Link>
    </div>
  );
}

export default WelcomePage;
