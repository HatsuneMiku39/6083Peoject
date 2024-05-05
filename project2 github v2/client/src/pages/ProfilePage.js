import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/mycss.css';

function ProfilePage() {
  const userID = localStorage.getItem("userID");
  //const getUserType = localStorage.getItem("userType");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [region, setRegion] = useState("");
  const [sstate, setSState] = useState("");
  const [city, setCity] = useState("");
  const [addressA, setAddressA] = useState("");
  const [addressB, setAddressB] = useState("");
  const [zip, setZip] = useState("");
  const [warning, setWarn] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    Axios.get(
      'http://localhost:3001/getProfile',{
        params: {
          cid: userID,
        },
    }).then((response) => {
      setAccount(response.data[0].acctname);
      setLastName(response.data[0].lname);
      setFirstName(response.data[0].fname);
      setRegion(response.data[0].region);
      setSState(response.data[0].state);
      setCity(response.data[0].city);
      setAddressA(response.data[0].addressa);
      setAddressB(response.data[0].addressb);
      setZip(response.data[0].zip);
    });
  },[]);

  const changeProfile = () => {
    Axios.get(
      'http://localhost:3001/profileCheck',{
        params: {
          cid: userID,
          pass: oldpassword,
        },
    }).then((response) => {
      if(response.data[0].accountno > 0){
        if(password.length===0){
          setPassword(oldpassword);
        }
        Axios.post(
          'http://localhost:3001/updateProfile',{
          pass: password,
          lname: lastName,
          fname: firstName,
          region: region,
          state: sstate,
          city: city,
          addressA: addressA,
          addressB: addressB,
          zip: zip,
          cid: userID,
        });
        navigate('/MainPage');
      }else{
        setWarn("please input right old password for make changes");
      }
    });
  };


  return (
    <div className="ProfilePage">
      <h1>User Profile</h1>
      <div className="RegisterContent">
        <label>Account Name</label>
        <h3>{account}</h3>
      </div>
      <div>
        <label>Last name</label>
        <input
         type="text"
         maxLength={20}
         value = {lastName}
         onChange={ (event) => {
           setLastName(event.target.value);
         }}
        />

        <label>First name</label>
        <input
         type="text"
         maxLength={20}
         value = {firstName}
         onChange={ (event) => {
           setFirstName(event.target.value);
         }}
        />

        <label>Region</label>
        <input
         type="text"
         maxLength={20}
         value = {region}
         onChange={ (event) => {
           setRegion(event.target.value);
         }}
        />

        <label>State</label>
        <input
         type="text"
         maxLength={20}
         value = {sstate}
         onChange={ (event) => {
           setSState(event.target.value);
         }}
        />

        <label>City</label>
        <input
         type="text"
         maxLength={20}
         value = {city}
         onChange={ (event) => {
           setCity(event.target.value);
         }}
        />

        <label>Address Line one</label>
        <input
         type="text"
         maxLength={50}
         value = {addressA}
         onChange={ (event) => {
           setAddressA(event.target.value);
         }}
        />

        <label>Address Line Two (if needed)</label>
        <input
         type="text"
         maxLength={50}
         value = {addressB}
         onChange={ (event) => {
           setAddressB(event.target.value);
         }}
        />

        <label>Zip Code</label>
        <input
         type="text"
         maxLength={5}
         value = {zip}
         onChange={ (event) => {
           setZip(event.target.value);
         }}
        />

        <label>New Password (if needed)</label>
        <input
         type="text"
         maxLength={30}
         onChange={ (event) => {
           setPassword(event.target.value);
         }}
        />
        <label>enter previous password for continue</label>
        <input
         type="text"
         maxLength={30}
         onChange={ (event) => {
           setOldPassword(event.target.value);
         }}
        />

      </div>
      <h3>{warning}</h3>
      <br />
      <button onClick={changeProfile}>change profile</button>
      <br />
      <br />
      <button onClick={()=>{navigate('/MainPage')}}>return</button>
    </div>
  );
}

export default ProfilePage;
