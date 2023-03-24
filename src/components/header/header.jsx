import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../img/logo.jpg";

const Header = ({ menuActive, setMenuActive }) => {
  return (
    <div className="header">
      <div className="header-title">
        <Link className="header-link" to="/">
          <img src={logo} />
        </Link>
      </div>
      <nav className="nav-burger">
        <div
          className="burger-btn"
          onClick={() => {
            setMenuActive(!menuActive);
          }}
        >
          <span className="material-symbols-outlined">menu</span>
        </div>
      </nav>
    </div>
  );
};
export default Header;
