import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import '../css/mycss.css';

function SavingPage() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [amount, setAmount] = useState(0);

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const setSaving = () => {
    const date = new Date();
    const currentdate = date.toISOString().slice(0, 19).replace('T', ' ');
    Axios.post(
      'http://localhost:3001/setSaving',{
      amount: amount,
      userID: userID,
      date: currentdate,
    });
    navigate('/MainPage');
  };

  return (
    <div className="SavingPage">
      <h1>Saving Account</h1>
      <h4>default interest rate is 0.05</h4>
      <div>
        <label>Amount to put in saving</label>
        <input
          type="number"
          onChange={ (event) => {
            setAmount(event.target.value);
         }}
        />
        <br />
        <br />
        <button onClick={setSaving}>set Saving</button>
      </div>
      <br />
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}

export default SavingPage;
