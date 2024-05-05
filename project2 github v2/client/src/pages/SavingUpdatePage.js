import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import '../css/mycss.css';

function SavingUpdatePage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [warning, setWarning] = useState("");
  const savingID = localStorage.getItem("savingID");

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const addSaving = () => {
    const savingAmount = localStorage.getItem("savingAmount");
    const leftAmount = Number(amount) + Number(savingAmount);

    Axios.post(
      'http://localhost:3001/updateSaving',{
      amount: leftAmount,
      savingID: savingID,
    });
    navigate('/MainPage');
  };

  const removeSaving = () => {
    const savingAmount = localStorage.getItem("savingAmount");
    const leftAmount = Number(savingAmount) - Number(amount);

    if(leftAmount>0){
      Axios.post(
        'http://localhost:3001/updateSaving',{
        amount: leftAmount,
        savingID: savingID,
      });
      navigate('/MainPage');
    }else{
      setWarning("you dont have that amount to remove!");
    }
  };

  return (
    <div className="SavingUpdatePage">
      <h1>Saving Account</h1>
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
        <button onClick={addSaving}>Add to Saving</button>
        <br />
        <br />
        <button onClick={removeSaving}>Remove from Saving</button>
      </div>
      <br />
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}

export default SavingUpdatePage;
