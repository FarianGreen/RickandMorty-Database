import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">
        <Link to="/">Welcome to R&M database</Link>
      </div>
    </div>
  );
};
export default Header;
