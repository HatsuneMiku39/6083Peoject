import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      <h3>{warning}</h3>
      <h1>================= account info ================</h1>
      <div className="RegisterContent">
        <label>Account Name</label>
        <h3>{account}</h3>
        <br />
        <label>New Password</label>
        <input
         type="text"
         maxLength={30}
         onChange={ (event) => {
           setPassword(event.target.value);
         }}
        />
        <label>Old Password</label>
        <input
         type="text"
         maxLength={30}
         onChange={ (event) => {
           setOldPassword(event.target.value);
         }}
        />
      </div>
      <h1>================= profile info ================</h1>
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
        <br />

        <label>First name</label>
        <input
         type="text"
         maxLength={20}
         value = {firstName}
         onChange={ (event) => {
           setFirstName(event.target.value);
         }}
        />
        <br />
        <label>Region</label>
        <input
         type="text"
         maxLength={20}
         value = {region}
         onChange={ (event) => {
           setRegion(event.target.value);
         }}
        />
        <br />
        <label>State</label>
        <input
         type="text"
         maxLength={20}
         value = {sstate}
         onChange={ (event) => {
           setSState(event.target.value);
         }}
        />
        <br />
        <label>City</label>
        <input
         type="text"
         maxLength={20}
         value = {city}
         onChange={ (event) => {
           setCity(event.target.value);
         }}
        />
        <br />
        <label>Address Line one</label>
        <input
         type="text"
         maxLength={50}
         value = {addressA}
         onChange={ (event) => {
           setAddressA(event.target.value);
         }}
        />
        <br />
        <label>Address Line Two (if needed)</label>
        <input
         type="text"
         maxLength={50}
         value = {addressB}
         onChange={ (event) => {
           setAddressB(event.target.value);
         }}
        />
        <br />
        <label>Zip Code</label>
        <input
         type="text"
         maxLength={5}
         value = {zip}
         onChange={ (event) => {
           setZip(event.target.value);
         }}
        />
        <br />

      </div>
      <br />
      <button onClick={changeProfile}>change profile</button>
      <button onClick={()=>{navigate('/MainPage')}}>return</button>
    </div>
  );
}

export default ProfilePage;
