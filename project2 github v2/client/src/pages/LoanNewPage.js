import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import '../css/mycss.css';

function LoanNewPage() {
  const navigate = useNavigate();
  const loanID = localStorage.getItem("loanID")
  const [loanType, setLoanType] = useState("personalLoan");
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanMonth, setLoanMonth] = useState(0);
  const [loanRate, setLoanRate] = useState(0.01);

  const [university, setUniversity] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentType, setStudentType] = useState("undergrad");
  const [graduationDate, setGraduationDate] = useState("");

  const [insuranceCopList, setInsuranceCopList] = useState([]);
  const [insuranceCompanyID, setInsuranceCompanyID] = useState(1);

  const [builtDate, setBuiltDate] = useState("");
  const [insuranceAcct, setInsuranceAcct] = useState(0);
  const [insurancePay, setInsurancePay] = useState(0);

  useEffect(()=>{
    Axios.get(
      'http://localhost:3001/getInsuranceCop'
    ).then((response) => {
      setInsuranceCopList(response.data);
    });
  },[]);


  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const selectInsuranceCop = (event) => {
    const iid = event.target.value;
    setInsuranceCompanyID(iid);
  }

  const updateLoan = () => {
    const loanPay = (Number(loanAmount) / Number(loanMonth))*(Number(loanRate)+1);

    Axios.post(
      'http://localhost:3001/updatePersonalLoan',{
      loanRate: loanRate,
      loanAmount: loanAmount,
      loanMonth: loanMonth,
      loanPay: loanPay,
      loanType: loanType,
      lacctno: loanID
    }).then(()=>{
      if(loanType==="studentLoan"){
        Axios.get(
          'http://localhost:3001/studentCheck',{
            params: {
              lacctno: loanID,
            },
        }).then((response) => {
          if(response.data[0].accountno > 0){
            Axios.post(
              'http://localhost:3001/updateStudent',{
              loanID: loanID,
              university: university,
              studentID: studentID,
              studentType: studentType,
              graduationDate: graduationDate
            });
          }else{
            Axios.post(
              'http://localhost:3001/setStudent',{
              loanID: loanID,
              university: university,
              studentID: studentID,
              studentType: studentType,
              graduationDate: graduationDate
            });
          }
        });
      }else if(loanType==="homeLoan"){
        Axios.get(
          'http://localhost:3001/homeCheck',{
            params: {
              lacctno: loanID,
            },
        }).then((response) => {
          if(response.data[0].accountno > 0){
            Axios.post(
              'http://localhost:3001/updateHome',{
              builtdate: builtDate,
              iacctno: insuranceAcct,
              insurancepay: insurancePay,
              iid: insuranceCompanyID,
              lacctno: loanID,
            });
          }else{
            Axios.post(
              'http://localhost:3001/setHome',{
              builtdate: builtDate,
              iacctno: insuranceAcct,
              insurancepay: insurancePay,
              iid: insuranceCompanyID,
              lacctno: loanID,
            });
          }
        });
      }
      navigate('/MainPage');
    });
  };

  const selectLoanType = (event) => {
    const type = event.target.value;
    setLoanType(type);
    if(type==="studentLoan"){
      setLoanRate(0.03);
    }else if(type==="homeLoan"){
      setLoanRate(0.02);
    }else{
      setLoanRate(0.01);
    }
  }

  return (
    <div className="LoanNewPage">
      <h1>Loan Account</h1>

      <label>Select Loan Type</label>
      <div>
        <select name="selectedLoanType" onChange={selectLoanType}>
          <option key={1} value="personalLoan">personalLoan</ option>
          <option key={2} value="studentLoan">studentLoan</ option>
          <option key={3} value="homeLoan">homeLoan</ option>
        </select>
        <h4>default loan rate for your selection is {loanRate}</h4>

        <label>Loan amount</label>
        <input
          type="number"
          maxLength={10}
          onChange={ (event) => {
            setLoanAmount(event.target.value);
         }}
        />
        <br />
        <label>Loan month</label>
        <input
          type="number"
          onChange={ (event) => {
            setLoanMonth(event.target.value);
         }}
        />
        <br />

        {
          loanType==="studentLoan"&&
          <div>
            <label>University Name</label>
            <input
              type="text"
              maxLength={30}
              onChange={ (event) => {
                setUniversity(event.target.value);
             }}
            />
            <br />
            <label>Student ID</label>
            <input
              type="text"
              maxLength={20}
              onChange={ (event) => {
                setStudentID(event.target.value);
             }}
            />
            <br />
            <label>Select Student Type</label>
            <select name="selectedStudentType" onChange={(event)=>{setStudentType(event.target.value)}}>
              <option key={1} value="undergrad">undergrad</ option>
              <option key={2} value="graduate">graduate</ option>
            </select>
            <br />
            <label>Graduation Date</label>
            <input
              type="date"
              onChange={ (event) => {
                const dateValue = event.target.value;
                const formattedValue = dateValue.replace(/-/g, "/");
                setGraduationDate(formattedValue);
             }}
            />
            <br />

          </div>
        }
        {
          loanType==="homeLoan"&&
          <div>
            <label>select your insurance company</label>
            <select name="selectedInsuranceCop" onChange={selectInsuranceCop}>
              {
                insuranceCopList.map((val, key) => {
                  return <option key={key} value={val.iid}>{val.copname}</ option>
                })
              }
            </select>

            <label>Built date of house</label>
            <input
              type="date"
              onChange={ (event) => {
                const dateValue = event.target.value;
                const formattedValue = dateValue.replace(/-/g, "/");
                setBuiltDate(formattedValue);
             }}
            />
            <br />
            <label>Insurance account number</label>
            <input
              type="number"
              maxLength={12}
              onChange={ (event) => {
                setInsuranceAcct(event.target.value);
             }}
            />
            <br />
            <label>Insurance payment amount</label>
            <input
              type="number"
              maxLength={8}
              onChange={ (event) => {
                setInsurancePay(event.target.value);
             }}
            />
            <br />

          </div>
        }
        <br />
        <br />
        <button onClick={updateLoan}>set loan</button>
      </div>
      <br />
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}

export default LoanNewPage;
