import RootMainPage from './RootMainPage';
import UserMainPage from './UserMainPage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const getUserType = localStorage.getItem("userType");
  const navigate = useNavigate();

  useEffect(()=>{
    if(!getUserType){
      navigate('/');
    }
  },[])

  return (
    <div className="MainPage">
      {getUserType==="employee"?<RootMainPage />:<UserMainPage />}
    </div>
  );
}

export default MainPage;
