import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const getUserType = localStorage.getItem("userType");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [region, setRegion] = useState("");
  const [sstate, setSState] = useState("");
  const [city, setCity] = useState("");
  const [addressA, setAddressA] = useState("");
  const [addressB, setAddressB] = useState("");
  const [zip, setZip] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    if(getUserType){
      navigate('/MainPage');
    }
  },[])

  const registerAccount = () => {
    let registerFlag = false;

    Axios.get(
      'http://localhost:3001/registerCheck',{
        params: {
          account: account,
        },
    }).then((response) => {
      if(response.data[0].accountno > 0){
        console.log('fail to register');
      }else{
        registerFlag = true;
      }
    }).then(()=>{
      if(registerFlag){
        Axios.post(
          'http://localhost:3001/register',{
          account: account,
          password: password,
          lastName: lastName,
          firstName: firstName,
          region: region,
          sstate: sstate,
          city: city,
          addressA: addressA,
          addressB: addressB,
          zip: zip,
        });
        navigate('/Login');
      }
    });
  };


  return (
    <div className="RegisterPage">
      <h1>Register</h1>
      <h1>================= account info ================</h1>
      <div className="RegisterContent">
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
      <h1>================= profile info ================</h1>
      <div>
        <label>Last name</label>
        <input
         type="text"
         maxLength={20}
         onChange={ (event) => {
           setLastName(event.target.value);
         }}
        />
        <br />

        <label>First name</label>
        <input
         type="text"
         maxLength={20}
         onChange={ (event) => {
           setFirstName(event.target.value);
         }}
        />
        <br />
        <label>Region</label>
        <input
         type="text"
         maxLength={20}
         onChange={ (event) => {
           setRegion(event.target.value);
         }}
        />
        <br />
        <label>State</label>
        <input
         type="text"
         maxLength={20}
         onChange={ (event) => {
           setSState(event.target.value);
         }}
        />
        <br />
        <label>City</label>
        <input
         type="text"
         maxLength={20}
         onChange={ (event) => {
           setCity(event.target.value);
         }}
        />
        <br />
        <label>Address Line one</label>
        <input
         type="text"
         maxLength={50}
         onChange={ (event) => {
           setAddressA(event.target.value);
         }}
        />
        <br />
        <label>Address Line Two (if needed)</label>
        <input
         type="text"
         maxLength={50}
         onChange={ (event) => {
           setAddressB(event.target.value);
         }}
        />
        <br />
        <label>Zip Code</label>
        <input
         type="text"
         maxLength={5}
         onChange={ (event) => {
           setZip(event.target.value);
         }}
        />
        <br />

      </div>
      <br />
      <button onClick={registerAccount}>register account</button>
    </div>
  );
}

export default RegisterPage;
