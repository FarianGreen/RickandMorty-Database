import { Link } from "react-router-dom";
import "./header.css";
import Rick_and_Morty_logo from "../../img/Rick_and_Morty_logo.png";

const Header = ({ menuActive, setMenuActive }) => {
  return (
    <div className="header">
      <div className="wrap__logo">
        <Link className="header-link" to="/">
          <img src={Rick_and_Morty_logo} className="logo" />
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
