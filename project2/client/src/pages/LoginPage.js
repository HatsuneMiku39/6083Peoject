import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarn] = useState("");
  const getUserType = localStorage.getItem("userType");
  const navigate = useNavigate();

  useEffect(()=>{
    if(getUserType){
      navigate('/MainPage');
    }
  },[])

  const logInAccount = () => {
    Axios.get(
      'http://localhost:3001/login',{
        params: {
          account: account,
          password: password,
        },
    }).then((response) => {
      if(response.data.length > 0){
        console.log('success to login');
        localStorage.setItem("userID",response.data[0].cid);
        localStorage.setItem("userType",response.data[0].usertype);
        navigate('/MainPage');
      }else{
        setWarn('wrong account name or password!');
      }
    });
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <h3>{warning}</h3>
      <div className="LoginContent">
        <label>Account</label>
        <input
          type="text"
          maxLength={30}
          onChange={ (event) => {
            setAccount(event.target.value);
         }}
        />
        <br />
        <label>Password</label>
        <input
         type="text"
         maxLength={30}
         onChange={ (event) => {
           setPassword(event.target.value);
         }}
        />
      </div>
      <button onClick={logInAccount}>Log In</button>
    </div>
  );
}

export default LoginPage;
