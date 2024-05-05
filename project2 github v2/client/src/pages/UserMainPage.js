import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../css/mycss.css';

function UserMainPage() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [checkingID, setCheckingID] = useState("");
  const [checkingAmount, setCheckingAmount] = useState(0);
  const [checkingDate, setCheckingDate] = useState("");
  const [checkingFee, setCheckingFee] = useState(0);

  const [savingID, setSavingID] = useState("");
  const [savingAmount, setSavingAmount] = useState(0);
  const [savingDate, setSavingDate] = useState("");
  const [savingRate, setSavingRate] = useState(0);

  const [loanID, setLoanID] = useState("");
  const [loanMonth, setLoanMonth] = useState(0);
  const [loanPay, setLoanPay] = useState(0);
  const [loanDate, setLoanDate] = useState("");

  const [warning, setWarning] = useState("");

  useEffect(()=>{
    if(checkingID){
      console.log('has checking acct');
    }else{
      console.log('no checking acct');
      getChecking();
    }

    if(savingID){
      console.log('has saving acct');
    }else{
      console.log('no saving acct');
      getSaving();
    }

    if(loanID){
      console.log('has loan acct');
    }else{
      console.log('no loan acct');
      getLoan();
    }
  },[]);

  const getChecking = () => {
    Axios.get(
      'http://localhost:3001/getChecking',{
        params: {
          userID: userID,
        },
    }).then((response) => {
      if(response.data.length > 0){
        console.log('success get checking');
        localStorage.setItem("checkingID",response.data[0].cacctno);
        localStorage.setItem("checkingAmount",response.data[0].amount);
        setCheckingID(localStorage.getItem("checkingID"));
        setCheckingAmount(localStorage.getItem("checkingAmount"));
        setCheckingDate(response.data[0].opendate);
        setCheckingFee(response.data[0].servicefee);
      }else{
        console.log('fail get checking');
      }
    });
  };

  const getSaving = () => {
    Axios.get(
      'http://localhost:3001/getSaving',{
        params: {
          userID: userID,
        },
    }).then((response) => {
      if(response.data.length > 0){
        console.log('success get saving');
        localStorage.setItem("savingID",response.data[0].sacctno);
        localStorage.setItem("savingAmount",response.data[0].amount);
        setSavingID(localStorage.getItem("savingID"));
        setSavingAmount(localStorage.getItem("savingAmount"));
        setSavingDate(response.data[0].opendate);
        setSavingRate(response.data[0].interestrate);
      }else{
        console.log('fail get saving');
      }
    });
  };

  const getLoan = () => {
    Axios.get(
      'http://localhost:3001/getLoan',{
        params: {
          userID: userID,
        },
    }).then((response) => {
      if(response.data.length > 0){
        console.log('success get loan');
        localStorage.setItem("loanID",response.data[0].lacctno);
        setLoanID(localStorage.getItem("loanID"));
        setLoanMonth(response.data[0].loanmonth);
        setLoanPay(response.data[0].loanpay);
        setLoanDate(response.data[0].opendate);
      }else{
        console.log('fail get Loan');
      }
    });
  };

  const handlePayWChecking = () => {
    const checkingAmount = localStorage.getItem("checkingAmount");
    if(checkingAmount){
      const leftAmount = Number(checkingAmount) - Number(loanPay);
      const leftLoanMonth = Number(loanMonth) - 1;

      if(leftAmount>0){
        Axios.post(
          'http://localhost:3001/updateLoan',{
          loanmonth: leftLoanMonth,
          loanID: loanID,
        });
        Axios.post(
          'http://localhost:3001/updateChecking',{
          amount: leftAmount,
          checkingID: checkingID,
        });
        navigate('/');
      }else{
        setWarning("you dont have money to pay!");
      }
    }else{
      setWarning("you should setup checking account first!");
    }
  };

  const handlePayWSaving = () => {
    const savingAmount = localStorage.getItem("savingAmount");
    if(savingAmount){
      const leftAmount = Number(savingAmount) - Number(loanPay);
      const leftLoanMonth = Number(loanMonth) - 1;

      if(leftAmount>0){
        Axios.post(
          'http://localhost:3001/updateLoan',{
          loanmonth: leftLoanMonth,
          loanID: loanID,
        });
        Axios.post(
          'http://localhost:3001/updateSaving',{
          amount: leftAmount,
          savingID: savingID,
        });
        navigate('/');
      }else{
        setWarning("you dont have money to pay!");
      }
    }else{
      setWarning("you should setup saving account first!");
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="UserMainPage">
      <h1>User Main Page </h1>
      <Link to='/ProfileUpdate'>user profile</Link>
      <div className="userMainContent">
        <h2>checking account</h2>
        {checkingID
          ?<div className="userMainContentIn">
            <h4>Checking Account ID: {checkingID}</h4>
            <h4>Open Date: {checkingDate} </h4>
            <h4>Checking Amount: {checkingAmount}</h4>
            <h4>Service Fee: {checkingFee}</h4>
            <Link to='/CheckingUpdate'>update checking</Link>
           </div>
          :<div>you have no checking account do you want to <Link to='/Checking'>build checking account</Link></div>}
      </div>
      <br />

      <div className="userMainContent">
        <h2>saving account</h2>
        {savingID
          ?<div className="userMainContentIn">
            <h4>Saving Account ID: {savingID}</h4>
            <h4>Open Date: {savingDate}</h4>
            <h4>Saving Amount: {savingAmount}</h4>
            <h4>Interest Rate: {savingRate} </h4>
            <Link to='/SavingUpdate'>update saving</Link>
           </div>
          :<div>you have no saving account do you want to <Link to='/Saving'>build saving account</Link></div>}
      </div>
      <br />

      <div className="userMainContent">
        <h2>loan account</h2>
        {(loanID&&loanMonth>0)
          ?<div className="userMainContentIn">
            <h4>Loan Account ID: {loanID}</h4>
            <h4>Open Date: {loanDate}</h4>
            <h4>Number of payments left: {loanMonth}</h4>
            <h4>Amount for next pay: {loanPay} </h4>
            <button onClick={handlePayWChecking}>pay with checking account</button><br />
            <br />
            <button onClick={handlePayWSaving}>pay with saving account</button><br />
           </div>
          :(loanID&&loanMonth===0)? <div>do you want to <Link to='/NewLoan'>set a new loan</Link></div>
          :<div>you have no loan account do you want to <Link to='/Loan'>build loan account</Link></div>}
      </div>
      {warning}
      <br />
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}
// {loanID
//   ?<div>
//     <h1>loan ID: {loanID} </h1>
//    </div>
//   :<Link to='/Loan'>build loan account</Link>}
export default UserMainPage;
