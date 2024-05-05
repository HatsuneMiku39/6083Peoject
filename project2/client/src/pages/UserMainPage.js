import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

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
      <h2>--------------for checking account--------------</h2>
      <br />
      {checkingID
        ?<div>
          <h3>Checking Account ID: {checkingID} ;Open Date: {checkingDate} </h3> <br />
          <h3>Checking Amount: {checkingAmount} ;Service Fee: {checkingFee} </h3> <br />
          <Link to='/CheckingUpdate'>update checking</Link>
         </div>
        :<Link to='/Checking'>build checking account</Link>}
      <br />

      <h2>--------------for saving account--------------</h2>
      <br />
      {savingID
        ?<div>
          <h3>Saving Account ID: {savingID} ;Open Date: {savingDate} </h3> <br />
          <h3>Saving Amount: {savingAmount} ;Interest Rate: {savingRate} </h3> <br />
          <Link to='/SavingUpdate'>update saving</Link>
         </div>
        :<Link to='/Saving'>build saving account</Link>}
      <br />

      <h2>--------------for loan account--------------</h2>
      <br />
      {(loanID&&loanMonth>0)
        ?<div>
          <h3>Loan Account ID: {loanID} ;Open Date: {loanDate}  </h3> <br />
          <h3>Number of payments left: {loanMonth} ;Amount for next pay: {loanPay} </h3> <br />
          <button onClick={handlePayWChecking}>pay with checking account</button><br />
          <button onClick={handlePayWSaving}>pay with saving account</button><br />
         </div>
        :(loanID&&loanMonth===0)? <Link to='/NewLoan'>set a new loan</Link>
        :<Link to='/Loan'>build loan account</Link>}
      <br />
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
