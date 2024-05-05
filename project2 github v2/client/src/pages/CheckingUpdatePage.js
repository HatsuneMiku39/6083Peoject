import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import '../css/mycss.css';

function CheckingUpdatePage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [warning, setWarning] = useState("");
  const checkingID = localStorage.getItem("checkingID");

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const addChecking = () => {
    const checkingAmount = localStorage.getItem("checkingAmount");
    const leftAmount = Number(amount) + Number(checkingAmount);

    Axios.post(
      'http://localhost:3001/updateChecking',{
      amount: leftAmount,
      checkingID: checkingID,
    });
    navigate('/MainPage');
  };

  const removeChecking = () => {
    const checkingAmount = localStorage.getItem("checkingAmount");
    const leftAmount = Number(checkingAmount) - Number(amount);

    if(leftAmount>0){
      Axios.post(
        'http://localhost:3001/updateChecking',{
        amount: leftAmount,
        checkingID: checkingID,
      });
      navigate('/MainPage');
    }else{
      setWarning("you dont have that amount to remove!");
    }
  };

  return (
    <div className="CheckingUpdatePage">
      <h1>Checking Account</h1>
      <h4>{warning}</h4>
      <div>
        <label>Amount to change</label>
        <input
          type="number"
          onChange={ (event) => {
            setAmount(event.target.value);
         }}
        />
        <br />
        <br />
        <button onClick={addChecking}>Add to Checking</button>
        <br />
        <br />
        <button onClick={removeChecking}>Remove from Checking</button>
      </div>
      <br />
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}

export default CheckingUpdatePage;
