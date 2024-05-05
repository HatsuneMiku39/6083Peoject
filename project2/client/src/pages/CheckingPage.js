import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

function CheckingPage() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [amount, setAmount] = useState(0);

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const setChecking = () => {
    const date = new Date();
    const currentdate = date.toISOString().slice(0, 19).replace('T', ' ');
    Axios.post(
      'http://localhost:3001/setChecking',{
      amount: amount,
      userID: userID,
      date: currentdate,
    });
    navigate('/MainPage');
  };

  return (
    <div className="CheckingPage">
      <h1>Checking Page</h1>
      <h2>default service fee is 10.00</h2>
      <div>
        <label>Amount to put in checking</label>
        <input
          type="number"
          onChange={ (event) => {
            setAmount(event.target.value);
         }}
        />
        <br />
        <button onClick={setChecking}>set Checking</button>
      </div>
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}

export default CheckingPage;
