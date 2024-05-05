import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import RootDeleteCol from './RootDeleteCol';

function RootMainPage() {
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);

  const [cNo, setCNo] = useState(0);
  const [cSum, setCSum] = useState(0);
  const [sNo, setSNo] = useState(0);
  const [sSum, setSSum] = useState(0);
  const [lNo, setLNo] = useState(0);
  const [lSum, setLSum] = useState(0);

  useEffect(()=>{
    Axios.get(
      'http://localhost:3001/getCInfo',{
    }).then((response) => {
      setCNo(response.data[0].cno);
      setCSum(response.data[0].csum);
    });
    Axios.get(
      'http://localhost:3001/getSInfo',{
    }).then((response) => {
      setSNo(response.data[0].sno);
      setSSum(response.data[0].ssum);
    });
    Axios.get(
      'http://localhost:3001/getLInfo',{
    }).then((response) => {
      setLNo(response.data[0].lno);
      setLSum(response.data[0].lsum);
    });
    Axios.get(
      'http://localhost:3001/getUsers'
    ).then((response) => {
      setUserList(response.data);
    });
  },[]);

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="RootMainPage">
      <h1>Root Main Page</h1>
      <h2>---------------Basic Info---------------</h2>
      <h3>Checking Account Number: {cNo}</h3>
      <h3>Total Checking Amount: {cSum}</h3>
      <h3>Saving Account Number: {sNo}</h3>
      <h3>Total Saving Amount: {sSum}</h3>
      <h3>Loan Account Number: {lNo}</h3>
      <h3>Total Loan Amount: {lSum}</h3>
      <h2>---------------User Info---------------</h2>
      <br />
        {
          userList.map((val, key) => {
            return <RootDeleteCol myProp={val} />
          })
        }
      <br />
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}

export default RootMainPage;
