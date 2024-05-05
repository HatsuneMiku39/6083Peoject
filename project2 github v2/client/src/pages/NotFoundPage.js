import { Link } from "react-router-dom";

function NotFoundPage() {

  return (
    <div className="NotFoundPage">
      <h1>404 page not found</h1>
      <Link to='/'>Home</Link>
    </div>
  );
}

export default NotFoundPage;
