import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

function LoanNewPage() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const loanID = localStorage.getItem("loanID")
  const [loanType, setLoanType] = useState("personalLoan");
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanMonth, setLoanMonth] = useState(0);
  const [loanRate, setLoanRate] = useState(0.01);

  const [university, setUniversity] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentType, setStudentType] = useState("undergrad");
  const [graduationDate, setGraduationDate] = useState("");

  const [insuranceCompanyID, setInsuranceCompanyID] = useState(0);
  const [insuranceCompanyName, setInsuranceCompanyName] = useState("");
  const [insuranceCompanyRegion, setInsuranceCompanyRegion] = useState("");
  const [insuranceCompanyState, setInsuranceCompanyState] = useState("");
  const [insuranceCompanyCity, setInsuranceCompanyCity] = useState("");
  const [insuranceCompanyAddressA, setInsuranceCompanyAddressA] = useState("");
  const [insuranceCompanyAddressB, setInsuranceCompanyAddressB] = useState("");
  const [insuranceCompanyZip, setInsuranceCompanyZip] = useState("");
  const [builtDate, setBuiltDate] = useState("");
  const [insuranceAcct, setInsuranceAcct] = useState(0);
  const [insurancePay, setInsurancePay] = useState(0);

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

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
            Axios.get(
              'http://localhost:3001/insuranceCheck',{
                params: {
                  iid: insuranceCompanyID,
                },
            }).then((response) => {
              if(response.data[0].accountno === 0){
                Axios.post(
                  'http://localhost:3001/setInsurance',{
                  iid: insuranceCompanyID,
                  copname: insuranceCompanyName,
                  region: insuranceCompanyRegion,
                  state: insuranceCompanyState,
                  city: insuranceCompanyCity,
                  addressa: insuranceCompanyAddressA,
                  addressb: insuranceCompanyAddressB,
                  zip: insuranceCompanyZip
                });
              }
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
            Axios.get(
              'http://localhost:3001/insuranceCheck',{
                params: {
                  iid: insuranceCompanyID,
                },
            }).then((response) => {
              if(response.data[0].accountno === 0){
                Axios.post(
                  'http://localhost:3001/setInsurance',{
                  iid: insuranceCompanyID,
                  copname: insuranceCompanyName,
                  region: insuranceCompanyRegion,
                  state: insuranceCompanyState,
                  city: insuranceCompanyCity,
                  addressa: insuranceCompanyAddressA,
                  addressb: insuranceCompanyAddressB,
                  zip: insuranceCompanyZip
                });
              }
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
      <h1>Loan Page</h1>

      <label>Select Loan Type</label>
      <div>
        <select name="selectedLoanType" onChange={selectLoanType}>
          <option key={1} value="personalLoan">personalLoan</ option>
          <option key={2} value="studentLoan">studentLoan</ option>
          <option key={3} value="homeLoan">homeLoan</ option>
        </select>
        <h2>default loan rate for your selection is {loanRate}</h2>
        <h3>--------------default option--------------</h3>

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
            <h3>--------------studentLoan option--------------</h3>
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
            <h3>--------------HomeLoan option--------------</h3>
            <h3>--------------Insurance Comapny Info--------------</h3>
            <label>Insurance Company ID</label>
            <input
              type="number"
              maxLength={12}
              onChange={ (event) => {
                setInsuranceCompanyID(event.target.value);
             }}
            />
            <br />
            <label>Name of Insurance Company</label>
            <input
              type="text"
              maxLength={50}
              onChange={ (event) => {
                setInsuranceCompanyName(event.target.value);
             }}
            />
            <br />
            <label>Region of Insurance Company</label>
            <input
              type="text"
              maxLength={20}
              onChange={ (event) => {
                setInsuranceCompanyRegion(event.target.value);
             }}
            />
            <br />
            <label>State of Insurance Company</label>
            <input
              type="text"
              maxLength={20}
              onChange={ (event) => {
                setInsuranceCompanyState(event.target.value);
             }}
            />
            <br />
            <label>City of Insurance Company</label>
            <input
              type="text"
              maxLength={20}
              onChange={ (event) => {
                setInsuranceCompanyCity(event.target.value);
             }}
            />
            <br />
            <label>Address of Insurance Company</label>
            <input
              type="text"
              maxLength={50}
              onChange={ (event) => {
                setInsuranceCompanyAddressA(event.target.value);
             }}
            />
            <br />
            <label>Address of Insurance Company (line 2)</label>
            <input
              type="text"
              maxLength={50}
              onChange={ (event) => {
                setInsuranceCompanyAddressB(event.target.value);
             }}
            />
            <br />
            <label>Zipcode of Insurance Company</label>
            <input
              type="text"
              maxLength={5}
              onChange={ (event) => {
                setInsuranceCompanyZip(event.target.value);
             }}
            />
            <br />
            <h3>--------------House Info--------------</h3>
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
        <button onClick={updateLoan}>set loan</button>
      </div>
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}

export default LoanNewPage;
