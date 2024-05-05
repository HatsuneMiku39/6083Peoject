import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function RootDeleteCol({myProp}) {
  const navigate = useNavigate();
  const handleDelete = () => {
    Axios.post(
      'http://localhost:3001/setDelete',{
      cid: myProp.cid,
    });
    navigate('/');
  };

  return (
    <div className="RootDeleteCol">
      account id: {myProp.cid} account name: {myProp.acctname}
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}

export default RootDeleteCol;
